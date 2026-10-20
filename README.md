<div align="center">

# Kinvia

**Kinvia — family-inclusive AI career counselling for vocational education**

*A platform that counsels the learner **and** the family
together, in their own language, using verified local outcome data instead of
generic advice.*

![Category](https://img.shields.io/badge/Category-Software-2E8B57?style=flat-square)
![Theme](https://img.shields.io/badge/Theme-Smart%20Education-7B2CBF?style=flat-square)
![Status](https://img.shields.io/badge/Status-Prototype%20planned-F59E0B?style=flat-square)
![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square)

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [What Is Kinvia?](#what-is-kinvia)
- [Why This Problem Matters](#why-this-problem-matters)
- [Design Philosophy: Counsel the Family, Not Just the Learner](#design-philosophy-counsel-the-family-not-just-the-learner)
- [Product Surfaces](#product-surfaces)
- [Proposed Innovation: The Family Trust Card](#proposed-innovation-the-family-trust-card)
- [Further Innovations](#further-innovations)
- [Project Boundaries & Trust Model](#project-boundaries--trust-model)
- [Repository Structure](#repository-structure)
- [Getting Started](#start-here)
- [Contributing](#contributing)
- [License](#licence)

---

<a id="sih-problem-statement-241"></a>

## Project Overview

| Field | Details |
|---|---|
| **Product** | Kinvia — family-inclusive career counselling for vocational education |
| **Category** | Software |
| **Theme** | Smart Education |
| **Dataset** | Dummy placement/earnings datasets for evaluation |
| **Team Name** | Rokunin Sync |

### Challenge in brief

Whether a young person enrols in — and finishes — vocational training in India is
often decided by the **family**, not the learner alone. Parents in rural and
semi-urban households frequently see vocational routes as lower status than a
degree, and worry about income, job security, safety and social standing. Today's
career-guidance tools speak almost only to the learner, so the people who often make
or veto the decision are never reassured with credible, local evidence.

Kinvia is designed as an AI counselling platform that:

- talks with **learners and parents together**, through a conversational interface in
  regional languages, answering common parental objections with credible local data;
- shows **verified outcome data** for trades and training providers — post-training
  earnings, placement rates and progression routes (NSQF level-ups, further study);
- explains in **plain, low-jargon language** how vocational qualifications lead to jobs
  and growth, tailored to the family's location, income bracket and the learner's
  academic background;
- offers **escalation to a live human counsellor** when the AI cannot resolve a concern;
- tracks **engagement and sentiment shifts** so scheme administrators can see where,
  and why, parental resistance is concentrated.

Product goals: a working conversational tool (initially Hindi and English),
a verified outcome-data backend, an administrator dashboard, evidence of
design for low-literacy users, and a clear escalation path.

Product scope and open decisions live in [docs/PROJECT.md](docs/PROJECT.md).

---

## What Is Kinvia?

**Kinvia** = *kin* (family) + *via* (the way forward). It is a voice-first,
multilingual counselling platform where a learner and their family sit with one
assistant and leave with a shared, evidence-backed answer to the question
*"Is this trade a good future for our child?"*

Kinvia has three parts:

| Part | Who uses it | What it does |
|---|---|---|
| **Family Counsellor** | Learner + parents, on a shared phone or at a training centre | Voice/text conversation in a regional language; answers objections with verified local data; builds a personalised pathway |
| **Counsellor Desk** | Human counsellors | Receives escalated sessions with a summary, open concerns and the evidence already shown — no repeated questions |
| **Scheme Insights** | MSDE / state skill mission administrators | Map and trends of where family resistance is concentrated, which objections dominate, and which answers change minds |

> **Status:** planning stage. This repository holds the product
> contract, research and plan. The prototype website is planned and **not yet built**.
> Nothing below is a claim that a feature already works — see the
> [maturity labels](docs/PROJECT.md#maturity-labels).

---

<a id="why-this-problem-statement"></a>

## Why This Problem Matters

"Add a chatbot to a course catalogue" does not solve this challenge. The difficulty is
what a family needs help resolving:

- **The decision-maker is not the user.** A learner-only tool optimises the wrong
  person. Kinvia models the family as one unit, with separate concerns for each member.
- **Generic reassurance does not move a sceptical parent.** "Vocational jobs pay well"
  is a claim; "*electricians trained at this centre in your district earned
  ₹14,000–₹19,000 a month in their first year, 68% placed*" is evidence (figures here
  are illustrative only). Every number shown to a family must be real, local and
  traceable.
- **Large language models invent numbers.** A counselling tool that hallucinates a
  salary does real harm to a poor family. In Kinvia, figures are **never generated by
  the model** — they are fetched from the verified outcome database and rendered with
  their source.
- **Low literacy and low digital familiarity.** Many parents will not read paragraphs
  or type. Voice, icons, regional language and a shared-device flow are requirements,
  not polish.
- **Resistance must become measurable.** Administrators need to know *where* and
  *why* families say no, so outreach can be targeted. That needs structured objection
  capture, not chat logs.

The scale is real. Media reports of the PMKVY dashboard (Aug 2026) cite about 35.4 lakh
enrolments, 6.8 lakh dropouts and roughly 7% recorded placements — see
[docs/research.md](docs/research.md) for sources and caveats.

---

## Design Philosophy: Counsel the Family, Not Just the Learner

1. **One session, several voices.** The learner and each parent can speak; Kinvia tags
   who raised which concern and answers each person directly.
2. **Evidence before persuasion.** Kinvia's job is an informed family decision, not
   maximum enrolment. If local data for a trade is weak, it says so and suggests
   better-performing alternatives.
3. **Numbers come from data, words come from the model.** The language model explains
   and empathises; the outcome database supplies every figure.
4. **Human when it matters.** Low confidence, a sensitive concern or an explicit request
   hands the family to a live counsellor with full context.
5. **Consent first.** Many learners are under 18; parental consent is built into the
   family flow from the start (see [docs/privacy.md](docs/privacy.md)).

---

## Product Surfaces

| Surface | Purpose |
|---|---|
| **Family session** | Voice-first chat in the family's language; objection handling; Evidence Cards; pathway map; take-home summary |
| **Pathway explorer** | Plain-language NSQF ladder for a trade: course → job role → level-ups → further education, tailored to location and background |
| **Counsellor Desk** | Escalation queue, session summary, open objections, call-back scheduling |
| **Scheme Insights dashboard** | Objection heatmap by district, sentiment shift before/after counselling, top unanswered questions, trade-level interest |
| **Outcome data admin** | Upload and validate placement/earnings data with source and date; flag stale or thin data |

Architecture and stack proposals: [docs/architecture.md](docs/architecture.md) and
[TechStack.md](TechStack.md).

---

## Proposed Innovation: The Family Trust Card

At the end of every session Kinvia produces a **Family Trust Card** — one shareable
page (image/PDF, WhatsApp-friendly) in the family's language that bundles:

- the **trades discussed** and the pathway the family is considering;
- **verified figures** — earnings range, placement rate, progression — each with its
  **source, date and sample size**;
- the **family's own concerns** and how each was answered;
- **schemes the learner may be eligible for** (for example apprenticeship stipends or
  scholarships), marked as *check eligibility*, not as a guarantee;
- **next steps** — nearest training centres, a counsellor call-back, or a visit date.

Indian career decisions are often made with grandparents, relatives and elders who were
not in the room. The Trust Card carries the evidence to them. It also gives families
and counsellors an inspectable artifact that shows every number Kinvia used and where
it came from.

---

## Further Innovations

Full research, rationale and priority: [docs/innovation.md](docs/innovation.md).

| Innovation | One-line idea |
|---|---|
| **Objection Graph** | Structured taxonomy of family objections (income, status, safety, marriage prospects, distance, cost…) feeding the administrator heatmap |
| **Grounded figures** | The model can only cite numbers retrieved from the verified outcome store; anything else is blocked |
| **Two-path projection** | Side-by-side 5-year view of "degree path" vs "vocational path": fees, foregone income, earnings ranges — honest ranges, never promises |
| **Local proof stories** | Short verified alumni stories from the same district and community, in their own voice |
| **Safety & dignity answers** | Dedicated answers for girls' training: women-only batches, hostels, transport, workplace safety |
| **Confidence shift score** | Short pre/post check of family confidence, aggregated for administrators to see what actually changes minds |
| **Counsellor copilot** | Escalated sessions arrive summarised, with suggested evidence, so counsellors never restart the conversation |
| **Low-bandwidth mode** | Installable PWA, cached content, compressed voice; planned WhatsApp and IVR/missed-call channels for feature phones |

---

## Project Boundaries & Trust Model

These are design requirements, not aspirations:

- **No invented figures.** Earnings, placement and progression numbers shown to a
  family must come from the outcome store with a visible source and date.
- **No hidden persuasion.** Kinvia does not rank trades by provider commercial interest
  and does not hide unfavourable local data.
- **Consent and minimisation.** Collect only what counselling needs; obtain parental
  consent for minors; administrators see aggregates, not individual conversations.
- **Human escalation always available.** A family can ask for a person at any point.
- **Nothing sensitive in version control.** No real learner data, recordings,
  credentials or `.env` files — synthetic or licensed dummy data only.

---

## Repository Structure

```text
kinvia/
├── backend/               # API, counselling orchestration, outcome store (planned)
├── frontend/              # Prototype website: family session, counsellor desk, dashboard (planned)
├── data/
│   └── samples/           # Synthetic sample data only — never real learner records
├── docs/
│   ├── PROJECT.md         # Product contract: scope, users, requirements, maturity labels
│   ├── architecture.md    # Components, data flow, grounding and escalation design
│   ├── innovation.md      # Innovation research and priorities
│   ├── research.md        # Problem evidence, data sources and references
│   ├── privacy.md         # Consent, minors, DPDP Act alignment, data handling
│   └── sih-ppt-submission-brief.md  # Product presentation brief (existing URL retained)
├── agent-memory/          # Searchable record of repository-affecting work
├── scripts/               # Hook installer and repository tooling
├── TechStack.md           # Proposed languages and technologies per layer
├── tasks.md               # Phases, work packages and acceptance outcomes
├── CONTRIBUTING.md        # Branch, review and merge workflow
├── AGENTS.md              # Rules for coding agents working in this repository
└── README.md
```

## Start Here

There is no runnable prototype yet. To get oriented:

1. Read [docs/PROJECT.md](docs/PROJECT.md) for scope and requirements.
2. Read [tasks.md](tasks.md) for the current phase and development milestones.
3. Install the local git hooks once per clone:

   ```bash
   ./scripts/install-hooks.sh
   ```

## Contributing

Follow [CONTRIBUTING.md](CONTRIBUTING.md): `your branch → dev → main`, pull requests only.

## Licence

Licensed under [Apache-2.0](LICENSE). Third-party datasets and
models keep their own licences and are not relicensed by this repository.

---

<div align="center">

*Kinvia — helping families decide on vocational training with evidence, together.*

</div>

---

## Team

**Team Name: Rokunin Sync**

| Member | GitHub |
|---|---|
| Prachi | [@prachi-satbhai0741](https://github.com/prachi-satbhai0741) |
| Aditya | [@adityatadge31](https://github.com/adityatadge31) |
| Vedant | [@vedantsur09](https://github.com/vedantsur09) |
| Yug | [@Yugu-48](https://github.com/Yugu-48) |
| Tanvi | [@tanvishinde3010](https://github.com/tanvishinde3010) |
| Sahil | [@sahilranade45](https://github.com/sahilranade45) |
