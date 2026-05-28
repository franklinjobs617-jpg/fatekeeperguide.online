import type { GuidePage } from "@/lib/guides";
import { getIntentQuestions, researchSourceNotes } from "@/lib/research";

export function PlayerQuestions({ page }: { page: GuidePage }) {
  const questions = getIntentQuestions(page.intent);

  return (
    <section className="section-index py-8">
      <div className="surface p-5 md:p-6">
        <p className="kicker">Player questions</p>
        <h2 className="mt-3 text-[28px] font-medium leading-tight text-white">
          What this guide answers first
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {questions.map((question) => (
            <div key={question} className="surface-tight p-4">
              <p className="text-[15px] leading-6 text-off-white">{question}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          {researchSourceNotes.slice(0, 4).map((note) => (
            <a
              key={note.label}
              href={note.source.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col gap-1 border-t border-graphite pt-3 sm:flex-row sm:justify-between sm:gap-6"
            >
              <span className="font-mono text-[12px] font-medium uppercase text-white">{note.label}</span>
              <span className="text-[13px] leading-5 text-silver-text sm:max-w-xl">{note.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
