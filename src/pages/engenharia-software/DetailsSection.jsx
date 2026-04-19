import TopicChip from '../../components/TopicChip.jsx';
import SummaryAccordion from '../../components/SummaryAccordion.jsx';

function SubjectCards({ items }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((subject) => (
        <article key={subject.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono text-zinc-400 dark:border-stone-300 dark:bg-white dark:text-stone-600">
              {subject.shortTitle}
            </span>
            <span className="text-xs font-mono text-cyan-300 dark:text-cyan-700">
              {subject.flashcardCount + subject.questionCount} itens
            </span>
          </div>
          <h4 className="mt-3 text-sm font-semibold text-white dark:text-stone-950">{subject.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{subject.subtitle}</p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-400 dark:text-stone-600">{subject.topicLabel}</p>
        </article>
      ))}
    </div>
  );
}

function TopicsSection({ items }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-400 dark:text-stone-600">
        Temas que mais puxam a prova.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((topic) => (
          <TopicChip key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

function ResourcesSection({ resources }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">playlists</p>
        {resources.playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.05] dark:border-stone-200 dark:bg-stone-50"
          >
            <p className="text-sm font-semibold text-white dark:text-stone-950">{playlist.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 dark:text-stone-600">{playlist.description}</p>
          </a>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-cyan-300 dark:text-cyan-700">vídeos por tópico</p>
        {resources.videosByTopic.map((set) => (
          <div key={set.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
            <p className="text-sm font-semibold text-white dark:text-stone-950">{set.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400 dark:text-stone-600">{set.description}</p>
            <div className="mt-3 space-y-2">
              {set.videos.slice(0, 3).map((video, index) => (
                <a
                  key={`${set.id}-${index}`}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300 transition-colors hover:text-white dark:border-stone-200 dark:bg-white dark:text-stone-700"
                >
                  <span className="truncate">{video.title}</span>
                  <span className="shrink-0 text-xs text-zinc-400 dark:text-stone-600">video</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummariesSection({ summaries }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div>
        <p className="mb-3 text-xs font-semibold text-cyan-300 dark:text-cyan-700">resumos modelo</p>
        <SummaryAccordion summaries={summaries.modelSummaries} />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold text-cyan-300 dark:text-cyan-700">o que as provas cobraram</p>
        <SummaryAccordion summaries={summaries.examCoverage} />
      </div>
    </div>
  );
}

function ExercisesPreview({ exercises }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {exercises.blocks.map((block) => (
        <article key={block.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
          <h4 className="text-sm font-semibold text-white dark:text-stone-950">{block.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{block.subtitle}</p>
          <div className="mt-4 grid gap-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-zinc-300 dark:border-stone-200 dark:bg-white dark:text-stone-700">
              Flashcards: {block.flashcards.length}
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-zinc-300 dark:border-stone-200 dark:bg-white dark:text-stone-700">
              Questões: {Object.values(block.questionLevels).reduce((sum, items) => sum + items.length, 0)}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const SECTION_RENDERERS = {
  subjects: SubjectCards,
  topics: TopicsSection,
  resources: ResourcesSection,
  summaries: SummariesSection,
  exercises: ExercisesPreview,
};

export default function DetailsSection({ details }) {
  return (
    <section id={details.id} className="space-y-4 scroll-mt-24" aria-label={details.title}>
      <div>
        <h2 className="text-xl font-semibold text-white dark:text-stone-950">{details.title}</h2>
        <p className="mt-1 max-w-3xl text-sm text-zinc-400 dark:text-stone-600">{details.description}</p>
      </div>

      <div className="space-y-3">
        {details.sections.map((section) => {
          const Renderer = SECTION_RENDERERS[section.type];
          if (!Renderer) return null;

          return (
            <article key={section.id} className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
              <div className="mb-4 space-y-2">
                <h3 className="text-lg font-semibold text-white dark:text-stone-950">{section.title}</h3>
                <p className="text-sm text-zinc-400 dark:text-stone-600">{section.description}</p>
              </div>
              <Renderer items={section.data} resources={section.data} summaries={section.data} exercises={section.data} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
