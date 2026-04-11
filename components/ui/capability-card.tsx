"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface CapabilityCardProps {
  num: string;
  title: string;
  index: number;
}

// All zigzag style but each one different — density, width, angle
const SCRIBBLE_FILLS = [
  // Card 01: tight dense zigzag — narrow spacing, 12 passes
  { viewBox: "0 0 300 180", d: "M5,175 C10,140 25,60 40,20 C42,15 48,18 47,23 L35,155 C34,160 40,163 42,158 L70,22 C72,17 78,20 77,25 L62,152 C61,157 67,160 69,155 L100,25 C102,20 108,23 107,28 L92,150 C91,155 97,158 99,153 L130,28 C132,23 138,26 137,31 L122,148 C121,153 127,156 129,151 L160,30 C162,25 168,28 167,33 L152,146 C151,151 157,154 159,149 L190,32 C192,27 198,30 197,35 L182,144 C181,149 187,152 189,147 L220,34 C222,29 228,32 227,37 L212,142 C211,147 217,150 219,145 L250,36 C252,31 258,34 257,39 L242,140 C241,145 247,148 249,143 L280,38 C282,33 288,36 287,41 L275,142 C274,147 280,149 282,145 L300,10" },
  // Card 02: wide loose zigzag — big gaps, fat lazy strokes, 6 passes
  { viewBox: "0 0 425 185", d: "M8,177 C13,151 42,79 63,31 C65,27 71,29 70,33 L58,152 C57,156 64,158 65,154 L119,33 C121,29 127,31 126,35 L111,153 C111,157 117,159 119,155 L178,34 C180,29 186,32 185,36 L165,150 C164,154 171,156 173,152 L232,33 C234,29 241,31 240,35 L220,151 C219,155 225,157 227,153 L288,33 C290,29 297,31 296,36 L274,151 C273,155 279,157 282,153 L344,34 C346,30 352,32 351,37 L327,151 C326,156 332,158 334,154 L417,8" },
  // Card 03: steep angle zigzag — nearly vertical, aggressive, 10 passes
  { viewBox: "0 0 250 200", d: "M3,195 C6,160 15,80 25,25 C26,21 31,23 30,27 L22,170 C21,175 27,177 28,172 L48,28 C49,23 55,25 54,30 L44,168 C43,173 49,175 50,170 L72,32 C73,27 79,29 78,34 L68,165 C67,170 73,172 74,167 L96,35 C97,30 103,32 102,37 L92,162 C91,167 97,169 98,164 L120,38 C121,33 127,35 126,40 L116,160 C115,165 121,167 122,162 L144,40 C145,35 151,37 150,42 L140,158 C139,163 145,165 146,160 L168,42 C169,37 175,39 174,44 L164,156 C163,161 169,163 170,158 L192,45 C193,40 199,42 198,47 L190,155 C189,160 195,162 196,157 L220,48 C221,43 227,45 226,50 L218,153 C217,158 223,160 224,155 L250,15" },
  // Card 04: wobbly uneven zigzag — random widths, chaotic spacing, 9 passes
  { viewBox: "0 0 400 185", d: "M10,178 C15,145 35,75 55,28 C57,23 63,26 62,30 L48,158 C47,163 54,165 55,160 L95,30 C97,25 104,28 102,33 L82,155 C81,160 88,162 90,157 L150,32 C152,27 159,30 157,35 L130,152 C129,157 136,160 138,155 L175,35 C177,30 184,33 182,38 L168,150 C167,155 174,158 176,153 L230,38 C232,33 239,36 237,41 L218,148 C217,153 224,156 226,151 L285,40 C287,35 294,38 292,43 L270,146 C269,151 276,154 278,149 L320,42 C322,37 329,40 327,45 L310,144 C309,149 316,152 318,147 L370,45 C372,40 379,43 377,48 L362,142 C361,147 368,150 370,145 L405,12" },
];

export function CapabilityCard({ num, title, index }: CapabilityCardProps) {
  const [hovered, setHovered] = useState(false);
  const scribbleRef = useRef<SVGPathElement>(null);
  const scribbleTlRef = useRef<gsap.core.Timeline | null>(null);

  const scribble = SCRIBBLE_FILLS[index % SCRIBBLE_FILLS.length];

  // Scribble fill draws on hover
  useEffect(() => {
    if (!scribbleRef.current) return;
    const path = scribbleRef.current;
    const length = path.getTotalLength();

    if (hovered) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      if (scribbleTlRef.current) scribbleTlRef.current.kill();

      const tl = gsap.timeline();
      tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" });

      scribbleTlRef.current = tl;
    } else {
      if (scribbleTlRef.current) {
        scribbleTlRef.current.kill();
        scribbleTlRef.current = null;
      }
      path.style.strokeDashoffset = `${length}`;
    }

    return () => { if (scribbleTlRef.current) scribbleTlRef.current.kill(); };
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default overflow-hidden p-8 transition-colors duration-200"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Scribble fill bg — base-black lines filling over accent bg */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={scribble.viewBox}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={scribbleRef}
          d={scribble.d}
          stroke="#14b8a6"
          strokeWidth="16"
          strokeLinecap="round"
          opacity={hovered ? "0.12" : "0"}
          style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
        />
      </svg>

      <span className="relative z-10 mb-3 inline-block font-bebas text-5xl text-accent">
        {num}
      </span>

      <p
        className="relative z-10 font-mono text-sm font-medium uppercase tracking-wider transition-colors duration-200"
        style={{ color: hovered ? "#fafafa" : "#e4e4e7" }}
      >
        {title}
      </p>
    </div>
  );
}
