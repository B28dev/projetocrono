import { useNavigate } from 'react-router-dom';
import { CountdownBadge } from './Countdown';
import ProgressBar from './ProgressBar';

// Subject definitions now live in src/data/dashboardSubjects.js

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
  const {
    name,
    short,
    active,
    color,
    progress,
    examDate,
    status,
    helperText = '',
    disableNavigation = false,
    isPlaceholder = false,
  } = subject;
  const colors = colorMap[color] || colorMap.blue;
  const effectiveProgress = active && metrics ? metrics.progressPercent : progress;
  const countdownKey = `${shift}-${subject.id}-${examDate?.getTime?.() ?? examDate}`;
  const isIntroEngSoftware = subject.id === 'intro-eng-software';
  const isCompleted = status === 'completed';
  const isComingSoon = status === 'coming-soon' || isPlaceholder;

  const handleClick = () => {
    if (!active || disableNavigation || isComingSoon) return;
    if (isIntroEngSoftware) {
      navigate('/materia/engenharia-software');
      return;
    }
    navigate(`/materia/${subject.id}`);
  };

  const cardIsInteractive = active && !disableNavigation && !isComingSoon;
  const countdownLabel = isComingSoon ? 'P2 em preparação' : null;
  const cardContainerClass = cardIsInteractive
    ? 'cursor-pointer relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff3ea5]/15 via-[#0d0d14] to-[#00e8ff]/15 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] hover:border-[#00e8ff]/30 dark:border-black/5 dark:bg-none dark:bg-white/60 dark:from-transparent dark:via-transparent dark:to-transparent dark:shadow-lg dark:hover:border-stone-400 dark:hover:bg-white/70 cyberpunk:border-white/10 cyberpunk:bg-gradient-to-br cyberpunk:from-[#ff3ea5]/15 cyberpunk:via-[#0d0d14] cyberpunk:to-[#00e8ff]/15 cyberpunk:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] cyberpunk:hover:border-[#00e8ff]/30'
    : isComingSoon
      ? 'cursor-default relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(10,14,26,0.92),rgba(8,8,15,0.7))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_18px_36px_rgba(0,0,0,0.24)] dark:border-stone-300 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(244,244,245,0.92))] dark:shadow-[0_12px_30px_rgba(15,23,42,0.08)] cyberpunk:border-[#00e8ff]/18 cyberpunk:bg-[linear-gradient(145deg,rgba(7,13,24,0.96),rgba(20,8,24,0.78))] cyberpunk:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_18px_rgba(0,232,255,0.08),0_18px_44px_rgba(0,0,0,0.3)]'
      : 'cursor-not-allowed border-zinc-800/60 bg-zinc-900/30 dark:border-stone-300 dark:bg-stone-100/80 cyberpunk:border-white/5 cyberpunk:bg-white/[0.02]';

  const outerShellClass = cardIsInteractive
    ? 'relative overflow-hidden rounded-xl p-[1.5px] shadow-[0_0_12px_rgba(255,62,165,0.18),0_0_18px_rgba(0,232,255,0.16)]'
    : isComingSoon
      ? 'relative overflow-hidden rounded-xl p-[1.5px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_38px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_24px_rgba(15,23,42,0.08)] cyberpunk:shadow-[0_0_16px_rgba(0,232,255,0.12),0_0_24px_rgba(255,62,165,0.08)]'
      : '';

  const cardContent = (
    <div
      onClick={handleClick}
      className={`cyber-glass relative group flex select-none flex-col gap-3 rounded-xl border p-5 backdrop-blur-md transition-all duration-300 ${cardContainerClass}`}
      role={cardIsInteractive ? 'button' : undefined}
      aria-disabled={!cardIsInteractive}
    >
      {isComingSoon ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-70 dark:via-stone-300 cyberpunk:via-[#00e8ff]" />
      ) : null}
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ring-1 ${colors.badge}`}>
          {short}
        </div>
        {isComingSoon ? (
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 dark:border-stone-300 dark:bg-stone-200 dark:text-stone-700 cyberpunk:border-[#00e8ff]/35 cyberpunk:bg-[#00e8ff]/10 cyberpunk:text-[#9cf8ff]">
            EM BREVE
          </span>
        ) : active ? (
          <span className="rounded-full border border-[#34d399]/20 bg-[#34d399]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#34d399]">
            {isCompleted ? 'FINALIZADO' : 'ATIVO'}
          </span>
        ) : (
          <span className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-stone-200 dark:text-stone-600 cyberpunk:border cyberpunk:border-white/10 cyberpunk:bg-white/[0.04] cyberpunk:text-white/55">
            em breve
          </span>
        )}
      </div>

      {isComingSoon ? (
        <div className="absolute right-5 top-14 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/55 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-500 cyberpunk:border-white/10 cyberpunk:text-[#ff8dcb]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff3ea5] animate-pulse dark:bg-stone-400 cyberpunk:bg-[#ff3ea5]" />
          p2
        </div>
      ) : null}

      <div>
        <p className="pr-12 text-sm font-semibold leading-snug text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">
          {name}
        </p>
        <div className="mt-1">
          {isComingSoon ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:border-stone-300 dark:bg-stone-100 dark:text-stone-500 cyberpunk:border-[#00e8ff]/18 cyberpunk:bg-[#00e8ff]/8 cyberpunk:text-[#9cf8ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 dark:bg-stone-400 cyberpunk:bg-[#00e8ff]" />
              {countdownLabel}
            </div>
          ) : (
            <CountdownBadge key={countdownKey} target={examDate} />
          )}
        </div>
      </div>

      {isComingSoon ? (
        <div className="mt-auto space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 dark:border-stone-300 dark:bg-stone-100/80 cyberpunk:border-[#ff3ea5]/20 cyberpunk:bg-white/[0.03]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-stone-500 cyberpunk:font-mono cyberpunk:text-[#ff8dcb]">
                Status da trilha
              </p>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200 dark:border-amber-400/30 dark:bg-amber-100 dark:text-amber-700 cyberpunk:border-[#ffb347]/35 cyberpunk:bg-[#ffb347]/12 cyberpunk:text-[#ffe8bf]">
                Em breve
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 dark:text-stone-600 cyberpunk:text-white/68">
              {helperText || 'Conteúdo da P2 ainda não liberado'}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 px-3 py-2 text-[11px] text-zinc-500 dark:border-stone-300 dark:text-stone-600 cyberpunk:border-white/10 cyberpunk:text-white/58">
            <span>Estrutura pronta para receber a P2</span>
            <span className="font-mono uppercase tracking-[0.18em]">standby</span>
          </div>
        </div>
      ) : active ? (
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
      ) : null}
    </div>
  );

  if (!outerShellClass) {
    return cardContent;
  }

  return (
    <div className={outerShellClass}>
      {cardIsInteractive ? (
        <>
          <div className="pointer-events-none absolute -inset-[95%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,62,165,0.82)_100deg,rgba(0,232,255,0.82)_220deg,transparent_320deg)] opacity-65 blur-[0.5px] animate-[spin_8s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_20%,rgba(255,62,165,0.22),transparent_46%),radial-gradient(circle_at_80%_80%,rgba(0,232,255,0.2),transparent_46%)] blur-md" />
        </>
      ) : isComingSoon ? (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_18%,rgba(0,232,255,0.12),transparent_42%),radial-gradient(circle_at_82%_82%,rgba(255,62,165,0.14),transparent_44%)] blur-md" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent dark:via-stone-300 cyberpunk:via-[#00e8ff]" />
        </>
      ) : null}
      <div className="relative z-[1]">
        {cardContent}
      </div>
    </div>
  );
}
