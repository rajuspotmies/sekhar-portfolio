// All site copy and numbers live in this file. Components read from it; no copy is duplicated elsewhere.
// Sources: docs/sekharjavvadi-redesign-brief.md and docs/hero-footer-addendum.md (the addendum wins on
// the hero and footer). Anything marked "[TODO: …]" must stay visible until the founder supplies it.
// Never replace a TODO with a guess.

/* ============================================================================================
   Site-wide
   ============================================================================================ */

export const site = {
  name: "Sekhar Javvadi",
  location: "Visakhapatnam, India",
  url: "https://www.sekharjavvadi.com/",
  email: "[TODO: email]",
  socials: [
    // [TODO: confirm current URLs: these are the bare placeholders the current site uses]
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

export const seo = {
  title: "Sekhar Javvadi — Founder, building OpenPlan AI",
  // Founder's instruction: the hero tagline moves out of the hero and into the meta description.
  description:
    "Turning complex workflows into software products. Founder and product builder from Visakhapatnam. Co-founded Spotmies (2019), built Reaidy.io, and now building OpenPlan AI, software for hardware teams.",
};

/* ============================================================================================
   Navigation
   ============================================================================================ */

export const nav = [
  { label: "Story", href: "#story" },
  { label: "OpenPlan", href: "#openplan" },
  { label: "Ventures", href: "#ventures" },
  { label: "How I build", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

// TEMPORARY: sections that haven't been rebuilt yet still use their old ids. Delete each entry when its
// section is rebuilt with the final id, and delete this map once it is empty.
const anchorAliases: Record<string, string> = {
  "#story": "#about",
  "#principles": "#thinking",
};
export const resolveHref = (href: string) => anchorAliases[href] ?? href;

/* ============================================================================================
   Hero (addendum §2)
   ============================================================================================ */

export const hero = {
  status: { prefix: "Building", product: "OpenPlan AI" }, // renders "● Building [mark] OpenPlan AI"
  statement: {
    spoken: "Between hardware and software", // what screen readers hear
    lead: "between",
    first: "Hardware",
    joiner: "&",
    second: "Software.",
  },
  marker: "2019", // drawn as "✳2019" in outline text; decorative
  name: "Sekhar Javvadi", // the H1; the indigo full stop is added by the component
  role: "Founder & Product Builder",
  bio: "I started out building circuits and PCBs, spent the years since 2019 shipping software, and now I'm building OpenPlan AI for teams that make physical products.",
  ctas: {
    primary: { label: "Explore OpenPlan AI", href: "#openplan" },
    secondary: { label: "Get in touch", href: "#contact" },
  },
  trail: [
    { label: "Spotmies · 2019", href: "#spotmies" },
    { label: "Reaidy.io", href: "#reaidy" },
    { label: "OpenPlan AI · now", href: "#openplan" },
  ],
  badgeHint: "Drag it · click to flip",
  badgeAlt: "Sekhar Javvadi's ID badge: Founder, OpenPlan AI",
  scroll: { label: "Scroll", href: "#story" },
};

/* ============================================================================================
   01 — Story (brief §2.2)
   ============================================================================================ */

export type StoryChapterV2 = {
  id: string;
  badge: string;
  act: string;
  kicker: string;
  title: string;
  body: string;
  learned: string | { label: string; href: string };
};

export const story = {
  label: "01 — Story",
  title: "I build technology by understanding how people actually work.",
  intro:
    "My work has followed one instinct: when I see a workflow that technology can fix, I want to understand it deeply and build something useful around it. It started with hardware, took me through seven years of building software, and has brought me back to hardware.",
  chapters: [
    {
      id: "tinkerer",
      badge: "Tinkerer",
      act: "Act I · Hardware first",
      kicker: "The tinkerer",
      title: "I started by making things work.",
      body: "Before any company, there were circuits: NodeMCU boards, PIR-sensor anti-theft devices, schematics and PCBs. Getting code to behave in the physical world meant debugging patiently and respecting real constraints.",
      learned: "How software meets physical systems, and how to debug what doesn't work yet.",
    },
    {
      id: "spotmies",
      badge: "Spotmies LLP · 2019",
      act: "Act II · Building software",
      kicker: "Co-founder",
      title: "Seven years of turning ideas into products.",
      body: "In 2019 I co-founded Spotmies with Satish, Hemanth and Naveen [TODO: confirm names/permission]. We built web, mobile, AI and blockchain products for startups and businesses. The blockchain work included smart contracts, NFTs and decentralised apps.",
      learned: "How to understand a customer, scope under constraints, deliver with a team, and run a business.",
    },
    {
      id: "reaidy",
      badge: "Reaidy.io",
      act: "Act II · Building software",
      kicker: "Product builder",
      title: "Taking an AI product to real users.",
      body: "Reaidy was a two-sided AI hiring platform: mock interviews and scorecards for candidates, and resume screening for recruiters. Getting it to real usage meant solving for quotas, quality and cost, not just the model.",
      learned: "A prototype is the start. Reliability, cost and adoption are the product.",
    },
    {
      id: "openplan",
      badge: "OpenPlan AI · 2026",
      act: "Act III · Back to hardware",
      kicker: "Now building",
      title: "Full circle.",
      body: "Now I'm bringing those years of software back to where I started. OpenPlan AI gives teams that build physical products one connected place for parts, BOMs, revisions and engineering changes.",
      learned: { label: "→ See what I'm building", href: "#openplan" },
    },
  ] satisfies StoryChapterV2[],
  closing: "Every chapter has the same thread: make complex work easier to execute.",
};

/* ============================================================================================
   02 — Now building: OpenPlan AI (brief §2.3)
   ============================================================================================ */

export const openplan = {
  label: "02 — Now building",
  title: "OpenPlan AI",
  lead: {
    todo: "[TODO: founder to pick ONE positioning, and match openplanai.com]",
    optionA:
      "OpenPlan AI helps hardware teams manage product structures, engineering changes and development work in one connected workspace.",
    optionB:
      "OpenPlan AI is an AI planning layer for hardware teams that works alongside the PLM tools they already use.",
  },
  meta: [
    { label: "Status", value: "Built and working [TODO: add \"in pilots with N teams\" only if true]" },
    { label: "For", value: "Hardware startups and product teams [TODO: confirm industries]" },
    { label: "Started", value: "2026" },
    { label: "Site", value: "openplanai.com" },
  ],
  problems: [
    { title: "Product data is scattered.", body: "Parts, BOMs and revisions live across spreadsheets and disconnected tools." },
    { title: "Changes are hard to control.", body: "Engineering changes move through email and chat, with no clear history." },
    { title: "Visibility comes late.", body: "As a product evolves, teams struggle to see what a change touches." },
  ],
  capabilities: [
    { title: "BOM management", body: "parts, assemblies, components and sub-components in one structure." },
    { title: "Engineering change orders", body: "track and control every product change." },
    { title: "Lifecycle workflows", body: "organise product information and development activity." },
    { title: "Connected project work", body: "tasks linked to the parts and changes they affect." },
  ],
  whyMe: "I started in hardware and spent seven years building software. OpenPlan is where the two meet.",
  ctas: {
    primary: { label: "See the product", href: "https://openplanai.com" },
    secondary: { label: "Request a conversation", href: "#contact" },
    tertiary: { label: "Hardware team? Request a demo →", href: "mailto:[TODO: email]?subject=OpenPlan%20demo" },
  },
  visual: {
    todo: "[TODO: product screenshot(s) or a 10–15s muted looping MP4/WebM]",
    // Fallback diagram until screenshots exist. "Change order" is the accented node.
    diagram: ["Part", "Assembly", "Revision", "Change order", "Task"],
    diagramDescription:
      "Diagram of connected product data: a part belongs to an assembly, the assembly has revisions, a revision is changed through a change order, and the change order creates tasks.",
  },
};

/* ============================================================================================
   03 — Track record (brief §2.4). The ONLY place on the site with numbers.
   ============================================================================================ */

export const metrics = {
  spotmies: {
    asOf: "[TODO: month year]",
    scope: "Company figures",
    items: [
      { value: "40+", label: "projects delivered" },
      { value: "30+", label: "clients" },
      { value: "6+", label: "blockchain projects" },
      { value: "50-seat", label: "office in Visakhapatnam" },
    ],
  },
  reaidy: {
    asOf: "[TODO: month year]",
    scope: "Historical figures, reported by the team",
    items: [
      { value: "50K+", label: "users" },
      { value: "60K+", label: "AI interviews" },
      { value: "200+", label: "hiring companies" },
      { value: "40+", label: "college partners" },
    ],
  },
};

export const trackRecord = {
  label: "03 — Track record",
  title: "Before OpenPlan.",
  spotmies: {
    id: "spotmies",
    name: "Spotmies LLP",
    meta: "Co-founder & Technical Lead [TODO: confirm title, e.g. CTO] · 2019 – [TODO: present?] · Visakhapatnam",
    summary:
      "A software product and services company that turns business requirements into working web, mobile, AI and blockchain products.",
    owned: "Technical direction, architecture and product decisions, and delivering projects with the team.",
    metrics: metrics.spotmies,
    support: "Associated with AU Incubation Centre and A Hub, Andhra University. [TODO: confirm entity/dates]",
    work: [
      { name: "CypherB", description: "Blockchain recruitment and verification platform.", role: "My role: [TODO]" },
      { name: "Indie Skull Syndicate", description: "NFT and blockchain community project.", role: "My role: [TODO]" },
      { name: "Nandikrushi", description: "Organic grocery app.", role: "My role: [TODO]" },
    ],
    workFooter: "Built by the Spotmies team.",
    team: "Co-founded with Satish, Hemanth and Naveen. [TODO: confirm]",
  },
  reaidy: {
    id: "reaidy",
    name: "Reaidy.io",
    status: "No longer operating",
    meta: "[TODO: title] · [TODO: start year – end year]",
    summary:
      "A two-sided AI hiring platform: AI mock interviews and scorecards for candidates, bulk resume screening and a recruiter portal for companies.",
    metrics: metrics.reaidy,
    support: "Part of Microsoft for Startups Founders Hub.",
    whyStopped: "[TODO: one honest sentence]",
    lesson:
      "AI quality came from the whole workflow (interview state, question history, evaluation), not just the model.",
  },
  range: {
    text: "Hands-on across web, mobile, AI and speech, blockchain, cloud and embedded systems.",
    link: { label: "GitHub →", href: "https://github.com/" }, // [TODO: confirm GitHub URL]
  },
};

/* ============================================================================================
   04 — How I build (brief §2.5)
   ============================================================================================ */

export const principles = {
  label: "04 — How I build",
  title: "How I build.",
  items: [
    {
      claim: "Start with the workflow, not the technology.",
      evidence:
        "Every product I've worked on began with a specific friction: screening candidates faster, keeping control of hardware changes.",
    },
    {
      claim: "A prototype is only the beginning.",
      evidence:
        "At Reaidy, the AI interviews worked. Then speech-service quotas capped how many could run at once. Making it hold up under real usage was the real work.",
    },
    {
      claim: "AI quality is product logic.",
      evidence:
        "Our mock interviews kept repeating questions. The fix wasn't a better model; it was tracking interview state and question history.",
    },
    {
      claim: "Architecture follows usage and cost.",
      evidence:
        "For resume search, we weighed MongoDB against a dedicated vector database on storage cost, speed and complexity, not convenience.",
    },
  ],
  vision: "I want to build practical platforms that help important industries move faster from ideas to real products.",
};

/* ============================================================================================
   05 — Contact + footer (addendum §3, replaces brief §2.6 and §2.7)
   ============================================================================================ */

export const contact = {
  label: "05 — Contact",
  title: "Let's talk.",
  audiences: [
    { label: "Investors & accelerators", text: "I'd like to tell you about OpenPlan AI and where it's going." },
    { label: "Hardware teams", text: "See how OpenPlan fits the way your team builds." },
    { label: "Builders", text: "Always happy to compare notes." },
  ],
  email: site.email,
  primary: { label: "Email me →", href: `mailto:${site.email}` },
  copy: { idle: "Copy", done: "Copied" },
  location: site.location,
  marquee: "INVESTORS · HARDWARE TEAMS · BUILDERS · OPENPLAN AI ·", // optional; decision deferred
  footer: { copyright: "© 2026 Sekhar Javvadi", backToTop: "Back to top ↑" },
};

/* ============================================================================================
   LEGACY: still read by sections that haven't been rebuilt yet. Delete each block when the
   section that imports it is rebuilt (see docs/sekharjavvadi-redesign-brief.md §2).
   ============================================================================================ */

// LEGACY: Contact section and footer (page.tsx). Built from `site` so nothing is duplicated.
export const profile = {
  name: site.name,
  location: site.location,
  email: site.email,
  socials: site.socials,
};

// LEGACY: HeroReveal (unused component; deleted in the cleanup step).
// Placeholder "S" monogram.
export const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M70 30C66 20 56 16 48 16 35 16 28 24 28 33c0 22 44 12 44 34 0 10-9 17-22 17-10 0-19-5-22-14" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/></svg>`;

// LEGACY: old Founder Story section + FounderMat (5 chapters). Replaced by `story` above.
export const about = {
  throughLine:
    "From IoT and application development, to blockchain and AI, to software for hardware product development — the consistent theme is building technology that makes complex work easier to execute.",
  facts: [
    { label: "Based in", value: "Visakhapatnam, India" },
    { label: "Building", value: "OpenPlan AI" },
    { label: "Co-founder", value: "Spotmies LLP" },
    { label: "Disciplines", value: "Full-stack, AI, product architecture, blockchain, hardware workflows" },
  ],
  interests: [
    "AI & automation",
    "Product & entrepreneurship",
    "Hardware & industrial tech",
    "Blockchain & decentralised systems",
    "Future of work & hiring",
    "Cloud infrastructure & scaling",
    "Go-to-market & storytelling",
    "How founders think",
  ],
};

export type StoryChapter = {
  id: string;
  badge: "round" | "id" | "hex" | "pill" | "now";
  label: string;
  role: string;
  period: string;
  title: string;
  body: string;
  learned: string;
  stats?: { value: string; label: string }[];
  note?: string;
};

export const storyIntro =
  "My journey has been shaped by a simple instinct: when I see a problem that technology can solve, I want to understand it deeply and build something useful around it. Every badge on this mat is a chapter where that instinct took me somewhere new.";

export const storyChapters: StoryChapter[] = [
  {
    id: "tinkerer",
    badge: "round",
    label: "Tinkerer",
    role: "The tinkerer",
    period: "Where it started",
    title: "I started by making things work.",
    body: "Before any company, there were circuits: NodeMCU boards, PIR-sensor anti-theft devices, schematics and PCBs. Getting code to behave in the physical world meant debugging patiently and respecting real constraints.",
    learned: "How software meets physical systems — and how to debug what doesn't work yet.",
  },
  {
    id: "cofounder",
    badge: "id",
    label: "Spotmies LLP",
    role: "The co-founder",
    period: "2019 onward",
    title: "From writing code to owning outcomes.",
    body: "In 2019 I co-founded Spotmies with a small team. Client work put me in front of real businesses across different industries: understanding requirements, working within constraints, delivering with a team, and running a technology business.",
    learned: "Technology is most valuable when it solves a specific problem for a clearly defined user.",
    stats: [
      { value: "40+", label: "Projects" },
      { value: "30+", label: "Clients" },
      { value: "50", label: "Seat office" },
    ],
  },
  {
    id: "explorer",
    badge: "hex",
    label: "Web3",
    role: "The explorer",
    period: "Blockchain phase",
    title: "Saying yes to a new frontier.",
    body: "When blockchain emerged, we went in hands-on: smart contracts, NFTs, decentralised apps, wallet flows and gasless transactions — including a blockchain-based recruitment and verification platform.",
    learned: "How to learn an unfamiliar ecosystem quickly and ship real products in it.",
    stats: [{ value: "6+", label: "Blockchain projects" }],
  },
  {
    id: "builder",
    badge: "pill",
    label: "Reaidy.io",
    role: "The product builder",
    period: "AI products",
    title: "From one client's problem to a product at scale.",
    body: "Services solve one problem at a time. I wanted to solve repeatable problems at scale. Reaidy applied AI to hiring — AI interviews, resume analysis and recruiter tools — for job seekers and companies alike.",
    learned: "Applying AI to real workflows: quality, reliability, adoption and monetisation.",
    stats: [
      { value: "50K+", label: "Users" },
      { value: "60K+", label: "AI interviews" },
      { value: "200+", label: "Companies" },
    ],
    note: "Historical reported figures.",
  },
  {
    id: "now",
    badge: "now",
    label: "OpenPlan AI",
    role: "Now building",
    period: "2026 —",
    title: "Bringing it all together.",
    body: "OpenPlan AI is software for teams that design and build physical products. It draws on everything before it: years of product engineering, technical architecture, my early hardware work, and a taste for complex operational problems.",
    learned: "Still being written — that's the fun part.",
  },
];

// LEGACY: old Ventures section. Replaced by `openplan` + `trackRecord` above.
export type Venture = {
  id: string;
  name: string;
  status: string;
  period: string;
  role?: string;
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  metricsNote?: string;
  href?: string;
};

export const ventures: Venture[] = [
  {
    id: "openplan",
    name: "OpenPlan AI",
    status: "Current focus",
    period: "2026 —",
    summary:
      "OpenPlan AI helps hardware teams manage product structures, engineering changes, and development work in one connected workspace. Hardware teams coordinate parts, assemblies, BOMs, revisions, and change orders — and when that lives in disconnected documents and tools, they lose visibility and control as the product evolves.",
    highlights: [
      "Bill of Materials management across parts, assemblies, components, and sub-components",
      "Product lifecycle workflows for organising product information and development activity",
      "Engineering Change Orders for tracking and controlling product changes",
      "Project management connected directly to product development work",
    ],
    href: "https://www.openplanai.com",
  },
  {
    id: "spotmies",
    name: "Spotmies LLP",
    status: "Co-founder",
    period: "2019 —",
    role: "Co-founder & technical lead",
    summary:
      "A technology services and product development company that turns ideas and business requirements into working digital products for enterprises, startups, and clients across sectors. I lead technical direction, architecture, and development, and help the team deliver — from early idea and UX through engineering and launch.",
    highlights: [
      "Web and mobile applications for clients across different industries",
      "Conventional software, AI-enabled applications, and blockchain solutions",
      "Associated with AU Incubation Centre and A Hub, Andhra University",
      "Grew into a 50-seat office in Visakhapatnam",
    ],
    metrics: [
      { value: "40+", label: "Projects" },
      { value: "30+", label: "Clients" },
      { value: "6+", label: "Blockchain projects" },
    ],
  },
  {
    id: "reaidy",
    name: "Reaidy.io",
    status: "AI product",
    period: "Previous",
    summary:
      "An AI-enabled hiring and interview platform: job seekers prepare for interviews, and recruiters streamline screening and hiring. A two-sided product that brought together LLMs, speech technology, recruiter operations, and a usage-based business model.",
    highlights: [
      "AI interviews that generate questions for any topic or technology, plus structured manual interviews",
      "AI evaluation and scorecards, resume building, and resume analysis",
      "Bulk resume sorting — upload resumes and a job description, get AI relevance scores",
      "Recruiter portal with history and spreadsheet export; credit-based usage model",
      "Part of Microsoft for Startups Founders Hub",
    ],
    metrics: [
      { value: "50K+", label: "Users" },
      { value: "200+", label: "Hiring companies" },
      { value: "40+", label: "College partners" },
      { value: "60K+", label: "AI interviews" },
    ],
    metricsNote: "Historical reported figures.",
  },
];

// LEGACY: Journey section (to be removed entirely).
export const journey = [
  {
    phase: "Early technical exploration",
    what: "IoT, microcontrollers, sensors, anti-theft systems, PCB and schematic design.",
    learned: "Connecting software with physical systems, hardware constraints, and practical debugging.",
  },
  {
    phase: "2019 onward — Spotmies",
    what: "Co-founded Spotmies LLP and grew a software services and product development capability.",
    learned: "Customer discovery, delivery, technical ownership, team coordination, and commercial execution.",
  },
  {
    phase: "Blockchain",
    what: "Blockchain applications, NFTs, decentralised apps, and related integrations.",
    learned: "New ecosystems, wallet and transaction flows, smart contracts, and decentralised storage.",
  },
  {
    phase: "AI products — Reaidy.io",
    what: "AI interviews, resume evaluation, recruiter workflows, and speech technology.",
    learned: "Applying AI to real workflows: prompt design, UX, reliability, and monetisation.",
  },
  {
    phase: "2026 — OpenPlan AI",
    what: "Building software for hardware product development and lifecycle workflows.",
    learned: "Structured engineering data, collaboration, and vertical software opportunities.",
  },
];

// LEGACY: Selected Work section (to be removed; 3 projects move into trackRecord.spotmies.work).
export const work: { title: string; description: string; tags: string[]; context: string }[] = [
  { title: "CypherB", description: "A blockchain-based recruitment and verification platform.", tags: ["Blockchain", "Hiring"], context: "Spotmies" },
  { title: "Indie Skull Syndicate", description: "An NFT and blockchain community project.", tags: ["NFT", "Web3"], context: "Spotmies" },
  { title: "Oscar Chatbot", description: "A conversational chatbot built for a client.", tags: ["AI", "Chatbot"], context: "Client work · Spotmies" },
  { title: "StreamCity", description: "A streaming product for yoga classes.", tags: ["Streaming", "Wellness"], context: "Client work · Spotmies" },
  { title: "Nandikrushi", description: "An organic grocery shopping application.", tags: ["Commerce", "App"], context: "Client work · Spotmies" },
  {
    title: "Hardware & IoT prototypes",
    description: "NodeMCU / ESP8266 systems, PIR-sensor anti-theft devices, PCB and schematic design.",
    tags: ["IoT", "Embedded", "PCB"],
    context: "Early work",
  },
];

// LEGACY: Capabilities grid (to be removed; replaced by trackRecord.range).
export const capabilities: { domain: string; tools: string[]; context: string }[] = [
  { domain: "Frontend & web", tools: ["React", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap"], context: "Application interfaces, dashboards, portals, and responsive products." },
  { domain: "Backend", tools: ["Node.js", "Express", "MongoDB", "MySQL"], context: "APIs, services, data models, and integrations." },
  { domain: "Mobile", tools: ["Flutter", "React Native", "Expo", "NativeWind", "Zustand"], context: "Cross-platform mobile product experiences." },
  { domain: "Artificial intelligence", tools: ["Azure OpenAI", "OpenAI APIs", "LangChain", "Embeddings", "Prompt engineering"], context: "AI interviews, resume analysis, question generation, scoring, semantic search." },
  { domain: "Speech & media", tools: ["Whisper", "Azure Speech to Text", "Speech SDKs"], context: "Voice-based interview experiences." },
  { domain: "Data & search", tools: ["MongoDB", "Vector search", "Pinecone"], context: "Resume retrieval and retrieval-quality trade-offs." },
  { domain: "Blockchain", tools: ["Solidity", "Polygon", "IPFS", "nft.storage", "Biconomy"], context: "Smart contracts, NFTs, dApps, and gasless transactions." },
  { domain: "Cloud & delivery", tools: ["Azure", "Supabase", "Railway", "Vercel"], context: "Deployment, cloud architecture, and running production apps." },
  { domain: "Computer vision & ML", tools: ["OpenCV", "MediaPipe", "face-api.js", "YOLOv8", "NumPy"], context: "Exploration and implementation of vision workflows." },
  { domain: "Hardware & IoT", tools: ["NodeMCU", "ESP8266", "PIR sensors", "PCB design"], context: "Embedded systems and physical prototyping." },
];

// LEGACY: old How I Build section. Replaced by `principles` above.
export const thinking = {
  mindset:
    "Understand the workflow, identify the friction, learn the underlying technology, build a practical solution, test it with real users, and improve the product based on evidence.",
  principles: [
    { title: "Start with a practical problem", body: "Hiring teams screening faster, hardware teams controlling product data — the product starts from operational friction, not technology for its own sake." },
    { title: "Learn by building", body: "Curiosity turns into architecture, data structures, and deployment. Understanding improves by building and testing." },
    { title: "Connect engineering with business", body: "Every technical choice ties back to customers, pricing, usage cost, and positioning — Reaidy was a two-sided business, not just an AI system." },
    { title: "Look for leverage", body: "Solve a problem once and make the solution useful to many customers. That's the move from services to products." },
    { title: "Think in systems", body: "Candidates and recruiters, parts and assemblies, changes and plans — the full workflow matters more than an isolated feature." },
    { title: "Respect operational reality", body: "API quotas, concurrency, storage cost, and reliability are the gap between a prototype and a product." },
  ],
  lessons: [
    "A prototype is only the beginning. A product must also be reliable, scalable, understandable, and affordable to operate.",
    "AI product quality comes from the complete workflow — context, memory, evaluation, and guardrails — not just model selection.",
    "Architecture should reflect expected usage and cost, not only initial convenience.",
    "External dependencies need contingency plans and clear communication.",
    "Customer and market feedback should shape priorities continuously.",
  ],
  vision:
    "To build practical technology platforms that simplify complex work, empower teams, and help important industries move faster from ideas to real products.",
};
