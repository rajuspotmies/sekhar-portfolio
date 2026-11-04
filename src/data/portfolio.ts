// All site copy and numbers live in this file. Components read from it; no copy is duplicated elsewhere.
// Sources: docs/sekharjavvadi-redesign-brief.md and docs/hero-footer-addendum.md (the addendum wins on
// the hero and footer).
//
// UNFILLED VALUES ARE `null`. Components hide a null field (or its whole line). No placeholder text may ever
// render. Never replace a null with a guess; the founder fills them in. See `hiddenUntilFilled` below.

/** Joins the non-null parts with " · "; null when nothing is left (so the line is hidden). */
const meta = (...parts: (string | null)[]): string | null => parts.filter(Boolean).join(" · ") || null;

// Founder values still to come (null = hidden on the site).
const spotmiesCofounders: string | null = null; // e.g. "Satish, Hemanth and Naveen" (needs their OK)
const spotmiesEndYear: string | null = null; // "present" or the year it ended
const reaidyTitle: string | null = null; // e.g. "Co-founder & CTO"
const reaidyYears: string | null = null; // "start year – end year"

/** Every field currently hidden because it's null (for the founder's fill-in list). */
export const hiddenUntilFilled = [
  "Spotmies co-founder names (Story chapter + Ventures)",
  "Spotmies end year (Ventures meta shows just 2019)",
  "Spotmies 'as of' date for the numbers",
  "Spotmies AU Incubation / A Hub line",
  "Spotmies selected work: my role on CypherB, Indie Skull Syndicate, Nandikrushi (not rendered)",
  "Reaidy title and years (whole meta line hidden)",
  "Reaidy 'as of' date for the numbers",
  "Reaidy 'why it stopped' line",
  "OpenPlan product screenshot / video (not rendered)",
];

/* ============================================================================================
   Site-wide
   ============================================================================================ */

export type Social = { label: string; href: string };

const linkedin: Social = { label: "LinkedIn", href: "https://www.linkedin.com/in/sekhar-javvadi" };
const x: Social = { label: "X", href: "https://x.com/sekharjv" };
const github: Social = { label: "GitHub", href: "https://github.com/sekharjavvadi" };
const instagram: Social = { label: "Instagram", href: "https://www.instagram.com/sekharjavvadi/" };

export const site = {
  name: "Sekhar Javvadi",
  location: "Bengaluru, India",
  url: "https://www.sekharjavvadi.com/",
  email: "sekhar@openplanai.com",
  socials: [linkedin, x, github], // Contact
  footerSocials: [linkedin, x, github, instagram], // footer only: Instagram is not in Contact
  github,
  openplanUrl: "https://www.openplanai.com/",
  spotmiesUrl: "https://www.spotmies.com/",
  reaidyUrl: "https://www.reaidy.io/", // checked 2026-11-04: loads properly
};

export const seo = {
  title: "Sekhar Javvadi — Founder, building OpenPlan AI",
  // Founder's instruction: the hero tagline moves out of the hero and into the meta description.
  description:
    "Turning complex workflows into software products. Founder and product builder from Bengaluru. Co-founded Spotmies (2019), built Reaidy.io, and now building OpenPlan AI, software for hardware teams.",
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
const anchorAliases: Record<string, string> = {};
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
  bio: "Founder based in Bengaluru. Hardware first, software since 2019, now building OpenPlan AI for teams that make physical products.",
  ctas: {
    primary: { label: "Explore OpenPlan AI", href: "#openplan" },
    secondary: { label: "Get in touch", href: "#contact" },
  },
  trail: [
    { label: "Co-founded Spotmies · 2019", href: "#spotmies" },
    { label: "Built Reaidy.io", href: "#reaidy" },
    { label: "Now building OpenPlan AI", href: "#openplan" },
  ],
  badgeHint: "Drag it · click to flip",
  badgeAlt: "Sekhar Javvadi's ID badge: Founder, OpenPlan AI",
  scroll: { label: "Scroll", href: "#story" },
};

/* ============================================================================================
   01 — Story (brief §2.2)
   ============================================================================================ */

export type StoryChapter = {
  id: string;
  badge: string; // sticker text; "Name · Year" is split into name and year on the sticker
  act: string;
  kicker: string;
  title: string;
  body: string;
  learned: string | { label: string; href: string };
};

export const story = {
  label: "01 — Story",
  title: "I build technology by understanding how people actually work.",
  // Not rendered: the founder chose a one-line section header (label + title only, no intro paragraph).
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
      body: `In 2019 I co-founded Spotmies${spotmiesCofounders ? " with " + spotmiesCofounders : ""}. We built web, mobile, AI and blockchain products for startups and businesses. The blockchain work included smart contracts, NFTs and decentralised apps.`,
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
      learned: { label: "→ See what I'm building", href: "#openplan" }, // the protected mat shows this as-is; the static list swaps the → for an animated icon
    },
  ] satisfies StoryChapter[],
  closing: "Every chapter has the same thread: make complex work easier to execute.",
  // Interface text on the cutting mat and reading card.
  mat: {
    tape: "Founder story · 4 chapters",
    groupLabel: "Founder story chapters",
    hintPointer: "Drag the badges · click one to read",
    hintTouch: "Swipe · tap a badge to read",
    hintKeys: "← → to change chapter",
    print: "Workbench · Bengaluru", // decorative mat printing (founder-approved wording)
    chapter: "Chapter",
    learned: "What it taught me",
    prev: "← Prev",
    next: "Next →",
  },
};
export type StoryMatText = typeof story.mat;

/* ============================================================================================
   02 — Now building: OpenPlan AI (brief §2.3)
   ============================================================================================ */

export const openplan = {
  label: "02 — Now building",
  title: "OpenPlan AI",
  // Founder-approved; matches openplanai.com. Rendered under the heading from step 2.
  lead: "OpenPlan AI is an AI planning layer for hardware teams that works alongside the PLM tools they already use." as
    | string
    | null,
  // Meta row under the lead (founder-approved). Stage: add "· in pilots with N teams" only if true.
  meta: ["Built and working", "For hardware teams", "Since 2026"],
  siteLink: { label: "openplanai.com", href: site.openplanUrl },
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
    primary: { label: "See the product", href: site.openplanUrl },
    secondary: { label: "Request a conversation", href: "#contact" },
    tertiary: { label: "Hardware team? Request a demo", href: `mailto:${site.email}?subject=OpenPlan%20demo` },
  },
  problemsLabel: "The problem",
  capabilitiesLabel: "What it does",
  // The boarding-pass card (field mapping approved by the user).
  ticket: {
    tier: "Now building",
    date: "Since 2026",
    passenger: "Hardware teams",
    from: "Spreadsheets",
    to: "One workspace",
    modules: "BOM · ECO · Tasks",
    status: "Built and working",
    since: "2026",
    site: "openplanai.com",
    headline: "Part → Change → Task",
    stamp: "Request a demo",
    sideLabels: ["The product", "Boarding pass"] as [string, string],
    labels: {
      pass: "Boarding pass",
      passenger: "Passenger",
      from: "From",
      to: "To",
      modules: "Modules",
      since: "Since",
      status: "Status",
      site: "Site",
      route: "Route",
      tear: "Tear here",
      tearAction: "Tear off the stub",
      reattach: "Reattach the stub",
      sides: "Ticket side",
    },
  },
  visual: {
    screenshot: null as string | null, // product screenshot(s) or a 10–15s muted looping MP4/WebM
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
    asOf: null as string | null, // "month year"
    scope: "Company figures",
    items: [
      { value: "40+", label: "projects delivered" },
      { value: "30+", label: "clients" },
      { value: "6+", label: "blockchain projects" },
      { value: "50-seat", label: "office in Visakhapatnam" },
    ],
  },
  reaidy: {
    asOf: null as string | null, // "month year"
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
    meta: meta("Co-founder & Technical Lead", spotmiesEndYear ? `2019 – ${spotmiesEndYear}` : "2019", "Visakhapatnam"),
    href: site.spotmiesUrl,
    // Logo from spotmies.com (white lettering, so it sits on a dark plate on the paper).
    logo: { src: "/brand/spotmies-logo.webp", width: 518, height: 112, alt: "Spotmies logo" },
    // Wording taken from the Spotmies chapter and summary (no new claims).
    chipsLabel: "What we built",
    chips: ["Web", "Mobile", "AI", "Blockchain", "Smart contracts", "NFTs", "dApps"],
    summary:
      "A software product and services company that turns business requirements into working web, mobile, AI and blockchain products.",
    owned: "Technical direction, architecture and product decisions, and delivering projects with the team.",
    metrics: metrics.spotmies,
    support: null as string | null, // was "Associated with AU Incubation Centre and A Hub, Andhra University." (entity unconfirmed)
    work: [
      { name: "CypherB", description: "Blockchain recruitment and verification platform.", role: null as string | null },
      { name: "Indie Skull Syndicate", description: "NFT and blockchain community project.", role: null as string | null },
      { name: "Nandikrushi", description: "Organic grocery app.", role: null as string | null },
    ],
    workFooter: "Built by the Spotmies team.",
    team: spotmiesCofounders,
  },
  reaidy: {
    id: "reaidy",
    name: "Reaidy.io",
    status: "Past venture", // reaidy.io is still live, so "No longer operating" read as false
    meta: meta(reaidyTitle, reaidyYears),
    href: site.reaidyUrl,
    // Logo from reaidy.io (logo_white), on a dark plate like the Spotmies one.
    logo: { src: "/brand/reaidy-logo.webp", width: 428, height: 64, alt: "Reaidy.io logo" },
    // Wording taken from the Reaidy summary (no new claims).
    chipsLabel: "The product",
    chips: ["AI mock interviews", "Scorecards", "Resume screening", "Recruiter portal"],
    summary:
      "A two-sided AI hiring platform: AI mock interviews and scorecards for candidates, bulk resume screening and a recruiter portal for companies.",
    metrics: metrics.reaidy,
    support: "Part of Microsoft for Startups Founders Hub.",
    whyStopped: null as string | null, // one honest sentence; shown under the metrics when filled
    lesson:
      "AI quality came from the whole workflow (interview state, question history, evaluation), not just the model.",
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
  // Labels inside the three diagrams (ink-orbit-features). Added for the UI, not from the brief.
  diagrams: {
    flow: {
      label: "People's everyday work flows through the product into sessions that keep running",
      hub: "Product",
      people: [
        "Recruiter · screening candidates",
        "Candidate · in an interview",
        "Engineer · revising a part",
        "Planner · raising a change order",
        "Reviewer · away",
      ],
      output: "Session",
    },
    // 03: the parts around the model (from the old "lessons": context, memory, evaluation, guardrails)
    parts: {
      label: "The model in the middle, with context, memory, evaluation and guardrails around it",
      items: ["Context", "Memory", "Evaluation", "Guardrails"],
      verb: "adding",
      idle: "around the model",
    },
    // 04: an illustrative usage curve; the tooltip shows no numbers
    chart: {
      label: "Usage growing over time, with a projected tail",
      values: [22, 26, 24, 31, 29, 36, 34, 41, 39, 47, 52, 58],
      projectedFrom: 8,
      point: "wk",
      projected: "projected",
    },
  },
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
  primary: { label: "Email me", href: `mailto:${site.email}` },
  copy: { idle: "Copy", done: "Copied" },
  location: site.location,
  marquee: "INVESTORS · HARDWARE TEAMS · BUILDERS · OPENPLAN AI ·", // optional; decision deferred
  footer: { copyright: "© 2026 Sekhar Javvadi", backToTop: "Back to top" },
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
