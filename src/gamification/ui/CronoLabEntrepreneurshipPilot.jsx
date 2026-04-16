import { useMemo } from 'react';
import { getEntrepreneurshipPilotData } from '../pilots/entrepreneurshipPilot.js';
import CronoLabSubjectOverview from './CronoLabSubjectOverview.jsx';
import NextActionPanel from './NextActionPanel.jsx';
import SubjectBacklogPanel from './SubjectBacklogPanel.jsx';
import StudyResourcesPanel from './StudyResourcesPanel.jsx';
import ActiveStudyPanel from './ActiveStudyPanel.jsx';
import SubjectSummaryPanel from './SubjectSummaryPanel.jsx';

export default function CronoLabEntrepreneurshipPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getEntrepreneurshipPilotData({ shift }), [shift]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <CronoLabSubjectOverview overview={pilot.overview} recovery={pilot.recovery} />
      <NextActionPanel nextAction={pilot.nextAction} />
      <SubjectBacklogPanel recovery={pilot.recovery} />
      <ActiveStudyPanel activeStudy={pilot.activeStudy} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-6">
          <StudyResourcesPanel resources={pilot.resources} />
        </div>
        <div className="xl:col-span-6">
          <SubjectSummaryPanel extraContext={pilot.extraContext} />
        </div>
      </div>
    </div>
  );
}
