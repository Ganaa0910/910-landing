import Image from "next/image";
import {
  CaseStudy,
  Meta,
  Quote,
  Section,
  Stats,
  Swatches,
  Table,
  Tail,
} from "@/components/case-study/shell";

const IMG = "/demos/uuyee/assets";

const MONO = [
  { name: "Paper", val: "#F0EDE8" },
  { name: "Ink", val: "#0A0A0A" },
  { name: "Surface", val: "#E6E2DC" },
  { name: "Elevated", val: "#DBD6CF" },
  { name: "Muted", val: "#999690" },
];

const SUNSET = [
  { name: "Fire", val: "#FF480F" },
  { name: "Fire Hover", val: "#FF6130" },
  { name: "Amber", val: "#D4A024" },
  { name: "Afterglow", val: "#F5E6D3" },
  { name: "Warm Surface", val: "#1A1410" },
  { name: "Warm Elevated", val: "#2A2018" },
];

const TYPE = [
  ["Display", "Space Grotesk 700", "Headlines and every interactive label. Set tight, always uppercase."],
  ["Body", "Space Mono 400", "Copy, metadata and construction marks. Monospace keeps the grid visible."],
  ["Accent", "Anton", "Reserved for the moments that need to shout louder than the grid."],
] as const;

const COMPONENTS = [
  { name: "WavePattern", detail: "The hero's interference figure — overlapping ellipses drawn as SVG, not an image. It scales to any viewport without a second asset." },
  { name: "ModeTransitionStrip", detail: "The hinge between the two halves of the site. Takes a direction so the same component works going in and coming out." },
  { name: "PerformanceZone", detail: "The warm zone. Same grid, inverted temperature — this is where the site stops being a document and starts being a stage." },
  { name: "Gate", detail: "The password-gated listening corner. Generates 25 concentric ellipses on mount, collapses them on a correct code." },
  { name: "WaveformBars", detail: "Audio-bar motif used as a rhythm device between sections." },
  { name: "ScrollProgress", detail: "A hairline progress rule — the only piece of persistent chrome on a single-page site." },
  { name: "LeftRail", detail: "The fixed vertical marker that keeps the 12-column grid legible while you scroll." },
  { name: "Nav", detail: "Four anchors, hover-invert, no transition — it snaps, like a switch rather than a fade." },
];

const STACK = [
  ["Framework", "SvelteKit", "One page, eight components. A guitarist's site should not ship an app framework's runtime."],
  ["Runtime", "Svelte 5 runes", "$state drives the gate's unlock, shake and collapse states with no store boilerplate."],
  ["Styling", "Tailwind v4", "@theme inline maps the two modes onto the same token names, so one class set serves both."],
  ["Borders", "--border-w: 3px", "A single token. Every rule, frame and button on the site reads from it."],
  ["Texture", "SVG feTurbulence", "Film grain generated in CSS as a data URI — no image request, no repeating tile seam."],
  ["Deploy", "Vercel", "Static output, edge delivered."],
] as const;

const OUTCOMES = [
  { num: "2", label: "Modes, one grid", desc: "Mono Signal and Burning Sunset share every measurement — only temperature changes." },
  { num: "8", label: "Components", desc: "Each one earns its place; the hero figure and the gate waves are drawn, not downloaded." },
  { num: "0", label: "Stock photography", desc: "No press shots existed. The entire visual system is typography, rules and generated SVG." },
];

export default function UuyeeCaseStudy() {
  return (
    <CaseStudy slug="uuyee">
      <p className="cs-eyebrow">Case study / Uuye, guitarist</p>
      <h1>
        A portfolio that <i>changes temperature</i> when the music starts
      </h1>
      <p className="cs-lede">
        Uitumen Bold — Uuye — is Mongolia&apos;s top jazz guitarist, and had no press
        kit, no photography and no brand. 910studio built him a site out of the only
        materials available: typography, a 3px rule and generated geometry. Then split it
        in two, so the page runs cold like a specification sheet until you reach the
        performance section, where it catches fire.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Uitumen Bold (Uuye)" />
        <Meta label="executor" value="910studio (solo)" />
        <Meta label="scope" value="Design, Frontend, Deploy" />
        <Meta label="stack" value="SvelteKit / Svelte 5 / Tailwind v4 / Vercel" />
        <Meta label="live" value="uuyee-portfolio.vercel.app" live />
      </div>

      <div className="cs-bleed">
        <Image src={`${IMG}/hero.png`} alt="Uuye portfolio hero — the wordmark set against a generated interference pattern" width={1600} height={900} priority />
        <div className="cs-cap">
          <span>The hero: type on the left, generated interference figure on the right, one 3px rule between them</span>
          <b>Live</b>
        </div>
      </div>

      <Section num="01" label="The Brief" title="A musician with a career and no assets">
        <p>
          Jazz and soul, based in Ulaanbaatar, playing bars at home and stages abroad.
          What did not exist: photography we could licence, a logo, a colour, a press
          kit, or any prior site. The usual move here is stock imagery and a big
          background photo of someone else&apos;s guitar.
        </p>
        <p>
          We took the opposite position. If there are no images, stop pretending there
          are — build the whole thing out of type, rules and geometry, and let the
          absence of photography read as a decision rather than a gap.
        </p>
      </Section>

      <Section num="02" label="The Split" title="One site, two temperatures">
        <p>
          A musician&apos;s site has two jobs that pull in opposite directions. The
          catalogue side wants to be legible and cold — dates, track counts, credits. The
          performance side wants to be warm, loud and a bit overwhelming.
        </p>
        <p>
          So the page does both, in sequence. It opens in <strong>Mono Signal</strong>:
          paper, black ink, 3px rules, construction marks in the corners, numbered
          sections. Then a transition strip hands over to{" "}
          <strong>Burning Sunset</strong> — the same grid at the same measurements, with
          the temperature inverted to warm dark and fire orange. Coming out the other
          side, another strip hands it back.
        </p>
        <div className="cs-modes">
          <div className="cs-mode" style={{ background: "#F0EDE8", color: "#0A0A0A" }}>
            <b>Mono Signal</b>
            <span>Paper, black ink, 3px rules, construction marks. The catalogue half — set like a specification sheet.</span>
            <code>#F0EDE8 / #0A0A0A</code>
          </div>
          <div className="cs-mode" style={{ background: "#1A1410", color: "#F5E6D3" }}>
            <b>Burning Sunset</b>
            <span>Warm dark, fire orange, amber. The performance half — same grid, inverted temperature.</span>
            <code>#1A1410 / #FF480F</code>
          </div>
        </div>

        <div className="cs-band">
          <p>direction: hybrid / mono signal + burning sunset</p>
          <cite>Printed in the corner of the shipped hero — the site states its own direction</cite>
        </div>

        <div className="cs-grid cs-grid-2">
          <figure className="cs-frame">
            <Image src={`${IMG}/discography.png`} alt="The discography section in Mono Signal" width={1500} height={950} />
            <figcaption className="cs-cap">
              <span>Mono Signal — the catalogue</span>
              <b>02 / Discography</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/sunset2.png`} alt="The performance zone in Burning Sunset" width={1500} height={950} />
            <figcaption className="cs-cap">
              <span>Burning Sunset — the performance zone</span>
              <b>Featured</b>
            </figcaption>
          </figure>
        </div>

        <div className="cs-bleed">
          <Image src={`${IMG}/sunset.png`} alt="The transition strip handing over from Mono Signal to Burning Sunset" width={1500} height={950} />
          <div className="cs-cap">
            <span>The hinge — a transition strip bands from paper through amber into fire, then hands over</span>
            <b>ModeTransitionStrip</b>
          </div>
        </div>
      </Section>

      <Section num="03" label="Colour System" title="Two palettes, identical geometry">
        <p>
          Both modes map onto the same token names through Tailwind&apos;s{" "}
          <code>@theme inline</code>, so a component does not know which mode it is in —
          it asks for the foreground colour and gets whichever one is current. Nothing
          about the layout changes across the hinge. Only the temperature does.
        </p>

        <p className="cs-note">Mono Signal — the catalogue</p>
        <Swatches colors={MONO} />

        <p className="cs-note" style={{ marginTop: 28 }}>Burning Sunset — the performance zone</p>
        <div className="cs-bigswatch">
          <div style={{ background: "#FF480F" }} />
          <div style={{ background: "#D4A024" }} />
          <div style={{ background: "#1A1410" }} />
        </div>
        <Swatches colors={SUNSET} />
      </Section>

      <Section num="04" label="Typography" title="Three faces, and a 3px rule holding it together">
        <p>
          With no imagery, type carries the whole identity. The wordmark runs at{" "}
          <code>clamp(80px, 14vw, 180px)</code> — big enough that on a phone it is the
          entire screen. Everything else is small, wide-tracked and uppercase, so the
          contrast between the name and the information around it does the work a photo
          would normally do.
        </p>
        <Table head={["Role", "Face", "Usage"]} rows={TYPE} />
        <p className="cs-note">
          Border width is a single token — <code>--border-w: 3px</code>. Every divider,
          frame, button and section rule on the site reads from it, which is why the grid
          feels drawn rather than styled.
        </p>

        <div className="cs-grid cs-grid-2">
          <figure className="cs-frame">
            <Image src={`${IMG}/about.png`} alt="The about section — sticky numbered rail beside the biography" width={1500} height={950} />
            <figcaption className="cs-cap">
              <span>Numbered sections with a sticky rail — the grid stays visible while you read</span>
              <b>01 / About</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/contact.png`} alt="The contact section — four channels in one bordered row" width={1500} height={950} />
            <figcaption className="cs-cap">
              <span>Four channels, one row, hover-invert with no transition — it snaps</span>
              <b>05 / Contact</b>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section num="05" label="Generated Geometry" title="The artwork is drawn in the browser">
        <p>
          The hero&apos;s interference figure is not an image. It is overlapping ellipses
          rendered as SVG, so it is sharp at any size, costs one request less than a
          photograph, and can be re-tuned by changing a number instead of reopening a
          design file.
        </p>
        <p>
          The listening gate does the same thing in reverse: on mount it generates 25
          concentric ellipses, each with its radius scaled and its vertical ratio driven
          by a sine wave, so the rings read as a waveform seen from above rather than as
          a target. Film grain is generated too — an <code>feTurbulence</code> filter
          inlined as a data URI, which means no image request and no visible tile seam.
        </p>
      </Section>

      <Section num="06" label="The Gate" title="Some of the catalogue is locked on purpose">
        <p>
          Unreleased work needed somewhere to live that was neither public nor private.
          The discography lists it — title, year, track count — and marks it
          password-protected, so the existence of the record is part of the story while
          the record itself stays shut.
        </p>
        <p>
          Entering a code either collapses the wave field and reveals the album, or
          shakes the field for 1.2 seconds and resets. No modal, no error page, no
          navigation — the failure state is a physical reaction in the thing you were
          already looking at. Uuye hands codes out himself; they are not on the site, and
          they are not in this case study.
        </p>
        <div className="cs-bleed">
          <Image src={`${IMG}/listen.png`} alt="The listening corner — LOCKED over a generated wave field, with the code entry beside it" width={1500} height={950} />
          <div className="cs-cap">
            <span>25 ellipses generated on mount, sized by a sine wave — a waveform seen from above, not a target</span>
            <b>Gate</b>
          </div>
        </div>

        <Quote self cite="910studio — on the gate">
          A locked track you can see is more interesting than one you cannot. The
          discography lists what you are not allowed to hear yet, which is the whole
          point.
        </Quote>
      </Section>

      <Section num="07" label="Components" title="Eight pieces, each doing one job">
        <p>
          A single page, but not a single file. The site is eight components, and the two
          that matter most are the ones that generate their own artwork.
        </p>
        <div className="cs-grid cs-grid-2">
          {COMPONENTS.map((c) => (
            <div key={c.name} className="cs-card">
              <span className="cs-kicker">Component</span>
              <h3>{c.name}</h3>
              <p>{c.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section num="08" label="Stack" title="What a one-page site actually needs">
        <p>
          Svelte 5&apos;s runes handle the only real interactivity on the site — the
          gate&apos;s unlock, shake and collapse states — in a handful of lines and
          without a store. Everything else is static output on the edge.
        </p>
        <Table head={["Layer", "Choice", "Why"]} rows={STACK} />
      </Section>

      <Section num="09" label="Outcome" title="Shipped. No photographs required.">
        <p>
          A working portfolio for a musician who arrived with nothing to put in one:
          catalogue, listening corner, contact routes and a live site that credits the
          studio in its own footer. Built out of type, a 3px rule and geometry drawn at
          runtime.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
