import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-base-black">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold text-zinc-200">910studio</p>
          <p className="text-xs text-zinc-600">est. 2024</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-600">
          <span>ulaanbaatar, mongolia</span>
          <span className="text-zinc-800">|</span>
          <Link
            href="/contact"
            className="text-zinc-500 transition-colors duration-150 hover:text-accent"
          >
            contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
