import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const DisciplineCatalogCard = memo(function DisciplineCatalogCard({ subject, slug }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/crono-lab/disciplinas/${slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/crono-lab/disciplinas/${slug}`);
        }
      }}
      className="group lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 shadow-xl backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-start justify-between gap-3">
          {/* Identity Icon/Badge */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]" aria-hidden="true">
            {subject.icon}
          </div>
          {/* Status Badge */}
          {subject.status && (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              {subject.status.replace('_', ' ')}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            {subject.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-3">
            {subject.description}
          </p>
        </div>

        {/* Informational Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.05]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity">
            Acessar disciplina
          </span>
          <svg className="w-4 h-4 text-cyan-500 opacity-60 translate-x-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
});

export default DisciplineCatalogCard;
