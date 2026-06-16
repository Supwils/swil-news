#!/usr/bin/env bash
#
# Best-effort edge-cache warmup for the hot set of pages.
#
# Why: every daily deploy ships a fresh build, which leaves Vercel's edge cache
# COLD for all prerendered pages. The first visitor to each page in each region
# then pays the origin fetch, which is the dominant contributor to the high TTFB
# seen on /news/[topic]/[date] in Speed Insights. The newest articles get the
# most traffic right after publication, so warming the home pages plus the most
# recent day's articles (zh + en) lets real visitors hit a warm cache.
#
# Scope/limits: a warmup from a single location only populates the POP(s) that
# serve these requests, not every region. It is a cheap, partial mitigation —
# the larger win is shrinking the per-page payload (see the detail-page changes).
# For reliable, post-deploy, multi-region warming, run this from a Vercel Cron
# job instead of (or in addition to) the local daily script.
#
# Usage:
#   scripts/warm-cache.sh [BASE_URL]
#   SITE_URL=https://example.com scripts/warm-cache.sh
#
# Base URL resolution: first CLI arg > $SITE_URL > $NEXT_PUBLIC_SITE_URL.
# If none is set, the script logs and exits 0 (never fails its caller).

set -Eeo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

BASE_URL="${1:-${SITE_URL:-${NEXT_PUBLIC_SITE_URL:-}}}"
BASE_URL="${BASE_URL%/}"
if [[ -z "$BASE_URL" ]]; then
  echo "[warm-cache] No base URL (pass as arg or set SITE_URL / NEXT_PUBLIC_SITE_URL); skipping." >&2
  exit 0
fi

INDEX_FILE=".generated/news-index.json"

# Newest day's article paths (zh form), one per line. Empty if the index is
# missing or unreadable — the home pages are still warmed in that case.
ARTICLE_PATHS="$(node -e '
  const fs = require("fs");
  try {
    const idx = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const entries = Array.isArray(idx.entries) ? idx.entries : [];
    if (!entries.length) process.exit(0);
    const latest = entries.reduce((m, e) => (e.date > m ? e.date : m), entries[0].date);
    for (const e of entries.filter((e) => e.date === latest)) {
      console.log("/news/" + e.topic + "/" + e.date);
    }
  } catch (_) { /* best-effort: emit nothing */ }
' "$INDEX_FILE" 2>/dev/null || true)"

warm_one() {
  local path="$1"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "${BASE_URL}${path}" || echo "000")"
  echo "[warm-cache] ${code} ${path}"
}

echo "[warm-cache] Warming hot set on ${BASE_URL}"
warm_one "/"
warm_one "/en"

if [[ -n "$ARTICLE_PATHS" ]]; then
  while IFS= read -r p; do
    [[ -z "$p" ]] && continue
    warm_one "$p"
    warm_one "/en${p}"
  done <<< "$ARTICLE_PATHS"
fi

echo "[warm-cache] Done."
