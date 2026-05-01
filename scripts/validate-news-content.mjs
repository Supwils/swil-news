#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const NEWS_ROOT = path.resolve(process.env.NEWS_ROOT ?? path.join(PROJECT_ROOT, "NEWS"));
const STRICT_MODE = process.env.NEWS_CONTENT_VALIDATION_MODE === "strict";

const TOPICS = [
  "general",
  "finance",
  "ai-tech",
  "science",
  "crypto",
  "energy-climate",
  "auto-mobility",
  "gaming",
  "supply-chain",
  "sports-health-nutrition",
];

const LOCALE_RULES = {
  zh: {
    summaryHeading: /^##\s+今日小结$/m,
    articleLabels: [
      { name: "summary label", pattern: /\*\*摘要：\*\*/ },
      { name: "links label", pattern: /\*\*链接：\*\*/ },
      { name: "commentary label", pattern: /(?:\*\*)?简评：\*\*/ },
    ],
    framing: /\*\*(总体定性|今日定性)(：\*\*|\*\*：)/,
  },
  en: {
    summaryHeading: /^##\s+Today's Summary$/m,
    articleLabels: [
      { name: "summary label", pattern: /\*\*Summary:\*\*/ },
      { name: "links label", pattern: /\*\*Links?:\*\*/ },
      { name: "commentary label", pattern: /\*\*Commentary:\*\*/ },
    ],
    framing: /\*\*Daily Framing:\*\*/,
  },
};

async function readDirSafe(dir) {
  try {
    return await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function splitArticleBlocks(content) {
  const matches = [...content.matchAll(/^###\s+.+$/gm)];
  if (matches.length === 0) return [];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? content.length;
    return content.slice(start, end);
  });
}

function validateArticleBlock(block, locale, fileLabel, articleIndex, errors) {
  const rules = LOCALE_RULES[locale];

  for (const label of rules.articleLabels) {
    if (!label.pattern.test(block)) {
      errors.push(`${fileLabel}: article ${articleIndex} is missing the ${label.name}`);
    }
  }

  if (!/\*\*Links?:\*\*[\s\S]*?\n-\s+\[[^\]]+\]\([^)]+\)/.test(block) && !/\*\*链接：\*\*[\s\S]*?\n-\s+\[[^\]]+\]\([^)]+\)/.test(block)) {
    errors.push(`${fileLabel}: article ${articleIndex} does not contain a markdown link list under the links section`);
  }
}

function validateContent(content, locale, fileLabel, errors) {
  const rules = LOCALE_RULES[locale];

  if (!/^#\s+.+$/m.test(content)) {
    errors.push(`${fileLabel}: missing top-level title`);
  }

  if (!/^>\s+.+$/m.test(content)) {
    errors.push(`${fileLabel}: missing blockquote description`);
  }

  if (!/^##\s+.+$/m.test(content)) {
    errors.push(`${fileLabel}: missing section headings`);
  }

  const articleBlocks = splitArticleBlocks(content);
  if (articleBlocks.length === 0) {
    errors.push(`${fileLabel}: missing article blocks`);
  }

  articleBlocks.forEach((block, index) => {
    validateArticleBlock(block, locale, fileLabel, index + 1, errors);
  });

  if (!rules.summaryHeading.test(content)) {
    errors.push(`${fileLabel}: missing summary heading`);
  }

  if (!rules.framing.test(content)) {
    errors.push(`${fileLabel}: missing daily framing marker`);
  }
}

async function validateLocaleDirectory(topic, locale, errors) {
  const dir = path.join(NEWS_ROOT, topic, locale);
  const entries = await readDirSafe(dir);

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    const filePath = path.join(dir, entry.name);
    const fileLabel = path.relative(PROJECT_ROOT, filePath);
    const content = await readFile(filePath, "utf8");
    validateContent(content, locale, fileLabel, errors);
  }
}

async function main() {
  const errors = [];

  for (const topic of TOPICS) {
    await validateLocaleDirectory(topic, "zh", errors);
    await validateLocaleDirectory(topic, "en", errors);
  }

  if (errors.length > 0) {
    const log = STRICT_MODE ? console.error : console.warn;
    log(`NEWS content validation found ${errors.length} issue(s)${STRICT_MODE ? "" : " (warning mode)"}:`);
    for (const error of errors) {
      log(`- ${error}`);
    }
    if (STRICT_MODE) {
      process.exit(1);
    }
    console.log(`NEWS content validation finished in warning mode for ${TOPICS.length} topics under ${NEWS_ROOT}.`);
    return;
  }

  console.log(`NEWS content validation passed for ${TOPICS.length} topics under ${NEWS_ROOT}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
