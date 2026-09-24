"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TransitionLink, useTransitionNav } from "@/components/nav/page-shell";
import { glidePageTo } from "@/lib/scroll/smooth";
import { onFrame } from "@/lib/frame/ticker";
import { publishWorkProgress, resetWorkProgress } from "@/lib/scroll/work-progress";
import type { Project } from "@/lib/projects";

/* Cover flow.
 *
 * Driven by the page's own vertical scroll rather than by hover or a wheel
 * handler of its own. Hover made the reader hunt for the thing they wanted,
 * and a component that eats wheel events to scrub itself fights both the
 * page scroller and every input that is not a mouse. Scrolling the page is
 * the one gesture everybody already has — wheel, trackpad, touch, space bar,
 * Page Down — so the gallery reads that and nothing else.
 *
 * It also makes the object on the right honest: it was a decoration next to
 * a list, and it is now a genuine position in the collection, because both
 * are reading the same number. */

const MAX_ROT = 58;      // degrees the side covers rake back
const CENTRE_PUSH = 0.60; // clearance around the front cover, in cover widths
const SIDE_GAP = 0.16;    // how tightly the ones behind stack, same units
const DEPTH = 62;         // px pushed back per step, for the perspective
const FADE_AT = 3.6;      // covers this far out are gone

export function CoverFlow({
  projects,
  header,
}: {
  projects: Project[];
  /* The page masthead is rendered INSIDE the sticky stage rather than above
     the track. Left outside it, the stage begins below the masthead and its
     100dvh runs off the bottom of the screen, so on arrival the deck sits
     low and the caption is under the fold until you scroll past the header.
     Inside, the whole composition is one screen from the first frame. */
  header?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const [active, setActive] = useState(0);
  const navigate = useTransitionNav();
  const n = projects.length;

  /* progress → scroll position, so clicks and arrow keys move the page
     rather than fighting it */
  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track || n < 2) return;
      const len = track.offsetHeight - window.innerHeight;
      if (len <= 0) return;
      const top = window.scrollY + track.getBoundingClientRect().top;
      const clamped = Math.max(0, Math.min(n - 1, i));
      glidePageTo(top + (clamped / (n - 1)) * len, 0.55);
    },
    [n],
  );

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let lastActive = -1;

    const frame = () => {
      const len = track.offsetHeight - window.innerHeight;
      const p = len > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / len)) : 0;
      /* the object on the right reads this — see railPose in lib/reel/engine.ts.
         Direct store, priority 10: after Lenis advanced scroll (0), before
         the engine draws (20), so both sides of the handoff see one frame. */
      publishWorkProgress(p);

      const index = p * Math.max(0, n - 1);
      /* Measured, not recomputed. The cover width is a clamp() in the
         stylesheet, so mirroring it here as a vw number would agree only in
         the middle of the range and drift at both ends — and silently
         disagree the next time either is retuned. */
      const w = cardsRef.current[0]?.offsetWidth ?? 0;

      for (let i = 0; i < n; i++) {
        const el = cardsRef.current[i];
        if (!el) continue;
        const d = i - index;
        const a = Math.max(-1, Math.min(1, d));       // ramps only over the front slot
        const far = Math.abs(d);

        /* Push the front cover clear of its neighbours, then let everything
           behind it stack tightly. Splitting it this way — rather than one
           even gap — is what gives cover flow its shape: one face-on card
           with room around it, and a compressed deck either side. */
        const x = a * (w * CENTRE_PUSH) + (d - a) * (w * SIDE_GAP);

        el.style.transform =
          `translate3d(${x.toFixed(1)}px, 0, ${(-far * DEPTH).toFixed(1)}px)` +
          ` rotateY(${(-a * MAX_ROT).toFixed(2)}deg)` +
          ` scale(${(1 - Math.min(far, 1) * 0.14).toFixed(3)})`;
        el.style.zIndex = String(1000 - Math.round(far * 100));
        el.style.opacity = far > FADE_AT ? "0" : String(Math.min(1, (FADE_AT - far) / 0.8));
        /* only the front cover should be clickable — the ones raked away are
           mostly edge-on and would swallow clicks meant for the middle */
        el.style.pointerEvents = far > FADE_AT ? "none" : "auto";
        el.setAttribute("aria-current", far < 0.5 ? "true" : "false");
      }

      const nearest = Math.round(index);
      if (nearest !== lastActive) {
        lastActive = nearest;
        setActive(nearest);
      }
    };

    const stop = onFrame(frame, 10);

    return () => {
      stop();
      resetWorkProgress();
    };
  }, [n]);

  /* Arrow keys move the deck. Without this the gallery is reachable by tab
     but not steerable, which is worse than not being focusable at all. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      e.preventDefault();
      scrollToIndex(active + (e.key === "ArrowRight" ? 1 : -1));
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [active, scrollToIndex]);

  const current = projects[Math.min(active, n - 1)];

  return (
    /* --covers drives the track height in CSS: one screen to look at plus
       a screen of travel per cover after the first. It lives here because
       the stylesheet has no way to know how many projects there are. */
    <div
      className="work-track"
      ref={trackRef}
      style={{ "--covers": n } as CSSProperties}
    >
      <div className="work-stage" ref={stageRef}>
        {header}

        <div className="work-deck">
          {projects.map((project, i) => (
            <a
              key={project.slug}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={`/work/${project.slug}`}
              className="work-item"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                /* a cover that is not at the front is a "bring that one
                   here", not a "open that one" — same as flicking through a
                   rack, where you turn to a sleeve before you pull it */
                if (i === active) navigate(`/work/${project.slug}`);
                else scrollToIndex(i);
              }}
            >
              <span
                className="work-cover"
                /* render order drives the entrance stagger — see .work-cover
                   in app/reel.css */
                style={{ "--i": i } as CSSProperties}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — case study`}
                  width={1600}
                  height={1100}
                  sizes="(max-width: 700px) 66vw, 34vw"
                  priority={i < 2}
                />
              </span>
            </a>
          ))}
        </div>

        {/* One caption for the deck, under the front cover, the way the
            player named the record you were looking at. Per-cover labels
            would be unreadable on the raked ones anyway. */}
        <div className="work-now" key={current.slug}>
          <p className="work-now-n">
            {String(active + 1).padStart(2, "0")} <span>/ {String(n).padStart(2, "0")}</span>
          </p>
          <h2>{current.title}</h2>
          <p className="work-now-meta">
            {current.client} · {current.year}
            <br />
            {current.scope.join(" · ")}
          </p>
          <TransitionLink className="work-now-go" href={`/work/${current.slug}`}>
            Read the case study <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
