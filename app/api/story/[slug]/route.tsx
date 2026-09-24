import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

/* Instagram story poster for a case study, 1080×1920.
 *
 * The share button on a case study fetches this and hands it to the phone's
 * share sheet as a file — see components/case-study/share-story.tsx. A web
 * page cannot open Instagram's story composer directly (that deep link takes
 * its image from a native pasteboard a browser cannot write), so the poster
 * travels as a plain PNG and Instagram offers "Story" when it receives one.
 *
 * Safe zones: Instagram lays its own chrome over roughly the top 220px
 * (progress bars, avatar) and bottom 260px (reply bar). Nothing that has to
 * be read sits in either. */

const W = 1080;
const H = 1920;
const SITE = "910.studio";

async function loadGoogleFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const match = css.match(/url\((https:\/\/[^)]+\.(?:ttf|woff2))\)/);
    if (!match) return null;
    const font = await fetch(match[1]);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

function publicDataUri(path: string, type: string, transform?: (s: string) => string) {
  try {
    const file = join(process.cwd(), "public", path.replace(/^\//, ""));
    if (transform) {
      const text = transform(readFileSync(file, "utf8"));
      return `data:${type};base64,${Buffer.from(text).toString("base64")}`;
    }
    return `data:${type};base64,${readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.kind === "toy") {
    return new Response("Not found", { status: 404 });
  }

  const ground = project.palette?.ground ?? "#FBF9F6";
  const ink = project.palette?.ink ?? "#2B221F";
  const ink3 = project.palette?.ink3 ?? "rgba(43,34,31,0.4)";
  const accent = project.palette?.accent ?? "#2660E8";
  const onAccent = project.palette?.onAccent ?? ground;

  const [mono, monoBold] = await Promise.all([
    loadGoogleFont("IBM Plex Mono:wght@400"),
    loadGoogleFont("IBM Plex Mono:wght@500"),
  ]);
  const fonts = [
    mono && { name: "Plex", data: mono, style: "normal" as const, weight: 400 as const },
    monoBold && { name: "Plex", data: monoBold, style: "normal" as const, weight: 500 as const },
  ].filter((f): f is NonNullable<typeof f> => f !== null);

  /* the mark is drawn in 910 ink; recoloured to the project's so it reads on
     the dark grounds too */
  const logo = publicDataUri("logo.svg", "image/svg+xml", (s) => s.replaceAll("#2B221F", ink));
  const thumb = publicDataUri(project.image, "image/png");

  /* long titles step down so "Nair Entertainment" still fits on two lines */
  const titleSize = project.title.length > 12 ? 104 : 148;

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
          padding: "250px 80px 290px",
        }}
      >
        {/* masthead */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" width={439 * 0.5} height={140 * 0.5} />
          ) : (
            <div style={{ display: "flex", fontSize: 40, fontWeight: 500 }}>910studio</div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: accent,
              fontWeight: 500,
            }}
          >
            Case study · {project.year}
          </div>
        </div>

        {/* the cover, in the same offset-shadow frame as the /work deck */}
        <div style={{ display: "flex", marginTop: 70, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 22,
              width: W - 160,
              height: ((W - 160) * 10) / 16,
              background: accent,
            }}
          />
          <div
            style={{
              display: "flex",
              width: W - 160,
              height: ((W - 160) * 10) / 16,
              border: `4px solid ${ink}`,
              background: ink,
              overflow: "hidden",
            }}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                width={W - 168}
                height={((W - 160) * 10) / 16 - 8}
                style={{ objectFit: "cover" }}
              />
            ) : null}
          </div>
        </div>

        {/* title + pitch */}
        <div
          style={{
            display: "flex",
            marginTop: 80,
            fontSize: titleSize,
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-0.06em",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 32,
            lineHeight: 1.45,
            color: ink,
            opacity: 0.78,
          }}
        >
          {project.description}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ink3,
          }}
        >
          {project.scope.join(" · ")}
        </div>

        {/* CTA — printed, because a web share cannot attach a link sticker.
            The button also copies the URL so the reader can add one. */}
        <div style={{ display: "flex", flex: 1, minHeight: 48 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: accent,
            color: onAccent,
            border: `4px solid ${ink}`,
            boxShadow: `12px 12px 0 0 ${ink}`,
            padding: "34px 40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 500, letterSpacing: "-0.02em" }}>
              Read the case study
            </div>
            <div style={{ display: "flex", marginTop: 8, fontSize: 26, opacity: 0.85 }}>
              {SITE}/work/{project.slug}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 500 }}>→</div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
