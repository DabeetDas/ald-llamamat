# Agentic RAG Pipeline

Standalone backend service for the ALD-LLaMat chat assistant.

## Features

- HyDE query expansion for stronger semantic recall
- Pinecone dense retrieval over the existing `ald-llamamat` index
- Pinecone reranking with `bge-reranker-v2-m3`
- Optional paper-level scoping from the frontend
- FastAPI endpoints for health checks and chat

## Setup

Create a backend `.env` file in either the repo root or `agentic_rag_pipeline/.env`:

```env
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=ald-llamamat
PINECONE_INDEX_HOST=...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
RAG_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

`PINECONE_INDEX_HOST` is recommended for production. If it is omitted, the service falls back to targeting the index by name.

This backend now uses the official Google Gen AI Python SDK. Google’s Gemini quickstart shows `genai.Client()` with `GEMINI_API_KEY`, and the text-generation docs show `client.models.generate_content(...)` with `gemini-2.5-flash` and `GenerateContentConfig`. Sources: https://ai.google.dev/gemini-api/docs/quickstart and https://ai.google.dev/gemini-api/docs/system-instructions

## Install

```bash
pip install -r agentic_rag_pipeline/requirements.txt
```

If you previously installed `pinecone-client`, remove it first:

```bash
pip uninstall pinecone-client
```

## Run

From the repository root:

```bash
uvicorn agentic_rag_pipeline.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `POST /api/chat`

Example request body:

```json
{
  "query": "Compare common oxidants used for Al2O3 growth",
  "conversation": [
    { "role": "user", "content": "Start with Al2O3 papers" }
  ],
  "scope_paper_id": "paper12"
}
```
