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
  { name: "Ground", val: "#06090C" },
  { name: "Elevated", val: "#121518" },
  { name: "Crimson", val: "#9E1C21" },
  { name: "Crimson Light", val: "#B32228" },
  { name: "Paper", val: "#F9F9FB" },
  { name: "Mist", val: "#EEF0F4" },
  { name: "Slate", val: "#1A1F24" },
];

const DISCIPLINES = [
  { name: "Urtin duu", en: "Long song", note: "The extended-melody tradition — UNESCO-listed, and the hardest to stage well." },
  { name: "Khöömii", en: "Throat singing", note: "Overtone singing. The discipline most non-Mongolian audiences arrive already knowing." },
  { name: "Morin khuur", en: "Horsehead fiddle quartet", note: "The national instrument, arranged for four players." },
  { name: "Tsam", en: "Masked ritual dance", note: "Buddhist ritual dance with carved masks. Visually the loudest thing on the roster." },
  { name: "Mongol bujig", en: "Mongolian dance", note: "Traditional choreography, staged for both banquet rooms and full theatres." },
  { name: "Uran nugaralt", en: "Contortion", note: "The circus-adjacent discipline, and the one that travels furthest internationally." },
  { name: "Yörööl", en: "Blessings & eulogies", note: "Spoken-word blessing. Opens most Mongolian ceremonies — a booking category in itself." },
  { name: "Ardiin duu", en: "Folk song", note: "Regional folk repertoire, arranged for ensembles of varying size." },
  { name: "Ündesnii khögjim", en: "National music ensemble", note: "The full traditional orchestra. The largest configuration Nair books." },
];

const MODES = [
  { name: "Coming soon", detail: "A holding page the client can switch to before a season opens, without a redeploy." },
  { name: "Maintenance", detail: "A dedicated route for planned downtime rather than a broken page or a bare 500." },
  { name: "Error", detail: "A branded +error boundary — a failure that still looks like the company it belongs to." },
  { name: "llms.txt", detail: "A machine-readable summary endpoint, so language models describing the company get it from the source." },
];

const STACK = [
  ["Framework", "SvelteKit 2", "File-based routing across four content types with server loads per route."],
  ["Runtime", "Svelte 5 runes", "$state / $derived throughout. Fine-grained reactivity, no virtual DOM overhead."],
  ["i18n", "Paraglide JS 2", "Compiled messages — the unused locale is not shipped to the client at all."],
  ["Styling", "Tailwind v4", "@theme tokens, plus forms and typography plugins for the long-form content."],
  ["Motion", "View Transitions API", "Native cross-document morphs, tuned rather than reimplemented in JS."],
  ["Deploy", "adapter-vercel", "Edge delivery with per-route server loads and preview builds for client review."],
] as const;

const OUTCOMES = [
  { num: "2", label: "Languages, no second-class one", desc: "Mongolian and English are peers — locale-prefixed routes, compiled messages, neither one an afterthought." },
  { num: "9", label: "Disciplines catalogued", desc: "Each traditional art form gets its own route, imagery and booking path." },
  { num: "14", label: "Route shapes", desc: "Home, events, seasonal, programmes, services, disciplines, ordering, plus the operational modes." },
];

export default function NairCaseStudy() {
  return (
    <CaseStudy slug="nair">
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

      <figure className="cs-frame">
        <Image src={`${IMG}/hero.png`} alt="Nair Entertainment homepage — a traditional ensemble performing inside a ger" width={1600} height={900} priority />
        <figcaption className="cs-cap">
          <span>The homepage opens on a video of the full ensemble, mid-performance</span>
          <b>Live</b>
        </figcaption>
      </figure>

      <Section num="01" label="The Brief" title="Two audiences, one company, and no shared default language">
        <p>
          Nair sells the same nine art forms to two very different buyers. A Mongolian
          client booking a wedding blessing knows what a yörööl is and needs to know who
          is available in October. A foreign client booking a gala has heard of throat
          singing, has never heard of tsam, and needs the whole category explained before
          a price means anything.
        </p>
        <p>
          Most bilingual sites in this market solve that by building in English and
          bolting Mongolian on — which reads, to a Mongolian client, exactly like what it
          is. The brief was to make both languages first-class, and to make the heritage
          feel expensive rather than folkloric.
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
          The visible default is Mongolian: the language control offers{" "}
          <em>EN</em> as the thing you switch to, not as the state you are in. That is a
          one-word decision that tells a local client whose site this is.
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

        <Quote self cite="910studio — on the language decision">
          A translation toggle in the corner tells your local audience they are visiting
          the foreign version of their own culture. Two real URLs cost the same to build
          and say the opposite.
        </Quote>
      </Section>

      <Section num="03" label="Colour System" title="Deel crimson on ger-at-night black">
        <p>
          The palette comes off the performers themselves. The ensemble wears deep red
          silk deels; the stage behind them is near-black. Crimson carries every
          interactive state and the paper tone is kept slightly cool so the red stays the
          warmest thing on screen — which is the point, because the red is the costume.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#9E1C21" }} />
          <div style={{ background: "#B32228" }} />
          <div style={{ background: "#06090C" }} />
        </div>
        <Swatches colors={PALETTE} />
      </Section>

      <Section num="04" label="Content Spine" title="Nine disciplines, each a real destination">
        <p>
          The disciplines are the product. Each one gets its own route, its own imagery
          and its own path into the booking flow — rather than being a line item on a
          services page. For a foreign client this is the explanatory layer; for a
          Mongolian client it is a direct link to the thing they already came for.
        </p>
        <div className="cs-stack">
          {DISCIPLINES.map((d) => (
            <div key={d.name} className="cs-row">
              <b>{d.name}</b>
              <p>
                <strong>{d.en}.</strong> {d.note}
              </p>
            </div>
          ))}
        </div>

        <div className="cs-grid cs-grid-4">
          <figure className="cs-frame fill">
            <Image src={`${IMG}/khoomii.png`} alt="Khöömii — throat singing" width={310} height={240} />
            <figcaption className="cs-cap">
              <span>Khöömii</span>
            </figcaption>
          </figure>
          <figure className="cs-frame fill">
            <Image src={`${IMG}/morin-khuur-quartet.png`} alt="Morin khuur quartet" width={310} height={240} />
            <figcaption className="cs-cap">
              <span>Morin khuur</span>
            </figcaption>
          </figure>
          <figure className="cs-frame fill">
            <Image src={`${IMG}/mongol-bujig.png`} alt="Mongol bujig — traditional dance" width={422} height={240} />
            <figcaption className="cs-cap">
              <span>Mongol bujig</span>
            </figcaption>
          </figure>
          <figure className="cs-frame fill">
            <Image src={`${IMG}/urtin-duu.png`} alt="Urtin duu — long song" width={644} height={240} />
            <figcaption className="cs-cap">
              <span>Urtin duu</span>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section num="05" label="Motion" title="We tuned the browser's transitions instead of rebuilding them">
        <p>
          Navigation uses the native View Transitions API rather than a JS animation
          layer. The defaults are too quick to read as deliberate, so the morph is
          stretched to 420ms on a{" "}
          <code>cubic-bezier(.32,.72,0,1)</code> curve — a long ease-out that decelerates
          into place instead of snapping. The reference point was Apple Music: heavy
          things that move like they have mass.
        </p>
        <p>
          Under <code>prefers-reduced-motion</code> the same transitions collapse to 1ms.
          Not disabled — collapsed, so the navigation logic is identical and there is no
          second code path to keep working.
        </p>
        <Quote cite="src/routes/layout.css — the actual comment in the shipped stylesheet">
          Slow the morph to feel like Apple Music.
        </Quote>
      </Section>

      <Section num="06" label="Booking" title="From a discipline to a dated enquiry">
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

      <Section num="07" label="Operational Modes" title="The states most sites only discover in production">
        <p>
          A seasonal business needs to be able to go quiet without looking broken. The
          site ships with the off-states designed rather than defaulted, so the client can
          switch the public face of the company without calling anyone.
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

      <Section num="08" label="Stack" title="Why SvelteKit and compiled messages">
        <p>
          A bilingual content site is exactly the case where a compiled i18n layer pays
          for itself: the alternative ships both dictionaries to every visitor forever.
          Svelte 5&apos;s runes keep the interactive pieces — the services drawer, the
          booking form, the language control — reactive without a client-side framework
          runtime sitting under static content.
        </p>
        <Table head={["Layer", "Choice", "Why"]} rows={STACK} />
      </Section>

      <Section num="09" label="Outcome" title="Shipped, in two languages, neither of them second.">
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
