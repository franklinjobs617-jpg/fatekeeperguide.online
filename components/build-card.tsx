import Link from "next/link";

const buildLabels = {
  beginner: "01",
  spellblade: "02",
  heavy: "03",
  dagger: "04"
};

export function BuildCard({
  kind,
  title,
  href,
  body
}: {
  kind: keyof typeof buildLabels;
  title: string;
  href: string;
  body: string;
}) {
  return (
    <Link href={href} className="surface-tight surface-link group block p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cadmium-green font-mono text-[12px] font-medium text-true-black">
        {buildLabels[kind]}
      </div>
      <h3 className="mt-5 text-[24px] font-medium leading-tight text-white">{title}</h3>
      <p className="mt-3 text-[14px] leading-6 text-silver-text">{body}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[13px] font-medium text-white">
        Open build
      </span>
    </Link>
  );
}
