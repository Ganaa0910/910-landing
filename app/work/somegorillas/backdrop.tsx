const IMG = "/demos/somegorillas/assets";

/* The project's own hero plate, running as the page's ground.
 *
 * public/backgrounds/Hero section.png is a tiling banana pattern on grape —
 * the signature motif, shipped as a repeat. So rather than describing it in
 * a paragraph and showing a thumbnail of it, the case study is laid on it.
 *
 * Two layers: the pattern, then a wash of the page's own ground pulled back
 * over it. The wash is what keeps 13.5px body copy readable on top of a
 * cartoon repeat — without it the pattern wins and the page becomes
 * unreadable at exactly the size people actually read at.
 */

export function RoomBackdrop() {
  return (
    <div className="room" aria-hidden="true">
      <style>{`
        .room { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .room > i { position: absolute; inset: 0; display: block; }

        .room .plate {
          background-image: url('${IMG}/rooms/Hero%20section.png');
          background-repeat: repeat;
          background-size: 360px auto;
          opacity: .48;
        }
        /* the page's ground, pulled back over the pattern so the type wins */
        .room .wash {
          background:
            radial-gradient(130% 95% at 50% 0%,
              rgba(22,14,31,.70) 0%,
              rgba(22,14,31,.82) 50%,
              rgba(22,14,31,.90) 100%);
        }

        /* the pattern is decoration, and decoration should not cost anyone
           their battery on a phone */
        @media (max-width: 640px) {
          .room .plate { background-size: 240px auto; opacity: .34; }
        }
      `}</style>
      <i className="plate" />
      <i className="wash" />
    </div>
  );
}
