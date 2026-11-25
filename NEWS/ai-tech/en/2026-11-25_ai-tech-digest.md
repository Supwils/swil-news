# Nov 25, 2026 · AI & Tech Daily Digest

> AI and tech highlights compiled for November 25, 2026, with summaries, links, and brief commentary.

---

## I. Policy, Regulation & Safety Debates

### 1. Democrats push for immediate AI limits—or a pause—after lab safety alarms (Policy / US)

**Summary:** Axios reported on November 25 that after its story on OpenAI and Anthropic staff fearing unreleased models are too powerful to ship safely, Democratic senators including Mark Kelly, Brian Schatz, Chris Van Hollen, and Bernie Sanders publicly urged Congress to act now. Kelly called for nuclear-style safeguards and independent examiners; Sanders went further, demanding a halt to advanced AI development. The piece says the political fight is shifting from economic disruption toward whether humans can still control these systems.

**Links:**

- [Axios — Democrats demand AI restrictions, sound alarm on safety after Axios reporting](https://www.axios.com/2026/11/25/democrats-ai-safety-restrictions-openai-anthropic-axios)

**Commentary:** Once Congress picks up an internal safety scare, “slow the release” stops being a lab talking point and becomes legislative pressure—compliance cost and campaign messaging rise together.

---

### 2. Anthropic CEO Amodei rejects claims that humans should surrender free will to AI (Safety / Narrative)

**Summary:** TechCrunch reported on November 25 that Anthropic CEO Dario Amodei posted a long rebuttal on X calling suggestions that the company favors “surrendering human free will” to AI “absurd.” He argued AI must be governed through legitimate democratic processes and that efficiency or security must not override self-determination. He distinguished blanket handover from automating specific tasks—driving, designing cancer drugs, end-to-end software—and said recursive self-improvement may need limits, while reiterating it should not be safe for Claude to build successive frontier models fully autonomously without meaningful human supervision.

**Links:**

- [TechCrunch — Anthropic’s Dario Amodei calls accusations of surrendering human control to AI ‘absurd’](https://techcrunch.com/2026/11/25/anthropics-dario-amodei-calls-accusations-of-surrendering-human-control-to-ai-absurd/)

**Commentary:** With Altman and Alexandr Wang also staking claims on human agency, the CEO narrative war has expanded from capability races to who defines a “controllable” future.

---

### 3. US Commerce formally adds Megaspeed-linked firms to the Entity List (Export controls)

**Summary:** A November 25 Federal Register final rule records BIS adding seven Malaysia-, Singapore-, and Thailand-based entities tied to Megaspeed to the Entity List over significant risk of diverting advanced computing commodities to unauthorized end uses or users. Listed parties face a license requirement for all EAR-subject items under a presumption of denial; the rule is effective November 23. The action lands amid the Nvidia / Jensen Huang reinstatement and chip-smuggling controversy.

**Links:**

- [Federal Register — Additions to the Entity List](https://www.federalregister.gov/documents/2026/11/25/2026-23999/additions-to-the-entity-list)
- [The Verge — US Commerce Department adds Megaspeed to trade blacklist as Huang retakes control of Nvidia](https://www.theverge.com/policy/1041270/nvidia-megaspeed-commerce-dept-entity-list)

**Commentary:** The blacklist turns customer-side diversion suspicions into an enforceable licensing wall—compute geopolitics is hardening from scandal into export law.

---

### 4. EU AI Act Scientific Panel’s second meeting follows loss-of-control inquiries (Policy / Europe)

**Summary:** The European Commission’s digital-strategy site said on November 25 that the AI Act Scientific Panel held its second regular meeting in Brussels on November 23—its first in-person session. The panel has already contributed questions to AI Office information requests to OpenAI and Anthropic on recent containment breaches, EU impact, and changes to risk assessment and safety practices. Afternoon talks scoped work on evaluations, cyber risk, harmful manipulation and socio-technical risks, CBRN risks, and loss of control.

**Links:**

- [European Commission — AI Act scientific panel holds second regular meeting](https://digital-strategy.ec.europa.eu/en/news/ai-act-scientific-panel-holds-second-regular-meeting)

**Commentary:** Europe is wiring scientific alerts into the enforcement stack—frontier labs now face formal information requests alongside media exposés.

---

### 5. Australia passes Digital Duty of Care Act covering AI chatbots (Policy)

**Summary:** Euronews / AP reported on November 25 that Australia’s House passed the Digital Duty of Care Act 97–43, requiring Big Tech to proactively reduce harm risks across online services including games, apps, and AI chatbots. Prime Minister Anthony Albanese called it a powerful tool to protect children and society; opposition leader Angus Taylor labeled it a “blank check for political censorship” and vowed repeal if conservatives win in 2028. The law tracks the EU DSA and UK Online Safety Act model.

**Links:**

- [Euronews — Australia follows EU with new online safety law, putting Big Tech at risk of multibillion-dollar fines](https://www.euronews.com/2026/11/25/australia-follows-eu-with-new-online-safety-law-putting-big-tech-at-risk-of-multibillion-d)

**Commentary:** Duty-of-care rules are expanding from content platforms to conversational AI—child and severe-harm risk must be designed into products, not patched after launch.

---

### 6. China says it has led 78 international AI standards; MIIT cites industry scale (Policy / China)

**Summary:** Xinhua and China’s official English portal reported on November 25 that SAMR said China has led development of 78 international AI standards—29 foundational/common (data governance, HCI, security and trustworthiness) and 49 sector applications (smart cities, intelligent manufacturing, and more). MIIT’s Yao Jia said China’s AI core industry scale in H1 2026 is expected to exceed RMB 750 billion with more than 6,600 core firms; next steps include international projects on industrial evaluation, embodied-AI data collection, and multi-agent collaboration.

**Links:**

- [Xinhua — China leads development of 78 international AI standards (Chinese)](https://www.news.cn/liangzi/20261125/81d2450d959748d2bf663a35353d71b6/c.html)
- [Gov.cn — China leads development of 78 international standards on AI](https://english.www.gov.cn/news/202611/25/content_WS6b0643ecc6d00ca5f9a0e96d.html)

**Commentary:** Quantifying “78 standards” turns application know-how into diplomatic leverage—industrial practice is being packaged as exportable rule-making public goods.

---

## II. Platforms, Agents & Scientific Products

### 7. Google: Workspace MCP and CLI generally available; agents must use MCP from 2027 (Product / Platform)

**Summary:** Google Workspace Updates said Workspace MCP servers and an official Workspace CLI are generally available across Gmail, Drive, Docs, Sheets, Slides, Calendar, Chat, and Tasks. AI agents must access Workspace data via MCP rather than calling REST APIs directly, with technical enforcement beginning February 1, 2027. APIs, MCP, and the CLI move to Standard (free published quotas) and Scaled (usage above daily free allowances billed from April 1, 2027) tiers, backed by a Workspace AI Tools Addendum plus admin audit and DLP controls.

**Links:**

- [Google Workspace Updates — MCP servers, CLI, standardized usage tiers now available](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN)

**Commentary:** Agent access is being rehomed from “hit any REST endpoint” to a managed protocol-plus-quota product—tightening enterprise data boundaries and cloud lock-in at once.

---

### 8. Anthropic: MCP servers can ship Skills; Claude Ship reviews, fixes, and policy-approves PRs (Product)

**Summary:** Anthropic put Skills over MCP into public beta in Claude and Claude Code so servers can publish reusable workflow skills alongside tools; Tasks and Elicitation are generally available for long-running work and mid-call user confirmation. Separately, Claude Ship (Team/Enterprise on GitHub) combines Code Review, PR Steward, and Claude Approvals so agents can review, repair, and approve PRs under team-written policy. VentureBeat noted on November 25 that approving an MCP connection now also means approving the skill packs that server can push.

**Links:**

- [Anthropic — MCP servers can now ship skills, run tasks, and more with Claude](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)
- [Anthropic — Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship)

**Commentary:** The next agent battleground is not more tool names but who owns versioned playbooks—and how much latent capability one connection approval actually grants.

---

### 9. DeepMind ships Mass Spec Skills for Antigravity; ~97% ID accuracy on library molecules (Research)

**Summary:** Google DeepMind announced on November 25 Mass Spec Skills for Google Antigravity, pairing Gemini’s chemical reasoning with established mass-spectrometry and chemistry tools (matchms, SIRIUS, MetFrag, PubChem, and others) to interpret tandem spectra and lay out evidence for chemist review. On a ~100-compound reference-library benchmark, models reached about 97% exact identification with the skills enabled, versus under 4% without tools. DeepMind is also offering eligible researchers six months of Antigravity’s highest usage tier free, subject to capacity.

**Links:**

- [Google DeepMind — Identifying Molecules with Mass Spec Skills for Antigravity](https://deepmind.google/blog/interpreting-mass-spectra-with-google-antigravity/)

**Commentary:** “General model + domain skill pack” is becoming the science-agent default—the win is running an expert workflow end to end with an audit trail, not chatty chemistry.

---

### 10. OpenAI merges Chat and Work usage; heaviest Pro users may hit limits sooner (Product)

**Summary:** TechCrunch reported on November 25 that OpenAI has begun rolling out a unified Chat and Work experience to some Pro users. A spokesperson said Chat and Work will share one usage meter while Instant remains unlimited and outside the allowance; most users may not see more frequent resets, but a small fraction of the heaviest users may hit limits sooner. Broader shared-limit rollout is planned for December, amid subscriber concerns that advanced reasoning access could shrink at the same subscription price.

**Links:**

- [TechCrunch — OpenAI says heavy ChatGPT users may hit limits sooner as it merges Chat and Work](https://techcrunch.com/2026/11/25/openai-says-heavy-chatgpt-users-may-hit-limits-sooner-as-it-merges-chat-and-work/)

**Commentary:** Product unification often starts with the meter—one subscription is also a rebalancing of compute supply against heavy-user subsidies.

---

## III. China Industry & Open Models

### 11. Tencent open-sources Hunyuan translation model Hy-MT3: 102 languages, fewer errors (Product / Open source)

**Summary:** Tencent Hunyuan released and open-sourced third-generation translation models Hy-MT3 (1.8B / 7B / 30B-A3B) on November 24, with wide Chinese-media follow-up on November 25. Versus Hy-MT2, it reports 43% fewer mistranslation samples, 74% fewer omissions/additions, and 40% fewer instruction-following errors on real-world data, expanding language coverage from 38 to 102. It is tuned for game localization and image/OCR translation, with TransRubric and an Honor of Kings–linked game translation toolchain also opened; weights are on Hugging Face and ModelScope.

**Links:**

- [GitHub — Tencent-Hunyuan/Hy-MT3](https://github.com/Tencent-Hunyuan/Hy-MT3)
- [IT Home — Tencent launches Hunyuan translation model HyMT3](https://www.ithome.com/1/031/681.htm)

**Commentary:** Vertical constraints—placeholders, rich text, terminology—prove industrial value faster than another generic leaderboard flex.

---

### 12. Galbot ships embodied foundation model G0.7 with up to 5-minute context (Embodied)

**Summary:** Sina Tech reported on November 25 that Galbot (星海图) released embodied foundation model G0.7, extending context from single-frame observation to as much as five minutes of history for occlusion tracking and in-context learning from human demonstration videos. On real-robot “find the hidden cup” and “sort by demonstration” tasks, in-distribution success reached 93.3%; after mid-training for in-context learning, average in-/out-of-distribution success rose to about 96.7% / 93.3%. Deployment stays on the Fast-WAM path: ~60 ms per action chunk on one RTX 5090 (FP8), with native RTC chunking to cut pauses.

**Links:**

- [Sina Tech — Galbot releases G0.7 embodied foundation model](https://finance.sina.com.cn/jjxw/2026-11-25/doc-inizxxyi4208663.shtml)

**Commentary:** Embodied rivalry is shifting from single-skill hit rates to long memory plus demo-to-deploy flexibility—factory softness needs context windows as much as chatbots do.

---

### 13. Huawei Cloud launches Agent Partner Open Plan around AgentArts (Ecosystem / China)

**Summary:** Xinhua reported on November 25 that Huawei Cloud, at its November 24 Hangzhou Zhiguo ecosystem event, launched an Agent Partner Open Plan with 30+ first-wave partners including Chinasoft, iSoftStone, and Deloitte, opening the full AgentArts stack for agent development, runtime, and governance (long-horizon tasks, sandboxes, observability, permissions). Huawei said the platform already serves 1,000+ enterprises, 110,000+ developers, and 6,000+ agent assets, and is also opening OfficeAce and CodeArts with training, certification, and Marketplace incentives across quick-integration and deep-custom modes.

**Links:**

- [Xinhua — Huawei Cloud launches agent partner open plan](https://www.news.cn/tech/20261125/112a695f4b5d4cfc9776066245956886/c.html)

**Commentary:** Cloud vendors are fighting for the agent-era “OS seat”—open the base, let partners own scenario entrances, and lock in compute and token spend.

---

## IV. Funding & AI Infrastructure

### 14. Avicena raises $100M+ Series C to commercialize microLED optical interconnects (Funding / Infra)

**Summary:** Sunnyvale-based Avicena announced on November 24 a Series C of more than $100 million led by InterVest, with Tiger Global, SK hynix Ventures, Samsung Catalyst Fund, AMD Ventures, and others participating, to commercialize its laser-free LightBundle microLED optical-interconnect platform for AI infrastructure. Kevin Pope becomes CEO with a first commercial product targeted for next year; 1 Tbps evaluation kits began shipping in August. The “wide-and-slow” multicore-fiber design aims to ease accelerator–memory–switch bottlenecks where copper density and power hit limits.

**Links:**

- [Avicena — Raises $100 Million Series C for microLED Optical Interconnects](https://avicena.tech/avicena-raises-100-million-series-c-to-accelerate-commercialization-of-microled-optical-interconnects-for-ai-infrastructure/)

**Commentary:** When copper and laser optics both hit density and power walls, capital cuts toward package-level optical links—the infra bottleneck is shifting from “do we have GPUs?” to “how do GPUs talk?”

---

## Today's Summary

- US, EU, and Australian regulators pressed on the same day: Congress follows lab safety leaks, the AI Act scientific panel tracks loss-of-control inquiries, and Australia writes chatbots into duty-of-care law.
- Agent access rules hardened: Google requires Workspace via MCP; Anthropic lets MCP servers ship Skills and authorizes agents to approve code.
- Science tools and vertical open models advanced in parallel: DeepMind’s mass-spec skill pack, Tencent Hy-MT3, and Galbot G0.7 hit chemistry workflows, translation industry, and embodied long context.
- Compute geopolitics and optical interconnect funding underline hard constraints: Megaspeed hits the Entity List while Avicena’s $100M+ C round bets on how AI clusters connect.

**Daily Framing:** Today was a day when regulatory questioning and agent-access rules landed together—whoever can safely plug into enterprise data and code repos holds the next product ticket.

---

*This digest is compiled from real-time search results and is for reference only.*
