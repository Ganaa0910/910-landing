"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LineArtProps {
  variant: keyof typeof PATHS;
  color?: string;
  className?: string;
  strokeWidth?: number;
  animate?: boolean;
  loop?: boolean;
  delay?: number;
}

// Thick, chunky, toddler-scribble energy rubber hose paths
const PATHS = {
  // Fat messy loop — like a kid trying to draw a circle
  scribble: {
    viewBox: "0 0 200 180",
    d: "M20,140 C-10,80 40,10 100,20 S200,0 190,80 C185,130 130,170 80,160 S10,120 40,80 C60,50 120,40 140,70",
  },
  // Drunk spiral — wobbly, not perfect
  spiral: {
    viewBox: "0 0 160 160",
    d: "M80,15 C130,5 155,50 145,90 S110,150 70,145 C30,140 10,105 18,70 S50,25 80,30 C105,35 115,60 108,80 S80,105 65,95",
  },
  // Big fat swoop — rubber arm reaching across
  swoop: {
    viewBox: "0 0 300 200",
    d: "M10,180 C10,80 60,10 150,30 S290,10 280,100 C275,150 230,180 180,160",
  },
  // Chunky zigzag — like a toddler's lightning bolt
  zigzag: {
    viewBox: "0 0 180 200",
    d: "M20,10 L80,70 L30,90 L110,140 L50,160 L140,195",
  },
  // Twisty loop de loop — ribbon candy energy
  twist: {
    viewBox: "0 0 250 150",
    d: "M10,120 C40,30 80,130 110,50 S150,130 170,40 C185,10 210,80 240,30",
  },
  // Bouncy underline — thick wavy scribble under text
  underline: {
    viewBox: "0 0 300 50",
    d: "M5,25 C30,5 60,45 100,20 S160,50 200,25 S260,5 295,30",
  },
  // Star scribble — like a kid drew a star real fast
  star: {
    viewBox: "0 0 80 80",
    d: "M40,5 C45,25 60,10 55,30 S70,40 50,40 C65,55 55,65 40,50 S15,65 20,45 C5,40 10,25 25,30 S35,10 40,5",
  },
  // Vertical wobbly line
  vertical: {
    viewBox: "0 0 50 250",
    d: "M25,10 C10,40 40,70 25,100 S10,130 30,160 C40,180 15,210 25,240",
  },
} as const;

export function LineArt({
  variant,
  color = "#e4e4e7",
  className = "",
  strokeWidth = 2,
  animate = true,
  loop = false,
  delay = 0,
}: LineArtProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!animate || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (loop) {
            // Endless subtle redraw loop
            const tl = gsap.timeline({ repeat: -1, delay });

            // Draw in
            tl.to(path, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power1.inOut",
            });

            // Hold
            tl.to({}, { duration: 1.5 });

            // Erase out (reverse direction)
            tl.to(path, {
              strokeDashoffset: -length,
              duration: 2.5,
              ease: "power1.inOut",
            });

            // Pause before redraw
            tl.to({}, { duration: 2 });

            // Reset for next loop
            tl.set(path, { strokeDashoffset: length });

            tlRef.current = tl;
          } else {
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              delay,
              ease: "power2.inOut",
            });
          }
          observer.unobserve(path);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(path);
    return () => {
      observer.disconnect();
      if (tlRef.current) tlRef.current.kill();
    };
  }, [animate, delay, loop]);

  const p = PATHS[variant];

  return (
    <svg
      viewBox={p.viewBox}
      className={`pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={p.d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={variant === "star" ? "none" : "none"}
      />
    </svg>
  );
}
