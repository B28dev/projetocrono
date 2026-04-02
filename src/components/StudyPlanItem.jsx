import { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

export default function StudyPlanItem({ item, isToday, isPast, checked = {}, onToggleTask, theme = 'dark' }) {
  const [videosOpen, setVideosOpen] = useState(false);
  const resources = item.resources || [];
  const isLight = theme === 'light';
  const isCyber = theme === 'cyberpunk';

  const toggle = (i) => onToggleTask?.(item.storageDate || item.date, i);
  const allDone = item.tasks.length > 0 && item.tasks.every((_, i) => checked[i]);
  const useCyberHighlightedSurface = isCyber && (isToday || allDone);
  const cardBaseClass = useCyberHighlightedSurface
    ? 'relative overflow-hidden rounded-xl border p-4 backdrop-blur-md'
    : 'cyber-glass rounded-xl border backdrop-blur-md p-4';

  const borderColor = item.isOverdue
    ? 'border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.14),0_18px_40px_rgba(127,29,29,0.2)] dark:border-red-500/60 dark:shadow-[0_0_0_1px_rgba(248,113,113,0.18),0_18px_40px_rgba(239,68,68,0.18)] cyberpunk:border-[#ff3ea5]/60 cyberpunk:shadow-[0_0_26px_rgba(255,62,165,0.28),0_0_54px_rgba(244,63,94,0.16)]'
    : item.isExamDay
    ? 'border-amber-500/60 cyberpunk:border-[#ff3ea5]/35'
    : allDone
    ? isCyber
      ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
      : isLight
      ? 'border-emerald-500/65 shadow-[0_0_18px_rgba(16,185,129,0.2)]'
      : 'border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.2)]'
    : isToday
    ? isCyber
      ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
      : isLight
      ? 'border-blue-500/60 shadow-[0_0_16px_rgba(59,130,246,0.2)]'
      : 'border-blue-400/55 shadow-[0_0_16px_rgba(59,130,246,0.18)] sm:shadow-[0_0_24px_rgba(59,130,246,0.22),0_0_56px_rgba(59,130,246,0.08)]'
    : isPast
    ? 'border-white/5 cyberpunk:border-white/5'
    : 'border-white/10 cyberpunk:border-white/10';

  const timelineLineClass = item.isOverdue
    ? 'bg-gradient-to-b from-red-500/90 via-rose-500/70 to-red-500/20 shadow-[0_0_18px_rgba(239,68,68,0.45)] dark:from-red-500 dark:via-red-400 dark:to-red-300/30 dark:shadow-[0_0_18px_rgba(239,68,68,0.3)] cyberpunk:from-[#ff3ea5] cyberpunk:via-rose-400 cyberpunk:to-[#ff3ea5]/15 cyberpunk:shadow-[0_0_22px_rgba(255,62,165,0.65)]'
    : allDone
    ? isCyber
      ? 'bg-gradient-to-b from-emerald-400 via-emerald-400 to-emerald-400/20 shadow-[0_0_22px_rgba(16,185,129,0.62)]'
      : 'bg-zinc-800 dark:bg-stone-300 cyberpunk:bg-gradient-to-b cyberpunk:from-[#00e8ff]/50 cyberpunk:to-[#ff3ea5]/20'
    : isToday
    ? isCyber
      ? 'bg-gradient-to-b from-cyan-400 via-cyan-400 to-cyan-400/20 shadow-[0_0_22px_rgba(6,182,212,0.62)]'
      : 'bg-zinc-800 dark:bg-stone-300 cyberpunk:bg-gradient-to-b cyberpunk:from-[#00e8ff]/50 cyberpunk:to-[#ff3ea5]/20'
    : 'bg-zinc-800 dark:bg-stone-300 cyberpunk:bg-gradient-to-b cyberpunk:from-[#00e8ff]/50 cyberpunk:to-[#ff3ea5]/20';

  const markerClass = item.isOverdue
    ? 'border-red-500 bg-red-500/20 shadow-[0_0_0_1px_rgba(239,68,68,0.18),0_0_18px_rgba(239,68,68,0.3)] dark:border-red-500 dark:bg-red-500/15 dark:shadow-[0_0_16px_rgba(239,68,68,0.22)] cyberpunk:border-[#ff3ea5] cyberpunk:bg-[#ff3ea5]/18 cyberpunk:shadow-[0_0_20px_rgba(255,62,165,0.55)]'
    : item.isExamDay
    ? 'border-amber-500 bg-amber-500/20 cyberpunk:border-[#ff3ea5] cyberpunk:bg-[#ff3ea5]/15'
    : allDone
    ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_16px_rgba(16,185,129,0.3)] cyberpunk:border-emerald-500 cyberpunk:bg-emerald-500/20 cyberpunk:shadow-[0_0_22px_rgba(16,185,129,0.65)]'
    : isToday
    ? 'border-blue-500 bg-blue-500/20 cyberpunk:border-cyan-500 cyberpunk:bg-cyan-500/20 cyberpunk:shadow-[0_0_22px_rgba(6,182,212,0.65)]'
    : isPast
    ? 'border-zinc-700 bg-zinc-900 cyberpunk:border-white/20 cyberpunk:bg-white/[0.04]'
    : 'border-zinc-600 bg-zinc-900 cyberpunk:border-white/20 cyberpunk:bg-white/[0.04]';

  const cardSurfaceClass = item.isOverdue
    ? 'bg-red-950/10 dark:bg-[linear-gradient(135deg,rgba(255,245,245,0.98),rgba(254,242,242,0.96),rgba(254,226,226,0.92))] cyberpunk:bg-[linear-gradient(135deg,rgba(76,5,25,0.72),rgba(127,29,29,0.34))]'
    : allDone
    ? isCyber
      ? 'bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.22),transparent_34%),linear-gradient(145deg,rgba(2,44,34,0.96),rgba(4,78,58,0.92)_42%,rgba(16,185,129,0.18)_100%)] shadow-[inset_0_1px_0_rgba(167,243,208,0.1),inset_0_0_34px_rgba(16,185,129,0.2)]'
      : isLight
      ? 'bg-emerald-50'
      : 'bg-emerald-500/[0.08]'
    : isToday
    ? isCyber
      ? 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_34%),linear-gradient(145deg,rgba(8,30,46,0.96),rgba(12,74,110,0.92)_42%,rgba(6,182,212,0.2)_100%)] shadow-[inset_0_1px_0_rgba(165,243,252,0.1),inset_0_0_34px_rgba(6,182,212,0.2)]'
      : isLight
      ? 'bg-blue-50'
      : 'bg-blue-500/[0.08]'
    : 'bg-white/5 dark:bg-stone-100/50';

  const cardHoverClass = item.isOverdue
    ? 'hover:border-red-500/70 hover:bg-red-900/20 dark:hover:border-red-500/75 dark:hover:bg-[linear-gradient(135deg,rgba(254,242,242,1),rgba(254,226,226,0.98),rgba(252,165,165,0.2))] cyberpunk:hover:border-[#ff3ea5]/65 cyberpunk:hover:bg-[linear-gradient(135deg,rgba(103,8,39,0.82),rgba(127,29,29,0.42))]'
    : allDone
    ? isCyber
      ? ''
      : 'hover:border-emerald-500/60 hover:bg-emerald-500/[0.14]'
    : isToday
    ? isCyber
      ? ''
      : isLight
      ? 'hover:border-blue-500/70 hover:bg-blue-100'
      : 'hover:border-blue-400/65 hover:bg-blue-500/[0.12]'
    : 'hover:border-[#00e8ff]/40 hover:bg-white/10 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:hover:border-[#00e8ff]/40 cyberpunk:hover:bg-white/10';

  const dateTextClass = item.isOverdue
    ? 'text-red-300 dark:text-red-700 cyberpunk:text-[#ff8dcb]'
    : item.isExamDay
    ? 'text-amber-400 dark:text-amber-600 cyberpunk:text-[#ff3ea5]'
    : allDone
    ? 'text-emerald-400 dark:text-emerald-700 cyberpunk:text-emerald-300 cyberpunk:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]'
    : isToday
    ? 'text-blue-500 dark:text-blue-700 cyberpunk:text-cyan-300 cyberpunk:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
    : 'text-zinc-500 cyberpunk:text-white/55';

  const overdueTagClass = 'ml-2 inline-flex rounded-full border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] border-red-700 bg-red-900 text-red-50 shadow-[0_0_0_1px_rgba(127,29,29,0.18)] dark:border-red-500/40 dark:bg-red-500/18 dark:text-red-700 dark:shadow-[0_0_16px_rgba(239,68,68,0.12)] cyberpunk:border-[#ff3ea5] cyberpunk:bg-[#ff3ea5] cyberpunk:text-[#14040f] cyberpunk:shadow-[0_0_20px_rgba(255,62,165,0.55)]';

  const todayBadgeClass = allDone
    ? isCyber
      ? 'rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.8)] cyberpunk:font-mono'
      : isLight
      ? 'rounded-full px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/60 bg-emerald-500/14 text-emerald-700'
      : 'rounded-full px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/40 bg-emerald-500/12 text-emerald-300'
    : isCyber
    ? 'rounded-full px-2 py-0.5 text-[10px] font-semibold bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.8)] cyberpunk:font-mono'
    : isLight
    ? 'rounded-full px-2 py-0.5 text-[10px] font-semibold border border-blue-500/65 bg-blue-500/12 text-blue-700 shadow-[0_0_14px_rgba(59,130,246,0.18)]'
    : 'rounded-full px-2 py-0.5 text-[10px] font-semibold border border-blue-400/50 bg-blue-500/10 text-blue-300 shadow-[0_0_16px_rgba(59,130,246,0.16)]';

  return (
    <div className="study-plan-card relative pl-8 pb-8 last:pb-0">
      <div className={`absolute left-2.5 top-3 bottom-0 w-px last:hidden ${timelineLineClass}`} />

      <div
        className={`absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 ${markerClass}`}
      >
        {allDone && <span className="h-2 w-2 rounded-full bg-green-500 cyberpunk:bg-emerald-300 cyberpunk:shadow-[0_0_10px_rgba(16,185,129,0.85)]" />}
      </div>

      <div
        className={`${cardBaseClass} transition-all duration-700 ease-in-out ${cardSurfaceClass} ${cardHoverClass} ${borderColor}`}
      >
        <div className="study-plan-card-content">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold transition-all duration-700 ease-in-out dark:text-stone-600 cyberpunk:font-mono ${dateTextClass}`}
                >
                  {item.label}
                </span>
                {isToday && (
                  <span className={`transition-all duration-700 ease-in-out ${todayBadgeClass}`}>
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
                  <span className={overdueTagClass}>
                    ATRASADO
                  </span>
                )}
              </p>
            </div>
            {allDone && (
              <span className="flex-shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400 transition-all duration-700 ease-in-out dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-700 cyberpunk:border-emerald-500 cyberpunk:bg-emerald-500 cyberpunk:font-mono cyberpunk:text-slate-950 cyberpunk:shadow-[0_0_15px_rgba(16,185,129,0.8)]">
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
                      ? allDone
                        ? 'border-green-500 bg-green-500 cyberpunk:border-emerald-500 cyberpunk:bg-emerald-500 cyberpunk:shadow-[0_0_14px_rgba(16,185,129,0.7)]'
                        : 'border-green-500 bg-green-500 cyberpunk:border-cyan-500 cyberpunk:bg-cyan-500 cyberpunk:shadow-[0_0_14px_rgba(6,182,212,0.7)]'
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

          {resources.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setVideosOpen((value) => !value)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200 dark:text-stone-600 dark:hover:text-stone-900 cyberpunk:text-white/60 cyberpunk:hover:text-[#00e8ff]"
              >
                <svg className={`h-3.5 w-3.5 transition-transform ${videosOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {videosOpen ? 'Ocultar Vídeos/PDFs' : 'Vídeos/PDFs'}
              </button>

              {videosOpen && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {resources.map((resource, i) => (
                    <div key={i}>
                      <p className="mb-1.5 truncate text-[11px] text-zinc-500 dark:text-stone-500 cyberpunk:text-white/50">{resource.title}</p>
                      {resource.kind === 'youtube' ? (
                        <YoutubeEmbed url={resource.url} title={resource.title} />
                      ) : (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="cyber-glass flex h-full min-h-24 items-center justify-between rounded-lg border border-zinc-800 bg-surface-1 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100 dark:border-stone-300 dark:bg-white/80 dark:text-stone-700 dark:hover:border-stone-400 dark:hover:text-stone-900 cyberpunk:border-white/10 cyberpunk:bg-transparent cyberpunk:text-white/75 cyberpunk:hover:border-[#00e8ff]/25 cyberpunk:hover:text-white"
                        >
                          <span>Abrir recurso externo</span>
                          <span className="text-xs font-mono text-zinc-500 dark:text-stone-500 cyberpunk:text-[#00e8ff]">PDF</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {item.notes?.length > 0 && (
            <div className="mt-3 space-y-2">
              {item.notes.map((note, index) => (
                <div
                  key={`${item.date}-note-${index}`}
                  className={`rounded-lg border-l-2 px-3 py-2 text-xs leading-relaxed ${
                    note.variant === 'coach'
                      ? 'border-amber-500/50 bg-amber-500/8 text-zinc-300 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-stone-700 cyberpunk:border-[#ff3ea5]/30 cyberpunk:bg-[#ff3ea5]/8 cyberpunk:text-white/72'
                      : 'border-zinc-700 bg-zinc-900/40 text-zinc-400 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-700 cyberpunk:border-[#00e8ff]/25 cyberpunk:bg-white/[0.04] cyberpunk:text-white/68'
                  }`}
                >
                  <span className="mr-1 font-semibold text-zinc-200 dark:text-stone-900 cyberpunk:text-white">{note.title}:</span>
                  <span>{note.content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
