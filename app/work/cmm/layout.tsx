import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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
  return (
    <div
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      style={{ background: "#FAFAF8", color: "#0C0A1D" }}
    >
      {children}
    </div>
  );
}
