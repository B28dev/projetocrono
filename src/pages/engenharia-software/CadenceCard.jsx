import PeriodToggle from './PeriodToggle.jsx';

const BAR_TONE_CLASS = {
  success: 'bg-emerald-400',
  info: 'bg-cyan-400',
  warning: 'bg-amber-400',
  neutral: 'bg-white/25 dark:bg-stone-400',
};

export default function CadenceCard({ block, periodOptions, selectedPeriodKey, onChangePeriod, onOpenPanel }) {
  return (
    <article className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white dark:text-stone-950">{block.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{block.description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PeriodToggle options={periodOptions} selectedId={selectedPeriodKey} onChange={onChangePeriod} />
          <button
            type="button"
            onClick={() => onOpenPanel?.('cadence')}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-600 dark:hover:text-stone-900"
            aria-expanded="false"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[20px] border border-cyan-400/16 bg-cyan-500/[0.08] p-4 dark:border-cyan-500/25 dark:bg-cyan-500/10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 dark:text-cyan-700">ritmo atual</p>
        <p className="mt-3 text-lg font-semibold text-white dark:text-stone-950">{block.data.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300 dark:text-stone-700">{block.data.body}</p>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-stone-600">{block.data.helper}</p>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {block.data.series.map((item) => (
          <div key={item.id} className="space-y-2 text-center">
            <div className="flex h-20 items-end justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] px-2 py-2 dark:border-stone-200 dark:bg-stone-50">
              <div
                className={`w-full rounded-md ${BAR_TONE_CLASS[item.state] ?? BAR_TONE_CLASS.neutral}`}
                style={{ height: `${Math.max(item.value, 12)}%` }}
              />
            </div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-stone-500">{item.shortLabel}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-stone-500">leitura de cadência</p>
        <p className="mt-3 text-sm leading-relaxed text-white dark:text-stone-950">{block.data.narrative}</p>
      </div>
    </article>
  );
}
