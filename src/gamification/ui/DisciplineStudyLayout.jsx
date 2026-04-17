import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DisciplineSidebarItem = memo(function DisciplineSidebarItem({ tab, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(tab.id)}
      aria-current={isActive ? 'page' : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
        isActive
          ? 'bg-cyan-500/10 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(0,232,255,0.2)]'
          : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
      }`}
    >
      <span className={`text-[1.1rem] transition-transform duration-300 group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-70 saturate-50'}`} aria-hidden="true">
        {tab.icon}
      </span>
      <span className="truncate">{tab.label}</span>
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" style={{ boxShadow: '0 0 8px #00e8ff' }} />
      )}
    </button>
  );
});

export default function DisciplineStudyLayout({ subject, slug, tabs, activeTab, onChangeTab, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fecha menu mobile ao trocar de aba
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div
      className="flex flex-col lg:flex-row w-full lg:h-[calc(100vh-160px)] lg:min-h-[600px] rounded-[24px] lg:rounded-[32px] border border-white/[0.06] bg-[#0A0A12]/90 backdrop-blur-2xl shadow-2xl relative"
      style={{ animation: 'animationIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      {/* ── MOBILE HEADER (apenas < lg) ── */}
      <div className="flex items-center justify-between border-b border-white/[0.06] p-4 lg:hidden shrink-0 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/crono-lab/disciplinas')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 active:bg-white/10"
            aria-label="Voltar para catálogo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-500/80">Sala de Estudo</p>
            <h2 className="text-sm font-bold text-white truncate max-w-[180px]">{subject.title}</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
          aria-label="Menu da disciplina"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
      </div>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── SIDEBAR (Mobile Drawer + Desktop Fixed) ── */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[280px] flex-col border-l lg:border-l-0 lg:border-r border-white/[0.06] bg-[#0E0E17]/95 lg:bg-transparent shadow-2xl lg:shadow-none transition-transform duration-300 lg:static lg:flex lg:w-[260px] lg:shrink-0 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Header da Sidebar (Botão Voltar) */}
          <div className="px-5 py-6 lg:px-6 lg:py-6">
            <button
              onClick={() => navigate('/crono-lab/disciplinas')}
              className="group hidden lg:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar ao Catálogo
            </button>

            {/* No mobile, botão de fechar */}
            <div className="flex lg:hidden justify-between items-center mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Identidade da Disciplina */}
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-500/80">
                Disciplina Ativa
              </p>
              <h1 className="mt-1 font-display text-xl lg:text-lg font-bold tracking-tight text-white leading-tight">
                {subject.title}
              </h1>
            </div>
          </div>

          {/* Navegação de Abas */}
          <nav className="flex-1 px-3 py-2 space-y-1">
            {tabs.map((tab) => (
              <DisciplineSidebarItem
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={onChangeTab}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 overflow-y-auto bg-transparent scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent h-full lg:h-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
