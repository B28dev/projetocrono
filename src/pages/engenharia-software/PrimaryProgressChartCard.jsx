const SEGMENT_CLASS_MAP = {
  success: 'border-emerald-400/16 bg-emerald-500/[0.08] text-emerald-300 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-700',
  info: 'border-cyan-400/16 bg-cyan-500/[0.08] text-cyan-300 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700',
  warning: 'border-amber-400/16 bg-amber-500/[0.08] text-amber-300 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700',
  neutral: 'border-white/[0.08] bg-white/[0.03] text-zinc-400 dark:border-stone-300 dark:bg-white dark:text-stone-500',
};

export default function PrimaryProgressChartCard({ chart, onOpenPanel }) {
  const total = chart.segments.reduce((sum, segment) => sum + segment.value, 0) || 1;

  return (
    <article className="rounded-[28px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">
            gráfico principal
          </p>
          <h3 className="text-xl font-semibold text-white dark:text-stone-950">
            {chart.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">
            {chart.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenPanel?.('progress')}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-600 dark:hover:text-stone-900"
          aria-expanded="false"
        >
          Ver detalhes
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div className="overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] p-1 dark:border-stone-300 dark:bg-stone-100">
          <div className="flex h-6 gap-1 overflow-hidden rounded-full">
            {chart.segments.map((segment) => (
              <div
                key={segment.id}
                className="h-full rounded-full"
                style={{
                  width: `${Math.max((segment.value / total) * 100, 6)}%`,
                  backgroundColor: segment.color,
                  boxShadow: `0 0 18px ${segment.color}44`,
                }}
                aria-label={`${segment.label}: ${segment.value}`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {chart.segments.map((segment) => {
            const toneClass = SEGMENT_CLASS_MAP[segment.tone] ?? SEGMENT_CLASS_MAP.neutral;

            return (
              <article key={segment.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color, boxShadow: `0 0 14px ${segment.color}55` }} />
                    <div>
                      <p className="text-sm font-semibold text-white dark:text-stone-950">{segment.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{segment.helper}</p>
                    </div>
                  </div>
                  <span className={`inline-flex min-h-9 items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}>
                    {segment.value}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-[20px] border border-cyan-400/16 bg-cyan-500/[0.08] p-4 dark:border-cyan-500/25 dark:bg-cyan-500/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">
            leitura humana
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white dark:text-stone-950">
            {chart.narrative}
          </p>
        </div>
      </div>
    </article>
  );
}
