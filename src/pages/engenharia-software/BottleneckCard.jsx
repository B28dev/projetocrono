export default function BottleneckCard({ block, onOpenPanel, expandedBottleneckId, onToggleBottleneck }) {
  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white dark:text-stone-950">{block.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{block.description}</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenPanel?.('bottleneck')}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-600 dark:hover:text-stone-900"
          aria-expanded="false"
        >
          Ver detalhes
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {block.data.items.map((item) => {
          const isExpanded = expandedBottleneckId === item.id;

          return (
            <div key={item.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] px-4 py-4 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white dark:text-stone-950">{item.topic}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{item.helper}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-300 dark:text-rose-700">{item.priorityLabel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-rose-400/20 bg-rose-500/10 px-3 text-sm font-bold text-rose-100 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-700">
                    {item.count}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleBottleneck?.(item.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-600 dark:hover:text-stone-900"
                    aria-expanded={isExpanded}
                    aria-controls={`bottleneck-${item.id}`}
                  >
                    <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              {isExpanded ? (
                <div id={`bottleneck-${item.id}`} className="mt-4 space-y-2 border-t border-white/[0.06] pt-4 dark:border-stone-200">
                  {item.relatedItems.map((relatedItem) => (
                    <div key={relatedItem.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 dark:border-stone-200 dark:bg-white">
                      <p className="text-xs font-semibold text-white dark:text-stone-950">{relatedItem.text}</p>
                      <p className="mt-1 text-[11px] text-zinc-500 dark:text-stone-600">{relatedItem.topic}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-[20px] border border-rose-400/16 bg-rose-500/[0.08] p-4 dark:border-rose-500/25 dark:bg-rose-500/10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-200 dark:text-rose-700">priorização</p>
        <p className="mt-3 text-sm leading-relaxed text-white dark:text-stone-950">{block.data.narrative}</p>
      </div>
    </article>
  );
}
