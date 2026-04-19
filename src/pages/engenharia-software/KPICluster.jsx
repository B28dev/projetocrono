const TONE_CLASS_MAP = {
  success: 'text-emerald-300 dark:text-emerald-700',
  info: 'text-cyan-300 dark:text-cyan-700',
  warning: 'text-amber-300 dark:text-amber-700',
  neutral: 'text-zinc-300 dark:text-stone-700',
};

export default function KPICluster({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const toneClass = TONE_CLASS_MAP[item.tone] ?? TONE_CLASS_MAP.neutral;

        return (
          <article key={item.id} className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 dark:border-stone-200 dark:bg-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-stone-600">
              {item.label}
            </p>
            <p className="mt-2 break-words text-2xl font-bold leading-none text-white dark:text-stone-950">
              {item.value}
            </p>
            <p className={`mt-2 text-xs font-semibold ${toneClass}`}>
              {item.trend}
            </p>
          </article>
        );
      })}
    </div>
  );
}
