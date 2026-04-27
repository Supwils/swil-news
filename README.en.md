# Swil-News

[中文](./README.md) | English

**Turn Cursor-generated daily digests into an interface worth opening every day.**

Swil-News is a local-first multi-topic daily news reader. You generate general, finance, AI/tech, sports-health-nutrition, and other digests with Cursor Commands, store them as Markdown, and use this Next.js app to browse and search them by date and topic. The result is a readable, searchable daily information hub instead of scattered output files.

---

## Why It Matters

- **Your data stays with you**: digests live in local `NEWS/` folders, not a hosted CMS. You can version them, back them up, and control them.
- **Multi-topic and traceable**: every entry includes summaries, links, and commentary, and everything is archived by date.
- **Repeatable generation**: the same Commands and scripts can be rerun anytime or scheduled with cron.
- **Theme-aware reading experience**: the web UI supports light/dark mode and system preference.

This is a good fit if you want AI-generated daily briefings without giving up control over the data or the reading experience.

---

## Local vs Deployment

| Scenario | Behavior |
|------|------|
| **Run locally** | You can access the **Runtime** page and trigger generation scripts from the web UI. News is read directly from local `NEWS/`. |
| **Public deployment (for example Vercel)** | **No Runtime**: scripts do not run in deployment. The site only shows committed `NEWS/` digests. The navigation hides the Runtime entry, and `/runtime` becomes a read-only explanation page. |

Flow: **generate locally -> write into `NEWS/` -> commit and push -> deploy bundles the content -> visitors get read-only access**. Deployment disables execution permissions through environment checks such as `VERCEL`, which keeps the setup simple and safer.

---

## Workflow

1. **Define a digest**: create a topic-specific instruction file under `.cursor/commands/` with steps, template, and output path.
2. **Trigger generation**: run `scripts/run-*-news.sh` locally or on a schedule, or open the app locally and use the Runtime page. The scripts call Cursor CLI Commands and write files into `NEWS/<topic>/`.
3. **Read and search**: the Next.js app reads Markdown from the filesystem, or from bundled `NEWS/` files after deployment, and lets you browse by date/topic and search titles and summaries.

Flow: **person / cron -> script -> Cursor CLI -> NEWS/*.md -> Next.js UI**.

---

## Project Structure

```text
├── .cursor/commands/     # Topic-specific digest Command definitions
│   ├── general-news.md
│   ├── finance-news.md
│   ├── aitech-news.md
│   └── …
├── NEWS/                 # Generated digests (organized by topic, can be committed)
│   ├── general/
│   ├── finance/
│   ├── ai-tech/
│   ├── sports-health-nutrition/
│   └── …
├── scripts/              # Shell scripts that call Cursor CLI
│   ├── run-all_news.sh
│   ├── run-general-news.sh
│   ├── run-aitech-news.sh
│   ├── run-sports-health-nutrition-news.sh
│   └── …
├── app/                  # Next.js App Router
│   ├── page.tsx          # Home page: date index + today summary
│   ├── runtime/          # Local-only page for running generation
│   ├── news/[topic]/[date]/  # Digest detail pages
│   └── api/
│       ├── news/         # NEWS reading API
│       └── runtime/generate/  # POST generation endpoint for local/controlled use
├── components/           # Homepage, cards, Runtime links, environment-aware UI
├── lib/                  # Markdown reading, parsing, indexing
└── docs/
    └── s-news.md         # Design and architecture notes
```

---

## Usage

### Requirements

- Node 18+
- To **generate** digests: installed and authenticated [Cursor CLI](https://cursor.com) (`agent` available in PATH)

### Generate Digests

Run a topic script from the project root, for example:

```bash
./scripts/run-aitech-news.sh
```

Or run all topics in sequence:

```bash
./scripts/run_all_news.sh
```

These scripts call `agent`, follow the workflows defined in `.cursor/commands/*.md`, perform search and writing steps, and produce files like `NEWS/<topic>/YYYY-MM-DD_*.md`. You can schedule them with cron or launchd.

### Local Reading and Runtime

```bash
pnpm install
pnpm dev
```

Then open the local app, browse by date/topic, and search the archive. When running locally, the navigation includes **Runtime**, where you can choose a topic and trigger the generation script directly.

### Run Production Locally

```bash
pnpm build
pnpm start
```

Production mode still reads from the current directory's `NEWS/`. On a local machine, the Runtime API remains available, similar to `pnpm dev`.

### Deploy (for example Vercel + GitHub)

1. Connect the repository to Vercel and use the normal `next build` flow.
2. Daily workflow: generate digests **locally** -> **commit and push** `NEWS/` changes -> let Vercel redeploy.
3. The deployed site stays **read-only**: no Runtime execution, only bundled `NEWS/` content.

---

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS 4**, with theme variables in `app/global.css`
- Digest parsing from `NEWS/**/*.md`, based on title/summary/link/commentary structure rather than a CMS

---

## Future Improvements

- **Full-text search** beyond the current keyword-based search
- **More scripts and scheduling** examples for cron or launchd
- **Weekly/monthly digests** with matching Commands, formats, and routes

For design and architecture details, see **docs/s-news.md**.

---

*Local-first and open-source friendly. Your data stays in your hands, and the interface follows the content.*
