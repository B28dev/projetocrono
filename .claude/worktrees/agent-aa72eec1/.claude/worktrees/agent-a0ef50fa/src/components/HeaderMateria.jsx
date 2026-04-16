import { memo } from 'react';
import { CountdownFull } from './Countdown';

function formatDatePtBr(date) {
  if (!date) return '--/--/----';
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return '--/--/----';
  const day = String(parsed.getDate()).padStart(2, '0');
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const year = parsed.getFullYear();
  return `${day}/${month}/${year}`;
}

function HeaderMateria({
  title,
  userName,
  materiaAbreviada,
  examDate,
  shiftLabel,
}) {
  const examDateText = formatDatePtBr(examDate);

  return (
    <header className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00e8ff]">
            <span className="h-8 w-8 rounded-lg border border-cyan-500/35 bg-cyan-500/15 flex items-center justify-center font-bold">
              {materiaAbreviada}
            </span>
            Engenharia de Software · 2026/1 · {shiftLabel}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </h1>

          <p className="text-sm text-white/70">
            {userName ? `Ola, ${userName}.` : 'Ola, aluno(a).'}
          </p>

          <p className="text-sm text-white/70">
            Prova em{' '}
            <span className="font-semibold text-[#ff3ea5]">{examDateText}</span>
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#08080f]/70 backdrop-blur-md px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-[#00e8ff] font-mono mb-2">
            Proxima prova em
          </p>
          <CountdownFull target={examDate} />
        </div>
      </div>
    </header>
  );
}

export default memo(HeaderMateria);
