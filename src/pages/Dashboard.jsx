import { useMemo, useState } from 'react';
import { useGsapStagger } from '../hooks/useGsapReveal';
import { useGsapMagnetic } from '../hooks/useGsapMagnetic';
import SubjectCard, { SUBJECTS } from '../components/SubjectCard';
import { examDate, studyPlan } from '../data/arquitetura';

const STUDY_PLAN_STORAGE_KEY = 'arquitetura-study-plan-progress-v2';

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Dashboard() {
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

  const checklistStats = useMemo(() => {
    const totalTasks = studyPlan.reduce((acc, item) => acc + item.tasks.length, 0);
    const completedTasks = studyPlan.reduce((acc, item) => {
      const saved = taskProgress[item.date] || {};
      const doneInDay = item.tasks.reduce((dayAcc, _, index) => dayAcc + (saved[index] ? 1 : 0), 0);
      return acc + doneInDay;
    }, 0);

    const remainingTasks = Math.max(totalTasks - completedTasks, 0);
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const todayKey = getLocalDateKey();
    const todayPlan = studyPlan.find((item) => item.date === todayKey);
    const todayTotal = todayPlan?.tasks.length || 0;
    const todayDone = todayPlan
      ? todayPlan.tasks.reduce((acc, _, index) => acc + ((taskProgress[todayKey] || {})[index] ? 1 : 0), 0)
      : 0;

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
  }, [taskProgress]);

  return (
    <div ref={magneticRef} className="cyber-shell min-h-screen pt-14 transition-colors duration-300 dark:bg-[#EAEAE5] dark:text-stone-900">
      <div className="cyber-glass border-b border-zinc-800 bg-surface-1 transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/80 cyberpunk:border-white/10 cyberpunk:bg-transparent">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5 mr-auto">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-300 dark:bg-stone-900 dark:text-stone-50 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-[linear-gradient(135deg,rgba(0,232,255,0.16),rgba(255,62,165,0.2))]">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100 leading-none dark:text-stone-950 cyberpunk:font-display cyberpunk:text-white">Ola, Aluno</p>
              <p className="text-xs text-zinc-500 mt-0.5 dark:text-stone-600 cyberpunk:text-white/65">Engenharia de Software · 2026/1</p>
            </div>
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
            Arquitetura ja esta disponivel. As demais materias aparecem com contagem e serao liberadas em breve.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="subject-card">
              <SubjectCard subject={s} metrics={s.id === 'arquitetura' ? checklistStats : null} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
