import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { topics, studyPlan, summaries } from '../data/arquitetura';
import { useGsapReveal, useGsapStagger } from '../hooks/useGsapReveal';
import { CountdownFull } from '../components/Countdown';
import TopicChip from '../components/TopicChip';
import StudyPlanItem from '../components/StudyPlanItem';
import SummaryAccordion from '../components/SummaryAccordion';

const TODAY = new Date().toISOString().slice(0, 10);
const THEME_STORAGE_KEY = 'arquitetura-page-theme';

function ThemeToggle({ isAltTheme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isAltTheme ? 'Ativar tema padrao' : 'Ativar tema claro'}
      aria-pressed={isAltTheme}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-surface-2 text-zinc-300 transition-all duration-300 hover:border-[#ccff00]/60 hover:text-[#ccff00] dark:border-stone-300 dark:bg-white/80 dark:text-stone-700 dark:hover:border-stone-900 dark:hover:text-stone-950"
    >
      <span className="relative block h-4 w-4">
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isAltTheme ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${isAltTheme ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.9 2.1a5.8 5.8 0 1 0 3 10.8A6.4 6.4 0 0 1 10.9 2.1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

function Section({ title, subtitle, children }) {
  const ref = useGsapReveal();

  return (
    <section ref={ref} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100 dark:text-stone-950">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-500 mt-0.5 dark:text-stone-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ArquiteturaPage() {
  const navigate = useNavigate();
  const headerRef = useGsapReveal();
  const topicsRef = useGsapStagger('.topic-chip', { blur: true, stagger: 0.08, delay: 0.15 });
  const studyPlanRef = useGsapStagger('.study-plan-card', { blur: true, stagger: 0.1, delay: 0.2 });
  const summariesRef = useGsapStagger('.summary-item', { blur: true, stagger: 0.08, delay: 0.2 });
  const [isAltTheme, setIsAltTheme] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_STORAGE_KEY, isAltTheme ? 'light' : 'default');
  }, [isAltTheme]);

  return (
    <div className={isAltTheme ? 'dark' : ''}>
      <div className="min-h-screen pt-14 transition-colors duration-300 dark:bg-[#EAEAE5] dark:bg-[radial-gradient(circle_at_top,_rgba(204,255,0,0.16),_transparent_28%),linear-gradient(180deg,_#F5F5F4_0%,_#EAEAE5_100%)] dark:text-stone-900">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
          <div ref={headerRef} className="space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors dark:text-stone-600 dark:hover:text-stone-900"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Dashboard
            </button>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-50">
                    ARQ
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-stone-600">Engenharia de Software - 2026/1</span>
                </div>
                <h1 className="text-2xl font-bold text-zinc-100 tracking-tight dark:text-stone-950">
                  Arquitetura de Computadores
                </h1>
                <p className="text-sm text-zinc-500 mt-1 dark:text-stone-600">
                  Prova em <span className="text-amber-400 font-semibold dark:text-amber-600">07/04/2026</span> - 5 questoes dissertativas - 1h40
                </p>
              </div>

              <div className="flex items-start gap-2">
                <ThemeToggle isAltTheme={isAltTheme} onToggle={() => setIsAltTheme((current) => !current)} />

                <div className="rounded-xl border border-zinc-700 bg-surface-2 px-4 py-3 transition-colors duration-300 dark:border-stone-300 dark:bg-white/80 dark:shadow-sm">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 dark:text-stone-500">Proxima prova em</p>
                  <CountdownFull />
                </div>
              </div>
            </div>
          </div>

          <Section
            title="Temas mais cobrados"
            subtitle="Baseado nas 3 provas anteriores (P1/2023, P1/2024-A, P1/2024-B)"
          >
            <div ref={topicsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topics.map((topic) => (
                <TopicChip key={topic.id} topic={topic} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-1 dark:text-stone-600">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Muito frequente (3/3)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Frequente (2/3)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Apareceu (1/3)</span>
            </div>
          </Section>

          <Section
            title="Plano ate a prova"
            subtitle="Um topico por dia com videos selecionados. Marque as tarefas a medida que concluir."
          >
            <div ref={studyPlanRef}>
              {studyPlan.map((item) => {
                const isToday = item.date === TODAY;
                const isPast = item.date < TODAY;

                return (
                  <StudyPlanItem key={item.date} item={item} isToday={isToday} isPast={isPast} />
                );
              })}
            </div>
          </Section>

          <Section
            title="Resumos modelo"
            subtitle="Conteudo estruturado para revisao rapida antes da prova."
          >
            <div ref={summariesRef}>
              <SummaryAccordion summaries={summaries} />
            </div>
          </Section>

          <Section title="Banco de questoes">
            <div className="rounded-xl border border-dashed border-zinc-700 bg-surface-1 px-6 py-10 flex flex-col items-center gap-3 text-center transition-colors duration-300 dark:border-stone-300 dark:bg-white/70">
              <span className="text-3xl">[ ]</span>
              <p className="text-sm font-semibold text-zinc-300 dark:text-stone-800">Banco de questoes</p>
              <p className="text-xs text-zinc-500 max-w-xs dark:text-stone-600">
                Questoes comentadas das provas anteriores estarao disponiveis em breve.
              </p>
              <button disabled className="mt-2 text-xs font-semibold text-zinc-600 bg-zinc-800 rounded-lg px-4 py-2 cursor-not-allowed dark:bg-stone-900 dark:text-stone-100">
                Em breve
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
