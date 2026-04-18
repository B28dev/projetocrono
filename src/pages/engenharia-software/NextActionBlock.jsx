export default function NextActionBlock({ nextAction, onOpenPanel }) {
  return (
    <section className="rounded-[24px] border border-fuchsia-400/16 bg-fuchsia-500/[0.08] p-4 shadow-[0_0_20px_rgba(255,62,165,0.08)] dark:border-fuchsia-500/25 dark:bg-fuchsia-500/10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200 dark:text-fuchsia-700">
            {nextAction.eyebrow}
          </p>
          <h3 className="text-base font-semibold text-white dark:text-stone-950 sm:text-lg">
            {nextAction.title}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 dark:text-stone-700">
            {nextAction.summary}
          </p>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-stone-600">
            {nextAction.impact}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <a
            href={nextAction.cta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-sm font-semibold text-fuchsia-100 transition-colors hover:border-fuchsia-300/35 hover:text-white dark:border-fuchsia-500/25 dark:bg-fuchsia-500/10 dark:text-fuchsia-700"
          >
            {nextAction.cta.label}
          </a>
          <button
            type="button"
            onClick={() => onOpenPanel?.('nextAction')}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-600 dark:hover:text-stone-900"
            aria-expanded="false"
          >
            Ver impacto
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-4 dark:border-stone-300 dark:bg-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-stone-500">
          por que isso agora
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white dark:text-stone-950">
          {nextAction.helper}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {nextAction.items.map((item, index) => (
          <div key={item.id} className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4 dark:border-stone-300 dark:bg-white">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fuchsia-400/18 bg-fuchsia-500/10 text-[11px] font-bold text-fuchsia-100 dark:border-fuchsia-500/25 dark:bg-fuchsia-500/10 dark:text-fuchsia-700">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-relaxed text-white dark:text-stone-950">
                  {item.text}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">
                  {item.topic || 'Trilha prioritária'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
