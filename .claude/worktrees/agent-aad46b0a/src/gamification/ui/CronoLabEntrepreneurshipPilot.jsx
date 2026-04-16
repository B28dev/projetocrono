import { useMemo } from 'react';
import { getEntrepreneurshipPilotData } from '../pilots/entrepreneurshipPilot.js';
import CronoLabEntrepreneurshipPilotNotice from './CronoLabEntrepreneurshipPilotNotice.jsx';
import CronoLabSubjectOverview from './CronoLabSubjectOverview.jsx';
import NextActionPanel from './NextActionPanel.jsx';
import SubjectBacklogPanel from './SubjectBacklogPanel.jsx';
import HighFrequencyTopicsPanel from './HighFrequencyTopicsPanel.jsx';
import StudyResourcesPanel from './StudyResourcesPanel.jsx';
import ActiveStudyPanel from './ActiveStudyPanel.jsx';
import SubjectSummaryPanel from './SubjectSummaryPanel.jsx';

export default function CronoLabEntrepreneurshipPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getEntrepreneurshipPilotData({ shift }), [shift]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <CronoLabEntrepreneurshipPilotNotice notice={pilot.pilotNotice} />
      <CronoLabSubjectOverview overview={pilot.overview} backlog={pilot.backlog} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7 space-y-6">
          <NextActionPanel nextActions={pilot.nextActions} />
          <SubjectBacklogPanel backlog={pilot.backlog} />
        </div>
        <div className="xl:col-span-5 space-y-6">
          <HighFrequencyTopicsPanel topics={pilot.highFrequencyTopics} />
          <StudyResourcesPanel resources={pilot.resources} />
        </div>
      </div>

      <ActiveStudyPanel activeStudy={pilot.activeStudy} />
      <SubjectSummaryPanel summaries={pilot.summaries} />
    </div>
  );
}
