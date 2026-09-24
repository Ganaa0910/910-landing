"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TransitionLink, useTransitionNav } from "@/components/nav/page-shell";
import { glidePageTo, scrollPageTo } from "@/lib/scroll/smooth";
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

/* Phones get the deck on a swipe instead of the scroll. Scrubbing a
   cover flow with vertical scroll asks a thumb to push the page UP to move
   covers SIDEWAYS, and burns a screen of runway per project before the
   reader reaches anything below. Same breakpoint as the narrow covers in
   app/reel.css. */
const SWIPE_MQ = "(max-width: 700px)";
const SWIPE_EASE = 14;    // 1/s — how fast the deck settles onto its target
const FLICK = 0.22;       // seconds of fling velocity carried past release

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
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const lastIndex = useRef(0);
  const wasSwipe = useRef(false);
  const [active, setActive] = useState(0);
  const [swipe, setSwipe] = useState(false);
  const navigate = useTransitionNav();
  const n = projects.length;

  /* Swipe-mode deck position, in covers. `pos` is what is drawn, `target`
     is where it is settling; a drag writes pos directly and release picks
     the target. Refs, not state — the frame loop reads them 60 times a
     second and none of it should render. */
  const deck = useRef({ pos: 0, target: 0, dragging: false });
  /* set when a gesture turned into a drag, so the click the browser fires
     on release does not also open the cover under the finger */
  const draggedRef = useRef(false);

  useEffect(() => {
    const mq = matchMedia(SWIPE_MQ);
    const sync = () => setSwipe(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* progress → scroll position, so clicks and arrow keys move the page
     rather than fighting it */
  const scrollToIndex = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(n - 1, i));
      if (swipe) {
        deck.current.target = clamped;
        return;
      }
      const track = trackRef.current;
      if (!track || n < 2) return;
      const len = track.offsetHeight - window.innerHeight;
      if (len <= 0) return;
      const top = window.scrollY + track.getBoundingClientRect().top;
      const y = top + (clamped / (n - 1)) * len;
      /* no Lenis on low-end machines — see smooth.ts */
      if (!glidePageTo(y, 0.55)) scrollPageTo(y);
    },
    [n, swipe],
  );

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let lastActive = -1;
    const d0 = deck.current;

    /* carry the position across a mode flip (rotating a tablet, resizing
       the window) so the deck does not jump back to the first cover */
    if (swipe) {
      d0.pos = d0.target = lastIndex.current;
    } else if (wasSwipe.current && n > 1) {
      requestAnimationFrame(() => scrollToIndex(Math.round(lastIndex.current)));
    }
    wasSwipe.current = swipe;

    const frame = (_now: number, dt: number) => {
      let index: number;
      if (swipe) {
        if (!d0.dragging) {
          d0.pos += (d0.target - d0.pos) * (1 - Math.exp(-SWIPE_EASE * dt));
          if (Math.abs(d0.target - d0.pos) < 0.0005) d0.pos = d0.target;
        }
        index = d0.pos;
      } else {
        const len = track.offsetHeight - window.innerHeight;
        const p = len > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / len)) : 0;
        index = p * Math.max(0, n - 1);
      }
      lastIndex.current = index;
      /* the object on the right reads this — see railPose in lib/reel/engine.ts.
         Direct store, priority 10: after Lenis advanced scroll (0), before
         the engine draws (20), so both sides of the handoff see one frame. */
      publishWorkProgress(n > 1 ? Math.min(1, Math.max(0, index / (n - 1))) : 0);

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
    /* scrollToIndex is only used on the mode flip, and changes with it */
  }, [n, swipe]);

  /* The swipe itself. Pointer events rather than a native overflow-x
     scroller: the covers are absolutely placed and transformed per frame,
     so there is no scroll width for the browser to scroll — the drag just
     writes the deck position. touch-action: pan-y on the deck (reel.css)
     hands vertical movement back to the page, so the reader can still
     scroll past the deck with a thumb that happens to start on it. */
  useEffect(() => {
    const el = deckRef.current;
    if (!swipe || !el || n < 2) return;
    const d = deck.current;

    let id = -1;
    let x0 = 0, y0 = 0, pos0 = 0;
    let lastX = 0, lastT = 0, vx = 0;
    let decided = false;

    const perCover = () => (cardsRef.current[0]?.offsetWidth ?? 300) * CENTRE_PUSH;

    const down = (e: PointerEvent) => {
      if (id !== -1 || (e.pointerType === "mouse" && e.button !== 0)) return;
      id = e.pointerId;
      x0 = lastX = e.clientX; y0 = e.clientY;
      lastT = e.timeStamp; vx = 0;
      pos0 = d.pos;
      decided = false;
      draggedRef.current = false;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (!decided) {
        if (Math.hypot(dx, dy) < 8) return;
        decided = true;
        /* mostly vertical: that is the page scrolling, let it have it */
        if (Math.abs(dy) > Math.abs(dx)) { id = -1; return; }
        d.dragging = true;
        draggedRef.current = true;
        el.setPointerCapture(id);
      }
      const dt = Math.max(1, e.timeStamp - lastT);
      vx = vx * 0.6 + ((e.clientX - lastX) / dt) * 0.4;   // px/ms, smoothed
      lastX = e.clientX; lastT = e.timeStamp;

      let p = pos0 - dx / perCover();
      /* rubber-band past either end instead of a hard wall */
      if (p < 0) p = p / 3;
      else if (p > n - 1) p = n - 1 + (p - (n - 1)) / 3;
      d.pos = p;
    };

    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = -1;
      if (!d.dragging) return;
      d.dragging = false;
      /* velocity decays after the finger lifts, so a flick carries on a
         cover or two instead of stopping dead where it was let go */
      const fling = (-vx * 1000 * FLICK) / perCover();
      d.target = Math.max(0, Math.min(n - 1, Math.round(d.pos + fling)));
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      d.dragging = false;
    };
  }, [swipe, n]);

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
      data-swipe={swipe ? "" : undefined}
      ref={trackRef}
      style={{ "--covers": n } as CSSProperties}
    >
      <div className="work-stage" ref={stageRef}>
        {header}

        <div className="work-deck" ref={deckRef}>
          {projects.map((project, i) => (
            <a
              key={project.slug}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={`/work/${project.slug}`}
              className="work-item"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                if (draggedRef.current) {
                  draggedRef.current = false;
                  return;
                }
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
