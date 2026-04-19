/**
 * @fileoverview CronoLab — Dashboard Raiz (Fase 1.5)
 *
 * Tela de centro de comando ("Dashboard Shell").
 * Estruturação full-width lateralizada pronta para receber múltiplos widgets
 * sem parecer centralizada. Integra os stores da Fase 1 num design de "Sistema Operacional".
 */

import { memo, useCallback, useMemo, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { useStudyStore } from '../gamification/stores/StudyStoreContext.jsx';
import { useProgressStore } from '../gamification/stores/ProgressStoreContext.jsx';
import { useGsapStagger } from '../hooks/useGsapReveal.js';
import { getSeverityLabel, getOldestDebtAge } from '../gamification/progression/backlogEngine.js';
import { getLocalDateString } from '../gamification/plan/dailyMissions.js';
import CronoLabMissionPanel from '../gamification/ui/CronoLabMissionPanel.jsx';
import CronoLabDebugControls from '../gamification/ui/CronoLabDebugControls.jsx';
import CronoLabEntrepreneurshipPilot from '../gamification/ui/CronoLabEntrepreneurshipPilot.jsx';
import CronoLabAlgorithmPilot from '../gamification/ui/CronoLabAlgorithmPilot.jsx';
import CronoLabSoftwareEngineeringPilot from '../gamification/ui/CronoLabSoftwareEngineeringPilot.jsx';
import DisciplineCatalogPage from '../gamification/ui/DisciplineCatalogPage.jsx';
import {
  CRONO_LAB_DEFAULT_SECTION,
  CRONO_LAB_NAV_ITEMS,
  getCronoLabSection,
  isValidCronoLabSection,
} from '../gamification/ui/cronoLabNavConfig.js';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const TOKEN = {
  pink: '#ff3ea5',
  cyan: '#00e8ff',
  surface: 'rgba(15,15,26,0.72)',
  surfaceStrong: 'rgba(15,15,26,0.84)',
  border: 'rgba(255,255,255,0.06)',
  borderSubtle: 'rgba(255,255,255,0.04)',
  muted: '#8c94bc',
  text: '#f0f0f8',
  textSoft: 'rgba(223,228,248,0.82)',
  bg: '#0d0d17',
};

// ─── MOMENTUM CONFIG ─────────────────────────────────────────────────────────

const MOMENTUM_CONFIG = {
  idle:     { label: 'Idle',     color: '#6b7098', icon: '💤' },
  warming:  { label: 'Warming',  color: '#fbbf24', icon: '🌡️' },
  momentum: { label: 'Momentum', color: '#00e8ff', icon: '⚡' },
  locked:   { label: 'Locked',   color: '#ff3ea5', icon: '🔒' },
};

const SEVERITY_COLORS = {
  none:     { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', text: '#34d399' },
  low:      { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
  medium:   { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)', text: '#f59e0b' },
  high:     { bg: 'rgba(239,68,68,0.10)',  border: 'rgba(239,68,68,0.28)',  text: '#f87171' },
  critical: { bg: 'rgba(255,62,165,0.12)', border: 'rgba(255,62,165,0.40)', text: '#ff3ea5' },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const StatCard = memo(function StatCard({ label, value, sub, accent, className = '', children }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl transition-shadow duration-300 ${className}`}
      style={{
        background: TOKEN.surface,
        border: `1px solid ${accent ? `${accent}35` : TOKEN.border}`,
        boxShadow: accent
          ? `0 0 0 1px ${accent}08, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`
          : '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {accent && (
        <div
          aria-hidden="true"
          className="absolute left-[15%] right-[15%] top-0 h-px opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
        />
      )}
      <div className="px-5 py-5 h-full flex flex-col">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accent ?? TOKEN.muted }}>
          {label}
        </p>
        <div className="mt-auto">
          {children ?? (
            <>
              <p className="font-display flex items-baseline gap-2 text-3xl font-bold tracking-tight text-zinc-100 leading-none">
                {value}
              </p>
              {sub && <p className="mt-2 text-xs leading-relaxed text-zinc-500">{sub}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

const BoolBadge = memo(function BoolBadge({ value, trueLabel = 'SIM', falseLabel = 'NÃO' }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
      style={{
        background: value ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        borderColor: value ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
        color: value ? '#34d399' : '#f87171',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: value ? '#34d399' : '#f87171', boxShadow: `0 0 8px ${value ? '#34d399' : '#f87171'}` }} />
      {value ? trueLabel : falseLabel}
    </span>
  );
});

function LevelBar({ percent, level }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          NÍVEL {level}
        </p>
        <p className="font-mono text-[10px] font-bold text-zinc-300">
          {percent}%
        </p>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="absolute bottom-0 left-0 top-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${TOKEN.pink}, ${TOKEN.cyan})`,
            boxShadow: `0 0 12px ${TOKEN.cyan}60`,
          }}
        />
      </div>
    </div>
  );
}


// ─── SIDEBAR & NAVEGAÇÃO ─────────────────────────────────────────────────────

function SidebarNavItem({ icon, label, to, active, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-cyan-500/18 bg-cyan-500/10 text-cyan-300 shadow-[0_10px_28px_rgba(0,0,0,0.14)]'
          : 'crono-lab-chip-soft border-transparent crono-lab-text-muted hover:text-zinc-100'
      }`}
    >
      <span className="text-lg opacity-80 saturate-50">{icon}</span>
      {label}
    </NavLink>
  );
}

function PlaceholderSection({ section }) {
  return (
    <div className="crono-lab-surface crono-lab-border-soft crono-lab-panel-shadow lab-card overflow-hidden rounded-2xl border p-6 backdrop-blur-xl lg:p-8">
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
        {section.label}
      </p>
      <h2 className="font-display text-2xl font-bold tracking-tight text-white">
        {section.title}
      </h2>
      <p className="crono-lab-text-muted mt-3 max-w-2xl text-sm leading-relaxed">
        {section.description}
      </p>
      <div className="crono-lab-card-mist crono-lab-border-mist mt-8 rounded-2xl border border-dashed px-5 py-10 text-center">
        <p className="crono-lab-text-secondary text-sm font-semibold">
          Esta área já responde ao clique e está pronta para receber conteúdo real.
        </p>
        <p className="crono-lab-text-faint mt-2 text-xs leading-relaxed">
          O laboratório agora tem navegação funcional. O próximo passo é plugar a engine específica desta seção sem tocar no hub principal.
        </p>
      </div>
    </div>
  );
}



const DashboardSidebar = memo(function DashboardSidebar({ isOpen, onClose, activeSectionId }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="crono-lab-backdrop fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`crono-lab-sidebar crono-lab-shell-shadow fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r crono-lab-border-subtle transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          
          {/* Brand */}
          <div className="px-6 py-6 lg:py-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 p-px shadow-lg shadow-cyan-500/20">
                <div className="crono-lab-brand-core flex h-full w-full items-center justify-center rounded-[11px] font-mono text-[11px] font-bold text-white">
                  CR
                </div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Projeto<span className="crono-lab-inline-faint">Crono</span>
              </span>
            </div>
            
            {/* Mobile close button */}
            <button
              className="crono-lab-text-faint crono-lab-chip-soft lg:hidden rounded-lg border p-2 transition-colors hover:text-white"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-white/10">
          <p className="crono-lab-text-faint mb-3 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            Navegação
          </p>
          <nav className="space-y-1">
            {CRONO_LAB_NAV_ITEMS.slice(0, -1).map((item) => (
              <SidebarNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                to={`/crono-lab/${item.id}`}
                active={activeSectionId === item.id}
                onNavigate={onClose}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="crono-lab-border-subtle border-t px-4 py-6">
          <SidebarNavItem
            icon={CRONO_LAB_NAV_ITEMS[CRONO_LAB_NAV_ITEMS.length - 1].icon}
            label={CRONO_LAB_NAV_ITEMS[CRONO_LAB_NAV_ITEMS.length - 1].label}
            to={`/crono-lab/${CRONO_LAB_NAV_ITEMS[CRONO_LAB_NAV_ITEMS.length - 1].id}`}
            active={activeSectionId === CRONO_LAB_NAV_ITEMS[CRONO_LAB_NAV_ITEMS.length - 1].id}
            onNavigate={onClose}
          />
          <div className="mt-4 px-4">
            <p className="crono-lab-text-faint font-mono text-[9px] uppercase tracking-widest">
              Versão 2.0.0-alpha
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
});

// ─── TOPBAR ───────────────────────────────────────────────────────────────────

function DashboardTopbar({ momentum, dateLabel, onOpenSidebar, sectionTitle }) {
  return (
    <header className="crono-lab-topbar crono-lab-panel-shadow sticky top-0 z-30 flex items-center justify-between border-b crono-lab-border-subtle px-4 py-4 backdrop-blur-xl lg:px-10 lg:py-5">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenSidebar}
          className="crono-lab-chip-soft crono-lab-text-muted lg:hidden rounded-lg border p-2 transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <h1 className="font-display text-lg lg:text-2xl font-bold tracking-tight text-white">
          {sectionTitle}
        </h1>
        <span className="hidden sm:inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-pink-400">
          Fase 1.5
        </span>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="crono-lab-text-faint font-mono text-[10px] uppercase tracking-widest">Status</span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
            Online
          </span>
        </div>
        <div className="crono-lab-divider-soft hidden h-8 w-px sm:block" />
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide transition-colors"
            style={{
              background: `${momentum.color}15`,
              borderColor: `${momentum.color}30`,
              color: momentum.color,
            }}
          >
            <span>{momentum.icon}</span>
            <span className="hidden sm:inline">{momentum.label}</span>
          </div>
          <span className="crono-lab-text-faint hidden font-mono text-[10px] tracking-widest md:block">
            {dateLabel}
          </span>
        </div>
      </div>
    </header>
  );
}

// ─── MAIN PAGE (ROOT DASHBOARD) ────────────────────────────────────────────────

export default function CronoLab() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { section, slug } = useParams();
  const resolvedSectionId = section ?? CRONO_LAB_DEFAULT_SECTION;
  const activeSection = getCronoLabSection(resolvedSectionId);
  const isInvalidSection = !isValidCronoLabSection(resolvedSectionId);
  
  const isDisciplineInnerPage = activeSection.id === 'disciplinas' && Boolean(slug);
  const { missions, missionItems, loadingState, contentItems } = useStudyStore();
  const {
    userProgress,
    streakState,
    backlogState,
    levelProgress,
    todayProgress,
    isActiveDayNow,
    isCleanDayNow,
    momentumState,
    applyResolvedMissionAttempt,
    refreshBacklog,
  } = useProgressStore();

  // Animates items arriving to the dashboard
  const gridRef = useGsapStagger('.lab-card', { stagger: 0.05, delay: 0.1 });

  const todayMission = missions[0] ?? null;
  const todayItems = useMemo(
    () => (todayMission ? missionItems.filter((i) => i.dailyMissionId === todayMission.id) : []),
    [missionItems, todayMission],
  );

  const momentum = MOMENTUM_CONFIG[momentumState] ?? MOMENTUM_CONFIG.idle;
  const severity = backlogState?.debtSeverity ?? 'none';
  const severityStyle = SEVERITY_COLORS[severity] ?? SEVERITY_COLORS.none;
  const debtAge = backlogState ? getOldestDebtAge(backlogState) : 0;

  // ── Simulation handlers ─

  const handleSimulateValidation = useCallback(() => {
    if (!todayItems[0]) return;
    const item = todayItems[0];
    const content = contentItems.find((c) => c.id === item.contentItemId);
    if (!content) return;

    applyResolvedMissionAttempt({
      rawAttempt: {
        id: `sim-${Date.now()}`,
        missionItemId: item.id,
        contentItemId: content.id,
        attemptType: 'flashcard_flip',
        validationKind: content.interactionType === 'theory' ? 'theory' : 'flashcard',
        answeredBeforeReveal: true,
        selfAssessment: content.interactionType === 'theory' ? 'theory_done' : 'good',
        detectedAsSpeedClick: false,
        xpGranted: 0,
        needsReinforcement: false,
        attemptedAt: new Date().toISOString(),
        validationSource: content.validationMode ?? null,
        resultTier: 'validated',
        feedbackKey: 'validated',
        isValidatedExecution: true,
      },
      missionItem: item,
      contentItem: content,
    });
  }, [todayItems, contentItems, applyResolvedMissionAttempt]);

  const handleSimulateBreakStreak = useCallback(() => {
    alert('[Sistema] Streak break: Passe um dia sem validar para quebrar a ofensiva naturalmente. O engine de data faz isso silenciosamente.');
  }, []);

  const handleSimulateBacklog = useCallback(() => {
    refreshBacklog();
  }, [refreshBacklog]);

  const handleReset = useCallback(() => {
    if (!confirm('Nuclear reset? Isso apaga todo o progresso simulado.')) return;
    const KEYS = ['crono_user_progress_v1', 'crono_streak_v1', 'crono_backlog_v1', 'crono_today_mission_v1', 'crono_mission_items_v1', 'crono_attempts_v1', 'crono_xp_ledger_v1'];
    KEYS.forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }, []);

  const renderSectionContent = () => {
    if (activeSection.id === 'dashboard') {
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
            <StatCard className="lab-card" label="Experiência Total" accent={TOKEN.cyan}>
              <p className="font-display text-4xl lg:text-[40px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-cyan-600">
                {userProgress?.totalXp?.toLocaleString('pt-BR') ?? '0'}
              </p>
              <div className="mt-5 w-full">
                <LevelBar percent={levelProgress?.percent ?? 0} level={levelProgress?.level ?? 1} />
                <div className="crono-lab-text-faint mt-2 flex items-center justify-between text-[11px] font-medium">
                  <span>+{userProgress?.xpToday ?? 0} XP hoje</span>
                  <span>{levelProgress?.xpInLevel ?? 0} / {levelProgress?.xpForNextLevel ?? 0} XP</span>
                </div>
              </div>
            </StatCard>

            <StatCard className="lab-card" label="Ofensiva" accent={TOKEN.pink}>
              <div className="flex items-baseline gap-2">
                <p className="font-display text-4xl lg:text-[40px] font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-rose-600">
                  {streakState?.currentStreak ?? 0}
                </p>
                <span className="crono-lab-text-faint text-sm font-medium">dias</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="crono-lab-text-muted text-xs">Recorde: {streakState?.highestStreak ?? 0}</p>
                <span className="crono-lab-chip-soft crono-lab-text-secondary rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold">
                  {streakState?.streakMultiplier?.toFixed(1) ?? '1.0'}X XP
                </span>
              </div>
            </StatCard>

            <StatCard className="lab-card" label="Acumulado (Backlog)">
              <div className="flex items-baseline gap-2">
                <p className="font-display text-4xl lg:text-[40px] font-black tracking-tight leading-none" style={{ color: severityStyle.text }}>
                  {backlogState?.totalDebtItems ?? 0}
                </p>
                <span className="crono-lab-text-faint text-sm font-medium">itens</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="crono-lab-text-muted truncate pr-2 text-xs">
                  {debtAge > 0 ? `Dívida ativa: ${debtAge}d` : 'Clean'}
                </p>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: severityStyle.bg, borderColor: severityStyle.border, color: severityStyle.text }}
                >
                  {getSeverityLabel(severity)}
                </span>
              </div>
            </StatCard>

            <StatCard className="lab-card" label="Progresso de Hoje">
              <div className="flex items-baseline gap-2 mb-4">
                <p className="font-display text-4xl lg:text-[40px] font-black tracking-tight leading-none text-zinc-100">
                  {todayProgress?.done ?? 0}
                </p>
                <span className="crono-lab-text-faint text-lg font-medium">/ {todayProgress?.total ?? 0}</span>
              </div>
              <div className="mt-auto">
                <div className="crono-lab-status-rail h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full transition-all duration-700 ease-out rounded-full"
                    style={{
                      width: `${todayProgress?.percent ?? 0}%`,
                      background: `linear-gradient(90deg, ${TOKEN.pink}, ${TOKEN.cyan})`,
                    }}
                  />
                </div>
                <p className="crono-lab-text-faint mt-3 text-xs font-medium">
                  {todayProgress?.validationsToday ?? 0} validações reais realizadas
                </p>
              </div>
            </StatCard>
          </div>

          <div className="crono-lab-surface crono-lab-border-soft crono-lab-panel-shadow lab-card overflow-hidden rounded-2xl border p-5 backdrop-blur-xl md:p-6 lg:p-8">
            <p className="crono-lab-text-faint mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              Hub Tático de Sensores
            </p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="crono-lab-text-faint mb-2.5 text-[11px] font-medium">Comportamento Geral</p>
                <div className="crono-lab-card-mist crono-lab-border-subtle flex items-center gap-2 rounded-lg border px-3.5 py-2">
                  <span className="text-sm opacity-80">{momentum.icon}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: momentum.color }}>
                    {momentum.label}
                  </span>
                </div>
              </div>
              <div>
                <p className="crono-lab-text-faint mb-2.5 text-[11px] font-medium">Check In Diário</p>
                <BoolBadge value={isActiveDayNow} trueLabel="Ofensiva Salva" falseLabel="Em Risco" />
              </div>
              <div>
                <p className="crono-lab-text-faint mb-2.5 text-[11px] font-medium">Meta + Limpeza</p>
                <BoolBadge value={isCleanDayNow} trueLabel="Dia Perfeito" falseLabel="Pendente" />
              </div>
              <div>
                <p className="crono-lab-text-faint mb-2.5 text-[11px] font-medium">Peso do Acumulado</p>
                <span
                  className="inline-block rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: severityStyle.bg, borderColor: severityStyle.border, color: severityStyle.text }}
                >
                  {getSeverityLabel(severity)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8 flex flex-col">
              <CronoLabMissionPanel
                todayMission={todayMission}
                todayItems={todayItems}
                contentItems={contentItems}
                loadingState={loadingState}
                embedded
              />
            </div>

            <div className="lg:col-span-4 flex flex-col">
              <CronoLabDebugControls
                onSimulateValidation={handleSimulateValidation}
                onSimulateBreakStreak={handleSimulateBreakStreak}
                onSimulateBacklog={handleSimulateBacklog}
                onReset={handleReset}
              />
            </div>
          </div>
        </>
      );
    }

    if (activeSection.id === 'missao') {
      return (
        <div className="space-y-6">
          <div className="crono-lab-surface-strong crono-lab-border-soft crono-lab-panel-shadow-strong lab-card overflow-hidden rounded-2xl border p-6 backdrop-blur-xl lg:p-8">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Missão Diária
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Abrir a disciplina certa e agir
            </h2>
            <p className="crono-lab-text-soft mt-3 max-w-2xl text-sm leading-relaxed">
              Primeiro a frente prioritária. Depois o que existe dentro dela.
            </p>
          </div>

          <CronoLabMissionPanel
            todayMission={todayMission}
            todayItems={todayItems}
            contentItems={contentItems}
            loadingState={loadingState}
          />
        </div>
      );
    }

    if (activeSection.id === 'disciplinas') {
      if (!slug) {
        return <DisciplineCatalogPage />;
      }

      if (slug === 'algoritmo') {
        return <CronoLabAlgorithmPilot />;
      }

      if (slug === 'empreendedorismo') {
        return <CronoLabEntrepreneurshipPilot />;
      }

      if (slug === 'engenharia-software') {
        return <CronoLabSoftwareEngineeringPilot />;
      }

      return <Navigate to="/crono-lab/disciplinas" replace />;
    }

    return <PlaceholderSection section={activeSection} />;
  };

  // ── Loading / Error states ─

  if (isInvalidSection) {
    return <Navigate to={`/crono-lab/${CRONO_LAB_DEFAULT_SECTION}`} replace />;
  }

  if (loadingState === 'loading') {
    return (
      <div className="crono-lab-loading flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-500/20 border-t-pink-500" />
      </div>
    );
  }

  // ── Layout Shell ─

  return (
    <div className="crono-lab-shell crono-lab-shell-breathable crono-lab-shell-open crono-lab-shell-calm crono-lab-shell-fixed flex min-h-screen w-full overflow-hidden font-inter text-zinc-100">

      {/* ── SIDEBAR ── */}
      {!isDisciplineInnerPage && (
        <DashboardSidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSectionId={activeSection.id}
        />
      )}

      {/* ── MAIN AREA ── */}
      <main className="crono-lab-shell-layer relative flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden">

        {/* Visual Background Pattern */}
        <div className="crono-lab-atmosphere crono-lab-atmosphere-fixed crono-lab-atmosphere-subtle crono-lab-supportive-background crono-lab-page-glow pointer-events-none absolute inset-0" />
        <div className="crono-lab-center-haze crono-lab-supportive-background pointer-events-none absolute inset-0" />
        <div className="crono-lab-ambient-depth crono-lab-supportive-background pointer-events-none absolute inset-0" />
        <div className="crono-lab-upper-bloom crono-lab-supportive-background pointer-events-none absolute inset-0" />
        <div className="crono-lab-overlay-glow crono-lab-supportive-background pointer-events-none absolute inset-0" />

        <div className="crono-lab-content-dominant relative z-10 flex min-h-screen flex-1 flex-col">


        {/* ── TOPBAR ── */}
        {!isDisciplineInnerPage && (
          <DashboardTopbar
            momentum={momentum}
            dateLabel={getLocalDateString()}
            onOpenSidebar={() => setIsMobileMenuOpen(true)}
            sectionTitle={activeSection.title}
          />
        )}

        {/* ── SCROLLABLE GRID CONTAINER ── */}
        <div className={`relative z-10 w-full flex-1 mx-auto ${isDisciplineInnerPage ? 'max-w-none p-0' : 'max-w-[1600px] px-4 py-6 md:px-8 md:py-8 lg:p-10'}`}>
          
          <div ref={gridRef} className={isDisciplineInnerPage ? 'h-full flex flex-col' : 'space-y-6 lg:space-y-8'}>
            {renderSectionContent()}
          </div>
          
          {/* Footer brand */}
          <div className="mt-16 mb-8 text-center opacity-60 lg:mt-24">
             <p className="crono-lab-footer font-mono text-[9px] uppercase tracking-[0.25em]">
               PROJETO CRONO • SISTEMAS OPERACIONAIS DE ESTUDO
             </p>
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
