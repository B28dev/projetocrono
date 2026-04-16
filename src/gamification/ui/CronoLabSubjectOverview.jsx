function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function CronoLabSubjectOverview({ overview, recovery }) {
  return (
    <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-xl backdrop-blur-xl lg:p-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-rose-400/25 bg-rose-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-rose-200">
              empreender · piloto
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
              {overview.period}
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {overview.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {overview.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {overview.role}
          </p>

          <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-4 shadow-[0_0_18px_rgba(34,211,238,0.08)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  {overview.pilotNotice.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {overview.pilotNotice.title}
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72">
                  {overview.pilotNotice.body}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 xl:max-w-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Progresso geral
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-black text-white">
                {overview.progressPercent}%
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {overview.completedTasks}/{overview.totalTasks} tarefas estruturadas concluídas
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/60">
              {overview.status}
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff3ea5,#00e8ff)] transition-all duration-700 ease-out"
              style={{ width: `${overview.progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/65">
            {overview.statusCopy}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Leitura operacional
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {overview.nextActionLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            A disciplina já aponta a próxima frente sem obrigar leitura longa.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            Limpeza atual
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {overview.recoveryLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            {recovery.isActive ? 'Existe atraso real separado em bloco próprio logo abaixo.' : 'Nada crítico disputa o topo com a próxima ação.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Janela de prova
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {formatDate(overview.examDate)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Professor {overview.professor}. Apoio e revisão ficam no final da página para não poluir o fluxo principal.
          </p>
        </div>
      </div>
    </div>
  );
}
