import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink } from "@/components/nav/page-shell";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Selected Projects",
  description:
    "Selected work from 910studio: design systems, web platforms and creative development. Case studies from a creative web studio in Ulaanbaatar, Mongolia.",
  openGraph: {
    title: "Work — 910studio",
    description:
      "Design systems, web platforms and creative development. Read the case studies.",
  },
};

export default function WorkPage() {
  return (
    <main className="work-page">
      <div className="work-wrap">
        <p className="eyebrow">Work</p>
        <h1>
          Two projects,
          <br />
          <i>both shipped.</i>
        </h1>
        <p className="work-lede">
          We would rather show you two things properly than list ten. Each of
          these went from a blank file to production — research, design system,
          frontend, deploy.
        </p>

        {PROJECTS.map((project, i) => (
          <TransitionLink key={project.slug} href={`/work/${project.slug}`} className="work-item">
            <div className="work-head">
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{project.title}</h2>
            </div>

            <div className="work-meta">
              <span>
                <b>{project.client}</b>
              </span>
              <span>{project.scope.join(" · ")}</span>
              <span>{project.year}</span>
            </div>

            <p className="work-desc">{project.description}</p>

            <div className="work-shot">
              <Image
                src={project.image}
                alt={`${project.title} — case study`}
                width={1600}
                height={900}
                sizes="(max-width: 1180px) 100vw, 1180px"
                priority={i === 0}
              />
            </div>

            <span className="work-go">
              Read the case study <span aria-hidden="true">→</span>
            </span>
          </TransitionLink>
        ))}

        <div className="work-tail">
          <p>More coming — we take on a handful of projects a year.</p>
          <TransitionLink className="cta" href="/contact">
            Start a project →
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
