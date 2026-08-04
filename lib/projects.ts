/* Each case study wears the client's colors on 910's structure. Color is the
   only thing that varies between them — type, rhythm, section shapes and
   shadows are shared, and live in the .case-study block in app/reel.css.
   These palettes are the single source of truth: the case study page reads
   them into --cs-* custom properties, and SiteHeader reads `mode` to know
   which way to invert the bar. */
export interface ProjectPalette {
  /* drives the header bar inversion — light ground gets the paper bar,
     dark ground gets the inverted one */
  mode: "light" | "dark";
  ground: string;
  ink: string;
  /* ink2/ink3/rule are alphas of the project's OWN ink, never grey. Grey
     mixed into a warm palette reads as dirt. */
  ink2: string;
  ink3: string;
  rule: string;
  accent: string;
  /* text on accent fills */
  onAccent: string;
  /* optional second brand color — CMM's orange, Uuyee's amber */
  signal?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  scope: string[];
  description: string;
  image: string;
  featured?: boolean;
  palette: ProjectPalette;
}

export const PROJECTS: Project[] = [
  {
    slug: "juraan",
    title: "Juraan",
    client: "Juraan (Lkhagvasuren Nyamkhuu)",
    year: "2025",
    scope: ["Research", "Design", "Custom Font", "Frontend", "Deploy"],
    description:
      "Cinematic portfolio for Mongolia's premier bronze sculptor. Custom typeface, bronze-derived palette, gallery experience.",
    image: "/demos/juraan/assets/god-and-devil.jpg",
    featured: true,
    /* pulled from the site's own tokens — the accent is patinated bronze,
       the ground is foundry dark */
    palette: {
      mode: "dark",
      ground: "#0A0A0A",
      ink: "#E5E5E5",
      ink2: "rgba(229,229,229,.62)",
      ink3: "rgba(229,229,229,.38)",
      rule: "rgba(229,229,229,.14)",
      accent: "#D4AF7A",
      onAccent: "#0A0A0A",
      signal: "#CD7F32",
    },
  },
  {
    slug: "nair",
    title: "Nair Entertainment",
    client: "Nair Entertainment",
    year: "2026",
    scope: ["Design", "Bilingual Architecture", "Frontend", "Deploy"],
    description:
      "Bilingual home for Mongolia's traditional performing arts. Mongolian-first, nine disciplines, booking flow.",
    image: "/demos/nair/assets/hero.png",
    featured: true,
    /* The site itself is light — +layout.svelte paints #fff and builds every
       muted tone as an alpha of #06090c (.48 copy, .04/.08 surfaces, .16
       borders). #06090c is the INK, not the ground; counting hex frequency
       reads it the wrong way round, because the ink appears far more often
       than the background it sits on. Crimson is the deel silk. */
    palette: {
      mode: "light",
      ground: "#FFFFFF",
      ink: "#06090C",
      ink2: "rgba(6,9,12,.62)",
      ink3: "rgba(6,9,12,.40)",
      rule: "rgba(6,9,12,.12)",
      accent: "#9E1C21",
      onAccent: "#FFFFFF",
      signal: "#B32228",
    },
  },
  {
    slug: "uuyee",
    title: "Uuye",
    client: "Uitumen Bold (Uuye)",
    year: "2026",
    scope: ["Design", "Frontend", "Deploy"],
    description:
      "Portfolio for Mongolia's top jazz guitarist, built with no photography. Two temperatures, one grid.",
    image: "/demos/uuyee/assets/hero.png",
    featured: true,
    /* the site's own Mono Signal ground, with the Burning Sunset fire as
       the accent — the two modes the case study is about */
    palette: {
      mode: "light",
      ground: "#F0EDE8",
      ink: "#0A0A0A",
      ink2: "rgba(10,10,10,.64)",
      ink3: "rgba(10,10,10,.40)",
      rule: "rgba(10,10,10,.14)",
      accent: "#FF480F",
      onAccent: "#F0EDE8",
      signal: "#D4A024",
    },
  },
  {
    slug: "cmm",
    title: "MarketIQ",
    client: "Capital Markets Mongolia",
    year: "2026",
    scope: ["Design System", "Token Architecture", "Frontend"],
    description:
      "Design system and frontend for Mongolia's first AI-native capital markets intelligence platform.",
    image: "/demos/cmm/assets/insights-dense.png",
    featured: true,
    /* the Dense direction's own tokens — brand purple on near-white, with
       orange carrying signal */
    palette: {
      mode: "light",
      ground: "#FAFAFD",
      ink: "#0C0A1D",
      ink2: "rgba(12,10,29,.66)",
      ink3: "rgba(12,10,29,.42)",
      rule: "rgba(12,10,29,.14)",
      accent: "#3E149C",
      onAccent: "#FAFAFD",
      signal: "#FCA311",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
