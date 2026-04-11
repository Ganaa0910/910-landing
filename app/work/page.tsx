import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCard } from "./project-card";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by 910studio. Design systems, platforms, and digital experiences.",
};

const PROJECTS = [
  {
    slug: "cmm",
    title: "MarketIQ",
    client: "Capital Markets Mongolia",
    description: "Design system and frontend for Mongolia's first AI-native capital markets intelligence platform.",
    tags: ["Design System", "Token Architecture", "Frontend"],
    year: "2026",
    image: "/demos/cmm/assets/insights-dense.png",
  },
];

export default function WorkPage() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#d4d4d8",
        minHeight: "100vh",
        fontFamily: "var(--font-ibm-plex-mono), monospace",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.9)",
          backdropFilter: "blur(16px) saturate(1.2)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 32px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: "0.9375rem",
              color: "#d4d4d8",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            910studio
          </Link>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#71717a",
            }}
          >
            Selected Work
          </span>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 32px 64px" }}>
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#f59e0b",
            marginBottom: 16,
          }}
        >
          Work
        </p>
        <h1
          style={{
            fontFamily: "var(--font-syne), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "3rem",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            color: "#fafafa",
            marginBottom: 16,
          }}
        >
          Selected projects
        </h1>
        <p style={{ fontSize: "1rem", color: "#71717a", maxWidth: 480, lineHeight: 1.7 }}>
          Design systems, platforms, and digital experiences. Each project built with conviction.
        </p>
      </div>

      {/* PROJECT GRID */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "48px 32px",
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "#d4d4d8" }}>910studio</span>
        <span style={{ fontSize: "0.75rem", color: "#71717a" }}>Ulaanbaatar, Mongolia &middot; 2026</span>
      </div>
    </div>
  );
}
