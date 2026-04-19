export default function BottleneckCard({ block, onOpenPanel, expandedBottleneckId, onToggleBottleneck }) {
  return (
    <article className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-amber-300 dark:text-amber-700">
            gargalos
          </p>
          <h3 className="mt-1 text-xl font-bold text-white dark:text-stone-950">{block.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onOpenPanel?.('bottleneck')}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 dark:hover:text-stone-950"
          aria-expanded="false"
        >
          Detalhes
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {block.data.items.slice(0, 3).map((item, index) => {
          const isExpanded = expandedBottleneckId === item.id;
          const isPrimary = index === 0;

          return (
            <div key={item.id} className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold text-amber-300 dark:text-amber-700">
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
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white dark:bg-stone-100 dark:text-stone-600 dark:hover:bg-stone-200 dark:hover:text-stone-900"
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
                <div id={`bottleneck-${item.id}`} className="mt-4 space-y-3 border-l border-white/[0.08] pl-4 dark:border-stone-200">
                  {item.relatedItems.map((relatedItem) => (
                    <div key={relatedItem.id}>
                      <p className="text-sm font-medium leading-relaxed text-zinc-300 dark:text-stone-700">{relatedItem.text}</p>
                      <p className="mt-1 text-xs text-zinc-400 dark:text-stone-600">{relatedItem.topic}</p>
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
