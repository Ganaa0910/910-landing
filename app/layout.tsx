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
  // Retro/Pixel
  Press_Start_2P,
  VT323,
  // Bold Display
  Russo_One,
  Ultra,
  Black_Ops_One,
  // Horror/Wild
  Creepster,
  Nosifer,
  Eater,
  Metal_Mania,
  // Racing/Speed
  Faster_One,
  // Western
  Rye,
  Smokum,
  Sancreek,
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
  Syncopate
} from "next/font/google";
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

// Retro/Pixel
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

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

// Horror/Wild
const creepster = Creepster({
  variable: "--font-creepster",
  weight: "400",
  subsets: ["latin"],
});

const nosifer = Nosifer({
  variable: "--font-nosifer",
  weight: "400",
  subsets: ["latin"],
});

const eater = Eater({
  variable: "--font-eater",
  weight: "400",
  subsets: ["latin"],
});

const metalMania = Metal_Mania({
  variable: "--font-metal-mania",
  weight: "400",
  subsets: ["latin"],
});

// Racing/Speed
const fasterOne = Faster_One({
  variable: "--font-faster-one",
  weight: "400",
  subsets: ["latin"],
});

// Western
const rye = Rye({
  variable: "--font-rye",
  weight: "400",
  subsets: ["latin"],
});

const smokum = Smokum({
  variable: "--font-smokum",
  weight: "400",
  subsets: ["latin"],
});

const sancreek = Sancreek({
  variable: "--font-sancreek",
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

export const metadata: Metadata = {
  title: "910studio",
  description: "Creative web studio crafting exceptional digital experiences",
  icons: {
    icon: "/web-icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`
          ${ibmPlexMono.variable}
          ${syne.variable} ${unbounded.variable} ${spaceGrotesk.variable}
          ${bebas.variable} ${anton.variable} ${fjalla.variable} ${oswald.variable}
          ${orbitron.variable} ${audiowide.variable} ${electrolize.variable} ${exo2.variable}
          ${pressStart.variable} ${vt323.variable}
          ${russoOne.variable} ${ultra.variable} ${blackOps.variable}
          ${creepster.variable} ${nosifer.variable} ${eater.variable} ${metalMania.variable}
          ${fasterOne.variable}
          ${rye.variable} ${smokum.variable} ${sancreek.variable}
          ${playfair.variable} ${cinzel.variable}
          ${monoton.variable} ${wallpoet.variable} ${rubikMono.variable} ${permanentMarker.variable}
          ${staatliches.variable} ${aldrich.variable} ${syncopate.variable}
          antialiased h-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
