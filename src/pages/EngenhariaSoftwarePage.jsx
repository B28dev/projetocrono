import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelUpModal from '../components/LevelUpModal';
import { readStorage, writeStorage } from '../gamification/persistence.js';
import DashboardShell from './engenharia-software/DashboardShell.jsx';
import PageHeader from './engenharia-software/PageHeader.jsx';
import FirstFold from './engenharia-software/FirstFold.jsx';
import ContextGrid from './engenharia-software/ContextGrid.jsx';
import SecondaryStack from './engenharia-software/SecondaryStack.jsx';
import DetailsSection from './engenharia-software/DetailsSection.jsx';
import InsightDrawer from './engenharia-software/InsightDrawer.jsx';
import { getSoftwareEngineeringDashboardViewModel } from './engenharia-software/dashboardViewModel.js';

const UI_STATE_KEY = 'engsoftware-overview-ui-v1';

export default function EngenhariaSoftwarePage({
  shift = 'noturno-adele',
  shiftLabel = 'Noturno (Adele)',
}) {
  const navigate = useNavigate();
  const [uiState, setUiState] = useState(() => readStorage(UI_STATE_KEY, {
    selectedPeriodKey: '14d',
    openPanelId: null,
    pendingFilter: 'all',
    expandedPendingGroups: [],
    expandedTimelineEventId: null,
    expandedBottleneckId: null,
  }));

  useEffect(() => {
    writeStorage(UI_STATE_KEY, uiState);
  }, [uiState]);

  const viewModel = useMemo(
    () => getSoftwareEngineeringDashboardViewModel({
      shift,
      shiftLabel,
      selectedPeriodKey: uiState.selectedPeriodKey,
    }),
    [shift, shiftLabel, uiState.selectedPeriodKey],
  );

  const activePanel = uiState.openPanelId ? viewModel.detailPanels[uiState.openPanelId] : null;

  return (
    <>
      <DashboardShell>
        <PageHeader header={viewModel.header} onBack={() => navigate('/dashboard')} />
        <FirstFold
          firstFold={viewModel.firstFold}
          onOpenPanel={(panelId) => setUiState((current) => ({ ...current, openPanelId: panelId }))}
        />
        <ContextGrid
          contextGrid={viewModel.contextGrid}
          periodOptions={viewModel.periodOptions}
          selectedPeriodKey={uiState.selectedPeriodKey}
          onChangePeriod={(periodKey) => setUiState((current) => ({ ...current, selectedPeriodKey: periodKey }))}
          onOpenPanel={(panelId) => setUiState((current) => ({ ...current, openPanelId: panelId }))}
          expandedBottleneckId={uiState.expandedBottleneckId}
          onToggleBottleneck={(bottleneckId) => setUiState((current) => ({
            ...current,
            expandedBottleneckId: current.expandedBottleneckId === bottleneckId ? null : bottleneckId,
          }))}
        />
        <SecondaryStack
          sections={viewModel.secondarySections}
          periodOptions={viewModel.periodOptions}
          selectedPeriodKey={uiState.selectedPeriodKey}
          onChangePeriod={(periodKey) => setUiState((current) => ({ ...current, selectedPeriodKey: periodKey }))}
          priorityFilterOptions={viewModel.priorityFilterOptions}
          pendingFilter={uiState.pendingFilter}
          onChangePendingFilter={(pendingFilter) => setUiState((current) => ({ ...current, pendingFilter }))}
          expandedPendingGroups={uiState.expandedPendingGroups}
          onTogglePendingGroup={(groupId) => setUiState((current) => ({
            ...current,
            expandedPendingGroups: current.expandedPendingGroups.includes(groupId)
              ? current.expandedPendingGroups.filter((id) => id !== groupId)
              : [...current.expandedPendingGroups, groupId],
          }))}
          focusTargets={viewModel.focusTargets}
          expandedTimelineEventId={uiState.expandedTimelineEventId}
          onToggleTimelineEvent={(eventId) => setUiState((current) => ({
            ...current,
            expandedTimelineEventId: current.expandedTimelineEventId === eventId ? null : eventId,
          }))}
          onOpenPanel={(panelId) => setUiState((current) => ({ ...current, openPanelId: panelId }))}
        />
        <DetailsSection details={viewModel.details} />
      </DashboardShell>
      <InsightDrawer
        isOpen={Boolean(activePanel)}
        title={activePanel?.title}
        subtitle={activePanel?.subtitle}
        items={activePanel?.items}
        onClose={() => setUiState((current) => ({ ...current, openPanelId: null }))}
      />
      <LevelUpModal
        level={12}
        title="Mestre em Engenharia de Software"
        message="Voce dominou todos os topicos desta fase. Continue avancando."
      />
    </>
  );
}
