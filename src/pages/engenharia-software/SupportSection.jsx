export default function SupportSection({ section }) {
  const insights = section.data;

  return (
    <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold text-white dark:text-stone-950">{insights.title}</h3>
          <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-300 dark:bg-cyan-500/10 dark:text-cyan-700">
            {insights.modeLabel}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {insights.items.map((item) => (
          <article key={item.id} className="border-t border-white/[0.08] pt-3 dark:border-stone-200">
            <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">{item.label}</p>
            <p className="text-base font-semibold leading-snug text-white dark:text-stone-950">{item.value}</p>
          </article>
        ))}
      </div>
    </article>
  );
}
