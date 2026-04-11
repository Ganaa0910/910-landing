"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/work", label: "work" },
  { href: "/studio", label: "studio" },
  { href: "/contact", label: "contact" },
] as const;

export function Nav() {
  const pathname = usePathname();

  const currentIndex = NAV_LINKS.findIndex(
    (link) => link.href === pathname || (link.href !== "/" && pathname?.startsWith(link.href + "/"))
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-base-black">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-8">
        <Link
          href="/"
          className="font-bebas text-xl tracking-wider text-zinc-200 transition-colors duration-150 hover:text-accent"
        >
          910STUDIO
        </Link>

        <div className="flex items-center gap-6">
          {/* Page indicator dots */}
          <div className="flex items-center gap-2">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                style={{
                  width: currentIndex === i ? "16px" : "6px",
                  height: "6px",
                  backgroundColor: currentIndex === i ? "#14b8a6" : "#3f3f46",
                  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </div>

          {/* Text nav */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-500">
            {NAV_LINKS.slice(1).map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="mx-2 text-zinc-700">/</span>}
                <Link
                  href={link.href}
                  className={`transition-colors duration-150 hover:text-zinc-200 ${
                    pathname === link.href || pathname?.startsWith(link.href + "/")
                      ? "text-accent"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
