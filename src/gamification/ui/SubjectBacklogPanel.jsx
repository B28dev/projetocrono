export default function SubjectBacklogPanel({ recovery }) {
  const hasOverdueItems = recovery.items.length > 0;
  const hasPendingToday = recovery.pendingTodayPreview.length > 0;

  return (
    <section className="lab-card rounded-[26px] border border-white/[0.06] bg-[#0A0A12]/76 p-4 shadow-lg backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            {recovery.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {recovery.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {recovery.description}
          </p>
        </div>
        <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${recovery.isActive ? 'border-amber-400/20 bg-amber-500/10 text-amber-100' : 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200'}`}>
          {recovery.isActive ? `${recovery.overdueCount} pendência(s) crítica(s)` : 'sem atraso crítico'}
        </span>
      </div>

      {hasOverdueItems ? (
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {recovery.items.map((task) => (
            <div key={task.id} className="rounded-[20px] border border-red-400/18 bg-red-500/[0.08] px-4 py-4">
              <p className="text-sm font-semibold leading-relaxed text-white">
                {task.text}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                {task.topic} · {task.date}
              </p>
            </div>
          ))}
        </div>
      ) : hasPendingToday ? (
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {recovery.pendingTodayPreview.map((task) => (
            <div key={task.id} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-sm font-semibold leading-relaxed text-white">
                {task.text}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {task.topic}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[20px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-5 text-sm leading-relaxed text-emerald-200">
          Sem atraso crítico no momento. O bloco continua visível só para confirmar que a disciplina está limpa.
        </div>
      )}
    </section>
  );
}
