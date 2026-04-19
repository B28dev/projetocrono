import KPICluster from './KPICluster.jsx';
import NextActionBlock from './NextActionBlock.jsx';

const STATUS_TONE_CLASS_MAP = {
  success: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-700',
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-700',
  info: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-700',
  neutral: 'border-white/10 bg-white/[0.03] text-zinc-300 dark:border-stone-300 dark:bg-white dark:text-stone-700',
};

export default function DecisionHeroCard({ hero, onOpenPanel }) {
  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#101012] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.2)] dark:border-stone-300 dark:bg-white dark:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 dark:text-cyan-700">
            {hero.eyebrow}
          </p>
          <span className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold ${STATUS_TONE_CLASS_MAP[hero.statusTone] ?? STATUS_TONE_CLASS_MAP.neutral}`}>
            {hero.status}
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)] lg:items-start">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-zinc-300 dark:text-stone-700">
                {hero.disciplineName}
              </p>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-zinc-300 dark:text-stone-700">
                {hero.summary}
              </p>
            </div>
            <NextActionBlock nextAction={hero.nextAction} onOpenPanel={onOpenPanel} />
          </div>

          <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-stone-600">
                  {hero.progressLabel}
                </p>
                <p className="mt-2 text-4xl font-black leading-none text-white dark:text-stone-950">
                  {hero.progressValue}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenPanel?.('progress')}
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-700 dark:hover:text-stone-950"
              >
                Ver progresso
              </button>
            </div>
            <KPICluster items={hero.topKpis} />
          </div>
        </div>
      </div>
    </article>
  );
}
