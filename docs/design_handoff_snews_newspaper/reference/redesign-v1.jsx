// Redesign v1 — Refined evolution of the current style.
// Same paper-warm palette, but fixed hierarchy, editorial rhythm,
// lead story + supporting stack, sticky filter bar, read-state chips.

const v1 = {
  bg: '#f4ede0',
  paper: '#fdf9f0',
  paperWarm: '#f8f1e1',
  ink: '#15110c',
  ink2: '#3a322a',
  ink3: '#7a6f60',
  rule: 'rgba(45, 30, 15, 0.14)',
  ruleSoft: 'rgba(45, 30, 15, 0.08)',
  ruleStrong: 'rgba(45, 30, 15, 0.34)',
  gold: '#a47024',
  ink_red: '#9b2c2c',
  sky: '#1e5aa8',
  rose: '#b02a5b',
  green: '#0d6e66',
  violet: '#6b3bbf',
  amber: '#a04608',
  serif: '"Source Serif 4", "Source Serif Pro", "Songti SC", Georgia, serif',
  sans: '"Inter", "PingFang SC", -apple-system, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

function V1Rule({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 18px' }}>
      <span style={{
        fontFamily: v1.mono, fontSize: 11, letterSpacing: '0.24em',
        textTransform: 'uppercase', color: v1.ink3,
      }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: v1.rule }} />
    </div>
  );
}

function V1LeadStory() {
  return (
    <article style={{ position: 'relative' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: v1.mono, fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: v1.ink_red, marginBottom: 14,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: v1.ink_red }} />
        BREAKING · 14:22 UTC · GENERAL
      </div>
      <h2 style={{
        fontFamily: v1.serif, fontSize: 56, lineHeight: 1.02,
        letterSpacing: '-0.02em', margin: '0 0 18px',
        color: v1.ink, fontWeight: 600,
      }}>
        霍尔木兹海峡紧张升温，布伦特原油突破 92 美元，欧洲天然气同步走高
      </h2>
      <p style={{
        fontFamily: v1.serif, fontStyle: 'italic', fontSize: 19,
        lineHeight: 1.55, color: v1.ink2, margin: '0 0 20px', maxWidth: 640,
      }}>
        分析师将这一波涨势归因于航运保险费率飙升，以及 OPEC+ 对 5 月产量决议的观望情绪——
        这三个议题，可能决定下半年的全球通胀路径。
      </p>
      <div style={{
        fontFamily: v1.sans, fontSize: 14, color: v1.ink3,
        display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20,
      }}>
        <span>By S-News Agent · General desk</span>
        <span>6 min read</span>
        <span>4 sections · 12 stories</span>
      </div>
      <div style={{
        aspectRatio: '16 / 8',
        background: `repeating-linear-gradient(135deg, #e8dcc4 0 8px, #efe5d0 8px 16px)`,
        border: `1px solid ${v1.rule}`,
        display: 'flex', alignItems: 'flex-end', padding: 16,
        fontFamily: v1.mono, fontSize: 12, color: v1.ink3,
      }}>
        [lead photo · brent-crude-curve-20260421.jpg]
      </div>
    </article>
  );
}

function V1StoryRow({ topic, topicColor, title, dek, time, minutes }) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 20, padding: '20px 0', borderBottom: `1px solid ${v1.ruleSoft}`, alignItems: 'flex-start' }}>
      <div>
        <div style={{
          fontFamily: v1.mono, fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: topicColor, fontWeight: 600,
        }}>{topic}</div>
        <div style={{ fontFamily: v1.mono, fontSize: 11, color: v1.ink3, marginTop: 6 }}>{time}</div>
      </div>
      <div>
        <h3 style={{ fontFamily: v1.serif, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0, fontWeight: 600, color: v1.ink }}>
          {title}
        </h3>
        <p style={{ fontFamily: v1.sans, fontSize: 14, lineHeight: 1.65, color: v1.ink2, margin: '8px 0 0', maxWidth: 560 }}>
          {dek}
        </p>
      </div>
      <div style={{
        fontFamily: v1.mono, fontSize: 11, color: v1.ink3, textAlign: 'right',
        display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end',
      }}>
        <span>{minutes} min</span>
        <span style={{ color: v1.ink, opacity: 0.7 }}>读 →</span>
      </div>
    </article>
  );
}

function V1TopicRail({ label, color, count, active }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 10px', border: 'none', background: 'transparent',
      fontFamily: v1.sans, fontSize: 13, color: active ? v1.ink : v1.ink2,
      borderBottom: active ? `2px solid ${v1.ink}` : '2px solid transparent',
      cursor: 'pointer',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {label}
      <span style={{ fontFamily: v1.mono, fontSize: 11, color: v1.ink3 }}>{count}</span>
    </button>
  );
}

function RedesignV1() {
  return (
    <div style={{
      background: v1.bg,
      color: v1.ink,
      fontFamily: v1.sans,
      minHeight: '100%',
      padding: '0 0 40px',
    }}>
      {/* Sticky masthead */}
      <header style={{
        background: v1.paper,
        borderBottom: `1px solid ${v1.rule}`,
        padding: '14px 40px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <h1 style={{
              fontFamily: v1.serif, fontSize: 26, fontWeight: 700,
              letterSpacing: '-0.02em', margin: 0, color: v1.ink,
            }}>S—News</h1>
            <span style={{ fontFamily: v1.mono, fontSize: 11, color: v1.ink3, letterSpacing: '0.08em' }}>
              TUE · APR 21 · 2026 · ISSUE № 312
            </span>
          </div>
          <nav style={{ display: 'flex', gap: 20, fontFamily: v1.sans, fontSize: 13, color: v1.ink2 }}>
            <span>Today</span>
            <span>Archive</span>
            <span>Topics</span>
            <span>About</span>
            <span style={{ fontFamily: v1.mono, color: v1.ink3 }}>⌘K</span>
          </nav>
        </div>
      </header>

      {/* Topic rail */}
      <div style={{
        background: v1.paperWarm,
        borderBottom: `1px solid ${v1.rule}`,
        padding: '8px 40px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <V1TopicRail label="All" color={v1.ink} count="312" active />
          <V1TopicRail label="General" color={v1.gold} count="48" />
          <V1TopicRail label="Finance" color={v1.sky} count="42" />
          <V1TopicRail label="AI/Tech" color={v1.rose} count="56" />
          <V1TopicRail label="Science" color={v1.green} count="28" />
          <V1TopicRail label="Crypto" color={v1.violet} count="24" />
          <V1TopicRail label="Energy" color={v1.amber} count="22" />
          <V1TopicRail label="Auto" color={v1.sky} count="18" />
          <V1TopicRail label="Supply chain" color="#5a5a5a" count="16" />
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: v1.mono, fontSize: 11, color: v1.ink3 }}>⌕ Search digests</span>
        </div>
      </div>

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '40px' }}>
        {/* Editorial hero */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48,
          paddingBottom: 40, borderBottom: `1px solid ${v1.rule}`,
        }}>
          <V1LeadStory />

          {/* Right rail — today's briefs */}
          <aside>
            <V1Rule label="Today's briefs · 8 stacked" />
            <div>
              {[
                ['AI/TECH', v1.rose, 'Anthropic 与 Meta 同日释出企业级新模型', '两家厂商押注工具调用与多步推理；开发者生态的竞争进入新阶段。', '09:12', 8],
                ['FINANCE', v1.sky, '纳指连续三周创新高，科技七雄贡献七成涨幅', '财报前夜市场情绪偏乐观；鲍威尔讲话被解读为延续宽松预期。', '08:02', 5],
                ['SCIENCE', v1.green, '韦伯望远镜首次拍到 TRAPPIST-1e 大气光谱', '对类地行星宜居性研究的关键一步，团队将在 5 月公开完整数据。', '07:45', 7],
                ['CRYPTO', v1.violet, 'ETF 日流入创纪录，BTC 重返 85 k', '贝莱德与富达合计吸纳 12 亿美元；机构回流与宏观同步改善。', '06:30', 5],
                ['ENERGY', v1.amber, '欧盟通过关键矿产"战略储备法案"', '锂、钴、稀土被列为战略物资；设置 2030 年 10% 本地炼化目标。', '05:58', 6],
              ].map(([t, c, title, dek, time, min]) => (
                <V1StoryRow key={title} topic={t} topicColor={c} title={title} dek={dek} time={time} minutes={min} />
              ))}
            </div>
            <button style={{
              marginTop: 18, fontFamily: v1.sans, fontSize: 13, color: v1.ink,
              background: 'transparent', border: `1px solid ${v1.ruleStrong}`,
              padding: '10px 16px', cursor: 'pointer',
              letterSpacing: '0.04em',
            }}>查看今日全部 8 条 →</button>
          </aside>
        </section>

        {/* Reading continuity strip */}
        <section style={{
          padding: '24px 0', borderBottom: `1px solid ${v1.rule}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              background: v1.ink, color: v1.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: v1.serif, fontSize: 22, fontWeight: 600,
            }}>↺</div>
            <div>
              <div style={{ fontFamily: v1.mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: v1.ink3 }}>Continue reading</div>
              <div style={{ fontFamily: v1.serif, fontSize: 20, color: v1.ink, marginTop: 4 }}>
                昨天的「AI/Tech 日报」读到 62% —— 还差 3 分钟收尾。
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ fontFamily: v1.sans, fontSize: 13, padding: '10px 16px', background: v1.ink, color: v1.paper, border: 'none' }}>继续阅读</button>
            <button style={{ fontFamily: v1.sans, fontSize: 13, padding: '10px 16px', background: 'transparent', color: v1.ink2, border: `1px solid ${v1.rule}` }}>稍后</button>
          </div>
        </section>

        {/* Archive tabloid */}
        <section style={{ paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: v1.serif, fontSize: 34, letterSpacing: '-0.02em', margin: 0, fontWeight: 600 }}>
              Yesterday · 2026年4月20日
            </h2>
            <span style={{ fontFamily: v1.mono, fontSize: 12, color: v1.ink3 }}>7 issues · see all April 2026 →</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 0, border: `1px solid ${v1.rule}`, background: v1.paper }}>
            {/* Big card */}
            <article style={{ padding: 28, borderRight: `1px solid ${v1.ruleSoft}`, gridRow: 'span 2' }}>
              <div style={{ fontFamily: v1.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: v1.green, fontWeight: 600 }}>SCIENCE · 7 MIN</div>
              <h3 style={{ fontFamily: v1.serif, fontSize: 30, letterSpacing: '-0.02em', lineHeight: 1.12, margin: '12px 0 12px', fontWeight: 600, color: v1.ink }}>
                韦伯望远镜首次拍到 TRAPPIST-1e 的大气光谱
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: v1.ink2, margin: 0 }}>
                对系外类地行星宜居性研究的关键一步，团队将在 5 月公开完整数据。独立的 3 个研究组已经在复核甲烷吸收线信号。
              </p>

              <div style={{ marginTop: 22, padding: '16px 18px', background: v1.paperWarm, borderLeft: `3px solid ${v1.ink}` }}>
                <div style={{ fontFamily: v1.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: v1.ink3, marginBottom: 8 }}>今日定性</div>
                <p style={{ fontFamily: v1.serif, fontSize: 16, fontStyle: 'italic', lineHeight: 1.55, margin: 0, color: v1.ink }}>
                  "这是二十年来系外行星研究里最具说服力的一次大气探测。"
                </p>
              </div>

              <div style={{ display: 'flex', gap: 14, marginTop: 22, fontFamily: v1.mono, fontSize: 11, color: v1.ink3, letterSpacing: '0.08em' }}>
                <span>✓ READ 82%</span>
                <span>♡ 收藏</span>
                <span>↗ 原文</span>
              </div>
            </article>

            {/* Grid of 4 */}
            {[
              ['CRYPTO', v1.violet, '美国 ETF 日流入创纪录，BTC 重返 85 k', '贝莱德与富达合计吸纳 12 亿美元；机构回流与宏观预期同步改善。', 5, true],
              ['ENERGY', v1.amber, '德国关停最后一座褐煤矿，承诺 2030 年前达成 80% 绿电', '巴符州工会表态支持；一万名工人将被纳入电力电网再培训。', 6, false],
              ['AUTO', v1.sky, '比亚迪海外工厂投产，欧洲平价电动车争夺战升温', '大众、Stellantis 下周也将公布回应方案。', 4, false],
              ['GAMING', v1.rose, 'Xbox 重组：第一方工作室合并为四大 pillar', '"我们要回到做不同种类游戏的人手里"——新 CEO Sarah Bond。', 5, false],
            ].map(([t, c, title, dek, min, read], i) => (
              <article key={title} style={{
                padding: 22,
                borderRight: (i % 2 === 0) ? `1px solid ${v1.ruleSoft}` : 'none',
                borderBottom: i < 2 ? `1px solid ${v1.ruleSoft}` : 'none',
                opacity: read ? 0.78 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: v1.mono, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: c, fontWeight: 600 }}>{t} · {min} MIN</div>
                  {read && <span style={{ fontFamily: v1.mono, fontSize: 10, color: v1.ink3 }}>READ</span>}
                </div>
                <h4 style={{ fontFamily: v1.serif, fontSize: 19, lineHeight: 1.22, letterSpacing: '-0.01em', margin: '10px 0 8px', fontWeight: 600, color: v1.ink }}>
                  {title}
                </h4>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: v1.ink2, margin: 0 }}>{dek}</p>
              </article>
            ))}
          </div>
        </section>

        <footer style={{
          marginTop: 40, paddingTop: 24, borderTop: `1px solid ${v1.rule}`,
          display: 'flex', justifyContent: 'space-between', fontFamily: v1.mono, fontSize: 11, color: v1.ink3, letterSpacing: '0.08em',
        }}>
          <span>S—NEWS · LOCAL-FIRST DAILY DIGEST</span>
          <span>GENERATED 2026-04-21 14:22 UTC · RSS · ABOUT · RUNTIME</span>
        </footer>
      </main>
    </div>
  );
}

window.RedesignV1 = RedesignV1;
