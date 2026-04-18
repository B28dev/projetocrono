export default function ValidationResultActions({ actions, disabled = false }) {
  const columnsClass = actions.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 gap-2 ${columnsClass}`}>
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          disabled={disabled || action.disabled}
          className={`min-h-11 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-all duration-200 ${action.className} ${disabled || action.disabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`}
        >
          <span className="block">{action.label}</span>
          {action.caption ? (
            <span className="mt-1 block text-xs font-medium text-white/55 dark:text-stone-500">
              {action.caption}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
