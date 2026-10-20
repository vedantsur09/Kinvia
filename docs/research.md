# Kinvia Research Notes

| Field | Value |
|---|---|
| Purpose | Problem evidence, data sources and references for the PPT and prototype |
| Status | Research notes — verify every figure against the primary source before putting it on a slide |
| Last researched | 2026-10-03 |

> Figures below are taken from secondary/media reports unless marked primary. Treat
> them as leads, not as verified facts, until checked against the original
> dashboard, report or parliamentary reply.

## 1. Problem evidence

| Finding | Source | Verification state |
|---|---|---|
| PMKVY dashboard (as of 28 Aug 2026): ~35.4 lakh enrolments, ~6.83 lakh dropouts, ~2.0 lakh placements against ~28.5 lakh trained (~7%) | [Business Today, 2026-09-05](https://www.businesstoday.in/jobs/story/pmkvy-records-just-7-placement-rate-highlighting-indias-skilling-employment-gap-553443-2026-09-05) | Media report — check PMKVY dashboard |
| Highest sector dropout: media & entertainment ~26.5%, IT/ITeS ~25.9%, tourism & hospitality ~24.9% | Same as above | Media report |
| PMKVY 4.0 was delinked from placement targets | Same as above; parliamentary replies cited | Check parliamentary reply |
| FY 2024-25: 19.17 lakh certifications against a 45 lakh target (as of 3 Mar 2025) | [Careers360 on standing committee report](https://news.careers360.com/pmkvy-4-0-under-50-pc-trainee-certification-placement-data-parliamentary-panel-skill-india-scheme-delay-kaushal-vikas-yojana-rti) | Media report — check committee report |
| Formal vocational training carries a significant earnings premium over informal/no training for salaried workers (PLFS 2023-24) | [IES paper, Mar 2025](https://www.ies.gov.in/pdfs/Vishnu-KVenugopal-march25.pdf) | Primary research paper |
| Only ~4.2% of the population reports vocational training (PLFS 2025) | [Vision IAS summary](https://visionias.in/current-affairs/monthly-magazine/2026-05-22/economy/periodic-labour-force-survey-plfs-annual-report-2025) | Secondary — check PLFS report |
| Parental involvement is associated with lower school dropout in India (panel study) | [PLoS ONE / PMC8109829](https://pmc.ncbi.nlm.nih.gov/articles/PMC8109829/) | Primary research |

**Pitch takeaway:** training capacity exists; the leak is in **enrolment choice and
completion**, where the family's confidence matters and is currently unmeasured.

## 2. Data sources for the outcome store

| Source | Use in Kinvia | Notes |
|---|---|---|
| Synthetic samples in `data/samples/` | Demo placement rates and earnings | Development data only; never present as real outcomes |
| [NCVET National Qualifications Register](https://ncvet.gov.in/?p=2524) | NSQF job roles, levels, progression for the pathway explainer | Public; check terms of reuse |
| Skill India Digital Hub (SIDH) | Course/centre discovery, future integration | No public API confirmed |
| PLFS (MoSPI) | Realistic earnings ranges for synthetic data | Public microdata |
| Apprenticeship and scholarship scheme rules | Eligibility hints (FR-15) | Encode as a rules table with source links |

## 3. Language and speech technology

| Option | What | Licence / access | Fit |
|---|---|---|---|
| [Bhashini](https://innovateindia.mygov.in/bhashini-challenge/) (MeitY) | ASR, TTS, translation, transliteration across 22 scheduled languages via APIs | Free public APIs; registration required | Fastest route for the demo |
| AI4Bharat IndicConformer | Speech-to-text | MIT (per [AIKosh](https://aikosh.indiaai.gov.in/)) | Self-hosted fallback |
| AI4Bharat IndicTrans2 | Translation | MIT | Self-hosted fallback |
| AI4Bharat Indic Parler-TTS | Text-to-speech, 22 languages | Apache-2.0, gated access | Self-hosted fallback |

Verify licence and version on the model card before adopting any model.

## 4. Privacy and regulation

- Digital Personal Data Protection Act, 2023 — consent, purpose limitation and
  verifiable parental consent for children's data. See [privacy.md](privacy.md).

## 5. References for slide 6 (candidate list)

1. Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, NeurIPS 2020.
2. Yao et al., *ReAct: Synergizing Reasoning and Acting in Language Models*, ICLR 2023.
3. PLFS Annual Report (MoSPI), latest edition.
4. IES paper on vocational training earnings premium using PLFS 2023-24.
5. NCVET National Qualifications Register / NSQF.
6. Bhashini — National Language Translation Mission, MeitY.
7. Digital Personal Data Protection Act, 2023.
