import { useState } from 'react';
import TopicChip from '../../components/TopicChip.jsx';
import SummaryAccordion from '../../components/SummaryAccordion.jsx';

function SubjectCards({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((subject) => (
        <article key={subject.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-zinc-400 dark:border-stone-300 dark:bg-white dark:text-stone-600">
              {subject.shortTitle}
            </span>
            <span className="text-[11px] font-mono text-cyan-300 dark:text-cyan-700">
              {subject.flashcardCount + subject.questionCount} itens
            </span>
          </div>
          <h4 className="mt-3 text-sm font-semibold text-white dark:text-stone-950">{subject.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 dark:text-stone-600">{subject.topicLabel}</p>
        </article>
      ))}
    </div>
  );
}

function TopicsSection({ items }) {
  return (
    <div className="space-y-3">
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300 dark:text-cyan-700">playlists</p>
        {resources.playlists.slice(0, 3).map((playlist) => (
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300 dark:text-cyan-700">vídeos</p>
        {resources.videosByTopic.slice(0, 3).map((set) => (
          <div key={set.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
            <p className="text-sm font-semibold text-white dark:text-stone-950">{set.title}</p>
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
                  <span className="shrink-0 text-xs text-zinc-400 dark:text-stone-600">abrir</span>
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
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300 dark:text-cyan-700">resumos</p>
        <SummaryAccordion summaries={summaries.modelSummaries} />
      </div>
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300 dark:text-cyan-700">provas</p>
        <SummaryAccordion summaries={summaries.examCoverage} />
      </div>
    </div>
  );
}

function ExercisesPreview({ exercises }) {
  return (
    <div className="space-y-3">
      {exercises.blocks.map((block) => (
        <article key={block.id} className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4 dark:border-stone-200 dark:bg-stone-50">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white dark:text-stone-950">{block.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400 dark:text-stone-600">{block.topicLabel}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 dark:text-stone-600">
              <span>{block.flashcards.length} flashcards</span>
              <span>{Object.values(block.questionLevels).reduce((sum, items) => sum + items.length, 0)} questões</span>
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

function DetailAccordionItem({ section, isOpen, onToggle }) {
  const Renderer = SECTION_RENDERERS[section.type];
  if (!Renderer) return null;

  return (
    <article className="rounded-xl border border-white/[0.08] bg-white/[0.018] px-4 py-4 backdrop-blur-xl dark:border-stone-300 dark:bg-white/80">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`detail-section-${section.id}`}
      >
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white dark:text-stone-950">{section.title}</h3>
          <p className="mt-1 text-sm text-zinc-400 dark:text-stone-600">{section.description}</p>
        </div>
        <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-400 transition-colors dark:bg-stone-100 dark:text-stone-600">
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <div id={`detail-section-${section.id}`} className="mt-4 border-t border-white/[0.08] pt-4 dark:border-stone-200">
          <Renderer items={section.data} resources={section.data} summaries={section.data} exercises={section.data} />
        </div>
      ) : null}
    </article>
  );
}

export default function DetailsSection({ details }) {
  const [openSectionId, setOpenSectionId] = useState(details.sections[0]?.id ?? null);

  return (
    <section id={details.id} className="space-y-4 scroll-mt-24" aria-label={details.title}>
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-white dark:text-stone-950">{details.title}</h2>
        <p className="mt-1 text-sm text-zinc-400 dark:text-stone-600">{details.description}</p>
      </div>

      <div className="space-y-3">
        {details.sections.map((section) => (
          <DetailAccordionItem
            key={section.id}
            section={section}
            isOpen={openSectionId === section.id}
            onToggle={() => setOpenSectionId((current) => (current === section.id ? null : section.id))}
          />
        ))}
      </div>
    </section>
  );
}
