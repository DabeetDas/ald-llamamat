# Substring Evidence Grounding Scores

Generated: 2026-06-15T23:53:51

Metric: `grounded_extractions / non_empty_extractions_evaluable`
Sentence-level metric: average fraction of sentences per evidence string found in text

| Dataset | Grounded | Evaluable non-empty | Subscore | Sent Score | Paraphrased | Missing ev | Empty ev | Match failed | Missing src |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| qwen3_8b_direct | 187 | 766 | 24.41% | 54.57% | 16 | 0 | 0 | 563 | 0 |

Outputs:

- `evidence_grounding_scores.json`
- `evidence_grounding_per_paper.csv`
- `evidence_grounding_issues.csv`

This is a deterministic substring-grounding metric. It does not run an LLM and does not prove the extracted value is entailed by the evidence.
