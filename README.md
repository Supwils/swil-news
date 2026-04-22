# Swil-News

**把 Cursor 生成的日报，变成一份真正值得每天打开的信息界面。**

Swil-News 是一个本地优先的多主题日报阅读器。你用 Cursor 的 Command 生成通用、金融、AI 科技、运动健康营养等日报，以 Markdown 存盘；用本仓库里的 Next.js 应用按日期、主题浏览和检索，让「命令产出」从散落文件夹升级为可读、可查的每日信息中枢。

---

## 为什么重要

- **信息在你这儿**：日报只存在本机 `NEWS/`，不依赖云库，可版本管理、可备份。
- **多主题、可追溯**：每条有摘要、链接和简评；按日期归档，方便回顾与检索。
- **生成可复现**：同一套 Command + 脚本，随时重跑或交给 cron 定时生成。
- **界面跟主题走**：Web 端支持亮/暗色与系统偏好，阅读体验一致。

适合想用 AI 做每日简报、又希望数据与动效都掌握在自己手里的人。

---

## 本地 vs 部署

| 场景 | 行为 |
|------|------|
| **本地运行** | 可访问 **Runtime** 页面，在 Web 内一键触发生成脚本；新闻从本机 `NEWS/` 读取。 |
| **公共部署（如 Vercel）** | **无 Runtime**：不执行脚本，仅展示已提交的 `NEWS/` 日报；导航中不显示「Runtime」入口，访问 `/runtime` 会看到只读说明并引导回首页。 |

数据流：**本地生成 → 写入 `NEWS/` → 提交并推送 → 部署时打包进站点 → 访客只读**。部署环境通过 `VERCEL` 等变量关闭执行权限，安全且简单。

---

## 思路与流程

1. **定义日报**：在 `.cursor/commands/` 里为每个主题写一份「说明书」（步骤、模板、输出路径）。
2. **触发生成**：本地手动或定时执行 `scripts/run-*-news.sh`，或在本机打开应用后从 Runtime 页点击运行；脚本通过 Cursor CLI 调用对应 Command，完成搜索与成文，写入 `NEWS/<topic>/`。
3. **阅读与检索**：本地或部署后的 Next.js 应用从文件系统（或构建包内的 `NEWS/`）读 Markdown，在浏览器里按日期/主题浏览、搜索标题与摘要。

数据流：**人 / cron → 脚本 → Cursor CLI → NEWS/*.md → Next.js 展示**。

---

## 项目结构

```
├── .cursor/commands/     # 各主题日报的 Command 定义
│   ├── general-news.md   # 日常通用
│   ├── finance-news.md   # 金融股市
│   ├── aitech-news.md    # AI 与科技
│   └── …
├── NEWS/                 # 日报产出（按主题分子目录，可提交 Git）
│   ├── general/
│   ├── finance/
│   ├── ai-tech/
│   ├── sports-health-nutrition/
│   └── …
├── scripts/              # 调用 Cursor CLI 的 Shell 脚本
│   ├── run-all_news.sh   # 依次跑全部主题
│   ├── run-general-news.sh
│   ├── run-aitech-news.sh
│   ├── run-sports-health-nutrition-news.sh
│   └── …
├── app/                   # Next.js App Router
│   ├── page.tsx           # 首页：日期索引 + 今日摘要
│   ├── runtime/           # 本地可用的「运行日报生成」页
│   ├── news/[topic]/[date]/  # 日报正文
│   └── api/
│       ├── news/          # 读 NEWS 的 API
│       └── runtime/generate/  # 仅本地/受控环境可 POST 触发生成
├── components/            # 首页、卡片、Runtime 链接（按环境显隐）等
├── lib/                   # 读 md、解析、索引（news-client, news-meta）
└── docs/
    └── s-news.md          # 设计与架构说明（扩展与协作用）
```

---

## 如何使用

### 环境要求

- Node 18+
- 若需**生成**日报：已安装并登录 [Cursor CLI](https://cursor.com)（`agent` 在 PATH 中）

### 生成日报

在项目根目录执行对应脚本，例如单主题：

```bash
./scripts/run-aitech-news.sh
```

或一次跑完全部主题（耗时较长，建议本机或自建环境执行）：

```bash
./scripts/run_all_news.sh
```

脚本会调用 `agent`，按 `.cursor/commands/*.md` 的流程做多轮搜索并写出 `NEWS/<topic>/YYYY-MM-DD_*.md`。可配合 cron/launchd 定时执行。

### 本地阅读与 Runtime

```bash
pnpm install   # 或 npm install
pnpm dev       # 默认 http://localhost:3011
```

浏览器打开后即可按日期、主题浏览，使用搜索框过滤；若在本机运行，导航中会出现 **Runtime**，可在此页选择主题并点击运行，触发生成脚本并写入 `NEWS/`。

### 本地运行生产构建

构建并启动生产服务器（用于验证部署效果或性能）：

```bash
pnpm build
pnpm start     # 默认端口 3000；若需与 dev 一致可：pnpm start -- -p 3011
```

生产模式下仍从当前目录的 `NEWS/` 读取；在本机时 Runtime 接口可用，行为与 `pnpm dev` 一致。

### 部署（如 Vercel + GitHub）

1. 将仓库连接 Vercel，按需配置构建命令（默认 `next build`）与输出。
2. 日常流程：在**本地**运行上述脚本生成日报 → 将 `NEWS/` 的变更 **commit 并 push** → Vercel 自动重新部署，新站点即包含最新日报。
3. 部署后的站点**不提供 Runtime**：不执行脚本，仅展示已打包的 `NEWS/` 内容；导航中不显示「Runtime」入口，访问 `/runtime` 会看到只读说明。

---

## 技术栈

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS 4**，主题通过 `app/global.css` 的 CSS 变量（亮/暗与 `data-theme`）控制
- 日报解析：读 `NEWS/**/*.md`，frontmatter + 标题/摘要/链接/简评结构，无 CMS

---

## 后续可做

- **全文检索**：在现有关键词搜索上加强，或加轻量索引。
- **多脚本与定时**：补全各主题脚本及 `run_all_news.sh`，并写 cron/launchd 示例。
- **周报/月报**：若新增对应 Command 与产出格式，在应用中加列表与正文路由。

设计与规范细节见 **docs/s-news.md**。

---

*本地优先、开源友好。数据在你手里，界面随主题走。*
