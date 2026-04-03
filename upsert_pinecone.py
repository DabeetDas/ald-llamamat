import os
import json
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
EXTRACTED_DATA_DIR = os.path.join(os.getcwd(), 'extracted_data')
DATA_DIR = os.path.join(os.getcwd(), 'Data')

papers_to_process = [
    d for d in os.listdir(EXTRACTED_DATA_DIR)
    if os.path.isdir(os.path.join(EXTRACTED_DATA_DIR, d))
]
print(f"Found {len(papers_to_process)} target papers in extracted_data.")

def chunk_text(text, chunk_size=300, overlap=50):
    """Word-based chunking strategy."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks

vectors_to_upsert = []

for paper_id in papers_to_process:
    content_path = os.path.join(DATA_DIR, paper_id, 'content.txt')

    if not os.path.exists(content_path):
        print(f"Missing text file: {content_path}")
        continue

    with open(content_path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Extract structural metadata from summary.json
    summary_path = os.path.join(EXTRACTED_DATA_DIR, paper_id, 'summary.json')
    material = "Unknown"
    process = "Unknown"

    if os.path.exists(summary_path):
        try:
            with open(summary_path, 'r') as sf:
                summary_data = json.load(sf)
            material = summary_data.get('target_material', 'Unknown')
            process = summary_data.get('process_type', 'Unknown')
        except Exception as e:
            print(f"  Warning: Could not read summary.json for {paper_id}: {e}")

    chunks = chunk_text(text, chunk_size=300, overlap=50)
    print(f"[{paper_id}] Generating embeddings for {len(chunks)} chunks...")

    # Generate embeddings using Pinecone Inference API
    try:
        embeddings = pc.inference.embed(
            model="llama-text-embed-v2",
            inputs=chunks,
            parameters={"input_type": "passage", "truncate": "END"}
        )
        
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            vectors_to_upsert.append({
                "id": f"{paper_id}-chunk-{i}",
                "values": embedding.values,
                "metadata": {
                    "paper_id": paper_id,
                    "target_material": material,
                    "process_type": process,
                    "text": chunk
                }
            })
    except Exception as e:
        print(f"  Error generating embeddings for {paper_id}: {e}")
        continue

print(f"\nTotal vectors generated: {len(vectors_to_upsert)}")

# Upsert in batches to avoid Pinecone limits
batch_size = 100
for i in range(0, len(vectors_to_upsert), batch_size):
    batch = vectors_to_upsert[i:i + batch_size]
    print(f"Upserting batch {i} to {min(i + batch_size, len(vectors_to_upsert))}...")
    index.upsert(vectors=batch)

print("Successfully injected all contexts into Pinecone using llama-text-embed-v2!")