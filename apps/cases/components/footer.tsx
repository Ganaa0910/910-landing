export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-base-black">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-modak text-3xl tracking-wider text-zinc-200">
            910studio
          </p>
          <p className="mt-1 font-mono text-xs text-zinc-600">
            selected work &amp; case studies
          </p>
        </div>

        <div className="flex flex-col gap-2 font-mono text-xs sm:items-end">
          <a
            href="https://910.studio"
            className="text-zinc-400 transition-colors duration-150 hover:text-accent"
          >
            → 910.studio
          </a>
          <a
            href="https://910.studio/contact"
            className="text-zinc-400 transition-colors duration-150 hover:text-accent"
          >
            start a project
          </a>
          <span className="text-zinc-700">
            © {new Date().getFullYear()} 910studio
          </span>
        </div>
      </div>
    </footer>
  );
}
