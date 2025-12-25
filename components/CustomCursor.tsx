"use client";

// Custom cursor with accent color glow
// Smooth follow using requestAnimationFrame + lerp

import React, { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
  accentColor: string;
}

export function CustomCursor({ accentColor }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices - don't show custom cursor on mobile
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId: number;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow using requestAnimationFrame + lerp
    const animate = () => {
      // Lerp for smooth following (0.15 = smooth lag)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-3 w-3 rounded-full mix-blend-difference"
        style={{
          backgroundColor: accentColor,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Glow layer */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-12 w-12 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(8px)",
        }}
      />
    </>
  );
}
