"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./page-shell";
import { getProject } from "@/lib/projects";

/* Where "back" goes, per route. An explicit destination rather than
 * history.back() — someone arriving from a shared link has no history to go
 * back to, and a button that sometimes leaves the site is worse than none. */
function backTarget(pathname: string): { href: string; label: string } | null {
  if (pathname === "/") return null;                       // the reel is the root
  if (pathname.startsWith("/work/")) return { href: "/work", label: "Work" };
  return { href: "/", label: "Home" };
}

export function SiteHeader() {
  const pathname = usePathname();
  const back = backTarget(pathname);

  /* the home page has the mark as its centrepiece; a second one in a bar
     on top of it would be two logos arguing */
  if (!back) return null;

  /* The bar inverts to match the ground the case study actually sits on —
     and that ground is the client's, not ours, so it has to come from the
     project's palette rather than from the path. Reading it off
     `pathname.startsWith("/work/")` forced a dark bar onto every case study,
     which was only ever right because every case study happened to be dark;
     the first paper one put a black bar on a near-white page. */
  const slug = pathname.startsWith("/work/")
    ? pathname.slice("/work/".length).split("/")[0]
    : null;
  const dark = slug ? getProject(slug)?.palette.mode === "dark" : false;

  /* The wordmark answers the section. The work pages are studies, so the bar
     reads 910studies there — index and individual case study alike, since a
     case study is the thing the pun is about. Everywhere else it is the
     studio. Two cuts of the same lockup: identical 910 grid, different tail
     on the word. */
  const studies = pathname.startsWith("/work");

  return (
    /* Three slots, not three items. The mark has to land on the middle of
       the bar, and it only does that if whatever flanks it claims the same
       width — space-between centres it in the space left over instead, which
       pushed it 50px left of centre behind the wider CTA, and threw it 226px
       right once the CTA hides itself under 640px. The slots hold their half
       whether or not there is anything in them. They are wrappers rather
       than flex on the links themselves so the clickable area stays the size
       of the words, not half the header. */
    <header className={`site-header${dark ? " on-dark" : ""}`}>
      <div className="hdr-slot">
        <TransitionLink className="hdr-back" href={back.href}>
          <span aria-hidden="true">←</span> {back.label}
        </TransitionLink>
      </div>

      {/* painted via CSS mask rather than <img> so either cut can flip to
          paper on the case studies' dark ground */}
      <TransitionLink className={`hdr-mark${studies ? " studies" : ""}`} href="/">
        {/* the accessible name follows what is actually on screen */}
        <span className="sr-only">{studies ? "910studies" : "910studio"} — home</span>
      </TransitionLink>

      <div className="hdr-slot end">
        <TransitionLink className="hdr-cta" href="/contact">
          Start a project
        </TransitionLink>
      </div>
    </header>
  );
}
