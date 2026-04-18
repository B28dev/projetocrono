import DecisionHeroCard from './DecisionHeroCard.jsx';
import PrimaryProgressChartCard from './PrimaryProgressChartCard.jsx';

export default function FirstFold({ firstFold, onOpenPanel }) {
  return (
    <section className="space-y-4" aria-label={firstFold.title}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-5">
        <DecisionHeroCard hero={firstFold.hero} onOpenPanel={onOpenPanel} />
        <PrimaryProgressChartCard chart={firstFold.primaryChart} onOpenPanel={onOpenPanel} />
      </div>
    </section>
  );
}
