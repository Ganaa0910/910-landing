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
import { DemoFrame } from "@/components/case-study/demo-frame";

const REFS = [
  { rank: "Client's #1", name: "AlphaSense", why: 'Font readability, ease on eyes. The benchmark for "professional but not intimidating."' },
  { rank: "Density Reference", name: "Bloomberg Terminal", why: 'Progressive disclosure philosophy. "Concealing complexity." The client loves it — the opposite of what we expected.' },
  { rank: "Closest Analog", name: "Koyfin", why: "Bloomberg density with a modern UI. Composable dashboard modules. The target experience." },
  { rank: "Structure", name: "Crunchbase", why: "Entity profile structure, company cards, data organisation. Adapted for the Mongolian market." },
  { rank: "Portal Model", name: "Yahoo Finance", why: '"The bible" for CMM\'s team. News aggregation, ticker bars, content categorisation.' },
  { rank: "Data Tables", name: "Pitchbook", why: "Detailed financial data presentation. Deal flow tables. Reference for data-heavy views." },
];

const KILLED = [
  { name: "Mono", reason: '"Too general." The monospace-first, terminal-inspired direction felt interchangeable with any SaaS startup. No brand identity, no personality.' },
  { name: "Ledger", reason: "Conviction over decoration. Notion-energy minimal layouts. Technically clean, but the client explicitly rejected restraint — they want brand presence." },
  { name: "Blueprint", reason: "Engineering-forward, grid overlays, technical aesthetics. Too cold, too niche. Investment bankers won't trust a platform that looks like a CAD tool." },
  { name: "Pastel Soft Tones", reason: 'The consumer fintech look — Revolut-adjacent, friendly, approachable. But CMM serves institutional desks, and soft colours signal "toy."' },
];

const COLORS = [
  { name: "Brand Primary", val: "#3E149C" },
  { name: "Brand Light", val: "#6B4CC0" },
  { name: "Signal / Orange", val: "#FCA311" },
  { name: "Background", val: "#FAFAFD" },
  { name: "Foreground", val: "#0C0A1D" },
  { name: "Positive", val: "#059669" },
  { name: "Negative", val: "#DC2626" },
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
  ["--shadow-*", "rgba(62,20,156,x)", "Brand-tinted shadows — even elevation carries identity"],
] as const;

const STACK = [
  ["Framework", "Next.js 16", "App Router, server components by default. The data is the product; ship it rendered."],
  ["UI", "React 19", "Server Components for every entity view — no client bundle for reading data."],
  ["Styling", "Tailwind v4", "@theme tokens map 1:1 onto the Dense design system. One source of truth."],
  ["Auth", "Clerk", "Middleware marks the public surface; protected pages call auth.protect() server-side."],
  ["Structure", "Domain folders", "content / directory / entity / events / feed / insights / landing / layout / ui."],
] as const;

const DOMAINS = [
  { name: "Insights", detail: "Research index and article reader. Long-form market analysis with source formatting and contributor attribution." },
  { name: "Directory", detail: "The entity database — company profiles, financials, filterable index. The core of the platform." },
  { name: "Feed", detail: "Aggregated market news with per-item detail views. The Yahoo Finance role, done in Dense." },
  { name: "Events", detail: "Upcoming and past events, speaker profiles, session detail. Four route shapes on one system." },
  { name: "Contributors", detail: "Analyst and author profiles linking back to their published research." },
  { name: "Account", detail: "Tier state, profile, and access management. Gated behind Clerk." },
];

const OUTCOMES = [
  { num: "18", label: "Routes Shipped", desc: "Insights, directory, feed, events, contributors, account, auth and legal — all live." },
  { num: "67", label: "Components", desc: "Organised into nine domain folders rather than by file type. Every one reads the same tokens." },
  { num: "80+", label: "Design Tokens", desc: "Colours, typography, spacing, shadows, radii, easing — brand-tinted and production-ready." },
];

export default function CMMCaseStudy() {
  return (
    <CaseStudy slug="cmm">
      <p className="cs-eyebrow">Case study / Capital Markets Mongolia</p>
      <h1>
        Designing Mongolia&apos;s first <i>AI-native</i> capital markets platform
      </h1>
      <p className="cs-lede">
        Capital Markets Mongolia needed an intelligence platform that could serve
        institutional desks and first-time investors from the same product. 910studio
        designed MarketIQ — from initial exploration, through a client workshop that
        killed four directions, to a Dense design system now carrying eighteen routes
        in production.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Capital Markets Mongolia" />
        <Meta label="executor" value="910studio" />
        <Meta label="timeline" value="9 weeks" />
        <Meta label="scope" value="Design System, Token Architecture, Frontend" />
        <Meta label="stack" value="Next.js 16 / React 19 / Tailwind v4 / Clerk" />
      </div>

      <Section num="01" label="The Challenge" title="No Bloomberg for Mongolia. No AlphaSense. Nothing.">
        <p>
          Mongolia&apos;s capital markets are growing fast — mining IPOs, foreign
          investment, cross-border deals — but the entire ecosystem runs on PDFs, email
          chains and Yahoo Finance tabs. There is no centralised intelligence platform.
          No entity database. No research hub. CMM, the country&apos;s leading capital
          markets advisory, wanted to build one from scratch.
        </p>
        <p>
          The problem isn&apos;t &quot;build a website.&quot; It&apos;s building
          credibility. The platform has to earn trust from institutional investors who
          live in Bloomberg terminals <em>and</em> from general users who have never
          seen a P/E ratio. Same product, same brand, two completely different density
          expectations.
        </p>
      </Section>

      <Section num="02" label="Phase 1 — Exploration" title="Building the visual vocabulary">
        <p>
          Before touching a single component we mapped the landscape: moodboards,
          typography pairings, colour systems and early component explorations.
        </p>

        <DemoFrame
          src="/demos/cmm/design-workshops/cmm-marketiq-moodboard.html"
          label="Phase 1 — Moodboard"
          tag="Interactive"
        />

        <div className="cs-grid cs-grid-2">
          <figure className="cs-frame">
            <Image src="/demos/cmm/assets/phase1-components.png" alt="Phase 1 component exploration" width={1120} height={630} />
            <figcaption className="cs-cap">
              <span>Early component library</span>
              <b>Phase 1</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src="/demos/cmm/assets/phase1-entity.png" alt="Phase 1 entity profile prototype" width={1120} height={630} />
            <figcaption className="cs-cap">
              <span>Entity profile prototype</span>
              <b>Phase 1</b>
            </figcaption>
          </figure>
        </div>

        <div className="cs-stack">
          <figure className="cs-frame">
            <Image src="/demos/cmm/assets/phase1-directions.png" alt="Three directions built for the workshop" width={1120} height={630} />
            <figcaption className="cs-cap">
              <span>Three complete directions, built for the workshop</span>
              <b>Phase 1</b>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section num="03" label="Discovery" title="How finance platforms earn trust">
        <p>
          We studied platforms across the density spectrum. The key insight: data
          density is a feature, not a problem, when the visual hierarchy is right.
        </p>
        <div className="cs-grid cs-grid-3">
          {REFS.map((r) => (
            <div key={r.name} className="cs-card">
              <span className="cs-kicker">{r.rank}</span>
              <h3>{r.name}</h3>
              <p>{r.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section num="04" label="Client Workshop" title="The client chose Dense">
        <p>
          We ran a structured workshop with CMM&apos;s leadership and put three complete
          directions in front of them: Editorial, Dense and Polished. They chose Dense
          without hesitation. Finance professionals gravitate toward information
          density — the thing we had assumed we would need to argue them out of.
        </p>

        <Quote cite="Client mandate — CMM leadership workshop, March 2026">
          Creative, sophisticated yet corp.
        </Quote>

        <figure className="cs-frame">
          <Image src="/demos/cmm/assets/moodboard.png" alt="Phase 2 moodboard" width={1120} height={630} />
          <figcaption className="cs-cap">
            <span>Refined direction after the workshop</span>
            <b>Workshop</b>
          </figcaption>
        </figure>
      </Section>

      <Section num="05" label="What We Killed" title="Four directions died so Dense could live">
        <p>Design is as much about what you reject as what you ship.</p>
        <div className="cs-grid cs-grid-2">
          {KILLED.map((k) => (
            <div key={k.name} className="cs-card killed">
              <span className="cs-kicker">Hard no</span>
              <h3>{k.name}</h3>
              <p>{k.reason}</p>
            </div>
          ))}
        </div>
        <Quote self cite="910studio design rationale">
          The directions that died weren&apos;t bad design — they were the wrong
          context. Ledger would be fire for a dev tool. For a Mongolian capital markets
          platform that has to earn trust from bankers, Dense was the only answer.
        </Quote>
      </Section>

      <Section num="06" label="Design Philosophy" title="Western structure meets Eastern density">
        <p>
          The client specifically asked for a blend of Western and Eastern UI. Western
          finance platforms prioritise whitespace and hierarchy; Eastern platforms pack
          information and use colour as a navigation system. Dense lives at the
          intersection.
        </p>
        <div className="cs-grid cs-grid-2">
          <div className="cs-card">
            <span className="cs-kicker">Western influence — structure</span>
            <p>AlphaSense-grade readability — measured whitespace even in dense layouts.</p>
            <p>Clean typographic hierarchy — Plus Jakarta Sans for authority, DM Sans for comfort.</p>
            <p>Professional component design — buttons, badges and cards follow Western SaaS conventions.</p>
            <p>Measured spacing rhythm — 32px section gaps, 12px grid gaps, 14px card padding.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Eastern influence — density</span>
            <p>Prominent colour coding — red/green for financial data is non-negotiable in Asian markets.</p>
            <p>Category badges as primary navigation — colour-coded tags guide scanning.</p>
            <p>Higher information density — 4-column grids, 38px table rows, compact stat blocks.</p>
            <p>Bold brand colour throughout — every surface whispers purple.</p>
          </div>
        </div>
      </Section>

      <Section num="07" label="The Dense Direction" title="Bloomberg conviction, CMM identity">
        <p>
          Dense packs maximum information per pixel without sacrificing readability. 4px
          radii. 12px grid gaps. Compact 34px buttons. Every surface carries the brand
          through purple-tinted shadows and lavender headers.
        </p>
        <Swatches colors={COLORS} />
        <DemoFrame
          src="/demos/cmm/design-workshops/cmm-v1-design-system.html"
          label="Production Design System"
          tag="Interactive"
          height={700}
        />
      </Section>

      <Section num="08" label="Token Architecture" title="The system behind the system">
        <p>
          Every component references the same set of CSS custom properties. Change one
          token and every surface updates — which is what made the jump from prototype
          to eighteen production routes survivable.
        </p>
        <Table head={["Token", "Value", "Why"]} rows={TOKENS} />
      </Section>

      <Section num="09" label="Production" title="From chosen direction to shipped product">
        <p>
          Dense stopped being a prototype. The design system now backs a live Next.js 16
          application: 67 components organised into nine domain folders, server
          components by default, and Clerk middleware marking the public surface while
          protected pages call <code>auth.protect()</code> server-side.
        </p>
        <div className="cs-grid cs-grid-3">
          {DOMAINS.map((d) => (
            <div key={d.name} className="cs-card">
              <span className="cs-kicker">Domain</span>
              <h3>{d.name}</h3>
              <p>{d.detail}</p>
            </div>
          ))}
        </div>
        <Table head={["Layer", "Choice", "Why"]} rows={STACK} />
        <DemoFrame
          src="/demos/cmm/demo-pages/insights-index.html#dense"
          label="Insights Index"
          variant="dense"
        />
      </Section>

      <Section num="10" label="Access Architecture" title="One Dense system, three access tiers">
        <p>
          The Dense direction scales across three user tiers. Same brand, same tokens —
          information access increases as users commit. What began as a design decision
          is now enforced in middleware.
        </p>
        <div className="cs-grid cs-grid-3">
          <div className="cs-card">
            <span className="cs-kicker">Public tier</span>
            <h3>Free</h3>
            <p>An attractive entry point. Key data visible, advanced metrics blurred. No session required.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Registered tier</span>
            <h3>Registered</h3>
            <p>Full entity profiles, basic charts, financial summaries. Clerk session required.</p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Premium tier</span>
            <h3>Paid</h3>
            <p>Everything unlocked — AI insights, multi-metric rows, export tools.</p>
          </div>
        </div>
      </Section>

      <Section num="11" label="Outcome" title="Shipped.">
        <p>
          From a blank brief to a production direction in three weeks, and from that
          direction to a live platform. A structured workshop validated Dense; a
          complete token system made it survive contact with eighteen routes.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
