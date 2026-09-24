/* Font + asset loading for everything that renders through Satori.
 *
 * Three places draw cards now — the site-wide card, the per-case-study
 * card and the Instagram story poster — and they were each carrying a
 * private copy of this function. One copy, because the first time one of
 * them is fixed the others should get the fix too.
 *
 * WHY THE CSS API AND NOT A PINNED URL. Google rotates the version
 * segment of a font's binary (…/v19/… → …/v20/…) without notice, and a
 * hardcoded URL 404s the day it happens — silently, because a card that
 * loses its font still renders, just in Satori's fallback face. Asking
 * the CSS API resolves the current URL every time.
 *
 * WHY IT MAY NOT MATTER THAT THIS IS A NETWORK CALL. It is, at render
 * time, and Protech's cards deliberately do the opposite: they carry
 * DidactGothic-Regular.ttf in the repo, because a fetch during
 * `next build` is precisely how that project's builds fail — one
 * timeout aborts the whole export with no retry. The difference is the
 * fallback. Protech's tagline is Mongolian, and Satori's built-in face
 * has no Cyrillic at all, so a missed font there is an unreadable card.
 * Ours is Latin: a missed font is the same card in a different mono.
 * Degraded, not broken. If these ever set in Cyrillic, the font comes
 * into the repo the same day.
 *
 * Satori accepts TTF, OTF and WOFF but NOT woff2, which is why
 * next/font's copies of the same families are unusable here.
 */

const cache = new Map<string, ArrayBuffer | null>();

export async function loadGoogleFont(family: string): Promise<ArrayBuffer | null> {
  const hit = cache.get(family);
  if (hit !== undefined) return hit;

  let out: ArrayBuffer | null = null;
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`,
      // Without a browser UA the CSS API answers with woff2 only, which
      // Satori cannot read. This is the whole reason the header is here.
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const match = css.match(/url\((https:\/\/[^)]+\.(?:ttf|woff2))\)/);
    if (match) {
      const font = await fetch(match[1]);
      if (font.ok) out = await font.arrayBuffer();
    }
  } catch {
    out = null;
  }

  cache.set(family, out);
  return out;
}

export type SatoriFont = {
  name: string;
  data: ArrayBuffer;
  style: "normal";
  weight: 400 | 500;
};

/** IBM Plex Mono at the two weights every card uses, named "Plex". */
export async function plex(): Promise<SatoriFont[]> {
  const [regular, medium] = await Promise.all([
    loadGoogleFont("IBM Plex Mono:wght@400"),
    loadGoogleFont("IBM Plex Mono:wght@500"),
  ]);
  return [
    regular && { name: "Plex", data: regular, style: "normal" as const, weight: 400 as const },
    medium && { name: "Plex", data: medium, style: "normal" as const, weight: 500 as const },
  ].filter((f): f is SatoriFont => f !== null);
}
