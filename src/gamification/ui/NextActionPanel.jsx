export default function NextActionPanel({ nextAction }) {
  return (
    <section className="lab-card rounded-[28px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(10,10,18,0.94),rgba(10,10,18,0.84))] p-4 shadow-[0_0_40px_rgba(0,232,255,0.06)] backdrop-blur-xl sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
            {nextAction.eyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
              {nextAction.kind}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
              o que eu faço agora
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[28px]">
            {nextAction.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {nextAction.reason}
          </p>
        </div>

        <div className="w-full rounded-[24px] border border-cyan-400/14 bg-cyan-500/[0.06] p-4 lg:max-w-xs">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Direção imediata
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-white">
            {nextAction.ctaLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Sem teoria longa do ciclo. Só a sequência mais útil para este momento.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {nextAction.items.map((item, index) => (
          <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-3.5 py-4 transition-all duration-300 hover:border-cyan-400/25 hover:bg-white/[0.05]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-[10px] font-mono font-bold text-cyan-200">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-relaxed text-white">
                  {item.text}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {item.topic || 'Trilha prioritária'}{item.date ? ` · ${item.date}` : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
