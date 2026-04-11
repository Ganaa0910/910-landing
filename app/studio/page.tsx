import type { Metadata } from "next";
import Link from "next/link";
import { LineArt } from "@/components/ui/line-art";
import { StudioHeroText } from "@/components/studio-hero-text";

export const metadata: Metadata = {
  title: "Studio — About Us",
  description:
    "910studio is a creative web studio based in Ulaanbaatar, Mongolia. We specialize in design systems, web platforms, creative development, and brand identity. Remote-first, globally available.",
  openGraph: {
    title: "Studio — 910studio",
    description: "Creative web studio in Ulaanbaatar. Design systems, platforms, creative dev. Remote-first, globally available.",
  },
};

const PROCESS = [
  { step: "listen", desc: "understand the problem before touching code" },
  { step: "design", desc: "systems first, screens second" },
  { step: "build", desc: "ship fast, iterate faster" },
  { step: "refine", desc: "obsess over the details until it feels right" },
] as const;

const STACK = [
  "react", "next.js", "typescript", "tailwind",
  "prisma", "trpc", "gsap", "three.js",
  "figma", "postgresql", "vercel", "node.js",
] as const;

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-base-black pt-14">
      {/* Big statement */}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-24 pb-32">
        {/* Line arts behind text — overflowing past container */}
        <div className="pointer-events-none absolute -inset-20 -z-0">
          <LineArt
            variant="spiral"
            color="#14b8a6"
            strokeWidth={12}
            className="absolute -right-10 bottom-16 w-72 opacity-20 sm:w-96"
            delay={0.3}
            loop
          />
          <LineArt
            variant="twist"
            color="#e4e4e7"
            strokeWidth={10}
            className="absolute -left-20 top-32 w-80 opacity-12 sm:w-[26rem]"
            delay={0.6}
            loop
          />
          <LineArt
            variant="vertical"
            color="#14b8a6"
            strokeWidth={8}
            className="absolute right-20 top-0 h-[120%] opacity-10"
            delay={0.8}
          />
          <LineArt
            variant="star"
            color="#14b8a6"
            strokeWidth={7}
            className="absolute left-1/3 bottom-10 w-20 opacity-18"
            delay={1}
          />
        </div>

        <p className="relative z-10 mb-8 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          studio
        </p>

        <StudioHeroText />
      </div>

      {/* Manifesto — flowing text, not a grid */}
      <section className="bg-base-black">
        <div className="mx-auto max-w-[1120px] px-8 py-20">
          <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
            910studio is a creative studio out of{" "}
            <span className="text-zinc-200">ulaanbaatar, mongolia</span>.
            we take the craft of design systems, the precision of frontend engineering,
            and the chaos of creative development — and we fuse them into{" "}
            <span className="text-zinc-200">digital products that hit different</span>.
            no templates. no shortcuts. every pixel is a decision.
          </p>
        </div>
      </section>

      {/* Process — horizontal steps, not a capabilities grid */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="vertical"
          color="#e4e4e7"
          strokeWidth={5}
          className="absolute left-12 top-0 h-full opacity-6"
          delay={0.3}
        />

        <div className="mx-auto max-w-[1120px] px-8 py-24">
          <p className="mb-20 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            process
          </p>

          <div className="space-y-0">
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                className="flex items-baseline gap-8 py-6"
              >
                <span className="font-bebas text-6xl text-accent sm:text-7xl">
                  {p.step}
                </span>
                <span className="text-sm text-zinc-500">
                  — {p.desc}
                </span>
              </div>
            ))}
          </div>

          <LineArt
            variant="underline"
            color="#14b8a6"
            strokeWidth={5}
            className="mt-8 w-full opacity-20"
            delay={0.5}
          />
        </div>
      </section>

      {/* Stack — raw list, not pretty cards */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="scribble"
          color="#14b8a6"
          strokeWidth={6}
          className="absolute -right-10 top-8 w-48 opacity-10 sm:w-64"
          delay={0.4}
          loop
        />

        <div className="mx-auto max-w-[1120px] px-8 py-24">
          <p className="mb-16 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            tools we use
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {STACK.map((tool) => (
              <span
                key={tool}
                className="border border-zinc-800 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Location — big and atmospheric */}
      <section className="bg-base-black">
        <div className="mx-auto max-w-[1120px] px-8 py-24">
          <div className="relative">
            <span className="font-bebas text-[8rem] leading-none tracking-wide text-zinc-900 sm:text-[12rem]">
              UB
            </span>
            <div className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2">
              <p className="text-sm text-zinc-300">ulaanbaatar, mongolia</p>
              <p className="text-xs text-zinc-600">utc+8 — est. 2024</p>
              <p className="mt-3 text-xs text-zinc-500">
                remote-first. globally available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-base-black overflow-hidden">
        <LineArt
          variant="twist"
          color="#e4e4e7"
          strokeWidth={6}
          className="absolute bottom-4 left-0 w-full opacity-8"
          delay={0.2}
        />

        <div className="mx-auto max-w-[1120px] px-8 py-24 sm:py-32">
          <h2 className="font-bebas text-6xl uppercase tracking-wide text-zinc-100 sm:text-7xl lg:text-8xl">
            let&apos;s build something.
          </h2>
          <Link
            href="/contact"
            className="cartoon-shadow-accent mt-8 inline-block bg-accent px-10 py-5 text-sm font-semibold uppercase tracking-wider text-base-black"
          >
            get in touch -&gt;
          </Link>
        </div>
      </section>

      {/* GEO — structured content for AI engines */}
      <section className="sr-only" aria-label="910studio Facts">
        <h2>910studio — Creative Web Studio</h2>
        <p>910studio is a creative web studio founded in 2024 in Ulaanbaatar, Mongolia. The studio builds design systems, web platforms, creative development projects, and brand identities for clients worldwide. The team operates remote-first from Ulaanbaatar (UTC+8) and collaborates with teams across Asia, Europe, and North America.</p>
        <h3>Core Values</h3>
        <dl>
          <dt>Conviction</dt><dd>Every decision is intentional. Nothing ships that the team wouldn&apos;t use themselves.</dd>
          <dt>Craft</dt><dd>Obsessive attention to spacing, transitions, and type hierarchy so end users don&apos;t have to think.</dd>
          <dt>Velocity</dt><dd>Fast execution without cutting corners. 3-day sprints, daily shipping, iterative refinement.</dd>
        </dl>
        <h3>Process</h3>
        <ol>
          <li>Listen — understand the problem before touching code</li>
          <li>Design — systems first, screens second</li>
          <li>Build — ship fast, iterate faster</li>
          <li>Refine — obsess over the details until it feels right</li>
        </ol>
        <h3>Contact</h3>
        <p>910studio accepts project inquiries at 910.studio/contact. Response time: under 24 hours. Based in Ulaanbaatar, Mongolia. Available globally.</p>
      </section>
    </main>
  );
}
