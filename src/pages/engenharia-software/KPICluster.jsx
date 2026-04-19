const TONE_CLASS_MAP = {
  success: 'text-emerald-300 dark:text-emerald-700',
  info: 'text-cyan-300 dark:text-cyan-700',
  warning: 'text-amber-300 dark:text-amber-700',
  neutral: 'text-zinc-300 dark:text-stone-700',
};

export default function KPICluster({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const toneClass = TONE_CLASS_MAP[item.tone] ?? TONE_CLASS_MAP.neutral;

        return (
          <article key={item.id} className="border-t border-white/[0.08] pt-3 dark:border-stone-200">
            <p className="text-xs font-semibold text-zinc-400 dark:text-stone-600">
              {item.label}
            </p>
            <p className="mt-1 break-words text-3xl font-bold leading-none text-white dark:text-stone-950">
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
