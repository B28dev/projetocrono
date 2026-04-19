import PriorityFilterChips from './PriorityFilterChips.jsx';

const GROUP_TONE_CLASS = {
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700',
  info: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700',
  neutral: 'border-white/10 bg-white/[0.03] text-zinc-300 dark:border-stone-300 dark:bg-white dark:text-stone-700',
};

export default function PendingItemsSection({
  section,
  priorityFilterOptions,
  pendingFilter,
  onChangePendingFilter,
  expandedPendingGroups,
  onTogglePendingGroup,
  focusTargets,
}) {
  const visibleGroups = pendingFilter === 'all'
    ? section.data
    : section.data.filter((group) => group.id === pendingFilter);

  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.018] p-4 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 dark:text-amber-700">
          recuperação
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white dark:text-stone-950">Fila de limpeza</h3>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <PriorityFilterChips options={priorityFilterOptions} selectedId={pendingFilter} onChange={onChangePendingFilter} />
        {focusTargets?.urgentPendingGroupId ? (
          <button
            type="button"
            onClick={() => onChangePendingFilter?.(focusTargets.urgentPendingGroupId)}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-100 transition-colors hover:text-white dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700"
          >
            Focar urgente
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        {visibleGroups.map((group) => {
          const toneClass = GROUP_TONE_CLASS[group.tone] ?? GROUP_TONE_CLASS.neutral;
          const isExpanded = expandedPendingGroups.includes(group.id);

          return (
            <section key={group.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold ${toneClass}`}>
                    {group.items.length}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white dark:text-stone-950">{group.label}</h4>
                    <p className="mt-0.5 text-xs font-medium text-zinc-400 dark:text-stone-600">{group.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onTogglePendingGroup?.(group.id)}
                  className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white dark:bg-stone-100 dark:text-stone-600 dark:hover:bg-stone-200 dark:hover:text-stone-900"
                  aria-expanded={isExpanded}
                  aria-controls={`pending-group-${group.id}`}
                >
                  <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {isExpanded ? (
                <div id={`pending-group-${group.id}`} className="mt-4 space-y-3 border-t border-white/[0.08] pt-3 dark:border-stone-200">
                  {group.items.map((task) => (
                    <div key={task.id} className="space-y-1">
                      <p className="text-sm font-medium leading-relaxed text-zinc-200 dark:text-stone-800">{task.text}</p>
                      <p className="text-xs font-medium text-zinc-400 dark:text-stone-600">{task.topic}{task.date ? ` · ${task.date}` : ''}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </article>
  );
}
