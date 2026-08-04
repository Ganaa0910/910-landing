import type { Metadata } from "next";
import { TransitionLink } from "@/components/nav/page-shell";
import { PROJECTS } from "@/lib/projects";
import { CoverFlow } from "@/components/work/cover-flow";

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
        {/* Cover flow, scrubbed by the page's own scroll. Hover made the
            reader hunt, and a component with its own wheel handler fights
            both the page scroller and every input that is not a mouse.

            .work-item has to stay on the covers: lib/reel/engine.ts counts
            them for the indicator's checkpoints. Its POSITION now comes from
            --work-p, which the gallery publishes — a horizontal row gives
            every card the same top, so the old vertical measurement would
            read a span of zero and park the object forever. */}
        <CoverFlow
          projects={PROJECTS}
          header={
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
          }
        />

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
