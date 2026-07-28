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
   in this session — a fraction of the scroll track. 0.26 lands in S2, past
   the intro and short of the S3 collapse at 0.34. */
const REEL_S2 = 0.26;

/* Long enough for a smooth scroll to the top to settle before the page
   starts leaving. */
const TO_TOP_MS = 420;

type NavContextValue = {
  navigate: (href: string) => void;
  leaving: boolean;
};

const NavContext = createContext<NavContextValue>({
  navigate: () => {},
  leaving: false,
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

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      scrollMemory.current[pathname] = window.scrollY;
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
    },
    [pathname, router],
  );

  /* the new route has landed — drop the exit state so the entrance plays */
  useEffect(() => {
    setLeaving(false);

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
    <NavContext.Provider value={{ navigate, leaving }}>
      {children}
    </NavContext.Provider>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { leaving } = useContext(NavContext);
  const pathname = usePathname();

  return (
    <div className={`shell${leaving ? " leaving" : ""}`}>
      {/* keyed on the path so the entrance animation re-runs per route */}
      <div className="shell-inner" key={pathname}>
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
