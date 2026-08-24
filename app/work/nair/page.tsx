import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nair Entertainment — Case Study",
  description:
    "How 910studio built a bilingual site for Mongolia's traditional performing arts — Mongolian-first, with locale-prefixed routes rather than a translation toggle.",
  openGraph: {
    title: "Nair Entertainment — 910 Case Study",
    description:
      "A heritage arts agency that speaks Mongolian first. Bilingual architecture, nine disciplines, SvelteKit and Paraglide.",
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

const IMG = "/demos/nair/assets";

const PALETTE = [
  { name: "Ground", val: "#FFFFFF" },
  { name: "Ink", val: "#06090C" },
  { name: "Crimson", val: "#9E1C21" },
  { name: "Crimson Light", val: "#B32228" },
  { name: "Copy", val: "rgba(6,9,12,.48)" },
  { name: "Surface", val: "rgba(6,9,12,.04)" },
  { name: "Border", val: "rgba(6,9,12,.16)" },
];

/* the roster, in the order the client ranks them */
const DISCIPLINES = [
  { file: "khoomii", mn: "Хөөмий", en: "Khöömii", note: "Overtone throat singing — the discipline foreign audiences arrive already knowing." },
  { file: "urtin-duu", mn: "Уртын дуу", en: "Long song", note: "The extended-melody tradition. UNESCO-listed, and the hardest to stage well." },
  { file: "morin-khuur-quartet", mn: "Морин хуурын квартет", en: "Morin khuur quartet", note: "The national instrument, arranged for four players." },
  { file: "tsam-bujig", mn: "Цам бүжиг", en: "Tsam dance", note: "Buddhist masked ritual dance. Visually the loudest thing on the roster." },
  { file: "mongol-bujig", mn: "Монгол бүжиг", en: "Mongolian dance", note: "Traditional choreography, staged for banquet rooms and full theatres alike." },
  { file: "uran-nugaralt", mn: "Уран нугаралт", en: "Contortion", note: "The circus-adjacent discipline, and the one that travels furthest." },
  { file: "yurool", mn: "Ерөөл", en: "Blessings & eulogies", note: "Spoken-word blessing. Opens most Mongolian ceremonies — a booking category in itself." },
  { file: "ardiin-duu", mn: "Ардын дуу", en: "Folk song", note: "Regional folk repertoire, arranged for ensembles of varying size." },
  { file: "undesnii-khugjim", mn: "Үндэсний хөгжим", en: "National ensemble", note: "The full traditional orchestra — the largest configuration Nair books." },
];

/* the four headline disciplines, as the client's own line drawings. w/h are
   the source viewBoxes — they are tall portraits at wildly different ratios,
   so they need their real proportions rather than a shared box. */
const SILHOUETTES = [
  { file: "throat", label: "Khöömii", mn: "Хөөмий", w: 558, h: 1029 },
  { file: "morin-khuur", label: "Morin khuur", mn: "Морин хуур", w: 741, h: 858 },
  { file: "tsam", label: "Tsam", mn: "Цам", w: 1040, h: 1393 },
  { file: "dancer", label: "Bujig", mn: "Бүжиг", w: 736, h: 858 },
];

const MODES = [
  { name: "Coming soon", detail: "A holding page the client can switch to before a season opens, without a redeploy." },
  { name: "Maintenance", detail: "A dedicated route for planned downtime rather than a broken page or a bare 500." },
  { name: "Error", detail: "A branded failure state — an error that still looks like the company it belongs to." },
  { name: "llms.txt", detail: "A machine-readable summary endpoint, so models describing the company get it from the source." },
];


const OUTCOMES = [
  { num: "2", label: "Languages, neither second", desc: "Mongolian and English are peers — two real URLs, both indexable, no toggle-in-the-corner." },
  { num: "9", label: "Disciplines catalogued", desc: "Each art form gets its own route, its own imagery and its own path into the booking flow." },
  { num: "14", label: "Route shapes", desc: "Home, events, seasonal, programmes, services, disciplines, ordering — plus the operational modes." },
];

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
        A heritage arts agency that speaks <i>Mongolian first</i>
      </h1>
      <p className="cs-lede">
        Nair books Mongolia&apos;s traditional performing arts — throat singing, long
        song, masked ritual dance. Their audience splits between Mongolian clients
        booking a wedding and foreign clients booking a gala. We built it so neither is
        reading a translation.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Nair Entertainment" />
        <Meta label="executor" value="910studio" />
        <Meta label="scope" value="Design, Bilingual Architecture, Frontend, Deploy" />
        <Meta label="live" value="nair-final.vercel.app" live />
      </div>

      <div className="cs-bleed">
        <Image src={`${IMG}/hero.png`} alt="Nair Entertainment homepage — the full ensemble performing inside a ger" width={1600} height={900} priority />
        <div className="cs-cap">
          <span>The homepage opens on video of the full ensemble, mid-performance</span>
          <b>Live</b>
        </div>
      </div>

      <Section num="01" label="The Brief" title="Two audiences, one company, no shared default language">
        <p>
          Nair sells the same nine art forms to two very different buyers. A Mongolian
          client booking a blessing knows what a yörööl is and needs to know who&apos;s free
          in October. A foreign client has heard of throat singing, never of tsam, and needs
          the category explained before a price means anything.
        </p>
        <p>
          Most bilingual sites here build in English and bolt Mongolian on — which reads,
          to a Mongolian client, exactly like what it is.
        </p>
      </Section>

      <Section num="02" label="Language Architecture" title="Mongolian isn't the translation. It's the default.">
        <p>
          The site is built on locale-prefixed routes — <code>/mn</code> and{" "}
          <code>/en</code> are peers, both real URLs, both indexable. Around 250 message
          keys cover navigation, the discipline catalogue, the booking flow and the
          seasonal programming, and they are compiled at build time — so a visitor on the
          Mongolian site never downloads a single English string.
        </p>
        <p>
          The visible default is Mongolian: the control offers <em>EN</em> as the thing you
          switch to, not the state you&apos;re in. One word that tells a local client whose
          site this is.
        </p>

        <div className="cs-grid cs-grid-2">
          <figure className="cs-frame">
            <Image src={`${IMG}/home-mn.png`} alt="Nair homepage in Mongolian" width={1600} height={900} />
            <figcaption className="cs-cap">
              <span>/mn — the default</span>
              <b>Mongolian</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/home-en.png`} alt="Nair homepage in English" width={1600} height={900} />
            <figcaption className="cs-cap">
              <span>/en — a peer, not a fallback</span>
              <b>English</b>
            </figcaption>
          </figure>
        </div>

        <div className="cs-band">
          <p>
            A translation toggle in the corner tells your local audience they are visiting
            the foreign version of their own culture.
          </p>
          <cite>910studio — on the language decision</cite>
        </div>
      </Section>

      <Section num="03" label="Colour System" title="Deel crimson on white, ink built from one value">
        <p>
          The palette comes off the performers — deep red silk deels. Crimson carries every
          interactive state and nothing competes. The greys are alphas of one near-black, so
          nothing can drift warm or cool away from the red.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#9E1C21" }} />
          <div style={{ background: "#B32228" }} />
          <div style={{ background: "#06090C" }} />
        </div>
        <Swatches colors={PALETTE} />
      </Section>

      <Section num="04" label="Identity Motifs" title="The line art runs behind everything, dithered">
        <p>
          Each headline discipline has a drawn silhouette — a tsam mask, a fiddle, a dancer.
          Rather than framing them as icons, they run behind this page as an ambient field:
          sampled to a grid and redrawn as dither squares, cross-fading.
        </p>
        <p>
          Same construction as the 910 mark and the reel&apos;s globe, so the artwork arrives
          as texture belonging here rather than clip art dropped in.
        </p>
        <p className="cs-note">
          Look past the text — {SILHOUETTES.map((s) => s.label).join(", ")} and the full
          ensemble are cycling behind it.
        </p>
      </Section>

      <Section num="05" label="Content Spine" title="Nine disciplines, each a real destination">
        <p>
          The disciplines are the product. Each gets its own route, imagery and path into
          booking rather than a line item on a services page. For a foreign client that is
          the explanatory layer; for a Mongolian client it is a direct link.
        </p>

        <div className="cs-artrow">
          {SILHOUETTES.map((s) => (
            <figure key={s.file}>
              <Image
                src={`${IMG}/art/${s.file}.svg`}
                alt={`${s.label} — line illustration`}
                width={s.w}
                height={s.h}
              />
              <figcaption>
                <b>{s.mn}</b>
                <span>{s.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="cs-stack">
          {DISCIPLINES.map((d) => (
            <div key={d.file} className="cs-row">
              <b>{d.en}</b>
              <p>
                <strong>{d.mn}.</strong> {d.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section num="06" label="Motion" title="We tuned the browser's transitions instead of rebuilding them">
        <p>
          Navigation uses native view transitions rather than a JS animation layer. The
          defaults are too quick to read as deliberate, so the morph is stretched to 420ms on
          a long ease-out that decelerates into place instead of snapping.
        </p>
        <p>
          Under <code>prefers-reduced-motion</code> the same transitions collapse to 1ms.
          Not disabled — collapsed, so the navigation logic is identical and there is no
          second code path to keep working.
        </p>
        <Quote cite="src/routes/layout.css — the comment in the shipped stylesheet">
          Slow the morph to feel like Apple Music.
        </Quote>
      </Section>

      <Section num="07" label="Booking" title="From a discipline to a dated enquiry">
        <p>
          Everything funnels into one ordering route. The form asks what actually determines
          a quote — which art form, what event, what date — rather than a contact box that
          guarantees a second email.
        </p>
        <div className="cs-grid cs-grid-3">
          <figure className="cs-frame">
            <Image src={`${IMG}/events.png`} alt="Nair events index" width={1600} height={900} />
            <figcaption className="cs-cap">
              <span>Events index</span>
              <b>/events</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/seasonal.png`} alt="Nair seasonal programming" width={1600} height={900} />
            <figcaption className="cs-cap">
              <span>Seasonal programming</span>
              <b>/seasonal</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/order.png`} alt="Nair booking form" width={1600} height={900} />
            <figcaption className="cs-cap">
              <span>Booking enquiry</span>
              <b>/order</b>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section num="08" label="Operational Modes" title="The states most sites only discover in production">
        <p>
          A seasonal business needs to go quiet without looking broken. The off-states are
          designed rather than defaulted, so the client can change the public face of the
          company without calling anyone.
        </p>
        <div className="cs-grid cs-grid-2">
          {MODES.map((m) => (
            <div key={m.name} className="cs-card">
              <span className="cs-kicker">Mode</span>
              <h3>{m.name}</h3>
              <p>{m.detail}</p>
            </div>
          ))}
        </div>
      </Section>


      <Section num="10" label="Outcome" title="Shipped, in two languages, neither of them second.">
        <p>
          Nair now has a home that treats its own market as the primary audience and
          international clients as equally served — not a Mongolian company presenting itself
          in English with a toggle in the corner.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
