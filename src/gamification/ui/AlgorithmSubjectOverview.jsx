import { memo } from 'react';

const AlgorithmSubjectOverview = memo(function AlgorithmSubjectOverview({
  subject,
  notice,
  recommendedItem,
  nextRecommendedAction,
  disciplineProgress,
  explorationProgress,
}) {
  return (
    <div
      className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-xl backdrop-blur-xl lg:p-7"
      style={{ animation: 'animationIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200">
              algoritmo por ciclos
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              {subject.status.replace('_', ' ')}
            </span>
            {recommendedItem && (
              <span className="inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fuchsia-200 animate-in fade-in duration-500">
                recomendado agora
              </span>
            )}
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {subject.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {subject.subtitle}
          </p>

          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.07] px-4 py-4 shadow-[0_0_18px_rgba(34,211,238,0.06)]">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {notice.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{notice.title}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              {notice.body}
            </p>
          </div>

          {recommendedItem && (
            <div className="mt-5 rounded-2xl border border-fuchsia-400/18 bg-fuchsia-500/[0.07] px-4 py-4 shadow-[0_0_18px_rgba(217,70,239,0.08)] animate-in fade-in slide-in-from-bottom-3 duration-500">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                Próxima camada recomendada
              </p>
              <p className="mt-1 text-base font-semibold text-white">{recommendedItem.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {nextRecommendedAction?.supportText
                  ?? (recommendedItem.isCompletedOutOfSequence
                    ? 'Você já explorou este conteúdo. Agora ele precisa de validação oficial para mover a trilha principal.'
                    : 'Siga por aqui para manter a progressão oficial da disciplina sem perder a ordem principal.')}
              </p>
              {nextRecommendedAction?.recommendedReasonLabel && (
                <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  {nextRecommendedAction.recommendedReasonLabel}
                </div>
              )}
            </div>
          )}

          {disciplineProgress && (
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Camadas oficiais</p>
                <p className="mt-2 text-2xl font-black text-white">{disciplineProgress.official.completedCount}</p>
                <p className="mt-1 text-[11px] text-zinc-500">de {disciplineProgress.official.totalCount} já validadas</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">Exploração livre</p>
                <p className="mt-2 text-2xl font-black text-white">{disciplineProgress.exploration.exploredOnlyCount}</p>
                <p className="mt-1 text-[11px] text-zinc-500">camadas fora da ordem oficial</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300">Missão futura</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{disciplineProgress.nextRecommendedLayerTitle ?? 'Sem pendências na trilha oficial'}</p>
                <p className="mt-1 text-[11px] text-zinc-500">Contrato pronto para alimentar a Missão Diária na Sprint 3.</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 xl:max-w-sm">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Trilha oficial
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-black text-white">
                {disciplineProgress?.official.progressPercent ?? subject.officialProgressPercent}%
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {disciplineProgress?.official.completedCount ?? subject.completedCount}/{disciplineProgress?.official.totalCount ?? subject.totalCount} blocos validados
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">Exploração extra</p>
              <p className="mt-1 text-lg font-black text-white">{disciplineProgress?.exploration.exploredOnlyCount ?? explorationProgress?.exploredOnlyCount ?? 0}</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${disciplineProgress?.official.progressPercent ?? subject.officialProgressPercent}%`,
                background: 'linear-gradient(90deg, #ff3ea5, #00e8ff)',
                boxShadow: '0 0 10px rgba(0,232,255,0.3)',
              }}
            />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-white/60">
            {subject.nextStepSupport}
          </p>
          {subject.nextStep && (
            <p className="mt-2 text-[11px] leading-relaxed text-white/60">
              Próximo passo oficial: {subject.nextStep}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default AlgorithmSubjectOverview;
