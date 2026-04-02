import { memo, useEffect, useRef, useState } from 'react';

function OverdueStatusCard({ theme = 'dark', pendingCount = 0 }) {
  const hasPendingAtrasadas = pendingCount > 0;
  const previousPendingRef = useRef(hasPendingAtrasadas);
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    if (previousPendingRef.current && !hasPendingAtrasadas) {
      setIsCelebrating(true);
      const timeoutId = window.setTimeout(() => setIsCelebrating(false), 1400);
      previousPendingRef.current = hasPendingAtrasadas;

      return () => window.clearTimeout(timeoutId);
    }

    previousPendingRef.current = hasPendingAtrasadas;
    return undefined;
  }, [hasPendingAtrasadas]);

  const isCyber = theme === 'cyberpunk';
  const isLight = theme === 'light';

  const surfaceClass = hasPendingAtrasadas
    ? isCyber
      ? 'border-[#ff3ea5]/35 bg-[#ff3ea5]/10 shadow-[0_0_20px_rgba(255,62,165,0.18)]'
      : isLight
      ? 'border-red-400/45 bg-red-500/10 shadow-[0_0_18px_rgba(239,68,68,0.12)]'
      : 'border-red-500/25 bg-red-500/8 shadow-[0_0_18px_rgba(239,68,68,0.16)]'
    : isCyber
    ? 'border-emerald-400/35 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.16)]'
    : isLight
    ? 'border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.12)]'
    : 'border-emerald-500/25 bg-emerald-500/8 shadow-[0_0_18px_rgba(16,185,129,0.16)]';

  const labelClass = hasPendingAtrasadas
    ? isCyber
      ? 'text-[#ff8dcb]'
      : isLight
      ? 'text-red-700'
      : 'text-red-300'
    : isCyber
    ? 'text-emerald-300'
    : isLight
    ? 'text-emerald-700'
    : 'text-emerald-300';

  const copyClass = isLight ? 'text-stone-800' : 'text-zinc-100';
  const metaClass = hasPendingAtrasadas
    ? isLight
      ? 'text-red-700/80'
      : isCyber
      ? 'text-white/72'
      : 'text-zinc-300'
    : isLight
    ? 'text-emerald-700/80'
    : isCyber
    ? 'text-white/72'
    : 'text-zinc-300';

  const iconWrapClass = hasPendingAtrasadas
    ? isCyber
      ? 'border-[#ff3ea5]/30 bg-[#ff3ea5]/16 text-[#ff8dcb]'
      : isLight
      ? 'border-red-500/25 bg-red-500/12 text-red-700'
      : 'border-red-500/25 bg-red-500/12 text-red-300'
    : isLight
    ? 'border-emerald-500/25 bg-emerald-500/12 text-emerald-700'
    : 'border-emerald-500/25 bg-emerald-500/12 text-emerald-300';

  return (
    <div className={`rounded-lg border px-2.5 py-2 backdrop-blur-md transition-all duration-500 ${surfaceClass}`}>
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${iconWrapClass} ${
            !hasPendingAtrasadas && isCelebrating ? 'animate-bounce' : ''
          }`}
        >
          {hasPendingAtrasadas ? (
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2.5 14 13H2L8 2.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 6v3.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M5.3 8.1 7.1 9.9l3.6-3.8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <div className="min-w-0">
          <p className={`text-[10px] uppercase tracking-widest ${labelClass}`}>
            Status de pendencias
          </p>
          <p className={`mt-0.5 text-sm font-semibold leading-snug ${copyClass}`}>
            {hasPendingAtrasadas
              ? `Voce tem ${pendingCount} tarefa${pendingCount === 1 ? '' : 's'} atrasada${pendingCount === 1 ? '' : 's'}. Vamos colocar em dia?`
              : 'Pendencias concluidas! Voce esta em dia com o conteudo.'}
          </p>
          <p className={`mt-1 text-[11px] ${metaClass}`}>
            {hasPendingAtrasadas ? 'Priorize as tarefas vencidas antes de seguir o plano.' : 'Fluxo limpo. Continue no ritmo atual.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(OverdueStatusCard);
