import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nair Entertainment — Case Study",
  description:
    "The nair.mn design system, and how we found it: the tracking rule that fell out of a division, the 4px nesting nobody encoded, and one neutral at eleven alphas. Every component rebuilt at 1:1, no screenshots.",
  openGraph: {
    title: "Nair Entertainment — 910 Case Study",
    description:
      "One neutral at eleven alphas, and a crimson that concentrates where the decision is. Rebuilt at 1:1, with the counts that found it.",
  },
};

import { CaseStudy, Meta, Section, Stats, Tail } from "@/components/case-study/shell";
import {
  Curve,
  Curves,
  Cuts,
  Dim,
  Drawing,
  Ink,
  Ladder,
  Paper,
  Part,
  Probe,
  Parts,
  Radii,
  Ramp,
  Sheet,
  Source,
  Spec,
  State,
  TrackPlot,
  States,
  TypeScale,
} from "@/components/case-study/drafting";
import "./replica.css";

const IMG = "/demos/nair/assets";

/* ── the client's own values ───────────────────────
   Nothing on this page is remembered. Every number was read out of
   nair-final/src or off the live bundle, and the components further down are
   not pictures of Nair's UI: they are Nair's UI, rebuilt from those rules, so
   a reader can inspect them in the browser. See ./replica.css for the CSS
   they render with and where each block came from. */
const INK = "#06090C";
const CRIMSON = "#9E1C21";
const HOVER = "#1A1F24";

const TYPE = [
  { role: "Section title", size: 40, lh: 48, weight: 600, track: 0.4, sample: "Үндэсний урлагийн Найр", note: "24/32 on mobile" },
  { role: "Card title · drawer nav", size: 24, lh: 32, weight: 600, track: 0.24, sample: "Хөөмий, уртын дуу, цам бүжиг" },
  { role: "Question · programme head", size: 20, lh: 28, weight: 500, track: 0.4, sample: "Захиалга хэрхэн өгөх вэ?" },
  { role: "Primary CTA", size: 18, lh: 24, weight: 700, track: 0.36, sample: "Захиалга өгөх" },
  { role: "Body · badge · option", size: 16, lh: 24, weight: 400, track: 0.32, sample: "Хуримын хөтөлбөрөө цагийн хуваарьтай нь бүрэн харна." },
  { role: "Field label · button", size: 14, lh: 20, weight: 600, track: 0.28, sample: "Найр ёслолын сайн цаг" },
  { role: "Hint", size: 13, lh: 19, weight: 400, track: 0.26, sample: "Зочдыг урьснаас 45 минутын дараа хөтөлбөр эхэлнэ." },
] as const;

const STEPS = [
  { px: 4, use: "the unit itself" },
  { px: 8, use: "icon gap, button radius" },
  { px: 10, use: "chip padding, calendar radius", off: true },
  { px: 12, use: "field gap, card radius" },
  { px: 14, use: "option padding-block, button padding-left", off: true },
  { px: 16, use: "programme item gap, card radius" },
  { px: 18, use: "option padding-inline, note padding", off: true },
  { px: 20, use: "programme gap, note padding-inline" },
  { px: 24, use: "card padding, contact grid gap" },
  { px: 32, use: "pill radius, date column gap" },
  { px: 40, use: "form block gap" },
  { px: 48, use: "logo height" },
  { px: 64, use: "page gutter, section padding-inline" },
  { px: 100, use: "section padding-block" },
] as const;

/* Tracking as shipped, per style. Plotted rather than asserted: track/size
   gives 0.02em everywhere up to 20px and 0.01em from 24px, and the step is
   the finding. */
const TRACK = TYPE.map((t) => ({ size: t.size, track: t.track, role: t.role }));

/* The programme card, measured. Nesting gaps are 24 / 20 / 16 / 12 — exactly
   one 4px unit less at each level inward. Heights are deterministic because
   every line-height in the card is explicit: title 28, item 24. */
const CARD_W = 380;
const CARD_H = 24 + 28 + 20 + (3 * 24 + 2 * 16) + 24; /* 200 */

const RAMP = [
  { a: "05", pct: "2%", use: "Badge fill, softest card shadow" },
  { a: "0a", pct: "4%", use: "Every surface and every resting outline" },
  { a: "14", pct: "8%", use: "Hover fill, card shadow" },
  { a: "29", pct: "16%", use: "Outline on hover, unread word in the reveal" },
  { a: "3d", pct: "24%", use: "The white hairline on dark buttons" },
  { a: "52", pct: "32%", use: "Button shadow, programme dot" },
  { a: "66", pct: "40%", use: "Drawer scrim, info glyph" },
  { a: "7a", pct: "48%", use: "Weekday labels, footer copy" },
  { a: "8f", pct: "56%", use: "Credit wordmark" },
  { a: "a3", pct: "64%", use: "Body copy, calendar legend" },
  { a: "cc", pct: "80%", use: "Drawer navigation link" },
] as const;

/* Where the accent is actually spent. An earlier draft of this page claimed
   crimson appeared three times "in the shipped stylesheet" — true of the
   homepage bundle, and wrong by a factor of twenty against the source. The
   real distribution is the better story anyway. */
const SPEND = [
  { where: "OrderForm.svelte", n: 23, what: "selection outline, focus ring, the auspicious day marks" },
  { where: "ServiceBig.svelte", n: 15, what: "run-of-show heads, the part chooser, price" },
  { where: "order/+page.svelte", n: 3, what: "the route's own headings" },
  { where: "programme/[slug]", n: 3, what: "section rules on a published programme" },
  { where: "11 other files", n: 15, what: "one or two each: a title, a mark, a hover" },
] as const;

const RADII = [
  { r: "8px", owns: "Header button, chip, tooltip" },
  { r: "10px", owns: "Calendar day" },
  { r: "12px", owns: "Option row, input, note" },
  { r: "16px", owns: "Programme card, service card" },
  { r: "24px", owns: "Badge" },
  { r: "32px", owns: "Pill" },
] as const;

/* August 2026, exactly as the live form draws it. Aug 1 is a Saturday, so the
   Monday-based grid opens with five blanks. Auspicious days come from
   src/lib/booking.ts, which a shell script fills from the only machine-
   readable Mongolian lunar-calendar source that exists. */
const AUSPICIOUS: Record<number, "disc" | "ring" | "both"> = {
  11: "ring",
  15: "ring",
  31: "disc",
};
const TODAY = 26;
const SELECTED = 31;
const HOVERED = 28;
const LEADING = 5;
const DAYS = 31;

const HOURS = [
  "Луу цаг (08:40–09:40)",
  "Могой цаг (09:40–11:40)",
  "Морь цаг (11:40–13:40)",
  "Хонь цаг (13:40–15:40)",
] as const;

const PROGRAMME = [
  { label: "Хөтлөгч найрыг нээх", active: true },
  { label: "Ерөөл хэлэх", active: true },
  { label: "Морин хуурын квартет", active: true },
  { label: "Уран нугаралт", active: false },
  { label: "Цам бүжиг", active: false },
] as const;

const KILLED = [
  {
    killed: "The pattern belt",
    why: "The services call-to-action launched as a decorative belt of cloud-pattern buttons. Three days in, nobody was reaching services through it.",
    shipped: "One plain button in the nav. Ornament lost to wayfinding.",
  },
  {
    killed: "Prices on service pages",
    why: "Service pages carried a price and a phone number. A quote depends on what, when and where, and a number printed on a page answers none of the three.",
    shipped: "One ordering route, where the price is the answer to a form rather than a label on a poster.",
  },
  {
    killed: "The avatar grid",
    why: "The big service layout shipped as a grid of performer headshots. It read as a staff directory, which is not the thing anyone is buying.",
    shipped: "A poster-style part chooser. The page stopped listing people and started casting them.",
  },
  {
    killed: "The separate roster",
    why: "Roster and gallery sat in two sections, so a reader had to hold the agenda in their head while scrolling to find who was in it.",
    shipped: "One run-of-show. Agenda and cast are one document at a Nair booking, so they became one on screen.",
  },
] as const;

const OUTCOMES = [
  { num: "11", label: "Alphas, one hue", desc: "The entire neutral system is #06090C at eleven opacities. There is no second grey anywhere in the build." },
  { num: "2", label: "Languages, neither second", desc: "Mongolian and English are peers. Two real URLs, both indexable, no toggle-in-the-corner." },
  { num: "210", label: "Days of booking window", desc: "Widened after launch. Wedding dates get claimed first, and a window that made people ask twice would be a window that lost the date." },
];

/* ── icons, redrawn ────────────────────────────────
   Traced off the client's own SVGs rather than substituted with a glyph. A
   ☰ from the system font would be the wrong weight and the wrong cap height,
   which is precisely the sort of thing this page is about. */
const Burger = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const Globe = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
    <path d="M1.75 8h12.5M8 1.75c1.6 1.7 2.5 3.9 2.5 6.25S9.6 12.55 8 14.25c-1.6-1.7-2.5-3.9-2.5-6.25S6.4 3.45 8 1.75Z" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);
const Info = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" />
    <line x1="8" y1="7" x2="8" y2="11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
  </svg>
);

/* One option row, in whichever state it is being drawn. `pad` draws the
   content box, which is worth doing on the sheet about the component and
   nowhere else: an outline on every replica turns the accent into wallpaper
   on the one page arguing the accent is rationed. */
function Opt({
  label,
  state,
  pad,
}: {
  label: string;
  state?: "hover" | "selected" | "focus";
  pad?: boolean;
}) {
  return (
    <div className="nr-opt" data-state={state} data-pad={pad ? "" : undefined}>
      <span className="nr-opt__dot" />
      <span className="nr-opt__label">{label}</span>
    </div>
  );
}

function CalendarDay({ day }: { day: number }) {
  const mark = AUSPICIOUS[day];
  const disabled = day < TODAY;
  const active = day === SELECTED;
  const cls = [
    "nr-cal__day",
    mark ? "nr-cal__day--auspicious" : "",
    disabled ? "nr-cal__day--disabled" : "",
    active ? "nr-cal__day--active" : "",
    day === HOVERED ? "nr-cal__day--hover" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls}>
      {day}
      {mark ? (
        <span className="nr-cal__marks">
          {mark === "ring" || mark === "both" ? <i className="nr-cal__mark nr-cal__mark--ring" /> : null}
          {mark === "disc" || mark === "both" ? <i className="nr-cal__mark" /> : null}
        </span>
      ) : null}
    </span>
  );
}

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
      <p className="cs-lede">
        Nair books Mongolia&apos;s traditional performing arts. There are no
        screenshots below. Every component is rebuilt here in the browser from the
        values in the source, every measurement is drawn on the thing it measures,
        and every number is shown with the command that produced it. Right-click
        any of it and inspect it.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Nair Entertainment" />
        <Meta label="executor" value="910studio" />
        <Meta label="scope" value="Brand System, Bilingual Architecture, Frontend, Deploy" />
        <Meta label="live" value="nair.mn" live />
      </div>

      <Section num="01" label="The Brief" title="A booking is a document before it is a party">
        <p>
          Nair&apos;s product is a ceremony that goes right, and a ceremony goes
          right because a stack of paper says who walks on when, at which hour, in
          what order. So the site had one job: be that document, in the language of
          the people signing it, and let the performers be the only thing on it
          carrying colour.
        </p>
        <p>
          Everything below follows from that. A near-black held in one hue so
          nothing drifts warm or cool. A four-pixel grid the type sits on too. And
          a crimson lifted off the silk deels, rationed so hard you can watch it
          concentrate as a visitor gets closer to committing.
        </p>
      </Section>

      <Sheet n="02" label="Type" src="src/lib/components — set in Inter">
        <p>
          Seven styles carry the whole site. Each sample below is set at its real
          size, weight and tracking, on baseline rules drawn at its own leading.
        </p>
        <Paper
          face="var(--font-inter), Inter, system-ui, sans-serif"
          cap={
            <>
              <b>Leading.</b> Every value is a multiple of four, so the type sits
              on the same grid as the spacing: 20, 24, 28, 32, 48. One exception,
              the hint at 13/19. A 20px leading would have put it on the grid and
              half a step further from the label it belongs to, and the pairing
              mattered more than the rule did.{" "}
              <b>Substitution.</b> Nair ships{" "}
              <code>Google Sans, Product Sans, Inter, system-ui</code>. The first
              two are Google-internal and not redistributable, so these specimens
              set in the client&apos;s own declared next fallback rather than
              quietly faking the face.
            </>
          }
        >
          <TypeScale rows={TYPE} />
        </Paper>

        <p>
          Nothing in the source says there is a tracking rule. It turned up by
          dividing each shipped letter-spacing by its own font size and seeing
          whether the results scattered. They do not.
        </p>

        <Probe
          cmd={`grep -rhoE 'font-size:[0-9]+px[^}]*letter-spacing:[.0-9]+px' src | sort -u`}
          out="13/.26  14/.28  16/.32  18/.36  20/.4  24/.24  40/.4"
        >
          Seven styles, and every one of them divides to either{" "}
          <b>0.02em</b> or <b>0.01em</b>. The scale stops being a list of sizes
          at that point and starts being a system, because a rule you can state
          in nine words is a rule the next person can follow.
        </Probe>

        <Paper
          cap={
            <>
              <b>+0.02em up to 20px, +0.01em from 24px.</b> Small text loosens
              because at 13px the counters close up and the words stop separating;
              display text tightens because at 40px the default gaps are already
              too wide to read as one phrase. Seven styles, one step, no drift.
              The only thing in the build that leaves the plot is the 15px
              wordmark, which goes negative at &minus;0.01em, and a wordmark is a
              logo rather than a style.
            </>
          }
        >
          <TrackPlot
            points={TRACK}
            bands={[
              { em: 0.02, label: "+0.02em" },
              { em: 0.01, label: "+0.01em" },
            ]}
          />
        </Paper>
      </Sheet>

      <Sheet n="03" label="Measure" src="ProgramList.svelte, dimensioned">
        <p>
          One unit, four pixels. Rather than list the values the system owns, here
          is one real component with its geometry measured on it. Read the vertical
          dimensions from the outside in.
        </p>

        <Probe
          cmd="sed -n '/.program {/,/}/p;/__list {/,/}/p;/__item {/,/}/p' ProgramList.svelte | grep -E 'padding|gap'"
          out={`padding: 24px;   gap: 20px;\ngap: 16px;\ngap: 12px;`}
        >
          This was not something we set out to find. Pulling the card&apos;s own
          spacing declarations to draw them accurately put four numbers in a
          column, and they came out <b>24, 20, 16, 12</b> — one unit less at
          each level inward. No token encodes it and no comment mentions it.
        </Probe>

        <div className="replica nr">
          <Drawing
            w={CARD_W}
            h={CARD_H}
            measures={[
              /* the nesting, outside in. This is the whole sheet. */
              { axis: "y", a: 0, b: 24, at: -18, label: "24" },
              { axis: "y", a: 52, b: 72, at: -18, label: "20" },
              { axis: "y", a: 96, b: 112, at: -18, label: "16" },
              { axis: "y", a: 176, b: 200, at: -18, label: "24" },
              /* the innermost step, chained. Staggered down onto three lines
                 because 24 / 20 / 12 side by side put their labels on top of
                 one another — which is what a drawing staggers for. */
              { axis: "x", a: 0, b: 24, at: CARD_H + 26, label: "24" },
              { axis: "x", a: 24, b: 44, at: CARD_H + 48, label: "20" },
              { axis: "x", a: 44, b: 56, at: CARD_H + 70, label: "12" },
              { axis: "y", a: 0, b: CARD_H, at: CARD_W + 20, label: `${CARD_H}` },
            ]}
            notes={[
              /* both leaders run OUT of the card into empty gutter. Drawn from
                 a point inside it they crossed the very text they annotate. */
              { x: 24, y: 24, dx: 44, dy: -34, text: "title 20/28 — the only crimson" },
              { x: CARD_W, y: 16, dx: 26, dy: -26, text: "R16" },
            ]}
          >
            <div className="nr-program" style={{ width: CARD_W, maxWidth: "none", height: CARD_H }}>
              <p className="nr-program__title">Хөтөлбөрийн хуваарь</p>
              <ul className="nr-program__list">
                {PROGRAMME.slice(0, 3).map((p) => (
                  <li key={p.label} className="nr-program__item">
                    <span className="nr-program__dot" />
                    <span className="nr-program__label">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Drawing>
        </div>

        <p className="bp-cap">
          <b>24, 20, 16, 12.</b> The card loses exactly one unit at every level of
          nesting: 24 of padding at the edge, 20 from the heading to the list, 16
          between items, 12 from a marker to its label. Nothing in the source says
          so and no token encodes it. It is what falls out of choosing each gap
          against the one containing it, and it is why the card reads as ordered
          before you have read a word of it.
        </p>

        <p>
          Across the whole build the unit holds. Every value, drawn to scale:
        </p>

        <Paper
          cap={
            <>
              <b>Grey bars break the unit.</b> Three do, out of fourteen, and each
              earns it: 10px centres a 20px glyph in a 40px chip and sets the
              calendar day&apos;s corner, 14px pulls a button&apos;s left padding in
              under its icon so the optical gap matches the 16 on the right, and
              18px sets the option row a half-step wider than a 16 would. A scale
              reported without its exceptions is decoration.
            </>
          }
        >
          <Ladder steps={STEPS} />
        </Paper>
      </Sheet>

      <Sheet n="04" label="Ink" src="counted across nair-final/src">
        <p>
          The entire neutral system is one colour. <code>{INK}</code> at eleven
          alphas covers every surface, outline, shadow and weight of text in the
          build. Nothing is a different grey, because there are no different greys.
        </p>
        <Paper
          cap={
            <>
              <b>Why one hue.</b> Alphas of a single near-black cannot drift warm or
              cool against one another, so the crimson never has to fight a grey
              that has quietly gone blue. <b>{HOVER}</b> is the only other
              non-neutral in the build, and it exists solely as the ground under a
              dark button being hovered.
            </>
          }
        >
          <Ramp base={INK} steps={RAMP} />
          <Ink val={CRIMSON} name="Deel crimson" total={59} files={15} of={28} spend={SPEND} />
        </Paper>
        <Probe
          cmd={[
            `grep -rniE '9e1c21|rgba\\(158' src | wc -l`,
            `grep -rlniE '9e1c21|rgba\\(158' src | wc -l`,
          ]}
          out={["59", "15"]}
        >
          An earlier draft of this page said crimson appeared <b>three times</b>{" "}
          in the shipped stylesheet. That was true of the homepage bundle and
          wrong against the source by a factor of twenty. The count is the only
          reason we caught it, and the real distribution turned out to be the
          better story: the colour is not rare, it is <b>concentrated</b>.
        </Probe>

        <p className="cs-note">
          Two thirds of the accent in the entire codebase is spent inside the
          booking flow. On the homepage it is a stroke on the intro mark and one
          word in a paragraph. By the time someone is choosing a date it is the
          selection ring, the focus ring and the mark on a holy day. The colour
          arrives exactly as the stakes do.
        </p>
      </Sheet>

      <Sheet n="05" label="Parts" src="rebuilt from src, not captured">
        <p>
          These are not screenshots. Every element below is built from the same
          values the client ships, rendered live at actual size. The crimson outline
          inside each one is its content box, so the gap between that outline and
          the element&apos;s edge is the padding, at scale.
        </p>

        <div className="replica nr">
          <Parts>
            <Part name="Button / primary" spec="r8 · 14/16 600" note="pad 12·16·12·14">
              <span className="nr-btn nr-btn--primary" data-pad="">
                <Burger />
                Бидний үйлчилгээ
              </span>
            </Part>

            <Part name="Button / secondary" spec="r8 · 14/16 600" note="fill 0a, outline 0a">
              <span className="nr-btn nr-btn--secondary" data-pad="">
                <Globe />
                EN
              </span>
            </Part>

            <Part name="Badge" spec="r24 · 16/24 500" note="fill 05, outline 0a">
              <span className="nr-badge" data-pad="">
                Захиалга
              </span>
            </Part>

            <Part name="Pill" spec="r32 · 16/24 500" note="shadow 0 8px 40px">
              <span className="nr-pill" data-pad="">
                Уран нугаралт
              </span>
            </Part>

            <Part name="Note" spec="r12 · 12/16 700" note="the only uppercase crimson">
              <div className="nr-note" data-pad="">
                <span className="nr-note__title">Төлбөрийн нөхцөл</span>
                <p className="nr-note__body">
                  Захиалга баталгаажсаны дараа урьдчилгаа төлнө.
                </p>
              </div>
            </Part>

            <Part name="Card" spec="r16 · 24/32 600" note="img 116% @ -8% for the pan">
              <div className="nr-card" data-pad="">
                {/* the photograph is not the point and this page has none.
                    What matters is its box: 116% wide at -8% left, so the
                    image can pan under the card as the shelf scrolls without
                    ever exposing an edge. Drawn, not shot. */}
                <span className="nr-card__plate" />
                <span className="nr-card__overlay" />
                <p className="nr-card__title">Хөөмий</p>
              </div>
            </Part>
          </Parts>
        </div>

        <p>
          The radius is the tell. It tracks the element&apos;s area rather than the
          brand: a 40px chip at 16 would read as a lozenge, a 360px card at 8 would
          read as a table cell.
        </p>
        <Paper>
          <Radii steps={RADII} />
        </Paper>
      </Sheet>

      <Sheet n="06" label="The Option Row" src="OrderForm.svelte .opt">
        <p>
          The form&apos;s primary control, and the payoff of rebuilding rather than
          capturing: a screenshot can only ever hold one state, and on a control the
          states worth showing are the ones a screenshot cannot hold still.
        </p>

        <div className="replica nr">
          <States>
            <State name="Rest" note="ground 0a · outline 8%">
              <Opt label="Хурим" pad />
            </State>
            <State name="Hover" note="outline steps 8% → 20%">
              <Opt label="Хурим" state="hover" pad />
            </State>
            <State name="Selected" note="2px crimson · tint 4% · lift">
              <Opt label="Хурим" state="selected" pad />
            </State>
          </States>
        </div>

        <Spec
          rows={[
            { k: "Hover", v: "outline only", n: "Nothing moves and nothing fills. The row is a target, not a button, and a target that jumps under the cursor is a target you miss." },
            { k: "Selected", v: "2px, offset -2", n: "The outline doubles in weight and eats one pixel inward, so selecting a row never changes its box or nudges its neighbours." },
            { k: "The dot", v: "inset 0 0 0 4px #fff", n: "The chosen radio is a crimson disc with a white ring punched into it by an inset shadow, rather than a second element that has to stay centred." },
            { k: "Focus", v: "3px ink, offset 2", n: "Focus is ink and not crimson, so a keyboard user can see focus and selection at the same time without the two collapsing into one signal." },
          ]}
        />
      </Sheet>

      <Sheet n="07" label="Зурхай" src="August 2026, from src/lib/booking.ts">
        <p>
          In Ulaanbaatar you do not book 9am. You book the auspicious hour, and the
          auspicious day, and both come out of the lunar calendar. The picker below
          is rebuilt from the source and shows the real August 2026 data.
        </p>

        <div className="replica nr">
          <States cols={2}>
            <State name="The day" note="r10 · disc = Дашням · ring = Балжинням">
              <div className="nr-cal">
                <div className="nr-cal__head">
                  <span className="nr-cal__nav">‹</span>
                  <span>2026 оны 8-р сар</span>
                  <span className="nr-cal__nav">›</span>
                </div>
                <div className="nr-cal__weekdays">
                  {["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"].map((d) => (
                    <span className="nr-cal__wd" key={d}>
                      {d}
                    </span>
                  ))}
                </div>
                <div className="nr-cal__grid">
                  {Array.from({ length: LEADING }, (_, i) => (
                    <span key={`b${i}`} />
                  ))}
                  {Array.from({ length: DAYS }, (_, i) => (
                    <CalendarDay key={i} day={i + 1} />
                  ))}
                </div>
                <div className="nr-cal__legend">
                  <span className="nr-cal__legend-item">
                    <i className="nr-cal__mark" /> Дашням
                  </span>
                  <span className="nr-cal__legend-item">
                    <i className="nr-cal__mark nr-cal__mark--ring" /> Балжинням
                  </span>
                </div>
              </div>
            </State>

            <State name="The hour" note="four ceremony hours, not twelve">
              <div className="nr-opts" style={{ width: "100%", maxWidth: 360 }}>
                {HOURS.map((h, i) => (
                  <Opt key={h} label={h} state={i === 0 ? "selected" : undefined} />
                ))}
              </div>
            </State>
          </States>
        </div>

        <p className="cs-note">
          Two marks, two shapes, one colour. A day can be both Дашням and
          Балжинням, which is why they had to be a disc and a ring rather than two
          different colours: the day that is both carries one of each, and a
          two-colour scheme would have had nowhere left to go. Past days keep their
          marks at 40% so the month still reads as a calendar rather than as a
          list of what is left.
        </p>

        <Source path="scripts/fetch-auspicious-days.sh">
          {`# No public API exists for Mongolian zurkhai; this is the only
# machine-readable source found. Cross-check output against a printed
# цаглабар before shipping — wrong holy days are worse than none.`}
        </Source>

        <Dim>Booking window: 210 days, widened after launch</Dim>
      </Sheet>

      <Sheet n="08" label="Rhythm" src="OrderForm.svelte .order__hint-block">
        <p>
          A field is three things stacked: a label, a hint, a control. The gap
          between them is a 12px flex gap, which would space all three evenly and
          leave the hint floating between the two things it belongs to. So the hint
          pulls itself back up by six.
        </p>

        <div className="replica nr">
          <States cols={2}>
            <State name="Field / rest" note="label → hint 6px · hint → control 12px">
              <div className="nr-field" style={{ width: "100%", maxWidth: 380 }}>
                <span className="nr-field__label">
                  Зочдоо урьсан цаг<span className="nr-field__req">*</span>
                </span>
                <p className="nr-field__hint">
                  Зочдыг урьснаас 45 минутын дараа хөтөлбөр эхэлнэ.
                </p>
                <span className="nr-field__input">
                  18:00
                </span>
              </div>
            </State>
            <State name="Field / focus" note="ground goes white · crimson at 10%">
              <div className="nr-field" style={{ width: "100%", maxWidth: 380 }}>
                <span className="nr-field__label">
                  Зочдоо урьсан цаг<span className="nr-field__req">*</span>
                </span>
                <p className="nr-field__hint">
                  Зочдыг урьснаас 45 минутын дараа хөтөлбөр эхэлнэ.
                </p>
                <span className="nr-field__input" data-state="focus">
                  18:00
                </span>
              </div>
            </State>
          </States>
        </div>

        <Source path="src/lib/components/OrderForm.svelte">
          {`/* Question caption. Shared rhythm everywhere a hint appears: the -6px pull
   against the container's 12px gap nets label → hint 6px (tight pair),
   then a full 12px from hint → control. */`}
        </Source>
      </Sheet>

      <Sheet n="09" label="Run of Show" src="service/ProgramList.svelte">
        <p>
          This is the component the whole system exists to produce, and the one
          place crimson is allowed to set a heading. Agenda and cast are one
          document at a Nair booking, so they are one on screen.
        </p>

        <div className="replica nr">
          <States cols={2}>
            <State name="Programme card" note="r16 · white · shadow 0 8px 24px at 2%">
              <div className="nr-program">
                <p className="nr-program__title">Хөтөлбөрийн хуваарь</p>
                <ul className="nr-program__list">
                  {PROGRAMME.map((p) => (
                    <li
                      key={p.label}
                      className={`nr-program__item${p.active ? "" : " nr-program__item--inactive"}`}
                    >
                      <span className="nr-program__dot" />
                      <span className="nr-program__label">{p.label}</span>
                      <span className="nr-program__info">
                        <Info />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </State>
            <State name="The marker" note="filled 32% in · hollow 24% out">
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <span className="nr-program__item">
                  <span className="nr-program__dot" />
                  <span className="nr-program__label">In this booking</span>
                </span>
                <span className="nr-program__item nr-program__item--inactive">
                  <span className="nr-program__dot" />
                  <span className="nr-program__label">Not booked</span>
                </span>
              </div>
            </State>
          </States>
        </div>

        <p className="cs-note">
          An act that is not in this booking keeps its row and empties its marker
          rather than disappearing. The client sells the full roster, so the
          programme has to read as one document with gaps in it, not as a shorter
          document that never mentions what you did not buy.
        </p>
      </Sheet>

      <Sheet n="10" label="Motion" src="plotted from the shipped declarations">
        <p>
          Navigation uses the browser&apos;s own view transitions rather than a JS
          animation layer. The defaults are too quick to read as deliberate, so the
          morph is stretched and put on a curve that decelerates into place instead
          of snapping. Under <code>prefers-reduced-motion</code> the same transitions
          collapse to 1ms: not disabled, collapsed, so the navigation logic stays
          identical and there is no second code path to keep working.
        </p>
        <Curves>
          <Curve
            p={[0.32, 0.72, 0, 1]}
            name="View transition"
            note="420ms. Every route change. Leaves fast, arrives slow, holds the last fifth almost still."
          />
          <Curve
            p={[0.16, 1, 0.3, 1]}
            name="Scroll cue"
            note="550ms. Overshoots to a stop. Used once, on the thing asking you to scroll."
          />
          <Curve
            p={[0.4, 0, 0.2, 1]}
            name="Control"
            note="200ms. Symmetrical enough to feel mechanical, which is what a control should feel like."
          />
        </Curves>
        <Source path="src/routes/layout.css">
          {`/* View Transitions API — slow the morph to feel like Apple Music. */`}
        </Source>
      </Sheet>

      <Sheet n="11" label="Language" src="two routes, one default">
        <p>
          Mongolian is not the translation. It is served at the apex, with English
          under <code>/en</code>. Both are real URLs and both are indexable, and the
          content layer falls back Mongolian-first too, so an untranslated English
          field can never blank a page for a local visitor.
        </p>

        <div className="replica nr">
          <States cols={2}>
            <State name="On /mn" note="the control reads EN">
              <span className="nr-btn nr-btn--secondary">
                <Globe />
                EN
              </span>
            </State>
            <State name="On /en" note="same control, inverted meaning">
              <span className="nr-btn nr-btn--secondary">
                <Globe />
                MN
              </span>
            </State>
          </States>
        </div>

        <p className="cs-note">
          The word is the destination, never the state. One character of difference,
          and it is the difference between a site that belongs to its audience and a
          site that has been translated for them.
        </p>

        <Spec
          rows={[
            { k: "Base locale", v: "mn, at apex", n: "English lives under /en. Neither language is a query parameter or a cookie." },
            { k: "Message keys", v: "126", n: "Half of them belong to the booking form alone: 50 order keys against 33 for the entire homepage." },
            { k: "Payload", v: "0 foreign strings", n: "A visitor on the Mongolian site never downloads a single English message." },
            { k: "Fallback", v: "mn → en", n: "Reversed from the usual. An untranslated field degrades to Mongolian, never to blank." },
          ]}
        />

        <div className="cs-band">
          <p>
            A translation toggle in the corner tells your local audience they are
            visiting the foreign version of their own culture.
          </p>
        </div>
      </Sheet>

      <Sheet n="12" label="What We Cut" src="four directions, killed in build">
        <p>Each cut is a decision about what the document is for.</p>
        <Cuts items={KILLED} />
      </Sheet>

      <Sheet n="14" label="Operations" src="what the client changes without us">
        <p>
          A seasonal business needs to go quiet without looking broken, and needs to
          do it on a Friday night without calling anyone.
        </p>
        <Spec
          rows={[
            { k: "Coming soon", v: "no deploy", n: "A holding page the client switches on before a season opens." },
            { k: "Maintenance", v: "no deploy", n: "A dedicated route for planned downtime, rather than a broken page or a bare 500." },
            { k: "Error", v: "branded", n: "A failure state that still looks like the company it belongs to." },
            { k: "Form fields", v: "per service", n: "Every question on the booking form is editable in the CMS, without a release." },
            { k: "Database", v: "none", n: "By design. A confirmation to the guest, a notification to the team, and a calendar event with the wall-clock hour pinned, because Ulaanbaatar sits at UTC+8 all year and a drift is a missed ceremony." },
            { k: "llms.txt", v: "bilingual", n: "Search is also an assistant answering \"who books throat singing in Ulaanbaatar\". Robots opt the model crawlers in explicitly, and structured data declares Nair a performing group with its repertoire." },
          ]}
        />
      </Sheet>

      <Section num="15" label="Outcome" title="A system small enough to hold in your head">
        <p>
          One near-black, eleven alphas, six radii, four easing curves and a red
          that stays out of the way until the moment somebody commits. Nair has a
          home built the way the agency actually works, the client holds the pen,
          and the document fills itself in season after season.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
