/* 910studio — S1→S4 scroll reel.
 *
 * One canvas carries a single object the length of the page: globe (S1/S2)
 * → bearing on a constellation rail (S3) → back to globe, dived into, and
 * out the other side as a sunrise (S4). Ported from the standalone
 * prototype in v2-moodboard/s1-hero.html; the render maths is unchanged.
 *
 * Everything is scoped to the mounted root so React can tear it down. */

/* eslint-disable @typescript-eslint/no-unused-vars */

export type ReelHandle = { destroy: () => void };

type Pt = [number, number];
type Lobe = { x: number; y: number; r: number };
type CloudBmp = { cvs: HTMLCanvasElement; x0: number; y0: number };
type Cloud = { x: number; y: number; R: number; v: number; seed: number; lobes: Lobe[]; bmp: CloudBmp };
type Sunset = { c: HTMLCanvasElement; hz: number; sx: number; sy: number; sr: number; W: number; H: number; clouds: Cloud[] };
type RailGeom = { pts: Pt[]; cum: number[]; total: number; vertex: number[]; W: number; H: number };
type Star = { x: number; y: number; s: number; ph: number; sp: number; rot: number; big: boolean };
type Planet = { x: number; y: number; r: number; sp: number; ph: number };
type Sky = { stars: Star[]; planets: Planet[]; W: number; H: number };
type Cue = { v: number; on: boolean; from: number; target: number; t0: number; ms: number; dur: number };
type StarSpec = { name: string; cx: number; cy: number; side: "top" | "right" | "bottom" | "left" };


export function createReel(root: HTMLElement): ReelHandle {

  /* ═══════════════════════════════════════════════════════════
     DOTTED GLOBE — orthographic dot-map, spin + scroll-driven pan
     Source: market-iq-fe/design/dotted-globe.html
     Changes: precomputed land mask (was ~1.0ms/frame of point-in-
     polygon → ~0.19ms of array lookups), rAF spin, dome mode,
     scroll-driven camera (centre / radius / tilt / longitude all
     interpolate), reduced-motion + offscreen pause.
     ═══════════════════════════════════════════════════════════ */

  /* coarse but recognizable continent polygons [lon,lat] */
  const LAND = [
    /* North America */
    [[-168,65],[-160,71],[-140,70],[-124,70],[-95,73],[-82,73],[-64,60],[-56,52],[-66,47],[-70,42],[-74,40],[-81,31],[-90,29],[-97,26],[-106,23],[-110,30],[-117,33],[-124,40],[-124,48],[-133,55],[-141,60],[-155,59],[-166,62]],
    /* Central America bridge */
    [[-92,18],[-83,15],[-78,9],[-82,8],[-88,13],[-95,16]],
    /* South America */
    [[-79,9],[-72,11],[-62,10],[-50,0],[-44,-3],[-35,-6],[-40,-14],[-48,-25],[-58,-35],[-66,-45],[-72,-52],[-74,-50],[-71,-38],[-70,-24],[-72,-16],[-78,-6],[-81,0]],
    /* Africa */
    [[-17,15],[-16,21],[-9,31],[10,37],[24,32],[33,31],[43,12],[51,12],[48,3],[41,-3],[40,-15],[33,-26],[25,-34],[18,-35],[13,-18],[9,4],[-2,5],[-11,7]],
    /* Europe */
    [[-10,36],[-9,44],[-3,49],[2,51],[8,54],[6,58],[12,58],[24,60],[30,70],[42,68],[40,50],[28,41],[19,40],[9,44],[-2,43]],
    /* Asia */
    [[40,50],[35,45],[40,40],[48,40],[45,55],[60,68],[75,73],[100,77],[135,73],[160,69],[178,66],[170,60],[150,59],[142,54],[140,45],[135,43],[130,35],[126,34],[122,30],[121,22],[109,21],[106,10],[98,8],[95,16],[88,22],[80,10],[77,8],[73,20],[67,24],[57,25],[50,30],[44,38]],
    /* Arabian */
    [[35,30],[43,15],[52,16],[57,22],[48,30],[40,32]],
    /* Australia */
    [[113,-22],[122,-17],[131,-12],[137,-12],[143,-11],[147,-20],[153,-28],[150,-38],[141,-39],[130,-32],[118,-35],[114,-30]],
    /* Greenland */
    [[-45,60],[-30,60],[-20,70],[-22,80],[-40,83],[-58,80],[-55,68]],
    /* UK / Japan / NZ */
    [[-6,50],[-2,52],[-1,58],[-6,58],[-8,54]],
    [[130,31],[136,35],[141,40],[142,44],[138,42],[133,34]],
    [[166,-37],[174,-38],[178,-41],[173,-46],[168,-45]],
  ];

  /* bbox per polygon so the mask build can cull fast */
  const BBOX = LAND.map(p => {
    let x0=180, x1=-180, y0=90, y1=-90;
    for (const [lo,la] of p) { if(lo<x0)x0=lo; if(lo>x1)x1=lo; if(la<y0)y0=la; if(la>y1)y1=la; }
    return [x0,x1,y0,y1];
  });

  function inPoly(lon: number, lat: number, poly: readonly (readonly number[])[]) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }

  /* 1° land mask, built once. lon -180..179, lat -90..89 */
  const MASK = (() => {
    const m = new Uint8Array(360 * 180);
    for (let li = 0; li < 180; li++) {
      const lat = li - 90 + 0.5;
      for (let oi = 0; oi < 360; oi++) {
        const lon = oi - 180 + 0.5;
        for (let p = 0; p < LAND.length; p++) {
          const b = BBOX[p];
          if (lon < b[0] || lon > b[1] || lat < b[2] || lat > b[3]) continue;
          if (inPoly(lon, lat, LAND[p])) { m[li * 360 + oi] = 1; break; }
        }
      }
    }
    return m;
  })();

  const isLand = (lon: number, lat: number) => {
    const li = Math.floor(lat) + 90, oi = Math.floor(lon) + 180;
    if (li < 0 || li > 179 || oi < 0 || oi > 359) return false;
    return MASK[li * 360 + oi] === 1;
  };

  const DEG = Math.PI / 180;
  const clamp01 = (v: number) => v < 0 ? 0 : v > 1 ? 1 : v;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  /* smootherstep — no velocity discontinuity at either end of the scroll */
  const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

  /* Ulaanbaatar */
  const UB_LON = 105, UB_LAT = 47;
  /* the ball the globe becomes */
  const BALL_R = 32;

  /* the map is ink-on-paper in S1/S2 and has to survive the ground going
     dark in S3, so its ink inverts to paper on the way down */
  const INK_RGB = [43, 34, 31], PAPER_RGB = [251, 249, 246];
  const mixInk = (t: number) => INK_RGB.map((v, i) => Math.round(lerp(v, PAPER_RGB[i], t)));

  /* live params — wired to the dev strip */
  const P = {
    speed: 8,        // deg/sec
    dotsAcross: 170, // dots across the full diameter
    tilt: 0,         // PHI0 at rest, degrees
    dotScale: 0.19,  // dot radius as fraction of grid step
    square: true,
    graticule: true,
    gratAlpha: 0.70,
    star: true,
    starSize: 0.08,  // star width as a fraction of globe diameter
    ink: "#2B221F",
    accent: "#2660E8",
    paper: "#FBF9F6",
  };

  /* free-running spin angle; the displayed longitude blends this toward
     Ulaanbaatar as the scroll progresses */
  let spinAngle = 60;

  /* ── star mark ──────────────────────────────────────
     public/star.svg is 174KB of dot paths — decoding that per frame would
     be absurd, so rasterise once per size and blit the bitmap. */
  const starImg = new Image();
  let starReady = false;
  starImg.onload = () => { starReady = true; dirty = true; };
  starImg.src = "/star.svg";

  const starCache = new Map();
  function starBitmap(px: number) {
    const need = Math.max(8, Math.round(px));
    let c = starCache.get(need);
    if (c) return c;
    c = document.createElement("canvas");
    c.width = c.height = need;
    c.getContext("2d")!.drawImage(starImg, 0, 0, need, need);
    if (starCache.size > 12) starCache.clear();
    starCache.set(need, c);
    return c;
  }

  /* ── S3 sky ───────────────────────────────────────
     Ambient field behind the constellation: fixed stars that breathe,
     a few dotted planets drifting, and shooting stars on their own
     clocks. Everything is seeded off h1() so it is identical every
     frame and never shimmers from re-randomising. */
  let skyCache: Sky | null = null;
  function buildSky(W: number, H: number): Sky {
    const n = Math.round((W * H) / 11000);
    const stars: Star[] = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: h1(i * 2.13) * W,
        y: h1(i * 4.77) * H,
        s: 1.1 + h1(i * 6.31) * 2.2,
        ph: h1(i * 8.53) * Math.PI * 2,
        sp: 0.35 + h1(i * 9.91) * 1.5,
        rot: (h1(i * 12.7) - 0.5) * 0.8,
        big: h1(i * 3.17) > 0.985,          // a rare few get the star glyph
      });
    }
    const planets: Planet[] = [];
    for (let i = 0; i < 3; i++) {
      planets.push({
        x: (0.16 + h1(i * 41.3) * 0.7) * W,
        y: (0.12 + h1(i * 47.9) * 0.76) * H,
        r: 16 + h1(i * 53.1) * 26,
        sp: 0.05 + h1(i * 59.7) * 0.07,
        ph: h1(i * 61.3) * Math.PI * 2,
      });
    }
    return { stars, planets, W, H };
  }

  function drawSky(ctx: CanvasRenderingContext2D, W: number, H: number, time: number, a: number, warp: number, fx: number, fy: number) {
    const sky = (skyCache && skyCache.W === W && skyCache.H === H)
      ? skyCache : (skyCache = buildSky(W, H));

    /* fixed stars. Under warp every one of them stretches away from the
       focal point — the field itself is what sells the speed, far more than
       any number of added streak lines. */
    ctx.fillStyle = P.paper;
    for (const st of sky.stars) {
      const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * st.sp + st.ph));

      if (warp > 0.02) {
        const dx = st.x - fx, dy = st.y - fy;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist, uy = dy / dist;
        /* stars further out travel further — parallax, not a uniform blur */
        const reach = warp * (34 + dist * 1.15);
        const n = 9;
        for (let j = 0; j < n; j++) {
          const f = j / n;
          ctx.globalAlpha = a * tw * 0.42 * (1 - f);
          const sz = st.s * (1 - f * 0.45);
          ctx.fillRect(st.x + ux * reach * f - sz / 2, st.y + uy * reach * f - sz / 2, sz, sz);
        }
        continue;
      }

      if (st.big && starReady) {
        const g = st.s * 5;
        ctx.globalAlpha = a * tw * 0.30;
        ctx.drawImage(starBitmap(g), st.x - g / 2, st.y - g / 2, g, g);
        continue;
      }
      ctx.globalAlpha = a * tw * 0.34;
      ctx.save();
      ctx.translate(st.x, st.y);
      ctx.rotate(st.rot);
      ctx.fillRect(-st.s / 2, -st.s / 2, st.s, st.s);
      ctx.restore();
    }

    /* small planets — dotted rims, same square language */
    for (const pl of sky.planets) {
      const drift = Math.sin(time * pl.sp + pl.ph) * 8;
      const cxp = pl.x + drift, cyp = pl.y + drift * 0.4;
      const ring = Math.max(14, Math.round(pl.r * 1.5));
      for (let k = 0; k < ring; k++) {
        const ang = (k / ring) * Math.PI * 2;
        ctx.globalAlpha = a * 0.16;
        ctx.fillRect(cxp + Math.cos(ang) * pl.r - 1, cyp + Math.sin(ang) * pl.r - 1, 2, 2);
      }
      for (let k = 0; k < 26; k++) {
        const rr = pl.r * Math.sqrt(h1(k * 3.7 + pl.r));
        const ang = h1(k * 7.1 + pl.r) * Math.PI * 2;
        ctx.globalAlpha = a * 0.10;
        ctx.fillRect(cxp + Math.cos(ang) * rr - 1, cyp + Math.sin(ang) * rr - 1, 2, 2);
      }
    }

    /* shooting stars — each on its own period, drawn as a dashed trail */
    for (let k = 0; k < 3; k++) {
      const period = 8 + h1(k * 13.7) * 7;
      const local = ((time + h1(k * 17.3) * period) % period) / period;
      const window = 0.11;
      if (local > window) continue;
      const u = local / window;
      const sx = h1(k * 21.1) * W * 0.85;
      const sy = h1(k * 23.9) * H * 0.45;
      const ang = 0.42 + h1(k * 31.7) * 0.5;
      const reach = 260 + h1(k * 29.3) * 220;
      const fade = Math.sin(Math.PI * u);
      for (let j = 0; j < 12; j++) {
        const f = u - j * 0.028;
        if (f < 0) break;
        ctx.globalAlpha = a * fade * (1 - j / 12) * 0.75;
        const px = sx + Math.cos(ang) * reach * f;
        const py = sy + Math.sin(ang) * reach * f;
        const sz = 2.6 * (1 - j / 14);
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ── scroll progress ──────────────────────────────── */
  const reel = root;
  const probe = root.querySelector<HTMLElement>("[data-probe]")!;
  const scrub = null;

  function masterProgress() {
    if (scrub !== null) return scrub;
    const total = reel.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp01(-reel.getBoundingClientRect().top / total);
  }

  /* carve the master scroll into phases. the gaps between them are holds —
     each section gets a beat at rest instead of only existing in transit */
  const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
  const PHASE = {
    p:   [0.04, 0.20] as const,     // S1 → S2
    out: [0.58, 0.93] as const,     // S3 → S4 — scrubbed, because parallax has to be
  };
  /* S2 → S3 is a snap, not a scrub: crossing SNAP_T plays the collapse and
     parks the ball at "you are here" on its own clock. Crossing RUN_T then
     plays the descent. Nothing in between is scroll-driven. */
  const SNAP_T = 0.34, RUN_T = 0.48;

  /* ── S3 rail ──────────────────────────────────────
     A switchback in normalised viewport coords — right, down, left, down,
     right, down, left. Corners get a small radius and the whole line is
     pushed off-true by smooth noise, so it reads hand-drawn rather than
     CAD-straight. The entire path fits one screen; nothing pans. */
  const stepEls = [...root.querySelectorAll<HTMLElement>("[data-step]")];
  const hereEl = root.querySelector<HTMLElement>("[data-here]")!;

  /* The Diamond of Virgo — a real asterism. Positions are the four stars'
     actual RA/Dec, projected flat and normalised into the viewport, so the
     shape is the one you'd see looking up, not an invented squiggle.

       Cor Caroli   RA 12h56m  Dec +38.3   (top)
       Denebola     RA 11h49m  Dec +14.6   (right)
       Spica        RA 13h25m  Dec -11.2   (bottom)
       Arcturus     RA 14h16m  Dec +19.2   (left)                          */
  /* Chart coordinates, gnomonic projection about the asterism's centre
     (RA 13h05m, Dec +15.7), east left / north up. Using raw RA/Dec would
     squash it — one hour of RA is only 15°·cos(dec) of sky — so these are
     projected properly. The true diamond is 1.46× TALLER than it is wide,
     which is what makes it a kite rather than a lozenge. */
  const STARS: StarSpec[] = [
    { name: "Denebola",   cx:  0.3161, cy: -0.0399, side: "right"  },  // 01 Listen
    { name: "Spica",      cx: -0.1127, cy:  0.4622, side: "bottom" },  // 02 Design
    { name: "Arcturus",   cx: -0.3161, cy: -0.1201, side: "left"   },  // 03 Build
    { name: "Cor Caroli", cx:  0.0159, cy: -0.4622, side: "top"    },  // 04 Refine
  ];
  const CHART_W = 0.6321, CHART_H = 0.9243;

  /* one uniform scale for both axes — anything else distorts the shape */
  function starPx(st: StarSpec, W: number, H: number): Pt {
    const narrow = W <= 700;
    /* on a phone the labels move out from around the diamond to a block at
       the foot, which frees the asterism to be much bigger and sit higher */
    const k = narrow
      ? Math.min((W * 0.62) / CHART_W, (H * 0.44) / CHART_H)
      : Math.min((W * 0.44) / CHART_W, (H * 0.57) / CHART_H);
    const midY = narrow ? H * 0.38 : H * 0.5;
    return [W * 0.5 + st.cx * k, midY + st.cy * k] as Pt;
  }
  /* the ball runs the diamond clockwise and closes the loop back onto the
     first star — the process is a cycle, not a dead end */
  /* RAIL is derived per-viewport in buildRail — see starPx */

  /* the path is re-rooted so its origin IS the parking spot */
  const REST_T = 0;

  /* deterministic value noise, so the wobble is identical every frame
     (Math.random would make the rail shimmer) */
  const h1 = (n: number) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };
  function noise(x: number) {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return lerp(h1(i), h1(i + 1), u) * 2 - 1;
  }

  function buildRail(W: number, H: number): RailGeom {
    /* The loop is re-rooted to the midpoint of the closing leg — half way
       from Refine back round to Listen — so the ball parks with a run-up
       into the first star instead of sitting on top of it, and finishes
       the circuit exactly where it began. */
    const v = STARS.map(st => starPx(st, W, H));
    const mid: Pt = [(v[3][0] + v[0][0]) / 2, (v[3][1] + v[0][1]) / 2];
    const base = [mid, v[0], v[1], v[2], v[3], mid];
    const rad = Math.min(46, Math.min(W, H) * 0.06);

    /* soften each corner into a short quadratic */
    const towards = (from: Pt, to: Pt, d: number): Pt => {
      const dx = to[0] - from[0], dy = to[1] - from[1];
      const L = Math.hypot(dx, dy) || 1;
      return [from[0] + (dx / L) * Math.min(d, L / 2), from[1] + (dy / L) * Math.min(d, L / 2)] as Pt;
    };
    const qbez = (a: Pt, b: Pt, c: Pt, t: number): Pt => {
      const m = 1 - t;
      return [m * m * a[0] + 2 * m * t * b[0] + t * t * c[0],
              m * m * a[1] + 2 * m * t * b[1] + t * t * c[1]];
    };

    const poly: Pt[] = [base[0]];
    for (let i = 1; i < base.length - 1; i++) {
      const a = base[i - 1], b = base[i], c = base[i + 1];
      const p1 = towards(b, a, rad), p2 = towards(b, c, rad);
      poly.push(p1);
      for (let k = 1; k < 10; k++) poly.push(qbez(p1, b, p2, k / 10));
      poly.push(p2);
    }
    poly.push(base[base.length - 1]);

    /* resample evenly, then shove each sample off the line */
    const STEP_PX = 6;
    const dense: Pt[] = [];
    for (let i = 1; i < poly.length; i++) {
      const a = poly[i - 1], b = poly[i];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const n = Math.max(1, Math.round(L / STEP_PX));
      for (let k = 0; k < n; k++) dense.push([lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)] as Pt);
    }
    dense.push(poly[poly.length - 1]);

    const out: Pt[] = dense.map((pt, i): Pt => {
      const a = dense[Math.max(0, i - 1)], b = dense[Math.min(dense.length - 1, i + 1)];
      let nx = -(b[1] - a[1]), ny = b[0] - a[0];
      const L = Math.hypot(nx, ny) || 1;
      const w = noise(i * 0.05) * 4.5 + noise(i * 0.21) * 1.6;   // two octaves of drift
      return [pt[0] + (nx / L) * w, pt[1] + (ny / L) * w] as Pt;
    });

    const cum: number[] = [0];
    for (let i = 1; i < out.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]));
    }
    const total = cum[cum.length - 1];

    /* find where each star ended up along the wobbled line, so the
       checkpoints sit exactly on the drawn path rather than near it */
    const vertex = STARS.map(st => {
      const [px, py] = starPx(st, W, H);
      let best = 0, bestD = Infinity;
      for (let k = 0; k < out.length; k++) {
        const d = (out[k][0] - px) ** 2 + (out[k][1] - py) ** 2;
        if (d < bestD) { bestD = d; best = k; }
      }
      return cum[best] / total;
    });

    return { pts: out, cum, total, vertex, W, H };
  }

  /* rebuilding the wobble every frame would be wasteful — cache per size */
  let railCache: RailGeom | null = null;
  function railGeom(W: number, H: number): RailGeom {
    if (!railCache || railCache.W !== W || railCache.H !== H) railCache = buildRail(W, H);
    return railCache;
  }

  function railAt(g: RailGeom, t: number): Pt {
    const d = clamp01(t) * g.total;
    let lo = 0, hi = g.cum.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; g.cum[mid] < d ? lo = mid + 1 : hi = mid; }
    const i = Math.max(1, lo);
    const span = g.cum[i] - g.cum[i - 1] || 1;
    const f = (d - g.cum[i - 1]) / span;
    return [lerp(g.pts[i - 1][0], g.pts[i][0], f), lerp(g.pts[i - 1][1], g.pts[i][1], f)] as Pt;
  }

  /* each checkpoint IS a star — the polyline vertices, in order */
  function checkpointT(g: RailGeom, i: number) {
    return g.vertex[i];
  }

  function layoutSteps() { /* positions are set per-frame from the geometry */ }

  /* where a label sits relative to its star */
  const LABEL_OFFSET = {
    top:    { dx:   0, dy: -52, t: "translate(-50%, -100%)" },
    right:  { dx:  52, dy:   0, t: "translate(0, -50%)"     },
    bottom: { dx:   0, dy:  52, t: "translate(-50%, 0)"     },
    left:   { dx: -52, dy:   0, t: "translate(-100%, -50%)" },
  };

  /* ── draw ─────────────────────────────────────────── */
  function draw(cv: HTMLCanvasElement, p: number, z: number, roll: number, time: number, out: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return;
    if (cv.width !== W * dpr || cv.height !== H * dpr) {
      cv.width = W * dpr; cv.height = H * dpr;
    }

    const ctx = cv.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const e = ease(p);
    const narrow = W <= 700;

    /* S1 pose: a dome — sphere centre pinned below the viewport's bottom
       edge, so only the northern hemisphere is on screen.
       S2 pose: the whole sphere, off to one side of the copy. */
    const D = probe.clientWidth || W;
    const dropPx = probe.clientHeight || 0;

    const R1 = D * 0.46,           cx1 = W / 2,            cy1 = H + dropPx;
    const R2 = narrow ? W * 0.36 : Math.min(W, H) * 0.34;
    const cx2 = narrow ? W / 2 : W * 0.70;
    const cy2 = narrow ? H * 0.26 : H / 2;

    let R  = lerp(R1, R2, e);
    let cx = lerp(cx1, cx2, e);
    let cy = lerp(cy1, cy2, e);

    /* S3: the sphere collapses into a plain 100px ball and hands itself to
       the rail. The map inverts ink→paper first so it stays legible while
       the ground goes dark, THEN the detail drops and the solid bearing
       takes over — otherwise the middle of the transition is a grey smear. */
    const ez     = ease(z);
    const eo     = ease(clamp01(out || 0));
    const invert = clamp01((ez - 0.10) / 0.45);   // ink → paper
    let detail   = clamp01(1 - (ez - 0.55) / 0.38);
    let solid    = clamp01((ez - 0.60) / 0.40);
    const shade  = mixInk(Math.max(invert, clamp01(eo * 4)));
    const rail   = railGeom(W, H);
    if (ez > 0) {
      const [bx, by] = railAt(rail, roll);
      R  = lerp(R,  BALL_R, ez);
      cx = lerp(cx, bx,     ez);
      cy = lerp(cy, by,     ez);
    }
    /* S4: the bearing opens back into the planet, centres, then the camera
       dives into it — R runs away quadratically so the last stretch is a
       surface, not a globe. */
    const reform = clamp01(eo / 0.30);
    const dive   = clamp01((eo - 0.26) / 0.52);
    const sunA   = clamp01((eo - 0.54) / 0.30);
    if (eo > 0) {
      const rBase = Math.min(W, H) * (narrow ? 0.40 : 0.34);
      R  = lerp(R, rBase * (1 + dive * dive * 17), reform);
      cx = lerp(cx, W * 0.5, reform);
      cy = lerp(cy, H * 0.5, reform);
    }

    /* the sky comes up with the dark ground, behind everything else, and
       smears radially away from the globe while the warp is running */
    const skyA = clamp01((ease(z) - 0.22) / 0.38) * (1 - clamp01(eo * 2.4));
    const warpAmt = Math.sin(Math.PI * clamp01(z)) ** 0.7;
    if (skyA > 0.01) drawSky(ctx, W, H, time, skyA, warpAmt, cx, cy);

    /* WARP — the snap out of orbit. Streaks fire radially off the shrinking
       globe and stretch as they go, so the collapse reads as the camera
       ripping backwards into the galaxy rather than the planet politely
       fading. Peaks mid-snap and is gone by the time the rail arrives. */
    const warp = warpAmt;
    if (warp > 0.02) {
      const reach = Math.hypot(W, H) * 0.78;
      ctx.fillStyle = P.paper;
      for (let i = 0; i < 170; i++) {
        const ang  = h1(i * 2.71) * Math.PI * 2;
        const seed = h1(i * 5.33);
        const from = (0.06 + seed * 0.55) * reach * (0.35 + warp * 1.15);
        const len  = (48 + h1(i * 7.13) * 320) * warp;
        const ca = Math.cos(ang), sa = Math.sin(ang);
        for (let d = 0; d < len; d += 7) {
          const rr = from + d;
          if (rr > reach * 1.3) break;
          ctx.globalAlpha = warp * 0.7 * (1 - d / len) * (0.35 + 0.65 * seed);
          const sz = 2.6 * (1 - d / (len * 1.6));
          ctx.fillRect(cx + ca * rr - sz / 2, cy + sa * rr - sz / 2, sz, sz);
        }
      }
      ctx.globalAlpha = 1;
    }

    detail = Math.max(detail, reform) * (1 - sunA);
    solid  = solid * (1 - reform);

    /* the rail itself: dither squares along the switchback. Behind the ball
       they are lit, ahead of it they stay faint — so the trail reads as the
       ball printing its own path in the same square-dot language as the map. */
    const railA = clamp01((ez - 0.45) / 0.35) * (1 - clamp01(eo * 3.0));
    if (railA > 0.01) {
      const pitch = 13;
      const passed = clamp01(roll) * rail.total;
      ctx.fillStyle = P.paper;
      for (let d = 0, i = 0; d <= rail.total; d += pitch, i++) {
        const [x, y] = railAt(rail, d / rail.total);
        const lit = d <= passed;
        /* each mark is nudged and turned a touch — a stamped line, not a
           printed one */
        const jx = (h1(i * 1.7) - 0.5) * 2.2, jy = (h1(i * 3.3) - 0.5) * 2.2;
        const sz = (lit ? 3.7 : 2.9) * (0.82 + h1(i * 5.1) * 0.36);
        ctx.globalAlpha = railA * (lit ? 0.88 : 0.15);
        ctx.save();
        ctx.translate(x + jx, y + jy);
        ctx.rotate((h1(i * 7.9) - 0.5) * 0.55);
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        ctx.restore();
      }

      /* every checkpoint is a star from the start — the constellation is
         already up there, the ball just joins the dots. Drawn additively so
         they read as light on the dark ground rather than blue paint. */
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 4; i++) {
        const ct = checkpointT(rail, i);
        const [x, y] = railAt(rail, ct);
        const hit = clamp01(roll) >= ct;
        if (!starReady) continue;
        const g = hit ? 62 : 42;
        ctx.globalAlpha = railA * (hit ? 1 : 0.72);
        ctx.drawImage(starBitmap(g), x - g / 2, y - g / 2, g, g);
        /* a second pass on a reached star pushes it to full brightness */
        if (hit) {
          ctx.globalAlpha = railA * 0.75;
          ctx.drawImage(starBitmap(g), x - g / 2, y - g / 2, g, g);
          ctx.fillStyle = P.paper;
          ctx.globalAlpha = railA;
          ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = P.paper;
    }


    /* camera pans onto Ulaanbaatar: the tilt swings up to its latitude and
       the longitude settles onto it, so the star ends dead centre */
    const PHI0 = lerp(P.tilt, UB_LAT, e) * DEG;
    const sinP = Math.sin(PHI0), cosP = Math.cos(PHI0);

    const dl0 = ((UB_LON - spinAngle + 540) % 360) - 180;   // shortest way round
    const LON0 = spinAngle + dl0 * e;

    const fwd = (lon: number, lat: number) => {
      const dl = (lon - LON0) * DEG, la = lat * DEG;
      const cosc = sinP * Math.sin(la) + cosP * Math.cos(la) * Math.cos(dl);
      return {
        x: Math.cos(la) * Math.sin(dl),
        y: cosP * Math.sin(la) - sinP * Math.cos(la) * Math.cos(dl),
        visible: cosc >= -0.02,
      };
    };

    if (P.graticule && detail > 0.01) {
      ctx.strokeStyle = `rgba(${shade[0]},${shade[1]},${shade[2]},${P.gratAlpha * detail})`;
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath(); let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const q = fwd(lon, lat); if (!q.visible) { started = false; continue; }
          const sx = cx + q.x * R, sy = cy - q.y * R;
          started ? ctx.lineTo(sx, sy) : (ctx.moveTo(sx, sy), started = true);
        }
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath(); let started = false;
        for (let lat = -85; lat <= 85; lat += 3) {
          const q = fwd(lon, lat); if (!q.visible) { started = false; continue; }
          const sx = cx + q.x * R, sy = cy - q.y * R;
          started ? ctx.lineTo(sx, sy) : (ctx.moveTo(sx, sy), started = true);
        }
        ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    }

    /* dotted land — sample a screen grid, inverse-project, mask lookup.
       the loop is clipped to the canvas so the hidden hemisphere in the
       S1 dome pose is never sampled at all */
    if (detail > 0.01) {
      const gstep = (2 * R) / P.dotsAcross;
      const rDot = Math.max(0.9, gstep * P.dotScale);
      const gy0 = Math.max(cy - R, -gstep), gy1 = Math.min(cy + R, H + gstep);
      const gx0 = Math.max(cx - R, -gstep), gx1 = Math.min(cx + R, W + gstep);
      ctx.globalAlpha = detail;
      ctx.fillStyle = `rgb(${shade[0]},${shade[1]},${shade[2]})`;
      for (let gy = cy - R; gy <= cy + R; gy += gstep) {
        if (gy < gy0 || gy > gy1) continue;
        for (let gx = cx - R; gx <= cx + R; gx += gstep) {
          if (gx < gx0 || gx > gx1) continue;
          const X = gx - cx, Y = -(gy - cy), rho = Math.hypot(X, Y);
          if (rho > R) continue;
          const c = Math.asin(Math.min(1, rho / R));
          const sinc = Math.sin(c), cosc = Math.cos(c);
          const sinLat = cosc * sinP + (rho === 0 ? 0 : (Y * sinc * cosP) / rho);
          const lat = Math.asin(Math.max(-1, Math.min(1, sinLat))) / DEG;
          const lon = LON0 + Math.atan2(X * sinc, rho * cosc * cosP - Y * sinc * sinP) / DEG;
          const L = ((lon + 180) % 360 + 360) % 360 - 180;
          if (!isLand(L, lat)) continue;

          if (P.square) ctx.fillRect(gx - rDot, gy - rDot, rDot * 2, rDot * 2);
          else { ctx.beginPath(); ctx.arc(gx, gy, rDot, 0, Math.PI * 2); ctx.fill(); }
        }
      }
      ctx.globalAlpha = 1;
    }

    /* the star grows as the camera settles on it */
    if (P.star && starReady && detail > 0.01) {
      const q = fwd(UB_LON, UB_LAT);
      if (q.visible) {
        const sx = cx + q.x * R, sy = cy - q.y * R;
        const s = 2 * R * lerp(P.starSize, P.starSize * 2.1, e);
        ctx.drawImage(starBitmap(s * dpr), sx - s / 2, sy - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;

    /* …and the solid ball fades in underneath, so the handoff from planet
       to bearing happens without a cut */
    if (solid > 0.001 && eo < 0.999) {
      ctx.globalAlpha = solid * (1 - clamp01(eo * 1.5));
      ctx.fillStyle = P.paper;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    /* …and we come out the other side of the dive into weather */
    if (sunA > 0.005) drawSunset(ctx, W, H, time, sunA);
  }

  /* ── S4 sunset ─────────────────────────────────────
     The payoff — the one place on the page with colour. Sky and sea are
     gradients; the sun and the clouds are halftone, so the scene still
     belongs to the same system as the map, the rail and the mark.

     Everything static is baked once into offscreen canvases: the sky, the
     sun's ~4k dots, and each cloud's ~2k dots. Drawing them live cost 6ms a
     frame (36% of the 60fps budget) for pixels that never changed. Only the
     glint on the water is redrawn, because only it actually moves. */
  let sunsetCache: Sunset | null = null;

  /* Cloud shading is a continuous ramp, not buckets — stepping through four
     flat colours put visible banding where light met shadow. Quantised to 40
     stops only so the strings can be built once instead of per dot. */
  const CLOUD_RAMP: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
    [0.00, [163, 146, 166]],   // shadowed top — mauve-grey, NOT violet
    [0.18, [180, 155, 166]],
    [0.36, [201, 169, 165]],
    [0.54, [222, 188, 168]],   // dusty rose warming
    [0.72, [240, 208, 174]],
    [0.88, [250, 228, 197]],
    [1.00, [255, 249, 231]],   // underside catching the sun
  ];
  const CLOUD_STOPS = (() => {
    const n = 96, out = [];
    for (let s = 0; s < n; s++) {
      const t = s / (n - 1);
      let i = 1;
      while (i < CLOUD_RAMP.length - 1 && t > CLOUD_RAMP[i][0]) i++;
      const [a0, c0] = CLOUD_RAMP[i - 1], [a1, c1] = CLOUD_RAMP[i];
      const f = clamp01((t - a0) / (a1 - a0 || 1));
      out.push(`rgb(${Math.round(lerp(c0[0], c1[0], f))},${Math.round(lerp(c0[1], c1[1], f))},${Math.round(lerp(c0[2], c1[2], f))})`);
    }
    return out;
  })();
  const cloudTone = (t: number) => CLOUD_STOPS[Math.round(clamp01(t) * (CLOUD_STOPS.length - 1))];

  /* a run of overlapping lobes — flat-bottomed, bumpy on top */
  function cloudLobes(seed: number, R: number): Lobe[] {
    const n = 4 + Math.floor(h1(seed * 1.7) * 4);
    const out: Lobe[] = [];
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const bump = Math.sin(t * Math.PI);
      out.push({
        x: (t - 0.5) * R * 2.1,
        y: -bump * R * 0.44 * (0.55 + h1(seed * 3.1 + i) * 0.8)
           + (h1(seed * 5.3 + i) - 0.5) * R * 0.16,
        r: R * (0.32 + bump * 0.4) * (0.72 + h1(seed * 7.9 + i) * 0.55),
      });
    }
    return out;
  }

  function bakeCloud(cl: Omit<Cloud, "bmp">, sx: number, sy: number, W: number, H: number): CloudBmp {
    const bw = cl.R * 2.6, bh = cl.R * 1.5;
    const x0 = -bw - 6, y0 = -bh - 6;
    const cw = Math.ceil(bw * 2 + 12), ch = Math.ceil(bh * 1.55 + 12);
    const cvs = document.createElement("canvas");
    cvs.width = cw; cvs.height = ch;
    const g = cvs.getContext("2d")!;

    const pitch = Math.max(2.6, cl.R * 0.048);
    for (let gy = -bh; gy <= bh * 0.55; gy += pitch) {
      for (let gx = -bw; gx <= bw; gx += pitch) {
        let f = 0;
        for (const L of cl.lobes) {
          const d = Math.hypot(gx - L.x, gy - L.y) / L.r;
          if (d < 1) f = Math.max(f, 1 - d);
        }
        if (f <= 0.07) continue;
        /* the sun sits at the horizon, so undersides are lit and tops are
           in shadow — that gradient is what makes them read as cloud */
        /* Both terms use a wide, soft falloff and neither is allowed to
           saturate inside the cloud — the light has to roll the whole way
           across the form. A tight falloff was what made it read as a
           hard edge, not the number of colour stops. */
        const lit = clamp01(1 - Math.hypot(cl.x + gx - sx, cl.y + gy - sy) / (Math.min(W, H) * 1.15));
        const low = clamp01((gy + bh * 0.85) / (bh * 1.9));
        const sm = (v: number) => v * v * (3 - 2 * v);
        const warmth = clamp01(0.10 + sm(lit) * 0.46 + sm(low) * 0.52);
        const sz = pitch * (0.42 + f * 0.85);
        /* opacity barely tracks warmth now; it was compounding the jump */
        g.globalAlpha = Math.min(1, f * 2.6) * (0.52 + warmth * 0.26);
        g.fillStyle = cloudTone(warmth);
        g.fillRect(gx - x0 - sz / 2, gy - y0 - sz / 2, sz, sz);
      }
    }
    return { cvs, x0, y0 };
  }

  function buildSunset(W: number, H: number): Sunset {
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const g = c.getContext("2d")!;
    const hz = Math.round(H * 0.62);
    const sx = W * 0.66, sy = hz - H * 0.02, sr = Math.min(W, H) * 0.075;

    const sky = g.createLinearGradient(0, 0, 0, hz);
    sky.addColorStop(0.00, "#7FA8D4");
    sky.addColorStop(0.22, "#A9A6CE");
    sky.addColorStop(0.46, "#D79E94");
    sky.addColorStop(0.70, "#F4A961");
    sky.addColorStop(0.88, "#FCCB78");
    sky.addColorStop(1.00, "#FFEEBE");
    g.fillStyle = sky; g.fillRect(0, 0, W, hz);

    const glow = g.createRadialGradient(sx, sy, sr * 0.2, sx, sy, sr * 8);
    glow.addColorStop(0.00, "rgba(255,250,228,.95)");
    glow.addColorStop(0.22, "rgba(255,203,120,.45)");
    glow.addColorStop(1.00, "rgba(255,190,110,0)");
    g.fillStyle = glow;
    g.beginPath(); g.arc(sx, sy, sr * 8, 0, Math.PI * 2); g.fill();

    /* the sun: solid to the rim, then a dithered corona, cut at the horizon
       the way a real one is */
    const reach = sr * 2.5, pitch = Math.max(2.4, sr * 0.072);
    for (let gy = -reach; gy <= reach; gy += pitch) {
      const py = sy + gy;
      if (py > hz) continue;
      for (let gx = -reach; gx <= reach; gx += pitch) {
        const d = Math.hypot(gx, gy) / sr;
        if (d > 2.5) continue;
        let f = d <= 1 ? 1 : clamp01(1 - (d - 1) / 1.5);
        f = Math.pow(f, 1.35);
        if (f <= 0.03) continue;
        if (d > 1 && f < h1(gx * 7.3 + gy * 13.1) * 0.95) continue;
        const sz = pitch * (0.4 + f * 0.85);
        g.globalAlpha = Math.min(1, f * 1.35);
        g.fillStyle = d < 0.7 ? "#FFFDF0" : (d < 1.05 ? "#FFF2C8" : "#FFDCA0");
        g.fillRect(sx + gx - sz / 2, py - sz / 2, sz, sz);
      }
    }
    g.globalAlpha = 1;

    const sea = g.createLinearGradient(0, hz, 0, H);
    sea.addColorStop(0.00, "#F6C486");
    sea.addColorStop(0.10, "#D9906F");
    sea.addColorStop(0.38, "#A9737C");
    sea.addColorStop(1.00, "#6E5C74");
    g.fillStyle = sea; g.fillRect(0, hz, W, H - hz);

    /* paper scrim under the copy so ink stays readable over the water */
    const scrim = g.createLinearGradient(0, H * 0.42, 0, H);
    scrim.addColorStop(0, "rgba(251,249,246,0)");
    scrim.addColorStop(1, "rgba(251,249,246,.60)");
    g.fillStyle = scrim; g.fillRect(0, H * 0.42, W, H * 0.58);

    /* clouds gather round the sun — big and low, wisps high and out */
    const spec = [
      { dx: -0.20, dy: -0.055, s: 1.50, v: 0.10 },
      { dx:  0.17, dy: -0.038, s: 1.20, v: 0.13 },
      { dx: -0.05, dy: -0.150, s: 0.85, v: 0.17 },
      { dx:  0.30, dy: -0.130, s: 0.66, v: 0.21 },
      { dx: -0.31, dy: -0.145, s: 0.58, v: 0.19 },
      { dx:  0.06, dy: -0.245, s: 0.38, v: 0.28 },
      { dx: -0.17, dy: -0.255, s: 0.32, v: 0.33 },
      { dx:  0.24, dy: -0.225, s: 0.30, v: 0.25 },
    ];
    const base = Math.min(W, H) * 0.135;
    const clouds: Cloud[] = spec.map((q, i): Cloud => {
      const R = base * q.s;
      const cl = { x: sx + q.dx * W, y: sy + q.dy * H, R, v: q.v, seed: i + 1,
                   lobes: cloudLobes(i + 1, R) };
      return { ...cl, bmp: bakeCloud(cl, sx, sy, W, H) };
    });

    return { c, hz, sx, sy, sr, W, H, clouds };
  }

  function drawSunset(ctx: CanvasRenderingContext2D, W: number, H: number, time: number, a: number) {
    if (!sunsetCache || sunsetCache.W !== W || sunsetCache.H !== H) sunsetCache = buildSunset(W, H);
    const S = sunsetCache;
    ctx.globalAlpha = a;
    ctx.drawImage(S.c, 0, 0);

    /* clouds sway rather than traverse — they belong to the sun */
    for (const cl of S.clouds) {
      const ox = cl.x + Math.sin(time * cl.v + cl.seed * 1.7) * (W * 0.035);
      ctx.drawImage(cl.bmp.cvs, ox + cl.bmp.x0, cl.y + cl.bmp.y0);
    }

    /* the only thing that genuinely moves: the sun's glint on the water */
    for (let y = S.hz + 3; y < H; y += 7) {
      const d = (y - S.hz) / (H - S.hz);
      const spread = S.sr * (1.1 + d * 9);
      const fade = Math.pow(1 - d, 1.6);
      const n = Math.round(4 + d * 16);
      for (let k = 0; k < n; k++) {
        const off = (h1(k * 3.7 + y) - 0.5) * 2 * spread;
        const wob = Math.sin(time * 1.6 + y * 0.06 + k) * 4;
        const w = 3 + h1(k * 6.1 + y) * 13 * (1 - d * 0.5);
        ctx.globalAlpha = a * fade * (0.16 + h1(k * 8.3 + y) * 0.4);
        ctx.fillStyle = d < 0.18 ? "#FFFAE8" : "#F2C08A";
        ctx.fillRect(S.sx + off + wob - w / 2, y, w, 2);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ── arc headline ──────────────────────────────────
     viewBox is 140×72 with the circle centre at (70,72) — the bottom edge —
     so it coincides with the S1 sphere centre. Sphere radius is 46 units;
     the text arc rides just outside it. */
  const ARC = { r: 49, size: 6.6 };
  const ARC_CX = 70, ARC_CY = 72;

  function layoutArc() {
    const text = root.querySelector<SVGTextElement>("[data-arc-text]")!;
    root.querySelector<SVGPathElement>("[data-arc-path]")!.setAttribute(
      "d", `M ${ARC_CX - ARC.r} ${ARC_CY} A ${ARC.r} ${ARC.r} 0 0 1 ${ARC_CX + ARC.r} ${ARC_CY}`
    );

    /* Auto-fit. The arc's widest point is its chord, not its radius, so the
       font shrinks until BOTH the chord fits the viewport and the text stops
       wrapping past the horizon. One viewBox unit = D/100 css px. */
    const unitPx = (probe.clientWidth || 100) / 100;
    const availHalf = (window.innerWidth / 2 - 16) / unitPx;
    const len1 = root.querySelector<SVGTextElement>("[data-arc-measure]")!.getComputedTextLength() || 19.2;

    let f = ARC.size;
    for (let i = 0; i < 60; i++) {
      const alpha = (len1 * f) / ARC.r;
      /* glyphs sit outside the path, so the effective radius is r + cap height */
      const chordHalf = (ARC.r + f * 0.8) * Math.sin(Math.min(alpha, Math.PI) / 2);
      if (chordHalf <= availHalf && alpha <= Math.PI * 0.92) break;
      f *= 0.97;
    }
    text.setAttribute("font-size", String(f));
  }

  /* ── intro sequence ───────────────────────────────── */
  const squares = [...root.querySelectorAll<SVGRectElement>("[data-sq]")];

  function shuffleSquares() {
    const order = squares.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {          // Fisher–Yates
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const css = getComputedStyle(document.documentElement);
    const step  = parseFloat(css.getPropertyValue("--t-sq-step")) || 45;
    const scale = parseFloat(css.getPropertyValue("--t-scale"))   || 1;
    order.forEach((sqIndex, slot) => {
      squares[sqIndex].style.setProperty("--d", `${slot * step * scale}ms`);
    });
  }

  /* the mark starts centred in the viewport and settles up to --logo-y,
     so the intro shift is whatever distance separates the two */
  function computeLogoShift() {
    const h = root.querySelector<HTMLElement>("[data-viewport]")!.clientHeight || window.innerHeight;
    const logoY = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue("--logo-y")) || 30;
    document.documentElement.style.setProperty("--logo-shift", `${((50 - logoY) / 100) * h}px`);
  }

  /* The intro is a first-impression, not a toll gate. Navigating to /work
     and back remounts this component, which would replay all 6.8s of it —
     so it runs once per session and lands settled after that. */
  const INTRO_KEY = "910-intro-played";
  function introAlreadyPlayed(): boolean {
    try {
      return sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      return false;   // private mode / blocked storage: just play it
    }
  }
  function markIntroPlayed() {
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* nothing to do */ }
  }

  function playSequence() {
    const vp = root.querySelector<HTMLElement>("[data-viewport]")!;
    computeLogoShift();

    if (introAlreadyPlayed()) {
      vp.classList.remove("seq");
      vp.classList.add("settled");
      return;
    }

    vp.classList.remove("seq", "settled");
    void vp.offsetWidth;            // force reflow so the animations restart
    shuffleSquares();
    vp.classList.add("seq");
    markIntroPlayed();
  }

  /* ── the two cues ───────────────────────────────────
     Scroll only chooses S1 or S2. Everything after is a timed cue: SNAP
     collapses the globe and parks the ball, RUN sends it round the diamond.
     Both are reversible — scrolling back up plays them backwards — so the
     section is never a one-way door. The page is pinned for the duration
     of each so neither can be scrubbed past, and both release on a hard
     timer even if something throws. */
  function makeCue(ms: number): Cue { return { v: 0, on: false, from: 0, target: 0, t0: 0, ms, dur: ms }; }
  const snap = makeCue(2800);
  const run  = makeCue(3600);
  let lockY = 0, locks = 0;

  const eat = (e: Event) => e.preventDefault();
  const eatKeys = (e: KeyboardEvent) => {
    if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();
  };

  function lockScroll() {
    if (locks++ === 0) {
      lockY = window.scrollY;
      addEventListener("wheel", eat, { passive: false });
      addEventListener("touchmove", eat, { passive: false });
      addEventListener("keydown", eatKeys, { passive: false });
    }
  }
  function unlockScroll() {
    if (locks > 0 && --locks === 0) {
      removeEventListener("wheel", eat);
      removeEventListener("touchmove", eat);
      removeEventListener("keydown", eatKeys);
    }
  }

  /* reversing is quicker than playing forward — going back should feel like
     a rewind, not a re-watch */
  function goCue(cue: Cue, target: number, now: number) {
    if (cue.on || cue.v === target) return;
    cue.on = true; cue.from = cue.v; cue.target = target; cue.t0 = now;
    cue.dur = cue.ms * (target > cue.from ? 1 : 0.55);
    lockScroll();
    const guard = cue.dur + 400;
    setTimeout(() => { if (cue.on) { cue.on = false; cue.v = cue.target; unlockScroll(); } }, guard);
  }

  function tickCue(cue: Cue, now: number) {
    if (!cue.on) return;
    const k = clamp01((now - cue.t0) / cue.dur);
    cue.v = cue.from + (cue.target - cue.from) * ease(k);
    if (k >= 1) { cue.v = cue.target; cue.on = false; unlockScroll(); }
  }

  /* ── frame loop ───────────────────────────────────── */
  const canvas = root.querySelector<HTMLCanvasElement>("[data-globe]")!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let inView = true, last = 0, raf = 0, dirty = true;
  let lastT = -1;

  const requestDraw = () => { dirty = true; };

  let curP = 0, curZ = 0, curRoll = 0, curOut = 0;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;

    /* while a cue is playing the page is pinned — hold the scroll position
       so masterProgress can't drift under us */
    if (snap.on || run.on) window.scrollTo(0, lockY);

    const t = masterProgress();

    /* cues fire forward past their mark and reverse back below it. The gap
       between the two thresholds is hysteresis — without it, sitting right
       on the line would ping-pong. RUN unwinds before SNAP does. */
    if (run.v > 0 && t < RUN_T - 0.06)        goCue(run, 0, now);
    else if (snap.v >= 1 && t >= RUN_T)       goCue(run, 1, now);
    if (run.v === 0) {
      if (snap.v > 0 && t < SNAP_T - 0.06)    goCue(snap, 0, now);
      else if (t >= SNAP_T)                   goCue(snap, 1, now);
    }
    tickCue(snap, now);
    tickCue(run,  now);

    const z    = snap.v;
    const roll = REST_T + (1 - REST_T) * run.v;
    /* S4 only opens once the diamond has actually been run */
    const out  = run.v >= 1 ? seg(t, ...PHASE.out) : 0;

    if (t !== lastT || z !== curZ || roll !== curRoll || out !== curOut) {
      curP    = seg(t, ...PHASE.p);
      curZ    = z;
      curRoll = roll;
      curOut  = out;

      const root = document.documentElement.style;
      root.setProperty("--p",    curP.toFixed(4));
      root.setProperty("--z",    curZ.toFixed(4));
      root.setProperty("--roll", curRoll.toFixed(4));
      root.setProperty("--out",  curOut.toFixed(4));
      reel.classList.toggle("s4-live", curOut > 0.5);
      reel.classList.toggle("s2-live", curP > 0.6 && curZ < 0.2);

      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (W && H) {
        const g = railGeom(W, H);

        /* the steps surface as the ball parks, then each comes to full as
           its own star is reached — the list reads as a map first and a
           progress indicator second */
        const parked = clamp01((curZ - 0.6) / 0.4);
        const narrow = W <= 700;
        if (narrow) {
          /* one block at the foot showing whichever star the ball is on —
             four labels around a 1.46:1 diamond is unreadable at this width */
          let active = 0;
          for (let i = 0; i < 4; i++) if (curRoll >= checkpointT(g, i) - 0.03) active = i;
          stepEls.forEach((el, i) => {
            el.style.opacity = String(i === active ? parked : 0);
            el.style.left = el.style.top = "";
          });
        } else {
          stepEls.forEach((el, i) => {
            const st = STARS[i];
            const hit = clamp01((curRoll - (checkpointT(g, i) - 0.04)) / 0.05);
            const a = Math.max(parked * 0.30, hit);
            const off = LABEL_OFFSET[st.side];
            const [sx, sy] = starPx(st, W, H);
            el.style.opacity = String(a);
            el.style.left = `${sx + off.dx}px`;
            el.style.top  = `${sy + off.dy}px`;
            el.style.transform = `${off.t} translateY(${((1 - Math.max(parked, hit)) * 12).toFixed(1)}px)`;
          });
        }

        /* the "you are here" tag rides the parked ball and clears out the
           moment the descent starts */
        const [bx, by] = railAt(g, curRoll);
        const showHere = parked * (1 - clamp01(run.v * 6));
        /* park the tag on the side facing the middle of the diamond — the
           outside edge is where the step labels live */
        const inward = bx > W * 0.5;
        hereEl.classList.toggle("flip", inward);
        hereEl.style.opacity = String(showHere);
        hereEl.style.left = `${bx + (inward ? -1 : 1) * (BALL_R + 34)}px`;
        hereEl.style.top  = `${by - 26}px`;
        hereEl.style.transform =
          `translateY(-50%) ${inward ? "translateX(-100%)" : ""} translateX(${((1 - showHere) * (inward ? 8 : -8)).toFixed(1)}px)`;
      }

      lastT = t;
      dirty = true;
    }

    /* spin fades out as the camera locks onto Ulaanbaatar */
    if (!reduced.matches && P.speed > 0 && curP < 0.999) {
      spinAngle = ((spinAngle + P.speed * dt * (1 - ease(curP)) + 180) % 360 + 360) % 360 - 180;
      dirty = true;
    }

    /* the sky breathes, so once it is up the canvas is never idle */
    if (curZ > 0.2 && !reduced.matches) dirty = true;

    if (dirty) { draw(canvas, curP, curZ, curRoll, now / 1000, curOut); dirty = false; }
  }

  function start() { if (!raf && inView) { last = 0; raf = requestAnimationFrame(frame); } }
  function stop()  { cancelAnimationFrame(raf); raf = 0; }

  /* don't burn CPU when the reel is off screen or the tab is hidden */
  const io = new IntersectionObserver(es => {
    inView = es.some(e => e.isIntersecting);
    inView ? start() : stop();
  }, { threshold: 0 });
  io.observe(reel);

  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(() => { requestDraw(); layoutArc(); layoutSteps(); computeLogoShift(); lastT = -1; });
  ro.observe(canvas);

  layoutArc();
  layoutSteps();
  computeLogoShift();
  start();
  playSequence();

  /* re-measure once the webfont lands — metrics change under the fallback */
  if (document.fonts) document.fonts.ready.then(layoutArc);
  return {
    destroy() {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("wheel", eat);
      removeEventListener("touchmove", eat);
      removeEventListener("keydown", eatKeys);
    },
  };
}
