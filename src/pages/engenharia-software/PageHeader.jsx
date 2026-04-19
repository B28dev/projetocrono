export default function PageHeader({ header, onBack }) {
  return (
    <header className="space-y-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-cyan-400/25 hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-700 dark:hover:border-stone-400 dark:hover:text-stone-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 4 6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-300 dark:text-cyan-700">{header.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold text-white dark:text-stone-950 sm:text-4xl">
            {header.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-zinc-300 dark:text-stone-700">
            {header.periodLabel}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <span className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-100 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700">
            {header.status}
          </span>
          <a
            href={header.cta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/35 hover:text-white dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700"
          >
            {header.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
