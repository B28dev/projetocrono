import { useMemo, useState } from 'react';
import { useGsapStagger } from '../hooks/useGsapReveal';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import SubjectCard, { getSubjects } from '../components/SubjectCard';
import { getStudyPlanByShift, getStudyPlanTaskStorageKey } from '../data/arquitetura';

const STUDY_PLAN_STORAGE_KEY = 'arquitetura-study-plan-progress-v2';

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Dashboard({ shift = 'noturno-adele', examDate = new Date('2026-04-13T08:00:00'), userName = '' }) {
  const [taskProgress] = useState(() => {
    if (typeof window === 'undefined') return {};

    try {
      const stored = window.localStorage.getItem(STUDY_PLAN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const gridRef = useGsapStagger('.subject-card');
  const magneticRef = useGsapMagnetic('[data-magnetic]');
  const subjects = useMemo(() => getSubjects(shift), [shift]);
  const orderedSubjects = useMemo(() => {
    const priority = ['arquitetura', 'intro-eng-software'];
    return [...subjects].sort((a, b) => {
      const aIndex = priority.indexOf(a.id);
      const bIndex = priority.indexOf(b.id);
      const aPriority = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const bPriority = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return 0;
    });
  }, [subjects]);
  const studyPlan = useMemo(() => getStudyPlanByShift(shift), [shift]);

  const checklistStats = useMemo(() => {
    const totalTasks = studyPlan.reduce((acc, item) => acc + item.tasks.length, 0);
    const completedTasks = studyPlan.reduce((acc, item) => {
      const saved = taskProgress[getStudyPlanTaskStorageKey(shift, item)] || {};
      const doneInDay = item.tasks.reduce((dayAcc, _, index) => dayAcc + (saved[index] ? 1 : 0), 0);
      return acc + doneInDay;
    }, 0);

    const remainingTasks = Math.max(totalTasks - completedTasks, 0);
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const todayKey = getLocalDateKey();
    const todayPlans = studyPlan.filter((item) => item.date === todayKey);
    const todayTotal = todayPlans.reduce((acc, item) => acc + item.tasks.length, 0);
    const todayDone = todayPlans.reduce((acc, item) => {
      const saved = taskProgress[getStudyPlanTaskStorageKey(shift, item)] || {};
      const doneInDay = item.tasks.reduce((dayAcc, _, index) => dayAcc + (saved[index] ? 1 : 0), 0);
      return acc + doneInDay;
    }, 0);

    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const examDay = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate());
    const daysToExam = Math.max(Math.ceil((examDay - todayDate) / 86400000), 0);

    return {
      totalTasks,
      completedTasks,
      remainingTasks,
      progressPercent,
      todayDone,
      todayTotal,
      daysToExam,
    };
  }, [examDate, shift, studyPlan, taskProgress]);

  const introEngSoftwareMetrics = useMemo(() => {
    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const introExamDate = subjects.find((subject) => subject.id === 'intro-eng-software')?.examDate;
    const introExamDay = introExamDate
      ? new Date(introExamDate.getFullYear(), introExamDate.getMonth(), introExamDate.getDate())
      : todayDate;
    const daysToExam = Math.max(Math.ceil((introExamDay - todayDate) / 86400000), 0);

    return {
      todayDone: 0,
      todayTotal: 3,
      progressPercent: 0,
      daysToExam,
    };
  }, [subjects]);

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
            Arquitetura e Intro. Engenharia de Software ja estao disponiveis. As demais materias aparecem com contagem e serao liberadas em breve.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedSubjects.map((s) => (
            <div key={`${shift}-${s.id}`} className="subject-card">
              <SubjectCard
                subject={s}
                shift={shift}
                metrics={
                  s.id === 'arquitetura'
                    ? checklistStats
                    : s.id === 'intro-eng-software'
                    ? introEngSoftwareMetrics
                    : null
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
