"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ComboState } from "@/lib/combo-state";
import { backgroundNames } from "@/lib/background-registry";
import { colorPalettes } from "@/lib/palettes";
import { displayFonts } from "@/lib/combo-state";

interface FavoritesPanelProps {
  favorites: ComboState[];
  accentColor: string;
  uiFont: string;
  onSelectFavorite: (combo: ComboState) => void;
  onRemoveFavorite: (index: number) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function FavoritesPanel({
  favorites,
  accentColor,
  uiFont,
  onSelectFavorite,
  onRemoveFavorite,
  onClearAll,
  onClose,
}: FavoritesPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Slide-in animation on mount
  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return;

    // Animate backdrop
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    // Slide panel from right
    gsap.fromTo(
      panelRef.current,
      { x: "100%" },
      { x: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  // Slide-out animation on close
  const handleClose = () => {
    if (!panelRef.current || !backdropRef.current) return;

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(panelRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
      },
      0
    );
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full flex-col border-l-4 bg-black sm:w-96"
        style={{
          borderColor: accentColor,
          boxShadow: `-10px 0 40px ${accentColor}20`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b-2 px-6 py-6"
          style={{ borderColor: `${accentColor}40` }}
        >
          <h2
            className="text-2xl font-bold tracking-wide"
            style={{
              fontFamily: `var(${uiFont})`,
              color: accentColor,
              textShadow: `0 0 15px ${accentColor}80`,
            }}
          >
            FAVORITES
          </h2>
          <button
            onClick={handleClose}
            className="text-xl text-white/70 transition-colors hover:text-white"
            style={{ fontFamily: `var(${uiFont})` }}
            aria-label="Close favorites"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {favorites.length === 0 ? (
            // Empty state
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p
                className="mb-2 text-sm text-white/50"
                style={{ fontFamily: `var(${uiFont})` }}
              >
                No favorites yet
              </p>
              <p
                className="text-xs text-white/30"
                style={{ fontFamily: `var(${uiFont})` }}
              >
                Press <kbd className="rounded bg-white/10 px-2 py-1">S</kbd> to
                save a combo
              </p>
            </div>
          ) : (
            // Favorites grid
            <div className="space-y-3">
              {favorites.map((fav, idx) => {
                const palette = colorPalettes[fav.paletteIndex];
                const bgName = backgroundNames[fav.backgroundIndex];
                const font = displayFonts[fav.fontIndex];

                return (
                  <div
                    key={idx}
                    className="group relative cursor-pointer border-2 p-4 transition-all hover:bg-white/5"
                    style={{
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}05`,
                    }}
                    onClick={() => onSelectFavorite(fav)}
                  >
                    {/* Info */}
                    <div className="mb-2">
                      <p
                        className="truncate text-sm font-bold"
                        style={{
                          fontFamily: `var(${uiFont})`,
                          color: accentColor,
                        }}
                      >
                        {bgName}
                      </p>
                      <p
                        className="truncate text-xs text-white/60"
                        style={{ fontFamily: `var(${uiFont})` }}
                      >
                        {palette.name} × {font.replace("--font-", "")}
                      </p>
                    </div>

                    {/* Color preview */}
                    <div className="flex gap-1">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="h-2 flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(idx);
                      }}
                      className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: accentColor }}
                      aria-label="Remove favorite"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div
            className="border-t-2 px-6 py-4"
            style={{ borderColor: `${accentColor}40` }}
          >
            <button
              onClick={onClearAll}
              className="w-full border-2 py-2 text-sm font-bold uppercase tracking-wide transition-all hover:bg-white/5"
              style={{
                fontFamily: `var(${uiFont})`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              Clear All ({favorites.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
