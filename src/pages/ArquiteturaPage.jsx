import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { examCoverage, modelSummaries, referencePlaylists, topics, studyPlan } from '../data/arquitetura';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import { useGsapReveal, useGsapStagger } from '../hooks/useGsapReveal';
import { CountdownFull } from '../components/Countdown';
import TopicChip from '../components/TopicChip';
import StudyPlanItem from '../components/StudyPlanItem';
import SummaryAccordion from '../components/SummaryAccordion';
import LevelUpModal from '../components/LevelUpModal';

const STUDY_PLAN_STORAGE_KEY = 'arquitetura-study-plan-progress-v2';

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function Section({ title, subtitle, children }) {
  const ref = useGsapReveal();

  return (
    <section ref={ref} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100 dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">{title}</h2>
        {subtitle && <p className="text-sm text-zinc-500 mt-0.5 dark:text-stone-600 cyberpunk:text-white/65">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ArquiteturaPage() {
  const navigate = useNavigate();
  const headerRef = useGsapReveal();
  const topicsRef = useGsapStagger('.topic-chip-content', { stagger: 0.08, delay: 0.15 });
  const playlistsRef = useGsapStagger('.playlist-card', { stagger: 0.08, delay: 0.15 });
  const studyPlanRef = useGsapStagger('.study-plan-card-content', { stagger: 0.1, delay: 0.2 });
  const modelSummariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const summariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const [isOverdueCollapsed, setIsOverdueCollapsed] = useState(false);
  const [taskProgress, setTaskProgress] = useState(() => {
    if (typeof window === 'undefined') return {};

    try {
      const stored = window.localStorage.getItem(STUDY_PLAN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STUDY_PLAN_STORAGE_KEY, JSON.stringify(taskProgress));
  }, [taskProgress]);

  const todayKey = getLocalDateKey();

  const toggleTask = (storageDate, taskIndex) => {
    setTaskProgress((current) => ({
      ...current,
      [storageDate]: {
        ...current[storageDate],
        [taskIndex]: !current[storageDate]?.[taskIndex],
      },
    }));
  };

  const displayStudyPlan = studyPlan.reduce(
    (groups, item) => {
      const checkedTasks = taskProgress[item.date] || {};
      const isDone = item.tasks.length > 0 && item.tasks.every((_, index) => checkedTasks[index]);
      const preparedItem = {
        ...item,
        storageDate: item.date,
        renderKey: item.date,
        isOverdue: false,
      };

      if (item.date < todayKey && isDone) {
        groups.completedPast.push(preparedItem);
        return groups;
      }

      if (item.date < todayKey && !isDone) {
        groups.overdue.push({
          ...preparedItem,
          renderKey: `${item.date}-overdue`,
          isOverdue: true,
        });
        return groups;
      }

      if (item.date === todayKey) {
        groups.today.push(preparedItem);
        return groups;
      }

      if (item.date > todayKey) {
        groups.future.push(preparedItem);
      }

      return groups;
    },
    { completedPast: [], overdue: [], today: [], future: [] },
  );

  displayStudyPlan.completedPast.sort((a, b) => a.date.localeCompare(b.date));
  displayStudyPlan.overdue.sort((a, b) => a.date.localeCompare(b.date));
  displayStudyPlan.today.sort((a, b) => a.date.localeCompare(b.date));
  displayStudyPlan.future.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <div
        ref={magneticRef}
        className="cyber-shell min-h-screen pt-14 transition-colors duration-300 dark:bg-[#EAEAE5] dark:bg-[radial-gradient(circle_at_top,_rgba(204,255,0,0.16),_transparent_28%),linear-gradient(180deg,_#F5F5F4_0%,_#EAEAE5_100%)] dark:text-stone-900"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
          <div ref={headerRef} className="space-y-4">
            <button
              data-magnetic
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/70 cyberpunk:hover:text-[#00e8ff]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Dashboard
            </button>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-50 cyberpunk:border-white/10 cyberpunk:bg-[linear-gradient(135deg,rgba(0,232,255,0.16),rgba(255,62,165,0.22))] cyberpunk:text-white">
                    ARQ
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">Engenharia de Software - 2026/1</span>
                </div>
                <h1 className="text-2xl font-bold text-zinc-100 tracking-tight dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">
                  Arquitetura de Computadores
                </h1>
                <p className="text-sm text-zinc-500 mt-1 dark:text-stone-600 cyberpunk:text-white/65">
                  Prova em <span className="text-amber-400 font-semibold dark:text-amber-600 cyberpunk:text-[#ff3ea5]">13/04/2026</span> - 5 questoes dissertativas - 1h40
                </p>
              </div>

              <div className="cyber-glass rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 transition-colors duration-300 dark:border-stone-300 dark:bg-stone-100/50 dark:shadow-sm cyberpunk:border-white/10 cyberpunk:bg-white/5 hover:border-[#00e8ff]/30 hover:bg-white/10 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 dark:text-stone-500 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">Proxima prova em</p>
                <CountdownFull />
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

            <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-1 dark:text-stone-600 cyberpunk:text-white/60">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 cyberpunk:bg-[#ff3ea5]" /> Muito frequente (3/3)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 cyberpunk:bg-[#00e8ff]" /> Frequente (2/3)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 cyberpunk:bg-emerald-300" /> Apareceu (1/3)</span>
            </div>
          </Section>

          <Section
            title="Playlists de referencia"
            subtitle="Fontes-base para acompanhar o cronograma revisado."
          >
            <div ref={playlistsRef} className="grid gap-3 sm:grid-cols-2">
              {referencePlaylists.map((playlist) => (
                <a
                  key={playlist.id}
                  href={playlist.url}
                  target="_blank"
                  rel="noreferrer"
                  className="playlist-card cyber-glass rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-colors hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
                        {playlist.title}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/62">
                        {playlist.description}
                      </p>
                    </div>
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:border-stone-300 dark:text-stone-600 cyberpunk:border-white/10 cyberpunk:text-[#00e8ff]">
                      playlist
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section
            title="Plano ate a prova"
            subtitle="Um topico por dia com tarefas, recursos externos e revisoes."
          >
            <div ref={studyPlanRef}>
              {displayStudyPlan.completedPast.map((item) => (
                <StudyPlanItem
                  key={`${item.renderKey}-completed`}
                  item={item}
                  isToday={false}
                  isPast={true}
                  checked={taskProgress[item.storageDate] || {}}
                  onToggleTask={toggleTask}
                />
              ))}

              {displayStudyPlan.overdue.length > 0 && (
                <div className="study-plan-card cyber-glass mb-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 dark:border-red-500/20 dark:bg-red-500/5 cyberpunk:border-[#ff3ea5]/20 cyberpunk:bg-transparent">
                  <div className="study-plan-card-content">
                    <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full border border-red-100 bg-red-50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-700 cyberpunk:border-[#ff3ea5]/25 cyberpunk:bg-[#ff3ea5]/10 cyberpunk:text-[#ff8dcb]">
                        ⚠ materias atrasadas
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">Estude nesta ordem</span>
                    </div>
                    <button
                      type="button"
                      data-magnetic
                      onClick={() => setIsOverdueCollapsed((current) => !current)}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/60 cyberpunk:hover:text-[#00e8ff]"
                    >
                      <svg
                        className={`h-3.5 w-3.5 transition-transform ${isOverdueCollapsed ? '-rotate-90' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {isOverdueCollapsed ? 'Mostrar' : 'Minimizar'}
                    </button>
                    </div>

                    {!isOverdueCollapsed && (
                      <div>
                        {displayStudyPlan.overdue.map((item) => (
                          <StudyPlanItem
                            key={item.renderKey}
                            item={item}
                            isToday={false}
                            isPast={false}
                            checked={taskProgress[item.storageDate] || {}}
                            onToggleTask={toggleTask}
                          />
                        ))}
                      </div>
                    )}

                    {isOverdueCollapsed && (
                      <div className="text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                        {displayStudyPlan.overdue.length} materia{displayStudyPlan.overdue.length > 1 ? 's' : ''} atrasada{displayStudyPlan.overdue.length > 1 ? 's' : ''}.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {displayStudyPlan.today.map((item) => (
                <StudyPlanItem
                  key={item.renderKey}
                  item={item}
                  isToday={true}
                  isPast={false}
                  checked={taskProgress[item.storageDate] || {}}
                  onToggleTask={toggleTask}
                />
              ))}

              {displayStudyPlan.future.map((item) => (
                <StudyPlanItem
                  key={item.renderKey}
                  item={item}
                  isToday={false}
                  isPast={false}
                  checked={taskProgress[item.storageDate] || {}}
                  onToggleTask={toggleTask}
                />
              ))}
            </div>
          </Section>

          <Section
            title="Resumos modelo para a prova"
            subtitle="Base consolidada dos temas centrais para revisao rapida antes da prova."
          >
            <div ref={modelSummariesRef}>
              <SummaryAccordion summaries={modelSummaries} />
            </div>
          </Section>

          <Section
            title="O que cada prova cobrou"
            subtitle="Resumo das cobrancas de P1/2023, P1/2024-A e P1/2024-B."
          >
            <div ref={summariesRef}>
              <SummaryAccordion summaries={examCoverage} />
            </div>
          </Section>

          <Section title="Banco de questoes">
            <div className="cyber-glass rounded-xl border border-dashed border-white/10 bg-white/5 backdrop-blur-md px-6 py-10 flex flex-col items-center gap-3 text-center transition-colors duration-300 dark:border-stone-300 dark:bg-stone-100/50 cyberpunk:border-white/10 cyberpunk:bg-white/5">
              <span className="text-3xl cyberpunk:text-[#00e8ff]">[ ]</span>
              <p className="text-sm font-semibold text-zinc-300 dark:text-stone-800 cyberpunk:font-display cyberpunk:text-white">Banco de questoes</p>
              <p className="text-xs text-zinc-500 max-w-xs dark:text-stone-600 cyberpunk:text-white/65">
                Questoes comentadas das provas anteriores estarao disponiveis em breve.
              </p>
              <button disabled className="mt-2 text-xs font-semibold text-zinc-600 bg-zinc-800 rounded-lg px-4 py-2 cursor-not-allowed dark:bg-stone-900 dark:text-stone-100 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.05] cyberpunk:text-white/50">
                Em breve
              </button>
            </div>
          </Section>
        </div>
      </div>
      <LevelUpModal level={12} title="Mestre da Arquitetura" message="Você dominou todos os topicos desta fase. Continue avançando." />
    </>
  );
}
