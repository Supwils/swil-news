# May 29, 2026 · AI & Tech Daily Digest

> Today's AI / tech highlights for 2026-05-29, with summaries, links, and commentary.

---

## I. Funding, Valuation & Model Rivalry

### 1. Anthropic closes $65B Series H at ~$965B valuation and launches Claude Opus 4.8 (Funding / Product)
**Summary:** Per TechCrunch, Euronews, and others on **May 28–29, 2026**, Anthropic announced a **$65 billion** Series H round at a post-money valuation of roughly **$965 billion**, led by Altimeter Capital, Dragoneer, Greenoaks, Sequoia, and others, including about **$15 billion** of previously committed hyperscaler investments (including roughly **$5 billion** from Amazon). The company said annualized revenue run rate has passed **$47 billion**. On the same day it released flagship model **Claude Opus 4.8**, citing gains in coding, agentic workflows, and “honesty” (fewer unsupported claims), plus **Effort Control** and research-preview **Dynamic Workflows** for large tasks; pricing is unchanged from Opus 4.7. Coverage also notes intensifying rivalry with OpenAI on valuation and enterprise revenue, while Anthropic’s Pentagon supply-chain dispute remains in court.
**Links:**

- [TechCrunch — Anthropic raises $65 billion, nears $1T valuation ahead of IPO](https://techcrunch.com/2026/05/28/anthropic-raises-65-billion-nears-1t-valuation-ahead-of-ipo/)
- [Euronews — Anthropic nears $1 trillion valuation as it overtakes OpenAI](https://www.euronews.com/business/2026/05/29/worlds-most-valuable-ai-start-up-anthropic-nears-1tn-valuation-overtaking-openai)

**Commentary:** When a valuation leap and a model refresh land together, markets are betting on Claude’s enterprise coding and agent monetization velocity—not a single benchmark crown.

---

### 2. OpenAI hit by global outage affecting ChatGPT, API, DALL·E, Codex, Sora, and login (Infrastructure)
**Summary:** Multiple outlets on **Friday, May 29, 2026** reported a broad OpenAI service disruption: users saw failures across ChatGPT web and apps, the developer **API**, **DALL·E**, **Codex**, **Sora**, and authentication, including inability to load chats, send messages, or sign in; DownDetector and similar monitors showed a sharp spike in complaints. OpenAI’s status page logged related incidents (e.g. an “Outage on all models” entry). Some follow-up reports said engineers mitigated latency and error rates through the Pacific morning, but detailed public root-cause explanations remained limited at press time for several outlets.
**Links:**

- [News9live — OpenAI down: ChatGPT, API, DALL-E, Sora and Login hit by widespread outage on May 29](https://www.news9live.com/technology/artificial-intelligence/openai-down-chatgpt-api-dall-e-sora-and-login-hit-by-widespread-outage-2975319)
- [OpenAI Status — Outage on all models (incident page)](https://status.openai.com/incidents/mq5jgswy45fr)

**Commentary:** On the same day Anthropic crowed about funding, OpenAI’s full-stack outage reminded the industry that for agentic workflows bound to APIs, availability is a competitive moat.

---

## II. Policy, Regulation & Geopolitical Tech

### 3. Illinois frontier AI safety bill SB 315 passes House unanimously; governor plans to sign (Regulation)
**Summary:** Per Transparency Coalition, AI Chat Daily, and others on **May 27, 2026**, the Illinois House passed **SB 315** **110–0** after the Senate approved it **52–5** on **May 21**. The bill requires frontier AI developers with over **$500 million** annual revenue to publish catastrophic-risk frameworks and undergo **annual independent third-party audits**. Gov. **J.B. Pritzker** said he intends to sign. OpenAI and Anthropic testified in support; groups such as Chamber of Progress opposed parts of the audit regime. Effective dates and final text depend on enactment.
**Links:**

- [Transparency Coalition — Illinois lawmakers send frontier model safety bill to Gov. Pritzker](https://www.transparencycoalition.ai/news/illinois-lawmakers-send-significant-ai-frontier-model-safety-bill-to-gov-pritzker)
- [AI Chat Daily — Illinois passes frontier AI safety bill requiring third-party audits](https://www.aichatdaily.com/ai-security/illinois-passes-frontier-ai-safety-bill-requiring-third-party)

**Commentary:** Moving from disclosure to verifiable audits turns safety claims into inspectable obligations—especially material for labs heading toward IPO while federal action stalls.

---

### 4. Allianz warns Europe risks an AI “dependency trap” on U.S. cloud and Asian hardware (Geopolitics / Industry)
**Summary:** Euronews on **May 26, 2026** cited an **Allianz** research report arguing Europe faces dual reliance on U.S. cloud providers and Asian semiconductor supply chains as AI reshapes trade: U.S. firms reportedly hold roughly **80%** of Europe’s cloud market share; Europe’s AI-related import growth lags the U.S.; about **57%** of IT equipment imports and much data-center hardware come from Taiwan, China, South Korea, Malaysia, and Vietnam. The report warns of strategic exposure—including scenarios framed as potential cloud service disruption—and urges faster grid access, permitting reform, and domestic compute investment.
**Links:**

- [Euronews — Europe could fall into ‘dependency trap’ in AI trade with US and Asia](https://www.euronews.com/next/2026/05/26/europe-could-fall-into-dependency-trap-in-ai-trade-with-us-and-asia-report-finds)

**Commentary:** “Sovereign AI” is increasingly a power-grid and capital-allocation problem; Europe’s gap is less about papers than bankable, grid-connected gigawatts.

---

## III. Security & Adversarial Research

### 5. Cisco: frontier models far more vulnerable under multi-turn attacks; single-turn benchmarks may mis-rank risk (Security)
**Summary:** Help Net Security on **May 28, 2026** covered Cisco AI threat intelligence research testing **15** closed flagship models from OpenAI, Anthropic, Google, Amazon, and xAI with roughly **30,000** single-turn prompts and **nearly 7,000** multi-turn attacks. Multi-turn success rates reached up to about **88%** (xAI Grok 4.1 Fast, non-reasoning config), with rankings diverging sharply from single-turn scores—e.g. Google Gemini 3 Pro rising from about **18%** to **73%**, OpenAI GPT-5.4 from low single digits to nearly **25%**; Anthropic Claude remained stronger single-turn but still **11%–16%** multi-turn. Cisco recommends publishing attack-success rates by strategy family and flagging models with >**15**-point single/multi-turn gaps.
**Links:**

- [Help Net Security — Frontier AI models collapse under multi-turn AI attacks, Cisco finds](https://www.helpnetsecurity.com/2026/05/28/cisco-multi-turn-ai-attacks/)

**Commentary:** Real attackers reframe and escalate across turns—if procurement and regulation grade models on single-turn red teams alone, they are certifying agent stacks with the wrong exam.

---

## IV. Models, Products & Open Source

### 6. StepFun releases and open-sources Step 3.7 Flash for production-grade agents (Product / China)
**Summary:** NetEase Tech on **May 29, 2026** reported that **StepFun (阶跃星辰)** released and open-sourced **Step 3.7 Flash**, a base model aimed at production **agents**: sparse **MoE** architecture with roughly **196B+1.8B (ViT)** total parameters and about **11B** active, with claimed peak generation around **400 tokens/s**; native multimodal understanding, web/visual search, and tuned tool use for APIs, browsers, terminals, and Office. The company says it supports mainstream agent frameworks (e.g. Claude Code, OpenClaw, Hermes Agent) and cloud or local deployment; benchmark and production claims should be validated against official technical materials.
**Links:**

- [NetEase Tech — StepFun releases and open-sources Step 3.7 Flash](https://www.163.com/tech/article/KU3D2RVO00098IEO.html?clickfrom=w_tech)

**Commentary:** Agent competition is shifting from “smartest model” to “stable, fast, cheap default”—open Flash-tier weights are fighting for the workflow substrate slot.

---

## V. Automotive Intelligence & Semiconductors (China)

### 7. BYD unveils in-house 4nm auto chip “Xuanji A3” and expands “God’s Eye” driving safety backstop (Hard Tech)
**Summary:** Chinese media on **May 28–29, 2026** reported that **BYD** launched fully in-house **4nm** automotive AD chip **Xuanji A3** (~**700 TOPS** per die, >**2000 TOPS** with three chips), in mass production on an **L3/L4** roadmap, alongside **God’s Eye 5.0** software upgrades and an expanded **driving liability backstop** from parking to urban navigation assist (new buyers and some legacy owners after upgrade get one year of coverage for losses attributable to assisted driving per company terms). Wang Chuanfu cited >**7,000** chip staff and >**100 billion yuan** cumulative investment; the company claims >**3.15 million** intelligent vehicles and ~**200 million km** of daily real-world driving data.
**Links:**

- [NetEase — BYD mass-produces in-house Xuanji A3 AD chip](https://www.163.com/dy/article/KU3OGFG00527EIDC.html?f=post2020_dy_recommends)

**Commentary:** Bundling chip, data, and insurable guarantees moves ADAS competition from demos to “deployable, accountable” industrialization.

---

## VI. Corporate & Labor

### 8. Meta files WARN notice for ~74 roles in Sunnyvale, California (Corporate)
**Summary:** WARN Tracker on **May 29, 2026** lists a **Meta** WARN filing in **Sunnyvale, California** affecting about **74** workers, with a notice date of **March 30, 2026** (WARN filings often precede public aggregation). The site also tracks multiple 2026 Meta notices across regions. Affected teams and severance details require official company confirmation.
**Links:**

- [WARN Tracker — Meta/Facebook layoff notice, Sunnyvale, May 2026](https://www.warntracker.com/layoff/meta-facebook-2026-05-29)

**Commentary:** With AI capex still rising at Meta, a small regional WARN looks more like organizational trimming than strategic retreat—but it keeps Silicon Valley hypersensitive to “efficiency vs. hiring.”

---

## Today's Summary
- **Capital map reset:** Anthropic’s ~$965B valuation on $65B Series H plus Opus 4.8 directly challenges OpenAI ahead of a likely IPO window.
- **Reliability in the headlines:** OpenAI’s May 29 full-stack outage, amid May’s earlier warning-level incidents, highlights operational risk for API-dependent products.
- **Audit, not just disclosure:** Illinois SB 315 advanced with bipartisan margins, pushing third-party safety audits for frontier labs.
- **Security rethink:** Cisco multi-turn research shows single-turn scores can badly understate real-world exposure for agent deployments.
- **China’s dual track:** StepFun’s Step 3.7 Flash targets production agents; BYD couples a 4nm AD chip with expanded driving backstops.
- **Europe’s sovereignty anxiety:** Allianz continues to warn of U.S. cloud and Asian hardware dependence as compute localization remains slow.

**Daily Framing:** This reads as a **“Anthropic coronation day colliding with an OpenAI reliability stress test”**—record private funding and model iteration on one side, infrastructure failure and multi-turn safety research on the other, reminding the market that winning cycles depend on delivery, auditability, and grid-connected compute—not launch rhetoric alone.

---

*This digest is compiled from real-time search results and is for reference only; facts are subject to primary sources.*  
*Date: May 29, 2026 (Friday)*
