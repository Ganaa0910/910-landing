"use client";

// CRT TV boot sequence animation
// Plays once per session, skippable with ESC

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CRTBootLoaderProps {
  accentColor: string;
  uiFont: string;
  onComplete: () => void;
}

export function CRTBootLoader({
  accentColor,
  uiFont,
  onComplete,
}: CRTBootLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check sessionStorage - only show once per session
    const hasSeenBoot = sessionStorage.getItem("crt-boot-seen");

    if (hasSeenBoot) {
      onComplete();
      return;
    }

    if (!loaderRef.current || !scanlineRef.current || !logoRef.current) return;

    // GSAP timeline for CRT boot sequence
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("crt-boot-seen", "true");
        onComplete();
      },
    });

    // 1. Screen flicker (0-0.3s)
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      ease: "none",
    })
      // 2. Scanline sweep (0.3-1s)
      .fromTo(
        scanlineRef.current,
        { y: "-100vh" },
        {
          y: "100vh",
          duration: 0.7,
          ease: "power1.inOut",
        }
      )
      // 3. Logo fade-in with glow (1-1.8s)
      .fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 1.2,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        }
      )
      // 4. Hold logo (1.8-2.5s)
      .to({}, { duration: 0.7 })
      // 5. Fade out entire loader (2.5-3s)
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
      });

    // ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        tl.kill();
        sessionStorage.setItem("crt-boot-seen", "true");
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [accentColor, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      {/* Scanline element */}
      <div
        ref={scanlineRef}
        className="absolute inset-x-0 top-0 h-1"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}`,
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="text-center">
        <h1
          className="mb-4 text-9xl font-bold tracking-wider"
          style={{
            fontFamily: `var(${uiFont})`,
            color: accentColor,
            textShadow: `
              0 0 20px ${accentColor},
              0 0 40px ${accentColor},
              0 0 60px ${accentColor}80
            `,
          }}
        >
          910
        </h1>
        <p
          className="text-sm uppercase tracking-widest"
          style={{
            fontFamily: `var(${uiFont})`,
            color: `${accentColor}80`,
          }}
        >
          STUDIO
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem("crt-boot-seen", "true");
          onComplete();
        }}
        className="absolute bottom-8 right-8 text-sm transition-opacity hover:opacity-70"
        style={{
          fontFamily: `var(${uiFont})`,
          color: `${accentColor}60`,
        }}
      >
        Skip [ESC]
      </button>

      {/* CRT scanlines overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${accentColor}15 2px,
            ${accentColor}15 4px
          )`,
        }}
      />
    </div>
  );
}
