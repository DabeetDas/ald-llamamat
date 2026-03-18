import os
import json
import traceback
import time
import random
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from tools import (
    read_fulltext,
    summariser_agent,
    target_materials_agent,
    precurosr_coreactant_purge_agent,
    deposition_conditions_agent,
    reaction_conditions_agent,
    reaction_kinetics_agent,
    reaction_thermodynamics_agent,
    substrate_information_agent,
    growth_per_cycle_agent,
    film_properties_agent,
    characterization_agent,
)

# === Gemini API config ===
load_dotenv()
gemini_api_key = os.environ["GEMINI_API_KEY"]
model_name = "gemini-2.0-flash"

# === All ALD extraction agents ===
AGENTS = {
    "summary":              summariser_agent,
    "target_material":      target_materials_agent,
    "precursor_coreactant": precurosr_coreactant_purge_agent,
    "deposition_conditions":deposition_conditions_agent,
    "reaction_conditions":  reaction_conditions_agent,
    "reaction_kinetics":    reaction_kinetics_agent,
    "reaction_thermodynamics": reaction_thermodynamics_agent,
    "substrate_info":       substrate_information_agent,
    "growth_per_cycle":     growth_per_cycle_agent,
    "film_properties":      film_properties_agent,
    "characterization":     characterization_agent,
}


def make_llm():
    """Create a fresh Gemini LLM instance (one per thread to avoid contention)."""
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=gemini_api_key,
        temperature=0.001,
        max_output_tokens=2048,
    )


def run_single_agent(agent_name, agent_fn, fulltext, llm):
    """Run one agent and return (agent_name, result_dict)."""
    try:
        result = agent_fn(fulltext, llm)
        return agent_name, result, None
    except Exception as e:
        return agent_name, None, str(e)


def process_paper(folder: Path, output_dir: Path):
    """Run all 11 agents in parallel on a single paper folder."""
    txt_path = folder / "content.txt"
    if not txt_path.exists():
        print(f"⏭️  Skipping {folder.name}: no content.txt")
        return False

    fulltext = read_fulltext(str(txt_path))
    if not fulltext or not fulltext.strip():
        print(f"⏭️  Skipping {folder.name}: content.txt is empty")
        return False

    print(f"🚀 Processing {folder.name} ({len(fulltext):,} chars) ...")

    # Run all agents in parallel (each gets its own LLM instance)
    results = {}
    errors = {}

    with ThreadPoolExecutor(max_workers=len(AGENTS)) as pool:
        futures = {
            pool.submit(run_single_agent, name, fn, fulltext, make_llm()): name
            for name, fn in AGENTS.items()
        }
        for future in as_completed(futures):
            agent_name = futures[future]
            name, result, error = future.result()
            if error:
                errors[name] = error
                print(f"   ❌ {name} failed: {error}")
            else:
                results[name] = result
                print(f"   ✅ {name}")

    # Save each agent's output to Agentic_Extraction/<paper_name>/
    paper_out = output_dir / folder.name
    paper_out.mkdir(parents=True, exist_ok=True)

    for agent_name, data in results.items():
        out_path = paper_out / f"{agent_name}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    if errors:
        err_path = paper_out / "agent_errors.json"
        with open(err_path, "w", encoding="utf-8") as f:
            json.dump(errors, f, indent=2)

    print(f"✅ Done: {folder.name} — {len(results)} succeeded, {len(errors)} failed\n")
    return True


# === Main loop ===
if __name__ == "__main__":
    base_dir = Path("../Data")
    output_dir = Path("../Agentic_Extraction")
    output_dir.mkdir(parents=True, exist_ok=True)
    completed_log = Path("completed_folders_gemini.txt")
    failed_log = Path("failed_folders_gemini.txt")
    max_new_folders = 4000
    new_count = 0

    # Load already-processed folder names
    completed_folders = set()
    failed_folders = set()
    if completed_log.exists():
        with open(completed_log, "r") as f:
            completed_folders = set(line.strip() for line in f)
    if failed_log.exists():
        with open(failed_log, "r") as f:
            failed_folders = set(line.strip() for line in f)

    # Iterate over paper folders
    folders = sorted(base_dir.iterdir(), key=lambda p: p.name)
    for folder in folders[0:2]:
        if not folder.is_dir():
            continue
        if folder.name in completed_folders or folder.name in failed_folders:
            continue

        try:
            success = process_paper(folder, output_dir)
            if success:
                with open(completed_log, "a") as f:
                    f.write(f"{folder.name}\n")
                new_count += 1
            else:
                with open(failed_log, "a") as f:
                    f.write(f"{folder.name}\n")

        except Exception as e:
            print(f"⚠️  Failed on {folder.name}: {e}")
            traceback.print_exc()
            with open(failed_log, "a") as f:
                f.write(f"{folder.name}\n")

        # Short delay between papers (Gemini rate limits)
        t = random.uniform(3, 6)
        print(f"Sleeping {t:.1f}s before next paper...")
        time.sleep(t)

        # Cooldown every 10 papers
        if new_count > 0 and new_count % 10 == 0:
            print(f"🕐 Processed {new_count} papers — cooling down for 30s...")
            time.sleep(30)
            print("Cooldown finished. Resuming...\n")

        if new_count >= max_new_folders:
            print(f"🔚 Reached limit of {max_new_folders} folders.")
            break

    print(f"\n🏁 Finished. Processed {new_count} new papers total.")
