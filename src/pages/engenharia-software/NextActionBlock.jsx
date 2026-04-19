export default function NextActionBlock({ nextAction, onOpenPanel }) {
  const primaryItem = nextAction.items[0];

  return (
    <section className="rounded-xl border border-cyan-400/14 bg-cyan-500/[0.06] p-4 dark:border-cyan-500/20 dark:bg-cyan-500/[0.06]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 dark:text-cyan-700">
            {nextAction.eyebrow}
          </p>
          <span className="text-xs font-semibold text-zinc-400 dark:text-stone-600">
            {nextAction.kind}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold leading-snug text-white dark:text-stone-950">
            {nextAction.title}
          </h3>
          <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-300 dark:text-stone-700">
            {nextAction.summary ?? nextAction.reason}
          </p>
        </div>

        {primaryItem ? (
          <div className="flex gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 dark:border-stone-200 dark:bg-white">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 text-xs font-bold text-cyan-200 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700">
              1
            </span>
            <div>
              <p className="text-sm font-semibold leading-relaxed text-zinc-100 dark:text-stone-800">
                {primaryItem.text}
              </p>
              {primaryItem.topic ? (
                <p className="mt-1 text-xs text-zinc-400 dark:text-stone-600">{primaryItem.topic}</p>
              ) : null}
            </div>
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
            Ver ordem
          </button>
        </div>
      </div>
    </section>
  );
}
