"use client";

import { useEffect, useRef, useState } from "react";

/* "Share to story" for a case study.
 *
 * Two formats, picked by the reader: the still poster from /api/story/[slug]
 * and the motion version pre-rendered to /stories/[slug].mp4 (stories/ in
 * the repo root renders them). Either goes to the phone's share sheet as a
 * file; the reader picks Instagram and lands in the story composer with it
 * loaded. That sheet is the only road from a browser into Instagram — the
 * instagram-stories:// deep link reads its image off a native pasteboard,
 * which no web API can write.
 *
 * The link cannot ride along as a tappable sticker: Meta reserves the
 * pre-attached story link for approved partners, even from native apps. So
 * it goes on the clipboard and the reader drops it in with the Link sticker.
 *
 * Two taps, on purpose. The first copies the link and opens the picker; the
 * second shares. iOS lets each gesture start one privileged call reliably,
 * and navigator.share has to run inside a tap with the file already in hand
 * — awaiting a download first burns the activation and the share throws
 * NotAllowedError. So the poster (≈200KB) is fetched on mount, and the video
 * (a few MB) only once the picker opens: nobody reading on mobile data
 * should pay for it unless they are about to share it. */

type Format = "motion" | "poster";
type Asset = { file: File | null; state: "loading" | "ready" | "failed" };

const EMPTY: Asset = { file: null, state: "loading" };

async function load(url: string, name: string, type: string): Promise<File> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(String(r.status));
  return new File([await r.blob()], name, { type });
}

export function ShareStory({ slug, title }: { slug: string; title: string }) {
  const posterUrl = `/api/story/${slug}`;
  const videoUrl = `/stories/${slug}.mp4`;

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<boolean | null>(null);
  const [format, setFormat] = useState<Format>("motion");
  const [poster, setPoster] = useState<Asset>(EMPTY);
  const [video, setVideo] = useState<Asset>(EMPTY);
  /* false on desktop / browsers without file sharing: the picker then
     downloads instead of sharing */
  const [canShareFiles, setCanShareFiles] = useState(true);
  const videoRequested = useRef(false);

  useEffect(() => {
    let alive = true;
    load(posterUrl, `910studio-${slug}-story.png`, "image/png")
      .then((file) => {
        if (!alive) return;
        setPoster({ file, state: "ready" });
        setCanShareFiles(!!navigator.canShare?.({ files: [file] }));
      })
      .catch(() => alive && setPoster({ file: null, state: "failed" }));
    return () => {
      alive = false;
    };
  }, [posterUrl, slug]);

  useEffect(() => {
    if (!open || videoRequested.current) return;
    videoRequested.current = true;
    load(videoUrl, `910studio-${slug}-story.mp4`, "video/mp4")
      .then((file) => setVideo({ file, state: "ready" }))
      .catch(() => {
        /* no render for this project yet — the poster is still there */
        setVideo({ file: null, state: "failed" });
        setFormat("poster");
      });
  }, [open, videoUrl, slug]);

  const url = () => `${location.origin}/work/${slug}`;

  /* tap one: link onto the clipboard, picker open */
  const start = () => {
    setOpen(true);
    if (!navigator.clipboard) return setCopied(false);
    navigator.clipboard.writeText(url()).then(
      () => setCopied(true),
      () => setCopied(false),
    );
  };

  const chosen = format === "motion" ? video : poster;

  /* tap two: the chosen file into the share sheet. Files only, no text/url
     — some targets take the link over the media when both are offered. */
  const share = () => {
    const f = chosen.file;
    if (!f) return;
    if (!canShareFiles) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(f);
      a.download = f.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      return;
    }
    navigator.share({ files: [f], title }).catch(() => {
      /* AbortError is the reader closing the sheet — nothing to do */
    });
  };

  if (!open) {
    return (
      <div className="cs-share">
        <button
          type="button"
          className="cs-share-btn"
          onClick={start}
          disabled={poster.state === "loading"}
        >
          {poster.state === "loading" ? "Making the poster…" : "Share to story"}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="cs-share-note" role="status">
          {poster.state === "failed"
            ? "Poster didn't load. Try again in a moment."
            : "A story of this project, as a poster or in motion — with the link ready to stick on."}
        </p>
      </div>
    );
  }

  const motionGone = video.state === "failed";

  return (
    <div className="cs-share">
      <div className="cs-share-card" role="group" aria-label="Share to story">
        <p className="cs-share-head">
          {copied === false ? "Copy this link first" : copied ? "Link copied ✓ — pick one" : "Pick one"}
        </p>
        {copied === false ? <p className="cs-share-url">{url()}</p> : null}

        <div className="cs-share-pick" role="radiogroup" aria-label="Format">
          {!motionGone ? (
            <button
              type="button"
              role="radio"
              aria-checked={format === "motion"}
              className="cs-share-opt"
              onClick={() => setFormat("motion")}
            >
              <video src={videoUrl} muted autoPlay loop playsInline preload="auto" />
              <span>Motion{video.state === "loading" ? " · loading" : ""}</span>
            </button>
          ) : null}
          <button
            type="button"
            role="radio"
            aria-checked={format === "poster"}
            className="cs-share-opt"
            onClick={() => setFormat("poster")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={posterUrl} alt="" />
            <span>Poster</span>
          </button>
        </div>

        {canShareFiles ? (
          <ol className="cs-share-steps">
            <li>Open Instagram → <b>Story</b></li>
            <li>Tap the sticker icon → <b>Link</b></li>
            <li>Paste, then post</li>
          </ol>
        ) : null}

        <button
          type="button"
          className="cs-share-btn"
          onClick={share}
          disabled={chosen.state !== "ready"}
        >
          {chosen.state === "loading"
            ? format === "motion" ? "Preparing the video…" : "Making the poster…"
            : canShareFiles ? "Open Instagram" : `Download ${format === "motion" ? "MP4" : "PNG"}`}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
