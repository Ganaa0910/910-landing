"use client";

// Background transition system with TV static effect
// Shows CRT static noise during background swap to hide any flashing

import { useState, useCallback, useRef } from "react";

export interface BackgroundState {
  element: React.ReactElement;
  key: string;
}

/**
 * Hook to manage background transitions with TV static effect
 *
 * Instead of crossfading (which can flash), shows TV static during the swap.
 * The static covers the transition, making timing issues invisible.
 *
 * @param initialBackground - Starting background element
 *
 * @returns Object with current background, static state, and transition controls
 *
 * @example
 * ```tsx
 * const { current, showStatic, transitionTo, handleStaticMidpoint, handleStaticComplete } =
 *   useBackgroundTransition({ element: <Particles />, key: "particles-0" });
 *
 * // Render
 * <div className="fixed inset-0">
 *   <div className="absolute inset-0">{current.element}</div>
 *   <TVStatic
 *     visible={showStatic}
 *     onMidpoint={handleStaticMidpoint}
 *     onComplete={handleStaticComplete}
 *   />
 * </div>
 *
 * // Trigger transition
 * transitionTo({ element: <ColorBends />, key: "colorbends-1" });
 * ```
 */
export function useBackgroundTransition(initialBackground: BackgroundState) {
  const [current, setCurrent] = useState<BackgroundState>(initialBackground);
  const [showStatic, setShowStatic] = useState(false);

  // Store pending background during static animation
  const pendingBackgroundRef = useRef<BackgroundState | null>(null);
  const isTransitioningRef = useRef(false);

  /**
   * Transition to a new background with TV static effect
   * @param instant - If true, skip static and swap immediately (for palette changes)
   */
  const transitionTo = useCallback(
    (nextBackground: BackgroundState, instant: boolean = false) => {
      // Prevent overlapping transitions
      if (isTransitioningRef.current) {
        console.warn("⚠️ Transition already in progress, queuing...");
        pendingBackgroundRef.current = nextBackground;
        return;
      }

      // Don't transition if it's the same background
      if (nextBackground.key === current.key) {
        return;
      }

      console.log(`🎨 Transitioning: ${current.key} → ${nextBackground.key}`);

      // Instant transition (for palette changes or reduced motion)
      if (instant) {
        setCurrent(nextBackground);
        return;
      }

      // Start TV static transition
      isTransitioningRef.current = true;
      pendingBackgroundRef.current = nextBackground;
      setShowStatic(true);
    },
    [current.key]
  );

  /**
   * Called by TVStatic at midpoint - swap the background now (hidden by static)
   */
  const handleStaticMidpoint = useCallback(() => {
    if (pendingBackgroundRef.current) {
      console.log("📺 Static midpoint - swapping background");
      setCurrent(pendingBackgroundRef.current);
    }
  }, []);

  /**
   * Called by TVStatic when animation completes - cleanup
   */
  const handleStaticComplete = useCallback(() => {
    console.log("✅ Transition complete");
    setShowStatic(false);
    pendingBackgroundRef.current = null;
    isTransitioningRef.current = false;
  }, []);

  return {
    current,
    showStatic,
    transitionTo,
    handleStaticMidpoint,
    handleStaticComplete,
  };
}
