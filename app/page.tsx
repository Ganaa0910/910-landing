"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import gsap from "gsap";

// New utilities and state management
import {
  type ComboState,
  generateRandomCombo,
  changeBackground,
  changeFont,
  changeColorPalette,
  randomizeAll,
  getPalette,
  getFont,
  getAccentColor,
  SIGNATURE_COMBOS,
} from "@/lib/combo-state";
import {
  getBackgroundByIndex,
  getNextBackgroundIndex,
  getPrevBackgroundIndex,
  backgroundNames,
} from "@/lib/background-registry";
import { trackEvent } from "@/lib/analytics";

// New hooks
import { useKeyboardShortcuts, type ShortcutConfig } from "@/hooks/useKeyboardShortcuts";
import { useComboUrlSync } from "@/hooks/useComboUrlSync";
import { useBackgroundTransition } from "@/hooks/useBackgroundTransition";
import { useFavorites } from "@/hooks/useFavorites";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useTypedCommands } from "@/hooks/useTypedCommands";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

// New components
import { HelpOverlay } from "@/components/HelpOverlay";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { Toast, useToast } from "@/components/Toast";
import { CRTBootLoader } from "@/components/CRTBootLoader";
import { CustomCursor } from "@/components/CustomCursor";
import { TVStatic } from "@/components/TVStatic";

// Taglines
const quirkyLines = [
  // REFINED CLASSICS
  "refined by design. defined by code.",
  "where intention meets interaction",
  "crafted, not constructed",
  "beyond beautiful. built right.",
  "where craft meets code",
  "performance meets poetry",
  "obsessively refined",

  // COCKY & CONFIDENT
  "fuck around and find out",
  "built different. literally.",
  "your idea. our execution. their envy.",
  "we don't do boring",
  "too fast. too clean. too good.",
  "zero bullshit. pure execution.",
  "we build monuments, not websites",
  "ctrl+alt+elite",
  "your unfair advantage",
  "making the web sexier",
  "we don't follow trends. we set them.",
  "better than your ex's new website",
  "sorry bout your other options",
  "we're the reason they're nervous",
  "main character websites only",
  "your competition hates us",
  "not for the faint of budget",
  "we don't pitch. we get picked.",
  "out of your league? maybe.",
  "the website your brand deserves",
  "too pretty to be this functional",
  "yes, we know we're good",
  "humble isn't our font",

  // BRATTY & PLAYFUL
  "it's giving... everything",
  "slay then ship",
  "no thoughts just pixels",
  "vibes checked. site shipped.",
  "ate and left no crumbs",
  "understood the assignment",
  "she's beauty, she's grace, she's loading at pace",
  "not your dad's web agency",
  "delulu is the solulu",
  "giving what needed to be gave",
  "the audacity to be this good",
  "rent free in their browser tabs",
  "it's called taste, look it up",
  "mother is mothering",
  "no notes. just ship it.",
  "sickening, no?",

  // Y2K & DIGITAL NOSTALGIA
  "loading your digital destiny...",
  "error 404: boring not found",
  "welcome to your inbox's favorite sender",
  "now buffering greatness",
  "you've got site",
  "please wait... perfection loading",
  "new site who dis",
  "downloading main character energy",
  "your cache can't handle this",
  "bandwidth for the bold",
  "dial-up dreamers, fiber optic delivery",
  "buffering... just kidding, we're fast",
  "AOL away message: building your empire",
  "webmaster certified baddie",
  "under construction (forever evolving)",
  "hit counter: infinity",
  "best viewed at any resolution",
  "optimized for stunting",
  "cookies? we prefer the whole bakery",

  // VAPORWAVE & AESTHETIC
  "a e s t h e t i c a l l y   e n g i n e e r e d",
  "digital dreams in high resolution",
  "neon-lit and pixel-perfect",
  "sunset gradients & clean code",
  "late night pixels, early morning deploys",
  "chrome reflections, sharp designs",
  "mall music for the modern web",
  "retrowave meets real results",
  "palm trees and perfect padding",
  "vapor trails and version control",
  "synthesized aesthetics",
  "feeling cute, might deploy later",
  "liminal web spaces",
  "windows 95 soul, 2025 execution",
  "corporate aesthetic, indie heart",
  "endless scroll, endless style",
  "somewhere between dream and deploy",

  // UNHINGED & CHAOTIC
  "chaotic good code",
  "feral but make it functional",
  "feral pixel energy",
  "unhinged and well-documented",
  "menace to bad design",
  "slightly unhinged, fully optimized",
  "a lil toxic, a lot talented",
  "chaos coordinated",
  "trust issues? here's our portfolio",
  "emotionally unavailable for bad clients",
  "situationship with perfection",
  "gaslight, gatekeep, girlboss your brand",
  "hot girl shit but make it semantic",

  // FLEX & FINESSE
  "taste meets tech",
  "vibes + velocity = victory",
  "code like poetry. ship like clockwork.",
  "aesthetics are non-negotiable",
  "make them stop scrolling",
  "build loud. ship fast.",
  "making pixels dance",
  "where vision becomes velocity",
  "built for virality",
  "designed to be screenshotted",
  "building experiences that hit different",
  "where code becomes culture",
];

// Fonts that need extra letter spacing
const wideSpacingFonts = new Set([
  "--font-fjalla",
  "--font-ultra",
  "--font-black-ops",
  "--font-unbounded",
  "--font-staatliches",
  "--font-block-talk",
  "--font-gnaw-hard",
  "--font-hardstyle",
  "--font-harden",
  "--font-vermin-verile",
  "--font-modeccio",
  "--font-helicopta",
]);

const getLetterSpacing = (font: string): string => {
  return wideSpacingFonts.has(font) ? "0.05em" : "normal";
};

function HomePage() {
  // Consistent UI font
  const uiFont = "--font-ibm-plex-mono";

  // Combo state (centralized)
  // Start with 910 signature combo to avoid SSR hydration mismatch
  const [combo, setCombo] = useState<ComboState>(SIGNATURE_COMBOS["910"]);

  // Derived state
  const palette = getPalette(combo);
  const displayFont = getFont(combo);
  const accentColor = getAccentColor(combo);
  const tagline = quirkyLines[combo.taglineIndex];

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Toast notifications
  const { toast, showToast } = useToast();

  // Favorites management
  const { favorites, addFavorite, removeFavorite, clearFavorites, isFavorited } =
    useFavorites();

  // Background transition system with TV static effect
  const { current, showStatic, transitionTo, handleStaticMidpoint, handleStaticComplete } =
    useBackgroundTransition({
      element: getBackgroundByIndex(combo.backgroundIndex, palette),
      key: `bg-${combo.backgroundIndex}-${palette.name}`,
    });

  // Refs for GSAP animations
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // URL parameter sync
  const hasUrlComboRef = useRef(false);
  const updateUrl = useComboUrlSync((decodedCombo) => {
    console.log("🔗 Loading combo from URL");
    hasUrlComboRef.current = true;
    setCombo(decodedCombo);
    trackEvent({ type: "combo_share" as const, combo: decodedCombo });
  });

  // Randomize on mount if no URL combo param
  useEffect(() => {
    // Small delay to let URL sync run first
    const timer = setTimeout(() => {
      if (!hasUrlComboRef.current) {
        setCombo(generateRandomCombo(quirkyLines.length));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update URL when combo changes
  useEffect(() => {
    updateUrl(combo);
    trackEvent({ type: "combo_view" as const, combo });
  }, [combo, updateUrl]);

  // Update background when combo changes
  // Track previous background index to detect background vs palette-only changes
  const prevBackgroundIndexRef = useRef(combo.backgroundIndex);

  useEffect(() => {
    const newBackground = {
      element: getBackgroundByIndex(combo.backgroundIndex, palette),
      key: `bg-${combo.backgroundIndex}-${palette.name}`,
    };

    // If background index changed: smooth transition
    // If only background palette changed: instant swap (no flash)
    const isBackgroundChange = prevBackgroundIndexRef.current !== combo.backgroundIndex;
    prevBackgroundIndexRef.current = combo.backgroundIndex;

    transitionTo(newBackground, !isBackgroundChange); // instant=true for palette changes
  }, [combo.backgroundIndex, combo.paletteIndex]); // Only background palette, not uiPalette

  // Handlers
  const handleRandomizeAll = () => {
    setCombo(randomizeAll(combo, quirkyLines.length));
  };

  const handleChangeFont = () => {
    // Font change with RGB CRT glitch
    if (!titleRef.current) return;

    const newCombo = changeFont(combo);

    const tl = gsap.timeline({
      onComplete: () => setCombo(newCombo),
    });

    // RGB CRT glitch sequence
    tl.to(titleRef.current, {
      textShadow: `3px 0 0 #ff0000, -3px 0 0 #00ffff, 0 0 25px rgba(255,255,255,0.6)`,
      duration: 0.06,
      ease: "none",
    })
    .to(titleRef.current, {
      textShadow: `-4px 0 0 #ff0000, 4px 0 0 #00ffff, 0 3px 0 #00ff00`,
      x: -4,
      duration: 0.06,
      ease: "none",
    })
    .to(titleRef.current, {
      textShadow: `5px 0 0 #00ffff, -5px 0 0 #ff00ff, 0 -3px 0 #ffff00`,
      x: 5,
      scaleX: 1.03,
      duration: 0.06,
      ease: "none",
    })
    .to(titleRef.current, {
      textShadow: "none",
      x: 0,
      scaleX: 1,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleChangeColor = () => {
    setCombo(changeColorPalette(combo));
  };

  const handleChangeBackground = () => {
    setCombo(changeBackground(combo));
  };

  const handleSaveFavorite = () => {
    if (isFavorited(combo)) {
      showToast("Already in favorites!");
    } else {
      addFavorite(combo);
      showToast("Saved to favorites!");
      trackEvent({ type: "favorite_save" as const, combo });
    }
  };

  const handleLoadFavorite = (favCombo: ComboState) => {
    setCombo(favCombo);
    setShowFavorites(false);
    showToast("Favorite loaded!");
    trackEvent({ type: "favorite_load" as const, combo: favCombo });
  };

  // Keyboard shortcuts
  const shortcuts: ShortcutConfig[] = [
    { key: " ", description: "Randomize all", handler: handleRandomizeAll, preventDefault: true },
    { key: "f", description: "Change font", handler: handleChangeFont },
    { key: "c", description: "Change color", handler: handleChangeColor },
    { key: "b", description: "Change background", handler: handleChangeBackground },
    { key: "s", description: "Save to favorites", handler: handleSaveFavorite },
    { key: "v", description: "View favorites", handler: () => setShowFavorites(!showFavorites) },
    { key: "?", description: "Show help", handler: () => setShowHelp(!showHelp) },
    { key: "Escape", description: "Close modal/help", handler: () => {
      // Only handle main modal here - HelpOverlay and FavoritesPanel handle their own ESC
      if (showModal) closeModal();
    }},
  ];

  useKeyboardShortcuts(shortcuts, !showHelp && !showFavorites);

  // Easter eggs
  useKonamiCode(() => {
    // TODO: Load secret Matrix background
    showToast("Konami code activated! 🎮");
    trackEvent({ type: "easter_egg" as const, egg: "konami" });
  });

  useTypedCommands({
    "910": () => {
      setCombo(SIGNATURE_COMBOS["910"]);
      showToast("910 signature loaded 🎨");
      trackEvent({ type: "easter_egg" as const, egg: "910" });
    },
    "gray": () => {
      setCombo(SIGNATURE_COMBOS["gray"]);
      showToast("Gray mode activated 🔥");
      trackEvent({ type: "easter_egg" as const, egg: "gray" });
    },
  });

  // Mobile gestures
  useSwipeGesture(containerRef, {
    onSwipeLeft: () => {
      const nextIdx = getNextBackgroundIndex(combo.backgroundIndex);
      setCombo({ ...combo, backgroundIndex: nextIdx });
    },
    onSwipeRight: () => {
      const prevIdx = getPrevBackgroundIndex(combo.backgroundIndex);
      setCombo({ ...combo, backgroundIndex: prevIdx });
    },
    onSwipeUp: handleChangeColor, // NEW: swipe up for colors
    onSwipeDown: handleChangeColor, // NEW: swipe down for colors
    onDoubleTap: handleRandomizeAll,
    onLongPress: () => setShowFavorites(true),
  });

  // Modal animations (existing code preserved)
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    if (!modalRef.current || !backdropRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => setShowModal(false),
    });

    timeline
      .to(modalRef.current, {
        scaleY: 0.02,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(
        modalRef.current,
        {
          scaleX: 0.01,
          scaleY: 0.01,
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "+=0.05"
      )
      .to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        0
      );
  };

  useEffect(() => {
    if (showModal && modalRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      const timeline = gsap.timeline();
      timeline
        .set(modalRef.current, {
          scaleX: 0.01,
          scaleY: 0.01,
          opacity: 0.5,
        })
        .to(modalRef.current, {
          scaleX: 1,
          scaleY: 0.02,
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        })
        .to(modalRef.current, {
          scaleY: 1,
          duration: 0.25,
          ease: "power3.out",
        });
    }
  }, [showModal]);

  return (
    <>
      {/* CRT Boot Loader */}
      {showLoader && (
        <CRTBootLoader
          accentColor={accentColor}
          uiFont={uiFont}
          onComplete={() => {
            setShowLoader(false);
            setIsLoaded(true);
          }}
        />
      )}

      {/* Main content (only after loader) */}
      {isLoaded && (
        <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-black">
          {/* Custom cursor */}
          <CustomCursor accentColor={accentColor} />

          {/* Background layer */}
          <div className="fixed inset-0">
            <div className="absolute inset-0">
              {current.element}
            </div>
          </div>

          {/* CRT line transition overlay */}
          <TVStatic
            visible={showStatic}
            duration={320}
            onMidpoint={handleStaticMidpoint}
            onComplete={handleStaticComplete}
            color={accentColor}
          />

          {/* Main content overlay */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-white">
            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-4 cursor-pointer text-center text-5xl font-bold leading-tight tracking-tight transition-opacity hover:opacity-80 sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                fontFamily: `var(${displayFont})`,
                letterSpacing: getLetterSpacing(displayFont),
                color: accentColor,
                textShadow: `0 0 40px ${accentColor}80, 0 0 80px ${accentColor}40`,
              }}
              onClick={handleChangeFont}
            >
              910STUDIO
            </h1>

            {/* Tagline */}
            <p
              className="mb-12 max-w-4xl text-center text-base font-medium uppercase tracking-[0.2em] sm:text-lg md:text-xl"
              style={{
                fontFamily: `var(${uiFont})`,
                color: accentColor,
                textShadow: `0 0 30px ${accentColor}60, 0 0 60px ${accentColor}30`,
              }}
            >
              {tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="group relative overflow-hidden border-2 px-8 py-4 font-bold uppercase tracking-wide transition-all hover:scale-105"
                style={{
                  fontFamily: `var(${uiFont})`,
                  borderColor: accentColor,
                  color: accentColor,
                  boxShadow: `0 0 20px ${accentColor}40`,
                }}
              >
                <span className="relative z-10">Get Started</span>
                <div
                  className="absolute inset-0 translate-y-full transition-transform group-hover:translate-y-0"
                  style={{ backgroundColor: `${accentColor}20` }}
                />
              </button>

              <button
                onClick={handleRandomizeAll}
                className="group relative overflow-hidden border-2 px-8 py-4 font-bold uppercase tracking-wide transition-all hover:scale-105"
                style={{
                  fontFamily: `var(${uiFont})`,
                  borderColor: `${accentColor}60`,
                  color: `${accentColor}B0`,
                }}
              >
                <span className="relative z-10">Randomize</span>
              </button>
            </div>

            {/* Info text */}
            <p
              className="mt-8 text-center text-xs"
              style={{
                fontFamily: `var(${uiFont})`,
                color: `${accentColor}60`,
              }}
            >
              <span className="hidden sm:inline">
                Press <kbd className="rounded bg-white/10 px-2 py-1">?</kbd> for shortcuts
              </span>
              <span className="sm:hidden">
                Tap title for font · Swipe for colors/backgrounds
              </span>
            </p>

            {/* Mobile action buttons */}
            <div className="fixed bottom-4 left-4 flex gap-2 sm:hidden">
              <button
                onClick={() => setShowHelp(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all hover:scale-110"
                style={{
                  fontFamily: `var(${uiFont})`,
                  borderColor: `${accentColor}60`,
                  color: accentColor,
                  backgroundColor: '#00000080',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ?
              </button>
              <button
                onClick={handleSaveFavorite}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg transition-all hover:scale-110"
                style={{
                  borderColor: isFavorited(combo) ? accentColor : `${accentColor}60`,
                  color: accentColor,
                  backgroundColor: isFavorited(combo) ? `${accentColor}20` : '#00000080',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {isFavorited(combo) ? '★' : '☆'}
              </button>
            </div>
          </div>

          {/* Download Modal (existing) */}
          {showModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div ref={backdropRef} className="absolute inset-0 bg-black/95" />

              <div
                ref={modalRef}
                className="relative w-full"
                style={{ maxWidth: "min(90vw, 32rem)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="relative overflow-hidden border-4 bg-black px-8 py-12"
                  style={{
                    borderColor: accentColor,
                    boxShadow: `0 0 60px ${accentColor}40`,
                  }}
                >
                  <h2
                    className="mb-6 text-center text-3xl font-bold"
                    style={{
                      fontFamily: `var(${uiFont})`,
                      color: accentColor,
                    }}
                  >
                    PROJECT KICKOFF
                  </h2>

                  <div className="space-y-4">
                    <a
                      href="/910studio_Project_Kickoff_Template.xlsx"
                      download
                      className="block border-2 p-4 text-center transition-all hover:bg-white/5"
                      style={{ borderColor: `${accentColor}60`, color: accentColor }}
                    >
                      <span style={{ fontFamily: `var(${uiFont})` }}>
                        📄 English Template
                      </span>
                    </a>

                    <a
                      href="/910studio_Төслийн_Эхлэл_Загвар.xlsx"
                      download
                      className="block border-2 p-4 text-center transition-all hover:bg-white/5"
                      style={{ borderColor: `${accentColor}60`, color: accentColor }}
                    >
                      <span style={{ fontFamily: `var(${uiFont})` }}>
                        📄 Монгол Загвар
                      </span>
                    </a>
                  </div>

                  <button
                    onClick={closeModal}
                    className="mt-6 w-full border-2 py-3 transition-all hover:bg-white/5"
                    style={{
                      borderColor: `${accentColor}40`,
                      color: `${accentColor}80`,
                      fontFamily: `var(${uiFont})`,
                    }}
                  >
                    Close [ESC]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help Overlay */}
          {showHelp && (
            <HelpOverlay
              shortcuts={shortcuts}
              accentColor={accentColor}
              uiFont={uiFont}
              onClose={() => setShowHelp(false)}
            />
          )}

          {/* Favorites Panel */}
          {showFavorites && (
            <FavoritesPanel
              favorites={favorites}
              accentColor={accentColor}
              uiFont={uiFont}
              onSelectFavorite={handleLoadFavorite}
              onRemoveFavorite={removeFavorite}
              onClearAll={clearFavorites}
              onClose={() => setShowFavorites(false)}
            />
          )}

          {/* Toast Notifications */}
          {toast && (
            <Toast
              message={toast}
              accentColor={accentColor}
              uiFont={uiFont}
              onClose={() => showToast(null)}
            />
          )}
        </div>
      )}
    </>
  );
}

// Wrap in Suspense to fix useSearchParams SSR error
export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
      <HomePage />
    </Suspense>
  );
}
