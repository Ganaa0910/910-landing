"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/scroll/smooth";

/* Renders nothing; it exists to own the smooth-scroll instance's lifetime.
 *
 * Lenis subscribes to the shared ticker at priority 0, so it advances the
 * scroll before every other subscriber reads it — see lib/frame/ticker.ts.
 * The old guarantee ("mount me above ReelCanvas so my rAF callback registers
 * first") was a coincidence of React mount order, not a contract. */
export function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
