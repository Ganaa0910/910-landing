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
  Russo_One,
  // New wild fonts
  Playfair_Display,
  Bebas_Neue,
  Righteous,
  Black_Ops_One,
  Monoton,
  Press_Start_2P,
  VT323,
  Bungee,
  Ultra,
  Paytone_One,
  Anton,
  Teko,
  Barlow_Condensed,
  Fjalla_One,
  Oswald,
  Staatliches,
  Alfa_Slab_One,
  Audiowide,
  Electrolize,
  Exo_2,
  Aldrich,
  Righteous as RighteousAlt,
  Permanent_Marker,
  Faster_One,
  Creepster,
  Zilla_Slab,
  Black_Han_Sans,
  Rubik_Mono_One,
  // MORE CHAOS - EXTRA WILD FONTS
  Chakra_Petch as ChakraPetchAlt,
  Orbitron as OrbitronAlt,
  Wallpoet,
  Vast_Shadow,
  Plaster,
  Eater,
  Metal_Mania,
  Nosifer,
  Butcherman,
  Caesar_Dressing,
  Smokum,
  Skranji,
  Rye,
  Hanalei_Fill,
  Lacquer,
  Shrikhand,
  Kumar_One,
  Sirin_Stencil,
  Trade_Winds,
  Stalinist_One,
  Cinzel,
  Syncopate,
  Iceland,
  Poller_One,
  Turret_Road,
  Arizonia,
  Gruppo,
  Major_Mono_Display,
  Monofett,
  Sedgwick_Ave_Display,
  Special_Elite,
  Fontdiner_Swanky,
  Titan_One,
  Squada_One,
  Passion_One,
  Londrina_Outline,
  Sancreek
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

// NEW WILD FONTS - SHAPESHIFTER MODE
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  variable: "--font-black-ops",
  weight: "400",
  subsets: ["latin"],
});

const monoton = Monoton({
  variable: "--font-monoton",
  weight: "400",
  subsets: ["latin"],
});

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

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

const ultra = Ultra({
  variable: "--font-ultra",
  weight: "400",
  subsets: ["latin"],
});

const paytone = Paytone_One({
  variable: "--font-paytone",
  weight: "400",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "600", "700"],
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

const staatliches = Staatliches({
  variable: "--font-staatliches",
  weight: "400",
  subsets: ["latin"],
});

const alfaSlab = Alfa_Slab_One({
  variable: "--font-alfa-slab",
  weight: "400",
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

const aldrich = Aldrich({
  variable: "--font-aldrich",
  weight: "400",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});

const fasterOne = Faster_One({
  variable: "--font-faster-one",
  weight: "400",
  subsets: ["latin"],
});

const creepster = Creepster({
  variable: "--font-creepster",
  weight: "400",
  subsets: ["latin"],
});

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const blackHan = Black_Han_Sans({
  variable: "--font-black-han",
  weight: "400",
  subsets: ["latin"],
});

const rubikMono = Rubik_Mono_One({
  variable: "--font-rubik-mono",
  weight: "400",
  subsets: ["latin"],
});

// MORE CHAOS - EXTRA WILD FONTS
const wallpoet = Wallpoet({
  variable: "--font-wallpoet",
  weight: "400",
  subsets: ["latin"],
});

const vastShadow = Vast_Shadow({
  variable: "--font-vast-shadow",
  weight: "400",
  subsets: ["latin"],
});

const plaster = Plaster({
  variable: "--font-plaster",
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

const nosifer = Nosifer({
  variable: "--font-nosifer",
  weight: "400",
  subsets: ["latin"],
});

const butcherman = Butcherman({
  variable: "--font-butcherman",
  weight: "400",
  subsets: ["latin"],
});

const caesarDressing = Caesar_Dressing({
  variable: "--font-caesar-dressing",
  weight: "400",
  subsets: ["latin"],
});

const smokum = Smokum({
  variable: "--font-smokum",
  weight: "400",
  subsets: ["latin"],
});

const skranji = Skranji({
  variable: "--font-skranji",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const rye = Rye({
  variable: "--font-rye",
  weight: "400",
  subsets: ["latin"],
});

const hanaleiFill = Hanalei_Fill({
  variable: "--font-hanalei-fill",
  weight: "400",
  subsets: ["latin"],
});

const lacquer = Lacquer({
  variable: "--font-lacquer",
  weight: "400",
  subsets: ["latin"],
});

const shrikhand = Shrikhand({
  variable: "--font-shrikhand",
  weight: "400",
  subsets: ["latin"],
});

const kumarOne = Kumar_One({
  variable: "--font-kumar-one",
  weight: "400",
  subsets: ["latin"],
});

const sirinStencil = Sirin_Stencil({
  variable: "--font-sirin-stencil",
  weight: "400",
  subsets: ["latin"],
});

const tradeWinds = Trade_Winds({
  variable: "--font-trade-winds",
  weight: "400",
  subsets: ["latin"],
});

const stalinistOne = Stalinist_One({
  variable: "--font-stalinist-one",
  weight: "400",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const iceland = Iceland({
  variable: "--font-iceland",
  weight: "400",
  subsets: ["latin"],
});

const pollerOne = Poller_One({
  variable: "--font-poller-one",
  weight: "400",
  subsets: ["latin"],
});

const turretRoad = Turret_Road({
  variable: "--font-turret-road",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const arizonia = Arizonia({
  variable: "--font-arizonia",
  weight: "400",
  subsets: ["latin"],
});

const gruppo = Gruppo({
  variable: "--font-gruppo",
  weight: "400",
  subsets: ["latin"],
});

const majorMonoDisplay = Major_Mono_Display({
  variable: "--font-major-mono-display",
  weight: "400",
  subsets: ["latin"],
});

const monofett = Monofett({
  variable: "--font-monofett",
  weight: "400",
  subsets: ["latin"],
});

const sedgwickAve = Sedgwick_Ave_Display({
  variable: "--font-sedgwick-ave",
  weight: "400",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

const fontdinerSwanky = Fontdiner_Swanky({
  variable: "--font-fontdiner-swanky",
  weight: "400",
  subsets: ["latin"],
});

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
});

const squadaOne = Squada_One({
  variable: "--font-squada-one",
  weight: "400",
  subsets: ["latin"],
});

const passionOne = Passion_One({
  variable: "--font-passion-one",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

const londrinaOutline = Londrina_Outline({
  variable: "--font-londrina-outline",
  weight: "400",
  subsets: ["latin"],
});

const sancreek = Sancreek({
  variable: "--font-sancreek",
  weight: "400",
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
          ${playfair.variable} ${bebas.variable} ${righteous.variable}
          ${blackOps.variable} ${monoton.variable} ${pressStart.variable}
          ${vt323.variable} ${bungee.variable} ${ultra.variable}
          ${paytone.variable} ${anton.variable} ${teko.variable}
          ${barlowCondensed.variable} ${fjalla.variable} ${oswald.variable}
          ${staatliches.variable} ${alfaSlab.variable} ${audiowide.variable}
          ${electrolize.variable} ${exo2.variable} ${aldrich.variable}
          ${permanentMarker.variable} ${fasterOne.variable} ${creepster.variable}
          ${zillaSlab.variable} ${blackHan.variable} ${rubikMono.variable}
          ${wallpoet.variable} ${vastShadow.variable} ${plaster.variable}
          ${eater.variable} ${metalMania.variable} ${nosifer.variable}
          ${butcherman.variable} ${caesarDressing.variable} ${smokum.variable}
          ${skranji.variable} ${rye.variable} ${hanaleiFill.variable}
          ${lacquer.variable} ${shrikhand.variable} ${kumarOne.variable}
          ${sirinStencil.variable} ${tradeWinds.variable} ${stalinistOne.variable}
          ${cinzel.variable} ${syncopate.variable} ${iceland.variable}
          ${pollerOne.variable} ${turretRoad.variable} ${arizonia.variable}
          ${gruppo.variable} ${majorMonoDisplay.variable} ${monofett.variable}
          ${sedgwickAve.variable} ${specialElite.variable} ${fontdinerSwanky.variable}
          ${titanOne.variable} ${squadaOne.variable} ${passionOne.variable}
          ${londrinaOutline.variable} ${sancreek.variable}
          antialiased h-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
