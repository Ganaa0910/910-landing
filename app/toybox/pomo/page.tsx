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

const STACK = [
  ["Shell", "Tauri 2 (Rust)", "~9MB and it sips battery. An Electron pomodoro ships a browser to count to twenty-five."],
  ["UI", "React 19 + Vite", "The panel is small and mostly static — React is here for the editor, not the timer."],
  ["Editor", "TipTap / ProseMirror", "WYSIWYG in the widget, plain Markdown on disk. Nothing is trapped in the app."],
  ["Window", "macos-private-api", "Required to sit behind the notch and paint over other apps' fullscreen Spaces."],
  ["Shortcuts", "global-shortcut", "A hover widget can never hold key focus, so every binding is system-wide."],
  ["Drag", "tauri-plugin-drag", "Real drag-out to Finder, Slack or an upload field — not a copy-path button."],
  ["Weather", "Open-Meteo", "Located by IP, no key, no account."],
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
        The market is full of beautiful pomodoro apps that want your card details
        to count to twenty-five. So we built our own — first as a terminal app,
        because we like the terminal, and then as something that lives behind the
        MacBook notch and drops out like a Dynamic Island. It is free, it will
        stay free, and this is how it got here.
      </p>

      <div className="cs-meta">
        <Meta label="what" value="Notch-native pomodoro for macOS" />
        <Meta label="by" value="910studio" />
        <Meta label="stack" value="Tauri 2 / Rust / React 19 / TipTap" />
        <Meta label="price" value="Free forever" live />
        <Meta label="source" value="github.com/910studio/pomo" live />
      </div>

      <div className="cs-bleed">
        <Image
          src={`${IMG}/cover.png`}
          alt="pomo expanded out of the notch — clock, weather and per-project notes"
          width={1600}
          height={1000}
          priority
        />
        <div className="cs-cap">
          <span>Hover the notch and the card stretches out; move away and it tucks back</span>
          <b>v0.2.0</b>
        </div>
      </div>

      <Section num="01" label="The Problem" title="Some of them look great. That's not worth a subscription.">
        <p>
          There is no shortage of pomodoro apps, and a few of them are genuinely
          well designed. That is the frustrating part. Good design is being used
          to justify a price on a countdown with cute features — and a countdown
          is not a product you should have to rent.
        </p>
        <p>
          What we actually wanted did not exist at any price: work-cycle tracking,
          a UI worth looking at, a mode for when something drags you off-task, and
          notes living in the same place as the timer. Every tool solved one of
          those and sent you elsewhere for the rest.
        </p>
        <Quote cite="The brief, in full">
          It is fucking stupid to pay just for a countdown app with cute features.
        </Quote>
      </Section>

      <Section num="02" label="v1 — Terminal" title="It started in the terminal, on purpose">
        <p>
          The first version was a Python TUI — an anime tamagotchi pomodoro with
          sync tracking and daily docs, living in a spare terminal window. That
          was not a shortcut. The terminal was chosen for power efficiency, and
          because we like how the terminal looks; a pixel timer among monospace
          text felt right rather than like a compromise.
        </p>
        <p>
          It also solved the desktop problem. The whole point was to avoid a mess
          of floating windows, and a terminal tab is a window you already have
          open.
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
          Every Mac has a strip of dead pixels at the top that no app is allowed to
          use. It is always visible, never in the way, and you have already trained
          yourself not to look at it. That is the ideal home for something you want
          glanceable but not present.
        </p>
        <p>
          By default pomo hides behind the notch showing only the time. Hover it and
          the card stretches out — the container animates its size while the content
          scales into place, Dynamic Island style. Move away and it tucks back. When
          a work or break block ends it peeks out on its own for a few seconds
          instead of firing a notification banner. That is the fix for v1&apos;s
          second problem: the app shows itself rather than interrupting you.
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
          A pomodoro that keeps counting while a colleague is at your desk is
          recording fiction. Sync mode is a count-up interruption timer: hit{" "}
          <code>⌃⌥S</code> when something pulls you off-task and the pomodoro stops
          pretending. What you get at the end of the day is the honest number.
        </p>
        <p>
          While in sync mode you can record a voice memo — a chunky pixel spectrum
          dances with your voice, the file saves to <code>~/.pomo/memos/</code>, a ▶
          chip drops into the active project note, and it plays back in the widget.
          The interruption gets captured instead of evaporating.
        </p>
      </Section>

      <Section num="06" label="Notes" title="Rich in the widget, plain Markdown on disk">
        <p>
          Notes are per project, because the whole reason this exists is juggling
          several at once. The editor is TipTap/ProseMirror with bold, highlight,
          headings, checkboxes and nested lists — but what lands on disk is plain{" "}
          <code>.md</code>.
        </p>
        <p>
          WYSIWYG where you are typing, plain text everywhere else: Raycast, git,
          your actual editor. Nothing is trapped in the app, which matters more for
          a free tool than a paid one — if we stop shipping it tomorrow, your notes
          are still just files.
        </p>
      </Section>

      <Section num="07" label="Drop Shelf" title="A file shelf in the dead pixels">
        <p>
          Drag any file onto the widget and it stashes as a pixelated preview chip —
          a QuickLook thumbnail downscaled until it matches the rest of the art.
          Drag it back out into Finder, Slack or an upload field and a copy is
          delivered. It is ephemeral by design: nothing is stored and the shelf
          clears on quit.
        </p>
        <p>
          The launch animation samples whatever is behind the notch and adjusts its
          doodle lines to stay visible against any wallpaper. Nobody asked for that.
          It is a toy — that is the point.
        </p>
      </Section>

      <Section num="08" label="Keyboard" title="Every binding is system-wide, by necessity">
        <p>
          A widget that appears on hover can never hold keyboard focus, so ordinary
          shortcuts are impossible. Every core action is registered as a global{" "}
          <code>⌃⌥</code> hotkey and works from whatever app you are actually in —
          which is the correct behaviour anyway for something you are not supposed
          to look at.
        </p>
        <Table head={["Key", "Action", "Why"]} rows={KEYS} />
      </Section>

      <Section num="09" label="Design" title="Cream, ink, rust, and the Minecraft typeface">
        <p>
          Pixel-art icon set, hard cartoon shadows, zero border radius on anything
          that matters. The ink is 910studio&apos;s own <code>#2B221F</code> — this
          one is ours, so it wears the studio&apos;s colours rather than a
          client&apos;s. Rust carries every active state, amber the warnings, sage
          the completions.
        </p>
        <div className="cs-bigswatch">
          <div style={{ background: "#C24A30" }} />
          <div style={{ background: "#D98A2B" }} />
          <div style={{ background: "#2B221F" }} />
        </div>
        <Swatches colors={PALETTE} />
      </Section>

      <Section num="10" label="Stack" title="Rust, because it's a countdown">
        <p>
          The joke writes itself: the reason the market&apos;s pomodoro apps feel
          heavy is that many of them ship a browser to render a number. Tauri puts
          the UI in the system webview and the logic in Rust, and the whole app
          comes out around 9MB.
        </p>
        <Table head={["Layer", "Choice", "Why"]} rows={STACK} />
      </Section>

      <Section num="11" label="Free" title="No licence, no trial, no account.">
        <p>
          It ships as an unsigned <code>.dmg</code>, so macOS calls it damaged on
          first open — it isn&apos;t, that is Gatekeeper flagging an unsigned
          download. One <code>xattr -cr</code> and it opens normally, and the
          one-line installer does that for you. Paying Apple ninety-nine dollars a
          year to distribute a free countdown would be its own kind of crime.
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
