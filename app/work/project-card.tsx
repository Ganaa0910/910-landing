"use client";

import Link from "next/link";
import Image from "next/image";

export function ProjectCard({
  slug,
  title,
  client,
  description,
  tags,
  year,
  image,
}: {
  slug: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  year: string;
  image: string;
}) {
  return (
    <Link href={`/work/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          border: "3px solid #262626",
          borderRadius: 12,
          overflow: "hidden",
          background: "#171717",
          boxShadow: "4px 4px 0px rgba(255,255,255,0.04)",
          transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translate(-2px, -2px)";
          el.style.boxShadow = "6px 6px 0px rgba(255,255,255,0.06)";
          el.style.borderColor = "#f59e0b";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translate(0, 0)";
          el.style.boxShadow = "4px 4px 0px rgba(255,255,255,0.04)";
          el.style.borderColor = "#262626";
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image src={image} alt={title} fill style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>

        <div style={{ padding: "24px 28px", borderTop: "1px solid #262626" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h2
                style={{
                  fontFamily: "var(--font-syne), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                  color: "#fafafa",
                }}
              >
                {title}
              </h2>
              <span
                style={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "3px 8px",
                  borderRadius: 3,
                  background: "rgba(245,158,11,0.12)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                {year}
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#71717a" }}>{client}</span>
          </div>

          <p style={{ fontSize: "0.875rem", color: "#a1a1aa", lineHeight: 1.6, marginBottom: 16 }}>
            {description}
          </p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.5625rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "3px 8px",
                  borderRadius: 3,
                  background: "#262626",
                  color: "#71717a",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
