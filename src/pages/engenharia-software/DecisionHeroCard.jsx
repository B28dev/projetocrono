import KPICluster from './KPICluster.jsx';
import NextActionBlock from './NextActionBlock.jsx';

const STATUS_TONE_CLASS_MAP = {
  success: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-700',
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-700',
  info: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-700',
  neutral: 'border-white/10 bg-white/[0.03] text-white/60 dark:border-stone-300 dark:bg-white dark:text-stone-600',
};

export default function DecisionHeroCard({ hero, onOpenPanel }) {
  return (
    <article className="rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.96),rgba(10,10,18,0.84))] p-5 shadow-[0_0_44px_rgba(0,232,255,0.05)] backdrop-blur-xl dark:border-stone-300 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,245,244,0.92))] dark:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:p-6 lg:p-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-11 items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-700">
            {hero.eyebrow}
          </span>
          <span className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${STATUS_TONE_CLASS_MAP[hero.statusTone] ?? STATUS_TONE_CLASS_MAP.neutral}`}>
            {hero.status}
          </span>
          <span className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 dark:border-stone-300 dark:bg-white dark:text-stone-500">
            {hero.supportLabel}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-stone-600">
            {hero.disciplineName}
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-white dark:text-stone-950 sm:text-[2rem]">
              {hero.progressValue}
            </h2>
            <p className="pb-1 text-sm font-medium text-cyan-200 dark:text-cyan-700">
              {hero.progressLabel}
            </p>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-300 dark:text-stone-700 sm:text-base">
            {hero.summary}
          </p>
        </div>

        <KPICluster items={hero.topKpis} />
        <NextActionBlock nextAction={hero.nextAction} onOpenPanel={onOpenPanel} />

        <div className="pt-1">
          <a
            href={hero.cta.href}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/35 hover:text-white dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700"
          >
            {hero.cta.label}
          </a>
        </div>
      </div>
    </article>
  );
}
