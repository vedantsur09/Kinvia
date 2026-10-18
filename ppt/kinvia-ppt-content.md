# Kinvia — SIH 2026 PPT Content Pack (SIH26241)

| Field | Value |
|---|---|
| Purpose | Slide-by-slide copy for the 6-slide idea PPT, mapped 1:1 onto the Refinix deck skeleton |
| Skeleton source | Refinix final deck (`IDEA TITLE (3).pdf`) — same layout, same box counts, content replaced |
| Researched | 2026-10-03 |
| Deadline | 5 October 2026 |

## How to read this pack

Every line carries a **claim tag** so the team can be bold without getting caught out by
an evaluator:

| Tag | Meaning | Where it may appear |
|---|---|---|
| **[F]** Fact | Sourced figure or published finding — cite it | Anywhere |
| **[D]** Design | What Kinvia is designed to do (true of the design, not yet built) | Solution, innovation, architecture |
| **[V]** Vision | Ambitious roadmap / scale story ("designed to plug into…", "22-language ready") | Future scope, deployment model, business model |

"Larping" safely = writing **[V]** lines confidently, as *roadmap*, never as *already done*.
See the [claim guardrails](#claim-guardrails) at the end — those protect the selection.

Source IDs like **(S3)** point to the [source table](#source-table).

---

## Slide 1 — Title page

Refinix layout: logo row, product logo, 6 bullet fields, two-person cartoon with thought
bubbles, SIH bulb graphic.

| Field | Content |
|---|---|
| Problem Statement ID | **SIH26241** |
| Problem Statement Title | **AI-Enabled Career Counselling and Family Decision-Support Platform for Vocational Education** |
| Theme | **Smart Education** |
| PS Category | **Software** |
| Team ID | **`VERIFY ON PORTAL`** (Refinix used 142076 — confirm whether it is per team or per idea) |
| Team Name | **Rokunin Sync** |
| Product logo text | **KINVIA** — tagline under logo: *Decide together. Decide with evidence.* |

**Cartoon (replace Refinix's two characters):**

- Left character (worried parent with teenager): bubble — **"ITI? Log kya kahenge?
  Will he even earn?"** (red text for "Log kya kahenge?")
- Right character (counsellor/girl with phone showing Kinvia): bubble — **"Ask
  Kinvia — together!"**

Visual note: keep Refinix's hexagon background and SIH bulb. Phone instead of laptop on
the right (Kinvia is phone-first).

---

## Slide 2 — Idea / Problem / Solution / Innovation / Case studies

### Header banner (two lines, red/green highlights like Refinix)

> Families **decide** vocational futures, but guidance tools **talk only to the student**
> and **no one shows verified local outcomes** — so trained seats stay empty and
> learners drop out.

Colour: red = "talk only to the student", "no one shows verified local outcomes";
green = "Families decide".

### PROBLEM (4 points — bold title + one line)

1. **Family Decides, Tools Ignore It** — Parents make or veto the choice, yet guidance is
   learner-only; only **5.6%** of rural youth (14–18) do vocational courses. **[F] (S1, PS)**
2. **Stigma Over Evidence** — NEP 2020 notes vocational education is *perceived as
   inferior*; **<5%** of India's 19–24 workforce had formal VET vs **75%** Germany. **[F] (S2)**
3. **No Verified Outcome Data** — PMKVY 4.0 stopped tracking placements; ITI seat
   utilisation is just **48.2%**. **[F] (S4, S6)**
4. **Language, Literacy & Counsellor Gap** — **26%** of rural youth can't read a Std II
   text; ~**1 counsellor per 3,000** students. **[F] (S1; S13 industry estimate)**

### SOLUTION (4 points)

1. **Joint Family Counselling** — Voice-first sessions where learner *and* parents speak,
   in their own language. **[D]**
2. **Verified Outcome Engine** — Earnings, placement and progression by trade, centre and
   district — every number with source and date. **[D]**
3. **Personalised Pathway Navigator** — Course → job → NSQF level-up → further study,
   plus schemes the family may qualify for. **[D]**
4. **Counsellor Escalation + Scheme Insights** — One-tap handoff to a human; MSDE sees
   *where* and *why* families say no. **[D]**

### INNOVATION AND UNIQUENESS (5 boxes, same grid as Refinix)

| # | Box title | One-liner | Why it is defensible |
|---|---|---|---|
| 1 | **Family Trust Card** | Shareable, regional-language summary of every figure, concern and next step — evidence the whole family can see. | Decisions are made with relatives who weren't present; Refinix's Proof Card idea applied to families. **[D]** |
| 2 | **Zero-Hallucination Numbers** | AI explains; verified data supplies every salary and placement figure. | LLMs *systematically overestimate salaries* for some jobs (S16) — grounding is a safety feature. **[D]+[F]** |
| 3 | **Objection Intelligence Map** | Tags each concern — income, status, safety, marriage, distance — by speaker; district heatmap for MSDE. | Turns "sentiment" into targeted outreach; no existing tool measures *why* families refuse. **[D]** |
| 4 | **Shared-Phone, Voice-First Mode** | Built for the family phone: voice, icons, read-aloud, multi-speaker. | **89%** of rural youth have a smartphone at home but only **20%** of girls own one (S1). **[D]+[F]** |
| 5 | **Counsellor-in-the-Loop** | AI handles routine questions; escalations reach counsellors pre-summarised. | Multiplies scarce counsellors (S13); AI assistant handled 50,000 messages with <1% needing staff (S10). **[D]+[F]** |

Centre laptop graphic → replace with a **phone** labelled "Innovation And Uniqueness".

### CASE STUDIES (2 — Refinix used two incidents; we use one problem + one proof)

**Recommended pair:**

1. **"PMKVY 4.0: 15.65% of target, placements untracked"** (S4)
   - Quote box: *"Placement was the real barometer for measuring the scheme's success."*
     — Parliamentary panel, as reported from MSDE documents (Mar 2026).
2. **"160-village RCT: jobs information changed family decisions"** (S9, QJE 2012)
   - Quote box: *When families saw real job opportunities, young women stayed in
     school/training longer and delayed marriage.* (paraphrase — keep as paraphrase)

**Backup:** "Georgia State AI assistant RCT: +3.3 pp on-time enrolment" (S10).

---

## Slide 3 — Technical Approach

### SYSTEM ARCHITECTURE (7 stages, left → right, same boxes as Refinix)

| # | Stage (Refinix equivalent) | Contents | Technology |
|---|---|---|---|
| 1 | **Family Interface** (User Interface) | Voice · Text · Shared phone · Kiosk · WhatsApp · Missed-call IVR | Next.js 16 PWA · LiveKit (WebRTC + SIP) · WhatsApp Cloud API |
| 2 | **Session & Consent** (Coordinator) | Language pick · Who is speaking · **Verifiable parental consent** (DPDP Rule 10) · Family context | Keycloak · DigiLocker consent flow · hash-chained consent ledger |
| 3 | **Understand** (Orchestration & Routing) | Live speech-to-text (22 languages, Hinglish) · Turn detection · **Objection tagging** by speaker | LiveKit Agents · Sarvam Saaras v3 / Bhashini ASR · small objection classifier |
| 4 | **Counselling Orchestrator** (Execution) | Stateful counselling graph; calls tools: outcomes · pathways · schemes · escalate | LangGraph 1.0 · MCP tool servers · model router |
| 5 | **Verified Outcome Engine** (Secure Tools) | Trade × centre × district: earnings range, placement %, progression — source · date · sample size | PostgreSQL 18 + pgvector + PostGIS · exposed as an MCP server |
| 6 | **Grounding Guard** (Validation) | Blocks unverified numbers · Safety, bias and PII checks · Low confidence → escalate | Numeric grounding check · NeMo Guardrails · Llama Guard 4 · Presidio |
| 7 | **Answer + Trust Card** (Approval & Proof) | Voice reply · Evidence Card · **Family Trust Card** · Counsellor handoff (human-in-the-loop) | Sarvam Bulbul v3 / Bhashini TTS · LangGraph `interrupt` · Trust Card renderer |

### Lower three boxes

| Box | Contents |
|---|---|
| **Secure & Consented Communication** | Family device ↔ TLS + OIDC (Keycloak) ↔ Kinvia API · Role-based access for family / counsellor / admin · PII redacted before logs (Presidio) |
| **Data & Knowledge Layer** | **PostgreSQL 18** (canonical state) · **pgvector** (scheme & trade retrieval) · **PostGIS** (district maps) · **Redis 8** (live session state, Streams event bus, semantic cache) · **ClickHouse** (objection analytics at national scale) **[V]** |
| **Deployment & Infrastructure** | **Docker** · **Kubernetes** (Helm, Argo CD GitOps, KEDA autoscaling) · **vLLM** model serving on GPU nodes · **Temporal** durable workflows · **K3s** edge node at training centres **[V]** · India-resident government cloud **[V]** |

### DEPLOYMENT MODEL (3 modes, arrows between — mirrors Single / Distributed / Enterprise)

| Mode | Copy |
|---|---|
| **Family Phone** | Installable PWA + WhatsApp + missed-call IVR on the phone the family already has. **[D]** |
| **Centre Edge Node** *(highlight with medal like Refinix)* | K3s box at an ITI / PMKVY centre runs kiosk + counsellor desk and keeps counselling alive on weak internet, with on-device Indic speech; syncs when online. **[D]+[V]** |
| **State / National Cloud** | Kubernetes cluster on India-resident government cloud: vLLM serving, Scheme Insights for district committees, State Skill Missions and MSDE; designed to plug into SIDH/SIA through MCP. **[V]** |

### TECH STACK ROW (logos, grouped like Refinix)

| Group | Items |
|---|---|
| Frontend & channels | Next.js 16 (PWA) · Tailwind CSS v4 · MapLibre GL · Apache ECharts · WhatsApp Cloud API |
| Voice AI | LiveKit Agents · Sarvam Saaras v3 / Bulbul v3 · Bhashini · AI4Bharat IndicConformer (offline) |
| Agent & AI | LangGraph 1.0 · Model Context Protocol · Sarvam-M (open-weight) on vLLM · NeMo Guardrails · Llama Guard 4 |
| Backend & workflows | Python · FastAPI · Temporal |
| Data | PostgreSQL 18 · pgvector · PostGIS · Redis 8 · ClickHouse |
| Infra & ops | Docker · Kubernetes · K3s · Argo CD · KEDA · OpenTelemetry · Langfuse · Keycloak |
| Links | **VIDEO** · **WEBSITE** (prototype site) |

If the row is too crowded, keep these 12 logos: **Next.js · LiveKit · Sarvam · Bhashini ·
LangGraph · MCP · vLLM · FastAPI · Temporal · PostgreSQL · Redis · Kubernetes**.

### Why each technology is there (for Q&A — every logo has a job)

| Technology | Its job in Kinvia | Why this one |
|---|---|---|
| **LiveKit Agents** | Live voice conversation: streaming, interruptions, turn detection; SIP for missed-call IVR | Most-used open-source voice-agent framework; transformer turn detection; native telephony (S31) |
| **Sarvam Saaras v3 / Bulbul v3** | Speech-to-text for 22 Indian languages + English with code-mix; natural Indic voices | Indic-first; Saaras v3 covers 23 languages with codemix mode (S32) |
| **Bhashini** | Government language stack: ASR, TTS, translation | National platform; 350+ models (S11); provider-swappable with Sarvam |
| **AI4Bharat IndicConformer** | Offline speech on the centre edge node | MIT-licensed; works without internet |
| **LangGraph 1.0** | Counselling as a stateful graph; checkpoint every step; `interrupt` pauses for a human counsellor and resumes hours later | Stable 1.0 with durable execution and human-in-the-loop (S33) |
| **Model Context Protocol (MCP)** | Outcome Engine, NSQF pathways and scheme rules exposed as standard tools | Open standard under the Linux Foundation's Agentic AI Foundation; lets SIA or any agent reuse our verified data (S34) |
| **Sarvam-M on vLLM** | Open-weight Indic LLM for reasoning and replies, served on our own GPUs | 24B open weights tuned for Indian languages (S15); vLLM is the standard high-throughput server, Kubernetes-native via KServe/llm-d (S35) |
| **Model router** | Small model for objection tagging, large model for counselling replies | Reuses the Refinix capability router; cuts cost and latency |
| **NeMo Guardrails + Llama Guard 4** | Dialog policy (never promise a job, escalate sensitive topics) + safety classification | Complementary open-source rails (S36) |
| **Presidio** | Strips phone/Aadhaar/name from transcripts before logs and analytics | Supports DPDP data minimisation |
| **Temporal** | Durable workflows: counsellor call-back deadlines, 3/6/12-month outcome follow-ups, consent-expiry deletion | MIT-licensed durable execution; workflows survive crashes and redeploys (S37) |
| **PostgreSQL 18 + pgvector + PostGIS** | Canonical records, semantic retrieval of scheme/trade documents, district geometry for heatmaps | One database, three capabilities; pgvector 0.8 supports PG 18 (S38) |
| **Redis 8** | Live session state, rate limiting, Streams event bus, semantic cache for repeated questions | Open source again (AGPLv3) with vector sets and native JSON (S39) |
| **ClickHouse** | Objection analytics across districts and months | Column store for fast drill-down at national scale |
| **Next.js 16 PWA** | Family, counsellor and admin apps; installable; offline cache | LTS release with stable Turbopack and React 19.2 (S40) |
| **Keycloak + DigiLocker** | Counsellor/admin login; verifiable parental consent | DPDP Rule 10 names Digital Locker for parent verification (S12, S41) |
| **Docker · Kubernetes · K3s** | Containers; cloud cluster; lightweight edge cluster at centres | Same proven pattern as Refinix |
| **Argo CD · KEDA** | GitOps deploys; autoscale workers on queue depth | Admission season spikes need elastic scale |
| **OpenTelemetry + Langfuse** | Trace every AI call, prompt version and grounding score | Open-source, self-hostable LLM observability on OTel (S42) |

### Prototype vs production (say this honestly if asked)

| Built for the prototype website | Shown as production architecture |
|---|---|
| Next.js PWA · FastAPI · LangGraph · PostgreSQL + pgvector · one speech provider · grounding check · Trust Card | LiveKit IVR · vLLM on Kubernetes · Temporal · ClickHouse · K3s edge · Keycloak/DigiLocker · full guardrail stack |

---

## Slide 4 — Feasibility and Viability

### FEASIBILITY (4 bullets)

- **Technical:** Built on mature open-source stacks — LangGraph 1.0, LiveKit, vLLM,
  Temporal, PostgreSQL 18; Bhashini already serves **350+ models** and **24M inferences a
  day** (S11); our team already runs Docker/K3s/Redis and a model router in Refinix. **[F]**
- **Economic:** Free public language APIs + open-weight models; runs on **existing
  family phones and ITI computers** — no new hardware. **[F]+[D]**
- **Operational:** Fits existing counselling at ITIs, PMKVY centres and NCS Model Career
  Centres; organiser provides dummy outcome datasets for the build. **[F] (PS, S14)**
- **Security:** Built for **DPDP Rules 2025** — verifiable parental consent (Rule 10),
  data minimisation, aggregate-only dashboards. **[F] (S12)**

### VIABILITY (4 stats — Refinix used Market / Adoption / Investment / Readiness)

- **Scale:** ~**25 million** Indians enter each single-year age cohort (S1); **14,600+**
  ITIs run at **48.2%** seat utilisation (S6). **[F]**
- **Adoption:** **886M** active internet users, **488M** rural; **98%** consume Indic-language
  content (S8). **[F]**
- **Investment:** **₹8,800 cr** Skill India Programme (Cabinet, Feb 2025) (S5) + **₹60,000 cr**
  PM-SETU for 1,000 ITIs (S7). **[F]**
- **Policy pull:** PMKVY 5.0 plans **post-training outcome monitoring** + APAAR ID link
  (S4); NEP target: VET exposure for **50%** of learners (S2). **[F]**

### POTENTIAL CHALLENGES AND RISKS ↔ STRATEGIES (5 pairs)

| # | Risk | Strategy |
|---|---|---|
| 1 | **AI gives wrong salary/placement figures** | Numbers only from the verified store — with source, date, sample size |
| 2 | **Low literacy & digital confidence** | Voice-first, icons, shared-phone family mode, counsellor-assisted kiosk |
| 3 | **Thin or outdated outcome data** | Show sample size & date; follow-up calls refresh data; escalate when missing |
| 4 | **Minor's data & consent** | DPDP-aligned parental consent, minimal data, aggregate dashboards |
| 5 | **Bias — steering girls to "female" trades** | Bias tests, non-traditional trade exposure, safety answers for daughters (S6 notes stereotyped courses) |

### BUSINESS MODEL (4 stacked blocks)

1. **Free for Families (B2C)** — Always free: talk, compare, take home the Trust Card.
2. **Government (B2G)** — MSDE, DGT, State Skill Missions licence per district/state;
   counselling layer for PM-SETU ITIs and PMKVY centres. **[V]**
3. **What do they pay for?** — Deployment & language packs · Outcome-data integration and
   verification follow-ups · Counsellor Desk + Scheme Insights · Training & support.
   Also: training providers (per-centre plan) and **CSR** — ₹1,429.73 cr went to
   vocational skills in FY24 (S17). **[F]+[V]**
4. **Growth flywheel** — More families → More verified outcomes → Better advice → More
   districts. **[V]**

---

## Slide 5 — Impact and Benefits

### National-vision banner (replace "Atmanirbhar Bharat Vision")

**Viksit Bharat @2047 · Skill India · NEP 2020** — *Making vocational paths a **first
choice**, not a fallback, by giving every family **verified, local, in-language
evidence**.*

### IMPACT (4 boxes around the central "IMPACT" bubble)

| # | Box | Sub-title | Copy |
|---|---|---|---|
| 1 | **Impact on Families** | *Informed joint decisions* | Learner and parents decide together with local evidence, not rumours. |
| 2 | **Trust & Transparency** | *Every number traceable* | Earnings and placement figures show source and date; the Trust Card travels to relatives. |
| 3 | **Counsellor Reach** | *AI triage, human care* | Routine questions answered instantly; counsellors spend time on hard cases. |
| 4 | **Policy Intelligence** | *Where and why families refuse* | District objection maps let MSDE target outreach and fix real barriers. |

### SDG ALIGNMENT (3 tiles)

- **SDG 4 — Quality Education** (Target 4.4): more youth with job-relevant skills.
- **SDG 5 — Gender Equality**: safety answers for daughters; female labour-force
  participation is only **40.0%** (S18) and female ITI enrolment **6.6%** (S6). **[F]**
- **SDG 8 — Decent Work** (Target 8.6): fewer youth not in employment, education or training.

### BENEFITS (Social / Economic / Environmental — same three quote boxes)

- **Social:** Reduces vocational stigma · Answers safety concerns for girls · Gives
  low-literacy parents a voice.
- **Economic:** Fills existing ITI seats (48% utilised) · Better return on public skilling
  spend · Formal VET earns a significant wage premium (S3). **[F]**
- **Environmental:** Remote counselling cuts family travel and paperwork · Surfaces
  green-job trades (e.g. solar PV installer).

### SCREENSHOTS

Use 2 screenshots of the prototype site: **family session with Evidence Card** + **Scheme
Insights heatmap**. Flow strip: **Kinvia → Talk Together → Decide With Evidence**.

---

## Slide 6 — Research and References

### RESEARCH (6 rows: No. / Title / Year / Key points used / Link)

| No. | Title | Year | Key point used | Link |
|---|---|---|---|---|
| 1 | Jensen — *Do Labor Market Opportunities Affect Young Women's Work and Family Decisions? Experimental Evidence from India* (QJE) | 2012 | Job information changes family decisions | (S9) |
| 2 | Page & Gehlbach — *How an Artificially Intelligent Virtual Assistant Helps Students Navigate the Road to College* (AERA Open) | 2017 | AI conversational guidance +3.3 pp enrolment | (S10) |
| 3 | Jensen — *The (Perceived) Returns to Education and the Demand for Schooling* (QJE) | 2010 | Correcting perceived returns raises schooling | (S19) |
| 4 | Lewis et al. — *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (NeurIPS) | 2020 | Grounded answers from verified data | (S20) |
| 5 | Javed et al. — *IndicVoices: Inclusive Multilingual Speech Dataset for Indian Languages* (ACL Findings) | 2024 | Speech AI for all 22 scheduled languages | (S21) |
| 6 | Trabelsi, Shaki & Kraus — *Pro-AI Bias in Large Language Models* (arXiv) | 2026 | LLMs overestimate salaries → need grounding | (S16) |

### COMPARISON TABLE (5 features × 5 alternatives; Refinix-style ✅ ⚠️ ❌)

| Feature | **KINVIA** | SIA (MSDE–Meta, WhatsApp) | NCS Portal | UNICEF state career portals | Mindler | Generic chatbot |
|---|---|---|---|---|---|---|
| Joint family / parent counselling | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ❌ |
| Voice in regional languages | ✅ | ⚠️ (Eng/Hindi/Hinglish) | ❌ | ⚠️ (text, ~10 langs) | ⚠️ | ⚠️ |
| Verified local outcome data | ✅ | ❌ | ⚠️ (vacancies) | ❌ | ❌ | ❌ |
| Human counsellor escalation with context | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ❌ |
| Objection analytics for administrators | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ❌ |

Refinix showed 4 competitors — drop one column if space is tight (drop "Generic chatbot"
first). ⚠️ = partial or not publicly documented; verify before submission (S22–S25).
**Positioning line under table:** *Kinvia is designed to complement SIA/SIDH as its
family-counselling layer, not to replace it.* **[V]**

### FUTURE SCOPE (4 boxes)

1. **Outcome Verification Loop** — Follow-ups at 3/6/12 months, and consented APAAR /
   DigiLocker credentials, keep outcome data honest — aligned with PMKVY 5.0 outcome
   monitoring. **[V]**
2. **WhatsApp + IVR Reach** — Missed-call voice counselling for feature phones; designed
   to plug into SIA on WhatsApp. **[V]**
3. **All-22-Language, Offline-Ready** — IndicVoices-class speech models running on a
   centre laptop for low-connectivity districts (Refinix know-how). **[V]**
4. **Alumni Voices + Opportunity Matching** — Verified stories from district alumni; link
   families to PM Internship (₹5,000/month) and apprenticeship stipends. **[V]+[F] (S26)**

### Links box

Kinvia **Website** · **GitHub** (vedantsur09/Kinvia — decide visibility first) ·
**Documentation** · **Channel/Video**.

---

## Extra features bank (use in speech, Q&A, or to swap a box)

| Feature | Pitch line | Evidence hook |
|---|---|---|
| **Two-Path Reality Check** | Degree vs vocational, 5 years side by side: fees, lost income, earnings ranges — as pictures, not maths. | Only 11% of rural youth could compute a loan repayment (S1) |
| **Scheme Wallet** | "You may be eligible": PM Internship ₹5,000/month + ₹6,000 one-time; NAPS stipend support up to ₹1,500/month; boarding & transport support for women. | (S26, S27) |
| **Safe Path for Daughters** | Women-only batches, hostels, transport — answered before the parent asks. | Female ITI enrolment 6.6%; hostel/transport cited as barriers (S6) |
| **Confidence Shift Score** | Two taps before/after: did the family's confidence actually move? | Makes the PS's "sentiment shift" measurable |
| **Mobiliser Co-pilot** | Training-centre mobilisers use Kinvia in home visits. | PMKVY dropouts tied to mobilisation, migration, early jobs (S28) |
| **Dropout Early Warning** *(finale)* | Families flag new objections mid-course; centre is alerted. | AJNIFM dropout reasons (S28) |

---

## Speaker one-liners (6 slides, ~1 minute each)

1. *"In India, a parent often decides whether a child joins an ITI — yet no tool talks to
   that parent."*
2. *"Kinvia counsels the whole family, in their language, and every number it shows comes
   from verified local data."*
3. *"The language model explains and empathises; the data engine supplies every figure;
   the guard blocks anything unverified."*
4. *"It runs on phones families already own and ITIs already have, on public Indian
   language infrastructure."*
5. *"Seats that sit empty today get filled by families who chose with confidence — and
   MSDE finally sees why others say no."*
6. *"Kinvia doesn't ask families to trust a chatbot — it shows them where every number
   came from."*

---

## Claim guardrails

**Bold but safe (use freely):** "designed to", "22-language ready architecture", "built on
Bhashini", "district-to-national design", "designed to complement SIA/SIDH", "pilot plan:
one district, five ITIs".

**Say only after it is true:** "working prototype" (only if the site actually runs the
flow), "Hindi voice demo", any accuracy %, any user count.

**Never say:** "integrated with SIDH/SIA", "MoU/partnership with MSDE or any state",
"piloted with N families", invented placement/earnings numbers, invented accuracy or
dropout-reduction percentages. Evaluators include the problem-owner ministry — a fake
claim about *their own* systems is the fastest way to be rejected.

**Figures to re-check on the primary source before upload:** S4 (MSDE docs via media),
S13 (industry estimate), S27 (Lok Sabha reply PDF), S6 (NITI report PDF).

---

## Source table

| ID | Source | Used for | Grade |
|---|---|---|---|
| S1 | [ASER 2023 "Beyond Basics" — Key Findings (Pratham)](https://asercentre.org/wp-content/uploads/2022/12/ASER-2023-Main-Findings_Final-22.2.24-1.pdf) | 5.6% in vocational courses; 73.6% read Std II (≈26% cannot); 89% smartphone at home, 31% own (girls 20%, boys 44%); 11% loan repayment; ~25M per age cohort | Primary (read directly) |
| S2 | NEP 2020, Section 16 (Ministry of Education) — summarised by [Cyril Amarchand](https://corporate.cyrilamarchandblogs.com/2020/09/nep-2020-vocational-education-fuel-for-the-indian-demographic-dividend/) and [SPRF](https://sprf.in/?p=22993) | "Perceived inferior"; <5% vs USA 52%, Germany 75%, S. Korea 96%; 50% target | Primary policy (official PDF blocked to fetch — quote from the PDF) |
| S3 | [IES paper on VET earnings premium, PLFS 2023-24](https://www.ies.gov.in/pdfs/Vishnu-KVenugopal-march25.pdf) | Formal VET wage premium | Primary research |
| S4 | [Careers360, 3 Mar 2026 — MSDE documents on PMKVY 4.0/5.0](https://news.careers360.com/pmkvy-pm-kaushal-vikas-yojana-15-pc-target-skill-india-development-msde-plan-voucher-loan-outcome-bond-apaar-id-new-format) | 15.65% of 3-yr target; 18.79 lakh certified of 33.47 lakh enrolled; placements delinked; PMKVY 5.0 outcome monitoring + APAAR | Media citing official documents |
| S5 | [Careers360 — Cabinet approves ₹8,800 cr Skill India Programme (Feb 2025)](https://news.careers360.com/pm-modi-cabinet-approves-revamped-skill-india-programme-pmkvy-4-0-pmnaps-jss-scheme-rs-8800-crore-outlay) | Investment | Media citing Cabinet decision |
| S6 | [NITI Aayog, *Transforming ITIs* (2023)](https://niti.gov.in/sites/default/files/2023-02/ITI_Report_02022023_0.pdf) via [Careers360 summary](https://news.careers360.com/niti-aayog-iti-study-placement-admission-students-teachers-vocational-education) | 48.20% seat utilisation; 14,789 ITIs; female enrolment 6.6%; hostel/transport/stereotyped courses | Primary report |
| S7 | [Careers360 — ₹60,000 cr PM-SETU ITI upgradation](https://news.careers360.com/cabinet-approves-prime-minister-narendra-modi-rs-60000-crore-national-scheme-for-iti-upgradation) | 1,000 ITIs hub-and-spoke; launched 4 Oct 2025 | Media citing Cabinet decision |
| S8 | [IAMAI–Kantar *Internet in India 2024*](https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI%20report_2024_.pdf) | 886M users, 488M rural, 98% Indic content | Industry primary |
| S9 | Jensen (2012), QJE 127(2): 753–792 — [Harvard GAP summary](https://www.gap.hks.harvard.edu/do-labor-market-opportunities-affect-young-women%E2%80%99s-work-and-family-decisions-experimental-evidence) | 160-village RCT | Peer-reviewed |
| S10 | Page & Gehlbach (2017), AERA Open — [SAGE](https://journals.sagepub.com/doi/10.1177/2332858417749220) | +3.3 pp on-time enrolment; <1% of messages needed staff ([Campus Technology](https://campustechnology.com/articles/2017/03/07/using-ai-chatbots-to-freeze-summer-melt-in-higher-ed.aspx)) | Peer-reviewed |
| S11 | [All India Radio, Mar 2026 — Bhashini](https://www.newsonair.gov.in/bhasha-interface-for-india-bhashini-enables-availability-of-advanced-ai-models/) | 350+ models, 24M inferences/day, 9B cumulative | Public broadcaster |
| S12 | [SCC Online — DPDP Rules 2025 highlights](https://www.scconline.com/blog/post/2025/12/26/digital-personal-data-protection-rules-2025-key-highlights/) | Rule 10 verifiable parental consent; enforceable May 2027 | Legal analysis of official rules |
| S13 | [Wadhwani Foundation — career guidance](https://wadhwanifoundation.org/press/why-career-guidance-is-important-for-students/) | ~1:3,000 counsellor ratio; 93% schools lack a counsellor | Industry estimate — label as "estimate" |
| S14 | [DGE — National Career Service](https://dge.gov.in/dge/sites/default/files/2025-09/2409_e.pdf) | NCS counselling, Model Career Centres | Primary |
| S15 | [Sarvam AI models](https://sarvam.ai/models) / [AIM on Sarvam-M](https://analyticsindiamag.com/ai-news-updates/sarvam-launches-sarvam-m-a-24b-open-weights-model-on-top-of-mistral) | Open-weight Indic LLM | Vendor + media |
| S16 | [Trabelsi, Shaki, Kraus (2026) arXiv:2601.13749](https://arxiv.org/abs/2601.13749) | LLMs overestimate AI-job salaries | Preprint |
| S17 | [The CSR Journal — National CSR Portal FY24](https://thecsrjournal.in/india-inc-spent-rs-34908-75-crore-on-csr-in-fy24-national-csr-portal/) / [CSR data summary](https://csr.dataful.in/s/0e3be03a1f04466abc743b) | ₹1,429.73 cr to vocational skills | Official portal data via media |
| S18 | [MoSPI PLFS Annual Report 2025 press note](https://www.mospi.gov.in/uploads/latestReleases/latest_release_1774607827733_3e8964a9-268b-4cc9-ad65-cfc8a9e32f08_Press_note_AR_PLFS_2025_23032025_V2.1_26032026_final.pdf) | Female LFPR 40.0% | Primary |
| S19 | Jensen (2010), QJE 125(2): 515–548 — [J-PAL](https://www.povertyactionlab.org/evaluation/impact-information-returns-education-demand-schooling-dominican-republic) | +0.20–0.35 years schooling from returns information | Peer-reviewed |
| S20 | Lewis et al. (2020), NeurIPS — arXiv:2005.11401 | Retrieval-augmented generation | Peer-reviewed |
| S21 | [Javed et al. (2024), IndicVoices, ACL Findings](https://arxiv.org/abs/2403.01926v1) | 22-language speech; IndicASR | Peer-reviewed |
| S22 | [Careers360 — MSDE–Meta SIA](https://news.careers360.com/msde-meta-collaborate-launch-ai-assistant-for-skill-india-mission-5-centers-of-excellence-in-vr-mr) / [Elets: SIA on WhatsApp](https://egov.eletsonline.com/2025/05/msde-launches-ai-chatbot-sia/) | SIA: Llama-based, WhatsApp, English/Hindi/Hinglish, voice, course/job discovery | Media citing ministry |
| S23 | [UNICEF India — state career portals](https://www.unicef.org/india/stories/experience-personalized-unique-career-journey) | 13–14 states, regional languages, 21M adolescents | Primary (UNICEF) |
| S24 | [The Week — Mindler Nexus](https://www.theweek.in/wire-updates/business/2024/08/21/dcm11-mindler.html) | Psychometrics, counsellors, school dashboards | Media |
| S25 | Generic LLM chatbots — see S16 | No verified outcome data | — |
| S26 | [Outlook Money — PM Internship Scheme](https://www.outlookmoney.com/news/pm-internship-scheme-financial-aid-to-be-provided-know-registration-closing-date); [IMPRI — NAPS](https://www.impriindia.com/insights/policy-update/national-apprenticeship-promotion-scheme-naps-bridging-indias-skills-and-employment-gap/) | ₹5,000/month + ₹6,000; NAPS 25% up to ₹1,500/month | Media / policy summary |
| S27 | [Lok Sabha Starred Q AS138, 9 Feb 2026 (MSDE)](https://eparlib.sansad.in/bitstream/123456789/3021530/1/AS138_pU6aaw.pdf) | Common Norms: boarding/lodging, transport for women | Primary — PDF did not load for us; open and confirm |
| S28 | Same reply as S27 — AJNIFM 2025 PMKVY 4.0 evaluation | Dropout reasons: exams, seasonal work, early jobs, migration | Primary — confirm in PDF |
| S29 | [Microsoft — Jugalbandi](https://news.microsoft.com/source/asia/features/with-help-from-next-generation-ai-indian-villagers-gain-easier-access-to-government-services/) | Precedent: WhatsApp + AI4Bharat speech + Bhashini for rural users | Primary (vendor) |
| S30 | [Gram Vaani Mobile Vaani](https://mdif.org/news/a-mobile-radio-network-for-the-rural-poor) | Precedent: IVR voice platform for low-literacy users | Secondary |
| S31 | [LiveKit — LiveKit vs Pipecat field guide](https://livekit.io/field-guides/guide/livekit-vs-pipecat) | Transformer turn detection, SIP telephony, Agents 1.5.x (May 2026) | Vendor |
| S32 | [Sarvam API models docs](https://docs.sarvam.ai/api/getting-started/models) | Saaras v3 (23 languages, codemix), Bulbul v3 | Vendor docs |
| S33 | [LangGraph 1.0 announcement (LangChain changelog)](https://changelog.langchain.com/announcements/interrupt-simplifying-human-in-the-loop-agents) | Durable execution, `interrupt` human-in-the-loop | Vendor |
| S34 | [State of agentic AI standards 2026](https://datalakehousehub.com/blog/state-of-agentic-ai-standards-2026) | MCP under Linux Foundation's Agentic AI Foundation | Secondary |
| S35 | [vLLM docs — KServe / llm-d](https://docs.vllm.ai/en/latest/deployment/integrations/llm-d/) | Kubernetes-native LLM serving | Project docs |
| S36 | [LLM guardrails compared 2026](https://alatirok.com/llm-guardrails-compared-2026/) | NeMo Guardrails + Llama Guard 4 roles | Secondary |
| S37 | [Temporal](https://temporal.io/) / [InfoQ on Temporal for agents](https://www.infoq.com/news/2025/09/temporal-aiagent) | MIT-licensed durable execution | Vendor + media |
| S38 | [PostgreSQL news archive](https://www.postgresql.org/about/newsarchive/-/20260226/) / [pgvector for PG 18](https://packagehub.suse.com/packages/postgresql18-pgvector/) | PG 18.x; pgvector 0.8.x | Project |
| S39 | [InfoQ — Redis 8 returns to AGPL](https://www.infoq.com/news/2025/05/redis-agpl-license) | Open-source licence, vector sets | Media |
| S40 | [Next.js 16 release blog](https://nextjs.org/blog/next-16) | Turbopack stable, React 19.2 | Vendor |
| S41 | [CUTS — parental consent verification under DPDP](https://cuts-ccier.org/?p=28892) | DigiLocker-based verification options | Policy research |
| S42 | [Best open-source LLM observability 2026](https://futureagi.com/blog/best-open-source-llm-observability-2026) | Langfuse on OpenTelemetry | Secondary |
