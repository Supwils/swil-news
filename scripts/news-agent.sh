#!/usr/bin/env bash
#
# news-agent.sh <command-file> <instruction>
#
# Backend adapter for news generation. Dispatches to the configured CLI tool.
#
# NEWS_AGENT_BACKEND  cursor (default) | claude | codex
#
# Per-backend model overrides:
#   cursor  NEWS_AGENT_MODEL  (default: composer-2, via NEWS_AGENT_MODEL_DEFAULT)
#   claude  NEWS_CLAUDE_MODEL (default: claude-opus-4-7)
#   codex   NEWS_CODEX_MODEL  (default: codex-mini-latest)
#

set -e

COMMAND_FILE="${1:?news-agent.sh requires <command-file> as first argument}"
INSTRUCTION="${2:?news-agent.sh requires <instruction> as second argument}"

BACKEND="${NEWS_AGENT_BACKEND:-cursor}"

case "$BACKEND" in
  cursor)
    MODEL="${NEWS_AGENT_MODEL:-${NEWS_AGENT_MODEL_DEFAULT:-composer-2}}"
    if ! command -v cursor-agent &>/dev/null; then
      echo "错误: 未找到 Cursor CLI (cursor-agent)。请安装: curl https://cursor.com/install -fsS | bash" >&2
      exit 1
    fi
    cursor-agent -p --force --model "$MODEL" "@${COMMAND_FILE}" "${INSTRUCTION}"
    ;;

  claude)
    MODEL="${NEWS_CLAUDE_MODEL:-claude-opus-4-7}"
    if ! command -v claude &>/dev/null; then
      echo "错误: 未找到 Claude Code CLI。请安装: npm install -g @anthropic-ai/claude-code" >&2
      exit 1
    fi
    PROMPT="$(cat "${COMMAND_FILE}")"$'\n\n'"${INSTRUCTION}"
    claude --print --model "$MODEL" "$PROMPT"
    ;;

  codex)
    MODEL="${NEWS_CODEX_MODEL:-codex-mini-latest}"
    if ! command -v codex &>/dev/null; then
      echo "错误: 未找到 Codex CLI。请安装: npm install -g @openai/codex" >&2
      exit 1
    fi
    PROMPT="$(cat "${COMMAND_FILE}")"$'\n\n'"${INSTRUCTION}"
    codex --model "$MODEL" --approval-mode full-auto "$PROMPT"
    ;;

  *)
    echo "错误: 未知的 NEWS_AGENT_BACKEND='${BACKEND}'。支持的值: cursor | claude | codex" >&2
    exit 1
    ;;
esac
