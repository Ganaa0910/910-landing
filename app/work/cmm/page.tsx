import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { LazyDemoFrame } from "./lazy-iframe";
import "./casestudy.css";

function ImageFrame({ src, alt, caption, tag }: { src: string; alt: string; caption: string; tag: string }) {
  return (
    <div className="frame">
      <Image src={src} alt={alt} width={1120} height={630} style={{ width: "100%", height: "auto" }} />
      <div className="frame-caption">
        {caption}
        <span className="tag">{tag}</span>
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

export default function CMMCaseStudy() {
  return (
    <div className="cs-page">
      <ScrollReveal />

      {/* NAV */}
      <nav className="cs-nav">
        <div className="cs-nav-inner">
          <div className="cs-nav-logo">910 <span>Case Study</span></div>
          <Link href="/work" className="cs-nav-back">Back to Work</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="rv">
            <div className="hero-label">910 Case Study / Capital Markets Mongolia</div>
            <h1>Designing Mongolia&apos;s first <em>AI-native</em> capital markets platform</h1>
            <p className="hero-desc">Capital Markets Mongolia needed an intelligence platform that could serve finance professionals and general investors alike. 910studio designed MarketIQ — from initial exploration through client workshop to a production-ready Dense direction that became the foundation of the entire product.</p>
          </div>
          <div className="hero-meta rv">
            <div><div className="meta-label">Client</div><div className="meta-val">Capital Markets Mongolia</div></div>
            <div><div className="meta-label">Executor</div><div className="meta-val">910studio</div></div>
            <div><div className="meta-label">Timeline</div><div className="meta-val">9 Weeks</div></div>
            <div><div className="meta-label">Scope</div><div className="meta-val">Design System, Token Architecture, Frontend</div></div>
          </div>
        </div>
      </section>

      {/* 01 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">01 / The Challenge</div>
            <h2>No Bloomberg for Mongolia. No AlphaSense. Nothing.</h2>
          </div>
          <div className="rv">
            <p className="section-text">Mongolia&apos;s capital markets are growing fast — mining IPOs, foreign investment, cross-border deals — but the entire ecosystem runs on PDFs, email chains, and Yahoo Finance tabs. There is no centralized intelligence platform. No entity database. No research hub. CMM, the country&apos;s leading capital markets advisory, wanted to build one from scratch.</p>
            <p className="section-text">The problem isn&apos;t just &quot;build a website.&quot; It&apos;s building credibility. The platform needs to earn trust from institutional investors who live in Bloomberg terminals AND general users who&apos;ve never seen a P/E ratio. Same product, same brand, two completely different density expectations. That tension is the entire design challenge.</p>
          </div>
        </div>
      </section>

      {/* 02 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">02 / Phase 1 — Exploration</div>
            <h2>Building the visual vocabulary</h2>
            <p className="section-text">Before touching a single component, we mapped the landscape. Moodboards, typography pairings, color systems, and early component explorations. The goal was to build a shared visual language before the client workshop — give them something to react to, not just describe.</p>
          </div>
          <div className="rv" style={{ marginBottom: 24 }}>
            <LazyDemoFrame src="/demos/cmm/design-workshops/cmm-marketiq-moodboard.html" label="Phase 1 — Moodboard" tag="Interactive" />
          </div>
          <div className="grid-2 rv" style={{ marginBottom: 24 }}>
            <ImageFrame src="/demos/cmm/assets/phase1-components.png" alt="Phase 1 component exploration" caption="Early component library — buttons, badges, cards, tables" tag="Phase 1" />
            <ImageFrame src="/demos/cmm/assets/phase1-entity.png" alt="Phase 1 entity profile exploration" caption="Entity profile prototype — first layout tests" tag="Phase 1" />
          </div>
          <div className="rv">
            <ImageFrame src="/demos/cmm/assets/phase1-directions.png" alt="Three component directions" caption="Three directions built for workshop — Editorial, Dense, Polished" tag="Phase 1" />
          </div>
        </div>
      </section>

      {/* 03 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">03 / Discovery</div>
            <h2>How finance platforms earn trust</h2>
            <p className="section-text">We studied platforms across the density spectrum — from editorial-first to terminal-grade. The key insight: data density is a feature, not a problem, when visual hierarchy is right.</p>
          </div>
          <div className="ref-grid rv">
            {REFS.map((r) => (
              <div key={r.name} className="ref-card">
                <div className="ref-rank">{r.rank}</div>
                <div className="ref-name">{r.name}</div>
                <div className="ref-why">{r.why}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">04 / Client Workshop</div>
            <h2>The client chose Dense</h2>
            <p className="section-text">We ran a structured workshop with CMM&apos;s leadership — reference point ranking, moodboard reactions, and direction comparison. We presented three complete directions: Editorial, Dense, and Polished.</p>
            <p className="section-text">The client chose Dense as MarketIQ&apos;s main direction. Finance professionals gravitate toward information density. The mandate: &quot;Creative, Sophisticated yet Corp.&quot;</p>
          </div>
          <div className="quote-block rv">
            <p className="quote-text">&quot;Creative, Sophisticated yet Corp&quot; — data density is the feature, brand color is the identity, motion is the experience.</p>
            <p className="quote-attr">Client mandate — CMM leadership workshop, March 2026</p>
          </div>
          <div className="rv">
            <ImageFrame src="/demos/cmm/assets/moodboard.png" alt="Phase 2 moodboard" caption="Phase 2 moodboard — refined direction after workshop feedback" tag="Workshop" />
          </div>
        </div>
      </section>

      {/* 05 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">05 / What We Killed</div>
            <h2>Four directions died so Dense could live</h2>
            <p className="section-text">Design is as much about what you reject as what you ship. The workshop killed four directions — each with clear reasoning from the client.</p>
          </div>
          <div className="killed-grid rv">
            {KILLED.map((k) => (
              <div key={k.name} className="killed-card">
                <div className="killed-label">Hard No</div>
                <div className="killed-name">{k.name}</div>
                <div className="killed-reason">{k.reason}</div>
              </div>
            ))}
          </div>
          <div className="quote-block rv">
            <p className="quote-text">The directions that died weren&apos;t bad design — they were wrong context. Ledger would be fire for a dev tool. But for a Mongolian capital markets platform that needs to earn trust from bankers? Dense was the only answer.</p>
            <p className="quote-attr">910studio design rationale</p>
          </div>
        </div>
      </section>

      {/* 06 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">06 / Design Philosophy</div>
            <h2>Western structure meets Eastern density</h2>
            <p className="section-text">The client specifically requested a blend of Western and Eastern UI design. Western finance platforms prioritize whitespace and hierarchy. Eastern platforms pack information and use color as a navigation system. Dense lives at the intersection.</p>
          </div>
          <div className="phil-grid rv">
            <div className="phil-col west">
              <h4>Western Influence <span className="pill pill-w">Structure</span></h4>
              <div className="phil-item">AlphaSense-grade readability — measured whitespace even in dense layouts</div>
              <div className="phil-item">Clean typography hierarchy — Plus Jakarta Sans for authority, DM Sans for comfort</div>
              <div className="phil-item">Professional component design — buttons, badges, cards follow Western SaaS conventions</div>
              <div className="phil-item">Measured spacing rhythm — 32px section gaps, 12px grid gaps, 14px card padding</div>
            </div>
            <div className="phil-col east">
              <h4>Eastern Influence <span className="pill pill-e">Density</span></h4>
              <div className="phil-item">Prominent color coding — red/green for financial data is non-negotiable in Asian markets</div>
              <div className="phil-item">Category badges as primary navigation — color-coded tags guide scanning, not just labeling</div>
              <div className="phil-item">Higher information density — 4-column grids, 38px table rows, compact stat blocks</div>
              <div className="phil-item">Bold brand color throughout — every surface whispers purple, not just accent elements</div>
            </div>
          </div>
          <div className="narrow rv">
            <p className="section-text">Mongolia sits between these two worlds. Dense doesn&apos;t compromise between them — it uses Western hierarchy to organize Eastern density. The result feels familiar to both audiences without cosplaying either.</p>
          </div>
        </div>
      </section>

      {/* 07 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">07 / The Dense Direction</div>
            <h2>Bloomberg conviction, CMM identity</h2>
            <p className="section-text">Dense packs maximum information per pixel without sacrificing readability. 4px radii. 12px grid gaps. Compact 34px buttons. Uppercase badges with 0.06em tracking. Every surface carries the brand through purple-tinted shadows and lavender backgrounds.</p>
          </div>
          <div className="tokens-grid rv">
            <div className="token-group">
              <h4>Color System</h4>
              {COLORS.map((c) => (
                <div key={c.val + c.name} className="color-row">
                  <div className="color-swatch" style={{ background: c.bg }} />
                  <div className="color-name">{c.name}</div>
                  <div className="color-val">{c.val}</div>
                </div>
              ))}
            </div>
            <div className="token-group">
              <h4>Typography</h4>
              <div className="type-row"><div className="type-sample" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2 }}>Page Title</div><div className="type-meta">Plus Jakarta Sans 800<br />32px / -0.025em</div></div>
              <div className="type-row"><div className="type-sample" style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Section Heading</div><div className="type-meta">Plus Jakarta Sans 700<br />20px / -0.02em</div></div>
              <div className="type-row"><div className="type-sample" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Card Title</div><div className="type-meta">Plus Jakarta Sans 600<br />15px</div></div>
              <div className="type-row"><div className="type-sample" style={{ fontFamily: "var(--font-b)", fontSize: "0.9375rem" }}>Body text reads like this across the platform</div><div className="type-meta">DM Sans 400<br />15px / 1.6 lh</div></div>
              <div className="type-row"><div className="type-sample" style={{ fontFamily: "var(--font-m)", fontSize: "0.8125rem", fontWeight: 500 }}>₮4,280.00 +2.4%</div><div className="type-meta">JetBrains Mono 500<br />13px / tabular</div></div>
              <div className="type-row"><div className="type-sample" style={{ fontFamily: "var(--font-m)", fontSize: "0.6875rem", fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#3E149C" }}>Section Label</div><div className="type-meta">JetBrains Mono 500<br />11px / 0.1em</div></div>
            </div>
          </div>
          <div className="rv">
            <LazyDemoFrame src="/demos/cmm/design-workshops/cmm-v1-design-system.html" label="Production Design System" tag="Interactive" height={700} />
          </div>
        </div>
      </section>

      {/* 08 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">08 / Token Architecture</div>
            <h2>The system behind the system</h2>
            <p className="section-text">The Dense direction isn&apos;t a collection of styles — it&apos;s a token architecture. Every component references the same set of CSS custom properties. Change one token, every surface updates.</p>
          </div>
          <div className="rv"><h4 style={{ fontFamily: "var(--font-d)", fontWeight: 700, fontSize: "0.9375rem", marginBottom: 16 }}>The Three-Font System</h4></div>
          <div className="font-grid rv">
            <div className="font-card"><div className="font-card-role">Display</div><div className="font-card-sample" style={{ fontFamily: "var(--font-d)" }}>Erdene Resource</div><div className="font-card-name">Plus Jakarta Sans</div><div className="font-card-desc">Geometric precision with personality. 800 weight for heroes, 600-700 for UI.</div></div>
            <div className="font-card"><div className="font-card-role">Body</div><div className="font-card-sample" style={{ fontFamily: "var(--font-b)", fontWeight: 400 }}>Research &amp; analysis</div><div className="font-card-name">DM Sans</div><div className="font-card-desc">Optical sizing makes it readable at any scale. AlphaSense-grade legibility.</div></div>
            <div className="font-card"><div className="font-card-role">Data</div><div className="font-card-sample" style={{ fontFamily: "var(--font-m)", fontWeight: 500 }}>₮4,280 +2.4%</div><div className="font-card-name">JetBrains Mono</div><div className="font-card-desc">Tabular figures, consistent character width. Prices, tickers, percentages.</div></div>
          </div>
          <div className="rv"><h4 style={{ fontFamily: "var(--font-d)", fontWeight: 700, fontSize: "0.9375rem", marginBottom: 16 }}>Dense Component Tokens</h4></div>
          <div className="rv">
            <table className="token-table">
              <thead><tr><th>Token</th><th>Value</th><th>Why</th></tr></thead>
              <tbody>
                {TOKENS.map(([token, val, why]) => (
                  <tr key={token}><td>{token}</td><td>{val}</td><td>{why}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="narrow rv">
            <p className="section-text">Every shadow is tinted purple. Every surface carries a lavender hint. The border color isn&apos;t gray — it&apos;s <span style={{ fontFamily: "var(--font-m)", fontSize: "0.8125rem" }}>#DDDBE8</span>, a purple-shifted neutral. The branding is the entire system.</p>
          </div>
        </div>
      </section>

      {/* 09 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">09 / Production Pages</div>
            <h2>Four page types, one Dense system</h2>
            <p className="section-text">Every page in MarketIQ shares the Dense token system. These are live, interactive demos — scroll, hover, click.</p>
          </div>
          <div className="rv">
            <LazyDemoFrame src="/demos/cmm/demo-pages/insights-index.html#dense" label="Insights Index" />
          </div>
        </div>
      </section>

      {/* 10 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">10 / Access Architecture</div>
            <h2>One Dense system, three access tiers</h2>
            <p className="section-text">The Dense direction scales across three user tiers. Same brand, same tokens — information access increases as users commit. Density is the reward.</p>
          </div>
          <div className="outcome-grid rv">
            <div className="outcome-card"><div className="outcome-num" style={{ color: "var(--fg-3)" }}>Free</div><div className="outcome-label">Public Tier</div><div className="outcome-desc">Attractive entry point. Key data visible, advanced metrics blurred with registration CTA.</div></div>
            <div className="outcome-card"><div className="outcome-num" style={{ color: "var(--brand-l)" }}>Registered</div><div className="outcome-label">Registered Tier</div><div className="outcome-desc">Full profiles, basic charts, financial summaries. Functional and data-forward.</div></div>
            <div className="outcome-card"><div className="outcome-num">Paid</div><div className="outcome-label">Premium Tier</div><div className="outcome-desc">Everything unlocked. AI insights, multi-metric rows, compact stat grids, export tools, alerts.</div></div>
          </div>
        </div>
      </section>

      {/* 11 */}
      <section className="section">
        <div className="wrap">
          <div className="rv">
            <div className="section-label">11 / Outcome</div>
            <h2>Shipped</h2>
            <p className="section-text">From blank brief to production direction in three weeks. A structured client workshop validated the Dense direction. A complete token system powers every surface. The Dense direction is now the foundation of MarketIQ&apos;s production frontend.</p>
          </div>
          <div className="outcome-grid rv">
            <div className="outcome-card"><div className="outcome-num">4</div><div className="outcome-label">Page Prototypes</div><div className="outcome-desc">Fully interactive HTML demos with real Mongolian market data.</div></div>
            <div className="outcome-card"><div className="outcome-num">80+</div><div className="outcome-label">Design Tokens</div><div className="outcome-desc">Colors, typography, spacing, shadows, radii, easing — all brand-tinted, all production-ready.</div></div>
            <div className="outcome-card"><div className="outcome-num">3</div><div className="outcome-label">Access Tiers</div><div className="outcome-desc">Public, Registered, and Paid — density scales with commitment, identity stays consistent.</div></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cs-footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-logo">910studio</div>
            <div className="footer-text">Ulaanbaatar, Mongolia &middot; 2026</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
