"use client";

import { useEffect, useRef, useState } from "react";

export function LazyDemoFrame({
  src,
  label,
  tag = "Live Demo",
  height = 600,
}: {
  src: string;
  label: string;
  tag?: string;
  height?: number;
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
      { rootMargin: "200px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;

    const iframe = el.querySelector<HTMLIFrameElement>("iframe");
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        doc.documentElement.setAttribute("data-dir", "dense");
        doc.body.setAttribute("data-dir", "dense");
        doc.querySelectorAll(".dir-btn").forEach((b) => {
          b.classList.remove("on");
          if (b.textContent?.trim() === "Dense") b.classList.add("on");
        });
        const sw = doc.querySelector<HTMLElement>(".dir-sw");
        if (sw) sw.style.display = "none";
        const style = doc.createElement("style");
        style.textContent =
          "html, body { scrollbar-width: none; } html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }";
        doc.head.appendChild(style);
      } catch {}
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [mounted]);

  return (
    <div ref={ref} className="demo-frame">
      <div className="demo-bar">
        <div className="demo-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="demo-url">{label}</div>
        <div className="demo-tag">{tag}</div>
      </div>
      {mounted ? (
        <iframe src={src} style={{ height }} />
      ) : (
        <div
          style={{
            height,
            background: "#F0EEF7",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-m)",
            fontSize: "0.6875rem",
            color: "#7A7793",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Scroll to load demo
        </div>
      )}
    </div>
  );
}
