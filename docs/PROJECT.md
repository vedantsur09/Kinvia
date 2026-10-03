# Kinvia Project Contract

## Status and authority

| Field | Value |
|---|---|
| Product | Kinvia |
| Problem statement | SIH26241 — AI-Enabled Career Counselling and Family Decision-Support Platform for Vocational Education |
| Problem owner | Ministry of Skill Development and Entrepreneurship (MSDE) |
| Category / theme | Software / Smart Education |
| Team | Rokunin Sync |
| Stage | Idea submission (deadline 5 October 2026); prototype planned |
| Last updated | 2026-10-03 |

This file is the current product, scope and requirement contract. When it conflicts
with lower-authority documents (research notes, PPT brief, agent memory), this file
wins. A requirement written here is **not** proof that it is implemented.

### Maturity labels

Every feature claim — in code, docs, PRs or the deck — carries one label:

`planned → prototyped → tested → demonstrated`

- **planned** — design only, no working path.
- **prototyped** — runs in the prototype, not yet measured.
- **tested** — automated or scripted checks pass and are recorded.
- **demonstrated** — shown end-to-end on the demo dataset, with evidence.

Presenting a planned feature as working is a defect.

---

# 1. Product definition

Kinvia is a voice-first, multilingual counselling platform that engages a learner and
their family **together**, answers family concerns about vocational training with
**verified local outcome data**, escalates to human counsellors when needed, and gives
scheme administrators a structured view of where and why family resistance occurs.

One sentence: **Kinvia helps families decide on vocational training with evidence, in
their own language, together.**

# 2. Problem and intended outcome

## 2.1 Problem

- Families — especially parents in rural and semi-urban households — often make or veto
  vocational-training decisions.
- Vocational routes are perceived as lower status than degrees; concerns centre on
  income, job security, safety and social standing.
- Existing guidance tools are learner-facing and generic; they do not reassure parents
  with local, credible data.
- Administrators lack a structured view of where resistance is concentrated, so
  outreach cannot be targeted.

## 2.2 Intended outcome

- Families make an **informed** decision (enrol, choose a better-fit trade, or decline)
  based on verified local evidence.
- Fewer mid-course dropouts caused by unresolved family objections.
- Administrators can target outreach by district, trade and objection type.

## 2.3 Non-goals

- Kinvia is not an enrolment-maximisation funnel and does not rank by provider
  commercial interest.
- Kinvia does not replace human counsellors; it extends their reach.
- Kinvia does not guarantee jobs, earnings or scheme eligibility.

# 3. Users

| User | Context | Core need |
|---|---|---|
| Learner (14–25) | Class 8–12 pass/fail, ITI/PMKVY candidate | Understand options; get family support |
| Parent / guardian | Often low literacy, low digital familiarity, regional language | Credible answers on income, safety, status |
| Extended family | Not present in session | Evidence to review later (Trust Card) |
| Human counsellor | Training centre, Skill India centre, school | Context on escalated families; less repetition |
| Scheme administrator | MSDE, state skill mission, district skill committee | Where and why resistance concentrates; what works |

# 4. Requirements

IDs are stable; reference them in PRs. All are **planned** unless labelled otherwise.

## 4.1 Mandated by SIH26241

| ID | Requirement | PS outcome it serves |
|---|---|---|
| FR-01 | Joint learner + parent conversational session, voice and text | Conversational tool for learners and parents |
| FR-02 | At least one regional language plus English (initial target: Hindi + English; Marathi stretch) | Regional language |
| FR-03 | Detect and answer common parental objections (income, job security, social perception) with local data | Objection handling |
| FR-04 | Verified outcome-data backend: trade × provider × district earnings ranges, placement rates, progression | Verified outcome backend |
| FR-05 | Plain-language explainer mapping qualifications → job roles → NSQF level-ups → further education, tailored to location, income bracket and academic background | Low-jargon explainer |
| FR-06 | Human escalation to a live counsellor, with context handoff | Escalation path |
| FR-07 | Engagement and sentiment-shift tracking | Administrator insight |
| FR-08 | Administrator dashboard: where and why resistance is concentrated | Dashboard |
| FR-09 | Low-literacy design: voice-first, icons, short sentences, read-aloud, shared-device flow | Low-literacy evidence |

## 4.2 Kinvia additions (see [innovation.md](innovation.md))

| ID | Requirement | Priority |
|---|---|---|
| FR-10 | Family Trust Card — shareable session summary with sourced figures | Must (core innovation) |
| FR-11 | Grounded figures — model cannot emit a number not retrieved from the outcome store | Must |
| FR-12 | Objection Graph — structured objection taxonomy and tagging per speaker | Must |
| FR-13 | Multi-speaker session — attribute concerns to learner / parent | Should |
| FR-14 | Two-path projection — degree vs vocational 5-year cost/earnings ranges | Should |
| FR-15 | Scheme eligibility hints (apprenticeship stipend, scholarships) | Should |
| FR-16 | Safety & dignity answers for girls' training | Should |
| FR-17 | Confidence shift score (pre/post) | Should |
| FR-18 | Counsellor copilot summary on escalation | Should |
| FR-19 | Local proof stories (verified alumni) | Could |
| FR-20 | Low-bandwidth PWA; WhatsApp / IVR channels | Could (WhatsApp/IVR = finale roadmap) |

## 4.3 Non-functional

| ID | Requirement |
|---|---|
| NFR-01 | Every displayed figure shows source, date and sample size; stale/thin data is flagged |
| NFR-02 | Parental consent captured before storing any minor's data |
| NFR-03 | Administrator views are aggregated; no individual transcripts without a role and reason |
| NFR-04 | Usable on a low-end Android phone over a slow connection |
| NFR-05 | Escalation reachable within two taps / one spoken request at any point |
| NFR-06 | No real learner data in the repository |

# 5. Hero workflow (demo story)

1. A mother and her 17-year-old son open Kinvia at a training centre and choose Hindi.
2. Consent screen is read aloud; the parent consents.
3. Kinvia asks about location, schooling and interests — by voice, with icon choices.
4. The son is interested in electrician training; the mother says, "Will he earn enough?
   People will say he failed in studies."
5. Kinvia tags two objections (income; social status), fetches district-level verified
   data, and answers each person: an Evidence Card with earnings range and placement
   rate, plus a pathway to NSQF level-up and diploma lateral entry.
6. The mother asks about apprenticeships; Kinvia shows eligible stipend schemes as
   *check eligibility*.
7. She asks something Kinvia is unsure about; it offers a counsellor call-back. The
   counsellor sees a summary and open concerns.
8. The family receives a Family Trust Card in Hindi on WhatsApp/download.
9. The administrator dashboard updates: one more "social status" objection in the
   district, confidence score moved from 2 to 4.

# 6. Data

- **Demo data:** organiser-provided dummy placement/earnings datasets (per PS) plus our
  synthetic samples in `data/samples/`.
- **Reference sources (for realism and the deck):** NCVET National Qualifications
  Register (NSQF job roles and levels), PLFS, Skill India Digital Hub, apprenticeship
  scheme rules. See [research.md](research.md).
- No real learner records are used or committed.

# 7. Open decisions

| ID | Decision | Current recommendation |
|---|---|---|
| OD-01 | Speech stack: Bhashini APIs vs self-hosted AI4Bharat models | Bhashini for demo; self-hosted as low-connectivity fallback |
| OD-02 | LLM: hosted vs open-weight local | Open-weight model via a swappable provider interface |
| OD-03 | Repository visibility (private now) | Decide before the finale; public helps evaluators |
| OD-04 | Second regional language | Marathi if time permits |

# 8. Authority order

1. Current user request
2. [AGENTS.md](../AGENTS.md)
3. This file
4. [privacy.md](privacy.md) for consent and data handling
5. [tasks.md](../tasks.md) for phase and sequencing
6. [CONTRIBUTING.md](../CONTRIBUTING.md)
7. Source, tests and observed output
8. Research, PPT brief, agent memory
