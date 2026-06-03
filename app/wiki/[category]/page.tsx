import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { JsonLd } from "@/components/json-ld";
import {
  getWikiCategory,
  getWikiEntities,
  getWikiHref,
  wikiCategories
} from "@/lib/wiki-data";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return wikiCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const wikiCategory = getWikiCategory(category);

  if (!wikiCategory) {
    return {};
  }

  return {
    title: {
      absolute: wikiCategory.title
    },
    description: wikiCategory.description,
    alternates: {
      canonical: `/wiki/${wikiCategory.slug}`
    },
    openGraph: {
      title: wikiCategory.title,
      description: wikiCategory.description,
      url: `${siteConfig.domain}/wiki/${wikiCategory.slug}`,
      type: "website"
    }
  };
}

export default async function WikiCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const wikiCategory = getWikiCategory(category);

  if (!wikiCategory) {
    notFound();
  }

  const entities = getWikiEntities(wikiCategory.slug);

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: wikiCategory.title,
            url: `${siteConfig.domain}/wiki/${wikiCategory.slug}`,
            description: wikiCategory.description,
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
              { "@type": "ListItem", position: 2, name: "Wiki", item: `${siteConfig.domain}/wiki` },
              {
                "@type": "ListItem",
                position: 3,
                name: wikiCategory.label,
                item: `${siteConfig.domain}/wiki/${wikiCategory.slug}`
              }
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
            <Link href="/wiki" className="pill">
              Wiki
            </Link>
            <span className="pill">{wikiCategory.label}</span>
            <span className="status-pill">{entities.length} entries</span>
          </div>
          <h1 className="hero-title max-w-5xl">{wikiCategory.title}</h1>
          <p className="article-deck mt-6">{wikiCategory.description}</p>
        </div>
      </section>

      <section className="container pb-8">
        <DataTable
          table={{
            caption: `${wikiCategory.label} wiki entries`,
            headers: ["Entry", "Evidence", "Quick answer", "Last checked"],
            rows: entities.map((entity) => [
              entity.name,
              entity.evidenceStatus,
              entity.quickAnswer,
              entity.lastChecked
            ])
          }}
        />
      </section>

      <section className="container py-8 pb-12">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity) => (
            <Link key={entity.id} href={getWikiHref(entity)} className="surface surface-link p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="mono-label">{entity.category}</span>
                <span className="status-pill status-analysis">{entity.evidenceStatus}</span>
              </div>
              <h2 className="mt-5 text-[23px] font-medium leading-tight text-white">{entity.name}</h2>
              <p className="mt-3 text-[14px] leading-6 text-silver-text">{entity.summary}</p>
              <span className="mt-5 inline-flex font-mono text-[12px] text-off-white">Open entry</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
