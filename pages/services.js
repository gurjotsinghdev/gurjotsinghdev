/* Twelve service articles. Each is written once and is genuinely different
   from the others: different subject, different structure, different FAQ.
   The city profile is what varies underneath. No case studies, no invented
   clients, no fabricated numbers. */

const S = [

{ slug:'freelance-web-design', name:'Freelance Web Design', glyph:'&#9672;', p1:'#F0A73C', p2:'#5C2410',
  lede:'A designed website, built and shipped by the person who designed it. No account manager in the middle, no template with your logo dropped on top.',
  sections:[
    { h:'What you get when one person does the whole thing', p:[
      'Most web projects lose their shape in the handoff. A designer produces a beautiful file, a developer interprets it, and the thing that ships is a negotiated compromise nobody is happy with. Working with one freelancer removes that seam entirely. The person choosing the type is the person writing the CSS, so the decisions survive contact with the browser.',
      'It also removes a layer of cost and a layer of delay. You are not paying for a project manager to relay your feedback, and you are not waiting three days for that relay to happen. You say the hero feels too heavy, and the person who can change it is already in the file.'
    ]},
    { h:'Design that is built around what the site has to do', p:[
      'A website is not a brochure. It has a job: get someone to call, book, buy or trust you enough to keep reading. Design decisions follow from that job. Where the contact route sits, how quickly the value proposition lands, what a visitor sees in the first second on a phone.',
      'That means the work starts with the goal rather than the mood board. What does a good week of enquiries look like? Which page is the one that actually converts? What does someone need to believe before they will pick up the phone? Those answers shape the layout far more usefully than a colour palette does.'
    ]},
    { h:'Built to be fast, because slow sites lose people', p:[
      'Performance is a design constraint, not a technical afterthought. Every heavy image, every unnecessary font weight, every third-party script is a tax paid by every visitor. On a phone on mobile data, that tax is what decides whether someone waits.',
      'So the build is deliberately lean: images sized and compressed properly, fonts subset and self-hosted where it helps, no framework loaded to do a job plain CSS already does. The result is a site that feels immediate, which reads as competence before a single word is read.'
    ]},
    { h:'Yours to run afterwards', p:[
      'A site you cannot edit is a site that goes stale. Everything is built so your team can change the things that change: copy, images, prices, staff, hours. That usually means WordPress with a properly configured editor, or a Next.js build with content in a place a non-developer can reach.',
      'You also get documentation written for a person rather than a developer, and a straight answer about what is safe to change and what to ask about first.'
    ]}
  ],
  faq:[
    { q:'How long does a freelance web design project take?', a:'A focused marketing site is usually four to six weeks from first call to launch. Larger builds with custom functionality run longer. You get a written timeline with the quote, before anything starts.' },
    { q:'Is a freelancer riskier than an agency?', a:'The honest risk is capacity: one person can only work on so much at once. The honest advantage is that the person you brief is the person who builds it, so nothing is lost in translation and nothing is quietly handed to a junior.' },
    { q:'What does a freelance website cost?', a:'Fixed scope, fixed price, agreed before work starts. The number depends on how many pages, how much custom functionality and whether content and photography already exist.' },
    { q:'Do you work with businesses outside your city?', a:'Yes. Most of the work is remote regardless of where the client is. Being in the same time zone matters more than being in the same postcode.' }
  ]
},

{ slug:'small-business-web-design', name:'Small Business Web Design', glyph:'&#9670;', p1:'#7CD4A0', p2:'#0B4A2E',
  lede:'A site that earns its cost. Built for businesses where the website has to bring in work, not just exist.',
  sections:[
    { h:'The website has one job', p:[
      'For a small business the website is rarely the product. It is the thing that turns someone who heard your name into someone who contacts you. Every decision should serve that conversion, and anything that does not is decoration you are paying to maintain.',
      'In practice that means the phone number is visible without scrolling, the services are named in the words customers actually use, and the proof that you are competent arrives before the request to get in touch.'
    ]},
    { h:'Built for the way small businesses actually operate', p:[
      'Small businesses do not have a marketing department. Whoever runs the business is also the person who would have to update the site, and they will do it at nine at night between other jobs. So the editing experience matters as much as the design.',
      'That shapes the build toward fewer, better-labelled editable regions rather than a page builder with two hundred options. You should be able to change your hours or add a service in two minutes without worrying you have broken the layout.'
    ]},
    { h:'Costs that make sense at your size', p:[
      'A small business site should not carry enterprise overheads. That means sensible hosting rather than a managed platform priced for scale you do not have, a licence footprint kept small, and no plugin subscriptions bought to solve problems you do not have.',
      'It also means being honest about what you do not need. Most small businesses do not need a custom application, a headless architecture or a design system. They need five to nine pages that load fast and say the right things.'
    ]},
    { h:'Set up to be found', p:[
      'A small business site is usually competing locally, which is a fight you can genuinely win. Correct page titles, a real description for every page, structured data describing the business, and content that matches how people search all do more for a local business than a larger content budget spent badly.',
      'Google Search Console and analytics are configured at launch, so from day one you can see which pages bring people in and which do nothing.'
    ]}
  ],
  faq:[
    { q:'How many pages does a small business website need?', a:'Usually between five and nine: home, about, one page per major service, and contact. Separate service pages matter because they are what rank individually.' },
    { q:'WordPress or something else?', a:'WordPress if your team needs to edit content regularly. Next.js if the site is mostly static and speed is the priority. The decision is made from how you will use it, not from preference.' },
    { q:'Do I need to write the content myself?', a:'You know your business better than any writer will. The usual arrangement is that you supply the substance and it gets shaped into pages that read well and target the right search terms.' },
    { q:'What ongoing costs should I expect?', a:'Domain, hosting, and any paid plugins or licences. Typically modest. You get the real numbers before launch rather than after.' }
  ]
},

{ slug:'wordpress-developer', name:'WordPress Developer', glyph:'&#9635;', p1:'#8FB8FF', p2:'#12275C',
  lede:'Custom WordPress work: themes, plugins, and fixing builds that were assembled rather than engineered.',
  sections:[
    { h:'Beyond installing a theme', p:[
      'Most WordPress sites are a purchased theme plus a dozen plugins, each solving one problem and each adding weight, update risk and a security surface. It works until it does not, and then nobody can tell which of the dozen is responsible.',
      'Development work means building the thing your site actually needs: a custom theme that contains only your design, or a small site plugin holding the functionality that is genuinely yours. Fewer moving parts, fewer conflicts, and a site you can update without holding your breath.'
    ]},
    { h:'Custom post types and real content structure', p:[
      'The moment a site has properties, staff, products, case studies or events, the default post and page model stops fitting. Forcing that content into pages produces a mess that is impossible to query, sort or display consistently.',
      'Custom post types and structured fields fix it properly. Content gets entered in a form that matches its shape, and the templates render it consistently everywhere. Adding the fortieth item takes as long as the first, and looks identical.'
    ]},
    { h:'Plugin development, not plugin accumulation', p:[
      'When functionality is specific to your business, a small purpose-built plugin usually beats bolting together three general-purpose ones. It does exactly what you need, it has no settings pages you will never open, and it does not break when a vendor changes direction.',
      'It also survives theme changes. Functionality in a plugin stays when the design is replaced, which is the correct separation and one of the most common mistakes in WordPress builds.'
    ]},
    { h:'Inheriting somebody else’s build', p:[
      'A lot of WordPress work is archaeology: understanding what a previous developer did, why the site behaves oddly, and what can safely be removed. That work starts with reading, not rebuilding.',
      'Often the outcome is that a site does not need replacing at all. It needs the plugin count halved, the queries fixed, the images actually optimised and the update path unblocked. That is usually cheaper and less disruptive than starting again.'
    ]}
  ],
  faq:[
    { q:'Can you work with my existing WordPress site?', a:'Yes, and it is often the better option. The first step is a read of the current build so the recommendation is based on what is there rather than a guess.' },
    { q:'Do you use page builders?', a:'Where the team needs to edit layouts, yes, configured carefully. Where they do not, a custom theme is lighter and faster. The choice depends on who maintains the site.' },
    { q:'Will my site still work after WordPress updates?', a:'That is the point of building it properly. Custom code is written against stable APIs, and updates are tested on staging rather than applied hopefully to production.' },
    { q:'Can you make an existing WordPress site faster?', a:'Usually substantially. Most WordPress slowness comes from unoptimised images, too many plugins and uncached database queries, all of which are fixable without a rebuild.' }
  ]
},

{ slug:'local-seo-expert', name:'Local SEO Expert', glyph:'&#9678;', p1:'#7CFF3F', p2:'#0B7A4B',
  lede:'Getting found by people nearby who are ready to buy. Local search is a different discipline to national SEO, and it is far more winnable.',
  sections:[
    { h:'Local search is its own game', p:[
      'National SEO is a fight over domain authority and content volume. Local search is decided largely by relevance, proximity and prominence, which means a small business can genuinely outrank a large one for the searches that matter to it.',
      'The searches that matter are rarely the obvious ones. "Plumber" is less valuable than "emergency plumber open now near me". Local intent is high-intent: somebody searching locally usually needs the thing today.'
    ]},
    { h:'Your Google Business Profile is doing most of the work', p:[
      'For local queries the map pack often sits above every organic result. That placement is driven by your Business Profile: categories, service areas, hours, photos, attributes and reviews. A neglected profile costs more traffic than almost any on-site problem.',
      'Getting it right means choosing the primary category carefully, filling every relevant field, keeping hours accurate including holidays, and posting updates so the profile looks alive rather than abandoned.'
    ]},
    { h:'Consistency across the web', p:[
      'Search engines cross-check your name, address and phone number across directories. Inconsistencies, an old suite number, a disconnected line, a former business name, reduce confidence and therefore ranking.',
      'The fix is unglamorous: find every listing, correct them all, and stop the inconsistencies reappearing. It is tedious and it works.'
    ]},
    { h:'Pages that match how people actually search', p:[
      'A single page listing every service in every area will not rank for any of them. Local ranking rewards specificity, which means separate pages for the service and area combinations that are genuinely worth pursuing.',
      'The honest caveat: those pages have to say something real. A page that is another page with the place name swapped is a pattern search engines are explicitly built to catch, and it can cost you more than it gains.'
    ]}
  ],
  faq:[
    { q:'How long does local SEO take to work?', a:'Business Profile improvements can move within weeks. Organic ranking for competitive local terms is usually three to six months. Anyone promising faster is guessing.' },
    { q:'Do reviews really affect ranking?', a:'Yes, both volume and recency, and they affect click-through even more. A steady trickle of recent reviews outperforms a burst two years ago.' },
    { q:'What if I serve customers rather than having a storefront?', a:'You set a service area instead of a public address. The setup is different and getting it wrong can suppress you entirely.' },
    { q:'Can you guarantee a first page ranking?', a:'No, and neither can anyone else. What can be committed to is the work: the technical fixes, the profile, the pages and the measurement.' }
  ]
},

{ slug:'technical-seo-consultant', name:'Technical SEO Consultant', glyph:'&#9881;', p1:'#B8B8B8', p2:'#2A2A2A',
  lede:'The part of SEO that is engineering. Crawling, indexing, structured data and speed, fixed at the source rather than papered over.',
  sections:[
    { h:'Content cannot rank if the site cannot be crawled', p:[
      'A great deal of SEO advice assumes search engines can already read your site properly. Often they cannot. Pages blocked in robots.txt, parameters generating thousands of near-duplicate URLs, canonical tags pointing at the wrong place, pagination that traps crawlers, JavaScript that renders content search engines never see.',
      'A technical audit starts by establishing what is actually being crawled and indexed versus what you think is. The gap between those two is usually where the problem lives.'
    ]},
    { h:'Structured data that search engines can use', p:[
      'Schema markup tells search engines what a page is rather than making them infer it. Done properly it can produce rich results: review stars, FAQ expansions, breadcrumbs, business details in the sidebar.',
      'Done badly it produces warnings and nothing else. Common failures are marking up content that is not visible on the page, using the wrong type, or leaving required properties out. Validation is part of the job, not an optional extra.'
    ]},
    { h:'Core Web Vitals as a ranking input', p:[
      'Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift are measurable, they are reported in Search Console from real visitors, and they influence ranking. More importantly they influence whether people stay.',
      'Fixing them is engineering: what loads first, what blocks rendering, whether images have dimensions so the layout does not jump, how much JavaScript runs before the page becomes usable. These are not fixed by installing a caching plugin and hoping.'
    ]},
    { h:'Architecture and internal linking', p:[
      'How pages link to one another tells search engines what you consider important. Orphan pages, everything hanging off the homepage, or a nav with sixty items all dilute that signal.',
      'A sensible structure groups related pages, links them to each other, and keeps important pages within a couple of clicks of the homepage. It also makes the site easier for people, which is the better reason to do it.'
    ]}
  ],
  faq:[
    { q:'What does a technical SEO audit cover?', a:'Crawling and indexing, site architecture, structured data, Core Web Vitals, mobile rendering, redirects, canonicals, and anything blocking pages from being seen. You get findings ranked by impact, not an unsorted list.' },
    { q:'Is technical SEO a one-off?', a:'The audit is. Keeping it correct is not, because every redesign, migration and plugin update can reintroduce problems. Most sites benefit from a periodic check.' },
    { q:'My site is slow. Is that a technical SEO problem?', a:'Usually yes, and usually fixable. Slowness is normally images, render-blocking resources and excess JavaScript rather than hosting.' },
    { q:'Do I need technical SEO if I already publish content?', a:'If the technical layer is broken, publishing more content is spending money to compound the problem. Fix the foundation first.' }
  ]
},

{ slug:'google-ads-consultant', name:'Google Ads Consultant', glyph:'&#9650;', p1:'#FFC24A', p2:'#6B4406',
  lede:'Paid search that is measured properly. Ads are the fastest way to buy traffic and the fastest way to waste money, and the difference is almost always measurement.',
  sections:[
    { h:'Conversion tracking before spend', p:[
      'The single most common failure in Google Ads is spending for months without accurate conversion tracking. Without it you cannot tell which campaign, keyword or ad produced a customer, so every optimisation decision is a guess.',
      'That means tracking is configured and verified before budget goes live: form submissions, calls, whatever counts as a lead for your business. Then the reporting answers a real question, which is cost per customer rather than cost per click.'
    ]},
    { h:'Search intent and the money-wasting queries', p:[
      'Broad keywords collect a lot of searches that will never buy. People researching, people looking for jobs, people looking for a competitor, students doing homework. Each one costs you the same as a real prospect.',
      'Controlling that is ongoing work: reading the actual search terms report, adding negatives, tightening match types, and being willing to pay more per click for queries that convert rather than less per click for queries that do not.'
    ]},
    { h:'The landing page is part of the campaign', p:[
      'Sending paid traffic to a homepage is one of the most expensive habits in small business advertising. Someone who clicked an ad for a specific service should land on a page about that service, with the same words the ad used.',
      'Quality Score also responds to that match, which means better relevance lowers what you pay per click. A good landing page reduces cost and increases conversion at the same time.'
    ]},
    { h:'Knowing when ads are the wrong answer', p:[
      'Ads are not right for every business. If your margin per customer is small and the clicks in your category are expensive, paid search can be structurally unprofitable no matter how well it is run.',
      'That is worth establishing early with arithmetic rather than after three months of spend. Sometimes the honest recommendation is to fix the site and pursue organic instead.'
    ]}
  ],
  faq:[
    { q:'How much should I budget for Google Ads?', a:'Enough to gather meaningful data in your category, which depends entirely on click costs in your industry and area. That number is worked out before launch, not discovered by spending.' },
    { q:'How soon will I see results?', a:'Traffic is immediate. Reliable data usually takes a few weeks, and meaningful optimisation follows that. Anyone promising profitability in week one is guessing.' },
    { q:'Should I run ads and SEO together?', a:'Often yes. Ads give you fast data on which terms convert, and that evidence tells you where organic effort is worth spending.' },
    { q:'Can you take over an existing account?', a:'Yes. That starts with an audit of structure, tracking accuracy and search term waste, because inherited accounts usually have all three problems.' }
  ]
},

{ slug:'ppc-consultant', name:'PPC Consultant', glyph:'&#10022;', p1:'#C77DFF', p2:'#33116B',
  lede:'Pay-per-click across search, shopping and social, run as a numbers exercise rather than a creative one.',
  sections:[
    { h:'PPC is arithmetic before it is creative', p:[
      'Every paid channel reduces to the same equation: what a click costs, how many clicks become customers, and what a customer is worth. If those three numbers do not work, no amount of clever copy will rescue the campaign.',
      'So the first work is establishing them honestly. What is a customer actually worth to you, including repeat business? What conversion rate does your landing page really achieve? Those answers determine whether a channel is viable before a dollar is committed.'
    ]},
    { h:'Choosing channels for how people buy', p:[
      'Search captures demand that already exists: somebody has a problem and is looking for a solution now. Social creates demand: somebody was not looking, and the ad made them consider it. Shopping sits between them for physical products.',
      'They are not interchangeable. A business selling emergency services belongs in search. A business selling something people did not know existed usually belongs in social. Running both without understanding the difference is how budgets disappear.'
    ]},
    { h:'Account structure that can be optimised', p:[
      'A badly structured account cannot be improved because you cannot see what is working. Everything in one campaign, or a hundred campaigns with three clicks each, both produce data too coarse or too thin to act on.',
      'Good structure groups things that share intent and budget, keeps enough volume in each group to reach significance, and separates what you need to control separately. It is unglamorous and it is what makes later optimisation possible.'
    ]},
    { h:'Reporting that answers business questions', p:[
      'Platform dashboards are designed to make spending look successful. Impressions, clicks and engagement all rise with budget regardless of whether anything was sold.',
      'Useful reporting answers a different question: what did we spend, what came back, and what should change next month. That is the report you get, in plain language, without needing a login to understand it.'
    ]}
  ],
  faq:[
    { q:'What is a realistic cost per lead?', a:'It varies enormously by industry and area. The useful version of this question is what a lead is worth to you, which determines what you can afford to pay.' },
    { q:'Do you manage social ads as well as search?', a:'Yes, where they fit. The recommendation follows from how your customers actually buy rather than from which platform is fashionable.' },
    { q:'How long before PPC becomes profitable?', a:'Usually a few months, because the first phase is buying data and cutting what does not work. Campaigns that are profitable immediately are lucky rather than well run.' },
    { q:'What happens if PPC does not work for my business?', a:'You get told, with the arithmetic behind it, and the budget goes somewhere it can work. Continuing to run an unprofitable channel to keep a retainer is not a service.' }
  ]
},

{ slug:'hubspot-consultant', name:'HubSpot Consultant', glyph:'&#9784;', p1:'#FF8A5B', p2:'#7A2A0B',
  lede:'HubSpot set up so it reflects how your business actually sells, rather than how the demo assumed you would.',
  sections:[
    { h:'The pipeline has to match reality', p:[
      'HubSpot ships with a default deal pipeline that fits nobody exactly. Teams adopt it, discover it does not describe their sales process, and start working around it in notes and spreadsheets. Within months the CRM is a system of record for nothing.',
      'Configuration starts from how you genuinely sell: the real stages, what has to be true to move between them, and what happens when a deal stalls. When the pipeline matches reality, people use it, and the reporting becomes trustworthy.'
    ]},
    { h:'Properties, and the discipline not to create too many', p:[
      'Every custom property is a field somebody has to fill in. Create too many and data quality collapses, because busy salespeople skip anything that is not obviously necessary.',
      'The better approach is a small set of properties that are actually used in reporting or automation, made required only where the data genuinely matters. Fewer fields, filled reliably, beat many fields filled sometimes.'
    ]},
    { h:'Workflows that reduce work', p:[
      'Automation should remove manual steps, not add supervision. Lead rotation, follow-up reminders, lifecycle stage changes and internal notifications are all good candidates because they are rules a person is currently applying from memory.',
      'What automation should not do is send prospects a sequence that reads as automated. The test is simple: would you be happy for a customer to see the workflow that produced the message they received.'
    ]},
    { h:'Reporting people will actually read', p:[
      'HubSpot can produce almost any report, which is precisely why most implementations end up with dashboards nobody opens. A wall of charts is not insight, and building it is a common way to feel productive without changing any decision.',
      'The useful version is small: where deals come from, where they stall, and what the pipeline is worth against target. Three or four numbers a manager checks weekly beats twenty nobody checks at all.',
      'That also exposes data quality problems early. If a report looks wrong, it is usually because the underlying process is not being followed, which is worth discovering in the first month rather than at the end of a quarter.'
    ]},
    { h:'Connecting HubSpot to the website', p:[
      'HubSpot is most useful when the website feeds it properly: forms mapping to the right properties, tracking attributing sources accurately, and lifecycle stages updating from real behaviour rather than being set by hand.',
      'That integration work is where most of the value sits, and it is also what most implementations skip. A CRM disconnected from the site is an address book with a subscription fee.'
    ]}
  ],
  faq:[
    { q:'Which HubSpot tier do I need?', a:'Most small businesses need far less than they are sold. The recommendation follows from the features you will genuinely use, and free or Starter is often enough to begin.' },
    { q:'Can you migrate our existing CRM data?', a:'Yes. The important part is cleaning it first, because importing years of duplicates and dead records into a new system just relocates the problem.' },
    { q:'Will my team actually use it?', a:'Only if it makes their day easier. That is why configuration starts from the existing process rather than imposing a new one, and why training is part of the work.' },
    { q:'Can HubSpot connect to a WordPress site?', a:'Yes, through forms, tracking and the API. Getting the property mapping right at that boundary is what makes later reporting reliable.' }
  ]
},

{ slug:'wordpress-malware-removal', name:'WordPress Malware Removal', glyph:'&#9884;', p1:'#FF4D4D', p2:'#5A0A0A',
  lede:'Getting a hacked WordPress site clean, back online, and hardened so the same door does not open twice.',
  sections:[
    { h:'Finding out what actually happened', p:[
      'Cleaning a compromised site starts with establishing how it was compromised. Skipping that step is why so many sites get reinfected within weeks: the malicious file is deleted, the vulnerability that allowed it is not, and the attacker simply returns.',
      'That means reading server logs to find the entry point, checking when it happened, and comparing core and plugin files against known-good checksums to see exactly what was altered. Guesswork here is expensive.'
    ]},
    { h:'Not all infections are files', p:[
      'A common and costly assumption is that malware means malicious files. Plenty of WordPress compromises live entirely in the database: injected posts, rogue administrator accounts, spam links hidden with negative text-indent, altered options.',
      'A file scanner reports those sites as clean while they continue serving spam to visitors and search engines. Anything thorough has to include the users table, post content and options, not just the filesystem.'
    ]},
    { h:'Cleaning without destroying the site', p:[
      'The crude fix is to restore an old backup. It works, and it also throws away every order, form submission and content change since that backup was taken, and often restores the vulnerability along with the site.',
      'A careful cleanup removes the malicious content while keeping legitimate changes, with the original content preserved so anything removed can be checked and restored if it turns out to have been genuine.'
    ]},
    { h:'Closing the door afterwards', p:[
      'Once clean, the work is making reinfection unlikely: updating core, plugins and themes, removing what is abandoned, rotating every credential including database and hosting, reviewing user accounts, and tightening file permissions.',
      'It is also worth being blunt about a limitation. A security plugin reporting no malware means very little if the payload is database content and the scanner was never switched on. Trust the audit, not the badge.'
    ]}
  ],
  faq:[
    { q:'How quickly can a hacked site be cleaned?', a:'Most straightforward compromises are resolved within a day. Complex cases, particularly where the entry point is unclear, can take longer. The site being back is not the same as the site being safe.' },
    { q:'Will I lose content?', a:'The goal is no legitimate content lost. Removed content is preserved so it can be reviewed and restored if any of it turns out to have been yours.' },
    { q:'Why did Google flag my site?', a:'Usually injected spam or a malicious redirect. Once the site is genuinely clean, a reconsideration request through Search Console removes the warning.' },
    { q:'How do I stop it happening again?', a:'Keep everything updated, remove what you do not use, rotate credentials, limit admin accounts, and take backups you have actually tested restoring.' }
  ]
},

{ slug:'wordpress-website-speed-optimization', name:'WordPress Website Speed Optimization', glyph:'&#9889;', p1:'#5EE9D4', p2:'#0A4A44',
  lede:'Making a slow WordPress site fast, by fixing what is actually slow rather than installing another caching plugin.',
  sections:[
    { h:'Measure before changing anything', p:[
      'Speed work without measurement is superstition. The first step is establishing where the time actually goes: server response, render-blocking resources, image weight, JavaScript execution, layout shifts.',
      'Lab tools and real-visitor data disagree often, and the real data is what counts because it reflects actual devices and connections. Search Console reports it from your genuine audience, which is more useful than a score from a fast machine on fibre.'
    ]},
    { h:'Images are almost always the biggest win', p:[
      'On most WordPress sites images are the majority of page weight, frequently by a wide margin. A single unoptimised hero photograph can outweigh every other asset on the page combined.',
      'The fix is unexciting and enormously effective: correct dimensions rather than browser-scaled originals, modern formats, real compression, lazy loading below the fold, and width and height attributes so the layout does not jump while they load.'
    ]},
    { h:'Plugins and the weight they add', p:[
      'Every plugin can add CSS and JavaScript to every page, including pages that never use it. A slider plugin used once on the homepage often loads its assets site-wide, and twenty plugins doing that produce a site that is slow everywhere for no visible reason.',
      'Auditing what each plugin loads, restricting assets to where they are needed, and removing what is not earning its weight routinely halves page size without changing anything a visitor can see.'
    ]},
    { h:'Caching last, not first', p:[
      'Caching is usually the first thing tried and should be nearly the last. It hides slow work rather than removing it, and it does nothing for the uncached first visit, which is often the one that matters.',
      'Fix the underlying weight first: images, unnecessary assets, expensive queries. Then add caching, and it makes an already-fast site instant instead of making a slow site occasionally tolerable.'
    ]}
  ],
  faq:[
    { q:'What is a good page speed score?', a:'Scores are a proxy. What matters is the real-visitor Core Web Vitals in Search Console: Largest Contentful Paint under 2.5 seconds, low layout shift, responsive interaction.' },
    { q:'Will a faster site rank better?', a:'Speed is a ranking input, but the larger effect is on behaviour. Faster pages hold more visitors and convert better, which matters more than the ranking nudge.' },
    { q:'Do I need better hosting?', a:'Sometimes, but hosting is blamed far more often than it deserves. Most WordPress slowness is images and plugin bloat, and moving those to a faster server just serves the same excess weight quicker.' },
    { q:'Can you speed up my site without rebuilding it?', a:'Usually yes, and substantially. A rebuild is only worth recommending when the underlying build is the problem rather than what has been loaded onto it.' }
  ]
},

{ slug:'it-consultant', name:'IT Consultant', glyph:'&#10010;', p1:'#9DFF6B', p2:'#1E5410',
  lede:'Practical technology advice for businesses without an IT department, focused on what to do rather than what to buy.',
  sections:[
    { h:'Advice that is not attached to a product', p:[
      'A lot of IT advice is really sales. The recommendation arrives already shaped by what the adviser resells, and the business ends up with licences it does not use and a contract it cannot leave.',
      'Independent advice starts from what you are trying to achieve and what you already have. Frequently the answer is to configure existing tools properly rather than buy new ones, which is a poor way to sell software and a good way to solve problems.'
    ]},
    { h:'Making the systems you have talk to each other', p:[
      'Most small business inefficiency is not a missing tool. It is four tools that do not connect, so somebody spends an hour a day copying between them, and every copy is a chance to introduce an error.',
      'Integration work removes that. Website to CRM, CRM to invoicing, bookings to calendar. Each connection removes a manual step permanently, and the time saved compounds every week.'
    ]},
    { h:'Security proportionate to the business', p:[
      'Small businesses are targeted constantly, usually by automation rather than anyone specific. The defences that matter most are also the cheapest: multi-factor authentication everywhere, a password manager, current software, restricted admin access, and backups that have been tested by actually restoring one.',
      'Enterprise security products are rarely the right answer at this size. Doing the basics consistently prevents far more than an expensive tool applied inconsistently.'
    ]},
    { h:'Choosing tools you will not regret in two years', p:[
      'Most regretted technology decisions were reasonable at the time and became expensive later: a platform that could not grow, a tool nobody could leave, a contract that renewed automatically for years after the team stopped using it.',
      'The questions that prevent that are unglamorous. Can we export our data, and in what format? What happens to the price after the first year? If this vendor disappears, what breaks? How long is the notice period? Asking them before signing costs nothing and saves a great deal.',
      'The same applies to scale in both directions. Software priced for a team of fifty is poor value at five, and a tool that only works at five becomes a migration project at twenty. Choosing for the business you are, with a plausible path to the one you expect to be, avoids paying twice.'
    ]},
    { h:'Documentation, so the business is not one person', p:[
      'Many small businesses have exactly one person who knows how the systems fit together, and no written record of it. That is a risk that only becomes visible on the day that person is unavailable.',
      'Documenting what runs where, who has access, what the recovery steps are and which vendor to call turns tribal knowledge into something the business owns.'
    ]}
  ],
  faq:[
    { q:'Do you sell hardware or software licences?', a:'No, which is the point. Recommendations are not shaped by commission, and often the advice is to use what you already have properly.' },
    { q:'Can you help without a long contract?', a:'Yes. A lot of this work is a defined project with a clear outcome. Ongoing support is available where it is genuinely useful rather than mandatory.' },
    { q:'What if I do not understand the technical detail?', a:'You should not have to. Recommendations come in plain language with the trade-offs explained, so you can make the business decision without needing the engineering background.' },
    { q:'How do I know my backups actually work?', a:'By restoring one. A backup nobody has ever restored is an assumption, and testing it is part of the work.' }
  ]
},

{ slug:'it-services', name:'IT Services', glyph:'&#9636;', p1:'#6BA8FF', p2:'#0C2E63',
  lede:'Ongoing technical support for small businesses: keeping systems current, secure, backed up and working.',
  sections:[
    { h:'Maintenance is cheaper than recovery', p:[
      'Almost every expensive technical emergency was preventable and visible in advance. Expired certificates, unpatched software, backups that silently stopped running months ago, disks filling up.',
      'Routine maintenance catches those while they are still administrative rather than urgent. The unglamorous work of checking, updating and verifying is what stops the weekend outage from ever happening.'
    ]},
    { h:'Backups that have been tested', p:[
      'Most businesses believe they have backups. Fewer have verified that those backups contain what they think, run on schedule, and can actually be restored.',
      'A backup nobody has restored is an untested assumption. Part of ongoing service is periodically restoring one to confirm the process works before the day it has to.'
    ]},
    { h:'Updates without breaking things', p:[
      'The tension in maintenance is real: updating promptly closes security holes, and updating carelessly breaks production. Both failure modes are common.',
      'The resolution is process rather than courage. Updates are applied on staging, checked, then applied to production, with a rollback path established beforehand. It is slower than clicking update on a live site and considerably cheaper than the alternative.'
    ]},
    { h:'One point of contact instead of four vendors', p:[
      'Small businesses usually end up with a hosting company, a domain registrar, whoever built the site and whoever set up the email, and none of them consider the others their responsibility. When something breaks, the business spends a day being told it is somebody else\u2019s problem.',
      'Consolidating that under one point of contact does not mean replacing every vendor. It means somebody knows where everything lives, holds the access, and deals with the finger-pointing on your behalf so a broken mailbox does not cost you an afternoon of phone calls.',
      'It also means decisions get made with the whole picture in view. Moving hosting affects email. Changing DNS affects both. Renewing a certificate affects anything that depends on it. Those connections are obvious to somebody holding the map and invisible to four separate suppliers each looking at their own piece.'
    ]},
    { h:'Monitoring, and knowing before your customers do', p:[
      'The worst way to learn your site is down is a customer telling you. Uptime monitoring, certificate expiry alerts and error tracking turn that into something you knew about first.',
      'Where it matters, that extends further: performance monitoring so gradual degradation is visible before it becomes complaints, and log review so unusual activity is noticed early rather than during an incident.'
    ]}
  ],
  faq:[
    { q:'What does ongoing IT support include?', a:'Updates and patching, backup verification, uptime and certificate monitoring, security checks, and a route to reach a person when something breaks. The exact scope is agreed in writing.' },
    { q:'Do I need support if my site is small?', a:'Small sites still get compromised, still have certificates that expire and still have backups that quietly fail. The work is proportionate to the size, but the failure modes are identical.' },
    { q:'How quickly do you respond to problems?', a:'Response times are agreed up front rather than left vague, so you know what to expect before you need it.' },
    { q:'Can you work alongside our existing IT provider?', a:'Yes. Clear boundaries about who owns what prevents the gaps where things get missed by both parties.' }
  ]
}

];

module.exports = { SERVICES: S };
