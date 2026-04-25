#!/usr/bin/env node

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const NEWS_ROOT = path.join(PROJECT_ROOT, "NEWS");
const OUTPUT_DIR = path.join(PROJECT_ROOT, ".generated");

const TOPICS = [
  { key: "general", folder: "general" },
  { key: "finance", folder: "finance" },
  { key: "ai-tech", folder: "ai-tech" },
  { key: "science", folder: "science" },
  { key: "crypto", folder: "crypto" },
  { key: "energy-climate", folder: "energy-climate" },
  { key: "auto-mobility", folder: "auto-mobility" },
  { key: "gaming", folder: "gaming" },
  { key: "supply-chain", folder: "supply-chain" },
  { key: "sports-health-nutrition", folder: "sports-health-nutrition" },
];

const TOPIC_ORDER = TOPICS.map((topic) => topic.key);

function countMatches(content, pattern) {
  return content.match(pattern)?.length ?? 0;
}

function extractTitle(content, fallback) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function extractDescription(content, fallback) {
  return content.match(/^>\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

// Chinese extraction
function extractTakeawayZh(content) {
  const match = content.match(/\*\*(总体定性|今日定性)(：\*\*|\*\*：)\s*(.+)/);
  if (match?.[3]) return match[3].trim();

  const summaryHeading = content.match(/^##\s+今日小结$/m);
  if (summaryHeading?.index === undefined) return undefined;
  const summaryBlock = content.slice(summaryHeading.index).split(/\n---/)[0] ?? "";
  const paragraphs = summaryBlock.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const lastNonBullet = paragraphs.filter((p) => !p.startsWith("- ")).pop();
  return lastNonBullet?.trim() || undefined;
}

function extractHighlightsZh(content) {
  const summaryHeading = content.match(/^##\s+今日小结$/m);
  if (summaryHeading?.index === undefined) return [];

  const summaryBlock = content.slice(summaryHeading.index).split(/\n---/)[0] ?? "";
  return summaryBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim())
    .slice(0, 4);
}

// English extraction — headings: "## Today's Summary", takeaway: "**Daily Framing:**"
function extractTakeawayEn(content) {
  const match = content.match(/\*\*Daily Framing:\*\*\s*(.+)/);
  if (match?.[1]) return match[1].trim();

  const summaryHeading = content.match(/^##\s+Today's Summary$/m);
  if (summaryHeading?.index === undefined) return undefined;
  const summaryBlock = content.slice(summaryHeading.index).split(/\n---/)[0] ?? "";
  const paragraphs = summaryBlock.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const lastNonBullet = paragraphs.filter((p) => !p.startsWith("- ")).pop();
  return lastNonBullet?.trim() || undefined;
}

function extractHighlightsEn(content) {
  const summaryHeading = content.match(/^##\s+Today's Summary$/m);
  if (summaryHeading?.index === undefined) return [];

  const summaryBlock = content.slice(summaryHeading.index).split(/\n---/)[0] ?? "";
  return summaryBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim())
    .slice(0, 4);
}

function getReadingMinutes(content) {
  return Math.max(3, Math.ceil(content.replace(/\s+/g, "").length / 900));
}

function sortEntries(entries) {
  return [...entries].sort((left, right) => {
    if (left.date !== right.date) {
      return right.date.localeCompare(left.date);
    }
    return TOPIC_ORDER.indexOf(left.topic) - TOPIC_ORDER.indexOf(right.topic);
  });
}

async function readDirectorySafe(directory) {
  try {
    return await readdir(directory);
  } catch {
    return [];
  }
}

async function buildIndex(locale) {
  const isEn = locale === "en";
  const fallbackTitle = isEn ? "Untitled digest" : "未命名日报";
  const fallbackDesc = isEn ? "No summary for this digest." : "本日报暂无摘要说明。";
  const extractTakeaway = isEn ? extractTakeawayEn : extractTakeawayZh;
  const extractHighlights = isEn ? extractHighlightsEn : extractHighlightsZh;

  const entries = [];

  for (const topic of TOPICS) {
    const directory = path.join(NEWS_ROOT, topic.folder, locale);
    const files = (await readDirectorySafe(directory)).filter((file) => file.endsWith(".md"));

    for (const fileName of files) {
      const filePath = path.join(directory, fileName);
      const content = await readFile(filePath, "utf8");
      const date = fileName.slice(0, 10);

      const title = extractTitle(content, fallbackTitle);
      const description = extractDescription(content, fallbackDesc);
      const takeaway = extractTakeaway(content);
      const highlights = extractHighlights(content);

      entries.push({
        topic: topic.key,
        date,
        fileName,
        relativePath: path.posix.join("NEWS", topic.folder, locale, fileName),
        archiveMonth: date.slice(0, 7),
        title,
        description,
        articleCount: countMatches(content, /^###\s+/gm),
        sectionCount: countMatches(content, /^##\s+/gm),
        readingMinutes: getReadingMinutes(content),
        highlights,
        takeaway,
        searchText: [title, description, takeaway ?? "", ...highlights].join(" ").toLowerCase(),
      });
    }
  }

  return {
    version: 2,
    locale,
    generatedAt: new Date().toISOString(),
    entries: sortEntries(entries),
  };
}

await mkdir(OUTPUT_DIR, { recursive: true });

const [zhIndex, enIndex] = await Promise.all([buildIndex("zh"), buildIndex("en")]);

const zhPath = path.join(OUTPUT_DIR, "news-index.json");
const enPath = path.join(OUTPUT_DIR, "news-index-en.json");

await Promise.all([
  writeFile(zhPath, `${JSON.stringify(zhIndex, null, 2)}\n`, "utf8"),
  writeFile(enPath, `${JSON.stringify(enIndex, null, 2)}\n`, "utf8"),
]);

console.log(`zh: ${zhIndex.entries.length} entries → ${path.relative(PROJECT_ROOT, zhPath)}`);
console.log(`en: ${enIndex.entries.length} entries → ${path.relative(PROJECT_ROOT, enPath)}`);
