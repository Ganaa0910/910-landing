import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "910studio — Creative Web Studio, Ulaanbaatar Mongolia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Resolve a Google Font's binary URL via the CSS API so Google's version
// rotations (v19 → v20, etc.) don't break the OG image silently.
async function loadGoogleFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const match = css.match(/url\((https:\/\/[^)]+\.(?:ttf|woff2))\)/);
    if (!match) return null;
    const font = await fetch(match[1]);
    if (!font.ok) return null;
    return await font.arrayBuffer();
  } catch {
    return null;
  }
}

const PAPER = "#FBF9F6";
const INK = "#2B221F";
const ACCENT = "#2660E8";

/* The 910 mark on its 21px grid, matching public/logo.svg. Drawn as divs
   rather than an <svg> — this renders through Satori, where a grid of
   absolutely-positioned boxes is far more predictable than path data. */
const CELLS: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [22, 0], [45, 0], [93, 0], [118, 0], [141, 0], [163, 0],
  [0, 22], [45, 22], [70, 22], [93, 22], [118, 22], [163, 22],
  [0, 45], [22, 45], [45, 45], [93, 45], [118, 45], [163, 45],
  [45, 67], [93, 67], [118, 67], [163, 67],
  [0, 90], [22, 90], [45, 90], [93, 90], [118, 90], [141, 90], [163, 90],
];
const SCALE = 1.35;

/* Prefer the real lockup. Satori renders <img> from a data URI, so the
   actual logo file is inlined rather than approximated — the wordmark is a
   geometric grotesk that no Google font would match. Falls back to the
   hand-plotted grid if the file can't be read at render time. */
function logoDataUri(): string | null {
  try {
    const svg = readFileSync(join(process.cwd(), "public", "logo.svg"), "utf8");
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const [mono, monoBold] = await Promise.all([
    loadGoogleFont("IBM Plex Mono:wght@400"),
    loadGoogleFont("IBM Plex Mono:wght@500"),
  ]);

  const fonts = [
    mono && { name: "IBM Plex Mono", data: mono, style: "normal" as const, weight: 400 as const },
    monoBold && { name: "IBM Plex Mono", data: monoBold, style: "normal" as const, weight: 500 as const },
  ].filter((f): f is NonNullable<typeof f> => f !== null);

  const logo = logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          background: PAPER,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          fontFamily: "IBM Plex Mono",
          color: INK,
        }}
      >
        {/* the mark */}
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="910studio" width={439 * 0.62} height={140 * 0.62} />
        ) : (
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 185 * SCALE,
              height: 111 * SCALE,
            }}
          >
            {CELLS.map(([x, y]) => (
              <div
                key={`${x}-${y}`}
                style={{
                  position: "absolute",
                  left: x * SCALE,
                  top: y * SCALE,
                  width: 21 * SCALE,
                  height: 21 * SCALE,
                  background: INK,
                }}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
            }}
          >
            We build the things that&nbsp;
            <span style={{ color: ACCENT }}>matter.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 20,
              letterSpacing: "0.17em",
              textTransform: "uppercase" as const,
              color: "rgba(43,34,31,0.48)",
            }}
          >
            Creative web studio · Ulaanbaatar · UTC+8
          </div>
        </div>

        {/* the offset-block motif, reduced to one accent rule */}
        <div style={{ display: "flex", width: 232, height: 8, background: ACCENT }} />
      </div>
    ),
    { ...size, fonts },
  );
}
