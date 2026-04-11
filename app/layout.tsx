import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Syne,
  JetBrains_Mono,
  Bebas_Neue,
  Anton,
  Black_Ops_One,
} from "next/font/google";
import localFont from "next/font/local";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/CustomCursor";
import { AudioToggle } from "@/components/ui/audio-toggle";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { SiteGate } from "@/components/ui/site-gate";
import { NowPlaying } from "@/components/ui/now-playing";
import { PageTransition } from "@/components/ui/page-transition";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  weight: ["700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Bold display fonts — the 910studio cartoon energy
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  variable: "--font-black-ops",
  weight: "400",
  subsets: ["latin"],
});

const christmasPipow = localFont({
  src: "../public/christmas-pipow-font/ChristmasPipowDemo-V4R5l.otf",
  variable: "--font-christmas-pipow",
});

const siteUrl = "https://910.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "910studio | Creative Web Studio",
    template: "%s | 910studio",
  },
  description:
    "Creative web studio crafting exceptional digital experiences. Design systems, platforms, and creative development. Ulaanbaatar, Mongolia.",
  keywords: [
    "web studio",
    "creative agency",
    "web development",
    "design systems",
    "digital experiences",
    "Mongolia",
    "Ulaanbaatar",
    "frontend development",
    "Next.js",
    "React",
  ],
  authors: [{ name: "910studio", url: siteUrl }],
  creator: "910studio",
  publisher: "910studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/web-icon.ico",
    shortcut: "/web-icon.ico",
    apple: "/web-icon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "910studio",
    title: "910studio | Creative Web Studio",
    description:
      "Creative web studio crafting exceptional digital experiences. Design systems, platforms, and creative development.",
    images: [
      {
        url: "/OG.png",
        width: 1200,
        height: 630,
        alt: "910studio - Creative Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "910studio | Creative Web Studio",
    description:
      "Creative web studio crafting exceptional digital experiences. Design systems, platforms, and creative development.",
    images: ["/OG.png"],
    creator: "@910studio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "910studio",
              url: "https://910.studio",
              logo: "https://910.studio/web-icon.ico",
              description:
                "Creative web studio crafting exceptional digital experiences. Design systems, platforms, and creative development.",
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ulaanbaatar",
                addressCountry: "MN",
              },
              sameAs: ["https://design.910.studio"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Mongolian"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${ibmPlexMono.variable} ${syne.variable} ${jetbrainsMono.variable} ${bebas.variable} ${anton.variable} ${blackOps.variable} ${christmasPipow.variable} antialiased`}
      >
        <Nav />
        <LoadingScreen />
        <SiteGate>
          <PageTransition>
            {children}
            <Footer />
          </PageTransition>
          <NowPlaying />
          <CustomCursor />
          <AudioToggle />
        </SiteGate>
      </body>
    </html>
  );
}
