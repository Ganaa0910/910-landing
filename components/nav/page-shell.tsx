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

const NavContext = createContext<(href: string) => void>(() => {});

export function useTransitionNav() {
  return useContext(NavContext);
}

export function PageShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      setLeaving(true);
      /* Tell the object where it is going now, rather than letting it find
         out when the URL changes. The sequence is: page slides out WHILE the
         globe shrinks, then the next page slides in — if the morph waited
         for the route it would start late and land after the arrival. */
      window.dispatchEvent(new CustomEvent("reel:route", { detail: href }));
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => router.push(href), EXIT_MS);
    },
    [pathname, router],
  );

  /* the new route has landed — drop the exit state so the entrance plays */
  useEffect(() => {
    setLeaving(false);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  return (
    <NavContext.Provider value={navigate}>
      <div className={`shell${leaving ? " leaving" : ""}`}>
        {/* keyed on the path so the entrance animation re-runs per route */}
        <div className="shell-inner" key={pathname}>
          {children}
        </div>
      </div>
    </NavContext.Provider>
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
