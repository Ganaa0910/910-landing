"use client";

// Background crossfade transition system
// Manages smooth GSAP transitions between WebGL backgrounds without page reload

import { useState, useCallback, useRef } from "react";
import gsap from "gsap";

export interface BackgroundState {
  element: React.ReactElement;
  key: string;
}

/**
 * Hook to manage smooth background transitions with GSAP crossfade
 *
 * Handles two WebGL canvases simultaneously during transition for smooth blend,
 * then cleans up the old background to free memory.
 *
 * @param initialBackground - Starting background element
 *
 * @returns Object with current/next backgrounds, transition state, and transitionTo function
 *
 * @example
 * ```tsx
 * const { current, next, isTransitioning, currentRef, nextRef, transitionTo } =
 *   useBackgroundTransition({ element: <Particles />, key: "particles-0" });
 *
 * // Render
 * <div className="fixed inset-0">
 *   <div ref={currentRef} className="absolute inset-0">
 *     {current.element}
 *   </div>
 *   {isTransitioning && next && (
 *     <div ref={nextRef} className="absolute inset-0 opacity-0">
 *       {next.element}
 *     </div>
 *   )}
 * </div>
 *
 * // Trigger transition
 * transitionTo({ element: <ColorBends />, key: "colorbends-1" });
 * ```
 */
export function useBackgroundTransition(initialBackground: BackgroundState) {
  const [current, setCurrent] = useState<BackgroundState>(initialBackground);
  const [next, setNext] = useState<BackgroundState | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Transition to a new background with GSAP crossfade
   */
  const transitionTo = useCallback(
    (nextBackground: BackgroundState, instant: boolean = false) => {
      // Prevent overlapping transitions
      if (isTransitioning) {
        console.warn("⚠️ Transition already in progress, ignoring new request");
        return;
      }

      // Don't transition if it's the same background
      if (nextBackground.key === current.key) {
        console.log("Same background, skipping transition");
        return;
      }

      console.log(`🎨 Transitioning: ${current.key} → ${nextBackground.key}`);

      setNext(nextBackground);
      setIsTransitioning(true);

      // Instant transition (for prefers-reduced-motion or initial load from URL)
      if (instant) {
        setCurrent(nextBackground);
        setNext(null);
        setIsTransitioning(false);
        return;
      }

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Wait for React to render the next element before animating
      // This prevents "GSAP target null not found" errors
      requestAnimationFrame(() => {
        // Double RAF to ensure DOM is ready
        requestAnimationFrame(() => {
          // Safety check - refs must exist
          if (!currentRef.current || !nextRef.current) {
            console.warn("⚠️ Refs not ready, falling back to instant transition");
            setCurrent(nextBackground);
            setNext(null);
            setIsTransitioning(false);
            return;
          }

          // GSAP crossfade timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // CRITICAL: Reset opacity on currentRef before swapping
              // Otherwise it stays at opacity: 0 from the animation
              if (currentRef.current) {
                gsap.set(currentRef.current, { opacity: 1 });
              }

              // Cleanup: current becomes next, next becomes null
              setCurrent(nextBackground);
              setNext(null);
              setIsTransitioning(false);
              timelineRef.current = null;
              console.log("✅ Transition complete");
            },
          });

          timelineRef.current = tl;

          // Crossfade animation (overlap for smooth blend)
          // Current fades out fast, next fades in
          tl.to(
            currentRef.current,
            {
              opacity: 0,
              duration: 0.3, // Faster fade out to prevent "flash"
              ease: "power2.in",
            },
            0
          ).fromTo(
            nextRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            0.1 // Start earlier for quicker swap
          );
        });
      });
    },
    [current.key, isTransitioning]
  );

  return {
    current,
    next,
    isTransitioning,
    currentRef,
    nextRef,
    transitionTo,
  };
}
