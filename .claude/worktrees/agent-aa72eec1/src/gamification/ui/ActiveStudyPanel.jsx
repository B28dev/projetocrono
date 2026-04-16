import { useState } from 'react';

function FlashcardPreview({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((current) => !current)}
      className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition-colors hover:border-cyan-400/25 hover:bg-white/[0.05]"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {card.categoria}
      </p>
      <p className="mt-3 text-sm font-semibold text-white">
        {isFlipped ? card.verso : card.frente}
      </p>
      <p className="mt-4 text-[11px] text-zinc-500">
        {isFlipped ? 'Toque para voltar à pergunta' : 'Toque para revelar a resposta'}
      </p>
    </button>
  );
}

function QuestionPreview({ question }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-semibold text-white">{question.pergunta}</p>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm leading-relaxed text-zinc-300" dangerouslySetInnerHTML={{ __html: question.resposta }} />
    </div>
  );
}

export default function ActiveStudyPanel({ activeStudy }) {
  const [activeBlockId, setActiveBlockId] = useState(activeStudy.blocks[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState('flashcards');

  const activeBlock = activeStudy.blocks.find((block) => block.id === activeBlockId) ?? activeStudy.blocks[0];
  const items = activeTab === 'flashcards' ? activeBlock.flashcards.slice(0, 6) : activeBlock.questions.slice(0, 4);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Estudo ativo
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        Onde o treino acontece
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Blocos organizados por intenção de treino. Primeiro base, depois prova e pegadinha.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {activeStudy.blocks.map((block) => (
          <button
            key={block.id}
            type="button"
            onClick={() => setActiveBlockId(block.id)}
            className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeBlock.id === block.id ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'}`}
          >
            {block.title}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-semibold text-white">{activeBlock.title}</p>
        <p className="mt-1 text-xs text-zinc-500">{activeBlock.subtitle}</p>

        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setActiveTab('flashcards')} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${activeTab === 'flashcards' ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-white/[0.03] text-zinc-400'}`}>
            Flashcards
          </button>
          <button type="button" onClick={() => setActiveTab('questions')} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${activeTab === 'questions' ? 'border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200' : 'border-white/10 bg-white/[0.03] text-zinc-400'}`}>
            Questões
          </button>
        </div>
      </div>

      <div className={`mt-5 grid gap-3 ${activeTab === 'flashcards' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {items.map((item) => (
          activeTab === 'flashcards'
            ? <FlashcardPreview key={item.id} card={item} />
            : <QuestionPreview key={item.id} question={item} />
        ))}
      </div>
    </div>
  );
}
