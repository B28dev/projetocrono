export default function SubjectBacklogPanel({ backlog }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            Recuperação / backlog
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            O que ficou para trás
          </h3>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-100">
          {backlog.overdueTasks.length} item(ns) pendente(s)
        </span>
      </div>

      {backlog.overdueTasks.length > 0 ? (
        <div className="mt-5 space-y-3">
          {backlog.overdueTasks.slice(0, 6).map((task) => (
            <div key={task.id} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-4">
              <p className="text-sm font-semibold text-white">
                {task.text}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {task.topic} · {task.date}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-5 text-sm text-emerald-200">
          Sem atraso crítico no momento. O laboratório pode focar execução e consolidação.
        </div>
      )}
    </div>
  );
}
