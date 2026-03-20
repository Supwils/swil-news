#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# 让 launchd/cron 能找到 pnpm 和 agent（nvm + Cursor CLI）
export PATH="$HOME/.nvm/versions/node/v22.17.0/bin:$HOME/.local/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting daily news run..."

# Cursor CLI agent --model：环境变量 NEWS_AGENT_MODEL；或把模型名作为本脚本第一个参数传给 run_all_news。
# NEWS_AGENT_MODEL_DEFAULT 在未设置 NEWS_AGENT_MODEL 且未传参时生效；现为 composer-2（CLI 对 auto 不稳定），恢复后改为 auto。
: "${NEWS_AGENT_MODEL_DEFAULT:=composer-2}"
export NEWS_AGENT_MODEL_DEFAULT

bash "$SCRIPT_DIR/run_all_news.sh" "$@"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Running pnpm build..."
pnpm build

if [[ -n $(git status -s) ]]; then
  git add NEWS/
  git add -u
  git commit -m "feat(content): adding daily news"
  git push
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Committed and pushed."
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] No changes to commit."
fi