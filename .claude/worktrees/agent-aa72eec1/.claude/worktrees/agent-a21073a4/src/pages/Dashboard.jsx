import { useMemo, useState } from 'react';
import { useGsapStagger } from '../hooks/useGsapReveal';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import SubjectCard from '../components/SubjectCard';
import { DASHBOARD_PERIODS, getDashboardP2Override, getDashboardPeriod } from '../data/dashboardPeriods';
import { getSubjects } from '../data/dashboardSubjects';
import {
  getStudyPlanByShift as getArquiteturaStudyPlanByShift,
  getStudyPlanTaskStorageKey as getArquiteturaStudyPlanTaskStorageKey,
} from '../data/arquitetura';
import {
  getStudyPlanByShift as getEngSoftwareStudyPlanByShift,
  getStudyPlanTaskStorageKey as getEngSoftwareStudyPlanTaskStorageKey,
} from '../data/engenharia-software';
import {
  getStudyPlanByShift as getEmpreendedorismoStudyPlanByShift,
  getStudyPlanTaskStorageKey as getEmpreendedorismoStudyPlanTaskStorageKey,
} from '../data/empreendedorismo';
import {
  getStudyPlanByShift as getInglesStudyPlanByShift,
  getStudyPlanTaskStorageKey as getInglesStudyPlanTaskStorageKey,
} from '../data/ingles';
import { isMainContent } from '../utils/studyPlanTasks';

const SUBJECT_STORAGE_KEYS = {
  arquitetura: 'arquitetura-study-plan-progress-v2',
  'intro-eng-software': 'engsoftware-study-plan-progress-v2',
  empreendedorismo: 'empreendedorismo-study-plan-progress-v2',
  'eletiva-ingles': 'ingles-study-plan-progress-v2',
};

const SUBJECT_PLAN_ADAPTERS = {
  arquitetura: {
    getStudyPlanByShift: getArquiteturaStudyPlanByShift,
    getStudyPlanTaskStorageKey: getArquiteturaStudyPlanTaskStorageKey,
  },
  'intro-eng-software': {
    getStudyPlanByShift: getEngSoftwareStudyPlanByShift,
    getStudyPlanTaskStorageKey: getEngSoftwareStudyPlanTaskStorageKey,
  },
  empreendedorismo: {
    getStudyPlanByShift: getEmpreendedorismoStudyPlanByShift,
    getStudyPlanTaskStorageKey: getEmpreendedorismoStudyPlanTaskStorageKey,
  },
  'eletiva-ingles': {
    getStudyPlanByShift: getInglesStudyPlanByShift,
    getStudyPlanTaskStorageKey: getInglesStudyPlanTaskStorageKey,
  },
};

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadTaskProgress(storageKey) {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getDaysToExam(examDate) {
  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const examDay = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate());
  return Math.max(Math.ceil((examDay - todayDate) / 86400000), 0);
}

function getMainTaskIndexes(tasks = []) {
  return tasks.reduce((indexes, task, taskIndex) => {
    if (isMainContent(task)) {
      indexes.push(taskIndex);
    }

    return indexes;
  }, []);
}

function PeriodSwitcher({ activePeriod, onChange }) {
  return (
    <div className="cyber-glass inline-flex w-full max-w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors duration-300 sm:w-auto sm:flex-row sm:items-center dark:border-stone-300 dark:bg-stone-100/70 dark:shadow-[0_10px_24px_rgba(15,23,42,0.08)] cyberpunk:border-white/10 cyberpunk:bg-white/[0.05]">
      {DASHBOARD_PERIODS.map((period) => {
        const isActive = activePeriod === period.id;

        return (
          <button
            key={period.id}
            type="button"
            onClick={() => onChange(period.id)}
            aria-pressed={isActive}
            className={`relative inline-flex min-h-11 flex-1 items-center justify-between gap-3 overflow-hidden rounded-xl border px-3 py-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 sm:min-w-[180px] ${
              isActive
                ? 'border-cyan-400/35 bg-white/12 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_24px_rgba(0,0,0,0.18)] dark:border-stone-300 dark:bg-white dark:text-stone-900 cyberpunk:border-[#00e8ff]/35 cyberpunk:bg-[linear-gradient(135deg,rgba(0,232,255,0.16),rgba(255,62,165,0.12))]'
                : 'border-white/10 bg-transparent text-white/72 hover:border-white/20 hover:bg-white/[0.04] dark:border-stone-300 dark:text-stone-700 dark:hover:bg-white/80 cyberpunk:text-white/65 cyberpunk:hover:border-[#ff3ea5]/20 cyberpunk:hover:bg-white/[0.04]'
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.22em]">
                {period.ctaLabel}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] normal-case tracking-normal text-zinc-400 dark:text-stone-500 cyberpunk:text-white/55">
                {period.description}
              </p>
            </div>
            <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${
              isActive
                ? 'border-cyan-400/30 bg-cyan-400/12 text-cyan-200 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 cyberpunk:border-[#00e8ff]/35 cyberpunk:bg-[#00e8ff]/10 cyberpunk:text-[#9cf8ff]'
                : 'border-white/10 bg-white/[0.03] text-white/45 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-500 cyberpunk:border-white/10 cyberpunk:text-white/45'
            }`}>
              {period.label}
            </span>
            {isActive ? (
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent dark:via-stone-300 cyberpunk:via-[#00e8ff]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default function Dashboard({ shift = 'noturno-adele', userName = '' }) {
  const [taskProgressBySubject] = useState(() =>
    Object.entries(SUBJECT_STORAGE_KEYS).reduce((acc, [subjectId, storageKey]) => {
      acc[subjectId] = loadTaskProgress(storageKey);
      return acc;
    }, {}),
  );
  const [activePeriod, setActivePeriod] = useState('p2');

  const gridRef = useGsapStagger('.subject-card', { stagger: 0.08, delay: 0.1 });
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const subjects = useMemo(() => getSubjects(shift), [shift]);
  const activePeriodMeta = useMemo(() => getDashboardPeriod(activePeriod), [activePeriod]);
  const orderedSubjects = useMemo(() => {
    const priority = ['arquitetura', 'empreendedorismo', 'eletiva-ingles', 'intro-eng-software'];
    return [...subjects].sort((a, b) => {
      const aIndex = priority.indexOf(a.id);
      const bIndex = priority.indexOf(b.id);
      const aPriority = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const bPriority = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return 0;
    });
  }, [subjects]);

  const metricsBySubject = useMemo(() => {
    const todayKey = getLocalDateKey();

    return Object.entries(SUBJECT_PLAN_ADAPTERS).reduce((acc, [subjectId, adapter]) => {
      const subject = subjects.find((item) => item.id === subjectId);
      if (!subject) return acc;

      const studyPlan = adapter.getStudyPlanByShift(shift);
      const taskProgress = taskProgressBySubject[subjectId] || {};
      const preparedDays = studyPlan.map((item) => ({
        ...item,
        mainTaskIndexes: getMainTaskIndexes(item.tasks),
      }));

      const totalTasks = preparedDays.reduce((sum, item) => sum + item.mainTaskIndexes.length, 0);
      const completedTasks = preparedDays.reduce((sum, item) => {
        const saved = taskProgress[adapter.getStudyPlanTaskStorageKey(shift, item)] || {};
        const doneCount = item.mainTaskIndexes.reduce(
          (daySum, taskIndex) => daySum + (saved[taskIndex] ? 1 : 0),
          0,
        );
        return sum + doneCount;
      }, 0);

      const todayPlans = preparedDays.filter((item) => item.date === todayKey);
      const todayTotal = todayPlans.reduce((sum, item) => sum + item.mainTaskIndexes.length, 0);
      const todayDone = todayPlans.reduce((sum, item) => {
        const saved = taskProgress[adapter.getStudyPlanTaskStorageKey(shift, item)] || {};
        const doneCount = item.mainTaskIndexes.reduce(
          (daySum, taskIndex) => daySum + (saved[taskIndex] ? 1 : 0),
          0,
        );
        return sum + doneCount;
      }, 0);

      acc[subjectId] = {
        totalTasks,
        completedTasks,
        remainingTasks: Math.max(totalTasks - completedTasks, 0),
        progressPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        todayDone,
        todayTotal,
        daysToExam: getDaysToExam(subject.examDate),
      };

      return acc;
    }, {});
  }, [shift, subjects, taskProgressBySubject]);

  const checklistStats = useMemo(() => {
    const activeMetrics = orderedSubjects
      .filter((subject) => subject.active)
      .map((subject) => metricsBySubject[subject.id])
      .filter(Boolean);

    if (activeMetrics.length === 0) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        remainingTasks: 0,
        progressPercent: 0,
        todayDone: 0,
        todayTotal: 0,
        daysToExam: 0,
      };
    }

    const totalTasks = activeMetrics.reduce((sum, metric) => sum + metric.totalTasks, 0);
    const completedTasks = activeMetrics.reduce((sum, metric) => sum + metric.completedTasks, 0);
    const todayDone = activeMetrics.reduce((sum, metric) => sum + metric.todayDone, 0);
    const todayTotal = activeMetrics.reduce((sum, metric) => sum + metric.todayTotal, 0);
    const daysToExam = Math.min(...activeMetrics.map((metric) => metric.daysToExam));

    return {
      totalTasks,
      completedTasks,
      remainingTasks: Math.max(totalTasks - completedTasks, 0),
      progressPercent: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      todayDone,
      todayTotal,
      daysToExam,
    };
  }, [orderedSubjects, metricsBySubject]);

  const displaySubjects = useMemo(() => {
    if (activePeriod === 'p1') return orderedSubjects;

    return orderedSubjects.map((subject) => {
      const override = getDashboardP2Override(subject.id);
      return {
        ...subject,
        active: true,
        status: override.status,
        helperText: override.helperText,
        disableNavigation: true,
        isPlaceholder: true,
      };
    });
  }, [activePeriod, orderedSubjects]);

  const isP2Active = activePeriod === 'p2';
  const summaryText = isP2Active
    ? 'P2 priorizada no Hub. As matérias já estão preparadas em modo placeholder até a liberação do conteúdo real.'
    : 'Acesso manual à base atual da P1, preservando exatamente a estrutura e o progresso já existentes.';
  const sectionDescription = isP2Active
    ? activePeriodMeta.description
    : 'Arquitetura, Intro. Engenharia de Software e Empreendedorismo seguem com progresso ativo. Eletiva I (Inglês) permanece finalizada.';
  const checklistCardTitle = isP2Active ? 'Status da liberação' : 'Checklist geral';
  const checklistCardBody = isP2Active
    ? `${displaySubjects.length} matérias prontas para receber a P2`
    : `${checklistStats.completedTasks}/${checklistStats.totalTasks}`;
  const checklistCardFoot = isP2Active
    ? 'Hub em modo de espera tática'
    : `faltam ${checklistStats.remainingTasks} tarefas`;
  const periodContainerClass = isP2Active ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0';

  return (
    <div ref={magneticRef} className="cyber-shell min-h-screen transition-colors duration-300 dark:bg-[#EAEAE5] dark:text-stone-900">
      <div className="cyber-glass border-b border-zinc-800 bg-surface-1 transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/80 cyberpunk:border-white/10 cyberpunk:bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-2 mr-auto">
            <p className="text-base md:text-lg font-semibold text-zinc-100 leading-none dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">
              {'Eai '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
                {userName || 'Aluno'}
              </span>
              {', Vamos L\u00E1?'}
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10 rounded-full px-3 py-1 tracking-wide uppercase dark:text-blue-700 dark:bg-blue-500/10 cyberpunk:border-white/10 cyberpunk:bg-white/[0.04] cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse cyberpunk:bg-[#ff3ea5]" />
              Engenharia de Software {'\u00B7'} 2026/1
            </span>
          </div>

          <div className="cyber-glass rounded-xl border border-white/10 bg-white/5 px-3 py-2 dark:border-stone-300 dark:bg-stone-100/60 cyberpunk:border-white/10 cyberpunk:bg-white/[0.05]">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-stone-600 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
              {checklistCardTitle}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:text-white">
              {checklistCardBody}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/65">
              {checklistCardFoot}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">Hub de matérias</h2>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-stone-600 cyberpunk:text-white/65">
                {sectionDescription}
              </p>
            </div>
            <PeriodSwitcher activePeriod={activePeriod} onChange={setActivePeriod} />
          </div>

          <div className="cyber-glass rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition-colors duration-300 dark:border-stone-300 dark:bg-stone-100/70 cyberpunk:border-white/10 cyberpunk:bg-white/[0.05]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-stone-500 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
                  {activePeriodMeta.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:text-white">
                  {isP2Active ? 'P2 como visão padrão do Hub' : 'P1 acessível sob demanda'}
                </p>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                isP2Active
                  ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 cyberpunk:border-[#00e8ff]/35 cyberpunk:bg-[#00e8ff]/10 cyberpunk:text-[#9cf8ff]'
                  : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200 dark:border-emerald-300 dark:bg-emerald-100 dark:text-emerald-700 cyberpunk:border-emerald-300/30 cyberpunk:bg-emerald-300/10 cyberpunk:text-emerald-200'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isP2Active ? 'bg-cyan-400 dark:bg-stone-400 cyberpunk:bg-[#00e8ff]' : 'bg-emerald-400 dark:bg-emerald-500 cyberpunk:bg-emerald-300'}`} />
                {isP2Active ? 'Fila de liberação' : 'Base ativa'}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 dark:text-stone-600 cyberpunk:text-white/65">
              {summaryText}
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 gap-4 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3 ${periodContainerClass}`}
        >
          {displaySubjects.map((subject) => (
            <div key={`${activePeriod}-${shift}-${subject.id}`} className="subject-card">
              <SubjectCard
                subject={subject}
                shift={shift}
                metrics={activePeriod === 'p1' && subject.active ? metricsBySubject[subject.id] || null : null}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
