# Kinvia Agent Instructions

Repository-wide rules for coding agents working on Kinvia.

Kinvia is a family-inclusive, multilingual AI career-counselling platform for
vocational education. Current product truth is in [`docs/PROJECT.md`](docs/PROJECT.md).

## 1. Authority and conflict handling

When context conflicts, use this order:

1. The **current user request**.
2. This file.
3. [`docs/PROJECT.md`](docs/PROJECT.md) — product, scope and requirement contract.
4. [`docs/privacy.md`](docs/privacy.md) — consent, minors and data handling.
5. [`tasks.md`](tasks.md) — active phase and acceptance outcomes.
6. [`CONTRIBUTING.md`](CONTRIBUTING.md) — branch and merge workflow.
7. Current source, tests and observed output.
8. Research, the PPT brief and `agent-memory/`.

Do not invent product behaviour to resolve a conflict. A requirement in documentation
does not prove it is implemented. Keep `planned → prototyped → tested → demonstrated`
distinct, and never claim a check passed unless you ran it and saw it pass.

## 2. Protected documentation — permission required

Do not edit these without explicit user permission in the current message:
`AGENTS.md`, `README.md`, `tasks.md`, `TechStack.md`, `CONTRIBUTING.md`, and every file
under `docs/`.

Exempt: `agent-memory/userprompts.md` and `agent-memory/agentchangelog.md` may be
appended when repository-affecting work is done.

To propose a change: state the inconsistency, the proposed change, your recommendation,
the trade-off and the files affected — then wait.

## 3. Working with the user

- Read `docs/PROJECT.md` and the active phase in `tasks.md` before asking questions.
- Ask for human-only facts (devices, credentials, portal details); do not guess them.
- Batch prerequisite questions; include a recommendation for every decision question.
- Use **user** and **agent**; no personal names or agent product names in reports.

## 4. Git and GitHub

Allowed without extra authorisation: `git status`, `git diff`, `git log`, `git show`,
`git check-ignore`, `git branch --list`, `git branch --show-current`, `git rev-parse`,
`git ls-files`.

Every Git/GitHub write (add, commit, push, pull, merge, rebase, reset, checkout/switch,
tags, PRs, settings) requires explicit authorisation in the **current** user message.
Never push to `dev` or `main`; the flow is `member branch → dev → main`. Preserve
unrelated dirty-tree changes.

## 5. Implementation behaviour

- Make the smallest coherent safe change; fix root causes; avoid speculative abstractions.
- Reuse suitable open-source libraries; record source, version and licence first.
- **Grounded figures are non-negotiable:** never let a language model produce an
  earnings, placement or progression number shown to users unless it is backed by an
  outcome-store record.
- Label any static or mocked UI as such.
- Do not run test suites, installers, migrations, deployments, model downloads or live
  external API calls without current permission.

## 6. Non-negotiable Kinvia invariants

- Figures shown to families carry source, date and sample size.
- Parental consent precedes storing a minor's data.
- Administrators see aggregates, not individual transcripts.
- Human escalation is always available.
- Never commit real learner/parent data, recordings, transcripts, secrets or model weights.

## 7. Agent memory

`agent-memory/` is searchable history, not the product contract. Log repository-affecting
requests in `userprompts.md` and factual results in `agentchangelog.md`. Keep entries
compact; never store secrets, private data or reasoning. No repository change means no
changelog entry.

## 8. Completion report

Lead with the outcome, then: **Changed** (exact paths), **Verified** (only checks actually
run), **Unverified / limitations**, **User action**, **Next**.
