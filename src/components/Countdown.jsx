import { useCountdown } from '../hooks/useCountdown';

/**
 * Compact inline countdown badge — shows "Xd Yh" or "Hoje!" if exam day.
 */
export function CountdownBadge({ className = '' }) {
  const { days, hours, isPast } = useCountdown();

  if (isPast) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium text-zinc-400 ${className}`}>
        Prova realizada
      </span>
    );
  }

  if (days === 0 && hours === 0) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-semibold text-amber-400 ${className}`}>
        Prova hoje!
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium text-zinc-300 ${className}`}>
      <span className="text-blue-400 font-semibold">{days}d {hours}h</span>
      para a prova
    </span>
  );
}

/**
 * Large countdown display with labeled units.
 */
export function CountdownFull({ className = '' }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown();

  if (isPast) {
    return (
      <p className={`text-sm text-zinc-500 ${className}`}>A prova já foi realizada.</p>
    );
  }

  const units = [
    { label: 'dias',     value: days    },
    { label: 'horas',    value: hours   },
    { label: 'minutos',  value: minutes },
    { label: 'segundos', value: seconds },
  ];

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-2xl font-bold text-zinc-100 tabular-nums w-10 text-center">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{label}</span>
        </div>
      ))}
    </div>
  );
}
