import Link from "next/link";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-base-black">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="910studio Cases — home"
        >
          {/* LOGO PLACEHOLDER — swap for the real cases.910.studio logo */}
          <span className="border-2 border-dashed border-zinc-700 px-1.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-600">
            logo
          </span>
          <span className="font-modak text-xl tracking-wider text-zinc-200">
            cases
          </span>
        </Link>

        <a
          href="https://910.studio"
          className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors duration-150 hover:text-accent"
        >
          910.studio
          <span aria-hidden>↗</span>
        </a>
      </div>
    </nav>
  );
}
