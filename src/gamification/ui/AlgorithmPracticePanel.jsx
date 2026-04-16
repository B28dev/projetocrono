export default function AlgorithmPracticePanel({ practiceItems }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Prática
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde o treino acontece
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Exercício primeiro, teoria como apoio. O bloco de prática existe para execução, não contemplação.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {practiceItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
              ciclo {item.cycle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
