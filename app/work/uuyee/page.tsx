import type { Metadata } from "next";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Palette, Shot, Specimen, Stage } from "@/components/case-study/showcase";
import { RingFields } from "./rings";

export const metadata: Metadata = {
  title: "Uuye — Case Study",
  description:
    "A portfolio for Mongolia's top jazz guitarist built with zero photographs — a wordmark, a 3px rule and a sine wave.",
  openGraph: {
    title: "Uuye — 910 Case Study",
    description:
      "No photographs. The identity is a typeface, a three-pixel rule and a sine wave.",
  },
};

export default function UuyeeCaseStudy() {
  return (
    <CaseStudy slug="uuyee">
      <p className="cs-eyebrow">Case study / Uuye, guitarist</p>
      <h1>
        No photographs. The identity is <i>a sine wave</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="Uitumen Bold (Uuye)" />
        <Meta label="scope" value="Design, Frontend, Deploy" />
        <Meta label="executor" value="910studio (solo)" />
        <Meta label="live" value="uuyee-portfolio.vercel.app" live />
      </div>

      <Shot
        src="/demos/uuyee/assets/hero.png"
        alt="The Uuye homepage — the wordmark beside the ring field"
        width={1600}
        height={900}
        priority
      />

      <Beat n="01" label="The brief">
        Uuye plays jazz and soul, at home and abroad. He showed up with no press
        kit, no photos and no logo. The usual fix for that is stock photography,
        and then you end up with a site about guitars when it should be about the
        player.
      </Beat>

      <Palette
        chips={[
          { name: "Paper", val: "#F0EDE8", w: 3 },
          { name: "Ink", val: "#0A0A0A", w: 2 },
          { name: "Fire", val: "#FF480F", w: 1.6 },
          { name: "Amber", val: "#D4A024" },
          { name: "Afterglow", val: "#F5E6D3" },
          { name: "Stage", val: "#1A1410", w: 1.2 },
        ]}
      />

      <Beat n="02" label="The idea">
        So we built it out of type, rules and geometry. The wordmark is 180px of
        Space Grotesk, every rule is 3px, and the artwork is a single sine function
        drawing rings that interfere with each other. When you scroll into the
        performances, the catalogue&apos;s paper turns to stage fire.
      </Beat>

      <Specimen
        face="var(--font-space-grotesk), 'Space Grotesk', sans-serif"
        name="Space Grotesk — up to 180px, and nothing between 15 and 24"
        role="Typeface"
        sample="UUYE"
      />

      {/* the generator, drawn live — catalogue on paper, the gate on ink */}
      <Stage>
        <RingFields />
      </Stage>

      <Beat n="03" label="The result">
        Not a single img tag ships. The site is a catalogue, a listening corner and
        a way to get in touch, made from one typeface, a 3px rule and a wave. That
        was all the material there was, and it doesn&apos;t look like anyone
        else&apos;s site.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
