/* Generates the artwork for the industry pages as real .svg files in
   /img/industries. Two per industry: a 1200x630 hero that doubles as the
   og:image, and a wider, quieter 1200x360 figure for further down the page.
   Drawn rather than photographed, in the same schematic language as the
   service illustrations, so the two page types feel like one site. */

const fs = require('fs');
const path = require('path');
const { INDUSTRIES } = require('./industries.js');

const W = 1200, H = 630;
const w = o => 'rgba(255,255,255,' + o + ')';
const ink = 'rgba(0,0,0,.5)';

/* palette per industry: a warm-to-deep pair, none of them repeating */
const PAL = {
  'restaurants':                  ['#E8654A', '#3B1220'],
  'real-estate':                  ['#4C8DF6', '#12224A'],
  'trades-and-home-services':     ['#F2A93B', '#3A2208'],
  'healthcare-and-clinics':       ['#3FBFA8', '#0B3A38'],
  'professional-services':        ['#8C7BE8', '#221B4A'],
  'construction':                 ['#F0C23C', '#38290A'],
  'ecommerce-and-retail':         ['#EE6FA8', '#3C1030'],
  'publishing-and-media':         ['#5FC2E8', '#0E2C42'],
  'nonprofits-and-associations':  ['#67C56B', '#0F3418'],
  'manufacturing-and-industrial': ['#9AA6B4', '#1A2230']
};

const MOTIF = {

/* a plate, cutlery, and the phone the menu is actually read on */
'restaurants': `
  <circle cx="520" cy="326" r="150" fill="${w('.10')}" stroke="${w('.55')}" stroke-width="3"/>
  <circle cx="520" cy="326" r="112" fill="none" stroke="${w('.3')}" stroke-width="2"/>
  <circle cx="520" cy="326" r="62" fill="${w('.22')}"/>
  <path d="M318 208v92a22 22 0 0 0 22 22v122" fill="none" stroke="${w('.8')}" stroke-width="10" stroke-linecap="round"/>
  <path d="M318 208v76M344 208v76" stroke="${w('.5')}" stroke-width="6" stroke-linecap="round"/>
  <path d="M712 208c-26 18-26 84 0 100v136" fill="none" stroke="${w('.8')}" stroke-width="10" stroke-linecap="round"/>
  <rect x="782" y="164" width="176" height="304" rx="24" fill="${w('.13')}" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="838" y="182" width="64" height="7" rx="3" fill="${w('.45')}"/>
  <rect x="806" y="216" width="128" height="14" rx="6" fill="${w('.85')}"/>
  <rect x="806" y="252" width="96" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="806" y="276" width="112" height="9" rx="4" fill="${w('.28')}"/>
  <rect x="806" y="312" width="128" height="14" rx="6" fill="${w('.7')}"/>
  <rect x="806" y="348" width="88" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="806" y="412" width="128" height="36" rx="18" fill="${w('.92')}"/>`,

/* a house, a pin, and a listing card */
'real-estate': `
  <path d="M300 330l190-152 190 152" fill="none" stroke="${w('.85')}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="352" y="330" width="276" height="164" rx="10" fill="${w('.12')}" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="398" y="368" width="76" height="66" rx="6" fill="${w('.34')}"/>
  <rect x="510" y="368" width="76" height="66" rx="6" fill="${w('.34')}"/>
  <rect x="452" y="452" width="72" height="42" rx="5" fill="${w('.6')}"/>
  <path d="M812 152c-46 0-84 38-84 84 0 63 84 152 84 152s84-89 84-152c0-46-38-84-84-84z" fill="${w('.92')}"/>
  <circle cx="812" cy="236" r="30" fill="${ink}"/>
  <rect x="700" y="404" width="224" height="112" rx="12" fill="${w('.14')}" stroke="${w('.5')}" stroke-width="2"/>
  <rect x="724" y="428" width="118" height="14" rx="6" fill="${w('.8')}"/>
  <rect x="724" y="458" width="80" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="724" y="480" width="140" height="9" rx="4" fill="${w('.26')}"/>`,

/* a wrench and the phone that rings because of it */
'trades-and-home-services': `
  <path d="M336 214a86 86 0 0 0 106 106l186 186a34 34 0 0 0 48-48L490 272a86 86 0 0 0-106-106l58 58-30 74-74 30z"
        fill="${w('.9')}" stroke="${w('.4')}" stroke-width="2"/>
  <rect x="736" y="152" width="188" height="326" rx="26" fill="${w('.13')}" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="796" y="172" width="68" height="7" rx="3" fill="${w('.45')}"/>
  <circle cx="830" cy="278" r="58" fill="${w('.9')}"/>
  <path d="M806 256c-4 26 18 48 44 44l10-16-22-14-10 10a34 34 0 0 1-14-14l10-10-14-22z" fill="${ink}"/>
  <rect x="768" y="376" width="124" height="12" rx="6" fill="${w('.5')}"/>
  <rect x="768" y="404" width="90" height="12" rx="6" fill="${w('.32')}"/>
  <rect x="768" y="440" width="124" height="18" rx="9" fill="${w('.85')}"/>`,

/* a cross, and the booking rows a clinic site is really made of */
'healthcare-and-clinics': `
  <rect x="300" y="182" width="290" height="290" rx="40" fill="${w('.13')}" stroke="${w('.6')}" stroke-width="3"/>
  <path d="M410 236h70v70h70v70h-70v70h-70v-70h-70v-70h70z" fill="${w('.92')}"/>
  <rect x="668" y="182" width="248" height="290" rx="16" fill="${w('.10')}" stroke="${w('.5')}" stroke-width="2"/>
  <path d="M668 198a16 16 0 0 1 16-16h216a16 16 0 0 1 16 16v40H668z" fill="${w('.22')}"/>
  <circle cx="706" cy="218" r="6" fill="${w('.6')}"/><circle cx="728" cy="218" r="6" fill="${w('.4')}"/>
  <rect x="696" y="268" width="120" height="12" rx="6" fill="${w('.75')}"/>
  <rect x="696" y="300" width="192" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="696" y="326" width="150" height="9" rx="4" fill="${w('.24')}"/>
  <rect x="696" y="360" width="192" height="1" fill="${w('.25')}"/>
  <rect x="696" y="382" width="104" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="696" y="418" width="140" height="32" rx="16" fill="${w('.88')}"/>`,

/* a document with a seal, standing in front of a colonnade */
'professional-services': `
  <path d="M312 190h250l86 86v264a16 16 0 0 1-16 16H312a16 16 0 0 1-16-16V206a16 16 0 0 1 16-16z" fill="${w('.13')}" stroke="${w('.6')}" stroke-width="3"/>
  <path d="M562 190v70a16 16 0 0 0 16 16h70" fill="none" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="340" y="316" width="200" height="12" rx="6" fill="${w('.78')}"/>
  <rect x="340" y="350" width="256" height="9" rx="4" fill="${w('.32')}"/>
  <rect x="340" y="376" width="220" height="9" rx="4" fill="${w('.26')}"/>
  <rect x="340" y="402" width="248" height="9" rx="4" fill="${w('.26')}"/>
  <circle cx="576" cy="470" r="42" fill="${w('.9')}"/>
  <path d="M576 448l8 16 18 3-13 13 3 18-16-9-16 9 3-18-13-13 18-3z" fill="${ink}"/>
  <path d="M700 246h240l-120-72z" fill="${w('.85')}"/>
  <rect x="700" y="262" width="240" height="14" rx="6" fill="${w('.7')}"/>
  <rect x="716" y="292" width="26" height="176" rx="6" fill="${w('.42')}"/>
  <rect x="774" y="292" width="26" height="176" rx="6" fill="${w('.42')}"/>
  <rect x="832" y="292" width="26" height="176" rx="6" fill="${w('.42')}"/>
  <rect x="890" y="292" width="26" height="176" rx="6" fill="${w('.42')}"/>
  <rect x="700" y="482" width="240" height="14" rx="6" fill="${w('.7')}"/>`,

/* a crane over a blueprint */
'construction': `
  <path d="M330 500V196" stroke="${w('.9')}" stroke-width="14" stroke-linecap="round"/>
  <path d="M330 196h330" stroke="${w('.9')}" stroke-width="14" stroke-linecap="round"/>
  <path d="M330 196L250 240h80" fill="none" stroke="${w('.6')}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M362 196l40 40M402 196l-40 40M430 196l40 40M470 196l-40 40M498 196l40 40M538 196l-40 40M566 196l40 40M606 196l-40 40"
        stroke="${w('.42')}" stroke-width="5"/>
  <path d="M596 196v70" stroke="${w('.7')}" stroke-width="5"/>
  <rect x="556" y="266" width="80" height="60" rx="8" fill="${w('.85')}"/>
  <path d="M296 500h84l-42-92z" fill="${w('.5')}"/>
  <rect x="690" y="252" width="256" height="248" rx="12" fill="${w('.12')}" stroke="${w('.55')}" stroke-width="3"/>
  <path d="M690 300h256M690 356h256M690 412h256M746 252v248M818 252v248M890 252v248" stroke="${w('.2')}" stroke-width="2"/>
  <rect x="722" y="330" width="128" height="112" rx="6" fill="none" stroke="${w('.9')}" stroke-width="6"/>
  <rect x="850" y="286" width="64" height="72" rx="6" fill="none" stroke="${w('.7')}" stroke-width="5"/>`,

/* a bag, and the checkout steps most stores lose people on */
'ecommerce-and-retail': `
  <path d="M348 268h244l26 232a16 16 0 0 1-16 18H338a16 16 0 0 1-16-18z" fill="${w('.14')}" stroke="${w('.6')}" stroke-width="3"/>
  <path d="M406 288v-42a64 64 0 0 1 128 0v42" fill="none" stroke="${w('.9')}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="470" cy="386" r="44" fill="${w('.28')}"/>
  <path d="M448 386l16 16 30-34" fill="none" stroke="${w('.95')}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="712" cy="250" r="26" fill="${w('.92')}"/>
  <circle cx="822" cy="250" r="26" fill="${w('.92')}"/>
  <circle cx="932" cy="250" r="26" fill="${w('.3')}"/>
  <path d="M738 250h58M848 250h58" stroke="${w('.55')}" stroke-width="5"/>
  <rect x="676" y="316" width="272" height="12" rx="6" fill="${w('.55')}"/>
  <rect x="676" y="316" width="176" height="12" rx="6" fill="${w('.95')}"/>
  <rect x="676" y="368" width="272" height="132" rx="12" fill="${w('.12')}" stroke="${w('.45')}" stroke-width="2"/>
  <rect x="702" y="396" width="140" height="11" rx="5" fill="${w('.7')}"/>
  <rect x="702" y="424" width="96" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="702" y="456" width="120" height="28" rx="14" fill="${w('.88')}"/>`,

/* stacked columns of a story, and the speed dial that decides who reads it */
'publishing-and-media': `
  <rect x="286" y="168" width="330" height="330" rx="12" fill="${w('.12')}" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="316" y="200" width="200" height="20" rx="6" fill="${w('.88')}"/>
  <rect x="316" y="240" width="270" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="316" y="278" width="124" height="94" rx="6" fill="${w('.3')}"/>
  <rect x="456" y="278" width="130" height="9" rx="4" fill="${w('.28')}"/>
  <rect x="456" y="300" width="130" height="9" rx="4" fill="${w('.28')}"/>
  <rect x="456" y="322" width="104" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="456" y="344" width="130" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="316" y="396" width="270" height="9" rx="4" fill="${w('.24')}"/>
  <rect x="316" y="418" width="240" height="9" rx="4" fill="${w('.24')}"/>
  <rect x="316" y="440" width="270" height="9" rx="4" fill="${w('.2')}"/>
  <path d="M700 420a136 136 0 0 1 272 0" fill="none" stroke="${w('.28')}" stroke-width="22" stroke-linecap="round"/>
  <path d="M700 420a136 136 0 0 1 74-121" fill="none" stroke="${w('.95')}" stroke-width="22" stroke-linecap="round"/>
  <circle cx="836" cy="420" r="16" fill="${w('.95')}"/>
  <path d="M836 420l84-62" stroke="${w('.95')}" stroke-width="12" stroke-linecap="round"/>`,

/* a heart, and the giving bar that is the whole point of the site */
'nonprofits-and-associations': `
  <path d="M470 486S316 392 316 292a92 92 0 0 1 154-68 92 92 0 0 1 154 68c0 100-154 194-154 194z" fill="${w('.9')}"/>
  <path d="M470 420s-96-60-96-124a54 54 0 0 1 96-30 54 54 0 0 1 96 30c0 64-96 124-96 124z" fill="${ink}" opacity=".28"/>
  <rect x="682" y="216" width="272" height="14" rx="7" fill="${w('.3')}"/>
  <rect x="682" y="216" width="196" height="14" rx="7" fill="${w('.95')}"/>
  <rect x="682" y="266" width="120" height="11" rx="5" fill="${w('.6')}"/>
  <rect x="682" y="322" width="128" height="60" rx="12" fill="${w('.16')}" stroke="${w('.55')}" stroke-width="2"/>
  <rect x="826" y="322" width="128" height="60" rx="12" fill="${w('.16')}" stroke="${w('.55')}" stroke-width="2"/>
  <rect x="682" y="402" width="272" height="60" rx="12" fill="${w('.9')}"/>
  <rect x="712" y="344" width="68" height="12" rx="6" fill="${w('.6')}"/>
  <rect x="856" y="344" width="68" height="12" rx="6" fill="${w('.6')}"/>
  <rect x="762" y="424" width="112" height="16" rx="8" fill="${ink}"/>`,

/* a gear and the spec sheet an engineer is actually looking for */
'manufacturing-and-industrial': `
  <path d="M452 168l30 4 20-26 32 14-4 32 28 18-10 32-32 6-6 32-34 4-16-28-32 6-20-28 18-26-16-28 24-24 26 16z"
        fill="none" stroke="${w('.7')}" stroke-width="0"/>
  <g transform="translate(452 330)">
    <circle r="132" fill="none" stroke="${w('.85')}" stroke-width="30" stroke-dasharray="52 34"/>
    <circle r="76" fill="none" stroke="${w('.75')}" stroke-width="18"/>
    <circle r="26" fill="${w('.5')}"/>
  </g>
  <rect x="672" y="168" width="272" height="324" rx="12" fill="${w('.12')}" stroke="${w('.6')}" stroke-width="3"/>
  <rect x="702" y="200" width="150" height="14" rx="6" fill="${w('.85')}"/>
  <rect x="702" y="238" width="212" height="1" fill="${w('.3')}"/>
  <rect x="702" y="258" width="96" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="838" y="258" width="76" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="702" y="290" width="110" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="838" y="290" width="76" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="702" y="322" width="84" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="838" y="322" width="76" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="702" y="354" width="120" height="9" rx="4" fill="${w('.34')}"/>
  <rect x="838" y="354" width="76" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="702" y="404" width="212" height="1" fill="${w('.3')}"/>
  <rect x="702" y="428" width="140" height="34" rx="17" fill="${w('.9')}"/>`
};

function base(p1, p2, width, height, inner, label) {
  /* SVG is parsed as XML, so a bare ampersand in the label kills the file */
  label = String(label).replace(/&/g, String.fromCharCode(38) + "amp;").replace(/</g, String.fromCharCode(38) + "lt;").replace(/"/g, String.fromCharCode(38) + "quot;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p1}"/><stop offset="1" stop-color="${p2}"/>
    </linearGradient>
    <radialGradient id="v" cx="30%" cy="18%" r="85%">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".38"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
${inner}
</svg>
`;
}

/* The secondary figure is the same three-step idea on every page (arrive,
   decide, act) with the proportions driven by the industry's own index, so
   the ten of them read as a family without being identical files. */
function strip(i, label) {
  /* Three stage cards inside a narrowing funnel. The filled share of the
     bar in each card is the audience still there at that step. */
  const slug = INDUSTRIES[i].slug;
  const cardW = 300, cardH = 168, gap = 44, top = 108;
  const x0 = (1200 - (cardW * 3 + gap * 2)) / 2;
  const keep = [1, .58, .27];
  const parts = [];

  parts.push('  <path d="M60 44h1080l-190 272H250z" fill="' + w('.07') + '" stroke="' + w('.18') + '" stroke-width="2"/>');
  parts.push('  <path d="M60 44h1080" stroke="' + w('.3') + '" stroke-width="3"/>');

  for (let k = 0; k < 3; k++) {
    const x = x0 + k * (cardW + gap);
    parts.push('  <rect x="' + x + '" y="' + top + '" width="' + cardW + '" height="' + cardH + '" rx="16" fill="' + w(String(0.16 - k * 0.03)) + '" stroke="' + w(String(0.6 - k * 0.14)) + '" stroke-width="2"/>');
    parts.push('  <circle cx="' + (x + 40) + '" cy="' + (top + 40) + '" r="20" fill="' + w(String(0.92 - k * 0.2)) + '"/>');
    for (let d = 0; d <= k; d++) {
      parts.push('  <circle cx="' + (x + 40 + (d - k / 2) * 11) + '" cy="' + (top + 40) + '" r="3.4" fill="' + ink + '"/>');
    }
    parts.push('  <rect x="' + (x + 76) + '" y="' + (top + 32) + '" width="' + (150 - k * 26) + '" height="15" rx="7" fill="' + w(String(0.85 - k * 0.16)) + '"/>');
    parts.push('  <rect x="' + (x + 30) + '" y="' + (top + 90) + '" width="' + (cardW - 60) + '" height="14" rx="7" fill="' + w('.2') + '"/>');
    parts.push('  <rect x="' + (x + 30) + '" y="' + (top + 90) + '" width="' + Math.round((cardW - 60) * keep[k]) + '" height="14" rx="7" fill="' + w(String(0.95 - k * 0.18)) + '"/>');
    parts.push('  <rect x="' + (x + 30) + '" y="' + (top + 122) + '" width="' + Math.round((cardW - 60) * 0.62) + '" height="9" rx="4" fill="' + w('.26') + '"/>');
    if (k < 2) {
      const mx = x + cardW, my = top + cardH / 2;
      parts.push('  <path d="M' + (mx + 10) + ' ' + my + 'h' + (gap - 30) + '" stroke="' + w('.5') + '" stroke-width="4" stroke-dasharray="9 10" stroke-linecap="round"/>');
      parts.push('  <path d="M' + (mx + gap - 22) + ' ' + (my - 9) + 'l11 9-11 9" fill="none" stroke="' + w('.7') + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>');
    }
  }
  return base(PAL[slug][0], PAL[slug][1], 1200, 360, parts.join(String.fromCharCode(10)), label);
}

const dir = path.join(__dirname, '..', 'img', 'industries');
fs.mkdirSync(dir, { recursive: true });

let missing = [], n = 0;
INDUSTRIES.forEach((ind, i) => {
  const p = PAL[ind.slug];
  if (!p) { missing.push(ind.slug + ' (palette)'); return; }
  if (!MOTIF[ind.slug]) missing.push(ind.slug + ' (motif)');
  fs.writeFileSync(path.join(dir, ind.slug + '.svg'),
    base(p[0], p[1], W, H, MOTIF[ind.slug] || '', ind.short));
  fs.writeFileSync(path.join(dir, ind.slug + '-flow.svg'),
    strip(i, ind.short + ' customer journey'));
  n += 2;
});


/* one more for the FAQ page: a stack of questions, one of them opened */
const FAQ_MOTIF = [
  '  <rect x="210" y="120" width="780" height="78" rx="14" fill="' + w('.12') + '" stroke="' + w('.45') + '" stroke-width="2"/>',
  '  <rect x="250" y="150" width="300" height="14" rx="7" fill="' + w('.6') + '"/>',
  '  <path d="M916 150l24 24 24-24" fill="none" stroke="' + w('.55') + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
  '  <rect x="210" y="222" width="780" height="200" rx="14" fill="' + w('.2') + '" stroke="' + w('.7') + '" stroke-width="3"/>',
  '  <rect x="250" y="252" width="380" height="16" rx="8" fill="' + w('.92') + '"/>',
  '  <path d="M916 268l24-24 24 24" fill="none" stroke="' + w('.9') + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
  '  <rect x="250" y="304" width="640" height="11" rx="5" fill="' + w('.4') + '"/>',
  '  <rect x="250" y="332" width="560" height="11" rx="5" fill="' + w('.32') + '"/>',
  '  <rect x="250" y="360" width="600" height="11" rx="5" fill="' + w('.32') + '"/>',
  '  <rect x="210" y="446" width="780" height="78" rx="14" fill="' + w('.12') + '" stroke="' + w('.45') + '" stroke-width="2"/>',
  '  <rect x="250" y="476" width="260" height="14" rx="7" fill="' + w('.6') + '"/>',
  '  <path d="M916 476l24 24 24-24" fill="none" stroke="' + w('.55') + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
].join(String.fromCharCode(10));
fs.writeFileSync(path.join(__dirname, '..', 'img', 'faq.svg'), base('#4C7BF6', '#101B3C', W, H, FAQ_MOTIF, 'Frequently asked questions'));
console.log('industry illustrations written: ' + n);
console.log(missing.length ? 'INCOMPLETE: ' + missing.join(', ') : 'every industry has its own drawing');
