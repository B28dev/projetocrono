import { useCountdown } from '../hooks/useCountdown';

export function CountdownBadge({ className = '' }) {
  const { days, hours, isPast } = useCountdown();

  if (isPast) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium text-zinc-400 cyberpunk:text-white/55 ${className}`}>
        Prova realizada
      </span>
    );
  }

  if (days === 0 && hours === 0) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-semibold text-amber-400 cyberpunk:text-[#ff3ea5] ${className}`}>
        Prova hoje!
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium text-zinc-300 dark:text-stone-700 cyberpunk:text-white/70 ${className}`}>
      <span className="text-blue-400 dark:text-blue-700 font-semibold cyberpunk:text-[#00e8ff]">{days}d {hours}h</span>
      para a prova
    </span>
  );
}

export function CountdownFull({ className = '' }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown();

  if (isPast) {
    return (
      <p className={`text-sm text-zinc-500 cyberpunk:text-white/60 ${className}`}>A prova ja foi realizada.</p>
    );
  }

  const units = [
    { label: 'dias', value: days },
    { label: 'horas', value: hours },
    { label: 'minutos', value: minutes },
    { label: 'segundos', value: seconds },
  ];

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-2xl font-bold text-zinc-100 dark:text-stone-950 tabular-nums w-10 text-center cyberpunk:font-mono cyberpunk:text-white">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-stone-500 uppercase tracking-wider mt-0.5 cyberpunk:font-mono cyberpunk:text-[#00e8ff]">{label}</span>
        </div>
      ))}
    </div>
  );
}
