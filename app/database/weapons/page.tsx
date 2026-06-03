"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWikiHref, wikiEntities } from "@/lib/wiki-data";

const trackedCategories = ["weapons", "spells", "relics"] as const;

const items = wikiEntities.filter((entity) => trackedCategories.includes(entity.category as (typeof trackedCategories)[number]));

function EvidenceBadge({ status }: { status: string }) {
  const className = status === "Official" ? "status-official" : status === "Conflicting" ? "status-testing" : "status-analysis";
  return <span className={`status-pill ${className}`}>{status}</span>;
}

export default function WeaponsDb() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) => {
    if (filter !== "all" && item.category !== filter) {
      return false;
    }

    if (!search.trim()) {
      return true;
    }

    const q = search.toLowerCase();
    return [item.name, item.summary, item.quickAnswer, item.evidenceStatus]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <main className="container py-8">
      <div className="surface p-4 mb-6">
        <p className="text-[13px] leading-6 text-silver-text">
          This legacy database now uses the evidence-labeled Fatekeeper wiki data layer. Single-source weapon, spell, and relic reports are shown as reports, not official facts.
        </p>
      </div>

      <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl border border-graphite">
        <Image
          src="/images/fatekeeper-gameplay-reveal.jpg"
          alt="Fatekeeper weapons, spells, and relics database"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/" className="btn-ghost">
          Home
        </Link>
        <Link href="/wiki/weapons" className="btn-primary">
          Open weapons wiki
        </Link>
      </div>

      <h1 className="section-title mt-4">Weapons, Spells and Relics Database</h1>
      <p className="mt-3 max-w-3xl text-[16px] leading-7 text-off-white">
        Search the merged wiki layer for reported weapons, spells, relics, locations, effects, and source confidence.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, effect, status, or summary..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="surface-tight min-w-[220px] flex-1 p-3 text-[14px] text-white placeholder-silver-text/40"
        />
        {["all", ...trackedCategories].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`pill px-4 py-2 text-[13px] ${filter === category ? "status-verified" : ""}`}
          >
            {category === "all" ? "All" : category} (
            {category === "all" ? items.length : items.filter((item) => item.category === category).length})
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {filtered.map((item) => (
          <Link key={item.id} href={getWikiHref(item)} className="surface surface-link p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-[20px] font-medium text-white">{item.name}</h2>
                  <EvidenceBadge status={item.evidenceStatus} />
                </div>
                <p className="mt-2 text-[14px] leading-6 text-silver-text">{item.quickAnswer}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="mono-label">{item.category}</span>
              <span className="mono-label">Checked {item.lastChecked}</span>
              <span className="mono-label">{item.sources.length} source{item.sources.length === 1 ? "" : "s"}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
