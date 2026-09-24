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

const IMG = "/demos/pomo/assets";

const PALETTE = [
  { name: "Cream", val: "#F4EFE6" },
  { name: "Paper", val: "#F0EDE8" },
  { name: "Ink", val: "#2B221F" },
  { name: "Rust", val: "#C24A30" },
  { name: "Amber", val: "#D98A2B" },
  { name: "Sage", val: "#6F9F7C" },
  { name: "Stone", val: "#DDD6CB" },
];

const KEYS = [
  ["⌃⌥S", "Sync mode on/off", "The interruption timer. The one shortcut that gets used most."],
  ["⌃⌥M", "Voice memo", "Only in sync mode — you record why you got pulled away."],
  ["⌃⌥P", "Pause / resume", "Because reaching for the widget defeats the widget."],
  ["⌃⌥↵", "Skip phase", "When a block is dead, kill it rather than lie to the log."],
  ["⌃⌥N", "Notch ⇄ float", "Same app, two homes."],
  ["⌃⌥K", "Peek", "Pull it out without the mouse."],
] as const;


const OUTCOMES = [
  { num: "9MB", label: "Installed size", desc: "A native binary. The comparable Electron build starts around 150MB before you write a feature." },
  { num: "0", label: "Price, forever", desc: "No licence, no trial, no account, no pro tier holding the long break hostage." },
  { num: "6", label: "Global hotkeys", desc: "Every core action reachable from any app, because the widget can't hold focus." },
];

export default function PomoCaseStudy() {
  return (
    <CaseStudy slug="pomo">
      <p className="cs-eyebrow">Toybox / 910studio</p>
      <h1>
        Charging for a countdown is <i>a crime</i>
      </h1>
      <p className="cs-lede">
        The market is full of beautiful pomodoro apps that want your card details to
        count to twenty-five. So we built our own. It started in the terminal and
        ended up behind the MacBook notch. It is free and will stay free.
      </p>

      <div className="cs-meta">
        <Meta label="what" value="Notch-native pomodoro for macOS" />
        <Meta label="by" value="910studio" />
        <Meta label="price" value="Free forever" live />
        <Meta label="source" value="github.com/910studio/pomo" live />
      </div>

      <div className="cs-bleed">
        <Image
          src={`${IMG}/thumb.png`}
          alt="pomo expanded out of the notch — clock, weather and per-project notes"
          width={1600}
          height={1100}
          priority
        />
        <div className="cs-cap">
          <span>Hover the notch and the card stretches out; move away and it tucks back</span>
          <b>v0.2.0</b>
        </div>
      </div>

      <Section num="01" label="The Problem" title="Some of them look great. That's not worth a subscription.">
        <p>
          A few of them are genuinely well designed. That is the frustrating part —
          good design being used to justify renting a countdown.
        </p>
        <p>
          What we wanted did not exist at any price: cycle tracking, a mode for when
          something drags you off-task, and notes in the same place as the timer.
          Every tool solved one and sent you elsewhere for the rest.
        </p>
        <Quote cite="The brief, in full">
          It is fucking stupid to pay just for a countdown app with cute features.
        </Quote>
      </Section>

      <Section num="02" label="v1 — Terminal" title="It started in the terminal, on purpose">
        <p>
          v1 was a Python TUI — an anime tamagotchi pomodoro with sync tracking and
          daily docs, in a spare terminal window. Chosen for power efficiency, and
          because a pixel timer among monospace text looked right. It also solved the
          desktop problem: a terminal tab is a window you already have open.
        </p>
      </Section>

      <Section num="03" label="Why v1 Lost" title="Three things killed the terminal build">
        <div className="cs-grid cs-grid-3">
          <div className="cs-card">
            <span className="cs-kicker">Heat</span>
            <h3>It cooked the laptop</h3>
            <p>
              A TUI redrawing a timer is a loop that never sleeps. The thing chosen
              for power efficiency turned out to be the thing spinning the fans —
              the exact opposite of the reason it existed.
            </p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Noise</span>
            <h3>The pings were annoying</h3>
            <p>
              A notification every phase change, whether or not you were mid-thought.
              An alert that interrupts focus to tell you about focus is a bad trade.
            </p>
          </div>
          <div className="cs-card">
            <span className="cs-kicker">Windows</span>
            <h3>It was still a window</h3>
            <p>
              Everything got packed into one terminal window — and it was still a
              window, still in the stack, still buried. Finding the notes meant
              hunting for it, which was the problem we started with.
            </p>
          </div>
        </div>
        <Quote self cite="910studio — on scrapping v1">
          We fit everything into one window and then realised the window itself was
          the bug.
        </Quote>
      </Section>

      <Section num="04" label="v2 — The Notch" title="The one piece of screen you already ignore">
        <p>
          Every Mac has a strip of dead pixels no app is allowed to use. Always visible,
          never in the way, and you have already trained yourself not to look at it. Ideal for
          something you want glanceable but not present.
        </p>
        <p>
          By default it hides behind the notch showing only the time. Hover and the card
          stretches out, Dynamic Island style. When a block ends it peeks out on its own for a
          few seconds instead of firing a banner — which fixes v1&apos;s second problem: the
          app shows itself rather than interrupting you.
        </p>
        <div className="cs-grid cs-grid-2">
          <figure className="cs-frame">
            <Image src={`${IMG}/minimized.png`} alt="pomo minimized behind the notch, showing only the clock" width={264} height={136} />
            <figcaption className="cs-cap">
              <span>Minimized — tucked under the notch</span>
              <b>Resting</b>
            </figcaption>
          </figure>
          <figure className="cs-frame">
            <Image src={`${IMG}/expanded.png`} alt="pomo expanded, showing clock, weather, controls and notes" width={839} height={351} />
            <figcaption className="cs-cap">
              <span>Expanded — clock, weather, controls, notes</span>
              <b>On hover</b>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section num="05" label="Sync Mode" title="A timer that doesn't lie about your focus">
        <p>
          A pomodoro that keeps counting while a colleague is at your desk is recording
          fiction. <code>⌃⌥S</code> starts a count-up interruption timer, so the day
          ends on the honest number.
        </p>
        <p>
          In sync mode you can record a voice memo. A pixel spectrum dances with your
          voice, it saves to <code>~/.pomo/memos/</code>, and a ▶ chip drops into the
          active note. The interruption gets captured instead of evaporating.
        </p>
      </Section>

      <Section num="06" label="Notes" title="Rich in the widget, plain Markdown on disk">
        <p>
          Notes are per project, because the reason this exists is juggling several at
          once. Rich text where you type — bold, headings, checkboxes, nested lists —
          and plain <code>.md</code> on disk. Nothing is trapped in the app. If we stop
          shipping it tomorrow, your notes are still just files.
        </p>
      </Section>

      <Section num="07" label="Drop Shelf" title="A file shelf in the dead pixels">
        <p>
          Drag a file onto the widget and it stashes as a pixelated preview chip. Drag
          it back out into Finder or Slack and a copy is delivered. Nothing is stored;
          the shelf clears on quit.
        </p>
        <p>
          The launch animation samples whatever is behind the notch so its doodle lines
          stay visible on any wallpaper. Nobody asked for that. It is a toy.
        </p>
      </Section>

      <Section num="08" label="Keyboard" title="Every binding is system-wide, by necessity">
        <p>
          A widget that appears on hover can never hold keyboard focus, so every core
          action is a global <code>⌃⌥</code> hotkey. Correct behaviour anyway for
          something you are not supposed to look at.
        </p>
        <Table head={["Key", "Action", "Why"]} rows={KEYS} />
      </Section>

      <Section num="09" label="Design" title="Cream, ink, rust, and the Minecraft typeface">
        <p>
          Pixel icons, hard cartoon shadows, zero radius. The ink is 910studio&apos;s
          own <code>#2B221F</code> — this one is ours, so it wears the studio&apos;s
          colours. Rust for active, amber for warnings, sage for done.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#C24A30" }} />
          <div style={{ background: "#D98A2B" }} />
          <div style={{ background: "#2B221F" }} />
        </div>
        <Swatches colors={PALETTE} />
      </Section>


      <Section num="11" label="Free" title="No licence, no trial, no account.">
        <p>
          It ships unsigned, so macOS calls it damaged on first open. One{" "}
          <code>xattr -cr</code> fixes it, and the installer does that for you. Paying
          Apple ninety-nine dollars a year to give away a countdown would be its own
          kind of crime.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail
        headline="Take it. It's free."
        download={{ href: "https://github.com/910studio/pomo/releases/latest", label: "Download pomo →" }}
        backHref="/toybox"
        backLabel="All toys"
      />
    </CaseStudy>
  );
}
