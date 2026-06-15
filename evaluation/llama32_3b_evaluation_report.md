# LLaMA 3.2 3B Extraction Evaluation

Generated: 2026-06-13T16:27:00

## Inputs

- Extracted outputs: `extracted_data`
- Source roots: `Data`, `Data_Unpaywall_OA`
- Paper folders evaluated: 1,857
- Raw text available: 1,857
- Missing `content.txt`: 0

## Requested Metrics

| Metric | Numerator | Denominator | Rate |
|---|---:|---:|---:|
| Schema validity rate | 13,586 | 14,856 | 91.45% |
| Evidence grounding rate | 5,814 | 12,879 | 45.14% |
| Hallucination proxy rate | 21,475 | 54,676 | 39.28% |

## Schema Failure Counts

| Issue code | Count |
|---|---:|
| `missing_key` | 1,785 |
| `wrong_type` | 477 |
| `json_parse_error` | 1 |

## Evidence Grounding Counts

| Issue | Count |
|---|---:|
| Grounded extractions | 5,814 |
| Missing or empty evidence | 1,783 |
| Evidence not found in source text | 5,282 |

## Hallucination Proxy Note

The hallucination number is an automated text-support proxy, not a manual entailment score. It marks a value as unsupported when the extracted non-evidence value does not appear, after normalization, in the raw paper text or in the extraction evidence. This can over-count unsupported values for inferred labels such as material class, normalized chemical formulas, or paraphrased summaries.

## Output Files

- `llama32_3b_evaluation_metrics.json`
- `llama32_3b_per_paper_metrics.csv`
- `llama32_3b_unsupported_values_proxy.csv`
- `llama32_3b_schema_and_grounding_issues.json`
