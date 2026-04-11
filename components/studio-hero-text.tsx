"use client";

import { useEffect, useState } from "react";

const LINES = [
  { text: "we don't make", accent: false },
  { text: "websites.", accent: true },
  { text: "we make the sh*t that", accent: false },
  { text: "people remember.", accent: false },
];

// Typo config: on which line, at which char index, what wrong chars, how many to delete
const TYPO = {
  line: 2,       // "we make the sh*t that"
  at: 8,         // after "we make " — types "thr" instead of "the"
  wrong: "thr",  // mistypes
  deleteCount: 3,
  correct: "the",
};

type Phase = "typing" | "typo-typing" | "typo-pausing" | "typo-deleting" | "typo-correcting" | "line-pause" | "done";

export function StudioHeroText() {
  const [displayed, setDisplayed] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typoCharsTyped, setTypoCharsTyped] = useState(0);
  const [typoCharsDeleted, setTypoCharsDeleted] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (phase === "done") {
      const blinks = setInterval(() => setShowCursor((v) => !v), 500);
      const stop = setTimeout(() => {
        clearInterval(blinks);
        setShowCursor(false);
      }, 2500);
      return () => { clearInterval(blinks); clearTimeout(stop); };
    }

    if (phase === "line-pause") {
      const pause = lineIndex === 2 ? 350 : 150;
      const t = setTimeout(() => {
        setDisplayed((prev) => prev + "\n");
        setLineIndex((l) => l + 1);
        setCharIndex(0);
        setPhase("typing");
      }, pause);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (lineIndex >= LINES.length) {
        setPhase("done");
        return;
      }

      const currentLine = LINES[lineIndex].text;

      // Check if we're at the typo point
      if (lineIndex === TYPO.line && charIndex === TYPO.at) {
        setPhase("typo-typing");
        setTypoCharsTyped(0);
        return;
      }

      if (charIndex < currentLine.length) {
        const speed = 20 + Math.random() * 25;
        const t = setTimeout(() => {
          setDisplayed((prev) => prev + currentLine[charIndex]);
          setCharIndex((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setPhase("line-pause");
      }
    }

    // Type the wrong characters
    if (phase === "typo-typing") {
      if (typoCharsTyped < TYPO.wrong.length) {
        const speed = 25 + Math.random() * 20;
        const t = setTimeout(() => {
          setDisplayed((prev) => prev + TYPO.wrong[typoCharsTyped]);
          setTypoCharsTyped((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        // Pause — the "oh shit" moment
        const t = setTimeout(() => {
          setPhase("typo-deleting");
          setTypoCharsDeleted(0);
        }, 400);
        return () => clearTimeout(t);
      }
    }

    // Delete the wrong characters
    if (phase === "typo-deleting") {
      if (typoCharsDeleted < TYPO.deleteCount) {
        const t = setTimeout(() => {
          setDisplayed((prev) => prev.slice(0, -1));
          setTypoCharsDeleted((c) => c + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        // Small pause then type correct
        const t = setTimeout(() => {
          setPhase("typo-correcting");
          setTypoCharsTyped(0);
        }, 150);
        return () => clearTimeout(t);
      }
    }

    // Type the correct characters
    if (phase === "typo-correcting") {
      if (typoCharsTyped < TYPO.correct.length) {
        const speed = 30 + Math.random() * 20;
        const t = setTimeout(() => {
          setDisplayed((prev) => prev + TYPO.correct[typoCharsTyped]);
          setTypoCharsTyped((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        // Resume normal typing after the corrected part
        setCharIndex(TYPO.at + TYPO.correct.length);
        setPhase("typing");
      }
    }
  }, [phase, lineIndex, charIndex, typoCharsTyped, typoCharsDeleted]);

  const renderedLines = displayed.split("\n");

  return (
    <h1 className="relative z-10 font-bebas text-6xl uppercase leading-[0.95] tracking-wide sm:text-8xl lg:text-[9rem]">
      {LINES.map((line, i) => (
        <div key={i} className="relative">
          {/* Invisible placeholder to hold height */}
          <span className="invisible">{line.text}</span>
          {/* Actual typed text overlaid */}
          <span className={`absolute left-0 top-0 ${line.accent ? "text-accent" : "text-zinc-50"}`}>
            {renderedLines[i] || ""}
            {i === renderedLines.length - 1 && (
              <span
                className="inline-block bg-accent"
                style={{
                  width: "0.04em",
                  height: "0.75em",
                  marginLeft: "0.05em",
                  verticalAlign: "baseline",
                  opacity: showCursor ? 1 : 0,
                }}
              />
            )}
          </span>
        </div>
      ))}
    </h1>
  );
}
