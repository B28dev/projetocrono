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

const DIFFICULTY_STYLE_MAP = {
  facil: {
    accentText: 'text-[#72ff7e]',
    badgeClass: 'border-[#72ff7e]/30 bg-[#72ff7e]/12 text-[#c9ffd0]',
    buttonClass: 'hover:border-[#72ff7e]/28 hover:shadow-[0_0_24px_rgba(114,255,126,0.12)]',
    panelClosedClass: 'border-[#72ff7e]/16 bg-[#0A0A12]/78',
    panelOpenClass: 'border-[#72ff7e]/30 bg-[rgba(114,255,126,0.06)] shadow-[0_0_24px_rgba(114,255,126,0.12)]',
    subjectBadgeClass: 'border-[#72ff7e]/30 bg-[#72ff7e]/12 text-[#c9ffd0]',
    chevronClass: 'text-[#72ff7e]',
    headingTitle: 'Questões fáceis para ganhar tração',
    headingDescription: 'Bloco em verde neon para fixação rápida, leitura limpa e entrada suave no treino.',
    actionLabel: 'abrir faixa verde',
  },
  medio: {
    accentText: 'text-[#ffe66b]',
    badgeClass: 'border-[#ffe66b]/30 bg-[#ffe66b]/12 text-[#fff4af]',
    buttonClass: 'hover:border-[#ffe66b]/28 hover:shadow-[0_0_24px_rgba(255,230,107,0.12)]',
    panelClosedClass: 'border-[#ffe66b]/16 bg-[#0A0A12]/78',
    panelOpenClass: 'border-[#ffe66b]/30 bg-[rgba(255,230,107,0.06)] shadow-[0_0_24px_rgba(255,230,107,0.12)]',
    subjectBadgeClass: 'border-[#ffe66b]/30 bg-[#ffe66b]/12 text-[#fff4af]',
    chevronClass: 'text-[#ffe66b]',
    headingTitle: 'Questões médias para testar comparação e contexto',
    headingDescription: 'Bloco em amarelo neon para comparações, aplicação e leitura mais estratégica de prova.',
    actionLabel: 'abrir faixa amarela',
  },
  dificil: {
    accentText: 'text-[#ff5f72]',
    badgeClass: 'border-[#ff5f72]/30 bg-[#ff5f72]/12 text-[#ffc0c8]',
    buttonClass: 'hover:border-[#ff5f72]/28 hover:shadow-[0_0_24px_rgba(255,95,114,0.12)]',
    panelClosedClass: 'border-[#ff5f72]/16 bg-[#0A0A12]/78',
    panelOpenClass: 'border-[#ff5f72]/30 bg-[rgba(255,95,114,0.06)] shadow-[0_0_24px_rgba(255,95,114,0.12)]',
    subjectBadgeClass: 'border-[#ff5f72]/30 bg-[#ff5f72]/12 text-[#ffc0c8]',
    chevronClass: 'text-[#ff5f72]',
    headingTitle: 'Questões difíceis para pressão máxima',
    headingDescription: 'Bloco em vermelho neon para respostas mais abertas e sensação real de desafio.',
    actionLabel: 'abrir faixa vermelha',
  },
};

const TONE_CLASS_MAP = {
  cyan: {
    border: 'border-cyan-400/16',
    bg: 'bg-cyan-500/[0.08]',
    label: 'text-cyan-300',
    value: 'text-cyan-100',
  },
  amber: {
    border: 'border-amber-400/16',
    bg: 'bg-amber-500/[0.08]',
    label: 'text-amber-300',
    value: 'text-amber-100',
  },
  fuchsia: {
    border: 'border-fuchsia-400/16',
    bg: 'bg-fuchsia-500/[0.08]',
    label: 'text-fuchsia-300',
    value: 'text-fuchsia-100',
  },
  rose: {
    border: 'border-rose-400/16',
    bg: 'bg-rose-500/[0.08]',
    label: 'text-rose-300',
    value: 'text-rose-100',
  },
  emerald: {
    border: 'border-emerald-400/16',
    bg: 'bg-emerald-500/[0.08]',
    label: 'text-emerald-300',
    value: 'text-emerald-100',
  },
  neutral: {
    border: 'border-white/[0.08]',
    bg: 'bg-white/[0.03]',
    label: 'text-zinc-400',
    value: 'text-white',
  },
};

const STATUS_TONE_CLASS_MAP = {
  success: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200',
  warning: 'border-amber-400/20 bg-amber-500/10 text-amber-100',
  info: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-200',
  neutral: 'border-white/10 bg-white/[0.03] text-white/60',
};

const TIMELINE_BAR_CLASS_MAP = {
  done: 'from-emerald-400 to-emerald-500',
  overdue: 'from-rose-400 to-rose-500',
  today: 'from-cyan-300 to-cyan-500',
  today_done: 'from-cyan-200 to-emerald-400',
  planned: 'from-violet-400/80 to-fuchsia-500/80',
};

function getDifficultyStyle(difficultyKey) {
  return DIFFICULTY_STYLE_MAP[difficultyKey] || DIFFICULTY_STYLE_MAP.medio;
}

function getQuestionTypeTone(questionType) {
  if (questionType === 'Fixacao') return 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200';
  if (questionType === 'Comparacao') return 'border-amber-400/20 bg-amber-500/10 text-amber-100';
  return 'border-rose-400/20 bg-rose-500/10 text-rose-200';
}

function hasHtmlContent(content) {
  return typeof content === 'string' && /<\/?[a-z][\s\S]*>/i.test(content);
}

function QuestionAnswerContent({ answer }) {
  if (hasHtmlContent(answer)) {
    return (
      <div
        className="[&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    );
  }

  return <div className="whitespace-pre-line">{answer}</div>;
}

function QuestionAnswerPanel({ answer }) {
  return <QuestionAnswerContent answer={answer} />;
}

function QuestionAnswerBody({ answer }) {
  return <QuestionAnswerPanel answer={answer} />;
}

function QuestionResolvedAnswer({ answer }) {
  return <QuestionAnswerBody answer={answer} />;
}

function QuestionAnswerRenderer({ answer }) {
  return <QuestionResolvedAnswer answer={answer} />;
}

function renderQuestionAnswer(answer) {
  return <QuestionAnswerRenderer answer={answer} />;
}

function QuestionAnswerView({ answer }) {
  return renderQuestionAnswer(answer);
}

function QuestionAnswer({ answer }) {
  return <QuestionAnswerView answer={answer} />;
}

function getQuestionAnswerNode(answer) {
  return <QuestionAnswer answer={answer} />;
}

function QuestionAnswerSlot({ answer }) {
  return getQuestionAnswerNode(answer);
}

function renderAnswerContent(answer) {
  return <QuestionAnswerSlot answer={answer} />;
}

function DisciplineStateBadge({ label, tone = 'neutral' }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${STATUS_TONE_CLASS_MAP[tone] ?? STATUS_TONE_CLASS_MAP.neutral}`}>
      {label}
    </span>
  );
}

function SoftwareEngineeringOverviewHero({ overview }) {
  return (
    <section className="lab-card overflow-hidden rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.96),rgba(10,10,18,0.84))] p-4 shadow-[0_0_44px_rgba(0,232,255,0.05)] backdrop-blur-xl sm:rounded-[32px] sm:p-5 lg:p-7" style={{ animation: 'fadeIn 0.42s ease-out both' }}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-200">
              {overview.hero.eyebrow}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
              {overview.period}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
              {overview.professor}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
            <DisciplineStateBadge label={overview.hero.statusLabel} tone={overview.hero.statusTone} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
              central de comando da disciplina
            </span>
          </div>

          <h2 className="mt-4 font-display text-[1.55rem] font-bold tracking-tight text-white sm:text-2xl lg:text-[2.35rem]">
            {overview.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 lg:text-[15px]">
            {overview.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {overview.role}
          </p>

          <div className="mt-5 rounded-[22px] border border-fuchsia-400/16 bg-fuchsia-500/[0.08] px-4 py-4 shadow-[0_0_20px_rgba(255,62,165,0.08)] sm:rounded-[24px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
              {overview.pilotNotice.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {overview.pilotNotice.title}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72">
              {overview.hero.commandLine}
            </p>
          </div>
        </div>

        <div className="w-full xl:max-w-sm">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[28px] sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              {overview.hero.metricLabel}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="text-[2.35rem] font-black tracking-tight text-white sm:text-4xl lg:text-[3.2rem]">{overview.hero.metricValue}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {overview.hero.metricHelper}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/60">
                {overview.hero.metricSecondary}
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ff3ea5,#00e8ff)] transition-all duration-700 ease-out"
                style={{ width: `${overview.progressPercent}%` }}
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/65">{overview.statusCopy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewContextStrip({ stats }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" style={{ animation: 'fadeIn 0.48s ease-out both' }}>
      {stats.map((stat, index) => {
        const tone = TONE_CLASS_MAP[stat.tone] ?? TONE_CLASS_MAP.neutral;

        return (
          <article
            key={stat.id}
            className={`lab-card rounded-[24px] border ${tone.border} ${tone.bg} p-4 backdrop-blur-xl`}
            style={{ animation: `fadeIn 0.45s ease-out ${0.04 + index * 0.05}s both` }}
          >
            <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${tone.label}`}>
              {stat.label}
            </p>
            <p className={`mt-3 text-sm font-semibold leading-relaxed ${tone.value}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
              {stat.helper}
            </p>
          </article>
        );
      })}
    </section>
  );
}

function DisciplineProgressChart({ chart }) {
  return (
    <section className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-[28px] lg:p-5">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{chart.eyebrow}</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{chart.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{chart.description}</p>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex min-w-[520px] items-end gap-2.5 sm:min-w-0 sm:gap-4">
          {chart.entries.map((entry) => {
            const barClass = TIMELINE_BAR_CLASS_MAP[entry.state] ?? TIMELINE_BAR_CLASS_MAP.planned;
            const barHeight = Math.max(Math.round((entry.percent / 100) * 168), 14);

            return (
              <div key={entry.id} className="flex min-w-[58px] flex-1 flex-col items-center gap-2.5 text-center sm:min-w-[62px] sm:gap-3">
                <div className="flex h-44 w-full items-end justify-center rounded-[18px] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-2 pb-2 pt-3 sm:h-48 sm:rounded-[20px]">
                  <div className="flex h-full w-full flex-col justify-end rounded-[14px] bg-white/[0.03] px-2 py-2 sm:rounded-[16px]">
                    <div className={`w-full rounded-[12px] bg-gradient-to-t ${barClass} transition-all duration-700 ease-out`} style={{ height: `${barHeight}px` }} />
                    <div className="mt-2 text-[10px] font-mono text-white/50">{entry.completed}/{entry.total}</div>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white sm:text-xs">{entry.label}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500 sm:text-[10px]">{entry.state.replaceAll('_', ' ')}</p>
                  {entry.isExamDay ? <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-fuchsia-300 sm:text-[10px]">prova</p> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DisciplineCompositionChart({ chart }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let strokeOffset = 0;

  return (
    <section className="rounded-[24px] border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-[28px] lg:p-5">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">{chart.eyebrow}</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{chart.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{chart.description}</p>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="mx-auto flex w-full max-w-[220px] justify-center sm:max-w-[240px] lg:mx-0">
          <div className="relative flex h-[200px] w-[200px] items-center justify-center sm:h-[220px] sm:w-[220px]">
            <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
              <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
              {chart.segments.map((segment) => {
                const segmentLength = chart.total > 0 ? (segment.value / chart.total) * circumference : 0;
                const dashArray = `${segmentLength} ${circumference}`;
                const currentOffset = strokeOffset;
                strokeOffset -= segmentLength;

                return (
                  <circle
                    key={segment.id}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={currentOffset}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[1.9rem] font-black text-white sm:text-3xl">{chart.centerValue}</p>
              <p className="mt-1 max-w-[110px] text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">{chart.centerLabel}</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3">
          {chart.segments.map((segment) => (
            <div key={segment.id} className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color, boxShadow: `0 0 14px ${segment.color}55` }} />
                  <div>
                    <p className={`text-sm font-semibold ${segment.tone}`}>{segment.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{segment.helper}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-white">{segment.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewChartsSection({ charts }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]" style={{ animation: 'fadeIn 0.5s ease-out both' }}>
      <DisciplineProgressChart chart={charts.progress} />
      <DisciplineCompositionChart chart={charts.composition} />
    </section>
  );
}

function DisciplineOverviewInsights({ insights }) {
  return (
    <section className="lab-card rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.9),rgba(10,10,18,0.8))] p-4 shadow-xl backdrop-blur-xl sm:rounded-[28px] sm:p-5" style={{ animation: 'fadeIn 0.52s ease-out both' }}>
      <div className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{insights.eyebrow}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{insights.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{insights.description}</p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {insights.items.map((item, index) => (
          <article
            key={item.id}
            className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-[24px]"
            style={{ animation: `fadeIn 0.45s ease-out ${0.05 + index * 0.05}s both` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">{item.label}</p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-white">{item.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContentsPanel({ contents }) {
  return (
    <div className="space-y-6" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <section className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{contents.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{contents.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{contents.description}</p>
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
              <h4 className="mt-3 text-sm font-semibold text-white">{subject.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{subject.subtitle}</p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">{subject.topicLabel}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Temas mais cobrados</p>
        <h3 className="mt-2 text-lg font-semibold text-white">Assuntos que puxam a disciplina</h3>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {contents.priorityTopics.map((topic) => (
            <TopicChip key={topic.id} topic={topic} />
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="lab-card rounded-2xl border border-white/[0.06] bg-[#0A0A12]/80 p-5 shadow-lg backdrop-blur-xl lg:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Playlists de apoio</p>
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Resumo rápido</p>
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{exercises.eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{exercises.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{exercises.description}</p>
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

function FlashcardFace({ card, blockTitle, isBack = false }) {
  return (
    <div
      className={`absolute inset-0 flex h-full flex-col rounded-[24px] border p-5 [backface-visibility:hidden] ${
        isBack
          ? 'border-pink-400/24 bg-[linear-gradient(160deg,rgba(30,10,24,0.98),rgba(72,12,46,0.84))] shadow-[0_0_30px_rgba(255,62,165,0.12)] [transform:rotateY(180deg)]'
          : 'border-cyan-400/20 bg-[linear-gradient(160deg,rgba(8,18,28,0.98),rgba(8,34,46,0.84))] shadow-[0_0_30px_rgba(0,232,255,0.12)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${
            isBack
              ? 'border-pink-400/24 bg-pink-500/12 text-pink-100'
              : 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100'
          }`}
        >
          {card.subjectLabel}
        </span>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${isBack ? 'text-pink-100/55' : 'text-cyan-100/55'}`}>
          {isBack ? 'verso' : 'frente'}
        </span>
      </div>

      <p className={`mt-4 text-sm leading-relaxed ${isBack ? 'text-pink-50/92' : 'text-cyan-50/92'}`}>
        {isBack ? card.back : card.front}
      </p>

      <div className={`mt-auto flex items-center justify-between gap-3 border-t pt-4 text-[11px] ${isBack ? 'border-pink-400/14 text-pink-100/60' : 'border-cyan-400/14 text-cyan-100/60'}`}>
        <span className="truncate">{blockTitle}</span>
        <span className={isBack ? 'text-pink-200' : 'text-cyan-200'}>
          {isBack ? 'toque para voltar' : 'toque para revelar'}
        </span>
      </div>
    </div>
  );
}

function FlashcardCard({ card, delay }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((current) => !current)}
      className="group relative h-full min-h-[240px] w-full rounded-[24px] text-left [perspective:1400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      style={{ animation: `fadeIn 0.45s ease-out ${delay}s both` }}
      aria-label={`Flashcard ${card.subjectLabel}`}
    >
      <div className={`relative h-full min-h-[240px] w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <FlashcardFace card={card} blockTitle={card.blockTitle} />
        <FlashcardFace card={card} blockTitle={card.blockTitle} isBack />
      </div>
    </button>
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Exercícios · Flashcards</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Revisão rápida com contexto de assunto</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Agora os cards giram em 3D: frente em ciano, verso em rosa, mantendo o selo do assunto no topo.
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

function QuestionDifficultyTabs({ exercises, onOpenTab }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(exercises.difficulties).map(([key, difficulty]) => {
        const style = getDifficultyStyle(key);

        return (
          <button
            key={key}
            type="button"
            onClick={() => onOpenTab(`questions-${key}`)}
            className={`group rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.92),rgba(10,10,18,0.74))] p-5 text-left shadow-xl transition-all duration-300 ${style.buttonClass}`}
          >
            <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${style.badgeClass}`}>
              {difficulty.label}
            </span>
            <h4 className="mt-4 text-lg font-semibold text-white">Nível {difficulty.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{style.headingDescription}</p>
            <p className={`mt-4 text-xs uppercase tracking-[0.18em] transition-transform duration-300 group-hover:translate-x-0.5 ${style.accentText}`}>
              {style.actionLabel}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function QuestionsLanding({ exercises, onOpenTab }) {
  return (
    <section className="space-y-5" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[#0A0A12]/82 p-5 shadow-xl backdrop-blur-xl lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300">Exercícios · Questões</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Em que nível você quer se testar?</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Fácil em verde neon, médio em amarelo neon e difícil em vermelho neon.
        </p>
      </div>

      <QuestionDifficultyTabs exercises={exercises} onOpenTab={onOpenTab} />
    </section>
  );
}

function QuestionDifficultySection({ exercises, difficultyKey }) {
  const [activeBlockId, setActiveBlockId] = useState('all');
  const [openIds, setOpenIds] = useState({});
  const difficulty = exercises.difficulties[difficultyKey];
  const style = getDifficultyStyle(difficultyKey);

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
            <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${style.accentText}`}>
              Questões · {difficulty.label}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{style.headingTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{style.headingDescription}</p>
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
              className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${isOpen ? style.panelOpenClass : style.panelClosedClass}`}
              style={{ animation: `fadeIn 0.4s ease-out ${index * 0.025}s both` }}
            >
              <button
                type="button"
                onClick={() => setOpenIds((current) => ({ ...current, [question.id]: !current[question.id] }))}
                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${style.subjectBadgeClass}`}>
                      {question.subjectLabel}
                    </span>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${getQuestionTypeTone(question.questionType)}`}>
                      {question.questionType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-white">{question.prompt}</p>
                  <p className="mt-2 text-xs text-zinc-500">{question.blockTitle}</p>
                </div>

                <svg
                  className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ${style.chevronClass} ${isOpen ? 'rotate-180' : ''}`}
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
                    {renderAnswerContent(question.answer)}
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

function ExercisesShell({ activeTab, exercises, onOpenTab }) {
  const title = activeTab === 'flashcards' ? 'Flashcards' : 'Questões';
  const pathLabel = activeTab === 'flashcards'
    ? 'Exercícios / Flashcards'
    : activeTab === 'questions-facil'
      ? 'Exercícios / Questões / Fácil'
      : activeTab === 'questions-medio'
        ? 'Exercícios / Questões / Médio'
        : activeTab === 'questions-dificil'
          ? 'Exercícios / Questões / Difícil'
          : 'Exercícios / Questões';

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="lab-card rounded-[28px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(10,10,18,0.95),rgba(10,10,18,0.78))] p-5 shadow-[0_0_36px_rgba(255,255,255,0.03)] backdrop-blur-xl lg:p-6" style={{ animation: 'fadeIn 0.35s ease-out both' }}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Exercícios</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{pathLabel}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onOpenTab('flashcards')}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'flashcards' ? 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'}`}
            >
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => onOpenTab('questions')}
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${activeTab.startsWith('questions') ? 'border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200' : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'}`}
            >
              Questões
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'flashcards' && <FlashcardsSection exercises={exercises} />}
      {activeTab === 'questions' && <QuestionsLanding exercises={exercises} onOpenTab={onOpenTab} />}
      {activeTab === 'questions-facil' && <QuestionDifficultySection exercises={exercises} difficultyKey="facil" />}
      {activeTab === 'questions-medio' && <QuestionDifficultySection exercises={exercises} difficultyKey="medio" />}
      {activeTab === 'questions-dificil' && <QuestionDifficultySection exercises={exercises} difficultyKey="dificil" />}
    </div>
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
          <NextActionPanel nextAction={pilot.nextAction} />
          <SoftwareEngineeringOverviewHero overview={pilot.overview} />
          <OverviewContextStrip stats={pilot.overview.contextStats} />
          <OverviewChartsSection charts={pilot.overview.charts} />
          <DisciplineOverviewInsights insights={pilot.overview.insights} />
          <SubjectBacklogPanel recovery={pilot.recovery} />
        </div>
      )}

      {activeTab === 'contents' && <ContentsPanel contents={pilot.contents} />}

      {activeTab === 'exercises' && <ExercisesLanding exercises={pilot.exercises} onOpenTab={setActiveTab} />}

      {(activeTab === 'flashcards' || activeTab.startsWith('questions')) && (
        <ExercisesShell activeTab={activeTab} exercises={pilot.exercises} onOpenTab={setActiveTab} />
      )}
    </DisciplineStudyLayout>
  );
}
