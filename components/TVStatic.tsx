"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface TVStaticProps {
  visible: boolean;
  duration?: number;
  onMidpoint?: () => void;
  onComplete?: () => void;
  color?: string;
}

/**
 * CRT scanline wipe transition effect
 * Horizontal scanlines sweep down the screen
 */
export function TVStatic({
  visible,
  duration = 350,
  onMidpoint,
  onComplete,
  color = "#ffffff",
}: TVStaticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !wipeRef.current) return;

    if (visible && !isAnimatingRef.current) {
      isAnimatingRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
          onComplete?.();
        },
      });

      // Scanline wipe down, swap at middle, wipe continues
      tl.set(containerRef.current, { opacity: 1 })
        .fromTo(
          wipeRef.current,
          { y: "-100%" },
          {
            y: "0%",
            duration: duration * 0.4 / 1000,
            ease: "power2.inOut",
            onComplete: () => {
              onMidpoint?.();
            },
          }
        )
        .to(wipeRef.current, {
          y: "100%",
          duration: duration * 0.4 / 1000,
          ease: "power2.inOut",
        })
        .set(containerRef.current, { opacity: 0 })
        .set(wipeRef.current, { y: "-100%" });

    } else if (!visible && isAnimatingRef.current) {
      gsap.killTweensOf([containerRef.current, wipeRef.current]);
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(wipeRef.current, { y: "-100%" });
      isAnimatingRef.current = false;
    }
  }, [visible, duration, onMidpoint, onComplete]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-0"
    >
      {/* Scanline wipe overlay */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              ${color}15 5%,
              ${color}30 10%,
              black 15%,
              black 85%,
              ${color}30 90%,
              ${color}15 95%,
              transparent 100%
            )
          `,
          transform: "translateY(-100%)",
        }}
      >
        {/* CRT scanlines texture */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              rgba(0, 0, 0, 0.4) 2px,
              rgba(0, 0, 0, 0.4) 4px
            )`,
          }}
        />
        {/* Bright scanline at edge */}
        <div
          className="absolute left-0 right-0 top-0 h-[3px]"
          style={{
            background: color,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
