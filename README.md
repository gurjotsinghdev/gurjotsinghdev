# Gurjot Singh (Gary) — Portfolio

A single-page portfolio. No build tooling, no dependencies to install — the
deployable output is one self-contained HTML file.

## Files

| Path | What it is |
|---|---|
| `index.html` | **The deliverable.** Upload this one file anywhere. |
| `artifact.html` | Same page without `<html>/<head>/<body>`, for Claude Artifacts. |
| `build.sh` | Concatenates `src/` into both outputs. |
| `src/meta.html` | `<title>`, SEO + Open Graph meta, favicon, fonts, Person JSON-LD. |
| `src/style.css` | All styles, including both theme token blocks. |
| `src/body.html` | All markup. |
| `src/app.js` | The motion system. |
| `src/cdn.html` | The three CDN script tags. |

**Edit `src/`, never `index.html`** — it is generated and gets overwritten.

```bash
sh build.sh
```

## Deploying

`index.html` is fully self-contained apart from three CDN scripts and Google
Fonts. Drag it into Netlify Drop, a Vercel project, GitHub Pages, or any
`public_html` folder. Nothing to compile.

## How it is put together

**Stack.** GSAP 3.12.5 + ScrollTrigger from cdnjs, Lenis 1.1.14 from jsDelivr
for smooth scroll. Everything else is hand-written. No framework, no bundler.

**Themes.** Light is the default. `[data-theme="dark"]` on `<html>` swaps the
token block at the top of `style.css` and nothing else — no component rule
hardcodes a colour. The toggle is the ☾/☀ button in the nav; the choice is
remembered in `localStorage` and a saved dark choice is restored by a tiny
inline script before first paint, so that visitor never sees a light flash.

**The accent has two tokens on purpose.** `--acid` is the lime used as a *fill*
(button sweeps, the progress bar, hover rows) and stays lime in both themes.
`--acid-ink` is the accent used as *text* — deep olive on light, lime on dark,
because lime text on a light ground is unreadable.

**Motion inventory.** Preloader with counter and a five-panel curtain wipe;
custom cursor that morphs and labels itself over projects and the email link;
magnetic buttons; per-line masked reveals; scroll-velocity-reactive marquees;
word-by-word scrub reveal on the statement; counting stats; a pinned
three-card service stack; a pinned horizontal work gallery with per-card
parallax and tilt; an SVG-free process line that draws on scroll; scramble-text
links; and two cursor-reactive canvas aurora fields.

**The clock is Vancouver, not the visitor.** The point is telling someone
whether Gary is awake. The zone abbreviation is read from `Intl`, never
hardcoded — Vancouver is PDT for eight months of the year, PST for four.
The same hour drives the contact aside and the WhatsApp label, which says
"Asleep · leave a message" between 22:00 and 06:00.

**The WhatsApp CTA is a chat card**, not an icon — avatar, name, live
status badge and the ask, all legible without hovering. It stays hidden
until the hero is scrolled past, arrives with a typing indicator before the
line settles, and is dismissable (× , remembered for the session only).
Prefilled message: "Hello Gary! I just saw your portfolio website and would
like to chat."

**Project artwork stays dark in both themes** — the gradient tiles are meant
to read as imagery, not as page surface.

**Degradation.** If GSAP fails to load, everything hidden for animation is
revealed and the page reads as a normal static site. `prefers-reduced-motion`
skips the intro entirely. Two independent timeouts guarantee the preloader can
never strand a visitor behind the curtain — `requestAnimationFrame` is
throttled to a standstill in a backgrounded tab, which would otherwise freeze
the intro mid-wipe.

## Things to change before this goes live

1. **Contact details are live.** Vancouver, BC in the hero; WhatsApp CTA on
   +1 778 929 0374 (`wa.me/17789290374`). Change both in `src/body.html`,
   along with the prefilled message in the same `href`.
2. **The stats are conservative and honest.** `12+ projects`, `3 disciplines`,
   `2 countries`, `100% end to end`. If you have more shipped work, raise the
   first number in `src/body.html` (`data-count`).
3. **The security case study is anonymised** — it is listed as "Incident
   Response & Cleanup" with a `Confidential` tag and no client name, because
   naming a client's breach publicly is not yours to do. Get written permission
   before naming them.
4. **Project links.** The work cards have no outbound links yet. Add `href`s to
   the live sites you are happy to show.
5. **No testimonials.** Deliberately omitted rather than invented. Add a real
   quotes section once you have permission to publish client words.
6. **Screenshots.** The project artwork is generated from CSS gradients. Real
   screenshots would be stronger — swap `.proj__art` for an `<img>`.
7. **Analytics.** Nothing is tracked. Add GA4 or Plausible before launch.
8. **Domain + OG image.** Add `<link rel="canonical">` and an
   `og:image` (1200×630) in `src/meta.html` once the domain is decided.
