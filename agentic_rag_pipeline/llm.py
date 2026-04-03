from __future__ import annotations

from typing import Iterable

from agentic_rag_pipeline.schemas import ChatTurn
from agentic_rag_pipeline.settings import Settings


class LLMUnavailableError(RuntimeError):
    """Raised when Gemini-backed generation is not configured."""


def _format_history(conversation: Iterable[ChatTurn]) -> str:
    turns = list(conversation)[-6:]
    if not turns:
        return "No prior conversation."
    return "\n".join(f"{turn.role.upper()}: {turn.content.strip()}" for turn in turns)


class GeminiLLM:
    def __init__(self, settings: Settings):
        try:
            from google import genai
            from google.genai import types
        except ImportError as exc:
            raise LLMUnavailableError(
                "Gemini support requires the `google-genai` package. Install dependencies from "
                "`agentic_rag_pipeline/requirements.txt`."
            ) from exc

        if not settings.gemini_api_key:
            raise LLMUnavailableError(
                "GEMINI_API_KEY or GOOGLE_API_KEY is not set, so HyDE and answer synthesis are disabled."
            )

        self.client = genai.Client(api_key=settings.gemini_api_key)
        self.types = types
        self.model = settings.gemini_model

    def _generate(self, system_instruction: str, prompt: str, max_output_tokens: int) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=self.types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.2,
                max_output_tokens=max_output_tokens,
                thinking_config=self.types.ThinkingConfig(thinking_budget=0),
            ),
        )
        return (response.text or "").strip()

    def generate_hyde_document(
        self,
        query: str,
        conversation: list[ChatTurn],
        scope_paper_id: str | None,
    ) -> str:
        scope_line = scope_paper_id or "global corpus"
        return self._generate(
            system_instruction=(
                "Write a hypothetical but retrieval-optimized paragraph for an ALD literature "
                "search system. The paragraph should sound like a dense paper excerpt that would "
                "likely answer the user's question. Mention materials, precursors, process type, "
                "deposition windows, and characterization details only when relevant. Do not "
                "mention that the text is hypothetical. Do not use bullets."
            ),
            prompt=(
                f"Corpus scope: {scope_line}\n"
                f"Conversation:\n{_format_history(conversation)}\n\n"
                f"Question:\n{query}"
            ),
            max_output_tokens=250,
        )

    def generate_answer(
        self,
        query: str,
        conversation: list[ChatTurn],
        scope_paper_id: str | None,
        context_blocks: str,
    ) -> str:
        scope_line = scope_paper_id or "global corpus"
        return self._generate(
            system_instruction=(
                "You are an ALD materials-science assistant. Answer only from the supplied "
                "retrieval context. If the evidence is partial or conflicting, say so clearly. "
                "Use inline citations like [S1] and [S2] that map to the supplied source blocks. "
                "Prefer experimentally grounded details over general statements. Format every answer "
                "using exactly these sections in plain text: `Answer:`, `Recommended approach:`, "
                "`Evidence:`, and `Caveats:`. Keep each section concise. Use bullet points under "
                "`Recommended approach:`, `Evidence:`, and `Caveats:` when helpful. If the user asks "
                "a how-to question, give the most defensible deposition recipe the retrieved evidence supports."
            ),
            prompt=(
                f"Scope: {scope_line}\n"
                f"Conversation:\n{_format_history(conversation)}\n\n"
                f"Question:\n{query}\n\n"
                f"Sources:\n{context_blocks}"
            ),
            max_output_tokens=500,
        )
