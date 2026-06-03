import Image from "next/image";
import Link from "next/link";
import type { GuidePage } from "@/lib/guides";
import { media } from "@/lib/site";
import { DataTable } from "./data-table";
import { GuideFaqList } from "./guide-faq";
import { PlayerQuestions } from "./player-questions";
import { SourceList } from "./source-list";
import { StatusBadge } from "./status-badge";

function toId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const guideWikiLinks: Record<string, { href: string; label: string; body: string }> = {
  "fatekeeper/weapons": {
    href: "/wiki/weapons",
    label: "Open weapons wiki",
    body: "Weapon entries now live in the evidence-labeled wiki with source reports, related builds, and location fields."
  },
  "fatekeeper/spells": {
    href: "/wiki/spells",
    label: "Open spells wiki",
    body: "Spell entries now track roles, reported effects, related builds, and source confidence."
  },
  "fatekeeper/relics": {
    href: "/wiki/relics",
    label: "Open relics wiki",
    body: "Relic entries now separate official facts, community reports, and unverified effects."
  },
  "fatekeeper/enemies": {
    href: "/wiki/bosses",
    label: "Open bosses wiki",
    body: "Enemy and boss data is being moved into source-labeled entity pages instead of flat article notes."
  },
  "fatekeeper/bosses": {
    href: "/wiki/bosses",
    label: "Open bosses wiki",
    body: "Boss entries track phase notes, drops, rewards, weaknesses, and whether the data is verified."
  },
  "fatekeeper/world": {
    href: "/wiki/locations",
    label: "Open locations wiki",
    body: "Location pages connect hidden loot, bosses, mechanics, and route notes with evidence labels."
  },
  "fatekeeper/builds": {
    href: "/wiki/builds",
    label: "Open builds wiki",
    body: "Build entries now track key gear reports, confidence, risks, and related items."
  },
  "fatekeeper/reviews": {
    href: "/wiki/performance",
    label: "Open performance wiki",
    body: "Review and performance facts now link to Steam status, requirements, and launch evidence."
  }
};

export function GuideLayout({ page }: { page: GuidePage }) {
  const wikiLink = guideWikiLinks[page.slug];

  return (
    <main>
      <section className="container">
        <header className="article-header">
          <div className="article-meta">
            <Link href="/" className="pill">
              Home
            </Link>
            <span className="pill">{page.category}</span>
            <StatusBadge status={page.status} />
            <span className="pill">Updated {page.lastUpdated}</span>
          </div>

          <h1 className="hero-title max-w-5xl">{page.h1}</h1>
          <p className="article-deck mt-6">{page.description}</p>

          <div className="article-media">
            <Image
              src={page.heroImage}
              alt={`${page.h1} official Fatekeeper visual reference`}
              fill
              priority
              sizes="(max-width: 1240px) calc(100vw - 32px), 980px"
              className="object-cover"
            />
          </div>
        </header>
      </section>

      <section id="quick-answer" className="container scroll-mt-28 pb-8">
        <div className="section-index quick-answer-card md:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-graphite p-5 md:border-b-0 md:border-r md:p-6">
            <p className="kicker">Quick answer</p>
            <p className="mt-4 text-[18px] leading-8 text-off-white">{page.quickAnswer}</p>
          </div>
          <div className="bg-dark-granite p-5 md:p-6">
            <p className="kicker">Use this page for</p>
            <ul className="mt-4 grid gap-3">
              {page.takeaways.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-off-white">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cadmium-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {wikiLink && (
        <section className="container pb-8">
          <div className="section-index surface grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="kicker">Wiki upgrade</p>
              <h2 className="mt-3 text-[26px] font-medium leading-tight text-white">{wikiLink.label}</h2>
              <p className="mt-2 text-[15px] leading-6 text-silver-text">{wikiLink.body}</p>
            </div>
            <Link href={wikiLink.href} className="btn-primary">
              {wikiLink.label}
            </Link>
          </div>
        </section>
      )}

      <section className="container py-3">
        <div className="section-index">
          <p className="mb-3 mono-label">On this page</p>
          <nav className="flex gap-2 overflow-x-auto pb-2" aria-label="Guide sections">
            <a href="#quick-answer" className="pill">
              Quick answer
            </a>
            {page.sections.map((section) => (
              <a key={section.heading} href={`#${toId(section.heading)}`} className="pill">
                {section.heading}
              </a>
            ))}
            {Boolean(page.faqs?.length) && (
              <a href="#faq" className="pill">
                FAQ
              </a>
            )}
            <a href="#sources" className="pill">
              Sources
            </a>
          </nav>
        </div>
      </section>

      <section className="container">
        <PlayerQuestions page={page} />
      </section>

      <section className="container py-8">
        <article className="guide-body">
          <section className="article-section">
            <h2>Official visual references</h2>
            <p>
              Screenshots and trailer frames are used as visual anchors for the guide. Gameplay stats,
              locations, drops, boss routes, and build rankings remain labeled until they can be
              verified in the playable Early Access build.
            </p>
            <div className="media-strip mt-5">
              {[page.heroImage, media.combat, media.gear].map((src, index) => (
                <div key={`${src}-${index}`} className="media-tile">
                  <Image
                    src={src}
                    alt={`${page.h1} official visual reference ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {page.sections.map((section) => (
            <section key={section.heading} id={toId(section.heading)} className="article-section scroll-mt-28">
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.image && (
                <div className="mt-5 relative aspect-video w-full overflow-hidden rounded-xl border border-graphite">
                  <Image src={section.image} alt={section.imageAlt ?? section.heading} fill sizes="(max-width: 768px) 100vw, 780px" className="object-cover" />
                </div>
              )}
              {section.videoId && (
                <div className="mt-5 relative aspect-video w-full overflow-hidden rounded-xl border border-graphite">
                  <iframe src={`https://www.youtube.com/embed/${section.videoId}`} title={section.heading} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              )}
              {section.table && <DataTable table={section.table} />}
              {section.note && (
                <p className="note-panel mt-5 rounded-xl border border-cadmium-green bg-cadmium-green p-4 font-mono text-[14px] leading-6">
                  {section.note}
                </p>
              )}
            </section>
          ))}

          <GuideFaqList faqs={page.faqs ?? []} />

          <section id="sources" className="article-section scroll-mt-28">
            <h2>Sources and verification status</h2>
            <p>
              Confirmed details come from official, storefront, publisher, video, community, or media
              references. Exact gameplay data is held back until it has direct evidence from the
              playable build.
            </p>
            <div className="mt-5">
              <SourceList sources={page.sources} />
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
