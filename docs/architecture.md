# Kinvia Architecture

| Field | Value |
|---|---|
| Status | Proposed — nothing here is built yet |
| Last updated | 2026-10-03 |

## 1. Slide-safe overview

```text
 Family (voice/text, shared phone)        Counsellor            Administrator
          │                                   │                       │
          ▼                                   ▼                       ▼
 ┌─────────────────────── Web app (PWA) ───────────────────────────────────────┐
 │  Family session      │   Counsellor Desk      │   Scheme Insights dashboard  │
 └──────────┬──────────────────────┬──────────────────────────┬────────────────┘
            ▼                      ▼                          ▼
 ┌──────────────────────────── Kinvia API ─────────────────────────────────────┐
 │ Session service ─► Counselling orchestrator ─► Grounding guard ─► Response  │
 │        │                 │        │                                         │
 │        │          Objection   Outcome-store tool    Escalation service      │
 │        │          tagger      (verified figures)    (queue + summary)       │
 │        ▼                 ▼        ▼                                         │
 │  Speech adapter    Analytics events          Trust Card renderer            │
 └──────┬──────────────────┬─────────────────────────────┬────────────────────┘
        ▼                  ▼                             ▼
  Speech provider    Outcome DB + Rules tables      Aggregated analytics
  (Bhashini / local) (trades, providers, districts, (objections, confidence
                      schemes, NSQF pathways)        shift, by district)
```

## 2. Components

| Component | Responsibility |
|---|---|
| **Session service** | Family session lifecycle, language, consent record, speaker turns |
| **Speech adapter** | ASR/TTS behind one interface; provider is swappable (Bhashini API or self-hosted AI4Bharat models) |
| **Counselling orchestrator** | LLM with tools: `query_outcomes`, `get_pathway`, `check_schemes`, `escalate`. Plans the answer per speaker and objection |
| **Objection tagger** | Classifies each utterance into the [Objection Graph](innovation.md#3-objection-graph--must) codes with speaker attribution |
| **Outcome store** | Verified trade × provider × district figures with source, date and sample size; NSQF pathway graph; scheme rules |
| **Grounding guard** | Blocks any earnings/placement/progression number not traceable to an outcome record returned in this turn |
| **Escalation service** | Counsellor queue, call-back scheduling, auto-generated session summary |
| **Trust Card renderer** | Builds the regional-language summary (image/PDF) with sourced figures |
| **Analytics** | Aggregates objection codes, resolution and confidence shift by district/trade; no raw transcripts |

## 3. Grounded answer flow

1. Utterance → ASR → text (+ speaker role).
2. Objection tagger labels it (e.g. `INC`, parent).
3. Orchestrator calls `query_outcomes(trade, district)` → records with IDs.
4. Model drafts an answer referencing record IDs, not raw numbers.
5. Renderer substitutes figures from the records; the grounding guard rejects any
   remaining unbacked numeric claim and asks the model to rephrase or escalate.
6. Answer → TTS + Evidence Card on screen.
7. Analytics event: `{district, trade, objection, speaker, evidence_ids, resolved?}`.

## 4. Escalation triggers

- Family explicitly asks for a person.
- Model confidence low, or no verified data for the asked trade/district.
- Sensitive topics (harassment, financial distress, disability accommodation).
- Same objection unresolved after two answers.

## 5. Data model (initial)

| Table | Key fields |
|---|---|
| `trades` | id, name, sector, nsqf_level, plain_description_{lang} |
| `providers` | id, name, district, state, women_batches, hostel |
| `outcomes` | trade_id, provider_id, district, cohort_year, placement_rate, earnings_p25, earnings_p75, sample_size, source, as_of |
| `pathways` | from_qualification, to_qualification/job_role, requirement |
| `schemes` | id, name, rule_json, source_url, as_of |
| `sessions` | id, language, district, consent_at, consent_by_role |
| `objection_events` | session_id, speaker_role, code, resolved, evidence_ids |
| `confidence_scores` | session_id, speaker_role, before, after |

## 6. Deployment (prototype)

Single web app + API + relational DB; speech via provider adapter. Production
considerations (state data centres, scaling, IVR/WhatsApp gateways) are longer-term roadmap.
