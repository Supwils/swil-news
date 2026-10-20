# October 20, 2026 · AI & Tech Daily Digest

> A roundup of AI and technology developments for October 20, 2026, with summaries, links, and commentary.

---

## I. Policy and Industry

### 1. State Department designates Zhisuan and MiraclePlus under the intellectual-property law (Sanctions)
**Summary:** On October 19 the U.S. State Department published a fact sheet designating five Chinese entities under the Protecting American Intellectual Property Act, citing theft of trade secrets from U.S. persons. The sheet says Shanghai Zhisuan Technology, founded by Linwei Ding in 2023, applied to MiraclePlus and claimed it could replicate Google's superintelligence infrastructure; MiraclePlus provided seed capital in exchange for an equity stake. Also designated were MiraclePlus-managed Phase I and Phase II funds and Zhiyuan Enterprise, which is wholly owned by Phase I. The department said the designations trigger the statute's property blocking, large-loan limits, foreign-exchange and banking restrictions, and a ban on U.S. persons making significant investments in the entities' equity or debt.

**Links:**

- [U.S. Department of State — Imposing Sanctions to Protect Americans from Intellectual Property Theft](https://www.state.gov/releases/office-of-the-spokesman/2026/10/imposing-sanctions-to-protect-americans-from-intellectual-property-theft-fact-sheet/)
- [OFAC — PAIPA Designations of October 19, 2026](https://ofac.treasury.gov/recent-actions/20261019)

**Commentary:** The list runs from the startup to the incubator and two funds that held its equity, and the menu of restrictions follows that ownership chain.

---

### 2. MIIT issues an AI-plus-software plan covering 20,000 firms by 2028 (Policy)
**Summary:** Science and Technology Daily reported on October 20 that the Ministry of Industry and Information Technology had issued an action plan for "AI + software." By 2028 the plan calls for adoption at 20,000 software firms above a designated size, 100 intelligent-upgrade projects, 100 benchmark agent applications in priority industries, and at least five key open-source projects; by 2030 it aims for a further step-up in the fusion of AI with software and information-technology services. Figures cited in the plan put 2025 software-industry revenue at 15.48 trillion yuan, 6.2 times the 2012 level, and say average daily token calls had passed 500 trillion by June 2026. Wang Weiwei, a deputy director-general for information-technology development, said development should use AI to strengthen security, and that products should keep behavior controllable and traceable.

**Links:**

- [China Economic Net — Action plan for the AI-plus-software program](http://www.ce.cn/xwzx/gnsz/gdxw/202610/t20261020_3264711.shtml)

**Commentary:** The 2028 targets are coverage, upgrades, and benchmark counts; the 500 trillion daily tokens are a stock of usage through June, not a budget line in the plan.

---

### 3. MIIT says it is drafting a next-generation smart-manufacturing policy (Industry)
**Summary:** Economic Information Daily reported on October 20 that, at that day's State Council Information Office briefing, MIIT chief engineer Wang Weiming said the ministry is drafting policies for a new generation of smart manufacturing and wants AI fused through the manufacturing chain so equipment can sense, decide, and act. The ministry listed four lines of work: tiered smart factories; intelligent machine tools, robots, and inspection and control equipment; industrial datasets, vertical models, and an exploration of industrial intelligent operating systems; and smart-factory cooperation through BRICS and similar mechanisms. Basic and advanced factories would be encouraged to deepen digital foundations, while excellence and lighthouse factories would be supported in trying new architectures. Scheduling, parameter tuning, defect detection, and maintenance would sit inside a "model-data resonance" program.

**Links:**

- [Economic Information Daily — MIIT is drafting next-generation smart-manufacturing measures](http://jjckb.xinhuanet.com/20261020/3db59e9bce1547c99119d9b0be826fcd/c.html)

**Commentary:** Tuesday's briefing attached AI to factory tiers and industrial datasets, and the policy text is still being drafted, with no budget or timetable given.

---

## II. Open Source and Products

### 4. DeepSeek open-sources DeepInfer, for now limited to V4.1-Flash (Open source)
**Summary:** The Next Web reported on October 20 that DeepSeek announced on X the open-sourcing of DeepInfer, the inference framework behind its production service. The code is on GitHub under Apache 2.0 and currently supports only DeepSeek-V4.1-Flash. The company said it was sharing the production stack to help lower compute cost and energy use. The framework runs on Nvidia SM100 data-center GPUs and Huawei Ascend 950 chips, includes speculative decoding, and adds features that keep outputs stable and formats constrained. DeepSeek said it was first built mainly on vLLM and also drew on SGLang and TensorRT-LLM. The GitHub page says this release leaves out a cache system, the split between processing prompts and generating answers, and load balancing across machines. DeepSeek's published measurements used four SM100 GPUs for prompts and 64 for generation; Bloomberg News reporter Saritha Rai said those figures are the company's own and have not been independently tested.

**Links:**

- [The Next Web — DeepSeek open-sources DeepInfer, the engine that runs its AI models](https://thenextweb.com/news/deepseek-deepinfer-open-source-inference-engine)
- [GitHub — deepseek-ai/DeepInfer](https://github.com/deepseek-ai/DeepInfer)

**Commentary:** What shipped is an offline inference kernel and a parallelism recipe; cache, prefill-decode separation, and replica scheduling stay outside the repository.

---

### 5. OpenAI acquires Orchestra Bio and folds it into Rosalind (M&A)
**Summary:** Axios reported exclusively on October 20 that OpenAI has acquired Orchestra Bio, a startup whose AI agents help pharmaceutical companies manage drug development, including monitoring studies, tracking timelines, and flagging delays. OpenAI told Axios the team and technology will be integrated into Rosalind, its suite of models and tools for life-sciences research. Financial terms were not disclosed. Axios said OpenAI introduced the specialized GPT-Rosalind model in April and has worked with drugmakers including Novo Nordisk and Moderna; the company said a new medicine typically takes 10 to 15 years and hopes AI can shorten that. Axios, citing The Information, also said Anthropic acquired biotech startup Coefficient Bio for about $400 million in April.

**Links:**

- [Axios — OpenAI acquires biotech startup as AI race moves into drug development](https://www.axios.com/2026/10/20/exclusive-openai-biotech-startup-drug-development)
- [OpenAI — OpenAI acquires Orchestra Bio](https://openai.com/index/openai-to-acquire-orchestra-bio/)

**Commentary:** The price was not disclosed, and what changed hands is an agent layer for drug-company workflows, not a new foundation model.

---

### 6. Tencent Cloud opens Yuanbao Search, with 2,000 free calls a month (Product)
**Summary:** Kuaikeji reported on October 20 that Tencent Cloud opened Yuanbao Search to developers and enterprises the same day, with 2,000 free calls a month through Skill, MCP, and API. The report said the engine has a hundred-billion-scale index, handles hundreds of millions of calls a day, and already serves more than 50 internal products, including WorkBuddy, ima, Tencent financial technology, and Tencent Video. After ima connected, useful-source recall rose about 10 percent; Tencent Video's coverage for plot and fuzzy queries widened by 20 percent. The index includes 157 authoritative sources across 13 verticals such as finance, health, law, and travel, and coverage of filings for A-shares, Hong Kong, the United States, Japan, and South Korea exceeds 99 percent. At a 94 percent recall rate, average low-level index lookup takes 8 milliseconds, core ranking-model inference fell from 149 milliseconds to 30, and end-to-end response in the Yuanbao app shortened by nearly one second.

**Links:**

- [Sina Finance — Tencent opens Yuanbao Search](https://finance.sina.cn/stock/jdts/2026-10-20/detail-inivwitm5718916.d.html?vt=4)

**Commentary:** What opened to outsiders is a retrieval layer already handling hundreds of millions of internal calls a day, and the free tier stops at 2,000 calls a month.

---

### 7. Ant's inclusionAI open-sources five Ming-3.0 speech models (Open source)
**Summary:** IT Home reported on October 20 that Ant's inclusionAI open-sourced the Ming-3.0 speech family the same day: five models across speech synthesis, audio understanding and conversation, and speech recognition. The text-to-speech models can design a voice from a written description or a reference clip, and a "director mode" specifies how emotion, emphasis, and pacing should change. The audio models can transcribe, summarize, and analyze long recordings while keeping speaker, emotion, and environment cues. IT Home said the synthesis models are already used in the Afu app, doctor voice cloning, and internal office tools, and the recognition model is used in Afu's doctor assistant, Alipay search, Ant's insurance voice product, and identity checks. Weights are on Hugging Face and ModelScope under inclusionAI, including Ming-3.0-tts-0.5B.

**Links:**

- [IT Home — Ant open-sources the Ming-3.0 speech family](https://www.ithome.com/1/015/117.htm)
- [TechNode — Ant Group open-sources Ming-3.0 speech models](https://technode.com/2026/10/20/ant-group-open-sources-ming-3-0-speech-models-with-voice-design-and-audio-understanding/)

**Commentary:** The five checkpoints split synthesis, understanding, and recognition, and the public write-ups do not include one parameter table or an independent evaluation.

---

### 8. Chery unveils CheryMind; Ziwei C100 is on the 2027 roadmap (Product)
**Summary:** China Securities Journal reported on October 20 that Chery's global innovation conference opened that day in Wuhu, Anhui, where the company released CheryMind, a vertical foundation model aimed at physical AI, and showed its Ziwei chips. Chery said the model covers 700 terabytes of corporate knowledge and 200 petabytes of engineering data, connects to more than 400 enterprise systems, and spans more than 200 business scenarios, from R&D, manufacturing, and quality to the cabin, driver assistance, robots, and farm machinery. The Ziwei C100 is on the 2027 product plan at 1,200 TOPS per chip and 2,400 TOPS of in-vehicle NPU with two chips, aimed at running hundred-billion-parameter models in the car. Chairman Yin Tongyue said R&D spending over the past five years exceeded 110 billion yuan. In the first three quarters Chery sold 2.207 million vehicles, including 859,000 new-energy vehicles, and exported 1.551 million. The company also set a 2030 target of 100,000 factory-installed robotaxis in operation.

**Links:**

- [Sina Finance — Chery releases the CheryMind model for physical AI](https://finance.sina.com.cn/roll/2026-10-20/doc-inivwuif5691696.shtml)

**Commentary:** The 700 terabytes and 400 systems describe data already connected inside the company; 2,400 TOPS is written into a 2027 chip plan.

---

## III. Capital, Users, and Power

### 9. Meta's Muse reaches 10.2 million U.S. downloads in 40 days (Product)
**Summary:** TechCrunch reported on October 20, citing Sensor Tower, that Meta's AI assistant Muse has been downloaded 10.9 million times since its September launch, 10.2 million of them in the United States, making it the 12th app to reach 10 million U.S. downloads within 40 days. The previous comparable case was Threads in July 2023. In October Meta put 39 percent of its advertising spend behind Muse, up from 23 percent in September. U.S. retention was 30 percent at day 7 and 23 percent at day 14, against Sensor Tower averages of 19 percent and 16 percent for rivals. Daily active users hit 2.5 million for the first time on October 16, up 15 percent week over week. In their first 40 days, U.S. downloads were 3.7 million for ChatGPT, 500,000 for Grok, and 200,000 for Claude. ChatGPT reached about 15 million downloads globally, while Muse is available only in the United States and Canada. Muse held the U.S. App Store top spot except on October 19, when Kick briefly passed it, and reclaimed first place on Tuesday.

**Links:**

- [TechCrunch — Meta's Muse hits 10M U.S. downloads in 40 days](https://techcrunch.com/2026/10/20/metas-muse-hits-10m-u-s-downloads-in-40-days-a-milestone-reached-by-only-11-other-apps/)
- [The Verge — Meta's Muse AI hits 10 million US downloads](https://www.theverge.com/ai-artificial-intelligence/1014440/metas-muse-ai-hits-10-million-us-downloads)

**Commentary:** The 10 million mark is U.S. downloads in 40 days, and the higher retention sits next to an ad-budget share that rose from 23 percent to 39 percent in October.

---

### 10. Reuters: OpenAI seeks about $30 billion at a valuation above $1.4 trillion (Funding)
**Summary:** Reuters reported on October 19, citing two people familiar with the matter, that OpenAI is trying to lock in commitments before Anthropic's expected mid-November listing, in a round of about $30 billion that could value the company above $1.4 trillion. One person said SoftBank, Abu Dhabi's MGX, and other existing backers are in talks to join. OpenAI is pitching investors on $50 billion in annualized revenue after the launch of GPT-6 Astra, with an expectation of $70 billion by year-end. Reuters said Anthropic told investors quarterly revenue rose from $11.6 billion in the second quarter to $16.8 billion in the third, while slower month-to-month growth has raised valuation concerns. The Next Web, recounting the same report on October 20, said OpenAI and SoftBank declined to comment to Reuters and that OpenAI was last valued at $852 billion in March.

**Links:**

- [Reuters via U.S. News — OpenAI seeks to accelerate fundraising ahead of Anthropic IPO](https://money.usnews.com/investing/news/articles/2026-10-19/exclusive-openai-seeks-to-accelerate-fundraising-ahead-of-anthropic-ipo-sources-say)
- [The Next Web — OpenAI reportedly races to close $30bn round before Anthropic's IPO](https://thenextweb.com/news/openai-30bn-round-before-anthropic-ipo)

**Commentary:** Both the $30 billion and the valuation above $1.4 trillion are still what people familiar told Reuters, and neither company has confirmed them.

---

### 11. Goldman: data-center power demand may rise 170% by 2030 (Infrastructure)
**Summary:** Axios on October 20 reported a Goldman Sachs study shared exclusively with it: global data-center power demand is expected to rise 170 percent between 2025 and 2030, with more than 60 percent of that growth in the United States. Jason Tofsky, Goldman's global head of digital-infrastructure investment banking, said in the report that power is probably the forever bottleneck. The report estimates about $7.6 trillion of capital spending from 2026 to 2031 across compute, data centers, and power, and $420 billion of global hyperscaler debt issuance in 2027, more than 60 percent above the bank's fiscal-2026 estimate. Hyperscalers account for only 40 percent of credit raised across the AI ecosystem. About 2,600 gigawatts of proposed U.S. generation and storage sit in interconnection queues, more than twice existing installed capacity, and the median time from application to commercial operation is about five years. Goldman said that since January 2026, 86 projects have been canceled or extensively delayed, 76 of them tied directly to local opposition.

**Links:**

- [Axios — The AI race is hitting an energy wall](https://www.axios.com/2026/10/20/goldman-ai-energy-infrastructure-bottleneck)
- [Goldman Sachs — Navigating a System of AI Bottlenecks](https://www.goldmansachs.com/what-we-do/investment-banking/insights/articles/navigating-a-system-of-ai-bottlenecks)

**Commentary:** The 170 percent figure is a demand forecast from 2025 to 2030, the median grid connection takes about five years, and the spending schedule is running ahead of the power plants.

---

## Today's Summary

- On Tuesday DeepSeek open-sourced its production inference framework, DeepInfer, currently limited to V4.1-Flash and able to run on Nvidia SM100 and Huawei Ascend 950 chips. On Monday the State Department designated Zhisuan and MiraclePlus under an intellectual-property sanctions law.
- MIIT's AI-plus-software plan sets 2028 targets of 20,000 firms and 100 benchmark agent applications, and at Tuesday's briefing the ministry said it is drafting a next-generation smart-manufacturing policy.
- OpenAI acquired drug-development agent company Orchestra Bio with no price disclosed. Reuters reported on Monday that OpenAI is seeking about $30 billion at a valuation that could exceed $1.4 trillion.
- Tencent opened Yuanbao Search, Ant open-sourced the Ming-3.0 speech models, and Chery released CheryMind. Meta's Muse reached 10.2 million U.S. downloads in 40 days. Goldman expects data-center power demand to rise 170 percent by 2030 and calls power the lasting bottleneck.

**Daily Framing:** In the AI and tech cycle, this was a day when an inference stack opened and power became the constraint: DeepSeek put its production inference framework on GitHub, China wrote software and manufacturing AI targets into ministry language, OpenAI bought a drug-development agent company while chasing a funding round, and Goldman recast the race as the speed of grids and permits.

---

*This digest is compiled from real-time search results and is for reference only.*
