import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pomo — a free notch-native pomodoro for macOS",
  description:
    "910studio's free pomodoro. Lives behind the MacBook notch, drops out like a Dynamic Island. Sync mode, voice memos, Markdown notes, ~9MB native Tauri. No licence, no trial, no account.",
  openGraph: {
    title: "pomo — 910studio Toybox",
    description:
      "Charging for a countdown is a crime. A notch-native pomodoro for macOS, free forever.",
  },
};

export default function ToyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
