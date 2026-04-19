export default function BottleneckCard({ block, onOpenPanel, expandedBottleneckId, onToggleBottleneck }) {
  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-300 dark:text-rose-700">
            gargalos
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-white dark:text-stone-950">{block.title}</h3>
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

      <div className="mt-6 flex flex-col gap-6">
        {block.data.items.slice(0, 3).map((item, index) => {
          const isExpanded = expandedBottleneckId === item.id;
          const isPrimary = index === 0;

          return (
            <div key={item.id} className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300 dark:text-rose-700">
                    {item.priorityLabel}
                  </p>
                  <p className={`${isPrimary ? 'text-lg' : 'text-base'} font-semibold leading-snug text-white dark:text-stone-950`}>
                    {item.topic}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-bold tabular-nums text-white dark:text-stone-950 ${isPrimary ? 'text-4xl' : 'text-2xl'}`}>
                    {item.count}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleBottleneck?.(item.id)}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-white/[0.03] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white dark:bg-stone-100 dark:text-stone-600 dark:hover:bg-stone-200 dark:hover:text-stone-900"
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
                <div id={`bottleneck-${item.id}`} className="mt-4 space-y-4 pt-2">
                  {item.relatedItems.map((relatedItem) => (
                    <div key={relatedItem.id} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-rose-500/40">
                      <p className="text-[13px] font-medium leading-relaxed text-zinc-300 dark:text-stone-700">{relatedItem.text}</p>
                      <p className="mt-1 text-[11px] text-zinc-500 dark:text-stone-500">{relatedItem.topic}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}
