export default function AlgorithmSubjectOverview({ subject }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-6 lg:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200">
            Algoritmo por ciclos
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {subject.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {subject.subtitle}
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            Próximo conteúdo orientado: {subject.nextStep}
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Progresso por conteúdo
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {subject.progressPercent}%
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {subject.completedCount}/{subject.totalCount} blocos marcados como estudados
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff3ea5,#00e8ff)] transition-all duration-700 ease-out"
              style={{ width: `${subject.progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
