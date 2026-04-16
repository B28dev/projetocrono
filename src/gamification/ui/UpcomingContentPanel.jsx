export default function UpcomingContentPanel({ upcomingItems }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
        O que vem depois
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Conteúdos futuros
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        O sistema já mostra a fila pedagógica, mas ainda não libera salto aleatório.
      </p>
      <div className="mt-5 space-y-3">
        {upcomingItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 opacity-80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
              </div>
              <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-100">
                próximo
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
