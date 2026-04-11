import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MarketIQ — Case Study",
  description:
    "How 910studio designed and built the Dense direction for Mongolia's first AI-native capital markets intelligence platform.",
  openGraph: {
    title: "MarketIQ — 910 Case Study",
    description:
      "Designing Mongolia's first AI-native capital markets platform. From workshop to Dense direction to production.",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
