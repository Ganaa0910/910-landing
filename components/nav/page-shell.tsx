"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

/* Page transitions.
 *
 * Next unmounts the outgoing page the moment you navigate, so there is
 * nothing left to animate out. The fix is to delay the navigation: play the
 * exit first, then push, then play the entrance. The shell lives in the root
 * layout so it survives the route change and can hold that state.
 *
 * The canvas is deliberately NOT inside this — it sits alongside in the
 * layout, so the object keeps drawing live while the content slides past it.
 * That is also why this is hand-rolled rather than using the View
 * Transitions API: view transitions snapshot the document as an image, which
 * would freeze the globe mid-roll — the one thing that has to stay live. */

const EXIT_MS = 300;

/* Where the reel sits when you come back to it having never scrolled there
   in this session — a fraction of the scroll track. 0.23 sits in the S2
   hold, past the arrival at 0.17 and clear of the S3 collapse at 0.30. Keep
   it between those two; they live in PHASE in lib/reel/engine.ts. */
const REEL_S2 = 0.23;

/* Long enough for a smooth scroll to the top to settle before the page
   starts leaving. */
const TO_TOP_MS = 420;

type NavContextValue = {
  navigate: (href: string) => void;
  leaving: boolean;
  /* false until the first in-app navigation — a cold load is not a
     transition, so it must not play the transition's entrance */
  navigated: boolean;
};

const NavContext = createContext<NavContextValue>({
  navigate: () => {},
  leaving: false,
  navigated: false,
});

export function useTransitionNav() {
  return useContext(NavContext).navigate;
}

/* Sits ABOVE both the header and the sliding shell. It has to: the header is
   deliberately outside the shell so it stays put while pages move under it,
   and when the provider lived inside the shell the header's links read the
   context default — a no-op — so the back button did nothing at all. */
export function NavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Where the reader was on each page. Coming back to the reel at the very
     top would replay the whole approach to S2, which is not where they
     left from — the "View works" CTA lives in S2. */
  const scrollMemory = useRef<Record<string, number>>({});

  /* ...but only ever on the way BACK. This effect also runs on first mount,
     so without this flag a cold visit to the home page got scrolled straight
     into S2 — past the entire intro, which is the first thing anyone sees.
     A hard load has no "where you were" to restore; leave the scroll where
     the browser put it.

     A ref rather than the state below because the scroll effect keys on
     pathname alone: making it depend on state would re-run the restore
     mid-exit, when the flag flips but the route has not changed yet. */
  const cameFromAnotherPage = useRef(false);

  /* the same fact, as state, because the shell has to re-render to drop the
     entrance animation class */
  const [navigated, setNavigated] = useState(false);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;

      const depart = (from: number) => {
        scrollMemory.current[pathname] = from;
        cameFromAnotherPage.current = true;
        setNavigated(true);
        setLeaving(true);
        /* Tell the object where it is going now, rather than letting it find
           out when the URL changes. The sequence is: page slides out WHILE the
           globe shrinks, then the next page slides in — if the morph waited
           for the route it would start late and land after the arrival. */
        window.dispatchEvent(new CustomEvent("reel:route", { detail: href }));
        if (timer.current) clearTimeout(timer.current);
        /* scroll: false — Next would jump to the top on commit, undoing the
           restore below before it has a chance to run */
        timer.current = setTimeout(() => router.push(href, { scroll: false }), EXIT_MS);
      };

      /* Leaving an inner page from halfway down slid the content sideways
         from wherever it happened to be, which read as a jump cut. Ride to
         the top first — on the work index that also walks the rail's ball
         back to its first checkpoint, so the object departs from a settled
         position rather than mid-track.

         The reel is exempt: scrolling it to the top would rewind the whole
         approach to S2 on the way out, which is the opposite of leaving
         cleanly. Reduced motion skips the ride and just goes. */
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (pathname !== "/" && !reduced && window.scrollY > 8) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => depart(0), TO_TOP_MS);
        return;
      }

      depart(window.scrollY);
    },
    [pathname, router],
  );

  /* the new route has landed — drop the exit state so the entrance plays */
  useEffect(() => {
    setLeaving(false);

    /* cold load: nothing to restore, and the reel must start at S1 so the
       intro actually plays */
    if (!cameFromAnotherPage.current) return;

    const remembered = scrollMemory.current[pathname];
    let tries = 0;
    let frame = 0;

    const place = () => {
      if (remembered != null) {
        window.scrollTo(0, remembered);
        return;
      }
      if (pathname !== "/") {
        window.scrollTo(0, 0);
        return;
      }
      /* first time back on the reel: wait for it to exist, then land in S2
         rather than at the very top */
      const reel = document.querySelector<HTMLElement>("[data-reel]");
      if (!reel && tries++ < 30) {
        frame = requestAnimationFrame(place);
        return;
      }
      const track = reel ? reel.offsetHeight - window.innerHeight : 0;
      window.scrollTo(0, track > 0 ? track * REEL_S2 : 0);
    };

    frame = requestAnimationFrame(place);

    return () => {
      cancelAnimationFrame(frame);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  return (
    <NavContext.Provider value={{ navigate, leaving, navigated }}>
      {children}
    </NavContext.Provider>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { leaving, navigated } = useContext(NavContext);
  const pathname = usePathname();

  return (
    <div className={`shell${leaving ? " leaving" : ""}`}>
      {/* keyed on the path so the entrance animation re-runs per route.
          `cold` on the very first mount: there is no page being transitioned
          from, and playing the entrance anyway drags the whole reel in from
          the right while S1's mark is still assembling itself. */}
      <div className={`shell-inner${navigated ? "" : " cold"}`} key={pathname}>
        {children}
      </div>
    </div>
  );
}

/* Use in place of next/link for internal navigation that should slide.
   Keeps a real <a href> so it is still a link to the browser, to a crawler,
   and to anyone middle-clicking it. */
export function TransitionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const navigate = useTransitionNav();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    /* let the browser handle anything that is not a plain left click —
       new tab, new window, download */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
