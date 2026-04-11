import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description:
    "Start a project with 910studio. Web design, development, and creative services from Ulaanbaatar, Mongolia. Response within 24 hours.",
  openGraph: {
    title: "Contact — 910studio",
    description: "Start a project with 910studio. Response within 24 hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
