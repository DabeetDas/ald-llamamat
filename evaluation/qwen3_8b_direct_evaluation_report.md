# Qwen3-8B-Direct Extraction Evaluation

Generated: 2026-06-16T09:38:12

## Inputs

- Extracted outputs: `benchmarking/qwen3_8b_direct_outputs`
- Source roots: `Data`, `Data_Unpaywall_OA`
- Paper folders evaluated: 500
- Raw text available: 500
- Missing `content.txt`: 0

## Requested Metrics

| Metric | Numerator | Denominator | Rate |
|---|---:|---:|---:|
| Schema validity rate | 3,904 | 4,000 | 97.60% |
| Evidence grounding rate | 938 | 3,744 | 25.05% |
| Hallucination proxy rate | 2,622 | 14,582 | 17.98% |

## Schema Failure Counts

| Issue code | Count |
|---|---:|
| `missing_file` | 96 |

## Evidence Grounding Counts

| Issue | Count |
|---|---:|
| Grounded extractions | 938 |
| Missing or empty evidence | 0 |
| Evidence not found in source text | 2,806 |

## Hallucination Proxy Note

The hallucination number is an automated text-support proxy, not a manual entailment score. It marks a value as unsupported when the extracted non-evidence value does not appear, after normalization, in the raw paper text or in the extraction evidence. This can over-count unsupported values for inferred labels such as material class, normalized chemical formulas, or paraphrased summaries.

## Output Files

- `qwen3_8b_direct_evaluation_metrics.json`
- `qwen3_8b_direct_per_paper_metrics.csv`
- `qwen3_8b_direct_unsupported_values_proxy.csv`
- `qwen3_8b_direct_schema_and_grounding_issues.json`
