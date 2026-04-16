export default function NextActionPanel({ nextActions }) {
  const title = nextActions.mode === 'backlog'
    ? 'Limpeza imediata'
    : nextActions.mode === 'today'
      ? 'Execução obrigatória de hoje'
      : 'Preparação seguinte';

  const description = nextActions.mode === 'backlog'
    ? 'O sistema colocou o atraso na frente. Primeiro limpa, depois amplia.'
    : nextActions.mode === 'today'
      ? 'Estas são as ações que mantêm a disciplina operando sem desvio.'
      : 'Sem urgência crítica agora. A próxima frente já está preparada.';

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        O que fazer agora
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>

      <div className="mt-5 space-y-3">
        {nextActions.items.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-[10px] font-mono font-bold text-cyan-200">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {item.text}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {item.topic || 'Trilha prioritária'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
