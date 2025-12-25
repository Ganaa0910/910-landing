"use client";

// URL parameter synchronization for shareable combos
// Encodes/decodes combo state to/from URL query parameters

import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  encodeCombo,
  decodeCombo,
  type ComboState,
} from "@/lib/combo-state";

/**
 * Hook to sync combo state with URL parameters
 *
 * @param onComboFromUrl - Callback when URL contains a valid combo to load
 *
 * @returns updateUrl function to sync current combo to URL
 *
 * @example
 * ```tsx
 * const updateUrl = useComboUrlSync((decodedCombo) => {
 *   // Load the combo from URL on mount
 *   loadCombo(decodedCombo);
 * });
 *
 * // Later, when combo changes:
 * updateUrl(newComboState);
 * ```
 */
export function useComboUrlSync(
  onComboFromUrl?: (combo: ComboState) => void
) {
  const searchParams = useSearchParams();

  // On mount: check if URL has combo parameter and decode it
  useEffect(() => {
    const encoded = searchParams.get("c");
    if (encoded && onComboFromUrl) {
      const decoded = decodeCombo(encoded);
      if (decoded) {
        console.log("🔗 Loading combo from URL:", decoded);
        onComboFromUrl(decoded);
      } else {
        console.warn("⚠️ Invalid combo URL parameter");
      }
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to update URL with current combo
  const updateUrl = useCallback((combo: ComboState) => {
    const encoded = encodeCombo(combo);
    if (!encoded) return;

    const newUrl = `/?c=${encoded}`;

    // Use replaceState to avoid polluting browser history
    window.history.replaceState(null, "", newUrl);
  }, []);

  return updateUrl;
}

/**
 * Hook to copy current URL to clipboard (for sharing)
 *
 * @returns copyUrlToClipboard function
 *
 * @example
 * ```tsx
 * const copyUrl = useCopyComboUrl();
 *
 * <button onClick={() => copyUrl()}>Share</button>
 * ```
 */
export function useCopyComboUrl() {
  const copyUrlToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("✅ URL copied to clipboard");
      return true;
    } catch (error) {
      console.error("Failed to copy URL:", error);
      return false;
    }
  }, []);

  return copyUrlToClipboard;
}
