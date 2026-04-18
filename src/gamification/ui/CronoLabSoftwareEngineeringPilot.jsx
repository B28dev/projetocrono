import { useMemo, useState } from 'react';
import TopicChip from '../../components/TopicChip.jsx';
import DisciplineStudyLayout from './DisciplineStudyLayout.jsx';
import NextActionPanel from './NextActionPanel.jsx';
import SubjectBacklogPanel from './SubjectBacklogPanel.jsx';
import { getSoftwareEngineeringPilotData } from '../pilots/softwareEngineeringPilot.js';

const TABS = [
  { id: 'overview', icon: '🧭', label: 'Visão Geral' },
  { id: 'contents', icon: '📚', label: 'Conteúdos' },
  {
    id: 'exercises',
    icon: '🧪',
    label: 'Exercícios',
    children: [
      { id: 'flashcards', icon: '🃏', label: 'Flashcards' },
      {
        id: 'questions',
        icon: '❓',
        label: 'Questões',
        children: [
          { id: 'questions-facil', icon: '◌', label: 'Fácil' },
          { id: 'questions-medio', icon: '◌', label: 'Médio' },
          { id: 'questions-dificil', icon: '◌', label: 'Difícil' },
        ],
      },
    ],
  },
];

function SoftOverviewHero({ overview }) {
  return (
    <section className="lab-card rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.95),rgba(10,10,18,0.82))] p-5 shadow-[0_0_40px_rgba(0,232,255,0.05)] backdrop-blur-xl lg:p-7" style={{ animation: 'fadeIn 0.45s ease-out both' }}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200">
              engenharia · crono-lab
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
              {overview.period}
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {overview.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
            {overview.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {overview.role}
          </p>

          <div className="mt-4 rounded-2xl border border-fuchsia-400/18 bg-fuchsia-500/10 px-4 py-4 shadow-[0_0_20px_rgba(255,62,165,0.08)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
              {overview.pilotNotice.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {overview.pilotNotice.title}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72">
              {overview.pilotNotice.body}
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 xl:max-w-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Progresso oficial
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-black text-white">
                {overview.progressPercent}%
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {overview.completedTasks}/{overview.totalTasks} tarefas concluídas
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/60">
              {overview.status}
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff3ea5,#00e8ff)] transition-all duration-700 ease-out"
              style={{ width: `${overview.progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/65">
            {overview.statusCopy}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Próxima direção
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {overview.nextActionLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            A disciplina sempre abre com a ação mais útil, sem misturar treino e biblioteca no mesmo plano.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            Assunto em curso
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {overview.currentTopicLabel}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            O tópico vivo fica explícito para orientar estudo, revisão e treino sem adivinhação.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Lógica de progressão
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {overview.progressLogicSummary}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Visão geral para entender a trilha; conteúdos para estudar; exercícios para escolher o modo de treino.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContentsPanel({ contents }) {
  return (
    <div className="space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <section className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            {contents.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {contents.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {contents.description}
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {contents.motherSubjects.map((subject, index) => (
            <div
              key={subject.id}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.05]"
              style={{ animation: `fadeIn 0.45s ease-out ${0.05 + index * 0.06}s both` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                  {subject.shortTitle}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300">
                  {subject.flashcardCount + subject.questionCount} itens
                </span>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-white">
                {subject.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {subject.subtitle}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                {subject.topicLabel}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Temas mais cobrados
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              Assuntos que puxam a disciplina
            </h3>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {contents.priorityTopics.map((topic) => (
            <TopicChip key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Playlists de apoio
          </p>
          <div className="mt-4 space-y-3">
            {contents.resources.playlists.map((playlist) => (
              <a
                key={playlist.id}
                href={playlist.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{playlist.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{playlist.description}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300">
                    playlist
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
            Resumo rápido
          </p>
          <div className="mt-4 space-y-3">
            {contents.summaries.modelSummaries.slice(0, 3).map((summary) => (
              <div key={summary.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{summary.title}</p>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-400">
                  {summary.bullets.slice(0, 3).map((bullet, index) => (
                    <li key={`${summary.id}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExercisesLanding({ exercises, onOpenTab }) {
  return (
    <section className="space-y-5" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {exercises.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {exercises.title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          {exercises.description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => onOpenTab('flashcards')}
          className="group rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.92),rgba(10,10,18,0.74))] p-5 text-left shadow-xl transition-all duration-300 hover:border-cyan-400/22 hover:shadow-[0_0_30px_rgba(0,232,255,0.08)]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
              Flashcards
            </span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">🃏</span>
          </div>
          <h4 className="mt-4 text-lg font-semibold text-white">Revisão rápida por conceito</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Cards avulsos com selo de assunto para revisar sem perder contexto do conteúdo original.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onOpenTab('questions')}
          className="group rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.92),rgba(10,10,18,0.74))] p-5 text-left shadow-xl transition-all duration-300 hover:border-fuchsia-400/22 hover:shadow-[0_0_30px_rgba(255,62,165,0.08)]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-fuchsia-200">
              Questões
            </span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">❓</span>
          </div>
          <h4 className="mt-4 text-lg font-semibold text-white">Teste por nível de dificuldade</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            A arquitetura já nasce pronta para Fácil, Médio e Difícil dentro do mesmo bloco de exercícios.
          </p>
        </button>
      </div>
    </section>
  );
}

function ExerciseBlockFilter({ blocks, activeBlockId, onChangeBlock }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChangeBlock('all')}
        className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeBlockId === 'all' ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'}`}
      >
        Todos os blocos
      </button>
      {blocks.map((block) => (
        <button
          key={block.id}
          type="button"
          onClick={() => onChangeBlock(block.id)}
          className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeBlockId === block.id ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'}`}
        >
          {block.shortTitle}
        </button>
      ))}
    </div>
  );
}

function FlashcardsSection({ exercises }) {
  const [activeBlockId, setActiveBlockId] = useState('all');

  const cards = useMemo(() => {
    const sourceBlocks = activeBlockId === 'all'
      ? exercises.blocks
      : exercises.blocks.filter((block) => block.id === activeBlockId);

    return sourceBlocks.flatMap((block) => block.flashcards.map((card) => ({
      ...card,
      blockTitle: block.title,
    })));
  }, [activeBlockId, exercises.blocks]);

  return (
    <section className="space-y-5" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Exercícios · Flashcards
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Revisão rápida com contexto de assunto
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Cards avulsos, leitura rápida e selo elegante de origem para o aluno entender de onde veio cada conceito.
            </p>
          </div>
          <ExerciseBlockFilter blocks={exercises.blocks} activeBlockId={activeBlockId} onChangeBlock={setActiveBlockId} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <FlashcardCard key={card.id} card={card} delay={index * 0.03} />
        ))}
      </div>
    </section>
  );
}

function FlashcardCard({ card, delay }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((current) => !current)}
      className="group relative h-full min-h-[240px] rounded-[24px] border border-white/[0.06] bg-[linear-gradient(160deg,rgba(10,10,18,0.95),rgba(16,24,32,0.8))] p-5 text-left shadow-xl transition-all duration-500 hover:border-cyan-400/20 hover:shadow-[0_0_24px_rgba(0,232,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      style={{ animation: `fadeIn 0.45s ease-out ${delay}s both` }}
      aria-label={`Flashcard ${card.subjectLabel}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
          {card.subjectLabel}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
          {isFlipped ? 'verso' : 'frente'}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/92">
        {isFlipped ? card.back : card.front}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[11px] text-zinc-500">
        <span className="truncate">{card.blockTitle}</span>
        <span className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5">
          {isFlipped ? 'toque para voltar' : 'toque para revelar'}
        </span>
      </div>
    </button>
  );
}

function QuestionsLanding({ exercises, onOpenTab }) {
  return (
    <section className="space-y-5" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
          Exercícios · Questões
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Em que nível você quer se testar?
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          A disciplina separa o treino por dificuldade para a pessoa entrar já no recorte certo, sem improviso e sem perder a lógica cebola.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(exercises.difficulties).map(([key, difficulty]) => (
          <button
            key={key}
            type="button"
            onClick={() => onOpenTab(`questions-${key}`)}
            className="group rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.92),rgba(10,10,18,0.74))] p-5 text-left shadow-xl transition-all duration-300 hover:border-fuchsia-400/22 hover:shadow-[0_0_24px_rgba(255,62,165,0.08)]"
          >
            <span className="inline-flex rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-fuchsia-200">
              {difficulty.label}
            </span>
            <h4 className="mt-4 text-lg font-semibold text-white">Nível {difficulty.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{difficulty.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-fuchsia-300 transition-transform duration-300 group-hover:translate-x-0.5">
              abrir recorte
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

function QuestionDifficultySection({ exercises, difficultyKey }) {
  const [activeBlockId, setActiveBlockId] = useState('all');
  const [openIds, setOpenIds] = useState({});
  const difficulty = exercises.difficulties[difficultyKey];

  const questions = useMemo(() => {
    const sourceBlocks = activeBlockId === 'all'
      ? exercises.blocks
      : exercises.blocks.filter((block) => block.id === activeBlockId);

    return sourceBlocks.flatMap((block) => (block.questionLevels[difficultyKey] || []).map((question) => ({
      ...question,
      blockTitle: block.title,
    })));
  }, [activeBlockId, difficultyKey, exercises.blocks]);

  return (
    <section className="space-y-5" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
              Questões · {difficulty.label}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Recorte {difficulty.label.toLowerCase()} da disciplina
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {difficulty.description}
            </p>
          </div>
          <ExerciseBlockFilter blocks={exercises.blocks} activeBlockId={activeBlockId} onChangeBlock={setActiveBlockId} />
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => {
          const isOpen = Boolean(openIds[question.id]);

          return (
            <div
              key={question.id}
              className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${isOpen ? 'border-fuchsia-400/22 bg-white/[0.06] shadow-[0_0_24px_rgba(255,62,165,0.08)]' : 'border-white/[0.06] bg-[#0A0A12]/78'}`}
              style={{ animation: `fadeIn 0.4s ease-out ${index * 0.025}s both` }}
            >
              <button
                type="button"
                onClick={() => setOpenIds((current) => ({ ...current, [question.id]: !current[question.id] }))}
                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200">
                      {question.subjectLabel}
                    </span>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
                      {question.questionType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-white">
                    {question.prompt}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {question.blockTitle}
                  </p>
                </div>

                <svg
                  className={`mt-1 h-4 w-4 shrink-0 text-fuchsia-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="border-t border-white/[0.06] bg-white/[0.03] px-4 py-4 text-sm leading-relaxed text-zinc-300 sm:px-5">
                    <div
                      className="[&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: question.answer }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function CronoLabSoftwareEngineeringPilot({ shift = 'noturno-adele' }) {
  const pilot = useMemo(() => getSoftwareEngineeringPilotData({ shift }), [shift]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DisciplineStudyLayout
      subject={pilot.subject}
      tabs={TABS}
      activeTab={activeTab}
      onChangeTab={setActiveTab}
    >
      {activeTab === 'overview' && (
        <div className="space-y-5 lg:space-y-6">
          <SoftOverviewHero overview={pilot.overview} />
          <NextActionPanel nextAction={pilot.nextAction} />
          <SubjectBacklogPanel recovery={pilot.recovery} />
        </div>
      )}

      {activeTab === 'contents' && <ContentsPanel contents={pilot.contents} />}

      {activeTab === 'exercises' && (
        <ExercisesLanding exercises={pilot.exercises} onOpenTab={setActiveTab} />
      )}

      {activeTab === 'flashcards' && <FlashcardsSection exercises={pilot.exercises} />}

      {activeTab === 'questions' && (
        <QuestionsLanding exercises={pilot.exercises} onOpenTab={setActiveTab} />
      )}

      {activeTab === 'questions-facil' && (
        <QuestionDifficultySection exercises={pilot.exercises} difficultyKey="facil" />
      )}

      {activeTab === 'questions-medio' && (
        <QuestionDifficultySection exercises={pilot.exercises} difficultyKey="medio" />
      )}

      {activeTab === 'questions-dificil' && (
        <QuestionDifficultySection exercises={pilot.exercises} difficultyKey="dificil" />
      )}
    </DisciplineStudyLayout>
  );
}
