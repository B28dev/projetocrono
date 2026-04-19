export default function InsightDrawer({ isOpen, title, subtitle, items = [], onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <aside
        className="fixed inset-x-0 bottom-0 z-[70] max-h-[82vh] overflow-y-auto rounded-t-lg border border-white/[0.08] bg-[#101012] p-5 shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] sm:rounded-l-lg sm:rounded-tr-none dark:border-stone-300 dark:bg-white"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-stone-950">{title}</h3>
            {subtitle ? <p className="mt-2 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white dark:border-stone-300 dark:bg-stone-100 dark:text-stone-600 dark:hover:text-stone-900"
            aria-label="Fechar detalhes"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="m6 6 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 dark:border-stone-200 dark:bg-stone-50">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white dark:text-stone-950">{item.label}</p>
                {item.value !== undefined ? <span className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">{item.value}</span> : null}
              </div>
              {item.helper ? <p className="mt-2 text-xs leading-relaxed text-zinc-400 dark:text-stone-600">{item.helper}</p> : null}
            </article>
          ))}
        </div>
      </aside>
    </>
  );
}
