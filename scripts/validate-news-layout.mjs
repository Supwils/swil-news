#!/usr/bin/env node

import { readdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const NEWS_ROOT = path.join(PROJECT_ROOT, "NEWS");

const TOPICS = [
  { folder: "general", zhSuffix: "日常通用新闻日报", enSuffix: "general-digest" },
  { folder: "finance", zhSuffix: "金融与股市新闻日报", enSuffix: "finance-digest" },
  { folder: "ai-tech", zhSuffix: "AI与科技新闻日报", enSuffix: "ai-tech-digest" },
  { folder: "science", zhSuffix: "科学与研究新闻日报", enSuffix: "science-digest" },
  { folder: "crypto", zhSuffix: "加密与Web3新闻日报", enSuffix: "crypto-digest" },
  { folder: "energy-climate", zhSuffix: "能源与气候新闻日报", enSuffix: "energy-climate-digest" },
  { folder: "auto-mobility", zhSuffix: "汽车与出行新闻日报", enSuffix: "auto-mobility-digest" },
  { folder: "gaming", zhSuffix: "游戏与文娱新闻日报", enSuffix: "gaming-digest" },
  { folder: "supply-chain", zhSuffix: "供应链与制造新闻日报", enSuffix: "supply-chain-digest" },
  { folder: "sports-health-nutrition", zhSuffix: "运动健康营养新闻日报", enSuffix: "sports-health-digest" },
];

const TOPIC_MAP = new Map(TOPICS.map((topic) => [topic.folder, topic]));
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isIgnoredName(name) {
  return name === ".gitkeep" || name === ".DS_Store";
}

async function readDirSafe(dir) {
  try {
    return await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function validateMarkdownFile(topic, locale, fileName, errors) {
  if (!fileName.endsWith(".md")) {
    return;
  }

  const baseName = fileName.slice(0, -3);
  const underscoreIndex = baseName.indexOf("_");
  if (underscoreIndex === -1) {
    errors.push(`${topic.folder}/${locale}/${fileName}: missing date/name separator "_"`);
    return;
  }

  const date = baseName.slice(0, underscoreIndex);
  const suffix = baseName.slice(underscoreIndex + 1);
  if (!DATE_RE.test(date)) {
    errors.push(`${topic.folder}/${locale}/${fileName}: invalid date prefix "${date}"`);
  }

  const expectedSuffix = locale === "zh" ? topic.zhSuffix : topic.enSuffix;
  if (suffix !== expectedSuffix) {
    errors.push(
      `${topic.folder}/${locale}/${fileName}: expected suffix "${expectedSuffix}", got "${suffix}"`,
    );
  }
}

async function main() {
  const errors = [];
  const rootEntries = await readDirSafe(NEWS_ROOT);

  for (const entry of rootEntries) {
    if (isIgnoredName(entry.name)) continue;
    if (!entry.isDirectory()) {
      errors.push(`NEWS/${entry.name}: unexpected file at NEWS root`);
      continue;
    }
    if (!TOPIC_MAP.has(entry.name)) {
      errors.push(`NEWS/${entry.name}: unknown topic directory`);
    }
  }

  for (const topic of TOPICS) {
    const topicDir = path.join(NEWS_ROOT, topic.folder);
    const topicEntries = await readDirSafe(topicDir);

    for (const entry of topicEntries) {
      if (isIgnoredName(entry.name)) continue;

      if (entry.isDirectory()) {
        if (entry.name !== "zh" && entry.name !== "en") {
          errors.push(`NEWS/${topic.folder}/${entry.name}: unsupported locale directory`);
        }
        continue;
      }

      if (entry.name.endsWith(".md")) {
        errors.push(`NEWS/${topic.folder}/${entry.name}: markdown file must be inside zh/ or en/`);
        continue;
      }

      errors.push(`NEWS/${topic.folder}/${entry.name}: unexpected file in topic root`);
    }

    for (const locale of ["zh", "en"]) {
      const localeDir = path.join(topicDir, locale);
      const localeEntries = await readDirSafe(localeDir);

      for (const entry of localeEntries) {
        if (isIgnoredName(entry.name)) continue;

        if (entry.isDirectory()) {
          errors.push(`NEWS/${topic.folder}/${locale}/${entry.name}: nested directories are not allowed`);
          continue;
        }

        if (!entry.name.endsWith(".md")) {
          errors.push(`NEWS/${topic.folder}/${locale}/${entry.name}: only markdown files are allowed`);
          continue;
        }

        validateMarkdownFile(topic, locale, entry.name, errors);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`NEWS layout validation failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`NEWS layout validation passed for ${TOPICS.length} topics.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
