import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  examCoverage,
  flashcardsBlocoA,
  getStudyPlanByShift,
  getStudyPlanTaskStorageKey,
  modelSummaries,
  questoesBlocoA,
  referencePlaylists,
  topicVideoSets,
  topics,
} from '../data/engenharia-software';
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

const STUDY_PLAN_STORAGE_KEY = 'engsoftware-study-plan-progress-v2';

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

const STUDY_CONTENT_TABS = [
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'questions', label: 'Banco de questoes' },
];

function FlipHintIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 5.25A4.75 4.75 0 0 1 7.75.5h2.1M13 10.75A4.75 4.75 0 0 1 8.25 15.5h-2.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M10.5 1.5 9 3l1.5 1.5M5.5 14.5 7 13l-1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Flashcard({ card, theme = 'dark' }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isCyber = theme === 'cyberpunk';

  const frontClass = isCyber
    ? 'border-[#ff3ea5]/60 bg-[linear-gradient(145deg,rgba(12,12,20,0.88),rgba(34,7,22,0.72))] text-white shadow-[0_0_24px_rgba(255,62,165,0.2)]'
    : 'border-stone-300 bg-stone-50 text-stone-900 shadow-md';
  const backClass = isCyber
    ? 'border-[#00e8ff]/60 bg-[linear-gradient(145deg,rgba(11,12,20,0.9),rgba(3,44,52,0.65))] text-white shadow-[0_0_24px_rgba(0,232,255,0.2)]'
    : 'border-stone-300 bg-stone-100 text-stone-900 shadow-md';
  const badgeClass = isCyber
    ? 'border-[#ff3ea5]/55 bg-[#ff3ea5]/14 text-[#ffc8e8]'
    : 'border-stone-400 bg-stone-200 text-stone-700';
  const hintClass = isCyber
    ? 'text-white/60 hover:text-[#00e8ff]'
    : 'text-stone-500 hover:text-stone-800';

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((current) => !current)}
      className="relative h-60 w-full text-left [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`Flashcard: ${card.frente}`}
    >
      <div
        className={`relative h-full w-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className={`absolute inset-0 flex h-full flex-col rounded-xl border p-4 [backface-visibility:hidden] ${frontClass}`}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${badgeClass}`}>
              {card.categoria || 'Flashcard'}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-stone-600 cyberpunk:text-white/55">
              frente
            </span>
          </div>
          <p className="line-clamp-6 text-sm leading-relaxed text-zinc-200 dark:text-stone-900 cyberpunk:text-white/90">
            {card.frente}
          </p>
          <div className={`mt-auto inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors ${hintClass}`}>
            <FlipHintIcon />
            Clique para ver a resposta
          </div>
        </div>

        <div className={`absolute inset-0 flex h-full flex-col rounded-xl border p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] ${backClass}`}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/12 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-200 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-700 cyberpunk:border-emerald-300/45 cyberpunk:bg-emerald-300/14 cyberpunk:text-emerald-200">
              resolucao
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-stone-600 cyberpunk:text-white/55">
              verso
            </span>
          </div>
          <p className="line-clamp-8 text-sm leading-relaxed text-zinc-300 dark:text-stone-800 cyberpunk:text-white/85">
            {card.verso}
          </p>
          <div className={`mt-auto inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors ${hintClass}`}>
            <FlipHintIcon />
            Clique para voltar
          </div>
        </div>
      </div>
    </button>
  );
}

const QUESTION_BADGE_STYLES = {
  Fixacao: {
    cyber: 'border-emerald-400/45 bg-emerald-400/12 text-emerald-200',
    clean: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  },
  Comparacao: {
    cyber: 'border-cyan-400/45 bg-cyan-400/12 text-cyan-200',
    clean: 'border-sky-300 bg-sky-50 text-sky-700',
  },
  Situacional: {
    cyber: 'border-orange-400/45 bg-orange-400/12 text-orange-200',
    clean: 'border-amber-300 bg-amber-50 text-amber-700',
  },
};

function QuestionAccordionItem({ item, isOpen, onToggle, theme = 'dark' }) {
  const isCyber = theme === 'cyberpunk';
  const badgeStyle = QUESTION_BADGE_STYLES[item.tipo] || QUESTION_BADGE_STYLES.Fixacao;

  const containerClass = isCyber
    ? isOpen
      ? 'border-cyan-500/80 bg-white/[0.06] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
      : 'border-cyan-500/20 bg-[#080f1b]/80'
    : 'border-stone-300 bg-white shadow-sm';

  const questionTextClass = isCyber ? 'text-white/90' : 'text-stone-900';
  const answerTextClass = isCyber ? 'text-white/75' : 'text-stone-700';
  const answerSurfaceClass = isCyber
    ? 'border-t border-cyan-500/25 bg-white/[0.03]'
    : 'border-t border-stone-200 bg-stone-50';
  const iconClass = isCyber ? 'text-cyan-300' : 'text-stone-500';

  return (
    <div className={`overflow-hidden rounded-xl border transition-all duration-300 ${containerClass}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-sm font-semibold leading-relaxed ${questionTextClass}`}>{item.pergunta}</span>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                isCyber ? badgeStyle.cyber : badgeStyle.clean
              }`}
            >
              {item.tipo}
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-stone-600 cyberpunk:text-white/50">
            {item.categoria}
          </p>
        </div>

        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${iconClass} ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className={`whitespace-pre-line px-4 py-3 text-sm leading-relaxed ${answerSurfaceClass} ${answerTextClass}`}>
            {item.resposta}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EngenhariaSoftwarePage({
  theme = 'dark',
  shift = 'noturno-adele',
  shiftLabel = 'Noturno (Adele)',
}) {
  const navigate = useNavigate();
  const headerRef = useGsapReveal();
  const topicsRef = useGsapStagger('.topic-chip-content', { stagger: 0.08, delay: 0.15 });
  const playlistsRef = useGsapStagger('.playlist-card', { stagger: 0.08, delay: 0.15 });
  const studyPlanRef = useGsapStagger('.study-plan-card-content', { stagger: 0.1, delay: 0.2 });
  const modelSummariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const summariesRef = useGsapStagger('.summary-item', { stagger: 0.08, delay: 0.2 });
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const actualExamDate = useMemo(() => {
    return shift.includes('noturno')
      ? new Date('2026-04-08T08:00:00')
      : new Date('2026-04-13T08:00:00');
  }, [shift]);
  const examDateString = shift.includes('noturno') ? '08/04/2026' : '13/04/2026';
  const [isOverdueCollapsed, setIsOverdueCollapsed] = useState(false);
  const [isTopicVideosCollapsed, setIsTopicVideosCollapsed] = useState(true);
  const [isBlocoAOpen, setIsBlocoAOpen] = useState(true);
  const [activeStudyContentTab, setActiveStudyContentTab] = useState('flashcards');
  const [visibleCount, setVisibleCount] = useState(6);
  const [openQuestionIds, setOpenQuestionIds] = useState({});
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
  const isCyber = theme === 'cyberpunk';
  const visibleFlashcards = flashcardsBlocoA.slice(0, visibleCount);
  const visibleQuestions = questoesBlocoA.slice(0, visibleCount);
  const currentTotalCount = activeStudyContentTab === 'flashcards' ? flashcardsBlocoA.length : questoesBlocoA.length;
  const hasMoreToShow = visibleCount < currentTotalCount;

  const handleChangeStudyTab = (tabId) => {
    setActiveStudyContentTab(tabId);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + 4);
  };

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
                    IES
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                    Engenharia de Software - 2026/1 - {shiftLabel}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-zinc-100 tracking-tight dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">
                  Intro. Engenharia de Software
                </h1>
                <p className="text-sm text-zinc-500 mt-1 dark:text-stone-600 cyberpunk:text-white/65">
                  Prova em <span className="text-amber-400 font-semibold dark:text-amber-600 cyberpunk:text-[#ff3ea5]">{examDateString}</span>
                </p>
              </div>

              <div className="cyber-glass w-full max-w-[18rem] rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-colors duration-300 dark:border-stone-300 dark:bg-stone-100/50 dark:shadow-sm hover:border-[#00e8ff]/30 hover:bg-white/10 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 dark:text-stone-500 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">Proxima prova em</p>
                <CountdownFull target={actualExamDate} />
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
                    <span className="text-sm font-bold text-teal-400 dark:text-teal-700 cyberpunk:text-[#00e8ff]">
                      {progress}%
                    </span>
                  </div>
                  <ProgressBar value={progress} color="teal" className="h-2 border border-white/5 bg-white/5 dark:bg-stone-200 cyberpunk:bg-white/10" />
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
            subtitle="Playlists completas e videos por topico no mesmo painel."
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

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsTopicVideosCollapsed((current) => !current)}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs font-medium uppercase tracking-widest text-zinc-500 shadow-[0_0_12px_rgba(0,232,255,0.08)] transition-colors hover:text-zinc-300 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:font-mono cyberpunk:text-[#00e8ff] cyberpunk:hover:text-[#00e8ff]"
              >
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${isTopicVideosCollapsed ? 'rotate-0' : 'rotate-90'}`}
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Videos por topico
              </button>

              {!isTopicVideosCollapsed && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {topicVideoSets.map((set) => (
                    <div
                      key={set.id}
                      className="playlist-card cyber-glass rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 transition-colors hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10"
                    >
                      <p className="text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
                        {set.title}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/62">
                        {set.description}
                      </p>

                      <div className="mt-3 space-y-2">
                        {set.videos.map((video, index) => (
                          <a
                            key={`${set.id}-${index}`}
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-2 rounded-lg border border-zinc-700/60 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-[#00e8ff]/30 hover:text-zinc-100 dark:border-stone-300 dark:bg-stone-50 dark:text-stone-700 dark:hover:border-stone-400 dark:hover:text-stone-900 cyberpunk:border-white/10 cyberpunk:bg-white/[0.03] cyberpunk:text-white/75 cyberpunk:hover:border-[#00e8ff]/35 cyberpunk:hover:text-white"
                          >
                            <span className="truncate">{video.title}</span>
                            <span className="shrink-0 rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:border-stone-300 dark:text-stone-600 cyberpunk:border-white/10 cyberpunk:text-[#00e8ff]">
                              video
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                        conteudos atrasados
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
                        {displayStudyPlan.overdue.length} conteudo{displayStudyPlan.overdue.length > 1 ? 's' : ''} atrasado{displayStudyPlan.overdue.length > 1 ? 's' : ''}.
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

          <Section
            title="Banco de questoes e flashcards"
            subtitle="Estudo ativo com cards de revisao e trilha de questoes comentadas."
          >
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-500/35 bg-amber-500/12 px-4 py-3 text-xs leading-relaxed text-amber-100 dark:border-amber-500/40 dark:bg-amber-500/12 dark:text-amber-800 cyberpunk:border-[#ffb347]/45 cyberpunk:bg-[#ffb347]/12 cyberpunk:text-[#ffe8bf]">
                <p>
                  Atenção: Estas perguntas e flashcards foram gerados por Inteligência Artificial com base nos PDFs das aulas para auxiliar no estudo ativo. O professor NÃO tem envolvimento com este material e não há garantia de que estas exatas questões cairão na prova. Use como base de raciocínio, não como gabarito oficial.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-zinc-300 dark:border-stone-300 dark:bg-stone-100/70 dark:text-stone-700 cyberpunk:border-white/10 cyberpunk:bg-white/[0.05] cyberpunk:text-white/72">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-stone-600 cyberpunk:text-[#9cf8ff]">
                  Mapa de Estudos
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 dark:bg-cyan-600 cyberpunk:bg-[#00e8ff]" />
                    <span>
                      <strong>Bloco A (Prioridade Máxima):</strong> Ágil, modelos de processo e requisitos. (Foco principal das provas).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 dark:bg-amber-600 cyberpunk:bg-[#ffb347]" />
                    <span>
                      <strong>Bloco B (Apoio Forte):</strong> Processo de software, análise, projeto, V&amp;V e manutenção. (Base para dissertações).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 dark:bg-rose-600 cyberpunk:bg-[#ff3ea5]" />
                    <span>
                      <strong>Bloco C (Base Conceitual):</strong> Definição de software, características e mitos.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isCyber
                    ? isBlocoAOpen
                      ? 'border-cyan-500/55 bg-white/[0.05] shadow-[0_0_22px_rgba(6,182,212,0.24)]'
                      : 'border-cyan-500/25 bg-[#070d18]/85'
                    : 'border-stone-300 bg-white shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsBlocoAOpen((current) => !current)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
                      BLOCO A — Prioridade Máxima
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                      Ágil, modelos de processo e requisitos
                    </p>
                  </div>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isCyber ? 'text-cyan-300' : 'text-stone-500'
                    } ${isBlocoAOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className={`grid transition-all duration-300 ${isBlocoAOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className={`space-y-4 border-t px-4 py-4 ${isCyber ? 'border-cyan-500/25 bg-white/[0.02]' : 'border-stone-200 bg-stone-50/70'}`}>
                      <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-1 dark:border-stone-300 dark:bg-stone-100/70 cyberpunk:border-white/10 cyberpunk:bg-white/[0.05]">
                        {STUDY_CONTENT_TABS.map((tab) => {
                          const isActive = activeStudyContentTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => handleChangeStudyTab(tab.id)}
                              className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                                isActive
                                  ? 'bg-cyan-500/20 text-cyan-200 dark:bg-stone-900 dark:text-stone-100 cyberpunk:bg-[#00e8ff]/20 cyberpunk:text-[#9cf8ff]'
                                  : 'text-zinc-500 hover:text-zinc-200 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/65 cyberpunk:hover:text-white'
                              }`}
                            >
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>

                      {activeStudyContentTab === 'flashcards' ? (
                        <div>
                          <p className="mb-3 text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                            Bloco A ({flashcardsBlocoA.length} flashcards) - clique no card para virar.
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {visibleFlashcards.map((card) => (
                              <Flashcard key={card.id} card={card} theme={theme} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">
                            Bloco A ({questoesBlocoA.length} perguntas) - clique no enunciado para expandir a resposta.
                          </p>
                          <div className="space-y-2">
                            {visibleQuestions.map((item) => (
                              <QuestionAccordionItem
                                key={item.id}
                                item={item}
                                isOpen={Boolean(openQuestionIds[item.id])}
                                onToggle={() =>
                                  setOpenQuestionIds((current) => ({
                                    ...current,
                                    [item.id]: !current[item.id],
                                  }))
                                }
                                theme={theme}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {hasMoreToShow && (
                        <div className="flex justify-center pt-1">
                          <button
                            type="button"
                            onClick={handleLoadMore}
                            className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-700 dark:hover:bg-stone-100 dark:hover:text-stone-900 cyberpunk:border-cyan-400/35 cyberpunk:bg-cyan-400/10 cyberpunk:text-[#9cf8ff] cyberpunk:hover:border-cyan-300/60 cyberpunk:hover:text-white"
                          >
                            Carregar mais (+)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
      <LevelUpModal level={12} title="Mestre em Engenharia de Software" message="Voce dominou todos os topicos desta fase. Continue avancando." />
    </>
  );
}

