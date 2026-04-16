import { useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotItem,
} from '../pilots/algorithmPilot.js';
import AlgorithmSubjectOverview from './AlgorithmSubjectOverview.jsx';
import CurrentStudyCyclePanel from './CurrentStudyCyclePanel.jsx';
import EligibleContentPanel from './EligibleContentPanel.jsx';
import AlgorithmPracticePanel from './AlgorithmPracticePanel.jsx';
import AlgorithmReviewPanel from './AlgorithmReviewPanel.jsx';
import AlgorithmResourcesPanel from './AlgorithmResourcesPanel.jsx';

export default function CronoLabAlgorithmPilot() {
  const [progressSnapshot, setProgressSnapshot] = useState(() => readAlgorithmPilotProgress());
  const pilot = useMemo(() => getAlgorithmPilotData(progressSnapshot), [progressSnapshot]);

  const handleToggle = (itemId) => {
    const next = toggleAlgorithmPilotItem(itemId);
    setProgressSnapshot(next);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <AlgorithmSubjectOverview
        subject={pilot.subject}
        notice={pilot.pilotNotice}
        currentCycle={pilot.currentCycle}
        upcomingItems={pilot.upcomingItems}
      />
      <EligibleContentPanel eligibleItems={pilot.eligibleItems} currentCycle={pilot.currentCycle} onToggle={handleToggle} />
      <CurrentStudyCyclePanel currentCycle={pilot.currentCycle} upcomingItems={pilot.upcomingItems} />
      <AlgorithmPracticePanel practiceItems={pilot.practiceItems} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
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
