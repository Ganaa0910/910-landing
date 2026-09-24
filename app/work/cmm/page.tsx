import type { Metadata } from "next";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Pair, Palette, Shot, Specimen } from "@/components/case-study/showcase";

export const metadata: Metadata = {
  title: "MarketIQ — Case Study",
  description:
    "Mongolia's first AI-native capital markets platform, in a deep violet and a Dense system built for bankers and first-time investors alike.",
  openGraph: {
    title: "MarketIQ — 910 Case Study",
    description:
      "Bloomberg conviction, CMM identity. The Dense direction for Mongolia's first AI-native capital markets platform.",
  },
};

/* the client's heading face, loaded here so the specimen is the real thing */
const jakarta = Plus_Jakarta_Sans({ weight: ["700"], subsets: ["latin"] });

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
        <Meta label="product" value="MarketIQ" />
        <Meta label="scope" value="Design System, Frontend" />
        <Meta label="year" value="2026" />
      </div>

      <Shot
        src={`${IMG}/entity-dense.png`}
        alt="A MarketIQ company profile in the Dense direction"
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
          { name: "Brand violet", val: "#3E149C", w: 3 },
          { name: "Violet light", val: "#6B4CC0", w: 1.5 },
          { name: "Signal", val: "#FCA311", w: 1.2 },
          { name: "Night", val: "#0C0A1D", w: 1.5 },
          { name: "Ground", val: "#FAFAFD" },
          { name: "Up", val: "#059669", w: 0.8 },
          { name: "Down", val: "#DC2626", w: 0.8 },
        ]}
      />

      <Beat n="02" label="The idea">
        We put three directions in front of their leadership, and they picked
        Dense straight away: 4px corners, tight grids and 38px table rows, with a
        deep violet carried all the way down into the shadows. You get
        Bloomberg-level density, but it still looks like CMM.
      </Beat>

      <Specimen
        face={jakarta.style.fontFamily}
        name="Plus Jakarta Sans — headings"
        role="Typeface"
        sample="Erdene Resource Development"
      />

      <Pair>
        <Image src={`${IMG}/insights-dense.png`} alt="The MarketIQ insights index" width={2880} height={1800} />
        <Image src={`${IMG}/design-system.png`} alt="The Dense design system" width={2880} height={1800} />
      </Pair>

      <Beat n="03" label="The result">
        Dense is the production system now: 67 components and eighteen live routes,
        all running on one set of tokens. Institutional desks and retail investors
        use the same product, and paying more just unlocks more of it.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
