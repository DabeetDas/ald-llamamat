import argparse
import json
import os
import threading
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

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

DEFAULT_MODEL_ID = (
    os.getenv("TRANSFORMERS_MODEL_PATH")
    or os.getenv("TRANSFORMERS_MODEL_ID")
    or "Qwen/Qwen3-8B"
)
MODEL_ID = DEFAULT_MODEL_ID
MAX_NEW_TOKENS = int(os.getenv("TRANSFORMERS_MAX_NEW_TOKENS", "4096"))
DEFAULT_MAX_INPUT_TOKENS = int(os.getenv("TRANSFORMERS_MAX_INPUT_TOKENS", "32768"))
MAX_INPUT_TOKENS = DEFAULT_MAX_INPUT_TOKENS
DEVICE_MAP = os.getenv("TRANSFORMERS_DEVICE_MAP", "auto")
TORCH_DTYPE = os.getenv("TRANSFORMERS_TORCH_DTYPE", "auto")
LOCAL_FILES_ONLY = os.getenv("TRANSFORMERS_LOCAL_FILES_ONLY", "1").lower() in {
    "1",
    "true",
    "yes",
}
TRUST_REMOTE_CODE = os.getenv("TRANSFORMERS_TRUST_REMOTE_CODE", "0").lower() in {
    "1",
    "true",
    "yes",
}
LOAD_IN_4BIT = os.getenv("TRANSFORMERS_LOAD_IN_4BIT", "0").lower() in {
    "1",
    "true",
    "yes",
}
LOAD_IN_8BIT = os.getenv("TRANSFORMERS_LOAD_IN_8BIT", "0").lower() in {
    "1",
    "true",
    "yes",
}
ENABLE_THINKING = os.getenv("TRANSFORMERS_ENABLE_THINKING", "0").lower() in {
    "1",
    "true",
    "yes",
}

torch = None
AutoModelForCausalLM = None
AutoTokenizer = None
BitsAndBytesConfig = None


def ensure_transformers_imports() -> None:
    global torch, AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
    if torch is not None:
        return
    try:
        import torch as torch_module
        from transformers import (
            AutoModelForCausalLM as auto_model_for_causal_lm,
            AutoTokenizer as auto_tokenizer,
            BitsAndBytesConfig as bits_and_bytes_config,
        )
    except (ImportError, ModuleNotFoundError) as exc:
        missing = exc.name or "required package"
        raise ModuleNotFoundError(
            f"Missing dependency '{missing}'. Install torch and transformers before "
            "running run_transformers.py for inference."
        ) from exc

    torch = torch_module
    AutoModelForCausalLM = auto_model_for_causal_lm
    AutoTokenizer = auto_tokenizer
    BitsAndBytesConfig = bits_and_bytes_config


def is_gguf_file(path: Path) -> bool:
    try:
        with open(path, "rb") as handle:
            return handle.read(4) == b"GGUF"
    except OSError:
        return False


def resolve_transformers_model_source(model_ref: str, local_files_only: bool) -> str:
    path = Path(model_ref).expanduser()
    if path.exists():
        resolved_path = path.resolve()
        if resolved_path.is_file():
            if is_gguf_file(resolved_path):
                raise ValueError(
                    f"{resolved_path} is a GGUF file. This runner now expects a local "
                    "Transformers checkpoint directory containing files such as "
                    "config.json, tokenizer_config.json, and safetensors shards. "
                    "Use agentic_information_extraction_ollama/run.py for Ollama models."
                )
            raise ValueError(
                f"{resolved_path} is a file. Pass the directory that contains the "
                "downloaded Transformers model files."
            )
        return str(resolved_path)

    if local_files_only:
        raise FileNotFoundError(
            f"Model path not found: {path}. Pass your downloaded qwen3-8b-4bit "
            "directory with --model, or set TRANSFORMERS_MODEL_PATH."
        )

    return model_ref


def build_quantization_config(load_in_4bit: bool, load_in_8bit: bool):
    if load_in_4bit and load_in_8bit:
        raise ValueError("Choose only one of --load-in-4bit or --load-in-8bit.")
    if not load_in_4bit and not load_in_8bit:
        return None

    ensure_transformers_imports()
    if load_in_4bit:
        return BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
        )
    return BitsAndBytesConfig(load_in_8bit=True)


def model_input_device(model):
    try:
        return model.get_input_embeddings().weight.device
    except Exception:
        return next(model.parameters()).device


def apply_chat_template(tokenizer, messages, max_input_tokens: int, enable_thinking: bool):
    template_kwargs = {
        "add_generation_prompt": True,
        "return_tensors": "pt",
        "truncation": True,
        "max_length": max_input_tokens,
    }
    if enable_thinking:
        return tokenizer.apply_chat_template(messages, **template_kwargs)

    try:
        return tokenizer.apply_chat_template(messages, enable_thinking=False, **template_kwargs)
    except TypeError:
        return tokenizer.apply_chat_template(messages, **template_kwargs)


class TransformersLLM:
    def __init__(
        self,
        model_name: str | None = None,
        max_new_tokens: int | None = None,
        max_input_tokens: int | None = None,
        device_map: str | None = None,
        torch_dtype: str | None = None,
        trust_remote_code: bool | None = None,
        load_in_4bit: bool | None = None,
        load_in_8bit: bool | None = None,
        local_files_only: bool | None = None,
        enable_thinking: bool | None = None,
    ):
        self.requested_model = model_name or MODEL_ID
        self.max_new_tokens = max_new_tokens or MAX_NEW_TOKENS
        self.max_input_tokens = max_input_tokens or MAX_INPUT_TOKENS
        self.device_map = device_map or DEVICE_MAP
        self.torch_dtype = parse_torch_dtype(torch_dtype or TORCH_DTYPE)
        self.trust_remote_code = TRUST_REMOTE_CODE if trust_remote_code is None else trust_remote_code
        self.load_in_4bit = LOAD_IN_4BIT if load_in_4bit is None else load_in_4bit
        self.load_in_8bit = LOAD_IN_8BIT if load_in_8bit is None else load_in_8bit
        self.local_files_only = LOCAL_FILES_ONLY if local_files_only is None else local_files_only
        self.enable_thinking = ENABLE_THINKING if enable_thinking is None else enable_thinking
        self.model_source: str | None = None
        self.tokenizer = None
        self.model = None

    def load(self) -> None:
        if self.model is not None:
            return

        ensure_transformers_imports()
        self.model_source = resolve_transformers_model_source(
            self.requested_model,
            self.local_files_only,
        )
        tokenizer_kwargs = {
            "trust_remote_code": self.trust_remote_code,
            "local_files_only": self.local_files_only,
        }
        model_kwargs = {
            "device_map": self.device_map,
            "trust_remote_code": self.trust_remote_code,
            "local_files_only": self.local_files_only,
        }
        if self.torch_dtype is not None:
            model_kwargs["torch_dtype"] = self.torch_dtype
        quantization_config = build_quantization_config(self.load_in_4bit, self.load_in_8bit)
        if quantization_config is not None:
            model_kwargs["quantization_config"] = quantization_config

        print(
            "Using transformers with model: "
            f"{self.model_source} (max_input_tokens={self.max_input_tokens}, "
            f"max_new_tokens={self.max_new_tokens})"
        )
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_source, **tokenizer_kwargs)
        if self.tokenizer.pad_token_id is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        self.model = AutoModelForCausalLM.from_pretrained(self.model_source, **model_kwargs)
        self.model.eval()

    def invoke(self, prompt: str):
        self.load()
        assert self.model is not None
        assert self.tokenizer is not None

        messages = [
            {
                "role": "user",
                "content": prompt + "\n\nReturn only valid JSON. Do not include markdown.",
            }
        ]
        if getattr(self.tokenizer, "chat_template", None):
            input_ids = apply_chat_template(
                self.tokenizer,
                messages,
                self.max_input_tokens,
                self.enable_thinking,
            )
            inputs = {"input_ids": input_ids}
        else:
            inputs = self.tokenizer(
                messages[0]["content"],
                return_tensors="pt",
                truncation=True,
                max_length=self.max_input_tokens,
            )

        input_device = model_input_device(self.model)
        inputs = {key: value.to(input_device) for key, value in inputs.items()}
        with torch.inference_mode():
            generated = self.model.generate(
                **inputs,
                max_new_tokens=self.max_new_tokens,
                do_sample=False,
                pad_token_id=self.tokenizer.pad_token_id,
                eos_token_id=self.tokenizer.eos_token_id,
            )

        prompt_tokens = inputs["input_ids"].shape[-1]
        generated_tokens = generated[0][prompt_tokens:]
        content = self.tokenizer.decode(generated_tokens, skip_special_tokens=True).strip()
        return type("AIMessage", (), {"content": content})()


_shared_llm: TransformersLLM | None = None
_model_lock = threading.Lock()


def parse_torch_dtype(dtype_name: str | None):
    if not dtype_name or dtype_name == "auto":
        return None
    ensure_transformers_imports()
    dtype_map = {
        "bfloat16": torch.bfloat16,
        "bf16": torch.bfloat16,
        "float16": torch.float16,
        "fp16": torch.float16,
        "float32": torch.float32,
        "fp32": torch.float32,
    }
    if dtype_name not in dtype_map:
        raise ValueError(f"Unsupported torch dtype: {dtype_name}")
    return dtype_map[dtype_name]


def make_llm() -> TransformersLLM:
    global _shared_llm
    if _shared_llm is None:
        _shared_llm = TransformersLLM()
    return _shared_llm


def set_model_id(model_id: str | None) -> None:
    global MODEL_ID, _shared_llm
    if model_id:
        MODEL_ID = model_id
        _shared_llm = None


def set_max_input_tokens(max_input_tokens: int | None) -> None:
    global MAX_INPUT_TOKENS, _shared_llm
    if max_input_tokens:
        MAX_INPUT_TOKENS = max_input_tokens
        _shared_llm = None


def set_max_new_tokens(max_new_tokens: int | None) -> None:
    global MAX_NEW_TOKENS, _shared_llm
    if max_new_tokens:
        MAX_NEW_TOKENS = max_new_tokens
        _shared_llm = None


def set_runtime_options(args: argparse.Namespace) -> None:
    global DEVICE_MAP, TORCH_DTYPE, TRUST_REMOTE_CODE, LOAD_IN_4BIT, LOAD_IN_8BIT
    global LOCAL_FILES_ONLY, ENABLE_THINKING
    global _shared_llm
    DEVICE_MAP = args.device_map
    TORCH_DTYPE = args.torch_dtype
    TRUST_REMOTE_CODE = args.trust_remote_code
    LOAD_IN_4BIT = args.load_in_4bit
    LOAD_IN_8BIT = args.load_in_8bit
    LOCAL_FILES_ONLY = args.local_files_only
    ENABLE_THINKING = args.enable_thinking
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
        print(f"Skipping {folder.name}: no content.txt")
        return {
            "status": "failed",
            "results": {},
            "errors": {"paper": "Missing content.txt"},
            "validation_issues": {},
        }

    fulltext = read_fulltext(str(txt_path))
    if not fulltext or not fulltext.strip():
        print(f"Skipping {folder.name}: content.txt is empty")
        return {
            "status": "failed",
            "results": {},
            "errors": {"paper": "Empty content.txt"},
            "validation_issues": {},
        }

    print(f"Processing {folder.name} ({len(fulltext):,} chars) ...")

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
                print(f"   {name} failed: {error}")
            else:
                print(f"   {name}")

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
        f"Done: {folder.name} - {len(results)} outputs, {len(errors)} errors, "
        f"{issue_count} validation issues -> {status}\n"
    )
    return {
        "status": status,
        "results": results,
        "errors": errors,
        "validation_issues": validation_issues,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run ALD extraction with transformers against a local model checkpoint."
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
        default=REPO_ROOT / "extracted_data_transformers",
        help="Directory where extracted JSON is written.",
    )
    parser.add_argument(
        "--model",
        type=str,
        default=None,
        help=(
            "Path to a local Transformers checkpoint directory, such as your "
            "downloaded qwen3-8b-4bit folder. Repo ids are allowed only with "
            f"--allow-remote-model. Defaults to {DEFAULT_MODEL_ID!r}; you can "
            "also set TRANSFORMERS_MODEL_PATH or TRANSFORMERS_MODEL_ID."
        ),
    )
    parser.add_argument(
        "--allow-remote-model",
        dest="local_files_only",
        action="store_false",
        default=LOCAL_FILES_ONLY,
        help="Allow transformers to download a repo id instead of requiring local files.",
    )
    parser.add_argument(
        "--num-ctx",
        "--max-input-tokens",
        dest="max_input_tokens",
        type=int,
        default=None,
        help=(
            f"Maximum prompt tokens passed to transformers. Defaults to "
            f"{DEFAULT_MAX_INPUT_TOKENS}; you can also use TRANSFORMERS_MAX_INPUT_TOKENS."
        ),
    )
    parser.add_argument(
        "--max-new-tokens",
        type=int,
        default=None,
        help=(
            f"Maximum generated tokens per agent. Defaults to {MAX_NEW_TOKENS}; "
            "you can also use TRANSFORMERS_MAX_NEW_TOKENS."
        ),
    )
    parser.add_argument(
        "--device-map",
        type=str,
        default=DEVICE_MAP,
        help="Transformers device_map. Defaults to 'auto'.",
    )
    parser.add_argument(
        "--torch-dtype",
        type=str,
        default=TORCH_DTYPE,
        choices=["auto", "bfloat16", "bf16", "float16", "fp16", "float32", "fp32"],
        help="Model dtype. Defaults to auto.",
    )
    parser.add_argument(
        "--load-in-4bit",
        action="store_true",
        default=LOAD_IN_4BIT,
        help=(
            "Quantize an unquantized checkpoint with bitsandbytes at load time. "
            "Do not use this for checkpoints that are already distributed as 4-bit."
        ),
    )
    parser.add_argument(
        "--load-in-8bit",
        action="store_true",
        default=LOAD_IN_8BIT,
        help=(
            "Quantize an unquantized checkpoint with bitsandbytes at load time. "
            "Do not use this for checkpoints that are already distributed as 8-bit."
        ),
    )
    parser.add_argument(
        "--trust-remote-code",
        action="store_true",
        default=TRUST_REMOTE_CODE,
        help="Pass trust_remote_code=True to tokenizer/model loading.",
    )
    parser.add_argument(
        "--enable-thinking",
        action="store_true",
        default=ENABLE_THINKING,
        help="Keep Qwen3 thinking mode enabled. Defaults to disabled for JSON extraction.",
    )
    return parser.parse_args()


def load_logged_folders(*logs: Path) -> set[str]:
    folders: set[str] = set()
    for log in logs:
        if log.exists():
            folders.update(line.strip() for line in log.read_text().splitlines() if line.strip())
    return folders


def is_valid_json_file(path: Path) -> bool:
    if not path.is_file() or path.stat().st_size == 0:
        return False
    try:
        with open(path, "r", encoding="utf-8") as handle:
            json.load(handle)
    except (OSError, json.JSONDecodeError):
        return False
    return True


def has_complete_agent_outputs(folder: Path, output_dir: Path) -> bool:
    paper_out = output_dir / folder.name
    if not paper_out.is_dir():
        return False
    if (paper_out / "agent_errors.json").exists():
        return False
    return all(is_valid_json_file(paper_out / f"{agent_name}.json") for agent_name in AGENTS)


def should_skip_folder(folder: Path, output_dir: Path, processed_folders: set[str]) -> bool:
    if folder.name not in processed_folders:
        return False
    if has_complete_agent_outputs(folder, output_dir):
        return True

    print(f"Reprocessing {folder.name}: logged earlier but output files are incomplete.")
    return False


def resolve_folders(base_dir: Path, args: argparse.Namespace) -> list[Path]:
    if args.folders_file:
        folder_names = [
            line.strip()
            for line in args.folders_file.read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        return [base_dir / folder_name for folder_name in folder_names]

    folders = sorted(base_dir.iterdir(), key=lambda path: path.name)
    return folders[args.start : args.stop]


if __name__ == "__main__":
    args = parse_args()
    set_model_id(args.model)
    set_max_input_tokens(args.max_input_tokens)
    set_max_new_tokens(args.max_new_tokens)
    set_runtime_options(args)

    base_dir = args.base_dir
    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        make_llm().load()
    except Exception as exc:
        raise SystemExit(f"Model load failed: {exc}") from exc

    completed_log = SCRIPT_DIR / "completed_folders_transformers.txt"
    failed_log = SCRIPT_DIR / "failed_folders_transformers.txt"
    flagged_log = SCRIPT_DIR / "flagged_folders_transformers.txt"
    warning_log = SCRIPT_DIR / "warning_folders_transformers.txt"

    skip_logged_folders = set()
    if not args.folders_file:
        skip_logged_folders = load_logged_folders(
            completed_log,
            flagged_log,
            warning_log,
        )

    completed_count = 0
    attempted_count = 0
    skipped_count = 0
    folders = resolve_folders(base_dir, args)

    for folder in tqdm(folders):
        if not folder.exists():
            print(f"Skipping {folder.name}: folder not found")
            continue
        if not folder.is_dir():
            continue
        if should_skip_folder(folder, output_dir, skip_logged_folders):
            skipped_count += 1
            continue
        if completed_count >= args.max_new_folders:
            print(f"Reached limit of {args.max_new_folders} folders.")
            break

        try:
            attempted_count += 1
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
                completed_count += 1

        except Exception as exc:
            print(f"Failed on {folder.name}: {exc}")
            traceback.print_exc()
            with open(failed_log, "a", encoding="utf-8") as handle:
                handle.write(f"{folder.name}\n")

        if completed_count > 0 and completed_count % 10 == 0:
            print(f"Completed {completed_count} papers so far.\n")

    print(
        f"\nFinished. Attempted {attempted_count} papers, completed "
        f"{completed_count}, skipped {skipped_count} already-finished papers."
    )
