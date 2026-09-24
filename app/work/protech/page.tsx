import type { Metadata } from "next";
import Image from "next/image";
import { Didact_Gothic, JetBrains_Mono } from "next/font/google";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Pair, Palette, Shot, Specimen } from "@/components/case-study/showcase";
import { ShareStory } from "@/components/case-study/share-story";

export const metadata: Metadata = {
  title: "Protech — Case Study",
  description:
    "Mongolia's premium laptop and tablet store, built with no house colour at all. Storefront, admin console, API and the server the whole thing runs on.",
  openGraph: {
    title: "Protech — 910 Case Study",
    description:
      "A shop that sells fifteen brands cannot have a house colour. The accent token is the ink. Plus the move off rented infrastructure onto one box.",
  },
};

/* The client's two faces, loaded here so the specimens are the real thing
   rather than a description of it.

   Both subset lists are load-bearing and neither is obvious. Didact Gothic
   needs `cyrillic` or the Mongolian sample silently renders in a system
   fallback — a type specimen set in the wrong type. JetBrains Mono needs
   `latin-ext`, because the tugrik ₮ is U+20AE and Google puts U+20AD-20C0
   in latin-ext, not latin; without it the one glyph the price specimen
   exists to show is the one that falls back.

   Worth knowing if this ever moves into an OG card: Satori has no fallback
   chain, and ү (U+04AF) is in cyrillic-EXT rather than cyrillic, so
   "дэлгүүр" loses a letter there in a way it does not here. */
const didact = Didact_Gothic({ weight: ["400"], subsets: ["latin", "cyrillic"] });
const jetbrains = JetBrains_Mono({ weight: ["400"], subsets: ["latin", "latin-ext"] });

const IMG = "/demos/protech/assets";

export default function ProtechCaseStudy() {
  return (
    <CaseStudy slug="protech">
      <p className="cs-eyebrow">Case study / Протек ХХК</p>
      <h1>
        A shop with <i>no colour in it</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="Протек ХХК" />
        <Meta label="scope" value="Frontend, Backend, Infrastructure" />
        <Meta label="year" value="2026" />
        <Meta label="live" value="protech.mn" live />
      </div>

      <ShareStory slug="protech" title="Protech — a 910studio case study" />

      <Shot
        src={`${IMG}/home.png`}
        alt="The Protech homepage, a full-bleed workspace photograph under a Mongolian headline"
        width={2880}
        height={1800}
        priority
      />

      <Beat n="01" label="The brief">
        Protech sells laptops and tablets to people who care which one they buy.
        They wanted a shop in Mongolian — only Mongolian, no language switcher
        to maintain and no half-translated second version to apologise for —
        and they wanted to run the whole thing themselves afterwards.
      </Beat>

      <Palette
        chips={[
          { name: "Paper", val: "#FFFFFF", w: 3 },
          { name: "Ink", val: "#0E0E0E", w: 2 },
          { name: "Ink soft", val: "#555555" },
          { name: "Ash", val: "#999999" },
          { name: "Mist", val: "#F2F2F2", w: 1.5 },
          /* Narrow on purpose. These three are the whole chromatic budget
             of the storefront, and a beat about having no house colour
             should not be illustrated by a wide band of colour. "In stock"
             also truncates to "IN ST…" at this chip width. */
          { name: "Stock", val: "#15A06E", w: 0.4 },
          { name: "Low", val: "#D49A17", w: 0.4 },
          { name: "Gone", val: "#B91C1C", w: 0.4 },
        ]}
      />

      <Beat n="02" label="The idea">
        The accent token is the ink. Same hex, on purpose — a store carrying
        fifteen manufacturers cannot have a house colour without picking a
        fight with every product in the catalogue. Colour arrives in the
        photography and nowhere else. The only chromatic values in the entire
        stylesheet are the three that carry meaning: in stock, low, gone. None
        of them is ever used as decoration.
      </Beat>

      <Specimen
        face={didact.style.fontFamily}
        name="Didact Gothic — everything you read"
        role="Typeface"
        sample="Тухтай орчинд ажилла."
      />

      <Specimen
        face={jetbrains.style.fontFamily}
        name="JetBrains Mono — everything you compare"
        role="Numerals"
        sample="7,590,000 ₮"
      />

      <Beat n="03" label="Two faces, one job each">
        A price is data, not prose. Set in a monospace column, 7,590,000 and
        2,400,000 line up on the comma and you can weigh them without reading
        them — which is what anyone shopping for a laptop is actually doing.
        Everything else is Didact Gothic, including the Cyrillic, which rules
        out most of the grotesques that would otherwise have been obvious.
      </Beat>

      <Pair>
        <Image
          src={`${IMG}/shop.png`}
          alt="The Protech catalogue, faceted by category and brand"
          width={2880}
          height={1800}
        />
        <Image
          src={`${IMG}/pdp.png`}
          alt="A Protech product page with its memory, colour and storage matrix"
          width={2880}
          height={1800}
        />
      </Pair>

      <Beat n="04" label="The result">
        Live at protech.mn: 53 products across seven categories, 79 URLs in the
        sitemap, and a client who can add the fifty-fourth without calling us.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
