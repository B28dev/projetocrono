export default function PeriodToggle({ options, selectedId, onChange }) {
  return (
    <div className="inline-flex w-full max-w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:w-auto sm:flex-row sm:items-center dark:border-stone-300 dark:bg-stone-100/70 dark:shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      {options.map((option) => {
        const isActive = selectedId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={`relative inline-flex min-h-11 flex-1 items-center justify-center gap-3 overflow-hidden rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30 sm:min-w-[110px] ${
              isActive
                ? 'border-cyan-400/35 bg-white/12 text-white dark:border-stone-300 dark:bg-white dark:text-stone-900'
                : 'border-white/10 bg-transparent text-white/72 hover:border-white/20 hover:bg-white/[0.04] dark:border-stone-300 dark:text-stone-700 dark:hover:bg-white/80'
            }`}
          >
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
