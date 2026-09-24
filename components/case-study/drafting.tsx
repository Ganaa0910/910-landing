import type { CSSProperties, ReactNode } from "react";

/* THE DRAFTING LAYER — 910's case-study grammar.
 *
 * A case study used to be prose about a design system with a screenshot
 * underneath it. The studio's only visible contribution was the writing, and
 * the writing ended up claiming things the screenshots did not show.
 *
 * These primitives are the contribution instead: the client's system redrawn
 * as a technical sheet. Type set at real size on a real baseline grid,
 * spacing measured to scale, components rebuilt live with their padding
 * boxes exposed, the alpha ramp laid out with the job each step does.
 *
 * Server components throughout — nothing here needs state. See
 * app/drafting.css for the .bp-* / .dl-* grammar. */

/* ── sheet ─────────────────────────────────────────
   A numbered drawing. `src` names where the values came from, which is the
   difference between a specimen and a mood board: a reader can go and check. */
export function Sheet({
  n,
  label,
  src,
  children,
}: {
  n: string;
  label: string;
  /* e.g. "read from the shipped bundle" — cite the source of the numbers */
  src?: string;
  children: ReactNode;
}) {
  return (
    <section className="cs-section">
      <div className="dl-shead">
        <span className="n">{n}</span>
        <span className="l">{label}</span>
        <span className="dl-rule" />
        {src ? <span className="src">{src}</span> : null}
      </div>
      {children}
    </section>
  );
}

/* Grid paper. 4px minor, 32px major — set --bp-unit from the CLIENT's own
   spacing base so the paper is their unit, not a decorative grid. A reader
   can count squares and check the arithmetic. */
export function Paper({
  unit = 4,
  face,
  cap,
  children,
}: {
  unit?: number;
  /* the client's real font stack, so specimens set in their own type */
  face?: string;
  cap?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className="bp"
        style={
          {
            "--bp-unit": `${unit}px`,
            ...(face ? { "--bp-face": face } : {}),
          } as CSSProperties
        }
      >
        <i className="marks" aria-hidden="true" />
        {children}
      </div>
      {cap ? <p className="bp-cap">{cap}</p> : null}
    </>
  );
}

/* ── type specimen ─────────────────────────────────
   Each row sets the client's real style at its real size, on baseline rules
   drawn at that row's own leading. Where the leading is a multiple of the
   base unit the baselines land on the rules — the system is visibly true
   rather than asserted. */
export type TypeRow = {
  /* what this style is for, in the client's system */
  role: string;
  size: number;
  lh: number;
  weight: number;
  /* letter-spacing in px, as the stylesheet ships it */
  track: number;
  sample: string;
  /* an aside the reader would otherwise have to work out */
  note?: string;
};

export function TypeScale({ rows }: { rows: readonly TypeRow[] }) {
  return (
    <div className="bp-type">
      {rows.map((r) => (
        <div className="row" key={r.role}>
          <p
            className="sample"
            style={
              {
                fontSize: `${r.size}px`,
                lineHeight: `${r.lh}px`,
                fontWeight: r.weight,
                letterSpacing: `${r.track}px`,
                "--bp-lh": `${r.lh}px`,
              } as CSSProperties
            }
          >
            {r.sample}
          </p>
          <div className="meta">
            <b>
              {r.size}/{r.lh} · {r.weight} · {r.track > 0 ? "+" : ""}
              {r.track}px
            </b>
            <span>{r.role}</span>
            {r.note ? <span>{r.note}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── measure ladder ────────────────────────────────
   The spacing scale drawn to scale: bar widths ARE the pixel values, so it
   is a ruler rather than a picture of one. `off` greys the steps that break
   the base unit, because the honest version of a scale includes its
   exceptions. */
export function Ladder({
  steps,
}: {
  steps: readonly { px: number; use: string; off?: boolean }[];
}) {
  return (
    <div className="bp-ladder">
      {steps.map((s) => (
        <div key={s.px} className={s.off ? "off" : undefined}>
          <span className="v">{s.px}px</span>
          <span className="bar">
            <i style={{ width: `${s.px}px` }} />
            <span>{s.use}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── component cell ────────────────────────────────
   The client's component rebuilt live at 1:1 with its padding box exposed:
   what sits between the accent outline and the element's own edge IS the
   padding. Not a screenshot of a button — the button. */
export function Parts({ children }: { children: ReactNode }) {
  return <div className="bp-parts">{children}</div>;
}

export function Part({
  name,
  spec,
  note,
  children,
}: {
  name: string;
  spec: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="bp-part">
      <div className="well">{children}</div>
      <div className="id">
        <b>{name}</b>
        <span>
          {spec}
          {note ? <em>{note}</em> : null}
        </span>
      </div>
    </div>
  );
}

/* padding, as four values, applied to the demo AND to the outline that
   exposes it — one source, so the drawing cannot disagree with the thing it
   is drawing */
export function pad(t: number, r: number, b: number, l: number): CSSProperties {
  return {
    "--pt": `${t}px`,
    "--pr": `${r}px`,
    "--pb": `${b}px`,
    "--pl": `${l}px`,
    padding: `${t}px ${r}px ${b}px ${l}px`,
  } as CSSProperties;
}

/* ── ramp ──────────────────────────────────────────
   A colour set with the job each step does. A row of chips with hex under
   them says nothing about a system; the job column says the system.

   Two shapes, because two clients needed different ones: Nair's neutral is
   ONE hue at eleven alphas, so a step gives `a` and the swatch is base+alpha;
   Uuye's two palettes are discrete values, so a step gives `val` outright.
   The `note` column carries whatever the third fact is — a percentage for an
   alpha ramp, a token name for a discrete one. */
export function Ramp({
  base,
  steps,
}: {
  /* the hue an alpha ramp is one colour of; omit for discrete palettes */
  base?: string;
  steps: readonly { a?: string; val?: string; pct: string; use: string }[];
}) {
  return (
    <div className="bp-ramp">
      {steps.map((s) => {
        const swatch = s.val ?? `${base ?? ""}${s.a ?? ""}`;
        return (
          <div key={s.val ?? s.a}>
            <i style={{ background: swatch }} />
            <code>{s.a ?? s.val}</code>
            <b>{s.use}</b>
            <em>{s.pct}</em>
          </div>
        );
      })}
    </div>
  );
}

/* The accent, alone, with where it is actually spent.

   An earlier version of this took a single number and claimed the colour
   appeared N times "in the shipped stylesheet". That was only true of one
   route's bundle, and the whole-source count was twenty times higher — the
   kind of claim that reads well and falls over the moment a reader greps.
   So it reports a distribution instead, which turns out to be the better
   story anyway: you can see the colour concentrate as the visitor gets
   closer to committing. */
export function Ink({
  val,
  name,
  total,
  files,
  of,
  spend,
}: {
  val: string;
  name: string;
  /* total references across the source */
  total: number;
  /* how many files carry it, out of how many */
  files: number;
  of: number;
  /* where it is spent, heaviest first */
  spend: readonly { where: string; n: number; what: string }[];
}) {
  const max = Math.max(...spend.map((x) => x.n));
  return (
    <div className="bp-ink">
      <i style={{ background: val }} />
      <div>
        <b>
          {name} · {val} · {total} references across {files} of {of} components
        </b>
        <ol>
          {spend.map((x) => (
            <li key={x.where}>
              {/* the bar is the count, to scale, so the concentration reads
                  before the numbers do */}
              <i style={{ width: `${(x.n / max) * 100}%` }} />
              <b>{x.n}</b>
              <span>
                <em>{x.where}</em>
                {x.what}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── radius ladder ─────────────────────────────────
   Corner arcs at real radius, each naming what owns it. */
export function Radii({
  steps,
}: {
  steps: readonly { r: string; owns: string }[];
}) {
  return (
    /* .replica is what exempts this from the global `border-radius: 0
       !important` in globals.css. These arcs ARE the client's corners; the
       910 brand rule flattening them would make the sheet argue for a ladder
       while drawing six identical right angles. */
    <div className="bp-radii replica">
      {steps.map((s) => (
        <div key={s.r}>
          <span className="bp-arc" style={{ "--r": s.r } as CSSProperties} />
          <span className="bp-lbl">{s.r}</span>
          <span className="bp-own">{s.owns}</span>
        </div>
      ))}
    </div>
  );
}

/* ── easing plot ───────────────────────────────────
   A cubic-bezier written out is four numbers nobody can picture. Plotted, it
   is the whole argument for why the motion feels the way it does. The curve
   is drawn from the same four control points the CSS ships, passed in as
   `p`, so the drawing cannot drift from the declaration. */
export function Curves({ children }: { children: ReactNode }) {
  return <div className="bp-curves">{children}</div>;
}

export function Curve({
  p,
  name,
  note,
}: {
  p: [number, number, number, number];
  name: string;
  note: string;
}) {
  const [x1, y1, x2, y2] = p;
  /* 100x100 box, y inverted so progress runs upward the way an easing chart
     is always read */
  const d = `M0 100 C ${x1 * 100} ${100 - y1 * 100}, ${x2 * 100} ${100 - y2 * 100}, 100 0`;
  return (
    <figure className="bp-curve">
      <div className="bp dl-dashed" style={{ padding: 14, marginTop: 0 }}>
        <i className="marks" aria-hidden="true" />
        <svg viewBox="-4 -4 108 108" role="img" aria-label={`${name} easing curve`}>
          {/* the linear reference, so the curve's departure from it is the
              readable quantity */}
          <path
            d="M0 100 L100 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity=".28"
          />
          <path d={d} fill="none" stroke="var(--cs-accent)" strokeWidth="2" />
          {/* control handles */}
          <g stroke="var(--cs-accent)" strokeWidth="1" opacity=".45">
            <line x1="0" y1="100" x2={x1 * 100} y2={100 - y1 * 100} />
            <line x1="100" y1="0" x2={x2 * 100} y2={100 - y2 * 100} />
          </g>
          <g fill="var(--cs-accent)">
            <rect x={x1 * 100 - 2.5} y={100 - y1 * 100 - 2.5} width="5" height="5" />
            <rect x={x2 * 100 - 2.5} y={100 - y2 * 100 - 2.5} width="5" height="5" />
          </g>
        </svg>
      </div>
      <figcaption>
        <b>
          cubic-bezier({p.join(", ")})
        </b>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}

/* |—— 210 days ——| . For the places where a number is the whole argument. */
export function Dim({ children }: { children: ReactNode }) {
  return (
    <div className="dl-dim">
      <b>{children}</b>
    </div>
  );
}

/* Key / value / reason on dashed rules. Replaces the paragraphs whose only
   content was a figure and a justification. */

/* Key / value / reason on dashed rules. Replaces the paragraphs whose only
   content was a figure and a justification. */
export function Spec({
  rows,
}: {
  rows: readonly { k: string; v: string; n: ReactNode }[];
}) {
  return (
    <div className="dl-spec">
      {rows.map((r) => (
        <div key={r.k}>
          <span className="k">{r.k}</span>
          <span className="v">{r.v}</span>
          <span className="n">{r.n}</span>
        </div>
      ))}
    </div>
  );
}

/* The red/green annotation code, translated for a page wearing a client's
   palette. @context/annotation-system.md marks problems red and solutions
   green, which cannot work here — Nair's accent IS red. So the code is
   structural: hatch and strike for the cut, an accent tick for what shipped.
   Same information, no foreign hues. */

/* The red/green annotation code, translated for a page wearing a client's
   palette. @context/annotation-system.md marks problems red and solutions
   green, which cannot work here — Nair's accent IS red. So the code is
   structural: hatch and strike for the cut, an accent tick for what shipped.
   Same information, no foreign hues. */
export function Cuts({
  items,
}: {
  items: readonly { killed: string; why: ReactNode; shipped: ReactNode }[];
}) {
  return (
    <div className="dl-cuts">
      {items.map((it) => (
        <div key={it.killed} className="dl-cut killed">
          <span className="tag killed-tag">Cut</span>
          <h3>{it.killed}</h3>
          <p>{it.why}</p>
          <div className="ship">
            <span className="tag ship-tag">Shipped</span>
            <p>{it.shipped}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── state row ─────────────────────────────────────
   The same component drawn in each state it has. A screenshot can only ever
   catch one of them, and on a control the interesting states are exactly the
   ones a screenshot cannot hold still: hover, focus, selected. Rebuilding is
   what makes them showable. */
export function States({
  children,
  cols,
}: {
  children: ReactNode;
  cols?: number;
}) {
  return (
    <div
      className="bp-states"
      style={cols ? ({ "--cols": cols } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function State({
  name,
  note,
  children,
}: {
  name: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="bp-state">
      <div className="lbl">
        <b>{name}</b>
        {note ? <span>{note}</span> : null}
      </div>
      <div className="well">{children}</div>
    </div>
  );
}

/* A line lifted verbatim out of the client's source, with its path. Used
   where a comment in the build says the thing better than a case study can
   say it about the build. */
export function Source({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  return (
    <figure className="bp-source">
      <pre>{children}</pre>
      <figcaption>{path}</figcaption>
    </figure>
  );
}


/* ══ DIMENSIONED DRAWING ══════════════════════════
   A component with its geometry measured on it: extension lines out to a
   dimension line, arrows, the value in mono. The thing an engineering drawing
   does and a spacing ladder cannot — a ladder lists the values a system owns,
   this shows the values doing their job on one real part.

   Coordinates are specimen pixels, so the specimen has to be rendered at a
   known size; the gutters below hold the dimension lines outside it. */
export type Measure = {
  axis: "x" | "y";
  /* start and end along that axis, in specimen pixels */
  a: number;
  b: number;
  /* where the dimension line sits on the OTHER axis, in specimen pixels.
     Negative places it outside the specimen; > w/h places it past the far
     edge. Extension lines are drawn back to whichever edge is nearer. */
  at: number;
  label: string;
};

/* dimension gutters, px. The right one is wide because both the overall
   height and the radius callout live out there. */
const G = { l: 78, t: 52, r: 92, b: 104 };

export function Drawing({
  w,
  h,
  measures,
  notes,
  children,
}: {
  w: number;
  h: number;
  measures: readonly Measure[];
  /* leader-line callouts: [x, y, dx, dy, text] in specimen px */
  notes?: readonly { x: number; y: number; dx: number; dy: number; text: string }[];
  children: ReactNode;
}) {
  const W = G.l + w + G.r;
  const H = G.t + h + G.b;
  const X = (v: number) => G.l + v;
  const Y = (v: number) => G.t + v;

  return (
    <div className="bp-drawing" style={{ maxWidth: W }}>
      {/* The stage must be border-box at exactly W x H. Offsetting the
          specimen with padding on a content-box element made the stage
          W + G.l wide while the SVG kept a W-wide viewBox, so the whole
          dimension overlay was scaled 1.14x against the part it measures —
          lines landing ~11px off and drifting further toward the right. The
          specimen is positioned instead, so one coordinate system governs
          both. */}
      <div className="stage" style={{ width: W, height: H }}>
        <div className="specimen" style={{ width: w, height: h, left: G.l, top: G.t }}>
          {children}
        </div>

        <svg className="dims" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            <marker
              id="dl-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0.8 L7.4 4 L0 7.2 z" fill="var(--cs-accent)" />
            </marker>
          </defs>

          {measures.map((m, i) => {
            const horiz = m.axis === "x";
            /* the extension runs from the specimen edge the dimension line
               sits beyond, so a measure placed above reaches up to it and one
               placed below reaches down */
            const edge = horiz ? (m.at < 0 ? 0 : h) : m.at < 0 ? 0 : w;
            const outside = horiz ? m.at < 0 || m.at > h : m.at < 0 || m.at > w;
            const x1 = horiz ? X(m.a) : X(m.at);
            const x2 = horiz ? X(m.b) : X(m.at);
            const y1 = horiz ? Y(m.at) : Y(m.a);
            const y2 = horiz ? Y(m.at) : Y(m.b);
            return (
              <g key={i}>
                {outside && (
                  <>
                    <line
                      className="ext"
                      x1={horiz ? X(m.a) : X(edge)}
                      y1={horiz ? Y(edge) : Y(m.a)}
                      x2={horiz ? X(m.a) : X(m.at)}
                      y2={horiz ? Y(m.at) : Y(m.a)}
                    />
                    <line
                      className="ext"
                      x1={horiz ? X(m.b) : X(edge)}
                      y1={horiz ? Y(edge) : Y(m.b)}
                      x2={horiz ? X(m.b) : X(m.at)}
                      y2={horiz ? Y(m.at) : Y(m.b)}
                    />
                  </>
                )}
                <line
                  className="dim"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  markerStart="url(#dl-arrow)"
                  markerEnd="url(#dl-arrow)"
                />
                <text
                  className="val"
                  x={horiz ? (x1 + x2) / 2 : x1}
                  y={horiz ? y1 : (y1 + y2) / 2}
                  dy={horiz ? -6 : 0}
                  dx={horiz ? 0 : m.at > 0 ? 8 : -8}
                  textAnchor={horiz ? "middle" : m.at > 0 ? "start" : "end"}
                  dominantBaseline={horiz ? "auto" : "middle"}
                >
                  {m.label}
                </text>
              </g>
            );
          })}

          {notes?.map((n, i) => (
            <g key={`n${i}`}>
              <line className="lead" x1={X(n.x)} y1={Y(n.y)} x2={X(n.x + n.dx)} y2={Y(n.y + n.dy)} />
              <circle className="pt" cx={X(n.x)} cy={Y(n.y)} r="2.5" />
              <text
                className="note"
                x={X(n.x + n.dx)}
                y={Y(n.y + n.dy)}
                dx={n.dx < 0 ? -6 : 6}
                dy="3.5"
                textAnchor={n.dx < 0 ? "end" : "start"}
              >
                {n.text}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ══ TRACKING PLOT ════════════════════════════════
   Letter-spacing over font size. Written out, the rule is a sentence nobody
   checks; plotted, it is a step, and the step is the finding.

   Two things this went through to get legible. The x axis is CATEGORICAL —
   the sizes the system actually ships, evenly spaced — because a linear axis
   put five points in the first third and left a dead gap between 24 and 40
   where the scale simply has nothing, making a tight rule look like sparse
   data. And there are no reference bands: drawn as dashed rules at the two
   levels, they sat at exactly the same y as the step and swallowed it. The
   step IS the reference, so it carries its own labels.

   The class is .bp-step and not .step: reel.css owns a bare `.step` for the
   reel's scroll sections, set to position:absolute with opacity 0 until they
   scroll in. A bare single-class rule in a global stylesheet reaches into any
   scope, so the path rendered with a correct crimson stroke and a correct
   path and was simply invisible. Second time this bit — see .bp-arc. */
export function TrackPlot({
  points,
  bands,
}: {
  /* size in px and tracking in px, as shipped, in any order */
  points: readonly { size: number; track: number; role: string }[];
  /* the levels, in em, each labelled */
  bands: readonly { em: number; label: string }[];
}) {
  const PW = 560, PH = 178;
  const PAD = { l: 30, r: 26, t: 30, b: 44 };
  /* ascending, whatever order the page declared them in — the type scale is
     written largest-first and an axis labelled "font-size" that counts down
     is just wrong */
  const pts = [...points].sort((a, b) => a.size - b.size);
  const n = pts.length;
  const innerW = PW - PAD.l - PAD.r;
  const cx = (i: number) => PAD.l + ((i + 0.5) * innerW) / n;
  const rows = [...bands].sort((a, b) => b.em - a.em);
  const cy = (e: number) => {
    const idx = rows.findIndex((r) => Math.abs(r.em - e) < 1e-9);
    return PAD.t + 20 + (idx < 0 ? 0 : idx) * 54;
  };
  const em = (p: { size: number; track: number }) =>
    Math.round((p.track / p.size) * 1000) / 1000;

  const flip = pts.findIndex((p, i) => i > 0 && em(p) !== em(pts[i - 1]));
  const xm = flip > 0 ? (cx(flip - 1) + cx(flip)) / 2 : cx(0);
  const yA = cy(em(pts[0]));
  const yB = cy(em(pts[n - 1]));
  const axis = PH - PAD.b;

  return (
    <div className="bp-plot">
      <svg viewBox={`0 0 ${PW} ${PH}`} role="img" aria-label="Letter-spacing against font size">
        {pts.map((p, i) => (
          <line key={`d${p.role}`} className="drop" x1={cx(i)} y1={cy(em(p))} x2={cx(i)} y2={axis} />
        ))}

        <path className="bp-step" d={`M ${cx(0)} ${yA} L ${xm} ${yA} L ${xm} ${yB} L ${cx(n - 1)} ${yB}`} />

        {/* the level labels ride the step, each above the run it names */}
        <text className="lvl" x={cx(0)} y={yA} dy="-13">
          {rows.find((r) => Math.abs(r.em - em(pts[0])) < 1e-9)?.label}
        </text>
        <text className="lvl" x={cx(n - 1)} y={yB} dy="-13" textAnchor="end">
          {rows.find((r) => Math.abs(r.em - em(pts[n - 1])) < 1e-9)?.label}
        </text>

        {pts.map((p, i) => (
          <g key={p.role}>
            <rect className="pt" x={cx(i) - 3.5} y={cy(em(p)) - 3.5} width="7" height="7" />
            <text className="ptlbl" x={cx(i)} y={axis} dy="16" textAnchor="middle">
              {p.size}
            </text>
          </g>
        ))}

        <line className="axis" x1={PAD.l} y1={axis} x2={PW - PAD.r} y2={axis} />
        <text className="axlbl" x={PAD.l} y={axis} dy="31" textAnchor="start">
          font-size, as shipped
        </text>
        <line className="flipline" x1={xm} y1={PAD.t - 2} x2={xm} y2={axis} />
        <text className="flip" x={xm} y={PAD.t} dy="-6" textAnchor="middle">
          changeover
        </text>
      </svg>
    </div>
  );
}


/* ══ GAMUT ════════════════════════════════════════
   Where a type scale actually lives, on a log axis. Bands are the ranges the
   build occupies; the space between them is the finding. A ladder lists what
   a system has — this shows what it deliberately does not, which on a site
   with no photography is the thing doing a photograph's job.

   Each band gets its OWN ROW. Drawn on one line they merged: the ranges
   overlap (24-48 under 40-72 under a fixed 64), so a single track read as one
   continuous bar and the labels piled up on each other. Stacked, the empty
   span becomes a vertical corridor running through every row, which is the
   whole point of the drawing. */
export function Gamut({
  min,
  max,
  bands,
  gap,
  ticks,
}: {
  min: number;
  max: number;
  /* occupied ranges, in px. a === b renders a single fixed size */
  bands: readonly { a: number; b: number; label: string }[];
  /* the empty span worth naming */
  gap?: { a: number; b: number; label: string };
  ticks: readonly number[];
}) {
  /* the left gutter holds every row label. Placing them beside their bars
     put the first one straight through the empty corridor — the one place on
     the drawing that has to stay clear. */
  const PAD = { l: 134, r: 26, t: 36, b: 40 };
  const PITCH = 17, BAR = 9;
  const PW = 560;
  const PH = PAD.t + bands.length * PITCH + PAD.b;
  const innerW = PW - PAD.l - PAD.r;
  /* log, because a linear axis from 9 to 180 crushes the whole micro band
     into the first 4% and the gap stops being visible at all */
  const lo = Math.log(min), hi = Math.log(max);
  const x = (v: number) => PAD.l + ((Math.log(v) - lo) / (hi - lo)) * innerW;
  const axis = PH - PAD.b;

  return (
    <div className="bp-gamut">
      <svg viewBox={`0 0 ${PW} ${PH}`} role="img" aria-label="Type scale coverage">
        {gap ? (
          <>
            <rect
              className="gap"
              x={x(gap.a)}
              y={PAD.t - 12}
              width={x(gap.b) - x(gap.a)}
              height={axis - PAD.t + 12}
            />
            <text className="gaplbl" x={(x(gap.a) + x(gap.b)) / 2} y={PAD.t - 18} textAnchor="middle">
              {gap.label}
            </text>
          </>
        ) : null}

        {bands.map((b, i) => {
          const y = PAD.t + i * PITCH;
          return (
            <g key={b.label}>
              {/* a hairline from the label to the bar, so a short range at the
                  far right still reads as belonging to its own row */}
              <line className="lead" x1={PAD.l - 4} y1={y + BAR / 2} x2={x(b.a)} y2={y + BAR / 2} />
              <rect
                className="band"
                x={x(b.a)}
                y={y}
                width={Math.max(3, x(b.b) - x(b.a))}
                height={BAR}
              />
              <text className="bandlbl" x={PAD.l - 12} y={y + BAR - 1} textAnchor="end">
                {b.label}
              </text>
            </g>
          );
        })}

        <line className="axis" x1={PAD.l} y1={axis} x2={PW - PAD.r} y2={axis} />
        {ticks.map((t) => (
          <g key={t}>
            <line className="tick" x1={x(t)} y1={axis} x2={x(t)} y2={axis + 5} />
            <text className="ticklbl" x={x(t)} y={axis} dy="17" textAnchor="middle">
              {t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}


/* ══ PROBE ════════════════════════════════════════
   How a number on this page was actually found.

   Every figure in a case study is a claim, and a reader has no way to tell a
   measured one from a remembered one. This shows the command and its output,
   so the finding can be re-run. It is also the honest record of the method:
   most of what is interesting about a client's system is not visible in the
   design, it is visible in a count.

   Pairs are zipped, so a probe with two commands shows each output under its
   own command. Stacking all the commands and then all the outputs left the
   reader matching them up by position. */
export function Probe({
  cmd,
  out,
  children,
}: {
  cmd: string | readonly string[];
  out: string | readonly string[];
  /* what it meant. The reading is the part that is ours. */
  children: ReactNode;
}) {
  const cmds = Array.isArray(cmd) ? cmd : [cmd as string];
  const outs = Array.isArray(out) ? out : [out as string];
  return (
    <figure className="bp-probe">
      <pre>
        {cmds.map((c, i) => (
          <span key={i} className="ln">
            <span className="p">$ </span>
            {c}
            {"\n"}
            <span className="o">{outs[i] ?? ""}</span>
            {i < cmds.length - 1 ? "\n\n" : ""}
          </span>
        ))}
      </pre>
      <figcaption>{children}</figcaption>
    </figure>
  );
}
