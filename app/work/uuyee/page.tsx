import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uuye — Case Study",
  description:
    "A portfolio for Mongolia's top jazz guitarist built with zero photographs. The identity is two SVG generators, one 3px rule and a type scale with a deliberate hole in it, rebuilt here at 1:1.",
  openGraph: {
    title: "Uuye — 910 Case Study",
    description:
      "No photographs. One generator, two tunings, and a scale that skips everything between 15px and 24px.",
  },
};

import { CaseStudy, Meta, Section, Stats, Tail } from "@/components/case-study/shell";
import {
  Cuts,
  Drawing,
  Gamut,
  Paper,
  Part,
  Probe,
  Parts,
  Ramp,
  Sheet,
  Source,
  Spec,
  State,
  States,
} from "@/components/case-study/drafting";
import "./replica.css";
import { ShareStory } from "@/components/case-study/share-story";

/* ── the client's own values ───────────────────────
   Read out of uuyee-portfolio/src rather than remembered. The ring fields
   below are not pictures of the client's artwork: they are the client's
   generator, re-run here, so they come out identical because the maths has
   no randomness in it. */
const INK = "#0A0A0A";
const PAPER = "#F0EDE8";

const MONO_RAMP = [
  { val: "#F0EDE8", pct: "--bg", use: "Paper. The ground the catalogue prints on" },
  { val: "#E6E2DC", pct: "--surface", use: "Surface" },
  { val: "#DBD6CF", pct: "--surface-elevated", use: "Elevated" },
  { val: "#B8B4AE", pct: "--muted-light", use: "Muted light" },
  { val: "#999690", pct: "--muted", use: "Muted" },
  { val: "#0A0A0A", pct: "--fg", use: "Ink. Also --stage-black, under a second name" },
] as const;

const SUNSET_RAMP = [
  { val: "#F5E6D3", pct: "--afterglow", use: "Afterglow. The warm zone's paper" },
  { val: "#D4A024", pct: "--amber", use: "Amber" },
  { val: "#FF6130", pct: "--fire-hover", use: "Fire hover" },
  { val: "#FF480F", pct: "--fire", use: "Fire. The one saturated colour in the build" },
  { val: "#8A7E72", pct: "--warm-muted", use: "Warm muted" },
  { val: "#2A2018", pct: "--warm-elevated", use: "Warm elevated" },
  { val: "#1A1410", pct: "--warm-surface", use: "Warm surface" },
] as const;

/* ── the generator ─────────────────────────────────
   Five lines, shared by the hero figure and the gate. The only difference
   between the two fields on the page is this parameter block. */
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
  c: number;
  box: number;
};

const HERO: Tuning = {
  rings: 35, maxR: 380, ryBase: 0.55, ryAmp: 0.2, ryFreq: 0.7,
  opBase: 0.08, opAmp: 0.14, strokeW: 1.2, stroke: INK, c: 400, box: 800,
};
const GATE: Tuning = {
  rings: 25, maxR: 280, ryBase: 0.5, ryAmp: 0.2, ryFreq: 0.8,
  opBase: 0.15, opAmp: 0.2, strokeW: 1, stroke: PAPER, c: 300, box: 600,
};

function Rings({ t }: { t: Tuning }) {
  /* the client's loop, verbatim:
       r  = ((i + 1) / rings) * maxR
       ry = r * (ryBase + sin((i + 1) * ryFreq) * ryAmp)
       o  = opBase + ((i + 1) / rings) * opAmp                          */
  return (
    <svg viewBox={`0 0 ${t.box} ${t.box}`} fill="none" aria-hidden="true">
      {Array.from({ length: t.rings }, (_, i) => {
        const n = i + 1;
        const r = (n / t.rings) * t.maxR;
        const ry = r * (t.ryBase + Math.sin(n * t.ryFreq) * t.ryAmp);
        const o = t.opBase + (n / t.rings) * t.opAmp;
        return (
          <ellipse
            key={i}
            cx={t.c}
            cy={t.c}
            rx={r}
            ry={ry}
            stroke={t.stroke}
            strokeWidth={t.strokeW}
            opacity={o}
          />
        );
      })}
    </svg>
  );
}

const TUNING_ROWS = [
  { k: "Rings", v: "35 / 25", n: "The hero sits behind a wordmark and can afford density. The gate has to stay readable through a form." },
  { k: "Max radius", v: "380 / 280", n: "In a 800 and a 600 box respectively, so both fields fill the same fraction of their frame." },
  { k: "ry factor", v: "0.55 / 0.50", n: "How flat the ellipses are before the wave is applied. The gate reads slightly wider." },
  { k: "Wave", v: "sin(n · 0.7) / sin(n · 0.8)", n: "The whole shape. Stepping the frequency changes where the rings bunch and where they open out." },
  { k: "Opacity", v: "0.08→0.22 / 0.15→0.35", n: "The hero has to sit under type at low contrast. The gate is the subject, so it starts brighter." },
  { k: "Stroke", v: "1.2 / 1.0", n: "Hairlines both, on a black or a paper ground." },
] as const;

const CUTS = [
  {
    killed: "Stock photography",
    why: "No press shots existed and nothing was licensable. The default move is a generic photo of somebody else's guitar, which says nothing about this player.",
    shipped: "Zero images. The build ships not one <img> tag; every mark on the page is type, a rule, or generated SVG.",
  },
  {
    killed: "A logo",
    why: "A mark would have had to compete with a wordmark set at up to 180px, and lose.",
    shipped: "The name, at clamp(80px, 14vw, 180px). On a phone it is the entire first screen.",
  },
  {
    killed: "A fade on the nav",
    why: "Every hover on the site was going to get a transition because that is the default.",
    shipped: "transition: none on hover-invert. The link snaps between states like a switch, which suits a musician better than a dissolve.",
  },
  {
    killed: "A modal for a wrong code",
    why: "The obvious failure state is a dialog or an error page, which takes you out of the thing you were looking at.",
    shipped: "The field shakes for 1.2 seconds and resets. The failure is a physical reaction in the object itself.",
  },
] as const;

const OUTCOMES = [
  { num: "0", label: "Images shipped", desc: "Not one <img> tag in the build. The only raster in the repo is the social card, which never appears on the page." },
  { num: "2", label: "Tunings, one generator", desc: "The hero figure and the gate come out of the same five lines of maths with different constants." },
  { num: "23", label: "Borders, all 3px", desc: "Held by hand rather than by a token, which is the one thing on this build we would go back and change." },
];

export default function UuyeeCaseStudy() {
  return (
    <CaseStudy slug="uuyee">
      <p className="cs-eyebrow">Case study / Uuye, guitarist</p>
      <h1>
        No photographs. The identity is <i>sixty lines of maths</i>
      </h1>
      <p className="cs-lede">
        Uitumen Bold plays jazz and soul, at home and abroad, and arrived with no
        press kit, no photography, no mark and no prior site. There are no
        screenshots below either. The two ring generators are re-run here from the
        client&apos;s own constants, the scale is drawn with the hole in it, and
        every number comes with the command that found it.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Uitumen Bold (Uuye)" />
        <Meta label="executor" value="910studio (solo)" />
        <Meta label="scope" value="Design, Frontend, Deploy" />
        <Meta label="live" value="uuyee-portfolio.vercel.app" live />
      </div>

      <ShareStory slug="uuyee" title="Uuye — a 910studio case study" />

      <Section num="01" label="The Brief" title="A working musician with nothing to put in a portfolio">
        <p>
          The usual answer to no assets is stock imagery, and the usual result is a
          site about guitars rather than about a player. We took the opposite
          position: if there are no images, stop pretending there are. Build it from
          type, rules and geometry, and let the absence read as the decision it is.
        </p>
        <p>
          That only works if the geometry is good enough to carry a whole identity.
          Everything below is the answer to whether it was.
        </p>
      </Section>

      <Sheet n="02" label="The Generator" src="WavePattern.svelte + Gate.svelte">
        <p>
          The two pieces of artwork on the site are the same five lines of maths run
          twice. Both fields below are drawn here, now, from the client&apos;s own
          constants. They are not screenshots and they contain no randomness, which
          is exactly why they can be reproduced.
        </p>

        <div className="replica uu">
          <States cols={2}>
            <State name="Hero field" note="35 rings · paper ground · under the wordmark">
              <div className="uu-field uu-field--mono">
                <Rings t={HERO} />
              </div>
            </State>
            <State name="Gate field" note="25 rings · ink ground · behind the lock">
              <div className="uu-field uu-field--gate">
                <Rings t={GATE} />
              </div>
            </State>
          </States>
        </div>

        <Probe
          cmd={`grep -A3 'Math.sin' WavePattern.svelte Gate.svelte`}
          out={`WavePattern:  r * (0.55 + Math.sin((i + 1) * 0.7) * 0.2)\nGate:         r * (0.50 + Math.sin(i * 0.8) * 0.2)`}
        >
          The two pieces of artwork on the site were built four days apart and
          were never meant to be related. Reading them side by side to redraw
          them here showed they are <b>the same function</b>, differing by two
          constants. Neither file references the other and neither comment says
          so.
        </Probe>

        <Source path="src/lib/components/WavePattern.svelte">
          {`const r  = ((i + 1) / rings) * maxR;
const ry = r * (0.55 + Math.sin((i + 1) * 0.7) * 0.2);
const opacity = 0.08 + ((i + 1) / rings) * 0.14;`}
        </Source>

        <p>
          The sine on the vertical radius is the whole trick. Without it the rings
          are concentric ellipses and the figure reads as a target. With it each ring
          takes a different flatness, so they cross, and the crossings are what make
          it read as interference rather than as a bullseye.
        </p>

        <Spec rows={TUNING_ROWS} />

        <p className="cs-note">
          The hero also breathes: scale steps by 0.00015 a frame between 0.97 and
          1.03, which at 60fps is a full cycle of roughly thirteen seconds. Slow
          enough that you do not catch it moving, only notice that it has.
        </p>
      </Sheet>

      <Sheet n="03" label="The Gap" src="every size in the build">
        <p>
          With no photograph to carry contrast, the type has to do it. So the scale
          has a hole in it: a micro band for everything a specification sheet says,
          a display band for the name, and nothing at all in between.
        </p>

        <Paper
          cap={
            <>
              <b>Nothing renders between 15px and 24px.</b> The micro band is seven
              fixed sizes from 9 to 15, used thirty-one times, and it carries every
              label, credit and section number on the site. The display band is four
              fluid clamps and one fixed 64. A reader never meets a middle size, so
              there is no comfortable middle register for the eye to settle in, which
              is the job a photograph would otherwise have done.
            </>
          }
        >
          <Gamut
            min={8}
            max={200}
            bands={[
              { a: 9, b: 15, label: "micro · 31 uses" },
              { a: 24, b: 48, label: "section" },
              { a: 40, b: 72, label: "feature" },
              { a: 64, b: 64, label: "fixed" },
              { a: 80, b: 180, label: "wordmark" },
            ]}
            gap={{ a: 16, b: 23, label: "empty" }}
            ticks={[9, 12, 15, 24, 40, 64, 100, 180]}
          />
        </Paper>

        <Probe
          cmd={`grep -rhoE 'text-\\[[0-9]+px\\]|clamp\\([0-9]+px' src | sort -u -t'[' -k2 -n`}
          out={`9  10  11  12  13  14  15   ·   24  28  40  64  80`}
        >
          Listing every size in the build to draw the scale is what exposed the
          hole. Nothing renders between <b>15px and 24px</b>. It was not a stated
          rule and it is not written down anywhere; it is what happens when a
          site has no photograph and the type has to supply all the contrast on
          its own.
        </Probe>

        <p className="cs-note">
          Where Nair&apos;s tracking resolves to two values and one changeover, this
          one does not resolve at all: eight distinct tracking values across a six
          pixel band, from 0.08em to 0.35em, chosen by eye per line. On a one-page
          portfolio that is defensible. It is still the thing that would have to be
          settled before the system could grow.
        </p>
      </Sheet>

      <Sheet n="04" label="Ink" src="src/app.css :root">
        <p>
          Two palettes, thirteen tokens. Mono Signal is the catalogue; Burning Sunset
          is the performance zone. Read the two ramps as what they are: not a light
          and dark version of one thing, but two separate sets that happen to sit on
          the same page.
        </p>
        <Paper
          cap={
            <>
              <b>They are not the same tokens.</b> The case study for this project
              used to say each mode maps onto shared names so a component never knows
              which one it is in. It does not. <code>--bg</code> is declared once and
              never redefined; the warm set lives beside it as <code>--fire</code>,{" "}
              <code>--warm-surface</code>, <code>--afterglow</code>, and the
              performance zone paints itself with them explicitly. What actually
              carries across the hinge is the geometry, not the tokens.
            </>
          }
        >
          <Ramp steps={MONO_RAMP} />
          <div style={{ height: 22 }} />
          <Ramp steps={SUNSET_RAMP} />
        </Paper>

        <div className="replica uu">
          <States cols={2}>
            <State name="Mono Signal" note="the catalogue — :root">
              <div className="uu-ground uu-ground--mono">
                <b>01 / Discography</b>
                <span>Dates, track counts, credits. Set like a specification sheet.</span>
                <code>#F0EDE8 / #0A0A0A</code>
                <span className="uu-chip uu-chip--mono">Mono signal</span>
              </div>
            </State>
            <State name="Burning Sunset" note="the performance zone — painted inline">
              <div className="uu-ground uu-ground--sunset">
                <b>04 / Performances</b>
                <span>Same grid, same measurements, temperature inverted.</span>
                <code>#1A1410 / #FF480F</code>
                <span className="uu-chip">Burning sunset active</span>
              </div>
            </State>
          </States>
        </div>
      </Sheet>

      <Sheet n="05" label="The Rule" src="23 borders, one width">
        <p>
          Every divider, frame, button and section rule on the site is 3px. That
          consistency is real and it is most of why the page reads as drawn rather
          than styled. It is also, on inspection, held entirely by hand.
        </p>

        <div className="replica uu">
          <Drawing
            w={320}
            h={96}
            measures={[
              { axis: "x", a: 0, b: 320, at: -22, label: "320" },
              { axis: "y", a: 0, b: 96, at: 340, label: "96" },
              { axis: "x", a: 3, b: 23, at: 118, label: "20" },
            ]}
            notes={[
              /* the 3 gets a leader, not a dimension. Two arrowheads do not
                 fit inside a three pixel span — drawn as one it came out an
                 illegible smudge, which is why real drawings lead small
                 features out instead of measuring them in place. */
              { x: 0, y: 70, dx: 70, dy: 54, text: "3px border ×23" },
              /* down-RIGHT into the right gutter. Both leaders aimed into the
                 bottom gutter and their labels landed eight pixels apart. */
              { x: 320, y: 96, dx: 26, dy: 34, text: "no radius" },
            ]}
          >
            <div
              className="uu-rule"
              style={{ width: 320, height: 96, boxSizing: "border-box" }}
            >
              <span
                className="uu-display"
                style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" }}
              >
                02 / Discography
              </span>
            </div>
          </Drawing>
        </div>

        <Probe
          cmd={[
            `grep -ro 'var(--border-w)' src | wc -l`,
            `grep -rEo 'border[a-z-]*: ?3px' src | wc -l`,
          ]}
          out={["0", "23"]}
        >
          We went looking for the token to quote it accurately on this sheet and
          found that <b>nothing reads it</b>. Twenty-three borders agree on 3px
          because one person wrote all of them in one week, which is a different
          thing from a system and worth saying out loud.
        </Probe>

        <p className="bp-cap">
          <b>Cheap to fix, and worth fixing.</b> The value is already correct in
          all twenty-three places, so wiring the token up is a search and replace
          that changes nothing visually and makes the next change possible. Right
          now the site has one border width because one person remembered it;
          afterwards it would have one because the code says so.
        </p>

      </Sheet>

      <Sheet n="06" label="The Zone" src="stores/mode.svelte.ts">
        <p>
          The warm half is not a theme. It is one section that paints itself, plus a
          three-line store that lets the persistent chrome follow it across the
          hinge.
        </p>
        <Probe
          cmd={[
            `grep -rn -- '--bg:' src | wc -l`,
            `grep -rn 'data-mode' src | grep -v stores/ | wc -l`,
          ]}
          out={["1", "0"]}
        >
          The previous version of this case study said both modes map onto shared
          token names so a component never knows which one it is in. Checking it
          to write the sheet showed <b>--bg is declared once and never
          redefined</b>, and that the <code>data-mode</code> attribute the store
          stamps on the document is read by nothing. What actually carries across
          the hinge is the geometry.
        </Probe>

        <Spec
          rows={[
            { k: "Trigger", v: "scroll, 200px", n: "PerformanceZone measures its own rect against a 200px line and calls setMode as it crosses." },
            { k: "Followers", v: "3", n: "Nav, LeftRail and ScrollProgress read getMode() and invert. Everything else is unaware the mode exists." },
            { k: "Transition", v: "600ms ease", n: "Background, colour and border only. No layout property is animated, so the hinge cannot cause a reflow mid-scroll." },
            { k: "data-mode", v: "written, unread", n: "The store also stamps data-mode on <html>. Nothing in the build selects on it — a second dead mechanism, and the one to reach for if the warm zone ever needs to be a real theme." },
          ]}
        />

      </Sheet>

      <Sheet n="07" label="The Gate" src="Gate.svelte">
        <p>
          Unreleased work needed somewhere neither public nor private. The
          discography lists it by title, year and track count and marks it locked, so
          the record&apos;s existence is part of the story while the record stays
          shut. Uuye hands the codes out himself.
        </p>
        <Spec
          rows={[
            { k: "Correct", v: "600ms", n: "The ring field collapses, then the form is removed from the flow. The artwork reacts before the layout does." },
            { k: "Wrong", v: "1200ms", n: "A four-step shake at ±6px and ±4px, then the message clears itself. No modal, no error route." },
            { k: "Codes", v: "3", n: "Held in the component, not on a server. This gate is a curtain, not a security boundary, and pretending otherwise would have cost a backend." },
          ]}
        />
      </Sheet>

      <Sheet n="08" label="Parts" src="rebuilt from src, not captured">
        <p>
          The interactive pieces, rebuilt at 1:1. Uuye has no radii at all: every
          corner in the build is square, which is unusual enough to be worth showing
          rather than saying.
        </p>
        <div className="replica uu">
          <Parts>
            <Part name="Nav / rest" spec="10px · 700 · +0.2em" note="Space Grotesk">
              <span className="uu-nav">Discography</span>
            </Part>
            <Part name="Nav / hover" spec="invert" note="transition: none">
              <span className="uu-nav" data-state="hover">
                Discography
              </span>
            </Part>
            <Part name="Mode chip" spec="10px · 700 · +0.15em" note="fire on ink">
              <span className="uu-chip">Burning sunset active</span>
            </Part>
          </Parts>
        </div>
        <p className="cs-note">
          The nav is the one interaction with <code>transition: none</code> set
          explicitly. Everything on a page fades by default now, and a link that
          snaps instead reads as a switch being thrown, which is the right gesture
          for a site about a person who plays live.
        </p>
      </Sheet>

      <Sheet n="09" label="What We Cut" src="four defaults, refused">
        <p>Each of these is the obvious move, declined.</p>
        <Cuts items={CUTS} />
      </Sheet>

      <Section num="10" label="Outcome" title="A portfolio for a man who arrived with nothing to put in one">
        <p>
          Catalogue, listening corner, contact routes, and a live site that credits
          the studio in its own footer. Built out of a typeface, a three pixel rule
          and a sine wave, because that was the material available and pretending
          otherwise would have made it look like everybody else&apos;s.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
