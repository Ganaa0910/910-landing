import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/IBMPlexMono";
import { getProject } from "../../lib/projects";

/* The motion version of /api/story/[slug] — same poster, same palette, same
 * safe zones, built up on a clock instead of arriving whole.
 *
 * Choreography, 30fps:
 *   0–20   ground, masthead drops in
 *   14–52  the accent block slides under, the cover lands on it and presses
 *          into its own shadow (the site's cartoon press)
 *   52–100 title rises letter by letter
 *   88–130 pitch fades up, scope tags pop in one by one
 *   130–170 CTA arrives with a press; the arrow keeps nudging to the end
 *   the cover drifts in slowly the whole time so no frame is dead
 *
 * Instagram draws over roughly the top 220px and bottom 260px, so nothing
 * that has to be read sits there. */

const { fontFamily } = loadFont("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const DURATION = 9 * FPS;

const COVER_W = W - 160;
const COVER_H = (COVER_W * 10) / 16;

export type StoryProps = { slug: string };

export function Story({ slug }: StoryProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const project = getProject(slug);
  if (!project) throw new Error(`No project "${slug}" in lib/projects.ts`);

  const pal = project.palette;
  const ground = pal?.ground ?? "#FBF9F6";
  const ink = pal?.ink ?? "#2B221F";
  const ink2 = pal?.ink2 ?? "rgba(43,34,31,0.62)";
  const ink3 = pal?.ink3 ?? "rgba(43,34,31,0.4)";
  const accent = pal?.accent ?? "#2660E8";
  const onAccent = pal?.onAccent ?? ground;

  /* a spring that starts at `at` frames */
  const pop = (at: number, damping = 14, mass = 0.7) =>
    spring({ frame: frame - at, fps, config: { damping, mass, stiffness: 140 } });
  const ease = (a: number, b: number, from = 0, to = 1) =>
    interpolate(frame, [a, b], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    });

  /* masthead */
  const mast = pop(2);

  /* cover: the block slides in from the right, the cover drops onto it,
     then presses — shadow closes from 22px to 14px and back out */
  const block = pop(14, 16);
  const land = pop(24, 12, 0.8);
  const press = interpolate(frame, [40, 46, 56], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shadow = 22 - press * 10;
  const drift = interpolate(frame, [0, DURATION], [1.04, 1.14]);

  /* title, letter by letter */
  const titleSize = project.title.length > 12 ? 104 : 148;

  /* CTA */
  const cta = pop(132, 13);
  const ctaPress = interpolate(frame, [150, 155, 163], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nudge = frame > 165 ? Math.max(0, Math.sin(((frame - 165) / fps) * Math.PI * 1.6)) * 14 : 0;

  const mono: CSSProperties = { fontFamily };

  return (
    <AbsoluteFill style={{ background: ground, color: ink, ...mono, padding: "250px 80px 290px" }}>
      {/* masthead */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: mast,
          transform: `translateY(${(1 - mast) * -40}px)`,
        }}
      >
        {/* the real lockup, used as a mask so it takes the project's ink —
            the file itself is drawn in 910's ink and vanishes on dark grounds */}
        <div
          role="img"
          aria-label="910studio"
          style={{
            width: 439 * 0.5,
            height: 140 * 0.5,
            background: ink,
            WebkitMaskImage: `url(${staticFile("logo.svg")})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskImage: `url(${staticFile("logo.svg")})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
          }}
        />
        <div style={{ fontSize: 24, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, fontWeight: 500 }}>
          Case study · {project.year}
        </div>
      </div>

      {/* cover */}
      <div style={{ position: "relative", marginTop: 70, width: COVER_W, height: COVER_H }}>
        <div
          style={{
            position: "absolute",
            left: shadow,
            top: shadow,
            width: COVER_W,
            height: COVER_H,
            background: accent,
            transform: `translateX(${(1 - block) * (W + 40)}px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `4px solid ${ink}`,
            background: ink,
            overflow: "hidden",
            opacity: Math.min(1, land * 1.4),
            transform: `translate(${press * 8}px, ${(1 - land) * -160 + press * 8}px) rotate(${(1 - land) * -3}deg)`,
          }}
        >
          <Img
            src={staticFile(project.image.replace(/^\//, ""))}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${drift})` }}
          />
        </div>
      </div>

      {/* title */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 80,
          fontSize: titleSize,
          fontWeight: 500,
          lineHeight: 0.95,
          letterSpacing: "-0.06em",
          overflow: "hidden",
          paddingBottom: 8,
        }}
      >
        {/* grouped by word: letters wrap as a unit, so a long name breaks
            between words instead of mid-word ("Entertainme / nt") */}
        {project.title.split(" ").map((word, w, words) => {
          const before = words.slice(0, w).join(" ").length + (w ? 1 : 0);
          return (
            <span key={w} style={{ display: "inline-flex", whiteSpace: "nowrap", marginRight: "0.5ch" }}>
              {[...word].map((ch, j) => {
                const t = pop(52 + (before + j) * 2.2, 15, 0.6);
                return (
                  <span
                    key={j}
                    style={{ display: "inline-block", opacity: t, transform: `translateY(${(1 - t) * 110}%)` }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>

      {/* pitch */}
      <div
        style={{
          marginTop: 30,
          fontSize: 32,
          lineHeight: 1.45,
          color: ink2,
          opacity: ease(88, 112),
          transform: `translateY(${ease(88, 112, 24, 0)}px)`,
        }}
      >
        {project.description}
      </div>

      {/* scope */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
        {project.scope.map((s, i) => {
          const t = pop(104 + i * 5, 12);
          return (
            <span
              key={s}
              style={{
                fontSize: 21,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ink3,
                border: `2px solid ${ink3}`,
                padding: "8px 14px",
                opacity: t,
                transform: `scale(${0.6 + t * 0.4})`,
              }}
            >
              {s}
            </span>
          );
        })}
      </div>

      <div style={{ flex: 1, minHeight: 48 }} />

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: accent,
          color: onAccent,
          border: `4px solid ${ink}`,
          boxShadow: `${12 - ctaPress * 9}px ${12 - ctaPress * 9}px 0 0 ${ink}`,
          padding: "34px 40px",
          opacity: cta,
          transform: `translate(${ctaPress * 9}px, ${(1 - cta) * 220 + ctaPress * 9}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 38, fontWeight: 500, letterSpacing: "-0.02em" }}>Read the case study</div>
          <div style={{ marginTop: 8, fontSize: 26, opacity: 0.85 }}>910.studio/work/{project.slug}</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 500, transform: `translateX(${nudge}px)` }}>→</div>
      </div>
    </AbsoluteFill>
  );
}
