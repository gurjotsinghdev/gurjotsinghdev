/* Ten industry pages. Chosen to match work Gary has actually done and the
   sectors that carry real search demand in Canada. No case studies. */

const INDUSTRIES = [

{ slug:'restaurants', name:'Restaurants & Hospitality', short:'Restaurants',
  kw:'Restaurant Web Design Canada', p1:'#F0A73C', p2:'#5C2410', art:'restaurants',
  lede:'Websites for restaurants, cafes and bars where the menu changes, the phone rings at dinner service, and almost every visitor is on a phone.',
  sections:[
    { h:'Almost everyone arrives on a phone, hungry', p:[
      'Restaurant traffic is overwhelmingly mobile and overwhelmingly urgent. Somebody is standing on a street, or sitting in a car, deciding where to eat in the next twenty minutes. They want four things: are you open, where are you, what do you serve, and can I book.',
      'That reorders everything. Hours, location and a booking route belong above the fold. A full-screen video of the dining room does not. The most common failure in restaurant web design is treating the site as a mood piece when the visitor is trying to make a decision under time pressure.'
    ]},
    { h:'The menu is the page people actually want', p:[
      'Menus are the most visited page on almost every restaurant site, and they are frequently the worst built. A PDF is the classic mistake: it is unreadable on a phone, invisible to search engines, and a chore to update, which means it goes stale.',
      'A menu should be real web content. That makes it searchable, readable at any size, and editable in two minutes when a dish changes. It also lets you mark it up so search engines understand the dishes and prices rather than seeing an opaque file.'
    ]},
    { h:'Reservations without friction', p:[
      'Whatever booking platform you use, the integration matters more than the platform. A booking link that opens a slow third-party page, loses the party size, or fails on mobile costs covers every single night.',
      'The same applies to ordering. If you take direct orders, the path from menu to checkout should be short and obvious, because every extra step is a percentage of orders lost to a delivery app that takes a cut.'
    ]},
    { h:'Local search is where the customers are', p:[
      'For restaurants, the map results are the battleground. A properly configured Google Business Profile with current hours, real photographs, correct categories and a steady flow of recent reviews will bring in more covers than almost any change to the website itself.',
      'The site supports that rather than replacing it. Consistent name, address and hours across the web, structured data describing the restaurant, and pages that answer the questions people actually search: the cuisine, the neighbourhood, whether you take walk-ins.'
    ]}
  ],
  needs:['Menu as real web content, never a PDF','Hours and location visible without scrolling','Booking or ordering reachable in one tap','Photographs compressed properly so they load on mobile data','Google Business Profile configured and maintained','Structured data describing the restaurant and its menu'],
  faq:[
    { q:'Should our menu be a PDF?', a:'No. PDFs are hard to read on a phone, largely invisible to search engines, and awkward to update, so they go out of date. A menu built as web content solves all three.' },
    { q:'Do we need online ordering on our own site?', a:'If a meaningful share of your orders are direct, yes, because delivery platforms take a significant cut. If ordering is a small part of the business, a clear phone number may serve you better.' },
    { q:'How often should the site be updated?', a:'Whenever the menu, hours or team change. That is the argument for building it so your staff can make those edits without calling anyone.' },
    { q:'What matters most for getting found?', a:'For restaurants, the Google Business Profile usually outweighs everything else, followed by page speed on mobile. Both are fixable quickly.' }
  ]
},

{ slug:'real-estate', name:'Real Estate & Property', short:'Real Estate',
  kw:'Real Estate Web Design Canada', p1:'#8FB8FF', p2:'#12275C', art:'real-estate',
  lede:'Sites for agents, brokerages and property developers, where listings change constantly and every property needs its own page.',
  sections:[
    { h:'Listings are structured data, not pages', p:[
      'The defining problem in real estate web design is that properties are structured records: price, beds, baths, square footage, status, location, gallery. Entering that as free-form page content produces a site that cannot filter, sort or display consistently, and gets worse with every listing added.',
      'Built properly, a property is a record with defined fields. The templates then render every listing identically, filtering works, and adding the hundredth property takes exactly as long as the first.'
    ]},
    { h:'Every property needs its own indexable page', p:[
      'A listing that only exists inside a JavaScript-driven search widget is invisible to search engines. Buyers searching a specific address, building or neighbourhood will never find it.',
      'Each property should have a real URL with a real page behind it, marked up so search engines understand the price, the location and the availability. That is also what allows a single listing to be shared, linked and found long after it drops out of the search widget.'
    ]},
    { h:'Sold listings are an asset, not clutter', p:[
      'The instinct is to delete sold properties. That throws away pages that have accumulated ranking and links, and it removes the evidence that you actually sell things.',
      'Keeping them, clearly marked as sold, preserves the search value and gives buyers and vendors a real record of activity in their area. It is one of the easiest wins in real estate SEO and one of the most commonly missed.'
    ]},
    { h:'Neighbourhood content is the long game', p:[
      'Listings turn over. Neighbourhood pages do not. Content about a specific area, what it is like, what sells there, what buyers should know, keeps earning traffic for years and attracts people earlier in their decision than a listing search does.',
      'For Canadian agents this is where local expertise becomes visible. Anyone can list a property; describing a neighbourhood accurately demonstrates that you actually work there.'
    ]}
  ],
  needs:['Properties as structured records rather than free-form pages','A real, indexable URL for every listing','Filtering by price, type, beds and location','Sold listings retained and marked, not deleted','Property schema so search engines read the details','Neighbourhood and area content that outlives listings'],
  faq:[
    { q:'Can the site pull listings automatically?', a:'Often yes, depending on your board and feed access. Where a feed is not available, listings are managed through a properly structured admin instead of hand-built pages.' },
    { q:'Should sold properties be removed?', a:'No. Mark them sold and keep them. They hold accumulated search value and they demonstrate genuine activity in an area.' },
    { q:'Do we need a map search?', a:'Only if buyers actually use it. Map interfaces are expensive to build well and slow on mobile, and a good filtered list often converts better.' },
    { q:'What ranks a real estate site?', a:'Individual property pages, neighbourhood content and local signals. A single page listing everything will not rank for anything specific.' }
  ]
},

{ slug:'trades-and-home-services', name:'Trades & Home Services', short:'Trades & Home Services',
  kw:'Web Design for Trades Canada', p1:'#7CFF3F', p2:'#0B7A4B', art:'trades',
  lede:'Sites for plumbers, electricians, HVAC, roofing and other trades, where the search is usually urgent and the winner is whoever answers first.',
  sections:[
    { h:'Most of these searches are emergencies', p:[
      'Somebody with a burst pipe or a failed furnace is not researching. They are on a phone, often in poor conditions, looking for the first credible business that can come today. The entire site should be built around that person.',
      'That means the phone number is the most important element on the page, tappable, visible without scrolling, and repeated. It means the service area is stated plainly. And it means the page has to load in about two seconds, because a panicking customer will not wait.'
    ]},
    { h:'A page per service, and a page per area', p:[
      'Trades businesses commonly have one page listing everything they do across everywhere they work, and consequently rank for none of it. Search engines cannot tell what the page is about, because it is about twelve things.',
      'Separating it, a real page for furnace repair, another for drain cleaning, and area pages for the places you genuinely serve, gives each search term something specific to match. This is the single highest-return structural change for most trades sites.'
    ]},
    { h:'Seasonal spikes are the whole year', p:[
      'For a great deal of Canadian trades work, a large share of annual revenue arrives in a handful of weeks: the first hard freeze, the first heatwave, the spring thaw. Traffic in those weeks can be many times normal.',
      'A site on cheap shared hosting with uncompressed images will be at its slowest exactly then. Preparing for the spike, lean pages, proper caching, hosting that can cope, is much cheaper than losing the calls that pay for the year.'
    ]},
    { h:'Trust, quickly', p:[
      'Home services are bought on trust, because you are letting a stranger into your house. Licence and insurance details, real photographs of real jobs, warranty terms and genuine reviews do more than any amount of design polish.',
      'Photographs of your own vans, team and completed work outperform stock imagery decisively. A visitor can tell the difference immediately, and stock photography quietly signals that there is nothing real to show.'
    ]}
  ],
  needs:['A tappable phone number visible without scrolling','One page per service, not one page for all of them','Area pages for the places you genuinely serve','Loading fast enough for an urgent search on mobile data','Licence, insurance and warranty details easy to find','Real photographs of your own work, not stock'],
  faq:[
    { q:'Do we need a contact form?', a:'Have one, but do not rely on it. For urgent work most customers call. The form serves the ones who are browsing outside hours.' },
    { q:'How many service pages should we have?', a:'One per service you genuinely want work in. Each is a chance to rank; a combined page is not.' },
    { q:'Are reviews worth chasing?', a:'For trades, yes, more than almost any other sector. Recent reviews affect both local ranking and whether somebody calls you instead of the next result.' },
    { q:'Is an emergency call-out page worth building?', a:'If you offer emergency service, absolutely. It targets a distinct high-intent search and those customers rarely price-shop.' }
  ]
},

{ slug:'healthcare-and-clinics', name:'Healthcare & Clinics', short:'Healthcare & Clinics',
  kw:'Healthcare Web Design Canada', p1:'#5EE9D4', p2:'#0A4A44', art:'healthcare',
  lede:'Sites for clinics, practitioners and healthcare organisations, where accuracy, privacy and accessibility are requirements rather than preferences.',
  sections:[
    { h:'Patients are looking for specific, practical answers', p:[
      'Healthcare visitors arrive with narrow questions: are you accepting new patients, do you take my coverage, where do I park, what are your hours, which practitioner treats this. Sites that lead with mission statements and stock photography answer none of them.',
      'Putting those answers where they can be found in seconds reduces phone calls to reception, which is a measurable operational saving as well as a better experience for the patient.'
    ]},
    { h:'Accessibility is not optional here', p:[
      'A healthcare audience includes people with visual, motor and cognitive impairments at a higher rate than the general population, and provincial accessibility legislation increasingly applies. Building to WCAG standards is both a legal and a practical requirement.',
      'In practice that means sufficient colour contrast, full keyboard navigation, properly labelled forms, a logical heading order and text alternatives for images. Built in from the start it costs very little; retrofitted after a complaint or an audit it is expensive and disruptive.'
    ]},
    { h:'Privacy shapes what the site may do', p:[
      'Health information is regulated under PIPEDA and provincial legislation, and that constrains ordinary web practice. A contact form that emails unencrypted patient details, or analytics that capture identifying information, can create a genuine compliance problem.',
      'The safe pattern is to keep clinical information out of the website entirely. The site books, informs and directs; anything sensitive goes through a system built for it.'
    ]},
    { h:'Directories and practitioner listings', p:[
      'Multi-practitioner organisations need a real directory: searchable, filterable, and structured so each practitioner has a consistent profile. Built as ordinary pages it becomes unmaintainable within a year and inconsistent within two.',
      'Structured properly, adding or removing a practitioner is a form submission rather than a development task, and every profile displays identically wherever it appears.'
    ]}
  ],
  needs:['New patient status and coverage answered immediately','WCAG accessibility built in rather than retrofitted','No sensitive information travelling through website forms','A structured, filterable practitioner directory','Hours, location and parking easy to find','Clear separation between information and booking systems'],
  faq:[
    { q:'Can patients book through the website?', a:'Yes, via a booking system designed for healthcare. The website should link to it rather than attempt to collect clinical details itself.' },
    { q:'Do we have to meet accessibility standards?', a:'Increasingly yes, depending on province and organisation type. Beyond the legal position, a meaningful share of your patients need it to use the site at all.' },
    { q:'Is it safe to use a normal contact form?', a:'For general enquiries yes. For anything a patient might describe about their health, no. That needs a system built for handling it.' },
    { q:'How do we manage a large practitioner list?', a:'As structured records with defined fields, which keeps every profile consistent and makes the directory filterable.' }
  ]
},

{ slug:'professional-services', name:'Professional Services', short:'Professional Services',
  kw:'Professional Services Web Design Canada', p1:'#B8B8B8', p2:'#2A2A2A', art:'professional',
  lede:'Sites for accountants, lawyers, consultants and advisors, where the buyer is comparing credibility and the sales cycle is long.',
  sections:[
    { h:'Credibility is the entire product', p:[
      'Professional services buyers are not comparing features. They are deciding whether to trust someone with their money, their legal position or their business. The website is often the first and sometimes only evidence they have before making contact.',
      'That means named people with real photographs and real credentials, specific descriptions of the work rather than category words, and content that demonstrates expertise rather than asserting it. Anonymous stock-photo professionalism achieves the opposite of its intent.'
    ]},
    { h:'Specific services, not service categories', p:[
      'A page titled Tax Services competes with everyone. A page about corporate tax for owner-managed businesses in your province competes with far fewer people and speaks directly to somebody who has that exact problem.',
      'Professional services is one of the sectors where specificity is most valuable, because clients self-select by situation. The narrower page attracts fewer visitors and considerably better ones.'
    ]},
    { h:'Long consideration, so the site must hold up', p:[
      'Somebody may read your site several times across months before contacting you. It will be read carefully rather than skimmed, which means thin content is more damaging here than in sectors that buy quickly.',
      'That is an argument for substance: articles that genuinely explain something, clear descriptions of how you work, honest information about how engagements start. It is also an argument for tracking that survives a long gap between first visit and enquiry.'
    ]},
    { h:'Regulatory constraints on what you may claim', p:[
      'Many Canadian professional bodies restrict how members may advertise: guarantees of outcome, comparative claims, and certain testimonials can breach professional conduct rules.',
      'Good copy works within that rather than ignoring it. Describing process, experience and approach precisely is more persuasive than a superlative, and it does not put your licence at risk.'
    ]}
  ],
  needs:['Named people with genuine credentials and photographs','A page per specific service, not per broad category','Substantial content that demonstrates rather than asserts expertise','Tracking that survives a months-long consideration period','Copy that respects professional advertising rules','A clear, low-friction first step for enquiries'],
  faq:[
    { q:'Do we need a blog?', a:'You need content that demonstrates expertise. Whether it is called a blog matters less than whether it answers questions your clients actually ask.' },
    { q:'Should we publish pricing?', a:'It depends on the work. Publishing ranges filters out poor fits and saves everyone time; for genuinely bespoke work, describing how pricing is arrived at is usually better.' },
    { q:'Are testimonials allowed?', a:'Sometimes, with constraints that vary by profession and province. It is worth checking your regulator before publishing rather than after.' },
    { q:'How long until a professional services site produces enquiries?', a:'Generally slower than transactional sectors, because the buying cycle itself is long. The trade-off is that each enquiry is usually worth considerably more.' }
  ]
},

{ slug:'construction', name:'Construction & Contractors', short:'Construction',
  kw:'Construction Web Design Canada', p1:'#FFC24A', p2:'#6B4406', art:'construction',
  lede:'Sites for builders, general contractors and developers, where the work is the portfolio and the buyer is verifying you can be trusted with a large budget.',
  sections:[
    { h:'The portfolio does the selling', p:[
      'Construction is bought visually and verified factually. A prospective client wants to see projects comparable to theirs in scale, type and quality, and then confirm you are licensed, insured and solvent enough to finish.',
      'That makes project pages the centre of the site: real photographs, the scope, the timeline, the challenges. Generic renderings and stock imagery actively harm credibility here, because anyone in the industry can tell.'
    ]},
    { h:'Two very different audiences', p:[
      'Most construction businesses serve residential clients and commercial or institutional buyers, and those groups want opposite things. A homeowner wants reassurance and a sense of the finished result. A commercial buyer wants capability, safety record, bonding and evidence you deliver on schedule.',
      'Trying to serve both with one set of pages usually serves neither. Separate paths, with the language and evidence each audience needs, converts considerably better.'
    ]},
    { h:'Safety, licensing and compliance are selling points', p:[
      'For commercial and public work, safety certification, WCB standing, bonding capacity and insurance are qualification criteria before anything else is considered. Burying them in a footer costs opportunities.',
      'Making that information easy to find shortens the qualification stage and signals that you are used to being asked, which is itself reassuring to an institutional buyer.'
    ]},
    { h:'Recruitment is half the traffic', p:[
      'In a sector with persistent labour shortages, a meaningful share of visitors to a construction site are looking for work rather than looking to hire. Ignoring them wastes traffic you already have.',
      'A real careers section, describing the work, the crews and how to apply, turns that traffic into applications. For many contractors that is worth as much as the client enquiries.'
    ]}
  ],
  needs:['Project pages with real photographs and real scope','Separate paths for residential and commercial buyers','Licensing, insurance, bonding and safety easy to find','A careers section that takes applications seriously','Fast loading despite image-heavy galleries','Service areas stated explicitly'],
  faq:[
    { q:'How many projects should we show?', a:'Enough to cover the range of work you want more of. Depth on a few well-documented projects beats thumbnails of forty.' },
    { q:'Do we need separate residential and commercial sections?', a:'If you serve both meaningfully, yes. The two audiences want different evidence and respond to different language.' },
    { q:'Will large galleries slow the site down?', a:'Only if the images are not handled properly. Correct sizing, modern formats and lazy loading let a heavy gallery stay fast.' },
    { q:'Is a careers page worth building?', a:'In this sector, usually yes. A significant share of construction site traffic is people looking for work.' }
  ]
},

{ slug:'ecommerce-and-retail', name:'Ecommerce & Retail', short:'Ecommerce & Retail',
  kw:'Ecommerce Web Design Canada', p1:'#C77DFF', p2:'#33116B', art:'ecommerce',
  lede:'Online stores and retail sites where speed, product data and checkout friction decide whether the traffic you paid for turns into revenue.',
  sections:[
    { h:'Speed is revenue, measurably', p:[
      'Ecommerce is the sector where the link between page speed and money is most direct and best documented. Every additional second before a product page becomes usable costs conversions, and the effect compounds across the funnel.',
      'It is also the sector where sites are heaviest, because product images, review widgets, chat, analytics and marketing tags all accumulate. Keeping a store fast is ongoing discipline rather than a one-time optimisation.'
    ]},
    { h:'Product data is the foundation', p:[
      'Product information is structured data: title, description, price, availability, variants, images, specifications. Handled loosely it produces inconsistent listings, broken filtering and poor search results both on your site and off it.',
      'Handled properly, the same data drives on-site search and filtering, product schema for search engines, and any feed you push to shopping platforms. Getting it right once pays off in several places at once.'
    ]},
    { h:'Checkout is where money is lost', p:[
      'Most abandoned carts are abandoned during checkout, and the causes are consistent: unexpected shipping cost, forced account creation, too many steps, or a form that misbehaves on a phone.',
      'Each of those is fixable. Showing shipping cost early, allowing guest checkout, reducing steps and testing the entire flow on a real phone routinely recovers more revenue than increasing traffic would.'
    ]},
    { h:'Canadian specifics that bite', p:[
      'Selling in Canada brings real complications: provincial tax rates that differ by destination, shipping costs that vary enormously by region, and customers who need to know whether prices are in Canadian dollars before they trust the total.',
      'Getting tax and shipping right is not glamorous, and getting it wrong produces either lost sales at checkout or a reconciliation problem later. It should be configured deliberately, not left on defaults.'
    ]}
  ],
  needs:['Product pages that load fast on mobile data','Structured product data driving search, filters and schema','Guest checkout and shipping costs shown early','Provincial tax handled correctly by destination','Prices clearly stated in Canadian dollars','A checkout flow tested on real phones, not just desktop'],
  faq:[
    { q:'WooCommerce or Shopify?', a:'Shopify for speed of setup and lower maintenance; WooCommerce for control and where the store is part of a larger WordPress site. The right answer depends on catalogue size and who maintains it.' },
    { q:'Why is our cart abandonment so high?', a:'Usually unexpected shipping costs, forced account creation, or a checkout that misbehaves on mobile. All three are diagnosable and fixable.' },
    { q:'How much does speed actually matter?', a:'In ecommerce, a great deal, and it is directly measurable in conversion rate. It is generally the highest-return technical work available to a store.' },
    { q:'Do we need product schema?', a:'Yes. It is how price, availability and reviews appear in search results, and it materially affects click-through.' }
  ]
},

{ slug:'publishing-and-media', name:'Publishing & Media', short:'Publishing & Media',
  kw:'News Website Design Canada', p1:'#FF6B4A', p2:'#7A1B0B', art:'publishing',
  lede:'News sites, magazines and content publishers, where volume, speed and advertising all have to work at once.',
  sections:[
    { h:'Scale changes every decision', p:[
      'A publisher with thousands of articles has problems a brochure site never encounters: archive pages that must stay fast, category structures that have to make sense at volume, related-content queries that can quietly bring a server down.',
      'Those queries are the usual culprit. Ordering large numbers of posts by a computed value, or filtering across custom fields without the right structure, produces pages that are fine at launch and unusable two years later.'
    ]},
    { h:'Advertising without destroying the experience', p:[
      'Advertising pays for publishing, and badly implemented advertising destroys the thing it pays for. Ad slots that load late and shove the article down the page are among the worst offenders for layout shift, which is both a ranking signal and a genuine irritation.',
      'The fix is to reserve the space before the ad arrives, so the page does not move. A managed slot system also lets editors control placements without touching templates.'
    ]},
    { h:'Editorial workflow is the real product', p:[
      'Publishers live in the editor. If publishing an article takes twenty minutes of formatting, that cost is paid several times a day forever. Editorial efficiency is worth more than almost any front-end feature.',
      'That means the editing experience is designed deliberately: sensible defaults, reusable blocks, images handled automatically, and no requirement for editors to understand the layout in order to publish into it.'
    ]},
    { h:'Discovery beyond the homepage', p:[
      'Most readers arrive at an article from search or social, never seeing the homepage. Each article therefore has to work as a standalone entry point: clear author and date, obvious navigation, and genuinely relevant related content.',
      'That related-content block is one of the highest-leverage elements on a publishing site, because it turns a single-article visit into a session. It is also the one most often filled with whatever is newest rather than whatever is relevant.'
    ]}
  ],
  needs:['Archive and category pages that stay fast at volume','Ad slots that reserve their space before loading','An editorial workflow designed for daily use','Every article working as a standalone entry point','Related content chosen for relevance, not recency','Article schema with author and publication dates'],
  faq:[
    { q:'Can WordPress handle a large news site?', a:'Yes, with attention to how content is queried and cached. Most publishing performance problems are query design rather than the platform.' },
    { q:'How do we stop ads hurting page experience?', a:'Reserve the space before the ad loads. Most ad-related layout shift comes from slots that size themselves only after the ad arrives.' },
    { q:'What matters most for traffic?', a:'Article-level SEO and fast mobile pages. Readers arrive at articles, not homepages, so each article carries its own weight.' },
    { q:'Should older articles be deleted?', a:'Rarely. Archives accumulate search value. Updating or consolidating is almost always better than removing.' }
  ]
},

{ slug:'nonprofits-and-associations', name:'Nonprofits & Associations', short:'Nonprofits',
  kw:'Nonprofit Web Design Canada', p1:'#9DFF6B', p2:'#1E5410', art:'nonprofit',
  lede:'Sites for charities, associations and member organisations, built to be run by small teams with limited budgets and volunteer turnover.',
  sections:[
    { h:'Built for a team that changes', p:[
      'Nonprofit websites are often maintained by whoever is available: a part-time coordinator, a volunteer, a board member. That person will change, sometimes annually, and the next person will inherit whatever was left behind.',
      'So simplicity is a requirement rather than an aesthetic. A small number of clearly labelled editable areas, written documentation, and no dependency on a single person knowing an undocumented trick.'
    ]},
    { h:'Donations that do not lose people', p:[
      'Donation flows leak badly. Too many fields, an unclear amount, a redirect to an unbranded processor, or a form that fails on mobile will all cost gifts from people who had already decided to give.',
      'Suggested amounts, a short form, a clearly branded path and a genuine thank-you afterwards each measurably improve completion. Recurring giving in particular is usually under-promoted relative to its value.'
    ]},
    { h:'Members, events and the admin behind them', p:[
      'Associations carry more machinery than a typical small site: membership tiers, renewals, member-only content, event registration. Each is a place where manual administration accumulates if the site does not handle it.',
      'Automating renewals and registrations removes recurring volunteer hours permanently, which for a small organisation is frequently worth more than the cost of the build.'
    ]},
    { h:'Transparency and accessibility', p:[
      'Donors, funders and regulators all look for the same things: who runs the organisation, what the money does, and the annual reporting. Making those easy to find builds trust and reduces repeated enquiries.',
      'Accessibility matters here for the same reason it matters in healthcare. Organisations serving the public, and especially those receiving public funding, are expected to be usable by everyone, and often formally required to be.'
    ]}
  ],
  needs:['A short donation flow that works on mobile','Recurring giving offered clearly, not hidden','Membership and event administration automated','Board, finances and reporting easy to find','Accessibility built in from the start','Documentation so the next volunteer can maintain it'],
  faq:[
    { q:'Which donation platform should we use?', a:'The one with fees you can live with and a flow that stays on-brand. The integration quality matters more than the brand name.' },
    { q:'Can we manage memberships on the website?', a:'Yes, including tiers, renewals and member-only content. That automation usually saves more volunteer time than anything else on the site.' },
    { q:'Are there discounts for nonprofits?', a:'Many services offer nonprofit pricing, and finding those is part of the work. It is worth asking before committing to anything.' },
    { q:'How do we keep the site current with volunteer turnover?', a:'Fewer editable areas, clear labels and written documentation. Complexity is what makes a site go stale after a handover.' }
  ]
},

{ slug:'manufacturing-and-industrial', name:'Manufacturing & Industrial', short:'Manufacturing',
  kw:'Manufacturing Web Design Canada', p1:'#6BA8FF', p2:'#0C2E63', art:'manufacturing',
  lede:'Sites for manufacturers, distributors and industrial suppliers, where buyers are technical, specifications matter and the purchase is considered.',
  sections:[
    { h:'Technical buyers want specifications', p:[
      'Industrial buyers are usually engineers, procurement staff or specifiers. They are not persuaded by marketing language; they are checking whether your product meets a requirement they already have.',
      'That means dimensions, tolerances, materials, certifications, compatibility and datasheets should be easy to find and easy to compare. A site that hides specifications behind a contact form loses buyers who are simply verifying a spec.'
    ]},
    { h:'Product catalogues that can be navigated', p:[
      'Manufacturers frequently have hundreds or thousands of SKUs across families, variants and configurations. Presented as a flat list or a downloadable catalogue, none of it is findable.',
      'Structured properly, the catalogue becomes navigable by attribute: filter by size, material, capacity, standard. That also makes each product findable in search, which is where a great deal of industrial buying now begins.'
    ]},
    { h:'Long cycles and multiple decision makers', p:[
      'Industrial purchases involve several people over weeks or months: an engineer specifies, procurement negotiates, management approves. Each needs different information from the same site.',
      'Practically that means technical depth for the specifier, commercial clarity for procurement, and credibility signals for the approver, all reachable without any of them having to ask.'
    ]},
    { h:'Distribution and where to buy', p:[
      'If you sell through distributors, the most common failure is that a buyer finds the product and then cannot work out how to obtain it. That is a sale handed to whoever is easier to buy from.',
      'A clear where-to-buy path, by region where relevant, closes that gap. For Canadian manufacturers selling across the border, being explicit about which markets you serve prevents wasted enquiries in both directions.'
    ]}
  ],
  needs:['Full specifications visible without a form','A catalogue filterable by real product attributes','Datasheets and certifications available for download','Content serving specifier, procurement and approver','A clear where-to-buy or distributor path','Explicit statement of the markets you serve'],
  faq:[
    { q:'Should specifications be gated behind a form?', a:'Generally no. Technical buyers verifying a spec will leave rather than fill in a form, and you lose the ones furthest along in their decision.' },
    { q:'How do we handle a very large catalogue?', a:'As structured product data with attribute-based filtering, which makes it navigable for people and indexable for search engines.' },
    { q:'Do manufacturers need ecommerce?', a:'Not always. Many need specification and enquiry rather than a cart. Where distributors sell, a clear where-to-buy path matters more.' },
    { q:'What content works for industrial SEO?', a:'Specific product and application pages, plus technical content answering the questions engineers actually search. Broad category pages rarely rank.' }
  ]
}

];

module.exports = { INDUSTRIES };
