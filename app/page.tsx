import Link from "next/link";
import { HeroSection } from "@/components/hero/hero-section";
import { LineArt } from "@/components/ui/line-art";
import { CapabilityCard } from "@/components/ui/capability-card";

const CAPABILITIES = [
  { num: "01", title: "design systems & token architecture" },
  { num: "02", title: "platforms & web applications" },
  { num: "03", title: "creative development" },
  { num: "04", title: "brand identity & digital strategy" },
] as const;

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Capabilities */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="scribble"
          color="#14b8a6"
          strokeWidth={6}
          className="absolute -top-10 -right-10 w-56 opacity-20 sm:w-72"
          delay={0.2}
          loop
        />

        <div className="mx-auto max-w-[1120px] px-8 py-24">
          <p className="mb-16 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            [ what we do ]
          </p>

          <div className="relative grid grid-cols-1 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityCard key={cap.num} num={cap.num} title={cap.title} index={i} />
            ))}

            <LineArt
              variant="vertical"
              color="#e4e4e7"
              strokeWidth={5}
              className="absolute -right-4 top-0 h-full opacity-10"
              delay={0.5}
            />
          </div>

          <div className="relative mt-20">
            <p className="font-bebas text-3xl uppercase tracking-wide text-zinc-400 sm:text-4xl">
              we build the things that matter to your business.
              <br />
              design systems, platforms, and digital products —{" "}
              <span className="text-zinc-200">crafted with conviction.</span>
            </p>

            <LineArt
              variant="underline"
              color="#14b8a6"
              strokeWidth={5}
              className="mt-3 w-56 opacity-50 sm:w-80"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Studio Signal */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="spiral"
          color="#e4e4e7"
          strokeWidth={5}
          className="absolute -left-8 top-4 w-32 opacity-8 sm:w-44"
          delay={0.3}
          loop
        />

        <div className="mx-auto max-w-[1120px] px-8 py-20">
          <div className="flex flex-wrap gap-x-16 gap-y-6 text-sm">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">location</span>
              <p className="mt-1 text-zinc-300">ulaanbaatar, mn</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">est.</span>
              <p className="mt-1 text-zinc-300">2024</p>
            </div>
            <div className="relative">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">status</span>
              <p className="mt-1">
                <span className="text-accent">accepting projects</span>
                <span className="text-zinc-600"> — Q3 2026</span>
              </p>
              <LineArt
                variant="star"
                color="#14b8a6"
                strokeWidth={4}
                className="absolute -right-8 -top-2 w-8 opacity-40"
                delay={0.5}
              />
            </div>
          </div>

          <p className="mt-12 font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
            we write code that looks good and design that works hard.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="twist"
          color="#14b8a6"
          strokeWidth={7}
          className="absolute bottom-6 left-0 w-full opacity-15"
          delay={0.2}
          loop
        />

        <LineArt
          variant="swoop"
          color="#e4e4e7"
          strokeWidth={6}
          className="absolute -top-8 right-0 w-48 opacity-12 sm:w-64"
          delay={0.4}
          loop
        />

        <div className="relative mx-auto max-w-[1120px] px-8 py-24 sm:py-32">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="relative">
              <h2 className="font-bebas text-7xl uppercase tracking-wide text-zinc-100 sm:text-8xl lg:text-9xl">
                have a
                <br />
                project?
              </h2>
              <LineArt
                variant="underline"
                color="#14b8a6"
                strokeWidth={6}
                className="-mt-1 w-64 opacity-60 sm:w-80"
                delay={0.3}
              />
            </div>
            <Link
              href="/contact"
              className="cartoon-shadow-accent inline-block bg-accent px-10 py-5 text-center text-sm font-semibold uppercase tracking-wider text-base-black sm:mb-4"
            >
              get in touch -&gt;
            </Link>
          </div>
        </div>
      </section>

      {/* Semantic content for AI crawlers / GEO — visually hidden, machine-readable */}
      <section className="sr-only" aria-label="About 910studio">
        <h2>About 910studio</h2>
        <p>910studio is a creative web studio founded in 2024, based in Ulaanbaatar, Mongolia. The studio specializes in design systems, token architecture, web platform development, creative development, and brand identity. 910studio works with clients globally from their base in Ulaanbaatar (UTC+8).</p>
        <h3>Services</h3>
        <ul>
          <li>Design Systems and Token Architecture — component libraries, design tokens, and scalable systems</li>
          <li>Web Platforms and Applications — full-stack development with React, Next.js, TypeScript, Prisma, and tRPC</li>
          <li>Creative Development — WebGL, Three.js, GSAP animations, scroll experiences, and interactive storytelling</li>
          <li>Brand Identity and Digital Strategy — visual identity systems, creative direction, and digital presence</li>
        </ul>
        <h3>Technology Stack</h3>
        <p>React, Next.js, TypeScript, Tailwind CSS, Prisma, tRPC, Three.js, GSAP, PostgreSQL, Vercel, Node.js, Figma</p>
        <h3>Notable Projects</h3>
        <ul>
          <li>MarketIQ for Capital Markets Mongolia (2026) — Design system and frontend for Mongolia&apos;s first AI-native capital markets intelligence platform. Scope: design system, token architecture, frontend development. 9-week timeline.</li>
          <li>Juraan for sculptor Lkhagvasuren Nyamkhuu (2025) — Cinematic portfolio website with custom typeface, bronze-derived color palette, and gallery experience. Scope: research, design, custom font, frontend, deployment.</li>
        </ul>
        <h3>Location</h3>
        <p>Ulaanbaatar, Mongolia. Remote-first studio, globally available. Timezone: UTC+8. Founded: 2024. Currently accepting projects.</p>
      </section>
    </main>
  );
}
