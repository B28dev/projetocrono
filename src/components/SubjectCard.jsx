import { useNavigate } from 'react-router-dom';
import { CountdownBadge } from './Countdown';
import ProgressBar from './ProgressBar';

const SUBJECT_BASE = [
  { id: 'arquitetura', name: 'Arquitetura de Computadores', short: 'ARQ', active: true, color: 'blue', progress: 35 },
  { id: 'matematica-discreta', name: 'Matematica Discreta', short: 'M.D', active: false, color: 'purple', progress: 0 },
  { id: 'algoritmos-programacao', name: 'Algoritmos e Programacao', short: 'ALG', active: false, color: 'amber', progress: 0 },
  { id: 'intro-eng-software', name: 'Intro. Engenharia de Software', short: 'IES', active: false, color: 'teal', progress: 0 },
  { id: 'eletiva-ingles', name: 'Eletiva I (Ingles)', short: 'ING', active: false, color: 'green', progress: 0 },
  { id: 'empreendedorismo', name: 'Empreendedorismo', short: 'EMP', active: false, color: 'rose', progress: 0 },
];

const SUBJECT_EXAM_DATES = {
  'noturno-adele': {
    arquitetura: '2026-04-13T08:00:00',
    'matematica-discreta': '2026-04-14T08:00:00',
    'algoritmos-programacao': '2026-04-09T08:00:00',
    'intro-eng-software': '2026-04-08T08:00:00',
    'eletiva-ingles': '2026-04-06T08:00:00',
    empreendedorismo: '2026-04-10T08:00:00',
  },
  'vespertino-snyder': {
    arquitetura: '2026-04-07T08:00:00',
    'matematica-discreta': '2026-04-14T08:00:00',
    'algoritmos-programacao': '2026-04-08T08:00:00',
    'intro-eng-software': '2026-04-13T08:00:00',
    'eletiva-ingles': '2026-04-06T08:00:00',
    empreendedorismo: '2026-04-10T08:00:00',
  },
};

function getSubjects(shift = 'noturno-adele') {
  const dates = SUBJECT_EXAM_DATES[shift] || SUBJECT_EXAM_DATES['noturno-adele'];

  return SUBJECT_BASE.map((subject) => ({
    ...subject,
    examDate: new Date(dates[subject.id]),
  }));
}

const colorMap = {
  blue: { badge: 'bg-blue-500/15 text-blue-400 ring-blue-500/30 cyberpunk:bg-[#00e8ff]/12 cyberpunk:text-[#00e8ff] cyberpunk:ring-[#00e8ff]/25' },
  purple: { badge: 'bg-purple-500/15 text-purple-400 ring-purple-500/30 cyberpunk:bg-fuchsia-500/10 cyberpunk:text-fuchsia-300 cyberpunk:ring-fuchsia-400/25' },
  green: { badge: 'bg-green-500/15 text-green-400 ring-green-500/30 cyberpunk:bg-emerald-500/10 cyberpunk:text-emerald-300 cyberpunk:ring-emerald-400/25' },
  amber: { badge: 'bg-amber-500/15 text-amber-400 ring-amber-500/30 cyberpunk:bg-amber-500/10 cyberpunk:text-amber-300 cyberpunk:ring-amber-400/25' },
  teal: { badge: 'bg-teal-500/15 text-teal-400 ring-teal-500/30 cyberpunk:bg-cyan-500/10 cyberpunk:text-cyan-300 cyberpunk:ring-cyan-400/25' },
  rose: { badge: 'bg-rose-500/15 text-rose-400 ring-rose-500/30 cyberpunk:bg-rose-500/10 cyberpunk:text-rose-300 cyberpunk:ring-rose-400/25' },
};

export default function SubjectCard({ subject, metrics = null, shift = 'noturno-adele' }) {
  const navigate = useNavigate();
  const { name, short, active, color, progress, examDate } = subject;
  const colors = colorMap[color] || colorMap.blue;
  const effectiveProgress = active && metrics ? metrics.progressPercent : progress;
  const countdownKey = `${shift}-${subject.id}-${examDate?.getTime?.() ?? examDate}`;

  const handleClick = () => {
    if (active) navigate(`/materia/${subject.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`cyber-glass relative group flex select-none flex-col gap-3 rounded-xl border p-5 backdrop-blur-md transition-colors duration-300 ${
        active
          ? 'cursor-pointer border-white/10 bg-white/5 hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/30 cyberpunk:hover:bg-white/10'
          : 'cursor-not-allowed border-zinc-800/60 bg-zinc-900/30 dark:border-stone-300 dark:bg-stone-100/80 cyberpunk:border-white/5 cyberpunk:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ring-1 ${colors.badge}`}>
          {short}
        </div>
        {active ? (
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-stone-900 dark:text-stone-100 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.05] cyberpunk:text-white/75">
            ativo
          </span>
        ) : (
          <span className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-stone-200 dark:text-stone-600 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.04] cyberpunk:text-white/55">
            em breve
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold leading-snug text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
          {name}
        </p>
        <div className="mt-1">
          <CountdownBadge key={countdownKey} target={examDate} />
        </div>
      </div>

      {active && (
        <div className="mt-auto">
          {metrics && (
            <div className="mb-3 rounded-lg border border-blue-500/25 bg-blue-500/8 px-2.5 py-2 dark:border-stone-300 dark:bg-white/80 cyberpunk:border-[#00e8ff]/25 cyberpunk:bg-[#00e8ff]/8">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-stone-600 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
                Ritmo atual
              </p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:text-white">
                Hoje {metrics.todayDone}/{metrics.todayTotal || 0}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/65">
                {metrics.progressPercent}% do plano + prova em {metrics.daysToExam} dia{metrics.daysToExam === 1 ? '' : 's'}
              </p>
            </div>
          )}

          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">Progresso</span>
            <span className="text-xs font-mono font-semibold text-zinc-300 dark:text-stone-800 cyberpunk:text-white">{effectiveProgress}%</span>
          </div>
          <ProgressBar value={effectiveProgress} color={color} />
        </div>
      )}
    </div>
  );
}

export { getSubjects };
