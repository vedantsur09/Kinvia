# Kinvia Tech Stack (proposed)

| Field | Value |
|---|---|
| Status | Proposal for the prototype — confirm before implementation |
| Last updated | 2026-10-03 |

Choices favour what the team already used on Refinix (Python/FastAPI, local open-weight
models) so the prototype can be built quickly.

| Layer | Proposed | Why | Alternatives |
|---|---|---|---|
| Frontend | React + Vite + TypeScript, installable PWA | Fast to build, offline caching, mobile-first | Next.js |
| Styling | Tailwind CSS with a custom token set | Speed; large touch targets and high contrast for low-literacy UI | Plain CSS |
| Backend API | Python 3.12+ / FastAPI | Team familiarity; async; easy LLM/tool integration | Node/Express |
| Database | SQLite for the prototype → PostgreSQL for deployment | Zero setup now; clean upgrade path | — |
| LLM | Open-weight instruct model behind a provider interface (local via Ollama for dev) | Swappable; no lock-in; data stays in our control | Hosted API for demo only |
| Orchestration | Plain tool-calling loop in Python | Small, auditable; no heavy agent framework needed | LangGraph |
| Speech (ASR/TTS) | Bhashini APIs | Free, 22 Indian languages, government stack | AI4Bharat IndicConformer / Indic Parler-TTS self-hosted |
| Translation | Bhashini / IndicTrans2 | Indic quality | — |
| Charts / dashboard | Recharts or ECharts; district map via GeoJSON | Heatmap of objections | — |
| Trust Card | Server-side HTML → PNG/PDF render | Shareable on WhatsApp | — |
| Testing | pytest; Vitest; Playwright for the hero flow | Standard | — |
| CI | GitHub Actions (release PR into `main` only) | Mirrors Refinix flow | — |

## Constraints

- Every third-party model/dependency: record source, version and licence before use.
- No real learner data or recordings in the repository or test fixtures.
- Secrets (API keys for Bhashini or any hosted model) only via environment variables;
  `.env.example` documents names, never values.
