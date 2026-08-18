"use client";

import { useEffect, useState } from "react";
import { studio, links } from "../lib/content";

/* ==========================================================================
   WhatsApp floater.

   Holds off until you are past the hero, then sits bottom-right. Expands on
   hover, collapses on leave, and can be dismissed for the session.

   The mark is drawn here rather than using WhatsApp's own logo — the name
   describes where the link goes, which is all that is needed, and a bespoke
   glyph sits in the brand instead of fighting it.
   ========================================================================== */

const KEY = "gwd:wa-dismissed";

export default function WaFloat() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(true);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked — show it */
    }
    if (dismissed) return;

    setGone(false);

    // Appear once the hero is behind you, so it never covers the first screen.
    const onScroll = () => {
      setShown(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (gone) return null;

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* not fatal */
    }
    setGone(true);
  };

  return (
    <div
      className={`wa${shown ? " is-in" : ""}${open ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        className="wa__link"
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <span className="wa__badge" aria-hidden="true">
          {/* Speech bubble, drawn rather than borrowed. */}
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.7 8.7 0 0 1-3.9-.9L3 20.5l1.6-4.4A8.3 8.3 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12.1 3 8.4 8.4 0 0 1 21 11.5z" />
          </svg>
          <span className="wa__pulse" />
        </span>

        <span className="wa__body">
          <span className="wa__top">
            <span className="wa__name">{studio.person}</span>
            <span className="wa__status">
              <i aria-hidden="true" /> online
            </span>
          </span>
          <span className="wa__cta">Message me on WhatsApp →</span>
        </span>

        <span className="sr-only">
          Message {studio.person} on WhatsApp at {links.whatsappLabel}
        </span>
      </a>

      <button type="button" className="wa__x" onClick={dismiss} aria-label="Hide WhatsApp button">
        ×
      </button>
    </div>
  );
}
