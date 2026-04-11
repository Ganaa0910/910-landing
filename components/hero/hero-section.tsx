"use client";

import { useState, useEffect, useCallback, useRef, Suspense, lazy } from "react";
import Link from "next/link";
import gsap from "gsap";
import { THEMES, getTheme, getNextThemeIndex, DEFAULT_THEME_INDEX } from "@/lib/themes";
import { HandwritingText } from "./handwriting-text";

const BACKGROUND_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>> = {
  Silk: lazy(() => import("@/components/Silk")),
  LiquidChrome: lazy(() => import("@/components/LiquidChrome")),
  Aurora: lazy(() => import("@/components/Aurora")),
  Iridescence: lazy(() => import("@/components/Iridescence")),
  Waves: lazy(() => import("@/components/Waves")),
};

function ThemeIndicator({ name, index }: { name: string; index: number }) {
  return (
    <div className="absolute bottom-8 right-8 z-20 text-xs text-zinc-600 hidden sm:block">
      <span className="text-zinc-500">theme:</span>{" "}
      <span className="text-accent">{name}</span>
      <span className="ml-3 text-zinc-700">
        [{index + 1}/{THEMES.length}]
      </span>
      <br />
      <span className="text-zinc-700">[space] switch / [1-{THEMES.length}] select</span>
    </div>
  );
}

export function HeroSection() {
  const [themeIndex, setThemeIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("910-theme");
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < THEMES.length) return parsed;
      }
    }
    return DEFAULT_THEME_INDEX;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const theme = getTheme(themeIndex);

  // Middle row height expands — pushes top and bottom apart (once)
  useEffect(() => {
    if (!heroTextRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const middle = heroTextRef.current.querySelector('[data-hero-line="middle"]') as HTMLElement;
    if (!middle) return;

    gsap.set(middle, { height: 0 });

    gsap.to(middle, {
      height: "auto",
      duration: 0.5,
      delay: 1.75, // synced with drag start in HandwritingText
      ease: "power3.in",
    });
  }, []);

  const switchTheme = useCallback(
    (nextIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      setTimeout(() => {
        setThemeIndex(nextIndex);
        localStorage.setItem("910-theme", String(nextIndex));
        setTimeout(() => setIsTransitioning(false), 200);
      }, 150);
    },
    [isTransitioning],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        switchTheme(getNextThemeIndex(themeIndex));
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= THEMES.length) {
        e.preventDefault();
        switchTheme(num - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [themeIndex, switchTheme]);

  const BackgroundComponent = BACKGROUND_COMPONENTS[theme.background.component];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden">
      {/* WebGL Background */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-30"
        }`}
      >
        <Suspense fallback={null}>
          {BackgroundComponent && <BackgroundComponent {...theme.background.props} />}
        </Suspense>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-base-black via-base-black/60 to-transparent" />

      {/* Top metadata */}
      <div className="relative z-10 px-8 pt-24">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-xs text-zinc-500">910studio</p>
          <p className="text-xs text-zinc-600">creative web studio</p>
          <p className="text-2xs text-zinc-700">ulaanbaatar, mn</p>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 px-8">
        <div className="mx-auto max-w-[1120px]">
          <div ref={heroTextRef}>
            <div
              data-hero-line="top"
              className="font-bebas text-7xl uppercase leading-none tracking-wide text-zinc-50 sm:text-8xl lg:text-[10rem]"
            >
              we build the
            </div>
            <div data-hero-line="middle" style={{ height: 0 }}>
              <HandwritingText
                color={theme.accent}
                delay={0.6}
              />
            </div>
            <div
              data-hero-line="bottom"
              className="font-bebas text-7xl uppercase leading-none tracking-wide text-zinc-50 sm:text-8xl lg:text-[10rem]"
            >
              matter
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 px-8 pb-8">
        <div className="mx-auto flex max-w-[1120px] items-end justify-between">
          <div className="flex gap-3">
            <Link
              href="/work"
              className="cartoon-shadow bg-base-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-200"
            >
              view work
            </Link>
            <Link
              href="/contact"
              className="cartoon-shadow-accent px-6 py-3 text-xs font-semibold uppercase tracking-wider text-base-black"
              style={{ backgroundColor: theme.accent }}
            >
              get in touch
            </Link>
          </div>

          <ThemeIndicator name={theme.name} index={themeIndex} />
        </div>
      </div>

      {/* Mobile theme switch hint */}
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:hidden">
        <button
          type="button"
          onClick={() => switchTheme(getNextThemeIndex(themeIndex))}
          className="text-2xs text-zinc-700 active:text-zinc-500"
        >
          tap to switch theme
        </button>
      </div>
    </section>
  );
}
