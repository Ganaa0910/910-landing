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
import { glidePageTo, scrollPageTo } from "@/lib/scroll/smooth";

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

/* How long to hold the outgoing page on screen before committing the route.
   It has to equal the pageOut animation exactly — commit early and the page
   vanishes mid-slide, commit late and it sits blank at the end of one — so
   it is read back off the stylesheet that owns the animation rather than
   copied here, where the two would silently drift the next time one is
   retuned. The fallback only matters if the sheet has not parsed yet. */
function exitMs(): number {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--t-page-out")
    .trim();
  const ms = v.endsWith("ms") ? parseFloat(v) : parseFloat(v) * 1000;
  return Number.isFinite(ms) && ms > 0 ? ms : 520;
}

/* Where the reel sits when you come back to it having never scrolled there
   in this session — a fraction of the scroll track. 0.23 sits in the S2
   hold, past the arrival at 0.17 and clear of the S3 collapse at 0.30. Keep
   it between those two; they live in PHASE in lib/reel/engine.ts. */
const REEL_S2 = 0.23;

/* The ride to the top before an inner page leaves. Given an explicit
   duration rather than left to the scroller's own pacing, because the wait
   below has to match it: 420ms was a guess at how long an interpolated
   scroll from an unknown position would take, and from far down the work
   index it was not close. Now both come from one number. */
const TO_TOP_S = 0.7;
const TO_TOP_MS = TO_TOP_S * 1000;

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
        /* Tell the object where it is going NOW, rather than letting it find
           out when the URL changes — the morph has to be well under way by
           the time the page has finished leaving. The order it buys is: the
           page goes, the object lands on the rail alone, then the work
           arrives. The waiting is done by .await-object in app/reel.css; all
           that happens here is starting the object early enough for there to
           be something to wait for. */
        window.dispatchEvent(new CustomEvent("reel:route", { detail: href }));
        if (timer.current) clearTimeout(timer.current);
        /* scroll: false — Next would jump to the top on commit, undoing the
           restore below before it has a chance to run */
        timer.current = setTimeout(() => router.push(href, { scroll: false }), exitMs());
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
        glidePageTo(0, TO_TOP_S) || scrollPageTo(0);
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
        scrollPageTo(remembered, { immediate: true });
        return;
      }
      if (pathname !== "/") {
        scrollPageTo(0, { immediate: true });
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
      scrollPageTo(track > 0 ? track * REEL_S2 : 0, { immediate: true });
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

/* Routes the shared object actually travels to, and so has to be waited
   for. Everywhere else it is simply hidden, and holding the entrance open
   for a morph that is not happening would just be dead air. */
const OBJECT_ROUTES = ["/work"];

export function PageShell({ children }: { children: ReactNode }) {
  const { leaving, navigated } = useContext(NavContext);
  const pathname = usePathname();
  /* not on a cold load: there is no outgoing page, so there is no sequence
     to be second in */
  const awaitObject = navigated && OBJECT_ROUTES.includes(pathname);

  return (
    <div className={`shell${leaving ? " leaving" : ""}`}>
      {/* keyed on the path so the entrance animation re-runs per route.
          `cold` on the very first mount: there is no page being transitioned
          from, and playing the entrance anyway drags the whole reel in from
          the right while S1's mark is still assembling itself. */}
      <div
        className={`shell-inner${navigated ? "" : " cold"}${awaitObject ? " await-object" : ""}`}
        key={pathname}
      >
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
