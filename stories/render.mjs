/* Render the motion story for every case study into public/stories/.
 *
 *   cd stories && npm run render            # all projects
 *   cd stories && npm run render -- uuyee   # just the ones named
 *
 * Pre-rendered rather than rendered on request: case studies change rarely,
 * so a file on the CDN is instant for the reader and costs nothing per
 * share. Run it again after adding a project or changing a palette. */
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const out = join(root, "public", "stories");
mkdirSync(out, { recursive: true });

/* slugs straight out of lib/projects.ts, client work only — toys don't get
   a case study to point the story at */
const src = readFileSync(join(root, "lib", "projects.ts"), "utf8");
const clientBlock = src.slice(src.indexOf("export const PROJECTS"), src.indexOf("export const TOYS"));
const all = [...clientBlock.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const wanted = process.argv.slice(2);
const slugs = wanted.length ? all.filter((s) => wanted.includes(s)) : all;

console.log(`bundling… (${slugs.join(", ")})`);
const serveUrl = await bundle({
  entryPoint: join(here, "src", "index.ts"),
  publicDir: join(root, "public"),
});

for (const slug of slugs) {
  const inputProps = { slug };
  const composition = await selectComposition({ serveUrl, id: "Story", inputProps });
  const file = join(out, `${slug}.mp4`);
  const t0 = Date.now();
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    /* Instagram re-encodes anyway; 22 keeps flat colour and type clean
       without shipping a 20MB file to a phone */
    crf: 22,
    pixelFormat: "yuv420p",
    outputLocation: file,
    inputProps,
  });
  const mb = (statSync(file).size / 1e6).toFixed(1);
  console.log(`${slug.padEnd(14)} ${mb}MB  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
