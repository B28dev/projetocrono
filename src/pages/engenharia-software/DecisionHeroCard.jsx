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
    <article className="flex h-full flex-col rounded-lg border border-white/[0.08] bg-[#101012] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.22)] dark:border-stone-300 dark:bg-white dark:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">
            {hero.eyebrow}
          </p>
          <span className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold ${STATUS_TONE_CLASS_MAP[hero.statusTone] ?? STATUS_TONE_CLASS_MAP.neutral}`}>
            {hero.status}
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-300 dark:text-stone-700">
            {hero.disciplineName}
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <h2 className="text-5xl font-black leading-none text-white dark:text-stone-950">
              {hero.progressValue}
            </h2>
            <p className="pb-1 text-sm font-semibold text-cyan-300 dark:text-cyan-700">
              {hero.progressLabel}
            </p>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-300 dark:text-stone-700">
            {hero.summary}
          </p>
        </div>

        <KPICluster items={hero.topKpis} />
        <NextActionBlock nextAction={hero.nextAction} onOpenPanel={onOpenPanel} />
      </div>
    </article>
  );
}
