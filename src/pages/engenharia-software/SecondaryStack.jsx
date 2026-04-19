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
      <div>
        <h2 className="text-xl font-semibold text-white dark:text-stone-950">
          Detalhe sob demanda
        </h2>
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
