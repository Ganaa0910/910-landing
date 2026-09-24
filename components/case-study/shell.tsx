import type { CSSProperties, ReactNode } from "react";
import { getProject, type Project } from "@/lib/projects";
import { TransitionLink } from "@/components/nav/page-shell";
import { AmbientDither } from "./ambient-dither";

/* The frame every case study is built in. Server components — the pages are
 * static content, and only the demo frames need to be client islands.
 *
 * The palette arrives here as --cs-* custom properties and nothing below
 * hard-codes a colour, which is the whole contract: a case study wears the
 * client's colours on 910's structure, so adding one should need no new CSS. */

export function CaseStudy({
  slug,
  children,
  ambient,
  backdrop,
}: {
  slug: string;
  children: ReactNode;
  /* line art / motifs to run as the ambient dither field behind the page */
  ambient?: string[];
  /* a per-project ground layer. Must render as a SIBLING of .cs-wrap, not
     inside it: .cs-wrap carries z-index 1 and so opens a stacking context,
     and anything positioned within it paints over the copy no matter how
     low its own z-index is. */
  backdrop?: ReactNode;
}) {
  const project = getProject(slug);
  if (!project) {
    throw new Error(
      `No project registered for "${slug}" — add it to PROJECTS in lib/projects.ts. ` +
        `SiteHeader also reads that entry, so an unregistered case study gets the ` +
        `default bar.`,
    );
  }

  const p = project.palette;

  return (
    <main
      className="case-study"
      style={
        p
          ? ({
              "--cs-ground": p.ground,
              "--cs-ink": p.ink,
              "--cs-ink-2": p.ink2,
              "--cs-ink-3": p.ink3,
              "--cs-rule": p.rule,
              "--cs-accent": p.accent,
              "--cs-on-accent": p.onAccent,
              ...(p.signal ? { "--cs-signal": p.signal } : {}),
            } as CSSProperties)
          : undefined
      }
    >
      {backdrop}
      {ambient?.length ? <AmbientDither sources={ambient} /> : null}
      <div className="cs-wrap">{children}</div>
    </main>
  );
}

export function Section({
  num,
  label,
  title,
  children,
}: {
  num: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="cs-section">
      <div className="cs-shead">
        <span className="cs-num">{num}</span>
        <span className="cs-label">{label}</span>
      </div>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* One meta item in the hero strip. `live` tints the value with the accent —
   for the shipped URL, which is the one fact a reader might want to click. */
export function Meta({
  label,
  value,
  live,
}: {
  label: string;
  value: string;
  live?: boolean;
}) {
  return (
    <div>
      <span>{label}</span>
      <p className={live ? "live" : undefined}>{value}</p>
    </div>
  );
}

export function Quote({
  children,
  cite,
  self,
}: {
  children: ReactNode;
  cite: string;
  self?: boolean;
}) {
  return (
    <blockquote className={`cs-quote${self ? " self" : ""}`}>
      <p>{children}</p>
      <cite>{cite}</cite>
    </blockquote>
  );
}

export function Swatches({
  colors,
}: {
  colors: { name: string; val: string }[];
}) {
  return (
    <div className="cs-swatches">
      {colors.map((c) => (
        <div key={c.name + c.val} className="cs-swatch">
          <i style={{ background: c.val }} />
          <div>
            <b>{c.name}</b>
            <code>{c.val}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Stats({
  items,
}: {
  items: { num: string; label: string; desc: string }[];
}) {
  return (
    <div className="cs-grid cs-grid-3">
      {items.map((o) => (
        <div key={o.label} className="cs-stat">
          <b>{o.num}</b>
          <strong>{o.label}</strong>
          <p>{o.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function Table({
  head,
  rows,
}: {
  head: [string, string, string];
  rows: readonly (readonly [string, string, string])[];
}) {
  return (
    <div className="cs-tablewrap">
      <table className="cs-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={a}>
              <td>{a}</td>
              <td className="k">{b}</td>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Closing CTA + the way back. Both use TransitionLink: next/link navigates
   immediately, which skips the exit animation and hard-cuts the page while
   the globe is still mid-morph. It fails silently — the link works, it just
   looks broken. */
export function Tail({
  headline = "Like what you see?",
  download,
  backHref = "/work",
  backLabel = "All work",
}: {
  headline?: string;
  /* a toy closes with a download, not an enquiry — asking someone to start a
     project at the end of a thing you gave away free reads as a bait */
  download?: { href: string; label: string };
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <>
      <div className="cs-tail">
        <h2>{headline}</h2>
        {download ? (
          <a
            className="cs-cta dl"
            href={download.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {download.label}
          </a>
        ) : (
          <TransitionLink className="cs-cta" href="/contact">
            Start a project →
          </TransitionLink>
        )}
      </div>
      <TransitionLink className="cs-back" href={backHref}>
        <span aria-hidden="true">←</span> {backLabel}
      </TransitionLink>
    </>
  );
}

export type { Project };
