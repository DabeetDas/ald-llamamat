import os
import json
import time
from dotenv import load_dotenv
from pinecone import Pinecone

# Load environment variables
load_dotenv('.env')
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not PINECONE_API_KEY:
    print("ERROR: Please ensure PINECONE_API_KEY is set in your .env file.")
    exit(1)

print("Initializing Pinecone Client...")
pc = Pinecone(api_key=PINECONE_API_KEY)

# Index to use
index_name = "ald-llamamat"

existing_indexes = [idx.name for idx in pc.list_indexes()]
if index_name not in existing_indexes:
    print(f"Index '{index_name}' not found. Please create it in the Pinecone dashboard.")
    print("CRITICAL: Make sure to set the Dimension to 1024 for llama-text-embed-v2!")
    exit(1)

index = pc.Index(index_name)

# Paths
REPO_ROOT = os.getcwd()
EXTRACTED_METADATA_DIR = os.path.join(REPO_ROOT, 'qwen_extracted_info')
EMBED_MODEL = "llama-text-embed-v2"
EMBED_BATCH_SIZE = 20
UPSERT_BATCH_SIZE = 100
MAX_EMBED_RETRIES = 5
RATE_LIMIT_SLEEP_SECONDS = 65
PAPER_SOURCES = [
    {
        "name": "Data",
        "data_dir": os.path.join(REPO_ROOT, 'Data'),
        "extracted_data_dir": EXTRACTED_METADATA_DIR,
    },
    {
        "name": "Data_Unpaywall_OA",
        "data_dir": os.path.join(REPO_ROOT, 'Data_Unpaywall_OA'),
        "extracted_data_dir": EXTRACTED_METADATA_DIR,
    },
]
SOURCE_FILTER = os.getenv("PINECONE_SOURCE")

if SOURCE_FILTER:
    PAPER_SOURCES = [
        source for source in PAPER_SOURCES
        if source["name"] == SOURCE_FILTER
    ]
    if not PAPER_SOURCES:
        print(f"ERROR: Unknown PINECONE_SOURCE '{SOURCE_FILTER}'.")
        exit(1)

def chunk_text(text, chunk_size=300, overlap=50):
    """Word-based chunking strategy."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks


def discover_papers(source):
    """Return paper ids for one corpus source."""
    discover_dir = source["data_dir"]

    if not os.path.isdir(discover_dir):
        print(f"Warning: {source['name']} discovery directory not found: {discover_dir}")
        return []

    paper_ids = [
        d for d in os.listdir(discover_dir)
        if os.path.isdir(os.path.join(discover_dir, d))
    ]
    paper_ids.sort()
    print(f"Found {len(paper_ids)} target papers in {source['name']}.")
    return paper_ids


def load_summary_metadata(summary_path, paper_id):
    material = "Unknown"
    process = "Unknown"

    if os.path.exists(summary_path):
        try:
            with open(summary_path, 'r', encoding='utf-8') as sf:
                summary_data = json.load(sf)
            material = summary_data.get('target_material', 'Unknown')
            process = summary_data.get('process_type', 'Unknown')
        except Exception as e:
            print(f"  Warning: Could not read summary.json for {paper_id}: {e}")

    return material, process


def is_rate_limit_error(error):
    message = str(error)
    return "429" in message or "RESOURCE_EXHAUSTED" in message or "Too Many Requests" in message


def embed_chunks(chunks, paper_id):
    embeddings = []

    for start in range(0, len(chunks), EMBED_BATCH_SIZE):
        chunk_batch = chunks[start:start + EMBED_BATCH_SIZE]

        for attempt in range(1, MAX_EMBED_RETRIES + 1):
            try:
                batch_embeddings = pc.inference.embed(
                    model=EMBED_MODEL,
                    inputs=chunk_batch,
                    parameters={"input_type": "passage", "truncate": "END"}
                )
                embeddings.extend(batch_embeddings)
                break
            except Exception as e:
                if is_rate_limit_error(e) and attempt < MAX_EMBED_RETRIES:
                    print(
                        f"  Rate limit while embedding {paper_id}; "
                        f"sleeping {RATE_LIMIT_SLEEP_SECONDS}s before retry {attempt + 1}/{MAX_EMBED_RETRIES}..."
                    )
                    time.sleep(RATE_LIMIT_SLEEP_SECONDS)
                    continue
                raise

    return embeddings


def upsert_vectors(vectors):
    upserted_count = 0

    for i in range(0, len(vectors), UPSERT_BATCH_SIZE):
        batch = vectors[i:i + UPSERT_BATCH_SIZE]
        print(f"Upserting {len(batch)} vectors...")
        index.upsert(vectors=batch)
        upserted_count += len(batch)

    return upserted_count


total_vectors_upserted = 0

for source in PAPER_SOURCES:
    for paper_id in discover_papers(source):
        content_path = os.path.join(source["data_dir"], paper_id, 'content.txt')

        if not os.path.exists(content_path):
            print(f"Missing text file: {content_path}")
            continue

        with open(content_path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()

        # Extract structural metadata from summary.json
        summary_path = os.path.join(source["extracted_data_dir"], paper_id, 'summary.json')
        material, process = load_summary_metadata(summary_path, paper_id)

        chunks = chunk_text(text, chunk_size=300, overlap=50)
        if not chunks:
            print(f"[{paper_id}] No text chunks generated; skipping.")
            continue

        print(f"[{paper_id}] Generating embeddings for {len(chunks)} chunks...")

        # Generate embeddings using Pinecone Inference API
        try:
            embeddings = embed_chunks(chunks, paper_id)

            vectors_to_upsert = []
            for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
                vectors_to_upsert.append({
                    "id": f"{paper_id}-chunk-{i}",
                    "values": embedding.values,
                    "metadata": {
                        "paper_id": paper_id,
                        "source": source["name"],
                        "target_material": material,
                        "process_type": process,
                        "text": chunk
                    }
                })
            total_vectors_upserted += upsert_vectors(vectors_to_upsert)
        except Exception as e:
            print(f"  Error generating embeddings for {paper_id}: {e}")
            continue

print(f"\nTotal vectors upserted: {total_vectors_upserted}")

print("Successfully injected all contexts into Pinecone using llama-text-embed-v2!")
