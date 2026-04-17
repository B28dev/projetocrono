import { memo } from 'react';

// ─── CONFIG ───────────────────────────────────────────────────────────────────

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
  focus: null, // não exibir
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

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const CycleProgressHeader = memo(function CycleProgressHeader({
  currentCycle,
  totalCycles,
  progressPercent,
  subjectStatus,
  subjectRotationHint,
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

        {/* Posição no ciclo */}
        <div className="flex items-center gap-4">
          {/* Ciclo badge */}
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
              {/* Status badge */}
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
            </div>
            <p className="mt-1 text-sm font-semibold text-white leading-snug">
              {currentCycle?.title ?? '—'}
            </p>
            {currentCycle?.objective && (
              <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 max-w-sm">
                {currentCycle.objective}
              </p>
            )}
          </div>
        </div>

        {/* Barra de progresso da disciplina */}
        <div className="w-full sm:max-w-[200px]">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Disciplina
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
        </div>
      </div>

      {/* Rotation hint — só aparece quando relevante */}
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
