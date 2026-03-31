const colorMap = {
  blue:   'bg-blue-500',
  purple: 'bg-purple-500',
  green:  'bg-green-500',
  amber:  'bg-amber-500',
  teal:   'bg-teal-500',
  rose:   'bg-rose-500',
};

export default function ProgressBar({ value = 0, color = 'blue', className = '' }) {
  const bar = colorMap[color] || colorMap.blue;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden dark:bg-stone-300 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${bar}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
