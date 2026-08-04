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
