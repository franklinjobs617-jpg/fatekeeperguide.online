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

export function GuideLayout({ page }: { page: GuidePage }) {
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
