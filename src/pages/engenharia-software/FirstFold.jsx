import DecisionHeroCard from './DecisionHeroCard.jsx';

export default function FirstFold({ firstFold, onOpenPanel }) {
  return (
    <section aria-label={firstFold.title}>
      <DecisionHeroCard hero={firstFold.hero} onOpenPanel={onOpenPanel} />
    </section>
  );
}
