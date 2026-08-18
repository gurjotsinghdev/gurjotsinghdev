"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, useTransform, useReducedMotion } from "motion/react";

/* ==========================================================================
   Motion extras.

   Each of these is an enhancement on top of markup that already works. If the
   JS never runs you get a normal button, a normal heading and no progress bar,
   which is the correct failure.
   ========================================================================== */

/** A thin progress rail pinned under the nav. */
export function ScrollRail() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 240, damping: 40, mass: 0.4 });

  if (reduce) return null;

  return <motion.div className="rail" style={{ scaleX: width }} aria-hidden="true" />;
}

/**
 * Pulls gently toward the pointer.
 *
 * Applied to the primary calls to action only — on everything it becomes noise,
 * and it is skipped entirely for touch and reduced motion.
 */
export function Magnetic({ children, strength = 0.32, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf;
    const state = { x: 0, y: 0, tx: 0, ty: 0 };

    const move = (e) => {
      const r = el.getBoundingClientRect();
      state.tx = (e.clientX - (r.left + r.width / 2)) * strength;
      state.ty = (e.clientY - (r.top + r.height / 2)) * strength;
    };

    const reset = () => {
      state.tx = 0;
      state.ty = 0;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      state.x += (state.tx - state.x) * 0.16;
      state.y += (state.ty - state.y) * 0.16;
      // Sub-pixel jitter is not worth a repaint.
      if (Math.abs(state.x) < 0.05 && Math.abs(state.y) < 0.05) {
        el.style.transform = "";
        return;
      }
      el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0)`;
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      el.style.transform = "";
    };
  }, [strength, reduce]);

  return (
    <span ref={ref} className={`mag ${className}`} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#";

/**
 * Settles into its text from a run of random glyphs.
 *
 * The real string is always in the DOM for assistive tech; only a visual copy
 * scrambles, so nothing is ever announced as gibberish.
 */
export function Scramble({ text, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce || !inView) return;

    let frame = 0;
    let raf;
    const total = 18 + text.length * 2;

    const tick = () => {
      frame += 1;
      const locked = Math.floor((frame / total) * text.length);
      setShown(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < locked) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (frame < total) raf = requestAnimationFrame(tick);
      else setShown(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, reduce]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Scroll-linked parallax for a decorative child. */
export function Parallax({ children, amount = 60, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const eased = useSpring(scrollYProgress, { stiffness: 160, damping: 34 });
  const y = useTransform(eased, [0, 1], [amount, -amount]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
