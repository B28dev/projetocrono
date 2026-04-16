export default function CurrentStudyCyclePanel({ currentCycle }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Ciclo atual
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {currentCycle.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {currentCycle.objective}
      </p>

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
    </div>
  );
}
