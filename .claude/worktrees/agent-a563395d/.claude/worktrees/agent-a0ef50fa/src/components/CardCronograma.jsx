import { memo } from 'react';

function CardCronograma({ dateLabel, tasks = [], badgeMateria = 'IES' }) {
  return (
    <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_14px_30px_rgba(0,0,0,0.35)] hover:border-cyan-500/30 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-[#00e8ff]">
          {dateLabel}
        </span>
        <span className="px-2 py-1 rounded-md text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-[#ff3ea5]">
          {badgeMateria}
        </span>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-white/80">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00e8ff] shrink-0" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default memo(CardCronograma);
