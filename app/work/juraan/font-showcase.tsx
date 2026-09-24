"use client";

import { useEffect, useRef, useState } from "react";

/* The Juraan typeface, rendered live from the actual .ttf that ships on the
 * client's site — a specimen, not the page's type. The case study itself is
 * set in Plex Mono like every other one; the custom font appears here as the
 * subject, framed and measured.
 *
 * Every colour comes from --cs-*, so the guides are drawn in the project's
 * own accent rather than in a colour picked to look good against bronze. */

const SPECIMEN = [
  { text: "Juraan", size: "clamp(4rem, 10vw, 7rem)", label: "Display", accent: true },
  { text: "God and Devil", size: "clamp(2.5rem, 6vw, 4.5rem)", label: "Hero" },
  { text: "The World of Juraan", size: "clamp(1.75rem, 4vw, 3rem)", label: "H1" },
  { text: "Bronze · Mythology · Mongolia", size: "clamp(1.25rem, 2.5vw, 2rem)", label: "H2", dim: true },
];

const SCALE = [
  { label: "hero", px: "48–96px", w: "100%" },
  { label: "h1", px: "40–64px", w: "75%" },
  { label: "h2", px: "28–40px", w: "50%" },
  { label: "h3", px: "20–28px", w: "35%" },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const META = [
  "Weight: Regular (400)",
  "Format: TrueType",
  "Licence: Custom / exclusive",
  "Usage: Display only",
];

export function FontShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="cs-demo">
      <div className="cs-demo-bar">
        <div className="cs-dots">
          <i />
          <i />
          <i />
        </div>
        <span className="cs-demo-url">JuraanFont-Regular.ttf — custom display typeface</span>
        <span className="cs-demo-tag">Live font</span>
      </div>

      {visible ? (
        <div className="fs-body">
          <style>{`
            @font-face {
              font-family: 'JuraanShowcase';
              src: url('/demos/juraan/assets/JuraanFont-Regular.ttf') format('truetype');
              font-weight: normal; font-style: normal; font-display: swap;
            }
            .fs-body { padding: clamp(20px, 3vw, 32px); }
            .fs-head {
              display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
            }
            .fs-head span {
              font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
              color: var(--cs-ink-3);
            }
            .fs-head i { flex: 1; border-top: 1px dashed var(--cs-rule); }

            /* the horizontal metric guides that make it read as a specimen
               sheet rather than as decorative big text */
            .fs-line {
              position: relative; padding: 16px 0;
              display: flex; align-items: baseline; gap: 16px;
            }
            .fs-line::before, .fs-line::after {
              content: ''; position: absolute; left: 0; right: 0;
              border-top: 1px dashed var(--cs-rule);
            }
            .fs-line::before { top: 0; }
            .fs-line::after { bottom: 0; }
            .fs-line > b {
              flex: 0 0 auto; width: 56px;
              font-size: 9px; font-weight: 400; letter-spacing: .14em;
              text-transform: uppercase; color: var(--cs-ink-3);
            }
            .fs-line > p {
              margin: 0; line-height: 1.1;
              font-family: 'JuraanShowcase', serif;
            }

            .fs-block { margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--cs-rule); }

            .fs-scale { display: flex; align-items: center; gap: 16px; padding: 7px 0;
                        border-bottom: 1px dashed var(--cs-rule); }
            .fs-scale b { width: 34px; flex: 0 0 auto; font-size: 9px; font-weight: 400;
                          text-transform: uppercase; color: var(--cs-accent); }
            .fs-scale i { height: 11px; background: var(--cs-accent); opacity: .22; }
            .fs-scale span { flex: 0 0 auto; margin-left: auto; font-size: 9px; color: var(--cs-ink-3); }

            /* one cell per glyph, each carrying its own cap-height, x-height,
               baseline and descender rules */
            .fs-set { display: grid; grid-template-columns: repeat(9, 1fr); }
            @media (min-width: 640px) { .fs-set { grid-template-columns: repeat(13, 1fr); } }
            .fs-cell { position: relative; aspect-ratio: 1 / 1.3;
                       display: grid; place-items: center; }
            .fs-cell u, .fs-cell s {
              position: absolute; left: 0; right: 0; border-top: 1px dashed var(--cs-accent);
            }
            .fs-cell u { top: 0; opacity: .18; }            /* cap height */
            .fs-cell u + u { top: 38%; opacity: .12; }      /* x-height */
            .fs-cell s { bottom: 15%; opacity: .24; }       /* baseline */
            .fs-cell s + s { bottom: 0; opacity: .1; }      /* descender */
            .fs-cell em {
              position: absolute; top: 0; bottom: 0; left: 0;
              border-left: 1px dashed var(--cs-accent); opacity: .1;
            }
            .fs-cell em + em { left: auto; right: 0; border-left: 0;
                               border-right: 1px dashed var(--cs-accent); }
            .fs-cell span {
              position: relative; z-index: 1; line-height: 1;
              font-family: 'JuraanShowcase', serif;
              font-size: clamp(2rem, 5vw, 3.5rem); color: var(--cs-ink);
            }

            .fs-metric { display: flex; align-items: center; gap: 8px; }
            .fs-metric b { font-size: 8px; font-weight: 400; letter-spacing: .14em;
                           text-transform: uppercase; color: var(--cs-ink-3); }
            .fs-metric i { flex: 1; border-top: 1px dashed var(--cs-accent); opacity: .2; }

            .fs-meta { display: flex; flex-wrap: wrap; gap: 8px 32px; margin-top: 22px;
                       padding-top: 16px; border-top: 1px solid var(--cs-rule); }
            .fs-meta span { font-size: 9px; color: var(--cs-ink-3); }
          `}</style>

          <div className="fs-head">
            <span>Type specimen</span>
            <i />
          </div>

          {SPECIMEN.map((l) => (
            <div key={l.label} className="fs-line">
              <b>{l.label}</b>
              <p
                style={{
                  fontSize: l.size,
                  color: l.accent
                    ? "var(--cs-accent)"
                    : l.dim
                      ? "var(--cs-ink-3)"
                      : "var(--cs-ink)",
                }}
              >
                {l.text}
              </p>
            </div>
          ))}

          <div className="fs-block">
            <div className="fs-head">
              <span>Fluid scale — CSS clamp()</span>
              <i />
            </div>
            {SCALE.map((s) => (
              <div key={s.label} className="fs-scale">
                <b>{s.label}</b>
                <i style={{ width: s.w }} />
                <span>{s.px}</span>
              </div>
            ))}
          </div>

          <div className="fs-block">
            <div className="fs-head">
              <span>Character set</span>
              <i />
            </div>

            <div className="fs-metric" style={{ marginBottom: 4 }}>
              <b>Cap height</b>
              <i />
            </div>

            <div className="fs-set">
              {LETTERS.map((letter) => (
                <div key={letter} className="fs-cell">
                  <u />
                  <u />
                  <s />
                  <s />
                  <em />
                  <em />
                  <span>{letter}</span>
                </div>
              ))}
            </div>

            <div className="fs-metric" style={{ marginTop: 4 }}>
              <b>Baseline</b>
              <i />
            </div>
          </div>

          <div className="fs-meta">
            {META.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="cs-demo-ph" style={{ height: 600 }}>
          scroll to load font showcase
        </div>
      )}
    </div>
  );
}
