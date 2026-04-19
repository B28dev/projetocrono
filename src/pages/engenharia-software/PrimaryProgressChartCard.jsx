export default function PrimaryProgressChartCard({ chart, onOpenPanel }) {
  const total = chart.segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const leadingSegments = [...chart.segments].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <article className="flex h-full flex-col rounded-lg border border-cyan-400/[0.12] bg-[#101012] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl dark:border-stone-300 dark:bg-white dark:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6 lg:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">
            progresso
          </p>
          <h3 className="mt-2 text-3xl font-bold leading-tight text-white dark:text-stone-950">
            {chart.title}
          </h3>
        </div>
        <div className="flex items-start gap-4 sm:flex-col sm:items-end sm:gap-3">
          <div className="text-left sm:text-right">
            <p className="text-5xl font-black leading-none text-white dark:text-stone-950">{chart.centerValue}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-300 dark:text-stone-700">{chart.centerLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenPanel?.('progress')}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 dark:hover:text-stone-950"
            aria-expanded="false"
          >
            {chart.buttonLabel ?? 'Ver progresso'}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-1 flex-col justify-end space-y-6">
        <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04] p-1.5 dark:border-stone-300 dark:bg-stone-100">
          <div className="flex h-20 gap-1.5 overflow-hidden rounded-md">
            {chart.segments.map((segment) => (
              <div
                key={segment.id}
                className="h-full rounded-md transition-[width] duration-500"
                style={{
                  width: `${Math.max((segment.value / total) * 100, 6)}%`,
                  backgroundColor: segment.color,
                  boxShadow: `0 0 24px ${segment.color}38`,
                }}
                aria-label={`${segment.label}: ${segment.value}`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-3 dark:border-stone-200">
          {leadingSegments.map((segment) => {
            return (
              <div key={segment.id} className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: segment.color, boxShadow: `0 0 12px ${segment.color}66` }} />
                  <p className="truncate text-sm font-semibold text-zinc-300 dark:text-stone-700">{segment.label}</p>
                </div>
                <p className="mt-2 text-4xl font-black leading-none text-white tabular-nums dark:text-stone-950">
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
