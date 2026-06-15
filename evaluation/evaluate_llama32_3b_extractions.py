from pathlib import Path

from evaluate_qwen_extractions import REPO_ROOT, main


if __name__ == "__main__":
    main(
        default_extracted_dir=REPO_ROOT / "extracted_data",
        default_report_prefix="llama32_3b",
        default_model_label="LLaMA 3.2 3B",
    )
