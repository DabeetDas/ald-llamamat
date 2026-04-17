import os
import json
import threading
import traceback
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

from ollama import chat

from tools import (
    read_fulltext,
    summariser_agent,
    target_materials_agent,
    precurosr_coreactant_purge_agent,
    deposition_conditions_agent,
    reaction_conditions_agent,
    substrate_information_agent,
    film_properties_agent,
    characterization_agent,
)

from tqdm import tqdm

# ── Model config ─────────────────────────────────────────────────────────────
MODEL_ID = "llama3.2:3b-instruct-q4_K_M"
MAX_NEW_TOKENS = 4096
OLLAMA_NUM_CTX = int(os.getenv("OLLAMA_NUM_CTX", "16384"))

class OllamaLLM:
    def __init__(
        self,
        model_name: str = MODEL_ID,
        max_new_tokens: int = MAX_NEW_TOKENS,
        num_ctx: int = OLLAMA_NUM_CTX,
    ):
        self.model_name = model_name
        self.max_new_tokens = max_new_tokens
        self.num_ctx = num_ctx

    def invoke(self, prompt: str):
        response = chat(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            format="json",
            options={
                "num_ctx": self.num_ctx,
                "num_predict": self.max_new_tokens,
                "temperature": 0,
                "top_p": 1,
                "seed": 0,
            },
        )
        message = getattr(response, "message", None)
        content = getattr(message, "content", None)
        if content is None and isinstance(response, dict):
            content = response.get("message", {}).get("content", "")
        return type("AIMessage", (), {"content": content or ""})()


print(f"Using Ollama with model: {MODEL_ID} (num_ctx={OLLAMA_NUM_CTX})")
_shared_llm = OllamaLLM()


def make_llm() -> OllamaLLM:
    """Return the shared OllamaLLM instance."""
    return _shared_llm


_model_lock = threading.Lock()


# ── Agent registry ───────────────────────────────────────────────────────────
AGENTS = {
    "summary":               summariser_agent,
    "target_material":       target_materials_agent,
    "precursor_coreactant":  precurosr_coreactant_purge_agent,
    "deposition_conditions": deposition_conditions_agent,
    "reaction_conditions":   reaction_conditions_agent,
    "substrate_info":        substrate_information_agent,
    "film_properties":       film_properties_agent,
    "characterization":      characterization_agent,
}


def run_single_agent(agent_name, agent_fn, fulltext, llm):
    """Run one agent and return (agent_name, result, error)."""
    try:
        # Ollama serves a shared local model; serializing requests keeps large
        # prompts from contending for context/window state and mirrors the
        # working HF path more closely.
        with _model_lock:
            result = agent_fn(fulltext, llm)
        return agent_name, result, None
    except Exception as e:
        return agent_name, None, str(e)


def process_paper(folder: Path, output_dir: Path):
    """Run all agents on a single paper folder."""
    txt_path = folder / "content.txt"
    if not txt_path.exists():
        print(f"⏭️  Skipping {folder.name}: no content.txt")
        return False

    fulltext = read_fulltext(str(txt_path))
    if not fulltext or not fulltext.strip():
        print(f"⏭️  Skipping {folder.name}: content.txt is empty")
        return False

    print(f"🚀 Processing {folder.name} ({len(fulltext):,} chars) ...")

    results, errors = {}, {}
    llm = make_llm()

    with ThreadPoolExecutor(max_workers=len(AGENTS)) as pool:
        futures = {
            pool.submit(run_single_agent, name, fn, fulltext, llm): name
            for name, fn in AGENTS.items()
        }
        for future in as_completed(futures):
            name, result, error = future.result()
            if error:
                errors[name] = error
                print(f"   ❌ {name} failed: {error}")
            else:
                results[name] = result
                print(f"   ✅ {name}")

    paper_out = output_dir / folder.name
    paper_out.mkdir(parents=True, exist_ok=True)

    for agent_name, data in results.items():
        out_path = paper_out / f"{agent_name}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    if errors:
        with open(paper_out / "agent_errors.json", "w", encoding="utf-8") as f:
            json.dump(errors, f, indent=2)

    print(f"✅ Done: {folder.name} — {len(results)} succeeded, {len(errors)} failed\n")
    return True


# ── Main loop ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    
    base_dir   = Path("../Data")
    output_dir = Path("../extracted_data")

    output_dir.mkdir(parents=True, exist_ok=True)

    completed_log = Path("completed_folders_llama.txt")
    failed_log    = Path("failed_folders_llama.txt")
    max_new_folders = 4000
    new_count = 0

    completed_folders: set[str] = set()
    failed_folders: set[str] = set()
    if completed_log.exists():
        completed_folders = set(completed_log.read_text().splitlines())
    if failed_log.exists():
        failed_folders = set(failed_log.read_text().splitlines())

    folders = sorted(base_dir.iterdir(), key=lambda p: p.name)
    for folder in tqdm(folders[100:200]): 
        if not folder.is_dir():
            continue
        if folder.name in completed_folders or folder.name in failed_folders:
            continue

        # FIX: check limit BEFORE processing, not after, to avoid overshooting
        if new_count >= max_new_folders:
            print(f"🔚 Reached limit of {max_new_folders} folders.")
            break

        try:
            success = process_paper(folder, output_dir)
            log_path = completed_log if success else failed_log
            with open(log_path, "a") as f:
                f.write(f"{folder.name}\n")
            if success:
                new_count += 1

        except Exception as e:
            print(f"⚠️  Failed on {folder.name}: {e}")
            traceback.print_exc()
            with open(failed_log, "a") as f:
                f.write(f"{folder.name}\n")

        if new_count > 0 and new_count % 10 == 0:
            print(f"🕐 Processed {new_count} papers so far.\n")

    print(f"\n🏁 Finished. Processed {new_count} new papers total.")
