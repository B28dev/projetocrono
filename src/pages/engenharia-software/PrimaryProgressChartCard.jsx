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
        <div className="max-w-xl space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-stone-500">
            gráfico principal
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-white dark:text-stone-950">
            {chart.title}
          </h3>
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
        <div className="overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 dark:border-stone-300 dark:bg-stone-100">
          <div className="flex h-10 gap-1.5 overflow-hidden rounded-full">
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

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6 sm:grid-cols-3">
          {chart.segments.map((segment) => {
            return (
              <div key={segment.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color, boxShadow: `0 0 12px ${segment.color}66` }} />
                  <p className="text-[13px] font-semibold text-zinc-400 dark:text-stone-500">{segment.label}</p>
                </div>
                <p className="text-[2.5rem] font-bold leading-none tracking-tight text-white tabular-nums dark:text-stone-950">
                  {segment.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
