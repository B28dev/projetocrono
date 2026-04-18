import PeriodToggle from './PeriodToggle.jsx';

const STATUS_CLASS_MAP = {
  done: 'border-emerald-400/16 bg-emerald-500/[0.08] text-emerald-300 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-700',
  today_done: 'border-emerald-400/16 bg-emerald-500/[0.08] text-emerald-300 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-700',
  today: 'border-cyan-400/16 bg-cyan-500/[0.08] text-cyan-300 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700',
  overdue: 'border-amber-400/16 bg-amber-500/[0.08] text-amber-300 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700',
  planned: 'border-white/[0.08] bg-white/[0.03] text-zinc-400 dark:border-stone-300 dark:bg-white dark:text-stone-500',
};

export default function TimelineSection({
  section,
  periodOptions,
  selectedPeriodKey,
  onChangePeriod,
  expandedTimelineEventId,
  onToggleTimelineEvent,
  onOpenPanel,
}) {
  const timeline = section.data;

  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="flex flex-col gap-4">
        <div className="max-w-3xl space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">linha de evolução</p>
          <h3 className="text-lg font-semibold text-white dark:text-stone-950">{timeline.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{timeline.description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PeriodToggle options={periodOptions} selectedId={selectedPeriodKey} onChange={onChangePeriod} />
          <button
            type="button"
            onClick={() => onOpenPanel?.('timeline')}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-600 dark:hover:text-stone-900"
            aria-expanded="false"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {timeline.items.map((item) => {
          const statusClass = STATUS_CLASS_MAP[item.status] ?? STATUS_CLASS_MAP.planned;
          const isExpanded = expandedTimelineEventId === item.id;

          return (
            <article key={item.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-white dark:text-stone-950">{item.label}</h4>
                    {item.isExamDay ? <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300 dark:text-fuchsia-700">prova</span> : null}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex min-h-9 w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusClass}`}>
                    {item.completion}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleTimelineEvent?.(item.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-600 dark:hover:text-stone-900"
                    aria-expanded={isExpanded}
                    aria-controls={`timeline-event-${item.id}`}
                  >
                    <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 dark:text-stone-700">{item.summary}</p>
              {isExpanded ? (
                <div id={`timeline-event-${item.id}`} className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-white">
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{item.detail.body}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </article>
  );
}
