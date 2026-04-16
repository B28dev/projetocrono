export default function EligibleContentPanel({ eligibleItems, currentCycle, onToggle }) {
  return (
    <section className="lab-card rounded-[28px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(10,10,18,0.92),rgba(10,10,18,0.82))] p-5 shadow-[0_0_40px_rgba(0,232,255,0.06)] backdrop-blur-xl lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Próxima ação
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
              elegível agora
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
              {currentCycle.title}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white lg:text-[28px]">
            O que você pode estudar sem quebrar a progressão
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            Aqui ficam só os conteúdos realmente liberados neste momento. A fila continua controlada para evitar salto aleatório e excesso de opção.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:max-w-xs">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Direção imediata
          </p>
          <p className="mt-3 text-sm font-semibold text-white">
            Marque o item quando fechar esse bloco de estudo.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            O piloto continua simples: sem engine final de ciclo, só organização assistida para execução.
          </p>
        </div>
      </div>

      {eligibleItems.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {eligibleItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className="flex w-full items-start gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-4 text-left transition-colors hover:border-cyan-400/30 hover:bg-cyan-500/14"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-[10px] font-mono font-bold text-cyan-200">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
                    elegível
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm leading-relaxed text-zinc-300">
          Nenhum conteúdo elegível agora. Isso indica que o ciclo atual já foi fechado ou que o próximo passo depende da atualização de progresso anterior.
        </div>
      )}
    </section>
  );
}
