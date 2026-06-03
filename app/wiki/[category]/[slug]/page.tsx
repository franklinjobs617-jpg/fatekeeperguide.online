import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { JsonLd } from "@/components/json-ld";
import { SourceList } from "@/components/source-list";
import {
  evidenceDescriptions,
  getRelatedWikiEntities,
  getWikiCategory,
  getWikiEntity,
  getWikiHref,
  wikiEntities
} from "@/lib/wiki-data";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return wikiEntities.map((entity) => ({
    category: entity.category,
    slug: entity.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const entity = getWikiEntity(category, slug);

  if (!entity) {
    return {};
  }

  return {
    title: {
      absolute: `${entity.name} - Fatekeeper Wiki`
    },
    description: entity.summary,
    alternates: {
      canonical: `/wiki/${entity.category}/${entity.slug}`
    },
    openGraph: {
      title: `${entity.name} - Fatekeeper Wiki`,
      description: entity.summary,
      url: `${siteConfig.domain}/wiki/${entity.category}/${entity.slug}`,
      type: "article"
    }
  };
}

export default async function WikiEntityPage({ params }: PageProps) {
  const { category, slug } = await params;
  const entity = getWikiEntity(category, slug);
  const wikiCategory = getWikiCategory(category);

  if (!entity || !wikiCategory) {
    notFound();
  }

  const related = getRelatedWikiEntities(entity);
  const href = getWikiHref(entity);
  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${entity.name} - Fatekeeper Wiki`,
      description: entity.summary,
      datePublished: entity.lastChecked,
      dateModified: entity.lastChecked,
      author: {
        "@type": "Organization",
        name: siteConfig.author
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.shortName
      },
      citation: entity.sources.map((source) => source.url),
      mainEntityOfPage: `${siteConfig.domain}${href}`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.domain },
        { "@type": "ListItem", position: 2, name: "Wiki", item: `${siteConfig.domain}/wiki` },
        {
          "@type": "ListItem",
          position: 3,
          name: wikiCategory.label,
          item: `${siteConfig.domain}/wiki/${wikiCategory.slug}`
        },
        {
          "@type": "ListItem",
          position: 4,
          name: entity.name,
          item: `${siteConfig.domain}${href}`
        }
      ]
    }
  ];

  if (entity.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entity.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
  }

  return (
    <main>
      <JsonLd data={jsonLd} />

      <section className="container py-12">
        <div className="article-header !max-w-none">
          <div className="article-meta">
            <Link href="/" className="pill">
              Home
            </Link>
            <Link href="/wiki" className="pill">
              Wiki
            </Link>
            <Link href={`/wiki/${wikiCategory.slug}`} className="pill">
              {wikiCategory.label}
            </Link>
            <span className="status-pill status-analysis">{entity.evidenceStatus}</span>
            <span className="pill">Checked {entity.lastChecked}</span>
          </div>
          <h1 className="hero-title max-w-5xl">{entity.name}</h1>
          <p className="article-deck mt-6">{entity.summary}</p>
        </div>
      </section>

      <section id="quick-answer" className="container scroll-mt-28 pb-8">
        <div className="section-index quick-answer-card md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-graphite p-5 md:border-b-0 md:border-r md:p-6">
            <p className="kicker">Quick answer</p>
            <p className="mt-4 text-[18px] leading-8 text-off-white">{entity.quickAnswer}</p>
          </div>
          <div className="bg-dark-granite p-5 md:p-6">
            <p className="kicker">Evidence status</p>
            <h2 className="mt-4 text-[28px] font-medium text-white">{entity.evidenceStatus}</h2>
            <p className="mt-3 text-[15px] leading-6 text-silver-text">
              {evidenceDescriptions[entity.evidenceStatus]}
            </p>
            <p className="mt-4 font-mono text-[12px] leading-5 text-off-white">Patch/version: {entity.patchVersion}</p>
          </div>
        </div>
      </section>

      <section className="container py-3">
        <div className="section-index">
          <p className="mb-3 mono-label">On this page</p>
          <nav className="flex gap-2 overflow-x-auto pb-2" aria-label="Wiki entry sections">
            {Boolean(entity.visuals?.length) && (
              <a href="#visuals" className="pill">
                Visual evidence
              </a>
            )}
            {(Boolean(entity.routeSteps?.length) || Boolean(entity.lootRows?.length)) && (
              <a href="#route-loot" className="pill">
                Route and loot
              </a>
            )}
            <a href="#data" className="pill">
              Data
            </a>
            <a href="#sources" className="pill">
              Sources
            </a>
            {Boolean(entity.conflicts?.length) && (
              <a href="#conflicts" className="pill">
                Conflicts
              </a>
            )}
            <a href="#related" className="pill">
              Related
            </a>
            {Boolean(entity.faqs?.length) && (
              <a href="#faq" className="pill">
                FAQ
              </a>
            )}
          </nav>
        </div>
      </section>

      <section className="container py-8">
        <article className="guide-body">
          {Boolean(entity.visuals?.length) && (
            <section id="visuals" className="article-section scroll-mt-28">
              <h2>Visual evidence</h2>
              <p>
                These images come from official Steam media or clearly labeled source references. They add visual context without pretending that every reported item has a verified item-icon screenshot.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {entity.visuals?.map((visual) => (
                  <figure key={`${visual.image}-${visual.title}`} className="surface overflow-hidden">
                    <div className="relative aspect-video border-b border-graphite bg-true-black">
                      <Image
                        src={visual.image}
                        alt={visual.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 390px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="mono-label">{visual.kind}</span>
                        <a href={visual.sourceUrl} target="_blank" rel="noreferrer" className="status-pill">
                          {visual.sourceLabel}
                        </a>
                      </div>
                      <h3 className="mt-3 text-[18px] font-medium text-white">{visual.title}</h3>
                      <p className="mt-2 text-[13px] leading-5 text-silver-text">{visual.caption}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {(Boolean(entity.routeSteps?.length) || Boolean(entity.lootRows?.length)) && (
            <section id="route-loot" className="article-section scroll-mt-28">
              <h2>Route and loot map</h2>
              <p>
                This is a text route and loot ledger, not a fabricated map screenshot. It shows what to check, what the current report says, and what still needs direct capture.
              </p>
              {Boolean(entity.routeSteps?.length) && (
                <ol className="mt-5 grid gap-3 p-0">
                  {entity.routeSteps?.map((step, index) => (
                    <li key={step} className="route-step surface-tight flex gap-4 p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cadmium-green font-mono text-[12px] text-cadmium-green">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] leading-6 text-off-white">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {Boolean(entity.lootRows?.length) && (
                <DataTable
                  table={{
                    caption: `${entity.name} route and loot ledger`,
                    headers: ["Type", "Name", "Route / use", "Evidence"],
                    rows: entity.lootRows ?? []
                  }}
                />
              )}
            </section>
          )}

          <section id="data" className="article-section scroll-mt-28">
            <h2>Wiki data</h2>
            <p>
              Fields below keep their own evidence labels. A reported location or effect is useful for play planning, but it is not treated as official unless the source supports that.
            </p>
            <DataTable
              table={{
                caption: `${entity.name} wiki fields`,
                headers: ["Field", "Value", "Evidence", "Source"],
                rows: entity.fields.map((field) => [
                  field.label,
                  field.value,
                  field.evidenceStatus ?? entity.evidenceStatus,
                  field.sourceLabel ?? "Entry sources"
                ])
              }}
            />
          </section>

          <section id="sources" className="article-section scroll-mt-28">
            <h2>Sources</h2>
            <p>
              Sources are shown so players can separate official facts from guide reports, community reports, and wiki-style claims.
            </p>
            <div className="mt-5">
              <SourceList sources={entity.sources} />
            </div>
          </section>

          {Boolean(entity.conflicts?.length) && (
            <section id="conflicts" className="article-section scroll-mt-28">
              <h2>Conflicting reports</h2>
              <p>
                This entry has source disagreement. The conflict is preserved instead of being flattened into one invented answer.
              </p>
              {entity.conflicts?.map((conflict) => (
                <DataTable
                  key={conflict.field}
                  table={{
                    caption: `${entity.name} conflict: ${conflict.field}`,
                    headers: ["Field", "Issue", "Source", "Report"],
                    rows: conflict.reports.map((report) => [
                      conflict.field,
                      conflict.issue,
                      report.source,
                      report.value
                    ])
                  }}
                />
              ))}
            </section>
          )}

          <section id="related" className="article-section scroll-mt-28">
            <h2>Related entries and guides</h2>
            <p>
              Wiki entries link across builds, locations, items, and mechanics so players can move from a found item to the route or build that uses it.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {related.map((relatedEntity) => (
                <Link key={relatedEntity.id} href={getWikiHref(relatedEntity)} className="surface surface-link p-4">
                  <span className="mono-label">{relatedEntity.category}</span>
                  <h3 className="mt-3 text-[19px] font-medium text-white">{relatedEntity.name}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-silver-text">{relatedEntity.summary}</p>
                </Link>
              ))}
              {entity.relatedGuides.map((guide) => (
                <Link key={guide} href={guide} className="surface surface-link p-4">
                  <span className="mono-label">Guide</span>
                  <h3 className="mt-3 text-[19px] font-medium text-white">{guide.replace("/fatekeeper/", "").replaceAll("-", " ")}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-silver-text">Open the related Fatekeeper guide hub.</p>
                </Link>
              ))}
            </div>
          </section>

          {Boolean(entity.faqs?.length) && (
            <section id="faq" className="article-section scroll-mt-28">
              <h2>FAQ</h2>
              <div className="mt-5 grid gap-3">
                {entity.faqs?.map((faq) => (
                  <div key={faq.question} className="surface-tight p-4">
                    <h3 className="text-[17px] font-medium text-white">{faq.question}</h3>
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}
