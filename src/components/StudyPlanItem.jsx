import { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export default function StudyPlanItem({ item, isToday, isPast, checked = {}, onToggleTask }) {
  const [videosOpen, setVideosOpen] = useState(false);

  const toggle = (i) => onToggleTask?.(item.storageDate || item.date, i);
  const allDone = item.tasks.length > 0 && item.tasks.every((_, i) => checked[i]);

  const borderColor = item.isExamDay
    ? 'border-amber-500/60 cyberpunk:border-[#ff3ea5]/35'
    : isToday
    ? 'border-blue-500/60 cyberpunk:border-[#00e8ff]/35'
    : isPast
    ? 'border-zinc-800 cyberpunk:border-white/10'
    : 'border-zinc-700/50 cyberpunk:border-white/10';

  return (
    <div className="study-plan-card relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-2.5 top-3 bottom-0 w-px bg-zinc-800 dark:bg-stone-300 cyberpunk:bg-gradient-to-b cyberpunk:from-[#00e8ff]/50 cyberpunk:to-[#ff3ea5]/20 last:hidden" />

      <div
        className={`absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          item.isExamDay
            ? 'border-amber-500 bg-amber-500/20 cyberpunk:border-[#ff3ea5] cyberpunk:bg-[#ff3ea5]/15'
            : isToday
            ? 'border-blue-500 bg-blue-500/20 cyberpunk:border-[#00e8ff] cyberpunk:bg-[#00e8ff]/15'
            : isPast
            ? 'border-zinc-700 bg-zinc-900 cyberpunk:border-white/20 cyberpunk:bg-white/[0.04]'
            : 'border-zinc-600 bg-zinc-900 cyberpunk:border-white/20 cyberpunk:bg-white/[0.04]'
        }`}
      >
        {allDone && <span className="h-2 w-2 rounded-full bg-green-500 cyberpunk:bg-[#00e8ff]" />}
      </div>

      <div
        data-magnetic
        className={`cyber-glass rounded-xl border bg-surface-2 p-4 dark:border-stone-300 dark:bg-white/80 dark:shadow-sm cyberpunk:border-white/10 cyberpunk:bg-transparent ${borderColor}`}
      >
        <div className="study-plan-card-content">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold dark:text-stone-600 cyberpunk:font-mono ${
                    item.isExamDay
                      ? 'text-amber-400 dark:text-amber-600 cyberpunk:text-[#ff3ea5]'
                      : isToday
                      ? 'text-blue-400 dark:text-blue-700 cyberpunk:text-[#00e8ff]'
                      : 'text-zinc-500 cyberpunk:text-white/55'
                  }`}
                >
                  {item.label}
                </span>
                {isToday && (
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-700 cyberpunk:border-[#00e8ff]/25 cyberpunk:bg-[#00e8ff]/10 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
                    hoje
                  </span>
                )}
                {item.isExamDay && (
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-700 cyberpunk:border-[#ff3ea5]/25 cyberpunk:bg-[#ff3ea5]/10 cyberpunk:font-mono cyberpunk:text-[#ff3ea5]">
                    PROVA
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
                {item.topic}
                {item.isOverdue && (
                  <span className="ml-2 inline-flex rounded-full border border-red-100 bg-red-50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-700 cyberpunk:border-[#ff3ea5]/25 cyberpunk:bg-[#ff3ea5]/10 cyberpunk:text-[#ff8dcb]">
                    ATRASADO
                  </span>
                )}
              </p>
            </div>
            {allDone && (
              <span className="flex-shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-700 cyberpunk:border-[#00e8ff]/25 cyberpunk:bg-[#00e8ff]/10 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">
                concluido
              </span>
            )}
          </div>

          <ul className="space-y-1.5">
            {item.tasks.map((task, i) => (
              <li key={i} className="flex cursor-pointer items-start gap-2" onClick={() => toggle(i)}>
                <span
                  className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    checked[i]
                      ? 'border-green-500 bg-green-500 cyberpunk:border-[#00e8ff] cyberpunk:bg-[#00e8ff]'
                      : 'border-zinc-600 hover:border-zinc-400 dark:border-stone-400 dark:hover:border-stone-600 cyberpunk:border-white/20 cyberpunk:hover:border-[#00e8ff]/35'
                  }`}
                >
                  {checked[i] && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    checked[i]
                      ? 'line-through text-zinc-600 dark:text-stone-400 cyberpunk:text-white/35'
                      : 'text-zinc-300 dark:text-stone-700 cyberpunk:text-white/78'
                  }`}
                >
                  {task}
                </span>
              </li>
            ))}
          </ul>

          {item.videos.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                data-magnetic
                onClick={() => setVideosOpen((value) => !value)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/60 cyberpunk:hover:text-[#00e8ff]"
              >
                <svg className={`h-3.5 w-3.5 transition-transform ${videosOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {videosOpen ? 'Ocultar videos' : `${item.videos.length} video${item.videos.length > 1 ? 's' : ''}`}
              </button>

              {videosOpen && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {item.videos.map((v, i) => (
                    <div key={i}>
                      <p className="mb-1.5 truncate text-[11px] text-zinc-500 dark:text-stone-500 cyberpunk:text-white/50">{v.title}</p>
                      <YoutubeEmbed url={v.url} title={v.title} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
