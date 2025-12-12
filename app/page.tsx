"use client";

import { useState, useEffect } from "react";
import Particles from "@/components/Particles";
import GradientBlinds from "@/components/GradientBlinds";
import ColorBends from "@/components/ColorBends";
import Silk from "@/components/Silk";
import { GridScan } from "@/components/GridScan";
import FaultyTerminal from "@/components/FaultyTerminal";
import Iridescence from "@/components/Iridescence";
import Waves from "@/components/Waves";
import LetterGlitch from "@/components/LetterGlitch";
import Aurora from "@/components/Aurora";
import Dither from "@/components/Dither";
import Hyperspeed from "@/components/Hyperspeed";
import Lightning from "@/components/Lightning";
import Prism from "@/components/Prism";

const quirkyLines = [
  "refined by design. defined by code.",
  "where intention meets interaction",
  "think different. build distinctive.",
  "crafted, not constructed",
  "every pixel has purpose",
  "modern by nature. timeless by choice.",
  "details make the difference",
  "beyond beautiful. built right.",
  "innovation through iteration",
  "designed to be remembered",
  "substance over surface",
  "form follows function. beautifully.",
  "thoughtfully engineered experiences",
  "simplicity is sophistication",
  "made to move you",
  "precision in every interaction",
  "where craft meets code",
  "intentionally exceptional",
  "designed to delight. built to last.",
  "elevating the everyday",
  "performance meets poetry",
  "obsessively refined",
  "creating clarity from complexity",
  "purpose-driven design",
];

// Color palettes - curated sets for aesthetic consistency
const colorPalettes = [
  // Teal (GrayUI signature)
  { name: "teal", colors: ["#0F766E", "#14B8A6", "#2DD4BF", "#5EEAD4"], hue: 174 },
  // Purple vibrant
  { name: "purple", colors: ["#7C3AED", "#A78BFA", "#C4B5FD", "#DDD6FE"], hue: 260 },
  // Blue electric
  { name: "blue", colors: ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD"], hue: 220 },
  // Pink neon
  { name: "pink", colors: ["#DB2777", "#EC4899", "#F472B6", "#FBCFE8"], hue: 330 },
  // Orange fire
  { name: "orange", colors: ["#EA580C", "#F97316", "#FB923C", "#FDBA74"], hue: 25 },
  // Green cyber
  { name: "green", colors: ["#059669", "#10B981", "#34D399", "#6EE7B7"], hue: 160 },
  // Red hot
  { name: "red", colors: ["#DC2626", "#EF4444", "#F87171", "#FCA5A5"], hue: 0 },
  // Cyan matrix
  { name: "cyan", colors: ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9"], hue: 188 },
  // Indigo deep
  { name: "indigo", colors: ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC"], hue: 239 },
  // Amber warm
  { name: "amber", colors: ["#D97706", "#F59E0B", "#FBBF24", "#FCD34D"], hue: 45 },
  // Violet mystical
  { name: "violet", colors: ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD"], hue: 258 },
  // Emerald lush
  { name: "emerald", colors: ["#047857", "#059669", "#10B981", "#34D399"], hue: 155 },
];

// Function to generate backgrounds with a given color palette
const generateBackgrounds = (palette: typeof colorPalettes[0]) => [
  // Particles - classic, refined
  <Particles
    key="particles"
    className="w-full h-full"
    particleCount={300}
    particleSpread={12}
    speed={0.08}
    particleColors={palette.colors}
    moveParticlesOnHover={true}
    particleHoverFactor={1.5}
    alphaParticles={true}
    particleBaseSize={180}
    sizeRandomness={1.2}
    cameraDistance={20}
    disableRotation={false}
  />,
  // ColorBends - flowing, organic interaction
  <ColorBends
    key="colorbends"
    className="w-full h-full"
    colors={palette.colors}
    transparent={true}
    speed={0.15}
    mouseInfluence={1.2}
    parallax={0.6}
  />,
  // GradientBlinds - bold, distinctive
  <GradientBlinds
    key="gradientblinds"
    className="w-full h-full"
  />,
  // Silk - crafted texture
  <Silk
    key="silk"
    speed={3}
    scale={1.5}
    color={palette.colors[0]}
    noiseIntensity={2}
  />,
  // FaultyTerminal - purposeful digital
  <FaultyTerminal
    key="faultyterminal"
    className="w-full h-full"
    tint={palette.colors[1]}
    scanlineIntensity={0.2}
    glitchAmount={0.8}
    chromaticAberration={1}
  />,
  // Iridescence - timeless, modern
  <Iridescence
    key="iridescence"
    color={[
      parseInt(palette.colors[0].slice(1, 3), 16) / 255,
      parseInt(palette.colors[0].slice(3, 5), 16) / 255,
      parseInt(palette.colors[0].slice(5, 7), 16) / 255,
    ]}
    speed={0.8}
    amplitude={0.15}
  />,
  // GridScan - detailed precision
  <GridScan
    key="gridscan"
    className="w-full h-full"
    linesColor={palette.colors[0]}
    scanColor={palette.colors[1]}
    lineThickness={1.2}
    gridScale={0.08}
    scanOpacity={0.3}
  />,
  // Waves - beautiful interaction
  <Waves
    key="waves"
    lineColor={palette.colors[1]}
    backgroundColor="#000000"
    waveAmpX={24}
    waveAmpY={12}
    friction={0.9}
    tension={0.008}
  />,
  // LetterGlitch - iteration, rememberable
  <LetterGlitch
    key="letterglitch"
    glitchColors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
    glitchSpeed={60}
    smooth={true}
  />,
  // ColorBends alt config - substance
  <ColorBends
    key="colorbends2"
    className="w-full h-full"
    colors={["#14B8A6", "#0F766E", "#064E3B"]}
    transparent={true}
    rotation={120}
    warpStrength={1.5}
    frequency={0.8}
  />,
  // Silk alt - functional beauty
  <Silk
    key="silk2"
    speed={5}
    scale={2}
    color="#2DD4BF"
    noiseIntensity={1.2}
    rotation={45}
  />,
  // Iridescence alt - exceptional
  <Iridescence
    key="iridescence2"
    color={[0.18, 0.72, 0.65]}
    speed={1.2}
    amplitude={0.2}
  />,
  // GridScan alt - code meets craft
  <GridScan
    key="gridscan2"
    className="w-full h-full"
    linesColor="#2DD4BF"
    scanColor="#5EEAD4"
    lineStyle="dashed"
    scanDirection="pingpong"
  />,
  // FaultyTerminal alt - intentional
  <FaultyTerminal
    key="faultyterminal2"
    className="w-full h-full"
    tint="#5EEAD4"
    digitSize={1.8}
    flickerAmount={0.6}
    curvature={0.15}
  />,
  // Waves alt - delightful lasting
  <Waves
    key="waves2"
    lineColor="#0F766E"
    waveSpeedX={0.01}
    waveSpeedY={0.008}
    xGap={12}
    yGap={40}
  />,
  // LetterGlitch alt - elevating
  <LetterGlitch
    key="letterglitch2"
    glitchColors={["#14B8A6", "#5EEAD4", "#2DD4BF"]}
    glitchSpeed={45}
    smooth={true}
    centerVignette={true}
  />,
  // ColorBends alt3 - poetry
  <ColorBends
    key="colorbends3"
    className="w-full h-full"
    colors={["#5EEAD4", "#2DD4BF", "#14B8A6", "#0F766E"]}
    autoRotate={0.02}
    scale={0.8}
  />,
  // GradientBlinds alt - obsessively refined
  <GradientBlinds
    key="gradientblinds2"
    className="w-full h-full"
  />,
  // Silk alt3 - clarity from complexity
  <Silk
    key="silk3"
    speed={4}
    scale={1.2}
    color="#14B8A6"
    noiseIntensity={1.8}
  />,
  // Iridescence alt3 - purpose-driven
  <Iridescence
    key="iridescence3"
    color={[0.09, 0.55, 0.49]}
    speed={0.6}
    amplitude={0.12}
  />,
  // GridScan alt3 - modern sophistication
  <GridScan
    key="gridscan3"
    className="w-full h-full"
    linesColor="#0F766E"
    scanColor="#2DD4BF"
    lineStyle="dotted"
    bloomIntensity={0.3}
    enablePost={true}
  />,
  // FaultyTerminal alt3 - engineered experiences
  <FaultyTerminal
    key="faultyterminal3"
    className="w-full h-full"
    tint="#0F766E"
    scanlineIntensity={0.4}
    noiseAmp={0.8}
  />,
  // Waves alt3 - precision interaction
  <Waves
    key="waves3"
    lineColor="#2DD4BF"
    waveAmpX={32}
    waveAmpY={16}
    maxCursorMove={120}
  />,
  // Particles alt - simplicity
  <Particles
    key="particles2"
    className="w-full h-full"
    particleCount={200}
    particleSpread={15}
    speed={0.05}
    particleColors={["#0F766E", "#14B8A6", "#2DD4BF"]}
    moveParticlesOnHover={true}
    particleHoverFactor={2}
    alphaParticles={true}
    particleBaseSize={200}
    sizeRandomness={1.5}
  />,
  // Aurora - ethereal light
  <Aurora
    key="aurora"
    colorStops={["#0F766E", "#14B8A6", "#2DD4BF"]}
    amplitude={1.5}
    blend={0.8}
  />,
  // Dither - noise texture
  <Dither
    key="dither"
    waveColor="#14B8A6"
    waveSpeed={0.3}
    waveFrequency={2}
    waveAmplitude={0.5}
    enableMouseInteraction={true}
    mouseRadius={0.15}
  />,
  // Hyperspeed - motion blur
  <Hyperspeed
    key="hyperspeed"
    className="w-full h-full"
    effectOptions={{
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
    }}
    bloomStrength={0.5}
    colors={{
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x0F766E,
      brokenLines: 0x14B8A6,
      leftCars: [0x2DD4BF, 0x5EEAD4, 0x14B8A6],
      rightCars: [0x0F766E, 0x115E59, 0x134E4A],
      sticks: 0x14B8A6,
    }}
  />,
  // Lightning - electric energy
  <Lightning
    key="lightning"
    hue={174}
    speed={0.8}
    intensity={1.2}
    size={1}
  />,
  // Prism - geometric light
  <Prism
    key="prism"
    height={4}
    baseWidth={6}
    animationType="rotate"
    glow={1.5}
    hueShift={174}
    colorFrequency={1.2}
    scale={4}
  />,
  // Aurora alt - different colors
  <Aurora
    key="aurora2"
    colorStops={["#2DD4BF", "#5EEAD4", "#0F766E"]}
    amplitude={2}
    blend={0.6}
  />,
  // Prism alt - 3d rotation
  <Prism
    key="prism2"
    height={3}
    baseWidth={5}
    animationType="3drotate"
    glow={2}
    hueShift={180}
    bloom={1.5}
  />,
  // Lightning alt - teal tone
  <Lightning
    key="lightning2"
    hue={180}
    speed={1.2}
    intensity={0.8}
    size={1.2}
  />,
];

// Bold, expressive display fonts for 910studio
const displayFonts = [
  "--font-syne", // Refined signature
  "--font-unbounded", // Extreme boldness
  "--font-space-grotesk", // Geometric punch
  "--font-archivo", // Editorial weight
  "--font-russo", // Pure strength
  "--font-orbitron", // Futuristic edge
  "--font-chakra-petch", // Digital aggression
  "--font-rajdhani", // Condensed impact
  "--font-saira", // Modern presence
  "--font-outfit", // Rounded boldness
  "--font-michroma", // Tech precision
];

export default function Home() {
  const [tagline, setTagline] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<JSX.Element | null>(null);
  const [displayFont, setDisplayFont] = useState(displayFonts[0]);

  useEffect(() => {
    // FULL randomization - pick random palette AND random background type
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const generatedBackgrounds = generateBackgrounds(randomPalette);
    const randomBgIndex = Math.floor(Math.random() * generatedBackgrounds.length);

    // Randomize everything independently
    const randomQuoteIndex = Math.floor(Math.random() * quirkyLines.length);
    const randomFontIndex = Math.floor(Math.random() * displayFonts.length);

    setSelectedBackground(generatedBackgrounds[randomBgIndex]);
    setTagline(quirkyLines[randomQuoteIndex]);
    setDisplayFont(displayFonts[randomFontIndex]);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute inset-0 w-full h-full z-0">
        {selectedBackground}
      </div>
      <main className="absolute inset-0 z-10 flex h-full w-full flex-col pointer-events-none">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center pointer-events-auto">
            <h1
              className="text-6xl font-bold tracking-tight text-white sm:text-8xl"
              style={{ fontFamily: `var(${displayFont})` }}
            >
              910studio
            </h1>
            <p
              className="mt-6 text-xl text-zinc-400 sm:text-2xl px-6 py-2 bg-black/80 backdrop-blur-sm rounded-lg inline-block"
              style={{ fontFamily: `var(${displayFont})` }}
            >
              {tagline || "something's forming"}
            </p>
            <div className="mt-12">
              <a
                href="https://design.910.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-sm border border-teal-600/50 rounded-lg text-teal-400 hover:bg-teal-600/20 hover:border-teal-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                style={{ fontFamily: `var(${displayFont})` }}
              >
                <span>Visit Design Studio</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <footer className="pb-8 text-center pointer-events-auto">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} 910studio
          </p>
        </footer>
      </main>
    </div>
  );
}
