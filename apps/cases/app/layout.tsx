import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono, Modak } from "next/font/google";
import { CustomCursor } from "@910studio/ui";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Modak — the v2 fat rubber-hose cartoon display face
const modak = Modak({
  variable: "--font-modak",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = "https://cases.910.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cases — 910studio",
    template: "%s | 910studio Cases",
  },
  description:
    "Selected work and case studies from 910studio — design systems, web platforms, and creative development from Ulaanbaatar, Mongolia.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "910studio Cases",
    title: "Cases — 910studio",
    description:
      "Selected work and case studies from 910studio — design systems, web platforms, and creative development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} ${jetbrainsMono.variable} ${modak.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
