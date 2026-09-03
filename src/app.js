/* =========================================================
   Gurjot Singh (Gary) — Portfolio motion system
   GSAP + ScrollTrigger + Lenis. Degrades safely if a CDN fails.
   ========================================================= */
(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var doc = document.documentElement;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* The masked-reveal elements carry their hidden state in CSS as
     `transform: translateY(N%)`, so the page still reads correctly before
     JS boots. GSAP, however, reads the computed matrix and stores that
     offset as a PIXEL `y` with `yPercent` left at 0 -- so a plain
     `to({yPercent: 0})` animates nothing and the text stays parked below
     its mask forever. Driving both properties hands the whole transform to
     GSAP: `y` is pinned to 0 and `yPercent` does the travel.

     These offsets MUST match the CSS: .lineIn, .loader__name .ln and
     .menu__list a each set translateY() to the matching value. */
  var LINE_HIDDEN = 175, LOADER_HIDDEN = 175, MENU_HIDDEN = 130;

  /* Bumped from 'gs-theme': that key was auto-written by an earlier build, so
     values under it are not real choices. Must match the pre-paint script in
     the markup. */
  var THEME_KEY = 'gs-theme-2';

  /* ---------------------------------------------------------
     0. Always-on basics (work even with no GSAP)
     --------------------------------------------------------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* The clock shows Gary's time, not the visitor's. The point is telling
     someone whether he is awake, which his zone answers and theirs does not. */
  var TZ = 'America/Vancouver';

  /* [fromHour, toHour, line) in Vancouver local time, 24h */
  var STATUS = [
    [0,  6,  'I am asleep right now, but this will be the first thing I read.'],
    [6,  9,  'Awake, caffeinated, not yet dangerous.'],
    [9,  17, 'Probably three tabs deep in a code editor right now.'],
    [17, 22, 'Off the clock, though I will still see it tonight.'],
    [22, 24, 'Winding down. This one gets answered over tomorrow\u2019s coffee.']
  ];

  function vancouver() {
    var now = new Date();
    try {
      var time = new Intl.DateTimeFormat('en-CA', {
        timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
      }).format(now);
      var hour = Number(new Intl.DateTimeFormat('en-CA', {
        timeZone: TZ, hour: 'numeric', hourCycle: 'h23'
      }).format(now));
      /* Vancouver is PST for four months a year and PDT for the other eight,
         so read the abbreviation instead of hardcoding one that would be
         wrong most of the time. */
      var zone = '', parts = new Intl.DateTimeFormat('en-US', {
        timeZone: TZ, timeZoneName: 'short'
      }).formatToParts(now);
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === 'timeZoneName') zone = parts[i].value;
      }
      return { time: time, hour: hour, zone: zone };
    } catch (e) {
      /* engine with no IANA zone data: leave the placeholder rather than
         show the visitor's clock labelled as Vancouver */
      return null;
    }
  }

  function tick() {
    var v = vancouver();
    if (!v) return;
    var stamp = v.time + (v.zone ? ' ' + v.zone : '');
    var a = $('#clock'), b = $('#menuClock'), q = $('#statusQuip');
    if (a) a.textContent = stamp;
    if (b) b.textContent = stamp + ' \u00b7 Vancouver';
    /* the card is honest about the hour: no point claiming "online" at 3am */
    var badge = $('#waBadge'), text = $('#waText'), card = $('#wa');
    if (badge && text && card) {
      var asleep = (v.hour >= 22 || v.hour < 6);
      card.classList.toggle('away', asleep);
      var b = asleep ? 'Away' : 'Online';
      if (badge.textContent !== b) badge.textContent = b;
      var msg = asleep
        ? 'Asleep, but <em>leave a message <span class="wa__arr">\u2192</span></em>'
        : 'Why wait? <em>Let\u2019s chat <span class="wa__arr">\u2192</span></em>';
      if (text.innerHTML !== msg) text.innerHTML = msg;
    }
    if (q) {
      for (var i = 0; i < STATUS.length; i++) {
        if (v.hour >= STATUS[i][0] && v.hour < STATUS[i][1]) {
          if (q.textContent !== STATUS[i][2]) q.textContent = STATUS[i][2];
          break;
        }
      }
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------------------------------------------------
     0b. Theme toggle (no GSAP dependency)
     --------------------------------------------------------- */
  (function () {
    var btn = $('#themeBtn');

    function current() { return doc.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

    /* `persist` matters. An earlier version wrote to storage on every load,
       which meant merely visiting the page saved whatever the default
       happened to be -- so changing the default later could not reach
       anyone who had already loaded it once. Only a click is a choice. */
    function apply(t, persist) {
      if (t === 'dark') doc.setAttribute('data-theme', 'dark');
      else doc.removeAttribute('data-theme');   /* light is the default */
      if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      if (persist) {
        try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* private mode */ }
      }
    }

    /* drop the key the old build auto-wrote, so a theme nobody picked
       does not outlive it */
    try { localStorage.removeItem('gs-theme'); } catch (e) {}

    apply(current(), false);
    if (btn) btn.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark', true);
    });
  })();

  /* ---------------------------------------------------------
     0c. Tab title — say something when they wander off
     --------------------------------------------------------- */
  (function () {
    var ORIGINAL = document.title;
    var AWAY = [
      'Hey. Come back.',
      'This tab misses you.',
      'Where are you going?',
      'Fine. I will wait right here.',
      'You were about to hire me.'
    ];
    var BACK = 'Oh good, you came back.';
    var last = -1, cycle = null, restore = null;

    function say() {
      var i;
      /* never show the same line twice running, or it reads as a bug */
      do { i = Math.floor(Math.random() * AWAY.length); } while (AWAY.length > 1 && i === last);
      last = i;
      document.title = AWAY[i];
    }

    document.addEventListener('visibilitychange', function () {
      clearTimeout(restore);
      clearInterval(cycle);

      if (document.hidden) {
        say();
        cycle = setInterval(say, 5000);   /* keep talking if they stay away */
      } else {
        document.title = BACK;
        restore = setTimeout(function () { document.title = ORIGINAL; }, 1700);
      }
    });
  })();

  /* smooth anchor scrolling fallback (replaced by Lenis below when present) */
  var lenis = null;
  function scrollToTarget(hash) {
    var el = hash === '#top' ? document.body : $(hash);
    if (!el) return;
    var y = hash === '#top' ? 0 : el.getBoundingClientRect().top + window.pageYOffset;
    if (lenis) lenis.scrollTo(y, { duration: 1.35 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var h = a.getAttribute('href');
      if (!h || h === '#') return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(h);
    });
  });

  /* ---------------------------------------------------------
     1. Menu
     --------------------------------------------------------- */
  var burger = $('#burger'), menu = $('#menu');
  var menuOpen = false, menuTl = null;

  function buildMenuTl() {
    if (!hasGSAP || !menu) return null;
    var tl = window.gsap.timeline({ paused: true });
    tl.to($('.menu__bg'), { y: '0%', duration: .8, ease: 'power4.inOut' })
      .fromTo($$('.menu__list a'), { yPercent: MENU_HIDDEN, y: 0 },
              { yPercent: 0, y: 0, duration: .7, stagger: .055, ease: 'power4.out' }, '-=.35')
      .to($('.menu__inner'), { opacity: 1, duration: .3 }, '-=.7');
    return tl;
  }
  function openMenu() {
    if (!menu) return;
    menuOpen = true;
    document.body.classList.add('menu-open');
    menu.setAttribute('aria-hidden', 'false');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (menuTl) menuTl.play();
    else {
      var bg = $('.menu__bg'), inner = $('.menu__inner');
      if (bg) bg.style.transform = 'translateY(0)';
      if (inner) inner.style.opacity = 1;
      $$('.menu__list a').forEach(function (a) { a.style.transform = 'translateY(0)'; });
    }
    if (lenis) lenis.stop();
  }
  function closeMenu() {
    if (!menuOpen || !menu) return;
    menuOpen = false;
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-hidden', 'true');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (menuTl) menuTl.reverse();
    else {
      var bg2 = $('.menu__bg'), inner2 = $('.menu__inner');
      if (bg2) bg2.style.transform = 'translateY(-100%)';
      if (inner2) inner2.style.opacity = 0;
      $$('.menu__list a').forEach(function (a) { a.style.transform = 'translateY(' + MENU_HIDDEN + '%)'; });
    }
    if (lenis) lenis.start();
  }
  if (burger) burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------------------------------------------------------
     2. Custom cursor + magnetic
     --------------------------------------------------------- */
  if (!coarse && hasGSAP) {
    var cur = $('#cursor'), tag = $('#cursorLabel');
    var arrow = $('.cursor__arrow');
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var ax = mx, ay = my, tx = mx, ty = my, prev = mx, rot = 0;
    var ready = false;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!ready) {
        ready = true; ax = tx = mx; ay = ty = my;
        /* place it before the first ticker frame, so it can never flash
           at the top-left corner on the way in */
        if (arrow) arrow.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
        if (tag) tag.style.transform = 'translate(' + (mx + 16) + 'px,' + (my + 20) + 'px)';
        cur.classList.add('ready');
      }
    }, { passive: true });
    window.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget) cur.classList.remove('ready');
    });

    window.gsap.ticker.add(function () {
      /* the arrow tracks tightly, the tag lags a little -- that small
         difference is what makes it read as one object being dragged
         rather than two things pinned to the pointer */
      ax += (mx - ax) * 0.58; ay += (my - ay) * 0.58;
      tx += (mx - tx) * 0.26; ty += (my - ty) * 0.26;

      /* lean into the direction of travel, damped so it settles */
      var vx = mx - prev; prev = mx;
      rot += (Math.max(-15, Math.min(15, vx * 0.9)) - rot) * 0.12;

      if (arrow) arrow.style.transform = 'translate(' + ax + 'px,' + ay + 'px) rotate(' + rot.toFixed(2) + 'deg)';
      if (tag) tag.style.transform = 'translate(' + (tx + 16) + 'px,' + (ty + 20) + 'px)';
    });

    var LABELS = { view: 'View', mail: 'WhatsApp', drag: 'Drag', link: 'Click' };
    var current = 'You';
    function setState(state) {
      if (!cur) return;
      cur.className = 'cursor ready' + (state ? ' is-' + state : '');
      var next = LABELS[state] || 'You';
      if (next !== current && tag) {
        current = next;
        tag.textContent = next;
        tag.classList.remove('pop');
        void tag.offsetWidth;          /* restart the animation */
        tag.classList.add('pop');
      }
    }
    $$('[data-cursor]').forEach(function (el) {
      var s = el.getAttribute('data-cursor');
      el.addEventListener('mouseenter', function () { setState(s); });
      el.addEventListener('mouseleave', function () { setState(''); });
    });
    $$('a:not([data-cursor]), button:not([data-cursor])').forEach(function (el) {
      el.addEventListener('mouseenter', function () { setState('link'); });
      el.addEventListener('mouseleave', function () { setState(''); });
    });

    /* magnetic */
    $$('[data-magnetic]').forEach(function (el) {
      var strength = 0.32;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        window.gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength * 1.4,
          duration: .5, ease: 'power3.out'
        });
      });
      el.addEventListener('mouseleave', function () {
        window.gsap.to(el, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.35)' });
      });
    });
  }

  /* ---------------------------------------------------------
     3. Scramble text on hover
     --------------------------------------------------------- */
  var GLYPHS = '!<>-_\\/[]{}—=+*^?#________';
  $$('[data-scramble]').forEach(function (el) {
    var original = el.textContent, raf = null, frame = 0;
    function run() {
      cancelAnimationFrame(raf); frame = 0;
      var queue = [];
      for (var i = 0; i < original.length; i++) {
        queue.push({ from: original[i], to: original[i], start: Math.floor(Math.random() * 12), end: Math.floor(Math.random() * 12) + 12 });
      }
      (function step() {
        var out = '', done = 0;
        for (var i = 0; i < queue.length; i++) {
          var q = queue[i];
          if (frame >= q.end) { done++; out += q.to; }
          else if (frame >= q.start) { out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; }
          else { out += q.from; }
        }
        el.textContent = out;
        if (done === queue.length) { el.textContent = original; return; }
        frame++;
        raf = requestAnimationFrame(step);
      })();
    }
    el.addEventListener('mouseenter', run);
  });

  /* ---------------------------------------------------------
     4. Hero / contact aurora canvas
     --------------------------------------------------------- */
  function aurora(canvas, opts) {
    if (!canvas || reduce) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, blobs = [];
    var palette = opts.palette;
    var pointer = { x: .5, y: .5, tx: .5, ty: .5 };

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(r.width, 1); h = Math.max(r.height, 1);
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < opts.count; i++) {
      blobs.push({
        x: Math.random(), y: Math.random(),
        r: 0.24 + Math.random() * 0.34,
        sx: (Math.random() - .5) * 0.00042,
        sy: (Math.random() - .5) * 0.00036,
        c: palette[i % palette.length],
        ph: Math.random() * Math.PI * 2
      });
    }

    window.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / (r.width || 1);
      pointer.ty = (e.clientY - r.top) / (r.height || 1);
    }, { passive: true });

    var t = 0;
    function draw() {
      t += 1;
      pointer.x += (pointer.tx - pointer.x) * .04;
      pointer.y += (pointer.ty - pointer.y) * .04;

      ctx.clearRect(0, 0, w, h);
      /* 'lighter' builds glowing light on a dark ground; on a light ground it
         only washes out, so paint plain translucent colour instead. */
      var light = doc.getAttribute('data-theme') !== 'dark';
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
      var alpha = light ? (opts.alphaLight || opts.alpha) : opts.alpha;

      var m = Math.max(w, h);
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        b.x += b.sx; b.y += b.sy;
        if (b.x < -.35 || b.x > 1.35) b.sx *= -1;
        if (b.y < -.35 || b.y > 1.35) b.sy *= -1;

        var pull = opts.pull || 0;
        var px = b.x + (pointer.x - b.x) * pull;
        var py = b.y + (pointer.y - b.y) * pull;
        var breathe = 1 + Math.sin(t * 0.006 + b.ph) * 0.13;

        var cx = px * w, cy = py * h, rad = b.r * m * breathe;
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.c.replace('ALPHA', String(alpha)));
        g.addColorStop(0.55, b.c.replace('ALPHA', String(alpha * 0.28)));
        g.addColorStop(1, b.c.replace('ALPHA', '0'));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(draw);
    }
    draw();
  }

  aurora($('#aurora'), {
    count: 5, alpha: 0.30, alphaLight: 0.20, pull: 0.055,
    palette: ['rgba(0,102,204,ALPHA)', 'rgba(60,140,255,ALPHA)', 'rgba(110,70,230,ALPHA)', 'rgba(0,170,220,ALPHA)', 'rgba(190,80,200,ALPHA)']
  });
  aurora($('#aurora2'), {
    count: 3, alpha: 0.22, alphaLight: 0.16, pull: 0.09,
    palette: ['rgba(0,102,204,ALPHA)', 'rgba(110,70,230,ALPHA)', 'rgba(0,170,220,ALPHA)']
  });

  /* ---------------------------------------------------------
     5. Rotating word
     --------------------------------------------------------- */
  (function () {
    var rot = $('#rotator');
    if (!rot) return;
    var items = $$('b', rot);
    if (!items.length) return;
    var idx = 0;
    items.forEach(function (b, i) { b.style.transform = i === 0 ? 'translateY(0)' : 'translateY(100%)'; b.style.position = i === 0 ? 'relative' : 'absolute'; b.style.top = 0; b.style.left = 0; });
    if (reduce) return;
    setInterval(function () {
      var cur = items[idx];
      idx = (idx + 1) % items.length;
      var nxt = items[idx];
      if (hasGSAP) {
        window.gsap.to(cur, { yPercent: -110, opacity: 0, duration: .5, ease: 'power3.in' });
        window.gsap.fromTo(nxt, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .6, ease: 'power3.out' });
      }
    }, 2200);
  })();

  /* ---------------------------------------------------------
     6. Word splitter
     --------------------------------------------------------- */
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var parts = node.nodeValue.split(/(\s+)/);
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        var s = document.createElement('span');
        s.className = 'w'; s.textContent = p;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return $$('.w', el);
  }

  /* ---------------------------------------------------------
     7. Preloader → reveal
     --------------------------------------------------------- */
  var loader = $('#loader');
  document.body.classList.add('is-loading');

  function bootAnimations() {
    if (!hasGSAP) return;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    /* --- Lenis smooth scroll --- */
    if (typeof window.Lenis !== 'undefined' && !reduce) {
      lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, lerp: null, wheelMultiplier: 1, touchMultiplier: 1.6 });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    /* --- scroll progress --- */
    var bar = $('#progressBar');
    if (bar) {
      ST.create({
        start: 0, end: 'max',
        onUpdate: function (self) { bar.style.width = (self.progress * 100).toFixed(2) + '%'; }
      });
    }

    /* --- nav show / hide --- */
    var nav = $('#nav');
    if (nav) {
      var last = 0;
      ST.create({
        start: 0, end: 'max',
        onUpdate: function (self) {
          var y = self.scroll();
          nav.classList.toggle('stuck', y > 40);
          if (!menuOpen) nav.classList.toggle('hidden', y > 500 && y > last);
          last = y;
        }
      });
    }

    /* --- hero intro --- */
    var heroTl = gsap.timeline({ delay: .1 });
    heroTl.fromTo('.hero__title .lineIn', { yPercent: LINE_HIDDEN, y: 0 },
                  { yPercent: 0, y: 0, duration: 1.15, stagger: .09, ease: 'expo.out' })
      .to('.hero__eyebrow', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.85')
      .to('.hero__lede', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.7')
      .to('.hero__actions', { opacity: 1, y: 0, duration: .8, ease: 'power3.out' }, '-=.65')
      .fromTo('.hero__rotator', { opacity: 0 }, { opacity: 1, duration: .6 }, '-=.5')
      .fromTo('.hero__scroll', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6 }, '-=.4');

    /* --- hero parallax out --- */
    if (!reduce) {
      gsap.to('.hero__inner', {
        yPercent: -14, opacity: .1, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__grid', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* --- generic line reveals --- */
    $$('.secTitle, .hz__end p').forEach(function (el) {
      var ins = $$('.lineIn', el);
      if (!ins.length) return;
      gsap.fromTo(ins, { yPercent: LINE_HIDDEN, y: 0 }, {
        yPercent: 0, y: 0, duration: 1.05, stagger: .08, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    /* --- reveal-up --- */
    $$('.reveal-up').forEach(function (el) {
      if (el.closest('.hero')) return; /* handled by hero timeline */
      gsap.to(el, {
        opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    /* --- big statement, word by word --- */
    var big = $('.bigtext[data-words]');
    if (big) {
      var words = splitWords(big);
      gsap.to(words, {
        opacity: 1, ease: 'none', stagger: .35,
        scrollTrigger: { trigger: big, start: 'top 78%', end: 'bottom 55%', scrub: .6 }
      });
    }

    /* --- counters --- */
    $$('.stat__num').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var o = { v: 0 };
      gsap.to(o, {
        v: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: function () { el.textContent = Math.round(o.v) + suffix; }
      });
    });

    /* --- ticker marquees (scroll-velocity reactive) --- */
    $$('.ticker__track').forEach(function (track, i) {
      var host = track.parentElement;
      if (!host) return;
      /* Fill at least two viewports, then duplicate the whole run once more so
         the wrap distance is exactly one period and the loop is seamless. */
      while (track.scrollWidth < window.innerWidth * 2 && track.scrollWidth < 14000) {
        track.insertAdjacentHTML('beforeend', track.innerHTML);
      }
      var base = track.scrollWidth;
      track.insertAdjacentHTML('beforeend', track.innerHTML);

      var dir = i % 2 === 0 ? -1 : 1;
      var x = dir === -1 ? 0 : -base;
      var speed = 0.9, extra = 0, skew = 0;

      gsap.ticker.add(function () {
        x += dir * (speed + Math.abs(extra) * 0.9);
        if (x <= -base) x += base;
        if (x >= 0) x -= base;
        extra *= 0.92; skew *= 0.9;
        track.style.transform = 'translate3d(' + x + 'px,0,0) skewX(' + skew.toFixed(2) + 'deg)';
      });

      ST.create({
        start: 0, end: 'max',
        onUpdate: function (self) {
          var v = self.getVelocity() / 900;
          extra = Math.max(-14, Math.min(14, v));
          skew = Math.max(-7, Math.min(7, -v * 0.9));
        }
      });
    });

    /* --- services card stack --- */
    var cards = $$('.card');
    cards.forEach(function (card, i) {
      var inner = $('.card__in', card);
      if (!inner) return;
      if (i < cards.length - 1) {
        gsap.to(inner, {
          /* NOT brightness(): it multiplies, so on the light theme it turns
             the card into a near-black slab with dark text still on it.
             Opacity recedes the card toward the page ground in either theme. */
          scale: 0.9, yPercent: -4, opacity: .32, ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true }
        });
      }
      gsap.from(inner, {
        y: 70, opacity: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 80%' }
      });
    });

    /* --- horizontal work gallery --- */
    var hz = $('#hz'), track = $('#hzTrack');
    if (hz && track) {
      var mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', function () {
        var getDist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 40); };
        var tween = gsap.to(track, {
          x: function () { return -getDist(); },
          ease: 'none',
          scrollTrigger: {
            trigger: hz,
            start: 'top top',
            end: function () { return '+=' + getDist(); },
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
        /* per-card parallax on the artwork */
        $$('.proj__glyph').forEach(function (g) {
          gsap.fromTo(g, { xPercent: -14 }, {
            xPercent: 14, ease: 'none',
            scrollTrigger: { trigger: g.closest('.proj'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
          });
        });
        return function () { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); gsap.set(track, { x: 0 }); };
      });

      mm.add('(max-width: 900px)', function () {
        hz.style.overflowX = 'auto';
        hz.style.scrollSnapType = 'x mandatory';
        $$('.proj', track).forEach(function (p) { p.style.scrollSnapAlign = 'center'; });
        return function () { hz.style.overflowX = ''; hz.style.scrollSnapType = ''; };
      });
    }

    /* --- project card tilt --- */
    if (!coarse) {
      $$('.proj').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - .5;
          var py = (e.clientY - r.top) / r.height - .5;
          gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 900, duration: .5, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: .8, ease: 'power3.out' });
        });
      });
    }

    /* --- process line + dots --- */
    var fill = $('#procFill'), proc = $('.proc');
    if (fill && proc) {
      gsap.to(fill, {
        height: '100%', ease: 'none',
        scrollTrigger: { trigger: proc, start: 'top 65%', end: 'bottom 75%', scrub: .5 }
      });
      $$('.step').forEach(function (step) {
        ST.create({
          trigger: step, start: 'top 70%', end: 'bottom 55%',
          onToggle: function (self) { step.classList.toggle('on', self.isActive); }
        });
      });
      gsap.from($$('.step'), {
        y: 40, opacity: 0, duration: .85, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: proc, start: 'top 78%' }
      });
    }

    /* --- stack list rows --- */
    gsap.from($$('.stackList li'), {
      y: 30, opacity: 0, duration: .7, stagger: .06, ease: 'power3.out',
      scrollTrigger: { trigger: '.stackList', start: 'top 82%' }
    });

    /* --- huge contact type --- */
    gsap.from($$('.huge__line'), {
      yPercent: 40, opacity: 0, duration: 1.1, stagger: .1, ease: 'expo.out',
      scrollTrigger: { trigger: '.huge', start: 'top 88%' }
    });

    ST.refresh();
    window.addEventListener('load', function () { ST.refresh(); });
  }

  /* ---------------------------------------------------------
     8. WhatsApp chat card
     --------------------------------------------------------- */
  (function () {
    var wa = $('#wa');
    if (!wa) return;
    var DISMISS = 'gs-wa-dismissed';

    try { if (sessionStorage.getItem(DISMISS)) { wa.classList.add('gone'); return; } } catch (e) {}

    var said = false;
    /* Held back until the hero is behind you: it shares the bottom-right
       corner with the scroll cue, and a sales prompt should not cover the
       headline on first paint. */
    function sync() {
      var show = window.pageYOffset > window.innerHeight * 0.55;
      wa.classList.toggle('on', show);
      if (show && !said) {
        said = true;
        /* let the dots run briefly so it reads as a message being typed */
        setTimeout(function () { wa.classList.add('said'); }, reduce ? 0 : 1150);
      }
    }
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    var x = $('#waClose');
    if (x) x.addEventListener('click', function (e) {
      e.preventDefault();
      wa.classList.add('gone');
      /* session only -- dismissing today should not hide it forever */
      try { sessionStorage.setItem(DISMISS, '1'); } catch (err) {}
    });
  })();

  /* --- loader sequence --- */
  (function runLoader() {
    var countEl = $('#loadCount'), barEl = $('#loadBar');
    var pct = 0, pageLoaded = false, finished = false;
    window.addEventListener('load', function () { pageLoaded = true; });

    function finish() {
      if (finished) return;
      finished = true;
      document.body.classList.remove('is-loading');
      doc.classList.add('js');

      if (!hasGSAP || !loader) {
        if (loader) loader.style.display = 'none';
        $$('.lineIn').forEach(function (e) { e.style.transform = 'translateY(0)'; });
        $$('.reveal-up').forEach(function (e) { e.style.opacity = 1; e.style.transform = 'none'; });
        return;
      }
      var gsap = window.gsap;
      menuTl = buildMenuTl();
      var tl = gsap.timeline({
        onComplete: function () { loader.style.display = 'none'; }
      });
      tl.to('.loader__tag', { opacity: 1, duration: .3 }, 0)
        .fromTo('#loaderName .ln', { yPercent: LOADER_HIDDEN, y: 0 },
                { yPercent: 0, y: 0, duration: .9, stagger: .035, ease: 'expo.out' }, 0)
        .to('.loader__inner', { opacity: 0, duration: .4, ease: 'power2.in' }, '+=.35')
        .to('.loader__panels i', { scaleY: 0, transformOrigin: 'top', duration: .85, stagger: .07, ease: 'power4.inOut' }, '-=.2')
        /* start the page while the curtain is still lifting */
        .call(bootAnimations, null, '-=.55');

      /* same reasoning as the timeout above: the curtain timeline is itself
         rAF-driven, so jump it to the end if it has not run. */
      setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 4000);
    }

    if (reduce) { finish(); return; }

    /* Safety net: rAF is throttled to a standstill in a hidden or
       non-compositing tab, which would strand the visitor behind the
       curtain. Never let the intro hold the page for more than 3.5s. */
    setTimeout(finish, 3500);

    var start = performance.now();
    (function step(now) {
      var elapsed = (now || performance.now()) - start;
      var cap = pageLoaded ? 100 : 92;
      pct = Math.min(cap, elapsed / 11);
      if (countEl) countEl.textContent = String(Math.floor(pct));
      if (barEl) barEl.style.width = pct + '%';
      if (pct >= 100) { setTimeout(finish, 120); return; }
      requestAnimationFrame(step);
    })();
  })();

})();
