"use client";

import { useEffect, useRef, useState } from "react";
import { studio } from "../lib/content";

/* ==========================================================================
   Loader.

   Counts to 100 while the page settles, wipes away, and does not come back
   for the rest of the session.

   This element covers everything, so its failure modes matter more than its
   looks. Three rules follow from that:

     1. It starts as plain visible markup. Nothing here waits for JS to become
        opaque, so a stalled script can never leave an invisible sheet over a
        working page.
     2. It removes itself on a hard timer regardless of what else happens —
        no dependency on load events, fonts, or animation callbacks finishing.
     3. Escape, click, or any key dismisses it early.
   ========================================================================== */

const KEY = "gwd:loaded";
const HOLD = 2100; // ceiling, not a target — the counter usually beats it

export default function Loader() {
  // `null` = undecided, so a returning visitor never sees it flash.
  const [state, setState] = useState(null);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked — treat as a first visit */
    }

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setState("gone");
      document.documentElement.classList.remove("is-loading");
      return;
    }

    document.documentElement.classList.add("is-loading");
    setState("running");
  }, []);

  useEffect(() => {
    if (state !== "running") return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* not fatal */
      }
      document.documentElement.classList.remove("is-loading");
      setState("leaving");
      // Long enough for the wipe, short enough that a dropped frame does not
      // strand anyone. Unmount is on a timer, never on an animation callback.
      window.setTimeout(() => setState("gone"), 700);
    };

    // Ease the counter so it decelerates into 100 instead of running linearly.
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / HOLD, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - t, 2.2))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    // Belt and braces: if rAF is throttled (background tab), still leave.
    const hard = window.setTimeout(finish, HOLD + 900);

    const skip = () => {
      setPct(100);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hard);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [state]);

  if (state === null || state === "gone") return null;

  const letters = studio.name.split("");

  return (
    <div
      className={`loader${state === "leaving" ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="loader__inner">
        <p className="loader__word" aria-hidden="true">
          {letters.map((ch, i) => (
            <span
              className="loader__ch"
              key={`${ch}-${i}`}
              style={{ "--i": i, "--n": letters.length }}
            >
              {ch}
            </span>
          ))}
        </p>

        <div className="loader__meter" aria-hidden="true">
          <span className="loader__fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>

        <p className="loader__pct" aria-hidden="true">
          <span>{String(pct).padStart(3, "0")}</span>
          <span className="loader__tag">{studio.role}</span>
        </p>
      </div>

      {/* The wipe. Four panels leaving at staggered delays. */}
      <div className="loader__wipe" aria-hidden="true">
        <span style={{ "--i": 0 }} />
        <span style={{ "--i": 1 }} />
        <span style={{ "--i": 2 }} />
        <span style={{ "--i": 3 }} />
      </div>
    </div>
  );
}
