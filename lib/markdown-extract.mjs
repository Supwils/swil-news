/**
 * Shared markdown extraction utilities for both Node scripts and Next.js runtime.
 *
 * Authored as ESM .mjs so build-news-index.mjs (Node) and lib/news.ts
 * (Next.js TS) can both consume it without a bundler. A .d.ts sibling
 * provides typing for the TS side.
 */

const SUMMARY_HEADING = {
  zh: /^##\s+今日小结$/m,
  en: /^##\s+Today's Summary$/m,
};

const TAKEAWAY_INLINE = {
  zh: /\*\*(总体定性|今日定性)(：\*\*|\*\*：)\s*(.+)/,
  en: /\*\*Daily Framing:\*\*\s*(.+)/,
};

export function countMatches(content, pattern) {
  return content.match(pattern)?.length ?? 0;
}

export function extractTitle(content, fallback) {
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

export function extractDescription(content, fallback) {
  return content.match(/^>\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

function getSummaryBlock(content, locale) {
  const heading = content.match(SUMMARY_HEADING[locale]);
  if (heading?.index === undefined) return null;
  return content.slice(heading.index).split(/\n---/)[0] ?? "";
}

export function extractTakeaway(content, locale = "zh") {
  const inline = content.match(TAKEAWAY_INLINE[locale]);
  if (locale === "en" && inline?.[1]) return inline[1].trim();
  if (locale === "zh" && inline?.[3]) return inline[3].trim();

  const summaryBlock = getSummaryBlock(content, locale);
  if (!summaryBlock) return undefined;

  const paragraphs = summaryBlock.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const lastNonBullet = paragraphs.filter((p) => !p.startsWith("- ")).pop();
  return lastNonBullet?.trim() || undefined;
}

export function extractHighlights(content, locale = "zh") {
  const summaryBlock = getSummaryBlock(content, locale);
  if (!summaryBlock) return [];

  return summaryBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, "").trim())
    .slice(0, 4);
}

export function getReadingMinutes(content) {
  return Math.max(3, Math.ceil(content.replace(/\s+/g, "").length / 900));
}

export function countArticles(content) {
  return countMatches(content, /^###\s+/gm);
}

export function countSections(content) {
  return countMatches(content, /^##\s+/gm);
}
