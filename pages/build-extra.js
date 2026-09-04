/* Builds the ten industry pages and the single FAQ page, and rewrites
   sitemap.xml to cover everything.  node pages/build-extra.js            */

const fs = require('fs');
const path = require('path');
const { INDUSTRIES } = require('./industries.js');
const { IND_EXTRA } = require('./indextra.js');
const { IND_CLOSE } = require('./indclose.js');
const { IND_MEASURE } = require('./indmeasure.js');
const { FAQ_INTRO, FAQ_GROUPS } = require('./faq.js');
const { SERVICES } = require('./services.js');
const { CITIES } = require('./content.js');

const ROOT = path.join(__dirname, '..');
const { ORIGIN, GA, NAV, MENU, MENU_JS } = require('./chrome.js');
const STAMP = new Date().toISOString().slice(0, 10);
const WA = 'https://wa.me/17789290374?text=Hello%20Gary!%20I%20just%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20chat.';
const CSS = fs.readFileSync(path.join(ROOT, 'src', 'style.css'), 'utf8');
const LP = fs.readFileSync(path.join(ROOT, 'freelance-web-design-vancouver.html'), 'utf8');
/* reuse the landing page's own stylesheet block so the look stays identical */
const LPCSS = LP.slice(LP.indexOf('/* ---- landing page ---- */'), LP.indexOf('</style>'));

const esc = s => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function shell(o) {
  return `<!doctype html>
<html lang="en-CA" class="no-gsap">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
${GA}
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${o.url}">
<meta name="theme-color" content="#EDF0F5">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gurjot Singh (Gary)">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${o.url}">
${o.image ? `<meta property="og:image" content="${o.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="${o.image}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230066CC'/%3E%3Ctext x='50' y='69' font-family='Helvetica,Arial,sans-serif' font-size='56' font-weight='700' fill='%23FFFFFF' text-anchor='middle'%3EG%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap">
<script type="application/ld+json">${JSON.stringify(o.ld)}</script>
<style>${CSS}
${LPCSS}
.lp__fig{ margin:0 0 clamp(28px,5vw,52px); }
.lp__art--wide{ aspect-ratio:1200/360; }
.lp__fig figcaption{ margin-top:12px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted-2); }
</style>
</head>
<body>
<div class="grain" aria-hidden="true"></div>

<header class="nav stuck">
  <a class="nav__brand" href="/">
    <span class="globe" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation">
        <circle class="globe__ocean" cx="20" cy="20" r="19"/>
        <circle class="globe__rim" cx="20" cy="20" r="19"/>
      </svg>
    </span>
    <span class="nav__brandtext">Gurjot Singh <em>&ldquo;Gary&rdquo;</em></span>
  </a>
${NAV}
</header>

${MENU}

<main class="lp">
  <div class="wrap">
    <nav class="mono lp__crumb" aria-label="Breadcrumb">${o.crumb}</nav>
    <h1>${esc(o.h1)}</h1>
    <p class="lp__lede">${esc(o.lede)}</p>
${o.art || ''}
${o.body}
    <div class="lp__cta">
      <a class="btn btn--fill" href="${WA}" target="_blank" rel="noopener noreferrer"><span>Let&rsquo;s talk</span><i class="arr">&nearr;</i></a>
      <a class="btn" href="mailto:gurjotangad97@gmail.com"><span>Email instead</span><i class="arr">&nearr;</i></a>
    </div>
${o.links || ''}
  </div>
</main>

<footer class="foot">
  <div class="wrap foot__bar mono">
    <span>&copy; ${new Date().getFullYear()} Gurjot Singh (Gary). All rights reserved.</span>
    <span class="foot__mid">Web &amp; marketing &middot; IT &amp; CRM &middot; AI automation</span>
    <a href="/">Back to home &uarr;</a>
  </div>
</footer>
${MENU_JS}
</body>
</html>`;
}

/* ------------------------------------------------------- industry pages */
fs.mkdirSync(path.join(ROOT, 'industries'), { recursive: true });
let indCounts = [];

INDUSTRIES.forEach(ind => {
  const url = ORIGIN + '/industries/' + ind.slug;
  const title = ind.kw + ' | Gurjot Singh (Gary)';
  const h1 = 'Web design and marketing for ' + ind.name.toLowerCase() + ' in Canada';

  const body = ind.sections.map(s =>
    `    <section class="lp__block">
      <h2>${esc(s.h)}</h2>
      ${s.p.map(p => `<p>${esc(p)}</p>`).join('\n      ')}
    </section>`).join('\n') +
`
    <section class="lp__block">
      <h2>${esc((IND_EXTRA[ind.slug]||{}).h || "In Canada")}</h2>
      ${((IND_EXTRA[ind.slug]||{}).p || []).map(p => `<p>${esc(p)}</p>`).join("\n      ")}
    </section>

    <section class="lp__block">
      <h2>Where these projects usually start</h2>
      <ol class="lp__steps">
        ${((IND_EXTRA[ind.slug]||{}).start || []).map(s => `<li>${esc(s)}</li>`).join("\n        ")}
      </ol>
    </section>

    <section class="lp__block">
      <h2>What these sites need</h2>
      <ul class="lp__signals">
        ${ind.needs.map(n => `<li>${esc(n)}</li>`).join('\n        ')}
      </ul>
    </section>

    <figure class="lp__fig">
      <img class="lp__art lp__art--wide" src="/img/industries/${ind.slug}-flow.svg" width="1200" height="360"
           loading="lazy" decoding="async" alt="How a visitor moves from arriving on the site to deciding to get in touch">
      <figcaption class="mono">Arrive, decide, act. Most sites in this sector lose people at the middle step.</figcaption>
    </figure>

    <section class="lp__block">
      <h2>What to measure</h2>
      ${(IND_MEASURE[ind.slug]||[]).map(p => `<p>${esc(p)}</p>`).join('\n      ')}
    </section>

    <section class="lp__block">
      <h2>Getting started</h2>
      ${(IND_CLOSE[ind.slug]||[]).map(p => `<p>${esc(p)}</p>`).join('\n      ')}
    </section>

    <section class="lp__block">
      <h2>Common questions</h2>
${ind.faq.concat((IND_EXTRA[ind.slug]||{}).faq2 || []).map(f => `      <details class="lp__faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
    </section>`;

  const others = INDUSTRIES.filter(i => i.slug !== ind.slug)
    .map(i => `<li><a href="/industries/${i.slug}">${esc(i.short)}</a></li>`).join('');
  const svcs = SERVICES.slice(0, 6)
    .map(s => `<li><a href="/${s.slug}-vancouver">${esc(s.name)}</a></li>`).join('');

  const links = `    <div class="lp__links">
      <div><h3 class="mono">Other industries</h3><ul>${others}</ul></div>
      <div><h3 class="mono">Services</h3><ul>${svcs}</ul></div>
    </div>`;

  const ld = { '@context':'https://schema.org', '@graph':[
    { '@type':'ProfessionalService', '@id':url+'#business', name:'Gurjot Singh (Gary)',
      description:h1, url:url, telephone:'+1-778-929-0374', email:'gurjotangad97@gmail.com',
      areaServed:{ '@type':'Country', name:'Canada' },
      founder:{ '@type':'Person', name:'Gurjot Singh', alternateName:'Gary' } },
    { '@type':'BreadcrumbList', itemListElement:[
      { '@type':'ListItem', position:1, name:'Home', item:ORIGIN+'/' },
      { '@type':'ListItem', position:2, name:'Industries', item:url },
      { '@type':'ListItem', position:3, name:ind.name, item:url } ] },
    { '@type':'FAQPage', mainEntity: ind.faq.concat((IND_EXTRA[ind.slug]||{}).faq2 || []).map(f => ({ '@type':'Question', name:f.q,
      acceptedAnswer:{ '@type':'Answer', text:f.a } })) }
  ]};

  const art = '    <img class="lp__art" src="/img/industries/' + ind.slug + '.svg" width="1200" height="630"\n' +
    '         decoding="async" alt="' + esc(ind.short) + ' web design and marketing in Canada">';

  const html = shell({
    title, desc: ind.lede.slice(0, 155), url, h1, lede: ind.lede, body, links, ld, art,
    image: ORIGIN + '/img/industries/' + ind.slug + '.svg',
    crumb: `<a href="/">Home</a> &nbsp;/&nbsp; Industries &nbsp;/&nbsp; ${esc(ind.short)}`
  });
  fs.writeFileSync(path.join(ROOT, 'industries', ind.slug + '.html'), html);
  const words = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'')
    .replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ').split(/\s+/).filter(Boolean).length;
  indCounts.push(words);
});

/* ---------------------------------------------------------- faq page */
const faqBody = FAQ_GROUPS.map(g =>
`    <section class="lp__block">
      <h2>${esc(g.h)}</h2>
${g.items.map(i => `      <details class="lp__faq"><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`).join('\n')}
    </section>`).join('\n');

const allQ = FAQ_GROUPS.flatMap(g => g.items);
const faqHtml = shell({
  title: 'Frequently Asked Questions | Gurjot Singh (Gary)',
  desc: 'Straight answers on pricing, timelines, SEO, security and what happens after launch. Including the questions most agencies avoid.',
  url: ORIGIN + '/faq',
  h1: 'Questions, answered plainly',
  lede: FAQ_INTRO[0],
  image: ORIGIN + '/img/faq.svg',
  art: '    <img class="lp__art" src="/img/faq.svg" width="1200" height="630" decoding="async" alt="Frequently asked questions about web design, marketing, IT consulting and automation">',
  body: `    <section class="lp__block"><p>${esc(FAQ_INTRO[1])}</p></section>\n` + faqBody,
  ld: { '@context':'https://schema.org', '@graph':[
    { '@type':'FAQPage', mainEntity: allQ.map(i => ({ '@type':'Question', name:i.q,
      acceptedAnswer:{ '@type':'Answer', text:i.a } })) },
    { '@type':'BreadcrumbList', itemListElement:[
      { '@type':'ListItem', position:1, name:'Home', item:ORIGIN+'/' },
      { '@type':'ListItem', position:2, name:'FAQ', item:ORIGIN+'/faq' } ] }
  ]},
  crumb: '<a href="/">Home</a> &nbsp;/&nbsp; FAQ'
});
fs.writeFileSync(path.join(ROOT, 'faq.html'), faqHtml);

/* ---------------------------------------------------------- sitemap */
const urls = [ORIGIN + '/', ORIGIN + '/faq']
  .concat(INDUSTRIES.map(i => ORIGIN + '/industries/' + i.slug))
  .concat(SERVICES.flatMap(s => CITIES.map(c => ORIGIN + '/' + s.slug + '-' + c.slug)));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + u + '</loc><lastmod>' + STAMP + '</lastmod></url>').join('\n') + '\n</urlset>\n');

console.log('industry pages : ' + INDUSTRIES.length + '  (words ' + Math.min(...indCounts) + '-' + Math.max(...indCounts) + ')');
console.log('faq questions  : ' + allQ.length + ' across ' + FAQ_GROUPS.length + ' groups');
console.log('sitemap urls   : ' + urls.length);
