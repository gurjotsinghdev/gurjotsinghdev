/* Additional per-service material: what the work involves, the signals that
   you need it, and a closing note. Written per service, not per city. */

const EXTRA = {
'freelance-web-design': {
  process: ['A call to establish what the site has to achieve and who it is talking to.','A written scope and a fixed price, before any work starts.','Direction and real screens for the key pages, not a mood board.','Revisions on the actual design until it is right.','Build, with content loaded and every breakpoint checked.','Launch with redirects, analytics and Search Console configured.'],
  signals: ['Your site was built years ago and you avoid showing people the link.','It looks acceptable on a laptop and falls apart on a phone.','You cannot change your own copy without asking somebody.','Visitors arrive and leave without contacting you.','It loads slowly enough that you notice while testing it yourself.'],
  close: 'If any of that is familiar, the fix is usually smaller than a full rebuild. The first step is a look at what you have and a straight answer about whether it is worth keeping.'
},
'small-business-web-design': {
  process: ['Establish what a good enquiry looks like and where they currently come from.','Agree the page list, usually five to nine, and what each one must do.','Design the home page and one service page first, since they set the pattern.','Build with an editor your team can genuinely use.','Load real content rather than launching with placeholder text.','Launch, then check what the analytics actually say a month later.'],
  signals: ['You are paying monthly for a site that has never produced an enquiry.','Customers say they could not find your prices, hours or service area.','Your competitors appear above you for searches you should own.','Updating anything means emailing somebody and waiting.','The site does not say what you do in the words customers use.'],
  close: 'A small business site does not need to be elaborate. It needs to load fast, say the right things and make contact easy. Most of the cost of a bad site is the work it quietly fails to bring in.'
},
'wordpress-developer': {
  process: ['Read the existing build before recommending anything.','Identify what is theme, what is plugin, and what is genuinely custom.','Move business functionality out of the theme so it survives a redesign.','Replace stacked plugins with a small amount of purpose-built code.','Test on staging, including the update path.','Hand over documentation that a non-developer can follow.'],
  signals: ['Your plugin list has grown past twenty and nobody knows what half of them do.','Updates are avoided because something broke last time.','Adding a new item of content takes far longer than it should.','The site slowed down gradually and nobody can say why.','A previous developer left and took the knowledge with them.'],
  close: 'Most WordPress problems are not solved by starting again. They are solved by understanding what is there, removing what is not earning its place, and building the rest properly.'
},
'local-seo-expert': {
  process: ['Audit the Google Business Profile, categories and service area first.','Find and correct inconsistent listings across the web.','Check which local queries you already appear for and where.','Build or fix the pages that target the terms worth pursuing.','Set up tracking so calls and form submissions are attributed.','Review monthly against rankings, calls and enquiries rather than impressions.'],
  signals: ['You do not appear in the map results for your own service and area.','Your Business Profile has old hours, a wrong category or no photos.','Competitors with worse work outrank you locally.','You get traffic but from the wrong places entirely.','Your phone number or address differs between listings.'],
  close: 'Local search is one of the few areas where a small business can genuinely beat a larger one, because proximity and relevance count for more than budget. The work is methodical rather than clever.'
},
'technical-seo-consultant': {
  process: ['Crawl the site and compare what exists against what is indexed.','Check robots directives, canonicals, redirects and status codes.','Validate structured data against what is actually on the page.','Measure Core Web Vitals from real visitor data, not just lab tools.','Review internal linking and how important pages are reached.','Deliver findings ranked by impact, with the fixes described plainly.'],
  signals: ['Pages you publish never appear in search results.','Search Console reports coverage errors you do not understand.','Traffic dropped after a redesign or a migration.','The site is slow on mobile and you have already tried a caching plugin.','You have content that should rank and does not.'],
  close: 'Technical SEO is the part that decides whether everything else can work. Publishing more content on a site search engines cannot crawl properly is spending money to compound an existing problem.'
},
'google-ads-consultant': {
  process: ['Work out what a customer is worth before deciding what a click can cost.','Configure and verify conversion tracking before any budget goes live.','Build the account structure around intent rather than convenience.','Write ads that match the landing page they point at.','Read the search terms report weekly and add negatives.','Report on cost per customer, not impressions.'],
  signals: ['You are spending monthly and cannot say which keyword produced a sale.','Your ads point at the home page rather than a relevant page.','Conversion tracking was never set up, or counts the wrong thing.','Your click costs keep rising and you do not know why.','An agency reports impressions and clicks but never revenue.'],
  close: 'Ads are the fastest way to buy attention and the fastest way to waste money, and the difference is almost entirely measurement. If the numbers do not support paid search, that is worth knowing before the spend rather than after.'
},
'ppc-consultant': {
  process: ['Establish customer value, conversion rate and viable cost per click.','Choose channels based on how your customers actually buy.','Structure the account so results can be read and acted on.','Launch deliberately small, then scale what proves itself.','Cut what does not work quickly rather than defending it.','Report in plain language: spent, returned, changing next.'],
  signals: ['You are running ads because a competitor does, not because the maths works.','Budget is spread across platforms with no clear winner.','Nobody can tell you the cost of acquiring one customer.','Reporting is a dashboard screenshot rather than a conclusion.','Campaigns have not been restructured since they were created.'],
  close: 'Paid media is arithmetic before it is creative. If the numbers do not work, better copy will not rescue them, and the honest recommendation is sometimes to spend the budget somewhere else.'
},
'hubspot-consultant': {
  process: ['Map how you genuinely sell before configuring anything.','Build the pipeline stages around that process, not the default.','Keep custom properties to the few that drive reporting or automation.','Connect the website forms so data arrives clean and attributed.','Automate the repetitive internal steps, not the customer relationship.','Train the people who have to use it daily.'],
  signals: ['Your team keeps a spreadsheet alongside the CRM.','Deal stages do not describe anything your salespeople recognise.','Reporting is unreliable because fields are half filled.','Website enquiries arrive without a source or land in the wrong place.','You are paying for a tier whose features you have never opened.'],
  close: 'A CRM only works when it matches how the business actually operates. Configured against a process nobody follows, it becomes an expensive address book people quietly work around.'
},
'wordpress-malware-removal': {
  process: ['Take a full copy of the site and database before touching anything.','Read server logs to establish the entry point and the timing.','Compare core, theme and plugin files against known-good checksums.','Check the database as well as the filesystem: users, posts, options.','Remove malicious content while preserving legitimate changes.','Patch the vulnerability, rotate every credential, then request review.'],
  signals: ['Google or your browser warns visitors before they reach the site.','Pages contain links to content you never published.','Administrator accounts exist that nobody created.','The site redirects somewhere else, but only for some visitors.','Your host suspended the account for abuse or spam.'],
  close: 'Cleaning a site is the easy half. Establishing how it happened is what stops it happening again, and skipping that step is why so many cleaned sites are reinfected within weeks.'
},
'wordpress-website-speed-optimization': {
  process: ['Measure real-visitor Core Web Vitals before changing anything.','Establish where the time goes: server, images, scripts or layout.','Fix images first, since they are usually the largest share.','Audit what each plugin loads and where it is genuinely needed.','Remove render-blocking resources and defer what can wait.','Add caching last, once the underlying weight is gone.'],
  signals: ['Search Console reports failing Core Web Vitals.','The site feels slow to you on your own phone.','A caching plugin was installed and nothing much changed.','Pages jump around while they load.','Visitors leave before the page finishes appearing.'],
  close: 'Speed work is measurement first and installation last. Most sites get the majority of their improvement from images and unnecessary assets, long before caching is involved at all.'
},
'it-consultant': {
  process: ['Understand the business problem before discussing any technology.','Inventory what you already own and what it can already do.','Recommend configuration over purchase wherever that solves it.','Connect the systems that people are currently bridging by hand.','Get the security basics in place and verified.','Document it so the knowledge belongs to the business.'],
  signals: ['Somebody spends hours a week copying data between systems.','You are paying for software nobody uses.','Only one person understands how anything is set up.','Nobody has ever tested restoring a backup.','Advice you receive always ends in buying something.'],
  close: 'Independent advice is worth what it saves you from buying. Frequently the right answer is to use what you already have properly, which is a poor way to sell licences and a good way to fix problems.'
},
'it-services': {
  process: ['Agree what is covered, what is not, and how quickly you get a response.','Put monitoring in place so problems surface before customers find them.','Apply updates on staging first, with a rollback path ready.','Verify backups by restoring one, not by trusting the dashboard.','Review access and credentials periodically.','Report what was done, in plain language, on a schedule.'],
  signals: ['You found out your site was down because a customer told you.','Nobody is certain when anything was last updated.','Certificates or domains have expired without warning before.','Backups exist but have never been restored.','There is no clear person to call when something breaks.'],
  close: 'Maintenance is unglamorous and it is almost always cheaper than recovery. Nearly every expensive technical emergency was visible in advance to somebody who was looking.'
}
};

const CITY_EXTRA = {
  vancouver: 'Practically, that means a Vancouver site should be built mobile-first without apology. A large share of local searches happen on a phone, often on a patchy connection, and a page that takes six seconds to become useful has already lost to the competitor whose page took two.',
  kelowna: 'It also means seasonality should be designed for rather than survived. A site that carries peak-season traffic without slowing down, and still converts in the quiet months, is worth considerably more than one built only for the busy weeks.',
  edmonton: 'It is worth being explicit about service areas too. Edmonton businesses frequently serve Sherwood Park, St. Albert and the wider capital region, and a site that never names those places will not be found by people searching from them.',
  calgary: 'Given that competition, measurement matters more here than almost anywhere. Knowing which pages bring enquiries, and which merely bring traffic, is what stops a Calgary marketing budget from being spent on activity that looks busy and returns nothing.',
  toronto: 'The practical consequence is that a Toronto site should target the specific rather than the broad. Pages built around a precise service, industry or neighbourhood have a realistic path to ranking; a single page trying to rank for the category has almost none.',
  ottawa: 'Building to accessibility standards from the start is the sensible default here. Retrofitting a site to meet WCAG after a procurement review is consistently more expensive and more disruptive than designing for it in the first place.',
  saskatoon: 'The practical advantage is that fundamentals still win. Correct page titles, real descriptions, structured data and a fast mobile experience are enough to compete in Saskatoon, where many established competitors have none of them.',
  regina: 'It also pays to be explicit about who you serve. A Regina business often works across the province, and stating that plainly turns a page that ranks for one city into one that answers searches from several.'
};

module.exports = { EXTRA, CITY_EXTRA };
