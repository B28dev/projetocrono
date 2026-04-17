import { memo } from 'react';

const STATUS_CONFIG = {
  em_execucao: {
    label: 'Em execução',
    color: '#00e8ff',
    bg: 'rgba(0,232,255,0.08)',
    border: 'rgba(0,232,255,0.20)',
  },
  consolidado: {
    label: 'Consolidado',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.20)',
  },
  travado: {
    label: 'Travado',
    color: '#f87171',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.20)',
  },
};

const ROTATION_HINT_CONFIG = {
  focus: null,
  alternate: {
    icon: '🔄',
    label: 'Hora de alternar?',
    copy: 'Você está avançando bem aqui. Pode valer passar um tempo em outra matéria antes de continuar.',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.07)',
    border: 'rgba(251,191,36,0.18)',
  },
  rest: {
    icon: '✅',
    label: 'Quase consolidado',
    copy: 'Esta disciplina está praticamente completa. Bom momento para revisar e dar atenção ao restante.',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.18)',
  },
};

const CycleProgressHeader = memo(function CycleProgressHeader({
  currentCycle,
  totalCycles,
  progressPercent,
  subjectStatus,
  subjectRotationHint,
  recommendedItem,
  explorationProgress,
}) {
  const statusConfig = STATUS_CONFIG[subjectStatus] ?? STATUS_CONFIG.em_execucao;
  const rotationConfig = ROTATION_HINT_CONFIG[subjectRotationHint ?? 'focus'];
  const cycleOrder = currentCycle?.order ?? 1;

  return (
    <div
      className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/75 px-5 py-5 shadow-lg backdrop-blur-xl lg:px-6"
      style={{ animation: 'animationIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both' }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,62,165,0.15), rgba(0,232,255,0.10))',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              CIC
            </span>
            <span className="font-display text-lg font-black leading-none text-white">
              {cycleOrder}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                de {totalCycles} ciclos
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                style={{ background: statusConfig.bg, borderColor: statusConfig.border, color: statusConfig.color }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: statusConfig.color, boxShadow: `0 0 6px ${statusConfig.color}` }}
                  aria-hidden="true"
                />
                {statusConfig.label}
              </span>
              {recommendedItem && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-cyan-200">
                  trilha oficial ativa
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              {currentCycle?.title ?? '—'}
            </p>
            {currentCycle?.objective && (
              <p className="mt-0.5 max-w-sm text-[11px] leading-relaxed text-zinc-500">
                {currentCycle.objective}
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:max-w-[220px]">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Trilha oficial
            </span>
            <span className="font-mono text-[11px] font-bold text-zinc-300">
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #ff3ea5, #00e8ff)',
                boxShadow: '0 0 10px rgba(0,232,255,0.35)',
              }}
            />
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
            Exploração livre não altera este percentual.
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">
            {explorationProgress?.exploredOnlyCount ?? 0} blocos explorados fora da ordem.
          </p>
        </div>
      </div>

      {recommendedItem && (
        <div className="mt-4 rounded-2xl border border-cyan-400/[0.14] bg-cyan-500/[0.06] px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Próxima ação principal
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{recommendedItem.title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-cyan-100/75">
            {recommendedItem.isCompletedOutOfSequence
              ? 'Você já explorou este conteúdo. Agora ele precisa de validação oficial para liberar a próxima camada.'
              : 'Esta é a camada que move a progressão oficial da disciplina agora.'}
          </p>
        </div>
      )}

      {rotationConfig && (
        <div
          className="mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3"
          style={{ background: rotationConfig.bg, borderColor: rotationConfig.border, animation: 'fadeIn 0.5s ease-out 0.2s both' }}
        >
          <span className="text-base" aria-hidden="true">{rotationConfig.icon}</span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold" style={{ color: rotationConfig.color }}>
              {rotationConfig.label}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-400">
              {rotationConfig.copy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default CycleProgressHeader;
