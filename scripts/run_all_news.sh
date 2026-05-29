#!/usr/bin/env bash
#
# 执行全部主题的日报生成脚本（通用、金融、AI 科技、科学、加密、能源气候、汽车出行、游戏、供应链、运动健康营养）
# 默认 2 路并发；可通过 NEWS_PARALLELISM 覆盖。
# 后端通过 NEWS_AGENT_BACKEND 指定: cursor (默认) | claude | codex
#

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# 第一个参数若提供则视为模型名（覆盖 NEWS_AGENT_MODEL，仅对 cursor 后端有效）。
if [[ -n "${1:-}" ]]; then
  export NEWS_AGENT_MODEL="$1"
fi
: "${NEWS_AGENT_MODEL_DEFAULT:=auto}"
export NEWS_AGENT_MODEL="${NEWS_AGENT_MODEL:-$NEWS_AGENT_MODEL_DEFAULT}"
export NEWS_AGENT_MODEL_DEFAULT
: "${NEWS_PARALLELISM:=2}"
if ! [[ "$NEWS_PARALLELISM" =~ ^[1-9][0-9]*$ ]]; then
  echo "错误: NEWS_PARALLELISM 必须是正整数，当前值: $NEWS_PARALLELISM" >&2
  exit 1
fi

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

log_info "Generate all topics started model=${NEWS_AGENT_MODEL} parallelism=${NEWS_PARALLELISM}"

export SKIP_NEWS_INDEX_REFRESH=1
SCRIPTS=(
  run-general-news.sh
  run-finance-news.sh
  run-aitech-news.sh
  run-science-news.sh
  run-crypto-news.sh
  run-energy-climate-news.sh
  run-auto-mobility-news.sh
  run-gaming-news.sh
  run-supply-chain-news.sh
  run-sports-health-nutrition-news.sh
)

run_topic() {
  local script="$1"
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
      return "$exit_code"
    fi
  else
    log_warn "Topic skipped script=${script} reason=missing_or_not_executable"
  fi
}

TOKEN_DIR="$(mktemp -d "${TMPDIR:-/tmp}/swil-news-parallel.XXXXXX")"
TOKEN_FIFO="$TOKEN_DIR/tokens"
mkfifo "$TOKEN_FIFO"
exec 9<>"$TOKEN_FIFO"
rm -rf "$TOKEN_DIR"

for ((i = 0; i < NEWS_PARALLELISM; i++)); do
  printf '\n' >&9
done

PIDS=()
TOPICS=()
for script in "${SCRIPTS[@]}"; do
  topic="${script#run-}"
  topic="${topic%.sh}"
  read -r -u 9
  {
    if run_topic "$script"; then
      status=0
    else
      status="$?"
    fi
    printf '\n' >&9
    exit "$status"
  } &
  PIDS+=("$!")
  TOPICS+=("$topic")
done

failure=0
for i in "${!PIDS[@]}"; do
  pid="${PIDS[$i]}"
  topic="${TOPICS[$i]}"
  if wait "$pid"; then
    :
  else
    exit_code="$?"
    log_error "Topic process failed topic=${topic} exit_code=${exit_code}"
    failure="$exit_code"
  fi
done
exec 9>&-

if [[ "$failure" != "0" ]]; then
  unset SKIP_NEWS_INDEX_REFRESH
  exit "$failure"
fi
unset SKIP_NEWS_INDEX_REFRESH

log_info "Step start: validate_news_layout"
node "$SCRIPT_DIR/validate-news-layout.mjs"
log_info "Step success: validate_news_layout"

log_info "Step start: refresh_news_index"
bash "$SCRIPT_DIR/refresh-news-index.sh"
log_info "Step success: refresh_news_index"

log_info "Generate all topics finished status=success"
