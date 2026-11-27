# Nov 27, 2026 · AI & Tech Daily Digest

> AI and tech highlights compiled for November 27, 2026, with summaries, links, and brief commentary.

---

## I. Litigation, Defense & Regulation

### 1. OpenAI countersues Apple over alleged hardware trade-secret theft and supplier pressure (Litigation / Hardware)

**Summary:** Reuters reported on November 27 that OpenAI filed counterclaims against Apple in California federal court, alleging Apple gained confidential information on unreleased device designs and OpenAI’s hardware roadmap by re-hiring a former employee who spent about six months at OpenAI, and that Apple’s employment practices are designed to “trap” workers and keep them from joining rivals. The filing also says Apple pressured shared suppliers in ways that hinder OpenAI’s AI-enabled consumer hardware. Apple sued OpenAI and former employees Tang Tan and Chang Liu in July 2026 over alleged trade-secret misappropriation tied to talent poaching; OpenAI says roughly 400 Apple alumni have joined it. Neither company immediately commented to Reuters.

**Links:**

- [Reuters — OpenAI countersues Apple for stealing trade secrets](https://www.reuters.com/5f374b32b07b/technology/openai-countersues-apple-stealing-trade-secrets-ft-reports-2026-11-27/)
- [CourtListener — OpenAI counterclaims filing (N.D. Cal.)](https://storage.courtlistener.com/recap/gov.uscourts.cand.474095/gov.uscourts.cand.474095.217.0_1.pdf)

**Commentary:** The AI hardware race has moved from keynotes to courtrooms and supplier lines—talent mobility and supply-chain loyalty are becoming the real bottlenecks for next-gen devices.

---

### 2. Poland signs ~$300 million five-year Palantir deal for AI command software (Defense / Europe)

**Summary:** Reuters reported from Warsaw on November 27 that Poland’s defence minister Władysław Kosiniak-Kamysz announced a roughly $300 million, five-year agreement with Palantir Technologies for AI software that supports decision-making by army commanders. He called it a watershed for the Polish Armed Forces’ operational capabilities and said all keys, servers, and information will remain the exclusive property of the Polish military. Cooperation began with a 2025 memorandum covering AI, IT, and cybersecurity. European policymakers have previously worried about over-reliance on U.S. defence technology that could be cut off.

**Links:**

- [Reuters — Poland signs contract with Palantir worth $300 mln over 5 years](https://www.reuters.com/5f374b32b07b/technology/poland-signs-contract-with-palantir-worth-300-mln-over-5-years-2026-11-27/)

**Commentary:** Sovereignty talk and dollar contracts can coexist—Europe wants U.S. AI with the keys kept at home, not a pure domestic-substitute storyline.

---

### 3. Canada adds C$700 million, lifting AI Compute Access Fund to C$1 billion (Policy / Sovereign compute)

**Summary:** Innovation, Science and Economic Development Canada announced in Toronto on November 26 a C$700 million top-up to the AI Compute Access Fund under the national “AI for All” strategy, taking the fund from an initial C$300 million under the Sovereign AI Compute Strategy to C$1 billion to help Canadian SMEs offset training and inference costs. The next phase raises incentives for sovereign cloud compute—covering up to 80% of eligible costs for sovereign providers and up to 50% for Canadian-based clouds—with eligible compute spends generally between C$100,000 and C$5 million. The first targeted call focuses on health and life sciences (statements of interest due December 17, 2026; applications due January 4, 2027). The same announcement highlighted more than C$52 million for 45 additional firms, bringing commitments above C$118 million across 89 companies.

**Links:**

- [Canada.ca — $700 million expansion of the AI Compute Access Fund](https://www.canada.ca/en/innovation-science-economic-development/news/2026/11/government-of-canada-boosts-the-ai-compute-access-fund-with-700-million-expansion.html)
- [ISED — AI Compute Access Fund program guide](https://www.ised-isde.canada.ca/site/ised/en/canadian-sovereign-ai-compute-strategy/ai-compute-access-fund/program-guide-ai-compute-access-fund)

**Commentary:** Subsidies are being used to lock demand into domestic clouds—in the sovereign-compute race, making GPUs affordable for SMEs now matters as much as building new megawatts.

---

### 4. Microsoft: state-linked and criminal actors fold ARTEX agentic pentest framework into attack chains (Security)

**Summary:** A Microsoft Security blog post (published around November 25 and still circulating into the weekend) says the open-source AI autonomous penetration-testing framework ARTEX, released in July 2026, has been adopted by state-sponsored and financially motivated actors including Storm-0940, Storm-3358, Onyx Sleet, Pearl Sleet, Crystal Typhoon, and Salt Typhoon for reconnaissance, credential attacks, and web exploitation. ARTEX coordinates multiple LLM agents that set verifiable goals, plan intents, and drive existing pentest tools; Microsoft says some configurations can move from recon to persistent privileged access in minutes, with Storm-0940 activity previously showing privileged cloud access in under three hours. Microsoft stresses ARTEX does not invent new techniques—the durable signal is machine-speed behavioral patterns—and recommends defensive deception that returns convincing fake successes to short-circuit agent goal loops.

**Links:**

- [Microsoft Security — What defenders need to know about ARTEX](https://www.microsoft.com/en-us/security/blog/2026/11/25/what-defenders-need-to-know-artex-agentic-ai-framework-threat-actors-abuse/)
- [The Record — Microsoft: China’s Salt Typhoon hackers are using Artex](https://therecord.media/microsoft-china-salt-typhoon-using-artex-ai-tool)

**Commentary:** Attackers and defenders are converging on the same agent-orchestration pattern—if detection still leans on static signatures, the window closes in minutes, not days.

---

## II. Agent Platforms & Model Products

### 5. Google: Workspace agents must use MCP/CLI; Gmail exposes send tools with elicitation (Product / Standards)

**Summary:** Google Workspace Updates says Workspace MCP servers and the Workspace CLI are generally available for AI agents; technical enforcement begins February 1, 2027, requiring agents that access Workspace data to use MCP or the CLI rather than calling REST APIs directly, alongside a Workspace AI Tools Addendum. Usage splits into a free Standard tier and a Scaled tier with billing from April 1, 2027 above allowances. Gmail MCP developer docs now list write actions including `send_message`, `reply`, and `forward`, available only on the primary endpoint `https://gmailmcp.googleapis.com/mcp/v1` that requires MCP form elicitation so users confirm before mail is sent; the `/mcp/v1self` fallback for hosts without elicitation omits those sensitive tools.

**Links:**

- [Google Workspace Updates — MCP servers, CLI, usage tiers](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html)
- [Google Developers — Configure the Gmail MCP server](https://developers.google.com/workspace/gmail/api/guides/configure-mcp-server)

**Commentary:** MCP is shifting from connector protocol to office-suite gate—whoever owns confirmation prompts and quotas owns what an agent is allowed to send.

---

### 6. Anthropic: MCP servers can ship Skills; Claude Ship beta encodes PR approval policy (Product / Developers)

**Summary:** Anthropic said Skills over MCP is in public beta in Claude and Claude Code, letting MCP servers publish multi-step `SKILL.md`-style playbooks alongside tools (with examples from Shopify, HubSpot, and Atlassian); it is on by default for Pro, Max, and Ultra, and available to Team when an admin enables it. Tasks (long-running background work) and Elicitation (mid-call user confirmation) are generally available on those consumer plans and rolling out to Team/Enterprise. Related product work introduces Claude Ship for Team and Enterprise on GitHub: Code Review is generally available; PR Steward fixes failing checks but is designed not to approve merges; Claude Approvals can approve routine changes per a repo policy file. Anthropic says its own Claude Code team more than doubled merged PRs from June to September while the share reverted fell by more than 40%.

**Links:**

- [Anthropic — MCP servers can now ship skills, run tasks, and more](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)
- [Anthropic — Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship)

**Commentary:** Beyond tool catalogs, servers now ship “how to do the job,” and approvals become code—MCP is turning into a new distribution layer for enterprise software.

---

### 7. OpenAI fixes GPT-6.2 billing bug; Astra/Sol allowances deplete much faster (Product / Business)

**Summary:** OpenAI Codex lead Thibault Sottiaux said on November 26 that a launch billing mistake incorrectly discounted GPT-6.2 Astra and Sol usage for most users; with the fix live, the same work will hit plan limits faster than last week—about 40% faster on Astra and 25% faster on Sol. OpenAI will not retroactively charge for the undercount, says other models are unaffected, and is adding one banked usage reset for Go, Plus, Pro, and Business subscribers. GPT-6.2 launched November 17; the company still says post-fix efficiency should beat prior GPT-6 Astra and GPT-6.1 Sol.

**Links:**

- [BleepingComputer — OpenAI warns GPT-6.2 Astra will hit usage limits 40% faster](https://www.bleepingcomputer.com/news/artificial-intelligence/openai-warns-gpt-62-astra-will-hit-usage-limits-40-percent-faster-because-it-fixed-a-bug/)
- [Business Insider — OpenAI billing error means new AI model users will hit limits faster](https://www.businessinsider.com/openai-token-billing-cost-discount-mistake-sol-astra-2026-11)

**Commentary:** When a “more efficient tokens” pitch is inflated by a billing bug, the correction itself becomes a trust stress test for the product.

---

### 8. Tencent Hunyuan open-sources DFly2 draft model: up to ~4.2× long-context/agent speedups (Open source / Inference)

**Summary:** Tencent Hunyuan on November 26 open-sourced DFly2, a speculative-decoding draft model for DSA-style sparse-attention LLMs, releasing weights for Hy4 flash, DeepSeek-V4.1-Flash, and GLM-5.3-Flash plus AngelSpec training code. DFly2 shares the target’s sparse KV cache and up to about 2,048 indexer-selected positions, claiming zero extra KV memory, attention cost that does not grow linearly with context, and friendliness to prefill–decode disaggregation. The team says it beats same-recipe DFlash/DSpark across 19 public suites, with Hy4 flash reaching about 4.2× speedup on AgentLongBench-class tasks and larger margins on long-context and agentic workloads.

**Links:**

- [IT Home — Tencent Hunyuan open-sources next-gen draft model DFly2](https://www.ithome.com/1/032/929.htm)
- [GitHub — Tencent/AngelSpec](https://github.com/Tencent/AngelSpec)

**Commentary:** In the sparse-attention era, accelerators must borrow the target’s own position picks—open-source competition is shifting from parameter counts to deployable throughput.

---

## III. China Applications, Manufacturing & Space Compute

### 9. China unveils SUICE V0.1 Earth foundation-model engine plus on-orbit space data-center testbed (China / Remote sensing)

**Summary:** Xinhua reported on November 27 that at a Beijing conference on space data-center construction, researchers released SUICE V0.1—an Earth foundation-model engine that plugs into general LLMs—alongside an on-orbit technical test platform for a space data center. SUICE uses a bypass/modular expert design to inject remote-sensing skills such as segmentation, object recognition, and change analysis so users can query satellite imagery in natural language; developers say it leads peer methods on more than ten task types across multiple remote-sensing benchmarks. The orbital platform, built around the Chenguang-1 01 satellite, validates a 270-volt high-voltage bus, about 25,000 TOPS of radiation-hardened domestic compute, and graphene flexible cooling, and has completed on-orbit inference for multiple large models to support “compute in space, decide in space.”

**Links:**

- [Xinhua — China releases SUICE V0.1 Earth foundation-model engine](https://www.news.cn/tech/20261127/3bf5b749829a488b941255e83b38132d/c.html)

**Commentary:** Remote sensing is moving from task-specific pipelines into conversational interfaces—space-compute narratives now have a demoable product shape, not just launch manifests.

---

### 10. “AI + Manufacturing” drive: 1,000+ scenarios across 20 industries; 100 industrial datasets by 2027 (China / Industry)

**Summary:** China’s Cyberspace Administration site carried a CCTV.com report on November 27 saying the national “AI + Manufacturing” special action launched this year has already pushed AI through R&D, production, quality inspection, and operations. One steel-mill example uses an AI billet weighing-and-cutting system trained on five years of production records and about 2,000 expert rules, holding cutting error within 0.2% and reportedly generating more than RMB 2 billion in cumulative economic benefit. Officials say more than 1,000 application scenarios and 100-plus industrial agents have been built across 20 industries including steel, autos, and pharma; more than 30 national AI application pilot bases are online, with a home-appliance base recently started. The goal is 100 high-quality industrial datasets by 2027 and coverage via industry-specific large models.

**Links:**

- [CAC / CCTV — China accelerates “AI + Manufacturing” special action](https://www.cac.gov.cn/2026-11/27/c_1797537974348256.htm)

**Commentary:** The policy story has shifted from “do we have a model?” to “how much scrap and fuel did the line save?”—industrial agents will decide next year’s budgets more than leaderboards.

---

### 11. CAICT publishes XingSuan results: Libra satellite completes full-parameter Qwen3-32B on-orbit training (China / Space compute)

**Summary:** The Paper reported that China’s CAICT released the first on-orbit test data for Guoxing Aerospace’s XingSuan (“Star Compute”) Plan group-02 satellites: the Libra satellite completed full-parameter on-orbit training and inference of Alibaba’s Qwen3-32B, with a single-orbit continuous training run of 45 minutes 33 seconds, gradients and weight updates computed in orbit, and training loss steadily falling; Guoxing (06935.HK) also disclosed the progress on the evening of November 25. The eight group-02 satellites launched from Jiuquan on October 14; after orbit insertion XingSuan’s total compute is about 50 POPS, described as the world’s largest on-orbit compute constellation to date, with Libra’s FP8 nameplate at 32 PFLOPS. Kilowatt-class liquid cooling and deployable radiative wings are operating normally and can support roughly 10 kW compute payloads.

**Links:**

- [The Paper — CAICT publishes first XingSuan on-orbit test data](https://www.thepaper.cn/newsDetail_forward_34566081)

**Commentary:** From “inference in orbit” to “full-parameter training in orbit”—space compute is starting to post audit-able engineering minutes, not just brochure FLOPS.

---

## IV. Funding & Regional Innovation

### 12. Warsaw physical-AI startup Lute raises about $20 million for touch-plus-vision robot models (Funding / Europe)

**Summary:** CEE coverage around November 27 said Lute, a physical-AI company with offices in Warsaw and San Mateo, raised about $20 million (€17.2 million) across pre-seed and seed: OTB Ventures and FORWARD.one co-led the seed, Credo Ventures and Seedcamp led the pre-seed, with Inovo VC, Borusan Ventures, ff Venture Capital, and Naval Ravikant among participants. Founded in January 2026, Lute builds foundation models that combine tactile sensing with vision for robots and says its models were already running at Europe’s largest automotive-parts distributor about ten months after founding. Proceeds will fund data collection, training, customer deployments, and hiring in both cities.

**Links:**

- [The Recursive — CEE Tech Weekly: Lute Raises €17.2M](https://www.therecursive.com/cee-startup-tech-weekly-lutes-eur17-2m-round-elevens-fund-iv-new-defense-deals/)
- [AI News Hub — Warsaw startup Lute raises $20M for robot AI that learns from touch](https://aienews.org/digest/2026-11-27/)

**Commentary:** Europe’s robotics funding story is adding touch on top of multimodal vision—factory deployments beat lab demos when the next check is written.

---

## Today's Summary

- OpenAI’s trade-secret fight with Apple escalated into a formal countersuit, opening a twin front on talent and supply chains in the AI consumer-hardware race.
- Poland committed about $300 million to Palantir AI command software, while Canada expanded its compute-subsidy fund to C$1 billion—sovereignty narratives again backed by cash for controllable tools and GPUs.
- Google and Anthropic are pushing MCP into forced gates for office and software production (confirm-before-send, shippable Skills/approvals), even as OpenAI’s billing fix makes users hit Astra/Sol limits faster.
- On the China side, the SUICE remote-sensing engine, industrial “AI + Manufacturing” scale-up, and XingSuan’s full-parameter on-orbit training landed together—application rollout and space compute in parallel.

**Daily Framing:** A day when courtrooms, defence contracts, and agent gatekeeping shared the stage—giants sparred over hardware talent, states bought sovereign compute with subsidies and procurement, and MCP began encoding what agents are allowed to do as enforceable product rules.

---

*This digest is compiled from real-time search results and is for reference only.*
