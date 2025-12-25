"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ShortcutConfig } from "@/hooks/useKeyboardShortcuts";

interface HelpOverlayProps {
  shortcuts: ShortcutConfig[];
  accentColor: string;
  uiFont: string;
  onClose: () => void;
}

export function HelpOverlay({
  shortcuts,
  accentColor,
  uiFont,
  onClose,
}: HelpOverlayProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Open animation (CRT TV turn on effect)
  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return;

    // Animate backdrop
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    // CRT TV turn on effect
    const timeline = gsap.timeline();

    timeline
      // Start as a tiny dot in center
      .set(modalRef.current, {
        scaleX: 0.01,
        scaleY: 0.01,
        opacity: 0.5,
      })
      // Expand to horizontal line
      .to(modalRef.current, {
        scaleX: 1,
        scaleY: 0.02,
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      })
      // Expand vertically to full size
      .to(modalRef.current, {
        scaleY: 1,
        duration: 0.25,
        ease: "power3.out",
      });
  }, []);

  // Close with animation
  const handleClose = () => {
    if (!modalRef.current || !backdropRef.current) return;

    const timeline = gsap.timeline({
      onComplete: onClose,
    });

    // CRT turn off effect - reverse
    timeline
      .to(modalRef.current, {
        scaleY: 0.02,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(
        modalRef.current,
        {
          scaleX: 0.01,
          scaleY: 0.01,
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "+=0.05"
      )
      .to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0
      );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div ref={backdropRef} className="absolute inset-0 bg-black/95" />

      {/* Modal container */}
      <div
        ref={modalRef}
        className="relative w-full"
        style={{ maxWidth: "min(90vw, 48rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actual modal */}
        <div
          className="relative overflow-hidden border-4 bg-black px-8 py-12"
          style={{
            borderColor: accentColor,
            boxShadow: `0 0 60px ${accentColor}40, inset 0 0 60px ${accentColor}10`,
          }}
        >
          {/* Scanline effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${accentColor}20 2px,
                ${accentColor}20 4px
              )`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <h2
                className="text-2xl font-bold tracking-wide sm:text-4xl"
                style={{
                  fontFamily: `var(${uiFont})`,
                  color: accentColor,
                  textShadow: `0 0 20px ${accentColor}80`,
                }}
              >
                <span className="hidden sm:inline">KEYBOARD SHORTCUTS</span>
                <span className="sm:hidden">CONTROLS</span>
              </h2>
              <button
                onClick={handleClose}
                className="text-2xl text-white/70 transition-colors hover:text-white"
                style={{ fontFamily: `var(${uiFont})` }}
                aria-label="Close help"
              >
                ✕
              </button>
            </div>

            {/* Mobile gestures (show on mobile) */}
            <div className="grid gap-4 sm:hidden">
              <div
                className="flex items-center gap-4 border-l-2 px-4 py-3"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}05`,
                }}
              >
                <kbd
                  className="min-w-[4rem] rounded border-2 px-3 py-2 text-center text-xs font-bold"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    boxShadow: `0 0 10px ${accentColor}40`,
                  }}
                >
                  TAP TITLE
                </kbd>
                <span className="text-sm text-white/80" style={{ fontFamily: `var(${uiFont})` }}>
                  Change font
                </span>
              </div>
              <div
                className="flex items-center gap-4 border-l-2 px-4 py-3"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}05`,
                }}
              >
                <kbd
                  className="min-w-[4rem] rounded border-2 px-3 py-2 text-center text-xs font-bold"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    boxShadow: `0 0 10px ${accentColor}40`,
                  }}
                >
                  SWIPE ←→
                </kbd>
                <span className="text-sm text-white/80" style={{ fontFamily: `var(${uiFont})` }}>
                  Change background
                </span>
              </div>
              <div
                className="flex items-center gap-4 border-l-2 px-4 py-3"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}05`,
                }}
              >
                <kbd
                  className="min-w-[4rem] rounded border-2 px-3 py-2 text-center text-xs font-bold"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    boxShadow: `0 0 10px ${accentColor}40`,
                  }}
                >
                  SWIPE ↑↓
                </kbd>
                <span className="text-sm text-white/80" style={{ fontFamily: `var(${uiFont})` }}>
                  Change colors
                </span>
              </div>
              <div
                className="flex items-center gap-4 border-l-2 px-4 py-3"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}05`,
                }}
              >
                <kbd
                  className="min-w-[4rem] rounded border-2 px-3 py-2 text-center text-xs font-bold"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    boxShadow: `0 0 10px ${accentColor}40`,
                  }}
                >
                  2× TAP
                </kbd>
                <span className="text-sm text-white/80" style={{ fontFamily: `var(${uiFont})` }}>
                  Randomize all
                </span>
              </div>
              <div
                className="flex items-center gap-4 border-l-2 px-4 py-3"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}05`,
                }}
              >
                <kbd
                  className="min-w-[4rem] rounded border-2 px-3 py-2 text-center text-xs font-bold"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    boxShadow: `0 0 10px ${accentColor}40`,
                  }}
                >
                  HOLD
                </kbd>
                <span className="text-sm text-white/80" style={{ fontFamily: `var(${uiFont})` }}>
                  View favorites
                </span>
              </div>
            </div>

            {/* Keyboard shortcuts (show on desktop) */}
            <div className="hidden grid-cols-2 gap-4 sm:grid">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center gap-4 border-l-2 px-4 py-3"
                  style={{
                    borderColor: `${accentColor}40`,
                    backgroundColor: `${accentColor}05`,
                  }}
                >
                  {/* Key display */}
                  <kbd
                    className="min-w-[3rem] rounded border-2 px-3 py-2 text-center font-mono text-sm font-bold uppercase"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                      backgroundColor: `${accentColor}10`,
                      boxShadow: `0 0 10px ${accentColor}40`,
                    }}
                  >
                    {shortcut.key === " "
                      ? "SPACE"
                      : shortcut.key === "Escape"
                      ? "ESC"
                      : shortcut.key}
                  </kbd>

                  {/* Description */}
                  <span
                    className="text-sm text-white/80"
                    style={{ fontFamily: `var(${uiFont})` }}
                  >
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p
              className="mt-8 text-center text-xs text-white/50"
              style={{ fontFamily: `var(${uiFont})` }}
            >
              <span className="hidden sm:inline">
                Press <kbd className="rounded bg-white/10 px-2 py-1">?</kbd> or{" "}
                <kbd className="rounded bg-white/10 px-2 py-1">ESC</kbd> to close
              </span>
              <span className="sm:hidden">Tap anywhere to close</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
