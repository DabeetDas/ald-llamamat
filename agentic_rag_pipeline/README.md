# Agentic RAG Pipeline

Standalone backend service for the ALD-LLaMat chat assistant.

## Architecture

The backend now runs an explicit agentic pipeline:

`User Query -> Strategic Agent -> Executor -> Synthesizer -> Validation Agent`

- `Strategic Agent`
  Creates a complete plan for the query.
  Produces:
  - query analysis
  - ordered tool steps
  - synthesis goal
  - validation focus
- `Executor`
  Uses a ReWOO-style execution loop.
  - no free-form reasoning
  - resolves plan references like `#E1.field`
  - executes tools deterministically
- `Synthesizer`
  Generates the final answer from tool outputs only.
- `Validation Agent`
  Performs:
  - factual grounding checks
  - logical consistency checks
  - cross-verification with alternate retrieval queries

## Tools

- `rag_search`
  Wraps the existing HyDE + Pinecone retrieval + reciprocal-rank fusion + reranking pipeline.
- `wikipedia_lookup`
  Fetches concise background context from Wikipedia for broad or definitional questions.

## API Response

`POST /api/chat` still returns:

- `answer`
- `sources`
- `diagnostics`

It now also includes:

- `plan`
- `execution`
- `validation`

This keeps the existing frontend compatible while exposing the agent trace.

## Setup

Create a backend `.env` file in either the repo root or `agentic_rag_pipeline/.env`:

```env
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=ald-llamamat
PINECONE_INDEX_HOST=...
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
RAG_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
RAG_WIKIPEDIA_ENABLED=true
AGENTIC_MAX_PLAN_STEPS=5
AGENTIC_VALIDATION_ENABLED=true
AGENTIC_VALIDATION_QUERY_LIMIT=2
```

`PINECONE_INDEX_HOST` is recommended for production. If it is omitted, the service falls back to targeting the index by name.

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

## Docker

Build the backend image directly from the `agentic_rag_pipeline` folder:

```bash
docker build -t ald-rag-backend ./agentic_rag_pipeline
```

Run it with your env file:

```bash
docker run --env-file .env -p 8000:8000 ald-rag-backend
```

If your deployment platform injects a `PORT` variable, the container will honor it automatically. Otherwise it serves on port `8000`.

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
