import Image from "next/image";
import {
  CaseStudy,
  Meta,
  Quote,
  Section,
  Stats,
  Swatches,
  Table,
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
  { name: "Error", detail: "A branded +error boundary — a failure that still looks like the company it belongs to." },
  { name: "llms.txt", detail: "A machine-readable summary endpoint, so models describing the company get it from the source." },
];

const STACK = [
  ["Framework", "SvelteKit 2", "File-based routing across four content types, with server loads per route."],
  ["Runtime", "Svelte 5 runes", "$state / $derived throughout. Fine-grained reactivity, no virtual DOM."],
  ["i18n", "Paraglide JS 2", "Compiled messages — the unused locale never reaches the client."],
  ["Styling", "Tailwind v4", "@theme tokens, plus forms and typography plugins for the long-form pages."],
  ["Motion", "View Transitions API", "Native cross-document morphs, tuned rather than reimplemented in JS."],
  ["Deploy", "adapter-vercel", "Edge delivery, per-route server loads, preview builds for client review."],
] as const;

const OUTCOMES = [
  { num: "2", label: "Languages, neither second", desc: "Mongolian and English are peers — locale-prefixed routes, compiled messages, no toggle-in-the-corner." },
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
        Nair Entertainment books Mongolia&apos;s traditional performing arts — throat
        singing, long song, masked ritual dance, the horsehead fiddle. Their audience is
        split between Mongolian clients booking a wedding and foreign clients booking a
        gala. 910studio built the site so neither one is reading a translation.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Nair Entertainment" />
        <Meta label="executor" value="910studio" />
        <Meta label="scope" value="Design, Bilingual Architecture, Frontend, Deploy" />
        <Meta label="stack" value="SvelteKit 2 / Svelte 5 / Paraglide / Vercel" />
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
          client booking a wedding blessing knows what a yörööl is and needs to know who
          is free in October. A foreign client booking a gala has heard of throat singing,
          has never heard of tsam, and needs the category explained before a price means
          anything.
        </p>
        <p>
          Most bilingual sites in this market build in English and bolt Mongolian on —
          which reads, to a Mongolian client, exactly like what it is. The brief was to
          make both languages first-class, and to make the heritage feel expensive rather
          than folkloric.
        </p>
      </Section>

      <Section num="02" label="Language Architecture" title="Mongolian isn't the translation. It's the default.">
        <p>
          The site runs on Paraglide with locale-prefixed routes — <code>/mn</code> and{" "}
          <code>/en</code> are peers, both real URLs, both indexable. Around 250 message
          keys cover navigation, the discipline catalogue, the booking flow and the
          seasonal programming. Paraglide compiles them, so a visitor on the Mongolian
          site never downloads the English strings.
        </p>
        <p>
          The visible default is Mongolian: the language control offers <em>EN</em> as
          the thing you switch to, not the state you are in. A one-word decision that
          tells a local client whose site this is.
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
          The palette comes off the performers. The ensemble wears deep red silk deels, so
          crimson carries every interactive state and nothing else competes with it. The
          ground stays white and the entire grey scale is built as alphas of a single
          near-black — <code>rgba(6,9,12,.48)</code> for copy, <code>.04</code> and{" "}
          <code>.08</code> for surfaces, <code>.16</code> for borders. No second neutral,
          so nothing on the page can drift warm or cool away from the red.
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
          Each headline discipline has a drawn silhouette — a tsam mask, a fiddle, a
          dancer&apos;s posture. Rather than framing them as a row of icons, they run
          behind this page as an ambient field: sampled onto a coarse grid and redrawn as
          dither squares, cross-fading from one motif to the next.
        </p>
        <p>
          That is the same construction as the 910 mark and the reel&apos;s globe, so the
          client&apos;s artwork arrives as texture that belongs to this site instead of
          as clip art dropped into it. It is drawn in the project&apos;s accent, holds an
          ordered Bayer threshold rather than random noise so the figure stays legible
          while it drifts, and stops moving entirely under{" "}
          <code>prefers-reduced-motion</code>.
        </p>
        <p className="cs-note">
          Look past the text — {SILHOUETTES.map((s) => s.label).join(", ")} and the full
          ensemble are cycling behind it.
        </p>
      </Section>

      <Section num="05" label="Content Spine" title="Nine disciplines, each a real destination">
        <p>
          The disciplines are the product. Each gets its own route, its own imagery and
          its own path into the booking flow, rather than sitting as a line item on a
          services page. For a foreign client this is the explanatory layer; for a
          Mongolian client it is a direct link to the thing they already came for.
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
          Navigation uses the native View Transitions API rather than a JS animation
          layer. The defaults are too quick to read as deliberate, so the morph is
          stretched to 420ms on a <code>cubic-bezier(.32,.72,0,1)</code> curve — a long
          ease-out that decelerates into place instead of snapping.
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
          Every discipline, event and seasonal programme funnels into one ordering route
          with a server-side load. The form asks the questions that actually determine a
          quote in this business — which art form, what kind of event, what date — rather
          than a generic contact box that guarantees a second email.
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
          A seasonal business needs to go quiet without looking broken. The site ships
          with its off-states designed rather than defaulted, so the client can change the
          public face of the company without calling anyone.
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

      <Section num="09" label="Stack" title="Why SvelteKit and compiled messages">
        <p>
          A bilingual content site is exactly the case where a compiled i18n layer pays
          for itself — the alternative ships both dictionaries to every visitor forever.
          Svelte 5&apos;s runes keep the interactive pieces reactive without a client-side
          framework runtime sitting under static content.
        </p>
        <Table head={["Layer", "Choice", "Why"]} rows={STACK} />
      </Section>

      <Section num="10" label="Outcome" title="Shipped, in two languages, neither of them second.">
        <p>
          Nair now has a digital home that treats its own market as the primary audience
          and international clients as equally served — not a Mongolian company presenting
          itself in English with a toggle in the corner.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
