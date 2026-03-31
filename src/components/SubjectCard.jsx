import { useNavigate } from 'react-router-dom';
import { CountdownBadge } from './Countdown';
import ProgressBar from './ProgressBar';

const SUBJECTS = [
  { id: 'arquitetura', name: 'Arquitetura de Computadores', short: 'ARQ', active: true, color: 'blue', progress: 35 },
  { id: 'calculo', name: 'Cálculo I', short: 'MAT', active: false, color: 'purple', progress: 0 },
  { id: 'fisica', name: 'Física Aplicada', short: 'FIS', active: false, color: 'green', progress: 0 },
  { id: 'prog', name: 'Programação II', short: 'POO', active: false, color: 'amber', progress: 0 },
  { id: 'redes', name: 'Redes de Computadores', short: 'NET', active: false, color: 'teal', progress: 0 },
  { id: 'so', name: 'Sistemas Operacionais', short: 'S.O', active: false, color: 'rose', progress: 0 },
];

const colorMap = {
  blue: { badge: 'bg-blue-500/15 text-blue-400 ring-blue-500/30 cyberpunk:bg-[#00e8ff]/12 cyberpunk:text-[#00e8ff] cyberpunk:ring-[#00e8ff]/25' },
  purple: { badge: 'bg-purple-500/15 text-purple-400 ring-purple-500/30 cyberpunk:bg-fuchsia-500/10 cyberpunk:text-fuchsia-300 cyberpunk:ring-fuchsia-400/25' },
  green: { badge: 'bg-green-500/15 text-green-400 ring-green-500/30 cyberpunk:bg-emerald-500/10 cyberpunk:text-emerald-300 cyberpunk:ring-emerald-400/25' },
  amber: { badge: 'bg-amber-500/15 text-amber-400 ring-amber-500/30 cyberpunk:bg-amber-500/10 cyberpunk:text-amber-300 cyberpunk:ring-amber-400/25' },
  teal: { badge: 'bg-teal-500/15 text-teal-400 ring-teal-500/30 cyberpunk:bg-cyan-500/10 cyberpunk:text-cyan-300 cyberpunk:ring-cyan-400/25' },
  rose: { badge: 'bg-rose-500/15 text-rose-400 ring-rose-500/30 cyberpunk:bg-rose-500/10 cyberpunk:text-rose-300 cyberpunk:ring-rose-400/25' },
};

export default function SubjectCard({ subject }) {
  const navigate = useNavigate();
  const { name, short, active, color, progress } = subject;
  const colors = colorMap[color] || colorMap.blue;

  const handleClick = () => {
    if (active) navigate(`/materia/${subject.id}`);
  };

  return (
    <div
      onClick={handleClick}
      data-magnetic
      className={`cyber-glass relative group rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200 select-none ${
        active
          ? 'border-zinc-700 bg-surface-2 hover:border-zinc-600 hover:bg-surface-3 cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 dark:border-stone-300 dark:bg-white/80 dark:hover:border-stone-400 dark:hover:bg-white dark:hover:shadow-black/5 cyberpunk:border-white/10 cyberpunk:bg-transparent cyberpunk:hover:border-[#00e8ff]/25 cyberpunk:hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
          : 'border-zinc-800 bg-surface-1 opacity-40 cursor-not-allowed dark:border-stone-300 dark:bg-stone-100 cyberpunk:border-white/10 cyberpunk:bg-transparent'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ring-1 ${colors.badge}`}>
          {short}
        </div>
        {active && (
          <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800 rounded-full px-2 py-0.5 dark:bg-stone-900 dark:text-stone-100 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.05] cyberpunk:text-white/75">
            ativo
          </span>
        )}
        {!active && (
          <span className="text-[10px] font-medium text-zinc-600 bg-zinc-800/50 rounded-full px-2 py-0.5 dark:bg-stone-200 dark:text-stone-600 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.04] cyberpunk:text-white/55">
            em breve
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-zinc-100 leading-snug dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">{name}</p>
        {active && (
          <div className="mt-1">
            <CountdownBadge />
          </div>
        )}
      </div>

      {active && (
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-zinc-500 dark:text-stone-600 cyberpunk:text-white/60">Progresso</span>
            <span className="text-[11px] font-semibold text-zinc-300 dark:text-stone-800 cyberpunk:text-white">{progress}%</span>
          </div>
          <ProgressBar value={progress} color={color} />
        </div>
      )}
    </div>
  );
}

export { SUBJECTS };
