/* Each case study wears the client's colors on 910's structure. Color is the
   only thing that varies between them — type, rhythm, section shapes and
   shadows are shared, and live in the .case-study block in app/reel.css.
   These palettes are the single source of truth: the case study page reads
   them into --cs-* custom properties, and SiteHeader reads `mode` to know
   which way to invert the bar.
   ────────────────────────────────────────────────────────────────────
   ADDING A CASE STUDY — the whole checklist:
     1. `pnpm new-case <slug> "<Title>"` — scaffolds app/work/<slug>/page.tsx
        and public/demos/<slug>/assets/
     2. Drop your thumb at public/demos/<slug>/assets/thumb.png
     3. Paste the generated entry into PROJECTS below.
   A palette is OPTIONAL. Omit it and the page falls back to 910's own look;
   when you have the client's colours, it is one call:
     palette({ mode: "dark", ground: "#000040", accent: "#FFD700" })
   ground + accent are all you need — ink, the translucent ramp (ink2/ink3/
   rule) and onAccent derive automatically. Pass ink/signal/onAccent to
   override. */
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

/* What you write. Three colours and a mode; everything else derives. */
export type PaletteSpec = {
  mode: "light" | "dark";
  ground: string;
  ink?: string;
  accent?: string;
  onAccent?: string;
  signal?: string;
};

function alpha(hex: string, a: number): string {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const NINE_TEN = { ink: "#2B221F", accent: "#2660E8" };

export function palette(spec: PaletteSpec): ProjectPalette {
  const dark = spec.mode === "dark";
  const ink = spec.ink ?? (dark ? "#FAFAFA" : NINE_TEN.ink);
  return {
    mode: spec.mode,
    ground: spec.ground,
    ink,
    ink2: alpha(ink, 0.62),
    ink3: alpha(ink, 0.4),
    rule: alpha(ink, 0.14),
    accent: spec.accent ?? NINE_TEN.accent,
    onAccent: spec.onAccent ?? spec.ground,
    ...(spec.signal ? { signal: spec.signal } : {}),
  };
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
  /* optional — omit for 910's own look while a page is being drafted */
  palette?: ProjectPalette;
  /* "work" is client work and lives on /work. "toy" is something the studio
      built for itself and gives away — it lives in the toybox, has a download
      rather than an enquiry, and must never appear in the client rack. */
  kind?: "work" | "toy";
  /* toys only */
  href?: string;
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
    image: "/demos/juraan/assets/thumb.png",
    featured: true,
    /* pulled from the site's own tokens — the accent is patinated bronze,
       the ground is foundry dark */
    palette: palette({
      mode: "dark",
      ground: "#0E0906",
      ink: "#E5E5E5",
      accent: "#D4AF7A",
      signal: "#CD7F32",
    }),
  },
  {
    slug: "nair",
    title: "Nair Entertainment",
    client: "Nair Entertainment",
    year: "2026",
    scope: ["Design", "Bilingual Architecture", "Frontend", "Deploy"],
    description:
      "Bilingual home for Mongolia's traditional performing arts. Mongolian-first, nine disciplines, booking flow.",
    image: "/demos/nair/assets/thumb.png",
    featured: true,
    /* The site itself is light — #06090c is the INK, not the ground; counting
       hex frequency reads it the wrong way round, because the ink appears far
       more often than the background it sits on. Crimson is the deel silk. */
    palette: palette({
      mode: "light",
      ground: "#FFFFFF",
      ink: "#06090C",
      accent: "#9E1C21",
      signal: "#B32228",
    }),
  },
  {
    slug: "uuyee",
    title: "Uuye",
    client: "Uitumen Bold (Uuye)",
    year: "2026",
    scope: ["Design", "Frontend", "Deploy"],
    description:
      "Portfolio for Mongolia's top jazz guitarist, built with no photography. Two temperatures, one grid.",
    image: "/demos/uuyee/assets/thumb.png",
    featured: true,
    /* the site's own Mono Signal ground, with the Burning Sunset fire as
       the accent — the two modes the case study is about */
    palette: palette({
      mode: "light",
      ground: "#F0EDE8",
      ink: "#0A0A0A",
      accent: "#FF480F",
      signal: "#D4A024",
    }),
  },
  {
    slug: "somegorillas",
    title: "Some Gorillas",
    client: "Some Gorillas — collaboration",
    year: "2025",
    scope: ["Design", "Frontend integration", "Development"],
    description:
      "An NFT project that makes you play before it pitches. A loader you have to open, a drag-swap puzzle, and a working gorilla language.",
    image: "/demos/somegorillas/assets/thumb.png",
    featured: true,
    /* banana on grape-dark — the project's own --accent-primary and body ground */
    palette: palette({
      mode: "dark",
      ground: "#160E1F",
      ink: "#FAFAFA",
      accent: "#F5BA31",
      signal: "#A638E7",
    }),
  },
  {
    slug: "hemibros",
    title: "HemiBros",
    client: "HemiBros / Numadlabs",
    year: "2025",
    scope: ["Design", "Frontend", "Deploy"],
    description:
      "A community-driven NFT project on Hemi, built as a Windows 98 desktop — because the community it wanted was the one the early internet used to have.",
    image: "/demos/hemibros/assets/thumb.png",
    featured: true,
    /* #000040 — the deep navy every casino surface is painted on. Gold is
       the jackpot colour, silver the Win98 chrome. */
    palette: palette({
      mode: "dark",
      ground: "#000040",
      ink: "#FFFFFF",
      accent: "#FFD700",
      signal: "#C0C0C0",
    }),
  },
  {
    slug: "cmm",
    title: "MarketIQ",
    client: "Capital Markets Mongolia",
    year: "2026",
    scope: ["Design System", "Token Architecture", "Frontend"],
    description:
      "Design system and frontend for Mongolia's first AI-native capital markets intelligence platform.",
    image: "/demos/cmm/assets/thumb.png",
    featured: true,
    /* the Dense direction's own tokens — brand purple on near-white, with
       orange carrying signal */
    palette: palette({
      mode: "light",
      ground: "#F4F2FB",
      ink: "#0C0A1D",
      accent: "#3E149C",
      signal: "#FCA311",
    }),
  },
];

/* The toybox — things 910studio built for itself and gives away. Kept in the
   same array so one palette lookup serves every page and SiteHeader, but
   filtered apart everywhere they are listed: a free tool sitting in the
   client rack reads as a project someone paid for. */
export const TOYS: Project[] = [
  {
    slug: "pomo",
    title: "pomo",
    client: "910studio",
    year: "2026",
    scope: ["Product", "Rust / Tauri", "macOS", "Free forever"],
    description:
      "A notch-native pomodoro for macOS. Lives behind the MacBook notch and drops out like a Dynamic Island. Free, because charging for a countdown is a crime.",
    image: "/demos/pomo/assets/thumb.png",
    kind: "toy",
    href: "https://github.com/910studio/pomo",
    /* the app's own cream / rust */
    palette: palette({
      mode: "light",
      ground: "#F7EFDF",
      ink: "#2B221F",
      accent: "#C24A30",
      signal: "#D98A2B",
    }),
  },
];

const ALL = [...PROJECTS, ...TOYS];

export function getProject(slug: string): Project | undefined {
  return ALL.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
