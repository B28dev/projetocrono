export default function CompositionCard({ block }) {
  const chart = block.data;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const segmentArcs = chart.segments.map((segment, index) => {
    const previousValue = chart.segments
      .slice(0, index)
      .reduce((sum, currentSegment) => sum + currentSegment.value, 0);
    const segmentLength = chart.total > 0 ? (segment.value / chart.total) * circumference : 0;

    return {
      ...segment,
      dashArray: `${segmentLength} ${circumference}`,
      strokeOffset: chart.total > 0 ? -(previousValue / chart.total) * circumference : 0,
    };
  });

  return (
    <article className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div>
        <p className="text-xs font-semibold text-zinc-400 dark:text-stone-600">
          composição
        </p>
        <h3 className="mt-1 text-xl font-bold text-white dark:text-stone-950">{block.title}</h3>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="mx-auto flex h-[220px] w-[220px] items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
              {segmentArcs.map((segment) => (
                <circle
                  key={segment.id}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={segment.dashArray}
                  strokeDashoffset={segment.strokeOffset}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-black text-white dark:text-stone-950">{chart.centerValue}</p>
              <p className="mt-1 max-w-[100px] text-xs font-semibold text-zinc-400 dark:text-stone-600">{chart.centerLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {chart.segments.map((segment) => (
            <div key={segment.id} className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: segment.color, boxShadow: `0 0 12px ${segment.color}66` }} />
                <p className="text-sm font-medium text-zinc-300 dark:text-stone-700">{segment.label}</p>
              </div>
              <span className="text-base font-bold tabular-nums text-white dark:text-stone-950">{segment.value}</span>
            </div>
          ))}
        </div>

        <p className="border-t border-white/[0.08] pt-4 text-sm font-semibold text-zinc-200 dark:border-stone-200 dark:text-stone-800">
          Peso atual: {chart.dominantLabel ?? chart.centerLabel}
        </p>
      </div>
    </article>
  );
}
