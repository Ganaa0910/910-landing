import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Satori draws images only from <img>, and only from a data URI — it has
 * no loader and will not fetch a path. So anything that appears on a card
 * is read off disk and inlined, which is also why card thumbnails want to
 * stay small: the bytes end up base64'd inside the render, ~33% larger. */

export function publicDataUri(
  path: string,
  type: string,
  transform?: (s: string) => string,
): string | null {
  try {
    const file = join(process.cwd(), "public", path.replace(/^\//, ""));
    if (transform) {
      return `data:${type};base64,${Buffer.from(transform(readFileSync(file, "utf8"))).toString("base64")}`;
    }
    return `data:${type};base64,${readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

/** 910's own ink, as it is written in public/logo.svg. */
const LOGO_INK = "#2B221F";

/**
 * The wordmark, recoloured to whatever ink the card is using.
 *
 * Case cards wear the client's palette, and five of the six grounds are
 * not paper — the mark has to become the project's ink or it disappears
 * into a dark background. Swapping the literal in the SVG source is the
 * whole trick; there is no filter or currentColor path through Satori.
 */
export function wordmark(ink: string): string | null {
  return publicDataUri("logo.svg", "image/svg+xml", (s) => s.replaceAll(LOGO_INK, ink));
}
