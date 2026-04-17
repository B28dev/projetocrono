import { memo } from 'react';

const AlgorithmSubjectOverview = memo(function AlgorithmSubjectOverview({ subject, notice }) {
  return (
    <div
      className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-xl backdrop-blur-xl lg:p-7"
      style={{ animation: 'animationIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {/* Left — identidade */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200">
              algoritmo por ciclos
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              {subject.status.replace('_', ' ')}
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {subject.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {subject.subtitle}
          </p>

          {/* Notice card */}
          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.07] px-4 py-4 shadow-[0_0_18px_rgba(34,211,238,0.06)]">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {notice.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{notice.title}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
              {notice.body}
            </p>
          </div>
        </div>

        {/* Right — progresso */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 xl:max-w-sm">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Progresso por conteúdo
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-black text-white">
                {subject.progressPercent}%
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {subject.completedCount}/{subject.totalCount} blocos concluídos
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${subject.progressPercent}%`,
                background: 'linear-gradient(90deg, #ff3ea5, #00e8ff)',
                boxShadow: '0 0 10px rgba(0,232,255,0.3)',
              }}
            />
          </div>
          {subject.nextStep && (
            <p className="mt-3 text-[11px] leading-relaxed text-white/60">
              Próximo passo sugerido: {subject.nextStep}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default AlgorithmSubjectOverview;
