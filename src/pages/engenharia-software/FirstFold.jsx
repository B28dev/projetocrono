import DecisionHeroCard from './DecisionHeroCard.jsx';
import PrimaryProgressChartCard from './PrimaryProgressChartCard.jsx';

export default function FirstFold({ firstFold, onOpenPanel }) {
  return (
    <section aria-label={firstFold.title}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)] lg:items-stretch">
        <PrimaryProgressChartCard chart={firstFold.primaryChart} onOpenPanel={onOpenPanel} />
        <DecisionHeroCard hero={firstFold.hero} onOpenPanel={onOpenPanel} />
      </div>
    </section>
  );
}
