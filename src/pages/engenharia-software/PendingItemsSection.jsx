import PriorityFilterChips from './PriorityFilterChips.jsx';

const GROUP_TONE_CLASS = {
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700',
  info: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700',
  neutral: 'border-white/10 bg-white/[0.03] text-white/60 dark:border-stone-300 dark:bg-white dark:text-stone-600',
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
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="max-w-3xl space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300 dark:text-amber-700">
          pendências rebaixadas
        </p>
        <h3 className="text-lg font-semibold text-white dark:text-stone-950">O que ainda pede limpeza</h3>
        <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">Esses blocos ficam abaixo da overview para detalhar prioridade sem roubar o topo da ação principal.</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <PriorityFilterChips options={priorityFilterOptions} selectedId={pendingFilter} onChange={onChangePendingFilter} />
        {focusTargets?.urgentPendingGroupId ? (
          <button
            type="button"
            onClick={() => onChangePendingFilter?.(focusTargets.urgentPendingGroupId)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100 transition-colors hover:text-white dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-700"
          >
            Focar grupo mais urgente
          </button>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        {visibleGroups.map((group) => {
          const toneClass = GROUP_TONE_CLASS[group.tone] ?? GROUP_TONE_CLASS.neutral;
          const isExpanded = expandedPendingGroups.includes(group.id);

          return (
            <section key={group.id} className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white dark:text-stone-950">{group.label}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{group.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex min-h-9 w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
                    {group.items.length} item(ns)
                  </span>
                  <button
                    type="button"
                    onClick={() => onTogglePendingGroup?.(group.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-600 dark:hover:text-stone-900"
                    aria-expanded={isExpanded}
                    aria-controls={`pending-group-${group.id}`}
                  >
                    <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {isExpanded ? (
                <div id={`pending-group-${group.id}`} className="mt-4 grid gap-3 lg:grid-cols-2">
                  {group.items.map((task) => (
                    <div key={task.id} className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] px-4 py-4 dark:border-stone-200 dark:bg-white">
                      <p className="text-sm font-semibold leading-relaxed text-white dark:text-stone-950">{task.text}</p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{task.topic} {task.date ? `· ${task.date}` : ''}</p>
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
