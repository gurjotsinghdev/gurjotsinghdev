"use client";

import { useEffect, useRef, useState } from "react";
import { work } from "../lib/content";

/* ==========================================================================
   Work gallery.

   On a wide screen the section pins and the cards travel left as you scroll —
   vertical input, horizontal motion. On touch, and whenever reduced motion is
   requested, it degrades to an ordinary swipeable strip.

   The scroll maths are done by hand rather than with a scroll-linked motion
   value. The section's height is only known after the track has been measured,
   and a library that caches its target's layout on mount reads that height as
   zero and then never moves. Measuring in the same rAF loop that applies the
   transform removes that ordering problem entirely.
   ========================================================================== */

function seed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/**
 * Generated cover art.
 *
 * Stands in until a real screenshot is dropped at public/img/work/<slug>.jpg.
 * Deliberately abstract rather than a fake browser mockup — an invented
 * screenshot would misrepresent the work.
 */
function Cover({ item }) {
  const s = seed(item.slug);
  const hue = Math.round(14 + s * 26);
  const rot = -18 + s * 36;
  const a = `hsl(${hue} 92% 52%)`;
  const b = `hsl(${Math.round(hue + 18)} 78% 38%)`;

  return (
    <div className="cover" aria-hidden="true">
      <svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" className="cover__svg">
        <defs>
          <linearGradient id={`g-${item.slug}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <pattern id={`p-${item.slug}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M0 26L26 0" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
          </pattern>
        </defs>

        <rect width="800" height="560" fill="#0b0f12" />
        <g transform={`rotate(${rot} 400 280)`}>
          <rect x="-160" y="120" width="1120" height="330" fill={`url(#g-${item.slug})`} />
          <rect x="-160" y="120" width="1120" height="330" fill={`url(#p-${item.slug})`} />
        </g>

        <text
          x="52"
          y="470"
          fontFamily="'Space Grotesk', system-ui, sans-serif"
          fontSize="300"
          fontWeight="700"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="3"
          letterSpacing="-14"
        >
          {item.no}
        </text>
      </svg>
    </div>
  );
}

function Card({ item }) {
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      className="gcard"
      {...(item.href ? { href: item.href, rel: "noopener noreferrer", target: "_blank" } : {})}
    >
      <div className="gcard__media">
        {item.image ? (
          <img src={item.image} alt={`${item.name} website`} loading="lazy" className="gcard__img" />
        ) : (
          <Cover item={item} />
        )}
        <span className="gcard__no">{item.no}</span>
      </div>

      <div className="gcard__body">
        <h3 className="gcard__name">{item.name}</h3>
        <p className="gcard__sector">{item.sector}</p>
        <div className="gcard__tags">
          {item.tags.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
        <span className="gcard__go">{item.href ? "VISIT SITE ↗" : "URL PENDING"}</span>
      </div>
    </Tag>
  );
}

export default function Gallery() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(null);

  // Pin only where it is a good idea: wide screens, a real pointer, and motion
  // not disabled. Hijacking scroll on a phone traps people.
  useEffect(() => {
    const check = () =>
      setPinned(
        window.matchMedia("(min-width: 1000px)").matches &&
          window.matchMedia("(pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!pinned) {
      setHeight(null);
      return;
    }

    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf;
    let current = 0;
    let distance = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth + 96);
      // The runway has to equal the travel, or the last card never arrives.
      setHeight(window.innerHeight + distance);
    };

    measure();

    const loop = () => {
      raf = requestAnimationFrame(loop);

      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;

      // 0 when the section's top hits the viewport top, 1 when its bottom does.
      const p = Math.min(Math.max(-rect.top / runway, 0), 1);
      const goal = -p * distance;

      // Lerp so the track trails the scrollbar slightly instead of snapping.
      current += (goal - current) * 0.12;
      if (Math.abs(goal - current) < 0.1) current = goal;

      track.style.transform = `translate3d(${current.toFixed(2)}px, 0, 0)`;
    };

    loop();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      track.style.transform = "";
    };
  }, [pinned]);

  if (!pinned) {
    return (
      <div className="gal gal--free">
        <div className="gal__track gal__track--free">
          {work.map((item) => (
            <Card item={item} key={item.slug} />
          ))}
        </div>
        <p className="gal__hint mono">Swipe to see more →</p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="gal" style={height ? { height } : undefined}>
      <div className="gal__pin">
        <div ref={trackRef} className="gal__track">
          {work.map((item) => (
            <Card item={item} key={item.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
