# Handoff: S—News Home · Redesign v1 (Newspaper)

## Overview

S—News is a **local-first daily news digest**. Every day the system generates a bundle of Markdown articles across topics (AI/Tech, Finance, Science, Crypto, Energy, Auto, Supply chain, General, Gaming…). The home page is where the user lands each morning to read today's issue and pick up yesterday's unfinished reading.

This handoff covers the **redesigned home page** — a single route that shows:

1. Today's lead story + right-rail stack of today's briefs
2. A "continue reading" strip (resume where the user left off)
3. A tabloid-style archive block for yesterday's issue

**Out of scope (explicitly removed from earlier iterations):**
- Live stock/crypto/commodity tickers
- "Market & sentiment" dashboards
- Any real-time financial data widgets

The site renders **Markdown articles only**. Finance/Crypto appear as topic categories (same as AI or Science), not as live data feeds.

---

## About the design files

The files in `reference/` are **design references built in HTML + React + inline JSX**. They are prototypes showing intended look, layout and hierarchy — **not production code to copy directly**.

Your task is to **recreate this design in the S—News codebase's own environment** (whatever stack is already in place — Next.js, Astro, SvelteKit, plain 11ty, etc.), using its established patterns, routing, data layer, and Markdown pipeline. If no frontend stack exists yet, pick one suited to a static-first, Markdown-driven digest site (Astro or Next.js app-router are both good fits).

Do **not**:
- Ship the `<script type="text/babel">` + CDN-React setup from the prototype
- Use inline `style={{}}` objects in production — port the values to the codebase's styling system (CSS Modules, Tailwind, Panda, vanilla-extract, …)
- Keep the hardcoded placeholder article text — it must be driven by the real Markdown corpus

---

## Fidelity

**High-fidelity.** Colors, typography, spacing, and layout are final. Recreate pixel-close. The only parts that are placeholders:

- **Lead photo** — prototype uses a diagonal-stripe pattern stand-in. Production should use a real image (or fall back to a branded placeholder if an article has no hero image).
- **Icons** — prototype uses Unicode glyphs (`↺`, `⌕`, `⌘K`, `✓`, `♡`, `↗`). Replace with the codebase's icon library (Lucide, Heroicons, or custom SVG).
- **Article content** — hardcoded Chinese demo copy. Drive from Markdown frontmatter + body.

---

## Screens / Views

There is **one screen** in this handoff: the **Home / Today** page.

Overall page structure, top to bottom:

```
┌──────────────────────────────────────────────────────────────┐
│  Masthead  (wordmark · date · issue no. · nav · ⌘K)          │  <header>
├──────────────────────────────────────────────────────────────┤
│  Topic rail  (All · General · Finance · AI/Tech · … · 搜索)  │  <div> below header
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌───────────────────────┐   ┌──────────────────────────┐   │
│   │  Lead story           │   │  Today's briefs (5 rows) │   │
│   │  • Breaking kicker    │   │  • topic / time / title  │   │
│   │  • H2 headline        │   │  • dek · minutes · → 读   │   │
│   │  • Italic dek         │   │  • [查看今日全部 8 条 →] │   │
│   │  • Byline row         │   └──────────────────────────┘   │
│   │  • Hero photo (16:8)  │                                  │
│   └───────────────────────┘                                  │
│                                                              │   <main>
├──────────────────────────────────────────────────────────────┤   max-width: 1280px
│   Continue reading strip (avatar · label · CTA · [稍后])     │   padding: 40px
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   Yesterday · 2026年4月20日         7 issues · see all →    │
│                                                              │
│   ┌──────────────┬──────────────┬──────────────┐             │
│   │              │  card        │  card        │             │
│   │   BIG card   ├──────────────┼──────────────┤             │
│   │  (span 2)    │  card        │  card        │             │
│   └──────────────┴──────────────┴──────────────┘             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer (small mono, tracked)                                │
└──────────────────────────────────────────────────────────────┘
```

### Section 1 · Masthead

- **Container**: `background: #fdf9f0` (paper), `border-bottom: 1px solid rgba(45,30,15,0.14)` (rule), padding `14px 40px`. Inner max-width `1280px`, margin `0 auto`.
- **Left cluster** — baseline-aligned flex, gap `16px`:
  - Wordmark **"S—News"** — Source Serif 4, `26px / 700`, letter-spacing `-0.02em`, color `#15110c` (ink).
  - Date stamp **"TUE · APR 21 · 2026 · ISSUE № 312"** — JetBrains Mono, `11px`, letter-spacing `0.08em`, color `#7a6f60` (ink3).
- **Right cluster** — flex, gap `20px`, `13px` Inter, color `#3a322a` (ink2): `Today`, `Archive`, `Topics`, `About`, and a mono `⌘K` hint in ink3. In production, `Today` is the active route — give it a subtle underline or stronger ink color.

### Section 2 · Topic rail

- **Container**: `background: #f8f1e1` (paperWarm), `border-bottom: 1px solid rgba(45,30,15,0.14)`, padding `8px 40px`. Inner max-width `1280px`, flex with `gap: 6px`, `flex-wrap: wrap`, baseline-aligned.
- **Topic chip** (`V1TopicRail` in reference): button, no background, padding `6px 10px`, Inter `13px`. Left-of-label a `6×6px` color dot (border-radius `999px`). Label, then count in mono `11px` ink3. Active chip: color `#15110c`, `border-bottom: 2px solid #15110c`. Inactive chip: color ink2, `border-bottom: 2px solid transparent`.
- **Topics shown** (label, dot color, live count):
  - All · `#15110c` · 312 · **active**
  - General · `#a47024` (gold) · 48
  - Finance · `#1e5aa8` (sky) · 42
  - AI/Tech · `#b02a5b` (rose) · 56
  - Science · `#0d6e66` (green) · 28
  - Crypto · `#6b3bbf` (violet) · 24
  - Energy · `#a04608` (amber) · 22
  - Auto · `#1e5aa8` (sky) · 18
  - Supply chain · `#5a5a5a` · 16
- **Right edge** — `⌕ Search digests` hint, mono `11px` ink3.

> Topic set comes from the Markdown frontmatter `topic:` field. Count = articles with that topic across the full corpus (or just today — see Open Questions).

### Section 3 · Main content area

`<main>` has `max-width: 1280px; margin: 0 auto; padding: 40px`.

#### 3a. Editorial hero (lead + right rail)

- **Grid**: `grid-template-columns: 1.3fr 1fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(45,30,15,0.14)`.

**Left column — Lead story** (`V1LeadStory`):

- **Kicker** (inline-flex, gap `8px`, mono `11px`, letter-spacing `0.22em`, uppercase, color `#9b2c2c` (ink_red)):
  - `8×8px` filled ink_red dot
  - Text: `BREAKING · 14:22 UTC · GENERAL`  *(kicker format: `STATUS · TIME · TOPIC`)*
- **Headline** — Source Serif 4, `56px / 1.02`, letter-spacing `-0.02em`, weight `600`, color ink, margin `0 0 18px`.
- **Dek** — Source Serif 4 italic, `19px / 1.55`, color ink2, max-width `640px`, margin `0 0 20px`.
- **Byline row** — Inter `14px`, color ink3, flex gap `16px`, `flex-wrap`, margin-bottom `20px`. Contains: author, read time, section summary.
- **Hero photo** — `aspect-ratio: 16/8`, `border: 1px solid rule`, background is `repeating-linear-gradient(135deg, #e8dcc4 0 8px, #efe5d0 8px 16px)` as placeholder. Bottom-left caption in mono `12px` ink3. **Replace with real image in production.**

**Right column — Today's briefs** (`aside`):

- **Rule label** (`V1Rule`): flex, gap `12px`, margin-bottom `18px`. Left: mono `11px`, letter-spacing `0.24em`, uppercase, ink3, text e.g. `TODAY'S BRIEFS · 8 STACKED`. Right: `flex: 1; height: 1px; background: rule`.
- **Story rows** (`V1StoryRow`): 5 rows. Each row is a grid `110px 1fr auto`, gap `20px`, padding `20px 0`, `border-bottom: 1px solid ruleSoft`, items-start.
  - **Col 1 (meta)**: topic badge (mono `10px`, letter-spacing `0.22em`, uppercase, topic color, weight `600`) + time below (mono `11px` ink3, margin-top `6px`).
  - **Col 2 (content)**: H3 (Source Serif 4, `22px / 1.2`, letter-spacing `-0.01em`, weight `600`, ink). Dek below in Inter `14px / 1.65`, ink2, max-width `560px`, margin-top `8px`.
  - **Col 3 (actions)**: right-aligned flex column, gap `6px`, mono `11px` ink3. Top: `{N} min`. Bottom: `读 →` in ink at 0.7 opacity.
- **CTA button** — margin-top `18px`, Inter `13px`, color ink, transparent bg, `1px solid rgba(45,30,15,0.34)` (ruleStrong), padding `10px 16px`, letter-spacing `0.04em`. Text: `查看今日全部 8 条 →`.

#### 3b. Reading continuity strip

- **Container** — padding `24px 0`, `border-bottom: 1px solid rule`, flex, space-between, gap `24px`, items-center.
- **Left cluster** — flex gap `20px`:
  - Circular avatar, `48×48px`, `border-radius: 999px`, bg ink, color paper, centered Source Serif `22px / 600` glyph `↺`.
  - Text stack:
    - Mono `11px`, letter-spacing `0.2em`, uppercase, ink3: `CONTINUE READING`
    - Source Serif `20px`, ink, margin-top `4px`: `昨天的「AI/Tech 日报」读到 62% —— 还差 3 分钟收尾。` *(dynamic — see State)*
- **Right cluster** — flex gap `10px`:
  - Primary: Inter `13px`, padding `10px 16px`, bg ink, color paper, no border. `继续阅读`
  - Secondary: Inter `13px`, padding `10px 16px`, transparent bg, color ink2, `1px solid rule`. `稍后`

> **Hide the whole strip** if the user has no in-progress session.

#### 3c. Archive tabloid (Yesterday)

- **Header row** — flex, baseline, space-between, margin-bottom `20px`:
  - H2 — Source Serif 4, `34px`, letter-spacing `-0.02em`, weight `600`. Text: `Yesterday · 2026年4月20日` (English day label + CJK date).
  - Right meta — mono `12px` ink3: `7 issues · see all April 2026 →`
- **Tabloid grid** — `grid-template-columns: 1.2fr 1fr 1fr; gap: 0; border: 1px solid rule; background: paper`. Internal separators are `1px solid ruleSoft`.

**Big card** (left column, `grid-row: span 2`, padding `28px`, `border-right: 1px solid ruleSoft`):

- Topic/length badge — mono `10px`, letter-spacing `0.24em`, uppercase, topic color, weight `600`. e.g. `SCIENCE · 7 MIN`
- H3 — Source Serif 4, `30px / 1.12`, letter-spacing `-0.02em`, weight `600`, ink, margin `12px 0 12px`.
- Body — `14.5px / 1.7`, ink2.
- **Pull-quote block** — margin-top `22px`, padding `16px 18px`, background paperWarm, `border-left: 3px solid ink`:
  - Label (mono `10px`, letter-spacing `0.2em`, uppercase, ink3, margin-bottom `8px`): `今日定性`
  - Quote — Source Serif italic, `16px / 1.55`, ink.
- **Action row** — margin-top `22px`, flex gap `14px`, mono `11px` ink3, letter-spacing `0.08em`. Contents: `✓ READ 82%`, `♡ 收藏`, `↗ 原文`.

**Four small cards** (2×2 grid in the right two columns, each padding `22px`):

- Separators: `border-right: 1px solid ruleSoft` on even-indexed cards (index 0, 2); `border-bottom: 1px solid ruleSoft` on top row (index 0, 1).
- **If already read**: container `opacity: 0.78`.
- Card content:
  - Top row — flex, space-between, items-center:
    - Left: mono `10px`, letter-spacing `0.24em`, uppercase, topic color, weight `600`. Format: `{TOPIC} · {N} MIN`.
    - Right (only if read): mono `10px` ink3, text `READ`.
  - H4 — Source Serif 4, `19px / 1.22`, letter-spacing `-0.01em`, weight `600`, ink, margin `10px 0 8px`.
  - Dek — `13.5px / 1.6`, ink2.

### Section 4 · Footer

- Margin-top `40px`, padding-top `24px`, `border-top: 1px solid rule`, flex space-between, mono `11px` ink3, letter-spacing `0.08em`.
- Left: `S—NEWS · LOCAL-FIRST DAILY DIGEST`
- Right: `GENERATED 2026-04-21 14:22 UTC · RSS · ABOUT · RUNTIME`

> In production, RSS / About / Runtime should be real links. "GENERATED …" = timestamp of today's digest build.

---

## Interactions & Behavior

- **Topic chip click** → filter view to that topic. Active chip updates its underline + ink color. URL should reflect topic (e.g. `/?topic=ai-tech`) for shareability.
- **Search hint (`⌕ Search digests` / `⌘K`)** → open a command palette / search modal. Out of scope for this handoff — just wire the affordance.
- **Story row `读 →`** / card click → navigate to the article detail route.
- **Lead story click** → same as above (whole card is a target).
- **`查看今日全部 8 条 →`** → navigate to today's full list (same topic filter, or a dedicated "today" view).
- **Continue reading — `继续阅读`** → deep-link back to the article at the saved scroll position.
- **Continue reading — `稍后`** → dismiss the strip for this session only (don't destroy reading progress).
- **Archive card click** → article detail.
- **`see all April 2026 →`** → archive route scoped to that month.

**Hover states** (not explicit in prototype, add in production):

- Topic chip: subtle bg on hover (`rgba(45,30,15,0.04)`).
- Story rows / archive cards: cursor pointer; on hover, H3/H4 color stays ink but underline the title, or slightly nudge the `读 →` arrow.
- Buttons: darken ink by ~8% on hover; secondary buttons get a paperWarm background.

**Animations / transitions**: none currently specified. Keep it restrained — this is an editorial surface, not a product app. If you add any: `150ms ease-out` for hovers, nothing longer.

**Responsive behavior**: the reference is designed for `≥1280px`. For production, define at minimum:

- **≥1280px** — as designed.
- **900–1279px** — keep the editorial hero 2-column but shrink gap to `32px`; drop tabloid to `1fr 1fr` and let the big card span both columns of the first row.
- **<900px** — stack everything to a single column; headline drops to `40px`; tabloid becomes a single-column list.
- **Masthead** on narrow: collapse the right nav into a menu; keep wordmark + issue stamp.

---

## State management

Minimal — this is a mostly server-rendered page.

- **Active topic filter** — URL-backed (query param or path). Default `all`.
- **In-progress reading session** — persisted per user (localStorage for MVP; server if auth exists). Shape: `{ articleId, articleTitle, topic, progress: 0..1, lastReadAt }`. Drives the Continue-reading strip visibility and content.
- **Read state per article** — set of article IDs the user has finished (read ≥ 90%). Used to dim archive cards and show the `READ` label. Persist where reading sessions live.

**Data fetching:**
- Home loads today's issue manifest (ordered list of article IDs + frontmatter) + the previous day's issue manifest (for the tabloid block) + any prior unread lead stories for the right-rail stack.
- Markdown bodies load lazily on article detail routes — the home page only needs frontmatter (title, dek, topic, time, read-minutes, hero image).

---

## Design tokens

All values are copy-pasted from `reference/redesign-v1.jsx`. Port them to the codebase's token system (CSS custom properties, Tailwind theme, design-tokens JSON, whichever fits).

### Colors

| Token | Hex / value | Notes |
|---|---|---|
| `bg` | `#f4ede0` | page background (warm paper, slightly cooler than paper) |
| `paper` | `#fdf9f0` | surface — masthead, tabloid background |
| `paperWarm` | `#f8f1e1` | surface — topic rail, pull-quote bg |
| `ink` | `#15110c` | primary text, wordmark |
| `ink2` | `#3a322a` | body text, secondary nav |
| `ink3` | `#7a6f60` | meta, mono stamps, tertiary |
| `rule` | `rgba(45, 30, 15, 0.14)` | primary rules & dividers |
| `ruleSoft` | `rgba(45, 30, 15, 0.08)` | internal card separators |
| `ruleStrong` | `rgba(45, 30, 15, 0.34)` | secondary button border |
| `gold` | `#a47024` | topic — General |
| `ink_red` | `#9b2c2c` | kicker — BREAKING |
| `sky` | `#1e5aa8` | topic — Finance, Auto |
| `rose` | `#b02a5b` | topic — AI/Tech, Gaming |
| `green` | `#0d6e66` | topic — Science |
| `violet` | `#6b3bbf` | topic — Crypto |
| `amber` | `#a04608` | topic — Energy |
| `supply-gray` | `#5a5a5a` | topic — Supply chain |

> Topic colors are paired with their CJK/English labels. Keep the mapping stable — readers will learn it.

### Typography

| Role | Family | Loaded via |
|---|---|---|
| Serif (display, headlines, pull-quotes) | `"Source Serif 4", "Source Serif Pro", "Songti SC", Georgia, serif` | Google Fonts `Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700` |
| Sans (body, UI) | `"Inter", "PingFang SC", -apple-system, sans-serif` | Google Fonts `Inter:wght@400;500;600;700` |
| Mono (meta, stamps, kickers) | `"JetBrains Mono", "SF Mono", Menlo, monospace` | Google Fonts `JetBrains+Mono:wght@400;500;600` |

**Type scale** (role → size / line-height / weight / tracking):

| Role | Size | Line-height | Weight | Letter-spacing | Family |
|---|---|---|---|---|---|
| Lead headline (H2) | 56px | 1.02 | 600 | -0.02em | serif |
| Archive H2 (Yesterday) | 34px | — | 600 | -0.02em | serif |
| Big-card H3 | 30px | 1.12 | 600 | -0.02em | serif |
| Wordmark | 26px | — | 700 | -0.02em | serif |
| Story-row H3 | 22px | 1.2 | 600 | -0.01em | serif |
| Continue-reading title | 20px | — | 400 | — | serif |
| Lead dek (italic) | 19px | 1.55 | 400 | — | serif italic |
| Small-card H4 | 19px | 1.22 | 600 | -0.01em | serif |
| Pull-quote | 16px | 1.55 | 400 | — | serif italic |
| Big-card body | 14.5px | 1.7 | 400 | — | sans |
| Byline / small-card dek | 14px / 13.5px | 1.65 / 1.6 | 400 | — | sans |
| UI buttons / nav | 13px | — | 400–500 | 0–0.04em | sans |
| Date stamp / mono meta | 11px | — | 400 | 0.08em | mono |
| Topic chip count / CTA meta | 11px | — | 400 | 0.1–0.24em | mono |
| Kicker (BREAKING / TOPIC) | 10–11px | — | 600 | 0.20–0.24em (uppercase) | mono |

### Spacing

Scale used: `4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 40, 48`. Close enough to a 4px base that you can bucket to the codebase's spacing token set — just round to the nearest step, don't introduce new ones.

Layout constants:
- **Content max-width**: `1280px`
- **Page padding**: `40px` (L/R), `40px` (top of main), `40px` (bottom of main), `14px` top/bottom on masthead, `8px` top/bottom on topic rail
- **Grids**: editorial hero `1.3fr 1fr` with gap `48px`; tabloid `1.2fr 1fr 1fr` with gap `0` + internal borders
- **Hero photo**: `aspect-ratio: 16/8`

### Borders / radii / shadows

- **Radius**: `0` everywhere except the continue-reading avatar (`999px`) and topic-chip dots (`999px`). No other rounded corners. **Keep it that way** — flat rectangles are a core part of the newspaper feel.
- **Borders**: `1px solid` with the rule tokens above. Pull-quote uses `3px solid ink` left accent. Topic-chip active state uses `2px solid ink` bottom.
- **Shadows**: none. This design has zero drop shadows — don't add any.

---

## Assets

- **Fonts** — Google Fonts (Source Serif 4, Inter, JetBrains Mono). Self-host for production; see fallbacks in the typography table (CJK fallbacks `Songti SC` / `PingFang SC` are important).
- **Hero photo** — per-article, driven by Markdown frontmatter (e.g. `hero: /images/brent-crude-curve-20260421.jpg`). The prototype's diagonal-stripe gradient is a placeholder — use it as a fallback if an article has no hero.
- **Icons** — the prototype uses Unicode glyphs. Replace in production:
  - `↺` continue-reading avatar → icon library's "rotate-ccw" / "history"
  - `⌕` search hint → "search"
  - `⌘K` → keep the literal glyphs, they are the shortcut
  - `✓` / `♡` / `↗` in action row → "check", "bookmark", "external-link"
  - `→` in CTA labels → keep literal
- **No logos, illustrations or photography** are bundled — the site is text-first.

---

## Data shape (suggested)

Each Markdown article should carry at least this frontmatter:

```yaml
---
id: 2026-04-21-brent-92
title: "霍尔木兹海峡紧张升温，布伦特原油突破 92 美元，欧洲天然气同步走高"
dek: "分析师将这一波涨势归因于航运保险费率飙升…"
topic: general        # one of: general | finance | ai-tech | science | crypto | energy | auto | supply-chain | gaming
publishedAt: 2026-04-21T14:22:00Z
readMinutes: 6
hero: /images/brent-crude-curve-20260421.jpg
kicker: BREAKING      # optional — shown on lead story only
pullQuote: "这是二十年来系外行星研究里最具说服力的一次大气探测。"  # optional
pullQuoteLabel: "今日定性"  # optional
---
```

**Issue manifest** (per day):

```yaml
---
date: 2026-04-21
issueNo: 312
leadArticleId: 2026-04-21-brent-92
articleIds:
  - 2026-04-21-brent-92
  - 2026-04-21-anthropic-meta
  - ...
---
```

---

## Files in this bundle

```
design_handoff_snews_newspaper/
├── HANDOFF.md                    ← this file
└── reference/
    ├── preview-v1.html           ← open in a browser to see the design live
    └── redesign-v1.jsx           ← source for the whole page as a single React component
```

### How to run the reference

1. `cd design_handoff_snews_newspaper/reference/`
2. Serve the directory over any static server (e.g. `python3 -m http.server 8000`, `npx serve .`). **Opening `preview-v1.html` directly via `file://` will not work** — Babel-standalone needs HTTP to fetch the sibling `.jsx` file.
3. Navigate to `http://localhost:8000/preview-v1.html`.

---

## Open questions for the engineer

Flag these back before starting if unclear — the designer (or PM) should answer:

1. **Topic counts** in the rail — are they "today's issue only" or "entire archive"? The prototype shows large numbers (312 / 48 / …) which reads as lifetime. Pick one and be consistent with the "Today's briefs · 8 stacked" label.
2. **Lead story selection rule** — is it the top-ranked today, editor-picked, or the latest BREAKING? Affects the kicker format.
3. **Archive tabloid** — always yesterday, or "most recent previous issue"? Matters across weekends/gaps.
4. **Continue-reading threshold** — what % counts as "in progress" vs. "read"? Prototype uses 62% as in-progress and 82% still as "READ 82%" on the big card — clarify the cutoff.
5. **Auth / multi-user** — is read state per-browser (localStorage) or per-account? Changes where the data lives.
6. **`READ` state visual** — prototype dims the card to 0.78 opacity *and* adds a `READ` label. Keep both, or just one?

---

## Things to preserve (design intent)

If you have to make trade-offs, these are the non-negotiable parts of the aesthetic:

- **Warm-paper palette.** Cool grays or pure white break the whole feel. Never use `#fff` as a surface here.
- **Serif-forward hierarchy.** Headlines and deks are Source Serif. Sans is supporting, not primary.
- **All-caps mono meta.** Kickers, topic badges, timestamps, and rules all use JetBrains Mono with wide letter-spacing. This is the second biggest tell of the newspaper feel.
- **Zero shadows, zero rounded corners** (except the two intentional circles). Hairline `1px` rules do all the dividing work.
- **Topic colors are editorial, not UI.** They're used inside kickers and dots, not as big color blocks. Resist the urge to add topic-colored backgrounds or tags.
- **Density.** The page is text-dense on purpose — reducing it would undermine the "this is today's paper" feel. Don't pad out with whitespace.

If something in the codebase's existing design system conflicts with the above (e.g. default button radius), override it here — this surface is intentionally its own visual world.
