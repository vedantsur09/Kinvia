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

## AC-016 — 2026-10-19 — Counsellor Desk and Scheme Insights upgraded (UP-015)

- **Changed:** `frontend/desk.html`, `frontend/desk.js`, `frontend/insights.html`,
  `frontend/insights.js`, `frontend/styles.css`, `frontend/README.md`.
  - **Desk — triage:** each open ticket carries a "Call first / Call soon" band with the
    reason stated in words (unanswered safety concern, or days waiting ≥ 3), so the
    ranking can be argued with rather than trusted blindly. Queue sorts by urgency,
    longest waiting or newest; search covers trade, district, ticket id, reason and
    schooling; header shows open / in progress / resolved counts plus an urgent count.
  - **Desk — working the ticket:** a third status ("in progress", via "Start calling")
    sits between open and resolved; a "Before you call" brief lists what to have ready
    per unanswered concern; counsellor notes persist to `kinvia.deskNotes` with a saved
    timestamp (button plus blur); "Copy summary" puts a handover block on the clipboard
    with a focus fallback when the clipboard API is unavailable. Selecting a ticket on a
    narrow screen scrolls the detail panel into view.
  - **Insights — priority districts:** new ranked panel scoring concern spread against
    confidence lift, each row naming its most-raised concern and the measured lift.
  - **Insights — heatmap:** added a shade-to-percentage legend, visually hidden per-cell
    labels for screen readers (replacing title-only tooltips), and clickable column
    headers that focus one concern — dimming the rest and refocusing the outreach list
    on that concern across all districts.
  - **Insights — scope and export:** the area selector now offers a single district as
    well as a state; CSV export writes the districts, session counts, per-concern
    percentages and confidence figures behind the current view; print button added.
  - Fixed three malformed `<p class="label">…</span>` tags in `desk.html` and
    `insights.html`.
  - Bumped `styles.css?v=19` → `?v=20`, `desk.js`/`insights.js` `?v=10` → `?v=11`,
    `CACHE` → `kinvia-v22`.
- **Verified (local, 390×760 and 1280×900):** `node --check` passes on both scripts;
  zero runtime errors. Desk — triage orders the safety ticket above the 14-day one with
  correct reasons; search narrows to the Lucknow ticket; newest sort reverses; "Start
  calling" moves the ticket to in progress and the counts follow; notes and statuses
  survive a reload; brief renders one item per open concern. Insights — area selector
  lists 8 scopes, single-district scope narrows to 1 row and 412 sessions, state scope to
  2 districts; focusing Safety dims exactly 30 of 35 cells and refocuses outreach; clear
  restores; legend shows 5 swatches and a 0–47% range; CSV exports a header plus 5 rows
  with correct columns. No horizontal overflow on either page at either size.
- **Unverified:** clipboard write on browsers that block it without a user gesture
  (a focus fallback is in place but was not exercised); print output on a real printer.

## AC-017 — 2026-10-19 — Launch video generated with /brag-slim (UP-016)

- **Changed:** added `brag-output/` (git-ignored) containing `brag.mp4` (21 s,
  1920×1080, 30 fps, H.264 + AAC, 4.3 MB), `brag.jpg` poster, `brag-plan.md` and
  `share-copy.txt`; kept `work/video.html` and `work/score.wav` as the sources.
  Added `brag-output/` to `.gitignore` — a generated binary, not repository content.
- **Method:** followed `skills/brag-slim/SKILL.md` from latent-spaces/brag (MIT) read
  directly from the repo rather than installing the plugin, since `/plugin marketplace
  add` needs an interactive terminal this session does not have. Chose `/brag-slim`
  over the full `/brag` because the latter renders through Hyperframes, which needs a
  HeyGen account the user would have had to create.
- **Tooling:** FFmpeg was absent. Rather than installing one system-wide, pulled
  `ffmpeg-static` 5.2.0 and `puppeteer-core` 23.11.1 into the session scratchpad — no
  host change, nothing left to uninstall. Frames rendered by headless Chrome (already
  installed) against a deterministic `window.seek(t)` timeline; soundtrack synthesised
  with numpy.
- **Content:** six scenes — Hindi objection hook, identity reveal, a real grounded
  answer with record `OUT-PUN-ELE-25`, the honest no-record refusal, the Desk and
  Insights surfaces, outro with the live URL. The render loads the product's own
  `styles.css` over localhost, so the UI shown is the shipped UI.
- **Verified:** probe frames inspected from all six scenes and from a scene turn (the
  turns dip through the background, no double exposure); soundtrack measured at peak
  0.614, zero clipped samples, energy rising toward the outro. Frames re-extracted
  *from the encoded mp4* at 0 / 2.0 / 5.6 / 9.6 / 13.6 / 17.2 / 20.4 s and inspected;
  container reports 21.00 s, 1920×1080, 30 fps, stereo 48 kHz AAC; `volumedetect`
  gives mean −17.1 dB, max −5.6 dB. Poster baked in as frame 0 by replacement, so
  duration and audio sync are unchanged. 1.8 GB of intermediate frames deleted.
- **Honesty:** every figure in the video is one the app actually returns and carries
  its record id; the product's "synthetic demo data" label stays on screen wherever
  figures appear. No invented users, outcomes or testimonials.
- **Unverified:** playback on a real player with sound (checked frame-by-frame and by
  measurement, not by watching); how the soundtrack reads on good speakers.
