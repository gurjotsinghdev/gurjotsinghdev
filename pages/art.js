/* Generates one illustration per service as a real .svg file in /img.
   1200x630 so the same file works as the page hero and as the og:image.
   Drawn rather than photographed: these are schematic, not stock. */

const fs = require('fs');
const path = require('path');
const { SERVICES } = require('./services.js');

const W = 1200, H = 630, CX = 600;
const w = o => 'rgba(255,255,255,' + o + ')';

/* per-service motif, drawn around the centre of the canvas */
const MOTIF = {

'freelance-web-design': `
  <rect x="330" y="140" width="540" height="350" rx="18" fill="${w('.10')}" stroke="${w('.55')}" stroke-width="2"/>
  <path d="M330 158a18 18 0 0 1 18-18h504a18 18 0 0 1 18 18v34H330z" fill="${w('.16')}"/>
  <circle cx="362" cy="166" r="6" fill="${w('.55')}"/><circle cx="384" cy="166" r="6" fill="${w('.4')}"/><circle cx="406" cy="166" r="6" fill="${w('.28')}"/>
  <rect x="364" y="232" width="214" height="20" rx="5" fill="${w('.85')}"/>
  <rect x="364" y="268" width="300" height="11" rx="5" fill="${w('.34')}"/>
  <rect x="364" y="292" width="252" height="11" rx="5" fill="${w('.26')}"/>
  <rect x="364" y="340" width="132" height="36" rx="18" fill="${w('.9')}"/>
  <rect x="700" y="232" width="140" height="196" rx="12" fill="${w('.16')}" stroke="${w('.32')}" stroke-width="2"/>`,

'small-business-web-design': `
  <rect x="360" y="150" width="300" height="330" rx="16" fill="${w('.10')}" stroke="${w('.5')}" stroke-width="2"/>
  <rect x="392" y="186" width="150" height="16" rx="5" fill="${w('.8')}"/>
  <rect x="392" y="216" width="220" height="10" rx="5" fill="${w('.3')}"/>
  <rect x="392" y="238" width="190" height="10" rx="5" fill="${w('.24')}"/>
  <rect x="392" y="284" width="236" height="1" fill="${w('.25')}"/>
  <rect x="392" y="306" width="120" height="10" rx="5" fill="${w('.3')}"/>
  <rect x="392" y="330" width="160" height="10" rx="5" fill="${w('.24')}"/>
  <rect x="392" y="392" width="128" height="36" rx="18" fill="${w('.9')}"/>
  <rect x="712" y="188" width="150" height="260" rx="22" fill="${w('.13')}" stroke="${w('.55')}" stroke-width="2"/>
  <rect x="760" y="204" width="54" height="6" rx="3" fill="${w('.45')}"/>
  <rect x="734" y="238" width="106" height="12" rx="4" fill="${w('.75')}"/>
  <rect x="734" y="266" width="80" height="8" rx="4" fill="${w('.3')}"/>
  <rect x="734" y="396" width="106" height="30" rx="15" fill="${w('.85')}"/>`,

'wordpress-developer': `
  <path d="M416 214l-62 101 62 101" fill="none" stroke="${w('.85')}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M784 214l62 101-62 101" fill="none" stroke="${w('.85')}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="486" y="238" width="228" height="14" rx="6" fill="${w('.8')}"/>
  <rect x="486" y="272" width="170" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="514" y="300" width="140" height="10" rx="5" fill="${w('.28')}"/>
  <rect x="514" y="328" width="184" height="10" rx="5" fill="${w('.28')}"/>
  <rect x="486" y="356" width="118" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="486" y="390" width="200" height="14" rx="6" fill="${w('.6')}"/>`,

'local-seo-expert': `
  <circle cx="600" cy="330" r="176" fill="none" stroke="${w('.16')}" stroke-width="2"/>
  <circle cx="600" cy="330" r="122" fill="none" stroke="${w('.24')}" stroke-width="2"/>
  <circle cx="600" cy="330" r="68" fill="none" stroke="${w('.32')}" stroke-width="2"/>
  <path d="M600 168c-42 0-76 34-76 76 0 57 76 138 76 138s76-81 76-138c0-42-34-76-76-76z" fill="${w('.92')}"/>
  <circle cx="600" cy="244" r="27" fill="rgba(0,0,0,.55)"/>
  <circle cx="420" cy="430" r="9" fill="${w('.5')}"/><circle cx="792" cy="404" r="9" fill="${w('.5')}"/>
  <circle cx="486" cy="228" r="7" fill="${w('.35')}"/><circle cx="742" cy="238" r="7" fill="${w('.35')}"/>`,

'technical-seo-consultant': `
  <rect x="352" y="180" width="360" height="270" rx="14" fill="${w('.08')}" stroke="${w('.35')}" stroke-width="2"/>
  <rect x="384" y="214" width="120" height="12" rx="5" fill="${w('.7')}"/>
  <rect x="408" y="248" width="180" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="408" y="276" width="150" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="432" y="304" width="120" height="9" rx="4" fill="${w('.22')}"/>
  <rect x="408" y="332" width="196" height="9" rx="4" fill="${w('.3')}"/>
  <rect x="432" y="360" width="104" height="9" rx="4" fill="${w('.22')}"/>
  <path d="M384 232h16M384 266h16M384 322h16" stroke="${w('.4')}" stroke-width="2"/>
  <circle cx="742" cy="316" r="96" fill="none" stroke="${w('.92')}" stroke-width="12"/>
  <path d="M812 386l64 64" stroke="${w('.92')}" stroke-width="16" stroke-linecap="round"/>
  <path d="M700 316l30 30 56-62" fill="none" stroke="${w('.85')}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,

'google-ads-consultant': `
  <path d="M348 176h504l-176 208v148l-152 56V384z" fill="${w('.14')}" stroke="${w('.6')}" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="380" y="206" width="440" height="12" rx="6" fill="${w('.62')}"/>
  <rect x="430" y="252" width="340" height="12" rx="6" fill="${w('.44')}"/>
  <rect x="480" y="298" width="240" height="12" rx="6" fill="${w('.32')}"/>
  <circle cx="600" cy="470" r="34" fill="${w('.92')}"/>
  <path d="M586 470l10 11 20-24" fill="none" stroke="rgba(0,0,0,.6)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,

'ppc-consultant': `
  <path d="M340 470h520" stroke="${w('.35')}" stroke-width="2"/>
  <rect x="380" y="366" width="66" height="104" rx="6" fill="${w('.3')}"/>
  <rect x="472" y="310" width="66" height="160" rx="6" fill="${w('.42')}"/>
  <rect x="564" y="250" width="66" height="220" rx="6" fill="${w('.58')}"/>
  <rect x="656" y="196" width="66" height="274" rx="6" fill="${w('.78')}"/>
  <rect x="748" y="150" width="66" height="320" rx="6" fill="${w('.94')}"/>
  <path d="M390 344l92-52 92-58 92-52 92-44" fill="none" stroke="${w('.9')}" stroke-width="4" stroke-dasharray="10 8"/>
  <path d="M792 214l-14 42 42-14z" fill="${w('.95')}"/>`,

'hubspot-consultant': `
  <circle cx="392" cy="316" r="30" fill="none" stroke="${w('.85')}" stroke-width="6"/>
  <circle cx="600" cy="316" r="30" fill="none" stroke="${w('.85')}" stroke-width="6"/>
  <circle cx="808" cy="316" r="30" fill="none" stroke="${w('.85')}" stroke-width="6"/>
  <circle cx="600" cy="316" r="13" fill="${w('.9')}"/>
  <path d="M422 316h148M630 316h148" stroke="${w('.55')}" stroke-width="4"/>
  <rect x="330" y="386" width="124" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="538" y="386" width="124" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="746" y="386" width="124" height="10" rx="5" fill="${w('.34')}"/>
  <rect x="330" y="410" width="86" height="8" rx="4" fill="${w('.2')}"/>
  <rect x="538" y="410" width="98" height="8" rx="4" fill="${w('.2')}"/>
  <rect x="746" y="410" width="72" height="8" rx="4" fill="${w('.2')}"/>
  <circle cx="392" cy="206" r="9" fill="${w('.4')}"/><circle cx="600" cy="186" r="9" fill="${w('.4')}"/><circle cx="808" cy="206" r="9" fill="${w('.4')}"/>`,

'wordpress-malware-removal': `
  <path d="M600 146l150 56v138c0 92-62 152-150 184-88-32-150-92-150-184V202z" fill="${w('.13')}" stroke="${w('.75')}" stroke-width="3" stroke-linejoin="round"/>
  <rect x="512" y="238" width="176" height="12" rx="5" fill="${w('.55')}"/>
  <rect x="512" y="272" width="176" height="12" rx="5" fill="${w('.4')}"/>
  <rect x="512" y="306" width="176" height="12" rx="5" fill="${w('.55')}"/>
  <rect x="500" y="336" width="200" height="34" rx="8" fill="rgba(255,90,60,.55)" stroke="${w('.8')}" stroke-width="2"/>
  <path d="M584 346l32 14M616 346l-32 14" stroke="${w('.95')}" stroke-width="5" stroke-linecap="round"/>
  <rect x="512" y="392" width="176" height="12" rx="5" fill="${w('.4')}"/>
  <path d="M556 434l30 30 62-72" fill="none" stroke="${w('.95')}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,

'wordpress-website-speed-optimization': `
  <path d="M404 412a196 196 0 0 1 392 0" fill="none" stroke="${w('.22')}" stroke-width="26" stroke-linecap="round"/>
  <path d="M404 412a196 196 0 0 1 286-175" fill="none" stroke="${w('.92')}" stroke-width="26" stroke-linecap="round"/>
  <circle cx="600" cy="412" r="22" fill="${w('.95')}"/>
  <path d="M600 412l112-92" stroke="${w('.95')}" stroke-width="12" stroke-linecap="round"/>
  <rect x="360" y="470" width="150" height="10" rx="5" fill="${w('.3')}"/>
  <rect x="360" y="492" width="104" height="10" rx="5" fill="${w('.2')}"/>
  <path d="M840 250h-70l34-58-96 92h70l-34 58z" fill="${w('.9')}"/>`,

'it-consultant': `
  <circle cx="600" cy="316" r="46" fill="${w('.9')}"/>
  <circle cx="392" cy="204" r="28" fill="none" stroke="${w('.8')}" stroke-width="5"/>
  <circle cx="392" cy="428" r="28" fill="none" stroke="${w('.8')}" stroke-width="5"/>
  <circle cx="808" cy="204" r="28" fill="none" stroke="${w('.8')}" stroke-width="5"/>
  <circle cx="808" cy="428" r="28" fill="none" stroke="${w('.8')}" stroke-width="5"/>
  <circle cx="600" cy="140" r="24" fill="none" stroke="${w('.5')}" stroke-width="4"/>
  <circle cx="600" cy="492" r="24" fill="none" stroke="${w('.5')}" stroke-width="4"/>
  <path d="M414 226l150 66M414 406l150-66M786 226l-150 66M786 406l-150-66M600 164v106M600 468V362"
        stroke="${w('.45')}" stroke-width="3"/>`,

'it-services': `
  <rect x="416" y="152" width="368" height="88" rx="12" fill="${w('.14')}" stroke="${w('.55')}" stroke-width="2"/>
  <rect x="416" y="268" width="368" height="88" rx="12" fill="${w('.14')}" stroke="${w('.55')}" stroke-width="2"/>
  <rect x="416" y="384" width="368" height="88" rx="12" fill="${w('.14')}" stroke="${w('.55')}" stroke-width="2"/>
  <circle cx="456" cy="196" r="9" fill="${w('.9')}"/><circle cx="456" cy="312" r="9" fill="${w('.9')}"/><circle cx="456" cy="428" r="9" fill="${w('.9')}"/>
  <rect x="486" y="190" width="150" height="11" rx="5" fill="${w('.45')}"/>
  <rect x="486" y="306" width="120" height="11" rx="5" fill="${w('.45')}"/>
  <rect x="486" y="422" width="164" height="11" rx="5" fill="${w('.45')}"/>
  <path d="M700 188l16 16 30-34M700 304l16 16 30-34M700 420l16 16 30-34"
        fill="none" stroke="${w('.95')}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`
};

function svg(s) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${s.name}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${s.p1}"/><stop offset="1" stop-color="${s.p2}"/>
    </linearGradient>
    <radialGradient id="v" cx="30%" cy="18%" r="85%">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".38"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  ${MOTIF[s.slug] || ''}
</svg>
`;
}

const dir = path.join(__dirname, '..', 'img');
fs.mkdirSync(dir, { recursive: true });
let n = 0, missing = [];
SERVICES.forEach(s => {
  if (!MOTIF[s.slug]) missing.push(s.slug);
  fs.writeFileSync(path.join(dir, s.slug + '.svg'), svg(s));
  n++;
});
console.log('illustrations written: ' + n);
console.log(missing.length ? 'NO MOTIF FOR: ' + missing.join(', ') : 'every service has its own drawing');
