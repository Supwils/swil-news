# October 25, 2026 · AI & Tech Daily Digest

> A roundup of AI and technology developments compiled for October 25, 2026, with summaries, links, and commentary.

---

## I. Returns and Capital Commitments

### 1. Apollo: "zero financial payoff" outside tech, with token spending highly concentrated (Capital)

**Summary:** TechCrunch reported on October 25 that Torsten Slok, chief economist at Apollo Global Management, wrote in an October 24 note that artificial intelligence has delivered zero financial payoff to corporate America outside tech, despite the scale of investment and hype. He compares what he calls the S&P 493: the S&P 500 minus Alphabet, Amazon, Apple, Meta, Microsoft, Nvidia, and Tesla. Yahoo Finance the same day relayed his charts: inflation-adjusted revenue per employee is about $780,000 at the Magnificent Seven and about $525,000 at the other 493 firms; profit margins are nearly 30 percent and about 10 percent. The note says total-factor productivity still shows no AI acceleration, and mainstream firms are starting to treat token spending as a cost that weighs on margins. The top 10 percent of firms account for 99.5 percent of spending on model serving and inference, 99 percent of neocloud spending, and more than 95 percent of spending tied to OpenAI and Anthropic.

**Links:**

- [TechCrunch — Apollo economist says AI payoff is zero outside tech](https://techcrunch.com/2026/10/25/ai-delivers-zero-financial-payoff-to-most-companies-according-to-apollo-economist/)
- [Yahoo Finance — Slok says the AI story will be decided in the S&P 493](https://finance.yahoo.com/markets/stocks/articles/apollo-torsten-slok-warns-ai-125709125.html)

**Commentary:** Cheaper tokens do not move the split in this note: at the macro level, AI still sits in the revenue and spending of a small set of firms.

---

### 2. Meta's quarterly filing lists three future commitments that reporters add to about $825 billion (Spending)

**Summary:** The Wall Street Journal's October 25 technology briefing revisited Meta's AI spending this week: on Wednesday the company said it would keep spending aggressively and create a new class of nonvoting stock; the next morning's disclosure of future leases and noncancelable contracts was added up in the press to about $825 billion, and the shares fell nearly 8 percent. Quartz's reading of the filing for the quarter ended September 30 puts leases that have not started at about $355.73 billion, covering data centers, energy, colocation, and some network infrastructure, commencing from the rest of 2026 through 2036. Noncancelable contractual commitments are $454.52 billion, with about $45.85 billion due in 2026 and about $121.41 billion in 2027. A further contingent cloud-purchase obligation of up to $14.72 billion can fall if the provider sells that capacity to other customers. Meta raised the floor of its 2026 capital-expenditure outlook from $130 billion to $135 billion, left the ceiling at $145 billion, and reported third-quarter capital expenditure of $34.91 billion.

**Links:**

- [Quartz — Meta’s lease and contract commitments](https://qz.com/meta-825-billion-lease-contract-commitments-ai-102226)
- [WSJ — Meta’s AI spending, Technology for Oct. 25](https://www.wsj.com/tech/ai/metas-unending-ai-spending-34e53011)

**Commentary:** The roughly $825 billion figure is a reported sum of three commitments, so the dates leases actually start, and whether ad cash flow covers them, are the figures that matter next.

---

## II. Models, Vulnerabilities, and Biosecurity

### 3. Moonshot releases Kimi K3.1 Pro, with weights planned before November 4 (Model)

**Summary:** On October 24 Moonshot AI introduced Kimi K3.1 Pro, which it calls its most capable model in the 3-trillion-parameter class, with a 1-million-token context, and said full weights are planned for release before November 4. Its technical note cites 65.7 percent on Terminal-Bench 4.0, above the 58.2 percent it lists for GPT-6 Astra and close to 66.4 percent for Claude Opus 5.5. A faster variant is described as about two to three times the speed of the standard model. The company removed cyber-offense data from mid-training and reinforcement learning; on its internal xdev-bench-hard, pass@3 fell from 90.5 percent on the same pipeline without that removal to 81.0 percent for the final model. Reuters said the comparison has not been independently verified. The API homepage lists the standard model at 13 yuan per million input tokens and 68 yuan per million output tokens, and the faster variant at 26 yuan and 136 yuan.

**Links:**

- [Kimi API — Kimi K3.1 Pro](https://platform.kimi.com/docs/guide/kimi-k3-1-pro-quickstart)
- [Reuters — Moonshot curbs hacking ability in new Kimi model](https://www.investing.com/news/stock-market-news/moonshot-curbs-hacking-ability-in-new-kimi-model-as-fears-grow-over-aipowered-cyberattacks-4970639)

**Commentary:** The weights are not out yet, and the company's own test already says that stripping offense data lowered the exploit score while general coding still generalizes into that task.

---

### 4. Unit 42: PHP2Shell post-exploitation reached password hashes within two hours; CISA's same-day wording differs (Security)

**Summary:** In a threat brief updated on October 23, Palo Alto Networks Unit 42 said attackers exploited two PHP remote-code-execution flaws known as PHP2Shell, CVE-2026-109618 and CVE-2026-109619, each scored 9.2 under CVSS 4.0, and used agentic attack platforms for post-exploitation. In one case against a European government body, the brief says the intruders reached password hashes and multi-factor secrets within two hours of the initial exploit, set up an NTLM-relay tunnel, and attempted domain-administrator privilege escalation. Command batches carried delimiters suited to being read by a model. Cortex Xpanse then counted more than 22.6 million exposed instances that might be affected. A U.S. Cybersecurity and Infrastructure Security Agency alert updated the same day said CISA had not observed successful exploitation in the wild as of publication, and told operators to move to PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35.

**Links:**

- [Unit 42 — PHP2Shell threat brief, updated October 23](https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/)
- [CISA — Critical vulnerabilities in PHP require immediate patching](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching)

**Commentary:** Two public documents from the same day describe whether a break-in has already succeeded in different terms, and internet-facing PHP can be moved to those fixed releases now.

---

### 5. UK budget package includes a £100 million AI Biosecurity Lab (Policy)

**Summary:** On October 24 HM Treasury published an AI package the chancellor will put into the Budget. The National AI Biosecurity Initiative is £165 million: £100 million for what the government calls a world-first AI Biosecurity Lab, and £65 million for biosurveillance and medical countermeasures for priority pathogens. OpenAI and Anthropic together are providing up to £200 million in model credits. A Cabinet Office note the same day splits that support: £100 million in compute and model credits from OpenAI, and up to £100 million in model credits, trusted access, and technical support from Anthropic, with research partnerships from Google DeepMind and Basecamp Research. The same package adds £120 million for the AI Security Institute, £60 million for a National Cyber Shield, and £70 million for a National Exposure and Real-Time Vulnerability Centre.

**Links:**

- [GOV.UK — Chancellor unveils Britain’s plan for AI](https://www.gov.uk/government/news/chancellor-unveils-britains-ambitious-plan-for-ai)
- [GOV.UK — Introducing the AI Biosecurity Lab](https://www.gov.uk/government/news/introducing-the-ai-biosecurity-lab)

**Commentary:** The lab's stated job is earlier detection of biological threats and faster vaccines and treatments, the credits come from model companies, and the detection scope still depends on later documents.

---

## III. Chinese Manufacturing and Local Agents

### 6. Economic Daily: AI use in key scenarios exceeds one third of large manufacturers (Industry)

**Summary:** On October 25 Economic Daily wrote that "AI plus manufacturing" has moved from single demonstration sites to deployment at scale. The article's figures include an adoption rate above one third for key AI scenarios among industrial firms above a designated size; more than 500 high-quality datasets across 20 priority industrial fields; and more than 100 industrial agents in promotion. It also says that in the first three quarters, value added in digital-product manufacturing above the size threshold contributed more than one third of the growth in industrial output above that threshold. The piece adds that digital renovation covers 92 percent of those industrial firms, digital production equipment reaches 63 percent, shipments of smart devices in the first half of 2026 exceeded 100 million units, and some smaller firms still will not, cannot, or cannot afford the shift.

**Links:**

- [Economic Daily — Scaling the accelerator of AI plus manufacturing](http://www.ce.cn/xwzx/gnsz/gdxw/202610/t20261025_3270245.shtml)

**Commentary:** These percentages come from the day's commentary, so the later check is whether the datasets are actually called by production lines.

---

### 7. iFlytek Spark X2.6: a million-token model trained on domestic compute, with the efficiency numbers stated by the company (Product)

**Summary:** Rednet reported on October 25 that at its global 1024 developer festival in Beijing on October 22, iFlytek released Spark X2.6, trained entirely on domestic computing and supporting a million-token context. Chairman Liu Qingfeng said memory-bandwidth limits had made very long context slow to train and hard to fit, and that dynamic parallel training raised long-context training efficiency fourfold. On the Feixing No. 2 chip, he said inference efficiency rose 4.5 times and the KV-cache hit rate rose from 63 percent to 95.7 percent. Application figures given at the event include the Spark grading-machine line covering more than 3,000 schools and more than 4.5 million teachers and students, and a medical-imaging cloud covering more than 260 million people in China. This year's developer contest drew more than 52,000 teams from 15 countries and 351 cities.

**Links:**

- [Rednet — Domestic AI practice at iFlytek's 1024 developer festival](https://gov.rednet.cn/content/646054/69/16407849.html)

**Commentary:** The fourfold and 4.5-times figures are the company's account at the festival, and the check is whether training on domestic ten-thousand-card clusters repeats at that speed.

---

### 8. Chongqing releases the Mingjing platform; a street office reports request coverage rising from 35 percent to 82 percent (Local)

**Summary:** Chongqing Daily reported on October 25 that a general-artificial-intelligence conference was held in Chongqing from October 21 to 23, where the Chongqing Institute for General Artificial Intelligence released the Mingjing platform for creating, training, testing, and iterating agents. Chair Zhu Songchun said the platform has interim results in disaster prevention, a public-safety program, human resources, drug discovery, and intelligent cockpits. The report cites results in Guanyinqiao subdistrict: coverage of residents' requests rose from 35 percent to 82 percent, the number of people one grid worker can serve with precision rose from 50 to more than 500, and the rate at which demand is found proactively rose from 18 percent to 72 percent. China Mobile's Chongqing company said total computing exceeds 13,000 petaflops, with intelligent computing above 97 percent, and it launched a Mobile Cloud token center in Chongqing. The institute also started a partner program with iFlytek and 13 other firms.

**Links:**

- [Xinhua — Touching the future of general AI in Chongqing](http://www.cq.xinhuanet.com/20261025/5ad558db86c04311bf8d9300a62ac5b9/c.html)

**Commentary:** The grid figures say the coverage of discovered requests changed; false alarms, human review, and time to close a case are not in the same account.

---

## IV. Elections and Labor

### 9. Brazil votes in a presidential runoff after a first-round count in which 60 percent of tracked AI posts were deepfakes (Election)

**Summary:** UPI reported on October 25 that Brazil held its presidential runoff on Sunday between incumbent Luiz Inácio Lula da Silva and Liberal Party candidate Flávio Bolsonaro. The agency said Flávio won 47 percent and Lula 45.1 percent in the October 4 first round. That Sunday story did not report a count result. UPI's October 23 story said the Superior Electoral Court had received 804 election-related legal filings, against 325 at the same point in 2022, and that in September the court restated a ban on deepfakes that alter or recreate images and voices in electoral advertising, including with the person's consent. Brazilian fact-checker Lupa identified 920 political posts from August 16 to September 28 that used AI to create, modify, or lend authenticity to content; 554 of them, or 60 percent, were deepfakes.

**Links:**

- [UPI — Lula, Bolsonaro face runoff in Brazil elections](https://www.upi.com/Top_News/World-News/2026/10/25/latam-brazil-election/6531792941388/)
- [UPI — Brazil’s presidential runoff puts AI and deepfakes under scrutiny](https://www.upi.com/Top_News/World-News/2026/10/23/latam-brazil-presidential-runoff/9551792765244/)

**Commentary:** The ban on deepfakes in electoral advertising is already written down, and most of the synthetic posts in the first-round monitoring still lacked the required label.

---

### 10. BBC: workers in India film their hands by the hour to train robots (Labor)

**Summary:** On October 23 the BBC reported that Bengaluru barber Mohammed Ashim wears a camera on his head and films five or six hours a day of his hands at work, with clients' faces blurred. The footage is sold to technology companies and research organizations to train physical AI, meaning systems that control robots. Shahil Baig, chief executive of collector Rashdan Technologies, said pay for eight to ten hours of recorded work is $5 to $10, and that clients are now asking for four to six cameras around the head. Manish Agarwal, founder of Humyn Labs, said the firm has 96,000 data collectors across Latin America and Southeast Asia, and that there is no existing internet archive of this embodied activity. Bino Paul, a professor at the Tata Institute of Social Sciences, said that by the time workers realize what they have taken part in, automation may already have gone a long way.

**Links:**

- [BBC — The Indian workers filming their work to train AI](https://www.bbc.com/news/articles/ckvgyml6pdm9o)

**Commentary:** The hourly footage is a record of the gestures robots are meant to copy, and the consent described in the story stops at keeping faces and names out of the handoff.

---

## Today's Summary

- A note dated October 24 from Apollo's chief economist was widely reported on Sunday: revenue per worker and margins are rising at the Magnificent Seven and flat across the other 493 companies in the S&P 500, while token and neocloud spending sits in the top tenth of spenders. Meta's quarterly filing lists about $355.7 billion of leases not yet commenced and about $454.5 billion of noncancelable contracts, which reporters add to about $825 billion.
- Moonshot released Kimi K3.1 Pro, with weights planned before November 4, and said an internal exploit benchmark fell from 90.5 percent to 81.0 percent after offense data was removed. Unit 42 described a European government body losing authentication material within two hours of a PHP2Shell exploit; CISA said the same day that it had not observed successful exploitation in the wild as of the alert.
- Britain wrote a £100 million AI Biosecurity Lab into its budget package, with up to £200 million in model credits from OpenAI and Anthropic combined. Economic Daily cited AI adoption above one third in key scenarios at large manufacturers. iFlytek presented Spark X2.6 trained on domestic compute, and Chongqing's Mingjing platform was reported in use for finding neighborhood requests.
- Brazil held its presidential runoff. First-round monitoring cited by UPI counted 920 AI political posts, 60 percent of them deepfakes. The BBC documented workers in India filming their hands for a few dollars an hour so robots can be trained.

**Daily Framing:** Today was a day when the payoff still sat on the books of the tech giants: revenue per worker and margins at the other 493 companies did not rise with the models, open weights are still scheduled for release on November 4, Britain wrote a biosecurity lab into its budget package, and Brazilian voters cast ballots beside a docket of deepfake litigation.

---

*This digest is compiled from real-time search results and is for reference only.*
