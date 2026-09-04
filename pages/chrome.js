/* The shared page furniture for every generated page: the analytics tag, the
   primary nav, the hamburger and its overlay menu, and the small script that
   drives the overlay. The homepage builds its own from src/, but it uses the
   same class names and the same stylesheet, so the two behave identically. */

const { INDUSTRIES } = require('./industries.js');

const esc = s => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ORIGIN = 'https://gurjotdigital.vercel.app';
const WA = 'https://wa.me/17789290374?text=Hello%20Gary!%20I%20just%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20chat.';

/* Google Analytics 4. Goes in the head so page_view fires on first paint. */
const GA = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NYRWKVFWTL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NYRWKVFWTL');
</script>`;

const dropLinks = INDUSTRIES.map(i =>
  '          <a href="/industries/' + i.slug + '">' + esc(i.short) + '</a>').join('\n');

const subLinks = INDUSTRIES.map(i =>
  '            <a href="/industries/' + i.slug + '">' + esc(i.short) + '</a>').join('\n');

/* The same links the homepage carries, so a visitor who lands on a location
   page from search can reach the rest of the site without going back. */
const NAV = `  <nav class="nav__links" aria-label="Primary">
    <a href="/#about">About</a>
    <a href="/#services">Services</a>
    <a href="/#work">Work</a>
    <a href="/#skills">Skills</a>

    <div class="nav__ind">
      <button class="nav__indBtn" type="button" aria-expanded="false" aria-haspopup="true">
        <span>Industries</span><i class="nav__caret" aria-hidden="true"></i>
      </button>
      <div class="nav__drop">
        <div class="nav__dropIn">
          <p class="nav__dropH mono">Sectors I work in across Canada</p>
          <div class="nav__dropGrid">
${dropLinks}
          </div>
        </div>
      </div>
    </div>

    <a href="/faq">FAQ</a>
  </nav>

  <div class="nav__right">
    <a class="btn btn--sm" href="${WA}" target="_blank" rel="noopener noreferrer"><span>Let&rsquo;s talk</span></a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i><i></i></button>
  </div>`;

const row = (n, href, word) =>
  '      <li><a class="menu__reveal" href="' + href + '"><span class="menu__num mono">' + n +
  '</span><span class="menu__word">' + word + '</span></a></li>';

const MENU = `<div class="menu" id="menu" aria-hidden="true">
  <div class="menu__bg"></div>
  <div class="menu__inner" data-lenis-prevent>
    <ul class="menu__list">
${row('01', '/#about', 'About')}
${row('02', '/#services', 'Services')}
${row('03', '/#work', 'Work')}
${row('04', '/#skills', 'Skills')}
      <li class="menu__group" id="menuInd">
        <button class="menu__reveal menu__trigger" type="button" aria-expanded="false" aria-controls="menuIndSub">
          <span class="menu__num mono">05</span><span class="menu__word">Industries</span><i class="menu__caret" aria-hidden="true"></i>
        </button>
        <div class="menu__sub" id="menuIndSub">
          <div class="menu__subGrid mono">
${subLinks}
          </div>
        </div>
      </li>
${row('06', '/faq', 'FAQ')}
${row('07', '/#contact', 'Contact')}
    </ul>
    <div class="menu__foot mono">
      <span>gurjotangad97@gmail.com</span>
      <a href="${WA}" target="_blank" rel="noopener noreferrer">Let&rsquo;s talk &nearr;</a>
    </div>
  </div>
</div>`;

/* No GSAP on these pages, so the reveal is a CSS transition driven from here.
   The stagger is a per-row transition-delay rather than a timeline. */
const MENU_JS = `<script>
(function () {
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (!burger || !menu) return;
  var bg = menu.querySelector('.menu__bg'), inner = menu.querySelector('.menu__inner');
  var rows = menu.querySelectorAll('.menu__reveal');
  var open = false;

  function set(o) {
    open = o;
    document.body.classList.toggle('menu-open', o);
    menu.setAttribute('aria-hidden', o ? 'false' : 'true');
    burger.setAttribute('aria-expanded', o ? 'true' : 'false');
    burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    if (bg) bg.style.transform = o ? 'translateY(0)' : 'translateY(-100%)';
    if (inner) inner.style.opacity = o ? '1' : '0';
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.transitionDelay = (o ? (0.18 + i * 0.045) : 0) + 's';
      rows[i].style.transform = o ? 'translateY(0)' : 'translateY(130%)';
    }
  }

  burger.addEventListener('click', function () { set(!open); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) set(false); });

  /* Industries groups the sector pages; it is not a page of its own. */
  var group = document.getElementById('menuInd');
  var trigger = group && group.querySelector('.menu__trigger');
  if (trigger) trigger.addEventListener('click', function () {
    var o = group.classList.toggle('open');
    trigger.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
})();
</script>`;

module.exports = { ORIGIN, WA, GA, NAV, MENU, MENU_JS };
