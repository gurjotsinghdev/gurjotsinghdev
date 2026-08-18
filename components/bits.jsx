"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { studio } from "../lib/content";

/* ==========================================================================
   Small pieces shared across the page.
   ========================================================================== */

/** A line of the hero that wipes up into place. */
export function Rise({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <span className={className} style={{ display: "block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Fades a block in as it scrolls into view. */
export function Fade({ children, delay = 0, as: Tag = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  if (reduce) return <Tag {...rest}>{children}</Tag>;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A seamless marquee.
 *
 * The children are rendered twice and the track slides exactly -50%, so the
 * second copy lands where the first began and the loop is invisible.
 */
export function Marquee({ children, duration = 38, className = "", trackClass = "" }) {
  return (
    <div className={className}>
      <div className={trackClass} style={{ "--dur": `${duration}s` }}>
        <div style={{ display: "flex" }} aria-hidden="false">
          {children}
        </div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Counts up to a number once it is on screen. */
export function Counter({ to, suffix = "", duration = 1.4 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // Ease-out so it decelerates into the final number.
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** Local time where the work happens. */
export function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: studio.timezone,
      }).format(new Date());

    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);

  // Rendered empty on the server so the markup matches until the clock starts.
  return (
    <span className="nav__clock">
      <span className="nav__live" aria-hidden="true" />
      <span>{time ? `${time} VANCOUVER` : "VANCOUVER"}</span>
    </span>
  );
}

/** One FAQ row. Native disclosure semantics, animated height. */
export function Faq({ item, index }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="faq__item">
      <button
        type="button"
        className="faq__q"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="faq__file">{item.file}</span>
        <span className="faq__text">{item.q}</span>
        <span className="faq__sign" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <motion.div
        id={id}
        className="faq__a"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="faq__a-in">
          <p className="body">{item.a}</p>
        </div>
      </motion.div>
    </div>
  );
}
