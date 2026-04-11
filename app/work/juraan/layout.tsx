import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juraan — Case Study",
  description:
    "How 910studio designed and built a portfolio for Mongolia's premier bronze sculptor. From bronze research to custom font to cinematic web.",
  openGraph: {
    title: "Juraan — 910 Case Study",
    description:
      "Portfolio site for Mongolian bronze sculptor Juraan. Custom font, bronze-derived palette, cinematic scroll experience.",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
