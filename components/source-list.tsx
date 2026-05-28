import type { GuideSource } from "@/lib/guides";

export function SourceList({ sources }: { sources: GuideSource[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {sources.map((source) => (
        <a
          key={source.url}
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="surface-tight surface-link flex min-h-28 flex-col justify-between gap-4 p-4"
        >
          <span className="block text-[15px] font-medium text-white">{source.label}</span>
          <span className="block break-all font-mono text-[12px] leading-5 text-silver-text">{source.url}</span>
        </a>
      ))}
    </div>
  );
}
