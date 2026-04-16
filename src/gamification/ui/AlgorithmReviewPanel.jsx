export default function AlgorithmReviewPanel({ reviewItems }) {
  return (
    <section className="lab-card h-full rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
        Contexto extra
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde revisar e consolidar
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Este bloco fecha a disciplina com revisão guiada e simulado. Ele fica por último para não disputar atenção com a liberação atual.
      </p>
      <div className="mt-5 space-y-3">
        {reviewItems.map((review) => (
          <div key={review.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-sm font-semibold text-white">{review.title}</p>
            <p className="mt-1 text-xs text-zinc-500">{review.description}</p>
            <div className="mt-4 space-y-2">
              {review.items.map((item) => (
                <div key={item.id} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
                  <p className="text-sm font-medium text-white">{item.prompt}</p>
                  <p className="mt-2 text-xs text-zinc-400">Resposta-chave: {item.answer}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
