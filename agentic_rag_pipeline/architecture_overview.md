# ALD-LLaMat: Agentic RAG Architecture Overview

This document outlines the end-to-end architecture of the `agentic_rag_pipeline`, a sophisticated materials-science retrieval system designed for the Atomic Layer Deposition (ALD) domain.

## Overall Pipeline Flow

The pipeline follows a multi-agent "Strategic Agent" pattern, similar to ReWOO, where planning is separated from execution and final synthesis.

1.  **Query Input**: A user sends a query via the `/api/chat` FastAPI endpoint.
2.  **Strategic Planning**: The **Planner Agent** (initially Gemini) analyzes the query and context to create a multi-step [AgentPlan](file:///home/dabeet/Desktop/ald-llamamat/data-visulisation/app/components/ChatAssistant.tsx#43-50).
3.  **Sequential Execution**: The **Executor** iterates through the plan. It resolves dependencies between steps and calls the appropriate tools ([rag_search](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py#316-372) or [wikipedia_lookup](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py#434-482)).
4.  **Advanced Retrieval (RAG)**: The [rag_search](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py#316-372) tool uses a hybrid approach:
    *   **HyDE**: Generates a hypothetical ALD paragraph to bridge the semantic gap between the query and professional literature.
    *   **RRF**: Fuses results from the original query and the HyDE document.
    *   **Reranking**: Scores candidates using a cross-encoder model to return the top 5 most relevant evidence chunks.
5.  **Evidence Synthesis**: The **Synthesizer Agent** receives the evidence pack and constructs a structured, cited answer.
6.  **Fact Verification**: The **Validation Agent** audits the draft answer against the raw evidence, checking for hallucinations or logical errors, and provides a polished final verdict/revision.

---

## Core Components

### 1. API Entry Point ([main.py](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/main.py))
- **Framework**: FastAPI.
- **Role**: Handles CORS, routing, and error mapping.
- **Endpoints**: 
  - `POST /api/chat`: The primary entry point for the agentic loop.

### 2. Orchestration Service ([service.py](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py))
- **Role**: The brain of the pipeline. It manages the lifecycle of a request, from loading settings to coordinating agents and tools.
- **Tools**:
  - [rag_search](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py#316-372): Complex retrieval logic using Pinecone.
  - [wikipedia_lookup](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/service.py#434-482): REST-based lookup for general background context.
- **Logic**: Implements template-based dependency resolution (e.g., `#E1.field`) between execution steps.

### 3. LLM Wrapper ([llm.py](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/llm.py))
- **SDK**: `google-genai` (Gemini API).
- **Agents & Instructions**:
  - **Planner**: Dependency-aware step decomposition.
  - **HyDE Generator**: Hypothetical document creation for retrieval.
  - **Synthesizer**: Scientific evidence synthesis with strict citation rules.
  - **Validator**: Adversarial audit of the synthesized text.

### 4. Configuration Layer ([settings.py](file:///home/dabeet/Desktop/ald-llamamat/agentic_rag_pipeline/settings.py))
- **Role**: Centralized environment management.
- **Key Parameters**:
  - RAG thresholds (Top-K, RRF-K).
  - Feature flags (HyDE enabled, Wikipedia enabled, Validation enabled).
  - Model identifiers.

---

## Model Stack

| Role | Provider | Default Model |
| :--- | :--- | :--- |
| **Primary LLM** | Google Gemini | `gemini-2.0-flash` |
| **Embedding** | Pinecone Inference | `llama-text-embed-v2` |
| **Reranking** | Pinecone Inference | `bge-reranker-v2-m3` |

---

## Key Technical Patterns

### Hybrid Retrieval (HyDE + RRF)
Instead of a simple vector search, the system:
1.  Embeds the user query.
2.  Generates a hypothetical "perfect match" answer (HyDE).
3.  Embeds the HyDE document.
4.  Queries Pinecone with both.
5.  Uses **Reciprocal Rank Fusion (RRF)** to combine the results, ensuring that documents appearing in both (or at high ranks in either) are prioritized.

### ReWOO-style Planning
The system separates reasoning from action. The Planner emits a static DAG (Directed Acyclic Graph) of steps. This allows for:
- Pre-execution validation of the plan.
- Parallelizable tool calls (in future versions).
- Clear transparency into *why* a certain tool was used.

### Factual Guardrails (Validation)
The Validation Agent is specifically instructed to check for ALD-specific domain common errors, such as:
- Conflating Thermal ALD with PE-ALD.
- Misinterpreting GPC-Temperature correlations.
- Hallucinating numeric bounds that aren't in the RAG chunks.
