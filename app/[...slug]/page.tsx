import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideLayout } from "@/components/guide-layout";
import { JsonLd } from "@/components/json-ld";
import { RelatedGuides } from "@/components/related-guides";
import { getGuidePage, getGuides, guidePages } from "@/lib/guides";
import { media, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug.split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug.join("/"));

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.domain}/${page.slug}`,
      type: "article",
      images: [{ url: page.heroImage }]
    }
  };
}

export default async function DynamicGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getGuidePage(slug.join("/"));

  if (!page) {
    notFound();
  }

  const relatedGuides = getGuides(page.related);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.description,
            image: page.heroImage,
            datePublished: page.lastUpdated,
            dateModified: page.lastUpdated,
            author: {
              "@type": "Organization",
              name: siteConfig.author
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.shortName,
              logo: {
                "@type": "ImageObject",
                url: media.box
              }
            },
            citation: page.sources.map((source) => source.url),
            mainEntityOfPage: `${siteConfig.domain}/${page.slug}`
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.domain
              },
              {
                "@type": "ListItem",
                position: 2,
                name: page.h1,
                item: `${siteConfig.domain}/${page.slug}`
              }
            ]
          }
        ]}
      />
      <GuideLayout page={page} />
      <RelatedGuides guides={relatedGuides} />
    </>
  );
}
