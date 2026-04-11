"use client";

import { useEffect, useRef, useState } from "react";

const SPECIMEN_LINES = [
  { text: "Juraan", size: "clamp(4rem, 10vw, 7rem)", color: "#D4AF7A", label: "Display" },
  { text: "God and Devil", size: "clamp(2.5rem, 6vw, 4.5rem)", color: "#e5e5e5", label: "Hero" },
  { text: "The World of Juraan", size: "clamp(1.75rem, 4vw, 3rem)", color: "#e5e5e5", label: "H1" },
  { text: "Bronze · Mythology · Mongolia", size: "clamp(1.25rem, 2.5vw, 2rem)", color: "#a3a3a3", label: "H2" },
];

const CHARSET_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function FontShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-8 border border-zinc-800 overflow-hidden">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
        </div>
        <span className="flex-1 text-center font-mono text-[10px] text-zinc-500">
          JuraanFont-Regular.ttf — Custom Display Typeface
        </span>
        <span className="text-[9px] uppercase tracking-wider text-accent">Live Font</span>
      </div>

      {visible ? (
        <div className="bg-[#0a0a0a] p-6 sm:p-8">
          {/* Load the actual font */}
          <style>{`
            @font-face {
              font-family: 'JuraanShowcase';
              src: url('/demos/juraan/assets/JuraanFont-Regular.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            .type-line {
              position: relative;
              padding: 16px 0;
            }
            .type-line::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              border-top: 1px dashed rgba(212, 175, 122, 0.15);
            }
            .type-line::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              border-top: 1px dashed rgba(212, 175, 122, 0.15);
            }
            .baseline-guide {
              position: relative;
            }
            .baseline-guide::before {
              content: '';
              position: absolute;
              bottom: 0.18em;
              left: 0;
              right: 0;
              border-top: 1px dashed rgba(212, 175, 122, 0.25);
            }
            .cap-guide::after {
              content: '';
              position: absolute;
              top: 0.12em;
              left: 0;
              right: 0;
              border-top: 1px dashed rgba(212, 175, 122, 0.12);
            }
            .x-guide {
              position: relative;
            }
            .x-guide::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              border-top: 1px dashed rgba(212, 175, 122, 0.1);
            }
          `}</style>

          {/* ── Type Specimen with alignment guides ── */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                type specimen
              </p>
              <div className="flex-1 border-t border-dashed border-zinc-800" />
            </div>

            {SPECIMEN_LINES.map((line) => (
              <div key={line.label} className="type-line baseline-guide cap-guide x-guide">
                <div className="flex items-baseline gap-4">
                  <span className="w-14 flex-shrink-0 font-mono text-[9px] text-[#D4AF7A]/40 uppercase tracking-wider">
                    {line.label}
                  </span>
                  <p
                    className="leading-[1.1]"
                    style={{
                      fontFamily: "JuraanShowcase, serif",
                      fontSize: line.size,
                      color: line.color,
                    }}
                  >
                    {line.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Fluid Scale Demo ── */}
          <div className="mb-8 border-t border-zinc-800 pt-6">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                fluid scale — css clamp()
              </p>
              <div className="flex-1 border-t border-dashed border-zinc-800" />
            </div>

            <div className="space-y-0">
              {[
                { label: "hero", formula: "clamp(3rem, 8vw, 6rem)", px: "48–96px" },
                { label: "h1", formula: "clamp(2.5rem, 5vw, 4rem)", px: "40–64px" },
                { label: "h2", formula: "clamp(1.75rem, 3vw, 2.5rem)", px: "28–40px" },
                { label: "h3", formula: "clamp(1.25rem, 2vw, 1.75rem)", px: "20–28px" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 py-2"
                  style={{ borderBottom: "1px dashed rgba(63, 63, 70, 0.3)" }}
                >
                  <span className="w-8 font-mono text-[9px] text-accent uppercase">{s.label}</span>
                  <div
                    className="h-3 bg-[#D4AF7A]/20"
                    style={{ width: s.label === "hero" ? "100%" : s.label === "h1" ? "75%" : s.label === "h2" ? "50%" : "35%" }}
                  />
                  <span className="flex-shrink-0 font-mono text-[9px] text-zinc-600">{s.px}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Character Set with per-letter alignment guides ── */}
          <div className="border-t border-zinc-800 pt-6">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                character set
              </p>
              <div className="flex-1 border-t border-dashed border-zinc-800" />
            </div>

            {/* Metric labels */}
            <div className="relative mb-1 flex items-center pl-1">
              <span className="font-mono text-[8px] text-[#D4AF7A]/30 uppercase">cap height</span>
              <div className="ml-2 flex-1 border-t border-dashed border-[#D4AF7A]/15" />
            </div>

            <div className="grid grid-cols-9 gap-0 sm:grid-cols-[repeat(13,1fr)]">
              {CHARSET_LETTERS.map((letter) => (
                <div
                  key={letter}
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: "1 / 1.3" }}
                >
                  {/* Cap height line (top) */}
                  <div className="absolute top-0 left-0 right-0 border-t border-dashed border-[#D4AF7A]/15" />
                  {/* X-height / crossbar line (middle) */}
                  <div className="absolute top-[38%] left-0 right-0 border-t border-dashed border-[#D4AF7A]/10" />
                  {/* Baseline (bottom) */}
                  <div className="absolute bottom-[15%] left-0 right-0 border-t border-dashed border-[#D4AF7A]/20" />
                  {/* Descender line */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-[#D4AF7A]/8" />
                  {/* Left vertical guide */}
                  <div className="absolute top-0 bottom-0 left-0 border-l border-dashed border-[#D4AF7A]/8" />
                  {/* Right vertical guide */}
                  <div className="absolute top-0 bottom-0 right-0 border-r border-dashed border-[#D4AF7A]/8" />

                  <span
                    className="relative z-10 text-zinc-200"
                    style={{
                      fontFamily: "JuraanShowcase, serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>

            {/* Baseline label */}
            <div className="relative mt-1 flex items-center pl-1">
              <span className="font-mono text-[8px] text-[#D4AF7A]/30 uppercase">baseline</span>
              <div className="ml-2 flex-1 border-t border-dashed border-[#D4AF7A]/15" />
            </div>
          </div>

          {/* ── Font metadata ── */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-zinc-800 pt-4">
            <span className="font-mono text-[9px] text-zinc-600">Weight: Regular (400)</span>
            <span className="font-mono text-[9px] text-zinc-600">Format: TrueType</span>
            <span className="font-mono text-[9px] text-zinc-600">License: Custom / Exclusive</span>
            <span className="font-mono text-[9px] text-zinc-600">Usage: Display only</span>
          </div>
        </div>
      ) : (
        <div
          className="grid place-items-center font-mono text-[10px] uppercase tracking-wider text-zinc-600"
          style={{ height: 600, background: "#0a0a0a" }}
        >
          scroll to load font showcase
        </div>
      )}
    </div>
  );
}
