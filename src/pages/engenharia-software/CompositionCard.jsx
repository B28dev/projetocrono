export default function CompositionCard({ block }) {
  const chart = block.data;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let strokeOffset = 0;

  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white dark:text-stone-950">{block.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{block.description}</p>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <div className="mx-auto flex h-[180px] w-[180px] items-center justify-center">
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

        <div className="space-y-3">
          {chart.segments.map((segment) => (
            <div key={segment.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] px-4 py-3 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color, boxShadow: `0 0 14px ${segment.color}55` }} />
                  <div>
                    <p className={`text-sm font-semibold ${segment.tone}`}>{segment.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{segment.helper}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-white dark:text-stone-950">{segment.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-fuchsia-400/16 bg-fuchsia-500/[0.08] p-4 dark:border-fuchsia-500/25 dark:bg-fuchsia-500/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200 dark:text-fuchsia-700">leitura do estado</p>
          <p className="mt-3 text-sm leading-relaxed text-white dark:text-stone-950">{chart.narrative}</p>
        </div>
      </div>
    </article>
  );
}
