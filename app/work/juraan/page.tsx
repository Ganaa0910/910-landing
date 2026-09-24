import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Pair, Palette, Shot, Specimen } from "@/components/case-study/showcase";
import { ShareStory } from "@/components/case-study/share-story";

export const metadata: Metadata = {
  title: "Juraan — Case Study",
  description:
    "A cinematic portfolio for Mongolia's premier bronze sculptor — a palette taken from the foundry and a typeface drawn from scratch.",
  openGraph: {
    title: "Juraan — 910 Case Study",
    description:
      "Portfolio site for Mongolian bronze sculptor Juraan. Custom font, bronze-derived palette, cinematic scroll experience.",
  },
};

/* the custom face, straight from the .ttf that ships on juraan.com */
const juraanFace = localFont({
  src: "../../../public/demos/juraan/assets/JuraanFont-Regular.ttf",
  display: "swap",
});

const IMG = "/demos/juraan/assets";

export default function JuraanCaseStudy() {
  return (
    <CaseStudy slug="juraan">
      <p className="cs-eyebrow">Case study / Juraan, bronze sculptor</p>
      <h1>
        We studied bronze <i>to design pixels</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="Juraan (Lkhagvasuren Nyamkhuu)" />
        <Meta label="scope" value="Research, Design, Custom Font, Frontend" />
        <Meta label="executor" value="910studio (solo)" />
        <Meta label="live" value="juraan.com" live />
      </div>

      <ShareStory slug="juraan" title="Juraan — a 910studio case study" />

      <Shot
        src={`${IMG}/exhibition.jpg`}
        alt="A Juraan bronze at the 2024 solo exhibition"
        width={2730}
        height={4095}
        ratio="16 / 9"
        focus="50% 24%"
        priority
      />

      <Beat n="01" label="The brief">
        Juraan has been casting bronze for four decades. He has Government Palace
        commissions and has exhibited in four countries, but he had no site, no
        logo and no brand. We had to make a screen carry the weight of bronze.
      </Beat>

      <Palette
        chips={[
          { name: "Foundry", val: "#0A0A0A", w: 3 },
          { name: "Patina", val: "#D4AF7A", w: 2 },
          { name: "Bronze", val: "#CD7F32", w: 1.5 },
          { name: "Oxide", val: "#8C4A1B", w: 1.2 },
          { name: "Bone", val: "#E5E5E5", w: 0.8 },
        ]}
      />

      <Beat n="02" label="The idea">
        We took the palette from the lost-wax process: near-black for the foundry,
        warm gold for fresh patina and deep brown for oxidation. Then we drew a
        typeface that doesn&apos;t exist anywhere else, and lit the gallery with
        vignettes so the sculptures come up out of the dark.
      </Beat>

      <Specimen
        face={juraanFace.style.fontFamily}
        name="Juraan — drawn from scratch, display only"
        role="Custom typeface"
        sample="God and Devil"
        glyphs="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      />

      <Pair>
        <Image src={`${IMG}/devil.webp`} alt="Devil in Meditation, bronze" width={560} height={750} />
        <Image src={`${IMG}/buddha.webp`} alt="Buddha, bronze" width={560} height={750} />
      </Pair>

      <Beat n="03" label="The result">
        A cinematic portfolio at juraan.com with 37 sculptures across five pages,
        set in one typeface nobody else has. One person did all of it, from the
        research through to deploy.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
