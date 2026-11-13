# Nov 13, 2026 · AI & Tech Daily Digest

> A roundup of AI and technology developments compiled for November 13, 2026, with summaries, links, and commentary.

---

## I. Leadership, Security, and Infrastructure Shock

### 1. Nvidia confirms Jensen Huang’s resignation; CFO Colette Kress named interim CEO (Leadership)

**Summary:** On November 12 Nvidia confirmed via its newsroom and an SEC filing that the board accepted Jensen Huang’s resignation as president, CEO, and director, effective immediately. Executive Vice President and CFO Colette Kress will serve as interim CEO while the board searches for a permanent successor, and Harvey C. Jones was named the company’s first board chair. Nvidia said operations, customer commitments, and the product roadmap would continue uninterrupted, with fiscal Q3 results still due November 17. Global tech coverage and markets kept digesting the transition on Friday as key-person risk around the AI compute leader dominated the narrative.

**Links:**

- [NVIDIA Newsroom — NVIDIA Announces CEO Transition](https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition)
- [TechCrunch — Nvidia’s Jensen Huang resigns; Colette Kress interim CEO](https://techcrunch.com/2026/11/12/nvidias-jensen-huang-resigns-chipmaker-names-cfo-colette-kress-as-interim-ceo/)

**Commentary:** Once the official handoff papers land, markets price succession uncertainty—not gossip—across the whole AI capex chain.

---

### 2. Notion confirms Fireworks vendor breach exposed AI chat transcripts in under 1% of workspaces (Security)

**Summary:** Notion’s security advisory (updated through November 12–13) says a breach at AI infrastructure vendor Fireworks AI exposed some Notion AI chat transcripts used for the Insights feature, affecting fewer than 1% of workspaces. Most records were “unattributable”—not labeled to a user or workspace and without tool-call results. Notion disconnected Fireworks, deleted related data, disabled Insights, and advised affected users to rotate passwords and API keys pasted into chats. Fireworks said attackers reached a development environment via a cloud provider; Notion is among the publicly confirmed customers impacted.

**Links:**

- [Notion — Security incident involving a third-party AI vendor](https://www.notion.com/security/advisories/security-incident-involving-a-third-party-ai-vendor)
- [TechCrunch — Fireworks AI breach exposed Notion chat transcripts](https://techcrunch.com/2026/11/12/cyberattack-on-fireworks-ai-allowed-hackers-to-access-notion-customers-chat-transcripts/)

**Commentary:** “Zero data retention” marketing does not cover batch and Insights paths that must persist—the supply chain is the attack surface, and it is becoming a hard gate for enterprise AI buying.

---

### 3. SpaceX plans more than $74 billion for AI supercomputing campuses in Texas and Arizona (Infrastructure)

**Summary:** SpaceX said on November 12 it plans to invest more than $74 billion in two AI supercomputing campuses: about $50 billion in Cochise County, Arizona (roughly 5,500 construction jobs and 1,000 permanent roles, still needing county approval with a December hearing), and more than $24 billion near Starbase in Texas, designed to generate its own power rather than draw from the public grid. The company said AI already accounted for more than half of third-quarter revenue. Local opposition petitions in Arizona underscore friction between compute buildouts and community power politics.

**Links:**

- [Reuters via Investing.com — SpaceX plans over $74 billion in Texas, Arizona AI campuses](https://www.investing.com/news/stock-market-news/spacex-to-invest-over-74-billion-in-supercompute-facilities-in-texas-arizona-5022690)
- [UPI — SpaceX to build $74B AI supercomputing facilities](https://www.upi.com/Top_News/US/2026/11/12/spacex-musk-AI-supercomputing-texas-arizona/8361794521839/)

**Commentary:** A rocket company is putting supercomputers on the growth balance sheet—AI power and land permits are becoming as critical as launch windows.

---

## II. Models and Agentic Products

### 4. OpenAI launches ChatGPT Wallet so agents can shop and check out for limited U.S. Pro users (Product)

**Summary:** TechCrunch reported on November 13 that OpenAI launched ChatGPT Wallet: agents called dots can help choose products and complete purchases, initially for a limited set of U.S. ChatGPT Pro subscribers age 18+ with U.S.-issued Visa, Mastercard, or American Express cards. Users must review items, totals, and the payment card, then approve with Face ID or fingerprint; payments use tokens so card numbers are not shared with the agent or merchant. OpenAI plans spending limits and other pre-approvals later and published a Commerce Partner Playbook for retailers; Amazon and others still restrict outside shopping agents.

**Links:**

- [TechCrunch — ChatGPT’s new Wallet lets AI agents shop and check out](https://techcrunch.com/2026/11/13/chatgpts-new-wallet-lets-ai-agents-shop-and-check-out-for-you/)

**Commentary:** Agents are moving from “find it” to “pay for it”—the bottleneck is no longer recommendation quality but merchant access and whether users will hand over payment authority.

---

### 5. Google releases Gemini 4 Hydrogen for fast coding and agentic workflows (Product)

**Summary:** Google announced Gemini 4 Hydrogen on November 12 as a fast, efficient model for everyday coding and diverse agentic workflows, while Carbon and Argon target deeper long-horizon reasoning. Google says Hydrogen scores 51 on the Artificial Analysis Intelligence Index at its default high thinking level (ahead of Argon’s 50) and reaches 54 at xhigh, with flat pricing across a 1M-token context window at $1.50 per million input tokens and $7.50 per million output tokens. It is rolling out across AI Studio, the Gemini API, the Gemini app, Search, and business surfaces; Google’s post continued updating availability on November 13.

**Links:**

- [Google Blog — Introducing Gemini 4 Hydrogen](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/)
- [VentureBeat — Google launches Gemini 4 Hydrogen](https://venturebeat.com/technology/google-launches-gemini-4-hydrogen-a-faster-smarter-pricier-flash-successor)

**Commentary:** The Flash successor is no longer only about being cheap—it is defined as the default fast, affordable agent worker.

---

### 6. OpenAI launches Daybreak Red Team and Defense Factory for AI pentesting and patching (Security product)

**Summary:** At its November 12 “Cyber at the Frontier” event, OpenAI introduced two Daybreak products: Red Team uses coordinated agents to penetration-test web apps, validate scanner and bug-bounty findings, and operate under isolated environments with Guardian review (early access); Defense Factory investigates vulnerabilities and drafts patches for engineer review before merge, can ingest findings from tools such as Wiz and Snyk, and is available via a Codex/Daybreak preview. SecurityWeek and others followed up on November 13; President Greg Brockman said organizations will be only as secure as the frontier models they use for defense—and how well they use them.

**Links:**

- [OpenAI — Daybreak Red Team](https://openai.com/daybreak/red-team/)
- [SecurityWeek — OpenAI unveils Daybreak Red Team, Defense Factory](https://www.securityweek.com/openai-unveils-daybreak-red-team-defense-factory-security-tools/)

**Commentary:** The same generation of models can attack and defend—OpenAI is packaging “use frontier models to protect yourself” as a product and pushing a security arms race onto procurement lists.

---

### 7. Tencent Hunyuan ships Hy Realtime: live voice with tool calling and singing (China · product)

**Summary:** On November 13 Tencent Hunyuan released Hy Realtime, a real-time speech model it says improves speech understanding, instruction following, and more human-like delivery, while adding agentic tool use (including deciding when to search the web) and singing via collaboration with Tencent Music’s TME Lingyin AI team. The model is live in Yuanbao voice calls and Tencent customer service, with a Tencent Cloud API coming soon; users can try the “Chuyu” voice in the latest Yuanbao app. Tencent says next priorities include full-duplex interaction, long-term personalized memory, and front-/back-end agent collaboration.

**Links:**

- [Yicai — Tencent Hunyuan launches Hy Realtime](https://www.yicai.com/news/103440081.html)
- [IT Home — Tencent Hunyuan Hy Realtime voice model](https://www.ithome.com/1/026/825.htm)

**Commentary:** The next voice-assistant fight is not chit-chat quality—it is listen-while-searching and task completion, shifting the battleground from text boxes to live calls.

---

### 8. DeepSeek opens a full “app suite” API: search, files, links, and voice behind API switches (China · developers)

**Summary:** DeepSeek announced on November 13 that its full application API is open: enabling parameters on existing endpoints lets `deepseek-flash` (V4.1-Flash) use web search, deep-thinking search, file input, URL reading, and safety checks under Messages, Responses, and Chat Completions, with tool calls and context stitching handled server-side. Search, Fetch, OCR, ASR, and TTS are also available as standalone interfaces. DeepSeek open-sourced a lightweight front-end demo said to approximate a 1:1 App experience; tool use is billed per call on top of token fees.

**Links:**

- [DeepSeek API Docs — Full application API release](https://api-docs.deepseek.com/zh-cn/news/news261113/)
- [IT Home — DeepSeek opens full app suite API](https://www.ithome.com/1/026/960.htm)

**Commentary:** Packaging the App’s tool chain as an API admits that raw inference is no longer enough to sell—developers want a reproducible product experience.

---

## III. Funding, Platforms, and Regional Policy

### 9. Mirendil raises $1 billion Series A to put agents on frontier AI R&D (Funding)

**Summary:** San Francisco lab Mirendil, founded by former Anthropic researchers, announced a $1 billion Series A led by Kleiner Perkins and Clearlake Capital, with Battery, Google, M13, Pear, S32, and others participating. The company aims to have agents do much of the hands-on work of frontier AI research; it says one researcher directing agents pretrained coding model Mirendil-Base in about 3.5 months with under $10 million of compute, and research platform Lor is in private beta. Valuation was not officially disclosed; the round comes roughly five months after an about $200 million seed.

**Links:**

- [Mirendil — Raises $1B to Democratize Frontier AI R&D](https://mirendil.com/news/series-a/)
- [Crunchbase News — Week’s biggest funding rounds led by Mirendil](https://news.crunchbase.com/venture/biggest-startup-funding-rounds-agentic-ai-infrastructure-mirendil-mercor/)

**Commentary:** “AI building AI” moved from slogan to a billion-dollar check—capital is betting research labor itself can be agent-scaled.

---

### 10. Baidu launches “Token Exchange” (词元所) to verify and credit-rate model suppliers (China · platform)

**Summary:** At Baidu World 2026 on November 12, Baidu formally launched Token Exchange (词元所), framed as a marketplace matching model suppliers and token buyers. Robin Li criticized opaque token relay sites that do not stand behind quality, stability, or model authenticity; Token Exchange emphasizes fingerprint checks, capability and availability tests, periodic probes, and full-path monitoring for supplier credit ratings. Baidu said that about a month after soft launch it had more than 100 supply resources, over 50 million daily calls, and more than 700 billion tokens per day; Baidu AI Cloud’s product page offers unified access and comparison.

**Links:**

- [Sina Tech — Baidu launches Token Exchange marketplace](https://finance.sina.com.cn/roll/2026-11-12/doc-iniymwrm3863468.shtml)
- [Baidu AI Cloud — Token Exchange](https://cloud.baidu.cn/product-s/token_exchange.html)

**Commentary:** After call volume explodes, the scarce layer is not another relay—it is trusted proof that the model is what the seller claims.

---

### 11. China NDRC: 15th Five-Year Plan will deepen “AI+,” prioritizing hazardous and hard labor scenes (China · policy)

**Summary:** Per CCTV News broadcast and a November 13 Cyberspace Administration of China repost, the National Development and Reform Commission said China’s AI growth speed and application scale lead globally and that during the 15th Five-Year Plan period the country will use deployment to pull innovation and deepen the “AI+” campaign. Priorities include application campaigns for mining, high-altitude work, emergency response, and other “dangerous, dirty, exhausting, tedious, hard” scenes; national AI application pilot bases in manufacturing, energy, transport, and healthcare; coordinated supply of compute, models, and data with faster standards; and stronger governance rules for human-centered, beneficial AI.

**Links:**

- [CAC — China to deepen “AI+” action in the 15th Five-Year Plan period](https://www.cac.gov.cn/2026-11/13/c_1796327469005843.htm)

**Commentary:** Policy narrative is shifting from chasing parameters to trading real scenes for iteration—hazardous and hard jobs are the deployment doors Beijing wants opened first.

---

### 12. EU leaders hold first AI summit in Dublin: catch-up with the U.S. and China versus risk management (Europe · policy)

**Summary:** On November 13 EU leaders met in Dublin for their first informal AI summit, joined by Mistral CEO Arthur Mensch and Geoffrey Hinton. Mensch urged Europe to “act now” on speed, financing, and member-state coordination to stay competitive with the U.S. and China; European Council President António Costa stressed both productivity and public-service gains and responsible governance standards. Estonia and Finland wrote ahead of the meeting calling for EU-level arrangements for serious AI incidents; European Parliament President Roberta Metsola pushed back on the idea that Europe has already “lost” the AI race.

**Links:**

- [Euronews — EU leaders discuss AI industry and risks at Dublin summit](https://www.euronews.com/2026/11/13/eu-leaders-discuss-how-to-boost-europes-ai-industry-while-tackling-risks-at-dublin-summit)
- [DW — EU leaders urged to ‘act now’ to stay AI competitive](https://www.dw.com/en/eu-leaders-urged-to-act-now-to-stay-ai-competitive-with-us-china/a-79937463)

**Commentary:** Europe’s choice is familiar: single-market speed, or governance language as a substitute for industrial scale.

---

## Today's Summary

- Nvidia’s official CEO handoff made succession risk at the AI compute leader Friday’s global pricing anchor.
- Product releases the same day spanned ChatGPT’s shopping wallet, Gemini 4 Hydrogen, Daybreak security agents, plus China’s Hunyuan realtime voice and DeepSeek’s full app API—agents moving into payments, pentesting, and cloneable product stacks.
- Capital and infrastructure pulled both ways: SpaceX floated a $74 billion supercompute build and Mirendil raised $1 billion for “AI doing R&D,” while the Notion–Fireworks supply-chain leak reminded buyers that vendors are attack surfaces.
- Regional policy moved in parallel: China’s 15th Five-Year Plan locked “AI+” onto hazardous labor scenes, and the EU held its first Dublin AI summit on catch-up and incident response.

**Daily Framing:** A handoff-and-agent-monetization day in the AI/tech cycle—compute empire succession and megawatt campuses on one screen, wallets, security agents, and full-stack APIs pushing agents into real transactions and ops on the other.

---

*This digest is compiled from real-time search results and is for reference only.*
