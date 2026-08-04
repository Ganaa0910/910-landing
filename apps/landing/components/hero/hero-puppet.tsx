"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Rubber-hose marionette — placeholder geometry, real rig.
// Every moving part is its own <g> with a joint origin so it swings naturally.
// Swap the paths for Gray's hand-drawn export later; the rig stays.

const INK = "#0a0a0a";
const PAPER = "#f0ede8";
const BLUE = "#3366ff";

// Joints (in viewBox user-space) — limbs rotate around these points.
const J = {
  hang: [200, 8],
  neck: [200, 178],
  shoulderL: [165, 208],
  shoulderR: [235, 208],
  elbowL: [140, 272],
  elbowR: [260, 272],
  hipL: [182, 338],
  hipR: [218, 338],
  kneeL: [174, 440],
  kneeR: [226, 440],
} as const;

export function HeroPuppet() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const root = rootRef.current;
    if (!svg || !root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Pin each part's rotation pivot to its joint.
      gsap.set("#tilt", { svgOrigin: `${J.hang[0]} ${J.hang[1]}` });
      gsap.set("#sway", { svgOrigin: `${J.hang[0]} ${J.hang[1]}` });
      gsap.set("#head", { svgOrigin: `${J.neck[0]} ${J.neck[1]}` });
      gsap.set("#arm-L", { svgOrigin: `${J.shoulderL[0]} ${J.shoulderL[1]}` });
      gsap.set("#arm-R", { svgOrigin: `${J.shoulderR[0]} ${J.shoulderR[1]}` });
      gsap.set("#fore-L", { svgOrigin: `${J.elbowL[0]} ${J.elbowL[1]}` });
      gsap.set("#fore-R", { svgOrigin: `${J.elbowR[0]} ${J.elbowR[1]}` });
      gsap.set("#leg-L", { svgOrigin: `${J.hipL[0]} ${J.hipL[1]}` });
      gsap.set("#leg-R", { svgOrigin: `${J.hipR[0]} ${J.hipR[1]}` });
      gsap.set("#shin-L", { svgOrigin: `${J.kneeL[0]} ${J.kneeL[1]}` });
      gsap.set("#shin-R", { svgOrigin: `${J.kneeR[0]} ${J.kneeR[1]}` });

      if (reduce) return;

      // Idle marionette dangle — the whole rig sways from the control bar,
      // limbs add their own offset swing so it reads as loose-jointed.
      const ease = "sine.inOut";
      gsap.to("#sway", { rotation: 2.2, duration: 3, ease, repeat: -1, yoyo: true });
      gsap.to("#head", { rotation: 4, duration: 2.3, ease, repeat: -1, yoyo: true, delay: 0.2 });

      gsap.to("#arm-L", { rotation: 9, duration: 2.6, ease, repeat: -1, yoyo: true });
      gsap.to("#arm-R", { rotation: -9, duration: 2.6, ease, repeat: -1, yoyo: true });
      gsap.to("#fore-L", { rotation: 12, duration: 1.9, ease, repeat: -1, yoyo: true, delay: 0.3 });
      gsap.to("#fore-R", { rotation: -12, duration: 1.9, ease, repeat: -1, yoyo: true, delay: 0.3 });

      gsap.to("#leg-L", { rotation: 4, duration: 3.2, ease, repeat: -1, yoyo: true });
      gsap.to("#leg-R", { rotation: -4, duration: 3.2, ease, repeat: -1, yoyo: true });
      gsap.to("#shin-L", { rotation: 7, duration: 2.4, ease, repeat: -1, yoyo: true, delay: 0.4 });
      gsap.to("#shin-R", { rotation: -7, duration: 2.4, ease, repeat: -1, yoyo: true, delay: 0.4 });

      // Cursor tracking — the puppet tilts toward the pointer and the
      // pupils follow it, like it's watching you.
      const tiltTo = gsap.quickTo("#tilt", "rotation", { duration: 0.6, ease: "power2.out" });
      const pupilX = gsap.quickTo("#pupils", "x", { duration: 0.5, ease: "power2.out" });
      const pupilY = gsap.quickTo("#pupils", "y", { duration: 0.5, ease: "power2.out" });

      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const ny = (e.clientY - r.top) / r.height - 0.5;
        tiltTo(nx * 12);
        pupilX(nx * 10);
        pupilY(ny * 6);
      };
      const onLeave = () => {
        tiltTo(0);
        pupilX(0);
        pupilY(0);
      };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      };
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex w-full items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 600"
        className="h-[420px] w-auto"
        role="img"
        aria-label="910studio marionette"
      >
        <g id="tilt">
          {/* Control bar + strings stay fixed; the body sways beneath them. */}
          <g stroke={PAPER} strokeOpacity={0.5} strokeWidth={1.5}>
            <line x1={150} y1={10} x2={250} y2={10} strokeWidth={3} strokeOpacity={0.7} />
            <line x1={170} y1={10} x2={200} y2={70} />
            <line x1={160} y1={10} x2={J.elbowL[0]} y2={310} />
            <line x1={240} y1={10} x2={J.elbowR[0]} y2={310} />
          </g>

          <g id="sway">
            {/* Legs (behind torso) */}
            <g id="leg-L" stroke={INK} strokeWidth={20} strokeLinecap="round" fill="none">
              <path d="M182 338 Q172 392 174 440" />
              <g id="shin-L">
                <path d="M174 440 Q174 488 182 524" />
                <ellipse cx={188} cy={528} rx={24} ry={12} fill={INK} stroke="none" />
              </g>
            </g>
            <g id="leg-R" stroke={INK} strokeWidth={20} strokeLinecap="round" fill="none">
              <path d="M218 338 Q228 392 226 440" />
              <g id="shin-R">
                <path d="M226 440 Q226 488 218 524" />
                <ellipse cx={212} cy={528} rx={24} ry={12} fill={INK} stroke="none" />
              </g>
            </g>

            {/* Arms (behind torso) */}
            <g id="arm-L" stroke={INK} strokeWidth={18} strokeLinecap="round" fill="none">
              <path d="M165 208 Q145 240 140 272" />
              <g id="fore-L">
                <path d="M140 272 Q146 306 158 330" />
                <circle cx={158} cy={336} r={15} fill={PAPER} stroke={INK} strokeWidth={5} />
              </g>
            </g>
            <g id="arm-R" stroke={INK} strokeWidth={18} strokeLinecap="round" fill="none">
              <path d="M235 208 Q255 240 260 272" />
              <g id="fore-R">
                <path d="M260 272 Q254 306 242 330" />
                <circle cx={242} cy={336} r={15} fill={PAPER} stroke={INK} strokeWidth={5} />
              </g>
            </g>

            {/* Torso */}
            <path
              d="M168 210 Q200 196 232 210 L224 332 Q200 348 176 332 Z"
              fill={PAPER}
              stroke={INK}
              strokeWidth={6}
              strokeLinejoin="round"
            />
            {/* Bowtie */}
            <path d="M200 214 L182 204 L182 224 Z" fill={BLUE} stroke={INK} strokeWidth={3} />
            <path d="M200 214 L218 204 L218 224 Z" fill={BLUE} stroke={INK} strokeWidth={3} />
            <circle cx={200} cy={214} r={5} fill={INK} />

            {/* Head */}
            <g id="head">
              <line x1={200} y1={170} x2={200} y2={210} stroke={INK} strokeWidth={14} />
              <circle cx={200} cy={120} r={58} fill={PAPER} stroke={INK} strokeWidth={6} />
              {/* cheeks */}
              <circle cx={166} cy={132} r={10} fill={BLUE} fillOpacity={0.55} />
              <circle cx={234} cy={132} r={10} fill={BLUE} fillOpacity={0.55} />
              {/* eyes */}
              <circle cx={180} cy={112} r={13} fill={PAPER} stroke={INK} strokeWidth={4} />
              <circle cx={220} cy={112} r={13} fill={PAPER} stroke={INK} strokeWidth={4} />
              <g id="pupils">
                <circle cx={180} cy={114} r={6} fill={INK} />
                <circle cx={220} cy={114} r={6} fill={INK} />
              </g>
              {/* grin */}
              <path d="M176 142 Q200 166 224 142" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
