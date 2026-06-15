# Qwen Extraction Evaluation

Generated: 2026-06-13T16:31:49

## Inputs

- Extracted outputs: `qwen_extracted_info`
- Source roots: `Data`, `Data_Unpaywall_OA`
- Paper folders evaluated: 4,319
- Raw text available: 4,319
- Missing `content.txt`: 0

## Requested Metrics

| Metric | Numerator | Denominator | Rate |
|---|---:|---:|---:|
| Schema validity rate | 34,552 | 34,552 | 100.00% |
| Evidence grounding rate | 15,362 | 34,552 | 44.46% |
| Hallucination proxy rate | 31,984 | 139,967 | 22.85% |

## Schema Failure Counts

| Issue code | Count |
|---|---:|

## Evidence Grounding Counts

| Issue | Count |
|---|---:|
| Grounded extractions | 15,362 |
| Missing or empty evidence | 2,672 |
| Evidence not found in source text | 16,518 |

## Hallucination Proxy Note

The hallucination number is an automated text-support proxy, not a manual entailment score. It marks a value as unsupported when the extracted non-evidence value does not appear, after normalization, in the raw paper text or in the extraction evidence. This can over-count unsupported values for inferred labels such as material class, normalized chemical formulas, or paraphrased summaries.

## Output Files

- `qwen_evaluation_metrics.json`
- `qwen_per_paper_metrics.csv`
- `qwen_unsupported_values_proxy.csv`
- `qwen_schema_and_grounding_issues.json`
