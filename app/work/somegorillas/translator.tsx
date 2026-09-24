"use client";

import { useState } from "react";

/* Gorillak, running live.
 *
 * The map is lifted verbatim from the project's own translator — every
 * letter to a two-sound grunt. Showing it as a paragraph would be describing
 * a joke; letting the reader type into it is the joke.
 *
 * Same role as Juraan's typeface specimen and HemiBros's Win98 chrome: the
 * client's work as the subject, inside a frame, on 910's page.
 */

const MAP: Record<string, string> = {
  a: "EI", b: "OB", c: "AC", d: "ED", e: "OA", f: "UF", g: "IG", h: "OH",
  i: "UE", j: "AJ", k: "EK", l: "IL", m: "UM", n: "ON", o: "AU", p: "AP",
  q: "UQ", r: "ER", s: "AS", t: "OT", u: "IO", v: "IV", w: "AW", x: "EX",
  y: "OY", z: "UZ",
};

const REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MAP).map(([k, v]) => [v.toLowerCase(), k]),
);

function toGorillak(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((c) => MAP[c] ?? c)
    .join(" ");
}

function toEnglish(text: string) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((s) => REVERSE[s] ?? s)
    .join("");
}

export function Translator() {
  const [english, setEnglish] = useState("go bananas");
  const [gorillak, setGorillak] = useState(toGorillak("go bananas"));

  return (
    <div className="gk">
      <style>{`
        .gk {
          margin-top: 30px;
          border: 1.5px solid var(--cs-rule);
          display: grid; grid-template-columns: 1fr 1fr;
        }
        .gk > div { padding: clamp(20px, 3vw, 34px); }
        .gk > div + div { border-left: 1.5px solid var(--cs-rule); }
        .gk label {
          display: block; margin-bottom: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: .2em;
          text-transform: uppercase; color: var(--cs-accent);
        }
        .gk textarea {
          width: 100%; min-height: 108px; resize: vertical;
          background: transparent; border: 0; outline: none;
          color: var(--cs-ink); font-family: inherit;
          font-size: 15px; line-height: 1.7; letter-spacing: -.01em;
        }
        .gk textarea::placeholder { color: var(--cs-ink-3); }
        /* the grunts want to read as chunks, not as a word */
        .gk textarea.out { color: var(--cs-accent); letter-spacing: .04em; }
        .gk-note {
          grid-column: 1 / -1; border-top: 1.5px solid var(--cs-rule);
          padding: 12px clamp(20px, 3vw, 34px);
          font-size: 11px; color: var(--cs-ink-3);
        }
        @media (max-width: 640px) {
          .gk { grid-template-columns: 1fr; }
          .gk > div + div { border-left: 0; border-top: 1.5px solid var(--cs-rule); }
        }
      `}</style>

      <div>
        <label htmlFor="gk-en">English</label>
        <textarea
          id="gk-en"
          value={english}
          placeholder="type smth"
          onChange={(e) => {
            setEnglish(e.target.value);
            setGorillak(toGorillak(e.target.value));
          }}
        />
      </div>

      <div>
        <label htmlFor="gk-go">Gorillak</label>
        <textarea
          id="gk-go"
          className="out"
          value={gorillak}
          placeholder="OT OY AP OA"
          onChange={(e) => {
            setGorillak(e.target.value);
            setEnglish(toEnglish(e.target.value));
          }}
        />
      </div>

      <p className="gk-note">
        Live, and translating both ways — the same map the project ships.
        Type in either side.
      </p>
    </div>
  );
}
