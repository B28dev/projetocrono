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
    <section className="space-y-4" aria-label="Secondary stack">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-stone-600">
          Secondary stack
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-stone-950">
          Camada secundária
        </h2>
      </div>

      <div className="space-y-4">
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
