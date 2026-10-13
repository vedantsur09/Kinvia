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

## AC-002 — 2026-10-03 — PPT content pack (UP-002)

- **Changed:** added `ppt/kinvia-ppt-content.md` — slide-by-slide copy mapped onto the
  Refinix six-slide skeleton, claim tags (fact / design / vision), innovation boxes,
  competitor table, extra-features bank, guardrails and a 30-entry source table.
- **Verified:** ASER 2023 figures read directly from the ASER key-findings PDF; other
  figures taken from search results and fetched pages as listed in the source table.
- **Unverified:** NEP 2020 PDF, Lok Sabha AS138 PDF and NITI ITI PDF could not be fetched
  directly; marked for primary confirmation before upload. Existing `docs/` files were
  not changed (protected).

## AC-003 — 2026-10-04 — Upgraded technology stack (UP-003)

- **Changed:** `ppt/kinvia-ppt-content.md` slide 3 now carries the production stack per
  architecture stage, lower boxes, deployment model with K3s edge node, grouped tech row,
  a per-technology rationale table, a prototype-vs-production split, and sources S31–S42.
- **Verified:** versions and capabilities taken from vendor/project docs and 2026 search
  results listed in the source table; nothing installed or run.
- **Unverified:** `TechStack.md` and `docs/architecture.md` still describe the earlier
  stack; updating them awaits user permission (protected documents).

## AC-004 — 2026-10-04 — PPT swap guide PDF (UP-004)

- **Changed:** added `ppt/Kinvia-PPT-Swap-Guide.pdf` (21 pages): intro with ATS tips,
  pre-upload checks and an auto-checked PS keyword table; per slide, a pinned Refinix
  thumbnail and a swap table (Refinix text, Kinvia paste text, character counts).
- **Verified:** Refinix text extracted from the source PDF; all 28 PS keywords found in
  the new text; PDF rendered and pages 1, 2 and 5 inspected visually.
- **Unverified:** final fit inside the actual PPT text boxes; figures flagged for
  primary-source checks remain flagged.

## AC-005 — 2026-10-05 — Prototype website (UP-005)

- **Changed:** replaced the `frontend/` placeholder with a static PWA: `index.html`,
  `try.html` + `session.js`, `desk.html` + `desk.js`, `insights.html` + `insights.js`,
  `data.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `icon.svg`; rewrote
  `frontend/README.md`. Also added `ppt/kinvia-docs-swap.txt` (documentation swap draft).
- **Verified (local browser, http://localhost:5180):** no console errors; full English
  session (consent, trade, five concerns, grounding tags, escalation to Desk); Hindi
  session with a no-record district returns one "no verified data" answer; Trust Card
  shows previously shown evidence; Desk lists real + demo tickets; Insights heatmap
  (35 cells), state filter and live session merge; no horizontal overflow at 375 px on
  all four pages.
- **Unverified:** voice recognition and speech output on real devices; offline cache
  after deployment; Canva deck not readable (login required).

## AC-006 — 2026-10-12 — "Lavender glass" redesign (UP-006)

- **Changed:** rewrote `frontend/styles.css` as a mesh-gradient + glassmorphism system
  (violet/rose/gold/mint tokens, Bodoni Moda + Plus Jakarta Sans + Mukta/Tiro, light and
  dark); rebuilt `frontend/index.html` with new sections (problem↔solution split,
  numbered workflow rail, sourced "On the record" quote cards instead of testimonials,
  12-chip technology grid); regenerated `icon.svg` as a gradient mark; retuned the
  Trust Card PNG canvas to the new palette; swapped stale colour tokens in
  `insights.js`/`session.js`; added `?v=N` cache busting across HTML + `sw.js`;
  documented the system in `frontend/README.md`.
- **Verified (local browser):** no console errors on any page; landing, session, desk and
  insights render in both light and dark; heatmap shading restored after the token swap;
  full session run (grounded answers with record ids, honest no-data path, escalation →
  Desk, Trust Card); no horizontal overflow at 375 / 768 / 1280 px.
- **Unverified:** voice input and read-aloud on real devices; appearance of the downloaded
  Trust Card PNG (canvas renders off-screen); offline cache after deployment.

## AC-007 — 2026-10-12 — Identity-led redesign (UP-007)

- **Changed:** cropped `logo-mark.png` and `logo-lockup.png` from the supplied master
  (pure-Python PNG decode/crop, transparency preserved) and placed them in the header,
  hero watermark, footer and app icons; rewrote `styles.css` around the identity
  (graphite / bone / steel with gold reserved for verified evidence and clay for
  unresolved), swapping Bodoni+Jakarta for **Newsreader + Archivo**; rebuilt
  `index.html` with ruled data strips, hairline editorial columns, a single-rule
  workflow, an unequal bento and real data tables in place of the repeated card grids;
  added `icons.js`, a thin-line icon set echoing the gear mark, and removed every emoji
  from the UI and `data.js`; regenerated `icon.svg`; updated the manifest and the
  service-worker shell.
- **Verified (local browser, light and dark):** all four pages render with no console
  errors; no emoji remain; logo present on every page; Newsreader active; heatmap,
  grounded answers, honest no-data path, escalation and Trust Card all still work;
  no horizontal overflow at 375 / 1280 px.
- **Note for future work:** `getComputedStyle` through the preview bridge returned stale
  values during this session (an injected `!important` rule read as unapplied while the
  screenshot showed it applied). Trust screenshots over computed-style probes here.
- **Unverified:** voice input and read-aloud on real devices; the downloaded Trust Card
  PNG (still drawn in the previous palette — worth retuning); offline cache after deploy.

## AC-008 — 2026-10-12 — Lavender palette restored, craft kept (UP-008)

- **Changed:** `styles.css` rewritten back to the lavender/violet reference palette
  (mesh ground, glass panels, plum dark blocks, gold reserved for verified, clay for
  open) while keeping every structural fix from AC-007 — ruled metric strip, editorial
  columns, single-rule workflow, unequal bento, data tables, line icons, no emoji.
  Added a soft-extrude layer (`--neu`, `--neu-sm`, `--neu-inset`) on interactive and
  numeric elements. Type moved to **Bodoni Moda + Figtree**. Restored violet `icon.svg`,
  manifest colours, violet heatmap in `insights.js`, and the Trust Card PNG canvas.
- **Verified (local browser, light and dark):** all four pages render; Bodoni Moda and
  Figtree active; glass confirmed on 5–20 elements per page; no emoji; no horizontal
  overflow at 1280 px; full session run with grounded answers and record ids.
- **Correction logged:** AC-007 overreached by replacing the user's chosen palette with
  a graphite/steel one derived from the logo. The logo informs the accent (gold), not
  the whole scheme.

## AC-009 — 2026-10-12 — Hackathon references removed from the site (UP-009)

- **Changed:** stripped every competition reference from `frontend/`: header badge now
  reads "Prototype"; hero meta chips replaced with product facts (vocational education,
  Hindi + English, voice-first, working prototype); meta description and manifest
  description rewritten; capability-coverage heading made generic; footer credit heading
  changed to "Built by"; portal link and the competition strapline removed from the
  footer; Trust Card footer (English and Hindi) and the `SOURCES` portal entry cleared;
  `.badge-sih` class renamed `.badge`.
- **Verified:** full-text scan of all HTML/JS/CSS/manifest returns no match for the
  competition name, number, team name or portal domain; all scripts parse; landing page
  renders and the hero reads as a product page.
- **Scope note:** removal covers the website only. `ppt/` and the repository docs are the
  submission materials themselves and were left untouched. Ministry (MSDE) references
  stay where they are genuine product context — the Scheme Insights audience and the
  sourced parliamentary citation.

## AC-010 — 2026-10-14 — Product-site restructure + hero illustration (UP-010)

- **Changed:** rebuilt `index.html` as a product site. Removed the pitch-shaped sections
  (problem statistics strip, problem/solution split, sourced pull quotes, requirement
  coverage table, technology status table) and replaced the narrative with: hero →
  How it works → Features → Who it's for → Privacy → call to action. Hero copy is now
  "Every career decision is a family decision." with a matching Hindi line; page title,
  meta description and footer sign-off updated. Added `.family-art`, an inline SVG line
  illustration of a parent and a teenager seated together, composed with the phone mock
  in front; softened the gear watermark so the two do not compete. Nav relabelled to
  product sections across all pages.
- **Verified (light and dark, 390 px and 1280 px):** all four pages render with no
  console errors and no horizontal overflow; no pitch vocabulary remains in the page
  text; hero illustration stays inside its column at every width tested.
- **Note:** stock photography was investigated and discarded at the user's direction —
  the illustration is drawn in-house, so there is no third-party image licence to track.
