# Kinvia Innovation Research

| Field | Value |
|---|---|
| Purpose | Candidate product innovations, with rationale and priority |
| Status | Research — all items **planned** |
| Last researched | 2026-10-03 |

Joint conversation, outcome data, an explainer, escalation and a dashboard form the
core product. These items are where Kinvia differentiates. Each one ties
back to a specific failure of today's learner-only, generic tools.

Priority key: **Must** = first prototype; **Should** = follows the core flow;
**Could** = longer-term roadmap.

---

## 1. Family Trust Card — Must

**Problem it fixes:** decisions are made with relatives who were not in the session;
verbal reassurance evaporates by evening.

**Idea:** a one-page, regional-language summary (image + PDF, WhatsApp-sized) with the
trades discussed, sourced figures, the family's concerns and answers, eligible schemes
(as *check eligibility*), and next steps. A QR code links to the live, updated card.

**Why it is defensible:** it is a tangible artifact families and counsellors can inspect,
it shows every figure's provenance, and it extends counselling beyond the session.

## 2. Grounded figures ("numbers never come from the model") — Must

**Problem it fixes:** LLMs hallucinate salaries and placement rates; a wrong number can
push a poor family into a bad decision.

**Idea:** the model gets a tool to query the outcome store and must reference returned
record IDs. The renderer substitutes figures from the store; a post-check blocks any
numeric claim about earnings/placement not backed by a record. If no record exists, the
answer says "we do not have verified data for this" and suggests a counsellor.

**Evidence basis:** retrieval-augmented generation (Lewis et al., 2020) and
tool-use/ReAct patterns (Yao et al., 2023).

## 3. Objection Graph — Must

**Problem it fixes:** administrators see enrolment numbers, not reasons.

**Idea:** a structured taxonomy of family concerns:

| Code | Objection |
|---|---|
| INC | Income potential / "will it pay enough" |
| JOB | Job security / availability locally |
| STA | Social status / "people will say he failed" |
| SAF | Safety (travel, workplace, hostel) — especially for girls |
| MAR | Marriage prospects |
| DIS | Distance / migration away from home |
| CST | Fees, travel cost, lost income during training |
| QLT | Training-centre quality / trust in provider |
| PRG | Dead-end fear / no further education possible |

Each utterance is tagged with speaker (learner / parent) and objection code; each
answer records the evidence shown and whether the concern was marked resolved. This
powers the district heatmap and "what answer works" analytics.

## 4. Multi-speaker family session — Should

**Problem it fixes:** learner and parent want different things; a single "user" model
collapses them.

**Idea:** simple speaker selection ("Who is speaking?" with face icons) on a shared
phone; optional voice-based switching later. Kinvia addresses each person by role and
shows a small "family agreement" indicator when concerns are resolved for both.

## 5. Two-path projection — Should

**Problem it fixes:** the degree-vs-vocational comparison is emotional, not numerical.

**Idea:** side-by-side 5-year view: fees, years without income, earnings ranges and
progression options for "degree path" vs "vocational path (+ lateral entry)". Always
ranges with sources, labelled as estimates; never a single promised number.

## 6. Scheme eligibility hints — Should

Surface schemes the learner may qualify for (apprenticeship stipend support,
scholarships, self-employment credit) from a rules table, phrased as "you may be
eligible — check with the counsellor". Reduces the cost objection (CST).

## 7. Safety & dignity answers — Should

Curated, verified answers for girls' training: women-only batches, hostel availability,
safe transport, workplace grievance mechanisms. Targets SAF and MAR objections, which
generic tools ignore.

## 8. Confidence shift score — Should

Two one-tap questions at start and end ("How confident are you about this path?" 1–5,
for each family member). Aggregated, it tells administrators which evidence and which
answers actually change minds — making sentiment shifts measurable and honest.

## 9. Counsellor copilot — Should

On escalation, the counsellor sees: family profile, objections (resolved/open),
evidence already shown, and suggested next evidence. Avoids the family repeating
themselves and makes scarce counsellor time count.

## 10. Local proof stories — Could

Short, consented audio/video stories from alumni in the same district and community.
Peer proof answers STA better than statistics. Requires verification and consent flow.

## 11. Low-bandwidth and feature-phone reach — Could

- Installable PWA with cached content and compressed audio (prototype).
- WhatsApp channel and IVR / missed-call callback for feature phones (longer-term roadmap).
- Self-hosted speech models as fallback where connectivity is poor — the team's Refinix
  work on offline local AI is directly reusable here.

## 12. Ideas parked (not in scope yet)

- Dropout early-warning for enrolled learners (needs attendance data).
- Aptitude/interest assessment games.
- Employer-side job-demand feed.

---

## Priority summary for the PPT

Lead with **Trust Card + grounded figures + Objection Graph** as the innovation
triangle: *the family gets evidence it can share, every number is traceable, and
administrators finally see why families say no.*
