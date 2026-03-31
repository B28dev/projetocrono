import { useNavigate } from 'react-router-dom';
import { topics, studyPlan, summaries } from '../data/arquitetura';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { CountdownFull } from '../components/Countdown';
import TopicChip from '../components/TopicChip';
import StudyPlanItem from '../components/StudyPlanItem';
import SummaryAccordion from '../components/SummaryAccordion';

const TODAY = new Date().toISOString().slice(0, 10);

function Section({ title, subtitle, children }) {
  const ref = useGsapReveal();
  return (
    <section ref={ref} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ArquiteturaPage() {
  const navigate = useNavigate();
  const headerRef = useGsapReveal();

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Header */}
        <div ref={headerRef} className="space-y-4">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Dashboard
          </button>

          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
                  ARQ
                </span>
                <span className="text-xs font-medium text-zinc-500">Engenharia de Software · 2026/1</span>
              </div>
              <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
                Arquitetura de Computadores
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Prova em <span className="text-amber-400 font-semibold">07/04/2026</span> · 5 questões dissertativas · 1h40
              </p>
            </div>

            {/* Live countdown */}
            <div className="rounded-xl border border-zinc-700 bg-surface-2 px-4 py-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Próxima prova em</p>
              <CountdownFull />
            </div>
          </div>
        </div>

        {/* Temas mais cobrados */}
        <Section
          title="Temas mais cobrados"
          subtitle="Baseado nas 3 provas anteriores (P1/2023, P1/2024-A, P1/2024-B)"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topics.map(topic => (
              <TopicChip key={topic.id} topic={topic} />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-1">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Muito frequente (3/3)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Frequente (2/3)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Apareceu (1/3)</span>
          </div>
        </Section>

        {/* Plano até a prova */}
        <Section
          title="Plano até a prova"
          subtitle="Um tópico por dia com vídeos selecionados. Marque as tarefas à medida que concluir."
        >
          <div>
            {studyPlan.map((item) => {
              const isToday = item.date === TODAY;
              const isPast  = item.date < TODAY;
              return (
                <StudyPlanItem key={item.date} item={item} isToday={isToday} isPast={isPast} />
              );
            })}
          </div>
        </Section>

        {/* Resumos modelo */}
        <Section
          title="Resumos modelo"
          subtitle="Conteúdo estruturado para revisão rápida antes da prova."
        >
          <SummaryAccordion summaries={summaries} />
        </Section>

        {/* Banco de questões — placeholder */}
        <Section title="Banco de questões">
          <div className="rounded-xl border border-dashed border-zinc-700 bg-surface-1 px-6 py-10 flex flex-col items-center gap-3 text-center">
            <span className="text-3xl">🗂️</span>
            <p className="text-sm font-semibold text-zinc-300">Banco de questões</p>
            <p className="text-xs text-zinc-500 max-w-xs">
              Questões comentadas das provas anteriores estarão disponíveis em breve.
            </p>
            <button disabled className="mt-2 text-xs font-semibold text-zinc-600 bg-zinc-800 rounded-lg px-4 py-2 cursor-not-allowed">
              Em breve
            </button>
          </div>
        </Section>

      </div>
    </div>
  );
}
