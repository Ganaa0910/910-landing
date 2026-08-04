import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uuye — Case Study",
  description:
    "How 910studio built a portfolio for Mongolia's top jazz guitarist with no photography — typography, a 3px rule and geometry generated in the browser.",
  openGraph: {
    title: "Uuye — 910 Case Study",
    description:
      "A portfolio that changes temperature when the music starts. Two palettes, one grid, zero stock photography.",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
