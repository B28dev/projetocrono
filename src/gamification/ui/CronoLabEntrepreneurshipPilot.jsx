import { useState, useMemo } from 'react';
import { getEntrepreneurshipPilotData } from '../pilots/entrepreneurshipPilot.js';
import DisciplineStudyLayout from './DisciplineStudyLayout.jsx';
import StudyCycleExplanationCard from './StudyCycleExplanationCard.jsx';
import CronoLabSubjectOverview from './CronoLabSubjectOverview.jsx';
import NextActionPanel from './NextActionPanel.jsx';
import SubjectBacklogPanel from './SubjectBacklogPanel.jsx';
import StudyResourcesPanel from './StudyResourcesPanel.jsx';
import ActiveStudyPanel from './ActiveStudyPanel.jsx';
import SubjectSummaryPanel from './SubjectSummaryPanel.jsx';

// 2 abas no nível 1 — Estudo Ativo e Recursos vivem dentro de Conteúdos
const TABS = [
  { id: 'overview', icon: '🧭', label: 'Visão Geral' },
  { id: 'contents', icon: '📚', label: 'Conteúdos'  },
];

export default function CronoLabEntrepreneurshipPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getEntrepreneurshipPilotData({ shift }), [shift]);
  const [activeTab, setActiveTab] = useState('overview');

  const subject = { title: 'Empreendedorismo', status: 'em_execucao' };

  return (
    <DisciplineStudyLayout
      subject={subject}
      slug="empreendedorismo"
      tabs={TABS}
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    >
      {/* ── ABA: VISÃO GERAL ── */}
      {activeTab === 'overview' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          {/* Próxima ação e backlog ficam no topo como blocos de comando */}
          <NextActionPanel nextAction={pilot.nextAction} />
          <SubjectBacklogPanel recovery={pilot.recovery} />
          <StudyCycleExplanationCard variant="date-based" />
          <CronoLabSubjectOverview overview={pilot.overview} recovery={pilot.recovery} />
        </div>
      )}

      {/* ── ABA: CONTEÚDOS — estudo ativo + recursos integrados ── */}
      {activeTab === 'contents' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <ActiveStudyPanel activeStudy={pilot.activeStudy} />
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <StudyResourcesPanel resources={pilot.resources} />
            <SubjectSummaryPanel extraContext={pilot.extraContext} />
          </div>
        </div>
      )}
    </DisciplineStudyLayout>
  );
}
