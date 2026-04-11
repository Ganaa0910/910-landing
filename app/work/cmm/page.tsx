import Link from "next/link";
import Image from "next/image";
import { LineArt } from "@/components/ui/line-art";
import { LazyDemoFrame } from "./lazy-iframe";

function ImageFrame({ src, alt, caption, tag }: { src: string; alt: string; caption: string; tag: string }) {
  return (
    <div className="border border-zinc-800">
      <Image src={src} alt={alt} width={1120} height={630} className="w-full" />
      <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
        <span className="text-xs text-zinc-500">{caption}</span>
        <span className="text-[9px] uppercase tracking-wider text-accent">{tag}</span>
      </div>
    </div>
  );
}

const REFS = [
  { rank: "Client's #1", name: "AlphaSense", why: 'Font readability, ease on eyes. The benchmark for "professional but not intimidating."' },
  { rank: "Density Reference", name: "Bloomberg Terminal", why: 'Progressive disclosure philosophy. "Concealing complexity." The client loves it — opposite of what we expected.' },
  { rank: "Closest Analog", name: "Koyfin", why: "Bloomberg density with modern UI. Composable dashboard modules. The target experience." },
  { rank: "Structure", name: "Crunchbase", why: "Entity profile structure, company cards, data organization. Adapted for the Mongolian market." },
  { rank: "Portal Model", name: "Yahoo Finance", why: "\"The bible\" for CMM's team. News aggregation, ticker bars, content categorization." },
  { rank: "Data Tables", name: "Pitchbook", why: "Detailed financial data presentation. Deal flow tables. Reference for data-heavy views." },
];

const KILLED = [
  { name: "Mono", reason: '"Too general." The monospace-first, terminal-inspired direction felt interchangeable with any SaaS startup. No brand identity. No personality.' },
  { name: "Ledger", reason: "Conviction-over-decoration. Notion-energy minimal layouts. Technically clean, but the client explicitly rejected restraint. They want brand presence." },
  { name: "Blueprint", reason: "Engineering-forward with grid overlays and technical aesthetics. Too cold, too niche. Investment bankers won't trust a platform that looks like a CAD tool." },
  { name: "Pastel Soft Tones", reason: 'The consumer fintech look — Revolut-adjacent, friendly, approachable. But CMM serves institutional desks. Soft colors signal "toy."' },
];

const COLORS = [
  { bg: "#3E149C", name: "Brand Primary", val: "#3E149C" },
  { bg: "#6B4CC0", name: "Brand Light", val: "#6B4CC0" },
  { bg: "#FCA311", name: "Signal / Orange", val: "#FCA311" },
  { bg: "#FAFAFD", name: "Background", val: "#FAFAFD" },
  { bg: "#0C0A1D", name: "Foreground", val: "#0C0A1D" },
  { bg: "#059669", name: "Positive", val: "#059669" },
  { bg: "#DC2626", name: "Negative", val: "#DC2626" },
];

const TOKENS = [
  ["--card-r", "4px", "Minimal rounding — every pixel counts in Dense"],
  ["--card-p", "14px", "Tight padding without crushing content"],
  ["--grid-gap", "12px", "Cards sit close — scanning is the interaction"],
  ["--grid-cols", "4", "Maximum entities above the fold"],
  ["--btn-h", "34px", "Compact buttons — UI, not marketing"],
  ["--t-row-h", "38px", "Table rows pack tight, still clickable"],
  ["--badge-tt", "uppercase", "Dense badges scan faster in caps"],
  ["--badge-ls", "0.06em", "Just enough tracking for caps readability"],
  ["--w-head-bg", "var(--bg-alt)", "Lavender widget headers — brand in every surface"],
  ["--shadow-*", "rgba(62,20,156,x)", "Brand-tinted purple shadows — even elevation carries identity"],
];

const OUTCOMES = [
  { num: "4", label: "Page Prototypes", desc: "Fully interactive HTML demos with real Mongolian market data." },
  { num: "80+", label: "Design Tokens", desc: "Colors, typography, spacing, shadows, radii, easing — all brand-tinted, all production-ready." },
  { num: "3", label: "Access Tiers", desc: "Public, Registered, and Paid — density scales with commitment, identity stays consistent." },
];

export default function CMMCaseStudy() {
  return (
    <main className="min-h-screen bg-base-black pt-14">
      {/* Back link */}
      <div className="mx-auto max-w-[1120px] px-8 pt-8">
        <Link href="/work" className="inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-accent">
          <span>&lt;-</span> back to work
        </Link>
      </div>

      {/* Hero */}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-12 pb-20">
        <div className="pointer-events-none absolute -inset-20 -z-0">
          <LineArt variant="spiral" color="#14b8a6" strokeWidth={10} className="absolute -right-10 top-10 w-64 opacity-12 sm:w-80" delay={0.3} loop />
          <LineArt variant="star" color="#e4e4e7" strokeWidth={6} className="absolute left-0 bottom-10 w-14 opacity-15" delay={0.6} />
        </div>

        <p className="relative z-10 mb-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          case study / capital markets mongolia
        </p>

        <h1 className="relative z-10 font-bebas text-6xl uppercase leading-[0.95] tracking-wide text-zinc-50 sm:text-7xl lg:text-8xl">
          designing mongolia&apos;s first{" "}
          <span className="text-accent">ai-native</span> capital markets platform
        </h1>

        <p className="relative z-10 mt-8 text-sm leading-relaxed text-zinc-400">
          Capital Markets Mongolia needed an intelligence platform that could serve finance professionals and general investors alike. 910studio designed MarketIQ — from initial exploration through client workshop to a production-ready Dense direction that became the foundation of the entire product.
        </p>

        {/* Meta */}
        <div className="relative z-10 mt-12 flex flex-wrap gap-x-14 gap-y-4 text-xs">
          <div><span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">client</span><p className="mt-1 text-zinc-300">Capital Markets Mongolia</p></div>
          <div><span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">executor</span><p className="mt-1 text-zinc-300">910studio</p></div>
          <div><span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">timeline</span><p className="mt-1 text-zinc-300">9 Weeks</p></div>
          <div><span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">scope</span><p className="mt-1 text-zinc-300">Design System, Token Architecture, Frontend</p></div>
        </div>
      </div>

      {/* 01 */}
      <Section num="01" label="The Challenge" title="No Bloomberg for Mongolia. No AlphaSense. Nothing.">
        <p className="text-sm leading-relaxed text-zinc-400">Mongolia&apos;s capital markets are growing fast — mining IPOs, foreign investment, cross-border deals — but the entire ecosystem runs on PDFs, email chains, and Yahoo Finance tabs. There is no centralized intelligence platform. No entity database. No research hub. CMM, the country&apos;s leading capital markets advisory, wanted to build one from scratch.</p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">The problem isn&apos;t just &quot;build a website.&quot; It&apos;s building credibility. The platform needs to earn trust from institutional investors who live in Bloomberg terminals AND general users who&apos;ve never seen a P/E ratio. Same product, same brand, two completely different density expectations.</p>
      </Section>

      {/* 02 */}
      <Section num="02" label="Phase 1 — Exploration" title="Building the visual vocabulary">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">Before touching a single component, we mapped the landscape. Moodboards, typography pairings, color systems, and early component explorations.</p>
        <div className="space-y-6">
          <LazyDemoFrame src="/demos/cmm/design-workshops/cmm-marketiq-moodboard.html" label="Phase 1 — Moodboard" tag="Interactive" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ImageFrame src="/demos/cmm/assets/phase1-components.png" alt="Phase 1 component exploration" caption="Early component library" tag="Phase 1" />
            <ImageFrame src="/demos/cmm/assets/phase1-entity.png" alt="Phase 1 entity profile" caption="Entity profile prototype" tag="Phase 1" />
          </div>
          <ImageFrame src="/demos/cmm/assets/phase1-directions.png" alt="Three directions" caption="Three directions built for workshop" tag="Phase 1" />
        </div>
      </Section>

      {/* 03 */}
      <Section num="03" label="Discovery" title="How finance platforms earn trust">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">We studied platforms across the density spectrum. The key insight: data density is a feature, not a problem, when visual hierarchy is right.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REFS.map((r) => (
            <div key={r.name} className="border border-zinc-800 p-5">
              <span className="text-[9px] uppercase tracking-wider text-accent">{r.rank}</span>
              <p className="mt-2 font-bebas text-2xl text-zinc-200">{r.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{r.why}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 */}
      <Section num="04" label="Client Workshop" title="The client chose Dense">
        <p className="text-sm leading-relaxed text-zinc-400">We ran a structured workshop with CMM&apos;s leadership. Three complete directions: Editorial, Dense, and Polished. The client chose Dense. Finance professionals gravitate toward information density.</p>
        <div className="my-10 border-l-2 border-accent pl-6">
          <p className="font-bebas text-2xl tracking-wide text-zinc-200">&quot;Creative, Sophisticated yet Corp&quot;</p>
          <p className="mt-2 text-xs text-zinc-600">Client mandate — CMM leadership workshop, March 2026</p>
        </div>
        <ImageFrame src="/demos/cmm/assets/moodboard.png" alt="Phase 2 moodboard" caption="Refined direction after workshop" tag="Workshop" />
      </Section>

      {/* 05 */}
      <Section num="05" label="What We Killed" title="Four directions died so Dense could live">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">Design is as much about what you reject as what you ship.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {KILLED.map((k) => (
            <div key={k.name} className="border border-zinc-800 p-5">
              <span className="text-[9px] uppercase tracking-wider text-error">hard no</span>
              <p className="mt-2 font-bebas text-2xl text-zinc-200">{k.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">{k.reason}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border-l-2 border-zinc-700 pl-6">
          <p className="text-sm leading-relaxed text-zinc-400">The directions that died weren&apos;t bad design — they were wrong context. Ledger would be fire for a dev tool. But for a Mongolian capital markets platform that needs to earn trust from bankers? Dense was the only answer.</p>
          <p className="mt-2 text-xs text-zinc-600">910studio design rationale</p>
        </div>
      </Section>

      {/* 06 */}
      <Section num="06" label="Design Philosophy" title="Western structure meets Eastern density">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">The client specifically requested a blend of Western and Eastern UI design. Western finance platforms prioritize whitespace and hierarchy. Eastern platforms pack information and use color as a navigation system. Dense lives at the intersection.</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-zinc-800 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-bebas text-xl text-zinc-200">Western Influence</span>
              <span className="text-[9px] uppercase tracking-wider text-accent">Structure</span>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-500">
              <p>AlphaSense-grade readability — measured whitespace even in dense layouts</p>
              <p>Clean typography hierarchy — Plus Jakarta Sans for authority, DM Sans for comfort</p>
              <p>Professional component design — buttons, badges, cards follow Western SaaS conventions</p>
              <p>Measured spacing rhythm — 32px section gaps, 12px grid gaps, 14px card padding</p>
            </div>
          </div>
          <div className="border border-zinc-800 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-bebas text-xl text-zinc-200">Eastern Influence</span>
              <span className="text-[9px] uppercase tracking-wider text-accent">Density</span>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-500">
              <p>Prominent color coding — red/green for financial data is non-negotiable in Asian markets</p>
              <p>Category badges as primary navigation — color-coded tags guide scanning</p>
              <p>Higher information density — 4-column grids, 38px table rows, compact stat blocks</p>
              <p>Bold brand color throughout — every surface whispers purple</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 */}
      <Section num="07" label="The Dense Direction" title="Bloomberg conviction, CMM identity">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">Dense packs maximum information per pixel without sacrificing readability. 4px radii. 12px grid gaps. Compact 34px buttons. Every surface carries the brand through purple-tinted shadows and lavender backgrounds.</p>

        {/* Colors */}
        <div className="mb-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600">color system</p>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <div key={c.val + c.name} className="flex items-center gap-3 border border-zinc-800 px-3 py-2">
                <div className="h-6 w-6" style={{ background: c.bg }} />
                <div>
                  <p className="text-xs text-zinc-300">{c.name}</p>
                  <p className="font-mono text-[10px] text-zinc-600">{c.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <LazyDemoFrame src="/demos/cmm/design-workshops/cmm-v1-design-system.html" label="Production Design System" tag="Interactive" height={700} />
      </Section>

      {/* 08 */}
      <Section num="08" label="Token Architecture" title="The system behind the system">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">Every component references the same set of CSS custom properties. Change one token, every surface updates.</p>

        {/* Token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Token</th>
                <th className="pb-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Value</th>
                <th className="pb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Why</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map(([token, val, why]) => (
                <tr key={token} className="border-b border-zinc-900">
                  <td className="py-3 pr-6 font-mono text-accent">{token}</td>
                  <td className="py-3 pr-6 font-mono text-zinc-300">{val}</td>
                  <td className="py-3 text-zinc-500">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 09 */}
      <Section num="09" label="Production Pages" title="Four page types, one Dense system">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">Every page in MarketIQ shares the Dense token system. These are live, interactive demos — scroll, hover, click.</p>
        <LazyDemoFrame src="/demos/cmm/demo-pages/insights-index.html#dense" label="Insights Index" />
      </Section>

      {/* 10 */}
      <Section num="10" label="Access Architecture" title="One Dense system, three access tiers">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">The Dense direction scales across three user tiers. Same brand, same tokens — information access increases as users commit.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-zinc-800 p-5"><span className="font-bebas text-3xl text-zinc-500">Free</span><p className="mt-1 text-xs text-zinc-400">Public Tier</p><p className="mt-2 text-xs text-zinc-600">Attractive entry point. Key data visible, advanced metrics blurred.</p></div>
          <div className="border border-zinc-800 p-5"><span className="font-bebas text-3xl text-[#6B4CC0]">Registered</span><p className="mt-1 text-xs text-zinc-400">Registered Tier</p><p className="mt-2 text-xs text-zinc-600">Full profiles, basic charts, financial summaries.</p></div>
          <div className="border border-zinc-800 p-5"><span className="font-bebas text-3xl text-accent">Paid</span><p className="mt-1 text-xs text-zinc-400">Premium Tier</p><p className="mt-2 text-xs text-zinc-600">Everything unlocked. AI insights, multi-metric rows, export tools.</p></div>
        </div>
      </Section>

      {/* 11 */}
      <Section num="11" label="Outcome" title="Shipped.">
        <p className="mb-8 text-sm leading-relaxed text-zinc-400">From blank brief to production direction in three weeks. A structured client workshop validated the Dense direction. A complete token system powers every surface.</p>
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

      {/* CTA */}
      <div className="relative mx-auto max-w-[1120px] px-8 py-24 overflow-hidden">
        <LineArt variant="twist" color="#14b8a6" strokeWidth={7} className="absolute bottom-4 left-0 w-full opacity-10" delay={0.2} loop />
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

      {/* Back link bottom */}
      <div className="mx-auto max-w-[1120px] px-8 pb-12">
        <Link href="/work" className="inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-accent">
          <span>&lt;-</span> back to work
        </Link>
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
