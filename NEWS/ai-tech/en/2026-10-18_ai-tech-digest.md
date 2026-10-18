# October 18, 2026 · AI & Tech Daily Digest

> A roundup of AI and technology developments for October 18, 2026, with summaries, links, and commentary.

---

## I. Data Centers and Power

### 1. Microsoft exits Nscale's Essex data center as grid power slips into the 2030s (Infrastructure)
**Summary:** The BBC and The Guardian reported Sunday that Microsoft has pulled out of the AI data center Nscale plans in Loughton, Essex. Nscale last year pledged £2 billion for the site and said it still intends to build what it calls the UK's largest AI data center. Microsoft declined to comment. Power was due at the end of this year; Nscale has been told it will not arrive until the 2030s. The Guardian reported that UK Power Networks said earlier this month it could not supply enough power until the early to mid-2030s. Nscale said it is looking for other power sources and that contracts with Microsoft in Norway, Portugal, and the United States are unaffected. The BBC said the site is expected to create 250 permanent jobs. Last month Microsoft said part of a $30 billion UK investment would fund the Loughton supercomputer. The Guardian said Microsoft was the project's only publicly announced customer and that the site had been planned to open next year.

**Links:**

- [BBC — Microsoft pulls out of Nscale's Essex AI data centre](https://www.bbc.com/news/articles/c9m26kl5y7epo)
- [The Guardian — Microsoft pulls out of AI datacentre project in Essex over power supply concerns](https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns)

**Commentary:** Sunday's exit is written as a London and south-east grid queue into the 2030s, leaving the £2 billion site without its only announced anchor customer.

---

### 2. Anthropic leases the first phase of a Nova Scotia data center EverWind prices near $10 billion (Infrastructure)
**Summary:** CBC and The Globe and Mail reported that EverWind on Friday unveiled a data center at Point Tupper, Nova Scotia, and Anthropic later confirmed it will lease the first phase to run Claude for Canadian and global customers. CBC said the first-phase lease runs at least 20 years. Phase one is 95 megawatts, aimed for the end of 2027; phase two is 325 megawatts, aimed for 2028, for 420 megawatts in total, with phase two subject to commercial, technical, and regulatory conditions. EverWind said it is raising $8 billion in private capital for the data center and $2 billion for four onshore wind farms. In the same Globe article, Anthropic's valuation is labeled in US dollars and the project figures are not given a separate currency. The company's release said the campus and wind farms would support about 2,000 construction jobs and 215 permanent jobs. Preliminary closed-loop cooling use is 100,000 litres a day for phase one and 500,000 litres a day for both phases. A Mi'kmaw consortium led by Membertou First Nation is negotiating a 9 percent equity stake. The provincial grid operator did not say whether capacity is available; EverWind said phase one has been assured.

**Links:**

- [CBC — Nova Scotia to host massive data centre to power Anthropic's Claude](https://www.cbc.ca/news/canada/nova-scotia/nova-scotia-to-host-massive-data-centre-to-power-anthropic-s-ai-assistant-claude-9.7383129)
- [The Globe and Mail — Anthropic signs onto $10-billion Nova Scotia data centre project](https://www.theglobeandmail.com/business/article-anthropic-signs-onto-10-billion-nova-scotia-data-centre-project/)

**Commentary:** In the same week a UK project is stuck on the grid, the Canadian announcement puts 95 megawatts and a lease of at least 20 years on paper, while rates and water use remain pledges and early estimates.

---

## II. Models, Coding Tools, and Keys

### 3. DeepSeek releases MIT weights for V4.1-Flash-1017 and prices search at $0.75 per 1,000 calls (Model)
**Summary:** DeepSeek on Saturday said in its API docs that V4.1-Flash-1017 is live on the website, app, and API, and called it a minor update with stronger benchmarks, faster tasks, and shorter outputs. The weights are on Hugging Face and ModelScope under the MIT license. The model card lists 763 billion parameters and recommends a 1 million token context window and at least 256,000 tokens of generation. On the company's own table, Terminal-Bench 4.0 rises from 31.2 to 42.3 and DeepSWE v1.1 from 74.2 to 77.0. The same table lists GPT-5.6 Sol and Opus 5 at 39.9 and 51.8 on Terminal-Bench 4.0, and at 73.0 and 74.0 on DeepSWE v1.1. Search and Fetch are each priced at $0.75 per 1,000 calls. Server-side tool calls through DeepSeek Harness, Claude Code, and Codex are free until billing starts at 16:00 UTC on October 31, 2026. Those scores are the company's measurements on the harnesses it names.

**Links:**

- [DeepSeek API Docs — DeepSeek-V4.1-Flash-1017](https://api-docs.deepseek.com/news/news261017/)
- [Hugging Face — deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)

**Commentary:** MIT weights lower the bar for downloading a coding model, and the search API puts a price, from October 31, on calls that Claude Code and Codex still get free.

---

### 4. Replit makes OpenAI the default for its agent and says Claude remains available (Product)
**Summary:** TechCrunch reported that Replit chief executive Amjad Masad said Thursday at TechCrunch Disrupt that the company was no longer working with Anthropic, citing cost and better results from Sol and Astra on internal and public benchmarks for building applications from scratch. The story was updated over the weekend: Masad told TechCrunch that customers can still choose Claude or other supported models, and that OpenAI is now the preferred partner for Replit Agent. A person familiar with the partnership, who asked not to be named, said the Anthropic deal was still in place. On stage, Masad said enterprise contracts rose from about 2 percent of revenue last year to about 15 percent this year, and that B2B is now more than half of revenue. He also said Replit had until recently been a top-five Anthropic customer. He expects enterprise and government customers to provide more than half of revenue in 2027. The company did not publish annual recurring revenue.

**Links:**

- [TechCrunch — Replit makes OpenAI its default over Anthropic, CEO says](https://techcrunch.com/2026/10/17/replit-is-no-longer-working-with-anthropic-ceo-says/)

**Commentary:** The stage line was an end to the partnership; the weekend clarification keeps Claude selectable with OpenAI as the default, while an unnamed source says the contract remains.

---

### 5. OpenCode says 1.4 percent of Console users were hit and external model keys may have been exposed (Security)
**Summary:** On The Wire on Sunday quoted an X post OpenCode published Saturday: a security breach the night before, tied to what it called a large-scale distillation attack, affected 1.4 percent of OpenCode Console users. An edit added that the people affected were a subset who had linked external providers, that they were emailed that morning, and that anyone who did not get the email was not affected. The company said the incident was ongoing, so it could not share more, and that it was working with Anthropic, OpenAI, and Google. On The Wire said it had not seen the email itself. A screenshot circulating online uses the subject "Action Required: Potential provider key breach" and says someone gained unauthorized access to a legacy system being decommissioned, and that third-party keys saved in the workspace may have been exposed. OpenCode has not said how many accounts 1.4 percent represents, or confirmed that keys were stolen.

**Links:**

- [On The Wire — OpenCode says a breach hit 1.4% of its Console users](https://onthewire.ai/article/opencode-says-a-breach-hit-1-4-of-its-console-users-an-email-shared-online-tells)
- [Noma Security — OpenCode Console breach: what security teams need to know](https://noma.security/blog/opencode-console-breach-what-security-teams-need-to-know)

**Commentary:** The public account stops at 1.4 percent of Console users and a "may have been exposed," and names the gateway that stores other companies' model keys as an entry still being cleaned up.

---

## III. Agent Boundaries

### 6. The Guardian on Sunday revisits Anthropic's IoT self-replication tests, and security researchers split (Security)
**Summary:** The Guardian on Sunday published Joseph Menn's account of a paper Anthropic's offensive research team posted on October 12. Anthropic said it ran Gemma4-26B-A4B split across 15 off-brand Android TV boxes costing about $55 each, at 0.39 tokens per second, and that a 9-billion-parameter model got inference running on 8 of 9 hardware types. Models of 30 billion parameters and under can already complete many individual replication steps but make mistakes end to end. In simplified evals, GLM-5.2 and stronger models can finish the chain. If small models improve at their historical rate, Anthropic said they could match that level by the end of the year. The post says the experiments largely set aside the cyber-exploit step. Joshua Saxe, who led Meta's AI security effort, said the security community is not taking these risks seriously enough. Juan Andres Guerrero-Saade, vice president of research at SentinelOne, said the work is not truly feasible or impactful. University of Toronto PhD student Jonas Guan said the Anthropic version moves very slowly and should not top the list of worries. Anthropic did not respond to the Guardian's interview request.

**Links:**

- [The Guardian — What are self-replicating AI worms, and why is Anthropic worried about them?](https://www.theguardian.com/technology/2026/oct/18/anthropic-ai-worm-worries)
- [Anthropic — AI models may be capable of self-replicating without access to a datacenter](https://www.anthropic.com/research/self-replicating-ai)

**Commentary:** The 15 television boxes show that sharded inference can run; whether that becomes a spreading chain by year-end is the gap between the lab's extrapolation and the security firms.

---

### 7. Charles Schwab says it is blocking Muse and other outside agents from moving client money (Finance)
**Summary:** Moneycontrol on Friday carried a Bloomberg Television interview with Charles Schwab chief executive Rick Wurster, who said the firm is blocking unauthorized AI agents from moving client money, including Meta's Muse. Wurster said the firm does not want a client to hand a password to Muse and let it act, because neither Schwab nor the client can control it and liability is unclear. He said a weekly report shows the big agents being blocked in the tens and twenties. Schwab plans model-context-protocol servers so outside models can see balances and do research, and it will not let them move money. He wants clients to use Charley, the firm's own assistant unveiled last month. The block counts are Wurster's figures from the interview.

**Links:**

- [Moneycontrol — Charles Schwab blocks unauthorised AI agents from customer accounts](https://www.moneycontrol.com/news/business/after-jpmorgan-charles-schwab-blocks-unauthorised-ai-agents-from-accessing-customer-accounts-14054121.html)

**Commentary:** The brokerage keeps outside agents away from transfers and leaves a read-only view of balances; a few dozen blocks a week means the attempts have started and are still small.

---

## IV. China: Compute, Forecasts, and Robots

### 8. Shenzhen HPC conference shows the domestic 100,000-card Sugon 8000 cluster (Compute)
**Summary:** IT Home on Sunday, citing CCTV, reported that at the 2026 National High Performance Computing Academic Conference in Shenzhen, the country's first domestically built 100,000-card AI supercluster, completed this year, was shown in person and will be tied to ten application results. The report said 100,000 cards means 100,000 AI accelerators linked at high speed, and that Sugon 8000 is built to run high-precision scientific computing and large-model training and inference on one base. IT Home recalled the description from the August commissioning: peak compute was compared to all of humanity calculating for 200 years, and the cluster was said to be supporting more than 300 tasks across 26 fields, including new materials, innovative drugs, and AI. The conference report did not add a new peak-compute figure.

**Links:**

- [IT Home — China's first 100,000-card AI supercluster shown in person](https://www.ithome.com/1/014/456.htm)

**Commentary:** What Sunday adds is the machine on stage and a promise of ten application results; the 26 fields and 300-plus tasks remain the August commissioning description.

---

### 9. Fengqing ensemble forecast is declared operational, with an 11.0-day useful range at 500 hPa (Application)
**Summary:** Eastmoney on Saturday carried a STAR Market Daily report that, at that day's National High Performance Computing Academic Conference, the National Supercomputing Internet said the Fengqing AI global short-to-medium-range ensemble forecast system V1.0 had passed operational review and entered service. That story said overall forecast skill surpassed the European Centre for Medium-Range Weather Forecasts' AI ensemble system. A Friday Ifeng account of the review is more specific: the National Meteorological Center led the work with the Xiong'an meteorological AI institute, the National Meteorological Information Center, and Sugon. On independent samples from January 2025 through August 2026, the ensemble-mean useful range for global 500 hPa geopotential height reached 11.0 days, and some scores, including CRPS and the spread-error relationship, beat ECMWF's numerical ensemble and its AI ensemble system AIFS-CRPS.

**Links:**

- [Eastmoney — Fengqing AI global ensemble forecast system V1.0 enters operation](https://finance.eastmoney.com/a/202610173899048895.html)
- [Ifeng — Fengqing ensemble forecast system passes operational review](https://biz.ifeng.com/c/8xGsKufk0BH)

**Commentary:** The figures that can be checked are 11.0 days and "some indicators ahead"; the conference copy's claim of overall superiority is broader than the review write-up.

---

### 10. Securities Daily, citing Frost and Sullivan, says first-half humanoid sales topped all of 2025 (Industry)
**Summary:** Securities Daily reported Sunday that Frost & Sullivan's 2026 global humanoid-robot market report put first-half 2026 sales at 36,000 units, above the 35,000 sold in all of 2025, with revenue of $540 million. By revenue, the top five were all Chinese firms: UBTECH first at 620 million yuan and a 16.5 percent share, followed by Agibot, Unitree, Galbot, and Leju, together 57.4 percent. Securities Daily, citing Yuanda Information, put first-half 2026 financing in the sector at 104.1 billion yuan, close to double the total for 2025. The rankings, unit sales, and financing total are those outlets' retellings, not exchange filings.

**Links:**

- [Securities Daily — Capital markets speed the industrialization of humanoid robots](https://field.10jqka.com.cn/20261018/c680807466.shtml)

**Commentary:** The 36,000 units exceed last year's full count, the revenue top five are described as Chinese firms, and 104.1 billion yuan is an information vendor's tally rather than a single deal.

---

## Today's Summary

- On Sunday Microsoft left Nscale's Essex data center after power slipped from the end of this year into the 2030s, leaving the £2 billion project without its only announced customer. On Friday Anthropic leased the first 95 megawatts in Nova Scotia for at least 20 years, with a target of late 2027.
- On Saturday DeepSeek released MIT-licensed V4.1-Flash-1017, with a 1 million token context, and priced Search and Fetch at $0.75 per 1,000 calls, with coding-tool calls billed from October 31. Replit made OpenAI the default for its agent and said Claude remains selectable. OpenCode said 1.4 percent of Console users were caught in a breach.
- The Guardian on Sunday walked through Anthropic's sharded-inference test on 15 television boxes, and security firms and former lab security staff disagreed on whether a worm is plausible by year-end. On Friday Charles Schwab said large outside agents are blocked a few dozen times a week and that outside models may only view balances.
- The Shenzhen HPC conference showed the 100,000-card Sugon 8000 machine. Fengqing's ensemble forecast was declared operational, with an 11.0-day useful range at 500 hPa on an independent sample. A report cited by Securities Daily said global humanoid sales reached 36,000 units in the first half, with Chinese firms in the top five by revenue.

**Daily Framing:** In the AI and tech cycle, this was a day of waiting for power and handing over the keys: a UK project pushed its grid connection into the 2030s and lost its anchor customer, while open weights and coding platforms spent the same weekend changing the default model, pricing search, and dealing with a report that hosted provider keys had been reached.

---

*This digest is compiled from real-time search results and is for reference only.*
