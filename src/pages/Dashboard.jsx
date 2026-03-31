import { useState } from 'react';
import { useGsapStagger } from '../hooks/useGsapReveal';
import SubjectCard, { SUBJECTS } from '../components/SubjectCard';
import MethodTooltip from '../components/MethodTooltip';

const TIME_OPTIONS = ['30 min', '1 hora', '2 horas'];
const METHOD_OPTIONS = [
  { value: 'pomodoro', label: 'Pomodoro' },
  { value: 'ciclo', label: 'Ciclo de Estudos' },
  { value: 'outro', label: 'Outro' },
];

export default function Dashboard() {
  const [studyTime, setStudyTime] = useState('1 hora');
  const [method, setMethod] = useState('pomodoro');

  const gridRef = useGsapStagger('.subject-card');

  return (
    <div className="min-h-screen pt-14 transition-colors duration-300 dark:bg-[#EAEAE5] dark:text-stone-900">
      <div className="border-b border-zinc-800 bg-surface-1 transition-colors duration-300 dark:border-stone-300 dark:bg-stone-50/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5 mr-auto">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-300 dark:bg-stone-900 dark:text-stone-50">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100 leading-none dark:text-stone-950">Ola, Aluno</p>
              <p className="text-xs text-zinc-500 mt-0.5 dark:text-stone-600">Engenharia de Software · 2026/1</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-500 whitespace-nowrap dark:text-stone-600">Tempo diario</label>
            <select
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
              className="text-xs bg-surface-3 border border-zinc-700 text-zinc-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500/60 cursor-pointer dark:border-stone-300 dark:bg-white dark:text-stone-800"
            >
              {TIME_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-500 whitespace-nowrap dark:text-stone-600">Metodo</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="text-xs bg-surface-3 border border-zinc-700 text-zinc-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500/60 cursor-pointer dark:border-stone-300 dark:bg-white dark:text-stone-800"
            >
              {METHOD_OPTIONS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="max-w-md">
          <MethodTooltip method={method} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-100 dark:text-stone-950">Materias</h2>
          <p className="text-sm text-zinc-500 mt-0.5 dark:text-stone-600">
            Apenas Arquitetura de Computadores esta disponivel nesta versao.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="subject-card">
              <SubjectCard subject={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
