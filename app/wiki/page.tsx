import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { JsonLd } from "@/components/json-ld";
import {
  evidenceDescriptions,
  getWikiCategoryCount,
  wikiCategories,
  wikiEntities
} from "@/lib/wiki-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Fatekeeper Wiki: Weapons, Builds, Relics, Locations and Mechanics"
  },
  description:
    "Browse the Fatekeeper wiki by weapons, relics, spells, builds, bosses, locations, mechanics, and performance evidence status.",
  alternates: {
    canonical: "/wiki"
  }
};

const evidenceRows = Object.entries(evidenceDescriptions).map(([status, description]) => [
  status,
  description
]);

export default function WikiHomePage() {
  const featuredEntities = wikiEntities.slice(0, 8);

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Fatekeeper Wiki",
            url: `${siteConfig.domain}/wiki`,
            description:
              "Evidence-labeled Fatekeeper wiki for weapons, relics, spells, builds, locations, bosses, mechanics, and performance.",
            about: {
              "@type": "VideoGame",
              name: "Fatekeeper"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
              { "@type": "ListItem", position: 2, name: "Wiki", item: `${siteConfig.domain}/wiki` }
            ]
          }
        ]}
      />

      <section className="container py-12">
        <div className="article-header !max-w-none">
          <div className="article-meta">
            <Link href="/" className="pill">
              Home
            </Link>
            <span className="pill">Wiki</span>
            <span className="status-pill status-official">Evidence layered</span>
          </div>
          <h1 className="hero-title max-w-5xl">Fatekeeper Wiki</h1>
          <p className="article-deck mt-6">
            Weapons, relics, spells, builds, locations, bosses, mechanics, and performance data with source labels instead of fake certainty.
          </p>
        </div>
      </section>

      <section className="container pb-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {wikiCategories
            .sort((a, b) => a.priority - b.priority)
            .map((category) => (
              <Link key={category.slug} href={category.href} className="surface surface-link p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-label">{category.label}</span>
                  <span className="status-pill">{getWikiCategoryCount(category.slug)} entries</span>
                </div>
                <h2 className="mt-6 text-[24px] font-medium leading-tight text-white">{category.title}</h2>
                <p className="mt-3 text-[14px] leading-6 text-silver-text">{category.description}</p>
              </Link>
            ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface p-5 md:p-6">
            <p className="kicker">Evidence model</p>
            <h2 className="section-title mt-3">Source status is part of the answer</h2>
            <p className="mt-4 text-[16px] leading-7 text-off-white">
              Public Fatekeeper data is still noisy. The wiki preserves source confidence, conflicting reports, and last-checked dates so a player can decide whether a claim is safe to use.
            </p>
          </div>
          <DataTable
            table={{
              caption: "Fatekeeper wiki evidence status definitions",
              headers: ["Status", "Meaning"],
              rows: evidenceRows
            }}
          />
        </div>
      </section>

      <section className="container py-8 pb-12">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Tracked entries</p>
            <h2 className="section-title mt-3">First wiki entities</h2>
          </div>
          <Link href="/fatekeeper/weapons" className="btn-ghost">
            Weapon guide hub
          </Link>
          <Link href="/database/weapons" className="btn-ghost">
            Merged database view
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuredEntities.map((entity) => (
            <Link key={entity.id} href={`/wiki/${entity.category}/${entity.slug}`} className="surface surface-link p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="mono-label">{entity.category}</span>
                <span className="status-pill status-analysis">{entity.evidenceStatus}</span>
              </div>
              <h3 className="mt-5 text-[23px] font-medium leading-tight text-white">{entity.name}</h3>
              <p className="mt-3 text-[14px] leading-6 text-silver-text">{entity.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
