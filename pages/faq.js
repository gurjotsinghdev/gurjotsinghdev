/* One FAQ page covering every kind of question, grouped by theme. */

const FAQ_INTRO = [
  'This page answers the questions people actually ask before hiring me, including the awkward ones about price, timelines and what happens when something goes wrong. It is grouped by theme so you can jump to the part that matters to you.',
  'If your question is not here, the fastest route to an answer is to ask. Nothing on this page is a sales pitch dressed as a question, and where the honest answer is "it depends" or "nobody can promise that", it says so.'
];

const FAQ_GROUPS = [

{ h:'Working together', items:[
  { q:'Who actually does the work?', a:'I do. There is no team behind the name and nothing is passed to a subcontractor without telling you. The person you brief is the person who designs it, builds it and answers the phone afterwards.' },
  { q:'Where are you based, and does it matter?', a:'Vancouver, British Columbia. It matters mostly for time zone. Being reachable during your working day is worth more than being in the same city, and most of the work is remote regardless.' },
  { q:'Do you work with clients outside Canada?', a:'Yes, though the overlap in working hours becomes the deciding factor. If a five hour difference is workable for you, it is workable for me.' },
  { q:'How do we start?', a:'A call, usually thirty minutes, about what you are trying to achieve rather than what you want built. You get a written scope and a fixed price from that before any work begins.' },
  { q:'What do you need from me?', a:'Time in the first week, mainly. Decisions, access, content and honest answers about what has and has not worked before. After that the demands on you drop considerably.' },
  { q:'What if we are not a good fit?', a:'I will say so, and where possible point you somewhere better. Taking on work I am not the right person for costs you money and costs me a reference.' }
]},

{ h:'Pricing and contracts', items:[
  { q:'How much does a website cost?', a:'It depends on scope, and the number is agreed before work starts rather than discovered along the way. What drives it is the number of pages, how much custom functionality is involved, and whether content and photography already exist.' },
  { q:'Do you charge hourly or fixed?', a:'Fixed price for defined projects, because it puts the risk of an estimate being wrong on me rather than you. Hourly only for open-ended work where a fixed scope would be dishonest.' },
  { q:'Is there a deposit?', a:'Yes, typically split across the project with the balance on completion. The exact terms are in the written scope.' },
  { q:'What is not included?', a:'Whatever the scope does not name. Stock photography, paid plugin licences, ad spend and third-party subscriptions are usually yours directly, so you own them and can leave.' },
  { q:'What if the scope changes mid-project?', a:'You get a price for the change before it happens. Nothing appears on an invoice that you did not agree to first.' },
  { q:'Do you require a long contract?', a:'No. Project work ends when the project ends. Ongoing support exists where it is genuinely useful, and you can stop it.' }
]},

{ h:'Design and build', items:[
  { q:'How long does a project take?', a:'A focused marketing site is usually four to six weeks. Larger builds run longer. You get a written timeline with the quote, and if it slips you hear it from me before you notice.' },
  { q:'WordPress, Next.js or something else?', a:'WordPress when your team needs to edit content regularly. Next.js when the site is mostly static and speed is the priority. The choice follows from who maintains it, not from preference.' },
  { q:'Do you use templates?', a:'No. Themes and page builders sometimes, where they genuinely serve the client, but the design is yours rather than a purchased layout with your logo on it.' },
  { q:'Will I be able to edit it myself?', a:'Yes, and that is designed for rather than tolerated. You get a small number of clearly labelled editable regions and documentation written for a person, not a developer.' },
  { q:'How many revisions do I get?', a:'Enough to get it right. Revisions are part of the process rather than a metered commodity, which is possible because scope is fixed up front.' },
  { q:'Who owns the website when it is finished?', a:'You do. Code, content, domain and hosting accounts are all in your name. There is no arrangement where leaving means losing the site.' },
  { q:'Do you write the content?', a:'You know your business better than any writer. The usual arrangement is that you supply the substance and it gets shaped into pages that read well and target the right searches.' }
]},

{ h:'SEO and marketing', items:[
  { q:'Can you guarantee first page rankings?', a:'No, and anyone who does is either guessing or lying. What can be committed to is the work: the technical fixes, the content, the structure and honest measurement of what it produces.' },
  { q:'How long does SEO take?', a:'Local search can move within weeks. Competitive organic terms are usually three to six months before the trend is clear. Anyone promising faster is describing luck.' },
  { q:'Is SEO included with a new site?', a:'The foundations are: correct titles and descriptions, structured data, clean architecture, fast pages, analytics and Search Console configured at launch. Ongoing content and link work is separate.' },
  { q:'Should I do SEO or ads?', a:'Ads if you need enquiries this month and the arithmetic works. SEO if you can wait and want the traffic to keep arriving after you stop paying. Often both, with ads telling you which terms are worth pursuing organically.' },
  { q:'What if ads are not profitable for my business?', a:'You get told, with the numbers behind it. Some categories have click costs that cannot work against the margin, and running an unprofitable channel to keep a retainer is not a service.' },
  { q:'Do you do link building?', a:'Not the kind you buy. Links that come from real coverage, directories that matter in your sector and genuine relationships hold their value; purchased links are a risk on your domain, not mine.' }
]},

{ h:'Security, speed and maintenance', items:[
  { q:'My site was hacked. Can you fix it?', a:'Usually yes, often within a day. The important part is establishing how it happened, because cleaning the infection without closing the entry point is why sites get reinfected within weeks.' },
  { q:'Will I lose content in a cleanup?', a:'The goal is no legitimate content lost. Anything removed is preserved so it can be reviewed and restored if it turns out to have been yours.' },
  { q:'Why is my site slow?', a:'On most WordPress sites it is images and plugin bloat rather than hosting. That is diagnosable in an afternoon and usually fixable without a rebuild.' },
  { q:'Do I need a maintenance plan?', a:'You need updates applied, backups verified and someone watching. Whether that is a plan with me or a process you run yourself is your call, and I will tell you honestly which makes sense at your size.' },
  { q:'Are my backups actually working?', a:'Only if someone has restored one. A backup nobody has tested is an assumption, and testing it takes an hour.' },
  { q:'What happens if the site goes down at 2am?', a:'Response times are agreed in writing before you need them, so you know what to expect rather than finding out during an outage.' }
]},

{ h:'After launch', items:[
  { q:'What happens on launch day?', a:'Staging review, cross-device QA, redirects from old URLs, schema, Search Console, backups and a rollback plan. Launch day should be uneventful, and that is the result of the preparation rather than luck.' },
  { q:'Will my search rankings drop after a redesign?', a:'They can, and the usual cause is missing redirects from old URLs. Mapping those before launch is what prevents it, and it is the step most often skipped.' },
  { q:'Do you disappear after the invoice?', a:'No. There is a settling period after launch where small things surface, and those are part of the project rather than a new one.' },
  { q:'Can you take over a site someone else built?', a:'Yes, and it is common. It starts with reading what is there, because the honest recommendation is sometimes to fix rather than replace.' },
  { q:'What if I want to move to another developer later?', a:'Everything is in your name and documented, so you can. A site you cannot leave is a site built to trap you, and that is not how this works.' }
]}

];

module.exports = { FAQ_INTRO, FAQ_GROUPS };
