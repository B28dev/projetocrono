import PeriodToggle from './PeriodToggle.jsx';

const BAR_TONE_CLASS = {
  success: 'bg-emerald-400',
  info: 'bg-cyan-400',
  warning: 'bg-amber-400',
  neutral: 'bg-white/25 dark:bg-stone-400',
};

export default function CadenceCard({ block, periodOptions, selectedPeriodKey, onChangePeriod, onOpenPanel }) {
  return (
    <article className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-zinc-400 dark:text-stone-600">
            Cadência
          </p>
          <h3 className="mt-1 text-xl font-bold text-white dark:text-stone-950">{block.title}</h3>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PeriodToggle options={periodOptions} selectedId={selectedPeriodKey} onChange={onChangePeriod} />
          <button
            type="button"
            onClick={() => onOpenPanel?.('cadence')}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 dark:hover:text-stone-950"
            aria-expanded="false"
          >
            Detalhes
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">ritmo médio</p>
        <p className="mt-2 text-4xl font-black text-white dark:text-stone-950">{block.data.label}</p>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-2">
        {block.data.series.map((item) => (
          <div key={item.id} className="space-y-3 text-center">
            <div className="flex h-32 items-end justify-center px-1">
              <div
                className={`w-full max-w-[24px] rounded ${BAR_TONE_CLASS[item.state] ?? BAR_TONE_CLASS.neutral}`}
                style={{ height: `${Math.max(item.value, 12)}%` }}
              />
            </div>
            <p className="text-xs font-medium text-zinc-400 dark:text-stone-600">{item.shortLabel}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
