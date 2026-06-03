export type EvidenceStatus =
  | "Official"
  | "Review Confirmed"
  | "Community Reported"
  | "Conflicting"
  | "Unverified";

export type WikiCategorySlug =
  | "weapons"
  | "relics"
  | "spells"
  | "builds"
  | "bosses"
  | "locations"
  | "mechanics"
  | "armor"
  | "materials"
  | "status-effects"
  | "performance";

export type WikiSource = {
  label: string;
  url: string;
  type: "official" | "media" | "guide" | "community" | "wiki";
};

export type WikiField = {
  label: string;
  value: string;
  evidenceStatus?: EvidenceStatus;
  sourceLabel?: string;
};

export type WikiConflictReport = {
  source: string;
  value: string;
};

export type WikiConflict = {
  field: string;
  issue: string;
  reports: WikiConflictReport[];
};

export type WikiVisualReference = {
  title: string;
  image: string;
  alt: string;
  caption: string;
  sourceLabel: string;
  sourceUrl: string;
  kind: "weapon" | "location" | "route" | "boss" | "loot" | "source";
};

export type WikiEntity = {
  id: string;
  slug: string;
  category: WikiCategorySlug;
  name: string;
  summary: string;
  quickAnswer: string;
  evidenceStatus: EvidenceStatus;
  lastChecked: string;
  patchVersion: string;
  sources: WikiSource[];
  fields: WikiField[];
  visuals?: WikiVisualReference[];
  routeSteps?: string[];
  lootRows?: string[][];
  conflicts?: WikiConflict[];
  relatedEntities: string[];
  relatedGuides: string[];
  faqs?: { question: string; answer: string }[];
};

export type WikiCategory = {
  slug: WikiCategorySlug;
  title: string;
  label: string;
  description: string;
  href: string;
  priority: number;
};

const lastChecked = "2026-06-03";

export const evidenceDescriptions: Record<EvidenceStatus, string> = {
  Official: "Confirmed by Steam, THQ Nordic, the official site, or official footage.",
  "Review Confirmed": "Repeated by media or major guide sources with enough agreement to use carefully.",
  "Community Reported": "Reported by a player, forum, wiki, or third-party guide, but not independently verified here.",
  Conflicting: "Public sources disagree. The page preserves the conflict instead of merging it into a fake fact.",
  Unverified: "Tracked as a search or gameplay topic, but exact details still need direct evidence."
};

export const wikiCategories: WikiCategory[] = [
  {
    slug: "weapons",
    title: "Fatekeeper Weapons Wiki",
    label: "Weapons",
    description: "Weapon names, types, locations, effects, scaling reports, and build links.",
    href: "/wiki/weapons",
    priority: 1
  },
  {
    slug: "relics",
    title: "Fatekeeper Relics Wiki",
    label: "Relics",
    description: "Relic effects, locations, build synergies, and source confidence.",
    href: "/wiki/relics",
    priority: 2
  },
  {
    slug: "spells",
    title: "Fatekeeper Spells Wiki",
    label: "Spells",
    description: "Spell roles, reported effects, magic build links, and verification notes.",
    href: "/wiki/spells",
    priority: 3
  },
  {
    slug: "locations",
    title: "Fatekeeper Locations Wiki",
    label: "Locations",
    description: "Areas, reported loot, route notes, bosses, and progression blockers.",
    href: "/wiki/locations",
    priority: 4
  },
  {
    slug: "builds",
    title: "Fatekeeper Builds Wiki",
    label: "Builds",
    description: "Build templates, reported key gear, strengths, risks, and confidence level.",
    href: "/wiki/builds",
    priority: 5
  },
  {
    slug: "bosses",
    title: "Fatekeeper Bosses Wiki",
    label: "Bosses",
    description: "Boss names, phase notes, weaknesses, rewards, drops, and evidence state.",
    href: "/wiki/bosses",
    priority: 6
  },
  {
    slug: "armor",
    title: "Fatekeeper Armor Wiki",
    label: "Armor",
    description: "Armor names, defense roles, weight reports, locations, and build tradeoffs.",
    href: "/wiki/armor",
    priority: 7
  },
  {
    slug: "materials",
    title: "Fatekeeper Materials Wiki",
    label: "Materials",
    description: "Upgrade materials, reported locations, farming notes, and progression use.",
    href: "/wiki/materials",
    priority: 8
  },
  {
    slug: "status-effects",
    title: "Fatekeeper Status Effects Wiki",
    label: "Status Effects",
    description: "Bleed, toxic, stagger, resistances, damage types, and verification status.",
    href: "/wiki/status-effects",
    priority: 9
  },
  {
    slug: "mechanics",
    title: "Fatekeeper Mechanics Wiki",
    label: "Mechanics",
    description: "Combat, upgrades, posture, scaling, respec, resource pressure, and rules.",
    href: "/wiki/mechanics",
    priority: 10
  },
  {
    slug: "performance",
    title: "Fatekeeper Performance Wiki",
    label: "Performance",
    description: "Steam status, reviews, requirements, Steam Deck, controller, and bug checks.",
    href: "/wiki/performance",
    priority: 11
  }
];

const steamSource: WikiSource = {
  label: "Steam store page",
  url: "https://store.steampowered.com/app/2186990/Fatekeeper/",
  type: "official"
};

const officialSource: WikiSource = {
  label: "Official Fatekeeper site",
  url: "https://fatekeeper.thqnordic.com/",
  type: "official"
};

const xmodSource: WikiSource = {
  label: "XMODhub Fatekeeper early game guide",
  url: "https://www.xmodhub.com/info/blog/best-starting-build-early-game-tips-fatekeeper/",
  type: "guide"
};

const fatekeeperWikiSource: WikiSource = {
  label: "Fatekeeper Wiki",
  url: "https://fatekeeper.wiki/",
  type: "wiki"
};

const pcgamerSource: WikiSource = {
  label: "PC Gamer Fatekeeper coverage",
  url: "https://www.pcgamer.com/games/rpg/fatekeeper-is-an-upcoming-first-person-rpg-with-heavy-dark-messiah-vibes/",
  type: "media"
};

const steamMediaSource: WikiSource = {
  label: "Steam official screenshots",
  url: "https://store.steampowered.com/app/2186990/Fatekeeper/",
  type: "official"
};

const visual = (
  image: string,
  title: string,
  alt: string,
  caption: string,
  kind: WikiVisualReference["kind"]
): WikiVisualReference => ({
  image,
  title,
  alt,
  caption,
  kind,
  sourceLabel: steamMediaSource.label,
  sourceUrl: steamMediaSource.url
});

export const wikiEntities: WikiEntity[] = [
  {
    id: "obsidian_dagger",
    slug: "obsidian-dagger",
    category: "weapons",
    name: "Obsidian Dagger",
    summary:
      "A reported early Dexterity dagger with built-in bleed value. Treat the exact location and effect as a third-party guide report until checked in-game.",
    quickAnswer:
      "Obsidian Dagger is currently tracked as a community-reported Dexterity dagger, with XMODhub placing it in a hidden alcove in Whispering Woods.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Type", value: "Dagger", evidenceStatus: "Community Reported", sourceLabel: xmodSource.label },
      {
        label: "Location report",
        value: "Whispering Woods hidden alcove",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      {
        label: "Effect report",
        value: "Built-in bleed buildup, reported as useful against early bosses",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      { label: "Build fit", value: "Dagger build, Shadow-Dancer", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Inventory and blade reference",
        "Fatekeeper inventory screen showing weapon slots and a blade item from official Steam media",
        "Official Steam media shows the inventory and weapon UI context. This is a visual reference, not a verified Obsidian Dagger item icon.",
        "weapon"
      ),
      visual(
        "/images/wiki/steam-screenshot-2.jpg",
        "Whispering Woods route context",
        "Fatekeeper forest area with first-person weapon from official Steam media",
        "Used as route context for the reported Whispering Woods location. It does not prove the hidden alcove location by itself.",
        "route"
      )
    ],
    routeSteps: [
      "Enter the reported Whispering Woods route and treat side alcoves as the search target.",
      "Check hidden side spaces before committing upgrade materials.",
      "Record a screenshot when the item name appears in-game; until then this location remains Community Reported."
    ],
    lootRows: [
      ["Reported item", "Obsidian Dagger", "Whispering Woods hidden alcove", "Community Reported"],
      ["Related build", "Shadow-Dancer", "Bleed / Dexterity pressure", "Community Reported"]
    ],
    relatedEntities: ["whispering_woods", "shadow_dancer", "posture_poise"],
    relatedGuides: ["/fatekeeper/weapons", "/fatekeeper/builds/dagger-build"],
    faqs: [
      {
        question: "Where is Obsidian Dagger in Fatekeeper?",
        answer:
          "Current third-party guide reports place Obsidian Dagger in a hidden alcove in Whispering Woods. This site keeps that as Community Reported until independently checked."
      }
    ]
  },
  {
    id: "ring_of_leech",
    slug: "ring-of-the-leech",
    category: "relics",
    name: "Ring of the Leech",
    summary:
      "A reported sustain relic linked to critical executions and melee builds. The exact number is useful for planning, but it remains a third-party report here.",
    quickAnswer:
      "Ring of the Leech is tracked as a community-reported relic behind the waterfall in Whispering Woods, with a reported critical execution heal effect.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Type", value: "Relic / Ring", evidenceStatus: "Community Reported" },
      {
        label: "Location report",
        value: "Behind the waterfall at the base of Whispering Woods",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      {
        label: "Effect report",
        value: "Restores 2% max HP on critical execution",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      { label: "Build fit", value: "Shadow-Dancer, tank sustain, melee recovery", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-6.jpg",
        "Cave and hidden-route reference",
        "Fatekeeper cave route from official Steam media",
        "Official media supports the game's hidden-route visual language. This is not a verified Ring of the Leech pickup screenshot.",
        "route"
      ),
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Equipment screen reference",
        "Fatekeeper inventory and equipment screen from official Steam media",
        "Used as visual support for relic/equipment UI context, not as a confirmed Ring of the Leech icon.",
        "loot"
      )
    ],
    routeSteps: [
      "Use the reported waterfall route in Whispering Woods as the search area.",
      "Confirm whether the pickup text says Ring of the Leech before treating the effect as verified.",
      "If another source reports a different location, move the page to Conflicting until tested."
    ],
    lootRows: [
      ["Reported relic", "Ring of the Leech", "Behind waterfall at base of Whispering Woods", "Community Reported"],
      ["Reported effect", "2% max HP restored on critical execution", "XMODhub guide report", "Community Reported"]
    ],
    relatedEntities: ["whispering_woods", "shadow_dancer", "obsidian_dagger"],
    relatedGuides: ["/fatekeeper/relics", "/fatekeeper/builds/beginner-build"]
  },
  {
    id: "miasma_orb",
    slug: "miasma-orb",
    category: "spells",
    name: "Miasma Orb",
    summary:
      "A reported status spell used by Arcane-style builds. The exact stacking behavior is tracked as third-party guide data.",
    quickAnswer:
      "Miasma Orb is currently tracked as a community-reported toxic/status spell for Arcane builds.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Type", value: "Spell", evidenceStatus: "Community Reported" },
      { label: "Location report", value: "Whispering Woods", evidenceStatus: "Community Reported" },
      {
        label: "Effect report",
        value: "Toxic-style percentage damage after repeated application",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      { label: "Build fit", value: "Arcane Trickster, spellblade testing", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Spells tab and UI reference",
        "Fatekeeper inventory screen with spells tab visible from official Steam media",
        "Official media shows the menu context for spells. It is not a verified Miasma Orb icon.",
        "source"
      ),
      visual(
        "/images/wiki/steam-screenshot-4.jpg",
        "Combat cast-range reference",
        "Fatekeeper first-person combat scene from official Steam media",
        "Used as combat context for spell safety and spacing discussions.",
        "weapon"
      )
    ],
    lootRows: [
      ["Reported spell", "Miasma Orb", "Whispering Woods", "Community Reported"],
      ["Reported role", "Toxic/status pressure", "Arcane Trickster and spellblade testing", "Community Reported"]
    ],
    relatedEntities: ["whispering_woods", "shadow_dancer"],
    relatedGuides: ["/fatekeeper/spells", "/fatekeeper/builds/spellblade-build"]
  },
  {
    id: "whispering_woods",
    slug: "whispering-woods",
    category: "locations",
    name: "Whispering Woods",
    summary:
      "A reported early area connected to several high-demand item lookups. It should become a location hub for routes, hidden loot, enemies, and build-relevant pickups.",
    quickAnswer:
      "Whispering Woods is tracked as an early location with third-party reports for Obsidian Dagger, Ring of the Leech, and Miasma Orb.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource, officialSource],
    fields: [
      { label: "Area role", value: "Reported early exploration zone", evidenceStatus: "Community Reported" },
      { label: "Reported loot", value: "Obsidian Dagger, Ring of the Leech, Miasma Orb", evidenceStatus: "Community Reported" },
      { label: "Guide use", value: "Hidden loot route, first-hour exploration, early build setup" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-2.jpg",
        "Whispering Woods visual reference",
        "Fatekeeper misty forest area from official Steam media",
        "Official Steam media used as forest/Whispering Woods route context.",
        "location"
      ),
      visual(
        "/images/wiki/steam-screenshot-6.jpg",
        "Hidden cave route reference",
        "Fatekeeper cave corridor from official Steam media",
        "Useful visual reference for hidden-route and waterfall-adjacent exploration patterns.",
        "route"
      )
    ],
    routeSteps: [
      "Use the forest route as the primary exploration layer.",
      "Check water, cave, and side-alcove paths before leaving the area.",
      "Tie each confirmed pickup to its own item page with screenshot evidence."
    ],
    lootRows: [
      ["Reported weapon", "Obsidian Dagger", "Hidden alcove", "Community Reported"],
      ["Reported relic", "Ring of the Leech", "Waterfall route", "Community Reported"],
      ["Reported spell", "Miasma Orb", "Whispering Woods", "Community Reported"]
    ],
    relatedEntities: ["obsidian_dagger", "ring_of_leech", "miasma_orb"],
    relatedGuides: ["/fatekeeper/world", "/fatekeeper/first-hours-guide"]
  },
  {
    id: "cinder_keep",
    slug: "cinder-keep",
    category: "locations",
    name: "Cinder Keep",
    summary:
      "A reported progression area connected to upgrade material and boss-route searches. Exact boss and route details need stricter in-game checks.",
    quickAnswer:
      "Cinder Keep is tracked as a community-reported area tied to Pristine Ascension Shard and first major boss progression.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Area role", value: "Reported early-to-mid progression area", evidenceStatus: "Community Reported" },
      {
        label: "Reported loot",
        value: "Pristine Ascension Shard, Iron-wood Tower Shield",
        evidenceStatus: "Community Reported",
        sourceLabel: xmodSource.label
      },
      { label: "Reported blocker", value: "Stone Golem / first major boss route", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-3.jpg",
        "Fortress route reference",
        "Fatekeeper cliffside fortress area from official Steam media",
        "Used as official fortress/location context for Cinder Keep-style route planning.",
        "location"
      ),
      visual(
        "/images/wiki/steam-screenshot-1.jpg",
        "Enemy approach reference",
        "Fatekeeper ruins combat scene from official Steam media",
        "Used as visual context for route blockers and enemy approach pressure.",
        "route"
      )
    ],
    routeSteps: [
      "Treat the fortress/courtyard route as the reported upgrade-material search area.",
      "Check guarded courtyards before spending upgrade materials elsewhere.",
      "Confirm the exact Stone Golem and boss names before publishing final route labels."
    ],
    lootRows: [
      ["Reported material", "Pristine Ascension Shard", "Cinder Keep courtyard", "Community Reported"],
      ["Reported gear", "Iron-wood Tower Shield", "Cinder Keep route", "Community Reported"],
      ["Reported blocker", "Stone Golem / first major boss", "Courtyard or boss route", "Community Reported"]
    ],
    relatedEntities: ["pristine_ascension_shard", "first_major_boss", "ascension_shards"],
    relatedGuides: ["/fatekeeper/world", "/fatekeeper/bosses"]
  },
  {
    id: "shadow_dancer",
    slug: "shadow-dancer",
    category: "builds",
    name: "Shadow-Dancer",
    summary:
      "A reported Dexterity-focused build pattern tied to bleed and fast melee. Treat exact stat targets as guide reports until broader testing confirms them.",
    quickAnswer:
      "Shadow-Dancer is tracked as a community-reported Dexterity/bleed build using Obsidian Dagger and Ring of the Leech.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Role", value: "Dexterity melee / bleed pressure", evidenceStatus: "Community Reported" },
      { label: "Reported key gear", value: "Obsidian Dagger, Ring of the Leech", evidenceStatus: "Community Reported" },
      { label: "Risk", value: "Depends on exact bleed, iframe, and enemy punish behavior", evidenceStatus: "Unverified" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-7.jpg",
        "Shield and melee pressure reference",
        "Fatekeeper close-range combat with shield and enemy from official Steam media",
        "Official combat visual used to explain melee pressure and punish windows.",
        "weapon"
      ),
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Build screen reference",
        "Fatekeeper character and inventory screen from official Steam media",
        "Official UI visual used as build-planning context.",
        "source"
      )
    ],
    lootRows: [
      ["Key weapon report", "Obsidian Dagger", "Bleed / Dexterity pressure", "Community Reported"],
      ["Key relic report", "Ring of the Leech", "Critical execution sustain", "Community Reported"]
    ],
    relatedEntities: ["obsidian_dagger", "ring_of_leech", "posture_poise"],
    relatedGuides: ["/fatekeeper/builds/dagger-build", "/fatekeeper/builds/best-builds"]
  },
  {
    id: "first_major_boss",
    slug: "first-major-boss",
    category: "bosses",
    name: "First Major Boss",
    summary:
      "A placeholder boss entry for reported Cinder Keep progression. The exact boss name, phases, drops, and recommended build still need direct confirmation.",
    quickAnswer:
      "The first major boss is tracked as an unverified Cinder Keep progression topic until exact boss data is confirmed.",
    evidenceStatus: "Unverified",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Known state", value: "Exact boss name not confirmed in this data layer", evidenceStatus: "Unverified" },
      { label: "Reported area", value: "Cinder Keep", evidenceStatus: "Community Reported" },
      { label: "Needed fields", value: "Phase notes, weakness, reward, drops, patch version" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-8.jpg",
        "Enemy and boss-scale reference",
        "Large flying enemy from official Fatekeeper Steam media",
        "Official enemy visual used as boss/enemy presentation reference. It is not the verified first major boss identity.",
        "boss"
      ),
      visual(
        "/images/wiki/steam-screenshot-1.jpg",
        "Boss route combat reference",
        "Fatekeeper ruins combat scene from official Steam media",
        "Used as approach-pressure context until exact phase screenshots are verified.",
        "route"
      )
    ],
    routeSteps: [
      "Record the exact boss name before replacing this placeholder.",
      "Capture phase transition screenshots and publish them with patch version.",
      "Keep drops and rewards unverified until the post-fight reward screen is captured."
    ],
    lootRows: [
      ["Boss name", "Unknown", "Needs in-game confirmation", "Unverified"],
      ["Reported area", "Cinder Keep", "Route report", "Community Reported"],
      ["Drops/rewards", "Unknown", "Needs post-fight screenshot", "Unverified"]
    ],
    relatedEntities: ["cinder_keep", "ascension_shards"],
    relatedGuides: ["/fatekeeper/bosses"]
  },
  {
    id: "ascension_shards",
    slug: "ascension-shards",
    category: "mechanics",
    name: "Ascension Shards",
    summary:
      "Reported weapon upgrade material family. Exact drop counts and upgrade breakpoints should be versioned before being treated as settled.",
    quickAnswer:
      "Ascension Shards are tracked as community-reported upgrade materials, with Pristine Ascension Shard linked to Cinder Keep reports.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Mechanic type", value: "Weapon upgrades", evidenceStatus: "Community Reported" },
      { label: "Reported item", value: "Pristine Ascension Shard", evidenceStatus: "Community Reported" },
      { label: "Reported location", value: "Cinder Keep courtyard / Stone Golem guard", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Inventory upgrade context",
        "Fatekeeper inventory screen from official Steam media",
        "Official UI visual used as upgrade/inventory context, not as a verified Ascension Shard icon.",
        "loot"
      ),
      visual(
        "/images/wiki/steam-screenshot-3.jpg",
        "Upgrade route location context",
        "Fatekeeper fortress path from official Steam media",
        "Used as visual context for Cinder Keep material-route reports.",
        "route"
      )
    ],
    lootRows: [
      ["Material family", "Ascension Shards", "Weapon upgrade reports", "Community Reported"],
      ["Reported special material", "Pristine Ascension Shard", "Cinder Keep courtyard", "Community Reported"]
    ],
    relatedEntities: ["pristine_ascension_shard", "cinder_keep"],
    relatedGuides: ["/fatekeeper/weapons", "/fatekeeper/mistakes-to-avoid"]
  },
  {
    id: "pristine_ascension_shard",
    slug: "pristine-ascension-shard",
    category: "materials",
    name: "Pristine Ascension Shard",
    summary:
      "A reported upgrade material rather than a relic. It is included in the wiki because players search it as loot and progression currency.",
    quickAnswer:
      "Pristine Ascension Shard is tracked as a community-reported upgrade material connected to Cinder Keep.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource],
    fields: [
      { label: "Type", value: "Upgrade material", evidenceStatus: "Community Reported" },
      { label: "Location report", value: "Cinder Keep courtyard", evidenceStatus: "Community Reported" },
      { label: "Use report", value: "Pushes an early weapon upgrade tier", evidenceStatus: "Community Reported" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Inventory material context",
        "Fatekeeper inventory screen from official Steam media",
        "Official UI visual used as inventory context. It is not a verified Pristine Ascension Shard icon.",
        "loot"
      ),
      visual(
        "/images/wiki/steam-screenshot-3.jpg",
        "Cinder Keep route context",
        "Fatekeeper fortress location from official Steam media",
        "Used as route context for the reported Cinder Keep material location.",
        "route"
      )
    ],
    routeSteps: [
      "Search the reported Cinder Keep courtyard route.",
      "Capture the pickup prompt or inventory item name before upgrading this to in-game verified.",
      "Record which weapon upgrade tier the material affects after testing."
    ],
    lootRows: [
      ["Reported material", "Pristine Ascension Shard", "Cinder Keep courtyard", "Community Reported"],
      ["Reported use", "Early weapon upgrade push", "XMODhub guide report", "Community Reported"]
    ],
    relatedEntities: ["ascension_shards", "cinder_keep"],
    relatedGuides: ["/fatekeeper/weapons", "/fatekeeper/world"]
  },
  {
    id: "posture_poise",
    slug: "posture-poise",
    category: "mechanics",
    name: "Posture / Poise",
    summary:
      "A reported combat mechanic around stagger pressure and heavy attacks. It is tracked separately because it affects weapons, builds, and boss strategy.",
    quickAnswer:
      "Posture and poise are tracked as community-reported stagger mechanics that may affect heavy attacks, daggers, and boss strategy.",
    evidenceStatus: "Community Reported",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource, pcgamerSource],
    fields: [
      { label: "Mechanic type", value: "Stagger / poise pressure", evidenceStatus: "Community Reported" },
      { label: "Reported strong action", value: "Heavy and jumping heavy attacks", evidenceStatus: "Community Reported" },
      { label: "Build link", value: "Heavy builds, dagger pressure, boss punish windows" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-7.jpg",
        "Melee contact reference",
        "Fatekeeper shield and melee contact scene from official Steam media",
        "Official combat image used to illustrate close-range pressure and punish timing.",
        "weapon"
      ),
      visual(
        "/images/wiki/steam-screenshot-4.jpg",
        "Hit pressure reference",
        "Fatekeeper first-person melee attack from official Steam media",
        "Official media used as visual support for posture/poise discussion.",
        "source"
      )
    ],
    routeSteps: [
      "Test light attacks, heavy attacks, and jumping heavy attacks against the same enemy type.",
      "Record stagger timing and whether the result changes by weapon class.",
      "Publish tested values only with patch version and enemy name."
    ],
    relatedEntities: ["obsidian_dagger", "shadow_dancer", "first_major_boss"],
    relatedGuides: ["/fatekeeper/combat-guide", "/fatekeeper/builds/heavy-build"]
  },
  {
    id: "respec_rules",
    slug: "respec-rules",
    category: "mechanics",
    name: "Respec Rules",
    summary:
      "A high-risk mechanics topic because public sources disagree. The wiki should preserve both claims instead of pretending the answer is settled.",
    quickAnswer:
      "Fatekeeper respec rules are currently marked Conflicting because public wiki-style and guide-style sources disagree.",
    evidenceStatus: "Conflicting",
    lastChecked,
    patchVersion: "Early Access launch window",
    sources: [xmodSource, fatekeeperWikiSource],
    fields: [
      { label: "Current answer", value: "Do not plan a build around easy respec until checked in-game.", evidenceStatus: "Conflicting" },
      { label: "Player risk", value: "Early stat choices may be costly if the stricter report is correct." }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Character screen reference",
        "Fatekeeper character and inventory screen from official Steam media",
        "Official character UI visual used to explain why respec affects build planning.",
        "source"
      )
    ],
    conflicts: [
      {
        field: "Respec availability",
        issue: "Public sources disagree about whether respec is freely available or locked behind later progression.",
        reports: [
          { source: fatekeeperWikiSource.label, value: "Reports free or flexible respec behavior." },
          { source: xmodSource.label, value: "Reports no early respec and later progression gating." }
        ]
      }
    ],
    relatedEntities: ["shadow_dancer", "ascension_shards"],
    relatedGuides: ["/fatekeeper/mistakes-to-avoid", "/fatekeeper/builds/beginner-build"]
  },
  {
    id: "steam_launch_state",
    slug: "steam-launch-state",
    category: "performance",
    name: "Steam Launch State",
    summary:
      "Official Steam-facing state for launch, review summary, price, storage, and Early Access scope. This overrides stale pre-launch site copy.",
    quickAnswer:
      "Fatekeeper is released on Steam Early Access as of June 2, 2026, with Steam as the source of record for price, reviews, and requirements.",
    evidenceStatus: "Official",
    lastChecked,
    patchVersion: "Steam store state checked 2026-06-03",
    sources: [steamSource, officialSource],
    fields: [
      { label: "Release state", value: "Released on Steam Early Access: Jun 2, 2026", evidenceStatus: "Official" },
      { label: "Review snapshot", value: "Very Positive, 1,138 reviews, 80% positive", evidenceStatus: "Official" },
      { label: "Intro price snapshot", value: "$7.99 introductory offer from $9.99", evidenceStatus: "Official" },
      { label: "Storage", value: "45 GB available space", evidenceStatus: "Official" },
      { label: "Early Access scope", value: "About 2 hours at launch; about 15 hours planned for 1.0", evidenceStatus: "Official" }
    ],
    visuals: [
      visual(
        "/images/wiki/steam-screenshot-0.jpg",
        "Official exploration screenshot",
        "Fatekeeper cave and weapon screenshot from official Steam media",
        "Official Steam media reference for visual quality and exploration tone.",
        "source"
      ),
      visual(
        "/images/wiki/steam-screenshot-5.jpg",
        "Official UI screenshot",
        "Fatekeeper inventory and stats screen from official Steam media",
        "Official UI reference for build, gear, and performance readability checks.",
        "source"
      )
    ],
    relatedEntities: ["respec_rules"],
    relatedGuides: ["/fatekeeper/release-date", "/fatekeeper/reviews", "/fatekeeper/system-requirements"]
  }
];

export function getWikiCategory(slug: string) {
  return wikiCategories.find((category) => category.slug === slug);
}

export function getWikiEntities(category?: WikiCategorySlug) {
  return category ? wikiEntities.filter((entity) => entity.category === category) : wikiEntities;
}

export function getWikiEntity(category: string, slug: string) {
  return wikiEntities.find((entity) => entity.category === category && entity.slug === slug);
}

export function getWikiEntityById(id: string) {
  return wikiEntities.find((entity) => entity.id === id);
}

export function getRelatedWikiEntities(entity: WikiEntity) {
  return entity.relatedEntities
    .map((id) => getWikiEntityById(id))
    .filter((related): related is WikiEntity => Boolean(related));
}

export function getWikiCategoryCount(category: WikiCategorySlug) {
  return getWikiEntities(category).length;
}

export function getWikiHref(entity: WikiEntity) {
  return `/wiki/${entity.category}/${entity.slug}`;
}
