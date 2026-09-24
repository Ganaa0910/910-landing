import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

/* THE SHOWCASE LAYER — a case study as a brand story, not an audit.
 *
 * Every page is the same shape: hero, one big shot, three beats of story,
 * with the palette, the type and one signature visual set between them.
 * The prose budget is three paragraphs, and the Beat is the only thing
 * that takes one, so the budget is enforced by the structure rather than
 * by discipline. Server components throughout. Styles: .sc-* in reel.css. */

/* ── the big picture ─────────────────────────────── */
export function Shot({
  src,
  alt,
  width,
  height,
  ratio,
  focus,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /* crop to a frame, e.g. "16 / 9" — for portrait sources in a wide slot */
  ratio?: string;
  /* object-position when cropped */
  focus?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`sc-shot${ratio ? " crop" : ""}`}
      style={
        ratio
          ? ({ "--sc-ratio": ratio, "--sc-focus": focus ?? "50% 50%" } as CSSProperties)
          : undefined
      }
    >
      <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="(max-width: 1200px) 100vw, 1120px" />
    </figure>
  );
}

/* two shots side by side, stacked on a phone */
export function Pair({ children }: { children: ReactNode }) {
  return <div className="sc-pair">{children}</div>;
}

/* ── one beat of the story ───────────────────────── */
export function Beat({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="sc-beat">
      <div className="sc-beat-head">
        <span className="n">{n}</span>
        <span className="l">{label}</span>
      </div>
      <p>{children}</p>
    </section>
  );
}

/* ── the palette, as bands you can feel ──────────── */
export type Chip = {
  name: string;
  val: string;
  /* relative width — the lead colour gets more of the strip */
  w?: number;
};

/* pick paper or ink for the label from the chip's own luminance */
function onColor(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.36 ? "#0B0B0B" : "#FAFAFA";
}

export function Palette({ chips }: { chips: Chip[] }) {
  return (
    <div className="sc-palette" role="list" aria-label="Palette">
      {chips.map((c) => (
        <div
          key={c.val + c.name}
          role="listitem"
          className="sc-chip"
          style={{ background: c.val, color: onColor(c.val), "--w": c.w ?? 1 } as CSSProperties}
        >
          <b>{c.name}</b>
          <code>{c.val}</code>
        </div>
      ))}
    </div>
  );
}

/* ── the typeface, set as the subject ────────────── */
export function Specimen({
  face,
  name,
  role,
  sample,
  glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789",
}: {
  /* a CSS font-family — the client's real face */
  face: string;
  name: string;
  role: string;
  sample: string;
  glyphs?: string;
}) {
  return (
    <div className="sc-type" style={{ "--sc-face": face } as CSSProperties}>
      <span className="aa" aria-hidden="true">Aa</span>
      <div className="meta">
        <span className="role">{role}</span>
        <p className="name">{name}</p>
        <p className="sample">{sample}</p>
        <p className="glyphs">{glyphs}</p>
      </div>
    </div>
  );
}

/* a stage for a live, interactive piece of the client's world */
export function Stage({ children }: { children: ReactNode }) {
  return <div className="sc-stage">{children}</div>;
}
