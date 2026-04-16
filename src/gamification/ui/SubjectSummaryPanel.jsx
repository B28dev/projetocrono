import SummaryAccordion from '../../components/SummaryAccordion.jsx';

export default function SubjectSummaryPanel({ extraContext }) {
  const { summaries } = extraContext;

  return (
    <section className="lab-card h-full rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {extraContext.eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {extraContext.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {extraContext.description}
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
    </section>
  );
}
