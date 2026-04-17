import { useCallback, useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotItem,
} from '../pilots/algorithmPilot.js';
import DisciplineStudyLayout from './DisciplineStudyLayout.jsx';
import StudyCycleExplanationCard from './StudyCycleExplanationCard.jsx';
import CycleProgressHeader from './CycleProgressHeader.jsx';
import AlgorithmSubjectOverview from './AlgorithmSubjectOverview.jsx';
import EligibleContentPanel from './EligibleContentPanel.jsx';
import AlgorithmPracticePanel from './AlgorithmPracticePanel.jsx';
import AlgorithmReviewPanel from './AlgorithmReviewPanel.jsx';
import AlgorithmResourcesPanel from './AlgorithmResourcesPanel.jsx';

const TABS = [
  { id: 'overview', icon: '🧭', label: 'Visão Geral' },
  { id: 'contents', icon: '📚', label: 'Conteúdos' },
  { id: 'practice', icon: '⚡', label: 'Prática' },
  { id: 'resources', icon: '🗂️', label: 'Recursos' },
];

export default function CronoLabAlgorithmPilot() {
  const [progressSnapshot, setProgressSnapshot] = useState(() => readAlgorithmPilotProgress());
  const [activeTab, setActiveTab] = useState('overview');
  
  const pilot = useMemo(() => getAlgorithmPilotData(progressSnapshot), [progressSnapshot]);

  const handleToggle = useCallback((itemId) => {
    const next = toggleAlgorithmPilotItem(itemId);
    setProgressSnapshot(next);
  }, []);

  const { subject, currentCycle, studyCycles, eligibleItems, comingNextItems, lockedItems, pilotNotice } = pilot;

  return (
    <DisciplineStudyLayout
      subject={subject}
      slug="algoritmo"
      tabs={TABS}
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    >
      {activeTab === 'overview' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <StudyCycleExplanationCard variant="content-based" />
          <AlgorithmSubjectOverview subject={subject} notice={pilotNotice} />
          <CycleProgressHeader
            currentCycle={currentCycle}
            totalCycles={studyCycles.length}
            progressPercent={subject.progressPercent}
            subjectStatus={subject.status}
            subjectRotationHint={subject.subjectRotationHint}
          />
        </div>
      )}

      {activeTab === 'contents' && (
        <div style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <EligibleContentPanel
            eligibleItems={eligibleItems}
            comingNextItems={comingNextItems}
            lockedItems={lockedItems}
            currentCycle={currentCycle}
            onToggle={handleToggle}
          />
        </div>
      )}

      {activeTab === 'practice' && (
        <div style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <AlgorithmPracticePanel practiceItems={pilot.practiceItems} />
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <AlgorithmResourcesPanel resourceItems={pilot.resourceItems} />
          <AlgorithmReviewPanel reviewItems={pilot.reviewItems} />
        </div>
      )}
    </DisciplineStudyLayout>
  );
}
