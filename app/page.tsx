"use client";

import { useState, useEffect } from "react";
import Particles from "@/components/Particles";
import { Button } from "@/components/ui/Button";

const quirkyLines = [
  "refined by design. defined by code.",
  "where intention meets interaction",
  "think different. build distinctive.",
  "crafted, not constructed",
  "every pixel has purpose",
  "modern by nature. timeless by choice.",
  "details make the difference",
  "beyond beautiful. built right.",
  "innovation through iteration",
  "designed to be remembered",
  "substance over surface",
  "form follows function. beautifully.",
  "thoughtfully engineered experiences",
  "simplicity is sophistication",
  "made to move you",
  "precision in every interaction",
  "where craft meets code",
  "intentionally exceptional",
  "designed to delight. built to last.",
  "elevating the everyday",
  "performance meets poetry",
  "obsessively refined",
  "creating clarity from complexity",
  "purpose-driven design",
];

export default function Home() {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const updateTagline = () => {
      const hour = new Date().getHours();
      const index = hour % quirkyLines.length;
      setTagline(quirkyLines[index]);
    };

    updateTagline();
    const interval = setInterval(updateTagline, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute inset-0 w-full h-full z-0">
        <Particles
          className="w-full h-full"
          particleCount={300}
          particleSpread={12}
          speed={0.08}
          particleColors={["#ffffff", "#a0a0ff", "#6060ff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={180}
          sizeRandomness={1.2}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>
      <main className="absolute inset-0 z-10 flex h-full w-full flex-col pointer-events-none">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center pointer-events-auto">
            <h1 className="text-6xl font-bold tracking-tight text-white sm:text-8xl">
              910studio
            </h1>
            <p className="mt-6 text-xl text-zinc-400 sm:text-2xl">
              {tagline || "something's forming"}
            </p>
            <a
              href="https://design.910.studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="glow"
                size="lg"
                className="mt-12"
                iconRight={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                }
              >
                Visit Design Studio
              </Button>
            </a>
          </div>
        </div>
        <footer className="pb-8 text-center pointer-events-auto">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} 910studio
          </p>
        </footer>
      </main>
    </div>
  );
}
