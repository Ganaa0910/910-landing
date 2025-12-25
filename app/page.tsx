"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
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
import LightRays from "@/components/LightRays";
import Plasma from "@/components/Plasma";
import PixelSnow from "@/components/PixelSnow";
import Beams from "@/components/Beams";
import PrismaticBurst from "@/components/PrismaticBurst";
import Galaxy from "@/components/Galaxy";
import RippleGrid from "@/components/RippleGrid";

const quirkyLines = [
  // Original classics
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
  // NEW CHAOS MODE
  "fuck around and find out",
  "built different. literally.",
  "your idea. our execution. their envy.",
  "we don't do boring",
  "make it legendary or don't make it",
  "code like poetry. ship like clockwork.",
  "where pixels meet passion",
  "aesthetics are non-negotiable",
  "we speak fluent internet",
  "make them stop scrolling",
  "vibes + velocity = victory",
  "built for the timeline",
  "too fast. too clean. too good.",
  "making the internet jealous since 2024",
  "your vision on steroids",
  "ship it or quit it",
  "zero bullshit. pure execution.",
  "we build monuments, not websites",
  "taste meets tech",
  "designed to dominate",
  "when good enough isn't",
  "ctrl+alt+elite",
  "engineered obsession",
  "make them remember",
  "build loud. ship fast.",
  "digital craftsmanship",
  "code with attitude",
  "your brand's glow-up",
  "making pixels dance",
  "architecture for attention",
  "built to be bookmarked",
  "design that speaks volumes",
  "where vision becomes velocity",
  "crafting digital artifacts",
  "engineered to impress",
  "your unfair advantage",
  "building internet legends",
  "make it unforgettable",
  "precision. passion. pixels.",
  "we ship experiences",
  "designed to trend",
  "crafted for conversion",
  "your idea deserves this",
  "building the future's favorites",
  "make them feel something",
  "engineered excellence",
  "where creativity compiles",
  "built to last. designed to wow.",
  "making the web sexier",
  "your project's final form",
  "designed to disrupt",
  "crafting digital desire",
  "we make it matter",
  "building brand legends",
  "engineered envy",
  "your vision, amplified",
  "designed to convert",
  "where art meets algorithm",
  "making brands iconic",
  "built for virality",
  "designed to dominate feeds",
  "we build for keeps",
  "crafting cultural moments",
  "engineered to engage",
  "your digital signature",
  "designed to be shared",
  "we ship masterpieces",
  "building tomorrow's classics",
  "designed to be desired",
  "where function is fashion",
  "crafting competitive edges",
  "engineered to stand out",
  "your brand's evolution",
  "designed to be screenshotted",
  "we build experiences, not pages",
  "making brands magnetic",
  "designed for double-takes",
  "where code becomes culture",
  "building digital dynasties",
  "engineered elegance",
  "designed to be remembered forever",
  "we craft the vibe",
  "building experiences that hit different",
  "designed to make noise",
  "where ideas become icons",
  "crafting digital prestige",
  "engineered to inspire",
  "designed to be the standard",
  "we don't follow trends. we set them.",
  "building what others bookmark",
  "designed for distinction",
  "where quality is the aesthetic",
  "crafting competitive advantages",
  "engineered to elevate",
  "designed to dominate search",
  "we build with intention",
  "making brands unforgettable",
  "designed to be the reference",
  "where polish meets power",
  "crafting digital legacies",
  "engineered to endure",
];

// Color palettes - FULL SPECTRUM CHAOS
const colorPalettes = [
  // Teal (GrayUI signature)
  { name: "teal", colors: ["#0F766E", "#14B8A6", "#2DD4BF", "#5EEAD4"], hue: 174 },
  // Purple vibrant
  { name: "purple", colors: ["#7C3AED", "#A78BFA", "#C4B5FD", "#DDD6FE"], hue: 260 },
  // Pink neon
  { name: "pink", colors: ["#DB2777", "#EC4899", "#F472B6", "#FBCFE8"], hue: 330 },
  // Orange fire
  { name: "orange", colors: ["#EA580C", "#F97316", "#FB923C", "#FDBA74"], hue: 25 },
  // Green cyber
  { name: "green", colors: ["#059669", "#10B981", "#34D399", "#6EE7B7"], hue: 160 },
  // Cyan matrix
  { name: "cyan", colors: ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9"], hue: 188 },
  // Amber warm
  { name: "amber", colors: ["#D97706", "#F59E0B", "#FBBF24", "#FCD34D"], hue: 45 },
  // Violet mystical
  { name: "violet", colors: ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD"], hue: 258 },
  // Emerald lush
  { name: "emerald", colors: ["#047857", "#059669", "#10B981", "#34D399"], hue: 155 },
  // NEW WILD COLORS
  // Lime acid
  { name: "lime", colors: ["#65A30D", "#84CC16", "#A3E635", "#D9F99D"], hue: 80 },
  // Fuchsia electric
  { name: "fuchsia", colors: ["#A21CAF", "#C026D3", "#E879F9", "#F5D0FE"], hue: 300 },
  // Rose passion
  { name: "rose", colors: ["#BE123C", "#E11D48", "#FB7185", "#FECDD3"], hue: 350 },
  // Sky bright
  { name: "sky", colors: ["#0284C7", "#0EA5E9", "#38BDF8", "#BAE6FD"], hue: 200 },
  // Yellow sunshine
  { name: "yellow", colors: ["#CA8A04", "#EAB308", "#FACC15", "#FEF08A"], hue: 50 },
  // Slate steel
  { name: "slate", colors: ["#475569", "#64748B", "#94A3B8", "#CBD5E1"], hue: 215 },
  // Stone earth
  { name: "stone", colors: ["#57534E", "#78716C", "#A8A29E", "#D6D3D1"], hue: 25 },
  // Zinc metal
  { name: "zinc", colors: ["#52525B", "#71717A", "#A1A1AA", "#D4D4D8"], hue: 0 },
  // Neutral gray
  { name: "neutral", colors: ["#525252", "#737373", "#A3A3A3", "#D4D4D4"], hue: 0 },
  // Mint fresh
  { name: "mint", colors: ["#047857", "#10B981", "#6EE7B7", "#D1FAE5"], hue: 160 },
  // Neon green
  { name: "neon-green", colors: ["#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0"], hue: 142 },
  // Hot pink
  { name: "hot-pink", colors: ["#F472B6", "#F9A8D4", "#FBCFE8", "#FCE7F3"], hue: 328 },
  // Coral sunset
  { name: "coral", colors: ["#DC2626", "#F97316", "#FDBA74", "#FED7AA"], hue: 15 },
  // Lavender soft
  { name: "lavender", colors: ["#7C3AED", "#A78BFA", "#DDD6FE", "#EDE9FE"], hue: 260 },
  // Gold luxury
  { name: "gold", colors: ["#B45309", "#D97706", "#FBBF24", "#FDE68A"], hue: 45 },
  // Aqua ocean
  { name: "aqua", colors: ["#0E7490", "#0891B2", "#22D3EE", "#A5F3FC"], hue: 188 },
  // Magenta vibrant
  { name: "magenta", colors: ["#9F1239", "#BE123C", "#FB7185", "#FBCFE8"], hue: 330 },
  // Peach warm
  { name: "peach", colors: ["#EA580C", "#FB923C", "#FDBA74", "#FED7AA"], hue: 30 },
  // Chartreuse wild
  { name: "chartreuse", colors: ["#4D7C0F", "#65A30D", "#A3E635", "#ECFCCB"], hue: 75 },
  // Turquoise electric
  { name: "turquoise", colors: ["#0D9488", "#14B8A6", "#5EEAD4", "#AFECEF"], hue: 172 },
  // Tangerine burst
  { name: "tangerine", colors: ["#F97316", "#FB923C", "#FDBA74", "#FED7AA"], hue: 24 },
  // EXTREME SPECTRUM - CHAOS UNLEASHED
  // Vaporwave aesthetic
  { name: "vaporwave", colors: ["#FF71CE", "#01CDFE", "#05FFA1", "#B967FF"], hue: 320 },
  // Cyberpunk neon
  { name: "cyberpunk", colors: ["#00FF41", "#FF006E", "#FFBE0B", "#00F5FF"], hue: 140 },
  // Retro 80s
  { name: "retro-80s", colors: ["#FF006E", "#8338EC", "#3A86FF", "#FFBE0B"], hue: 330 },
  // Synthwave sunset
  { name: "synthwave", colors: ["#FF0080", "#FF8C00", "#FFD700", "#7B2CBF"], hue: 330 },
  // Matrix green
  { name: "matrix", colors: ["#00FF00", "#39FF14", "#00D100", "#008F00"], hue: 120 },
  // Blood and chrome
  { name: "blood-chrome", colors: ["#FF0000", "#DC143C", "#C0C0C0", "#E8E8E8"], hue: 0 },
  // Royal purple
  { name: "royal", colors: ["#4B0082", "#6A0DAD", "#9370DB", "#DDA0DD"], hue: 275 },
  // Toxic waste
  { name: "toxic", colors: ["#00FF00", "#ADFF2F", "#7FFF00", "#32CD32"], hue: 100 },
  // Sunset gradient
  { name: "sunset", colors: ["#FF0080", "#FF8C00", "#FFD700", "#FF1493"], hue: 330 },
  // Deep ocean
  { name: "deep-ocean", colors: ["#000080", "#0000CD", "#1E90FF", "#00BFFF"], hue: 240 },
  // Neon rainbow
  { name: "neon-rainbow", colors: ["#FF0080", "#00FF80", "#0080FF", "#FF8000"], hue: 330 },
  // Midnight blue
  { name: "midnight", colors: ["#191970", "#000080", "#4169E1", "#6495ED"], hue: 240 },
  // Crimson fire
  { name: "crimson", colors: ["#DC143C", "#FF0000", "#FF4500", "#FF6347"], hue: 0 },
  // Arctic ice
  { name: "arctic", colors: ["#00CED1", "#20B2AA", "#48D1CC", "#AFEEEE"], hue: 180 },
  // Molten lava
  { name: "lava", colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFA500"], hue: 15 },
  // Electric blue
  { name: "electric-blue", colors: ["#0080FF", "#00A0FF", "#00C0FF", "#00E0FF"], hue: 200 },
  // Poison green
  { name: "poison", colors: ["#7FFF00", "#9ACD32", "#ADFF2F", "#00FF7F"], hue: 90 },
  // Grape soda
  { name: "grape", colors: ["#8B00FF", "#9400D3", "#9932CC", "#BA55D3"], hue: 280 },
  // Nuclear yellow
  { name: "nuclear", colors: ["#FFFF00", "#FFD700", "#FFA500", "#FF8C00"], hue: 50 },
  // Bubblegum pink
  { name: "bubblegum", colors: ["#FF69B4", "#FF1493", "#C71585", "#DB7093"], hue: 330 },
  // Laser red
  { name: "laser", colors: ["#FF0000", "#FF1744", "#FF5252", "#FF8A80"], hue: 0 },
  // Space purple
  { name: "space", colors: ["#1A0033", "#2D004D", "#4B0082", "#6A0DAD"], hue: 280 },
  // Radioactive
  { name: "radioactive", colors: ["#39FF14", "#00FF00", "#7FFF00", "#ADFF2F"], hue: 110 },
  // Flamingo
  { name: "flamingo", colors: ["#FC74FD", "#F754E8", "#E91E63", "#C2185B"], hue: 320 },
  // Copper rust
  { name: "copper", colors: ["#B87333", "#D2691E", "#CD853F", "#DEB887"], hue: 30 },
  // Holographic
  { name: "holographic", colors: ["#FF00FF", "#00FFFF", "#FF00AA", "#00FF80"], hue: 300 },
  // Blade Runner
  { name: "blade-runner", colors: ["#FF3864", "#00D9FF", "#8338EC", "#FFBE0B"], hue: 350 },
  // Ghost white
  { name: "ghost", colors: ["#F8F8FF", "#E6E6FA", "#D8BFD8", "#DDA0DD"], hue: 280 },
  // Rust
  { name: "rust", colors: ["#B7410E", "#C1440E", "#D2691E", "#CD853F"], hue: 20 },
  // Aquamarine dream
  { name: "aquamarine", colors: ["#7FFFD4", "#66CDAA", "#40E0D0", "#00CED1"], hue: 160 },
  // Berry blast
  { name: "berry", colors: ["#8B008B", "#9932CC", "#BA55D3", "#DA70D6"], hue: 300 },
  // Neon citrus
  { name: "citrus", colors: ["#FFA500", "#FFD700", "#FFFF00", "#ADFF2F"], hue: 50 },
  // Chrome luxury
  { name: "chrome", colors: ["#C0C0C0", "#D3D3D3", "#DCDCDC", "#E8E8E8"], hue: 0 },
  // Blue steel
  { name: "blue-steel", colors: ["#4682B4", "#5F9EA0", "#6495ED", "#7B68EE"], hue: 210 },
  // Violet storm
  { name: "violet-storm", colors: ["#EE82EE", "#DA70D6", "#FF00FF", "#BA55D3"], hue: 300 },
  // Solar flare
  { name: "solar-flare", colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFA07A"], hue: 15 },
  // Deep space
  { name: "deep-space", colors: ["#000000", "#0C0C0C", "#1A1A1A", "#2D2D2D"], hue: 0 },
  // Neon nights
  { name: "neon-nights", colors: ["#FF10F0", "#00F5FF", "#FFFF00", "#FF00AA"], hue: 300 },
  // Candy crush
  { name: "candy", colors: ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1"], hue: 350 },
  // Emerald city
  { name: "emerald-city", colors: ["#50C878", "#00A86B", "#008B8B", "#2E8B57"], hue: 140 },
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
    colors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
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
    color={palette.colors[2]}
    noiseIntensity={1.2}
    rotation={45}
  />,
  // Iridescence alt - exceptional
  <Iridescence
    key="iridescence2"
    color={[
      parseInt(palette.colors[1].slice(1, 3), 16) / 255,
      parseInt(palette.colors[1].slice(3, 5), 16) / 255,
      parseInt(palette.colors[1].slice(5, 7), 16) / 255,
    ]}
    speed={1.2}
    amplitude={0.2}
  />,
  // GridScan alt - code meets craft
  <GridScan
    key="gridscan2"
    className="w-full h-full"
    linesColor={palette.colors[2]}
    scanColor={palette.colors[3]}
    lineStyle="dashed"
    scanDirection="pingpong"
  />,
  // FaultyTerminal alt - intentional
  <FaultyTerminal
    key="faultyterminal2"
    className="w-full h-full"
    tint={palette.colors[3]}
    digitSize={1.8}
    flickerAmount={0.6}
    curvature={0.15}
  />,
  // Waves alt - delightful lasting
  <Waves
    key="waves2"
    lineColor={palette.colors[0]}
    waveSpeedX={0.01}
    waveSpeedY={0.008}
    xGap={12}
    yGap={40}
  />,
  // LetterGlitch alt - elevating
  <LetterGlitch
    key="letterglitch2"
    glitchColors={[palette.colors[1], palette.colors[3], palette.colors[2]]}
    glitchSpeed={45}
    smooth={true}
    centerVignette={true}
  />,
  // ColorBends alt3 - poetry
  <ColorBends
    key="colorbends3"
    className="w-full h-full"
    colors={[palette.colors[3], palette.colors[2], palette.colors[1], palette.colors[0]]}
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
    color={palette.colors[1]}
    noiseIntensity={1.8}
  />,
  // Iridescence alt3 - purpose-driven
  <Iridescence
    key="iridescence3"
    color={[
      parseInt(palette.colors[0].slice(1, 3), 16) / 255,
      parseInt(palette.colors[0].slice(3, 5), 16) / 255,
      parseInt(palette.colors[0].slice(5, 7), 16) / 255,
    ]}
    speed={0.6}
    amplitude={0.12}
  />,
  // GridScan alt3 - modern sophistication
  <GridScan
    key="gridscan3"
    className="w-full h-full"
    linesColor={palette.colors[0]}
    scanColor={palette.colors[2]}
    lineStyle="dotted"
    bloomIntensity={0.3}
    enablePost={true}
  />,
  // FaultyTerminal alt3 - engineered experiences
  <FaultyTerminal
    key="faultyterminal3"
    className="w-full h-full"
    tint={palette.colors[0]}
    scanlineIntensity={0.4}
    noiseAmp={0.8}
  />,
  // Waves alt3 - precision interaction
  <Waves
    key="waves3"
    lineColor={palette.colors[2]}
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
    particleColors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
    moveParticlesOnHover={true}
    particleHoverFactor={2}
    alphaParticles={true}
    particleBaseSize={200}
    sizeRandomness={1.5}
  />,
  // Aurora - ethereal light
  <Aurora
    key="aurora"
    colorStops={[palette.colors[0], palette.colors[1], palette.colors[2]]}
    amplitude={1.5}
    blend={0.8}
  />,
  // Dither - noise texture
  <Dither
    key="dither"
    waveColor={[
      parseInt(palette.colors[1].slice(1, 3), 16) / 255,
      parseInt(palette.colors[1].slice(3, 5), 16) / 255,
      parseInt(palette.colors[1].slice(5, 7), 16) / 255,
    ]}
    waveSpeed={0.3}
    waveFrequency={2}
    waveAmplitude={0.5}
    enableMouseInteraction={true}
    mouseRadius={0.15}
  />,
  // Hyperspeed - motion blur
  <Hyperspeed
    key="hyperspeed"
    effectOptions={{
      roadWidth: 9,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
    }}
  />,
  // Lightning - electric energy
  <Lightning
    key="lightning"
    hue={palette.hue}
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
    hueShift={palette.hue}
    colorFrequency={1.2}
    scale={4}
  />,
  // Aurora alt - different colors
  <Aurora
    key="aurora2"
    colorStops={[palette.colors[2], palette.colors[3], palette.colors[0]]}
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
    hueShift={palette.hue}
    bloom={1.5}
  />,
  // Lightning alt - palette hue
  <Lightning
    key="lightning2"
    hue={palette.hue}
    speed={1.2}
    intensity={0.8}
    size={1.2}
  />,
  // LightRays - radial beams
  <LightRays
    key="lightrays"
    raysColor={palette.colors[1]}
    raysSpeed={0.5}
  />,
  // Plasma - organic flow
  <Plasma
    key="plasma"
    color={palette.colors[1]}
    speed={0.8}
  />,
  // Beams - light streaks
  <Beams
    key="beams"
    lightColor={palette.colors[1]}
    beamNumber={8}
    speed={1.5}
    beamWidth={2}
  />,
  // PrismaticBurst - color explosion
  <PrismaticBurst
    key="prismaticburst"
    colors={palette.colors}
    speed={1.2}
    intensity={1.5}
  />,
  // LightRays alt - different config
  <LightRays
    key="lightrays2"
    raysColor={palette.colors[2]}
    raysSpeed={0.8}
  />,
  // Plasma alt - faster flow
  <Plasma
    key="plasma2"
    color={palette.colors[2]}
    speed={1.5}
  />,
];

// Fonts that need extra letter spacing (thicc/condensed ones)
const wideSpacingFonts = new Set([
  "--font-fjalla",
  "--font-ultra",
  "--font-black-ops",
  "--font-unbounded",
  "--font-staatliches",
  "--font-block-talk",
  "--font-gnaw-hard",
  "--font-hardstyle",
  "--font-harden",
  "--font-vermin-verile",
  "--font-modeccio",
  "--font-helicopta",
]);

// Get letter spacing based on font thickness
const getLetterSpacing = (font: string): string => {
  if (wideSpacingFonts.has(font)) {
    return "0.05em";
  }
  return "normal";
};

// CURATED FONT COLLECTION - Google + Local Custom Fonts
const displayFonts = [
  // Display Modern
  "--font-syne",
  "--font-unbounded",
  // Condensed Power
  "--font-fjalla",
  // Futuristic/Tech
  "--font-orbitron",
  "--font-audiowide",
  // Retro
  "--font-vt323",
  // Bold Display
  "--font-ultra",
  "--font-black-ops",
  // Elegant/Serif
  "--font-playfair",
  "--font-cinzel",
  // Quirky
  "--font-monoton",
  "--font-wallpoet",
  "--font-rubik-mono",
  "--font-permanent-marker",
  // Geometric
  "--font-staatliches",
  "--font-syncopate",
  // ============================================
  // LOCAL CUSTOM FONTS
  // ============================================
  "--font-atures",
  "--font-block-talk",
  "--font-gnaw-hard",
  "--font-harden",
  "--font-hardstyle",
  "--font-helicopta",
  "--font-modeccio",
  "--font-monas",
  "--font-requires-moonshine",
  "--font-sheeping-cats",
  "--font-super-shake",
  "--font-vermin-verile",
  "--font-beyond-dreams",
  "--font-brigrette",
  "--font-cairopixel",
  "--font-christmas-pipow",
  "--font-handriyen",
  "--font-rosa",
  "--font-secoline",
  "--font-spotfix",
  "--font-super-shiny",
  "--font-the-last-trunks",
];

export default function Home() {
  const [tagline, setTagline] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<React.ReactElement | null>(null);
  const [displayFont, setDisplayFont] = useState(displayFonts[0]); // Wild font for title only
  const [accentColor, setAccentColor] = useState("#14B8A6");
  const [showModal, setShowModal] = useState(false);

  // Consistent readable font for all UI elements
  const uiFont = "--font-ibm-plex-mono";

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const studioIconRef = useRef<SVGSVGElement>(null);
  const kickoffIconRef = useRef<SVGSVGElement>(null);
  const modalIconsRef = useRef<(SVGSVGElement | null)[]>([]);
  const crtGlitchRef = useRef<HTMLDivElement>(null);
  const movingScanlineRef = useRef<HTMLDivElement>(null);
  const scanline2Ref = useRef<HTMLDivElement>(null);
  const scanline3Ref = useRef<HTMLDivElement>(null);
  const scanline4Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // FULL randomization - pick random palette AND random background type
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const generatedBackgrounds = generateBackgrounds(randomPalette);
    const randomBgIndex = Math.floor(Math.random() * generatedBackgrounds.length);

    // Randomize content
    const randomQuoteIndex = Math.floor(Math.random() * quirkyLines.length);
    const randomTitleFontIndex = Math.floor(Math.random() * displayFonts.length);

    const selectedBg = generatedBackgrounds[randomBgIndex];

    // Console log which background is rendering
    console.log('🎨 Background Selected:', {
      name: selectedBg.key,
      palette: randomPalette.name,
      colors: randomPalette.colors,
      index: randomBgIndex,
      totalBackgrounds: generatedBackgrounds.length
    });

    // Console log which font is selected
    console.log('🔤 Font Selected:', displayFonts[randomTitleFontIndex]);

    setSelectedBackground(selectedBg);
    setTagline(quirkyLines[randomQuoteIndex]);
    setDisplayFont(displayFonts[randomTitleFontIndex]); // Only title gets wild font
    setAccentColor(randomPalette.colors[1]); // Use second color from palette
  }, []);

  // Change font with RGB CRT glitch effect
  const changeFont = () => {
    if (!titleRef.current) return;

    // Pick a new random font (different from current)
    let newFont = displayFont;
    while (newFont === displayFont) {
      newFont = displayFonts[Math.floor(Math.random() * displayFonts.length)];
    }

    // RGB CRT glitch animation
    const tl = gsap.timeline();

    // Glitch sequence - heavy RGB chromatic aberration
    tl.to(titleRef.current, {
      textShadow: `
        3px 0 0 #ff0000,
        -3px 0 0 #00ffff,
        0 0 25px rgba(255,255,255,0.6)
      `,
      duration: 0.06,
      ease: "none"
    })
    .to(titleRef.current, {
      textShadow: `
        -4px 0 0 #ff0000,
        4px 0 0 #00ffff,
        0 3px 0 #00ff00
      `,
      x: -4,
      duration: 0.06,
      ease: "none"
    })
    .to(titleRef.current, {
      textShadow: `
        5px 0 0 #00ffff,
        -5px 0 0 #ff00ff,
        0 -3px 0 #ffff00
      `,
      x: 5,
      scaleX: 1.03,
      duration: 0.06,
      ease: "none"
    })
    .to(titleRef.current, {
      textShadow: `
        -3px 0 0 #ff00ff,
        3px 0 0 #00ff00,
        0 0 40px rgba(255,255,255,0.9)
      `,
      x: -2,
      scaleX: 0.97,
      opacity: 0.7,
      duration: 0.06,
      ease: "none"
    })
    .to(titleRef.current, {
      textShadow: "none",
      x: 0,
      scaleX: 1,
      opacity: 1,
      duration: 0.12,
      ease: "power2.out",
      onComplete: () => {
        console.log('🔤 Font Changed:', newFont);
        setDisplayFont(newFont);
      }
    });
  };

  // Randomize everything - just reload
  const randomizeEverything = () => {
    window.location.reload();
  };

  // Close modal with animation
  const closeModal = () => {
    if (!modalRef.current || !backdropRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => setShowModal(false)
    });

    // CRT turn off effect - reverse
    timeline
      .to(modalRef.current, {
        scaleY: 0.02,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(modalRef.current, {
        scaleX: 0.01,
        scaleY: 0.01,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in"
      })
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      }, 0);
  };

  // GSAP modal animations
  useEffect(() => {
    if (showModal && modalRef.current && backdropRef.current) {
      // Animate backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // CRT TV turn on effect
      const timeline = gsap.timeline();

      timeline
        // Start as a tiny dot in center
        .set(modalRef.current, {
          scaleX: 0.01,
          scaleY: 0.01,
          opacity: 0.5,
        })
        // Expand to horizontal line
        .to(modalRef.current, {
          scaleX: 1,
          scaleY: 0.02,
          opacity: 1,
          duration: 0.15,
          ease: "power2.out"
        })
        // Expand vertically to full size
        .to(modalRef.current, {
          scaleY: 1,
          duration: 0.25,
          ease: "power3.out"
        });

      // Animate modal icons with stagger
      const validIcons = modalIconsRef.current.filter(icon => icon !== null);
      if (validIcons.length > 0) {
        gsap.fromTo(
          validIcons,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.4
          }
        );
      }

      // Broken neon frame with randomized behavior - border always visible
      if (crtGlitchRef.current) {
        const createNeonSequence = () => {
          const tl = gsap.timeline();

          // Random startup flickers (1-3 times)
          const flickerCount = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < flickerCount; i++) {
            tl.to(crtGlitchRef.current, {
              boxShadow: `0 0 ${10 + Math.random() * 15}px ${accentColor}`,
              filter: `drop-shadow(0 0 ${5 + Math.random() * 10}px ${accentColor})`,
              borderColor: accentColor,
              duration: 0.03 + Math.random() * 0.03,
              ease: "none"
            })
            .to(crtGlitchRef.current, {
              boxShadow: 'none',
              filter: 'none',
              borderColor: `${accentColor}40`,
              duration: 0.02 + Math.random() * 0.03,
              ease: "none"
            });
          }

          // Full neon on
          tl.to(crtGlitchRef.current, {
            boxShadow: `
              0 0 15px ${accentColor},
              0 0 30px ${accentColor}80,
              0 0 45px ${accentColor}40
            `,
            filter: `drop-shadow(0 0 15px ${accentColor})`,
            borderColor: accentColor,
            duration: 0.08,
            ease: "none"
          });

          // Stay on for random duration (3-8 seconds)
          const stayOnDuration = 3 + Math.random() * 5;
          tl.to(crtGlitchRef.current, {
            duration: stayOnDuration,
            ease: "none"
          });

          // Random glitches while on (0-2 times)
          const glitchCount = Math.floor(Math.random() * 3);
          for (let i = 0; i < glitchCount; i++) {
            tl.to(crtGlitchRef.current, {
              boxShadow: `
                ${Math.random() > 0.5 ? '' : '-'}${2 + Math.random() * 3}px 0 0 0 #${['ff0000', '00ffff', 'ff00ff'][Math.floor(Math.random() * 3)]},
                ${Math.random() > 0.5 ? '' : '-'}${1 + Math.random() * 2}px 0 0 0 #${['ff0000', '00ffff'][Math.floor(Math.random() * 2)]},
                0 0 20px ${accentColor}
              `,
              duration: 0.04,
              ease: "none"
            })
            .to(crtGlitchRef.current, {
              boxShadow: `
                0 0 15px ${accentColor},
                0 0 30px ${accentColor}80
              `,
              filter: `drop-shadow(0 0 15px ${accentColor})`,
              duration: 0.05,
              ease: "none"
            });
          }

          // Dying flickers (2-4 times)
          const dyingFlickers = Math.floor(Math.random() * 3) + 2;
          for (let i = 0; i < dyingFlickers; i++) {
            tl.to(crtGlitchRef.current, {
              boxShadow: `0 0 ${5 + Math.random() * 10}px ${accentColor}60`,
              filter: `drop-shadow(0 0 ${3 + Math.random() * 7}px ${accentColor}60)`,
              borderColor: `${accentColor}80`,
              duration: 0.02 + Math.random() * 0.02,
              ease: "none"
            })
            .to(crtGlitchRef.current, {
              boxShadow: 'none',
              filter: 'none',
              borderColor: `${accentColor}40`,
              duration: 0.03 + Math.random() * 0.04,
              ease: "none"
            });
          }

          // Off for random duration (0.3-1 second) - border stays dim
          const offDuration = 0.3 + Math.random() * 0.7;
          tl.to(crtGlitchRef.current, {
            borderColor: `${accentColor}40`,
            duration: offDuration,
            ease: "none",
            onComplete: createNeonSequence
          });
        };

        createNeonSequence();
      }

      // Moving scanline effects - multiple lines with random speeds and positions
      if (crtGlitchRef.current) {
        const modalHeight = crtGlitchRef.current.offsetHeight;

        // Scanline 1 - main
        if (movingScanlineRef.current) {
          gsap.fromTo(
            movingScanlineRef.current,
            { y: Math.random() * modalHeight },
            {
              y: modalHeight,
              duration: 1 + Math.random() * 1, // 1-2s
              ease: 'none',
              repeat: -1,
            }
          );
        }

        // Scanline 2
        if (scanline2Ref.current) {
          gsap.fromTo(
            scanline2Ref.current,
            { y: Math.random() * modalHeight },
            {
              y: modalHeight,
              duration: 0.8 + Math.random() * 1.2, // 0.8-2s
              ease: 'none',
              repeat: -1,
            }
          );
        }

        // Scanline 3
        if (scanline3Ref.current) {
          gsap.fromTo(
            scanline3Ref.current,
            { y: Math.random() * modalHeight },
            {
              y: modalHeight,
              duration: 1.2 + Math.random() * 1, // 1.2-2.2s
              ease: 'none',
              repeat: -1,
            }
          );
        }

        // Scanline 4
        if (scanline4Ref.current) {
          gsap.fromTo(
            scanline4Ref.current,
            { y: Math.random() * modalHeight },
            {
              y: modalHeight,
              duration: 0.9 + Math.random() * 1.3, // 0.9-2.2s
              ease: 'none',
              repeat: -1,
            }
          );
        }
      }
    }
  }, [showModal, accentColor]);

  // Button icon hover animations
  const handleIconHover = (ref: React.RefObject<SVGSVGElement | null>, isEntering: boolean) => {
    if (!ref.current) return;

    if (isEntering) {
      gsap.to(ref.current, {
        scale: 1.2,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(2)"
      });
    } else {
      gsap.to(ref.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute inset-0 w-full h-full z-0">
        {selectedBackground}
      </div>
      <main className="absolute inset-0 flex h-full w-full flex-col pointer-events-none">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center pointer-events-auto w-full max-w-4xl">
            <div className="relative inline-block">
              <h1
                ref={titleRef}
                onClick={changeFont}
                className="text-4xl font-bold text-white sm:text-6xl lg:text-8xl break-words cursor-pointer transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: `var(${displayFont})`,
                  letterSpacing: getLetterSpacing(displayFont),
                  mixBlendMode: "difference",
                }}
              >
                910studio
              </h1>
              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs opacity-40 hover:opacity-70 transition-opacity whitespace-nowrap animate-pulse"
                style={{ fontFamily: `var(${uiFont})`, color: accentColor }}
              >
                click to shuffle
              </span>
            </div>
            <p
              className="mt-8 text-base sm:text-xl lg:text-2xl max-w-full break-words text-white"
              style={{
                fontFamily: `var(${uiFont})`,
                mixBlendMode: 'difference',
              }}
            >
              {tagline || "something's forming"}
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
              <a
                href="https://design.910.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 lg:py-3 bg-black border-2 transition-all duration-300 justify-center text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap overflow-hidden w-full sm:w-auto"
                style={{
                  fontFamily: `var(${uiFont})`,
                  borderColor: accentColor,
                  color: accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  handleIconHover(studioIconRef, true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = accentColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  handleIconHover(studioIconRef, false);
                }}
              >
                <span className="relative z-10">Visit Design Studio</span>
                <svg
                  ref={studioIconRef}
                  className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 relative z-10"
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

              <button
                onClick={() => setShowModal(true)}
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 lg:px-7 py-2 sm:py-2.5 lg:py-3 bg-black border-2 transition-all duration-300 justify-center text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap overflow-hidden w-full sm:w-auto"
                style={{
                  fontFamily: `var(${uiFont})`,
                  borderColor: accentColor,
                  color: accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  handleIconHover(kickoffIconRef, true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = accentColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  handleIconHover(kickoffIconRef, false);
                }}
              >
                <span className="relative z-10">Project Kickoff</span>
                <svg ref={kickoffIconRef} className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Floating randomize button */}
        <button
          onClick={randomizeEverything}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full border-2 transition-all duration-300 backdrop-blur-sm pointer-events-auto group"
          style={{
            borderColor: accentColor,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accentColor;
            e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <svg
            className="w-6 h-6 transition-colors"
            style={{ color: accentColor }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = accentColor;
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        {/* Language Selection Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div ref={backdropRef} className="absolute inset-0 bg-black/95" />

            {/* Modal container */}
            <div
              ref={modalRef}
              className="relative w-full"
              style={{ maxWidth: 'min(90vw, 32rem)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Actual modal */}
              <div
                ref={crtGlitchRef}
                className="relative bg-black border-2 p-6 sm:p-10 overflow-hidden"
                style={{
                  borderColor: accentColor,
                }}
              >
                {/* CRT scanlines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)',
                  }}
                />

                {/* Moving scanlines - multiple with random speeds */}
                <div
                  ref={movingScanlineRef}
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: '5px',
                    background: 'rgba(255,255,255,0.15)',
                  }}
                />
                <div
                  ref={scanline2Ref}
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: '3px',
                    background: 'rgba(255,255,255,0.12)',
                  }}
                />
                <div
                  ref={scanline3Ref}
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.14)',
                  }}
                />
                <div
                  ref={scanline4Ref}
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: '2px',
                    background: 'rgba(255,255,255,0.10)',
                  }}
                />

                {/* CRT vignette */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.7) 100%)',
                  }}
                />

                {/* Chromatic aberration overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    mixBlendMode: 'screen',
                    opacity: 0.03,
                    background: `
                      radial-gradient(ellipse at 30% 30%, ${accentColor}40 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 70%, #ff006640 0%, transparent 50%)
                    `,
                  }}
                />

                {/* Content wrapper with relative z-index */}
                <div className="relative z-20">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-1.5 text-zinc-600 hover:text-white transition-colors duration-200"
                  aria-label="Close modal"
                  style={{
                    color: `${accentColor}60`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${accentColor}60`;
                  }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <div className="mb-8 sm:mb-10">
                  <h2
                    className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight break-words"
                    style={{
                      fontFamily: `var(${uiFont})`,
                      color: accentColor,
                    }}
                  >
                    Choose Language
                  </h2>
                  <p className="text-zinc-500 text-sm sm:text-base break-words" style={{ fontFamily: `var(${uiFont})` }}>
                    Download project kickoff worksheet
                  </p>
                </div>

                {/* Language options */}
                <div className="flex flex-col gap-4">
                  <a
                    href="/910studio_Project_Kickoff_Template.xlsx"
                    download
                    className="group relative inline-flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-2 transition-all duration-300"
                    style={{
                      fontFamily: `var(${uiFont})`,
                      borderColor: `${accentColor}40`,
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = `${accentColor}40`;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onClick={closeModal}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-base sm:text-lg lg:text-xl font-medium truncate">English</span>
                    </div>
                    <svg
                      ref={(el) => { modalIconsRef.current[0] = el; }}
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>

                  <a
                    href="/910studio_Төслийн_Эхлэл_Загвар.xlsx"
                    download
                    className="group relative inline-flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-2 transition-all duration-300"
                    style={{
                      fontFamily: `var(${uiFont})`,
                      borderColor: `${accentColor}40`,
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = `${accentColor}40`;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onClick={closeModal}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-base sm:text-lg lg:text-xl font-medium truncate">Mongolian</span>
                    </div>
                    <svg
                      ref={(el) => { modalIconsRef.current[1] = el; }}
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>

                {/* Hint text */}
                <p className="text-xs sm:text-sm text-zinc-600 mt-6 sm:mt-8 text-center" style={{ fontFamily: `var(${uiFont})` }}>
                  Press <kbd className="px-2 py-1 border text-xs sm:text-sm font-medium" style={{ borderColor: `${accentColor}40`, color: accentColor }}>ESC</kbd> to close
                </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="pb-8 text-center pointer-events-auto">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} 910studio
          </p>
        </footer>
      </main>
    </div>
  );
}
