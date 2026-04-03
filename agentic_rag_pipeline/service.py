from __future__ import annotations

from dataclasses import dataclass

from agentic_rag_pipeline.llm import GeminiLLM, LLMUnavailableError
from agentic_rag_pipeline.schemas import ChatRequest, ChatResponse, RetrievalDiagnostics, SourceChunk
from agentic_rag_pipeline.settings import Settings


class ConfigurationError(RuntimeError):
    """Raised when a required backend dependency or env var is missing."""


@dataclass
class RetrievedChunk:
    source_id: str
    text: str
    paper_id: str | None
    target_material: str | None
    process_type: str | None
    original_score: float | None = None
    hyde_score: float | None = None
    fusion_score: float = 0.0
    rerank_score: float | None = None


def _safe_attr(item, name: str, default=None):
    if hasattr(item, name):
        return getattr(item, name)
    if isinstance(item, dict):
        return item.get(name, default)
    return default


class AgenticRAGService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._pc = None
        self._index = None
        self._llm: GeminiLLM | None = None
        self._llm_error: str | None = None

    def health(self) -> dict:
        warnings: list[str] = []

        if not self.settings.pinecone_api_key:
            warnings.append("PINECONE_API_KEY is missing.")
        if not self.settings.gemini_api_key:
            warnings.append("GEMINI_API_KEY or GOOGLE_API_KEY is missing; HyDE and LLM synthesis will fall back.")

        llm_enabled = self.llm_available
        if self._llm_error:
            warnings.append(self._llm_error)

        return {
            "status": "ok" if not warnings else "degraded",
            "index_name": self.settings.pinecone_index_name,
            "scope": "paper-aware",
            "hyde_configured": self.settings.hyde_enabled and llm_enabled,
            "llm_enabled": llm_enabled,
            "warnings": warnings,
        }

    @property
    def llm_available(self) -> bool:
        if self._llm is not None:
            return True
        if self._llm_error:
            return False
        try:
            self._llm = GeminiLLM(self.settings)
            return True
        except LLMUnavailableError as exc:
            self._llm_error = str(exc)
            return False

    def _get_llm(self) -> GeminiLLM:
        if not self.llm_available or self._llm is None:
            raise LLMUnavailableError(self._llm_error or "LLM is unavailable.")
        return self._llm

    def _get_pinecone(self):
        if self._pc is not None:
            return self._pc

        if not self.settings.pinecone_api_key:
            raise ConfigurationError("PINECONE_API_KEY is required for retrieval.")

        try:
            from pinecone import Pinecone
        except Exception as exc:
            raise ConfigurationError(
                "Pinecone SDK is unavailable. Install `pinecone` and remove the deprecated "
                "`pinecone-client` package if it is still present."
            ) from exc

        self._pc = Pinecone(api_key=self.settings.pinecone_api_key)
        return self._pc

    def _get_index(self):
        if self._index is not None:
            return self._index

        pc = self._get_pinecone()
        if self.settings.pinecone_index_host:
            self._index = pc.Index(host=self.settings.pinecone_index_host)
        else:
            self._index = pc.Index(self.settings.pinecone_index_name)
        return self._index

    def _embed(self, text: str, input_type: str) -> list[float]:
        pc = self._get_pinecone()
        embeddings = pc.inference.embed(
            model=self.settings.pinecone_embed_model,
            inputs=[text],
            parameters={"input_type": input_type, "truncate": "END"},
        )
        if not embeddings:
            raise RuntimeError("Pinecone did not return an embedding.")

        first = embeddings[0]
        values = _safe_attr(first, "values")
        if not values:
            raise RuntimeError("Embedding response did not contain vector values.")
        return list(values)

    def _query_index(
        self,
        vector: list[float],
        top_k: int,
        scope_paper_id: str | None,
        source: str,
    ) -> list[RetrievedChunk]:
        index = self._get_index()
        metadata_filter = {"paper_id": {"$eq": scope_paper_id}} if scope_paper_id else None

        result = index.query(
            vector=vector,
            top_k=top_k,
            namespace=self.settings.pinecone_namespace,
            include_values=False,
            include_metadata=True,
            filter=metadata_filter,
        )

        matches = _safe_attr(result, "matches", []) or []
        chunks: list[RetrievedChunk] = []
        for match in matches:
            metadata = _safe_attr(match, "metadata", {}) or {}
            text = metadata.get("text", "").strip()
            if not text:
                continue
            chunk = RetrievedChunk(
                source_id=str(_safe_attr(match, "id", "unknown")),
                text=text,
                paper_id=metadata.get("paper_id"),
                target_material=metadata.get("target_material"),
                process_type=metadata.get("process_type"),
            )
            score = float(_safe_attr(match, "score", 0.0) or 0.0)
            if source == "original":
                chunk.original_score = score
            else:
                chunk.hyde_score = score
            chunks.append(chunk)
        return chunks

    def _fuse_results(
        self,
        original_chunks: list[RetrievedChunk],
        hyde_chunks: list[RetrievedChunk],
    ) -> list[RetrievedChunk]:
        combined: dict[str, RetrievedChunk] = {}

        def merge(chunks: list[RetrievedChunk], source: str) -> None:
            for rank, chunk in enumerate(chunks, start=1):
                existing = combined.get(chunk.source_id)
                rrf_bonus = 1.0 / (self.settings.rrf_k + rank)
                if existing is None:
                    chunk.fusion_score = rrf_bonus
                    combined[chunk.source_id] = chunk
                    continue

                existing.fusion_score += rrf_bonus
                if source == "original" and chunk.original_score is not None:
                    existing.original_score = chunk.original_score
                if source == "hyde" and chunk.hyde_score is not None:
                    existing.hyde_score = chunk.hyde_score

        merge(original_chunks, "original")
        merge(hyde_chunks, "hyde")

        ranked = sorted(
            combined.values(),
            key=lambda item: (
                item.fusion_score,
                item.original_score or 0.0,
                item.hyde_score or 0.0,
            ),
            reverse=True,
        )
        return ranked[: self.settings.rerank_input_k]

    def _rerank(self, query: str, candidates: list[RetrievedChunk]) -> list[RetrievedChunk]:
        if not candidates:
            return []

        pc = self._get_pinecone()
        documents = [
            {
                "id": chunk.source_id,
                "text": chunk.text,
                "paper_id": chunk.paper_id or "unknown",
                "target_material": chunk.target_material or "Unknown",
                "process_type": chunk.process_type or "Unknown",
            }
            for chunk in candidates
        ]

        reranked = pc.inference.rerank(
            model=self.settings.pinecone_rerank_model,
            query=query,
            documents=documents,
            top_n=min(self.settings.final_top_k, len(documents)),
            return_documents=True,
            parameters={"truncate": "END"},
        )

        index_lookup = {chunk.source_id: chunk for chunk in candidates}
        ordered: list[RetrievedChunk] = []

        for item in _safe_attr(reranked, "data", []) or []:
            document = _safe_attr(item, "document", {}) or {}
            source_id = document.get("id") or candidates[_safe_attr(item, "index", 0)].source_id
            chunk = index_lookup.get(source_id)
            if chunk is None:
                continue
            chunk.rerank_score = float(_safe_attr(item, "score", 0.0) or 0.0)
            ordered.append(chunk)

        return ordered

    def _build_context(self, sources: list[RetrievedChunk]) -> str:
        blocks: list[str] = []
        total_chars = 0

        for idx, source in enumerate(sources, start=1):
            block = (
                f"[S{idx}] paper_id={source.paper_id or 'unknown'} | "
                f"material={source.target_material or 'Unknown'} | "
                f"process={source.process_type or 'Unknown'}\n"
                f"{source.text.strip()}"
            )
            if total_chars + len(block) > self.settings.answer_context_chars:
                break
            blocks.append(block)
            total_chars += len(block)

        return "\n\n".join(blocks)

    def _fallback_answer(self, query: str, sources: list[RetrievedChunk]) -> str:
        if not sources:
            return (
                "Answer:\n"
                "I could not find grounded evidence in Pinecone for that question.\n\n"
                "Recommended approach:\n"
                "- Try a more specific ALD material, precursor, process type, or paper scope.\n\n"
                "Evidence:\n"
                "- No reranked source chunks were available for synthesis.\n\n"
                "Caveats:\n"
                "- Gemini-backed answer generation is unavailable or retrieval returned no usable context."
            )

        lines = [
            "Answer:",
            f"I found {len(sources)} relevant chunks for: {query}.",
            "",
            "Recommended approach:",
            "- Use the evidence cards below as the grounding source because Gemini-backed synthesis is unavailable.",
            "",
            "Evidence:",
        ]
        for idx, source in enumerate(sources, start=1):
            lines.append(
                f"- [S{idx}] {source.paper_id or 'unknown'} | "
                f"{source.target_material or 'Unknown'} | "
                f"{source.text[:220].strip()}..."
            )
        lines.extend(
            [
                "",
                "Caveats:",
                "- This response is retrieval-only because Gemini-backed synthesis is unavailable.",
            ]
        )
        return "\n".join(lines)

    def chat(self, request: ChatRequest) -> ChatResponse:
        query = request.query.strip()
        if not query:
            raise ValueError("Query must not be empty.")

        hyde_document: str | None = None
        hyde_chunks: list[RetrievedChunk] = []

        original_vector = self._embed(query, input_type="query")
        original_chunks = self._query_index(
            vector=original_vector,
            top_k=self.settings.initial_top_k,
            scope_paper_id=request.scope_paper_id,
            source="original",
        )

        if self.settings.hyde_enabled and self.llm_available:
            hyde_document = self._get_llm().generate_hyde_document(
                query=query,
                conversation=request.conversation,
                scope_paper_id=request.scope_paper_id,
            )
            if hyde_document:
                hyde_vector = self._embed(hyde_document, input_type="passage")
                hyde_chunks = self._query_index(
                    vector=hyde_vector,
                    top_k=self.settings.initial_top_k,
                    scope_paper_id=request.scope_paper_id,
                    source="hyde",
                )

        fused_chunks = self._fuse_results(original_chunks, hyde_chunks)
        reranked_chunks = self._rerank(query, fused_chunks)

        if self.llm_available and reranked_chunks:
            context_blocks = self._build_context(reranked_chunks)
            answer = self._get_llm().generate_answer(
                query=query,
                conversation=request.conversation,
                scope_paper_id=request.scope_paper_id,
                context_blocks=context_blocks,
            )
        else:
            answer = self._fallback_answer(query, reranked_chunks)

        response_sources = [
            SourceChunk(
                source_id=chunk.source_id,
                paper_id=chunk.paper_id,
                target_material=chunk.target_material,
                process_type=chunk.process_type,
                excerpt=chunk.text,
                retrieval_score=chunk.fusion_score,
                rerank_score=chunk.rerank_score,
            )
            for chunk in reranked_chunks
        ]

        diagnostics = RetrievalDiagnostics(
            scope=request.scope_paper_id or "global-catalog",
            hyde_enabled=bool(hyde_document),
            retrieved_count=len(fused_chunks),
            reranked_count=len(reranked_chunks),
            hyde_preview=hyde_document[:220] if hyde_document else None,
        )

        return ChatResponse(answer=answer, sources=response_sources, diagnostics=diagnostics)
