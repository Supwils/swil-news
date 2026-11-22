# Nov 22, 2026 · AI & Tech Daily Digest

> AI and tech highlights compiled for November 22, 2026, with summaries, links, and brief commentary.

---

## I. Security, Privacy & Infrastructure Risk

### 1. OpenRouter offboards three inference providers; 125 endpoints lose zero-data-retention eligibility (Security)

**Summary:** On November 22 OpenRouter said that after security researchers reported data compromise or failures to uphold data policies at certain inference providers, it offboarded three providers and removed 125 endpoints from Zero Data Retention (ZDR) eligibility, including flagged endpoints plus precautionary removals. The company said its own systems were not breached, that potentially affected customers were notified, and that it will adapt the researchers’ tests for ongoing checks, verify network paths for third-party forwarding, and require validation before restoring ZDR. Its post lists public notices from Atlas Cloud, Novita, Phala, and Together, without confirming whether those firms are among the three removed.

**Links:**

- [OpenRouter — Data Processing Incidents on Inference Providers](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/)
- [The Hacker News — OpenRouter Drops 3 Providers After Researchers Catch Months of Prompt Theft](https://thehackernews.com/2026/11/openrouter-drops-3-providers-after.html)

**Commentary:** Multi-provider routing turns “zero retention” from a checkbox into a supply-chain problem—who actually handled the request matters more than which privacy toggle the UI offered.

---

### 2. Together AI: coding agent leaked a credential; serverless prompt samples were downloaded (Security)

**Summary:** Together AI CEO Vipul Ved Prakash disclosed on November 21 that prompt samples from MiniMax M3, GLM-5.2, and Kimi K2.6 requests—stored for routine testing in a private Hugging Face repo—were downloaded after an AI coding agent committed a credential while developing the public xorl GitHub repository. Automated scanning detected and reverted the commit, but an unauthorized party used the credential during the exposure window and tested other secrets found in the samples; five were canaries from a Dragos experiment. Together said it is working with forensics and law enforcement, made ZDR the default for new accounts, and tightened rules for AI coding agents.

**Links:**

- [Together AI — Security event: Prompt leakage for requests in June and July of 2026](https://www.together.ai/blog/security-event-prompt-leakage-for-requests-in-june-and-july-of-2026)
- [Fox News Live — AI coding agent accidentally exposed user prompts in Together AI security breach](https://www.foxnews.com/live-news/ai-news-markets-correction-11-22-26)

**Commentary:** Once agents write production code, one committed secret can turn test samples into a real customer-data incident—governance that lags agent speed becomes the default attack surface.

---

### 3. Microsoft’s Brad Smith frames recent outages as “AI ripple effects” (Infrastructure)

**Summary:** On the November 22 CBS *Face the Nation* interview, Microsoft vice chair and president Brad Smith said Microsoft’s roughly 24-hour global outage was not caused by AI or a cyberattack but by an older software update interacting with a newer patch and network-traffic shifts. Industry-wide, he described many recent tech disruptions as “AI ripple effects”: AI made finding code vulnerabilities far easier, launching a race to patch before attackers exploit the same findings, and rapid changes on aging infrastructure raise failure risk when testing time is squeezed. He warned the world’s information infrastructure is effectively being upgraded over coming months and urged individuals to apply patches and organizations to update patching practices and legacy systems.

**Links:**

- [CBS News — Transcript: Brad Smith on Face the Nation, Nov. 22, 2026](https://www.cbsnews.com/news/transcript-brad-smith-microsoft-on-face-the-nation-with-margaret-brennan-nov-22-2026/)
- [Fox News Live — Tech sell-off hits Nvidia, Anthropic and Nasdaq](https://www.foxnews.com/live-news/ai-news-markets-correction-11-22-26)

**Commentary:** AI accelerates the find-and-fix race faster than legacy stacks can absorb—stability risk is shifting from classic hacks toward mass patching accidents.

---

### 4. Signal defaults to blocking OS-level AI assistants from reading chat screens (Privacy)

**Summary:** Signal president Meredith Whittaker’s November 20 post continued to circulate over the weekend: to stop OS agents such as Siri AI on iOS 27 and Gemini on Android from scanning on-screen content, Signal enables “Block Siri AI” by default on iOS (8.37+ / iOS 27+) and auto-turns on screen security on Android (8.35.1+) when an assistant tries to read the Signal screen. The controls block in-app screenshots/recordings and recent-app previews. Signal said developers lack robust APIs to restrict agent access without harsh UX trade-offs, that screenshot blocking does not cover filesystem side channels, and that Apple and Google should provide stronger app-level protections.

**Links:**

- [Signal Blog — Signal is Serious About Protecting Your Privacy](https://signal.org/blog/protecting-your-privacy/)
- [The Verge — Signal is blocking Gemini and Siri AI from reading your screen](https://www.theverge.com/ai-artificial-intelligence/1038390/signal-blocking-ai-agent-screenshots-mobile-app)

**Commentary:** End-to-end encryption cannot save messages once an OS agent can read the screen—the next privacy fight is over agents’ default access rights.

---

## II. Research Transparency, Formal Verification & Frontier Capability

### 5. OpenAI’s chief scientist publishes perplexity curves and urges them as an industry pacing anchor (Research)

**Summary:** On November 22 OpenAI chief scientist Jakub Pachocki published “Perplexity and Intelligence,” arguing that perplexity (or cross-entropy loss) should become a shared metric for comparing labs and informing joint safety standards, and disclosing internal held-out perplexity progress: roughly 0.99 log-perplexity for GPT-3.5, ~0.91 for GPT-4, and sub-0.8 losses coinciding with transformative gains in areas such as cybersecurity and mathematics. He expects further unknown capabilities near a ~0.68–0.7 window, warns that dominant alignment audits may keep degrading, and proposes common limits keyed to perplexity and related measures that labs would not cross until concrete monitoring milestones are met.

**Links:**

- [OpenAI — Perplexity and Intelligence](https://openai.com/index/perplexity-and-intelligence/)

**Commentary:** Elevating “how well we compress” into a negotiable pacing ruler is an attempt to put a shared brake on sudden capability jumps.

---

### 6. Lean/Mathlib communities say they have full confidence in the Claude-assisted formal Riemann proof (Science)

**Summary:** In a November 21 joint statement endorsed by the Lean FRO and Mathlib Initiative, the Lean and Mathlib communities said they have full confidence that Anthropic mathematician Levent Alpöge’s ~17-million-line Lean library—released November 20 and depending only on Mathlib—correctly proves Mathlib’s RiemannHypothesis statement (with related Dirichlet L-function claims also in the package). Dozens reproduced the build; two independent tools confirmed statement match; Lean’s kernel and checkers including `con-leche` and `con-ron` accepted the export, with the latter pair carrying formal arguments they cannot accept a false proof. A human mathematical explanation is still missing, and Clay has not reclassified the problem; MIT’s verification page was still updating long-running checks on November 22.

**Links:**

- [Lean community blog — Lean verification of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)
- [MIT — RH Lean proof: verification files](https://math.mit.edu/~drew/grh/)

**Commentary:** Machine-checked correctness and mathematical community acceptance remain separate gates—AI-assisted proof pushes formal tools forward, but explanation still belongs to humans.

---

## III. Policy, Social Backlash & Regional Buildout

### 7. China launches national standards work on embodied-AI data; 20+ standards planned in the 15th Five-Year Plan (Policy)

**Summary:** China’s National Data Administration said on November 22 that development of national standards for embodied-intelligence data has formally begun. During the 15th Five-Year Plan period it expects to issue more than 20 specialized national standards and run pilot validation in parallel, aiming to support humanoid robots, special-operations robots, industrial collaborative arms, and related scenes. CCTV and the NDA site carried the same day. The move follows recent MIIT humanoid-robot standards on capability grading, dexterous hands, training fields, and training-data management.

**Links:**

- [National Data Administration — Embodied-intelligence data national standards work launched](https://www.nda.gov.cn/sjj/swdt/mtsy/1122/20261122201646034268538_pc.html)
- [CCTV — Domestic news brief, Nov. 22, 2026](https://tv.cctv.cn/2026/11/22/VIDENDzC7p2vikXf9ZxmYvhA261122.shtml)

**Commentary:** Embodied AI’s bottleneck is shifting from motion demos to whether data can interoperate, be evaluated, and be governed—standards often come before scale.

---

### 8. Data centers sit at the center of the Big Tech political backlash (Society / Infrastructure)

**Summary:** TechCrunch’s November 22 interview with Paris Marx on the book *Hyperscale* argues data-center buildouts have become a post-midterm focal point for U.S. tech backlash: power bills, water, noise, and local quality-of-life impacts cut across parties. Cases from Ireland’s grid load, Chilean water stress, and Google’s water use in The Dalles, Oregon, show tensions that predated the generative-AI boom. Marx said Microsoft, Amazon, and OpenAI pledges to drop NDAs with local governments and to fund more grid infrastructure may improve transparency without much reducing opposition. Weekend market wrap-ups also noted Nvidia’s sharp weekly drop and Anthropic’s post-IPO pressure as finance and local politics stress-test the buildout narrative together.

**Links:**

- [TechCrunch — Why data centers are at the center of the Big Tech backlash](https://techcrunch.com/2026/11/22/why-data-centers-are-at-the-center-of-the-big-tech-backlash/)
- [Reuters via Investing.com — Nasdaq plunges 5% a day after Anthropic debut](https://www.investing.com/news/stock-market-news/nasdaq-plunges-5-a-day-after-anthropic-debut-but-investors-still-believe-in-ai-5042641)

**Commentary:** When the AI story becomes the substation and water meter next door, ballots rewrite capex faster than leaderboards do.

---

### 9. South Korea’s President Lee: speed is decisive in the AI race as he tours the Ulsan data center (Regional)

**Summary:** Reports on November 22 said South Korean President Lee Jae Myung on Saturday toured the SK Group–AWS data-center site in Ulsan, saying the world is competing and “speed is vital,” and hoping the project draws more global AI investment. Korea’s science ministry previously put investment at about 7 trillion won (~$5.2 billion) through 2029, with operations slated for the second half of 2027; SK has cited an initial ~103 MW by 2029 with potential expansion toward ~900 MW. Lee also said AI investment has clustered around Seoul, that Ulsan shows regional growth is possible, and that ministries should address shortages of workers for data-center construction.

**Links:**

- [The Manila Times — South Korea’s Lee says speed is decisive in AI race](https://www.manilatimes.net/2026/11/22/world/asia-oceania/south-koreas-lee-says-speed-is-decisive-in-ai-race/2475521)

**Commentary:** Asia-Pacific governments are turning data centers into AI-statecraft construction sites—competing on land, power, and crews as much as chips.

---

## IV. China Products & Industry Deployment

### 10. Ant Afu health conference: doctor PC workbench launches with UpToDate access (Product)

**Summary:** Ant Group’s 2026 Ant Afu Medical & Health Ecosystem Conference opened in Guangzhou on November 22–23. CEO Han Xinyi stressed AI assists while clinical decisions stay with doctors; health-group VP Yang Meng said Ant Afu has 150 million users and more than 20 million daily online consultations, with 55% of users from tier-3-and-below cities, about one-quarter elderly, and 16% of consultations between midnight and 6 a.m. The same day, the doctor edition launched a PC workbench and integrated Wolters Kluwer’s UpToDate clinical decision support—reported as the first domestic AI platform with that professional feature—while “Medicine” and “AI avatar” assistants connect to the consumer app.

**Links:**

- [Sina Tech — Yang Meng: Ant Afu has 150 million users](https://finance.sina.com.cn/tech/2026-11-22/doc-inizrany5953609.shtml)
- [21st Century Business Herald — Ant Afu serves over 150 million users](https://www.21jingji.com/article/20261122/herald/c4bfae27dd23eec17196b774fd27742c.html)

**Commentary:** Consumer volume is already huge; the next contest is embedding evidence tools into clinician workflow, not stacking more consultation counts.

---

### 11. Infini-AI and Shenzhen AIRS open a joint lab on controllable embodied soft/hard systems (Industry)

**Summary:** On November 22 Infini-AI (Wuwen Xinqiong) and the Shenzhen Institute of Artificial Intelligence and Robotics (AIRS) signed and unveiled a joint laboratory on “autonomous and controllable embodied soft/hard systems and applications” in Shenzhen. The partners will focus on controllable modules and system-level key technologies for embodied robots, targeting AI education, power grids, smart manufacturing, marine operations, and industrial scenes, with emphasis on verifiable, replicable cases in high-risk, high-difficulty, complex environments.

**Links:**

- [Beijing Business Today — Infini-AI and AIRS launch embodied-intelligence lab](https://www.bbtnews.com.cn/2026/1122/611903.shtml)
- [Sina Finance — Infini-AI and AIRS launch embodied-intelligence lab](https://finance.sina.com.cn/jjxw/2026-11-22/doc-inizrhuy2677933.shtml)

**Commentary:** Standards kickoff and lab unveiling on the same day show China’s embodied track moving from expo demos toward reusable engineering alliances across modules, data, and scenes.

---

### 12. AWS Marketplace lets agents buy eligible products per request (Product / Infrastructure)

**Summary:** On November 19 AWS said Marketplace now supports agentic payments via Amazon Bedrock AgentCore payments and the x402 protocol: agents can discover and buy eligible APIs, data, or content mid-task, with USD charges on the buyer’s existing AWS bill and no per-seller signup or crypto wallet. Customers must enable the payment connector and can set spending limits and approved sellers; transactions appear in CloudTrail and Cost Explorer. Sellers get paid through standard Marketplace disbursements. Weekend industry briefings continued to cite the launch as a key piece of the agent commerce loop.

**Links:**

- [AWS — Marketplace now supports agentic payments with AgentCore](https://aws.amazon.com/about-aws/whats-new/2026/11/marketplace-agentic-payments-agentcore/)
- [AWS ML Blog — Enable AI agents to pay for AWS Marketplace x402 products](https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/)

**Commentary:** When agents can pay inside guardrails, tool use becomes a metered economy—billing and audit will gate enterprise adoption sooner than parameter counts.

---

## Today's Summary

- Security: the inference supply chain and coding agents shared the spotlight—OpenRouter’s provider purge, Together’s prompt leak, and Signal’s OS-agent blocks all ask who can see context.
- Research & verification: OpenAI floated perplexity as a pacing metric while Lean communities endorsed a Claude-assisted formal Riemann proof—frontier capability and checkability rose together.
- Policy & the physical world: China launched embodied-AI data standards; U.S. local backlash against data centers and Korea’s push for speed show the race landing on power, water, land, and rules.
- China deployment: Ant Afu deepened doctor workflows; Infini-AI–AIRS targeted high-risk scenes; agent payments and embodied standards both push models toward production.

**Daily Framing:** A Sunday when trust and physical constraints both came into view—prompt/screen/ZDR supply-chain doubts on one side, perplexity pacing, formal proof checks, and data-center/embodied standards pulling the race back onto verifiable, buildable limits on the other.

---

*This digest is compiled from real-time search results and is for reference only.*
