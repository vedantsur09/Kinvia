# Kinvia Frontend — prototype website

**Status: prototyped.** A static, installable web app (PWA) that runs entirely in the
browser. No build step, no backend, no external API calls. All outcome figures are
**synthetic demo data** shaped like the production outcome store.

## Pages

| Page | File | What works |
|---|---|---|
| Overview | `index.html` | Product site: hero with the family illustration, how it works, features, who it's for, privacy, call to action |
| Family session | `try.html` + `session.js` | Read-aloud consent (or guest mode) · **resume an earlier session** · **in-chat trade picker** · **context strip** (district · trade · record status, taps through to the control) · **typing indicator** pacing multi-part replies · **context-aware follow-up suggestions** · **district comparison** card · **counsellor nudge** after two open concerns · **transcript download** · Hindi/English · learner/parent speaker roles · voice input (browser speech recognition) and read-aloud replies · bilingual concern tagging (income, status, safety, further study, cost, job security, distance) · Evidence Cards from records · **grounding guard** that blocks any ₹/% figure not in a record or scheme rule · honest "no verified data" path · pathway and five-year view · scheme hints · before/after confidence · counsellor escalation · Family Trust Card (WhatsApp share, image download, print) |
| Counsellor Desk | `desk.html` + `desk.js` | Escalations from family sessions plus marked demo tickets · speaker-tagged concerns · evidence already shown · resolve/reopen |
| Scheme Insights | `insights.html` + `insights.js` | District × concern heatmap · top concerns · confidence shift · suggested outreach · state filter · live sessions from this browser added to the aggregates |

Shared: `data.js` (synthetic outcomes, trades, districts, schemes, objection taxonomy,
helpers), `styles.css` (design system, light and dark), `manifest.webmanifest`, `sw.js`
(offline cache), `icon.svg`.

## Design system

The lavender / violet direction from the design references, with the warm gold of the
Kinvia mark. One rule governs the accent:

> **Gold means verified.** It is never decoration. Violet is the primary and carries
> interaction; clay marks unresolved concerns and missing data.

| Token | Value | Use |
|---|---|---|
| Lavender ground | `#faf8ff` + four radial washes | Fixed mesh behind every page |
| Glass | `rgba(255,255,255,.56)` + `blur(22px) saturate(150%)` | Panels, tiles, tables — only where the mesh sits behind |
| Violet | `#7c5cff` → `#5733d4` | Primary actions, active states, labels, data bars |
| Plum | `#1b1038` → `#33205f` | Hero, quote section, footer, Trust Card header |
| Rose | `#e79ad8` | Second gradient stop, accents |
| Gold | `#c89433` / `#ecc978` | Verified seals and grounding tags only |
| Clay | `#b25a49` | Open concerns, missing data |

**Type:** Bodoni Moda (high-contrast display — headings, figures, pull quotes),
Figtree (geometric UI and body), Mukta + Tiro Devanagari Hindi (Devanagari, resolved per
glyph), IBM Plex Mono (small-caps labels, record ids).

**Depth, two kinds.** Frosted glass where something sits behind it (panels over the
mesh, the phone over the hero). Soft extrude — paired light/dark shadows, `--neu`,
`--neu-sm`, `--neu-inset` — on things you touch or read a number from: chips, trade
buttons, inputs, tickets, progress tracks. Not on everything; that flattens hierarchy.

**Structure varies on purpose**, instead of repeating one card grid: a glass metric
strip, hairline-ruled editorial columns with hanging numbers, a single gradient rule
through the five workflow markers, an unequal bento, real data tables, and pull quotes
on plum. Icons are the thin-line set in `icons.js`, echoing the trade icons inside the
gear mark — there are no emoji in the UI.

**Hero illustration:** an inline SVG in `index.html` (`.family-art`) — a parent and a
teenager seated together, drawn in the same thin-line language as `icons.js`, with the
phone mock sitting in front of them. It is contained within the art column and hidden
weight-wise on narrow screens; no stock photography is used anywhere on the site.

**Logo assets:** `logo-mark.png` (gear emblem, 448×448) and `logo-lockup.png`
(emblem + wordmark, 1208×448), cropped from the supplied master with transparency
intact; `icon.svg` is a violet-and-gold favicon echoing the mark.

**Cache busting:** `styles.css` and the scripts carry a `?v=N` query, mirrored in the
`sw.js` shell list and the `CACHE` name. Bump all three together when you change an
asset, or returning visitors keep the old copy.

## Run locally

```bash
python -m http.server 5180 --directory frontend
```

Then open http://localhost:5180. (Opening the HTML file directly also works, but the
offline cache only registers over http.)

## Deploy (GitHub Pages)

GitHub Pages serves a repository root or `/docs`, and needs a public repository on the
free plan. Simplest path: copy the contents of `frontend/` into a public repository
(for example `kinvia-site`) and enable Pages on its `main` branch. All paths are
relative, so it works under `https://<user>.github.io/<repo>/`.

## Honest limits

- The counselling engine is rule-based for the demo; production uses the LangGraph
  orchestrator, an open-weight Indic LLM and Bhashini/Sarvam speech (see
  `docs/architecture.md` and the PPT pack).
- Voice input depends on the browser's speech recognition (Chrome/Edge support it).
- Data saved by the demo (escalations, sessions, language) lives only in the viewer's
  browser `localStorage`.
