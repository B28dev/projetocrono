import { useCallback, useMemo, useState } from 'react';
import {
  getAlgorithmPilotData,
  getMotherSubjectsWithContent,
  readAlgorithmPilotProgress,
  toggleAlgorithmPilotItem,
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
  const motherSubjects = useMemo(() => getMotherSubjectsWithContent(progressSnapshot), [progressSnapshot]);

  const handleToggle = useCallback((itemId) => {
    const next = toggleAlgorithmPilotItem(itemId);
    setProgressSnapshot(next);
  }, []);

  const { subject, currentCycle, studyCycles, pilotNotice } = pilot;

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

      {/* ── ABA: CONTEÚDOS — navegação por tópico com teoria + prática + recursos integrados ── */}
      {activeTab === 'contents' && (
        <DisciplineTopicContents
          motherSubjects={motherSubjects}
          progressSnapshot={progressSnapshot}
          onToggle={handleToggle}
        />
      )}
    </DisciplineStudyLayout>
  );
}
