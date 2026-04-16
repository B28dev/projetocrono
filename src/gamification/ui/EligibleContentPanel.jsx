export default function EligibleContentPanel({ eligibleItems, onToggle }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        O que posso estudar agora
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Conteúdos elegíveis
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Liberdade controlada: você escolhe entre o que já faz sentido estudar agora, sem quebrar a progressão.
      </p>

      <div className="mt-5 space-y-3">
        {eligibleItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className="flex w-full items-start justify-between gap-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-4 text-left transition-colors hover:border-cyan-400/30 hover:bg-cyan-500/14"
          >
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
              elegível
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
