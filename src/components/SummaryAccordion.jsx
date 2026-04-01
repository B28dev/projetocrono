import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SummaryAccordion({ summaries }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-2">
      {summaries.map((summary) => (
        <AccordionItem
          key={summary.id}
          summary={summary}
          isOpen={openId === summary.id}
          onToggle={() => setOpenId(openId === summary.id ? null : summary.id)}
        />
      ))}
    </div>
  );
}

function AccordionItem({ summary, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div className={`summary-item cyber-glass rounded-xl border backdrop-blur-md transition-colors duration-300 dark:shadow-sm ${
      isOpen
        ? 'border-white/20 bg-white/10 dark:border-stone-400 dark:bg-stone-50 cyberpunk:border-[#00e8ff]/40 cyberpunk:bg-white/10'
        : 'border-white/10 bg-white/5 hover:border-[#00e8ff]/30 hover:bg-white/10 dark:border-stone-300 dark:bg-stone-100/50 dark:hover:border-stone-400 dark:hover:bg-stone-50 cyberpunk:border-white/10 cyberpunk:bg-white/5 cyberpunk:hover:border-[#00e8ff]/30 cyberpunk:hover:bg-white/10'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-zinc-100 dark:text-stone-900 cyberpunk:font-display cyberpunk:text-white">{summary.title}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 dark:text-stone-500 flex-shrink-0 transition-transform duration-200 cyberpunk:text-[#00e8ff] ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 16 16"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div ref={bodyRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <ul className="px-4 pb-4 space-y-2">
          {summary.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 dark:text-stone-700 leading-relaxed cyberpunk:text-white/70">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 dark:bg-stone-400 flex-shrink-0 cyberpunk:bg-[#ff3ea5]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
