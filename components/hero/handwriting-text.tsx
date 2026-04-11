"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HandwritingTextProps {
  color: string;
  className?: string;
  delay?: number;
}

export function HandwritingText({
  color,
  className = "",
  delay = 0.5,
}: HandwritingTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    fetch("/things-that.svg")
      .then((res) => res.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const originalSvg = doc.querySelector("svg");
        if (!originalSvg) return;

        container.innerHTML = "";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 681 139");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.overflow = "visible";

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const origPaths = originalSvg.querySelectorAll(":scope > path");
        origPaths.forEach((p) => {
          const outlineClone = p.cloneNode(true) as SVGPathElement;
          outlineClone.setAttribute("fill", "none");
          outlineClone.setAttribute("stroke", "white");
          outlineClone.setAttribute("stroke-width", "4");
          outlineClone.setAttribute("stroke-linejoin", "round");
          outlineClone.setAttribute("stroke-linecap", "round");
          g.appendChild(outlineClone);

          const fillClone = p.cloneNode(true) as SVGPathElement;
          fillClone.setAttribute("fill", color);
          fillClone.removeAttribute("stroke");
          g.appendChild(fillClone);
        });

        svg.appendChild(g);
        container.appendChild(svg);

        runAnimation();
      });

    return () => {
      if (animRef.current) animRef.current.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update fill color on theme switch (no animation replay)
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const fills = container.querySelectorAll<SVGPathElement>("svg path[fill]:not([fill='none'])");
    fills.forEach((p) => p.setAttribute("fill", color));
  }, [color]);

  function runAnimation() {
    const wrapper = wrapperRef.current;
    const selection = selectionRef.current;
    const cursor = cursorRef.current;
    const guides = guidesRef.current;
    if (!wrapper || !selection || !cursor || !guides) return;

    if (animRef.current) animRef.current.kill();

    const tl = gsap.timeline({ delay });

    // Initial state: big, hidden
    gsap.set(wrapper, {
      scale: 1.5,
      opacity: 0,
      transformOrigin: "left top",
    });
    gsap.set(selection, { opacity: 0 });
    gsap.set(cursor, { opacity: 0, x: 50, y: 40 });
    gsap.set(guides, { opacity: 0 });

    // 1. Text fades in BIG
    tl.to(wrapper, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // 2. Selection box snaps on
    tl.to(selection, {
      opacity: 1,
      duration: 0.1,
      ease: "none",
    }, "+=0.2");

    // 3. Cursor swoops in
    tl.to(cursor, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "+=0.1");

    // 4. DRAG DOWN — deliberate, no rush
    tl.to(wrapper, {
      scale: 0.6,
      duration: 1.2,
      ease: "power1.inOut",
    }, "+=0.15");

    tl.to(cursor, {
      x: -22,
      y: -16,
      duration: 1.2,
      ease: "power1.inOut",
    }, "<");

    // 5. "oops too small" — nudge back up past target, smooth like a hand
    tl.to(wrapper, {
      scale: 1.08,
      duration: 0.9,
      ease: "sine.inOut",
    }, "+=0.25");

    tl.to(cursor, {
      x: -4,
      y: -2,
      duration: 0.9,
      ease: "sine.inOut",
    }, "<");

    // 6. Settle to final — gentle, barely noticeable correction
    tl.to(wrapper, {
      scale: 1,
      duration: 0.7,
      ease: "sine.inOut",
    });

    tl.to(cursor, {
      x: -8,
      y: -4,
      duration: 0.7,
      ease: "sine.inOut",
    }, "<");

    // 6. Alignment guides flash — the pink snap lines
    tl.to(guides, {
      opacity: 1,
      duration: 0.08,
      ease: "none",
    }, "<0.1");

    // Guides disappear
    tl.to(guides, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "+=0.3");

    // 7. Selection + cursor fade out
    tl.to([selection, cursor], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.1");

    animRef.current = tl;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Figma alignment guides — pink snap lines */}
      <div ref={guidesRef} className="pointer-events-none absolute inset-0 opacity-0" style={{ margin: "-40px -60px", zIndex: 30 }}>
        {/* Top horizontal guide */}
        <div className="absolute left-0 right-0" style={{ top: 40, height: "1px", background: "#FF00E5" }} />
        {/* Bottom horizontal guide */}
        <div className="absolute left-0 right-0" style={{ bottom: 40, height: "1px", background: "#FF00E5" }} />
        {/* Left vertical guide */}
        <div className="absolute top-0 bottom-0" style={{ left: 60, width: "1px", background: "#FF00E5" }} />
        {/* Right vertical guide */}
        <div className="absolute top-0 bottom-0" style={{ right: 60, width: "1px", background: "#FF00E5" }} />
        {/* Center horizontal */}
        <div className="absolute left-0 right-0" style={{ top: "50%", height: "1px", background: "#FF00E5", opacity: 0.4 }} />
        {/* Distance indicators — small pink numbers */}
        <div className="absolute text-[8px] font-mono" style={{ top: 26, left: 60, color: "#FF00E5" }}>16</div>
        <div className="absolute text-[8px] font-mono" style={{ bottom: 26, right: 60, color: "#FF00E5" }}>16</div>
      </div>

      <div ref={wrapperRef} className="opacity-0" style={{ transformOrigin: "left top" }}>
        {/* SVG text — aspect ratio matches the 681x139 viewBox */}
        <div ref={svgContainerRef} style={{ width: "100%", aspectRatio: "681 / 139" }} />

        {/* Figma selection border */}
        <div
          ref={selectionRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            border: "1.5px solid #0D99FF",
            margin: "-6px",
          }}
        >
          {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => (
            <div
              key={pos}
              className="absolute h-[8px] w-[8px] bg-white"
              style={{
                border: "1.5px solid #0D99FF",
                top: pos.includes("top") ? -4 : undefined,
                bottom: pos.includes("bottom") ? -4 : undefined,
                left: pos.includes("left") ? -4 : undefined,
                right: pos.includes("right") ? -4 : undefined,
              }}
            />
          ))}
        </div>

        {/* Figma multiplayer cursor */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute opacity-0"
          style={{ bottom: -28, right: -32, zIndex: 20 }}
        >
          <div className="flex flex-col items-start">
            {/* Cursor arrow */}
            <svg width="16" height="22" viewBox="0 0 14 20" fill="none">
              <path
                d="M0.5 0.5L13 10.5L7.5 11.5L4.5 19L0.5 0.5Z"
                fill="#0D99FF"
                stroke="white"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            {/* Name tag */}
            <div
              className="ml-2.5 -mt-0.5 px-2 py-0.5 text-[9px] font-semibold text-white"
              style={{
                backgroundColor: "#0D99FF",
                borderRadius: "2px 6px 6px 6px",
                whiteSpace: "nowrap",
              }}
            >
              910studio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
