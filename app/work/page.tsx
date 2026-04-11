import Link from "next/link";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { LineArt } from "@/components/ui/line-art";

export const metadata: Metadata = {
  title: "Work — Selected Projects",
  description:
    "Portfolio of 910studio. Design systems, web platforms, and creative development projects. Case studies from Mongolia's leading creative web studio.",
  openGraph: {
    title: "Work — 910studio",
    description: "Design systems, web platforms, and creative development. See our case studies.",
  },
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-base-black pt-14">
      {/* Hero */}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-24 pb-20">
        <div className="pointer-events-none absolute -inset-16 -z-0">
          <LineArt
            variant="spiral"
            color="#14b8a6"
            strokeWidth={10}
            className="absolute -right-8 top-0 w-60 opacity-15 sm:w-80"
            delay={0.3}
            loop
          />
          <LineArt
            variant="zigzag"
            color="#e4e4e7"
            strokeWidth={7}
            className="absolute -left-12 bottom-0 w-48 opacity-10 sm:w-64"
            delay={0.6}
          />
        </div>

        <p className="relative z-10 mb-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          [ work ]
        </p>
        <h1 className="relative z-10 font-bebas text-7xl uppercase tracking-wide text-zinc-50 sm:text-8xl lg:text-9xl">
          the proof is
          <br />
          in the <span className="text-accent">pixels.</span>
        </h1>
        <p className="relative z-10 mt-6 text-sm leading-relaxed text-zinc-500">
          design systems, platforms, and digital experiences.
          each project built with conviction.
        </p>
      </div>

      {/* Projects */}
      <div className="mx-auto max-w-[1120px] px-8 pb-32">
        {PROJECTS.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative block"
          >
            {/* Pure typography card */}
            <div className="relative py-16 sm:py-24">
              {/* Project number + indicator line */}
              <div className="mb-6 flex items-center gap-4">
                <span className="font-bebas text-3xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-[3px] w-16 bg-accent transition-all duration-300 group-hover:w-32" />
              </div>

              {/* Giant project name */}
              <h2 className="font-bebas text-8xl uppercase tracking-wide text-zinc-100 transition-colors duration-300 group-hover:text-accent sm:text-9xl lg:text-[11rem]">
                {project.title}
              </h2>

              {/* Metadata row */}
              <div className="mt-6 flex flex-wrap items-baseline gap-x-12 gap-y-3">
                <span className="text-sm text-zinc-500">{project.client}</span>
                <span className="text-xs text-zinc-600">{project.scope.join(" / ").toLowerCase()}</span>
                <span className="text-xs text-zinc-700">{project.year}</span>
                <span className="flex items-center gap-2 text-sm text-accent transition-colors group-hover:text-accent-bright">
                  view case study
                  <span className="transition-transform duration-200 group-hover:translate-x-2">-&gt;</span>
                </span>
              </div>

              {/* Underline */}
              <LineArt
                variant="underline"
                color="#14b8a6"
                strokeWidth={5}
                className="mt-8 w-full opacity-20"
                delay={0.3 + i * 0.2}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state energy — when more work comes */}
      <div className="relative mx-auto max-w-[1120px] px-8 pb-24 overflow-hidden">
        <LineArt
          variant="twist"
          color="#e4e4e7"
          strokeWidth={8}
          className="absolute left-0 top-0 w-full opacity-8"
          delay={0.4}
          loop
        />

        <div className="relative z-10 text-center">
          <p className="font-bebas text-4xl uppercase tracking-wide text-zinc-800 sm:text-5xl">
            more coming soon.
          </p>
          <Link
            href="/contact"
            className="cartoon-shadow-accent mt-8 inline-block bg-accent px-10 py-5 text-sm font-semibold uppercase tracking-wider text-base-black"
          >
            start a project -&gt;
          </Link>
        </div>
      </div>
    </main>
  );
}
