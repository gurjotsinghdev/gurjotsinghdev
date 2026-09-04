/* Per-industry Canadian context, a starting-point list, and two more
   questions each. Written per industry rather than shared. */

const IND_EXTRA = {

restaurants: {
  h:'The Canadian restaurant market, specifically',
  p:[
    'Canadian hospitality runs on thin margins and short seasons, and the website sits directly on both. Delivery platforms take a substantial cut of every order they carry, so any order you capture directly is worth considerably more than the same order through an app. That single fact justifies most of what a restaurant site should be built to do.',
    'Seasonality is sharper here than in most markets. Patio season, tourist season and the December run each behave differently, and a site that only sells one version of the restaurant leaves the other months underserved. Being able to change the emphasis without a developer is a practical requirement rather than a convenience.',
    'Bilingual considerations matter in some markets and not others. If you operate in Quebec, or serve a francophone customer base elsewhere, that has to be planned into the build rather than added afterwards, because retrofitting a second language into a site that assumed one is consistently painful and expensive.'
  ],
  start:['A menu rebuilt as web content so it can be updated in minutes','Hours, address and phone confirmed correct everywhere they appear','Booking or ordering reduced to a single obvious action','Photographs compressed so the site is usable on mobile data','Google Business Profile brought up to date with current photos and hours','Structured data so search engines read the restaurant properly'],
  faq2:[
    { q:'Should we build our own ordering instead of using an app?', a:'If direct orders are a meaningful share of revenue, the commission you keep usually pays for the build quickly. If ordering is marginal, a prominent phone number serves you better.' },
    { q:'Do we need a French version?', a:'In Quebec, effectively yes. Elsewhere it depends on your customer base. Either way it is far cheaper planned in than added later.' }
  ]
},

'real-estate': {
  h:'The Canadian real estate market, specifically',
  p:[
    'Canadian real estate carries constraints that shape the website directly. Listing data access varies by board, and what you may display, and for how long, is governed by rules that differ across the country. Building as though a national feed exists produces a site that cannot be launched.',
    'Advertising rules also differ by province. Real estate councils regulate how agents may describe themselves, what disclosure is required, and how brokerage identification must appear. Those requirements belong in the template rather than in a reminder to whoever writes the next page.',
    'The market itself moves in cycles that affect what the site should emphasise. In a fast market the site is a listing pipeline; in a slow one it is a credibility and education tool, and the agents who keep working through the slow periods are usually the ones with neighbourhood content that keeps attracting people who are not ready to transact yet.'
  ],
  start:['Listings restructured as records with real fields rather than pages','An indexable URL for every property, past and present','Sold listings retained and clearly marked','Filtering that matches how buyers actually search','Brokerage identification and disclosure built into the template','Neighbourhood pages that keep earning between listings'],
  faq2:[
    { q:'Can we display listings from our board?', a:'It depends on the board and your data access agreement. What may be shown, and for how long, varies across the country and has to be confirmed before the build.' },
    { q:'What disclosure has to appear on the site?', a:'That is set by your provincial council and typically covers brokerage identification and how you describe yourself. It belongs in the template so it cannot be forgotten.' }
  ]
},

'trades-and-home-services': {
  h:'The Canadian trades market, specifically',
  p:[
    'Canadian weather does more to shape trades demand than anything a marketer can do. The first hard freeze produces furnace calls, the first heatwave produces air conditioning calls, and the spring thaw produces water. Those weeks are not a marketing opportunity so much as a capacity test.',
    'Licensing and insurance requirements vary by province and by trade, and customers increasingly check. Making your licence number, insurance and any relevant certification easy to find shortens the decision and separates you from the operators who cannot show one.',
    'Service areas in Canada are frequently large and awkwardly shaped, covering several municipalities that people search for by name. A site that names only the city it is based in is invisible to a customer two suburbs away who is searching with their own place name. Naming the areas you genuinely serve is one of the cheapest improvements available.'
  ],
  start:['A tappable phone number that never scrolls out of reach','Splitting the single services page into one page per service','Area pages for the municipalities you actually cover','Page weight cut so the site holds up during a seasonal spike','Licence, insurance and warranty details made easy to find','Real photographs of your own crews and completed work'],
  faq2:[
    { q:'How many area pages should we build?', a:'Only for places you genuinely serve and want work in. A page for somewhere you would decline to travel wastes effort and disappoints the caller.' },
    { q:'Can the site handle a seasonal traffic spike?', a:'Only if it was built for it. Lean pages, proper caching and hosting that can cope are the difference between capturing that week and losing it.' }
  ]
},

'healthcare-and-clinics': {
  h:'The Canadian healthcare context, specifically',
  p:[
    'Healthcare websites in Canada operate under privacy legislation that constrains ordinary web practice. PIPEDA applies federally, and most provinces layer their own health information legislation on top. The practical consequence is that a website should not be collecting, transmitting or storing clinical information at all.',
    'Accessibility obligations are also tightening. Ontario has had enforceable requirements for years and other provinces are following, and organisations receiving public funding are frequently expected to meet WCAG regardless of where they operate. Building to that standard from the start is straightforward; retrofitting after an audit is not.',
    'Provincial coverage differences drive a large share of patient questions. Whether a service is covered, what a referral requires, and what a patient will pay out of pocket varies across the country, and answering those questions plainly on the site removes a meaningful volume of calls from reception.'
  ],
  start:['New patient status and coverage answered on the first screen','An accessibility review against WCAG, with fixes prioritised','Sensitive information removed from ordinary website forms','A practitioner directory rebuilt as structured records','Hours, location, parking and transit made easy to find','Booking handed to a system designed for healthcare'],
  faq2:[
    { q:'Does PIPEDA apply to our website?', a:'If the site collects personal information, yes, alongside provincial health privacy law. The safest position is that clinical details never travel through the website at all.' },
    { q:'How much does accessibility work add?', a:'Very little when built in from the start, because it is mostly discipline rather than extra features. Retrofitting is where the cost appears.' }
  ]
},

'professional-services': {
  h:'The Canadian professional services context, specifically',
  p:[
    'Most Canadian professions are regulated provincially, and those regulators set rules about advertising that apply directly to your website. Law societies, CPA bodies and others restrict guarantees, comparative claims and in some cases testimonials. Copy that ignores this is a risk to your licence, not just your marketing.',
    'The regulated structure also means your credentials carry weight that marketing language does not. Designation, jurisdiction and standing are what a prospective client is actually checking, and presenting them clearly does more than any amount of persuasive writing.',
    'Cross-border and cross-provincial work adds a further wrinkle. Where you are licensed to practise determines who you can take on, and being explicit about that on the site prevents enquiries you have to decline and reassures the ones you can accept.'
  ],
  start:['Named people with genuine credentials and real photographs','Broad service categories split into specific situations','Content that demonstrates expertise rather than asserting it','Copy reviewed against your regulator’s advertising rules','Jurisdictions and practice areas stated explicitly','Tracking that survives a months-long buying cycle'],
  faq2:[
    { q:'Can we publish client testimonials?', a:'It depends on your profession and province, and some regulators restrict them entirely. Worth confirming with your regulator before publishing rather than after.' },
    { q:'How specific should service pages be?', a:'More specific than feels comfortable. Clients self-select by situation, so a page describing their exact circumstance beats a page describing your category.' }
  ]
},

construction: {
  h:'The Canadian construction context, specifically',
  p:[
    'Construction in Canada is governed by provincial building codes, licensing regimes and workers compensation boards that differ meaningfully across the country. For commercial and institutional work, standing with those bodies is a qualification criterion checked before anything else is considered.',
    'Bonding and insurance capacity function the same way. A prospective institutional client wants to establish early whether you can carry the project, and a site that makes that easy to confirm gets shortlisted while one that does not gets passed over silently.',
    'The labour shortage is the other defining feature of the Canadian market. Skilled trades vacancies are persistent, which means recruitment is a business-critical function rather than an afterthought, and the website is one of the few channels reaching candidates who are not actively applying anywhere.'
  ],
  start:['Project pages built around real photographs and real scope','Separate paths for residential and commercial enquiries','Licensing, WCB standing, bonding and insurance made prominent','A careers section that genuinely accepts applications','Image-heavy galleries optimised so they stay fast','Service areas and project types stated explicitly'],
  faq2:[
    { q:'What do commercial clients check first?', a:'Capability and qualification: comparable projects, safety record, bonding and insurance. Those belong where they can be found in seconds.' },
    { q:'Can the website help with hiring?', a:'Frequently more than it helps with sales. A real careers section converts traffic you are already receiving into applications.' }
  ]
},

'ecommerce-and-retail': {
  h:'The Canadian ecommerce context, specifically',
  p:[
    'Selling online in Canada is complicated by tax and geography in ways that catch out stores built for a single market. GST, HST and PST vary by destination province, and getting the calculation wrong produces either abandoned checkouts or a reconciliation problem at year end.',
    'Shipping is the other structural challenge. Costs to remote and northern destinations can exceed the value of the order, and customers who discover that at the final step abandon at a very high rate. Showing shipping early, or building it into pricing, is usually the better trade.',
    'Currency and cross-border expectations matter too. Canadian shoppers frequently encounter US pricing and have learned to check, so stating prices clearly in Canadian dollars, and being explicit about duties for cross-border orders, removes hesitation at exactly the moment it costs you the sale.'
  ],
  start:['Product pages measured and fixed for mobile load time','Product data restructured to drive search, filters and schema','Guest checkout enabled and steps reduced','Shipping cost surfaced before the final step','Provincial tax verified by destination','The whole checkout tested on real phones'],
  faq2:[
    { q:'How should we handle shipping to remote areas?', a:'Show the real cost early or build it into pricing. Discovering it at checkout is one of the most reliable ways to lose an order.' },
    { q:'Do we need to show prices in Canadian dollars?', a:'Yes, explicitly. Canadian shoppers are used to encountering US pricing and will hesitate if the currency is ambiguous.' }
  ]
},

'publishing-and-media': {
  h:'The Canadian publishing context, specifically',
  p:[
    'Canadian publishers operate in a market where distribution has become genuinely uncertain. Platform policy changes have altered how news reaches readers here more sharply than in most countries, and publishers who had built their audience on referral traffic found it could disappear on a policy decision.',
    'That makes owned channels disproportionately valuable. Search traffic, direct visits and email lists are the parts of the audience nobody else can switch off, which is an argument for investing in article-level SEO and in a site fast enough to keep the readers it earns.',
    'Advertising revenue per reader is also lower here than in larger markets, which means the operational cost of publishing matters more. An editorial workflow that saves ten minutes per article is worth real money at volume, and it is the sort of improvement that compounds quietly rather than announcing itself.'
  ],
  start:['Archive and category queries rebuilt so they stay fast at volume','Ad slots given reserved space so the page stops jumping','The editorial workflow simplified for daily use','Every article made to work as a standalone entry point','Related content chosen by relevance rather than recency','Article schema with author and publication dates'],
  faq2:[
    { q:'How do we reduce dependence on platform traffic?', a:'By investing in the channels nobody else controls: search, direct and email. Article-level SEO and a fast site are the foundation of all three.' },
    { q:'Can editorial publishing be made faster?', a:'Usually substantially. Most publishers lose minutes per article to formatting that sensible defaults and reusable blocks remove entirely.' }
  ]
},

'nonprofits-and-associations': {
  h:'The Canadian nonprofit context, specifically',
  p:[
    'Registered Canadian charities carry reporting obligations that donors and funders increasingly check directly. The T3010 return is public, and grant applications routinely ask for governance and financial transparency. A site that presents that information openly builds trust rather than merely satisfying a requirement.',
    'Tax receipting is the operational detail that most affects the donation flow. Receipts must meet CRA requirements, and the information needed to issue one shapes what the donation form has to collect. Designing the form without that in mind produces either non-compliant receipts or a manual cleanup after every campaign.',
    'Funding cycles also drive the calendar. Many organisations see the majority of individual giving in December, which means the donation flow must be tested and fast well before it matters. Discovering a broken mobile checkout on the twenty-eighth of December is an expensive way to learn.'
  ],
  start:['The donation flow shortened and tested on mobile','Recurring giving promoted rather than buried','Membership renewals and event registration automated','Board, financials and reporting made easy to find','An accessibility review, particularly for publicly funded work','Documentation written for the next volunteer'],
  faq2:[
    { q:'What does the donation form need to collect?', a:'Whatever your receipting requires under CRA rules, and as little else as possible. Every additional field costs completed gifts.' },
    { q:'When should we test the donation flow?', a:'Well before December. A large share of individual giving arrives in a few weeks, and that is the worst possible time to discover a problem.' }
  ]
},

'manufacturing-and-industrial': {
  h:'The Canadian manufacturing context, specifically',
  p:[
    'Canadian manufacturers usually sell into a market larger than Canada, which means the website is doing double duty: serving domestic buyers and acting as the first credibility check for buyers across the border and overseas. Being explicit about which markets you serve prevents wasted enquiries in both directions.',
    'Certification and standards carry disproportionate weight. CSA, ULC and industry-specific approvals are qualification criteria for a great deal of Canadian work, and a buyer who cannot confirm your certification quickly will move on to a supplier whose site makes it obvious.',
    'Metric and imperial both remain in daily use, frequently within the same organisation. Specifications given in only one system quietly exclude part of your audience, and providing both removes a small but real point of friction at exactly the moment a buyer is checking whether your product fits.'
  ],
  start:['Full specifications published rather than gated behind a form','The catalogue restructured for attribute-based filtering','Datasheets and certifications made downloadable','Content written for specifier, procurement and approver alike','A clear where-to-buy or distributor path','Specifications given in both metric and imperial'],
  faq2:[
    { q:'Should we publish certifications on the site?', a:'Yes, prominently. For a great deal of Canadian industrial work they are a qualification criterion checked before anything else.' },
    { q:'Metric or imperial?', a:'Both. They remain in parallel use across Canadian industry, often inside the same company, and offering one excludes part of your audience.' }
  ]
}

};

module.exports = { IND_EXTRA };
