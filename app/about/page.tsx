import Link from "next/link";
import { BookOpenText, Command, Search, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { getAllNewsPreviews, formatDisplayDate } from "@/lib/news";
import { TOPICS } from "@/lib/news-meta";

export default async function AboutPage() {
  const entries = await getAllNewsPreviews();
  const latestDate = entries[0]?.date;
  const latestEntries = latestDate ? entries.filter((entry) => entry.date === latestDate) : [];
  const archiveDays = new Set(entries.map((entry) => entry.date)).size;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(193,166,111,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(96,161,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.14),_transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.04),_transparent_18%),linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:auto,24px_24px,24px_24px] opacity-40" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 mb-6 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-primary)_75%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-xl tracking-[0.18em] uppercase text-[var(--color-text-primary)]">
                S-News
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                What this thing is, and why it exists
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <Link
                href="/"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                首页
              </Link>
              <span className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-3 py-1.5">
                About
              </span>
              <Link
                href="/runtime"
                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
              >
                Runtime
              </Link>
            </nav>
          </div>
        </header>

        <main className="space-y-8 pb-12">
          <section className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-hero)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,137,45,0.85),rgba(47,126,232,0.8),transparent)] opacity-80" />

            <div className="max-w-4xl space-y-6">
              <SectionBadge icon={<BookOpenText size={12} />} label="About S-News" />
              <h1 className="font-display text-4xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl lg:text-7xl">
                它不是一个“会写字的工具页”。
                <br />
                它更像一张每天自动摊开的报桌。
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                S-News 把本地生成的多主题日报整理成可长期打开的阅读界面。你不需要记住脚本名，也不用回忆文件夹埋在哪一层。打开首页，今天的内容就已经站好了队。
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="总日报数" value={`${entries.length}`} hint="每一份都留在本地归档里" />
              <MetricCard
                label="今天上桌"
                value={`${latestEntries.length}`}
                hint={latestDate ? formatDisplayDate(latestDate) : "今天还没开张"}
              />
              <MetricCard label="主题数" value={`${TOPICS.length}`} hint="通用、金融、科技、科学、加密" />
              <MetricCard label="归档天数" value={`${archiveDays}`} hint="回看历史比翻聊天记录靠谱" />
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8">
            <div className="max-w-3xl">
              <SectionBadge icon={<Sparkles size={12} />} label="Editorial system" />
              <h2 className="mt-4 font-display text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                为什么首页现在更克制了
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
                因为首页的工作应该是“把新闻递到你眼前”，而不是先给你上产品宣讲会。说明性内容集中放在这里，首页则尽量留给最新日报、搜索和归档。
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <InfoCard
                title="首页先看内容"
                description="打开之后先看到今天有什么，再决定要不要点进细看。重要信息先上桌，介绍文字靠边坐。"
              />
              <InfoCard
                title="About 负责讲清楚"
                description="产品怎么组织、为什么这么排、脚本从哪来，这些解释留在 About，读起来更完整，也不挡路。"
              />
              <InfoCard
                title="风格更像报桌"
                description="少一点空泛技术词，多一点像在翻报纸、挑版面、回看旧闻的感觉。"
              />
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="space-y-4">
                <SectionBadge icon={<Search size={12} />} label="Signal filter" />
                <h2 className="font-display text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                  它怎么帮你少走弯路
                </h2>
                <p className="text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
                  每份日报都按日期和主题归档，同时把标题、摘要、简评和重点线索都放进搜索入口。你不需要记得那篇内容到底叫“市场观察”还是“夜盘小结”，大概记住一个词就够了。
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard title="按日期翻" description="今天、昨天、上周都排得整整齐齐，不靠记忆力硬撑。" />
                <InfoCard title="按主题筛" description="只看自己关心的版面，不用被所有内容一起扑脸。" />
                <InfoCard title="按线索搜" description="搜摘要、搜简评、搜主题词，比翻目录快得多。" />
                <InfoCard title="按卡片读" description="先看概览，再决定要不要展开全文，节奏更轻。" />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8">
            <div className="max-w-3xl">
              <SectionBadge icon={<Command size={12} />} label="Runbook" />
              <h2 className="mt-4 font-display text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                日报从哪来
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
                简单说，先跑脚本，再写入本地目录，最后由页面读取展示。没有魔法，只有一套比较体面的整理方式。原材料还是 Markdown，只是终于不用长期住在文件夹地下室。
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <FlowCard
                step="01"
                title="触发生成"
                description="在 Runtime 或 shell 里运行对应脚本，开始拉起某个主题的日报生成流程。"
              />
              <FlowCard
                step="02"
                title="写回本地"
                description="内容整理完成后写入 `NEWS/<topic>/`，按日期保存，后续回看不靠运气。"
              />
              <FlowCard
                step="03"
                title="界面读取"
                description="Next.js 读取本地 Markdown，整理出卡片、归档、筛选和全文页面。"
              />
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {TOPICS.map((topic) => (
                <div
                  key={topic.key}
                  className="rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)]/70 p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                        {topic.shortLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{topic.label}</h3>
                    </div>
                    <span
                      className="mt-1 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: topic.accent }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{topic.description}</p>
                  <code className="mt-4 block overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-xs text-[var(--color-text-primary)]">
                    {topic.scriptPath ? `./${topic.scriptPath}` : `@${topic.commandPath}`}
                  </code>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Next stop</p>
                <h2 className="mt-2 font-display text-3xl leading-none tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
                  讲解到这里，差不多该回去看新闻了。
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                  首页负责看今天，Runtime 负责开工，这一页负责把事情讲明白。分工清楚，大家都轻松。
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-text-primary)] px-5 py-3 text-sm font-medium !text-[var(--color-bg-primary)] transition hover:opacity-90"
                >
                  回首页看新闻
                </Link>
                <Link
                  href="/runtime"
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-border-strong)]"
                >
                  去 Runtime
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SectionBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-gold)]">
      {icon}
      {label}
    </div>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">{label}</p>
      <p className="font-display mt-3 text-3xl leading-none tracking-[-0.04em] text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{hint}</p>
    </div>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]/75 p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

function FlowCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-[var(--color-border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-surface)_88%,transparent),color-mix(in_srgb,var(--color-surface-muted)_92%,transparent))] p-4 sm:p-5">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">{step}</p>
      <h3 className="mt-3 text-xl font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}
