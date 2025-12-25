"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ToastProps {
  message: string;
  accentColor: string;
  uiFont: string;
  duration?: number; // Duration in ms (default: 2000)
  onClose: () => void;
}

export function Toast({
  message,
  accentColor,
  uiFont,
  duration = 2000,
  onClose,
}: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    // Slide in from bottom with fade
    tl.fromTo(
      toastRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      }
    )
      // Hold
      .to({}, { duration: duration / 1000 })
      // Slide out with fade
      .to(toastRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
      });

    return () => {
      tl.kill();
    };
  }, [duration, onClose]);

  return (
    <div
      ref={toastRef}
      className="pointer-events-none fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2"
    >
      <div
        className="flex items-center gap-3 border-2 px-6 py-4 backdrop-blur-sm"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}20`,
          boxShadow: `0 0 30px ${accentColor}40, inset 0 0 30px ${accentColor}10`,
        }}
      >
        {/* Icon */}
        <div
          className="text-2xl"
          style={{
            color: accentColor,
            textShadow: `0 0 10px ${accentColor}`,
          }}
        >
          ✓
        </div>

        {/* Message */}
        <p
          className="font-mono text-sm font-bold uppercase tracking-wider"
          style={{
            fontFamily: `var(${uiFont})`,
            color: accentColor,
            textShadow: `0 0 10px ${accentColor}80`,
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

/**
 * Toast manager hook - manages displaying toasts with auto-dismiss
 *
 * @example
 * ```tsx
 * const { showToast, toast } = useToast();
 *
 * // Show toast
 * showToast("Saved to favorites!");
 *
 * // Render
 * {toast && (
 *   <Toast
 *     message={toast}
 *     accentColor={accentColor}
 *     uiFont={uiFont}
 *     onClose={() => showToast(null)}
 *   />
 * )}
 * ```
 */
export function useToast() {
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = React.useCallback((message: string | null) => {
    setToast(message);
  }, []);

  return { toast, showToast };
}
