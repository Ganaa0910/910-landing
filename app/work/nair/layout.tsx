import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nair Entertainment — Case Study",
  description:
    "How 910studio built a bilingual site for Mongolia's traditional performing arts — Mongolian-first, with locale-prefixed routes rather than a translation toggle.",
  openGraph: {
    title: "Nair Entertainment — 910 Case Study",
    description:
      "A heritage arts agency that speaks Mongolian first. Bilingual architecture, nine disciplines, SvelteKit and Paraglide.",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
