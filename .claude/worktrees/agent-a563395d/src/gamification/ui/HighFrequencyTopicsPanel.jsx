import TopicChip from '../../components/TopicChip.jsx';

export default function HighFrequencyTopicsPanel({ topics }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 lg:p-6 backdrop-blur-xl shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Temas mais cobrados
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">
        O que merece atenção primeiro
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Este bloco existe para reduzir adivinhação. A prioridade já vem recortada pela recorrência da prova.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicChip key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
