"use client";

import { useEffect, useRef, useState } from "react";

/* "Share to story" for a case study.
 *
 * Hands the poster from /api/story/[slug] to the phone's share sheet as a
 * PNG; the reader picks Instagram and lands in the story composer with it
 * loaded. That sheet is the only road from a browser into Instagram — the
 * instagram-stories:// deep link reads its image off a native pasteboard,
 * which no web API can write.
 *
 * The link cannot ride along as a tappable sticker: Meta reserves the
 * pre-attached story link for approved partners, even from native apps. So
 * it goes on the clipboard and the reader drops it in with the Link sticker.
 * That is two taps here, on purpose — the first copies, the second shares.
 * iOS lets each gesture start one privileged call reliably; stacking the
 * clipboard write and the share on a single tap is how the copy silently
 * goes missing.
 *
 * The poster is fetched on mount, not on tap. iOS only lets navigator.share
 * run inside the tap's user activation, and awaiting a 1080×1920 PNG over
 * the network burns through it — the share then throws NotAllowedError. */

type Status = "loading" | "ready" | "failed";

export function ShareStory({ slug, title }: { slug: string; title: string }) {
  const file = useRef<File | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [step, setStep] = useState<"idle" | "copied" | "nocopy">("idle");

  useEffect(() => {
    let alive = true;
    fetch(`/api/story/${slug}`)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .then((b) => {
        if (!alive) return;
        file.current = new File([b], `910studio-${slug}-story.png`, { type: "image/png" });
        setStatus("ready");
      })
      .catch(() => alive && setStatus("failed"));
    return () => {
      alive = false;
    };
  }, [slug]);

  const url = () => `${location.origin}/work/${slug}`;

  /* tap one: the link onto the clipboard */
  const copy = () => {
    const f = file.current;
    if (!f || !navigator.canShare?.({ files: [f] })) {
      /* desktop, or a browser without file sharing: open the poster to save */
      window.open(`/api/story/${slug}`, "_blank", "noopener");
      return;
    }
    if (!navigator.clipboard) {
      setStep("nocopy");
      return;
    }
    navigator.clipboard.writeText(url()).then(
      () => setStep("copied"),
      () => setStep("nocopy"),
    );
  };

  /* tap two: the poster into the share sheet. Files only, no text/url —
     some targets take the link over the image when both are offered. */
  const share = () => {
    const f = file.current;
    if (!f) return;
    navigator.share({ files: [f], title }).catch(() => {
      /* AbortError is the reader closing the sheet — nothing to do */
    });
  };

  return (
    <div className="cs-share">
      {step === "idle" ? (
        <>
          <button
            type="button"
            className="cs-share-btn"
            onClick={copy}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Making the poster…" : "Share to story"}
            <span aria-hidden="true">↗</span>
          </button>
          <p className="cs-share-note" role="status">
            {status === "failed"
              ? "Poster didn't load. Try again in a moment."
              : "A story poster of this project, with the link ready to stick on."}
          </p>
        </>
      ) : (
        <div className="cs-share-card" role="status">
          <p className="cs-share-head">
            {step === "copied" ? "Link copied ✓" : "Copy this link first"}
          </p>
          {step === "nocopy" ? <p className="cs-share-url">{url()}</p> : null}
          <ol className="cs-share-steps">
            <li>Open Instagram → <b>Story</b></li>
            <li>Tap the sticker icon → <b>Link</b></li>
            <li>Paste, then post</li>
          </ol>
          <button type="button" className="cs-share-btn" onClick={share}>
            Open Instagram
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </div>
  );
}
