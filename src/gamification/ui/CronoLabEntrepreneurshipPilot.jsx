import { useMemo } from 'react';
import { getEntrepreneurshipPilotData } from '../pilots/entrepreneurshipPilot.js';
import StudyCycleExplanationCard from './StudyCycleExplanationCard.jsx';
import CronoLabSubjectOverview from './CronoLabSubjectOverview.jsx';
import NextActionPanel from './NextActionPanel.jsx';
import SubjectBacklogPanel from './SubjectBacklogPanel.jsx';
import StudyResourcesPanel from './StudyResourcesPanel.jsx';
import ActiveStudyPanel from './ActiveStudyPanel.jsx';
import SubjectSummaryPanel from './SubjectSummaryPanel.jsx';

export default function CronoLabEntrepreneurshipPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getEntrepreneurshipPilotData({ shift }), [shift]);

  return (
    <div className="space-y-5 lg:space-y-6">

      {/* 1 — Explicação do ciclo (variante date-based, honesta sobre o estado atual) */}
      <StudyCycleExplanationCard variant="date-based" />

      {/* 2 — Identidade e visão geral da disciplina */}
      <CronoLabSubjectOverview overview={pilot.overview} recovery={pilot.recovery} />

      {/* 3 — Próxima ação */}
      <NextActionPanel nextAction={pilot.nextAction} />

      {/* 4 — Pendências / recuperação */}
      <SubjectBacklogPanel recovery={pilot.recovery} />

      {/* 5 — Estudo ativo */}
      <ActiveStudyPanel activeStudy={pilot.activeStudy} />

      {/* 6 — Recursos e contexto extra */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
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
