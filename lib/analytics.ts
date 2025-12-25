// Client-side analytics for 910studio landing page
// Privacy-focused: no PII, no cookies, all client-side
// Tracks combo views, favorites, and URL shares

import type { ComboState } from "./combo-state";

const ANALYTICS_KEY = "910-analytics";
const BATCH_SIZE = 50; // Send to console when 50 events collected

export type AnalyticsEvent =
  | { type: "combo_view"; combo: ComboState; timestamp: number }
  | { type: "combo_share"; combo: ComboState; timestamp: number }
  | { type: "favorite_save"; combo: ComboState; timestamp: number }
  | { type: "favorite_load"; combo: ComboState; timestamp: number }
  | { type: "easter_egg"; egg: string; timestamp: number };

export type AnalyticsEventInput = Omit<AnalyticsEvent, "timestamp">;

/**
 * Track an analytics event (stored in localStorage)
 */
export function trackEvent(event: any) {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];

    // Add timestamp and push event
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    } as AnalyticsEvent;

    events.push(fullEvent);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));

    // If batch size reached, analyze and clear
    if (events.length >= BATCH_SIZE) {
      analyzeBatch(events);
      localStorage.removeItem(ANALYTICS_KEY);
    }
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}

/**
 * Analyze batch of events and log insights to console
 */
function analyzeBatch(events: AnalyticsEvent[]) {
  console.log("📊 Analytics Batch Summary:");
  console.log(`Total events: ${events.length}`);

  // Count event types
  const typeCounts = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("Event breakdown:", typeCounts);

  // Popular combos (background + palette combinations)
  const comboViews = events.filter(
    (e): e is Extract<AnalyticsEvent, { type: "combo_view" }> =>
      e.type === "combo_view"
  );

  if (comboViews.length > 0) {
    const comboCounts = comboViews.reduce((acc, e) => {
      const key = `bg${e.combo.backgroundIndex}-pal${e.combo.paletteIndex}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCombos = Object.entries(comboCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    console.log("Top 5 combos:", topCombos);
  }

  // Easter egg discoveries
  const easterEggs = events.filter(
    (e): e is Extract<AnalyticsEvent, { type: "easter_egg" }> =>
      e.type === "easter_egg"
  );

  if (easterEggs.length > 0) {
    console.log(
      "Easter eggs found:",
      easterEggs.map((e) => e.egg)
    );
  }
}

/**
 * Get current analytics stats (for debugging)
 */
export function getAnalyticsStats() {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    const events: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
    return {
      totalEvents: events.length,
      pendingBatch: events.length < BATCH_SIZE,
    };
  } catch {
    return { totalEvents: 0, pendingBatch: false };
  }
}

/**
 * Clear all analytics data
 */
export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  console.log("🗑️ Analytics data cleared");
}
