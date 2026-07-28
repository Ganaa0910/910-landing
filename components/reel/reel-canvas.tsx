"use client";

import { useEffect, useRef } from "react";
import { createReel, type ReelHandle } from "@/lib/reel/engine";

/* The persistent object.
 *
 * This lives in the root layout, which App Router does not remount when you
 * navigate between routes that share it. So the same canvas element — and
 * the same rAF loop, and the same ball position — survives going from the
 * home page to the work index. The route only chooses a pose; the engine
 * eases the object there from wherever it currently is.
 *
 * Deliberately dumb: no usePathname, no route effect. The engine reads
 * location.pathname itself once a frame. Driving it from React as well
 * meant two writers disagreeing during StrictMode's mount/unmount/mount,
 * and every disagreement reset the morph clock so the object never moved.
 * One owner, one source of truth.
 *
 * Everything else about a section — the mark, the motto, the copy, the work
 * rows — still belongs to its own page. Only the object is shared. */
export function ReelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<ReelHandle | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const handle = createReel(canvasRef.current);
    handleRef.current = handle;
    return () => {
      handle.destroy();
      if (handleRef.current === handle) handleRef.current = null;
    };
  }, []);

  return <canvas className="reel-canvas" ref={canvasRef} aria-hidden="true" />;
}
