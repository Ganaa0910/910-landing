/* One rAF loop for everything that moves per frame.
 *
 * There used to be three independent loops — Lenis's scroll advance, the
 * cover-flow gallery, and the reel canvas engine — each with its own
 * requestAnimationFrame. Callback order within a frame is registration
 * order, and registration order depended on mount order, which React does
 * not guarantee (StrictMode mounts/unmounts/remounts; the gallery mounts
 * long after the layout effects in the root). Any frame where the canvas or
 * the gallery read the scroll position BEFORE Lenis had advanced it drew a
 * frame behind the page — the micro-stutter that read as "janky but why".
 *
 * One loop, one clock, explicit priorities. Subscribers run lowest number
 * first, every frame: 0 = scroll advance, 10 = things that publish scroll-
 * derived values, 20 = things that read them. A late subscriber that needs
 * an earlier one's output is guaranteed to see this frame's value.
 *
 * The loop idles when nothing is subscribed, so routes without motion cost
 * nothing. */

type Tick = (now: number, dt: number) => void;

type Sub = { tick: Tick; priority: number };

const subs = new Set<Sub>();
let sorted: Sub[] = [];
let raf = 0;
let last = 0;

function frame(now: number) {
  raf = requestAnimationFrame(frame);
  /* clamp dt so a background tab return doesn't fling every lerp to its
     target in one frame */
  const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
  last = now;
  for (let i = 0; i < sorted.length; i++) sorted[i].tick(now, dt);
}

function resort() {
  sorted = [...subs].sort((a, b) => a.priority - b.priority);
}

export function onFrame(tick: Tick, priority: number): () => void {
  const sub: Sub = { tick, priority };
  subs.add(sub);
  resort();
  if (!raf) {
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  return () => {
    subs.delete(sub);
    resort();
    if (!subs.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
