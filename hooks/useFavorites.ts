"use client";

// Favorites management system with localStorage persistence
// Stores up to 20 favorite combos for quick access

import { useState, useEffect, useCallback } from "react";
import type { ComboState } from "@/lib/combo-state";

const FAVORITES_KEY = "910-favorites";
const MAX_FAVORITES = 20; // Prevent localStorage bloat

/**
 * Hook to manage favorite combos with localStorage persistence
 *
 * @returns Object with favorites array and management functions
 *
 * @example
 * ```tsx
 * const { favorites, addFavorite, removeFavorite, clearFavorites } = useFavorites();
 *
 * // Save current combo
 * addFavorite(currentCombo);
 *
 * // Load favorite
 * const loadedCombo = favorites[0];
 * ```
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<ComboState[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
          console.log(`📌 Loaded ${parsed.length} favorites from localStorage`);
        }
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  /**
   * Add a combo to favorites (prevents duplicates, limits to MAX_FAVORITES)
   */
  const addFavorite = useCallback((combo: ComboState) => {
    setFavorites((prev) => {
      // Check if already favorited
      const exists = prev.some(
        (f) =>
          f.backgroundIndex === combo.backgroundIndex &&
          f.paletteIndex === combo.paletteIndex &&
          f.uiPaletteIndex === combo.uiPaletteIndex &&
          f.fontIndex === combo.fontIndex &&
          f.taglineIndex === combo.taglineIndex
      );

      if (exists) {
        console.log("⚠️ Combo already in favorites");
        return prev;
      }

      // Add to beginning, limit to MAX_FAVORITES
      const updated = [combo, ...prev].slice(0, MAX_FAVORITES);
      console.log(`✅ Added to favorites (${updated.length}/${MAX_FAVORITES})`);
      return updated;
    });
  }, []);

  /**
   * Remove a favorite by index
   */
  const removeFavorite = useCallback((index: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      console.log(`🗑️ Removed favorite (${updated.length} remaining)`);
      return updated;
    });
  }, []);

  /**
   * Clear all favorites
   */
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    console.log("🗑️ Cleared all favorites");
  }, []);

  /**
   * Check if a combo is already favorited
   */
  const isFavorited = useCallback(
    (combo: ComboState) => {
      return favorites.some(
        (f) =>
          f.backgroundIndex === combo.backgroundIndex &&
          f.paletteIndex === combo.paletteIndex &&
          f.uiPaletteIndex === combo.uiPaletteIndex &&
          f.fontIndex === combo.fontIndex &&
          f.taglineIndex === combo.taglineIndex
      );
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorited,
  };
}
