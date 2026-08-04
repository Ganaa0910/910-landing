"use client";

import { useEffect, useRef, useState } from "react";

/* A live prototype in a browser-chrome frame, mounted only once it is nearly
 * on screen. Shared by every case study — it takes no colours of its own, so
 * it picks up whichever palette the page set on --cs-*.
 *
 * The demos are static HTML shipped under /public/demos, several of which
 * carry their own direction switcher. `variant` sets the one the case study
 * is actually discussing and hides the switcher, so the reader sees the
 * shipped direction rather than whatever the file happened to default to. */
export function DemoFrame({
  src,
  label,
  tag = "Live Demo",
  height = 600,
  variant,
}: {
  src: string;
  label: string;
  tag?: string;
  height?: number;
  variant?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const iframe = ref.current?.querySelector("iframe");
    if (!iframe) return;

    const handleLoad = () => {
      /* same-origin, but a demo that fails to parse leaves contentDocument
         null and would take the whole page down with it */
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        if (variant) {
          /* both, because the demos are inconsistent about which element
             they hang the attribute on */
          doc.documentElement.setAttribute("data-dir", variant);
          doc.body.setAttribute("data-dir", variant);
          doc.querySelectorAll(".dir-btn").forEach((b) => {
            b.classList.toggle(
              "on",
              b.textContent?.trim().toLowerCase() === variant.toLowerCase(),
            );
          });
          const sw = doc.querySelector<HTMLElement>(".dir-sw");
          if (sw) sw.style.display = "none";
        }

        /* the frame is not scrolled by the reader, and an inner scrollbar
           reads as chrome from another site */
        const style = doc.createElement("style");
        style.textContent =
          "html,body{scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none}";
        doc.head.appendChild(style);
      } catch {
        /* cross-origin or unparseable — the demo still renders, it just
           keeps its own default variant */
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [mounted, variant]);

  return (
    <div ref={ref} className="cs-demo">
      <div className="cs-demo-bar">
        <div className="cs-dots">
          <i />
          <i />
          <i />
        </div>
        {/* a label, not a URL — a fake address bar is a lie about where
            this thing lives */}
        <span className="cs-demo-url">{label}</span>
        <span className="cs-demo-tag">{tag}</span>
      </div>
      {mounted ? (
        <iframe src={src} title={label} style={{ height }} loading="lazy" />
      ) : (
        <div className="cs-demo-ph" style={{ height }}>
          scroll to load demo
        </div>
      )}
    </div>
  );
}
