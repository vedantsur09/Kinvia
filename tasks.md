# Kinvia Tasks

| Field | Value |
|---|---|
| Current phase | **P0 — Product foundation** |
| Last updated | 2026-10-20 |

Each work package lists its acceptance outcome. Use maturity labels from
[docs/PROJECT.md](docs/PROJECT.md#maturity-labels).

<a id="p0--idea-submission-35-oct-2026"></a>

## P0 — Product foundation

| ID | Work package | Acceptance outcome |
|---|---|---|
| P0-01 | Repository foundation | README, docs, workflow files, branches and collaborators in place |
| P0-02 | Product presentation (optional) | Product overview from the [presentation brief](docs/sih-ppt-submission-brief.md); format adapted to the audience |
| P0-03 | Figure verification | Every product figure checked against a primary source in [docs/research.md](docs/research.md) |
| P0-04 | Visuals (optional) | Hero-flow diagram, architecture diagram, UI mockups for a product walkthrough |
| P0-05 | Basic prototype website | Landing page + clickable family-session mockup (static data acceptable, labelled) |

<a id="p1--working-prototype-after-submission"></a>

## P1 — Working prototype

| ID | Work package | Acceptance outcome |
|---|---|---|
| P1-01 | Outcome store + synthetic data loader | Trades, providers, outcomes, pathways, schemes queryable |
| P1-02 | Family session (text) | Hindi + English conversation answering INC/STA/JOB objections with grounded figures |
| P1-03 | Grounding guard | Unbacked numeric claims blocked in automated tests |
| P1-04 | Speech | Voice in/out via speech adapter for Hindi |
| P1-05 | Trust Card | Regional-language PNG/PDF with sourced figures |
| P1-06 | Escalation + Counsellor Desk | Queue with session summary and open objections |
| P1-07 | Scheme Insights dashboard | District objection heatmap and confidence shift |
| P1-08 | Consent flow | Parent consent recorded before storing minor data |

<a id="p2--finale-hardening"></a>

## P2 — Product hardening

- Second regional language; low-bandwidth PWA mode; scheme eligibility hints.
- Usability test with real families (with consent) — evidence for low-literacy design.
- WhatsApp / IVR channel design; deployment notes.
