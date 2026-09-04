/* Generates one landing page per service and city, plus sitemap.xml and
   robots.txt. Run from the project root:  node pages/build.js            */

const fs = require('fs');
const path = require('path');
const { CITIES } = require('./content.js');
const { SERVICES } = require('./services.js');
const { EXTRA, CITY_EXTRA } = require('./extra.js');
const { CITY_MORE } = require('./cityextra.js');

const ROOT = path.join(__dirname, '..');
const { ORIGIN, GA, NAV, MENU, MENU_JS } = require('./chrome.js');
const STAMP = new Date().toISOString().slice(0, 10);
const WA = 'https://wa.me/17789290374?text=Hello%20Gary!%20I%20just%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20chat.';
const CSS = fs.readFileSync(path.join(ROOT, 'src', 'style.css'), 'utf8');

const esc = s => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slugFor = (svc, city) => svc.slug + '-' + city.slug;

/* ------------------------------------------------------------------ page */
function page(svc, city) {
  const url = ORIGIN + '/' + slugFor(svc, city);
  const h1 = svc.name + ' in ' + city.name;
  const title = svc.name + ' ' + city.name + ' | Gurjot Singh (Gary)';
  const desc = svc.lede.replace(/\s+/g, ' ').slice(0, 150).trim();

  /* siblings: same service elsewhere, and other services in this city */
  const sameService = CITIES.filter(c => c.slug !== city.slug)
    .map(c => `<li><a href="/${slugFor(svc, c)}">${esc(svc.name)} ${esc(c.name)}</a></li>`).join('');
  const sameCity = SERVICES.filter(s => s.slug !== svc.slug)
    .map(s => `<li><a href="/${slugFor(s, city)}">${esc(s.name)} ${esc(city.name)}</a></li>`).join('');

  const body = svc.sections.map(sec =>
    `        <section class="lp__block">
          <h2>${esc(sec.h)}</h2>
          ${sec.p.map(p => `<p>${esc(p)}</p>`).join('\n          ')}
        </section>`).join('\n');

  const cityParas = city.paras.concat([CITY_EXTRA[city.slug]]).filter(Boolean)
    .map(p => `<p>${esc(p)}</p>`).join('\n          ');

  const x = EXTRA[svc.slug] || { process: [], signals: [], close: '' };
  const processList = x.process.map(i => `<li>${esc(i)}</li>`).join('\n        ');
  const signalList = x.signals.map(i => `<li>${esc(i)}</li>`).join('\n        ');

  const more = CITY_MORE[city.slug];
  const moreBlock = more ? ['    <section class="lp__block">',
      '      <h2>' + esc(more.h) + '</h2>',
      more.p.map(p => '      <p>' + esc(p) + '</p>').join('\n'),
      '    </section>'].join('\n') : '';

  const faq = svc.faq.map(f =>
    `          <details class="lp__faq">
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`).join('\n');

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': url + '#business',
        name: 'Gurjot Singh (Gary)',
        description: svc.name + ' for businesses in ' + city.name + ', ' + city.province + '.',
        url: url,
        telephone: '+1-778-929-0374',
        email: 'gurjotangad97@gmail.com',
        areaServed: { '@type': 'City', name: city.name, address: { '@type': 'PostalAddress', addressRegion: city.prov, addressCountry: 'CA' } },
        founder: { '@type': 'Person', name: 'Gurjot Singh', alternateName: 'Gary' }
      },
      {
        '@type': 'Service', '@id': url + '#service',
        serviceType: svc.name, name: h1,
        provider: { '@id': url + '#business' },
        areaServed: { '@type': 'City', name: city.name }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' },
          { '@type': 'ListItem', position: 2, name: city.name, item: url },
          { '@type': 'ListItem', position: 3, name: svc.name, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: svc.faq.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };

  return `<!doctype html>
<html lang="en-CA" class="no-gsap">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
${GA}
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#EDF0F5">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gurjot Singh (Gary)">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/img/${svc.slug}.svg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${ORIGIN}/img/${svc.slug}.svg">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230066CC'/%3E%3Ctext x='50' y='69' font-family='Helvetica,Arial,sans-serif' font-size='56' font-weight='700' fill='%23FFFFFF' text-anchor='middle'%3EG%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CSS}
/* ---- landing page ---- */
.lp{ padding:clamp(96px,13vh,150px) 0 clamp(48px,7vh,88px); }
.lp__crumb{ color:var(--muted-2); margin-bottom:clamp(16px,2.4vh,26px); }
.lp__crumb a{ color:var(--muted); } .lp__crumb a:hover{ color:var(--acid-ink); }
.lp h1{ font-family:var(--f-display); font-weight:600; letter-spacing:-.04em; line-height:.98;
  font-size:clamp(34px,5.6vw,74px); max-inline-size:18ch; margin-bottom:clamp(16px,2.4vh,26px); }
.lp__lede{ font-size:clamp(17px,1.5vw,22px); line-height:1.55; color:var(--body); max-inline-size:60ch; }
/* width and height are on the element so the space is reserved before the
   file arrives and the page does not jump while it loads */
.lp__art{ display:block; width:100%; height:auto; aspect-ratio:1200/630;
  border-radius:20px; margin:clamp(28px,4vh,52px) 0; background:var(--ink-2); }
.lp__block{ padding-block:clamp(22px,3vh,34px); border-top:1px solid var(--line-2); }
.lp__block h2{ font-family:var(--f-display); font-weight:600; letter-spacing:-.03em;
  font-size:clamp(22px,2.6vw,34px); margin-bottom:14px; max-inline-size:26ch; }
.lp__block p, .lp__city p{ color:var(--body); font-size:clamp(15px,1.15vw,17px); line-height:1.7;
  max-inline-size:68ch; margin-bottom:14px; }
.lp__city{ padding-block:clamp(22px,3vh,34px); border-top:1px solid var(--line-2); }
.lp__faq{ border-top:1px solid var(--line-2); padding-block:14px; }
.lp__faq summary{ cursor:pointer; font-weight:500; font-size:clamp(15px,1.2vw,18px); list-style:none; }
.lp__faq summary::-webkit-details-marker{ display:none; }
.lp__faq summary::before{ content:"+"; color:var(--acid-ink); margin-right:10px; }
.lp__faq[open] summary::before{ content:"\\2212"; }
.lp__faq p{ color:var(--body); font-size:15px; line-height:1.65; margin:10px 0 4px 22px; max-inline-size:66ch; }
.lp__steps, .lp__signals{ max-inline-size:66ch; margin:4px 0 10px; }
.lp__steps li, .lp__signals li{ position:relative; padding:9px 0 9px 30px; border-top:1px solid var(--line-2);
  color:var(--body); font-size:clamp(14.5px,1.1vw,16.5px); line-height:1.55; }
.lp__steps{ counter-reset:step; }
.lp__steps li::before{ counter-increment:step; content:counter(step,decimal-leading-zero);
  position:absolute; left:0; top:11px; font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; color:var(--acid-ink); }
.lp__signals li::before{ content:"\\2192"; position:absolute; left:0; top:9px; color:var(--acid-ink); }
.lp__cta{ margin-top:clamp(30px,4vh,54px); display:flex; gap:12px; flex-wrap:wrap; }
.lp__links{ padding-block:clamp(24px,3.4vh,40px); border-top:1px solid var(--line-2);
  display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:clamp(18px,2.4vw,36px); }
.lp__links h3{ color:var(--muted-2); margin-bottom:10px; }
.lp__links ul{ display:grid; gap:5px; }
.lp__links a{ font-size:12.5px; line-height:1.45; color:var(--muted); }
.lp__links a:hover{ color:var(--acid-ink); }
</style>
</head>
<body>
<div class="grain" aria-hidden="true"></div>

<header class="nav stuck" id="nav">
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
    <nav class="mono lp__crumb" aria-label="Breadcrumb">
      <a href="/">Home</a> &nbsp;/&nbsp; ${esc(city.name)}, ${esc(city.prov)} &nbsp;/&nbsp; ${esc(svc.name)}
    </nav>

    <h1>${esc(h1)}</h1>
    <p class="lp__lede">${esc(svc.lede)}</p>

    <img class="lp__art" src="/img/${svc.slug}.svg" width="1200" height="630" decoding="async"
         alt="${esc(svc.name)} in ${esc(city.name)}, ${esc(city.province)}">

${body}

    <section class="lp__block">
      <h2>What the work usually involves</h2>
      <ol class="lp__steps">
        ${processList}
      </ol>
    </section>

    <section class="lp__block">
      <h2>Signs you need ${esc(svc.name.toLowerCase())}</h2>
      <ul class="lp__signals">
        ${signalList}
      </ul>
      <p>${esc(x.close)}</p>
    </section>

    <section class="lp__city">
      <h2>${esc(svc.name)} for ${esc(city.name)} businesses</h2>
      <p><strong>${esc(city.blurb)}</strong></p>
      ${cityParas}
    </section>

${moreBlock}

    <section class="lp__block">
      <h2>Common questions</h2>
${faq}
    </section>

    <div class="lp__cta">
      <a class="btn btn--fill" href="${WA}" target="_blank" rel="noopener noreferrer"><span>Let&rsquo;s talk</span><i class="arr">&nearr;</i></a>
      <a class="btn" href="mailto:gurjotangad97@gmail.com?subject=${encodeURIComponent(svc.name + ' ' + city.name)}"><span>Email instead</span><i class="arr">&nearr;</i></a>
    </div>

    <div class="lp__links">
      <div>
        <h3 class="mono">${esc(svc.name)} elsewhere</h3>
        <ul>${sameService}</ul>
      </div>
      <div>
        <h3 class="mono">Other services in ${esc(city.name)}</h3>
        <ul>${sameCity}</ul>
      </div>
    </div>
  </div>
</main>

<footer class="foot">
  <div class="wrap foot__bar mono">
    <span>&copy; ${new Date().getFullYear()} Gurjot Singh (Gary). All rights reserved.</span>
    <span class="foot__mid">Web design &middot; Digital marketing &middot; IT consulting</span>
    <a href="/">Back to home &uarr;</a>
  </div>
</footer>
${MENU_JS}
</body>
</html>`;
}

/* ------------------------------------------------------------------ run */
let written = 0, counts = [];
SERVICES.forEach(svc => CITIES.forEach(city => {
  const html = page(svc, city);
  fs.writeFileSync(path.join(ROOT, slugFor(svc, city) + '.html'), html);
  const words = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').split(/\s+/).filter(Boolean).length;
  counts.push({ slug: slugFor(svc, city), words });
  written++;
}));

/* sitemap + robots */
const urls = [ORIGIN + '/'].concat(
  SERVICES.flatMap(s => CITIES.map(c => ORIGIN + '/' + slugFor(s, c))));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + u + '</loc><lastmod>' + STAMP + '</lastmod></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + ORIGIN + '/sitemap.xml\n');

const min = Math.min(...counts.map(c => c.words));
const max = Math.max(...counts.map(c => c.words));
console.log('pages written : ' + written);
console.log('word count    : min ' + min + ', max ' + max);
console.log('under 1000    : ' + counts.filter(c => c.words < 1000).length);
console.log('sitemap urls  : ' + urls.length);
