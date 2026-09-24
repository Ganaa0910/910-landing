import type { Metadata } from "next";
import { TransitionLink } from "@/components/nav/page-shell";
import Image from "next/image";
import { PROJECTS, TOYS } from "@/lib/projects";
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

/* Spelled out, because "5 projects, all shipped" reads like a spec sheet.
   Past twelve the digit is fine — by then it is a quantity, not a boast. */
const WORDS = [
  "No", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];
const count = (n: number) => WORDS[n] ?? String(n);

export default function WorkPage() {
  return (
    <main className="work-page">
      <div className="work-wrap">
        {/* Cover flow, scrubbed by the page's own scroll. Hover made the
            reader hunt, and a component with its own wheel handler fights
            both the page scroller and every input that is not a mouse.

            .work-item has to stay on the covers: lib/reel/engine.ts counts
            them for the indicator's checkpoints. Its POSITION now comes from
            the work-progress store, which the gallery publishes — a
            horizontal row gives every card the same top, so the old vertical
            measurement would read a span of zero and park the object
            forever. */}
        <CoverFlow
          projects={PROJECTS}
          header={
            /* keyed on purpose. It is rendered inside .work-stage alongside
               the deck and the caption, which React treats as a list — and an
               element created in one component and placed in another's list
               with no key trips the missing-key warning. Nothing here is
               reordered; the key exists to say "this is the same node every
               render". */
            <header key="masthead" className="work-masthead">
            <div>
              <p className="eyebrow">Work</p>
              {/* counted, not typed. This said "Four" while five were in
                  the list — the sort of thing nobody notices until a client
                  does. */}
              <h1>
                {count(PROJECTS.length)} projects, <i>all shipped.</i>
              </h1>
            </div>
            <p className="work-lede">
              We would rather show you a few things properly than list thirty.
              Each went from a blank file to production.
            </p>
          </header>
          }
        />

        {/* Second collection, under the deck. Client work and toys are
            different things — one is commissioned, one is given away — so
            they get different shapes rather than being shuffled into one
            list: the deck up top, a plain read below.

            These carry .toy-item and NOT .work-item, which matters more than
            it looks. lib/reel/engine.ts queries .work-item document-wide to
            lay out the object's rail and count its checkpoints, so a toy
            wearing that class would be measured as a client project and put
            a phantom stop on the rail. */}
        <section className="work-toys">
          <header className="work-toys-head">
            <p className="eyebrow">Toybox</p>
            <h2>
              Tools we built for us. <i>Yours, free.</i>
            </h2>
            <p>
              Things that started as something we needed and got finished
              properly. No licence, no trial, no account.
            </p>
          </header>

          {TOYS.map((toy) => (
            <TransitionLink
              key={toy.slug}
              href={`/toybox/${toy.slug}`}
              className="toy-item"
            >
              <div>
                <h3>{toy.title}</h3>
                <div className="toy-meta">
                  <span className="toy-free">Free forever</span>
                  <span>
                    {toy.scope
                      .filter((x) => x.toLowerCase() !== "free forever")
                      .join(" · ")}
                  </span>
                  <span>{toy.year}</span>
                </div>
                <p className="toy-desc">{toy.description}</p>
                <span className="toy-go">
                  Read the build <span aria-hidden="true">→</span>
                </span>
              </div>

              <div className="toy-shot">
                <Image
                  src={toy.image}
                  alt={`${toy.title} — ${toy.description}`}
                  width={1600}
                  height={1100}
                  sizes="(max-width: 820px) 100vw, 46vw"
                />
              </div>
            </TransitionLink>
          ))}
        </section>

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
