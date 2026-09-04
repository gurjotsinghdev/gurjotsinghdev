/* Content library for the location landing pages.
   Twelve service articles, written once each and genuinely different from one
   another, combined with eight city profiles. No invented clients, no
   fabricated metrics, no case studies. */

const CITIES = [
  {
    name: 'Vancouver', slug: 'vancouver', province: 'British Columbia', prov: 'BC',
    blurb: 'Vancouver runs on small teams. Agencies of three, restaurants with one owner-operator, trades businesses where the person answering the phone is also the person on site.',
    paras: [
      'I am based in Vancouver, which means a call about your site happens in your hours, not eight time zones away. If a checkout breaks at 4pm on a Friday you are not waiting until Monday morning somewhere else for someone to read the ticket.',
      'The city has a particular mix: hospitality on Powell and Main, professional services downtown, trades and home services spread through Burnaby, Surrey and the North Shore, and a steady layer of startups in Mount Pleasant and Gastown. Those need very different sites. A restaurant needs a menu that changes weekly, a reservation link that works on a phone, and photographs that load fast on transit. A consultancy needs credibility, clear service pages and a contact route that does not feel like a form graveyard.',
      'Competition for search terms here is real. "Web designer Vancouver" is contested by agencies with budgets. What actually wins local work is specificity: the neighbourhood you serve, the kind of business you build for, and a site that loads quickly on a phone on a bus.'
    ]
  },
  {
    name: 'Kelowna', slug: 'kelowna', province: 'British Columbia', prov: 'BC',
    blurb: 'Kelowna trades on relationships. Work arrives through referral, and your website is usually the second thing someone checks after being told your name.',
    paras: [
      'Kelowna and the wider Okanagan run on referral and reputation. Somebody hears your name at a chamber event or from a neighbour, then looks you up. That lookup is the whole job of the site: confirm the person is real, competent and reachable.',
      'The local economy skews toward wineries and tourism, construction and trades, professional services, and a growing tech and procurement sector. Seasonality matters more here than on the coast. A tourism business needs a site that carries the summer load and still sells in February. A trades business needs to be found the moment something breaks.',
      'Search volumes are smaller than Vancouver, which cuts both ways. Fewer people are searching, but far fewer businesses have done the basic work of a fast, properly structured site. The bar to rank in Kelowna is lower, and the payoff per lead is often higher.'
    ]
  },
  {
    name: 'Edmonton', slug: 'edmonton', province: 'Alberta', prov: 'AB',
    blurb: 'Edmonton is a working city. Industrial services, trades, healthcare and public sector suppliers make up much of the client base, and they want a site that is plain, fast and correct.',
    paras: [
      'Edmonton business tends to be practical. Industrial and energy services, construction, healthcare, logistics and a large public sector. Those buyers are not looking to be dazzled. They want to confirm you do the thing, that you have done it before, and that they can reach a person.',
      'That shapes the build. Clear service pages beat clever ones. Phone numbers above the fold beat contact forms. Fast loading matters because a lot of that audience is checking from a truck on mobile data, not a fibre connection at a desk.',
      'Winter also matters more than people expect. Emergency and seasonal service businesses see enormous search spikes, and a site that falls over or takes eight seconds to load during that spike is losing the exact leads it exists to catch.'
    ]
  },
  {
    name: 'Calgary', slug: 'calgary', province: 'Alberta', prov: 'AB',
    blurb: 'Calgary has more competition for the same searches than most Canadian cities its size, and the businesses that win are usually the ones that took technical SEO seriously first.',
    paras: [
      'Calgary is a competitive search market. Energy, professional services, consulting and a dense small-business layer all fight for the same terms, and many of them have already paid an agency. Turning up with a slow, thin site is not going to move anything.',
      'What still moves the needle here is technical quality: correct structured data, fast Core Web Vitals, a proper internal linking structure and service pages that actually answer the question a buyer typed. Most competitors have a site; far fewer have one that is technically sound.',
      'The other Calgary pattern is a long sales cycle. Someone may find you months before they hire. The site has to hold up to being read carefully rather than skimmed, which means real content, not a hero image and three adjectives.'
    ]
  },
  {
    name: 'Toronto', slug: 'toronto', province: 'Ontario', prov: 'ON',
    blurb: 'Toronto is the hardest market in the country to rank in and the largest to win from. Both of those are true at once.',
    paras: [
      'Toronto has more agencies, more freelancers and more budget than anywhere else in Canada. Broad terms are effectively bought. Ranking here comes from being specific: the neighbourhood, the industry, the exact problem, rather than the generic service word.',
      'The upside is scale. A single ranking position for a narrow term in Toronto can be worth more than a broad position in a smaller city, because the volume behind even a specific query is substantial.',
      'It is also the market where technical quality separates people fastest. When twenty competitors all have similar copy, page speed, structured data and mobile experience become the deciding factors, and a large share of Toronto small business sites are still built on bloated themes that fail Core Web Vitals.'
    ]
  },
  {
    name: 'Ottawa', slug: 'ottawa', province: 'Ontario', prov: 'ON',
    blurb: 'Ottawa has an unusual buyer mix: government and its suppliers, plus a tech sector, plus ordinary local business. Each wants something different from a website.',
    paras: [
      'Ottawa is shaped by the public sector. Government departments, their contractors and the compliance layer around them make up a large share of local business, and they bring requirements most cities do not: accessibility standards, bilingual content, procurement-friendly documentation.',
      'Accessibility in particular is not optional here. Sites serving public sector buyers are expected to meet WCAG standards, and building that in from the start is far cheaper than retrofitting after a review.',
      'Alongside that sits a real tech sector and a normal local economy of trades, clinics and restaurants. The result is that a good Ottawa site often needs to be more rigorous than its equivalent elsewhere while still being warm enough to sell.'
    ]
  },
  {
    name: 'Saskatoon', slug: 'saskatoon', province: 'Saskatchewan', prov: 'SK',
    blurb: 'Saskatoon is a market where doing the basics properly still wins, because a striking number of local competitors have not.',
    paras: [
      'Saskatoon runs on agriculture, mining, healthcare and a solid layer of local trades and professional services. Many of those businesses have a website that was built once, years ago, and has not been touched since.',
      'That is an opportunity rather than a criticism. In a market where the top results are slow, unstructured and often not mobile-friendly, a fast well-structured site can rank without an enormous content budget behind it.',
      'The other local reality is distance. A lot of Saskatchewan business is conducted across long drives and thin mobile signal. Pages that are light and work on a poor connection genuinely convert better here than pages that assume broadband.'
    ]
  },
  {
    name: 'Regina', slug: 'regina', province: 'Saskatchewan', prov: 'SK',
    blurb: 'Regina rewards clarity. It is a smaller market with a strong government and insurance presence and a business community where word travels quickly.',
    paras: [
      'Regina combines provincial government, insurance and utilities with a close-knit small business community. Reputation moves fast in both directions, which makes the honesty of a website matter more than its polish.',
      'Search competition is comparatively light. Ranking for a specific service in Regina is realistic within months rather than years, provided the page genuinely answers the query and the site is technically sound.',
      'Because the market is small, breadth matters. A Regina business often serves the whole province, so a site should make the service area explicit rather than assuming the reader knows.'
    ]
  }
];

module.exports = { CITIES };
