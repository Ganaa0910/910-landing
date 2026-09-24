import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  Space_Grotesk,
  Space_Mono,
  Syne,
  JetBrains_Mono,
  Bebas_Neue,
  Anton,
  Black_Ops_One,
} from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/scroll/smooth-scroll";
import { ReelCanvas } from "@/components/reel/reel-canvas";
import { NavProvider, PageShell } from "@/components/nav/page-shell";
import { SiteHeader } from "@/components/nav/site-header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
/* Lenis's own stylesheet. Not optional: it releases the height clamp on
   html/body that would otherwise cap the 620vh reel track, and stops native
   scroll-behavior from fighting the interpolation. Imported from the package
   so it tracks the version rather than drifting as a hand-copy. */
import "lenis/dist/lenis.css";
import "./reel.css";
/* the case-study drafting layer: 910's blueprint grammar. Loaded after
   reel.css so its sheets can override the .cs- base. */
import "./drafting.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

/* Nair's shipped stack is `Google Sans, Product Sans, Inter, system-ui`.
   Google Sans and Product Sans are Google-internal and not redistributable,
   so the case study's type specimens set in Inter — the client's own next
   fallback — and say so on the sheet. Cyrillic is not optional here: the
   specimens are Mongolian. */
const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

/* Uuye's shipped stack is Space Grotesk (display) + Space Mono (body), both
   Google-hosted and freely redistributable — so unlike Nair's Google Sans,
   the case study's replicas can set in the client's actual faces rather than
   a fallback. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
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
    default: "910studio | Creative Web Studio in Ulaanbaatar, Mongolia",
    template: "%s | 910studio",
  },
  description:
    "Creative web studio in Ulaanbaatar, Mongolia. Design systems, web platforms, and digital products. Frontend development and creative coding.",
  keywords: [
    "web studio Mongolia",
    "creative agency Ulaanbaatar",
    "web development Mongolia",
    "design systems",
    "frontend development",
    "creative development",
    "web design Mongolia",
    "digital agency Mongolia",
    "React developer Mongolia",
    "Next.js studio",
    "UI/UX design Ulaanbaatar",
    "brand identity Mongolia",
    "token architecture",
    "web application development",
    "910studio",
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
    title: "910studio | Creative Web Studio in Ulaanbaatar",
    description:
      "Design systems, web platforms, and creative development. Based in Ulaanbaatar, Mongolia. Working globally.",
  },
  twitter: {
    card: "summary_large_image",
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
    languages: {
      "en": siteUrl,
    },
  },
  other: {
    "geo.region": "MN-1",
    "geo.placename": "Ulaanbaatar",
    "geo.position": "47.9184;106.9177",
    "ICBM": "47.9184, 106.9177",
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://910.studio/#organization",
                name: "910studio",
                url: "https://910.studio",
                logo: "https://910.studio/web-icon.ico",
                image: "https://910.studio/OG.png",
                description:
                  "Creative web studio based in Ulaanbaatar, Mongolia. Design systems, web platforms, creative development, and brand identity for ambitious brands.",
                foundingDate: "2024",
                priceRange: "$$$",
                areaServed: [
                  { "@type": "Country", name: "Mongolia" },
                  { "@type": "Continent", name: "Asia" },
                  "Worldwide",
                ],
                serviceType: [
                  "Web Design",
                  "Web Development",
                  "Design Systems",
                  "Frontend Development",
                  "Creative Development",
                  "Brand Identity",
                  "UI/UX Design",
                ],
                knowsAbout: [
                  "React", "Next.js", "TypeScript", "Tailwind CSS",
                  "Three.js", "GSAP", "Prisma", "tRPC",
                  "Design Systems", "Token Architecture",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Ulaanbaatar",
                  addressRegion: "Ulaanbaatar",
                  addressCountry: "MN",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 47.9184,
                  longitude: 106.9177,
                },
                sameAs: ["https://design.910.studio"],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  url: "https://910.studio/contact",
                  availableLanguage: ["English", "Mongolian"],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "910studio",
                url: "https://910.studio",
                publisher: { "@id": "https://910.studio/#organization" },
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is 910studio?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "910studio is a creative web studio based in Ulaanbaatar, Mongolia, founded in 2024. They specialize in design systems, token architecture, web platforms, creative development (WebGL, GSAP, Three.js), and brand identity. They work remotely with clients globally across Asia, Europe, and North America.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What services does 910studio offer?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "910studio offers design systems and token architecture, full-stack web application development, creative development (WebGL, shaders, scroll experiences, interactive storytelling), brand identity and digital strategy. Their tech stack includes React, Next.js, TypeScript, Tailwind CSS, Prisma, tRPC, Three.js, and GSAP.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Where is 910studio located?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "910studio is based in Ulaanbaatar, Mongolia (UTC+8). They are remote-first and work with clients globally. The studio was founded in 2024.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What projects has 910studio worked on?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Notable projects include MarketIQ for Capital Markets Mongolia — a design system and frontend for Mongolia's first AI-native capital markets intelligence platform, and Juraan — a cinematic portfolio with custom typeface for Mongolia's premier bronze sculptor Lkhagvasuren Nyamkhuu.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body
        className={`${ibmPlexMono.variable} ${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${syne.variable} ${jetbrainsMono.variable} ${bebas.variable} ${anton.variable} ${blackOps.variable} ${christmasPipow.variable} antialiased`}
      >
        <NavProvider>
          {/* before ReelCanvas: it has to advance the scroll position each
              frame before the canvas reads it */}
          <SmoothScroll />
          <ReelCanvas />
          <SiteHeader />
          <PageShell>{children}</PageShell>
        </NavProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
