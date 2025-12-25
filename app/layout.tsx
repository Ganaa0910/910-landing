import type { Metadata } from "next";
import {
  // Core/UI
  IBM_Plex_Mono,
  // Display Modern
  Syne,
  Unbounded,
  Space_Grotesk,
  // Condensed Power
  Bebas_Neue,
  Anton,
  Fjalla_One,
  Oswald,
  // Futuristic/Tech
  Orbitron,
  Audiowide,
  Electrolize,
  Exo_2,
  // Retro
  VT323,
  // Bold Display
  Russo_One,
  Ultra,
  Black_Ops_One,
  // Elegant/Serif
  Playfair_Display,
  Cinzel,
  // Quirky
  Monoton,
  Wallpoet,
  Rubik_Mono_One,
  Permanent_Marker,
  // Geometric
  Staatliches,
  Aldrich,
  Syncopate,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Core UI font
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Display Modern
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Condensed Power
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

const fjalla = Fjalla_One({
  variable: "--font-fjalla",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

// Futuristic/Tech
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
});

const electrolize = Electrolize({
  variable: "--font-electrolize",
  weight: "400",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

// Retro
const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

// Bold Display
const russoOne = Russo_One({
  variable: "--font-russo",
  weight: "400",
  subsets: ["latin"],
});

const ultra = Ultra({
  variable: "--font-ultra",
  weight: "400",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  variable: "--font-black-ops",
  weight: "400",
  subsets: ["latin"],
});

// Elegant/Serif
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

// Quirky
const monoton = Monoton({
  variable: "--font-monoton",
  weight: "400",
  subsets: ["latin"],
});

const wallpoet = Wallpoet({
  variable: "--font-wallpoet",
  weight: "400",
  subsets: ["latin"],
});

const rubikMono = Rubik_Mono_One({
  variable: "--font-rubik-mono",
  weight: "400",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});

// Geometric
const staatliches = Staatliches({
  variable: "--font-staatliches",
  weight: "400",
  subsets: ["latin"],
});

const aldrich = Aldrich({
  variable: "--font-aldrich",
  weight: "400",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// ============================================
// LOCAL FONTS - Custom Collection
// ============================================

const atures = localFont({
  src: "../public/atures-font/Atures700PersonalUseOnly-lax5.ttf",
  variable: "--font-atures",
});

const blockTalk = localFont({
  src: "../public/block-talk-font/BlockTalk-lLZD.ttf",
  variable: "--font-block-talk",
});

const gnawHard = localFont({
  src: "../public/gnaw-hard-font/GnawHard-ZxY8.ttf",
  variable: "--font-gnaw-hard",
});

const harden = localFont({
  src: "../public/h-harden-font/Harden-OV0d8.otf",
  variable: "--font-harden",
});

const hardstyle = localFont({
  src: "../public/hardstyle-font/Hardstyle-XD5a.ttf",
  variable: "--font-hardstyle",
});

const helicopta = localFont({
  src: "../public/helicopta-font/Helicopta-YwXj.ttf",
  variable: "--font-helicopta",
});

const lighthouse = localFont({
  src: "../public/lighthouse-font/LighthousePersonalUse-vjyy.ttf",
  variable: "--font-lighthouse",
});

const modeccio = localFont({
  src: "../public/modeccio-font/Modeccio-JeYB.ttf",
  variable: "--font-modeccio",
});

const monas = localFont({
  src: "../public/monas-font/MonasDemoRegular-eZl86.ttf",
  variable: "--font-monas",
});

const requiresMoonshine = localFont({
  src: "../public/requires-moonshine-font/RequiresMoonshine-odw0.ttf",
  variable: "--font-requires-moonshine",
});

const sheepingCats = localFont({
  src: "../public/sheeping-cats-font/SheepingCats-929Z.ttf",
  variable: "--font-sheeping-cats",
});

const superShake = localFont({
  src: "../public/super-shake-font/SuperShake-e9PGn.ttf",
  variable: "--font-super-shake",
});

const verminVerile = localFont({
  src: "../public/vermin-verile-font/VerminVerile-wXyw.ttf",
  variable: "--font-vermin-verile",
});

const beyondDreams = localFont({
  src: "../public/beyond-dreams-font/BeyondDreams-1jppe.ttf",
  variable: "--font-beyond-dreams",
});

const brigrette = localFont({
  src: "../public/brigrette-font/Brigrette-WpB5n.ttf",
  variable: "--font-brigrette",
});

const cairopixel = localFont({
  src: "../public/cairopixel-font/Cairopixel-G3DeP.ttf",
  variable: "--font-cairopixel",
});

const christmasPipow = localFont({
  src: "../public/christmas-pipow-font/ChristmasPipowDemo-V4R5l.otf",
  variable: "--font-christmas-pipow",
});

const handriyen = localFont({
  src: "../public/handriyen-font/HandriyenDemo-q2nwl.ttf",
  variable: "--font-handriyen",
});

const rosa = localFont({
  src: "../public/rosa-font/Rosa-Yq9Bv.otf",
  variable: "--font-rosa",
});

const secoline = localFont({
  src: "../public/secoline-font/SecolineRegular-aYmdx.ttf",
  variable: "--font-secoline",
});

const spotfix = localFont({
  src: "../public/spotfix-font/SpotfixDemo-MAqqw.otf",
  variable: "--font-spotfix",
});

const superShiny = localFont({
  src: "../public/super-shiny-font/SuperShiny-0v0rG.ttf",
  variable: "--font-super-shiny",
});

const theLastTrunks = localFont({
  src: "../public/the-last-trunks-font/TheLastTrunks-nAOmR.ttf",
  variable: "--font-the-last-trunks",
});

const siteUrl = "https://910.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "910studio | Creative Web Studio",
    template: "%s | 910studio",
  },
  description:
    "Creative web studio crafting exceptional digital experiences. Modern web development, UI/UX design, and brand identity for ambitious brands.",
  keywords: [
    "web studio",
    "creative agency",
    "web development",
    "UI/UX design",
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
      "Creative web studio crafting exceptional digital experiences. Modern web development, UI/UX design, and brand identity.",
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
      "Creative web studio crafting exceptional digital experiences. Modern web development, UI/UX design, and brand identity.",
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
    <html lang="en" className="h-full bg-black">
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
                "Creative web studio crafting exceptional digital experiences. Modern web development, UI/UX design, and brand identity.",
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
        className={`
          ${ibmPlexMono.variable}
          ${syne.variable} ${unbounded.variable} ${spaceGrotesk.variable}
          ${bebas.variable} ${anton.variable} ${fjalla.variable} ${oswald.variable}
          ${orbitron.variable} ${audiowide.variable} ${electrolize.variable} ${exo2.variable}
          ${vt323.variable}
          ${russoOne.variable} ${ultra.variable} ${blackOps.variable}
          ${playfair.variable} ${cinzel.variable}
          ${monoton.variable} ${wallpoet.variable} ${rubikMono.variable} ${permanentMarker.variable}
          ${staatliches.variable} ${aldrich.variable} ${syncopate.variable}
          ${atures.variable} ${blockTalk.variable} ${gnawHard.variable} ${harden.variable}
          ${hardstyle.variable} ${helicopta.variable} ${lighthouse.variable} ${modeccio.variable}
          ${monas.variable} ${requiresMoonshine.variable} ${sheepingCats.variable}
          ${superShake.variable} ${verminVerile.variable}
          ${beyondDreams.variable} ${brigrette.variable} ${cairopixel.variable}
          ${christmasPipow.variable} ${handriyen.variable} ${rosa.variable}
          ${secoline.variable} ${spotfix.variable} ${superShiny.variable} ${theLastTrunks.variable}
          antialiased h-full bg-black
        `}
      >
        {children}
      </body>
    </html>
  );
}
