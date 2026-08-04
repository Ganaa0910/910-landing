import type { Metadata } from "next";
import Image from "next/image";
import { TransitionLink } from "@/components/nav/page-shell";
import { TOYS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Toybox — Free tools from 910studio",
  description:
    "Things 910studio built for itself and gives away. No licence, no trial, no account. Starting with pomo, a notch-native pomodoro for macOS.",
  openGraph: {
    title: "Toybox — 910studio",
    description:
      "Free tools we built for ourselves and gave away. No licence, no trial, no account.",
  },
};

export default function ToyboxPage() {
  return (
    <main className="toybox-page">
      <div className="toy-wrap">
        <p className="eyebrow">Toybox</p>
        <h1>
          Tools we built for us.
          <br />
          <i>Yours, free.</i>
        </h1>
        <p className="toy-lede">
          Things that started as something we needed and got finished properly.
          No licence, no trial, no account, no upsell three screens in. If we
          charged for these they would have to be someone&apos;s job — and then
          they would stop being fun.
        </p>

        {TOYS.map((toy) => (
          <TransitionLink
            key={toy.slug}
            href={`/toybox/${toy.slug}`}
            className="toy-item"
          >
            <div>
              <h2>{toy.title}</h2>
              <div className="toy-meta">
                <span className="toy-free">Free forever</span>
                {/* it already has its own chip above — printing it again out of
                    scope[] read as a stutter */}
                <span>
                  {toy.scope
                    .filter((s) => s.toLowerCase() !== "free forever")
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
                height={1000}
                sizes="(max-width: 820px) 100vw, 46vw"
                priority
              />
            </div>
          </TransitionLink>
        ))}
      </div>
    </main>
  );
}
