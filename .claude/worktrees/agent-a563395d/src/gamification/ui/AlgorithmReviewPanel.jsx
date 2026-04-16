export default function AlgorithmReviewPanel({ reviewItems }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
        Revisão e consolidação
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde eu reviso
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Este bloco fecha a matéria sem depender de calendário. Aqui entram revisão guiada e simulado.
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
    </div>
  );
}
