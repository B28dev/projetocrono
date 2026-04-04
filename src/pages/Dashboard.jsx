import { useMemo, useState } from 'react';
import { useGsapStagger } from '../hooks/useGsapReveal';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import SubjectCard, { getSubjects } from '../components/SubjectCard';
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
import { isMainContent } from '../utils/studyPlanTasks';

const SUBJECT_STORAGE_KEYS = {
  arquitetura: 'arquitetura-study-plan-progress-v2',
  'intro-eng-software': 'engsoftware-study-plan-progress-v2',
  empreendedorismo: 'empreendedorismo-study-plan-progress-v2',
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

export default function Dashboard({ shift = 'noturno-adele', userName = '' }) {
  const [taskProgressBySubject] = useState(() =>
    Object.entries(SUBJECT_STORAGE_KEYS).reduce((acc, [subjectId, storageKey]) => {
      acc[subjectId] = loadTaskProgress(storageKey);
      return acc;
    }, {}),
  );

  const gridRef = useGsapStagger('.subject-card');
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const subjects = useMemo(() => getSubjects(shift), [shift]);
  const orderedSubjects = useMemo(() => {
    const priority = ['arquitetura', 'empreendedorismo', 'intro-eng-software'];
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
              Checklist geral
            </p>
            <p className="mt-0.5 text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:text-white">
              {checklistStats.completedTasks}/{checklistStats.totalTasks}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/65">
              faltam {checklistStats.remainingTasks} tarefas
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">Materias</h2>
          <p className="text-sm text-zinc-500 mt-0.5 dark:text-stone-600 cyberpunk:text-white/65">
            Arquitetura, Intro. Engenharia de Software e Empreendedorismo estao disponiveis com progresso ativo.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedSubjects.map((subject) => (
            <div key={`${shift}-${subject.id}`} className="subject-card">
              <SubjectCard
                subject={subject}
                shift={shift}
                metrics={subject.active ? metricsBySubject[subject.id] || null : null}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
