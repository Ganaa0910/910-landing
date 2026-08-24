/* Scaffold a new case study.
 *
 *   pnpm new-case <slug> "<Title>"
 *
 * Creates:
 *   app/work/<slug>/page.tsx     — a running skeleton on the shared shell
 *   public/demos/<slug>/assets/  — drop thumb.png here
 * and prints the registry entry to paste into PROJECTS in lib/projects.ts.
 *
 * That is the whole ceremony. A palette is optional — omit it and the page
 * wears 910's own look until you have the client's colours.
 */

import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const [slug, title] = process.argv.slice(2);
if (!slug || !title) {
  console.error("usage: pnpm new-case <slug> \"<Title>\"");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`slug must be lowercase kebab-case, got "${slug}"`);
  process.exit(1);
}

const dir = join(root, "app", "work", slug);
if (exists(dir)) {
  console.error(`app/work/${slug} already exists`);
  process.exit(1);
}

mkdirSync(join(dir), { recursive: true });
mkdirSync(join(root, "public", "demos", slug, "assets"), { recursive: true });

const page = `import type { Metadata } from "next";
import {
  CaseStudy,
  Meta,
  Section,
  Tail,
} from "@/components/case-study/shell";

export const metadata: Metadata = {
  title: "${title} — Case Study",
  description: "One line on what this project was and what 910studio did.",
  openGraph: {
    title: "${title} — 910 Case Study",
    description: "One line for the social card.",
  },
};

export default function ${toPascal(slug)}CaseStudy() {
  return (
    <CaseStudy slug="${slug}">
      <p className="cs-eyebrow">Case study / ${title}</p>
      <h1>
        The headline it turns on, with the one word in <i>italics</i>
      </h1>
      <p className="cs-lede">
        Two or three sentences. What it was, what was hard about it, what we did.
      </p>

      <div className="cs-meta">
        <Meta label="client" value="Client name" />
        <Meta label="year" value="${new Date().getFullYear()}" />
      </div>

      <Section num="01" label="The Problem" title="What made this hard">
        <p>Say the actual problem, not the brief.</p>
      </Section>

      {/* Sections, evidence, quotes — copy the shapes from any existing case study. */}

      <Section num="02" label="Outcome" title="Shipped.">
        <p>Where it landed.</p>
      </Section>

      <Tail />
    </CaseStudy>
  );
}
`;

writeFileSync(join(dir, "page.tsx"), page);

console.log(`created app/work/${slug}/page.tsx
created public/demos/${slug}/assets/   ← drop thumb.png here

paste into PROJECTS (lib/projects.ts):

  {
    slug: "${slug}",
    title: "${title}",
    client: "",
    year: "${new Date().getFullYear()}",
    scope: [],
    description: "",
    image: "/demos/${slug}/assets/thumb.png",
    featured: true,
  },

palette is optional. When you have the client's colours, add ONE call:

    palette: palette({ mode: "dark", ground: "#0B1016", accent: "#FFEE32" }),
`);

function toPascal(s) {
  return s
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
}

function exists(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}
