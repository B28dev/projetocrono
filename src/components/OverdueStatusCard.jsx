import { memo, useEffect, useMemo, useRef, useState } from 'react';

function formatShortDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return null;
  return `${day}/${month}`;
}

function OverdueStatusCard({ theme = 'dark', overdueContentItems = [], todayPendingTasks = [] }) {
  const hasConteudosAtrasados = overdueContentItems.length > 0;
  const hasTodayPendingTasks = todayPendingTasks.length > 0;
  const status = hasConteudosAtrasados && hasTodayPendingTasks
    ? 'critical'
    : hasConteudosAtrasados
    ? 'overdue_only'
    : hasTodayPendingTasks
    ? 'today_only'
    : 'success';
  const previousStatusRef = useRef(status);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const diasComConteudoAtrasado = useMemo(() => {
    const orderedDates = Array.from(
      new Set(overdueContentItems.map((task) => task.date).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));

    return {
      total: orderedDates.length,
      visible: orderedDates.slice(0, 4).map(formatShortDate).filter(Boolean),
      hiddenCount: Math.max(orderedDates.length - 4, 0),
    };
  }, [overdueContentItems]);

  useEffect(() => {
    if (previousStatusRef.current !== 'success' && status === 'success') {
      setIsCelebrating(true);
      const timeoutId = window.setTimeout(() => setIsCelebrating(false), 1400);
      previousStatusRef.current = status;

      return () => window.clearTimeout(timeoutId);
    }

    previousStatusRef.current = status;
    return undefined;
  }, [status]);

  const isCyber = theme === 'cyberpunk';
  const isLight = theme === 'light';

  const cardStatusStyle = status === 'critical'
    ? isCyber
      ? 'border-[#ff3ea5]/60 bg-[linear-gradient(135deg,rgba(88,7,35,0.86),rgba(127,29,29,0.34))] shadow-[0_0_0_1px_rgba(255,62,165,0.16),0_0_24px_rgba(255,62,165,0.24),inset_0_1px_0_rgba(255,255,255,0.04)]'
      : isLight
      ? 'border-red-400/70 bg-[linear-gradient(135deg,rgba(255,241,242,0.98),rgba(254,226,226,0.95),rgba(254,205,211,0.9))] shadow-[0_0_0_1px_rgba(248,113,113,0.2),0_0_24px_rgba(239,68,68,0.14),inset_0_1px_0_rgba(255,255,255,0.35)]'
      : 'border-red-500/45 bg-[linear-gradient(135deg,rgba(76,5,25,0.62),rgba(127,29,29,0.24))] shadow-[0_0_0_1px_rgba(239,68,68,0.14),0_0_24px_rgba(239,68,68,0.18),inset_0_1px_0_rgba(255,255,255,0.03)]'
    : status === 'overdue_only' || status === 'today_only'
    ? isCyber
      ? 'border-amber-400/55 bg-[linear-gradient(135deg,rgba(69,35,8,0.84),rgba(120,53,15,0.26))] shadow-[0_0_0_1px_rgba(251,191,36,0.16),0_0_22px_rgba(245,158,11,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]'
      : isLight
      ? 'border-amber-400/70 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,243,199,0.96),rgba(253,230,138,0.18))] shadow-[0_0_0_1px_rgba(251,191,36,0.18),0_0_22px_rgba(245,158,11,0.14),inset_0_1px_0_rgba(255,255,255,0.35)]'
      : 'border-amber-500/45 bg-[linear-gradient(135deg,rgba(69,35,8,0.62),rgba(120,53,15,0.22))] shadow-[0_0_0_1px_rgba(245,158,11,0.14),0_0_22px_rgba(245,158,11,0.18),inset_0_1px_0_rgba(255,255,255,0.03)]'
    : isCyber
    ? 'border-emerald-400/35 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.16)]'
    : isLight
    ? 'border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.12)]'
    : 'border-emerald-500/25 bg-emerald-500/8 shadow-[0_0_18px_rgba(16,185,129,0.16)]';

  const labelClass = status === 'critical'
    ? isCyber
      ? 'text-[#ff8dcb]'
      : isLight
      ? 'text-red-700'
      : 'text-red-200'
    : status === 'overdue_only' || status === 'today_only'
    ? isCyber
      ? 'text-amber-300'
      : isLight
      ? 'text-amber-700'
      : 'text-amber-200'
    : isCyber
    ? 'text-emerald-300'
    : isLight
    ? 'text-emerald-700'
    : 'text-emerald-300';

  const copyClass = isLight ? 'text-stone-800' : 'text-zinc-100';
  const metaClass = status === 'critical'
    ? isLight
      ? 'text-red-700/85'
      : isCyber
      ? 'text-white/78'
      : 'text-zinc-200'
    : status === 'overdue_only' || status === 'today_only'
    ? isLight
      ? 'text-amber-700/85'
      : isCyber
      ? 'text-white/74'
      : 'text-zinc-200'
    : isLight
    ? 'text-emerald-700/80'
    : isCyber
    ? 'text-white/72'
    : 'text-zinc-300';

  const iconWrapClass = status === 'critical'
    ? isCyber
      ? 'border-[#ff3ea5]/55 bg-[#ff3ea5]/18 text-[#ff8dcb] shadow-[0_0_18px_rgba(255,62,165,0.24)]'
      : isLight
      ? 'border-red-500/40 bg-red-500/14 text-red-700 shadow-[0_0_16px_rgba(239,68,68,0.12)]'
      : 'border-red-500/35 bg-red-500/14 text-red-200 shadow-[0_0_16px_rgba(239,68,68,0.16)]'
    : status === 'overdue_only' || status === 'today_only'
    ? isCyber
      ? 'border-amber-400/45 bg-amber-400/14 text-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.2)]'
      : isLight
      ? 'border-amber-500/35 bg-amber-500/12 text-amber-700 shadow-[0_0_16px_rgba(245,158,11,0.12)]'
      : 'border-amber-500/30 bg-amber-500/12 text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.14)]'
    : isLight
    ? 'border-emerald-500/25 bg-emerald-500/12 text-emerald-700'
    : 'border-emerald-500/25 bg-emerald-500/12 text-emerald-300';

  const overdueBadgeClass = isCyber
    ? 'border-[#ff3ea5]/35 bg-[#ff3ea5]/14 text-[#ff8dcb]'
    : isLight
    ? 'border-red-500/25 bg-red-500/10 text-red-700'
    : 'border-red-500/25 bg-red-500/12 text-red-200';

  return (
    <div className={`min-h-[10.25rem] rounded-lg border px-2.5 py-2 backdrop-blur-md transition-colors duration-500 ${cardStatusStyle}`}>
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${iconWrapClass} ${
            status === 'success' && isCelebrating ? 'animate-bounce' : ''
          }`}
        >
          {status === 'critical' ? (
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
          ) : status === 'overdue_only' || status === 'today_only' ? (
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2.8v5l3 1.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="5.8" stroke="currentColor" strokeWidth="1.4" />
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
            {status === 'critical'
              ? 'Conteúdos atrasados e tarefas de hoje'
              : status === 'overdue_only'
              ? 'Hoje concluído! Foco nos conteúdos atrasados'
              : status === 'today_only'
              ? 'Pendências de hoje'
              : 'Tudo concluído!'}
          </p>
          {status === 'today_only' ? (
            <>
              <p className={`mt-0.5 text-sm font-semibold leading-snug ${copyClass}`}>
                Restam {todayPendingTasks.length} tarefa{todayPendingTasks.length === 1 ? '' : 's'} no bloco de hoje.
              </p>
              <ul className="mt-2 space-y-1.5">
                {todayPendingTasks.map((task) => (
                  <li key={task.id} className={`flex items-start gap-2 text-[11px] leading-relaxed ${metaClass}`}>
                    <span className={`mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${isCyber ? 'bg-amber-300' : isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
                    <span>{task.text}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : status === 'overdue_only' ? (
            <>
              <p className={`mt-0.5 text-sm font-semibold leading-snug ${copyClass}`}>
                Hoje está limpo. Agora resta eliminar {overdueContentItems.length} conteúdo{overdueContentItems.length === 1 ? '' : 's'} acumulado{overdueContentItems.length === 1 ? '' : 's'}.
              </p>
              <div className="mt-2 flex min-h-[2.25rem] flex-wrap gap-1.5 overflow-hidden">
                {diasComConteudoAtrasado.visible.map((day) => (
                  <span
                    key={day}
                    className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[11px] font-semibold ${overdueBadgeClass}`}
                  >
                    {day}
                  </span>
                ))}
                {diasComConteudoAtrasado.hiddenCount > 0 ? (
                  <span className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[11px] font-semibold ${overdueBadgeClass}`}>
                    + {diasComConteudoAtrasado.hiddenCount} dia{diasComConteudoAtrasado.hiddenCount === 1 ? '' : 's'}
                  </span>
                ) : null}
              </div>
              <p className={`mt-2 text-[11px] ${metaClass}`}>
                Dias com conteúdo acumulado em ordem de prioridade.
              </p>
            </>
          ) : (
            <>
              <p className={`mt-0.5 text-sm font-semibold leading-snug ${copyClass}`}>
                {status === 'critical'
                  ? 'Você tem pendências no dia e conteúdos acumulados.'
                  : 'Fluxo limpo! Você está em dia com a matéria.'}
              </p>
              {status === 'critical' ? (
                <>
                  <div className="mt-2 flex min-h-[2.25rem] flex-wrap gap-1.5 overflow-hidden">
                    {diasComConteudoAtrasado.visible.map((day) => (
                      <span
                        key={day}
                        className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[11px] font-semibold ${overdueBadgeClass}`}
                      >
                        {day}
                      </span>
                    ))}
                    {diasComConteudoAtrasado.hiddenCount > 0 ? (
                      <span className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[11px] font-semibold ${overdueBadgeClass}`}>
                        + {diasComConteudoAtrasado.hiddenCount} dia{diasComConteudoAtrasado.hiddenCount === 1 ? '' : 's'}
                      </span>
                    ) : null}
                  </div>
                  <p className={`mt-2 text-[11px] ${metaClass}`}>
                    Priorize esses dias antes de seguir o plano.
                  </p>
                </>
              ) : (
                <p className={`mt-1 text-[11px] ${metaClass}`}>
                  Pendências concluídas. Continue no ritmo atual.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(OverdueStatusCard);
