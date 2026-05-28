import Image from "next/image";
import Link from "next/link";
import { BuildCard } from "@/components/build-card";
import { DatabaseFilter } from "@/components/database-filter";
import { GuideCard } from "@/components/guide-card";
import { GuideSearch } from "@/components/guide-search";
import { JsonLd } from "@/components/json-ld";
import { StatusBadge } from "@/components/status-badge";
import { getFeaturedGuides, getGuides, getLatestGuides, getSearchIndex, homeClusters } from "@/lib/guides";
import { playerDemandSignals, researchSourceNotes } from "@/lib/research";
import { fatekeeperFacts, media, siteConfig, sourceLinks } from "@/lib/site";

const routeCards = [
  {
    label: "Release and PC check",
    href: "/fatekeeper/release-date",
    body: "Unlock timing, platform, system requirements, and what to verify before purchase."
  },
  {
    label: "Early Access scope",
    href: "/fatekeeper/early-access",
    body: "Content length, launch risks, update expectations, and what needs hands-on testing."
  },
  {
    label: "First hour plan",
    href: "/fatekeeper/first-hours-guide",
    body: "What to learn first, how to read combat pressure, and which choices should stay flexible."
  },
  {
    label: "Build lab",
    href: "/fatekeeper/builds",
    body: "Beginner, spellblade, heavy, and dagger plans with clear confidence labels."
  },
  {
    label: "Gear and magic data",
    href: "/fatekeeper/weapons",
    body: "Weapons, spells, relic fields, source status, and future verified database entries."
  },
  {
    label: "Bosses and world help",
    href: "/fatekeeper/bosses",
    body: "Enemy patterns, boss pages, exploration notes, and spoiler-aware testing rules."
  }
];

export default function HomePage() {
  const featuredGuides = getFeaturedGuides();
  const latestGuides = getLatestGuides();
  const searchIndex = getSearchIndex();

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: siteConfig.name,
            url: siteConfig.domain,
            description: siteConfig.description,
            about: {
              "@type": "VideoGame",
              name: "Fatekeeper",
              applicationCategory: "Game",
              operatingSystem: "Windows PC",
              publisher: {
                "@type": "Organization",
                name: fatekeeperFacts.publisher
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Fatekeeper Gameplay Reveal",
            description:
              "Official Fatekeeper gameplay reveal video referenced for combat, build, and exploration coverage.",
            thumbnailUrl: media.gameplayThumb,
            uploadDate: "2025-08-01",
            embedUrl: "https://www.youtube.com/embed/ZeBHDscQKOE",
            contentUrl: sourceLinks.youtubeGameplay.url
          }
        ]}
      />

      <section className="home-hero-shell">
        <div className="home-hero">
          <div className="hero-image-cycle" aria-hidden="true">
            <Image
              src={media.heroVisual}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="hero-shade" />

          <div className="container home-hero-content">
            <div className="home-hero-copy">
              <p className="kicker">Fatekeeper Early Access guide terminal</p>
              <h1 className="hero-title mt-5 max-w-5xl">Fatekeeper Guide Library</h1>
              <p className="mt-6 max-w-2xl text-[20px] leading-8">
                Fast, source-backed English guides for release timing, Early Access decisions,
                beginner systems, builds, weapons, spells, relics, enemies, bosses, and world routes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/fatekeeper/beginner-guide" className="btn-primary">
                  Open beginner guide
                </Link>
                <Link href="/fatekeeper/early-access" className="btn-ghost">
                  Read Early Access notes
                </Link>
                <a href={sourceLinks.youtubeGameplay.url} target="_blank" rel="noreferrer" className="btn-ghost">
                  Watch official gameplay
                </a>
              </div>
            </div>

            <div className="mt-10 hero-fact-grid">
              <HeroFact label="Release" value={fatekeeperFacts.releaseLabel} />
              <HeroFact label="Platform" value={fatekeeperFacts.platform} />
              <HeroFact label="Early Access" value={fatekeeperFacts.earlyAccessLength} />
              <HeroFact label="Verification" value="Official facts first, tested notes after launch" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <GuideSearch items={searchIndex} />
      </section>

      <section className="container py-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Player questions</p>
            <h2 className="section-title mt-3">What players want answered before and after launch</h2>
          </div>
          <a href={sourceLinks.redditGameplay.url} target="_blank" rel="noreferrer" className="btn-ghost">
            Reddit discussion
          </a>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {playerDemandSignals.map((signal) => (
            <Link key={signal.title} href={signal.href} className="surface surface-link p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="mono-label">{signal.intent}</span>
                <span className="status-pill">Source-backed</span>
              </div>
              <h3 className="mt-5 text-[23px] font-medium leading-tight text-white">{signal.title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-silver-text">{signal.body}</p>
              <span className="mt-5 block font-mono text-[12px] text-off-white">{signal.source.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Guide routes</p>
            <h2 className="section-title mt-3">Pick the page by the problem you are solving</h2>
          </div>
          <Link href="/fatekeeper/system-requirements" className="btn-ghost">
            PC requirements
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {routeCards.map((card, index) => (
            <Link key={card.href} href={card.href} className="surface surface-link p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                <span className="pill px-3 py-2 text-[11px]">View guide</span>
              </div>
              <h3 className="mt-6 text-[24px] font-medium leading-tight text-white">{card.label}</h3>
              <p className="mt-3 text-[14px] leading-6 text-silver-text">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="muted-panel p-5 md:p-6">
            <p className="kicker">Official media reference</p>
            <h2 className="section-title mt-3">Use the game footage, not invented systems</h2>
            <p className="mt-4 text-[16px] leading-7 text-off-white">
              The library is built around official footage, Steam details, publisher notes, and
              post-launch verification. Unconfirmed weapon stats, boss routes, drops, and tier lists
              stay marked until they can be tested.
            </p>
          </div>
          <div className="media-strip">
            {[media.heroVisual, media.hero, media.combat, media.gear].map((src, index) => (
              <div key={src} className="media-tile">
                <Image
                  src={src}
                  alt={`Fatekeeper official gameplay screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Priority guides</p>
            <h2 className="section-title mt-3">Pages players will open first</h2>
          </div>
          <Link href="/fatekeeper/builds/best-builds" className="btn-ghost">
            Build hub
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.slice(0, 6).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="surface p-5 md:p-6">
            <p className="kicker">Build lab</p>
            <h2 className="section-title mt-3">Choose a combat plan by risk, speed, and verification status</h2>
            <p className="mt-4 text-[16px] leading-7 text-off-white">
              Build pages are written as testable plans. They show playstyle, strengths, weaknesses,
              upgrade priorities, likely weapon or spell links, and what must be checked in Early Access.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <BuildCard
              kind="beginner"
              title="Beginner Build"
              href="/fatekeeper/builds/beginner-build"
              body="A conservative first build for learning combat, upgrades, and resource pressure."
            />
            <BuildCard
              kind="spellblade"
              title="Spellblade Build"
              href="/fatekeeper/builds/spellblade-build"
              body="Hybrid melee and magic plan built around synergy tests and flexible scaling."
            />
            <BuildCard
              kind="heavy"
              title="Heavy Build"
              href="/fatekeeper/builds/heavy-build"
              body="Commitment, stagger, recovery windows, and high-impact weapon testing."
            />
            <BuildCard
              kind="dagger"
              title="Dagger Build"
              href="/fatekeeper/builds/dagger-build"
              body="Fast pressure, spacing, enemy matchup notes, and close-range survival checks."
            />
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Directory</p>
            <h2 className="section-title mt-3">Full Fatekeeper guide map</h2>
          </div>
          <DatabaseFilter />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {homeClusters.map((cluster) => (
            <div key={cluster.title} className="surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[26px] font-medium leading-tight text-white">{cluster.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-silver-text">{cluster.description}</p>
                </div>
                <span className="status-pill status-analysis">{cluster.pages.length} pages</span>
              </div>
              <div className="mt-5 grid gap-2">
                {getGuides(cluster.pages).map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/${guide.slug}`}
                    className="surface-tight surface-link flex items-center justify-between gap-4 p-3"
                  >
                    <span>
                      <span className="block text-[15px] font-medium text-white">{guide.h1}</span>
                      <span className="mt-1 block text-[12px] leading-5 text-silver-text">{guide.intent}</span>
                    </span>
                    <StatusBadge status={guide.status} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface p-5 md:p-6">
            <p className="kicker">Updates</p>
            <h2 className="section-title mt-3">Recently updated pages</h2>
            <p className="mt-4 text-[16px] leading-7 text-off-white">
              Each update keeps official facts, trailer analysis, and post-launch testing separated
              so players know exactly how reliable a claim is.
            </p>
          </div>
          <div className="grid gap-3">
            {latestGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="surface-tight surface-link flex items-center justify-between gap-4 p-4"
              >
                <span>
                  <span className="block text-[17px] font-medium text-white">{guide.h1}</span>
                  <span className="mt-1 block font-mono text-[12px] text-silver-text">
                    {guide.category} / Updated {guide.lastUpdated}
                  </span>
                </span>
                <StatusBadge status={guide.status} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-8 pb-12">
        <div className="surface grid gap-5 p-5 md:grid-cols-[0.85fr_1.15fr] md:p-6">
          <div>
            <p className="kicker">Sources</p>
            <h2 className="section-title mt-3">Official references behind the guide</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {researchSourceNotes.map((note) => (
              <a key={note.label} href={note.source.url} target="_blank" rel="noreferrer" className="surface-tight surface-link p-4">
                <span className="block font-mono text-[12px] uppercase text-white">{note.label}</span>
                <span className="mt-2 block text-[13px] leading-5 text-silver-text">{note.value}</span>
              </a>
            ))}
            <p className="sm:col-span-2 mt-2 text-[14px] leading-6 text-silver-text">{siteConfig.disclaimer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="hero-fact">
      <div className="hero-fact-label">{label}</div>
      <div className="hero-fact-value">{value}</div>
    </div>
  );
}
