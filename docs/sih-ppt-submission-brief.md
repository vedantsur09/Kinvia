# SIH26241 PPT Submission Brief

## Document role

| Field | Value |
|---|---|
| Purpose | Content source for the six-slide SIH idea-submission PPT/PDF, reusing the Refinix deck skeleton |
| Audience | Rokunin Sync presentation, design and research owners |
| Problem statement | SIH26241 — AI-Enabled Career Counselling and Family Decision-Support Platform for Vocational Education |
| Problem owner | Ministry of Skill Development and Entrepreneurship (MSDE) |
| Category / theme | Software / Smart Education |
| Product name | Kinvia |
| Deadline | 5 October 2026 |
| Last updated | 2026-10-03 |

> This brief is content, not a design. Keep the official SIH template and the Refinix
> deck's layout; replace the content slide by slide. Recheck the portal (Team ID, team
> name spelling, file-size and format rules) before uploading.

## 1. Communication job

> **Kinvia counsels the whole family, in their language, with verified local data —
> and shows administrators exactly where and why families say no.**

## 2. Recheck before submission

- Team ID and exact registered team name
- Official template version, slide limit, file type and size limit
- Idea-count for SIH26241 still below cap
- Every figure on slides traced to [research.md](research.md) primary sources

---

## 3. Six slides

### Slide 1 — Title page

- Problem Statement ID: **SIH26241**
- Problem Statement Title: **AI-Enabled Career Counselling and Family Decision-Support
  Platform for Vocational Education**
- Theme: **Smart Education** · PS Category: **Software**
- Team ID: **`<VERIFY ON PORTAL>`** · Team Name: **Rokunin Sync**
- Idea title: **Kinvia — Counselling the Family, Not Just the Learner**

**Visual:** a parent and teenager looking at one phone together; warm, real, Indian
household or training-centre setting. Avoid robots and glowing brains.

### Slide 2 — Proposed solution

**Takeaway title:** *Families decide. Kinvia gives them evidence, together.*

- Voice-first family session in Hindi/regional language + English.
- Detects each family member's concerns (income, status, safety…) and answers with
  **verified local figures** — never model-invented numbers.
- Plain-language pathway: course → job → NSQF level-up → further study.
- One-tap escalation to a human counsellor with full context.
- **Family Trust Card** to share with relatives; **Scheme Insights** for MSDE.

**Visual:** five-stage flow — **Ask → Understand concerns → Show evidence → Plan path →
Share & follow up**.

**Innovation callout:** *Trust Card + grounded figures + Objection Graph.*

### Slide 3 — Technical approach

**Takeaway title:** *Language model for empathy, verified data for every number.*

Architecture (from [architecture.md](architecture.md)):

```text
PWA (family / counsellor / admin) → Kinvia API
   → Speech adapter (Bhashini / AI4Bharat)
   → Counselling orchestrator (LLM + tools) → Grounding guard
   → Outcome store (trades × providers × districts, NSQF, schemes)
   → Escalation service · Trust Card renderer · Aggregated analytics
```

Stack line: *React PWA • FastAPI • PostgreSQL • Open-weight LLM • Bhashini ASR/TTS •
Recharts district heatmap*

Three rules: (1) numbers come only from the outcome store; (2) every figure shows
source and date; (3) a human counsellor is always one tap away.

### Slide 4 — Feasibility and viability

**Takeaway title:** *Small enough to prove, built on public Indian stacks.*

- Organiser-provided dummy datasets + synthetic district data for the demo.
- Bhashini gives 22-language speech without training our own models.
- Team has shipped a local-LLM workbench (Refinix) — tool-calling and grounding reuse.
- Prototype scope: one hero flow, Hindi + English, one dashboard.

| Risk | Control |
|---|---|
| Hallucinated figures | Grounding guard; figures rendered from records only |
| Low-literacy usability | Voice-first, icons, read-aloud, shared-device mode |
| Thin or stale data | Show sample size and date; flag; escalate |
| Privacy of minors | Parental consent first; aggregate-only admin views (DPDP Act 2023) |
| Connectivity | PWA caching; self-hosted speech fallback |

### Slide 5 — Impact and benefits

**Takeaway title:** *From "people will say he failed" to an informed family decision.*

- **Families:** credible, local answers in their language; something to show relatives.
- **Learners:** family support → fewer dropouts from unresolved objections.
- **Counsellors:** escalations arrive summarised; time spent where it matters.
- **MSDE / states:** district-level map of objections and what changes minds → targeted
  outreach.
- **Social:** reduces stigma around vocational paths; specific answers on girls' safety.

**Before → after:**

```text
Learner-only, generic advice → parent unconvinced → no enrolment / mid-course dropout
                    ↓
Family session + verified local evidence + Trust Card → informed joint decision
```

Do not show invented savings, accuracy or adoption numbers.

### Slide 6 — Research and references

Use 6–8 entries from [research.md §5](research.md#5-references-for-slide-6-candidate-list).
Lead with the PMKVY dropout/placement figures **only after** verifying them on the
primary dashboard.

Closing line:

> *Kinvia doesn't ask families to trust a chatbot — it shows them where every number
> came from, and lets them take that evidence home.*

## 4. Mapping from the Refinix deck

| Refinix slide element | Kinvia replacement |
|---|---|
| Sovereign Proof Card | Family Trust Card |
| Air-gapped / zero-egress claim | Grounded figures — no invented numbers |
| Coordinator + workers diagram | API + orchestrator + grounding guard diagram |
| Industrial users (refinery, PSU) | Families, counsellors, MSDE administrators |
| Five feasibility gates | Hero flow, Hindi+English, dashboard, Trust Card, escalation |

## 5. Judge Q&A starters

- **Why not just a chatbot on top of course lists?** Because the decision-maker is the
  family and the blocker is trust; generic text does not move a sceptical parent.
- **How do you stop the AI giving wrong salaries?** The model never writes figures; the
  guard blocks unbacked numbers.
- **What if data is missing for a district?** Say so, show the nearest reliable data
  with its scope, and escalate.
- **How do you reach parents without smartphones?** Shared device at centres now;
  WhatsApp and IVR on the roadmap.
- **Is this persuasion?** No — the goal is an informed decision; weak local outcomes are
  shown honestly.
- **Children's data?** Parental consent first; admin sees aggregates only.
