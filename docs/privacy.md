# Kinvia Privacy and Data Handling

| Field | Value |
|---|---|
| Status | Design contract — planned |
| Last updated | 2026-10-21 |

Kinvia handles conversations with families, often about minors, often in vulnerable
financial situations. Privacy is a product feature, not a compliance afterthought.

## 1. Principles

1. **Consent before collection.** The session starts with a spoken + on-screen consent
   step in the family's language.
2. **Parental consent for minors.** Many learners are under 18. The Digital Personal
   Data Protection Act, 2023 requires verifiable parental consent for processing a
   child's personal data. Kinvia's family-first flow makes the parent the consenting
   party by design.
3. **Purpose limitation.** Data is used for counselling, escalation and aggregated
   scheme insight only — never for advertising or provider lead-selling.
4. **Minimisation.** Collect district (not full address), schooling level, interests,
   income *bracket* (not exact income). Phone number only if a call-back is requested.
5. **Aggregate by default.** Administrators see counts, rates and trends. Individual
   transcripts are visible only to the assigned counsellor for an escalated session.
6. **Retention limits.** Raw audio is not stored after transcription in the prototype;
   transcripts expire after a defined period; aggregates are kept.
7. **Right to withdraw.** A family can ask to delete its session data.

## 2. Data categories

| Data | Stored? | Who can see |
|---|---|---|
| Raw voice audio | No (prototype) | — |
| Transcript | Yes, time-limited | Assigned counsellor (escalated only) |
| Objection codes, confidence scores | Yes, de-identified | Administrators (aggregated) |
| District, schooling, income bracket | Yes | Counsellor; aggregated for admins |
| Phone number | Only on call-back request | Assigned counsellor |

## 3. Current prototype handling

The static prototype in `frontend/` has no accounts or server, so anything it stores is
readable by the next person using the same browser. It therefore keeps less than the
design above:

| Data | Prototype behaviour |
|---|---|
| Conversation text, drafts, voice results | Memory only; cleared on start-over, leaving the page or back/forward return. Families may download their own copy |
| Guest mode | Nothing saved except the language setting |
| With parental consent | District, trade, concern codes and confidence scores saved on the device for local Insights |
| Counsellor request (consented only) | A Desk summary of district, trade, schooling band, speaker-tagged concern codes and record ids — no conversation text. Capped at 20, expires after seven days, removable from the Desk |
| Desk notes | Demo tickets only |
| Older saved conversations and Desk copies | Deleted on every page entry; a visible warning asks for site-data cleanup if deletion is blocked |

There is no live counsellor handoff in the prototype: the family is directed to a
training-centre counsellor (FR-06 remains planned).

## 4. Repository rules

Never commit: real learner or parent data, recordings, transcripts from real sessions,
API keys or `.env` files. Use synthetic data or licensed dummy datasets.
