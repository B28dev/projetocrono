import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function findTabPath(tabs, targetId, trail = []) {
  for (const tab of tabs) {
    const nextTrail = [...trail, tab.id];

    if (tab.id === targetId) return nextTrail;

    if (tab.children?.length) {
      const childTrail = findTabPath(tab.children, targetId, nextTrail);
      if (childTrail) return childTrail;
    }
  }

  return null;
}

function findTabById(tabs, targetId) {
  for (const tab of tabs) {
    if (tab.id === targetId) return tab;
    if (tab.children?.length) {
      const child = findTabById(tab.children, targetId);
      if (child) return child;
    }
  }

  return null;
}

function branchContainsActive(tab, activeTab) {
  if (tab.id === activeTab) return true;
  return Boolean(tab.children?.some((child) => branchContainsActive(child, activeTab)));
}

function SidebarTreeItem({
  tab,
  depth,
  activeTab,
  expandedIds,
  onSelect,
  onToggleExpand,
}) {
  const hasChildren = Array.isArray(tab.children) && tab.children.length > 0;
  const isExpanded = expandedIds.has(tab.id);
  const isActive = activeTab === tab.id;
  const isActiveBranch = branchContainsActive(tab, activeTab);
  const Icon = tab.icon;

  return (
    <div className={depth > 0 ? 'pl-4' : ''}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(tab.id)}
          aria-current={isActive ? 'page' : undefined}
          className={`group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
            isActive
              ? 'bg-cyan-500/12 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(0,232,255,0.22),0_0_24px_rgba(0,232,255,0.08)]'
              : isActiveBranch
                ? 'bg-white/[0.05] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]'
                : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.95rem] transition-all duration-300 ${
              isActive
                ? 'border-cyan-400/30 bg-cyan-500/14 text-cyan-200'
                : isActiveBranch
                  ? 'border-white/10 bg-white/[0.05] text-white/85'
                  : 'border-white/[0.06] bg-white/[0.03] text-white/55 group-hover:text-white/80'
            }`}
            aria-hidden="true"
          >
            {Icon ? Icon : depth > 1 ? '•' : '◦'}
          </span>

          <span className="min-w-0 truncate">{tab.label}</span>

          {isActive && (
            <span
              className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
              aria-hidden="true"
              style={{ boxShadow: '0 0 10px #00e8ff' }}
            />
          )}
        </button>

        {hasChildren && (
          <button
            type="button"
            onClick={() => onToggleExpand(tab.id)}
            aria-label={isExpanded ? `Recolher ${tab.label}` : `Expandir ${tab.label}`}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              isActiveBranch
                ? 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200'
                : 'border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <div className={`grid transition-all duration-300 ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="mt-2 space-y-2 border-l border-white/[0.05] pl-3">
              {tab.children.map((child) => (
                <SidebarTreeItem
                  key={child.id}
                  tab={child}
                  depth={depth + 1}
                  activeTab={activeTab}
                  expandedIds={expandedIds}
                  onSelect={onSelect}
                  onToggleExpand={onToggleExpand}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DisciplineStudyLayout({ subject, tabs, activeTab, onChangeTab, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const activePath = useMemo(() => findTabPath(tabs, activeTab) ?? [], [tabs, activeTab]);
  const activePathKey = activePath.join('>');
  const activeTabMeta = useMemo(() => findTabById(tabs, activeTab) ?? tabs[0] ?? null, [tabs, activeTab]);

  const [expandedIds, setExpandedIds] = useState(() => new Set(activePath.slice(0, -1)));

  useEffect(() => {
    setExpandedIds((current) => {
      const next = new Set(current);
      activePath.slice(0, -1).forEach((id) => next.add(id));
      return next;
    });
    setIsMobileMenuOpen(false);
  }, [activePathKey, activePath]);

  const handleToggleExpand = (tabId) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(tabId)) {
        next.delete(tabId);
      } else {
        next.add(tabId);
      }
      return next;
    });
  };

  const handleSelectTab = (tabId) => {
    onChangeTab(tabId);

    const clickedTab = findTabById(tabs, tabId);
    if (clickedTab?.children?.length) {
      setExpandedIds((current) => {
        const next = new Set(current);
        next.add(tabId);
        return next;
      });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full bg-[#05050A]/30">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-[296px] flex-col border-r border-white/[0.06] bg-[#0A0A12]/95 shadow-2xl transition-transform duration-300 lg:static lg:flex lg:w-[296px] lg:shrink-0 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="px-5 py-6 lg:px-6 lg:py-8">
            <button
              type="button"
              onClick={() => navigate('/crono-lab/disciplinas')}
              className="group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Voltar ao Catálogo
            </button>

            <div className="mb-6 flex items-center justify-between lg:hidden">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Navegação</span>
              <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div>
              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-500/80">
                Disciplina Ativa
              </p>
              <h1 className="font-display text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">
                {subject.title}
              </h1>
              {subject.subtitle && (
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {subject.subtitle}
                </p>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-3 py-2">
            {tabs.map((tab) => (
              <SidebarTreeItem
                key={tab.id}
                tab={tab}
                depth={0}
                activeTab={activeTab}
                expandedIds={expandedIds}
                onSelect={handleSelectTab}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex h-screen min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-white/[0.06] bg-[#0A0A12]/95 p-4 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/crono-lab/disciplinas')}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">{subject.title}</span>
              {activeTabMeta && (
                <span className="block truncate text-[11px] text-zinc-500">{activeTabMeta.label}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/10 p-2 text-cyan-400"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-none space-y-6 px-4 py-20 lg:space-y-8 lg:px-6 lg:py-8 xl:px-8">
          {children}

          <div className="mt-16 pb-10 text-center opacity-40">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">PROJETO CRONO • NÍVEL 2</p>
          </div>
        </div>
      </main>
    </div>
  );
}
