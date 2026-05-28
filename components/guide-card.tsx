import Image from "next/image";
import Link from "next/link";
import type { GuidePage } from "@/lib/guides";
import { StatusBadge } from "./status-badge";

export function GuideCard({ guide, compact = false }: { guide: GuidePage; compact?: boolean }) {
  return (
    <Link href={`/${guide.slug}`} className="surface surface-link group block overflow-hidden">
      {!compact && (
        <div className="relative h-44 overflow-hidden border-b border-graphite bg-true-black">
          <Image
            src={guide.heroImage}
            alt={`${guide.h1} guide preview from official Fatekeeper media`}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={guide.status} />
          <span className="status-pill">{guide.category}</span>
        </div>
        <h3 className="mt-4 text-[22px] font-medium leading-[1.14] text-white">{guide.h1}</h3>
        <p className="mt-3 text-[14px] leading-6 text-silver-text">{guide.description}</p>
        <span className="mt-5 inline-flex font-mono text-[13px] font-medium text-white">View guide</span>
      </div>
    </Link>
  );
}
