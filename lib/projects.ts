export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  scope: string[];
  description: string;
  image: string;
  featured?: boolean;
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
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
