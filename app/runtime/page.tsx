"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Play, XCircle } from "lucide-react";

import { useLocale } from "@/components/locale-context";
import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";
import { getCopy } from "@/data/copy";
import { TOPICS, getTopicMeta } from "@/lib/news-meta";
import type { TopicKey } from "@/lib/news-meta";

type RunState = "idle" | "running" | "success" | "error";

type RunResult = {
  ok: boolean;
  topic?: string;
  error?: string;
  stdout?: string;
  stderr?: string;
  code?: number;
};

type RunProgress = {
  done: number;
  total: number;
  current: string | null;
};

export default function RuntimePage() {
  const locale = useLocale();
  const copy = getCopy(locale);
  const runtimeOptions = useMemo(
    () => [
      ...TOPICS.map((t) => ({ value: t.key as TopicKey, label: getTopicMeta(t.key, locale)!.label })),
      { value: "all" as const, label: copy.runtime.allTopics },
    ],
    [locale, copy.runtime.allTopics],
  );
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [runningTopic, setRunningTopic] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [state, setState] = useState<RunState>("idle");
  const [runProgress, setRunProgress] = useState<RunProgress | null>(null);

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
    setRunProgress(topic === "all" ? { done: 0, total: 10, current: null } : null);
    try {
      const res = await fetch("/api/runtime/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const contentType = res.headers.get("content-type") ?? "";
      if (topic === "all" && contentType.includes("ndjson")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        if (!reader) throw new Error("No response body");
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const event = JSON.parse(line) as { type: string; done?: number; total?: number; current?: string | null; ok?: boolean; error?: string; stdout?: string; stderr?: string; code?: number };
              if (event.type === "progress" && event.done != null && event.total != null) {
                setRunProgress({ done: event.done, total: event.total, current: event.current ?? null });
              } else if (event.type === "done") {
                setResult({
                  ok: event.ok ?? false,
                  topic: "all",
                  error: event.error,
                  stdout: event.stdout,
                  stderr: event.stderr,
                  code: event.code,
                });
                setState(event.ok ? "success" : "error");
              }
            } catch {
              // skip malformed line
            }
          }
        }
      } else {
        const data = await res.json();
        setResult(data);
        setState(data.ok ? "success" : "error");
      }
    } catch (err) {
      setResult({ ok: false, error: (err as Error).message });
      setState("error");
    } finally {
      setRunningTopic(null);
      setRunProgress(null);
    }
  };

  return (
    <div className="np-root">
      <NewspaperMasthead />
      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        {allowed !== true ? (
          <section style={{ paddingBottom: 40, borderBottom: "1px solid var(--color-border)" }}>
            <span
              className="np-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--np-ink-red)",
                fontWeight: 600,
              }}
            >
              RUNTIME · READ-ONLY
            </span>
            <h1
              className="np-serif"
              style={{
                fontSize: 48,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                fontWeight: 600,
                margin: "14px 0 18px",
                color: "var(--color-text-primary)",
              }}
            >
              {copy.runtime.readOnlyHeading}
            </h1>
            <p
              className="np-serif"
              style={{
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.55,
                maxWidth: 640,
                color: "var(--color-text-secondary)",
                margin: "0 0 22px",
              }}
            >
              {copy.runtime.readOnlyBody}
            </p>
            <Link href="/" className="np-btn-primary">
              <ArrowLeft size={14} />
              {copy.runtime.backToNews}
            </Link>
          </section>
        ) : (
          <>
            <section style={{ paddingBottom: 32, borderBottom: "1px solid var(--color-border)" }}>
              <span
                className="np-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--np-ink-red)",
                  fontWeight: 600,
                }}
              >
                RUNTIME · {copy.runtime.siteSubtitle}
              </span>
              <h1
                className="np-serif"
                style={{
                  fontSize: 48,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontWeight: 600,
                  margin: "14px 0 18px",
                  color: "var(--color-text-primary)",
                }}
              >
                {copy.runtime.runHeading}
              </h1>
              <p
                className="np-serif"
                style={{
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.55,
                  maxWidth: 640,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                }}
              >
                {copy.runtime.runBody}
              </p>
            </section>

            <section style={{ padding: "32px 0", borderBottom: "1px solid var(--color-border)" }}>
              <div className="runtime-grid">
                {runtimeOptions.map((opt) => {
                  const isRunning = runningTopic === opt.value;
                  const disabled = state === "running";
                  return (
                    <div
                      key={opt.value}
                      style={{
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <p
                        className="np-serif"
                        style={{
                          fontSize: 19,
                          fontWeight: 600,
                          margin: 0,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {opt.label}
                      </p>
                      <p
                        className="np-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--color-text-muted)",
                          margin: 0,
                          letterSpacing: "0.04em",
                          wordBreak: "break-all",
                        }}
                      >
                        {opt.value === "all"
                          ? "scripts/run_all_news.sh"
                          : `scripts/run-${opt.value === "ai-tech" ? "aitech" : opt.value}-news.sh`}
                      </p>
                      <button
                        type="button"
                        onClick={() => run(opt.value)}
                        disabled={disabled}
                        className="np-btn-ghost"
                        style={{
                          marginTop: "auto",
                          justifyContent: "center",
                          opacity: disabled ? 0.5 : 1,
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {isRunning ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            {copy.runtime.runningLabel}
                          </>
                        ) : (
                          <>
                            <Play size={14} />
                            {copy.runtime.runButton}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {state === "running" && runProgress && (
                <div
                  style={{
                    marginTop: 24,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface-muted)",
                    padding: 20,
                  }}
                >
                  <p className="np-sans" style={{ fontSize: 14, color: "var(--color-text-primary)", margin: 0 }}>
                    {copy.runtime.progressStep(runProgress.done + (runProgress.current ? 1 : 0), runProgress.total)}
                    {runProgress.current && (
                      <span style={{ marginLeft: 8, color: "var(--color-text-secondary)" }}>
                        {copy.runtime.progressRunning(
                          getTopicMeta(runProgress.current as TopicKey, locale)?.label ?? runProgress.current,
                        )}
                      </span>
                    )}
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      height: 2,
                      width: "100%",
                      background: "var(--color-border-soft)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "var(--color-text-primary)",
                        transition: "width 300ms ease-out",
                        width: `${runProgress.total ? Math.round((runProgress.done / runProgress.total) * 100) : 0}%`,
                      }}
                    />
                  </div>
                  <p
                    className="np-mono"
                    style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.08em", color: "var(--color-text-muted)" }}
                  >
                    {copy.runtime.progressPercent(
                      runProgress.total ? Math.round((runProgress.done / runProgress.total) * 100) : 0,
                    )}
                  </p>
                </div>
              )}
            </section>

            {result && (
              <section style={{ padding: "32px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  {result.ok ? (
                    <CheckCircle2 size={18} style={{ color: "var(--color-accent-green)" }} />
                  ) : (
                    <XCircle size={18} style={{ color: "var(--np-ink-red)" }} />
                  )}
                  <h2
                    className="np-serif"
                    style={{
                      fontSize: 22,
                      letterSpacing: "-0.01em",
                      fontWeight: 600,
                      margin: 0,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {result.ok ? copy.runtime.resultSuccess : copy.runtime.resultError}
                  </h2>
                </div>
                {result.topic && (
                  <p
                    className="np-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--color-text-muted)",
                      margin: "4px 0",
                    }}
                  >
                    {copy.runtime.topicLabel}: {result.topic}
                  </p>
                )}
                {result.error && (
                  <p
                    className="np-sans"
                    style={{ fontSize: 13.5, color: "var(--np-ink-red)", margin: "6px 0" }}
                  >
                    {result.error}
                  </p>
                )}
                {(result.stdout || result.stderr) && (
                  <pre
                    className="np-mono"
                    style={{
                      marginTop: 14,
                      maxHeight: 320,
                      overflow: "auto",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface-muted)",
                      padding: 16,
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: "var(--color-text-secondary)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {result.stdout}
                    {result.stderr}
                  </pre>
                )}
              </section>
            )}
          </>
        )}

        <NewspaperFooter />
      </main>
    </div>
  );
}
