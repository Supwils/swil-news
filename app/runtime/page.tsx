"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Play, XCircle } from "lucide-react";

import { TOPICS } from "@/lib/news-meta";
import type { TopicKey } from "@/lib/news-meta";

const RUNTIME_OPTIONS: { value: TopicKey | "all"; label: string }[] = [
  ...TOPICS.map((t) => ({ value: t.key, label: t.label })),
  { value: "all", label: "全部主题" },
];

type RunState = "idle" | "running" | "success" | "error";

type RunResult = {
  ok: boolean;
  topic?: string;
  error?: string;
  stdout?: string;
  stderr?: string;
  code?: number;
};

export default function RuntimePage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [runningTopic, setRunningTopic] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [state, setState] = useState<RunState>("idle");

  const checkAllowed = useCallback(async () => {
    try {
      const res = await fetch("/api/runtime/generate");
      const data = await res.json();
      setAllowed(data.allowed === true);
    } catch {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    checkAllowed();
  }, [checkAllowed]);

  const run = async (topic: TopicKey | "all") => {
    setResult(null);
    setState("running");
    setRunningTopic(topic);
    try {
      const res = await fetch("/api/runtime/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setResult(data);
      setState(data.ok ? "success" : "error");
    } catch (err) {
      setResult({ ok: false, error: (err as Error).message });
      setState("error");
    } finally {
      setRunningTopic(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(193,166,111,0.22),_transparent_30%),radial-gradient(circle_at_right,_rgba(96,161,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.14),_transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.04),_transparent_18%),linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:auto,24px_24px,24px_24px] opacity-40" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 mb-6 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-primary)_75%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl tracking-[0.18em] uppercase text-[var(--color-text-primary)]">
                S-News
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                Run scripts, refill the news desk
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <Link
                href="/"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                首页
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                About
              </Link>
              <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-3 py-1.5">
                Runtime
              </span>
            </nav>
          </div>
        </header>

        <main className="space-y-8 pb-12">
          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-hero)] sm:p-8 lg:p-10">
            <h1 className="font-display text-3xl leading-tight tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
              运行日报生成
            </h1>
            <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)] sm:text-base">
              选择主题后点击运行，将调用本机 agent CLI 执行对应脚本并写入 NEWS 目录。仅在本地或配置的自建环境下可用。
            </p>

            {allowed === false && (
              <div className="mt-6 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                当前环境不允许执行生成（仅 localhost 或 ALLOWED_RUNTIME_HOST 可运行）。请在本地打开本应用后再使用此功能。
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {RUNTIME_OPTIONS.map((opt) => {
                const isRunning = runningTopic === opt.value;
                const disabled = !allowed || state === "running";
                return (
                  <div
                    key={opt.value}
                    className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-strong)]"
                  >
                    <p className="font-medium text-[var(--color-text-primary)]">{opt.label}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {opt.value === "all" ? "scripts/run_all_news.sh" : `scripts/run-${opt.value === "ai-tech" ? "aitech" : opt.value}-news.sh`}
                    </p>
                    <button
                      type="button"
                      onClick={() => run(opt.value)}
                      disabled={disabled}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isRunning ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          运行中…
                        </>
                      ) : (
                        <>
                          <Play size={18} />
                          运行
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {result && (
            <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="flex items-center gap-3">
                {result.ok ? (
                  <CheckCircle2 size={24} className="text-[var(--color-accent-sky)]" />
                ) : (
                  <XCircle size={24} className="text-[var(--color-accent-rose)]" />
                )}
                <h2 className="font-display text-xl tracking-[-0.02em] text-[var(--color-text-primary)]">
                  {result.ok ? "运行完成" : "运行结束（有错误或超时）"}
                </h2>
              </div>
              {result.topic && (
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">主题: {result.topic}</p>
              )}
              {result.error && (
                <p className="mt-2 text-sm text-[var(--color-accent-rose)]">{result.error}</p>
              )}
              {(result.stdout || result.stderr) && (
                <pre className="mt-4 max-h-[320px] overflow-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-xs leading-6 text-[var(--color-text-secondary)] whitespace-pre-wrap">
                  {result.stdout}
                  {result.stderr}
                </pre>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
