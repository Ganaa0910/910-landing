"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Hand-drawn hero lettering — exported from Linearity Curve, self-writes on load.
// Each path is a centerline stroke (fill:none) so stroke-dashoffset traces it like a pen.
const PATHS: { d: string; w: number }[] = [
  { d: "M1294.35 925.192C1279.61 939.93 1289.93 929.51 1263.78 956.846", w: 1 },
  { d: "M554.307 216.807C567.761 210.081 401.968 433.708 411.32 444.931C442.25 482.047 583.144 355.288 523.745 312.86C351.946 190.146 153.442 596.025 226.857 726.539C288.099 835.414 454.84 782.945 493.183 680.696C556.967 510.606 395.587 635.793 405.863 639.219", w: 58.2428 },
  { d: "M544.484 664.323C588.848 675.414 617.322 472.024 719.124 539.892C742.012 555.151 592.762 732.249 630.712 770.199C650.012 789.498 733.314 704.303 733.314 688.336C733.314 672.065 739.707 737.142 755.144 731.996C792.492 719.547 903.021 626.646 853.379 577.003C800.993 524.618 660.635 759.861 793.346 715.624", w: 58.2428 },
  { d: "M892.673 555.173C890.508 554.091 826.752 741.079 874.117 750.552C930.407 761.81 978.497 649.621 994.183 613.023C996.131 608.475 1024.85 543.495 1022.56 544.258C988.482 555.618 950.357 722.985 1000.73 734.179C1043.12 743.6 1103.72 611.179 1114.25 582.461C1117.4 573.877 1142.04 500.764 1145.9 510.422C1163.7 554.914 1113.56 643.534 1100.06 681.787C928.897 1166.74 724.922 941.71 1062.95 814.951", w: 58.2428 },
  { d: "M887.746 217.647C890.279 215.114 893.082 213.708 896.232 211.99", w: 20.7692 },
  { d: "M601.374 183.353C579.856 183.353 617.639 225.413 614.101 246.637C605.425 298.698 588.104 386.217 558.595 430.482C504.895 511.032 274.548 604.016 353.891 445.331", w: 20.7692 },
  { d: "M509.835 233.233C506.791 224.409 495.691 249.84 486.437 248.616C401.284 237.358 288.172 304.028 242.02 372.202", w: 20.7692 },
  { d: "M791.258 738.144C792.582 738.319 793.906 738.494 795.23 738.669", w: 20.7692 },
  { d: "M202.405 431.634C191.516 513.991 47.4441 693.374 167.451 774.614", w: 20.7692 },
  { d: "M232.784 813.278C242.498 825.951 286.7 838.548 301.727 833.364", w: 20.7692 },
  { d: "M360.296 844.572C441.34 828.96 478.212 753.795 544.503 730.925", w: 20.7692 },
  { d: "M300.357 516.184C294.093 498.027 285.835 551.788 279.952 570.072C268.763 604.843 267.126 721.272 332.219 698.817", w: 20.7692 },
  { d: "M500.029 534.5C495.497 521.362 526.285 544.323 540.063 546.144C556.262 548.286 562.471 520.655 577.704 514.744C640.752 490.279 712.077 487.615 775.298 465.805", w: 20.7692 },
  { d: "M775.022 524.665C766.652 518.998 806.533 507.395 811.998 507.034C822.487 506.342 957.66 422.888 949.325 485.927", w: 20.7692 },
  { d: "M982.432 493.191C976.035 474.648 1032.34 439.583 1049.55 439.705C1065.55 439.819 1056.76 485.913 1072.26 481.971C1162.04 459.137 1176.18 372.649 1217.11 491.306", w: 20.7692 },
  { d: "M565.009 802.926C566.651 960.097 650.299 842.06 710.385 808.289C723.453 800.943 748.55 834.429 774.854 818.545C778.027 816.628 806.008 779.346 806.511 780.002C820.508 798.264 811.337 827.363 850.053 817.516C860.639 814.824 891.775 808.02 880.946 806.588", w: 20.7692 },
  { d: "M846.271 857.821C745.246 927.638 762.749 1095.88 904.872 1054.55", w: 20.7692 },
  { d: "M1205.9 558.575C1191.68 636.429 1180.31 784.514 1156.92 843.41C1133.7 901.858 1034.39 968.785 1021.16 1041.23", w: 20.7692 },
];

export function HeroDrawing() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    if (!paths.length) return;

    // Order strokes left-to-right by their starting point — approximate the
    // order a hand would write them, so the pen flows across instead of jumping.
    const startX = (p: SVGPathElement) =>
      parseFloat(p.getAttribute("d")?.match(/M\s*(-?[\d.]+)/)?.[1] ?? "0");
    paths.sort((a, b) => startX(a) - startX(b));

    const lengths = paths.map((p) => p.getTotalLength());

    // Respect users who don't want motion — show it fully drawn.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }

    const total = lengths.reduce((a, b) => a + b, 0);
    const TOTAL_TIME = 3.4; // seconds for the whole word to write itself

    const ctx = gsap.context(() => {
      // One continuous pen: sequential timeline, constant velocity (ease: none),
      // each stroke's duration proportional to its real length.
      const tl = gsap.timeline({ delay: 0.2 });
      paths.forEach((p, i) => {
        gsap.set(p, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i] });
        tl.to(
          p,
          {
            strokeDashoffset: 0,
            duration: (lengths[i] / total) * TOTAL_TIME,
            ease: "none",
          },
          // Slight overlap with the previous stroke so the pen flows
          // continuously instead of stopping at every stroke boundary.
          i === 0 ? 0 : ">-0.05",
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1920 1080"
      role="img"
      aria-label="910studio"
      className="mx-auto mt-6 w-full max-w-[760px]"
    >
      {PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke="#0a0a0a"
          strokeWidth={p.w}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
