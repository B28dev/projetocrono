import { useCallback, useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotItem,
} from '../pilots/algorithmPilot.js';
import StudyCycleExplanationCard from './StudyCycleExplanationCard.jsx';
import CycleProgressHeader from './CycleProgressHeader.jsx';
import AlgorithmSubjectOverview from './AlgorithmSubjectOverview.jsx';
import EligibleContentPanel from './EligibleContentPanel.jsx';
import AlgorithmPracticePanel from './AlgorithmPracticePanel.jsx';
import AlgorithmReviewPanel from './AlgorithmReviewPanel.jsx';
import AlgorithmResourcesPanel from './AlgorithmResourcesPanel.jsx';

export default function CronoLabAlgorithmPilot() {
  const [progressSnapshot, setProgressSnapshot] = useState(() => readAlgorithmPilotProgress());
  const pilot = useMemo(() => getAlgorithmPilotData(progressSnapshot), [progressSnapshot]);

  const handleToggle = useCallback((itemId) => {
    const next = toggleAlgorithmPilotItem(itemId);
    setProgressSnapshot(next);
  }, []);

  const { subject, currentCycle, studyCycles, eligibleItems, comingNextItems, lockedItems, pilotNotice } = pilot;

  return (
    <div className="space-y-5 lg:space-y-6">

      {/* 1 — Explicação do ciclo */}
      <StudyCycleExplanationCard variant="content-based" />

      {/* 2 — Identidade da disciplina */}
      <AlgorithmSubjectOverview
        subject={subject}
        notice={pilotNotice}
      />

      {/* 3 — Header de progresso do ciclo */}
      <CycleProgressHeader
        currentCycle={currentCycle}
        totalCycles={studyCycles.length}
        progressPercent={subject.progressPercent}
        subjectStatus={subject.status}
        subjectRotationHint={subject.subjectRotationHint}
      />

      {/* 4 — Painel de conteúdos (3 zonas) */}
      <EligibleContentPanel
        eligibleItems={eligibleItems}
        comingNextItems={comingNextItems}
        lockedItems={lockedItems}
        currentCycle={currentCycle}
        onToggle={handleToggle}
      />

      {/* 5 — Prática + Recursos / Revisão */}
      <AlgorithmPracticePanel practiceItems={pilot.practiceItems} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <AlgorithmResourcesPanel resourceItems={pilot.resourceItems} />
        </div>
        <div className="xl:col-span-6">
          <AlgorithmReviewPanel reviewItems={pilot.reviewItems} />
        </div>
      </div>
    </div>
  );
}
