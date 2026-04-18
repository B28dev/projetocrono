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
    <section className="space-y-4" aria-label={contextGrid.title}>
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-stone-600">
          Context grid
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-stone-950">
          {contextGrid.title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
