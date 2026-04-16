import SummaryAccordion from '../../components/SummaryAccordion.jsx';

export default function SubjectSummaryPanel({ summaries }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Consolidação e revisão
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde consolidar rápido antes da prova
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Este bloco existe para revisão rápida, não para execução bruta. Entra aqui quando a base já foi organizada.
      </p>

      <div className="mt-5 space-y-6">
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Resumos modelo</p>
          <SummaryAccordion summaries={summaries.modelSummaries} />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">O que a prova já cobrou</p>
          <SummaryAccordion summaries={summaries.examCoverage} />
        </div>
      </div>
    </div>
  );
}
