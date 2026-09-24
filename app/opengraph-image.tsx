import { ImageResponse } from "next/og";
import { wordmark } from "@/lib/og/assets";
import { plex } from "@/lib/og/fonts";

/**
 * The card every 910.studio link falls back to.
 *
 * Next's file convention makes this `og:image` for the whole tree. Case
 * studies override it with a card of their own — see
 * lib/og/case-card.tsx — and the home page overrides it with a still
 * from the reel.
 *
 * One caveat that cost a live bug: a segment which declares its own
 * `openGraph` block does NOT inherit this. /work, /contact and /toybox
 * all did, and all shipped with no og:image at all, so every link to
 * them pasted into Slack or iMessage arrived bare. They now each
 * re-export this file, which is enough — a file in the segment itself
 * merges into a declared block, only inheritance is blocked.
 */

export const alt = "910studio — Creative Web Studio, Ulaanbaatar Mongolia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FBF9F6";
const INK = "#2B221F";
const ACCENT = "#2660E8";

/* The 910 mark on its 21px grid, matching public/logo.svg. Drawn as divs
   rather than an <svg> — this renders through Satori, where a grid of
   absolutely-positioned boxes is far more predictable than path data.
   Only reached if the file cannot be read at render time. */
const CELLS: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [22, 0], [45, 0], [93, 0], [118, 0], [141, 0], [163, 0],
  [0, 22], [45, 22], [70, 22], [93, 22], [118, 22], [163, 22],
  [0, 45], [22, 45], [45, 45], [93, 45], [118, 45], [163, 45],
  [45, 67], [93, 67], [118, 67], [163, 67],
  [0, 90], [22, 90], [45, 90], [93, 90], [118, 90], [141, 90], [163, 90],
];
const SCALE = 1.35;

export default async function OGImage() {
  const fonts = await plex();
  /* INK is 910's own ink, so this recolour is a no-op here — it is the
     same call the case cards make, where it is not. */
  const logo = wordmark(INK);

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
          fontFamily: "Plex",
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
    {
      ...size,
      fonts,
      /* A metadata image route sets `max-age=0, must-revalidate` on itself
         and that beats anything in next.config's headers() — so the config
         entry looks right and does nothing while every scrape re-runs the
         render. It has to be set here. */
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
