export interface Theme {
  name: string;
  label: string;
  accent: string;
  background: {
    component: string; // lazy-loaded component path
    props: Record<string, unknown>;
  };
}

export const THEMES: Theme[] = [
  {
    name: "silk",
    label: "silk",
    accent: "#14b8a6",
    background: {
      component: "Silk",
      props: {
        color: "#14b8a6",
        speed: 3,
        scale: 1,
        noiseIntensity: 1.2,
        rotation: 0,
      },
    },
  },
  {
    name: "chrome",
    label: "chrome",
    accent: "#a1a1aa",
    background: {
      component: "LiquidChrome",
      props: {
        baseColor: [0.06, 0.06, 0.06],
        speed: 0.15,
        amplitude: 0.4,
        frequencyX: 3,
        frequencyY: 2,
        interactive: true,
      },
    },
  },
  {
    name: "aurora",
    label: "aurora",
    accent: "#a78bfa",
    background: {
      component: "Aurora",
      props: {
        colorStops: ["#14b8a6", "#a78bfa", "#14b8a6"],
        amplitude: 0.8,
        blend: 0.6,
        speed: 0.4,
      },
    },
  },
  {
    name: "iridescent",
    label: "iridescent",
    accent: "#f472b6",
    background: {
      component: "Iridescence",
      props: {
        color: [0.08, 0.72, 0.65],
        speed: 0.8,
        amplitude: 0.12,
        mouseReact: true,
      },
    },
  },
  {
    name: "waves",
    label: "waves",
    accent: "#22d3ee",
    background: {
      component: "Waves",
      props: {
        lineColor: "#22d3ee",
        backgroundColor: "transparent",
        waveSpeedX: 0.015,
        waveSpeedY: 0.01,
        waveAmpX: 30,
        waveAmpY: 15,
        xGap: 14,
        yGap: 20,
        friction: 0.9,
        tension: 0.01,
        maxCursorMove: 100,
      },
    },
  },
];

export const DEFAULT_THEME_INDEX = 0;

export function getTheme(index: number): Theme {
  return THEMES[index % THEMES.length];
}

export function getNextThemeIndex(current: number): number {
  return (current + 1) % THEMES.length;
}
