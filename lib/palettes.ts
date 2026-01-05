// Color palette definitions for 910studio landing page
// Each palette contains 4 colors and a base hue value

export interface ColorPalette {
  name: string;
  colors: [string, string, string, string];
  hue: number;
}

export const colorPalettes: ColorPalette[] = [
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
  // Toxic waste
  { name: "toxic", colors: ["#00FF00", "#ADFF2F", "#7FFF00", "#32CD32"], hue: 100 },
  // Sunset gradient
  { name: "sunset", colors: ["#FF0080", "#FF8C00", "#FFD700", "#FF1493"], hue: 330 },
  // Neon rainbow
  { name: "neon-rainbow", colors: ["#FF0080", "#00FF80", "#0080FF", "#FF8000"], hue: 330 },
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
  // Radioactive
  { name: "radioactive", colors: ["#39FF14", "#00FF00", "#7FFF00", "#ADFF2F"], hue: 110 },
  // Flamingo
  { name: "flamingo", colors: ["#FC74FD", "#F754E8", "#E91E63", "#C2185B"], hue: 320 },
  // Holographic
  { name: "holographic", colors: ["#FF00FF", "#00FFFF", "#FF00AA", "#00FF80"], hue: 300 },
  // Blade Runner
  { name: "blade-runner", colors: ["#FF3864", "#00D9FF", "#8338EC", "#FFBE0B"], hue: 350 },
  // Aquamarine dream
  { name: "aquamarine", colors: ["#7FFFD4", "#66CDAA", "#40E0D0", "#00CED1"], hue: 160 },
  // Berry blast
  { name: "berry", colors: ["#8B008B", "#9932CC", "#BA55D3", "#DA70D6"], hue: 300 },
  // Neon citrus
  { name: "citrus", colors: ["#FFA500", "#FFD700", "#FFFF00", "#ADFF2F"], hue: 50 },
  // Blue steel
  { name: "blue-steel", colors: ["#4682B4", "#5F9EA0", "#6495ED", "#7B68EE"], hue: 210 },
  // Violet storm
  { name: "violet-storm", colors: ["#EE82EE", "#DA70D6", "#FF00FF", "#BA55D3"], hue: 300 },
  // Solar flare
  { name: "solar-flare", colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFA07A"], hue: 15 },
  // Neon nights
  { name: "neon-nights", colors: ["#FF10F0", "#00F5FF", "#FFFF00", "#FF00AA"], hue: 300 },
  // Candy crush
  { name: "candy", colors: ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1"], hue: 350 },
  // Emerald city
  { name: "emerald-city", colors: ["#50C878", "#00A86B", "#008B8B", "#2E8B57"], hue: 140 },
  // ============================================
  // NEW FIRE PALETTES - Pop on dark
  // ============================================
  // Electric Violet - deep purple neon
  { name: "electric-violet", colors: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"], hue: 260 },
  // Plasma Pink - hot magenta
  { name: "plasma-pink", colors: ["#FF0080", "#FF00FF", "#FF69B4", "#FF1493"], hue: 320 },
  // Toxic Cyan - bright toxic
  { name: "toxic-cyan", colors: ["#00FFFF", "#00F5FF", "#00CED1", "#40E0D0"], hue: 180 },
  // Neon Orange - pure fire
  { name: "neon-orange", colors: ["#FF6600", "#FF8C00", "#FFA500", "#FFAA00"], hue: 30 },
  // Digital Green - hacker aesthetic
  { name: "digital-green", colors: ["#00FF66", "#00FF00", "#33FF33", "#66FF66"], hue: 120 },
  // Ultra Violet - blacklight
  { name: "ultra-violet", colors: ["#BF00FF", "#9D00FF", "#7B00FF", "#5900FF"], hue: 280 },
  // Sunrise - warm gradient
  { name: "sunrise", colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFD700"], hue: 20 },
  // Ice Blue - cold neon
  { name: "ice-blue", colors: ["#00BFFF", "#1E90FF", "#4169E1", "#00CED1"], hue: 200 },
  // Blood Red - pure crimson
  { name: "blood-red", colors: ["#FF0000", "#DC143C", "#B22222", "#FF4444"], hue: 0 },
  // Alien Green - extraterrestrial
  { name: "alien-green", colors: ["#7FFF00", "#ADFF2F", "#00FF7F", "#32CD32"], hue: 90 },
  // ============================================
  // MONOCHROME & MINIMAL
  // ============================================
  // Pure white gradient
  { name: "ghost", colors: ["#FFFFFF", "#F0F0F0", "#E0E0E0", "#D0D0D0"], hue: 0 },
  // Silver metallic
  { name: "silver", colors: ["#C0C0C0", "#D3D3D3", "#A9A9A9", "#808080"], hue: 0 },
  // Noir - deep blacks with hints
  { name: "noir", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560"], hue: 240 },
  // Obsidian - volcanic glass
  { name: "obsidian", colors: ["#0D0D0D", "#1A1A1A", "#2D2D2D", "#404040"], hue: 0 },
  // ============================================
  // DUOTONE BANGERS
  // ============================================
  // Spotify green/black
  { name: "spotify", colors: ["#1DB954", "#1ED760", "#191414", "#121212"], hue: 140 },
  // Discord blurple
  { name: "discord", colors: ["#5865F2", "#7289DA", "#99AAB5", "#2C2F33"], hue: 235 },
  // Twitch purple
  { name: "twitch", colors: ["#9146FF", "#772CE8", "#BF94FF", "#1F1F23"], hue: 264 },
  // YouTube red
  { name: "youtube", colors: ["#FF0000", "#CC0000", "#282828", "#121212"], hue: 0 },
  // Netflix red
  { name: "netflix", colors: ["#E50914", "#B20710", "#221F1F", "#000000"], hue: 0 },
  // ============================================
  // NATURE INSPIRED
  // ============================================
  // Deep ocean
  { name: "deep-ocean", colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"], hue: 195 },
  // Forest night
  { name: "forest-night", colors: ["#1B4332", "#2D6A4F", "#40916C", "#52B788"], hue: 150 },
  // Aurora borealis
  { name: "aurora-borealis", colors: ["#00F260", "#0575E6", "#A100FF", "#00F5A0"], hue: 150 },
  // Desert sand
  { name: "desert", colors: ["#EDC9AF", "#C19A6B", "#CD853F", "#8B4513"], hue: 30 },
  // Volcano
  { name: "volcano", colors: ["#CF000F", "#FF5722", "#FF9800", "#1A1A1A"], hue: 15 },
  // Northern lights
  { name: "northern-lights", colors: ["#00C9FF", "#92FE9D", "#F0FF00", "#FF00E4"], hue: 180 },
  // Midnight blue
  { name: "midnight", colors: ["#0C1445", "#1A237E", "#283593", "#3949AB"], hue: 230 },
  // Rainforest
  { name: "rainforest", colors: ["#004D00", "#006400", "#228B22", "#32CD32"], hue: 120 },
  // ============================================
  // RETRO / VINTAGE
  // ============================================
  // Retrowave
  { name: "retrowave", colors: ["#F72585", "#7209B7", "#3A0CA3", "#4361EE"], hue: 320 },
  // Outrun
  { name: "outrun", colors: ["#FF2A6D", "#D100D1", "#05D9E8", "#01012B"], hue: 330 },
  // Commodore 64
  { name: "c64", colors: ["#4040E8", "#7869C4", "#9F9FED", "#706DEB"], hue: 240 },
  // Gameboy
  { name: "gameboy", colors: ["#0F380F", "#306230", "#8BAC0F", "#9BBC0F"], hue: 90 },
  // Sepia vintage
  { name: "sepia", colors: ["#704214", "#A0522D", "#D2691E", "#F4A460"], hue: 25 },
  // VHS glitch
  { name: "vhs", colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF"], hue: 0 },
  // ============================================
  // GRADIENT FLOWS
  // ============================================
  // Miami vice
  { name: "miami", colors: ["#F857A6", "#FF5858", "#FFDD00", "#36D1DC"], hue: 330 },
  // Cotton candy
  { name: "cotton-candy", colors: ["#FFAFBD", "#FFC3A0", "#D4FC79", "#96E6A1"], hue: 350 },
  // Mango tango
  { name: "mango", colors: ["#FFE259", "#FFA751", "#FF7B54", "#FF6B6B"], hue: 40 },
  // Ocean breeze
  { name: "ocean-breeze", colors: ["#2E3192", "#1BFFFF", "#00F5FF", "#00D4FF"], hue: 200 },
  // Purple rain
  { name: "purple-rain", colors: ["#360033", "#7B4397", "#DC2430", "#7B4397"], hue: 290 },
  // Firewatch
  { name: "firewatch", colors: ["#F95738", "#EE964B", "#F4D35E", "#083D77"], hue: 15 },
  // Warm flame
  { name: "warm-flame", colors: ["#FF9A8B", "#FF6A88", "#FF99AC", "#FCB69F"], hue: 10 },
  // Cool blues
  { name: "cool-blues", colors: ["#2193B0", "#6DD5ED", "#4CA1AF", "#C4E0E5"], hue: 190 },
  // ============================================
  // CYBERPUNK / FUTURISTIC
  // ============================================
  // Akira red
  { name: "akira", colors: ["#FF0000", "#8B0000", "#DC143C", "#1A1A1A"], hue: 0 },
  // Ghost in shell
  { name: "gits", colors: ["#00FF9F", "#00B8FF", "#001EFF", "#BD00FF"], hue: 160 },
  // Tron legacy
  { name: "tron", colors: ["#00FFFF", "#0AFFE9", "#0D0D0D", "#1A1A1A"], hue: 180 },
  // Neon Tokyo
  { name: "neon-tokyo", colors: ["#F900BF", "#6F00FF", "#00F0FF", "#FF003C"], hue: 310 },
  // Cyberpunk 2077
  { name: "cyberpunk-2077", colors: ["#FCEE0A", "#00F0FF", "#FF003C", "#1A1A2E"], hue: 55 },
  // Blade runner 2049
  { name: "blade-runner-2049", colors: ["#F5AF19", "#F12711", "#0F2027", "#2C5364"], hue: 35 },
  // ============================================
  // PASTEL SOFT
  // ============================================
  // Pastel dream
  { name: "pastel-dream", colors: ["#FFB5E8", "#B5DEFF", "#B5FFD9", "#FFFFB5"], hue: 330 },
  // Soft pastel
  { name: "soft-pastel", colors: ["#F3E7E9", "#E3EEFF", "#E7F9E7", "#FFF5E3"], hue: 340 },
  // Baby pink
  { name: "baby-pink", colors: ["#FFD1DC", "#FFB6C1", "#FFA0B4", "#FF8AAE"], hue: 350 },
  // Mint cream
  { name: "mint-cream", colors: ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5"], hue: 150 },
  // Lavender haze
  { name: "lavender-haze", colors: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#EE82EE"], hue: 270 },
  // ============================================
  // HIGH CONTRAST BANGERS
  // ============================================
  // Black and gold
  { name: "black-gold", colors: ["#FFD700", "#B8860B", "#1A1A1A", "#0D0D0D"], hue: 50 },
  // Black and red
  { name: "black-red", colors: ["#FF0000", "#8B0000", "#1A1A1A", "#0D0D0D"], hue: 0 },
  // Black and cyan
  { name: "black-cyan", colors: ["#00FFFF", "#00CED1", "#1A1A1A", "#0D0D0D"], hue: 180 },
  // White and gold
  { name: "white-gold", colors: ["#FFD700", "#FFFFFF", "#F5F5F5", "#DAA520"], hue: 50 },
  // ============================================
  // EXOTIC / UNIQUE
  // ============================================
  // Bioluminescence
  { name: "bioluminescence", colors: ["#00FFFF", "#00FF7F", "#7FFFD4", "#40E0D0"], hue: 165 },
  // Plasma storm
  { name: "plasma-storm", colors: ["#8B00FF", "#FF00FF", "#00FFFF", "#FF1493"], hue: 280 },
  // Quantum
  { name: "quantum", colors: ["#6A0DAD", "#301934", "#00FFFF", "#FF00FF"], hue: 280 },
  // Dark matter
  { name: "dark-matter", colors: ["#0D0D0D", "#1A0A2E", "#3D1E6D", "#7B2CBF"], hue: 270 },
  // Supernova
  { name: "supernova", colors: ["#FF6B6B", "#FFA500", "#FFD93D", "#6BCB77"], hue: 30 },
  // Nebula
  { name: "nebula", colors: ["#1A0533", "#3D1A78", "#7B4B94", "#BE8ABF"], hue: 280 },
  // Event horizon
  { name: "event-horizon", colors: ["#000000", "#0D0D0D", "#FF4500", "#FFD700"], hue: 30 },
  // Pulsar
  { name: "pulsar", colors: ["#00FFFF", "#FF00FF", "#FFFF00", "#00FF00"], hue: 180 },
];

// Helper function to get palette by name
export function getPaletteByName(name: string): ColorPalette | undefined {
  return colorPalettes.find((p) => p.name === name);
}

// Helper function to get random palette
export function getRandomPalette(): ColorPalette {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}
