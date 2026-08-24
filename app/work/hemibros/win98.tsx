const IMG = "/demos/hemibros/assets";

/* The Windows 98 chrome, rebuilt from the project's own values rather than
 * approximated — the same role Juraan's typeface specimen plays. The case
 * study is set in 910's type on 910's grid; this is the client's design
 * language shown as the subject, inside a frame.
 *
 * The bevel is the whole trick and it is one line: a 2px border whose four
 * sides are lit as if from the top-left — white/black/black/white — and
 * inverted on press. Every raised surface in the era is that, and nothing
 * else. The values below are lifted from the project:
 *   gray #C0C0C0 · darkgray #808080 · lightgray #D4D0C8
 *   white #FFFFFF · black #000000 · blue #000080 · cyan #008080
 */

const ICONS = [
  { file: "computer.png", label: "My Computer" },
  { file: "folder.png", label: "Collection" },
  { file: "msie.png", label: "Browser" },
  { file: "network.png", label: "Network" },
];

export function Win98Specimen() {
  return (
    <div className="w98">
      <style>{`
        @font-face {
          font-family: 'MSSansHB';
          src: url('${IMG}/fonts/MS.ttf') format('truetype');
          font-display: swap;
        }
        .w98 {
          --gray:#C0C0C0; --dark:#808080; --light:#D4D0C8;
          --white:#FFF; --black:#000; --blue:#000080; --cyan:#008080;
          margin-top: 30px;
          border: 1.5px solid var(--cs-rule);
          background: var(--cyan);
          background-image: url('${IMG}/web/background.png');
          background-size: cover; background-position: center;
          padding: clamp(22px, 3vw, 44px);
          font-family: 'MSSansHB', 'MS Sans Serif', Tahoma, sans-serif;
          position: relative; overflow: hidden;
        }
        /* No scanlines here: the whole page is already behind a CRT, and two
           sets of lines at slightly different phases moiré into mud on the
           teal. One screen, not two. */
        .w98-desk { display:flex; gap:clamp(20px,3vw,44px); align-items:flex-start; position:relative; z-index:1; }

        /* desktop icons, label under glyph, the way the shell drew them */
        .w98-icons { display:grid; gap:22px; flex:0 0 auto; }
        .w98-icons figure { display:grid; justify-items:center; gap:6px; width:76px; }
        .w98-icons img { width:38px; height:38px; image-rendering:pixelated; display:block; }
        .w98-icons figcaption {
          font-size:12px; color:#fff; text-align:center; line-height:1.25;
          text-shadow:1px 1px 0 #000;
        }

        /* a window: raised bevel, navy title bar, silver body */
        .w98-win { flex:1 1 auto; min-width:0; background:var(--gray);
                   border:2px solid; border-color:var(--white) var(--black) var(--black) var(--white); }
        .w98-bar { background:var(--blue); display:flex; align-items:center; gap:8px; padding:4px 5px; }
        .w98-bar img { width:16px; height:16px; image-rendering:pixelated; }
        .w98-bar h4 { margin:0; flex:1; color:#fff; font-size:13px; font-weight:400; letter-spacing:0; }
        .w98-btns { display:flex; gap:2px; }
        .w98-btns i {
          width:20px; height:18px; background:var(--gray); display:grid; place-items:center;
          border:2px solid; border-color:var(--white) var(--black) var(--black) var(--white);
          font-size:11px; font-style:normal; color:#000; line-height:1;
        }
        .w98-menu { display:flex; gap:14px; padding:3px 8px; border-bottom:1px solid var(--dark);
                    font-size:12px; color:#000; }
        .w98-menu u { text-decoration:underline; }
        /* the client area is sunken — the same bevel, reversed */
        .w98-body { margin:8px; padding:14px; background:#000040;
                    border:2px solid; border-color:var(--black) var(--white) var(--white) var(--black);
                    display:flex; align-items:center; justify-content:center; gap:22px; min-height:150px; }
        .w98-body img { image-rendering:pixelated; }

        .w98-status { display:flex; gap:6px; margin:0 8px 8px; }
        .w98-status span { flex:1; font-size:11px; color:#000; padding:2px 6px;
          border:2px solid; border-color:var(--dark) var(--white) var(--white) var(--dark); }

        /* taskbar */
        .w98-task { position:relative; z-index:1; margin-top:clamp(20px,3vw,40px);
          background:var(--gray); border-top:1px solid var(--white);
          display:flex; align-items:center; gap:6px; padding:3px 4px; }
        .w98-start {
          display:flex; align-items:center; gap:6px; padding:3px 8px; font-size:13px; font-weight:700;
          background:var(--gray); border:2px solid;
          border-color:var(--white) var(--black) var(--black) var(--white); color:#000;
        }
        .w98-start img { width:16px; height:16px; image-rendering:pixelated; }
        .w98-tab { font-size:12px; padding:3px 10px; background:var(--gray); color:#000;
          border:2px solid; border-color:var(--white) var(--black) var(--black) var(--white); }
        .w98-tab.on { border-color:var(--black) var(--white) var(--white) var(--black); background:var(--light); }
        .w98-tray { margin-left:auto; font-size:12px; color:#000; padding:3px 8px;
          border:2px solid; border-color:var(--dark) var(--white) var(--white) var(--dark); }

        @media (max-width: 760px) {
          .w98-desk { flex-direction:column; }
          .w98-icons { grid-auto-flow:column; }
        }
      `}</style>

      <div className="w98-desk">
        <div className="w98-icons">
          {ICONS.map((i) => (
            <figure key={i.file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/web/${i.file}`} alt="" />
              <figcaption>{i.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="w98-win">
          <div className="w98-bar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/web/computer.png`} alt="" />
            <h4>HemiBros — The Machine</h4>
            <span className="w98-btns">
              <i>_</i>
              <i>□</i>
              <i>×</i>
            </span>
          </div>
          <div className="w98-menu">
            <span><u>F</u>ile</span>
            <span><u>E</u>dit</span>
            <span><u>V</u>iew</span>
            <span><u>H</u>elp</span>
          </div>
          <div className="w98-body">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/web/slot-machine.gif`} alt="Slot machine" width={200} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/web/construction.gif`} alt="Under construction" width={120} />
          </div>
          <div className="w98-status">
            <span>Ready</span>
            <span>Connected</span>
          </div>
        </div>
      </div>

      <div className="w98-task">
        <span className="w98-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/web/windows.png`} alt="" />
          Start
        </span>
        <span className="w98-tab on">HemiBros</span>
        <span className="w98-tab">Manifesto</span>
        <span className="w98-tray">11:11 PM</span>
      </div>
    </div>
  );
}
