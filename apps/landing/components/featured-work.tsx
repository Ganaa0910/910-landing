import Image from "next/image";
import { getFeaturedProjects } from "@910studio/ui";

const CASES_URL = "https://cases.910.studio";

// Landing carries its own optimized thumbnails — case study assets live on cases.910.studio.
const WORK_IMAGES: Record<string, string> = {
  juraan: "/featured/juraan.jpg",
  cmm: "/featured/cmm.png",
};

// Film-strip sprocket edge — a row of perforations
function SprocketEdge() {
  return (
    <div className="flex justify-between gap-2 overflow-hidden px-3 py-2">
      {Array.from({ length: 32 }).map((_, i) => (
        <span key={i} className="h-3 w-5 shrink-0 bg-paper/80" />
      ))}
    </div>
  );
}

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <section className="border-y-2 border-ink bg-base-black">
      <SprocketEdge />

      <div className="mx-auto max-w-[1120px] px-6 pb-10 pt-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              [ selected work ]
            </p>
            <h2 className="font-modak text-5xl leading-[0.92] text-paper sm:text-7xl">
              now
              <br />
              <span className="text-accent">showing.</span>
            </h2>
          </div>
          <a
            href={CASES_URL}
            className="hidden font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:text-accent sm:block"
          >
            all work ↗
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`${CASES_URL}/${project.slug}`}
              className="group block"
            >
              <div
                className="border-[3px] border-paper bg-zinc-900 shadow-[6px_6px_0_#3366ff] transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-[13px_13px_0_#3366ff]"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={WORK_IMAGES[project.slug]}
                    alt={`${project.title} — ${project.client}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 540px"
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-modak text-4xl leading-none text-paper transition-colors duration-200 group-hover:text-accent sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-zinc-400">
                  {project.client}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.scope.map((s) => (
                    <span
                      key={s}
                      className="border border-zinc-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                  view case study
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <SprocketEdge />
    </section>
  );
}
