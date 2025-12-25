"use client";

// Mobile gesture detection (swipe, double tap, long press)
// Uses passive event listeners for performance

import { useEffect, type RefObject } from "react";

export interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  threshold?: number; // Minimum distance for swipe (default: 50px)
}

/**
 * Hook to detect mobile gestures on a container element
 *
 * @param containerRef - Ref to the element to attach gesture listeners
 * @param config - Gesture configuration with handlers
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * useSwipeGesture(containerRef, {
 *   onSwipeLeft: () => loadNextBackground(),
 *   onSwipeRight: () => loadPrevBackground(),
 *   onDoubleTap: () => randomizeAll(),
 *   onLongPress: () => setShowFavorites(true),
 * });
 *
 * return <div ref={containerRef}>...</div>;
 * ```
 */
export function useSwipeGesture(
  containerRef: RefObject<HTMLElement | null>,
  config: SwipeGestureConfig
) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onDoubleTap,
    onLongPress,
    threshold = 50,
  } = config;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTapTime = 0;
    let longPressTimer: NodeJS.Timeout | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();

      // Start long press timer
      if (onLongPress) {
        longPressTimer = setTimeout(() => {
          onLongPress();
          longPressTimer = null;
        }, 500); // 500ms for long press
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Cancel long press if finger moves
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Cancel long press timer if still active
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;

      // Swipe detection (horizontal movement > vertical movement)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
        return;
      }

      // Double tap detection (within 300ms)
      if (onDoubleTap && deltaTime < 200) {
        const now = Date.now();
        if (now - lastTapTime < 300) {
          onDoubleTap();
        }
        lastTapTime = now;
      }
    };

    // Passive listeners for better scroll performance
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      if (longPressTimer) clearTimeout(longPressTimer);
    };
  }, [
    containerRef,
    onSwipeLeft,
    onSwipeRight,
    onDoubleTap,
    onLongPress,
    threshold,
  ]);
}
