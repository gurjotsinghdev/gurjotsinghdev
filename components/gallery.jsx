"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { work } from "../lib/content";

/* ==========================================================================
   Work gallery.

   On a wide screen the section pins and the cards travel left as you scroll —
   vertical input, horizontal motion.

   On touch, and whenever reduced motion is requested, it degrades to an
   ordinary swipeable strip. Hijacking scroll on a phone is how you make a site
   people cannot get out of, so that path is deliberately boring.
   ========================================================================== */

/** Deterministic 0–1 from a string, so each project gets stable artwork. */
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
  const hue = Math.round(14 + s * 26); // warm band, kept near the brand orange
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

        {/* The project number, set huge and cropped by the frame. */}
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
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);

  // Pin only where it is a good idea: wide screens with a real pointer.
  useEffect(() => {
    const check = () => {
      const ok =
        window.matchMedia("(min-width: 1000px)").matches &&
        window.matchMedia("(pointer: fine)").matches &&
        !reduce;
      setPinned(ok);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduce]);

  // How far the track has to travel to show its last card.
  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  // A little spring stops the track feeling nailed to the scrollbar.
  const x = useSpring(rawX, { stiffness: 220, damping: 40, mass: 0.6 });

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
    <div ref={wrapRef} className="gal" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="gal__pin">
        <motion.div ref={trackRef} className="gal__track" style={{ x }}>
          {work.map((item) => (
            <Card item={item} key={item.slug} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
