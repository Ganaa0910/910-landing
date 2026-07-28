import Link from "next/link";
import Image from "next/image";
import { LineArt } from "@/components/ui/line-art";
import { FontShowcase } from "./font-showcase";

const IMG = "/demos/juraan/assets";

const RESEARCH = [
  { step: "01", name: "Wax Sculpting", detail: "The sculptor shapes the original in wax over a clay core. Every texture, every fingerprint is intentional — this is the only stage where the artist's hand directly touches the form." },
  { step: "02", name: "Mold & Cast", detail: "A ceramic shell encases the wax. Molten bronze at 1,200°C replaces it. The wax burns away — 'lost wax' casting. Nothing is preserved except the form itself." },
  { step: "03", name: "Patination", detail: "Chemical oxidation gives bronze its color. Heat + acid + time. The warm golden-brown (#D4AF7A) that became our primary accent — pulled directly from this stage." },
];

const PALETTE = [
  { bg: "#D4AF7A", name: "Bronze Light", val: "#D4AF7A" },
  { bg: "#CD7F32", name: "Bronze", val: "#CD7F32" },
  { bg: "#8C4A1B", name: "Bronze Dark", val: "#8C4A1B" },
  { bg: "#0a0a0a", name: "Background", val: "#0A0A0A" },
  { bg: "#141414", name: "Elevated", val: "#141414" },
  { bg: "#e5e5e5", name: "Text Primary", val: "#E5E5E5" },
  { bg: "#a3a3a3", name: "Text Secondary", val: "#A3A3A3" },
  { bg: "#262626", name: "Border", val: "#262626" },
];

const TYPOGRAPHY = [
  { role: "Display", font: "Juraan (Custom)", usage: "Hero titles, section headers. One weight, maximum presence." },
  { role: "Heading", font: "Cinzel", usage: "Section titles, navigation. Classical authority." },
  { role: "Editorial", font: "Playfair Display", usage: "Subtitles, pull quotes. Italic for editorial grace." },
  { role: "Body", font: "Sabon", usage: "Long-form text. Optimized for reading on dark backgrounds." },
  { role: "Technical", font: "JetBrains Mono", usage: "Labels, metadata, dimensions. Monospace precision." },
];

const SCULPTURES = [
  { src: `${IMG}/wind.webp`, name: "Wind", dim: "67x60x30" },
  { src: `${IMG}/pegasus.webp`, name: "Pegasus", dim: "115x85x30" },
  { src: `${IMG}/dragon.webp`, name: "Dragon", dim: "92x37x30" },
  { src: `${IMG}/chairman.webp`, name: "Chairman", dim: "103x70x40" },
  { src: `${IMG}/desireling.webp`, name: "Desireling", dim: "114x66x60" },
  { src: `${IMG}/deer.webp`, name: "Deer", dim: "83x70x36" },
  { src: `${IMG}/moose.webp`, name: "Moose", dim: "81x90x40" },
  { src: `${IMG}/minds-cosmos.webp`, name: "Mind's Cosmos", dim: "100x45x35" },
];

const PAGES = [
  { name: "Homepage", detail: "Video hero with 7-layer vignette system + film grain, artist intro, God & Devil highlight, bento gallery preview, exhibition editorial grid." },
  { name: "Gallery", detail: "Bento grid with 6 size variations. Stagger-reveal via IntersectionObserver. Background image with 85% overlay." },
  { name: "God & Devil", detail: "Cinematic split layout — Devil left, Buddha right, center narrative. Unified vignette. Zoom modals." },
  { name: "About", detail: "Sticky portrait (grayscale → color). Full biography, exhibitions since 1987, awards, Government Palace commission." },
  { name: "Contact", detail: "Form with subject selector, studio info, Viber integration. Background texture overlay." },
];

const TECH_STACK = [
  ["Framework", "SvelteKit", "Minimal JS overhead. A sculptor's site doesn't need React's weight."],
  ["Styling", "Tailwind CSS v4", "Utility-first with @theme tokens. Fast iteration, zero naming debates."],
  ["Scroll", "Lenis", "Smooth scroll that feels physical — matches the tactile nature of bronze."],
  ["Typography", "CSS clamp()", "Fluid scaling. Hero: clamp(3rem, 8vw, 6rem). Zero breakpoints."],
  ["Images", "OptimizedImage", "Serves desktop/mobile variants via <picture>. Different crops per viewport."],
  ["Animation", "IntersectionObserver", "Stagger-reveal on gallery items. No animation library needed."],
  ["Deploy", "Vercel", "Edge delivery. adapter-vercel. Preview deploys for client review."],
];

const OUTCOMES = [
  { num: "37+", label: "Sculptures Catalogued", desc: "Full bronze collection with multi-angle gallery photography, dimensions, and materials." },
  { num: "5", label: "Pages Shipped", desc: "Homepage, Gallery, God & Devil feature, About, Contact — each with unique layout treatment." },
  { num: "1", label: "Custom Font", desc: "Hand-drawn Juraan display typeface. Not licensed, not Google Fonts — made from scratch." },
];

export default function JuraanCaseStudy() {
  return (
    <main className="min-h-screen bg-base-black pt-14">
      {/* Hero */}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-4 pb-20">
        <div className="pointer-events-none absolute -inset-20 -z-0">
          <LineArt variant="spiral" color="#D4AF7A" strokeWidth={10} className="absolute -right-10 top-10 w-64 opacity-12 sm:w-80" delay={0.3} loop />
          <LineArt variant="star" color="#e4e4e7" strokeWidth={6} className="absolute left-0 bottom-10 w-14 opacity-15" delay={0.6} />
        </div>

        <p className="relative z-10 mb-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          case study / juraan bronze sculptor
        </p>

        <h1 className="relative z-10 font-bebas text-6xl uppercase leading-[0.95] tracking-wide text-zinc-50 sm:text-7xl lg:text-8xl">
          we studied bronze{" "}
          <span className="text-accent">to design pixels</span>
        </h1>

        <p className="relative z-10 mt-8 text-sm leading-relaxed text-zinc-400">
          An award-winning Mongolian sculptor with four decades of bronze work and zero online presence. 910studio took this from blank canvas to shipped product — researching the lost-wax casting process to extract the color palette, designing a custom typeface from scratch, engineering a 7-layer vignette system, and building a cinematic gallery experience that makes a screen feel like a dark room full of bronze. Solo execution. Design to deploy.
        </p>

        {/* Meta */}
        <div className="relative z-10 mt-12 flex flex-wrap gap-x-14 gap-y-4 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">client</span>
            <p className="mt-1 text-zinc-300">Juraan (Lkhagvasuren Nyamkhuu)</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">executor</span>
            <p className="mt-1 text-zinc-300">910studio (solo)</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">scope</span>
            <p className="mt-1 text-zinc-300">Research, Design, Custom Font, Frontend, Deploy</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">stack</span>
            <p className="mt-1 text-zinc-300">SvelteKit / Tailwind / Lenis / Vercel</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">live</span>
            <p className="mt-1 text-accent">juraan.com</p>
          </div>
        </div>
      </div>

      {/* Hero Image — The Artist */}
      <div className="mx-auto max-w-[1120px] px-8 pb-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-zinc-800">
            <div className="aspect-[4/3] overflow-hidden">
              <Image src={`${IMG}/juraan-portrait.jpg`} alt="Juraan in his studio" width={560} height={420} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
              <span className="text-xs text-zinc-500">Lkhagvasuren Nyamkhuu (Juraan)</span>
              <span className="text-[9px] uppercase tracking-wider text-accent">The Client</span>
            </div>
          </div>
          <div className="border border-zinc-800">
            <div className="aspect-[4/3] overflow-hidden">
              <Image src={`${IMG}/god-and-devil.jpg`} alt="God and Devil — bronze duality" width={560} height={420} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
              <span className="text-xs text-zinc-500">God and Devil — the signature piece</span>
              <span className="text-[9px] uppercase tracking-wider text-accent">Bronze, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 01 The Brief ── */}
      <Section num="01" label="The Brief" title="The client had 37 years of work. We had zero references.">
        <p className="text-sm leading-relaxed text-zinc-400">
          No existing brand. No style guide. No mood board. No previous website. The client — a sculptor with Government Palace commissions, Noma Concours awards, solo exhibitions across four countries — had never been represented digitally. We were starting from the material itself.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          The challenge for 910studio wasn&apos;t &quot;build a portfolio.&quot; It was figuring out how to make a screen carry the weight of bronze. How do you translate the warmth of patina, the darkness of a foundry, the scale of a 115cm Pegasus into pixels? A template would insult the work. We needed to derive every design decision from the medium itself.
        </p>

        {/* What we were working with */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="border border-zinc-800 p-4">
            <span className="font-bebas text-3xl text-accent">37+</span>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Sculptures to Catalog</p>
            <p className="mt-1 text-xs text-zinc-600">Multi-angle photography</p>
          </div>
          <div className="border border-zinc-800 p-4">
            <span className="font-bebas text-3xl text-accent">0</span>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Existing Brand Assets</p>
            <p className="mt-1 text-xs text-zinc-600">No logo, no colors, no type</p>
          </div>
          <div className="border border-zinc-800 p-4">
            <span className="font-bebas text-3xl text-accent">5</span>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Pages to Design</p>
            <p className="mt-1 text-xs text-zinc-600">Each with unique layout</p>
          </div>
          <div className="border border-zinc-800 p-4">
            <span className="font-bebas text-3xl text-accent">1</span>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">Person Executing</p>
            <p className="mt-1 text-xs text-zinc-600">Design → Code → Deploy</p>
          </div>
        </div>
      </Section>

      {/* ── 02 Research ── */}
      <Section num="02" label="Our Process" title="We studied bronze casting before opening Figma">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          910studio&apos;s first move wasn&apos;t wireframes — it was research. We studied the lost-wax bronze casting process end to end. Not for content — to extract the design language from the material. Every color, texture, and mood decision on the site traces back to how bronze is physically made.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {RESEARCH.map((r) => (
            <div key={r.step} className="border border-zinc-800 p-5">
              <span className="font-bebas text-3xl text-accent">{r.step}</span>
              <p className="mt-2 font-bebas text-xl text-zinc-200">{r.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{r.detail}</p>
            </div>
          ))}
        </div>
        <div className="my-10 border-l-2 border-accent pl-6">
          <p className="font-bebas text-2xl tracking-wide text-zinc-200">&quot;The color isn&apos;t chosen. It&apos;s discovered.&quot;</p>
          <p className="mt-2 text-xs text-zinc-600">#D4AF7A — the exact warm gold of patinated bronze became the primary accent for the entire site.</p>
        </div>
      </Section>

      {/* ── 03 Color System ── */}
      <Section num="03" label="Color System" title="We reverse-engineered the palette from physical bronze">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          With zero brand assets to work from, we derived the entire color system from the casting environment. Near-black (#0A0A0A) maps to the foundry darkness. Bronze Light (#D4AF7A) is fresh patina. Bronze Dark (#8C4A1B) is aged oxidation. Even text colors reference smoke and ash. This isn&apos;t a picked palette — it&apos;s a discovered one.
        </p>

        {/* Large color blocks */}
        <div className="mb-6 grid grid-cols-3 gap-0 border border-zinc-800 overflow-hidden">
          <div className="aspect-[3/1]" style={{ background: "#D4AF7A" }} />
          <div className="aspect-[3/1]" style={{ background: "#CD7F32" }} />
          <div className="aspect-[3/1]" style={{ background: "#8C4A1B" }} />
        </div>

        <div className="flex flex-wrap gap-3">
          {PALETTE.map((c) => (
            <div key={c.val + c.name} className="flex items-center gap-3 border border-zinc-800 px-3 py-2">
              <div className="h-6 w-6 flex-shrink-0" style={{ background: c.bg }} />
              <div>
                <p className="text-xs text-zinc-300">{c.name}</p>
                <p className="font-mono text-[10px] text-zinc-600">{c.val}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 04 Custom Font + Showcase ── */}
      <Section num="04" label="Typography" title="We designed a typeface that exists nowhere else">
        <p className="text-sm leading-relaxed text-zinc-400">
          No existing font carried the right weight. So we made one. The &quot;Juraan&quot; display typeface was designed from scratch for this project — not licensed, not sourced, not on Google Fonts. It&apos;s used exclusively for the hero and key headers. One weight, one purpose: presence.
        </p>

        {/* Live font showcase — client component */}
        <FontShowcase />

        {/* Type system table */}
        <div className="mt-10 overflow-x-auto">
          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600">type system</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Role</th>
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Font</th>
                <th className="pb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Usage</th>
              </tr>
            </thead>
            <tbody>
              {TYPOGRAPHY.map(({ role, font, usage }) => (
                <tr key={role} className="border-b border-zinc-900">
                  <td className="py-3 pr-6 text-zinc-300">{role}</td>
                  <td className="py-3 pr-6 font-mono text-accent">{font}</td>
                  <td className="py-3 text-zinc-500">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-zinc-600">
          Fluid type scaling via CSS clamp() — hero ranges from 3rem to 6rem, H1 from 2.5rem to 4rem, body from 1rem to 1.125rem. Zero breakpoint overrides for font sizes.
        </p>
      </Section>

      {/* ── 05 Design Direction ── */}
      <Section num="05" label="Design Direction" title="We built a gallery, not a website">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          The core design decision: this should feel like walking into a gallery at night, not browsing a web page. We used near-black backgrounds as gallery walls, layered vignettes as dramatic lighting, and film grain for analog texture. Sculptures emerge from darkness — grayscale by default, color on hover. The metaphor drives every technical choice.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-zinc-800 p-5">
            <span className="text-[9px] uppercase tracking-wider text-accent">hero</span>
            <p className="mt-2 font-bebas text-xl text-zinc-200">Video + 7-Layer Vignette</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Background video overlaid with: base darkness, primary radial vignette, secondary tight vignette, refined inner shadow, corner gradients, edge burn, and animated film grain. Seven layers, one feeling: depth.</p>
          </div>
          <div className="border border-zinc-800 p-5">
            <span className="text-[9px] uppercase tracking-wider text-accent">gallery</span>
            <p className="mt-2 font-bebas text-xl text-zinc-200">Bento Grid, 6 Size Variations</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Six size patterns — hero pieces get 2x3 cells, smaller works get 1x1. The rhythm prevents monotony across 37+ sculptures. Stagger-reveal on scroll.</p>
          </div>
          <div className="border border-zinc-800 p-5">
            <span className="text-[9px] uppercase tracking-wider text-accent">feature page</span>
            <p className="mt-2 font-bebas text-xl text-zinc-200">Cinematic Split — God & Devil</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Full-screen three-panel — Devil left, narrative center, Buddha right. Radial vignette unifies both sculptures. Click-to-zoom modals. Completely different mobile layout.</p>
          </div>
          <div className="border border-zinc-800 p-5">
            <span className="text-[9px] uppercase tracking-wider text-accent">interaction</span>
            <p className="mt-2 font-bebas text-xl text-zinc-200">Grayscale &rarr; Color on Hover</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">Desktop images load grayscale, reveal full color on hover. Sculptures emerge into light as you engage. Mobile shows full color immediately — touch doesn&apos;t hover.</p>
          </div>
        </div>
      </Section>

      {/* ── 06 God & Devil Feature ── */}
      <Section num="06" label="Feature Build" title="We gave the signature piece its own layout system">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          The &quot;God and Devil&quot; duality is the client&apos;s signature work — it deserved more than a gallery card. We built a dedicated page with a cinematic split layout: Devil left, Buddha right, narrative center. A unified radial vignette composites both figures into one frame. The structure mirrors the theme — two equal halves, no hierarchy. Completely different mobile adaptation.
        </p>

        {/* Side-by-side Buddha and Devil */}
        <div className="grid grid-cols-2 gap-0 border border-zinc-800 overflow-hidden">
          <div className="relative">
            <Image src={`${IMG}/devil.webp`} alt="Devil in Meditation" width={560} height={750} className="w-full object-cover aspect-[3/4]" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-center text-xs text-zinc-400">Devil in Meditation</p>
            </div>
          </div>
          <div className="relative">
            <Image src={`${IMG}/buddha.webp`} alt="Buddha" width={560} height={750} className="w-full object-cover aspect-[3/4]" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-center text-xs text-zinc-400">Buddha</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-x border-b border-zinc-800 px-4 py-3">
          <span className="text-xs text-zinc-500">Two pieces in eternal dialogue — neither purely good nor evil</span>
          <span className="text-[9px] uppercase tracking-wider text-accent">Bronze, 45x50x32 each</span>
        </div>

        <div className="my-8 border-l-2 border-accent pl-6">
          <p className="font-bebas text-2xl tracking-wide text-zinc-200">&quot;The layout IS the concept.&quot;</p>
          <p className="mt-2 text-xs text-zinc-600">Two equal panels, no hierarchy, one composition — the structure mirrors the Buddhist duality the sculpture explores. 910studio design rationale.</p>
        </div>
      </Section>

      {/* ── 07 Exhibition ── */}
      <Section num="07" label="Editorial Grid" title="We shot the exhibition, then designed around it">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          The 2024 solo exhibition gave us real-world content to work with. We built an editorial photo grid on the homepage — 12-column CSS grid with intentional asymmetry. Hero shot at 8 columns, side stack at 4, bottom row splits between portrait pairs and a wide composition. Not a photo dump — it&apos;s structured storytelling.
        </p>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8 border border-zinc-800">
            <Image src={`${IMG}/exhibition.jpg`} alt="Sculpture at exhibition" width={800} height={500} className="w-full object-cover aspect-[16/10]" />
          </div>
          <div className="col-span-4 border border-zinc-800">
            <Image src={`${IMG}/crowd.jpg`} alt="Exhibition crowd" width={400} height={500} className="w-full h-full object-cover" />
          </div>
          <div className="col-span-4 border border-zinc-800">
            <Image src={`${IMG}/musician.jpg`} alt="Traditional musician" width={400} height={500} className="w-full object-cover aspect-[4/5]" />
          </div>
          <div className="col-span-8 border border-zinc-800">
            <Image src={`${IMG}/god-and-devil.jpg`} alt="God and Devil at exhibition" width={800} height={450} className="w-full object-cover aspect-[16/9]" />
          </div>
        </div>
        <div className="flex items-center justify-between border-x border-b border-zinc-800 px-4 py-3">
          <span className="text-xs text-zinc-500">Editorial grid — desktop loads grayscale, reveals color on hover</span>
          <span className="text-[9px] uppercase tracking-wider text-accent">12-Column Grid</span>
        </div>
      </Section>

      {/* ── 08 The Work — Sculpture Grid ── */}
      <Section num="08" label="Content System" title="We catalogued 37+ sculptures into a bento grid">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          Each sculpture needed multi-angle photography, material data, and dimensions — all organized in a way that doesn&apos;t bore you at piece #12. We built a bento grid with 6 size variations: hero pieces get 2x3 cells, smaller works fill the rhythm. The pattern repeats without repetition. IntersectionObserver staggers the reveals so the gallery unfolds as you scroll.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SCULPTURES.map((s) => (
            <div key={s.name} className="group border border-zinc-800 overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={s.src} alt={s.name} width={280} height={373} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-800">
                <span className="text-xs text-zinc-300">{s.name}</span>
                <span className="font-mono text-[9px] text-zinc-600">{s.dim}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          8 of 37+ pieces shown. All bronze, cast and patinated. Full collection at juraan.com/gallery
        </p>
      </Section>

      {/* ── 09 Pages ── */}
      <Section num="09" label="Delivery" title="Five pages shipped, each with a unique layout">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          We shipped five pages — each sharing the dark gallery system but with unique layout treatment. The constraint: no two pages should feel the same, but all should feel like they belong together. Here&apos;s what we built.
        </p>
        <div className="space-y-3">
          {PAGES.map((p) => (
            <div key={p.name} className="flex flex-col gap-2 border border-zinc-800 p-5 sm:flex-row sm:gap-6">
              <span className="flex-shrink-0 font-bebas text-xl text-accent">{p.name}</span>
              <p className="text-xs leading-relaxed text-zinc-500">{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 10 Technical ── */}
      <Section num="10" label="Stack" title="Why we chose SvelteKit over Next.js for this one">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          A sculptor&apos;s portfolio doesn&apos;t need React&apos;s runtime weight. We picked SvelteKit for minimal JS overhead, Lenis for physically smooth scroll, and Tailwind v4 for fast iteration with @theme tokens. Fluid type via clamp() — zero breakpoint overrides. Custom Svelte actions for the stagger-reveal gallery. Deployed on Vercel with adapter-vercel.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Layer</th>
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Choice</th>
                <th className="pb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Why</th>
              </tr>
            </thead>
            <tbody>
              {TECH_STACK.map(([layer, choice, why]) => (
                <tr key={layer} className="border-b border-zinc-900">
                  <td className="py-3 pr-6 text-zinc-300">{layer}</td>
                  <td className="py-3 pr-6 font-mono text-accent">{choice}</td>
                  <td className="py-3 text-zinc-500">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 11 Outcome ── */}
      <Section num="11" label="Outcome" title="Shipped. One person. Design to deploy.">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">
          910studio took this from zero brand assets to a live cinematic portfolio. Material research, color extraction, custom font design, 7-layer vignette engineering, bento gallery system, cinematic split layout, editorial grid, fluid typography, responsive optimization, Vercel deployment — all executed solo. The client now has a permanent digital gallery at juraan.com.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {OUTCOMES.map((o) => (
            <div key={o.label} className="border border-zinc-800 p-5">
              <span className="font-bebas text-5xl text-accent">{o.num}</span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">{o.label}</p>
              <p className="mt-2 text-xs text-zinc-600">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Back to work */}
      <div className="mx-auto max-w-[1120px] px-8 pt-8">
        <Link href="/work" className="inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-accent">
          <span>&lt;-</span> back to work
        </Link>
      </div>

      {/* CTA */}
      <div className="relative mx-auto max-w-[1120px] px-8 py-24 overflow-hidden">
        <LineArt variant="twist" color="#D4AF7A" strokeWidth={7} className="absolute bottom-4 left-0 w-full opacity-10" delay={0.2} loop />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-bebas text-5xl uppercase tracking-wide text-zinc-100 sm:text-6xl">like what you see?</h2>
            <LineArt variant="underline" color="#14b8a6" strokeWidth={5} className="-mt-1 w-48 opacity-50 sm:w-64" delay={0.3} />
          </div>
          <Link href="/contact" className="cartoon-shadow-accent inline-block bg-accent px-10 py-5 text-sm font-semibold uppercase tracking-wider text-base-black">
            start a project -&gt;
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ num, label, title, children }: { num: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1120px] px-8 py-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-bebas text-3xl text-accent">{num}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">{label}</span>
      </div>
      <h2 className="mb-8 font-bebas text-4xl uppercase tracking-wide text-zinc-100 sm:text-5xl">{title}</h2>
      {children}
    </section>
  );
}
