"use client";

import { useState, useEffect } from "react";

export function NowPlaying() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("910-nowplaying-shown")) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("910-nowplaying-shown", "1");
      setTimeout(() => setVisible(false), 6000);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes eq-bar-1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes eq-bar-2 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
        @keyframes eq-bar-3 {
          0%, 100% { height: 8px; }
          30% { height: 16px; }
          70% { height: 4px; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          backgroundColor: "#18181b",
          border: "1px solid #27272a",
          padding: "14px 24px",
          minWidth: "260px",
          transform: visible ? "translateX(0)" : "translateX(calc(100% + 48px))",
          opacity: visible ? 1 : 0,
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
          pointerEvents: "none",
        }}
      >
        {/* Equalizer bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "16px" }}>
          <div style={{ width: "3px", backgroundColor: "#14b8a6", animation: "eq-bar-1 0.8s ease-in-out infinite" }} />
          <div style={{ width: "3px", backgroundColor: "#14b8a6", animation: "eq-bar-2 0.6s ease-in-out infinite" }} />
          <div style={{ width: "3px", backgroundColor: "#14b8a6", animation: "eq-bar-3 0.9s ease-in-out infinite" }} />
        </div>

        <div>
          <p style={{ margin: 0, fontSize: "11px", color: "#a1a1aa", lineHeight: 1.3 }}>
            now playing
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#e4e4e7", fontWeight: 600, lineHeight: 1.3 }}>
            utah* — mewtwo
          </p>
        </div>
      </div>
    </>
  );
}
