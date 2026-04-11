"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";

const PAGE_ORDER = ["/", "/work", "/studio", "/contact"];

function getPageIndex(pathname: string): number {
  const idx = PAGE_ORDER.indexOf(pathname);
  return idx === -1 ? -1 : idx;
}

function getPageLabel(path: string): string {
  if (path === "/") return "home";
  return path.slice(1);
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "exit" | "wipe" | "enter">("idle");
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lenisRef = useRef<Lenis | null>(null);
  const overscrollAccum = useRef(0);
  const cooldown = useRef(false);
  const rafRef = useRef<number>(0);
  const prevPathname = useRef(pathname);
  const currentIndex = getPageIndex(pathname);

  const OVERSCROLL_THRESHOLD = 120;
  const DECAY_RATE = 0.92;

  // Prefetch ALL pages on mount so transitions are instant
  useEffect(() => {
    PAGE_ORDER.forEach((page) => {
      router.prefetch(page);
    });
  }, [router]);

  const navigate = useCallback(
    (dir: "up" | "down") => {
      if (cooldown.current || currentIndex === -1) return;

      const targetIndex = dir === "down" ? currentIndex + 1 : currentIndex - 1;
      if (targetIndex < 0 || targetIndex >= PAGE_ORDER.length) return;

      cooldown.current = true;
      overscrollAccum.current = 0;
      const target = PAGE_ORDER[targetIndex];
      setDirection(dir);

      // Stop Lenis during transition
      lenisRef.current?.stop();

      // Phase 1: Exit — content slides away
      setPhase("exit");

      // Phase 2: Wipe — black screen covers
      setTimeout(() => {
        setPhase("wipe");

        // Navigate during wipe — page is already prefetched so instant
        setTimeout(() => {
          router.push(target, { scroll: false });
        }, 400);
      }, 500);
    },
    [currentIndex, router],
  );

  // Detect route change and reveal new page
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      if (phase === "wipe") {
        // Route changed while wipe is covering — hold wipe, then reveal
        const timer = setTimeout(() => {
          window.scrollTo(0, 0);
          lenisRef.current?.scrollTo(0, { immediate: true });
          setPhase("enter");

          setTimeout(() => {
            setPhase("idle");
            lenisRef.current?.start();
            setTimeout(() => {
              cooldown.current = false;
            }, 400);
          }, 700);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, phase]);

  // Lenis setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  // Wheel overscroll detection
  useEffect(() => {
    if (currentIndex === -1) return;

    const decayTimer = setInterval(() => {
      overscrollAccum.current *= DECAY_RATE;
      if (Math.abs(overscrollAccum.current) < 1) overscrollAccum.current = 0;
    }, 50);

    const handleWheel = (e: WheelEvent) => {
      if (cooldown.current || phase !== "idle") return;

      const lenis = lenisRef.current;
      if (!lenis) return;

      const atTop = lenis.scroll <= 2;
      const atBottom = lenis.scroll >= lenis.limit - 2;

      if (e.deltaY > 0 && atBottom && currentIndex < PAGE_ORDER.length - 1) {
        overscrollAccum.current += Math.abs(e.deltaY);
        if (overscrollAccum.current >= OVERSCROLL_THRESHOLD) {
          navigate("down");
        }
      } else if (e.deltaY < 0 && atTop && currentIndex > 0) {
        overscrollAccum.current += Math.abs(e.deltaY);
        if (overscrollAccum.current >= OVERSCROLL_THRESHOLD) {
          navigate("up");
        }
      } else {
        overscrollAccum.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearInterval(decayTimer);
    };
  }, [currentIndex, navigate, phase]);

  // Touch support
  useEffect(() => {
    if (currentIndex === -1) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldown.current || phase !== "idle") return;

      const lenis = lenisRef.current;
      if (!lenis) return;

      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const atTop = lenis.scroll <= 2;
      const atBottom = lenis.scroll >= lenis.limit - 2;

      if (deltaY > 80 && atBottom && currentIndex < PAGE_ORDER.length - 1) {
        navigate("down");
      } else if (deltaY < -80 && atTop && currentIndex > 0) {
        navigate("up");
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, navigate, phase]);

  const contentStyle: React.CSSProperties = (() => {
    switch (phase) {
      case "exit":
        return {
          transition: "transform 500ms cubic-bezier(0.62, 0.05, 0.36, 1), opacity 400ms ease-in",
          transform: direction === "down" ? "translateY(-6vh)" : "translateY(6vh)",
          opacity: 0,
        };
      case "wipe":
        return {
          transform: direction === "down" ? "translateY(-6vh)" : "translateY(6vh)",
          opacity: 0,
        };
      case "enter":
        return {
          transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: "translateY(0)",
          opacity: 1,
        };
      default:
        return {
          transform: "translateY(0)",
          opacity: 1,
        };
    }
  })();

  return (
    <>
      <div style={contentStyle}>
        {children}
      </div>

      {/* Wipe overlay with loader */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9990,
          backgroundColor: "#0a0a0a",
          pointerEvents: phase === "idle" ? "none" : "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform:
            phase === "wipe" || phase === "enter"
              ? "translateY(0)"
              : direction === "down"
                ? "translateY(100%)"
                : "translateY(-100%)",
          opacity: phase === "enter" ? 0 : 1,
          transition:
            phase === "wipe"
              ? "transform 600ms cubic-bezier(0.62, 0.05, 0.36, 1)"
              : phase === "enter"
                ? "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms"
                : "none",
        }}
      >
        {phase === "wipe" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", animation: "loader-in 300ms ease forwards" }}>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#27272a", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", backgroundColor: "#14b8a6", animation: "loader-slide 0.8s ease-in-out infinite" }} />
            </div>
            <p
              className="font-bebas"
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#52525b",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {getPageLabel(PAGE_ORDER[
                direction === "down"
                  ? Math.min(currentIndex + 1, PAGE_ORDER.length - 1)
                  : Math.max(currentIndex - 1, 0)
              ])}
            </p>
          </div>
        )}
      </div>

      {/* Next page hint */}
      {currentIndex < PAGE_ORDER.length - 1 && currentIndex !== -1 && phase === "idle" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "48px 0",
            backgroundColor: "#0a0a0a",
            borderTop: "1px solid #27272a",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <p style={{
              margin: 0,
              fontSize: "11px",
              color: "#71717a",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}>
              next
            </p>
            <p
              className="font-bebas"
              style={{
                margin: 0,
                fontSize: "32px",
                color: "#e4e4e7",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              {getPageLabel(PAGE_ORDER[currentIndex + 1])}
            </p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#71717a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "hint-bounce 2s ease-in-out infinite", marginTop: "4px" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      )}

      <style>{`
        @keyframes hint-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes loader-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
