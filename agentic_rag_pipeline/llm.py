from __future__ import annotations

import json
import re
from typing import Any, Iterable

from agentic_rag_pipeline.schemas import ChatTurn
from agentic_rag_pipeline.settings import Settings


class LLMUnavailableError(RuntimeError):
    """Raised when Gemini-backed generation is not configured."""


def _format_history(conversation: Iterable[ChatTurn]) -> str:
    turns = list(conversation)[-6:]
    if not turns:
        return "No prior conversation."
    return "\n".join(f"{turn.role.upper()}: {turn.content.strip()}" for turn in turns)


def _clean_text_response(text: str) -> str:
    return text.strip()


def _extract_json_payload(text: str) -> dict[str, Any]:
    raw = text.strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)
        raw = raw.strip()

    match = re.search(r"\{.*\}", raw, re.DOTALL)
    if match:
        raw = match.group(0)

    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Model did not return valid JSON: {raw[:280]!r}") from exc


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
                "GEMINI_API_KEY or GOOGLE_API_KEY is not set, so agent planning and synthesis are disabled."
            )

        self.client = genai.Client(api_key=settings.gemini_api_key)
        self.types = types
        self.model = settings.gemini_model

    def _generate(
        self,
        system_instruction: str,
        prompt: str,
        max_output_tokens: int,
        temperature: float = 0.2,
    ) -> str:
        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt,
            config=self.types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=temperature,
                max_output_tokens=max_output_tokens,
                thinking_config=self.types.ThinkingConfig(thinking_budget=0),
            ),
        )
        return _clean_text_response(response.text or "")

    def _generate_json(
        self,
        system_instruction: str,
        prompt: str,
        max_output_tokens: int,
    ) -> dict[str, Any]:
        text = self._generate(
            system_instruction=system_instruction,
            prompt=prompt,
            max_output_tokens=max_output_tokens,
            temperature=0.1,
        )
        return _extract_json_payload(text)

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

    def generate_plan(
        self,
        query: str,
        conversation: list[ChatTurn],
        scope_paper_id: str | None,
        available_tools: list[dict[str, Any]],
        max_steps: int,
    ) -> dict[str, Any]:
        tools_json = json.dumps(available_tools, indent=2)
        return self._generate_json(
            system_instruction=(
                "You are the Strategic Planner in a multi-step agentic RAG system. Your sole job is to "
                "decompose the user's query into a precise, dependency-aware execution plan. "
                "You NEVER answer the query yourself — only plan how to answer it. "
                "Separate analysis steps (reasoning, decomposition) from tool steps (data fetching). "
                "Always prefer Pinecone-backed rag_search for domain-specific evidence. "
                "Use wikipedia_lookup ONLY for foundational definitions or background context unavailable in Pinecone. "
                "Every tool step must have a clear, falsifiable expected_output. "
                "Plans must be minimal but complete — no redundant steps, no skipped dependencies."
            ),
            prompt=(
                "Return strict JSON with this schema:\n"
                "{\n"
                '  "planner_summary": "short summary",\n'
                '  "analysis": "what must be answered and what evidence is needed",\n'
                '  "synthesis_goal": "how the synthesizer should frame the final answer",\n'
                '  "validation_focus": ["focus item"],\n'
                '  "steps": [\n'
                "    {\n"
                '      "step_id": "A1 or E1",\n'
                '      "step_type": "analysis or tool",\n'
                '      "title": "short title",\n'
                '      "objective": "what this step does",\n'
                '      "depends_on": [],\n'
                '      "tool_name": "rag_search or wikipedia_lookup or null",\n'
                '      "arguments": {"query": "string", "scope_paper_id": null},\n'
                '      "expected_output": "what the step should yield"\n'
                "    }\n"
                "  ]\n"
                "}\n\n"
                "Rules:\n"
                f"- Include at least one analysis step and at least one tool step unless the query is invalid.\n"
                f"- Use at most {max_steps} total steps.\n"
                "- Use `rag_search` for ALD-specific evidence gathering.\n"
                "- Use `wikipedia_lookup` only for broad supporting facts or definitions.\n"
                "- When a later tool depends on an earlier tool output, reference it using `#E1.field` style placeholders.\n"
                "- Do not include final answer text in the plan.\n\n"
                f"Scope: {scope_paper_id or 'global corpus'}\n"
                f"Conversation:\n{_format_history(conversation)}\n\n"
                f"User query:\n{query}\n\n"
                f"Available tools:\n{tools_json}"
            ),
            max_output_tokens=900,
        )

    def generate_answer(
        self,
        query: str,
        conversation: list[ChatTurn],
        scope_paper_id: str | None,
        plan_summary: str,
        execution_summary: str,
        context_blocks: str,
    ) -> str:
        scope_line = scope_paper_id or "global corpus"
        return self._generate(
            system_instruction=(
                "You are the Synthesizer in an agentic ALD materials-science assistant. Answer from "
                "the supplied tool outputs and evidence blocks. Do not invent unsupported claims. "
                "Use inline citations like [S1] and [S2] that map to the supplied evidence blocks. "
                "If the evidence is partial or conflicting, say so plainly. Format every answer using "
                "exactly these sections in plain text: `Answer:`, `Recommended approach:`, `Evidence:`, "
                "and `Caveats:`."
            ),
            prompt=(
                f"Scope: {scope_line}\n"
                f"Conversation:\n{_format_history(conversation)}\n\n"
                f"Planner summary:\n{plan_summary}\n\n"
                f"Execution summary:\n{execution_summary}\n\n"
                f"Question:\n{query}\n\n"
                f"Evidence blocks:\n{context_blocks}"
            ),
            max_output_tokens=650,
        )

    def generate_validation_queries(
        self,
        query: str,
        draft_answer: str,
        validation_focus: list[str],
        limit: int,
    ) -> list[str]:
        payload = self._generate_json(
            system_instruction=(
                "You are the Validation Agent. Produce alternate retrieval queries for cross-checking "
                "the draft answer. Queries should target factual weak points, competing explanations, "
                "or missing evidence."
            ),
            prompt=(
                "Return strict JSON with schema:\n"
                '{ "queries": ["query one", "query two"] }\n\n'
                f"Original query:\n{query}\n\n"
                f"Draft answer:\n{draft_answer}\n\n"
                f"Validation focus:\n{json.dumps(validation_focus)}\n\n"
                f"Return at most {limit} queries."
            ),
            max_output_tokens=220,
        )
        queries = payload.get("queries", [])
        if not isinstance(queries, list):
            return []
        cleaned: list[str] = []
        for item in queries:
            if isinstance(item, str):
                stripped = item.strip()
                if stripped:
                    cleaned.append(stripped)
        return cleaned[:limit]

    def validate_answer(
        self,
        query: str,
        draft_answer: str,
        validation_focus: list[str],
        context_blocks: str,
    ) -> dict[str, Any]:
        return self._generate_json(
            system_instruction=(
                "You are the final Validation Agent in an ALD retrieval system. Review the draft answer "
                "against the supplied evidence. Check factual grounding, logical consistency, and cross-"
                "verification. If the answer is materially unsupported or misleading, provide a corrected "
                "answer that preserves the sectioned format."
            ),
            prompt=(
                "Return strict JSON with schema:\n"
                "{\n"
                '  "factual_grounding": "pass|warning|fail",\n'
                '  "logical_consistency": "pass|warning|fail",\n'
                '  "cross_verification": "pass|warning|fail",\n'
                '  "issues": ["issue"],\n'
                '  "summary": "short validation summary",\n'
                '  "verdict": "pass|warning|fail",\n'
                '  "revised_answer": "corrected answer or empty string"\n'
                "}\n\n"
                f"User query:\n{query}\n\n"
                f"Validation focus:\n{json.dumps(validation_focus)}\n\n"
                f"Draft answer:\n{draft_answer}\n\n"
                f"Evidence blocks:\n{context_blocks}"
            ),
            max_output_tokens=800,
        )
