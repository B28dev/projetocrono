const colorMap = {
  blue: 'bg-blue-500 cyberpunk:bg-[#00e8ff] cyberpunk:shadow-[0_0_10px_rgba(0,232,255,0.6)]',
  purple: 'bg-purple-500 cyberpunk:bg-[#8b5cf6] cyberpunk:shadow-[0_0_10px_rgba(139,92,246,0.6)]',
  green: 'bg-green-500 cyberpunk:bg-[#10b981] cyberpunk:shadow-[0_0_10px_rgba(16,185,129,0.6)]',
  amber: 'bg-amber-500 cyberpunk:bg-[#f59e0b] cyberpunk:shadow-[0_0_10px_rgba(245,158,11,0.6)]',
  teal: 'bg-teal-500 cyberpunk:bg-[#14b8a6] cyberpunk:shadow-[0_0_10px_rgba(20,184,166,0.6)]',
  rose: 'bg-rose-500 cyberpunk:bg-[#ff3ea5] cyberpunk:shadow-[0_0_10px_rgba(255,62,165,0.6)]',
};

export default function ProgressBar({ value = 0, color = 'blue', className = '' }) {
  const bar = colorMap[color] || colorMap.blue;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`cyber-track h-1 w-full bg-zinc-800 rounded-full dark:bg-stone-300 cyberpunk:bg-white/10 ${className}`}>
      <div
        className={`cyber-progress h-full rounded-full transition-all duration-700 ease-out ${bar}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
