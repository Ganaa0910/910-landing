"use client";

import { useEffect, useRef } from "react";

/* An ambient dither field behind a case study.
 *
 * The client's own line art — masks, a fiddle, a dancer — sampled onto a
 * coarse grid and redrawn as dither squares, the same language the 910 mark
 * and the reel's globe are built from. So the artwork shows up as texture
 * belonging to this site rather than as a row of framed clip art.
 *
 * It cross-fades between motifs and drifts. Everything is drawn in
 * --cs-accent at a low alpha, so it inherits whichever palette the page is
 * wearing and never needs a colour of its own.
 *
 * Sits at z-index 0 with the content lifted to 1 rather than being given a
 * negative z-index: negative would drop it behind .case-study's own
 * background and disappear entirely. */

/* 4×4 Bayer matrix, normalised. An ordered threshold rather than random
   noise — random dithering shimmers between frames, and this has to hold
   still enough to read as a figure while it drifts. */
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

const CELL = 7; /* px per dither cell at 1× */
const DOT = 0.62; /* square size as a fraction of the cell */
const HOLD = 7000; /* ms a motif is fully on screen */
const FADE = 2600; /* ms of cross-fade between motifs */

type Field = { w: number; h: number; data: Float32Array };

/* Render one source into a coarse luminance/alpha grid. Line art is mostly
   transparent, so alpha is the signal; anything with real pixels falls back
   to darkness. */
function sample(img: HTMLImageElement, cols: number, rows: number): Field {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  const data = new Float32Array(cols * rows);
  /* cols/rows come from clientWidth, which is 0 whenever the field is not
     laid out — and it is display:none under 900px. A zero-sized canvas makes
     getImageData below throw IndexSizeError, which surfaced as an unhandled
     rejection on every case study opened at a phone width. */
  if (!ctx || cols < 1 || rows < 1) return { w: cols, h: rows, data };

  /* contain, so a tall mask and a wide illustration both land inside the
     grid at their own proportions instead of being stretched to it */
  const scale = Math.min(cols / img.width, rows / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);

  const px = ctx.getImageData(0, 0, cols, rows).data;
  for (let i = 0; i < cols * rows; i++) {
    const a = px[i * 4 + 3] / 255;
    if (a < 0.04) {
      data[i] = 0;
      continue;
    }
    const lum = (px[i * 4] * 0.299 + px[i * 4 + 1] * 0.587 + px[i * 4 + 2] * 0.114) / 255;
    data[i] = a * (1 - lum);
  }

  /* These are outline drawings — one-pixel strokes at this grid size, so
     sampled raw almost nothing clears the Bayer threshold and the field
     reads as scattered dots rather than as a figure. Dilating twice
     thickens the contours to something the dither can actually describe,
     with each pass falling off so the stroke keeps a soft edge instead of
     turning into a blob. */
  let src = data;
  for (const falloff of [0.72, 0.46]) {
    const out = new Float32Array(src.length);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        let max = src[i];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
            const v = src[ny * cols + nx] * falloff;
            if (v > max) max = v;
          }
        }
        out[i] = max;
      }
    }
    src = out;
  }

  /* lift what survived — the dilated contour should sit well above the
     matrix, so the silhouette is legible even at low alpha */
  for (let i = 0; i < src.length; i++) src[i] = Math.min(1, src[i] * 1.9);

  return { w: cols, h: rows, data: src };
}

export function AmbientDither({
  sources,
  opacity = 0.2,
}: {
  sources: string[];
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let fields: Field[] = [];
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let raf = 0;
    let start = 0;
    let dead = false;

    /* the accent the page is currently wearing */
    const accent =
      getComputedStyle(canvas).getPropertyValue("--cs-accent").trim() || "#2660E8";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
    };

    const draw = (now: number) => {
      if (dead || !fields.length) return;
      if (!start) start = now;
      const t = now - start;

      const span = HOLD + FADE;
      const idx = Math.floor(t / span) % fields.length;
      const next = (idx + 1) % fields.length;
      const into = t % span;
      /* smoothstep the cross-fade so motifs arrive and leave softly */
      const raw = into < HOLD ? 0 : (into - HOLD) / FADE;
      const mix = raw * raw * (3 - 2 * raw);

      /* a slow lateral drift, well under one cell per second */
      const driftX = reduced ? 0 : Math.sin(t / 14000) * 26;
      const driftY = reduced ? 0 : Math.cos(t / 19000) * 18;

      const a = fields[idx];
      const b = fields[next];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = accent;
      ctx.globalAlpha = opacity;

      const size = CELL * DOT;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * a.w + x;
          if (i >= a.data.length) continue;
          const v = a.data[i] * (1 - mix) + (b.data[i] ?? 0) * mix;
          if (v <= 0.02) continue;
          /* ordered threshold — the cell survives if its value beats its
             slot in the Bayer matrix */
          if (v < BAYER[y & 3][x & 3]) continue;
          ctx.fillRect(
            x * CELL + driftX,
            y * CELL + driftY,
            size,
            size,
          );
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const build = async () => {
      resize();
      const loaded = await Promise.all(
        sources.map(
          (src) =>
            new Promise<HTMLImageElement | null>((res) => {
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.onload = () => res(img);
              img.onerror = () => res(null);
              img.src = src;
            }),
        ),
      );
      if (dead) return;
      fields = loaded
        .filter((i): i is HTMLImageElement => !!i)
        .map((img) => sample(img, cols, rows));
      if (!fields.length) return;
      raf = requestAnimationFrame(draw);
    };

    void build();

    /* re-sampling on every resize tick is expensive, so debounce it */
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        cancelAnimationFrame(raf);
        start = 0;
        void build();
      }, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      dead = true;
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [sources, opacity]);

  return <canvas ref={ref} className="cs-dither" aria-hidden="true" />;
}
