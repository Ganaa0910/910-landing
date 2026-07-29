import { TransitionLink } from "@/components/nav/page-shell";
import { BrandMark } from "./brand-mark";

const STEPS = [
  { n: "01", title: "Listen", body: "Understand the problem before touching code.", star: "Denebola · β Leonis", side: "right" },
  { n: "02", title: "Design", body: "Systems first, screens second.", star: "Spica · α Virginis", side: "bottom" },
  { n: "03", title: "Build", body: "Ship fast, iterate faster.", star: "Arcturus · α Boötis", side: "left" },
  { n: "04", title: "Refine", body: "Obsess over the details until it feels right.", star: "Cor Caroli · α² Can. Ven.", side: "top" },
] as const;

/* The reel's DOM. The canvas it draws on lives in the root layout so it can
   survive navigation — see components/reel/reel-canvas.tsx. */
export function Reel() {
  return (
    <div className="reel" data-reel="">
      <div className="viewport" data-viewport="">
        <div className="probe" data-probe="" />

        {/* S3 ground: paper flips to brand ink */}
        <div className="s3-bg" />

        {/* S3: the four steps. Around the diamond on desktop, one swapping
            block at the foot on phones. */}
        <div className="rail-track" data-rail-track="">
          {STEPS.map((s) => (
            <div className={`step ${s.side}`} data-step="" key={s.n}>
              <p className="n">{s.n}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="star">{s.star}</span>
            </div>
          ))}
          <div className="here" data-here="">
            You are here
          </div>
        </div>

        <p className="s3-label">How we work</p>

        <div className="s3-chart">
          <b>The Great Diamond of Virgo</b>
          <span className="detail">
            Asterism · northern spring sky
            <br />
            α Boötis · α Virginis · β Leonis · α² Canum Venaticorum
            <br />
            Centre RA 13<sup>h</sup>05<sup>m</sup> · Dec +15°43′ · epoch J2000
          </span>
        </div>

        {/* S1 backdrop mark */}
        <BrandMark className="brand" />

        {/* phones set the motto flat; the arc auto-fits too small to be a
            headline at that width */}
        <p className="motto-flat" aria-hidden="true">
          {/* inner span carries the entry cue so the outer element keeps
              its scroll-driven opacity */}
          <span>
            We build the things that <i>matter.</i>
          </span>
        </p>

        <div className="anchor">
          <h1 aria-label="We build the things that matter.">
            <svg className="arc" viewBox="0 0 140 72" aria-hidden="true">
              <defs>
                <path id="arcPath" data-arc-path="" fill="none" />
              </defs>
              <text data-arc-text="" textAnchor="middle">
                <textPath href="#arcPath" startOffset="50%">
                  We build the things that <tspan fill="#2660E8">matter.</tspan>
                </textPath>
              </text>
              {/* hidden twin: getComputedTextLength() returns 0 on a <text>
                  whose content lives entirely inside a <textPath> */}
              <text data-arc-measure="" x={0} y={0} fontSize={1} visibility="hidden">
                We build the things that matter.
              </text>
            </svg>
          </h1>
        </div>

        {/* S2 */}
        <div className="s2">
          <p className="coord">47.92°N &nbsp;106.92°E &nbsp;· &nbsp;UTC+8</p>
          <h2>
            Based in Ulaanbaatar.
            <br />
            Building for everywhere.
          </h2>
          <p>
            A small studio working across design systems, platforms and creative
            development — for a bronze sculptor&rsquo;s archive, for Mongolia&rsquo;s
            first AI-native capital markets platform, and for teams who needed the
            thing built properly the first time.
          </p>
          <div className="stats">
            <div>
              <b>2024</b>established
            </div>
            <div>
              <b>3 days</b>typical first build
            </div>
            <div>
              <b>Global</b>remote-first
            </div>
          </div>
          <TransitionLink className="cta" href="/work">
            View works →
          </TransitionLink>
        </div>

      </div>

      {/* S4 sits OUTSIDE the sticky viewport, and that placement is load
          bearing. `position: sticky` opens a stacking context even at
          z-index auto, so everything inside .viewport is sealed into one box
          that the canvas — a root-level sibling at z-index 3 — paints
          straight over. Harmless for S1–S3, where the canvas is transparent
          around the copy. Fatal here, where it fills the frame with an
          opaque sunset and takes the headline and the CTA with it.

          Out here it is a plain fixed layer in the root stacking context, so
          its z-index actually counts. Fixed rather than absolute because the
          sticky viewport was the only thing pinning it to the screen. */}
      <div className="s4">
        <div className="s4-inner">
          <p className="eyebrow4 lyr-back">Contact</p>
          <h2 className="lyr-mid">
            Let&rsquo;s create
            <br />
            something beautiful.
          </h2>
          <div className="lyr-front">
            {/* no mailto here on purpose — /contact is the path that
                actually works (form → /api/inquiry → Resend) */}
            <p className="meta4">
              Reply within 24 hours · Ulaanbaatar, UTC+8
              <br />
              Accepting projects — Q3 2026
            </p>
            <TransitionLink className="cta" href="/contact">
              Start a project →
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
