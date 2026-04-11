import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "910studio — Creative Web Studio, Ulaanbaatar Mongolia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Load Bebas Neue from Google Fonts
  const bebasFont = await fetch(
    "https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW4.ttf",
  ).then((res) => res.arrayBuffer());

  const ibmPlexMono = await fetch(
    "https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5iQ.ttf",
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
        }}
      >
        {/* Top label */}
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 14,
            color: "#71717a",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          creative web studio
        </div>

        {/* Center — big name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontFamily: "Bebas Neue",
              fontSize: 160,
              color: "#fafafa",
              lineHeight: 0.85,
              letterSpacing: "0.05em",
            }}
          >
            910STUDIO
          </div>
          {/* Teal scribble underline */}
          <svg
            width="500"
            height="20"
            viewBox="0 0 500 20"
            style={{ marginTop: 8 }}
          >
            <path
              d="M5,10 C30,3 60,17 100,8 S160,18 200,10 S260,3 300,12 S360,18 400,8 S460,3 495,12"
              stroke="#14b8a6"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 14,
              color: "#3f3f46",
            }}
          >
            ulaanbaatar, mongolia — est. 2024
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 14,
              color: "#14b8a6",
            }}
          >
            910.studio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bebas Neue",
          data: bebasFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "IBM Plex Mono",
          data: ibmPlexMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
