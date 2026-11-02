// All site content lives here. Edit this file to personalise the portfolio.
// Source: "Sekhar Javvadi — Founder Portfolio Master Document" (working draft, 30 Oct 2026).
// Anything marked TODO still needs to be verified or supplied before going live.

// Hero logo for the glass reveal: SVG markup or an image URL (e.g. "/logo.svg" in /public).
// Only the shape is used; its colour comes from the theme accent.
// TODO: placeholder "S" monogram until the real logo is added.
export const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M70 30C66 20 56 16 48 16 35 16 28 24 28 33c0 22 44 12 44 34 0 10-9 17-22 17-10 0-19-5-22-14" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/></svg>`;

export const profile = {
  name: "Sekhar Javvadi",
  shortName: "Sekhar",
  headline: "Founder & Product Builder",
  tagline: "Turning complex workflows into software products.",
  intro:
    "I'm a technology entrepreneur from Visakhapatnam who builds software products from the ground up — across full-stack engineering, AI, blockchain, and hardware workflows. Today I'm building OpenPlan AI to make hardware product development more structured, connected, and efficient.",
  location: "Visakhapatnam, India",
  // TODO: replace with a verified professional email and profile URLs.
  email: "hello@example.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
};

// Small, defensible proof points for the hero. Team results; Reaidy figures are historical.
export const proofPoints = [
  { value: "2019", label: "Co-founded Spotmies LLP" },
  { value: "40+", label: "Projects delivered at Spotmies" },
  { value: "50K+", label: "Reaidy.io users" },
  { value: "60K+", label: "AI interviews run on Reaidy" },
];
export const proofNote = "Company and team results. Reaidy figures are historical, reported figures.";

export const about = {
  story: [
    "I am a technology entrepreneur who enjoys turning complex problems into practical software products. I began with hands-on engineering and software development, then built experience through client work, product development, AI applications, blockchain, and IoT.",
    "Through Spotmies, I have worked with teams to turn business requirements into digital products. Through Reaidy, I explored how AI could improve hiring and interview workflows. Today, I am building OpenPlan AI to help hardware teams manage the complexity of product development.",
    "I enjoy learning new domains, understanding how work actually happens, and building technology that makes those workflows better.",
  ],
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

// The founder story, told as badges collected on a cutting mat (see FounderMat).
// Each chapter is one badge; the note card shows its story when picked up.
export type StoryChapter = {
  id: string;
  badge: "round" | "id" | "hex" | "pill" | "now";
  label: string; // short sticker text
  role: string; // who Sekhar was in this chapter
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

// Phases rather than invented dates — exact years are only known for Spotmies.
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

// Only projects with known context. Client work was delivered with the Spotmies team.
// TODO: add role, outcome, stack, and links for each before treating these as case studies.
export const work: { title: string; description: string; tags: string[]; context: string }[] = [
  {
    title: "CypherB",
    description: "A blockchain-based recruitment and verification platform.",
    tags: ["Blockchain", "Hiring"],
    context: "Spotmies",
  },
  {
    title: "Indie Skull Syndicate",
    description: "An NFT and blockchain community project.",
    tags: ["NFT", "Web3"],
    context: "Spotmies",
  },
  {
    title: "Oscar Chatbot",
    description: "A conversational chatbot built for a client.",
    tags: ["AI", "Chatbot"],
    context: "Client work · Spotmies",
  },
  {
    title: "StreamCity",
    description: "A streaming product for yoga classes.",
    tags: ["Streaming", "Wellness"],
    context: "Client work · Spotmies",
  },
  {
    title: "Nandikrushi",
    description: "An organic grocery shopping application.",
    tags: ["Commerce", "App"],
    context: "Client work · Spotmies",
  },
  {
    title: "Hardware & IoT prototypes",
    description: "NodeMCU / ESP8266 systems, PIR-sensor anti-theft devices, PCB and schematic design.",
    tags: ["IoT", "Embedded", "PCB"],
    context: "Early work",
  },
];

export const capabilities: { domain: string; tools: string[]; context: string }[] = [
  {
    domain: "Frontend & web",
    tools: ["React", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap"],
    context: "Application interfaces, dashboards, portals, and responsive products.",
  },
  {
    domain: "Backend",
    tools: ["Node.js", "Express", "MongoDB", "MySQL"],
    context: "APIs, services, data models, and integrations.",
  },
  {
    domain: "Mobile",
    tools: ["Flutter", "React Native", "Expo", "NativeWind", "Zustand"],
    context: "Cross-platform mobile product experiences.",
  },
  {
    domain: "Artificial intelligence",
    tools: ["Azure OpenAI", "OpenAI APIs", "LangChain", "Embeddings", "Prompt engineering"],
    context: "AI interviews, resume analysis, question generation, scoring, semantic search.",
  },
  {
    domain: "Speech & media",
    tools: ["Whisper", "Azure Speech to Text", "Speech SDKs"],
    context: "Voice-based interview experiences.",
  },
  {
    domain: "Data & search",
    tools: ["MongoDB", "Vector search", "Pinecone"],
    context: "Resume retrieval and retrieval-quality trade-offs.",
  },
  {
    domain: "Blockchain",
    tools: ["Solidity", "Polygon", "IPFS", "nft.storage", "Biconomy"],
    context: "Smart contracts, NFTs, dApps, and gasless transactions.",
  },
  {
    domain: "Cloud & delivery",
    tools: ["Azure", "Supabase", "Railway", "Vercel"],
    context: "Deployment, cloud architecture, and running production apps.",
  },
  {
    domain: "Computer vision & ML",
    tools: ["OpenCV", "MediaPipe", "face-api.js", "YOLOv8", "NumPy"],
    context: "Exploration and implementation of vision workflows.",
  },
  {
    domain: "Hardware & IoT",
    tools: ["NodeMCU", "ESP8266", "PIR sensors", "PCB design"],
    context: "Embedded systems and physical prototyping.",
  },
];

export const thinking = {
  mindset:
    "Understand the workflow, identify the friction, learn the underlying technology, build a practical solution, test it with real users, and improve the product based on evidence.",
  principles: [
    {
      title: "Start with a practical problem",
      body: "Hiring teams screening faster, hardware teams controlling product data — the product starts from operational friction, not technology for its own sake.",
    },
    {
      title: "Learn by building",
      body: "Curiosity turns into architecture, data structures, and deployment. Understanding improves by building and testing.",
    },
    {
      title: "Connect engineering with business",
      body: "Every technical choice ties back to customers, pricing, usage cost, and positioning — Reaidy was a two-sided business, not just an AI system.",
    },
    {
      title: "Look for leverage",
      body: "Solve a problem once and make the solution useful to many customers. That's the move from services to products.",
    },
    {
      title: "Think in systems",
      body: "Candidates and recruiters, parts and assemblies, changes and plans — the full workflow matters more than an isolated feature.",
    },
    {
      title: "Respect operational reality",
      body: "API quotas, concurrency, storage cost, and reliability are the gap between a prototype and a product.",
    },
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

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Ventures", href: "#ventures" },
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Thinking", href: "#thinking" },
  { label: "Contact", href: "#contact" },
];
