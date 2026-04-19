import CompositionCard from './CompositionCard.jsx';
import CadenceCard from './CadenceCard.jsx';
import BottleneckCard from './BottleneckCard.jsx';

const CARD_COMPONENTS = {
  composition: CompositionCard,
  cadence: CadenceCard,
  bottleneck: BottleneckCard,
};

export default function ContextGrid({
  contextGrid,
  periodOptions,
  selectedPeriodKey,
  onChangePeriod,
  onOpenPanel,
  expandedBottleneckId,
  onToggleBottleneck,
}) {
  return (
    <section className="space-y-3" aria-label={contextGrid.title}>
      <div>
        <h2 className="text-xl font-semibold text-white dark:text-stone-950">
          {contextGrid.title}
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {contextGrid.blocks.map((block) => {
          const Component = CARD_COMPONENTS[block.type];
          return Component ? (
            <Component
              key={block.id}
              block={block}
              periodOptions={periodOptions}
              selectedPeriodKey={selectedPeriodKey}
              onChangePeriod={onChangePeriod}
              onOpenPanel={onOpenPanel}
              expandedBottleneckId={expandedBottleneckId}
              onToggleBottleneck={onToggleBottleneck}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
