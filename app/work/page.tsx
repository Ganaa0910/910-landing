import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink } from "@/components/nav/page-shell";
import { PROJECTS } from "@/lib/projects";
import { RackFocus } from "@/components/work/rack-focus";

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
        {/* Kept to one band. The rack is what this page is for, and a
            masthead that pushes it below the fold makes the reader scroll
            before they can reach a single thing worth clicking. Title and
            lede sit side by side rather than stacked for the same reason. */}
        <header className="work-masthead">
          <div>
            <p className="eyebrow">Work</p>
            <h1>
              Four projects, <i>all shipped.</i>
            </h1>
          </div>
          <p className="work-lede">
            We would rather show you a few things properly than list thirty.
            Each went from a blank file to production.
          </p>
        </header>

        {/* Filed like cases in a rack rather than listed. Each card is pulled
            up over the one before it by exactly the height of its artwork, so
            all you see at rest is the spine; hovering one pushes the rest of
            the stack down and opens it. Flat — no tilt, no perspective —
            because everything else on this site is orthographic.

            .work-item has to stay on these: lib/reel/engine.ts measures the
            first and last of them every frame to place the object's rail and
            counts them for its checkpoints. Rename it and the indicator on
            the right goes dead. */}
        <RackFocus />

        <div className="work-stack">
          {PROJECTS.map((project, i) => (
            <TransitionLink key={project.slug} href={`/work/${project.slug}`} className="work-item">
              <span className="work-spine">
                <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-name">
                  <h2>{project.title}</h2>
                  <span className="work-scope">{project.scope.join(" · ")}</span>
                </span>
                <span className="work-year">{project.year}</span>
                <span className="work-go" aria-hidden="true">→</span>
              </span>

              {/* No caption. The spine already says whose it is and what we
                  did; a paragraph over the artwork was competing with the
                  work for the one moment the reader is actually looking at
                  it. The description lives on the case study, where there is
                  room for it. */}
              <span className="work-art">
                <Image
                  src={project.image}
                  alt={`${project.title} — case study`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 1180px) 100vw, 1180px"
                  priority={i === 0}
                />
              </span>
            </TransitionLink>
          ))}
        </div>

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
