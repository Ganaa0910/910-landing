import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Some Gorillas — Case Study",
  description:
    "An NFT project that makes you play before it pitches — a locked gate, a drag-swap puzzle and a working gorilla language. Design and frontend by 910studio, in collaboration with a crypto lab.",
  openGraph: {
    title: "Some Gorillas — 910 Case Study",
    description:
      "Make them play before you pitch. Seven painted rooms, four toys and a complete substitution language.",
  },
};

import Image from "next/image";
import {
  CaseStudy,
  Meta,
  Quote,
  Section,
  Stats,
  Swatches,
  Tail,
} from "@/components/case-study/shell";
import { Translator } from "./translator";
import { RoomBackdrop } from "./backdrop";

const IMG = "/demos/somegorillas/assets";

const PALETTE = [
  { name: "Ground", val: "#0F1012" },
  { name: "Ink", val: "#FAFAFA" },
  { name: "Banana", val: "#F5BA31" },
  { name: "Gold", val: "#FFD700" },
  { name: "Grape", val: "#A638E7" },
  { name: "Sky", val: "#69C9EC" },
  { name: "Jungle", val: "#4C956C" },
];

/* public/nfts/hero-section — the cast, named by the project itself */
const CAST = ["Dude", "Gangsta", "Goldie", "Kiddo", "Lady", "Nun", "Sensei", "Wild One", "Zombie"];

/* public/backgrounds — one painted plate per section. The "seven rooms" is
   not a description of a screenshot; it is seven files. */
const ROOMS = ["Hero section", "Section 2", "Section 3", "Section 4", "Section 5", "Section 6", "Section 7"];

const GAMES = [
  { file: "flip-coin.png", name: "Coin flip" },
  { file: "plinko.svg", name: "Plinko" },
  { file: "mine.svg", name: "Mine" },
];

const TOYS = [
  { name: "The gate", detail: "You cannot scroll until you press ready! The site holds the door shut and makes opening it your decision — one click that turns a page into a place you entered." },
  { name: "The grid", detail: "Nine gorillas, eight slots. Drag one and it swaps with whatever it overlaps most. A puzzle nobody asked for, sitting where a static image gallery would normally be." },
  { name: "The mouth", detail: "The mascot's mouth opens as your cursor approaches and the glow behind it turns from amber to red. It does nothing. It is the best thing on the page." },
  { name: "The road", detail: "The roadmap is laid along a painted highway rather than stacked as a list, so the eight steps read as distance travelled instead of promises made." },
];

const OUTCOMES = [
  { num: "7", label: "Painted rooms", desc: "Every section has its own full-bleed ground and its own colour — sky, jungle, grape — so scrolling feels like walking through rooms." },
  { num: "4", label: "Things to play with", desc: "The gate, the swap grid, the mouth and the translator — none of them load-bearing, all of them the reason you stay." },
  { num: "26", label: "Letters in Gorillak", desc: "A complete substitution language with a working two-way translator built into the page." },
];

export default function SomeGorillasCaseStudy() {
  return (
    <CaseStudy slug="somegorillas" backdrop={<RoomBackdrop />}>
      <p className="cs-eyebrow">Case study / Some Gorillas</p>
      <h1>
        Make them play <i>before you pitch</i>
      </h1>
      <p className="cs-lede">
        Some Gorillas is an NFT project built around mini-games. Nearly every site in the
        category is a long scroll of promises. This one hands you something to fiddle with
        in the first three seconds and keeps doing it — because a project about playing
        should be proven, not described.
      </p>

      <div className="cs-meta">
        <Meta label="project" value="Some Gorillas" />
        <Meta label="engagement" value="Collaboration with a crypto lab" />
        <Meta label="910studio" value="Design, frontend integration, development" />
        <Meta label="live" value="somegorillas.com" live />
      </div>

      <div className="cs-bleed">
        <Image src={`${IMG}/loader.png`} alt="The Some Gorillas loader — the wordmark filling the screen over a banana pattern" width={1600} height={1000} priority />
        <div className="cs-cap">
          <span>The gate. Scroll is locked until you press it — the first interaction is a decision, not a scroll</span>
          <b>Loader</b>
        </div>
      </div>

      <Section num="01" label="The Problem" title="Every project in this category writes the same page">
        <p>
          Hero with a countdown. Roadmap. Tokenomics. Team. FAQ. Discord button. The genre
          is so fixed that visitors have learned to skim it, so the page has lost before
          anyone reads a word.
        </p>
        <p>
          If the site is a brochure describing games, the brochure is evidence against the
          pitch. The only honest version behaves like the thing it sells.
        </p>
      </Section>

      <Section num="02" label="The Approach" title="Four toys, none of them load-bearing">
        <p>
          Four things that do nothing and matter enormously. None are required to
          understand the project. All are the reason anyone is still scrolling at section
          five.
        </p>
        <div className="cs-grid cs-grid-2">
          {TOYS.map((t) => (
            <div key={t.name} className="cs-card">
              <span className="cs-kicker">Toy</span>
              <h3>{t.name}</h3>
              <p>{t.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section num="03" label="The Cast" title="Nine gorillas, and each one is somebody">
        <p>
          The cast is named in the build — Dude, Gangsta, Goldie, Kiddo, Lady, Nun, Sensei,
          Wild One, Zombie. Not traits, not token IDs: characters you can read off the drawing
          in a second. That is what makes the swap puzzle work — you are rearranging people,
          not tiles.
        </p>
        <div className="cs-grid cs-grid-3">
          {CAST.map((c) => (
            <figure key={c} className="cs-frame fill">
              <Image
                src={`${IMG}/cast/${encodeURIComponent(c)}.webp`}
                alt={c}
                width={600}
                height={600}
              />
              <figcaption className="cs-cap">
                <span>{c}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ marginTop: 30 }}>
          Three games, each with a drawn identity rather than a label: a coin to flip, a
          Plinko board, a mine grid. The icons do the explaining — the only way a page gets
          away with introducing three mechanics in one screen.
        </p>
        <div className="cs-artrow">
          {GAMES.map((g) => (
            <figure key={g.file}>
              <Image
                src={`${IMG}/games/${g.file}`}
                alt={g.name}
                width={140}
                height={140}
                unoptimized={g.file.endsWith(".svg")}
              />
              <figcaption>
                <b>{g.name}</b>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section num="04" label="The Language" title="We gave the gorillas an alphabet">
        <p>
          A complete substitution language. Every letter maps to a two-sound grunt —{" "}
          <code>a → EI</code>, <code>b → OB</code>, <code>c → AC</code> — with a translator
          that runs both ways.
        </p>
        <p>
          A completely unnecessary amount of effort for a joke, which is why it works.
          Nobody builds a working conlang for a landing page unless they care, and visitors
          can tell the difference between effort and copywriting.
        </p>

        <Translator />
      </Section>

      <Section num="05" label="Art Direction" title="Seven rooms, one banana">
        <p>
          Thick black outlines, flat cartoon fills, a colour per section — sky, jungle,
          grape — each with its own painted full-bleed ground. Scrolling reads as moving
          between rooms rather than down a document.
        </p>
        <p>
          Banana yellow on near-black holds it together — the only pairing that survives all
          seven grounds. The wordmark is set too big to read comfortably, which is the correct
          amount of confidence for a project called Some Gorillas.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#F5BA31" }} />
          <div style={{ background: "#A638E7" }} />
          <div style={{ background: "#69C9EC" }} />
        </div>
        <Swatches colors={PALETTE} />

        <div className="cs-grid cs-grid-4">
          {ROOMS.map((r) => (
            <figure key={r} className="cs-frame fill">
              <Image
                src={`${IMG}/rooms/${encodeURIComponent(r)}.png`}
                alt={`${r} — painted background plate`}
                width={800}
                height={500}
              />
              <figcaption className="cs-cap">
                <span>{r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="cs-note">
          Seven plates, shipped as seven files — the first of them is the ground this page is laid on. Nothing is a tint of anything else —
          each room was painted, which is why the scroll reads as travel rather than as
          a colour scheme.
        </p>
      </Section>

      <Section num="06" label="Outcome" title="Live, and worth clicking around in.">
        <p>
          Some Gorillas is live. Ours was the design and the whole frontend — build and
          integration — as a collaboration with the crypto lab behind the project, who handled
          the chain side.
        </p>
        <Quote self cite="910studio — on the brief">
          A project about playing cannot prove itself in a paragraph. It has to be
          provable in the first three seconds, with the mouse.
        </Quote>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
