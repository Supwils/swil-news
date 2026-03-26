#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# 让 launchd/cron 能找到 pnpm 和 agent（nvm + Cursor CLI）
export PATH="$HOME/.nvm/versions/node/v22.17.0/bin:$HOME/.local/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"

LOG_TS() { date '+%Y-%m-%d %H:%M:%S'; }
log_info() { echo "[$(LOG_TS)] [INFO] $*"; }
log_warn() { echo "[$(LOG_TS)] [WARN] $*"; }
log_error() { echo "[$(LOG_TS)] [ERROR] $*" >&2; }

LAST_STEP="init"
on_error() {
  local exit_code="$1"
  log_error "Daily job failed at step=${LAST_STEP} exit_code=${exit_code}"
}
trap 'on_error "$?"' ERR

log_info "Daily job started project_root=${PROJECT_ROOT}"

# Cursor CLI agent --model：环境变量 NEWS_AGENT_MODEL；或把模型名作为本脚本第一个参数传给 run_all_news。
# NEWS_AGENT_MODEL_DEFAULT 在未设置 NEWS_AGENT_MODEL 且未传参时生效；现为 composer-2（CLI 对 auto 不稳定），恢复后改为 auto。
: "${NEWS_AGENT_MODEL_DEFAULT:=composer-2}"
export NEWS_AGENT_MODEL_DEFAULT

LAST_STEP="generate_news"
log_info "Step start: generate_news model=${NEWS_AGENT_MODEL_DEFAULT}"
bash "$SCRIPT_DIR/run_all_news.sh" "$@"
log_info "Step success: generate_news"

LAST_STEP="build"
log_info "Step start: build command=pnpm build"
pnpm build
log_info "Step success: build"

LAST_STEP="git_commit_push"
if [[ -n $(git status -s) ]]; then
  log_info "Step start: git_commit_push changes_detected=true"
  git add NEWS/
  git add -u
  git commit -m "feat(content): adding daily news"
  git push
  log_info "Step success: git_commit_push result=committed_and_pushed"
else
  log_warn "Step skipped: git_commit_push reason=no_changes"
fi

log_info "Daily job finished status=success"