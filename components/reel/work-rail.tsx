"use client";

import { useEffect, useRef } from "react";

/* The globe's third life. On the home page it is a planet, then a bearing
 * running the Diamond of Virgo. Here it rolls in from the left, shrinks,
 * and becomes the vertical index for the work — one checkpoint per project,
 * lighting as you reach it. Same square-dot language as everything else. */

const PAPER = "#FBF9F6";
const INK = "#2B221F";
const ACCENT = "#2660E8";

const ROLL_MS = 1150;
const BALL_R = 13;

/* deterministic jitter so the rail reads hand-stamped, not printed */
const h1 = (n: number) => {
  const v = Math.sin(n * 127.1) * 43758.5453;
  return v - Math.floor(v);
};
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

export function WorkRail({ count }: { count: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = () => [...document.querySelectorAll<HTMLElement>(".work-item")];

    let raf = 0;
    let t0 = 0;
    let starImgReady = false;
    const starImg = new Image();
    starImg.onload = () => { starImgReady = true; };
    starImg.src = "/star.svg";

    /* how far down the project list we are, 0..1 */
    function scrollProgress(): number {
      const els = items();
      if (els.length < 2) return 0;
      const first = els[0].getBoundingClientRect();
      const last = els[els.length - 1].getBoundingClientRect();
      const mid = window.innerHeight * 0.42;
      const span = last.top - first.top;
      if (span <= 0) return 0;
      return clamp01((mid - first.top) / span);
    }

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!t0) t0 = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = cv.clientWidth, H = cv.clientHeight;
      if (!W || !H) return;
      if (cv.width !== W * dpr || cv.height !== H * dpr) {
        cv.width = W * dpr;
        cv.height = H * dpr;
      }
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      /* the roll-in: the ball arrives from off to the left at globe scale
         and settles onto the rail. Once per mount. */
      const roll = reduced.matches ? 1 : ease(clamp01((now - t0) / ROLL_MS));

      const railX = W * 0.5;
      const y0 = H * 0.20, y1 = H * 0.80;

      const p = scrollProgress();
      const restY = lerp(y0, y1, p);

      const cx = lerp(-W * 2.2, railX, roll);
      const cy = lerp(H * 0.5, restY, roll);
      const r = lerp(64, BALL_R, roll);

      /* rail — square dots, denser where it has been travelled */
      const pitch = 9;
      ctx.fillStyle = INK;
      for (let i = 0, y = y0; y <= y1; y += pitch, i++) {
        const passed = y <= restY;
        const jx = (h1(i * 1.7) - 0.5) * 1.6;
        const sz = (passed ? 2.6 : 2.1) * (0.85 + h1(i * 5.1) * 0.3);
        ctx.globalAlpha = roll * (passed ? 0.6 : 0.16);
        ctx.save();
        ctx.translate(railX + jx, y);
        ctx.rotate((h1(i * 7.9) - 0.5) * 0.5);
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        ctx.restore();
      }

      /* one checkpoint per project */
      for (let i = 0; i < count; i++) {
        const f = count > 1 ? i / (count - 1) : 0.5;
        const y = lerp(y0, y1, f);
        const reached = p >= f - 0.02;

        if (reached && starImgReady) {
          const g = 26;
          ctx.globalAlpha = roll;
          ctx.drawImage(starImg, railX - g / 2, y - g / 2, g, g);
        } else {
          const k = 9;
          ctx.globalAlpha = roll * 0.5;
          ctx.strokeStyle = INK;
          ctx.lineWidth = 1.5;
          ctx.save();
          ctx.translate(railX, y);
          ctx.rotate((h1(i * 11.3) - 0.5) * 0.2);
          ctx.strokeRect(-k / 2, -k / 2, k, k);
          ctx.restore();
        }

        /* project number, set against the rail */
        ctx.globalAlpha = roll * (reached ? 0.85 : 0.32);
        ctx.fillStyle = reached ? ACCENT : INK;
        ctx.font = "600 9px ui-monospace, 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i + 1).padStart(2, "0"), railX, y + 20);
      }

      /* the ball itself */
      ctx.globalAlpha = 1;
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      /* a paper core so it reads as the same object, inverted */
      ctx.fillStyle = PAPER;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1.5, r * 0.28), 0, Math.PI * 2);
      ctx.fill();
    };

    raf = requestAnimationFrame(draw);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count]);

  return <canvas className="work-rail" ref={canvasRef} aria-hidden="true" />;
}
