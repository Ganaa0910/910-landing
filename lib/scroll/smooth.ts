import Lenis from "lenis";

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
let raf = 0;

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

  const frame = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
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
