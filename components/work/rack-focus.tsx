"use client";

import { useEffect } from "react";
import { glidePageTo } from "@/lib/scroll/smooth";

/* Bring the case you just pulled out to the middle of the screen.
 *
 * Opening a card adds its artwork below the spine, and for the ones low in
 * the rack that lands under the fold — you pull a case out and see a strip
 * of it. So on hover the page rides to put the OPEN height of that card in
 * the centre, through the same scroller as everything else, so it reads as
 * one continuous motion with the sleeve sliding open rather than a jump.
 *
 * The open height is worked out rather than measured: the card is still
 * collapsed at the moment the pointer arrives, and its artwork takes half a
 * second to appear, so waiting to measure would mean centring on a stale
 * rect or centring late. The image keeps its full height even while the row
 * around it is collapsed, which makes it a reliable stand-in.
 *
 * Ping-pong is the obvious hazard — scroll the page and the card moves out
 * from under the cursor, which could unhover it and scroll back. It does not
 * happen here because centring an OPEN card leaves the cursor well inside
 * that same card's much taller box; and the dead zone below keeps a card
 * that is already roughly centred from nudging at all. */
export function RackFocus() {
  useEffect(() => {
    /* pointer-driven by definition — on touch every card is already open,
       and reduced motion should not have the page move on its own */
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".work-item"));
    if (!cards.length) return;

    const onEnter = (event: Event) => {
      const card = event.currentTarget as HTMLElement;
      const art = card.querySelector<HTMLElement>(".work-art img");
      const rect = card.getBoundingClientRect();
      const openHeight = rect.height + (art?.offsetHeight ?? 0);

      /* never ask to scroll past the top of the document, and never centre
         something taller than the window — pin it to the top instead */
      const wantTop = Math.max(16, (window.innerHeight - openHeight) / 2);
      const delta = rect.top - wantTop;
      if (Math.abs(delta) < 32) return;

      glidePageTo(Math.max(0, window.scrollY + delta), 0.55);
    };

    cards.forEach((c) => c.addEventListener("pointerenter", onEnter));
    return () => cards.forEach((c) => c.removeEventListener("pointerenter", onEnter));
  }, []);

  return null;
}
