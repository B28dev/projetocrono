import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  examDate as inglesExamDate,
  examCoverage,
  getStudyPlanByShift,
  getStudyPlanTaskStorageKey,
  modelSummaries,
  referenceVideoSections,
  summaryNotice,
  topics,
} from '../data/ingles';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import { useGsapReveal, useGsapStagger } from '../hooks/useGsapReveal';
import { CountdownFull } from '../components/Countdown';
import CurrentRhythmCard from '../components/CurrentRhythmCard';
import OverdueStatusCard from '../components/OverdueStatusCard';
import ProgressBar from '../components/ProgressBar';
import TopicChip from '../components/TopicChip';
import StudyPlanItem from '../components/StudyPlanItem';
import SummaryAccordion from '../components/SummaryAccordion';
import LevelUpModal from '../components/LevelUpModal';

const STUDY_PLAN_STORAGE_KEY = 'ingles-study-plan-progress-v2';

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function persistTaskProgress(storageKey, payload) {
  if (typeof window === 'undefined') return Promise.resolve();

  return new Promise((resolve, reject) => {
    const writeProgress = () => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(writeProgress, { timeout: 700 });
      return;
    }

    window.setTimeout(writeProgress, 0);
  });
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

function formatDatePtBr(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function InglesPage({
  theme = 'dark',
  shift = 'noturno-adele',
  shiftLabel = 'Noturno (Adele)',
  examDate = inglesExamDate,
}) {
  const navigate = useNavigate();
  const headerRef = useGsapReveal();
  const topicsRef = useGsapStagger('.topic-chip-content', { stagger: 0.08, delay: 0.15 });
  const playlistsRef = useGsapStagger('.playlist-card', { stagger: 0.08, delay: 0.15 });
  const studyPlanRef = useGsapStagger('.study-plan-card-content', { stagger: 0.1, delay: 0.2 });
  const modelSummariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const summariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const examDateText = formatDatePtBr(examDate);
  const [isReferencesOpen, setIsReferencesOpen] = useState(true);
  const [openReferenceGroupIds, setOpenReferenceGroupIds] = useState(() => ({
    'videos-leitura-estrategica': true,
    'videos-vocabulario-apoio': false,
  }));
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
  const taskProgressRef = useRef(taskProgress);

  const toggleReferenceGroup = (groupId) => {
    setOpenReferenceGroupIds((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  };

  const todayKey = getLocalDateKey();
  const studyPlan = useMemo(() => getStudyPlanByShift(shift), [shift]);
  const totalTasks = useMemo(
    () => studyPlan.reduce((sum, item) => sum + item.tasks.length, 0),
    [studyPlan],
  );
  const completedTasks = useMemo(
    () =>
      studyPlan.reduce((sum, item) => {
        const storageDate = getStudyPlanTaskStorageKey(shift, item);
        const checkedTasks = taskProgress[storageDate] || {};

        return (
          sum +
          item.tasks.reduce(
            (taskSum, _, index) => taskSum + (checkedTasks[index] ? 1 : 0),
            0,
          )
        );
      }, 0),
    [shift, studyPlan, taskProgress],
  );
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toggleTask = async (storageKey, taskIndex) => {
    const currentProgress = taskProgressRef.current || {};
    const previousValue = Boolean(currentProgress[storageKey]?.[taskIndex]);
    const nextValue = !previousValue;
    const nextProgress = {
      ...currentProgress,
      [storageKey]: {
        ...(currentProgress[storageKey] || {}),
        [taskIndex]: nextValue,
      },
    };

    // Optimistic UI: atualiza primeiro, persiste depois.
    setTaskProgress(nextProgress);
    taskProgressRef.current = nextProgress;

    try {
      await persistTaskProgress(STUDY_PLAN_STORAGE_KEY, nextProgress);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      const revertedProgress = {
        ...nextProgress,
        [storageKey]: {
          ...(nextProgress[storageKey] || {}),
          [taskIndex]: previousValue,
        },
      };
      setTaskProgress(revertedProgress);
      taskProgressRef.current = revertedProgress;
    }
  };

  const {
    displayStudyPlan,
    conteudosAtrasados,
    tarefasHoje,
    hojePendentes,
    hojeConcluidas,
  } = useMemo(() => {
    const groups = studyPlan.reduce(
      (acc, item) => {
        const storageDate = getStudyPlanTaskStorageKey(shift, item);
        const checkedTasks = taskProgress[storageDate] || {};
        const isDone = item.tasks.length > 0 && item.tasks.every((_, index) => checkedTasks[index]);
        const preparedItem = {
          ...item,
          storageDate,
          renderKey: item.id || item.date,
          isOverdue: false,
        };

        if (item.date < todayKey && isDone) {
          acc.completedPast.push(preparedItem);
          return acc;
        }

        if (item.date < todayKey && !isDone) {
          acc.overdue.push({
            ...preparedItem,
            renderKey: `${item.id || item.date}-overdue`,
            isOverdue: true,
          });
          return acc;
        }

        if (item.date === todayKey) {
          acc.today.push(preparedItem);
          return acc;
        }

        if (item.date > todayKey) {
          acc.future.push(preparedItem);
        }

        return acc;
      },
      { completedPast: [], overdue: [], today: [], future: [] },
    );

    groups.completedPast.sort((a, b) => a.date.localeCompare(b.date));
    groups.overdue.sort((a, b) => a.date.localeCompare(b.date));
    groups.today.sort((a, b) => a.date.localeCompare(b.date));
    groups.future.sort((a, b) => a.date.localeCompare(b.date));

    const overdueItems = groups.overdue.flatMap((item) => {
      const checkedTasks = taskProgress[item.storageDate] || {};
      return item.tasks
        .map((task, index) => ({
          id: `${item.storageDate}-overdue-${index}`,
          date: item.date,
          text: task,
          topic: item.topic,
          checked: Boolean(checkedTasks[index]),
        }))
        .filter((task) => !task.checked);
    });

    const todayItems = groups.today.flatMap((item) => {
      const checkedTasks = taskProgress[item.storageDate] || {};
      return item.tasks.map((task, index) => ({
        id: `${item.storageDate}-today-${index}`,
        text: task,
        topic: item.topic,
        checked: Boolean(checkedTasks[index]),
      }));
    });

    const pendingTodayItems = todayItems.filter((task) => !task.checked);
    const completedTodayItems = todayItems.filter((task) => task.checked);

    return {
      displayStudyPlan: groups,
      conteudosAtrasados: overdueItems,
      tarefasHoje: todayItems,
      hojePendentes: pendingTodayItems,
      hojeConcluidas: completedTodayItems,
    };
  }, [shift, studyPlan, taskProgress, todayKey]);
  const todayTotal = tarefasHoje.length;
  const todayDone = hojeConcluidas.length;
  return (
    <>
      <div
        ref={magneticRef}
        className="cyber-shell relative min-h-screen bg-surface-1 pt-14 transition-colors duration-300 dark:bg-[#EAEAE5] dark:text-stone-900"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden cyberpunk:block"
          style={{
            background:
              'radial-gradient(circle at 12% 18%, rgba(255,62,165,0.08), transparent 30%), radial-gradient(circle at 86% 10%, rgba(0,232,255,0.08), transparent 28%), linear-gradient(180deg, rgba(8,8,15,0.72) 0%, rgba(8,8,15,0.82) 42%, rgba(8,8,15,0.9) 100%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 py-8 space-y-12">
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
                    ING
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                    Eletiva I (Ingles) - 2026/1 - {shiftLabel}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-zinc-100 tracking-tight dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">
                  Eletiva I - Ingles
                </h1>
                <p className="text-sm text-zinc-500 mt-1 dark:text-stone-600 cyberpunk:text-white/65">
                  Prova em <span className="text-amber-400 font-semibold dark:text-amber-600 cyberpunk:text-[#ff3ea5]">{examDateText}</span>
                </p>
              </div>

              <div className="cyber-glass w-full max-w-[18rem] rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-colors duration-300 dark:border-stone-300 dark:bg-stone-100/50 dark:shadow-sm hover:border-[#00e8ff]/30 hover:bg-white/10 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 dark:text-stone-500 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">Proxima prova em</p>
                <CountdownFull target={examDate} />
                <div className="mt-4 w-full">
                  <div className="mb-2 flex items-end justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-stone-600 cyberpunk:font-mono cyberpunk:text-white/60">
                        Progresso Geral
                      </span>
                      <span className="text-xs font-mono font-semibold text-zinc-300 dark:text-stone-800 cyberpunk:text-white/70">
                        {completedTasks}/{totalTasks}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-400 dark:text-green-700 cyberpunk:text-[#00e8ff]">
                      {progress}%
                    </span>
                  </div>
                  <ProgressBar value={progress} color="green" className="h-2 border border-white/5 bg-white/5 dark:bg-stone-200 cyberpunk:bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 mt-6 max-w-md">
            <div className="grid gap-3 md:grid-cols-2">
              <CurrentRhythmCard
                theme={theme}
                todayDoneCount={todayDone}
                todayTotalCount={todayTotal}
                todayPendingCount={hojePendentes.length}
                completedTodayTasks={hojeConcluidas}
              />
              <OverdueStatusCard theme={theme} overdueContentItems={conteudosAtrasados} todayPendingTasks={hojePendentes} />
            </div>
          </div>

          <Section
            title="Temas mais cobrados"
            subtitle="Baseado em 2 provas analisadas (P1/2024 e P1/2023)"
          >
            <div ref={topicsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topics.map((topic) => (
                <TopicChip key={topic.id} topic={topic} />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-1 dark:text-stone-600 cyberpunk:text-white/60">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 cyberpunk:bg-[#ff3ea5]" /> Muito frequente (2/2)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 cyberpunk:bg-emerald-300" /> Apareceu (1/2)</span>
            </div>
          </Section>

          <Section
            title="Playlists de referencia"
            subtitle="Videos da disciplina no mesmo painel expansivel."
          >
            <div ref={playlistsRef} className="space-y-3">
              <div
                className={`summary-item cyber-glass rounded-xl border backdrop-blur-md transition-colors duration-300 dark:shadow-sm ${
                  isReferencesOpen
                    ? 'border-white/20 bg-white/10 dark:border-stone-400 dark:bg-stone-50 cyberpunk:border-[#00e8ff]/40 cyberpunk:bg-white/10'
                    : 'border-white/10 bg-white/5 hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/30 cyberpunk:hover:bg-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsReferencesOpen((current) => !current)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
                    Referencias da disciplina
                  </span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 dark:text-stone-500 flex-shrink-0 transition-transform duration-200 cyberpunk:text-[#00e8ff] ${isReferencesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isReferencesOpen ? (
                  <div className="border-t border-white/10 px-4 pb-4 pt-4 dark:border-stone-300 cyberpunk:border-white/10">
                    <div className="space-y-3">
                      {referenceVideoSections.map((section) => {
                        const isSectionOpen = Boolean(openReferenceGroupIds[section.id]);
                        return (
                          <div
                            key={section.id}
                            className={`summary-item cyber-glass rounded-xl border backdrop-blur-md transition-colors duration-300 ${
                              isSectionOpen
                                ? 'border-white/20 bg-white/10 dark:border-stone-400 dark:bg-stone-50 cyberpunk:border-[#00e8ff]/35 cyberpunk:bg-white/10'
                                : 'border-white/10 bg-white/5 hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/30 cyberpunk:hover:bg-white/10'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleReferenceGroup(section.id)}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                            >
                              <span className="min-w-0">
                                <span className="block truncate text-xs font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:text-white">
                                  {section.title}
                                </span>
                                <span className="block truncate text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/58">
                                  {section.description}
                                </span>
                              </span>
                              <svg
                                className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 dark:text-stone-500 cyberpunk:text-[#00e8ff] ${isSectionOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>

                            {isSectionOpen ? (
                              <div className="border-t border-white/10 px-3 pb-3 pt-3 dark:border-stone-300 cyberpunk:border-white/10">
                                <div className="space-y-2">
                                  {section.items.map((video) => (
                                    <a
                                      key={video.id}
                                      href={video.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="playlist-card flex items-center justify-between gap-3 rounded-lg border border-zinc-700/60 bg-zinc-900/40 px-3 py-2 transition-colors hover:border-[#00e8ff]/35 hover:bg-zinc-900/60 dark:border-stone-300 dark:bg-stone-100 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/[0.03] cyberpunk:hover:border-[#00e8ff]/35 cyberpunk:hover:bg-white/[0.08]"
                                    >
                                      <span className="min-w-0">
                                        <span className="block truncate text-xs font-medium text-zinc-200 dark:text-stone-800 cyberpunk:text-white/85">
                                          {video.title}
                                        </span>
                                        <span className="block truncate text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                                          {video.description}
                                        </span>
                                      </span>
                                      <span className="shrink-0 rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:border-stone-300 dark:text-stone-600 cyberpunk:border-white/10 cyberpunk:text-[#00e8ff]">
                                        {video.kind}
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}

                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Section>

          <Section
            title="Plano ate a prova"
            subtitle="Blocos objetivos para leitura tecnica, simulacao e prova."
          >
            <div ref={studyPlanRef}>
              {displayStudyPlan.completedPast.map((item) => (
                <StudyPlanItem
                  key={`${item.renderKey}-completed`}
                  theme={theme}
                  item={item}
                  isToday={false}
                  isPast={true}
                  checked={taskProgress[item.storageDate] || {}}
                  onToggleTask={toggleTask}
                />
              ))}

              {displayStudyPlan.overdue.length > 0 && (
                <div className="study-plan-card cyber-glass mb-6 rounded-2xl border border-red-500/45 bg-[linear-gradient(135deg,rgba(127,29,29,0.14),rgba(153,27,27,0.04))] p-4 shadow-[0_0_0_1px_rgba(239,68,68,0.1),0_22px_48px_rgba(127,29,29,0.14)] dark:border-red-400/70 dark:bg-[linear-gradient(135deg,rgba(255,245,245,0.98),rgba(255,241,242,0.96),rgba(254,226,226,0.92))] dark:shadow-[0_0_0_1px_rgba(248,113,113,0.18),0_22px_48px_rgba(239,68,68,0.16)] cyberpunk:border-[#ff3ea5]/60 cyberpunk:bg-[linear-gradient(135deg,rgba(64,6,29,0.9),rgba(127,29,29,0.3))] cyberpunk:shadow-[0_0_26px_rgba(255,62,165,0.24),0_0_60px_rgba(225,29,72,0.12)]">
                  <div className="study-plan-card-content">
                    <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full border border-red-700 bg-red-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-red-50 shadow-[0_0_0_1px_rgba(127,29,29,0.18)] dark:border-red-500/85 dark:bg-red-600 dark:text-white dark:shadow-[0_0_14px_rgba(239,68,68,0.28)] cyberpunk:border-[#ff3ea5] cyberpunk:bg-[#ff3ea5] cyberpunk:text-[#14040f] cyberpunk:shadow-[0_0_20px_rgba(255,62,165,0.55)]">
                        conteúdos atrasados
                      </span>
                      <span className="text-xs text-red-200 dark:text-red-700 cyberpunk:text-[#ff8dcb]">Estude nesta ordem</span>
                    </div>
                    <button
                      type="button"
                      data-magnetic
                      onClick={() => setIsOverdueCollapsed((current) => !current)}
                      className="inline-flex items-center gap-1.5 text-xs text-red-200 transition-colors hover:text-red-50 dark:text-red-700 dark:hover:text-red-800 cyberpunk:text-[#ff8dcb] cyberpunk:hover:text-[#ffd2ec]"
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
                            theme={theme}
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
                      <div className="text-xs text-red-200 dark:text-stone-600 cyberpunk:text-[#ff8dcb]">
                        {displayStudyPlan.overdue.length} conteúdo{displayStudyPlan.overdue.length > 1 ? 's' : ''} atrasado{displayStudyPlan.overdue.length > 1 ? 's' : ''}.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {displayStudyPlan.today.map((item) => (
                <StudyPlanItem
                  key={item.renderKey}
                  theme={theme}
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
                  theme={theme}
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
            subtitle="Resumo rapido com foco no modelo de cobranca da disciplina."
          >
            <div ref={modelSummariesRef}>
              <div className="mb-3 rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 py-2 text-xs leading-relaxed text-cyan-100 dark:border-cyan-500/35 dark:bg-cyan-500/10 dark:text-cyan-700 cyberpunk:border-[#00e8ff]/45 cyberpunk:bg-[#00e8ff]/12 cyberpunk:text-[#c9fbff]">
                {summaryNotice}
              </div>
              <SummaryAccordion summaries={modelSummaries} />
            </div>
          </Section>

          <Section
            title="O que cada prova cobrou"
            subtitle="Resumo das cobrancas de 2024 e 2023."
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
      <LevelUpModal level={12} title="Mestre do Ingles Instrumental" message="Voce dominou os topicos-chave para a prova de Eletiva I." />
    </>
  );
}




