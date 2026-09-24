import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";
import { publicDataUri, wordmark } from "./assets";
import { plex } from "./fonts";

/**
 * The share card for one case study or toy, 1200 × 630.
 *
 * Every case study wears the client's colours on 910's structure — the
 * same rule the pages themselves follow — so the card reads the palette
 * out of lib/projects rather than defining a look of its own. Add a
 * project with a palette and its card is already right.
 *
 * It is the landscape cut of the story poster in app/api/story/[slug].
 * Same masthead, same offset-shadow frame around the cover, same type.
 * A link pasted into Slack and a poster posted to Instagram should not
 * look like two different studios.
 *
 * WHY THE CACHE HEADER IS HERE and not in next.config's headers(): a
 * metadata image route sets `cache-control: max-age=0, must-revalidate`
 * on itself, and that beats the config — so the config entry looks
 * correct and does nothing while every scrape re-runs the render.
 * Protech measured that one at 2.5–4.9s a scrape. A card is the same
 * image for everyone and carries nothing personal, so a real `max-age`
 * is safe here in a way it is not on an HTML page.
 */

export const CASE_CARD = {
  size: { width: 1200, height: 630 },
  contentType: "image/png",
} as const;

const PAPER = "#FBF9F6";
const INK = "#2B221F";
const ACCENT = "#2660E8";

/** 439 × 140 in public/logo.svg. */
const LOGO_W = 439 * 0.42;
const LOGO_H = 140 * 0.42;

const COVER_W = 424;
const COVER_H = Math.round((COVER_W * 10) / 16);

export function caseCardAlt(slug: string): string {
  const p = getProject(slug);
  if (!p) return "910studio case study";
  return p.kind === "toy"
    ? `${p.title} — from the 910studio toybox`
    : `${p.title} — 910studio case study`;
}

export async function caseCard(slug: string): Promise<ImageResponse> {
  const project = getProject(slug);
  if (!project) {
    throw new Error(
      `No project "${slug}" in lib/projects. A case card is generated from that entry, ` +
        `so the slug here and the slug there have to agree.`,
    );
  }

  const ground = project.palette?.ground ?? PAPER;
  const ink = project.palette?.ink ?? INK;
  const ink3 = project.palette?.ink3 ?? "rgba(43,34,31,0.4)";
  const accent = project.palette?.accent ?? ACCENT;

  const fonts = await plex();
  const logo = wordmark(ink);
  const cover = publicDataUri(project.image, "image/png");

  /* "Nair Entertainment" and "Some Gorillas" do not get the same size as
     "Uuye". One step down is enough to keep every title on one line. */
  const titleSize = project.title.length > 12 ? 58 : 76;

  /* A toy is not a case study and does not live under /work. pomo has a
     palette and a cover like everything else, so it gets the same card
     rather than the generic one — only the eyebrow and the address change. */
  const toy = project.kind === "toy";
  const eyebrow = toy ? "Toybox" : "Case study";
  const section = toy ? "toybox" : "work";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: ground,
          color: ink,
          fontFamily: "Plex",
          padding: "58px 68px",
        }}
      >
        {/* masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" width={LOGO_W} height={LOGO_H} />
          ) : (
            <div style={{ display: "flex", fontSize: 30, fontWeight: 500 }}>910studio</div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {eyebrow} · {project.year}
          </div>
        </div>

        {/* body */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.055em",
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 22,
                lineHeight: 1.45,
                opacity: 0.78,
              }}
            >
              {project.description}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 14,
                /* 14/0.12em, not 15/0.16em: Juraan's five scope items and
                   Nair's "Bilingual Architecture" both run to 50 characters,
                   which wrapped and left one word hanging on its own line.
                   lineHeight covers the case where a longer one still does. */
                letterSpacing: "0.12em",
                lineHeight: 1.7,
                textTransform: "uppercase",
                color: ink3,
              }}
            >
              {project.scope.join(" · ")}
            </div>
          </div>

          {/* the cover, in the offset frame the /work deck uses */}
          <div style={{ display: "flex", position: "relative", width: COVER_W, height: COVER_H }}>
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 16,
                width: COVER_W,
                height: COVER_H,
                background: accent,
              }}
            />
            <div
              style={{
                display: "flex",
                position: "relative",
                width: COVER_W,
                height: COVER_H,
                border: `4px solid ${ink}`,
                background: ink,
                overflow: "hidden",
              }}
            >
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover}
                  alt=""
                  width={COVER_W - 8}
                  height={COVER_H - 8}
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.04em", color: ink3 }}>
            910.studio/{section}/{project.slug}
          </div>
          <div style={{ display: "flex", width: 132, height: 6, background: accent }} />
        </div>
      </div>
    ),
    {
      ...CASE_CARD.size,
      fonts,
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
