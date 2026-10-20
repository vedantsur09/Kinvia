# Agent Change Ledger

Factual record of repository changes made by agents. Append only.

## AC-001 — 2026-10-03 — Repository foundation (UP-001)

- **Changed:** created README, AGENTS, CONTRIBUTING, TechStack, tasks, LICENSE
  (Apache-2.0), .gitignore, PR template, pr-flow-guard workflow, pre-push hook and
  installer; docs/PROJECT, architecture, innovation, research, privacy,
  sih-ppt-submission-brief; placeholder READMEs for backend, frontend and data; a
  synthetic sample outcomes CSV.
- **Verified:** relative Markdown links resolve locally; no application code exists to test.
- **Unverified:** all product features are planned; research figures are secondary
  sources pending primary verification.

## AC-016 — 2026-10-20 — Independent product documentation (UP-015)

- **Changed:** targeted README copy, agent introduction, product requirements and
  milestones, presentation brief, innovation/research notes and dummy-data wording
  across contributor, privacy, data, frontend and PR-template docs. Removed competition
  branding, deadlines, portal requirements and organiser-data dependency; presentation
  work is optional. Kept useful requirements, safeguards, existing file paths and old
  section anchors; preserved prior ledger entries.
- **Verified:** `git diff --check`; static inspection of 18 Markdown files and 55
  relative links/fragments with no broken links. All previous section anchors, FR/NFR
  IDs, NFR rows, agent safeguards and privacy principles retained. No competition
  wording found in inspected visible copy after excluding compatibility identifiers
  and historical ledgers. Read-only remote source scan at
  `14f5a8d8b1b633ba00b3d40962cbaca66455fb21` found no competition references in 14
  frontend text files, including HTML titles/metadata, the manifest and SVG icon.
- **Remaining / unverified:** work is local on `aditya`, whose checkout has no app
  source. Live GitHub description and two competition topics still contain linkage;
  remote `main` also retains the original docs and references in
  `ppt/kinvia-docs-swap.txt` and `ppt/kinvia-ppt-content.md`. Legacy document URLs,
  compatibility anchors and historical logs retain identifiers. Live site fetch
  failed; binary image/PDF contents and third-party caches/posts were not inspected.
  No test suites, Git writes, settings changes, publication or deployment performed.

## AC-017 — 2026-10-20 — Git integration preparation (UP-016)

- **Verified:** fetched current remote refs; active CLI and connector identity match
  the user account; commit identity is configured for the user. No open pull requests
  were returned. `aditya` starts at the foundation commit, behind the existing website
  work on `dev`; integration must retain that work and both append-only ledgers.
- **Pending at this entry:** commit/push, merge to `dev`, and the unmerged `main` PR
  with the repository owner requested as reviewer. No agent attribution will be added.
