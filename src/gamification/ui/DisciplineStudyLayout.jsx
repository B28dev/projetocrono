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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="flex min-h-screen w-full relative bg-[#05050A]/30">
      


      {/* ── MOBILE BACKDROP ── */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── SIDEBAR (Internal Subject Menu) ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-[280px] flex-col border-r border-white/[0.06] bg-[#0A0A12]/95 shadow-2xl transition-transform duration-300 lg:static lg:flex lg:w-[280px] lg:shrink-0 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Header da Sidebar */}
          <div className="px-5 py-6 lg:px-6 lg:py-8">
            <button
              onClick={() => navigate('/crono-lab/disciplinas')}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white mb-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar ao Catálogo
            </button>

            {/* Mobile close */}
            <div className="flex lg:hidden justify-between items-center mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-500/80 mb-2">
                Disciplina Ativa
              </p>
              <h1 className="font-display text-xl lg:text-2xl font-bold tracking-tight text-white leading-tight">
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
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* ── MOBILE HEADER (Moved inside main to respect layout flow) ── */}
        <div className="sticky top-0 w-full z-40 flex items-center justify-between border-b border-white/[0.06] p-4 lg:hidden bg-[#0A0A12]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/crono-lab/disciplinas')}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <span className="text-sm font-bold text-white truncate max-w-[180px]">{subject.title}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 p-2 text-cyan-400 bg-cyan-500/10 rounded-lg"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">Ações</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="w-full max-w-none px-4 py-20 lg:py-8 lg:px-6 xl:px-8 space-y-6 lg:space-y-8">
          {children}
          
          <div className="mt-16 text-center opacity-40 pb-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">PROJETO CRONO • NÍVEL 2</p>
          </div>
        </div>
      </main>

    </div>
  );
}
