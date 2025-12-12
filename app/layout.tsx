import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Syne,
  Manrope,
  Space_Grotesk,
  Work_Sans,
  DM_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Instrument_Sans,
  Unbounded,
  Lexend,
  Archivo,
  JetBrains_Mono,
  Azeret_Mono,
  IBM_Plex_Mono,
  Inconsolata,
  Chakra_Petch,
  Orbitron,
  Rajdhani,
  Saira,
  Michroma,
  Russo_One
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display fonts - bold, distinctive
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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const russoOne = Russo_One({
  variable: "--font-russo",
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

// Body fonts - clean, readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

// Mono fonts - technical, precise
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
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
          ${geistSans.variable} ${geistMono.variable}
          ${syne.variable} ${unbounded.variable} ${spaceGrotesk.variable}
          ${outfit.variable} ${archivo.variable} ${russoOne.variable}
          ${orbitron.variable} ${michroma.variable} ${chakraPetch.variable}
          ${rajdhani.variable} ${saira.variable}
          ${inter.variable} ${manrope.variable} ${workSans.variable}
          ${dmSans.variable} ${plusJakarta.variable} ${instrumentSans.variable}
          ${lexend.variable}
          ${jetbrainsMono.variable} ${azeretMono.variable} ${ibmPlexMono.variable}
          ${inconsolata.variable}
          antialiased h-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
