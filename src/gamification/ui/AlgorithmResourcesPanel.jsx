export default function AlgorithmResourcesPanel({ resourceItems }) {
  return (
    <section className="lab-card h-full rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Recursos e apoio
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde buscar apoio
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Materiais de referência ficam fora da linha principal de execução. Eles servem como apoio, não como centro da disciplina.
      </p>
      <div className="mt-5 space-y-3">
        {resourceItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                {item.resourceType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
