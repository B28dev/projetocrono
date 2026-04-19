export default function CompositionCard({ block }) {
  const chart = block.data;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  let strokeOffset = 0;

  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-stone-500">
          composição
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white dark:text-stone-950">{block.title}</h3>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="mx-auto flex h-[240px] w-[240px] items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
              {chart.segments.map((segment) => {
                const segmentLength = chart.total > 0 ? (segment.value / chart.total) * circumference : 0;
                const dashArray = `${segmentLength} ${circumference}`;
                const currentOffset = strokeOffset;
                strokeOffset -= segmentLength;

                return (
                  <circle
                    key={segment.id}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={currentOffset}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-black text-white dark:text-stone-950">{chart.centerValue}</p>
              <p className="mt-1 max-w-[90px] text-[10px] uppercase tracking-[0.18em] text-white/45 dark:text-stone-500">{chart.centerLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {chart.segments.map((segment) => (
            <div key={segment.id} className="flex items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color, boxShadow: `0 0 12px ${segment.color}66` }} />
                <p className="text-[13px] font-medium text-zinc-300 dark:text-stone-600">{segment.label}</p>
              </div>
              <span className="text-base font-bold tabular-nums text-white dark:text-stone-950">{segment.value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-5 dark:border-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-stone-500">peso atual</p>
          <p className="mt-2 text-base font-semibold leading-snug text-white dark:text-stone-950">{chart.narrative}</p>
        </div>
      </div>
    </article>
  );
}
