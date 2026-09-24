/* Work-gallery progress, published once per frame by the cover flow and
 * read by the reel engine's rail pose.
 *
 * This used to travel through a CSS custom property: the gallery wrote
 * --work-p onto documentElement and the engine read it back with
 * getComputedStyle every frame — a forced style recalc per frame just to
 * move one number between two scripts that live in the same page. A module
 * store does the same job with zero browser work. */

type Listener = (p: number) => void;

/* null = nothing published yet this mount; readers fall back to their own
   geometry for the frames before the gallery has measured */
let value: number | null = null;
const listeners = new Set<Listener>();

export function publishWorkProgress(p: number) {
  value = p;
  for (const l of listeners) l(p);
}

export function resetWorkProgress() {
  value = null;
}

export function getWorkProgress(): number | null {
  return value;
}

export function onWorkProgress(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
