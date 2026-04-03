from typing import Literal

from pydantic import BaseModel, Field


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)


class ChatRequest(BaseModel):
    query: str = Field(min_length=1, max_length=4000)
    conversation: list[ChatTurn] = Field(default_factory=list)
    scope_paper_id: str | None = None


class SourceChunk(BaseModel):
    source_id: str
    paper_id: str | None = None
    target_material: str | None = None
    process_type: str | None = None
    excerpt: str
    retrieval_score: float | None = None
    rerank_score: float | None = None


class RetrievalDiagnostics(BaseModel):
    scope: str
    hyde_enabled: bool
    retrieved_count: int
    reranked_count: int
    hyde_preview: str | None = None


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]
    diagnostics: RetrievalDiagnostics
