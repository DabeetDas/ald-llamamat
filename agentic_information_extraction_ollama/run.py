import argparse
import json
import os
import threading
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from ollama import chat
from tqdm import tqdm

from tools import (
    characterization_agent,
    deposition_conditions_agent,
    film_properties_agent,
    precurosr_coreactant_purge_agent,
    reaction_conditions_agent,
    read_fulltext,
    substrate_information_agent,
    summariser_agent,
    target_materials_agent,
)
from validation import classify_validation_issues, default_output, validate_paper_outputs


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent

DEFAULT_MODEL_ID = "llama3.2:3b-instruct-q4_K_M"
MODEL_ID = os.getenv("OLLAMA_MODEL_ID", DEFAULT_MODEL_ID)
MAX_NEW_TOKENS = 4096
OLLAMA_NUM_CTX = int(os.getenv("OLLAMA_NUM_CTX", "32768"))


class OllamaLLM:
    def __init__(
        self,
        model_name: str | None = None,
        max_new_tokens: int = MAX_NEW_TOKENS,
        num_ctx: int = OLLAMA_NUM_CTX,
    ):
        self.model_name = model_name or MODEL_ID
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


_shared_llm: OllamaLLM | None = None
_model_lock = threading.Lock()


def make_llm() -> OllamaLLM:
    global _shared_llm
    if _shared_llm is None:
        print(f"Using Ollama with model: {MODEL_ID} (num_ctx={OLLAMA_NUM_CTX})")
        _shared_llm = OllamaLLM()
    return _shared_llm


def set_model_id(model_id: str | None) -> None:
    global MODEL_ID, _shared_llm
    if model_id:
        MODEL_ID = model_id
        _shared_llm = None


AGENTS = {
    "summary": summariser_agent,
    "target_material": target_materials_agent,
    "precursor_coreactant": precurosr_coreactant_purge_agent,
    "deposition_conditions": deposition_conditions_agent,
    "reaction_conditions": reaction_conditions_agent,
    "substrate_info": substrate_information_agent,
    "film_properties": film_properties_agent,
    "characterization": characterization_agent,
}


def run_single_agent(agent_name, agent_fn, fulltext, llm):
    """Run one agent and return (agent_name, result, error)."""
    try:
        with _model_lock:
            result = agent_fn(fulltext, llm)
        return agent_name, result, None
    except Exception as exc:
        return agent_name, default_output(agent_name), str(exc)


def process_paper(folder: Path, output_dir: Path):
    """Run all agents on a single paper folder and validate the results."""
    txt_path = folder / "content.txt"
    if not txt_path.exists():
        print(f"⏭️  Skipping {folder.name}: no content.txt")
        return {
            "status": "failed",
            "results": {},
            "errors": {"paper": "Missing content.txt"},
            "validation_issues": {},
        }

    fulltext = read_fulltext(str(txt_path))
    if not fulltext or not fulltext.strip():
        print(f"⏭️  Skipping {folder.name}: content.txt is empty")
        return {
            "status": "failed",
            "results": {},
            "errors": {"paper": "Empty content.txt"},
            "validation_issues": {},
        }

    print(f"🚀 Processing {folder.name} ({len(fulltext):,} chars) ...")

    results: dict[str, object] = {}
    errors: dict[str, str] = {}
    llm = make_llm()

    with ThreadPoolExecutor(max_workers=len(AGENTS)) as pool:
        futures = {
            pool.submit(run_single_agent, name, fn, fulltext, llm): name
            for name, fn in AGENTS.items()
        }
        for future in as_completed(futures):
            name, result, error = future.result()
            results[name] = result
            if error:
                errors[name] = error
                print(f"   ❌ {name} failed: {error}")
            else:
                print(f"   ✅ {name}")

    paper_out = output_dir / folder.name
    paper_out.mkdir(parents=True, exist_ok=True)

    for agent_name, data in results.items():
        out_path = paper_out / f"{agent_name}.json"
        with open(out_path, "w", encoding="utf-8") as handle:
            json.dump(data, handle, indent=2, ensure_ascii=False)

    validation_issues = validate_paper_outputs(results, fulltext)

    validation_path = paper_out / "validation_issues.json"
    if validation_issues:
        with open(validation_path, "w", encoding="utf-8") as handle:
            json.dump(validation_issues, handle, indent=2, ensure_ascii=False)
    elif validation_path.exists():
        validation_path.unlink()

    errors_path = paper_out / "agent_errors.json"
    if errors:
        with open(errors_path, "w", encoding="utf-8") as handle:
            json.dump(errors, handle, indent=2, ensure_ascii=False)
    elif errors_path.exists():
        errors_path.unlink()

    status = "completed"
    if errors:
        status = "failed"
    else:
        validation_status = classify_validation_issues(validation_issues)
        if validation_status == "flagged":
            status = "flagged"
        elif validation_status == "warning":
            status = "warning"

    issue_count = sum(len(items) for items in validation_issues.values())
    print(
        f"✅ Done: {folder.name} — {len(results)} outputs, {len(errors)} errors, "
        f"{issue_count} validation issues → {status}\n"
    )
    return {
        "status": status,
        "results": results,
        "errors": errors,
        "validation_issues": validation_issues,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run ALD extraction and flag malformed or weakly grounded outputs."
    )
    parser.add_argument("--start", type=int, default=200, help="Start index for sorted folders.")
    parser.add_argument("--stop", type=int, default=None, help="Optional stop index.")
    parser.add_argument(
        "--max-new-folders",
        type=int,
        default=4000,
        help="Maximum number of newly completed folders to process.",
    )
    parser.add_argument(
        "--folders-file",
        type=Path,
        default=None,
        help="Optional newline-delimited list of folder names to process explicitly.",
    )
    parser.add_argument(
        "--base-dir",
        type=Path,
        default=REPO_ROOT / "Data",
        help="Directory containing raw paper folders.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=REPO_ROOT / "extracted_data",
        help="Directory where extracted JSON is written.",
    )
    parser.add_argument(
        "--model",
        type=str,
        default='llama3.2:3b-instruct-q4_K_M',
        help="Optional Ollama model override. You can also use OLLAMA_MODEL_ID.",
    )
    return parser.parse_args()


def load_logged_folders(*logs: Path) -> set[str]:
    folders: set[str] = set()
    for log in logs:
        if log.exists():
            folders.update(line.strip() for line in log.read_text().splitlines() if line.strip())
    return folders


def resolve_folders(base_dir: Path, args: argparse.Namespace) -> list[Path]:
    if args.folders_file:
        folder_names = [
            line.strip()
            for line in args.folders_file.read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        return [base_dir / folder_name for folder_name in folder_names]

    folders = sorted(base_dir.iterdir(), key=lambda path: path.name)
    return folders[args.start:args.stop]


if __name__ == "__main__":
    args = parse_args()
    set_model_id(args.model)

    base_dir = args.base_dir
    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    completed_log = SCRIPT_DIR / "completed_folders_llama.txt"
    failed_log = SCRIPT_DIR / "failed_folders_llama.txt"
    flagged_log = SCRIPT_DIR / "flagged_folders_llama.txt"
    warning_log = SCRIPT_DIR / "warning_folders_llama.txt"

    skip_logged_folders = set()
    if not args.folders_file:
        skip_logged_folders = load_logged_folders(
            completed_log,
            failed_log,
            flagged_log,
            warning_log,
        )

    new_count = 0
    folders = resolve_folders(base_dir, args)

    for folder in tqdm(folders):
        if not folder.exists():
            print(f"⏭️  Skipping {folder.name}: folder not found")
            continue
        if not folder.is_dir():
            continue
        if folder.name in skip_logged_folders:
            continue
        if new_count >= args.max_new_folders:
            print(f"🔚 Reached limit of {args.max_new_folders} folders.")
            break

        try:
            outcome = process_paper(folder, output_dir)
            status = outcome["status"]
            if status == "completed":
                log_path = completed_log
            elif status == "flagged":
                log_path = flagged_log
            elif status == "warning":
                log_path = warning_log
            else:
                log_path = failed_log

            with open(log_path, "a", encoding="utf-8") as handle:
                handle.write(f"{folder.name}\n")

            if status == "completed":
                new_count += 1

        except Exception as exc:
            print(f"⚠️  Failed on {folder.name}: {exc}")
            traceback.print_exc()
            with open(failed_log, "a", encoding="utf-8") as handle:
                handle.write(f"{folder.name}\n")

        if new_count > 0 and new_count % 10 == 0:
            print(f"🕐 Processed {new_count} papers so far.\n")

    print(f"\n🏁 Finished. Processed {new_count} new papers total.")
