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

## AC-011 — 2026-10-19 — Website pushed and deployed (UP-011)

- **Changed:** pushed the full `frontend/` prototype to `vedantsur09/Kinvia` branch
  `vedant` (`e2ce08a` site, `3dd3279` logo downscale — `logo-mark.png` 247 KB → 93 KB,
  `logo-lockup.png` 338 KB → 101 KB). No repository file changed in this entry beyond
  those commits; the deployment itself is external state.
- **Verified:** remote confirmed as Kinvia (not Refinix) before every write. Vercel
  project `kinvia-frontend` (root directory `frontend`, framework none) deployed to
  production from `vedant` at `3dd3279`; state READY. `kinvia-frontend.vercel.app`
  returns 200 anonymously, and `index.html`, `try.html`, `desk.html`, `insights.html`,
  `styles.css?v=17`, `logo-mark.png`, `icon.svg`, `manifest.webmanifest` and `sw.js`
  all return 200. Landing page screenshotted live.
- **Unverified / limitations:** `main` still contains only `frontend/README.md`, so the
  project's configured production branch does not yet build the site — this deployment
  was created directly against `vedant`. Pushes to `vedant` will not auto-deploy to
  production until the production branch is changed or `vedant → dev → main` is merged.
  The Vercel-Authentication toggle (`ssoProtection`, `all_except_custom_domains`) is
  still enabled on the project; the API call to clear it was refused by the permission
  classifier and remains a user action.

## AC-012 — 2026-10-19 — Branches merged, production domain added (UP-012)

- **Changed:** merged PR #3 (`vedant` → `dev`, `5b33cd3`) and PR #4 (`dev` → `main`,
  `3e1c115`); `main` now carries all 16 `frontend/` files. Added
  `kinvia-in.vercel.app` as a project domain on the Vercel project.
- **Verified:** Vercel auto-deployed from `main` on the merge (`dpl_EceS…`, state READY,
  target production). `kinvia-frontend.vercel.app` and `kinvia-in.vercel.app` both
  return 200 anonymously and serve the Kinvia landing page; `try.html` returns 200 on
  the new domain.
- **Note:** `kinvia.vercel.app` could not be used — Vercel returned
  `409 owned-on-other-team`; the name is registered to an unrelated account and
  `.vercel.app` subdomains have no release or dispute process. `kinvia-app` is also
  taken. `kinvia-in` was chosen by the user from the free alternatives.
- **Unverified / limitations:** the Vercel-Authentication toggle (`ssoProtection`,
  `all_except_custom_domains`) is still enabled on the project. It is not blocking
  either production URL, but it does gate preview deployments; clearing it was refused
  by the permission classifier and remains a user action.

## AC-013 — 2026-10-19 — Vercel project renamed to `kinvia-in` (UP-012)

- **Changed:** renamed the Vercel project `kinvia-frontend` → `kinvia-in`; its dashboard
  path is now `vercel.com/vedantsur09s-projects/kinvia-in`. No repository file changed.
- **Verified:** `kinvia-in.vercel.app` returns 200 and serves the landing page and
  `try.html` after the rename.
- **Unresolved:** `kinvia-frontend.vercel.app` is still attached as an explicit project
  domain and still resolves. Renaming the project did not detach it, and this MCP
  surface exposes only add/get/list/verify for project domains — no remove or patch —
  so it cannot be deleted from here. The Vercel CLI is not installed and has no stored
  credentials, so the documented CLI fallback is unavailable. Removing it is a user
  action in Settings → Domains.

## AC-014 — 2026-10-19 — Consent gate unblocked on phones; footer rebuilt (UP-013)

- **Changed:** `frontend/styles.css` — the consent overlay now scrolls instead of the
  dialog. `.overlay` gained `overflow-y: auto` + `overscroll-behavior: contain` and
  `justify-items: center`; `.dialog` lost `max-height: calc(100vh - 36px)` /
  `overflow-y: auto` and gained `margin: auto`. Rebuilt the footer as a single plum slab
  (was two stacked gradient blocks): `.footer-top` 3-column brand/Product/How-it-runs,
  a `.footer-team` credit band with gold monograms, and a `.footer-base` carrying the
  synthetic-data notice. `frontend/index.html` — matching footer markup. Bumped
  `styles.css?v=17` → `?v=18` across all four pages and `sw.js`; `CACHE` → `kinvia-v20`.
- **Root cause:** the dialog was capped at `calc(100vh - 36px)`. On a phone `100vh` is
  the large viewport and ignores the address bar, so the dialog rendered taller than the
  visible area and "Agree and start" sat under the browser chrome with nothing
  scrollable. Measured live at 375×812: button at y=777–813 against a 812 viewport,
  `visible: false`. The chat engine itself was never broken.
- **Verified (local, 375×600 and 1280×900):** overlay scrolls and the button becomes
  fully reachable (`reachable: true` after scroll) where it was unreachable before; full
  mobile session runs — consent dismissed, two questions answered, concerns tagged
  Safety/open and Income/answered, grounded reply with record id, zero JS errors; footer
  renders as one slab with a 3×2 credit grid; Desk (2 tickets) and Insights (4 KPIs,
  5 actions) unchanged; no horizontal overflow on any page at either size.
- **Unverified:** behaviour on a real handset's browser chrome; voice input and
  read-aloud on real devices.

## AC-015 — 2026-10-19 — Family-session usability pass and new features (UP-014)

- **Changed:** `frontend/session.js`, `frontend/try.html`, `frontend/styles.css`,
  `frontend/README.md`.
  - **Mobile dead-end fixed:** the reply when no trade was chosen read "Pick one on the
    right", but the sidebar stacks *below* the chat on a phone. The chat now offers an
    inline trade picker (`inlineTrades()`), and the picker disables itself once used.
    The same directional wording was removed from the `PRG` reply in both languages.
  - **Context strip** (`.ctx-bar`) in the chat header showing district, trade and whether
    a verified record exists; each chip scrolls to and flashes the real control.
  - **Typing indicator** with a short per-reply delay, so multi-part answers arrive in
    reading order instead of all at once. Replies are serialised through a promise chain.
  - **Context-aware follow-up suggestions** replace the fixed quick-chip row after each
    answer, offering only concerns not yet raised plus Compare / Trust Card / counsellor.
  - **District comparison** — a new `CMP` intent (kept out of the objection taxonomy,
    since it is not a family concern) renders every verified record for the current trade
    sorted by placement, with the family's own district marked. Restacks to blocks under
    620 px rather than scrolling sideways inside a bubble.
  - **Counsellor nudge** once two concerns are open and no ticket exists.
  - **Session resume** — state persists to `kinvia.active` only when the family consented
    to saving, so a guest session is never revived; a "Resume last session" button appears
    in the consent dialog when a session under seven days old exists.
  - **Transcript download** (.txt) with context, full conversation, concerns and ticket.
  - **Voice feedback** — interim transcripts stream into the input, with a "Listening…"
    line and a recoverable "I didn't catch that" state.
  - Input refocuses after send; welcome copy rewritten to lead with the grounding promise.
  - Bumped `styles.css?v=18` → `?v=19`, `session.js?v=10` → `?v=11`, `CACHE` → `kinvia-v21`.
- **Verified (local, 390×760 and 1280×900, both languages):** `node --check` passes;
  zero runtime errors across every flow exercised. Inline picker renders 6 trades and
  disables after use; context strip flips Pune/verified → Ahmednagar/no-record correctly;
  suggestions narrow as concerns are answered (INC/SAF/PRG/CST → PRG/CST/JOB/CMP);
  comparison returns 3 sorted rows with the family's district marked and record ids
  shown; nudge fires exactly once on two open concerns; honest no-data path intact and
  the grounding guard blocked nothing it should not; transcript builds 24 lines with the
  right content; resume restores 17 bubbles, concerns, district and trade after a reload
  and the session continues normally; Hindi renders throughout. Desk (2 tickets),
  Insights (4 KPIs) and the landing page unaffected; no horizontal overflow anywhere.
- **Unverified:** voice input and read-aloud on real devices (browser speech APIs are
  not exercised headlessly); behaviour on a real handset's browser chrome.

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

## AC-018 — 2026-10-20 — Current development work retained (UP-016)

- **Changed:** merged the fetched `dev` tree into the user branch; resolved the two
  ledger conflicts by keeping incoming history followed by the new entries, and kept
  the current frontend README rather than the old placeholder.
- **Verified:** frontend matches `origin/dev` byte-for-byte; 19 Markdown files and 57
  relative links checked without newly broken links or lost anchors; requirement IDs,
  NFR rows and existing ledger prefixes retained; no unresolved conflicts or whitespace
  errors. Cleanup commit uses the configured user identity with no agent attribution.
- **Limitations:** no application tests or deployments run; remote PR operations follow
  this merge commit and are not claimed complete in this entry.

## AC-019 — 2026-10-21 — Product cleanup review corrections (UP-017)

- **Changed:** restored FR-02 exactly to its original wording and retained OD-04;
  preserved the public-visibility recommendation with the observed public status;
  narrowed dummy-dataset wording in README, PROJECT, research and presentation brief;
  made the references heading generic with the previous anchor retained and the
  presentation link updated. Files: `README.md`, `docs/PROJECT.md`, `docs/research.md`,
  `docs/sih-ppt-submission-brief.md`, plus append-only request/change ledgers.
- **Verified:** 19 Markdown files and 57 relative links/fragments checked without newly
  broken links or lost anchors; references numbered consecutively 1–7; original FR-02
  and OD-04 match `main`; NFR rows, application files, privacy rules and tasks unchanged
  by the correction; `git diff --check` passed. Read-only GitHub check reports the
  repository public; no visibility or settings change was made.
- **Scope:** competition-only portal, idea-count and mandatory presentation gates stay
  removed under the user's independent-product request. Compatibility identifiers,
  historical material, repository About/topics and existing PPT linkage remain.
- **Pending at this entry:** push via the member branch and PR into `dev`, update the
  existing main PR's review notes, and retain the main PR unmerged. No app tests run.
