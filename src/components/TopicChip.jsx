const levelStyles = {
  'muito-frequente': {
    chip: 'border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60',
    dot:  'bg-red-400',
    tag:  'text-red-400',
  },
  'frequente': {
    chip: 'border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/60',
    dot:  'bg-amber-400',
    tag:  'text-amber-400',
  },
  'apareceu': {
    chip: 'border-green-500/40 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/60',
    dot:  'bg-green-400',
    tag:  'text-green-400',
  },
};

export default function TopicChip({ topic, onClick }) {
  const styles = levelStyles[topic.level] || levelStyles['apareceu'];

  return (
    <button
      onClick={() => onClick?.(topic)}
      className={`topic-chip group flex items-center gap-2 px-3.5 py-2 rounded-lg border text-left
        transition-all duration-150 cursor-pointer hover:scale-105 hover:-translate-y-0.5
        dark:shadow-sm dark:shadow-black/5
        ${styles.chip}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`} />
      <span className="text-sm font-medium text-zinc-200 dark:text-stone-800">{topic.name}</span>
      <span className={`ml-auto text-[11px] font-semibold ${styles.tag}`}>{topic.frequency}</span>
    </button>
  );
}
