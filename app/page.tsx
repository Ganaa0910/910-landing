"use client";

import GradientBlinds from "@/components/GradientBlinds";

export default function Home() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div className="absolute inset-0 w-full h-full z-0">
        <GradientBlinds
          className="w-full h-full"
          gradientColors={["#0a0a0a", "#1a1a2e", "#16213e", "#0f3460"]}
          blindCount={12}
          spotlightRadius={0.6}
          spotlightSoftness={1.2}
          spotlightOpacity={0.8}
          noise={0.15}
          mouseDampening={0.08}
        />
      </div>
      <main className="absolute inset-0 z-10 flex h-full w-full flex-col pointer-events-none">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center pointer-events-auto">
            <h1 className="text-6xl font-bold tracking-tight text-white sm:text-8xl">
              910studio
            </h1>
            <p className="mt-6 text-xl text-zinc-400 sm:text-2xl">
              something&apos;s forming
            </p>
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
