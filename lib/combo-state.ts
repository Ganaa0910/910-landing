// State management types and utilities for 910studio landing page combos

import { colorPalettes, type ColorPalette } from "./palettes";
import { TOTAL_BACKGROUNDS } from "./background-registry";

// Display fonts array (matches page.tsx)
export const displayFonts = [
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
  // LOCAL CUSTOM FONTS
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
] as const;

// Combo state interface
export interface ComboState {
  backgroundIndex: number;      // Index of background component (0-37)
  paletteIndex: number;         // Index in colorPalettes array (for backgrounds)
  uiPaletteIndex: number;       // Index in colorPalettes array (for UI/accent color)
  fontIndex: number;            // Index in displayFonts array
  taglineIndex: number;         // Index in quirkyLines array
}

// Compact encoding format for URL params
interface ComboEncoded {
  b: number;  // backgroundIndex
  p: number;  // paletteIndex (backgrounds)
  u: number;  // uiPaletteIndex (UI/accent)
  f: number;  // fontIndex
  t: number;  // taglineIndex
}

// Encode combo state to URL-safe base64 string
export function encodeCombo(state: ComboState): string {
  const compact: ComboEncoded = {
    b: state.backgroundIndex,
    p: state.paletteIndex,
    u: state.uiPaletteIndex,
    f: state.fontIndex,
    t: state.taglineIndex,
  };

  try {
    const json = JSON.stringify(compact);
    return btoa(json);
  } catch (error) {
    console.error('Failed to encode combo:', error);
    return '';
  }
}

// Decode base64 string to combo state
export function decodeCombo(encoded: string): ComboState | null {
  try {
    const json = atob(encoded);
    const compact: ComboEncoded = JSON.parse(json);

    // Backward compatibility: if 'u' doesn't exist, use 'p' for both
    const uiPaletteIndex = compact.u !== undefined ? compact.u : compact.p;

    // Validate indices are within bounds
    if (
      compact.b < 0 || compact.b >= TOTAL_BACKGROUNDS ||
      compact.p < 0 || compact.p >= colorPalettes.length ||
      uiPaletteIndex < 0 || uiPaletteIndex >= colorPalettes.length ||
      compact.f < 0 || compact.f >= displayFonts.length ||
      compact.t < 0 || compact.t >= 99 // 99 taglines
    ) {
      console.warn('Decoded combo has invalid indices:', compact);
      return null;
    }

    return {
      backgroundIndex: compact.b,
      paletteIndex: compact.p,
      uiPaletteIndex: uiPaletteIndex,
      fontIndex: compact.f,
      taglineIndex: compact.t,
    };
  } catch (error) {
    console.error('Failed to decode combo:', error);
    return null;
  }
}

// Generate random combo
export function generateRandomCombo(quirkyLinesLength: number): ComboState {
  return {
    backgroundIndex: Math.floor(Math.random() * TOTAL_BACKGROUNDS),
    paletteIndex: Math.floor(Math.random() * colorPalettes.length),
    uiPaletteIndex: Math.floor(Math.random() * colorPalettes.length),
    fontIndex: Math.floor(Math.random() * displayFonts.length),
    taglineIndex: Math.floor(Math.random() * quirkyLinesLength),
  };
}

// Randomize all parts of combo
export function randomizeAll(
  _current: ComboState,
  quirkyLinesLength: number
): ComboState {
  return generateRandomCombo(quirkyLinesLength);
}

// Change only background (new random background, keep rest)
export function changeBackground(current: ComboState): ComboState {
  let newBgIndex = current.backgroundIndex;
  while (newBgIndex === current.backgroundIndex) {
    newBgIndex = Math.floor(Math.random() * TOTAL_BACKGROUNDS);
  }

  return {
    ...current,
    backgroundIndex: newBgIndex,
  };
}

// Change only font (new random font, keep rest)
export function changeFont(current: ComboState): ComboState {
  let newFontIndex = current.fontIndex;
  while (newFontIndex === current.fontIndex) {
    newFontIndex = Math.floor(Math.random() * displayFonts.length);
  }

  return {
    ...current,
    fontIndex: newFontIndex,
  };
}

// Change only color palette (randomize BOTH background and UI palettes independently)
export function changeColorPalette(current: ComboState): ComboState {
  let newBgPaletteIndex = current.paletteIndex;
  let newUiPaletteIndex = current.uiPaletteIndex;

  // Randomize background palette (ensure it changes)
  while (newBgPaletteIndex === current.paletteIndex) {
    newBgPaletteIndex = Math.floor(Math.random() * colorPalettes.length);
  }

  // Randomize UI palette independently (ensure it changes)
  while (newUiPaletteIndex === current.uiPaletteIndex) {
    newUiPaletteIndex = Math.floor(Math.random() * colorPalettes.length);
  }

  return {
    ...current,
    paletteIndex: newBgPaletteIndex,
    uiPaletteIndex: newUiPaletteIndex,
  };
}

// Get palette from combo state
export function getPalette(state: ComboState): ColorPalette {
  return colorPalettes[state.paletteIndex];
}

// Get font variable from combo state
export function getFont(state: ComboState): string {
  return displayFonts[state.fontIndex];
}

// Get accent color from combo state (uses second color in UI palette)
export function getAccentColor(state: ComboState): string {
  return colorPalettes[state.uiPaletteIndex].colors[1];
}

// Signature combos for easter eggs
export const SIGNATURE_COMBOS = {
  '910': {
    backgroundIndex: 0,  // Particles
    paletteIndex: colorPalettes.findIndex(p => p.name === 'teal'),
    uiPaletteIndex: colorPalettes.findIndex(p => p.name === 'teal'),
    fontIndex: displayFonts.indexOf('--font-syne'),
    taglineIndex: 0,  // "refined by design. defined by code."
  },
  'gray': {
    backgroundIndex: 4,  // GridScan
    paletteIndex: colorPalettes.findIndex(p => p.name === 'cyberpunk'),
    uiPaletteIndex: colorPalettes.findIndex(p => p.name === 'cyberpunk'),
    fontIndex: displayFonts.indexOf('--font-orbitron'),
    taglineIndex: 7,  // "fuck around and find out"
  },
} as const;
