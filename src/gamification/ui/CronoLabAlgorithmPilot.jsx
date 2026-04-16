import { useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotItem,
} from '../pilots/algorithmPilot.js';
import CronoLabAlgorithmPilotNotice from './CronoLabAlgorithmPilotNotice.jsx';
import AlgorithmSubjectOverview from './AlgorithmSubjectOverview.jsx';
import CurrentStudyCyclePanel from './CurrentStudyCyclePanel.jsx';
import EligibleContentPanel from './EligibleContentPanel.jsx';
import UpcomingContentPanel from './UpcomingContentPanel.jsx';
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
      <CronoLabAlgorithmPilotNotice notice={pilot.pilotNotice} />
      <AlgorithmSubjectOverview subject={pilot.subject} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7 space-y-6">
          <CurrentStudyCyclePanel currentCycle={pilot.currentCycle} />
          <EligibleContentPanel eligibleItems={pilot.eligibleItems} onToggle={handleToggle} />
        </div>
        <div className="xl:col-span-5 space-y-6">
          <UpcomingContentPanel upcomingItems={pilot.upcomingItems} />
          <AlgorithmResourcesPanel resourceItems={pilot.resourceItems} />
        </div>
      </div>

      <AlgorithmPracticePanel practiceItems={pilot.practiceItems} />
      <AlgorithmReviewPanel reviewItems={pilot.reviewItems} />
    </div>
  );
}
