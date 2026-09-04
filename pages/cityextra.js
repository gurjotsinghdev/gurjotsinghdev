/* A second, longer city block. Expanding the city material rather than the
   service material is deliberate: the service article is already shared by
   eight pages, so city content is the part that genuinely distinguishes one
   page from another. */

const CITY_MORE = {
  vancouver: {
    h: 'What Vancouver businesses tend to need first',
    p: [
      'The most common gap in Vancouver is not design, it is speed. A great many local sites were built on a purchased theme with a page builder, half a dozen sliders and an image library nobody compressed, and they take five or six seconds to become useful on a phone. In a city where a large share of browsing happens on transit, that is the difference between an enquiry and a back button.',
      'The second gap is service pages. Businesses here often have one page listing everything they do, which means they rank for none of it. Splitting that into a real page per service, each written in the language customers actually search with, is usually the single highest-return change available.',
      'The third is proof. Vancouver buyers are sceptical and comparison-shop hard. Named clients, real photographs of real work and specific outcomes do more than any amount of adjective. If the site cannot answer "has this person done my kind of job before" within a few seconds, the visitor goes back to the results page.'
    ]
  },
  kelowna: {
    h: 'What Kelowna businesses tend to need first',
    p: [
      'In Kelowna the most common problem is a site that has quietly stopped matching the business. Services have changed, staff have changed, the pricing has moved, and the site still describes the company as it was four years ago. Because most work arrives by referral, that mismatch does real damage: somebody is sent your way and finds a page that contradicts what they were told.',
      'The second is mobile. Okanagan visitors and residents alike are frequently searching on a phone, often while out, and often on a connection that is worse than it looks. Sites built desktop-first and squeezed down afterwards lose those people quietly.',
      'The third is local search setup. A properly configured Google Business Profile, correct categories and a service area that reflects where you actually work will typically move more enquiries in Kelowna than a redesign will, because the map results sit above everything else and the competition for them is thinner than on the coast.'
    ]
  },
  edmonton: {
    h: 'What Edmonton businesses tend to need first',
    p: [
      'Edmonton sites most often fail on clarity rather than aesthetics. A visitor lands and cannot immediately tell which of six services you actually specialise in, whether you cover their area, or how to reach a human. Fixing that ordering, service, area, contact, usually outperforms any visual change.',
      'The second is capacity under load. Seasonal and emergency service businesses here see genuine spikes, and a site running on cheap shared hosting with unoptimised images will be at its slowest exactly when it matters most. Preparing for the spike is far cheaper than losing it.',
      'The third is trust signals appropriate to the buyer. Industrial, healthcare and public sector purchasers care about certifications, insurance, safety records and references far more than they care about a hero video. Putting those where they can be found quickly shortens the sales cycle.'
    ]
  },
  calgary: {
    h: 'What Calgary businesses tend to need first',
    p: [
      'Because Calgary is competitive, the most valuable early work is usually diagnostic rather than creative. Before spending on content or ads, it is worth establishing what is already ranking, what is indexed, what the site actually loads and where enquiries currently come from. A surprising number of Calgary businesses are paying for marketing on top of a site that search engines cannot crawl properly.',
      'The second is differentiation in the copy. When a dozen competitors describe themselves in identical language, the page that names the specific problem, industry or situation wins the click even from a lower position. Generic service copy is invisible in a crowded market.',
      'The third is attribution. In a long sales cycle it is easy to credit the last click and quietly defund the channel that actually started the relationship. Setting up tracking that survives a multi-month consideration period changes which decisions look correct.'
    ]
  },
  toronto: {
    h: 'What Toronto businesses tend to need first',
    p: [
      'In Toronto the first job is usually to narrow the target. Trying to rank for the category term is a budget the vast majority of businesses cannot win, and pursuing it burns money that would have produced results aimed somewhere achievable. Specific service, specific industry, specific area.',
      'The second is technical quality, because it is the tiebreaker. When twenty competitors have comparable content, the ones that load quickly, pass Core Web Vitals and carry correct structured data get the advantage. A large share of Toronto small business sites still run on heavy themes that fail those checks.',
      'The third is conversion. Toronto traffic is expensive whether you buy it or earn it, so a site that converts at one percent instead of three is wasting two thirds of everything spent to bring people there. Fixing the page people land on frequently returns more than increasing traffic to it.'
    ]
  },
  ottawa: {
    h: 'What Ottawa businesses tend to need first',
    p: [
      'Accessibility is usually the first genuine requirement in Ottawa, and it is the one most often discovered late. Colour contrast, keyboard navigation, form labels, headings in a logical order and text alternatives for images are not difficult to build in from the start, and are expensive and disruptive to retrofit once a review has flagged them.',
      'The second is documentation and credibility for procurement. Public sector and adjacent buyers frequently need to verify who they are dealing with before a conversation starts. Clear company information, named people, and straightforward service descriptions do more here than persuasive marketing language.',
      'The third is bilingual consideration. Not every Ottawa business needs a French version, but the ones that do need it planned rather than bolted on, because retrofitting a second language into a site that assumed one is consistently painful.'
    ]
  },
  saskatoon: {
    h: 'What Saskatoon businesses tend to need first',
    p: [
      'The most common Saskatoon situation is a site that was built once and never revisited. It still works, more or less, but it is slow, it is not properly mobile, and nothing about it has been updated since launch. The opportunity is that this is also true of many local competitors, so relatively modest work produces visible ranking movement.',
      'The second is page weight. Given the distances involved and the variability of rural connections, a page that assumes broadband will simply fail for a share of the audience. Building light is not an optimisation here, it is a requirement.',
      'The third is being explicit about service area. Saskatoon businesses frequently serve well beyond the city, and a site that never names the surrounding communities will not appear for people searching from them, no matter how good the rest of it is.'
    ]
  },
  regina: {
    h: 'What Regina businesses tend to need first',
    p: [
      'In Regina the fundamentals are usually still available. Correct titles and descriptions, a proper page per service, structured data and a fast mobile experience are enough to compete for most local terms, because a large share of the current results have not done that work.',
      'The second is reachability. In a market where reputation travels fast, making it easy to reach an actual person matters more than a polished contact form. A visible phone number, a real address or service area, and a response time you actually meet.',
      'The third is provincial reach. Many Regina businesses serve Saskatchewan as a whole, and framing the site around the province rather than only the city turns a page competing for one small search volume into one answering several.'
    ]
  }
};

module.exports = { CITY_MORE };
