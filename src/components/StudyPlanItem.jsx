import { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export default function StudyPlanItem({ item, isToday, isPast }) {
  const [checked, setChecked] = useState({});
  const [videosOpen, setVideosOpen] = useState(false);

  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const allDone = item.tasks.length > 0 && item.tasks.every((_, i) => checked[i]);

  const borderColor = item.isExamDay
    ? 'border-amber-500/60'
    : isToday
    ? 'border-blue-500/60'
    : isPast
    ? 'border-zinc-800'
    : 'border-zinc-700/50';

  return (
    <div className={`relative pl-8 pb-8 last:pb-0`}>
      {/* Timeline line */}
      <div className="absolute left-2.5 top-3 bottom-0 w-px bg-zinc-800 last:hidden" />

      {/* Timeline dot */}
      <div className={`absolute left-0 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${item.isExamDay ? 'border-amber-500 bg-amber-500/20' : isToday ? 'border-blue-500 bg-blue-500/20' : isPast ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-600 bg-zinc-900'}`}>
        {allDone && <span className="w-2 h-2 rounded-full bg-green-500" />}
      </div>

      {/* Card */}
      <div className={`rounded-xl border bg-surface-2 p-4 ${borderColor}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${item.isExamDay ? 'text-amber-400' : isToday ? 'text-blue-400' : 'text-zinc-500'}`}>
                {item.label}
              </span>
              {isToday && (
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/15 border border-blue-500/30 rounded-full px-1.5 py-0.5">
                  hoje
                </span>
              )}
              {item.isExamDay && (
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/15 border border-amber-500/30 rounded-full px-1.5 py-0.5">
                  PROVA
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-zinc-100 mt-0.5">{item.topic}</p>
          </div>
          {allDone && (
            <span className="flex-shrink-0 text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/30 rounded-full px-2 py-0.5">
              ✓ concluído
            </span>
          )}
        </div>

        {/* Tasks */}
        <ul className="space-y-1.5">
          {item.tasks.map((task, i) => (
            <li key={i} className="flex items-start gap-2 cursor-pointer" onClick={() => toggle(i)}>
              <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${checked[i] ? 'bg-green-500 border-green-500' : 'border-zinc-600 hover:border-zinc-400'}`}>
                {checked[i] && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              <span className={`text-sm transition-colors ${checked[i] ? 'line-through text-zinc-600' : 'text-zinc-300'}`}>
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
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
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
                    <p className="text-[11px] text-zinc-500 mb-1.5 truncate">{v.title}</p>
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
