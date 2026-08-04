"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/scroll/smooth";

/* Renders nothing; it exists to own the smooth-scroll instance's lifetime.
 *
 * Mounted ABOVE <ReelCanvas /> in the root layout on purpose. Both run a rAF
 * loop, and this one has to advance the scroll position before the canvas
 * reads it, or the object is drawing one frame behind the page. Mounting
 * first puts its callback first in the queue. */
export function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
