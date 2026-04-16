export default function CurrentStudyCyclePanel({ currentCycle, upcomingItems }) {
  return (
    <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            Ciclo em andamento
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {currentCycle.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {currentCycle.objective}
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-100">
          {upcomingItems.length} frente(s) depois
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {currentCycle.items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
              </div>
              <span className={`rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${item.status === 'completed' ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200'}`}>
                {item.status === 'completed' ? 'feito' : 'ativo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
