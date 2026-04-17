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

const TABS = [
  { id: 'overview', icon: '🧭', label: 'Visão Geral' },
  { id: 'contents', icon: '📚', label: 'Conteúdos' },
  { id: 'active_study', icon: '⚡', label: 'Estudo Ativo' },
  { id: 'resources', icon: '🗂️', label: 'Recursos' },
];

export default function CronoLabEntrepreneurshipPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getEntrepreneurshipPilotData({ shift }), [shift]);
  const [activeTab, setActiveTab] = useState('overview');

  const subject = {
    title: 'Empreendedorismo',
    status: 'em_execucao'
  };

  return (
    <DisciplineStudyLayout
      subject={subject}
      slug="empreendedorismo"
      tabs={TABS}
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    >
      {activeTab === 'overview' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <NextActionPanel nextAction={pilot.nextAction} />
          <SubjectBacklogPanel recovery={pilot.recovery} />
          <StudyCycleExplanationCard variant="date-based" />
          <CronoLabSubjectOverview overview={pilot.overview} recovery={pilot.recovery} />
        </div>
      )}

      {activeTab === 'contents' && (
        <div className="lab-card overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-6 lg:p-8 backdrop-blur-xl shadow-xl flex items-center justify-center min-h-[300px]" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <div className="text-center">
            <span className="text-4xl mb-4 block opacity-50">📚</span>
            <h3 className="text-lg font-bold text-white mb-2">Trilha de Conteúdo</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Esta disciplina opera primariamente por priorização de datas. A grade completa de conteúdos sequenciais será importada em breve.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'active_study' && (
        <div style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <ActiveStudyPanel activeStudy={pilot.activeStudy} />
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <StudyResourcesPanel resources={pilot.resources} />
          <SubjectSummaryPanel extraContext={pilot.extraContext} />
        </div>
      )}
    </DisciplineStudyLayout>
  );
}
