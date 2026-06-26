# Jun 25, 2026 · AI & Tech Daily Digest

> Today's AI / tech highlights for 2026-06-25, with summaries, links, and commentary.

---

## I. Policy & Regulation

### 1. Trump Administration Asks OpenAI to Stagger GPT-5.6 Release with Federal Customer-by-Customer Approval (Policy / US)
**Summary:** Per **Axios**, **POLITICO**, and **The Verge** on **June 25, 2026**, the White House Office of the National Cyber Director (**ONCD**) and Office of Science and Technology Policy (**OSTP**) have asked **OpenAI** to limit the initial rollout of its next model, **GPT-5.6**, to a small set of government-approved partners, with federal authorities approving API access on a customer-by-customer basis during a preview period rather than opening to the public at once. CEO **Sam Altman** disclosed the arrangement at a Wednesday staff Q&A and wrote in a memo that the government would be "approving access customer by customer during this preview period," hoping for a broader release within weeks while stating this is "not our preferred long term model." **Axios** reports this is the first time the U.S. government has preemptively asked an American AI company to restrict a model launch before release; **Altman** also met Commerce Secretary **Howard Lutnick** on Wednesday to align on testing and approval. **SiliconANGLE** reported the same day that **OpenAI** is leaning toward delaying its IPO until **2027** amid recent market turbulence and heavy compute spending.
**Links:**

- [Axios — Trump administration asks OpenAI to limit release of GPT-5.6](https://www.axios.com/2026/06/25/trump-administration-openai-gpt-model-release)
- [POLITICO — Trump administration steps in to limit OpenAI's latest model launch](https://www.politico.com/news/2026/06/25/openai-gpt-model-goverment-approval-00977551)

**Commentary:** "Voluntary review" is becoming a de facto release gate—OpenAI gets a staggered launch while Anthropic faces a global ban, and uneven treatment under the same security logic will only deepen industry anxiety about predictable rules.

---

### 2. Anthropic Accuses Alibaba Qwen of Largest-Known Claude Distillation Campaign (Security / US-China)
**Summary:** Per **Ars Technica** and **NetEase/AI Tech Review** in **June 2026**, **Anthropic** disclosed in a **June 10** letter to Senators **Tim Scott** and **Elizabeth Warren** that between **April 22 and June 5, 2026**, operators linked to **Alibaba** and the **Qwen** lab used nearly **25,000** fraudulent accounts to generate more than **28.8 million** interactions with **Claude**, illicitly extracting high-value capabilities in agentic reasoning, software engineering, and long-horizon tasks. The scale nearly doubles the roughly **16 million** interactions Anthropic attributed in **February** to **DeepSeek**, Moonshot, and **MiniMax**; Anthropic says the campaign occurred after U.S. measures to curb distillation were strengthened. **Alibaba** has not formally responded, and the allegations have not been independently verified; reports say Senators **Bill Hagerty** and **Andy Kim** are pushing amendments to treat such behavior as sanctionable under defense authorization legislation.
**Links:**

- [Ars Technica — Anthropic claims Alibaba defied Trump to attack Claude and steal capabilities](https://arstechnica.com/tech-policy/2026/06/anthropic-claims-alibaba-defied-trump-to-attack-claude-and-steal-capabilities/)
- [NetEase/AI Tech Review — Anthropic targets Alibaba as fourth major Chinese AI lab accused](https://www.163.com/dy/article/L0A41KE50511DPVD.html)

**Commentary:** Distillation disputes have escalated from technical blog posts to congressional letters and sanction proposals—frontier model outputs are assets, and whoever controls API access and detection holds the next layer of geopolitical leverage.

---

### 3. EU Formally Joins U.S.-Led Pax Silica Chip and AI Supply Chain Pact (Policy / Europe)
**Summary:** Per **Reuters** and **The Next Web** on **June 25, 2026**, European Commission spokesperson **Paula Pinho** confirmed Brussels has joined the U.S. State Department–led **Pax Silica** initiative to coordinate AI semiconductor, critical mineral, and advanced manufacturing supply-chain security and export-control alignment with the UK, Japan, India, Australia, Greece, Finland, Sweden, and others. The decision comes roughly two weeks after the EU promoted a tech-sovereignty agenda; **France** had criticized the pact as tantamount to "colonizing Europe," and the **Netherlands** also announced its own accession this week. **Global Times** cited experts warning Europe may face extraterritorial U.S. constraints and be pushed to buy more American technology.
**Links:**

- [Reuters/WHTC — EU joins U.S.-led Pax Silica on securing AI, chip supply chains](https://whtc.com/2026/06/25/eu-joins-u-s-led-pax-silica-on-securing-ai-chip-supply-chains/)
- [The Next Web — The EU signs up to Pax Silica, the US-led chip pact France called colonisation](https://thenextweb.com/news/eu-pax-silica-ai-chips)

**Commentary:** Brussels chose transatlantic supply-chain binding over strategic autonomy—for European chip ambitions and vendors, the rules are now written into the alliance, but market openings may not follow.

---

### 4. European Commission Preliminarily Designates AWS and Azure Under DMA Gatekeeper Rules (Regulation / Europe)
**Summary:** Per **POLITICO** and **The Next Web** on **June 25, 2026**, after a seven-month investigation the European Commission issued a preliminary finding that **Amazon Web Services** and **Microsoft Azure** are an "important gateway" between businesses and EU customers and should be designated gatekeepers under the Digital Markets Act (**DMA**)—including via a qualitative route even where quantitative thresholds may not be met. A final designation would impose obligations against self-preferencing and for interoperability and data portability. **Amazon** argues applying the DMA to cloud would harm European competitiveness; **Microsoft** questioned why **Google Cloud** was not included. The EU cloud market is worth roughly **€220 billion**, and this is the first time gatekeeper rules have targeted the infrastructure layer beneath the AI boom.
**Links:**

- [POLITICO — EU says Amazon, Microsoft cloud services should fall under digital dominance rules](https://www.politico.eu/article/eu-says-amazon-microsoft-cloud-services-should-fall-under-digital-dominance-rules/)
- [The Next Web — Brussels moves to put AWS and Azure under its toughest tech rules](https://thenextweb.com/news/eu-cloud-dma-aws-azurecloud-regulation)

**Commentary:** Regulatory focus is shifting from app stores to the "utilities" of training and inference—cloud vendors' AI bundling and pricing power will be the next battleground.

---

## II. Models, Chips & Products

### 5. OpenAI and Broadcom Unveil First Custom Inference Chip "Jalapeño" (Chips / US)
**Summary:** Per **OpenAI**'s **June 24, 2026** announcement and **Ars Technica**/**CNBC** follow-ups on **June 25**, the companies jointly introduced **Jalapeño**, an LLM inference "Intelligence Processor"—their first **ASIC**, developed from design to tape-out in **nine months**, with parts of the process accelerated by OpenAI's own models. **Broadcom** CEO **Hock Tan** said early tests show inference costs roughly **50%** lower than general-purpose **GPUs**; engineering samples are being tested on workloads including **GPT-5.3-Codex-Spark**, with small data-center deployments planned by **end of 2026** and scaling in **2027–2028**. **Celestica** handles board and rack integration; the platform combines **Tomahawk** networking silicon.
**Links:**

- [OpenAI — OpenAI and Broadcom unveil LLM-optimized inference chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)
- [Ars Technica — OpenAI and Broadcom announce chip designed for LLM inference at scale](https://arstechnica.com/gadgets/2026/06/openai-and-broadcom-announce-chip-designed-for-llm-inference-at-scale/)

**Commentary:** While model releases face government throttling, OpenAI is driving inference costs down with custom silicon—compute independence and regulatory compliance will shape its IPO story in parallel.

---

### 6. Qualcomm to Acquire Modular for ~$3.9 Billion in All-Stock Deal, Challenging NVIDIA's CUDA Moat (M&A / US)
**Summary:** Per **Qualcomm**'s site, **Network World**, and a **Tech Startups** roundup on **June 24–25, 2026**, **Qualcomm** agreed to acquire AI-native software platform **Modular** for approximately **$3.9 billion** (up to **19.2 million** shares), expected to close in the **second half of 2026**. Modular's technology aims to make AI workloads portable across chip architectures without rewriting code for each processor family; Qualcomm says it will build a "silicon-agnostic" compute layer across device, edge, and data center—directly targeting **NVIDIA**'s developer lock-in via **CUDA**.
**Links:**

- [Qualcomm — Qualcomm to Acquire Modular](https://www.qualcomm.com/news/releases/2026/06/qualcomm-to-acquire-modular)
- [Modular — Qualcomm to Acquire Modular](https://www.modular.com/blog/qualcomm-to-acquire-modular)

**Commentary:** AI competition isn't only about wafers—whoever breaks CUDA migration costs can turn a mobile chipmaker into a data-center contender during the inference boom.

---

## III. Funding & the Agent Ecosystem

### 7. General Intuition Raises $320M at $2.3B Valuation to Train Spatial-Reasoning Agents from Gameplay (Funding / US)
**Summary:** Per **TechCrunch** on **June 25, 2026**, **General Intuition**, which trains AI agents' spatial reasoning from competitive gameplay footage, raised **$320 million** at a **$2.3 billion** valuation led by **Khosla Ventures**, with **General Catalyst**, **Jeff Bezos**, **Eric Schmidt**, **Nico Rosberg**, and researchers from **Google DeepMind** and **MIT** participating; total disclosed funding reaches **$454 million** (including a **$134 million** seed round in **October 2025**). The company extracts 3D spatial and tactical data from titles such as **Fortnite** to train agent policies transferable to robotics and the physical world.
**Links:**

- [TechCrunch — General Intuition's $2.3B bet that video games can train AI agents for the real world](https://techcrunch.com/2026/06/25/from-fortnite-to-robots-general-intuitions-2-3b-bet-that-video-games-can-train-ai-agents-for-the-real-world/)

**Commentary:** Game environments are becoming cheap physical-world simulators—the data moat for agent training is shifting from web text to verifiable 3D interaction trajectories.

---

### 8. Ex-Anthropic Researchers' Mirendil Raises $200M Seed at $1B Valuation (Funding / US)
**Summary:** Per **SiliconANGLE** and **Tech Startups** on **June 25, 2026**, **Mirendil**, founded by former **Google**/**Anthropic** researchers **Behnam Neyshabur** and **Harsh Mehta**, raised a **$200 million** seed round at a **$1 billion** valuation led by **Andreessen Horowitz**, with **Kleiner Perkins**, **NVIDIA**, and others participating. The startup offers scientists tools to build and iteratively improve their own AI models, focusing on medicine, materials science, and recursive AI research—reflecting pushback against closed labs that restrict customers from training competing systems.
**Links:**

- [SiliconANGLE — Mirendil raises $200M to speed up scientific research with AI](https://siliconangle.com/2026/06/25/mirendil-raises-200m-speed-scientific-research-ai/)

**Commentary:** A billion-dollar seed valuation signals scarcity in scientific AI—as frontier labs tighten exports, middleware that helps researchers build their own models becomes more valuable.

---

### 9. Patronus AI Raises $50M Series B to Build "Digital Worlds" for Agent Stress-Testing (Funding / US)
**Summary:** Per **TechCrunch** on **June 25, 2026**, **Patronus AI**, founded by former **Meta AI** researchers **Anand Kannappan** and **Rebecca Qian**, closed a **$50 million Series B** led by **Greenfield Partners**, with **Notable Capital**, **Lightspeed**, **Datadog**, **Samsung**, and others; total funding reaches **$70 million**, with revenue up roughly **15x** over the past year. Its "digital world models" replicate websites and internal systems to stress-test agents for hours to weeks without human involvement after reinforcement-learning training, currently covering software engineering and finance.
**Links:**

- [TechCrunch — Patronus AI lands $50M to build 'digital worlds' that stress-test AI agents](https://techcrunch.com/2026/06/25/patronus-ai-lands-50m-to-build-digital-worlds-that-stress-test-ai-agents/)

**Commentary:** Pre-deployment "simulation arenas" for agents are becoming a new category—funding heat in evaluation infrastructure shows the industry is moving from "can run" to "safe to use."

---

### 10. Berlin Fintech Taktile Raises $110M Series C Led by Goldman Sachs for Banking Risk Agents (Funding / EU-US)
**Summary:** Per **The Next Web** and **Fortune** on **June 25, 2026**, **Taktile**, which provides AI decision engines for banks and insurers, raised **$110 million** in a **Series C** led by **Goldman Sachs Alternatives** growth equity, with **Balderton**, **Index Ventures**, **Tiger Global**, **Y Combinator**, and others; total funding reaches **$184 million** (valuation undisclosed). CEO **Maximilian Wehmeyer** said **2026** is the year AI enters financial services in earnest, with agents outperforming humans on many complex risk tasks; proceeds will fund U.S., European, and Latin American expansion (including a new São Paulo office) and tools for complex banking use cases.
**Links:**

- [The Next Web — Taktile raises $110M to put AI in charge of bank decisions](https://thenextweb.com/news/taktile-110m-goldman-sachs-series-c)

**Commentary:** Goldman betting directly signals financial agents are past POC—businesses where a single mistake costs millions are becoming the next high-margin SaaS fortress.

---

## IV. Robotics & Regional Applications

### 11. Galbot S1 Runs 7×24 on CATL Production Line for 3+ Months; Embodied-AI Aftermarket Standard Set (Robotics / China)
**Summary:** Per **Sina Finance** and **Beijing News** on **June 25, 2026**, Haidian District authorities reported that **Galaxy General**'s **Galbot S1** embodied-intelligence heavy-load humanoid has operated **7×24** on **CATL**'s mass-production line for more than **three months** since acceptance at the Ningde **HX** base in **March**, described as the first routine autonomous humanoid deployment in new-energy smart manufacturing. **NING Service**, a CATL affiliate, signed a global strategic partnership to become authorized global service provider and establish a full-lifecycle embodied-intelligence service standard; the company also released end-to-end embodied model **AstraBrain WAM 0.5** and whole-body control "cerebellum" **AstraBrain-WBC 0.5** trained on roughly **20,000 hours** of human motion-capture data.
**Links:**

- [Sina Finance — Galaxy General robot achieves routine new-energy manufacturing deployment](https://finance.sina.com.cn/jjxw/2026-06-25/doc-inierayw5680643.shtml)
- [Beijing News — Galaxy General robot achieves routine new-energy manufacturing deployment](https://www.bjnews.com.cn/detail/1782365499129699.html)

**Commentary:** Humanoid robotics is moving from demo floors to three-shift production lines—whoever first closes the "manufacturing + aftermarket" loop can replicate across more heavy-industry customers.

---

### 12. Agility Robotics Plans $2.5B SPAC Listing; Digit Could Become First Pure-Play Public Humanoid Company (Capital / US)
**Summary:** Per **Agility Robotics**' site and **AP News** on **June 24–25, 2026**, warehouse humanoid **Digit** maker **Agility Robotics** signed a merger with **Churchill Capital Corp XI** at a **$2.5 billion** pre-money valuation, expecting more than **$620 million** in gross proceeds (including roughly **$420 million** from trust and about **$200 million** via a **PIPE** led by **Foxconn**); the combined company intends to list on a major North American exchange under ticker **AGLT**. **Digit** is already commercially deployed in logistics and manufacturing; the company has secured over **$300 million** in orders for next-gen **Digit V5**; backers include **Amazon**, **NVIDIA**, and **SoftBank**.
**Links:**

- [Agility Robotics — Agility Robotics to Go Public Through Merger with Churchill Capital Corp XI](https://www.agilityrobotics.com/content/agility-robotics-to-go-public-through-merger-with-churchill-capital-corp-xi)
- [AP News — Agility Robotics heads to Wall Street in a $2.5B bet on warehouse humanoids](https://apnews.com/article/agility-humanoid-robots-ipo-churchill-ai-39f2356b9c1e167d0985b821f70079c5)

**Commentary:** Humanoids are knocking on the public market door for the first time—a SPAC shortens disclosure timelines, but Digit order fulfillment will decide whether this is a bubble start or an industry inflection.

---

## Today's Summary
- **U.S. regulation:** The White House asked **OpenAI** to stagger **GPT-5.6** with customer-by-customer approval, making "voluntary testing" operational; **Anthropic** simultaneously escalated congressional allegations of large-scale **Claude** distillation by **Alibaba**.
- **Europe on two tracks:** The EU joined **Pax Silica** to bind transatlantic supply chains while moving to designate **AWS**/**Azure** as **DMA** gatekeepers.
- **Compute stack:** **OpenAI**/**Broadcom** unveiled the **Jalapeño** inference chip; **Qualcomm** agreed to buy **Modular** for ~**$3.9 billion** to attack cross-chip AI software.
- **Agent capital surge:** **General Intuition** (**$2.3B** valuation), **Mirendil** (**$1B**), **Patronus** (**$50M**), and **Taktile** (**$110M**) raised on or near the same day across training, evaluation, and financial deployment.
- **Physical AI:** **Galaxy General** achieved three-shift humanoid routine ops at **CATL**; **Agility** announced a **$2.5 billion SPAC** listing plan.

**Daily Framing:** Today was a "regulatory gatekeeping day" stacked on an "infrastructure catch-up day"—model release authority is moving toward government approval even as custom chips, cross-platform software, and agent evaluation/funding chains accelerate, and U.S.-China AI security and IP friction grows more political.

---

*This digest is compiled from real-time search results and is for reference only; facts are subject to original sources.*  
*Date: June 25, 2026 (Thursday)*
