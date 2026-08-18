/**
 * Every word, link and number the site renders.
 *
 * Anything not yet verified carries `pending: true`. The components render
 * those as visibly empty slots rather than as content — a placeholder that
 * looks like a real testimonial is just a lie with nicer typography.
 */

export const studio = {
  name: "GurjotWebDesign",
  person: "Gurjot Singh",
  role: "Web Design · SEO · Hosting",
  location: "Vancouver, BC",
  locationPa: "ਵੈਨਕੂਵਰ, ਬੀ.ਸੀ",
  timezone: "America/Vancouver",
  since: "2019",

  // The one line that has to land.
  headline: ["Websites that", "pull their", "weight."],
  sub: "Design, search, and the hosting that keeps it all standing — from one person. No agency layers, no handoffs, no waiting three weeks for a copy change.",

  statement:
    "Most small business sites are brochures that happen to be online. They look fine and do nothing. I build the other kind — sites where the structure, the copy and the search work are all pointed at the same outcome, because the same person did all three.",
};

export const links = {
  whatsapp:
    "https://wa.me/17789290374?text=Hi%20Gurjot%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  whatsappLabel: "+1 778-929-0374",
  email: "mailto:hello@gurjotsingh.dev",
  emailLabel: "hello@gurjotsingh.dev",
  github: "https://github.com/gurjotsinghdev",
  codepen: "https://codepen.io/gurjotsinghdev/",
  stackoverflow: "https://stackoverflow.com/users/17474663/gurjot-singh",
  resume: "/resume.pdf",
};

/** The ticker strip. All of it is true, which is the only rule here. */
export const ticker = [
  "VANCOUVER, BC",
  "WORKING WITH CLIENTS ANYWHERE",
  "ONE PERSON, START TO FINISH",
  "OPEN FOR PROJECTS",
  "NO TEMPLATES",
];

export const services = [
  {
    no: "01",
    id: "design",
    file: "DESIGN.FIG",
    name: "Web Design",
    tools: "Figma · Next.js · WordPress",
    blurb:
      "The site itself — structure, layout, and the build. Designed around what a visitor is actually there to do, then built to be fast on a bad connection.",
    includes: [
      "Design and build, start to finish",
      "Mobile-first, tested on real devices",
      "Copy structure, not lorem boxes",
      "Handover you can edit yourself",
    ],
  },
  {
    no: "02",
    id: "seo",
    file: "SEO.TXT",
    name: "SEO",
    tools: "Local · Technical · Content",
    blurb:
      "Getting found by the people already searching for what you do. Local first, because that is where the work actually comes from.",
    includes: [
      "Google Business Profile done properly",
      "Technical fixes: speed, crawl, schema",
      "Pages that answer real queries",
      "Rank and traffic reporting in plain English",
    ],
  },
  {
    no: "03",
    id: "hosting",
    file: "HOSTING.SH",
    name: "Hosting & Maintenance",
    tools: "Uptime · Backups · Updates",
    blurb:
      "The unglamorous half. Your site stays up, stays patched, and stays backed up — and somebody picks up the phone when it does not.",
    includes: [
      "Managed hosting, SSL included",
      "Backups you can actually restore from",
      "Core, theme and plugin updates",
      "Uptime monitoring and a real human to call",
    ],
  },
];

/**
 * Real client work. Nothing invented.
 *
 * `image` is the drop-in slot for a real screenshot — put a file at
 * `public/img/work/<slug>.jpg` and set it here. Until then each card draws its
 * own generated cover, so the gallery is finished either way.
 */
export const work = [
  { no: "01", slug: "wwpmc", name: "WWPMC", href: "https://wwpmc.com/", sector: "Property management", tags: ["WEB", "PROPERTY"], image: null },
  { no: "02", slug: "sauna-viking", name: "Sauna Viking", href: "https://saunaviking.com/", sector: "Retail", tags: ["WEB", "RETAIL"], image: null },
  { no: "03", slug: "central-gas", name: "Central Gas Services", href: "https://centralgasservices.com/", sector: "Trades", tags: ["WEB", "SEO"], image: null },
  { no: "04", slug: "vpac", name: "VPAC Construction", href: "https://vpacconstruction.com/", sector: "Construction", tags: ["WEB", "PORTFOLIO"], image: null },
  { no: "05", slug: "nero-tondo", name: "Nero Tondo", href: "https://nerotondo.com/", sector: "Brand", tags: ["WEB", "BRAND"], image: null },
  { no: "06", slug: "somy-digital", name: "Somy Digital", href: "https://somydigital.com/", sector: "Agency", tags: ["WEB", "SEO"], image: null },
  // The old site pointed this at somydigital.com, which was wrong. No link
  // until the real one is confirmed.
  { no: "07", slug: "hitech-advisors", name: "Hitech Advisors", href: null, sector: "Advisory", tags: ["WEB", "ADVISORY"], image: null },
];

/**
 * Proof.
 *
 * Deliberately empty. These render as marked-up empty slots so the layout is
 * finished and the content is obviously outstanding — fill `quote`, `person`
 * and `company`, then flip `pending` to false.
 */
export const testimonials = [
  { id: "t1", pending: true, quote: "", person: "", company: "" },
  { id: "t2", pending: true, quote: "", person: "", company: "" },
  { id: "t3", pending: true, quote: "", person: "", company: "" },
];

/** Same rule: a number goes here only once it can be stood behind. */
export const metrics = [
  { id: "m1", label: "Sites shipped", value: work.length, suffix: "", pending: false },
  { id: "m2", label: "Years doing this", value: 6, suffix: "", pending: false },
  { id: "m3", label: "Avg. load time", value: null, suffix: "s", pending: true },
  { id: "m4", label: "Organic traffic lift", value: null, suffix: "%", pending: true },
];

export const capabilities = [
  "Web Design", "UI/UX", "Next.js", "WordPress", "Local SEO",
  "Technical SEO", "Content", "Analytics", "Hosting", "Maintenance",
];

/** How a project actually runs. Four steps, no mystique. */
export const process = [
  {
    no: "01",
    file: "BRIEF",
    title: "Tell me what is broken",
    body: "A call or a long message. What the business does, who it sells to, and what the current site fails to do. No form with eleven required fields.",
  },
  {
    no: "02",
    file: "SCOPE",
    title: "You get a fixed number",
    body: "A written scope and a price before anything starts. If the honest answer is that you do not need a new site, I will say so.",
  },
  {
    no: "03",
    file: "BUILD",
    title: "You see it as it goes",
    body: "Design first, then build, with a live link from early on. Revisions are expected, not billed as extras.",
  },
  {
    no: "04",
    file: "LIVE",
    title: "Launch, then the boring part",
    body: "Analytics wired up, search basics done, and a handover so you can edit it. Ongoing marketing is optional, never assumed.",
  },
];

export const pricing = [
  {
    id: "site",
    name: "Website",
    from: "$1,499",
    cadence: "flat, one time",
    note: "One price for the whole site. Not a starting point that creeps — the number you are quoted is the number you pay.",
    includes: [
      "Design and build, start to finish",
      "Mobile and speed pass",
      "Search basics and analytics wired up",
      "Handover and training",
      "No hourly billing, ever",
    ],
  },
  {
    id: "seo",
    name: "SEO",
    from: "$399",
    cadence: "per month",
    note: "Ongoing local and organic search work. Month to month — cancel whenever it stops earning its keep.",
    includes: [
      "Google Business Profile",
      "Technical and on-page fixes",
      "Content plan and writing",
      "Monthly rank and traffic report",
    ],
  },
  {
    id: "care",
    name: "Hosting & maintenance",
    from: "$100",
    cadence: "per month",
    note: "Managed hosting plus the upkeep that stops a site quietly rotting. Cancel any time and you keep everything.",
    includes: [
      "Managed hosting + SSL",
      "Daily backups",
      "Updates and security patching",
      "Uptime monitoring",
      "Small edits included",
    ],
  },
];

export const faqs = [
  {
    file: "SCOPE.TXT",
    q: "What does a site actually cost?",
    a: "$1,499 for the site, flat. Not a starting point, not an hourly estimate that drifts — one number, agreed in writing before anything starts. If what you need genuinely falls outside that, I will tell you before you commit, not halfway through.",
  },
  {
    file: "TIMELINE.TXT",
    q: "How long does it take?",
    a: "A typical small business site is three to five weeks end to end. The slow part is almost never the build — it is waiting on copy, photos and feedback, so the more of that you have ready, the faster it goes.",
  },
  {
    file: "STACK.TXT",
    q: "What do you build on?",
    a: "WordPress when you want to edit it yourself without me, Next.js when speed and custom behaviour matter more. I will recommend one and explain why rather than defaulting to whatever I feel like using.",
  },
  {
    file: "AFTER.TXT",
    q: "What happens after launch?",
    a: "You own everything and you can edit it. If you want ongoing search and content work that is a separate monthly arrangement, and it is genuinely optional — plenty of clients launch and manage it themselves.",
  },
  {
    file: "SOLO.TXT",
    q: "It is just you. What if you disappear?",
    a: "Fair question. Everything is built on standard tooling with no proprietary lock-in, you get the accounts and the code, and any competent developer can pick it up. That is deliberate.",
  },
];
