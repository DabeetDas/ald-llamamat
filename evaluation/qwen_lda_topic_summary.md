# Qwen LDA Topic Analysis Summary

Source folder: `qwen_lda_cleaned_metrics/`

## Model Setup

- Input extraction set: `qwen_extracted_info`
- Source text used for LDA: cleaned extraction text
- Documents modeled: 4,281
- Vocabulary size: 6,000
- Topic counts tested: 4 through 16
- Selected topic count: 4
- Selection rule: highest `c_v` coherence
- Training passes: 8
- Iterations: 80

## Model Quality

The selected 4-topic model had the highest `c_v` coherence:

| Topics | c_v coherence | u_mass coherence | log perplexity |
|---:|---:|---:|---:|
| 4 | 0.467655 | -3.919345 | -6.876619 |

The coherence peak is modest rather than decisive. Several alternatives were close, especially 5, 6, 10, and 16 topics, so the 4-topic solution should be treated as a coarse thematic grouping rather than a clean taxonomy.

## Topic Distribution

| Topic | Documents | Share | Avg dominant probability | Median dominant probability | Avg token count |
|---:|---:|---:|---:|---:|---:|
| 0 | 4,142 | 96.75% | 0.9631 | 0.9995 | 427 |
| 1 | 34 | 0.79% | 0.7528 | 0.7312 | 4,832 |
| 2 | 54 | 1.26% | 0.7452 | 0.7368 | 4,268 |
| 3 | 51 | 1.19% | 0.7652 | 0.8040 | 5,081 |

Overall, the model assigns most documents with high confidence:

- Average dominant-topic probability: 0.9563
- Median dominant-topic probability: 0.9995
- High-confidence documents, dominant probability >= 0.8: 4,055
- Low-confidence documents, dominant probability < 0.6: 58

However, this confidence is partly caused by the extreme dominance of Topic 0.

## Topic Interpretations

### Topic 0: General ALD Process, Oxides, and Characterization

Top terms: `h2o`, `plasma`, `xrd`, `water`, `al2o3`, `sio2`, `measurements`, `grown`, `pulse`, `oxygen`, `purge`, `tma`, `sem`

This is the dominant broad ALD topic. It captures standard process language around water, plasma, pulses, purge steps, common oxide films such as `Al2O3` and `SiO2`, and characterization methods such as XRD and SEM.

Because Topic 0 covers 96.75% of documents, it is probably acting as a general background topic rather than a sharply separated scientific theme.

### Topic 1: TiO2 / Functional Materials Cluster With Some Noise

Top terms: `tio2`, `magnetic`, `performance`, `field`, `nio`, `efficiency`, `platinum`, `zno`, `core`

This topic appears to collect documents around `TiO2`, `NiO`, `ZnO`, platinum, magnetic/electronic behavior, and device-performance language. It may represent functional oxide films and application-facing ALD papers.

The terms `svg`, `singh`, and `kondo` suggest some residual metadata, author-name, or artifact contamination.

### Topic 2: Literature / Review / Citation-Heavy Cluster

Top terms: `zhang`, `doi`, `org`, `https`, `al2o3`, `wang`, `optical`, `sci`, `review`, `catalysts`, `ieee`, `memristor`

This topic looks partly scientific and partly bibliographic. It contains real themes such as `Al2O3`, optical properties, catalysts, IEEE/device language, and memristors, but it is strongly contaminated by citation and URL tokens such as `doi`, `org`, and `https`.

This topic may be capturing review-style or reference-heavy extracted text rather than a pure materials/process topic.

### Topic 3: Author/Journal Contaminated Battery or Electrochemical Coating Cluster

Top terms: `kim`, `zhang`, `chen`, `lee`, `surf`, `technol`, `lithium`, `coat`, `electrochemical`

The meaningful scientific signal here points toward lithium, coating, and electrochemical ALD applications. But the topic is heavily dominated by author names and journal fragments such as `kim`, `zhang`, `chen`, `lee`, `surf`, and `technol`.

This should be interpreted cautiously unless the text cleaning is improved.

## Main Takeaways

1. The LDA run selected 4 topics, but the solution is highly imbalanced.
2. Topic 0 is the main general ALD topic and covers almost the entire corpus.
3. Topics 1-3 appear to isolate longer, more specialized documents, but they contain noticeable metadata/citation contamination.
4. The topic model is useful as a rough corpus diagnostic, not yet as a strong scientific taxonomy.
5. Cleaning should remove author names, DOI/URL fragments, journal abbreviations, and file artifacts before rerunning LDA.

## Recommended Next Steps

- Add stopwords for common author surnames and citation tokens: `doi`, `org`, `https`, `sci`, `ieee`, `trans`, `surf`, `technol`.
- Remove URLs, DOI strings, references sections, and citation-heavy lines before topic modeling.
- Consider filtering very short documents; Topic 0 has an average token count of only 427.
- Rerun LDA after cleaning and compare 4, 6, 8, 10, and 12 topics.
- Also try BERTopic or NMF on TF-IDF for more interpretable clusters.
