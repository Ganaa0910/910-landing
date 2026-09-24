import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juraan — Case Study",
  description:
    "How 910studio designed and built a portfolio for Mongolia's premier bronze sculptor. From bronze research to custom font to cinematic web.",
  openGraph: {
    title: "Juraan — 910 Case Study",
    description:
      "Portfolio site for Mongolian bronze sculptor Juraan. Custom font, bronze-derived palette, cinematic scroll experience.",
  },
};

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
import { FontShowcase } from "./font-showcase";

const IMG = "/demos/juraan/assets";

const RESEARCH = [
  { step: "01", name: "Wax sculpting", detail: "The sculptor shapes the original in wax over a clay core. Every texture, every fingerprint is intentional — the only stage where the artist's hand touches the form directly." },
  { step: "02", name: "Mould & cast", detail: "A ceramic shell encases the wax. Molten bronze at 1,200°C replaces it and the wax burns away — 'lost wax' casting. Nothing survives except the form." },
  { step: "03", name: "Patination", detail: "Chemical oxidation gives bronze its colour. Heat, acid, time. The warm golden-brown that became our primary accent was pulled directly from this stage." },
];

const PALETTE = [
  { name: "Bronze Light", val: "#D4AF7A" },
  { name: "Bronze", val: "#CD7F32" },
  { name: "Bronze Dark", val: "#8C4A1B" },
  { name: "Background", val: "#0A0A0A" },
  { name: "Elevated", val: "#141414" },
  { name: "Text Primary", val: "#E5E5E5" },
  { name: "Text Secondary", val: "#A3A3A3" },
  { name: "Border", val: "#262626" },
];

const TYPOGRAPHY = [
  ["Display", "Juraan (custom)", "Hero titles, section headers. One weight, maximum presence."],
  ["Heading", "Cinzel", "Section titles and navigation. Classical authority."],
  ["Editorial", "Playfair Display", "Subtitles and pull quotes. Italic for editorial grace."],
  ["Body", "Sabon", "Long-form text, optimised for reading on dark backgrounds."],
  ["Technical", "JetBrains Mono", "Labels, metadata, dimensions. Monospace precision."],
] as const;

const SCULPTURES = [
  { src: `${IMG}/wind.webp`, name: "Wind", dim: "67×60×30" },
  { src: `${IMG}/pegasus.webp`, name: "Pegasus", dim: "115×85×30" },
  { src: `${IMG}/dragon.webp`, name: "Dragon", dim: "92×37×30" },
  { src: `${IMG}/chairman.webp`, name: "Chairman", dim: "103×70×40" },
  { src: `${IMG}/desireling.webp`, name: "Desireling", dim: "114×66×60" },
  { src: `${IMG}/deer.webp`, name: "Deer", dim: "83×70×36" },
  { src: `${IMG}/moose.webp`, name: "Moose", dim: "81×90×40" },
  { src: `${IMG}/minds-cosmos.webp`, name: "Mind's Cosmos", dim: "100×45×35" },
];

const PAGES = [
  { name: "Homepage", detail: "Video hero with the seven-layer vignette and film grain, artist intro, God & Devil highlight, bento gallery preview, exhibition editorial grid." },
  { name: "Gallery", detail: "Bento grid with six size variations. Stagger-reveal via IntersectionObserver. Background image under an 85% overlay." },
  { name: "God & Devil", detail: "Cinematic split — Devil left, Buddha right, narrative centre. Unified vignette, zoom modals." },
  { name: "About", detail: "Sticky portrait moving grayscale to colour. Full biography, exhibitions since 1987, awards, the Government Palace commission." },
  { name: "Contact", detail: "Form with subject selector, studio information, Viber integration. Background texture overlay." },
];

const OUTCOMES = [
  { num: "37+", label: "Sculptures catalogued", desc: "The full bronze collection with multi-angle photography, dimensions and materials." },
  { num: "5", label: "Pages shipped", desc: "Homepage, gallery, God & Devil, about and contact — each with its own layout treatment." },
  { num: "1", label: "Custom typeface", desc: "Hand-drawn Juraan display font. Not licensed, not Google Fonts — drawn from scratch." },
];

export default function JuraanCaseStudy() {
  return (
    <CaseStudy slug="juraan">
      <p className="cs-eyebrow">Case study / Juraan, bronze sculptor</p>
      <h1>
        We studied bronze <i>to design pixels</i>
      </h1>
      <p className="cs-lede">
        An award-winning Mongolian sculptor with four decades of bronze work and no
        online presence. We researched the lost-wax casting process to derive the
        palette, drew a custom typeface, and built a gallery experience that makes a
        screen feel like a dark room full of bronze. Solo, design to deploy.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Juraan (Lkhagvasuren Nyamkhuu)" />
        <Meta label="executor" value="910studio (solo)" />
        <Meta label="scope" value="Research, Design, Custom Font, Frontend, Deploy" />
        <Meta label="live" value="juraan.com" live />
      </div>

      <Section num="01" label="The Brief" title="The client had 37 years of work. We had zero references.">
        <p>
          No brand. No style guide. No moodboard. No previous site. A sculptor with
          Government Palace commissions, Noma Concours awards and solo exhibitions in four
          countries had never been represented digitally.
        </p>
        <p>
          The job wasn&apos;t &quot;build a portfolio.&quot; It was making a screen carry
          the weight of bronze — patina, foundry dark, a 115cm Pegasus. A template would
          insult the work.
        </p>

        <div className="cs-grid cs-grid-4">
          <div className="cs-stat">
            <b>37+</b>
            <strong>Sculptures to catalogue</strong>
            <p>Multi-angle photography</p>
          </div>
          <div className="cs-stat">
            <b>0</b>
            <strong>Existing brand assets</strong>
            <p>No logo, no colours, no type</p>
          </div>
          <div className="cs-stat">
            <b>5</b>
            <strong>Pages to design</strong>
            <p>Each with a unique layout</p>
          </div>
          <div className="cs-stat">
            <b>1</b>
            <strong>Person executing</strong>
            <p>Design → code → deploy</p>
          </div>
        </div>
      </Section>

      <Section num="02" label="Our Process" title="We studied bronze casting before opening Figma">
        <p>
          The first move wasn&apos;t wireframes. We followed the lost-wax process end to
          end — not for content, but to take the design language off the material.
        </p>
        <div className="cs-grid cs-grid-3">
          {RESEARCH.map((r) => (
            <div key={r.step} className="cs-card">
              <span className="cs-step">{r.step}</span>
              <h3>{r.name}</h3>
              <p>{r.detail}</p>
            </div>
          ))}
        </div>
        <Quote cite="#D4AF7A — the exact warm gold of patinated bronze, which became the primary accent for the entire site.">
          The colour isn&apos;t chosen. It&apos;s discovered.
        </Quote>
      </Section>

      <Section num="03" label="Colour System" title="We reverse-engineered the palette from physical bronze">
        <p>
          With no brand assets, the colour system came out of the casting environment.
          Near-black is the foundry. Bronze Light is fresh patina, Bronze Dark is aged
          oxidation. Not a picked palette — a discovered one.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#D4AF7A" }} />
          <div style={{ background: "#CD7F32" }} />
          <div style={{ background: "#8C4A1B" }} />
        </div>
        <Swatches colors={PALETTE} />
      </Section>

      <Section num="04" label="Typography" title="We designed a typeface that exists nowhere else">
        <p>
          No existing font carried the right weight, so we drew one. Not licensed, not
          Google Fonts. Hero and key headers only. One weight, one purpose: presence.
        </p>

        <FontShowcase />

        <Table head={["Role", "Font", "Usage"]} rows={TYPOGRAPHY} />

        <p className="cs-note">
          Fluid type scaling via CSS clamp() — hero from 3rem to 6rem, H1 from 2.5rem to
          4rem, body from 1rem to 1.125rem. Zero breakpoint overrides for font sizes.
        </p>
      </Section>

      <Section num="05" label="Design Direction" title="We built a gallery, not a website">
        <p>
          It should feel like a gallery at night, not a web page. Near-black walls,
          layered vignettes as lighting, film grain for texture. Sculptures emerge from
          darkness — grayscale by default, colour on hover.
        </p>
        <div className="cs-grid cs-grid-2">
          <div className="cs-card">
            <span className="cs-kicker">Hero</span>
            <h3>Video + seven-layer vignette</h3>
            <p>Background video under base darkness, a primary radial vignette, a tighter secondary, a refined inner shadow, corner gradients, edge burn and animated film grain. Seven layers, one feeling: depth.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Gallery</span>
            <h3>Bento grid, six size variations</h3>
            <p>Hero pieces take 2×3 cells, smaller works take 1×1. The rhythm prevents monotony across 37+ sculptures. Stagger-reveal on scroll.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Feature page</span>
            <h3>Cinematic split — God &amp; Devil</h3>
            <p>Full-screen three-panel: Devil left, narrative centre, Buddha right. A radial vignette unifies both sculptures. Click-to-zoom modals, and a completely different mobile layout.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Interaction</span>
            <h3>Grayscale → colour on hover</h3>
            <p>Desktop images load grayscale and reveal colour on hover, so sculptures emerge into light as you engage. Mobile shows full colour immediately — touch doesn&apos;t hover.</p>
          </div>
        </div>
      </Section>

      <Section num="06" label="Feature Build" title="We gave the signature piece its own layout system">
        <p>
          The signature work deserved more than a gallery card. Devil left, Buddha right,
          narrative centre, one radial vignette compositing both into a single frame. Two
          equal halves, no hierarchy — the structure is the concept.
        </p>

        <div className="cs-group">
          <div className="cs-grid cs-grid-2">
            <Image src={`${IMG}/devil.webp`} alt="Devil in Meditation" width={560} height={750} />
            <Image src={`${IMG}/buddha.webp`} alt="Buddha" width={560} height={750} />
          </div>
          <div className="cs-cap">
            <span>Two pieces in eternal dialogue — neither purely good nor evil</span>
            <b>Bronze, 45×50×32 each</b>
          </div>
        </div>

        <Quote self cite="910studio design rationale">
          The layout <em>is</em> the concept — two equal panels, no hierarchy, one
          composition. The structure mirrors the Buddhist duality the sculpture explores.
        </Quote>
      </Section>

      <Section num="07" label="Editorial Grid" title="We shot the exhibition, then designed around it">
        <p>
          The 2024 solo exhibition gave us real content. A 12-column editorial grid with
          intentional asymmetry — hero at eight columns, side stack at four. Not a photo
          dump.
        </p>
        <div className="cs-group">
          <div className="cs-grid cs-grid-2">
            <Image src={`${IMG}/exhibition.jpg`} alt="Sculpture at the exhibition" width={800} height={500} />
            <Image src={`${IMG}/crowd.jpg`} alt="Exhibition crowd" width={400} height={500} />
            <Image src={`${IMG}/musician.jpg`} alt="Traditional musician performing" width={400} height={500} />
            <Image src={`${IMG}/god-and-devil.jpg`} alt="God and Devil at the exhibition" width={800} height={450} />
          </div>
          <div className="cs-cap">
            <span>Editorial grid — desktop loads grayscale and reveals colour on hover</span>
            <b>12-column grid</b>
          </div>
        </div>
      </Section>

      <Section num="08" label="Content System" title="We catalogued 37+ sculptures into a bento grid">
        <p>
          Each piece needed multi-angle photography, materials and dimensions, organised
          so it doesn&apos;t bore you by piece twelve. Six size variations, staggered
          reveals on scroll.
        </p>
        <div className="cs-grid cs-grid-4">
          {SCULPTURES.map((s) => (
            <figure key={s.name} className="cs-frame fill">
              <Image src={s.src} alt={s.name} width={280} height={373} />
              <figcaption className="cs-cap">
                <span>{s.name}</span>
                <b>{s.dim}</b>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="cs-note">
          Eight of 37+ pieces shown. All bronze, cast and patinated. The full collection
          lives at juraan.com/gallery.
        </p>
      </Section>

      <Section num="09" label="Delivery" title="Five pages shipped, each with a unique layout">
        <p>
          Five pages on one dark gallery system. The constraint: no two should feel the
          same, all should feel related.
        </p>
        <div className="cs-stack">
          {PAGES.map((p) => (
            <div key={p.name} className="cs-row">
              <b>{p.name}</b>
              <p>{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>


      <Section num="10" label="Outcome" title="Shipped. One person. Design to deploy.">
        <p>
          Zero brand assets to a live cinematic portfolio — material research, colour
          extraction, a custom typeface, the vignette system, the bento gallery, the
          cinematic split, the editorial grid. All executed solo.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
