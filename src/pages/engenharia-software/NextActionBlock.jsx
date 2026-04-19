export default function NextActionBlock({ nextAction, onOpenPanel }) {
  const primaryItem = nextAction.items[0];

  return (
    <section className="border-t border-white/[0.08] pt-4 dark:border-stone-200">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">
          {nextAction.eyebrow}
        </p>
        <h3 className="text-lg font-bold leading-snug text-white dark:text-stone-950">
          {nextAction.title}
        </h3>

        {primaryItem ? (
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-xs font-bold text-cyan-200 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700">
              1
            </span>
            <p className="text-sm font-semibold leading-relaxed text-zinc-100 dark:text-stone-800">
              {primaryItem.text}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={nextAction.cta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/35 hover:text-white dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700"
          >
            {nextAction.cta.label}
          </a>
          <button
            type="button"
            onClick={() => onOpenPanel?.('nextAction')}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-700 dark:hover:text-stone-950"
            aria-expanded="false"
          >
            Ver plano
          </button>
        </div>
      </div>
    </section>
  );
}
