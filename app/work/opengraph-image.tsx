/* These pages declare their own `openGraph` block, and a declared block
   stops the site-wide card in app/ from being inherited — verified: /work,
   /contact and /toybox shipped NO og:image at all, while twitter:image came
   through fine because they declare no `twitter` block. A file in the
   segment itself still merges, so re-exporting the site card here is all it
   takes to put the picture back. */
export { default, alt, size, contentType } from "../opengraph-image";
