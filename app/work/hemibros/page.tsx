import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HemiBros — Case Study",
  description:
    "A community-driven NFT project on Hemi, built as a Windows 98 desktop — draggable windows, a taskbar, a slot machine and 36 pixel-art characters. Design, frontend and deployment by 910studio.",
  openGraph: {
    title: "HemiBros — 910 Case Study",
    description:
      "To build a community, we rebuilt the internet that had one. Windows 98, a LAN, and an NFT project you navigate like an operating system.",
  },
};

import Image from "next/image";
import { Win98Specimen } from "./win98";
import { CrtScreen } from "./crt";
import {
  CaseStudy,
  Meta,
  Quote,
  Section,
  Stats,
  Swatches,
  Tail,
} from "@/components/case-study/shell";

const IMG = "/demos/hemibros/assets";

const PALETTE = [
  { name: "Casino navy", val: "#000040" },
  { name: "Deep navy", val: "#000060" },
  { name: "Desktop teal", val: "#008080" },
  { name: "Chrome silver", val: "#C0C0C0" },
  { name: "Title bar navy", val: "#000080" },
  { name: "Jackpot gold", val: "#FFD700" },
  { name: "Terminal green", val: "#00FF00" },
  { name: "Hyperlink magenta", val: "#FF00FF" },
  { name: "Alert red", val: "#FF0000" },
];

/* the furniture of a 1998 web page, used as itself rather than as pastiche */
const FURNITURE = [
  { file: "construction.gif", label: "Under construction" },
  { file: "netscape.gif", label: "Netscape badge" },
  { file: "msie.png", label: "Internet Explorer" },
  { file: "slot-machine.gif", label: "The machine" },
];


const SURFACES = [
  { name: "My Computer", detail: "The desktop itself. Icons open real windows, and the windows drag — the site is navigated the way you navigated a machine, not the way you scroll a page." },
  { name: "Start menu", detail: "Programs, Settings, Shutdown. Three items, exactly as many as it needs, and a joke that only lands because it is where your hand already expects it." },
  { name: "Taskbar", detail: "Open windows dock along the bottom. It is the site's actual navigation — no header, no hamburger." },
  { name: "Browser", detail: "An IE-skinned window that renders the project's own pages, so the manifesto and FAQ arrive inside a browser inside a browser." },
  { name: "MySpace header", detail: "A profile banner for the collection, pulling the second half of the reference forward from 1998 to 2005." },
  { name: "The machine", detail: "A slot machine as a separate program on the desktop — you launch it, you don't land on it." },
];


const OUTCOMES = [
  { num: "6", label: "Desktop surfaces", desc: "My Computer, Start menu, taskbar, browser, profile header and the machine — one component system." },
  { num: "1998", label: "The reference year", desc: "Period-correct chrome, typeface and furniture — used as themselves, not as a filter over a modern layout." },
  { num: "2", label: "Networks", desc: "Mainnet and testnet, switchable, so nothing shipped that had not been run for real first." },
];

export default function HemiBrosCaseStudy() {
  return (
    <CaseStudy slug="hemibros">
      <CrtScreen />

      <p className="cs-eyebrow">Case study / HemiBros</p>
      <h1>
        To build a community, we rebuilt <i>the internet that had one</i>
      </h1>
      <p className="cs-lede">
        HemiBros is a community-driven NFT project. Which raises the question the
        category never answers: where does a community actually come from? The team went
        back to the last time the internet reliably made one — Windows 98, a LAN — and
        built the whole thing as a desktop.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="HemiBros / Numadlabs" />
        <Meta label="910studio" value="Design, frontend, deployment" />
        <Meta label="concept" value="Team brainstorm" />
        <Meta label="contracts" value="Dedicated web3 developer" />
      </div>

      <Section num="01" label="The Problem" title="Everyone says community. Almost nobody says how.">
        <p>
          &quot;Community-driven&quot; is the most worn phrase in the category. Most of
          them mean a Discord with a verification bot. If the community is the product, the
          question isn&apos;t how you announce one — it&apos;s what makes people gather.
        </p>
      </Section>

      <Section num="02" label="The Answer" title="Windows 98, and a LAN">
        <p>
          The whole team landed on the same place: the era when the internet felt alive.
          Windows 98. A LAN. GeoCities pages under permanent construction. You didn&apos;t
          join those communities through a funnel — you were on the network, and so was
          everyone else.
        </p>
        <p>
          In 2025 every NFT project was dark-mode gradients and chrome-plated 3D. Going
          the other way wasn&apos;t nostalgia. The reference <em>was</em> the argument.
        </p>
        <Quote cite="HemiBros — the concept, from the team">
          How do you become a community? The internet. So: back to the roots — the
          alive internet, where it all started.
        </Quote>
      </Section>

      <Section num="03" label="The Build" title="Not a page with a retro skin. A desktop.">
        <p>
          Not a landing page in a Windows costume — an operating system you navigate.
          Icons open real windows. Windows drag. The taskbar is the navigation. No header,
          no hamburger, because a desktop doesn&apos;t have them.
        </p>
        <div className="cs-grid cs-grid-3">
          {SURFACES.map((s) => (
            <div key={s.name} className="cs-card">
              <span className="cs-kicker">Surface</span>
              <h3>{s.name}</h3>
              <p>{s.detail}</p>
            </div>
          ))}
        </div>
        <Win98Specimen />
        <p className="cs-note">
          Rebuilt here from the project&apos;s own values. The bevel is the whole trick and
          it is one line — a border lit from the top-left, <code>#FFF #000 #000 #FFF</code>,
          inverted on press. Every raised surface of the era is that and nothing else.
        </p>
      </Section>

      <Section num="04" label="Art Direction" title="The furniture is period-correct, not period-flavoured">
        <p>
          The under-construction banner, the Netscape badge, the IE icon, the spinning
          dice — the real artefacts, used as themselves. MS Sans Serif is the actual
          typeface. The palette is the system palette: silver <code>#C0C0C0</code>,
          title-bar navy <code>#000080</code>, hyperlink magenta, terminal green. The
          casino sits on <code>#000040</code>, ramping to <code>#000060</code> behind the
          reels. Black is only ever the void it all floats on.
        </p>
        <div className="cs-artrow">
          {FURNITURE.map((f) => (
            <figure key={f.file}>
              <Image
                src={`${IMG}/web/${f.file}`}
                alt={f.label}
                width={220}
                height={124}
                unoptimized
              />
              <figcaption>
                <b>{f.label}</b>
              </figcaption>
            </figure>
          ))}
        </div>
        <Swatches colors={PALETTE} />
      </Section>


      <Section num="05" label="The Machine" title="A slot machine, as a program you open">
        <p>
          The slot machine is deliberately not the landing page — it&apos;s a program on
          the desktop you choose to launch. Pull, and a weighted draw resolves; the history
          window logs it, the grid re-reads.
        </p>
        <p>
          Wallet status, token balance, draw result, win modal, running history. Sound is
          part of it — a machine that pays out silently isn&apos;t a machine.{" "}
          <strong>Contracts and on-chain mechanics were a dedicated web3
          developer&apos;s</strong>; ours was design, frontend and deployment.
        </p>
      </Section>

      <Section num="06" label="Community Artefacts" title="The memes shipped with the product">
        <p>
          A community-driven project that ships without the community&apos;s own material
          is just an announcement. So the memes were built in as a gallery — content, not
          marketing. The work was deciding they belonged in the build; the memes are the
          community&apos;s.
        </p>
      </Section>


      <Section num="07" label="Outcome" title="It shipped, and it worked.">
        <p>
          HemiBros launched with the desktop, the memes and the machine — and did what a
          community-driven project is supposed to do: bring people to the same place at the
          same time for a reason other than price.
        </p>
        <p>
          Ours was design, frontend and deployment. The idea belonged to the whole team,
          the chain work to a dedicated web3 developer — worth saying plainly, because what
          made this good was that the concept came out of a room rather than a brief.
        </p>
        <Stats items={OUTCOMES} />
      </Section>

      <Tail />
    </CaseStudy>
  );
}
