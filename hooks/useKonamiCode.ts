"use client";

// Konami Code easter egg detector
// Sequence: ↑↑↓↓←→←→BA

import { useEffect } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Hook to detect Konami Code input sequence
 *
 * @param onSuccess - Callback when Konami Code is successfully entered
 *
 * @example
 * ```tsx
 * useKonamiCode(() => {
 *   console.log("Konami code activated! 🎮");
 *   loadSecretBackground();
 * });
 * ```
 */
export function useKonamiCode(onSuccess: () => void) {
  useEffect(() => {
    let sequence: string[] = [];
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Add key to sequence
      sequence.push(e.key);

      // Keep only last 10 keys (length of Konami code)
      if (sequence.length > KONAMI_CODE.length) {
        sequence = sequence.slice(-KONAMI_CODE.length);
      }

      // Check if matches Konami code
      if (sequence.join(",") === KONAMI_CODE.join(",")) {
        console.log("🎮 KONAMI CODE ACTIVATED!");
        onSuccess();
        sequence = []; // Reset after success
      }

      // Reset sequence after 2s of inactivity
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sequence = [];
      }, 2000);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [onSuccess]);
}
