/* Uuye's artwork, re-run from the client's own constants. The hero field and
 * the gate are the same five lines of maths with different tunings, and
 * there is no randomness in it, so it comes out identical to the live site:
 *   r  = ((i + 1) / rings) * maxR
 *   ry = r * (ryBase + sin((i + 1) * ryFreq) * ryAmp)
 *   o  = opBase + ((i + 1) / rings) * opAmp
 * The sine on ry is the whole trick — each ring takes a different flatness,
 * so they cross, and the crossings read as interference, not a bullseye. */

const INK = "#0A0A0A";
const PAPER = "#F0EDE8";

type Tuning = {
  rings: number;
  maxR: number;
  ryBase: number;
  ryAmp: number;
  ryFreq: number;
  opBase: number;
  opAmp: number;
  strokeW: number;
  stroke: string;
  ground: string;
  box: number;
};

const HERO: Tuning = {
  rings: 35, maxR: 380, ryBase: 0.55, ryAmp: 0.2, ryFreq: 0.7,
  opBase: 0.08, opAmp: 0.14, strokeW: 1.2, stroke: INK, ground: PAPER, box: 800,
};
const GATE: Tuning = {
  rings: 25, maxR: 280, ryBase: 0.5, ryAmp: 0.2, ryFreq: 0.8,
  opBase: 0.15, opAmp: 0.2, strokeW: 1, stroke: PAPER, ground: INK, box: 600,
};

function Field({ t }: { t: Tuning }) {
  const c = t.box / 2;
  return (
    <svg
      viewBox={`0 0 ${t.box} ${t.box}`}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto", background: t.ground }}
    >
      {Array.from({ length: t.rings }, (_, i) => {
        const n = i + 1;
        const r = (n / t.rings) * t.maxR;
        return (
          <ellipse
            key={i}
            cx={c}
            cy={c}
            rx={r}
            ry={r * (t.ryBase + Math.sin(n * t.ryFreq) * t.ryAmp)}
            stroke={t.stroke}
            strokeWidth={t.strokeW}
            opacity={t.opBase + (n / t.rings) * t.opAmp}
          />
        );
      })}
    </svg>
  );
}

/* the catalogue's field and the gate's, side by side — one function, two moods */
export function RingFields() {
  return (
    <div className="sc-pair" style={{ marginTop: 0 }}>
      <Field t={HERO} />
      <Field t={GATE} />
    </div>
  );
}
