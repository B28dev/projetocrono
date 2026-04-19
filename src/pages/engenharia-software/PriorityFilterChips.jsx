export default function PriorityFilterChips({ options, selectedId, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selectedId === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
              isActive
                ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-700'
                : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white dark:border-stone-300 dark:bg-white dark:text-stone-600 dark:hover:text-stone-900'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
