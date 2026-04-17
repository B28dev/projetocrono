import { useCallback, useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  getMotherSubjectsWithContent,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotOfficialItem,
  toggleAlgorithmPilotFreeExplorationItem,
} from '../pilots/algorithmPilot.js';
import DisciplineStudyLayout from './DisciplineStudyLayout.jsx';
import DisciplineTopicContents from './DisciplineTopicContents.jsx';
import StudyCycleExplanationCard from './StudyCycleExplanationCard.jsx';
import CycleProgressHeader from './CycleProgressHeader.jsx';
import AlgorithmSubjectOverview from './AlgorithmSubjectOverview.jsx';

// Apenas 2 abas no primeiro nível — Prática e Recursos vivem dentro de cada tópico
const TABS = [
  { id: 'overview', icon: '🧭', label: 'Visão Geral' },
  { id: 'contents', icon: '📚', label: 'Conteúdos' },
];

export default function CronoLabAlgorithmPilot() {
  const [progressSnapshot, setProgressSnapshot] = useState(() => readAlgorithmPilotProgress());
  const [activeTab, setActiveTab] = useState('overview');

  const pilot = useMemo(() => getAlgorithmPilotData(progressSnapshot), [progressSnapshot]);
  const motherSubjects = useMemo(() => pilot.motherSubjects ?? getMotherSubjectsWithContent(progressSnapshot), [pilot, progressSnapshot]);

  const handleCompleteOfficial = useCallback((itemId) => {
    const next = toggleAlgorithmPilotOfficialItem(itemId);
    setProgressSnapshot(next);
  }, []);

  const handleToggleExploration = useCallback((itemId) => {
    const next = toggleAlgorithmPilotFreeExplorationItem(itemId);
    setProgressSnapshot(next);
  }, []);

  const {
    subject,
    currentCycle,
    studyCycles,
    pilotNotice,
    primaryRecommendedItem,
    recommendedLayer,
    nextRecommendedAction,
    explorationProgress,
    disciplineProgress,
  } = pilot;

  return (
    <DisciplineStudyLayout
      subject={subject}
      slug="algoritmo"
      tabs={TABS}
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    >
      {/* ── ABA: VISÃO GERAL ── */}
      {activeTab === 'overview' && (
        <div className="space-y-5 lg:space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
          <StudyCycleExplanationCard variant="content-based" />
          <AlgorithmSubjectOverview
            subject={subject}
            notice={pilotNotice}
            recommendedItem={recommendedLayer}
            nextRecommendedAction={nextRecommendedAction}
            disciplineProgress={disciplineProgress}
            explorationProgress={explorationProgress}
          />
          <CycleProgressHeader
            currentCycle={currentCycle}
            totalCycles={studyCycles.length}
            progressPercent={disciplineProgress.official.progressPercent}
            subjectStatus={subject.status}
            subjectRotationHint={subject.subjectRotationHint}
            recommendedItem={recommendedLayer}
            nextRecommendedAction={nextRecommendedAction}
            explorationProgress={disciplineProgress.exploration}
          />

        </div>
      )}

      {/* ── ABA: CONTEÚDOS — navegação por tópico com teoria + prática + recursos integrados ── */}
      {activeTab === 'contents' && (
        <DisciplineTopicContents
          motherSubjects={motherSubjects}
          progressSnapshot={progressSnapshot}
          onCompleteOfficial={handleCompleteOfficial}
          onToggleExploration={handleToggleExploration}
          recommendedItemId={primaryRecommendedItem?.id ?? null}
        />
      )}
    </DisciplineStudyLayout>
  );
}
