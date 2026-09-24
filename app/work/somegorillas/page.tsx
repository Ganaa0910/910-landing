import type { Metadata } from "next";
import localFont from "next/font/local";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Palette, Shot, Specimen, Stage } from "@/components/case-study/showcase";
import { Translator } from "./translator";
import { RoomBackdrop } from "./backdrop";

export const metadata: Metadata = {
  title: "Some Gorillas — Case Study",
  description:
    "An NFT project that makes you play before it pitches — a locked gate, a drag-swap puzzle and a working gorilla language. Design and frontend by 910studio.",
  openGraph: {
    title: "Some Gorillas — 910 Case Study",
    description:
      "Make them play before you pitch. Seven painted rooms, four toys and a complete substitution language.",
  },
};

/* the project's display face, from the files it ships */
const clash = localFont({
  src: "../../../public/demos/somegorillas/assets/fonts/ClashDisplay-Variable.ttf",
  weight: "200 700",
  display: "swap",
});

export default function SomeGorillasCaseStudy() {
  return (
    <CaseStudy slug="somegorillas" backdrop={<RoomBackdrop />}>
      <p className="cs-eyebrow">Case study / Some Gorillas</p>
      <h1>
        Make them play <i>before you pitch</i>
      </h1>

      <div className="cs-meta">
        <Meta label="project" value="Some Gorillas" />
        <Meta label="910studio" value="Design, frontend" />
        <Meta label="with" value="A crypto lab" />
        <Meta label="live" value="somegorillas.com" live />
      </div>

      <Shot
        src="/demos/somegorillas/assets/hero.png"
        alt="The Some Gorillas hero — the cast on a painted ground"
        width={1600}
        height={1000}
        priority
      />

      <Beat n="01" label="The brief">
        Every NFT site is the same page: a countdown, a roadmap, tokenomics and a
        Discord button. Some Gorillas is built around mini-games, and a brochure
        that describes games doesn&apos;t prove anything. The site had to be
        something you play.
      </Beat>

      <Palette
        chips={[
          { name: "Banana", val: "#F5BA31", w: 3 },
          { name: "Night", val: "#0F1012", w: 2 },
          { name: "Grape", val: "#A638E7", w: 1.4 },
          { name: "Sky", val: "#69C9EC", w: 1.2 },
          { name: "Jungle", val: "#4C956C", w: 1.2 },
          { name: "Gold", val: "#FFD700", w: 0.8 },
        ]}
      />

      <Beat n="02" label="The idea">
        Thick black outlines, flat cartoon fills and a painted room for every
        section, so scrolling feels like walking through a building. The site opens
        behind a locked gate, the gallery is a swap puzzle, and the gorillas have
        their own alphabet. You can try the alphabet below.
      </Beat>

      <Specimen
        face={clash.style.fontFamily}
        name="Clash Display — set too big, on purpose"
        role="Typeface"
        sample="Some Gorillas"
      />

      <Stage>
        <Translator />
      </Stage>

      <Beat n="03" label="The result">
        It&apos;s live at somegorillas.com. We did the design and the whole
        frontend alongside the crypto lab behind the project, and they took care of
        the chain. It has nine characters, seven painted rooms, four toys and one
        language that exists just for the joke.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
