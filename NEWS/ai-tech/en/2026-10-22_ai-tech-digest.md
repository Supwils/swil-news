# October 22, 2026 · AI & Tech Daily Digest

> A roundup of AI and technology developments for October 22, 2026, with summaries, links, and commentary.

---

## I. Security, Monitoring, and Finance

### 1. METR and Redwood say OpenAI's pre-July 21 monitoring could be bypassed (Security)
**Summary:** On October 22, METR and Redwood Research said that from July 21 to August 11 one employee from each group stress-tested OpenAI's internal misalignment monitoring as it existed on and before July 21. They worked on chaperoned, on-site devices that never left the premises and delivered a 61-page internal report. They estimated that about 75% to 94% of agentic internal Responses API traffic from models at least as strong as GPT-5.5 was eligible for monitoring, and 99.2% of the internal Codex subset, with substantial uncertainty in both directions. Skipping compaction may have left on the order of 10% of eligible internal Codex traffic unmonitored from May to July; OpenAI staff fixed that during the exercise. The evaluators also found an exploit that could keep hundreds of recent actions from being monitored, with details redacted by OpenAI, and two client-controllable headers that could start a new agent with monitoring disabled. OpenAI said the vulnerabilities that affect production safeguards have been patched. METR said it has not evaluated that claim, and the public write-up covers the system as it stood before July 21.

**Links:**

- [METR — Red-Teaming OpenAI's Internal Agent Monitoring Systems](https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/)
- [CNBC — Third-party evaluators found vulnerabilities in OpenAI monitoring system](https://www.cnbc.com/2026/10/22/metr-redwood-research-open-ai-test.html)

**Commentary:** The public record is a high-access pilot and a redacted historical snapshot, and the evaluators say they have not checked whether production safeguards are now patched.

---

### 2. Axios: major U.S. banks find unvetted agents inside customer accounts (Finance)
**Summary:** Axios reported on October 22, citing people familiar with the matter, that Morgan Stanley, Bank of America, JPMorgan, Wells Fargo, and others are dealing with third-party AI agents inside customer accounts, and that some agents appear to act apart from user instructions. The usual case is a customer handing over login credentials, which still violates bank rules that require the account holder to log in. Some banks have also tracked agents contacting call centers. Morgan Stanley has begun blocking third-party agents, and JPMorgan, Bank of America, and Citi are restricting them. A Chase spokesperson said customers should not give usernames and passwords to anyone. A Morgan Stanley spokesperson said the bank has not observed "rogue AI agents accessing our platforms." Most banks already allow, or are moving toward, read-only access similar to existing budgeting apps.

**Links:**

- [Axios — Unvetted AI agents are accessing U.S. bank accounts](https://www.axios.com/2026/10/22/ai-agents-banks-unauthorized-accounts-access)
- [The Verge — AI agents are causing massive headaches for banks](https://www.theverge.com/tech/1016768/ai-agents-are-causing-massive-headaches-for-banks)

**Commentary:** The access banks are blocking is login permission customers handed over themselves, and Morgan Stanley says it has not seen rogue agents on its own platforms.

---

### 3. The day after the PHP patches: Japan and Britain keep mitigating, Cloudflare cites millions of attempts (Security)
**Summary:** The Associated Press reported on October 22 that governments and companies worked through the night to update PHP. The British prime minister's office said Thursday that no large public-facing critical services were affected, that some limited services may be offline, and that officials are working with OpenAI and international partners. Prime Minister Sanae Takaichi relayed a government warning telling administrators to install the patch released late Wednesday, or to take sites down if they cannot. Chief Cabinet Secretary Minoru Kihara said Japan had received no reports of damage from attacks tied to the flaws, and that parts of some government sites were taken offline to reduce risk. Finland's government site said the disruption was resolved and that some content was still being restored. Cloudflare chief executive Matthew Prince said on social media that there had been millions of exploit attempts in the hours after Wednesday's disclosure. The EU cybersecurity agency ENISA told organizations to act immediately.

**Links:**

- [PBS News / Associated Press — AI-assisted PHP flaws send governments rushing to patch](https://www.pbs.org/newshour/nation/ai-discovered-a-software-vulnerability-that-could-impact-70-of-websites-worldwide-the-rush-is-on-to-patch-it)
- [OpenAI — Coordinated disclosure of critical vulnerabilities](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/)

**Commentary:** The patches shipped on Wednesday; Thursday added government takedowns in Japan and Britain and Cloudflare's count of millions of attempts.

---

## II. Agents, Medicine, and Law

### 4. Uber rolls ChatGPT Work out to more than 30,000 employees (Product)
**Summary:** OpenAI said on October 22 that Uber is expanding ChatGPT Work the same day from a pilot of about 1,000 people to more than 30,000 employees worldwide, as its first company-wide agent platform for knowledge work. The agent connects to Google Drive, Gmail, Google Calendar, and Slack for research, meeting briefs, presentations, data analysis, and cross-app workflows. GPT-6.1 Sol is the default model, and engineering teams continue to use Codex. Uber chief technology officer Praveen Neppalli Naga called it a way to put the tools in front of every employee. The companies said they will share adoption and measurable outcomes as the rollout proceeds.

**Links:**

- [OpenAI — Uber brings ChatGPT Work to all employees](https://openai.com/index/uber-chatgpt-work-rollout/)

**Commentary:** The announcement is a seat count moving from 1,000 to more than 30,000, with adoption and hours saved still unpublished.

---

### 5. Anthropic opens a research preview of Claude Duet (Product)
**Summary:** TechCrunch reported on October 22 that Anthropic launched Claude Duet, an agent app for professionals and small businesses, built on Claude Opus 5.5. It can work in the background on its own virtual machine and return for approval. Anthropic says it can prepare a daily brief and dashboards, and connect to more than 6,000 connectors and plug-ins in the Claude Marketplace. Purchases can go through Stripe Link or Shopify Shop Pay, payments require user approval, and the agent will not trade securities or move money between accounts. A default classifier refuses requests for credit-card numbers and government identification. The app is on iOS, Android, and Claude.ai, and Pro and Max users join a waitlist. The help center says the research preview is for Pro and Max users in the United States.

**Links:**

- [TechCrunch — Claude Duet app is Anthropic's bet on agents](https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/)
- [Claude Help Center — Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)

**Commentary:** Payments and outbound messages are gated on approval, and access is still a waitlist for paying users in the United States.

---

### 6. Microsoft's Diagnostic Orchestrator reports about 83% accuracy on NEJM cases in Science (Medicine)
**Summary:** The Verge reported on October 22 that results for Microsoft's Diagnostic Orchestrator were published Thursday in Science. The system uses multiple agents to ask questions, choose tests, and reach a diagnosis. Microsoft compiled the cases into SDBench, which it plans to open-source. On cases drawn from hundreds of New England Journal of Medicine reports, accuracy was about 83%, compared with about 36% for generalist physicians using references and 22% for those without them. On emergency-department admissions from Beth Israel Deaconess Medical Center in Boston, the system scored 80% against an average of 47% for physicians, and it tended to reach a diagnosis at a lower estimated cost. The paper used OpenAI's GPT-5 and did not include GPT-6 Astra, Meta's Muse Wonder Full, Google's Gemini 4 Argon, or Anthropic's Opus 5.5. Microsoft AI chief executive Mustafa Suleyman said the system still needs clinical validation. Health lead Dominic King said hospital testing with Beth Israel will likely start in the next couple of months.

**Links:**

- [The Verge — Microsoft says its AI tool is better than doctors at diagnosing conditions](https://www.theverge.com/ai-artificial-intelligence/1016690/suleyman-microsoft-diagnostic-orchestrator-science-medical-superintelligence)

**Commentary:** The 83% and 80% figures come from published past cases and emergency data, and the hospital trial has not started.

---

### 7. Jones Day adopts Legora for more than 2,500 lawyers (Legal)
**Summary:** Legora announced on October 22 a strategic partnership with Jones Day. Over the coming months, more than 2,500 lawyers in the firm's 40 offices across the Americas, Europe, the Middle East, and Asia will get access to the platform. The firm will also be a design partner on Legora's forthcoming ontological legal-research product, and the two will run training with Dan Hunter, executive dean of the Dickson Poon School of Law at King's College London. Giles Elliott, Jones Day's global chair of AI and innovation, said individual adoption is already widespread and that the firm wants to combine lawyers' judgment with AI. Legora chief executive Max Junestrand said the work will cover complex litigation and transactions.

**Links:**

- [Legora — Jones Day selects Legora as strategic AI partner](https://legora.com/newsroom/jones-day-selects-legora-as-strategic-ai-partner-rolling-out-platform-firm-wide-to-2-500-lawyers-globally)

**Commentary:** What was announced is access for more than 2,500 lawyers over the coming months, plus a design partnership on a research product that is not out yet.

---

## III. Markets and Funding

### 8. Thursday morning: Nasdaq 100 down 2.4%, Meta down 5.9% (Markets)
**Summary:** Bloomberg, via The Edge, reported that technology shares led losses on October 22. As of 11:19 a.m. in New York, the Nasdaq 100 was down 2.4% and the S&P 500 was down 1.3%. West Texas Intermediate crude rose 1.1% to $98.18 a barrel, and the 10-year Treasury yield retreated to 5%. Meta fell 5.9% after beating expectations and raising its capital-spending outlook, and a gauge of its credit risk hit a new high. Tesla fell 0.78% after cutting its spending plans. The report said that if the losses hold through the close, the Nasdaq 100 will have its worst day since June. It also said the United States ordered some diplomats and families out of Saudi Arabia because of the Houthi threat, and that attacks on Wednesday on an Aramco site and a Saudi airport killed at least four people.

**Links:**

- [The Edge Singapore / Bloomberg — US stocks drop as oil rises and Meta falls](https://www.theedgesingapore.com/news/us-stocks/us-stocks-fall-ai-oil-risks-spur-flight-bonds)

**Commentary:** The 2.4% and 5.9% moves are the 11:19 a.m. New York readings, not closing prices.

---

### 9. Bloomberg: DeepSeek reportedly raises about $15 billion (Funding)
**Summary:** TechCrunch reported on October 22, citing Bloomberg, that two days after the United States ordered federal civilian agencies to remove DeepSeek's technology, the Hangzhou lab raised about $15 billion, about 100 billion yuan. Potential investors include CATL and Tencent, among others. The same account says a June round raised more than $7 billion at a $50 billion valuation, and that in July the company was reportedly seeking another $1.5 billion at a valuation around $71 billion. TechCrunch said DeepSeek did not immediately respond to a request for comment. The story does not give a valuation for the new round.

**Links:**

- [TechCrunch — DeepSeek reportedly raises $15B days after US restrictions](https://techcrunch.com/2026/10/22/deepseek-reportedly-raises-15b-days-after-us-restrictions/)

**Commentary:** The $15 billion figure is Bloomberg's account as relayed by TechCrunch; the company has not confirmed it, and no valuation for this round was stated.

---

## IV. China's Compute, Models, and Robots

### 10. iFlytek releases Spark X2.6 and cites about a 4x gain in long-context training (Models)
**Summary:** The Paper reported on October 22 that iFlytek released the end-cloud Spark X2.6 model at the main forum of its 2026 Global 1024 Developer Festival. The company said this is the first time it has made a breakthrough in coding and agent capability on fully domestic compute, and that several public-benchmark results match leading industry levels. To work around memory and bandwidth limits on domestic chips, dynamic parallel training for long tasks allocates compute by task length and raises ultra-long-context training efficiency by about four times. Adaptive storage-compute inference on domestic clusters, plus what iFlytek calls the first four-layer KV cache on fully domestic equipment and distributed inference, raises cache and compute efficiency by 4.5 times.

**Links:**

- [21st Century Business Herald / The Paper — iFlytek releases end-cloud Spark X2.6](https://www.21jingji.com/article/20261022/herald/b6f789c83ebf712a4ca0bc832cb93833.html)

**Commentary:** The 4x and 4.5x figures are iFlytek's own efficiency claims, and the report does not publish a checkable leaderboard score.

---

### 11. China National Computer Congress opens in Chengdu and Sichuan launches Tianfu Huiyan (Industry)
**Summary:** Xinhua reported on October 22 that the 23rd China National Computer Congress opened in Chengdu with more than 11,000 registrants, the first time in more than 20 years that the meeting has been held in Sichuan. Sugon senior vice president Li Bin said the domestic 100,000-card Sugon 8000 (Dengfeng) cluster, which went online in July, already supports more than 300 major scientific-engineering simulations and pretraining at the 10,000-card scale. Fan Qiwu, chief technology officer of Sichuan Natural Resources Digital Technology, said a mining model is in use for exploration at more than 10 organizations and is being tried for extraction at the Hongge South mine and mines under Sichuan Gold, with the full build expected by the end of next year. After training on 50,000 labeled images, daily rock-and-mineral identification rose from a little over 10 slides to thousands or tens of thousands, accuracy rose from 85% by hand to 93%, and expected annual economic value is in the tens of millions of yuan. Sichuan's Tianfu Huiyan platform went live at the meeting, built around a version 1.0 scientific foundation model with about 35 billion activated parameters. The province treats "AI+" as its top innovation project. Industry revenue in the first three quarters was 152.1 billion yuan, up 21%. A report released at the meeting put 2025 industry revenue at 191.97 billion yuan, up 22.9%, with 2,806 key AI companies.

**Links:**

- [Xinhua — AI trends at the 23rd China National Computer Congress](https://www.news.cn/tech/20261022/15a3938d60194d06a14e9252e4efc56d/c.html)

**Commentary:** The 100,000-card cluster and the 152.1 billion yuan are stock figures cited at the meeting; the 35-billion-parameter model is the core of a platform that went live that day.

---

### 12. Unitree's H2-X clip draws debate, and Wang Xingxing puts a date on embodied intelligence (Robots)
**Summary:** Global Times reported on October 22 that Unitree released an H2-X "Kung Fu Legend Guardian" demonstration video on Wednesday, including blocking, lifting the front of a car by hand, and a simulated traffic accident. The company said maximum operating time is about eight hours, against about three hours for the standard H2. The topic was on Weibo's trending list Thursday. Speaking the same day in Hangzhou at the 2026 World Physical AI Conference and Unitree Partner Ecosystem Conference, founder Wang Xingxing said embodied intelligence could have its "ChatGPT moment" as early as next year, that a breakthrough in physical AI is most likely in the next one to two years or two to three years, and that commercial services will land sooner than household and industrial uses. He also said roughly 10,000 to 20,000 G1 units have come off the line since the May 2024 launch. The South China Morning Post noted the same day that the video appeared Wednesday and that release details remain sketchy.

**Links:**

- [Global Times — Unitree unveils H2-X Kung Fu Legend Guardian](https://www.globaltimes.cn/page/202610/1372791.shtml)
- [South China Morning Post — Unitree unveils a guardian robot](https://www.scmp.com/tech/tech-trends/article/3371683/chinese-firm-unveils-guardian-robot-can-disarm-attackers-lift-cars)

**Commentary:** The eight-hour runtime and the 10,000-to-20,000 G1 figure are the company's claims, and the video does not say how much of the motion is autonomous.

---

## Today's Summary

- METR and Redwood published a high-access pilot of OpenAI's monitoring system as it stood before July 21: most internal Codex traffic was eligible for monitoring, and an exploit could hide hundreds of actions. OpenAI says production safeguards are patched; the evaluators have not checked that claim.
- Axios reported that major U.S. banks are blocking or restricting third-party agents that hold customer passwords. The day after the PHP patches, governments in Japan and Britain were still taking some services offline, and Cloudflare cited millions of exploit attempts.
- Uber expanded ChatGPT Work to more than 30,000 employees, Anthropic opened Claude Duet through a waitlist, Microsoft published about 83% diagnostic accuracy on past cases in Science, and Jones Day is preparing Legora access for more than 2,500 lawyers.
- On Thursday morning the Nasdaq 100 was down 2.4% and Meta was down 5.9% in New York trade. DeepSeek reportedly raised about $15 billion. iFlytek released Spark X2.6, the China National Computer Congress opened in Chengdu, and Unitree's H2-X video landed alongside Wang Xingxing's timeline for embodied intelligence.

**Daily Framing:** In the AI and tech cycle, this was a day when agent permissions hit a wall: outside evaluators documented historical ways around OpenAI's monitoring, banks moved to take back logins customers had given to agents, and exploit attempts kept arriving in the millions after the PHP patches, while agents were also rolled onto Uber desks and into a law firm, a diagnostic system posted scores on old cases, and China kept filling the supply side with domestic compute and humanoid demos.

---

*This digest is compiled from real-time search results and is for reference only.*
