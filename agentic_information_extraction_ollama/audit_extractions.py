import argparse
import json
from collections import Counter
from pathlib import Path

from tools import read_fulltext
from validation import (
    AGENT_NAMES,
    classify_validation_issues,
    load_json_file,
    validate_agent_output,
)


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Audit existing extracted JSON and flag malformed or weakly grounded papers."
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
        help="Directory containing extracted paper folders.",
    )
    parser.add_argument(
        "--flagged-log",
        type=Path,
        default=SCRIPT_DIR / "flagged_folders_llama.txt",
        help="File to write flagged folder names to.",
    )
    parser.add_argument(
        "--warning-log",
        type=Path,
        default=SCRIPT_DIR / "warning_folders_llama.txt",
        help="File to write softer evidence-mismatch warnings to.",
    )
    parser.add_argument(
        "--report-path",
        type=Path,
        default=SCRIPT_DIR / "flagged_papers_llama.json",
        help="JSON report path for detailed validation issues.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    flagged_folders: list[str] = []
    warning_folders: list[str] = []
    detailed_report: dict[str, dict[str, object]] = {}
    issue_counter: Counter[str] = Counter()

    paper_dirs = sorted(
        path for path in args.output_dir.iterdir() if path.is_dir() and path.name.startswith("paper")
    )

    for paper_dir in paper_dirs:
        raw_text_path = args.base_dir / paper_dir.name / "content.txt"
        if not raw_text_path.exists():
            detailed_report[paper_dir.name] = {
                "severity": "flagged",
                "paper_level_issue": "Missing raw content.txt for validation.",
            }
            flagged_folders.append(paper_dir.name)
            issue_counter["missing_content"] += 1
            continue

        fulltext = read_fulltext(str(raw_text_path))
        paper_issues: dict[str, object] = {}

        for agent_name in AGENT_NAMES:
            json_path = paper_dir / f"{agent_name}.json"
            if not json_path.exists():
                paper_issues[agent_name] = [
                    {
                        "code": "missing_file",
                        "path": str(json_path),
                        "message": "Expected output file is missing.",
                    }
                ]
                issue_counter["missing_file"] += 1
                continue

            try:
                data = load_json_file(json_path)
            except Exception as exc:
                paper_issues[agent_name] = [
                    {
                        "code": "json_parse_error",
                        "path": str(json_path),
                        "message": str(exc),
                    }
                ]
                issue_counter["json_parse_error"] += 1
                continue

            issues = validate_agent_output(agent_name, data, fulltext)
            if issues:
                paper_issues[agent_name] = issues
                issue_counter.update(issue["code"] for issue in issues)

        if paper_issues:
            severity = classify_validation_issues(
                {
                    key: value
                    for key, value in paper_issues.items()
                    if isinstance(value, list)
                }
            )
            if severity == "flagged":
                flagged_folders.append(paper_dir.name)
            else:
                warning_folders.append(paper_dir.name)
            detailed_report[paper_dir.name] = {
                "severity": severity,
                "issues": paper_issues,
            }

    args.flagged_log.write_text(
        "\n".join(flagged_folders) + ("\n" if flagged_folders else ""),
        encoding="utf-8",
    )
    args.warning_log.write_text(
        "\n".join(warning_folders) + ("\n" if warning_folders else ""),
        encoding="utf-8",
    )
    with open(args.report_path, "w", encoding="utf-8") as handle:
        json.dump(detailed_report, handle, indent=2, ensure_ascii=False)

    print(f"Audited {len(paper_dirs)} extracted papers.")
    print(f"Flagged {len(flagged_folders)} papers.")
    print(f"Warnings {len(warning_folders)} papers.")
    if issue_counter:
        print("Top issue counts:")
        for code, count in issue_counter.most_common(10):
            print(f"  - {code}: {count}")


if __name__ == "__main__":
    main()
