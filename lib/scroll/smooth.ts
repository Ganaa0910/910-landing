import Lenis from "lenis";
import { onFrame } from "@/lib/frame/ticker";

/* Smooth scrolling, as a module singleton rather than React state.
 *
 * The reel's canvas engine reads the scroll position straight off
 * getBoundingClientRect() once a frame and never goes through React — so the
 * thing that owns the scroll position has to be reachable the same way, from
 * anywhere, without a provider in between.
 *
 * Lenis drives the real window scroll rather than transforming a wrapper,
 * which is the only reason any of this works here: the whole reel is a
 * position:sticky stage inside a 620vh track, and a transformed wrapper
 * breaks sticky outright. Native scroll position, just interpolated.
 *
 * Anything that moves the page programmatically must go through here too.
 * A raw window.scrollTo sets a position Lenis is still lerping away from, so
 * the two fight and the page snaps back. */

let lenis: Lenis | null = null;

/* Per frame, the fraction of the remaining distance to close. Lower is
   glassier and laggier; higher is tighter and closer to raw scroll. 0.1 is
   Lenis's own default and reads as roughly a 165ms time constant at 60fps.
   This is THE feel knob — if the page reads floaty, raise it. */
const LERP = 0.1;

export function startSmoothScroll(): () => void {
  /* honour the OS setting: interpolating someone's scroll when they have
     asked for less motion is exactly the thing they turned off */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  lenis?.destroy();
  lenis = new Lenis({
    lerp: LERP,
    /* Touch is left alone. Phones already scroll with momentum, and taking
       that over trades a good native feel for a worse emulated one. This is
       for wheels and trackpads, which are the ones that arrive in ~100px
       lumps. */
    syncTouch: false,
    smoothWheel: true,
  });

  /* Priority 0: runs before every other subscriber, so everything reading
     the scroll position this frame — the reel canvas, the cover flow — sees
     the position AFTER it advanced. That ordering used to rest on React
     mount order, which nothing guarantees; now it is explicit. */
  const stop = onFrame((time) => lenis?.raf(time), 0);

  return () => {
    stop();
    lenis?.destroy();
    lenis = null;
  };
}

/* Jump the page, cooperating with the interpolation instead of fighting it.
   `immediate` lands this frame — for restoring a remembered position, where
   watching the page glide to where you already were is just a delay. */
export function scrollPageTo(y: number, opts?: { immediate?: boolean }) {
  if (lenis) {
    lenis.scrollTo(y, { immediate: opts?.immediate ?? false });
    return;
  }
  /* reduced motion, or before the singleton is up */
  window.scrollTo({ top: y, behavior: opts?.immediate ? "auto" : "smooth" });
}

/* Slow start, fast middle, long settle — a camera pulling off a planet and
   easing into the constellation, rather than a linear pan. */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* Play a stretch of the page on a clock instead of on the wheel.
 *
 * The reel is scrubbed end to end, so "auto-play this transition" and "scroll
 * the page through it" are the same sentence — animating the scroll position
 * animates everything downstream for free, and scrolling back out still
 * unwinds it, because no separate state was created to get out of sync.
 *
 * Crucially this does NOT lock anything. Lenis handles a user wheel by
 * retargeting from its current target, so touching the wheel mid-glide simply
 * takes the scroll back. That is the difference between a transition that
 * plays for you and the old timed cue that played AT you: this one hands over
 * the moment you disagree with it.
 *
 * Returns false if there is no instance to drive — reduced motion, or before
 * mount — so the caller can leave the scrub alone. */
export function glidePageTo(y: number, seconds: number): boolean {
  if (!lenis) return false;
  lenis.scrollTo(y, { duration: seconds, easing: easeInOutCubic });
  return true;
}
