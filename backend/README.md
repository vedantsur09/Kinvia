# Kinvia Backend

**Status: planned — no code yet.**

Will hold the Kinvia API described in [docs/architecture.md](../docs/architecture.md):

- session service and consent record
- speech adapter (Bhashini / self-hosted AI4Bharat models)
- counselling orchestrator (LLM + tools: `query_outcomes`, `get_pathway`, `check_schemes`, `escalate`)
- objection tagger
- grounding guard
- outcome store, escalation service, Trust Card renderer, aggregated analytics

Proposed stack: Python / FastAPI, SQLite → PostgreSQL. See [TechStack.md](../TechStack.md).
