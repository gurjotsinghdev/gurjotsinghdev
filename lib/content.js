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
  role: "Web Design · Marketing · Product",
  location: "Vancouver, BC",
  locationPa: "ਵੈਨਕੂਵਰ, ਬੀ.ਸੀ",
  timezone: "America/Vancouver",
  since: "2019",

  // The one line that has to land.
  headline: ["Websites that", "pull their", "weight."],
  sub: "Design, marketing, and product thinking from one person. No agency layers, no handoffs, no waiting three weeks for a copy change.",

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
    id: "marketing",
    file: "MARKETING.TXT",
    name: "Marketing",
    tools: "Search · Content · Analytics",
    blurb:
      "The part that happens after launch. Getting found, staying found, and being able to tell which half of the spend is doing anything.",
    includes: [
      "Local and organic search",
      "Content that answers real queries",
      "Analytics set up so numbers mean something",
      "Monthly reporting in plain English",
    ],
  },
  {
    no: "03",
    id: "product",
    file: "PRODUCT.MD",
    name: "Product Management",
    tools: "Discovery · Roadmap · Delivery",
    blurb:
      "For teams building something bigger than a site. Working out what to build, in what order, and what to cut — then keeping it moving.",
    includes: [
      "Discovery and scoping",
      "Roadmaps that survive contact with reality",
      "Specs developers can actually build from",
      "Running delivery to a date",
    ],
  },
];

/** Real client work. Nothing invented. */
export const work = [
  { no: "01", name: "WWPMC", href: "https://wwpmc.com/", tags: ["WEB", "PROPERTY"] },
  { no: "02", name: "Sauna Viking", href: "https://saunaviking.com/", tags: ["WEB", "RETAIL"] },
  { no: "03", name: "Central Gas Services", href: "https://centralgasservices.com/", tags: ["WEB", "TRADES"] },
  { no: "04", name: "VPAC Construction", href: "https://vpacconstruction.com/", tags: ["WEB", "CONSTRUCTION"] },
  { no: "05", name: "Nero Tondo", href: "https://nerotondo.com/", tags: ["WEB", "BRAND"] },
  { no: "06", name: "Somy Digital", href: "https://somydigital.com/", tags: ["WEB", "MARKETING"] },
  // The old site pointed this at somydigital.com, which was wrong. No link
  // until the real one is confirmed.
  { no: "07", name: "Hitech Advisors", href: null, tags: ["WEB", "ADVISORY"] },
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
  "UI/UX", "Web Design", "Next.js", "WordPress", "SEO",
  "Content", "Analytics", "Brand", "Roadmapping", "Delivery",
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
    from: "$2,500",
    note: "Most small business sites land between $2,500 and $6,000 depending on page count and how much copy needs writing.",
    includes: ["Design and build", "Up to ~8 pages", "Mobile and speed pass", "Analytics + search basics", "Handover and training"],
  },
  {
    id: "marketing",
    name: "Marketing retainer",
    from: "$800/mo",
    note: "Ongoing search and content work. Month to month — no lock-in, cancel whenever it stops earning its keep.",
    includes: ["Local and organic search", "Content plan and writing", "Analytics and reporting", "Monthly review call"],
  },
  {
    id: "product",
    name: "Product engagement",
    from: "Day rate",
    note: "Discovery, roadmap and delivery support for teams building something larger. Scoped per engagement.",
    includes: ["Discovery workshops", "Roadmap and prioritisation", "Specs and acceptance criteria", "Delivery management"],
  },
];

export const faqs = [
  {
    file: "SCOPE.TXT",
    q: "How much will my site actually cost?",
    a: "You get a fixed price in writing before any work starts, based on a real conversation about what you need. Most small business sites land between $2,500 and $6,000. Nothing gets invoiced that was not in the scope.",
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
