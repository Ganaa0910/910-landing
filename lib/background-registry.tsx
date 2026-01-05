// Background component registry for 910studio landing page
// Generates background React elements based on index and color palette

import type { ColorPalette } from "./palettes";

// Lazy imports for code splitting (will implement later for performance)
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
import PixelSnow from "@/components/PixelSnow";
import Beams from "@/components/Beams";
import PrismaticBurst from "@/components/PrismaticBurst";
import Galaxy from "@/components/Galaxy";
import RippleGrid from "@/components/RippleGrid";
import LiquidChrome from "@/components/LiquidChrome";
import Squares from "@/components/Squares";

// Total number of background variants (fixed order, generated programmatically)
export const TOTAL_BACKGROUNDS = 42;

// Helper to convert hex to RGB array (0-1 range) for Three.js components
function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

// Get background element by index and palette
export function getBackgroundByIndex(
  index: number,
  palette: ColorPalette
): React.ReactElement {
  // Clamp index to valid range
  const safeIndex = Math.max(0, Math.min(index, TOTAL_BACKGROUNDS - 1));

  // Generate all backgrounds (same order as original generateBackgrounds function)
  const backgrounds = [
    // 0: Particles - classic, refined
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
    // 1: ColorBends - flowing, organic interaction
    <ColorBends
      key="colorbends"
      className="w-full h-full"
      colors={palette.colors}
      transparent={true}
      speed={0.15}
      mouseInfluence={1.2}
      parallax={0.6}
    />,
    // 2: GradientBlinds - bold, distinctive
    <GradientBlinds key="gradientblinds" className="w-full h-full" />,
    // 3: Silk - crafted texture
    <Silk
      key="silk"
      speed={3}
      scale={1.5}
      color={palette.colors[0]}
      noiseIntensity={2}
    />,
    // 4: FaultyTerminal - purposeful digital
    <FaultyTerminal
      key="faultyterminal"
      className="w-full h-full"
      tint={palette.colors[1]}
      scanlineIntensity={0.2}
      glitchAmount={0.8}
      chromaticAberration={1}
    />,
    // 5: Iridescence - timeless, modern
    <Iridescence
      key="iridescence"
      color={hexToRgb(palette.colors[0])}
      speed={0.8}
      amplitude={0.15}
    />,
    // 6: GridScan - detailed precision
    <GridScan
      key="gridscan"
      className="w-full h-full"
      linesColor={palette.colors[0]}
      scanColor={palette.colors[1]}
      lineThickness={1.2}
      gridScale={0.08}
      scanOpacity={0.3}
    />,
    // 7: Waves - beautiful interaction
    <Waves
      key="waves"
      lineColor={palette.colors[1]}
      backgroundColor="#000000"
      waveAmpX={24}
      waveAmpY={12}
      friction={0.9}
      tension={0.008}
    />,
    // 8: LetterGlitch - iteration, rememberable
    <LetterGlitch
      key="letterglitch"
      glitchColors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
      glitchSpeed={60}
      smooth={true}
    />,
    // 9: ColorBends alt config - substance
    <ColorBends
      key="colorbends2"
      className="w-full h-full"
      colors={[palette.colors[0], palette.colors[1], palette.colors[2]]}
      transparent={true}
      rotation={120}
      warpStrength={1.5}
      frequency={0.8}
    />,
    // 10: Silk alt - functional beauty
    <Silk
      key="silk2"
      speed={5}
      scale={2}
      color={palette.colors[2]}
      noiseIntensity={1.2}
      rotation={45}
    />,
    // 11: Iridescence alt - exceptional
    <Iridescence
      key="iridescence2"
      color={hexToRgb(palette.colors[1])}
      speed={1.2}
      amplitude={0.2}
    />,
    // 12: GridScan alt - code meets craft
    <GridScan
      key="gridscan2"
      className="w-full h-full"
      linesColor={palette.colors[2]}
      scanColor={palette.colors[3]}
      lineStyle="dashed"
      scanDirection="pingpong"
    />,
    // 13: FaultyTerminal alt - intentional
    <FaultyTerminal
      key="faultyterminal2"
      className="w-full h-full"
      tint={palette.colors[3]}
      digitSize={1.8}
      flickerAmount={0.6}
      curvature={0.15}
    />,
    // 14: Waves alt - delightful lasting
    <Waves
      key="waves2"
      lineColor={palette.colors[0]}
      waveSpeedX={0.01}
      waveSpeedY={0.008}
      xGap={12}
      yGap={40}
    />,
    // 15: LetterGlitch alt - elevating
    <LetterGlitch
      key="letterglitch2"
      glitchColors={[palette.colors[1], palette.colors[3], palette.colors[2]]}
      glitchSpeed={45}
      smooth={true}
      centerVignette={true}
    />,
    // 16: ColorBends alt3 - poetry
    <ColorBends
      key="colorbends3"
      className="w-full h-full"
      colors={[palette.colors[3], palette.colors[2], palette.colors[1], palette.colors[0]]}
      autoRotate={0.02}
      scale={0.8}
    />,
    // 17: GradientBlinds alt - obsessively refined
    <GradientBlinds key="gradientblinds2" className="w-full h-full" />,
    // 18: Silk alt3 - clarity from complexity
    <Silk
      key="silk3"
      speed={4}
      scale={1.2}
      color={palette.colors[1]}
      noiseIntensity={1.8}
    />,
    // 19: Iridescence alt3 - purpose-driven
    <Iridescence
      key="iridescence3"
      color={hexToRgb(palette.colors[0])}
      speed={0.6}
      amplitude={0.12}
    />,
    // 20: GridScan alt3 - modern sophistication
    <GridScan
      key="gridscan3"
      className="w-full h-full"
      linesColor={palette.colors[0]}
      scanColor={palette.colors[2]}
      lineStyle="dotted"
      bloomIntensity={0.3}
      enablePost={true}
    />,
    // 21: FaultyTerminal alt3 - engineered experiences
    <FaultyTerminal
      key="faultyterminal3"
      className="w-full h-full"
      tint={palette.colors[0]}
      scanlineIntensity={0.4}
      noiseAmp={0.8}
    />,
    // 22: Waves alt3 - precision interaction
    <Waves
      key="waves3"
      lineColor={palette.colors[2]}
      waveAmpX={32}
      waveAmpY={16}
      maxCursorMove={120}
    />,
    // 23: Particles alt - simplicity
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
    // 24: Aurora - ethereal light
    <Aurora
      key="aurora"
      colorStops={[palette.colors[0], palette.colors[1], palette.colors[2]]}
      amplitude={1.5}
      blend={0.8}
    />,
    // 25: Dither - noise texture
    <Dither
      key="dither"
      waveColor={hexToRgb(palette.colors[1])}
      waveSpeed={0.3}
      waveFrequency={2}
      waveAmplitude={0.5}
      enableMouseInteraction={true}
      mouseRadius={0.15}
    />,
    // 26: Hyperspeed - motion blur
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
    // 27: Lightning - electric energy
    <Lightning
      key="lightning"
      hue={palette.hue}
      speed={0.8}
      intensity={1.2}
      size={1}
    />,
    // 28: Prism - geometric light
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
    // 29: Aurora alt - different colors
    <Aurora
      key="aurora2"
      colorStops={[palette.colors[2], palette.colors[3], palette.colors[0]]}
      amplitude={2}
      blend={0.6}
    />,
    // 30: Prism alt - 3d rotation
    <Prism
      key="prism2"
      height={3}
      baseWidth={5}
      animationType="3drotate"
      glow={2}
      hueShift={palette.hue}
      bloom={1.5}
    />,
    // 31: Lightning alt - palette hue
    <Lightning
      key="lightning2"
      hue={palette.hue}
      speed={1.2}
      intensity={0.8}
      size={1.2}
    />,
    // 32: LightRays - radial beams
    <LightRays key="lightrays" raysColor={palette.colors[1]} raysSpeed={0.5} />,
    // 33: Beams - light streaks
    <Beams
      key="beams"
      lightColor={palette.colors[1]}
      beamNumber={8}
      speed={1.5}
      beamWidth={2}
    />,
    // 34: PrismaticBurst - color explosion
    <PrismaticBurst
      key="prismaticburst"
      colors={palette.colors}
      speed={1.2}
      intensity={1.5}
    />,
    // 35: LightRays alt - different config
    <LightRays key="lightrays2" raysColor={palette.colors[2]} raysSpeed={0.8} />,
    // 36: LiquidChrome - metallic liquid distortion
    <LiquidChrome
      key="liquidchrome"
      baseColor={hexToRgb(palette.colors[0])}
      speed={0.2}
      amplitude={0.3}
      frequencyX={3}
      frequencyY={3}
      interactive={true}
    />,
    // 37: Squares - animated grid
    <Squares
      key="squares"
      direction="diagonal"
      speed={0.5}
      borderColor={palette.colors[1]}
      squareSize={40}
      hoverFillColor={palette.colors[0]}
    />,
    // 38: RippleGrid - pulsing grid with vignette
    <RippleGrid
      key="ripplegrid"
      gridColor={palette.colors[1]}
      rippleIntensity={0.05}
      gridSize={10}
      gridThickness={15}
      glowIntensity={0.1}
      mouseInteraction={true}
    />,
    // 39: LiquidChrome alt - different frequency
    <LiquidChrome
      key="liquidchrome2"
      baseColor={hexToRgb(palette.colors[2])}
      speed={0.3}
      amplitude={0.4}
      frequencyX={5}
      frequencyY={4}
      interactive={true}
    />,
    // 40: Squares alt - different direction
    <Squares
      key="squares2"
      direction="right"
      speed={0.8}
      borderColor={palette.colors[0]}
      squareSize={50}
      hoverFillColor={palette.colors[2]}
    />,
    // 41: RippleGrid alt - rainbow mode
    <RippleGrid
      key="ripplegrid2"
      enableRainbow={true}
      rippleIntensity={0.08}
      gridSize={8}
      gridThickness={12}
      glowIntensity={0.2}
      mouseInteraction={true}
    />,
  ];

  return backgrounds[safeIndex];
}

// Get next background index (wraps around)
export function getNextBackgroundIndex(currentIndex: number): number {
  return (currentIndex + 1) % TOTAL_BACKGROUNDS;
}

// Get previous background index (wraps around)
export function getPrevBackgroundIndex(currentIndex: number): number {
  return (currentIndex - 1 + TOTAL_BACKGROUNDS) % TOTAL_BACKGROUNDS;
}

// Background names for debugging/display
export const backgroundNames = [
  "Particles",
  "ColorBends",
  "GradientBlinds",
  "Silk",
  "FaultyTerminal",
  "Iridescence",
  "GridScan",
  "Waves",
  "LetterGlitch",
  "ColorBends Alt",
  "Silk Alt",
  "Iridescence Alt",
  "GridScan Alt",
  "FaultyTerminal Alt",
  "Waves Alt",
  "LetterGlitch Alt",
  "ColorBends Alt3",
  "GradientBlinds Alt",
  "Silk Alt3",
  "Iridescence Alt3",
  "GridScan Alt3",
  "FaultyTerminal Alt3",
  "Waves Alt3",
  "Particles Alt",
  "Aurora",
  "Dither",
  "Hyperspeed",
  "Lightning",
  "Prism",
  "Aurora Alt",
  "Prism Alt",
  "Lightning Alt",
  "LightRays",
  "Beams",
  "PrismaticBurst",
  "LightRays Alt",
  "LiquidChrome",
  "Squares",
  "RippleGrid",
  "LiquidChrome Alt",
  "Squares Alt",
  "RippleGrid Alt",
];

// Heavy backgrounds (Three.js with postprocessing) for lazy loading optimization
export const heavyBackgroundIndices = new Set([
  26, // Hyperspeed
  27, // Lightning
  28, // Prism
  31, // Lightning Alt
  34, // PrismaticBurst
]);

export function isHeavyBackground(index: number): boolean {
  return heavyBackgroundIndices.has(index);
}
