"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getGlobalAudio } from "./audio-toggle";

const CRITICAL_ASSETS = [
  "/mewtwo.mp3",
  "/Casestudy.svg",
  "/things-that.svg",
  "/OG.png",
];

function preloadAsset(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (url.endsWith(".mp3")) {
      const audio = getGlobalAudio();
      if (audio.readyState >= 3) {
        resolve();
        return;
      }
      const onReady = () => {
        audio.removeEventListener("canplaythrough", onReady);
        resolve();
      };
      audio.addEventListener("canplaythrough", onReady);
      audio.load();
    } else if (url.endsWith(".svg") || url.endsWith(".png") || url.endsWith(".jpg")) {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = url;
    } else {
      fetch(url)
        .then(() => resolve())
        .catch(() => resolve());
    }
  });
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const loadedCount = useRef(0);

  useEffect(() => {
    if (sessionStorage.getItem("910-entered")) {
      setEntered(true);
      return;
    }

    const total = CRITICAL_ASSETS.length;

    CRITICAL_ASSETS.forEach((url) => {
      preloadAsset(url).then(() => {
        loadedCount.current += 1;
        const pct = Math.round((loadedCount.current / total) * 100);
        setProgress(pct);
        if (loadedCount.current === total) {
          setAssetsReady(true);
        }
      });
    });
  }, []);

  const enter = useCallback((withAudio: boolean) => {
    if (withAudio) {
      const audio = getGlobalAudio();
      audio.play().catch(() => {});
    }
    sessionStorage.setItem("910-entered", "1");
    setExiting(true);
    setTimeout(() => setEntered(true), 600);
  }, []);

  if (entered) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        transition: "opacity 500ms ease",
        opacity: exiting ? 0 : 1,
      }}
    >
      <div
        className="font-bebas"
        style={{
          fontSize: "clamp(3rem, 8vw, 4rem)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#fafafa",
          margin: 0,
        }}
      >
        910studio
      </div>
      <p style={{ marginTop: "8px", fontSize: "12px", letterSpacing: "0.1em", color: "#52525b" }}>
        creative web studio
      </p>

      {/* Loader */}
      <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
        <div style={{ width: "48px", height: "1px", backgroundColor: "#27272a", overflow: "hidden" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#14b8a6",
              animation: assetsReady ? "none" : "loader-slide 0.8s ease-in-out infinite",
              transform: assetsReady ? "translateX(0)" : undefined,
            }}
          />
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "monospace",
            fontSize: "10px",
            color: "#52525b",
            letterSpacing: "0.05em",
          }}
        >
          {assetsReady ? "ready" : `loading ${progress}%`}
        </p>
      </div>

      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Enter options — only show when assets are loaded */}
      {assetsReady && (
        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => enter(true)}
            className="cartoon-shadow-accent"
            style={{
              backgroundColor: "#14b8a6",
              padding: "12px 32px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#0a0a0a",
              border: "none",
              cursor: "none",
            }}
          >
            enter with sound
          </button>
          <button
            onClick={() => enter(false)}
            style={{
              fontSize: "12px",
              color: "#52525b",
              backgroundColor: "transparent",
              border: "none",
              cursor: "none",
            }}
          >
            enter without sound
          </button>
        </div>
      )}
    </div>
  );
}
