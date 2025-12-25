// Keyboard shortcut system for 910studio landing page
// Configurable shortcuts with automatic event handling and cleanup

import { useEffect } from "react";

export interface ShortcutConfig {
  key: string;              // Key to listen for (e.g., " " for Space, "f", "?")
  description: string;      // Human-readable description for help overlay
  handler: () => void;      // Function to call when shortcut is triggered
  preventDefault?: boolean; // Prevent default browser behavior (e.g., for Space key scroll)
}

/**
 * Hook to register keyboard shortcuts
 *
 * @param shortcuts - Array of shortcut configurations
 * @param enabled - Whether shortcuts are currently active (default: true)
 *
 * @example
 * ```tsx
 * const shortcuts: ShortcutConfig[] = [
 *   { key: " ", description: "Randomize all", handler: handleRandomize, preventDefault: true },
 *   { key: "f", description: "Change font", handler: handleChangeFont },
 *   { key: "?", description: "Show help", handler: () => setShowHelp(true) },
 * ];
 *
 * useKeyboardShortcuts(shortcuts, !showModal); // Disable when modal is open
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: ShortcutConfig[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      // Find matching shortcut
      const shortcut = shortcuts.find((s) => {
        // Case-insensitive matching for letter keys
        if (s.key.length === 1) {
          return s.key.toLowerCase() === e.key.toLowerCase();
        }
        // Exact match for special keys (Space, Escape, etc.)
        return s.key === e.key;
      });

      if (shortcut) {
        // Prevent default browser behavior if specified
        if (shortcut.preventDefault) {
          e.preventDefault();
        }

        // Call the handler
        shortcut.handler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount or when shortcuts change
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts, enabled]);
}
