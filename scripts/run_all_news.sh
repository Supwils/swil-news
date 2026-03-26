#!/usr/bin/env bash
#
# 依次执行全部主题的日报生成脚本（通用、金融、AI 科技、科学、加密、能源气候、汽车出行、游戏、供应链、运动健康营养）
# 依赖：已安装并登录 Cursor CLI (agent)
#

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

if ! command -v agent &> /dev/null; then
  echo "错误: 未找到 Cursor CLI (agent)。请先安装: curl https://cursor.com/install -fsS | bash" >&2
  exit 1
fi

# 第一个参数若提供则视为模型名（覆盖 NEWS_AGENT_MODEL）。
# 与 daily-news-and-commit.sh 一致：NEWS_AGENT_MODEL_DEFAULT 默认 composer-2，CLI 恢复 auto 后改为 auto。
if [[ -n "${1:-}" ]]; then
  export NEWS_AGENT_MODEL="$1"
fi
: "${NEWS_AGENT_MODEL_DEFAULT:=composer-2}"
export NEWS_AGENT_MODEL="${NEWS_AGENT_MODEL:-$NEWS_AGENT_MODEL_DEFAULT}"
export NEWS_AGENT_MODEL_DEFAULT

LOG_TS() { date '+%Y-%m-%d %H:%M:%S'; }
log_info() { echo "[$(LOG_TS)] [INFO] $*"; }
log_warn() { echo "[$(LOG_TS)] [WARN] $*"; }
log_error() { echo "[$(LOG_TS)] [ERROR] $*" >&2; }
trim() {
  local s="$1"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

DEBUG_DIR="$PROJECT_ROOT/logs/debug"
mkdir -p "$DEBUG_DIR"

log_info "Generate all topics started model=${NEWS_AGENT_MODEL}"

export SKIP_NEWS_INDEX_REFRESH=1
for script in run-general-news.sh run-finance-news.sh run-aitech-news.sh run-science-news.sh run-crypto-news.sh run-energy-climate-news.sh run-auto-mobility-news.sh run-gaming-news.sh run-supply-chain-news.sh run-sports-health-nutrition-news.sh; do
  path="$SCRIPT_DIR/$script"
  if [[ -x "$path" ]]; then
    topic="${script#run-}"
    topic="${topic%.sh}"
    run_id="$(date '+%Y%m%d-%H%M%S')"
    debug_log="$DEBUG_DIR/${run_id}-${topic}.log"

    log_info "Topic start topic=${topic}"
    started_at="$(date +%s)"
    if "$path" >"$debug_log" 2>&1; then
      ended_at="$(date +%s)"
      duration="$((ended_at - started_at))"
      log_info "Topic success topic=${topic} duration_sec=${duration} debug_log=${debug_log}"
    else
      exit_code="$?"
      ended_at="$(date +%s)"
      duration="$((ended_at - started_at))"
      reason="$(awk 'NF{line=$0} END{print line}' "$debug_log" 2>/dev/null || true)"
      reason="$(trim "${reason:-unknown_error}")"
      log_error "Topic failed topic=${topic} duration_sec=${duration} exit_code=${exit_code} reason=${reason} debug_log=${debug_log}"
      exit "$exit_code"
    fi
  else
    log_warn "Topic skipped script=${script} reason=missing_or_not_executable"
  fi
done
unset SKIP_NEWS_INDEX_REFRESH

log_info "Step start: refresh_news_index"
bash "$SCRIPT_DIR/refresh-news-index.sh"
log_info "Step success: refresh_news_index"

log_info "Generate all topics finished status=success"
