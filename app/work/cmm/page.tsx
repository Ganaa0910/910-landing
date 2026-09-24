import type { Metadata } from "next";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Pair, Palette, Shot, Specimen } from "@/components/case-study/showcase";
import { ShareStory } from "@/components/case-study/share-story";

export const metadata: Metadata = {
  title: "Capital Markets Mongolia — Case Study",
  description:
    "Mongolia's capital markets platform, rebuilt in electric violet: square corners, a true-grey ground and a Merriweather voice over Inter.",
  openGraph: {
    title: "Capital Markets Mongolia — 910 Case Study",
    description:
      "Bloomberg conviction, CMM identity. Electric violet, square corners, one set of tokens across the whole platform.",
  },
};

/* the client's headline face, loaded here so the specimen is the real thing */
const merriweather = Merriweather({ weight: ["700"], subsets: ["latin"] });

const IMG = "/demos/cmm/assets";

export default function CMMCaseStudy() {
  return (
    <CaseStudy slug="cmm">
      <p className="cs-eyebrow">Case study / Capital Markets Mongolia</p>
      <h1>
        A Bloomberg for Mongolia, <i>in violet</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="Capital Markets Mongolia" />
        <Meta label="product" value="capitalmarkets.mn" />
        <Meta label="scope" value="Design System, Frontend" />
        <Meta label="year" value="2026" />
      </div>

      <ShareStory slug="cmm" title="Capital Markets Mongolia — a 910studio case study" />

      <Shot
        src={`${IMG}/v2-home.png`}
        alt="The capitalmarkets.mn landing page: Merriweather headline, electric violet accent"
        width={2880}
        height={1800}
        priority
      />

      <Beat n="01" label="The brief">
        Mongolia&apos;s capital markets run on PDFs, email chains and Yahoo
        Finance tabs. CMM wanted a single platform that a Bloomberg-trained banker
        and a first-time investor could both trust, and they didn&apos;t want it to
        look like anybody else&apos;s.
      </Beat>

      <Palette
        chips={[
          { name: "Electric violet", val: "#824BFF", w: 3 },
          { name: "Violet 950", val: "#2A1071", w: 1.5 },
          { name: "Lilac", val: "#D5BEFF", w: 1.2 },
          { name: "Signal", val: "#FFFB8A", w: 1 },
          { name: "Ink", val: "#0A0A0A", w: 1.5 },
          { name: "Paper", val: "#FAFAFA" },
        ]}
      />

      <Beat n="02" label="The idea">
        The first system was a deep, dense violet. When CMM rebranded to electric
        violet we didn&apos;t repaint it, we merged it: two ramps, neutral and
        violet, declared once and pointed at by everything. The ground went from
        lilac-tinted grey to a true grey so the violet reads as the brand instead
        of as a tint. Corners went square and shadows went flat.
      </Beat>

      <Specimen
        face={merriweather.style.fontFamily}
        name="Merriweather — headlines, Inter — everything else"
        role="Typeface"
        sample="Mongolia, globally connected"
      />

      <Pair>
        <Image src={`${IMG}/v2-entity.png`} alt="A CMM directory profile for Golomt Bank" width={2880} height={1800} />
        <Image src={`${IMG}/v2-bonds.png`} alt="The Mongolia international bonds market page" width={2880} height={1800} />
      </Pair>

      <Beat n="03" label="The result">
        Every page on capitalmarkets.mn runs on the same twenty-two values:
        insights, the company directory, the bond market, events and the
        Mongolia Investment Forum. The serif is the landing page&apos;s voice
        and Inter carries every table, so a banker reading a repayment ladder
        and an investor reading a guide are in the same product.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
