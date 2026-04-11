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
      { rootMargin: "200px 0px" },
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
    <div ref={ref} className="border border-zinc-800">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 bg-zinc-700" />
          <span className="h-2.5 w-2.5 bg-zinc-700" />
          <span className="h-2.5 w-2.5 bg-zinc-700" />
        </div>
        <span className="flex-1 text-center font-mono text-[10px] text-zinc-500">{label}</span>
        <span className="text-[9px] uppercase tracking-wider text-accent">{tag}</span>
      </div>
      {mounted ? (
        <iframe src={src} className="w-full border-0" style={{ height }} />
      ) : (
        <div
          className="grid place-items-center font-mono text-[10px] uppercase tracking-wider text-zinc-600"
          style={{ height, background: "#0a0a0a" }}
        >
          scroll to load demo
        </div>
      )}
    </div>
  );
}
