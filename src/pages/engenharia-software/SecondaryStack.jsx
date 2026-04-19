import PendingItemsSection from './PendingItemsSection.jsx';
import TimelineSection from './TimelineSection.jsx';
import SupportSection from './SupportSection.jsx';

const SECTION_COMPONENTS = {
  pending: PendingItemsSection,
  timeline: TimelineSection,
  support: SupportSection,
};

export default function SecondaryStack({
  sections,
  periodOptions,
  selectedPeriodKey,
  onChangePeriod,
  priorityFilterOptions,
  pendingFilter,
  onChangePendingFilter,
  expandedPendingGroups,
  onTogglePendingGroup,
  focusTargets,
  expandedTimelineEventId,
  onToggleTimelineEvent,
  onOpenPanel,
}) {
  return (
    <section className="space-y-3" aria-label="Secondary stack">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-white dark:text-stone-950">
          Apoios secundários
        </h2>
        <p className="mt-1 text-sm text-zinc-400 dark:text-stone-600">
          Só o que ajuda a decidir sem poluir o workspace.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type];
          return Component ? (
            <Component
              key={section.id}
              section={section}
              periodOptions={periodOptions}
              selectedPeriodKey={selectedPeriodKey}
              onChangePeriod={onChangePeriod}
              priorityFilterOptions={priorityFilterOptions}
              pendingFilter={pendingFilter}
              onChangePendingFilter={onChangePendingFilter}
              expandedPendingGroups={expandedPendingGroups}
              onTogglePendingGroup={onTogglePendingGroup}
              focusTargets={focusTargets}
              expandedTimelineEventId={expandedTimelineEventId}
              onToggleTimelineEvent={onToggleTimelineEvent}
              onOpenPanel={onOpenPanel}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
