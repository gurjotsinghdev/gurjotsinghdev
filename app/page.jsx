"use client";

import { Rise, Fade, Marquee, Counter, Faq } from "../components/bits";
import { ScrollRail, Magnetic, Scramble } from "../components/motion-bits";
import Gallery from "../components/gallery";
import {
  studio, links, ticker, services, work,
  testimonials, metrics, capabilities, process, pricing, faqs,
} from "../lib/content";


export default function Page() {
  return (
    <div id="top">
      <ScrollRail />

      {/* ================= TICKER ================= */}
      <div className="ticker" aria-hidden="true">
        <Marquee trackClass="ticker__track" duration={44}>
          {ticker.map((t, i) => (
            <span className="ticker__item" key={`${t}-${i}`}>
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ================= HERO ================= */}
      <section className="wrap hero">
        <div className="hero__meta">
          <span className="label">{studio.role}</span>
          <span className="mono" style={{ color: "var(--body)" }}>
            {studio.location} · <span lang="pa">{studio.locationPa}</span>
          </span>
        </div>

        <h1 className="display">
          {studio.headline.map((line, i) => (
            <Rise key={line} delay={0.08 + i * 0.09} className="hero__line">
              {i === studio.headline.length - 1 ? (
                <>
                  {line.replace(/\.$/, "")}
                  <span className="accent">.</span>
                </>
              ) : (
                line
              )}
            </Rise>
          ))}
        </h1>

        <div className="hero__foot">
          <Fade delay={0.4}>
            <p className="lede">{studio.sub}</p>
          </Fade>

          <Fade delay={0.5}>
            <div className="btn-row">
              <Magnetic>
                <a
                  className="btn btn--accent"
                  href={links.whatsapp}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Start a project
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href="#work">
                  See the work
                </a>
              </Magnetic>
            </div>
          </Fade>
        </div>
      </section>

      {/* ================= CLIENT MARQUEE ================= */}
      <Marquee className="marquee" trackClass="marquee__track" duration={52}>
        {work.map((w) => (
          <span className="marquee__item" key={w.no}>
            <span className="marquee__name">{w.name}</span>
            <span className="marquee__tag">{w.tags.join(" · ")}</span>
          </span>
        ))}
      </Marquee>

      {/* ================= STATEMENT ================= */}
      <section className="wrap sec">
        <div className="grid-2 grid-2--wide">
          <Fade>
            <span className="label"><Scramble text="STATEMENT.TXT" /></span>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Two people
              <br />
              is one too
              <br />
              many<span className="accent">.</span>
            </h2>
          </Fade>

          <Fade delay={0.1}>
            <div className="stack">
              <p className="lede">{studio.statement}</p>
              <div className="chips">
                {capabilities.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ================= METRICS ================= */}
      <section className="sec--ink sec--tight">
        <div className="wrap">
          <Fade>
            <span className="label"><Scramble text="METRICS" /></span>
          </Fade>
          <div className="grid-2" style={{ marginTop: 26 }}>
            <div className="grid-2" style={{ gap: 2 }}>
              {metrics.slice(0, 2).map((m, i) => (
                <Fade key={m.id} delay={i * 0.06}>
                  <div className="metric">
                    <span className="metric__val">
                      <Counter to={m.value} suffix={m.suffix} />
                    </span>
                    <span className="metric__label">{m.label}</span>
                  </div>
                </Fade>
              ))}
            </div>
            <div className="grid-2" style={{ gap: 2 }}>
              {metrics.slice(2).map((m, i) => (
                <Fade key={m.id} delay={0.12 + i * 0.06}>
                  <div className="metric metric--pending">
                    <span className="metric__val">—</span>
                    <span className="metric__label">
                      {m.label} · pending
                    </span>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
          <p className="mono" style={{ marginTop: 20, color: "#6f7881" }}>
            Two of these are waiting on real, verifiable numbers. They stay blank until they exist.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="wrap sec" id="services">
        <Fade>
          <span className="label"><Scramble text="WHAT I DO" /></span>
          <h2 className="h2" style={{ marginTop: 22, marginBottom: 12 }}>
            Three things<span className="accent">.</span>
          </h2>
          <p className="lede">
            Done by the same person, which is the entire point — the build already knows what
            search needs, and whoever hosts it is the one who made it.
          </p>
        </Fade>

        <div className="grid-3" style={{ marginTop: 48 }}>
          {services.map((s, i) => (
            <Fade key={s.id} delay={i * 0.08}>
              <article className="card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span className="card__no">{s.no}</span>
                  <span className="card__file">{s.file}</span>
                </div>
                <h3 className="h3">{s.name}</h3>
                <span className="card__tools">{s.tools}</span>
                <hr className="rule--thin" />
                <p className="body" style={{ fontSize: 15 }}>
                  {s.blurb}
                </p>
                <ul className="card__list">
                  {s.includes.map((it) => (
                    <li className="card__item" key={it}>
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Fade>
          ))}
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section className="sec" id="work">
        <div className="wrap">
          <Fade>
            <span className="label"><Scramble text="SELECTED WORK" /></span>
            <h2 className="h2" style={{ marginTop: 22, marginBottom: 12 }}>
              Live sites<span className="accent">.</span>
            </h2>
            <p className="lede">
              Seven businesses that needed a site to do something other than exist. Scroll to pan
              across them.
            </p>
          </Fade>
        </div>

        <div style={{ marginTop: 48 }}>
          <Gallery />
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="wrap sec" id="process">
        <Fade>
          <span className="label"><Scramble text="HOW IT RUNS" /></span>
          <h2 className="h2" style={{ marginTop: 22, marginBottom: 12 }}>
            No forms.
            <br />
            No hoops<span className="accent">.</span>
          </h2>
        </Fade>

        <div style={{ marginTop: 44 }}>
          {process.map((p, i) => (
            <Fade key={p.no} delay={i * 0.05}>
              <div className="step">
                <span className="step__no">
                  {p.no} · {p.file}
                </span>
                <h3 className="h4">{p.title}</h3>
                <p className="body" style={{ fontSize: 15 }}>
                  {p.body}
                </p>
              </div>
            </Fade>
          ))}
          <hr className="rule" />
        </div>
      </section>

      {/* ================= PROOF ================= */}
      <section className="wrap sec--tight">
        <Fade>
          <span className="label"><Scramble text="WHAT CLIENTS SAY" /></span>
          <h2 className="h2" style={{ marginTop: 22, marginBottom: 12 }}>
            Nothing yet<span className="accent">.</span>
          </h2>
          <p className="lede">
            Three real quotes are being collected. Until they arrive these stay empty — a
            made-up testimonial is worse than none.
          </p>
        </Fade>

        <div className="grid-3" style={{ marginTop: 40, gap: 16 }}>
          {testimonials.map((t, i) => (
            <Fade key={t.id} delay={i * 0.08}>
              <div className="slot">
                <span className="slot__tag">Awaiting quote</span>
                <p className="slot__note">
                  Client testimonial {i + 1} of {testimonials.length}. Drop the quote, name and
                  company into <code className="mono">lib/content.js</code>.
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="wrap sec" id="pricing">
        <Fade>
          <span className="label"><Scramble text="PRICING" /></span>
          <h2 className="h2" style={{ marginTop: 22, marginBottom: 12 }}>
            Fixed price,
            <br />
            written down<span className="accent">.</span>
          </h2>
          <p className="lede">
            One number for the site, agreed before anything starts. The monthly options are
            month to month — no lock-in, and you keep everything if you leave.
          </p>
        </Fade>

        <div className="grid-3" style={{ marginTop: 48 }}>
          {pricing.map((p, i) => (
            <Fade key={p.id} delay={i * 0.08}>
              <article className="card">
                <div className="price__top">
                  <h3 className="h4">{p.name}</h3>
                  <span className="price__from">{p.id === "site" ? "FLAT" : "FROM"}</span>
                </div>
                <span className="price__amt">{p.from}</span>
                <span className="price__cadence">{p.cadence}</span>
                <hr className="rule--thin" />
                <p className="body" style={{ fontSize: 14.5 }}>
                  {p.note}
                </p>
                <ul className="card__list">
                  {p.includes.map((it) => (
                    <li className="card__item" key={it}>
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Fade>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="wrap sec" id="faq">
        <Fade>
          <span className="label"><Scramble text="QUESTIONS" /></span>
          <h2 className="h2" style={{ marginTop: 22 }}>
            The bits you'd
            <br />
            ask on a call<span className="accent">.</span>
          </h2>
        </Fade>

        <div className="faq" style={{ marginTop: 44 }}>
          {faqs.map((f, i) => (
            <Faq item={f} index={i} key={f.file} />
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="foot" id="contact">
        <div className="wrap">
          <Fade>
            <span className="label"><Scramble text="GET IN TOUCH" /></span>
            <h2 className="h2" style={{ marginTop: 22, marginBottom: 28 }}>
              Got something
              <br />
              worth building<span className="accent">?</span>
            </h2>
            <a
              className="foot__mail"
              href={links.whatsapp}
              rel="noopener noreferrer"
              target="_blank"
            >
              {links.whatsappLabel}
            </a>
            <p className="mono" style={{ marginTop: 14, color: "#8f98a1" }}>
              WhatsApp is the fastest way to reach me.
            </p>
            <div className="btn-row" style={{ marginTop: 34 }}>
              <Magnetic>
                <a
                  className="btn"
                  href={links.whatsapp}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Start a conversation
                </a>
              </Magnetic>
            </div>
          </Fade>

          <div className="foot__cols">
            <div>
              <p className="foot__h">Studio</p>
              <div className="foot__links">
                <a href="#work">Work</a>
                <a href="#services">Services</a>
                <a href="#process">Process</a>
                <a href="#pricing">Pricing</a>
              </div>
            </div>
            <div>
              <p className="foot__h">Elsewhere</p>
              <div className="foot__links">
                <a href={links.github} rel="noopener noreferrer" target="_blank">GitHub</a>
                <a href={links.codepen} rel="noopener noreferrer" target="_blank">CodePen</a>
                <a href={links.stackoverflow} rel="noopener noreferrer" target="_blank">Stack Overflow</a>
                <a href={links.resume} rel="noopener noreferrer" target="_blank">Résumé</a>
              </div>
            </div>
            <div>
              <p className="foot__h">Where</p>
              <div className="foot__links">
                <span>{studio.location}</span>
                <span lang="pa">{studio.locationPa}</span>
                <span>Clients anywhere</span>
              </div>
            </div>
          </div>

          <div className="foot__base">
            <span>
              © {new Date().getFullYear()} {studio.name} · {studio.person}
            </span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
