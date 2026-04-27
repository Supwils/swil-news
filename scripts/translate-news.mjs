#!/usr/bin/env node
/**
 * Batch-translate Chinese news articles to English.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-news.mjs
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-news.mjs --topic ai-tech
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate-news.mjs --dry-run
 *
 * Reads from:  NEWS/<topic>/zh/*.md
 * Writes to:   NEWS/<topic>/en/*.md
 *
 * English filename convention:  YYYY-MM-DD_<topic-slug>-digest.md
 * English article structure uses:
 *   - "## Today's Summary" (instead of "## 今日小结")
 *   - "**Daily Framing:** " (instead of "**总体定性**：")
 */

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const NEWS_ROOT = path.join(PROJECT_ROOT, "NEWS");

const TOPICS = [
  { key: "general",               folder: "general",               slug: "general-digest" },
  { key: "finance",               folder: "finance",               slug: "finance-digest" },
  { key: "ai-tech",               folder: "ai-tech",               slug: "ai-tech-digest" },
  { key: "science",               folder: "science",               slug: "science-digest" },
  { key: "crypto",                folder: "crypto",                slug: "crypto-digest" },
  { key: "energy-climate",        folder: "energy-climate",        slug: "energy-climate-digest" },
  { key: "auto-mobility",         folder: "auto-mobility",         slug: "auto-mobility-digest" },
  { key: "gaming",                folder: "gaming",                slug: "gaming-digest" },
  { key: "supply-chain",          folder: "supply-chain",          slug: "supply-chain-digest" },
  { key: "sports-health-nutrition",folder: "sports-health-nutrition",slug: "sports-health-digest" },
];

const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-6";
const DELAY_MS = 1200; // stay under rate limits

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const TOPIC_FILTER = args.includes("--topic") ? args[args.indexOf("--topic") + 1] : null;

if (!API_KEY) {
  console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
  process.exit(1);
}

async function readDirectorySafe(dir) {
  try { return await readdir(dir); }
  catch { return []; }
}

async function readStatSafe(filePath) {
  try { return await stat(filePath); }
  catch { return null; }
}

async function callClaude(zhContent) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      messages: [
        {
          role: "user",
          content: `Translate the following Chinese news digest article into English.

Rules:
1. Preserve ALL markdown formatting exactly (headings, bold, lists, links, horizontal rules, blockquotes).
2. Translate the section heading "## 今日小结" as "## Today's Summary".
3. Translate "**总体定性：**" or "**今日定性：**" as "**Daily Framing:**".
4. Keep all URLs unchanged.
5. Keep the same document structure and number of sections/articles.
6. The title (# heading) and description (> blockquote) should be translated naturally into English.
7. Article summaries (摘要), commentary (简评), and bullet points should all be translated.
8. Do not add, remove, or reorder any articles.
9. Return ONLY the translated markdown — no preamble, no explanation.

---

${zhContent}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API error ${response.status}: ${body}`);
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateTopic(topic) {
  const zhDir = path.join(NEWS_ROOT, topic.folder, "zh");
  const enDir = path.join(NEWS_ROOT, topic.folder, "en");

  const zhFiles = (await readDirectorySafe(zhDir)).filter((f) => f.endsWith(".md")).sort();
  if (zhFiles.length === 0) {
    console.log(`  [${topic.key}] no zh files, skipping`);
    return { translated: 0, skipped: 0 };
  }

  await mkdir(enDir, { recursive: true });

  let translated = 0;
  let skipped = 0;

  for (const zhFileName of zhFiles) {
    const date = zhFileName.slice(0, 10);
    const zhFilePath = path.join(zhDir, zhFileName);
    const enFileName = `${date}_${topic.slug}.md`;
    const enFilePath = path.join(enDir, enFileName);
    const [zhStat, enStat] = await Promise.all([readStatSafe(zhFilePath), readStatSafe(enFilePath)]);

    if (zhStat && enStat && enStat.mtimeMs >= zhStat.mtimeMs) {
      skipped++;
      continue;
    }

    const zhContent = await readFile(zhFilePath, "utf8");

    if (DRY_RUN) {
      console.log(`  [DRY] would translate: ${topic.folder}/zh/${zhFileName} → en/${enFileName}`);
      translated++;
      continue;
    }

    process.stdout.write(`  ${enStat ? "updating" : "translating"} ${date} [${topic.key}]… `);
    try {
      const enContent = await callClaude(zhContent);
      await writeFile(enFilePath, `${enContent}\n`, "utf8");
      process.stdout.write("done\n");
      translated++;
    } catch (err) {
      process.stdout.write(`ERROR: ${err.message}\n`);
    }

    await sleep(DELAY_MS);
  }

  return { translated, skipped };
}

async function main() {
  const topics = TOPIC_FILTER
    ? TOPICS.filter((t) => t.key === TOPIC_FILTER || t.folder === TOPIC_FILTER)
    : TOPICS;

  if (TOPIC_FILTER && topics.length === 0) {
    console.error(`Unknown topic: ${TOPIC_FILTER}`);
    process.exit(1);
  }

  console.log(`Translating ${DRY_RUN ? "(dry run) " : ""}${topics.length} topic(s)...\n`);

  let totalTranslated = 0;
  let totalSkipped = 0;

  for (const topic of topics) {
    console.log(`[${topic.key}]`);
    const { translated, skipped } = await translateTopic(topic);
    totalTranslated += translated;
    totalSkipped += skipped;
    console.log(`  → ${translated} translated, ${skipped} already exist\n`);
  }

  console.log(`\nDone. ${totalTranslated} translated, ${totalSkipped} skipped.`);

  if (totalTranslated > 0 && !DRY_RUN) {
    console.log("\nRun: node scripts/build-news-index.mjs  to rebuild the index.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
