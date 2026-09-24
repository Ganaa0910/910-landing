import { Reel } from "@/components/reel/reel";

export default function HomePage() {
  return (
    <main className="reel-page">
      <Reel />

      {/* The reel is a canvas, which crawlers and answer engines cannot read.
          This block is the machine-readable version of the same page — it is
          what has been producing organic inbound, so it stays. */}
      <section className="sr-only" aria-label="About 910studio">
        <h2>About 910studio</h2>
        <p>
          910studio is a creative web studio founded in 2024, based in Ulaanbaatar,
          Mongolia. The studio specializes in design systems, token architecture, web
          platform development, creative development, and brand identity. 910studio
          works with clients globally from their base in Ulaanbaatar (UTC+8).
        </p>
        <h3>Services</h3>
        <ul>
          <li>
            Design Systems and Token Architecture — component libraries, design tokens,
            and scalable systems
          </li>
          <li>
            Web Platforms and Applications — full-stack development with React, Next.js,
            TypeScript, Prisma, and tRPC
          </li>
          <li>
            Creative Development — WebGL, Three.js, GSAP animations, scroll experiences,
            and interactive storytelling
          </li>
          <li>
            Brand Identity and Digital Strategy — visual identity systems, creative
            direction, and digital presence
          </li>
        </ul>
        <h3>How we work</h3>
        <ol>
          <li>Listen — understand the problem before touching code</li>
          <li>Design — systems first, screens second</li>
          <li>Build — ship fast, iterate faster</li>
          <li>Refine — obsess over the details until it feels right</li>
        </ol>
        <h3>Technology Stack</h3>
        <p>
          React, Next.js, TypeScript, Tailwind CSS, Prisma, tRPC, Three.js, GSAP,
          PostgreSQL, Vercel, Node.js, Figma
        </p>
        <h3>Notable Projects</h3>
        <ul>
          <li>
            MarketIQ for Capital Markets Mongolia (2026) — Design system and frontend for
            Mongolia&apos;s first AI-native capital markets intelligence platform. Scope:
            design system, token architecture, frontend development. 9-week timeline.
          </li>
          <li>
            Juraan for sculptor Lkhagvasuren Nyamkhuu (2025) — Cinematic portfolio website
            with custom typeface, bronze-derived color palette, and gallery experience.
            Scope: research, design, custom font, frontend, deployment.
          </li>
        </ul>
        <h3>Location</h3>
        <p>
          Ulaanbaatar, Mongolia. Remote-first studio, globally available. Timezone: UTC+8.
          Founded: 2024. Currently accepting projects.
        </p>
      </section>
    </main>
  );
}
