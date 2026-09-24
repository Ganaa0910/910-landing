/* A CRT the whole page sits behind.
 *
 * Same idea as Nair's ambient dither field: a per-project atmosphere layer,
 * not a redesign. The type is still Plex Mono on 910's grid — but this case
 * study is about a project that lived inside a fake monitor, so the page is
 * inside one too.
 *
 * Everything here is pointer-events:none and sits above the content, which
 * is the only way a screen effect reads correctly — scanlines that run under
 * the text look like a background pattern, not like glass.
 *
 * Four layers, in order of how much they matter:
 *   scanlines  — the effect. 3px period, dark, low alpha.
 *   grille     — vertical RGB stripes, almost invisible, kills the flatness.
 *   vignette   — corners fall off, so the page reads as curved glass.
 *   roll       — the sync bar drifting down. The one thing that says CRT
 *                rather than "lines on a page".
 * Motion stops entirely under prefers-reduced-motion; the static layers stay.
 */

export function CrtScreen() {
  return (
    <div className="crt" aria-hidden="true">
      <style>{`
        .crt { position: fixed; inset: 0; z-index: 40; pointer-events: none; }
        .crt > i { position: absolute; inset: 0; display: block; }

        /* scanlines */
        .crt .scan {
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,.22) 0 1px,
            rgba(0,0,0,0) 1px 3px
          );
          opacity: .55;
        }
        /* aperture grille — vertical triads, barely there */
        .crt .grille {
          background: repeating-linear-gradient(
            to right,
            rgba(255,0,0,.05) 0 1px,
            rgba(0,255,0,.05) 1px 2px,
            rgba(0,0,255,.05) 2px 3px
          );
          opacity: .5; mix-blend-mode: screen;
        }
        /* curved glass: corners fall away, centre stays clean */
        .crt .vig {
          background:
            radial-gradient(120% 100% at 50% 50%,
              rgba(0,0,0,0) 52%, rgba(0,0,0,.34) 88%, rgba(0,0,0,.6) 100%);
        }
        /* the sync bar — a soft band sliding down the tube */
        .crt .roll {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,.035) 42%,
            rgba(255,255,255,.06) 50%,
            rgba(255,255,255,.035) 58%,
            rgba(255,255,255,0) 100%
          );
          height: 34%;
          animation: crtRoll 9s linear infinite;
        }
        /* the tube never sits perfectly still */
        .crt .flick { background: #fff; opacity: 0; animation: crtFlick 5.5s steps(1) infinite; }

        @keyframes crtRoll {
          0%   { transform: translateY(-40%); }
          100% { transform: translateY(320%); }
        }
        @keyframes crtFlick {
          0%, 96%, 100% { opacity: 0; }
          97%  { opacity: .012; }
          98%  { opacity: 0; }
          99%  { opacity: .02; }
        }

        /* phosphor: the accent glows the way lit phosphor does, and the
           section numbers are the accent */
        .case-study .cs-num,
        .case-study .cs-eyebrow,
        .case-study h1 i {
          text-shadow: 0 0 12px color-mix(in srgb, var(--cs-accent) 55%, transparent);
        }
        .case-study h1,
        .case-study h2 {
          text-shadow: 0 0 18px rgba(255,255,255,.10);
        }

        @media (prefers-reduced-motion: reduce) {
          .crt .roll, .crt .flick { animation: none; }
          .crt .flick { display: none; }
        }
        /* a full-screen overlay on a phone is mostly cost */
        @media (max-width: 640px) {
          .crt .grille, .crt .flick { display: none; }
          .crt .scan { opacity: .35; }
        }
      `}</style>
      <i className="scan" />
      <i className="grille" />
      <i className="vig" />
      <i className="roll" />
      <i className="flick" />
    </div>
  );
}
