"use client";

// Typed command detection for easter eggs
// Detects when user types specific strings (e.g., "910", "gray")

import { useEffect } from "react";

/**
 * Hook to detect typed command sequences
 *
 * @param commands - Object mapping command strings to handler functions
 *
 * @example
 * ```tsx
 * useTypedCommands({
 *   '910': () => {
 *     console.log("910 signature combo loaded!");
 *     loadCombo(SIGNATURE_COMBOS['910']);
 *   },
 *   'gray': () => {
 *     console.log("Gray mode activated! 🔥");
 *     loadCombo(SIGNATURE_COMBOS['gray']);
 *   }
 * });
 * ```
 */
export function useTypedCommands(commands: Record<string, () => void>) {
  useEffect(() => {
    let typed = "";
    let timeout: NodeJS.Timeout;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if in input/textarea
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      // Add character to typed buffer (lowercase for case-insensitive matching)
      typed += e.key.toLowerCase();

      // Check for command matches
      Object.entries(commands).forEach(([command, handler]) => {
        if (typed.endsWith(command.toLowerCase())) {
          console.log(`🔑 Command activated: "${command}"`);
          handler();
          typed = ""; // Reset after match
        }
      });

      // Keep typed buffer reasonable length (max 20 chars)
      if (typed.length > 20) {
        typed = typed.slice(-20);
      }

      // Clear typed buffer after 2s of inactivity
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        typed = "";
      }, 2000);
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearTimeout(timeout);
    };
  }, [commands]);
}
