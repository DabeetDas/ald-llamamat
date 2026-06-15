# Substring Evidence Grounding Scores

Generated: 2026-06-13T16:51:31

Metric: `grounded_extractions / non_empty_extractions_evaluable`
Sentence-level metric: average fraction of sentences per evidence string found in text

| Dataset | Grounded | Evaluable non-empty | Subscore | Sent Score | Paraphrased | Missing ev | Empty ev | Match failed | Missing src |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| qwen | 15,362 | 34,552 | 44.46% | 75.58% | 1,025 | 1,718 | 954 | 15,493 | 0 |
| llama32_3b | 5,814 | 12,879 | 45.14% | 62.64% | 72 | 1,415 | 368 | 5,210 | 0 |

Outputs:

- `evidence_grounding_scores.json`
- `evidence_grounding_per_paper.csv`
- `evidence_grounding_issues.csv`

This is a deterministic substring-grounding metric. It does not run an LLM and does not prove the extracted value is entailed by the evidence.
