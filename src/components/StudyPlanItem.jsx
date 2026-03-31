import { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export default function StudyPlanItem({ item, isToday, isPast, checked = {}, onToggleTask }) {
  const [videosOpen, setVideosOpen] = useState(false);

  const toggle = (i) => onToggleTask?.(item.storageDate || item.date, i);
  const allDone = item.tasks.length > 0 && item.tasks.every((_, i) => checked[i]);

  const borderColor = item.isExamDay
    ? 'border-amber-500/60'
    : isToday
    ? 'border-blue-500/60'
    : isPast
    ? 'border-zinc-800'
    : 'border-zinc-700/50';

  return (
    <div className={`study-plan-card relative pl-8 pb-8 last:pb-0`}>
      {/* Timeline line */}
      <div className="absolute left-2.5 top-3 bottom-0 w-px bg-zinc-800 dark:bg-stone-300 last:hidden" />

      {/* Timeline dot */}
      <div className={`absolute left-0 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${item.isExamDay ? 'border-amber-500 bg-amber-500/20' : isToday ? 'border-blue-500 bg-blue-500/20' : isPast ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-600 bg-zinc-900'}`}>
        {allDone && <span className="w-2 h-2 rounded-full bg-green-500" />}
      </div>

      {/* Card */}
      <div className={`rounded-xl border bg-surface-2 p-4 dark:bg-white/80 dark:border-stone-300 dark:shadow-sm ${borderColor}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold dark:text-stone-600 ${item.isExamDay ? 'text-amber-400 dark:text-amber-600' : isToday ? 'text-blue-400 dark:text-blue-700' : 'text-zinc-500'}`}>
                {item.label}
              </span>
              {isToday && (
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/15 border border-blue-500/30 rounded-full px-1.5 py-0.5 dark:text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20">
                  hoje
                </span>
              )}
              {item.isExamDay && (
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/15 border border-amber-500/30 rounded-full px-1.5 py-0.5 dark:text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20">
                  PROVA
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-zinc-100 mt-0.5 dark:text-stone-900">
              {item.topic}
              {item.isOverdue && (
                <span className="ml-2 inline-flex rounded-full bg-red-50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-red-800 border border-red-100 dark:bg-red-500/10 dark:text-red-700 dark:border-red-500/20">
                  ATRASADO
                </span>
              )}
            </p>
          </div>
          {allDone && (
            <span className="flex-shrink-0 text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/30 rounded-full px-2 py-0.5 dark:text-green-700 dark:bg-green-500/10 dark:border-green-500/20">
              ✓ concluído
            </span>
          )}
        </div>

        {/* Tasks */}
        <ul className="space-y-1.5">
          {item.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 cursor-pointer" onClick={() => toggle(i)}>
              <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${checked[i] ? 'bg-green-500 border-green-500' : 'border-zinc-600 hover:border-zinc-400 dark:border-stone-400 dark:hover:border-stone-600'}`}>
                {checked[i] && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${checked[i] ? 'line-through text-zinc-600 dark:text-stone-400' : 'text-zinc-300 dark:text-stone-700'}`}>
                {task}
              </span>
            </li>
          ))}
        </ul>

        {/* Videos toggle */}
        {item.videos.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setVideosOpen(v => !v)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors dark:text-stone-600 dark:hover:text-stone-900"
            >
              <svg className={`w-3.5 h-3.5 transition-transform ${videosOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 6 10">
                <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {videosOpen ? 'Ocultar vídeos' : `${item.videos.length} vídeo${item.videos.length > 1 ? 's' : ''}`}
            </button>

            {videosOpen && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {item.videos.map((v, i) => (
                  <div key={i}>
                    <p className="text-[11px] text-zinc-500 mb-1.5 truncate dark:text-stone-500">{v.title}</p>
                    <YoutubeEmbed url={v.url} title={v.title} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
