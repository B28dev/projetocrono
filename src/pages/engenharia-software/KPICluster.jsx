const TONE_CLASS_MAP = {
  success: 'border-emerald-400/16 bg-emerald-500/[0.08] text-emerald-300 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-700',
  info: 'border-cyan-400/16 bg-cyan-500/[0.08] text-cyan-300 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700',
  warning: 'border-amber-400/16 bg-amber-500/[0.08] text-amber-300 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700',
  neutral: 'border-white/[0.08] bg-white/[0.03] text-zinc-400 dark:border-stone-300 dark:bg-white dark:text-stone-500',
};

export default function KPICluster({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const toneClass = TONE_CLASS_MAP[item.tone] ?? TONE_CLASS_MAP.neutral;

        return (
          <article key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 dark:border-stone-300 dark:bg-white">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300 dark:text-cyan-700">
                {item.label}
              </p>
              <span className={`inline-flex min-h-8 items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
                {item.trend}
              </span>
            </div>
            <p className="mt-3 text-lg font-bold leading-tight text-white dark:text-stone-950">
              {item.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">
              {item.helper}
            </p>
          </article>
        );
      })}
    </div>
  );
}
