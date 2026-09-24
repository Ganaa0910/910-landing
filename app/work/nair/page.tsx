import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Pair, Palette, Shot, Specimen } from "@/components/case-study/showcase";

export const metadata: Metadata = {
  title: "Nair Entertainment — Case Study",
  description:
    "Mongolia's traditional performing arts, booked online. One near-black, a crimson lifted off the silk deels, and a bilingual site where neither language is the translation.",
  openGraph: {
    title: "Nair Entertainment — 910 Case Study",
    description:
      "One neutral at eleven alphas, and a crimson that waits until you commit.",
  },
};

const IMG = "/demos/nair/assets";

export default function NairCaseStudy() {
  return (
    <CaseStudy
      slug="nair"
      ambient={[
        `${IMG}/art/tsam.svg`,
        `${IMG}/art/throat.svg`,
        `${IMG}/art/dancer.svg`,
        `${IMG}/art/morin-khuur.svg`,
        `${IMG}/art/artists.svg`,
      ]}
    >
      <p className="cs-eyebrow">Case study / Nair Entertainment</p>
      <h1>
        One neutral, eleven alphas, <i>and a red that waits</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="Nair Entertainment" />
        <Meta label="scope" value="Brand System, Bilingual Site, Frontend" />
        <Meta label="year" value="2026" />
        <Meta label="live" value="nair.mn" live />
      </div>

      <Shot
        src={`${IMG}/hero.png`}
        alt="The nair.mn homepage — a throat singer's ceremony inside a ger"
        width={1600}
        height={900}
        priority
      />

      <Beat n="01" label="The brief">
        Nair books Mongolia&apos;s traditional performing arts: throat singers,
        morin khuur quartets and tsam dancers. What they really sell is a ceremony
        that goes right, so the site had to read like the running order for one,
        in the language of the people booking it.
      </Beat>

      <Palette
        chips={[
          { name: "Ink", val: "#06090C", w: 3 },
          { name: "Deel crimson", val: "#9E1C21", w: 1.4 },
          { name: "Paper", val: "#FFFFFF", w: 2 },
          { name: "Ink hover", val: "#1A1F24" },
        ]}
      />

      <Beat n="02" label="The idea">
        All the neutrals are one near-black at eleven opacities, so nothing drifts
        warm or cool. The crimson is taken from the silk deels and used sparingly.
        On the homepage it&apos;s a single stroke, and by the time you&apos;re
        picking an auspicious date it&apos;s the selection ring. The more is at
        stake, the more red you see.
      </Beat>

      <Specimen
        face="var(--font-inter), Inter, system-ui, sans-serif"
        name="Inter — Cyrillic first"
        role="Typeface"
        sample="Үндэсний урлагийн Найр"
        glyphs="АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ"
      />

      <Pair>
        <Image src={`${IMG}/home-en.png`} alt="nair.mn in English" width={1600} height={900} />
        <Image src={`${IMG}/order.png`} alt="The Nair booking flow" width={1600} height={900} />
      </Pair>

      <Beat n="03" label="The result">
        nair.mn is live in both languages. Mongolian sits at the root and English
        under /en, so neither one reads as the translation. The booking calendar
        marks holy days from the lunar calendar, and the client runs the whole
        season without calling us.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
