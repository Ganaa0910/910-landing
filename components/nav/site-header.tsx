"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./page-shell";

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

  /* the case studies keep v1's dark art direction, so the bar inverts */
  const dark = pathname.startsWith("/work/");

  return (
    <header className={`site-header${dark ? " on-dark" : ""}`}>
      <TransitionLink className="hdr-back" href={back.href}>
        <span aria-hidden="true">←</span> {back.label}
      </TransitionLink>

      {/* painted via CSS mask rather than <img> so the same file can flip
          to paper on the case studies' dark ground */}
      <TransitionLink className="hdr-mark" href="/">
        <span className="sr-only">910studies — home</span>
      </TransitionLink>

      <TransitionLink className="hdr-cta" href="/contact">
        Start a project
      </TransitionLink>
    </header>
  );
}
