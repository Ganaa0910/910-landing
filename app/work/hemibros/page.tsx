import type { Metadata } from "next";
import { CaseStudy, Meta, Tail } from "@/components/case-study/shell";
import { Beat, Palette, Specimen, Stage } from "@/components/case-study/showcase";
import { Win98Specimen } from "./win98";
import { CrtScreen } from "./crt";
import { ShareStory } from "@/components/case-study/share-story";

export const metadata: Metadata = {
  title: "HemiBros — Case Study",
  description:
    "A community-driven NFT project on Hemi, built as a Windows 98 desktop — draggable windows, a taskbar and a slot machine. Design, frontend and deployment by 910studio.",
  openGraph: {
    title: "HemiBros — 910 Case Study",
    description:
      "To build a community, we rebuilt the internet that had one. Windows 98, a LAN, and an NFT project you navigate like an operating system.",
  },
};

export default function HemiBrosCaseStudy() {
  return (
    <CaseStudy slug="hemibros">
      <CrtScreen />

      <p className="cs-eyebrow">Case study / HemiBros</p>
      <h1>
        To build a community, we rebuilt <i>the internet that had one</i>
      </h1>

      <div className="cs-meta">
        <Meta label="client" value="HemiBros / Numadlabs" />
        <Meta label="910studio" value="Design, frontend, deployment" />
        <Meta label="reference" value="Windows 98" />
        <Meta label="year" value="2025" />
      </div>

      <ShareStory slug="hemibros" title="HemiBros — a 910studio case study" />

      {/* live chrome — press the buttons */}
      <Stage>
        <Win98Specimen />
      </Stage>

      <Beat n="01" label="The brief">
        HemiBros is a community-driven NFT project, and so is every other project
        in the category. The team went looking for the thing the others skip:
        where online communities actually came from in the first place.
      </Beat>

      <Palette
        chips={[
          { name: "Desktop teal", val: "#008080", w: 3 },
          { name: "Chrome silver", val: "#C0C0C0", w: 2 },
          { name: "Title bar", val: "#000080", w: 1.5 },
          { name: "Casino navy", val: "#000040" },
          { name: "Jackpot", val: "#FFD700" },
          { name: "Hyperlink", val: "#FF00FF", w: 0.8 },
          { name: "Terminal", val: "#00FF00", w: 0.8 },
        ]}
      />

      <Beat n="02" label="The idea">
        The answer was Windows 98 and a LAN, so the site is a desktop rather than
        a landing page. Icons open windows, the windows drag, and the taskbar is
        the navigation. The bevels, the system palette and MS Sans Serif all come
        from the real thing.
      </Beat>

      <Specimen
        face="'MSSansHB', 'MS Sans Serif', Tahoma, sans-serif"
        name="MS Sans Serif — the system face"
        role="Typeface"
        sample="My Computer"
      />

      <Beat n="03" label="The result">
        It launched with the desktop, the community&apos;s own memes built in, and
        a slot machine you open like a program. We did the design, frontend and
        deployment. The concept came out of the whole team, and a dedicated web3
        developer wrote the contracts.
      </Beat>

      <Tail />
    </CaseStudy>
  );
}
