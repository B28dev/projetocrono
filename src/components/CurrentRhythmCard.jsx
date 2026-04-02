import { memo, useMemo } from 'react';
import ProgressBar from './ProgressBar';

function CurrentRhythmCard({
  theme = 'dark',
  todayDoneCount = 0,
  todayTotalCount = 0,
  todayPendingCount = 0,
  completedTodayTasks = [],
}) {
  const isLight = theme === 'light';
  const isCyber = theme === 'cyberpunk';
  const isHojeConcluido = todayTotalCount > 0 && todayPendingCount === 0;
  const dailyProgress = useMemo(
    () => (todayTotalCount > 0 ? Math.round((todayDoneCount / todayTotalCount) * 100) : 0),
    [todayDoneCount, todayTotalCount],
  );
  const progressColor = dailyProgress === 100 ? 'green' : 'blue';

  const cardStyleClass = isHojeConcluido
    ? isCyber
      ? 'border-emerald-300/75 bg-[linear-gradient(135deg,rgba(6,78,59,0.56),rgba(5,150,105,0.16))] shadow-[0_0_28px_rgba(16,185,129,0.38),0_0_62px_rgba(16,185,129,0.14)]'
      : isLight
      ? 'border-emerald-200 bg-emerald-50 shadow-[0_0_16px_rgba(16,185,129,0.12)]'
      : 'border-emerald-900/50 bg-neutral-900 shadow-[0_0_18px_rgba(16,185,129,0.16)]'
    : isCyber
    ? 'border-[#00e8ff]/35 bg-[#00e8ff]/8 shadow-[0_0_18px_rgba(0,232,255,0.14)]'
    : isLight
    ? 'border-blue-200 bg-blue-50/90 shadow-[0_0_12px_rgba(59,130,246,0.08)]'
    : 'border-blue-500/30 bg-blue-500/8 shadow-[0_0_16px_rgba(59,130,246,0.12)]';

  const badgeStyleClass = isHojeConcluido
    ? isCyber
      ? 'border border-emerald-300/60 bg-emerald-400 text-[#052617] shadow-[0_0_20px_rgba(16,185,129,0.72)]'
      : isLight
      ? 'bg-emerald-500 text-white'
      : 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
    : isCyber
    ? 'border border-[#00e8ff]/30 bg-[#00e8ff]/20 text-[#7af7ff] shadow-[0_0_12px_rgba(0,232,255,0.35)]'
    : isLight
    ? 'bg-blue-500 text-white'
    : 'border border-blue-400/20 bg-blue-500/12 text-blue-300';

  const labelStyleClass = isHojeConcluido
    ? isCyber
      ? 'text-emerald-200'
      : isLight
      ? 'text-emerald-700'
      : 'text-emerald-300'
    : isCyber
    ? 'text-[#7af7ff]'
    : isLight
    ? 'text-blue-700'
    : 'text-blue-300';

  const valueStyleClass = isHojeConcluido
    ? isCyber
      ? 'text-emerald-100'
      : isLight
      ? 'text-emerald-700'
      : 'text-emerald-300'
    : 'text-zinc-100 dark:text-stone-900 cyberpunk:text-white';

  return (
    <div className={`rounded-lg border px-2.5 py-2 backdrop-blur-md transition-colors duration-500 ease-in-out ${cardStyleClass}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex h-5 items-center rounded-full px-2 text-[10px] uppercase tracking-widest transition-colors duration-500 ${badgeStyleClass}`}>
          Ritmo atual
        </span>
        <span className={`text-[11px] font-mono font-semibold ${labelStyleClass}`}>
          {todayDoneCount}/{todayTotalCount || 0}
        </span>
      </div>

      <p className={`mt-1 text-base font-semibold ${valueStyleClass}`}>
        Hoje
      </p>
      <ProgressBar
        value={dailyProgress}
        color={progressColor}
        className="mt-2 h-1.5 border border-white/5 bg-zinc-800/70 dark:bg-stone-200 cyberpunk:bg-white/10"
      />

      <div className="mt-2 border-t border-white/10 pt-2 dark:border-stone-300 cyberpunk:border-white/10">
        {completedTodayTasks.length > 0 ? (
          <ul className="space-y-1.5">
            {completedTodayTasks.map((task) => (
              <li key={task.id} className="flex items-start gap-2 text-[11px] leading-relaxed text-zinc-300 dark:text-stone-700 cyberpunk:text-white/72">
                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-700 cyberpunk:border-[#00e8ff]/25 cyberpunk:bg-[#00e8ff]/10 cyberpunk:text-[#00e8ff]">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 4l2.2 2.2L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={isLight ? 'text-stone-700' : ''}>{task.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-zinc-400 dark:text-stone-600 cyberpunk:text-white/62">
            Nenhuma tarefa concluida hoje.
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(CurrentRhythmCard);
