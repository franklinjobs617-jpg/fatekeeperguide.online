import { fatekeeperFacts, media, sourceLinks } from "./site";

export type ContentStatus =
  | "Official Info"
  | "Pre-release Analysis"
  | "Needs Post-Launch Testing"
  | "Community Verified";

export type GuideSource = {
  label: string;
  url: string;
};

export type GuideTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  table?: GuideTable;
  note?: string;
};

export type GuidePage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  category: string;
  intent: "buy" | "learn" | "build" | "database" | "solve";
  status: ContentStatus;
  lastUpdated: string;
  heroImage: string;
  quickAnswer: string;
  takeaways: string[];
  sections: GuideSection[];
  sources: GuideSource[];
  related: string[];
  featured?: boolean;
};

const lastUpdated = "2026-05-28";

const coreSources = [
  sourceLinks.steam,
  sourceLinks.official,
  sourceLinks.thqGameplay,
  sourceLinks.youtubeGameplay
];

const verificationSection = (
  topic: string,
  rows: string[][] = [
    ["Official facts", "Steam and official site copy", "Use now"],
    ["Trailer analysis", "Gameplay and announcement trailers", "Label as analysis"],
    ["Community findings", "Player testing after Early Access unlocks", "Do not publish as fact yet"]
  ]
): GuideSection => ({
  heading: "How reliable is this information?",
  body: [
    `This ${topic} guide separates confirmed information from hands-on findings. If a detail is not playable or testable yet, it is marked clearly instead of being presented as finished advice.`,
    "Exact stats, boss routes, hidden loot positions, drop rates, and final balance notes stay unverified until there is direct evidence from the playable version."
  ],
  table: {
    caption: "How claims are treated",
    headers: ["Claim type", "Evidence needed", "Reader takeaway"],
    rows
  }
});

const launchSections = {
  sourceBackedEa: {
    heading: "What is confirmed before launch",
    body: [
      `Fatekeeper is developed by ${fatekeeperFacts.developer} and published by ${fatekeeperFacts.publisher}. The official positioning is a first-person fantasy action RPG with melee, magic, exploration, progression, weapons, armor, relics, and handcrafted world spaces.`,
      `The Steam page is the source of record for store timing, platform, Early Access framing, and system requirements. It lists ${fatekeeperFacts.platform} and describes an Early Access plan that starts with ${fatekeeperFacts.earlyAccessLength}, grows toward ${fatekeeperFacts.fullGameLength}, and may remain in Early Access for ${fatekeeperFacts.earlyAccessWindow}.`
    ],
    bullets: [
      "Use Steam for purchase state, requirement changes, and regional store timing.",
      "Use the official site for publisher and product positioning.",
      "Use THQ Nordic and YouTube materials for trailer-based analysis.",
      "Use community discussion as demand research, not as final gameplay proof."
    ]
  }
};

function page(input: GuidePage): GuidePage {
  const sections = [...input.sections];
  const verificationIndex = sections.findIndex((section) => section.heading === "How reliable is this information?");
  const insertAt = verificationIndex >= 0 ? verificationIndex : sections.length;

  sections.splice(insertAt, 0, demandSectionFor(input));

  return {
    ...input,
    sections
  };
}

function demandSectionFor(input: GuidePage): GuideSection {
  if (input.intent === "buy") {
    return {
      heading: "Player questions this page answers",
      body: [
        "Pre-launch Fatekeeper searches are mostly practical: release date, Early Access size, PC requirements, Steam Deck status, controller support, and whether the first build is worth buying. Use this section as a buying checklist before opening Steam.",
        "Google Trends can be useful for watching whether branded demand rises near trailers, previews, and the Early Access date, but low-volume pre-launch game terms should not be treated as exact search-volume data. The safer signal is the repeated question pattern across Steam, YouTube, Reddit, and media coverage."
      ],
      table: {
        caption: "Buy-intent question map",
        headers: ["Player question", "Best page", "Decision it supports"],
        rows: [
          ["When can I play?", "Release Date", "Plan the unlock window"],
          ["How much content is in Early Access?", "Early Access", "Decide buy or wait"],
          ["Can my PC run it?", "System Requirements", "Avoid performance risk"],
          ["Can I play handheld or controller?", "Steam Deck / Controller Support", "Avoid unsupported setup assumptions"]
        ]
      }
    };
  }

  if (input.intent === "learn") {
    return {
      heading: "What new players usually need first",
      body: [
        "New players rarely need a lore encyclopedia in the first session. They need to know how combat pressure works, what to test before spending resources, how weapon reach changes safety, and how spells or relics might change a build.",
        "Because Fatekeeper launches through Early Access, early learning advice stays flexible. Use the recommendations as habits and checkpoints, then replace them with exact routes once item names, upgrade costs, enemy names, and patch behavior are verified."
      ],
      table: {
        caption: "New-player priority map",
        headers: ["Need", "What to check", "Why it matters"],
        rows: [
          ["Survival", "Spacing, defense, recovery, enemy windups", "Keeps early deaths from becoming random"],
          ["Damage", "Weapon reach, attack speed, spell safety", "Shows which tools fit your timing"],
          ["Progression", "Upgrade costs, relic effects, resource scarcity", "Prevents early waste"],
          ["Exploration", "Locked doors, unusual rooms, hidden rewards", "Finds systems that affect builds"]
        ]
      }
    };
  }

  if (input.intent === "build") {
    return {
      heading: "How to read build advice before the meta exists",
      body: [
        "Fatekeeper build searches will spike around best build, best weapon, spellblade, dagger, heavy weapon, and beginner build queries. Before full testing, the useful answer is not a fake S-tier list; it is a confidence-ranked plan that explains why a build may work and what still needs proof.",
        "A build becomes reliable only when it survives several checks: repeatable enemy matchups, reasonable resource cost, a clear defense plan, stable upgrade scaling, and patch version notes. If a build only looks strong in a trailer, treat it as a theory."
      ],
      table: {
        caption: "Build trust checklist",
        headers: ["Signal", "Good evidence", "Weak evidence"],
        rows: [
          ["Damage", "Tested against several enemy types", "Single trailer clip"],
          ["Safety", "Clear defense and recovery plan", "Only assumes perfect play"],
          ["Progression", "Known upgrade costs and scaling", "No material data"],
          ["Patch reliability", "Tested on a named build version", "No patch context"]
        ]
      }
    };
  }

  if (input.intent === "database") {
    return {
      heading: "How to use database pages before entries are complete",
      body: [
        "Database pages are useful before launch when they show exactly what will be tracked and what remains unknown. For Fatekeeper, players will look for weapon scaling, spell cooldowns, relic effects, enemy weaknesses, boss rewards, and world locations as soon as Early Access is live.",
        "Use these pages as a verification ledger. Official facts, trailer observations, and hands-on discoveries are separated so you can decide whether a data point is safe to use in a build or route."
      ],
      table: {
        caption: "Database field priority",
        headers: ["Data type", "Useful field", "Trust requirement"],
        rows: [
          ["Weapons", "Damage, scaling, moveset, location, upgrade cost", "In-game item text or repeated testing"],
          ["Spells", "Cost, cooldown, cast safety, damage type, combo", "Hands-on combat tests"],
          ["Relics", "Passive effect, stacking, build synergy, location", "Screenshot or exact menu text"],
          ["Enemies and bosses", "Patterns, weakness, drops, rewards", "Repeatable encounters and patch version"]
        ]
      }
    };
  }

  return {
    heading: "How to use this when you are stuck",
    body: [
      "Solve-intent pages need direct answers first. If you are blocked by an enemy, boss, locked door, puzzle, or route, start with the safest action, then check the evidence status before changing your whole build.",
      "Before launch, this page gives the evidence standard and the fields that matter. After hands-on testing, it can become a direct route with screenshots, encounter notes, rewards, and patch-specific warnings."
    ],
    table: {
      caption: "Stuck-player answer format",
      headers: ["Problem", "Fast answer", "Evidence needed"],
      rows: [
        ["Enemy pressure", "Spacing, weakness, punish window", "Repeated encounter tests"],
        ["Boss wall", "Recommended build, phase notes, rewards", "Clear attempts and patch version"],
        ["Puzzle or locked door", "Requirement, route, reward", "Before/after screenshots"],
        ["Hidden loot", "Exact location and item name", "In-game item confirmation"]
      ]
    }
  };
}

export const guidePages: GuidePage[] = [
  page({
    slug: "fatekeeper/release-date",
    title: "Fatekeeper Release Date, Unlock Time, and Early Access Status",
    h1: "Fatekeeper Release Date and Unlock Time",
    description:
      "Track Fatekeeper Early Access release timing, UTC conversion, platform status, and what to check before buying.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Official Info",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer: `Fatekeeper is scheduled for Early Access on ${fatekeeperFacts.releaseLabel}, which is ${fatekeeperFacts.beijingLabel}. The listed launch platform is ${fatekeeperFacts.platform}. Check the Steam page close to unlock because store timing, preload notes, and final requirement wording can change near release.`,
    takeaways: [
      `Current listed release timing: ${fatekeeperFacts.releaseLabel}.`,
      `China local reference: ${fatekeeperFacts.beijingLabel}.`,
      "Steam is the source of record for final unlock and purchase status.",
      "Release timing will be updated if Steam or THQ Nordic changes the schedule."
    ],
    sections: [
      launchSections.sourceBackedEa,
      {
        heading: "Release time by player need",
        body: [
          "Most players need the unlock time, the platform, and a clear warning that storefront countdowns can change. The key answer stays near the top, with deeper launch context below it.",
          "UTC and Beijing time are shown together so players can plan the unlock window without recalculating time zones."
        ],
        table: {
          caption: "Current release timing",
          headers: ["Region or format", "Time", "Use case"],
          rows: [
            ["UTC", fatekeeperFacts.releaseLabel, "Best canonical reference for updates"],
            ["Beijing", fatekeeperFacts.beijingLabel, "China local planning"],
            ["Platform", fatekeeperFacts.platform, "Purchase and compatibility check"],
            ["Store reference", "Steam app 2186990", "Final source before buying"]
          ]
        }
      },
      {
        heading: "Pre-launch checklist",
        body: [
          "Before the unlock window, players should verify their Steam region, wishlist or follow the app, compare their PC against the listed requirements, and decide whether two hours of initial Early Access content is enough for them.",
          "After checking the time, the next useful steps are system requirements, Early Access value, and beginner preparation."
        ],
        bullets: [
          "Check whether Steam shows the same release date in your region.",
          "Compare GPU, VRAM, RAM, and storage against the requirement table.",
          "Read the Early Access page if you expect a finished campaign.",
          "Bookmark the beginner guide if you plan to play at unlock."
        ]
      },
      verificationSection("release date")
    ],
    sources: [sourceLinks.steam, sourceLinks.steamdb, sourceLinks.official],
    related: [
      "fatekeeper/early-access",
      "fatekeeper/is-it-worth-it",
      "fatekeeper/system-requirements",
      "fatekeeper/beginner-guide"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/early-access",
    title: "Fatekeeper Early Access: Content Scope, Risks, and Update Tracking",
    h1: "Fatekeeper Early Access Guide",
    description:
      "Understand Fatekeeper Early Access content length, buy/wait risks, launch-week testing priorities, and what may change after launch.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Official Info",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer: `Fatekeeper Early Access is best for players who want to test the combat, progression, gear, and world systems early. Steam describes ${fatekeeperFacts.earlyAccessLength}, ${fatekeeperFacts.fullGameLength}, and ${fatekeeperFacts.earlyAccessWindow}. If you want a complete campaign, wait for 1.0 or at least for launch-week player reports.`,
    takeaways: [
      "Buy Early Access only if limited content and balance changes are acceptable.",
      "Wait if you need a complete story, stable performance, or finished build balance.",
      "The highest-value launch-week content will be hands-on combat and build testing.",
      "Roadmap changes, patch notes, and community-tested findings belong in the update trail."
    ],
    sections: [
      launchSections.sourceBackedEa,
      {
        heading: "Who should buy Early Access",
        body: [
          "Fatekeeper is the kind of Early Access game where the value depends on player tolerance. If a player wants to experiment, report issues, and follow systems as they evolve, the first build can still be useful even with limited content.",
          "The strongest reasons to buy early are combat feel, build experimentation, and first-hand discovery. The weakest reason is expecting a polished full campaign on day one."
        ],
        table: {
          caption: "Buy or wait guidance",
          headers: ["Player type", "Recommendation", "Reason"],
          rows: [
            ["Build tester", "Buy early", "You can extract value from systems before content is complete"],
            ["Story-first player", "Wait", "The listed Early Access scope is not the planned full game"],
            ["Performance-sensitive player", "Wait for reports", "High requirements need launch benchmarks"],
            ["Guide reader", "Bookmark now", "Official facts and tested findings are separated clearly"]
          ]
        }
      },
      {
        heading: "What to test first after launch",
        body: [
          "The first launch-week tests focus on repeatable systems: frame pacing, controller behavior, starter combat choices, upgrade priorities, early enemy patterns, and whether build flexibility appears in the playable slice.",
          "Boss guides and map pages stay limited until they are verified. Trust comes from saying what is unknown as clearly as what is known."
        ],
        bullets: [
          "Measure performance against the official GPU and RAM requirements.",
          "Record what the first hour teaches about weapons, magic, and resource pressure.",
          "Compare melee-only, spell-heavy, and hybrid playstyles.",
          "Collect patch notes and update every affected guide page."
        ]
      },
      verificationSection("Early Access")
    ],
    sources: [sourceLinks.steam, sourceLinks.official, sourceLinks.thqGameplay, sourceLinks.youtubeGameplay],
    related: [
      "fatekeeper/is-it-worth-it",
      "fatekeeper/release-date",
      "fatekeeper/system-requirements",
      "fatekeeper/first-hours-guide",
      "fatekeeper/builds"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/is-it-worth-it",
    title: "Is Fatekeeper Worth It in Early Access?",
    h1: "Is Fatekeeper Worth It?",
    description:
      "A practical Fatekeeper buy or wait guide for Early Access based on content scope, combat appeal, PC requirements, and verification status.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Pre-release Analysis",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "Fatekeeper is worth watching if you want a first-person fantasy RPG centered on melee, magic, exploration, and build experimentation. It is not an automatic day-one buy for everyone because the Early Access build is limited and still needs performance, balance, and content verification.",
    takeaways: [
      "The strongest buying signal is interest in first-person fantasy combat.",
      "The biggest risk is limited Early Access scope.",
      "High PC requirements make performance reports important.",
      "A final recommendation depends on launch-week performance, balance, and player-tested content depth."
    ],
    sections: [
      {
        heading: "Decision summary",
        body: [
          "The honest answer is conditional. Fatekeeper is compelling for players who want first-person fantasy combat with weapons, spells, relics, armor, and character progression. That is exactly the audience visible in Reddit and media discussion around Dark Messiah-like melee fantasy.",
          "The buy recommendation stays cautious. A limited Early Access build means some players should wait, especially if they judge value by finished campaign length, performance stability, or complete endgame systems."
        ],
        table: {
          caption: "Worth it matrix",
          headers: ["Question", "Good sign", "Risk sign"],
          rows: [
            ["Do you like first-person melee fantasy?", "Yes, this is the core pitch", "No, the game may not convert you"],
            ["Do you tolerate Early Access?", "You enjoy testing", "You expect final polish"],
            ["Is your PC strong?", "RTX 3070/RX 6800 XT class or better", "Below 8 GB VRAM or 16 GB RAM"],
            ["Do you need full walkthroughs?", "You like discovery", "Wait for verified guides"]
          ]
        }
      },
      {
        heading: "What Reddit and video demand shows",
        body: [
          "The useful community signal is not that every comment is correct. It is the pattern of questions. Players compare the game to older first-person fantasy action RPGs, ask how deep the combat is, and want to know whether the systems have enough weight to justify Early Access.",
          "That demand makes combat, builds, weapons, spells, and PC requirements more useful than generic lore summaries before launch."
        ],
        bullets: [
          "Answer buy/wait questions before broad lore.",
          "Show combat depth in tables and verified notes.",
          "Keep performance and Steam Deck status visible.",
          "Update the recommendation when real player data exists."
        ]
      },
      verificationSection("buying advice")
    ],
    sources: [
      sourceLinks.steam,
      sourceLinks.official,
      sourceLinks.youtubeGameplay,
      sourceLinks.redditGameplay,
      sourceLinks.pcgamer
    ],
    related: [
      "fatekeeper/early-access",
      "fatekeeper/system-requirements",
      "fatekeeper/steam-deck",
      "fatekeeper/beginner-guide",
      "fatekeeper/builds"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/system-requirements",
    title: "Fatekeeper System Requirements and PC Checker",
    h1: "Fatekeeper System Requirements",
    description:
      "Check Fatekeeper CPU, GPU, RAM, DirectX, and storage requirements with a pre-launch interpretation for PC players.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Official Info",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer: `Steam lists ${fatekeeperFacts.minimumCpu}, ${fatekeeperFacts.minimumRam}, ${fatekeeperFacts.recommendedRam}, ${fatekeeperFacts.minimumGpu}, ${fatekeeperFacts.directX}, and ${fatekeeperFacts.storage}. Treat any PC below 8 GB VRAM or 16 GB RAM as below the listed floor until launch benchmarks prove otherwise.`,
    takeaways: [
      "The listed GPU class is high for an Early Access RPG.",
      "VRAM and RAM are the fastest first checks.",
      "Steam Deck status needs post-launch verification.",
      "Settings, stutter, upscaling, and frame pacing must be tested after unlock."
    ],
    sections: [
      {
        heading: "Official PC requirement table",
        body: [
          "System requirement pages are high-intent pages. The user is often one click away from buying or refunding. The table must be clean, direct, and paired with a plain-language interpretation.",
          "Because Fatekeeper is unreleased as of this update, FPS targets are not promised here. Use the table to compare your PC against the listed hardware only."
        ],
        table: {
          caption: "Listed requirement fields",
          headers: ["Component", "Listed requirement", "Interpretation"],
          rows: [
            ["CPU", fatekeeperFacts.minimumCpu, "Modern 6 to 8 core desktop class target"],
            ["RAM", `${fatekeeperFacts.minimumRam}; ${fatekeeperFacts.recommendedRam} recommended`, "16 GB is the floor, 32 GB is safer"],
            ["GPU", fatekeeperFacts.minimumGpu, "8 GB VRAM class card listed"],
            ["API", fatekeeperFacts.directX, "Older DirectX 11 only systems are not a fit"],
            ["Storage", fatekeeperFacts.storage, "Reserve extra room for patches"]
          ]
        }
      },
      {
        heading: "How to read the requirements",
        body: [
          "Minimum requirements do not mean smooth high settings. They mean the developer or publisher lists that class of hardware as the baseline for running the game. Until benchmarks exist, avoid fake certainty about resolution and frame rate.",
          "The best pre-launch advice is conservative. If your GPU is below RTX 3070 or RX 6800 XT class, wait for launch-week testing before buying."
        ],
        bullets: [
          "Above listed GPU and 32 GB RAM: likely best positioned for launch testing.",
          "At listed GPU and 16 GB RAM: wait for settings recommendations.",
          "Below 8 GB VRAM: high refund risk until benchmarks exist.",
          "Steam Deck: separate verification page, not assumed supported."
        ]
      },
      verificationSection("system requirements")
    ],
    sources: [sourceLinks.steam, sourceLinks.steamdb],
    related: [
      "fatekeeper/steam-deck",
      "fatekeeper/controller-support",
      "fatekeeper/is-it-worth-it",
      "fatekeeper/early-access"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/steam-deck",
    title: "Fatekeeper Steam Deck Status and Handheld Notes",
    h1: "Fatekeeper Steam Deck Status",
    description:
      "Track Fatekeeper Steam Deck compatibility, handheld risk factors, and what needs testing after Early Access launches.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "Fatekeeper Steam Deck status should be treated as unverified until Steam shows an official Deck rating or players test the Early Access build. The listed PC requirements are demanding, so handheld performance should not be assumed.",
    takeaways: [
      "Do not claim Steam Deck support before official or player verification.",
      "High listed GPU requirements make handheld performance uncertain.",
      "Controller UI, text size, battery, and frame pacing need direct testing.",
      "Deck performance notes need launch-week testing before they can be trusted."
    ],
    sections: [
      {
        heading: "Current Steam Deck answer",
        body: [
          "The correct pre-launch answer is caution. A yes or no answer without a Deck rating or hands-on testing would be inventing certainty. The test checklist below shows what still needs proof.",
          "This is useful for players because Steam Deck searches are buy-intent searches. They need to know whether to wait, not read vague optimism."
        ],
        table: {
          caption: "Steam Deck test checklist",
          headers: ["Area", "Why it matters", "Status"],
          rows: [
            ["Performance", "Listed GPU class is much higher than Deck hardware", "Needs testing"],
            ["Controls", "First-person melee needs responsive input", "Needs testing"],
            ["Text size", "Guide and menu readability matters on handheld", "Needs testing"],
            ["Battery and heat", "Action RPGs can be demanding on handheld", "Needs testing"]
          ]
        }
      },
      {
        heading: "What to publish after testing",
        body: [
          "Once Early Access is live, tested hardware notes can include resolution, frame cap, graphics preset, upscaling setting if available, average performance, and major issues.",
          "If the game is not practical on Deck at launch, say that directly and link to the PC requirements page."
        ]
      },
      verificationSection("Steam Deck")
    ],
    sources: [sourceLinks.steam, sourceLinks.steamdb],
    related: [
      "fatekeeper/system-requirements",
      "fatekeeper/controller-support",
      "fatekeeper/is-it-worth-it",
      "fatekeeper/early-access"
    ]
  }),
  page({
    slug: "fatekeeper/controller-support",
    title: "Fatekeeper Controller Support and Input Guide",
    h1: "Fatekeeper Controller Support",
    description:
      "Track Fatekeeper controller support, input risks, and the tests needed for melee, magic, menus, and Steam Deck.",
    category: "Launch Readiness",
    intent: "buy",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "Controller support needs hands-on verification. For a first-person melee and magic RPG, the important question is not only whether a controller works, but whether blocking, aiming, quick swapping, spell use, and inventory navigation feel reliable.",
    takeaways: [
      "Controller support is a quality question, not just a yes/no checkbox.",
      "Melee timing and spell targeting need direct testing.",
      "Steam Deck value depends heavily on input comfort.",
      "Tested controller notes need the playable build, especially for blocking, spell swapping, aiming, and menu navigation."
    ],
    sections: [
      {
        heading: "What controller users need to know",
        body: [
          "First-person fantasy combat can feel excellent on controller if attack, block, dodge, spell selection, and camera control are clean. It can also feel frustrating if the game expects keyboard-style hotkeys for build variety.",
          "Controller support is best judged as a full workflow: fighting, looting, reading, menu navigation, build management, and accessibility options."
        ],
        table: {
          caption: "Controller verification plan",
          headers: ["Test", "Pass condition", "Status"],
          rows: [
            ["Combat timing", "Attacks, blocks, dodges, and spell casts are responsive", "Needs testing"],
            ["Quick actions", "Weapons, spells, and consumables can be swapped reliably", "Needs testing"],
            ["Menus", "Inventory and build screens are readable and navigable", "Needs testing"],
            ["Prompts", "Button prompts match the active controller", "Needs testing"]
          ]
        }
      },
      verificationSection("controller support")
    ],
    sources: [sourceLinks.steam, sourceLinks.youtubeGameplay, sourceLinks.thqGameplay],
    related: [
      "fatekeeper/steam-deck",
      "fatekeeper/system-requirements",
      "fatekeeper/combat-guide",
      "fatekeeper/beginner-guide"
    ]
  }),
  page({
    slug: "fatekeeper/beginner-guide",
    title: "Fatekeeper Beginner Guide: Systems, First Choices, and Safe Prep",
    h1: "Fatekeeper Beginner Guide",
    description:
      "A deep beginner guide to Fatekeeper systems, combat habits, build choices, exploration priorities, and what to avoid early.",
    category: "Beginner Tutorials",
    intent: "learn",
    status: "Pre-release Analysis",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer:
      "New Fatekeeper players should treat the first hours as a systems test: learn enemy patterns, compare weapon reach, try at least one spell path, inspect relic effects, and avoid locking your identity around an untested build before the Early Access balance is known.",
    takeaways: [
      "Start by learning combat rhythm before chasing damage.",
      "Track resources and upgrades because respec rules are not fully verified.",
      "Explore side spaces for relics, lore, and progression options.",
      "Use build pages as planning tools until stats are tested."
    ],
    sections: [
      {
        heading: "First priorities",
        body: [
          "The first priority is to understand the loop, not to copy a meta build. Fatekeeper's official pitch emphasizes reactive combat, magic, exploration, gear, relics, and progression. Those systems only become useful when the player understands what each one changes.",
          "Start with habits that survive balance changes: watch enemy windups, test weapon range, learn how spells fit into resource pressure, and check whether exploration rewards change your options."
        ],
        bullets: [
          "Fight slowly at first and read enemy patterns.",
          "Compare weapon reach and recovery before upgrading heavily.",
          "Use spells to solve problems, not only to add damage.",
          "Inspect relic and armor effects before judging a build.",
          "Keep notes on anything that looks like a locked door, puzzle, or return path."
        ]
      },
      {
        heading: "Beginner decision table",
        body: [
          "The table below is intentionally conservative. It gives new players useful decisions without pretending that final numbers are known."
        ],
        table: {
          caption: "Safe early decisions",
          headers: ["Decision", "Safe approach", "Why"],
          rows: [
            ["First weapon", "Choose the weapon with the clearest timing", "Consistency beats theoretical DPS early"],
            ["First spell", "Pick a spell that creates space or interrupts pressure", "Utility protects new players from bad trades"],
            ["Upgrades", "Wait until a weapon or spell feels reliable", "Unknown respec and material economy"],
            ["Exploration", "Clear side rooms before moving on", "Relics and hidden systems may shape builds"]
          ]
        }
      },
      {
        heading: "What not to do early",
        body: [
          "The most common mistake in new action RPGs is over-investing before understanding the resource economy. Fatekeeper may reward specialization, but Early Access balance can change quickly. Learn how to evaluate tools before making permanent upgrade decisions.",
          "If the launch build has limited content, a careful player can still learn a lot by testing repeatable interactions: melee spacing, spell cast time, enemy armor behavior, stagger, elemental reactions if present, and relic synergy."
        ]
      },
      verificationSection("beginner guide")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/tips-and-tricks",
      "fatekeeper/first-hours-guide",
      "fatekeeper/combat-guide",
      "fatekeeper/mistakes-to-avoid",
      "fatekeeper/builds"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/tips-and-tricks",
    title: "Fatekeeper Tips and Tricks for Early Access",
    h1: "Fatekeeper Tips and Tricks",
    description:
      "Practical Fatekeeper tips for combat, exploration, builds, upgrades, and launch-week testing without unverified spoilers.",
    category: "Beginner Tutorials",
    intent: "learn",
    status: "Pre-release Analysis",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "The safest Fatekeeper tips before launch are system habits: read attacks, test range, save upgrade materials until a tool proves reliable, use spells for control, and treat every relic as a build clue rather than vendor trash.",
    takeaways: [
      "Good tips improve decisions without inventing content.",
      "Combat tips focus on timing, spacing, and resource use.",
      "Exploration tips focus on observation and backtracking notes.",
      "Build tips remain flexible until Early Access balance is tested."
    ],
    sections: [
      {
        heading: "Combat tips that are safe before launch",
        body: [
          "Useful tips do not need fake stats. The confirmed direction already supports practical advice: enemy patterns matter, weapons and spells matter, and gear experimentation is part of the game.",
          "Train better habits early: attack after a punish window, learn how far each weapon reaches, avoid panic casting, and note which enemy actions seem interruptible."
        ],
        bullets: [
          "Treat the first enemy of each type as a lesson, not a speed bump.",
          "Do not assume heavy attacks are always the best opener.",
          "Use terrain and distance to reset bad trades.",
          "Try spell control before pure damage if you are under pressure."
        ]
      },
      {
        heading: "Exploration and upgrade tips",
        body: [
          "Exploration tips help you avoid missing systems. If the world has hidden relics, lore, and unexpected encounters, slow down around visually distinct spaces and mark anything that looks locked or unreachable.",
          "Upgrade tips stay conservative until material scarcity is known. Test before spending, and do not trust any specific best-weapon claim without verified values."
        ],
        table: {
          caption: "Tip priority",
          headers: ["Tip", "Why it matters", "Verification status"],
          rows: [
            ["Test before upgrading", "Resource economy is unknown", "Pre-release analysis"],
            ["Mark locked routes", "World progression may loop back", "Pre-release analysis"],
            ["Compare spell utility", "Control can outperform raw damage", "Needs testing"],
            ["Track relic effects", "Relics may define build identity", "Needs testing"]
          ]
        }
      },
      verificationSection("tips")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/beginner-guide",
      "fatekeeper/first-hours-guide",
      "fatekeeper/mistakes-to-avoid",
      "fatekeeper/combat-guide"
    ]
  }),
  page({
    slug: "fatekeeper/first-hours-guide",
    title: "Fatekeeper First Hours Guide: What to Do First",
    h1: "Fatekeeper First Hours Guide",
    description:
      "A launch-safe first-hours guide for Fatekeeper covering combat learning, upgrade restraint, exploration notes, and build testing.",
    category: "Beginner Tutorials",
    intent: "learn",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer:
      "In your first hours, prioritize learning combat feel, testing at least two weapon styles, trying utility magic, and recording upgrade costs before committing. This page will become a verified route after Early Access is playable.",
    takeaways: [
      "Do not publish a fake route before the build is playable.",
      "The first-hours guide will become a tested timeline after launch.",
      "Early players need a decision order more than a perfect map.",
      "Upgrade and route advice must be revised after hands-on testing."
    ],
    sections: [
      {
        heading: "Pre-launch first-hours plan",
        body: [
          "A true first-hours route needs direct play. Until then, use this as a first-session checklist: what to watch, what to test, and which decisions to postpone until the systems are clear.",
          "Start with controls, then combat safety, then build identity, then exploration. That order mirrors how players actually learn a new action RPG."
        ],
        table: {
          caption: "First-hours testing sequence",
          headers: ["Phase", "Player goal", "Guide update needed"],
          rows: [
            ["0-15 minutes", "Confirm controls, settings, readability", "Settings notes"],
            ["15-45 minutes", "Learn enemy timing and weapon reach", "Combat basics"],
            ["45-90 minutes", "Try spells, relics, and upgrades", "Build starter notes"],
            ["90+ minutes", "Track routes, locks, and side spaces", "Map and world notes"]
          ]
        }
      },
      {
        heading: "What to record while playing",
        body: [
          "If you track your own discoveries, record exact item names, upgrade costs, enemy names, area names, and screenshots of map or menu information. That information is more valuable than broad impressions.",
          "Routes can change by patch. Early Access changes may invalidate upgrade costs, enemy placement, and route logic."
        ],
        bullets: [
          "Area names and transition points.",
          "Weapon and spell unlock names exactly as shown in-game.",
          "Upgrade material names and amounts.",
          "Enemy weaknesses only after repeatable tests.",
          "Patch version used for the route."
        ]
      },
      verificationSection("first-hours route")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/beginner-guide",
      "fatekeeper/tips-and-tricks",
      "fatekeeper/combat-guide",
      "fatekeeper/mistakes-to-avoid"
    ]
  }),
  page({
    slug: "fatekeeper/combat-guide",
    title: "Fatekeeper Combat Guide: Melee, Magic, Defense, and Testing Priorities",
    h1: "Fatekeeper Combat Guide",
    description:
      "Understand Fatekeeper combat fundamentals, melee and magic roles, enemy pattern reading, and what needs launch testing.",
    category: "Beginner Tutorials",
    intent: "learn",
    status: "Pre-release Analysis",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "Approach Fatekeeper combat as a pattern-reading system with build tools layered on top. Start by learning spacing, timing, defense, and spell utility before judging which weapon or build is best.",
    takeaways: [
      "Combat depth depends on repeatable enemy encounters, not trailer impressions alone.",
      "Melee range, recovery, stagger, and spell cast time are key variables.",
      "Use combat fundamentals before copying a build.",
      "Exact weaknesses and boss strategy need post-launch proof."
    ],
    sections: [
      {
        heading: "Combat fundamentals",
        body: [
          "The core combat question is not whether the game has swords and spells. It is whether those tools create meaningful decisions. Watch windups, reach, recovery, stagger, spacing, cast safety, and enemy resistance or weakness behavior.",
          "That format helps both new and mid-game players. Beginners learn why they are losing trades. Build players learn which mechanics their builds need to exploit."
        ],
        table: {
          caption: "Combat variables to test",
          headers: ["Variable", "Why it matters", "Guide status"],
          rows: [
            ["Reach", "Determines safe punish distance", "Needs testing"],
            ["Recovery", "Determines whether a swing can be punished", "Needs testing"],
            ["Stagger", "Changes enemy pressure and build value", "Needs testing"],
            ["Cast time", "Controls spell safety", "Needs testing"],
            ["Enemy pattern", "Defines strategy more than raw stats", "Needs testing"]
          ]
        }
      },
      {
        heading: "Melee and magic roles",
        body: [
          "The best pre-launch combat advice is to think in roles. Weapons create timing and commitment. Spells can add reach, burst, control, buffs, or area coverage. Relics and armor may change which tradeoffs are acceptable.",
          "After launch, this becomes the parent reference for weapon, spell, relic, enemy, and build pages."
        ],
        bullets: [
          "Use melee when timing and spacing are clear.",
          "Use magic when range, control, or burst solves a specific problem.",
          "Use defensive tools to survive learning attempts.",
          "Use relics to strengthen the behavior your build already repeats."
        ]
      },
      verificationSection("combat mechanics")
    ],
    sources: [sourceLinks.steam, sourceLinks.official, sourceLinks.thqGameplay, sourceLinks.youtubeGameplay, sourceLinks.redditGameplay],
    related: [
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/relics",
      "fatekeeper/enemies",
      "fatekeeper/builds"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/mistakes-to-avoid",
    title: "Fatekeeper Mistakes to Avoid Early",
    h1: "Fatekeeper Mistakes to Avoid",
    description:
      "Avoid common Fatekeeper Early Access mistakes around upgrades, build commitment, exploration, combat assumptions, and unverified advice.",
    category: "Beginner Tutorials",
    intent: "learn",
    status: "Pre-release Analysis",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "The biggest early mistake is committing too hard before you understand the systems. Avoid spending rare resources blindly, copying unverified builds, skipping side exploration, and assuming a trailer-visible tool is balanced the same way in the launch build.",
    takeaways: [
      "Early Access advice is most useful when it is cautious without being vague.",
      "Resource and respec rules need verification.",
      "Treat unverified tier lists as entertainment, not advice.",
      "Exploration and combat testing are safer than rushing."
    ],
    sections: [
      {
        heading: "Early mistakes list",
        body: [
          "Mistake pages work because they help players avoid regret. For Fatekeeper, the likely regret points are upgrades, build identity, missed exploration, control comfort, and trusting unverified meta claims.",
          "Use the warnings directly, but separate general action RPG caution from confirmed Fatekeeper sources."
        ],
        table: {
          caption: "Mistakes and safer alternatives",
          headers: ["Mistake", "Safer move", "Status"],
          rows: [
            ["Spending every upgrade material immediately", "Test weapon feel and resource economy first", "Pre-release analysis"],
            ["Copying a best build before testing", "Use build pages as templates, not final meta", "Needs testing"],
            ["Skipping side rooms", "Track hidden spaces and return paths", "Pre-release analysis"],
            ["Ignoring settings and controls", "Fix readability and input before judging combat", "Needs testing"]
          ]
        }
      },
      {
        heading: "How to avoid bad advice",
        body: [
          "Players will search for best weapon, best spell, and best build as soon as the game unlocks. Those guides can help immediately when they show confidence status instead of pretending a meta is solved.",
          "Rank confidence before ranking items. Official info is high confidence, trailer analysis is medium confidence, and untested build claims are low confidence."
        ]
      },
      verificationSection("mistake advice")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/beginner-guide",
      "fatekeeper/tips-and-tricks",
      "fatekeeper/first-hours-guide",
      "fatekeeper/builds/best-builds"
    ]
  }),
  page({
    slug: "fatekeeper/builds",
    title: "Fatekeeper Builds Hub: Beginner, Spellblade, Heavy, and Dagger Plans",
    h1: "Fatekeeper Builds",
    description:
      "The Fatekeeper builds hub for beginner builds, spellblade setups, heavy builds, dagger builds, and post-launch verification.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "Fatekeeper build pages are planning guides until Early Access data is tested. Use them to choose a playstyle, understand likely synergies, and track what needs verification before calling anything best.",
    takeaways: [
      "Do not trust final meta claims before hands-on testing.",
      "Each build needs playstyle, strengths, weaknesses, weapon, spell, relic, and upgrade priorities.",
      "The hub routes players by intent: safe beginner, hybrid spellblade, heavy weapon, dagger speed.",
      "Post-launch testing needs exact stats, patch version, and repeatable enemy notes."
    ],
    sections: [
      {
        heading: "How to choose a build before the meta settles",
        body: [
          "A good build hub helps players choose based on behavior, not hype. Before exact stats exist, the useful distinction is how the build fights: safe and flexible, melee-magic hybrid, committed heavy hits, or fast close-range pressure.",
          "Each build includes a confidence table and avoids final ranking until damage, scaling, relics, and resource costs are tested."
        ],
        table: {
          caption: "Build families",
          headers: ["Build", "Use if you want", "Current confidence"],
          rows: [
            ["Beginner build", "Safe learning and flexible upgrades", "Medium"],
            ["Spellblade build", "Melee plus magic utility", "Medium"],
            ["Heavy build", "Committed hits and stagger testing", "Low until tested"],
            ["Dagger build", "Speed, positioning, and risk control", "Low until tested"]
          ]
        }
      },
      {
        heading: "What makes a build page complete",
        body: [
          "Every build guide includes playstyle, strengths, weaknesses, weapon direction, spell synergy, relic synergy, upgrade priority, content status, and source links. That keeps the page useful even when exact numbers are not final.",
          "After launch, each build needs patch version, tested area, enemy matchup notes, resource pressure, and failure cases."
        ],
        bullets: [
          "Playstyle summary.",
          "Strength and weakness table.",
          "Recommended weapon role, not fake item names.",
          "Spell and relic synergy to test.",
          "Upgrade order and confidence rating."
        ]
      },
      verificationSection("build guidance")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds/best-builds",
      "fatekeeper/builds/beginner-build",
      "fatekeeper/builds/spellblade-build",
      "fatekeeper/builds/heavy-build",
      "fatekeeper/builds/dagger-build",
      "fatekeeper/weapons",
      "fatekeeper/spells"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/builds/best-builds",
    title: "Fatekeeper Best Builds: Current Ranking and Verification Status",
    h1: "Fatekeeper Best Builds",
    description:
      "Track Fatekeeper best builds with confidence labels, launch-week testing rules, and build archetype comparisons.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "There is no verified best Fatekeeper build before Early Access testing. Rank confidence, not power: beginner-safe and spellblade plans are the most practical starting points, while dagger and heavy builds need hands-on data.",
    takeaways: [
      "No verified tier list exists before launch testing.",
      "Beginner and spellblade builds are safest to prepare.",
      "Heavy and dagger builds may become strong but need frame and scaling data.",
      "Post-launch ranking must include patch version."
    ],
    sections: [
      {
        heading: "Pre-launch build ranking",
        body: [
          "Players still search for best builds before the meta exists. Use a ranked watchlist instead of a fake tier list, then replace it with tested results after launch.",
          "The ranking below is based on safety and likely flexibility, not verified damage."
        ],
        table: {
          caption: "Build confidence watchlist",
          headers: ["Rank", "Build", "Why it starts here"],
          rows: [
            ["1", "Beginner build", "Safest route for learning systems and avoiding bad upgrades"],
            ["2", "Spellblade build", "Likely flexible because it combines melee and utility magic"],
            ["3", "Heavy build", "Potential stagger value, but commitment risk needs testing"],
            ["4", "Dagger build", "May reward precision, but damage and safety are unverified"]
          ]
        }
      },
      {
        heading: "How a build becomes best",
        body: [
          "A real best build needs evidence: repeatable performance across multiple enemy types, reasonable resource cost, stable defense, and clear upgrade scaling.",
          "A build that only works in a trailer, against one enemy, or under one patch is not a reliable best build."
        ],
        bullets: [
          "Clear performance in early and mid-game encounters.",
          "Reliable defense or escape plan.",
          "Resource use that does not collapse after one fight.",
          "Known weapon, spell, and relic synergy.",
          "Patch version attached to the recommendation."
        ]
      },
      verificationSection("best-build ranking")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/builds/beginner-build",
      "fatekeeper/builds/spellblade-build",
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/relics"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/builds/beginner-build",
    title: "Fatekeeper Beginner Build: Safe Starter Plan",
    h1: "Fatekeeper Beginner Build",
    description:
      "A safe Fatekeeper beginner build plan focused on survivability, flexible weapon testing, utility magic, and conservative upgrades.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer:
      "The safest beginner build is a flexible setup: reliable melee timing, one utility spell, defensive habits, and delayed heavy investment until upgrade costs and respec rules are known.",
    takeaways: [
      "Prioritize reliability over theoretical damage.",
      "Use one melee tool and one utility spell as the core.",
      "Delay expensive upgrades until the build survives repeated fights.",
      "Record what makes the build fail."
    ],
    sections: [
      {
        heading: "Playstyle",
        body: [
          "The beginner build is not a weak build. It is a learning build. Its job is to keep the player alive long enough to understand enemy patterns, weapon timing, spell utility, and relic effects.",
          "Use roles rather than fake item names: a consistent melee weapon, a spell that creates safety, and relic effects that improve survival or resource recovery."
        ],
        table: {
          caption: "Beginner build plan",
          headers: ["Slot", "Recommendation", "Reason"],
          rows: [
            ["Weapon", "Reliable reach and recovery", "Easier timing for new players"],
            ["Spell", "Control or space-creating utility", "Prevents panic trades"],
            ["Relic", "Defense, recovery, or sustain effect", "Stabilizes learning"],
            ["Upgrade priority", "Survival first, damage second", "Reduces reset risk"]
          ]
        }
      },
      {
        heading: "Strengths and weaknesses",
        body: [
          "The beginner build has a clear weakness: it may not be the fastest killer. That is acceptable. Its strength is consistency, lower punishment, and broad compatibility with future discoveries.",
          "After launch, exact starter tools and a tested upgrade order can replace the pre-launch plan."
        ],
        bullets: [
          "Strength: safer learning curve.",
          "Strength: flexible if balance changes.",
          "Weakness: may clear slower than optimized builds.",
          "Weakness: exact upgrade path still needs testing."
        ]
      },
      verificationSection("beginner build")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/builds/best-builds",
      "fatekeeper/beginner-guide",
      "fatekeeper/combat-guide",
      "fatekeeper/relics"
    ]
  }),
  page({
    slug: "fatekeeper/builds/spellblade-build",
    title: "Fatekeeper Spellblade Build: Melee and Magic Hybrid Plan",
    h1: "Fatekeeper Spellblade Build",
    description:
      "Plan a Fatekeeper spellblade build around melee pressure, spell utility, relic synergy, and launch-week testing.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "The spellblade build is the most promising flexible archetype before launch because it can combine melee timing with spell utility. It still needs testing for resource cost, cast safety, scaling, and relic support.",
    takeaways: [
      "A spellblade solves problems with both range and melee.",
      "Resource economy is the biggest unknown.",
      "Relics may decide whether hybrid play is efficient.",
      "Cast times and scaling need testing before the spellblade page can rank exact spells."
    ],
    sections: [
      {
        heading: "Playstyle",
        body: [
          "A spellblade is not a character that randomly alternates attacks and spells. Use spells to create melee openings, control distance, punish enemies that are unsafe to approach, or add burst when a window appears.",
          "That makes this build attractive for Early Access: it can adapt while the player learns the rules."
        ],
        table: {
          caption: "Spellblade synergy plan",
          headers: ["Layer", "Target behavior", "Needs testing"],
          rows: [
            ["Weapon", "Reliable melee punish after spell pressure", "Range and recovery"],
            ["Spell", "Control, burst, or spacing tool", "Mana cost and cast safety"],
            ["Relic", "Rewards alternating melee and magic", "Exact effects"],
            ["Armor", "Enough safety to cast under pressure", "Weight and defense rules"]
          ]
        }
      },
      {
        heading: "Upgrade priority",
        body: [
          "Upgrade priority stays conditional. If spell costs are high, melee reliability comes first. If spells control enemies safely, spell investment may become the main power line.",
          "Do not declare fire, frost, shadow, or utility best until the schools are verified in the playable build."
        ]
      },
      verificationSection("spellblade build")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/spells",
      "fatekeeper/weapons",
      "fatekeeper/relics",
      "fatekeeper/combat-guide"
    ]
  }),
  page({
    slug: "fatekeeper/builds/heavy-build",
    title: "Fatekeeper Heavy Build: Stagger and High-Commitment Plan",
    h1: "Fatekeeper Heavy Build",
    description:
      "Plan a Fatekeeper heavy build around committed attacks, stagger testing, defensive spacing, and upgrade confidence.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "The heavy build may become strong if high-commitment attacks create reliable stagger or burst. It is risky before launch because recovery time, stamina pressure, and enemy interruption rules are unknown.",
    takeaways: [
      "Heavy builds need timing data more than hype.",
      "Stagger and recovery are the core tests.",
      "Defense or spacing support is mandatory.",
      "Do not call heavy best until failure cases are known."
    ],
    sections: [
      {
        heading: "Playstyle",
        body: [
          "A heavy build usually wins by trading speed for impact. In Fatekeeper, that trade only works if enemies can be staggered, interrupted, spaced, or punished after a clear window.",
          "Before launch, ask the key question: can this build safely commit to attacks?"
        ],
        table: {
          caption: "Heavy build test plan",
          headers: ["Test", "Good outcome", "Bad outcome"],
          rows: [
            ["Stagger", "Heavy hits interrupt key enemies", "Enemies ignore commitment"],
            ["Recovery", "Player can roll, block, or reposition after attacks", "Attacks are punished too often"],
            ["Resource", "High damage offsets cost", "Cost drains too fast"],
            ["Relics", "Effects reward slow hits or stagger", "No support found"]
          ]
        }
      },
      {
        heading: "Strengths and weaknesses",
        body: [
          "The build's possible strength is high impact. Its likely weakness is exposure. That makes it a bad page for fake confidence and a good page for launch-week testing notes.",
          "If the launch build has enemies that punish slow recovery, this build may need defensive spells or relics before it becomes practical."
        ]
      },
      verificationSection("heavy build")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/weapons",
      "fatekeeper/relics",
      "fatekeeper/enemies",
      "fatekeeper/combat-guide"
    ]
  }),
  page({
    slug: "fatekeeper/builds/dagger-build",
    title: "Fatekeeper Dagger Build: Speed, Positioning, and Risk Plan",
    h1: "Fatekeeper Dagger Build",
    description:
      "Plan a Fatekeeper dagger build around speed, positioning, status testing, and close-range survival.",
    category: "Builds",
    intent: "build",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "A dagger build is likely to reward speed and positioning, but it needs testing for damage scaling, reach, status effects, enemy armor behavior, and whether fast attacks stay safe in first-person combat.",
    takeaways: [
      "Dagger value depends on reach, safety, and scaling.",
      "Do not assume status or backstab systems before they are verified.",
      "This build needs enemy matchup notes.",
      "It may be strong for skilled players but punishing for beginners."
    ],
    sections: [
      {
        heading: "Playstyle",
        body: [
          "Treat the dagger archetype as a high-information build. It likely asks you to understand enemy range, dodge windows, and when close pressure is safe.",
          "Do not assume poison, bleed, backstab, or stealth interactions unless those systems are verified."
        ],
        table: {
          caption: "Dagger build questions",
          headers: ["Question", "Why it matters", "Status"],
          rows: [
            ["Does speed offset low reach?", "Defines safety", "Needs testing"],
            ["Are there status effects?", "Could define dagger identity", "Needs testing"],
            ["Do enemies have armor behavior?", "May reduce fast-hit value", "Needs testing"],
            ["Do relics reward rapid hits?", "Could unlock build power", "Needs testing"]
          ]
        }
      },
      verificationSection("dagger build")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/weapons",
      "fatekeeper/relics",
      "fatekeeper/combat-guide",
      "fatekeeper/enemies"
    ]
  }),
  page({
    slug: "fatekeeper/weapons",
    title: "Fatekeeper Weapons Database and Weapon Guide",
    h1: "Fatekeeper Weapons",
    description:
      "Track Fatekeeper weapon categories, scaling questions, effects, locations, upgrade materials, and best-build usage after launch.",
    category: "Database",
    intent: "database",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "The weapons database starts with useful pre-launch structure and expands with weapon type, damage, scaling, effect, passive perk, upgrade materials, location, and builds using it once the Early Access build can be tested.",
    takeaways: [
      "Do not invent weapon names or stats before launch.",
      "The database is organized for real entries as soon as items can be tested.",
      "Weapon role is useful before exact numbers.",
      "Every entry needs patch version and source status."
    ],
    sections: [
      {
        heading: "How the weapon database works",
        body: [
          "Use the weapons page to understand the fields that matter: stats, scaling, passive effects, materials, locations, and build links.",
          "Before verified item data exists, weapon categories can be described as testing buckets: swords, daggers, axes, heavy weapons, and catalysts."
        ],
        table: {
          caption: "Weapon categories to track",
          headers: ["Category", "Likely role", "What must be verified"],
          rows: [
            ["Swords", "Balanced melee timing", "Damage, scaling, moveset, locations"],
            ["Daggers", "Speed and close pressure", "Reach, status, scaling, safety"],
            ["Axes", "Power and commitment", "Recovery, stagger, resource cost"],
            ["Heavy weapons", "Burst or stagger testing", "Interrupt rules and upgrade value"],
            ["Catalysts", "Magic support if present", "Spell scaling and equip rules"]
          ]
        }
      },
      {
        heading: "Weapon page layout",
        body: [
          "Each weapon entry will include damage, scaling, effect, passive perk, upgrade materials, location, best builds using it, and a status badge. Unknown fields stay marked unknown rather than being filled with fake data.",
          "This format lets new findings appear one weapon at a time without mixing verified and unverified data."
        ]
      },
      verificationSection("weapon data")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/builds/dagger-build",
      "fatekeeper/builds/heavy-build",
      "fatekeeper/combat-guide",
      "fatekeeper/relics"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/spells",
    title: "Fatekeeper Spells Database and Magic Guide",
    h1: "Fatekeeper Spells",
    description:
      "Track Fatekeeper spells, mana cost, cooldown, damage type, unlock location, scaling, and best combo pairings after launch.",
    category: "Database",
    intent: "database",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "The spells section functions as a magic database and synergy guide. Until Early Access is tested, it tracks spell roles and open questions instead of claiming final schools, costs, cooldowns, or best combos.",
    takeaways: [
      "Spell roles are useful before exact spell names are verified.",
      "Mana cost, cooldown, cast time, and scaling are mandatory fields.",
      "Best combo claims need repeatable evidence.",
      "Spellblade builds need direct links to tested spells."
    ],
    sections: [
      {
        heading: "Spell categories to track",
        body: [
          "Spell categories match how players search: fire, frost, shadow, utility, buff, and AoE. Treat them as tracking buckets until the actual spell list is verified.",
          "Test each spell for more than damage. Cast time, safety, resource cost, range, control, scaling, and synergy decide whether a spell is actually useful."
        ],
        table: {
          caption: "Magic database fields",
          headers: ["Field", "Why users need it", "Status"],
          rows: [
            ["Mana cost", "Determines sustain", "Needs testing"],
            ["Cooldown or recovery", "Determines rotation speed", "Needs testing"],
            ["Damage type", "Connects to enemy weakness", "Needs testing"],
            ["Unlock location", "Turns the page into a guide", "Needs testing"],
            ["Best combo", "Connects spells to builds", "Needs testing"]
          ]
        }
      },
      {
        heading: "How to judge spells",
        body: [
          "A spell is not good just because it deals damage. It can be good because it creates space, interrupts an enemy, covers a weakness, or lets a melee build survive a bad position.",
          "Rank spell confidence by tested scenarios, not by tooltip size alone."
        ]
      },
      verificationSection("spell data")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds/spellblade-build",
      "fatekeeper/combat-guide",
      "fatekeeper/relics",
      "fatekeeper/enemies",
      "fatekeeper/weapons"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/relics",
    title: "Fatekeeper Relics and Passive Effects Guide",
    h1: "Fatekeeper Relics",
    description:
      "Track Fatekeeper relics, passive effects, strongest combinations, build synergy, and post-launch verification.",
    category: "Database",
    intent: "database",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.gear,
    quickAnswer:
      "Relics are likely to be one of the most important build systems, but exact effects and locations need testing. This database links relic effects to builds, weapons, spells, and source status as findings are verified.",
    takeaways: [
      "Treat relics as build-defining until proven otherwise.",
      "Each relic needs effect, location, synergy, and patch version.",
      "Combination claims need direct testing.",
      "Strongest relic claims need verified data."
    ],
    sections: [
      {
        heading: "Relic database design",
        body: [
          "Relic pages win when they connect passive effects to decisions. A player does not only need to know what a relic does. They need to know which build wants it, where to find it, whether it stacks, and whether it changes combat behavior.",
          "Before launch, this section shows which relic fields matter and what needs testing."
        ],
        table: {
          caption: "Relic entry fields",
          headers: ["Field", "Purpose", "Verification"],
          rows: [
            ["Passive effect", "Core function", "Needs exact in-game text"],
            ["Location", "Turns data into a guide", "Needs screenshot or route"],
            ["Best build", "Connects to build hub", "Needs testing"],
            ["Stacking or conflicts", "Prevents bad combinations", "Needs repeat tests"]
          ]
        }
      },
      {
        heading: "How to test relic strength",
        body: [
          "The strongest relic is not always the one with the flashiest text. It may be the one that solves a build's weakness, reduces resource pressure, improves safety, or changes a breakpoint.",
          "Every relic recommendation needs the build used, enemy or area tested, and patch version."
        ]
      },
      verificationSection("relic data")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/builds",
      "fatekeeper/builds/best-builds",
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/world"
    ],
    featured: true
  }),
  page({
    slug: "fatekeeper/enemies",
    title: "Fatekeeper Enemies Guide: Weaknesses, Patterns, Drops, and Testing",
    h1: "Fatekeeper Enemies",
    description:
      "Track Fatekeeper enemy types, attack patterns, weaknesses, drops, strategy notes, and community verification after launch.",
    category: "Database",
    intent: "solve",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.combat,
    quickAnswer:
      "Enemy pages do not invent weaknesses or drops before launch. Use the format to track overview, attack patterns, weakness tests, drops, strategy, rewards, and patch version.",
    takeaways: [
      "Enemy weaknesses need repeatable tests.",
      "Attack patterns can be documented with screenshots or clips.",
      "Drops must include sample count when possible.",
      "Enemy pages link to builds and spells that solve the matchup once testing confirms them."
    ],
    sections: [
      {
        heading: "How enemy entries help during play",
        body: [
          "Enemy pages are useful when you are stuck and need a practical answer. Start with what to do, then check the evidence behind the advice.",
          "Before launch, the enemies hub tracks evidence standards and visible official enemy context without assigning fake names or drops."
        ],
        table: {
          caption: "Enemy entry fields",
          headers: ["Field", "User value", "Evidence needed"],
          rows: [
            ["Overview", "What this enemy is", "In-game name or official source"],
            ["Attack patterns", "How to survive", "Repeated encounters or clip review"],
            ["Weakness", "What to use", "Tested weapon or spell comparisons"],
            ["Drops", "Why to farm", "Recorded drops and sample count"],
            ["Strategy", "Fast answer during play", "Hands-on testing"]
          ]
        }
      },
      {
        heading: "Launch-week enemy testing",
        body: [
          "The first enemy pass focuses on early enemies and recurring types. Bosses stay separate because they need route context, phases, rewards, and spoiler handling.",
          "Enemy weaknesses are reliable only when multiple damage types or tactics are compared against the same enemy under similar conditions."
        ]
      },
      verificationSection("enemy data")
    ],
    sources: [sourceLinks.steam, sourceLinks.official, sourceLinks.thqUnderdwellers, sourceLinks.youtubeGameplay],
    related: [
      "fatekeeper/combat-guide",
      "fatekeeper/bosses",
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/builds"
    ]
  }),
  page({
    slug: "fatekeeper/bosses",
    title: "Fatekeeper Boss Guide: Strategies, Patterns, Rewards, and Spoiler Rules",
    h1: "Fatekeeper Bosses",
    description:
      "Track Fatekeeper boss strategy fields: attack patterns, weaknesses, strategy, drops, rewards, spoiler rules, and verification status.",
    category: "Database",
    intent: "solve",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer:
      "Boss guides must wait for hands-on testing. This page defines the boss guide format: spoiler control, phase notes, attack patterns, punish windows, recommended builds, rewards, and patch version.",
    takeaways: [
      "Do not publish fake boss names or route spoilers.",
      "Boss pages need phase and attack evidence.",
      "Recommended builds must be tested against that boss.",
      "Rewards and drops require exact in-game confirmation."
    ],
    sections: [
      {
        heading: "How boss pages will work",
        body: [
          "Boss pages are high-value but high-risk. If they are wrong, players lose time. Individual boss strategies need direct evidence before they are treated as reliable.",
          "The best format is practical: quick strategy, recommended loadout, attack pattern table, phase changes, punish windows, rewards, and source status."
        ],
        table: {
          caption: "Boss guide fields",
          headers: ["Field", "Purpose", "Publish when"],
          rows: [
            ["Quick strategy", "Helps stuck players first", "After first clear and repeat test"],
            ["Attack patterns", "Teaches survival", "After multiple attempts"],
            ["Weakness", "Build and spell guidance", "After controlled testing"],
            ["Rewards", "Progression planning", "After exact in-game confirmation"],
            ["Patch version", "Prevents outdated advice", "Always required"]
          ]
        }
      },
      {
        heading: "Spoiler and trust rules",
        body: [
          "Boss content avoids homepage spoilers. Individual boss pages can use spoiler-aware titles after the game is live.",
          "If a boss strategy is based on one clear, label it as early testing rather than community verified."
        ]
      },
      verificationSection("boss strategy")
    ],
    sources: coreSources,
    related: [
      "fatekeeper/enemies",
      "fatekeeper/combat-guide",
      "fatekeeper/builds/best-builds",
      "fatekeeper/weapons",
      "fatekeeper/spells"
    ]
  }),
  page({
    slug: "fatekeeper/world",
    title: "Fatekeeper World and Exploration Guide",
    h1: "Fatekeeper World and Exploration",
    description:
      "Track Fatekeeper world exploration, secret areas, puzzles, hidden loot, locked doors, dungeon routes, and source status.",
    category: "Database",
    intent: "solve",
    status: "Needs Post-Launch Testing",
    lastUpdated,
    heroImage: media.hero,
    quickAnswer:
      "The world guide helps you explore without fake map data. It tracks secret areas, puzzles, locked doors, hidden loot, dungeon walkthroughs, and route notes after those findings are verified in Early Access.",
    takeaways: [
      "Exploration content needs screenshots, route notes, and patch version.",
      "Hidden loot and puzzle solutions are never invented.",
      "World pages link to relics, weapons, spells, and enemies when discoveries connect.",
      "Before launch, the value is knowing exactly which exploration details need proof."
    ],
    sections: [
      {
        heading: "How the world guide works",
        body: [
          "Exploration pages work like practical maps in text form. You want to know where to go, what unlocks, what is missable, and what reward matters. Before launch, none of that is fabricated.",
          "The world guide starts with the verification model, then adds exact discoveries after they are tested."
        ],
        table: {
          caption: "Exploration fields",
          headers: ["Content type", "What to record", "Evidence"],
          rows: [
            ["Secret area", "Entry point, requirement, reward", "Screenshot and route notes"],
            ["Puzzle", "Clue, solution, reward", "Step-by-step tested route"],
            ["Locked door", "Location and key or trigger", "Before/after confirmation"],
            ["Hidden loot", "Exact item and location", "In-game item text"],
            ["Dungeon route", "Major branches and blockers", "Patch version route test"]
          ]
        }
      },
      {
        heading: "How world pages connect to builds and databases",
        body: [
          "World discoveries are connected. If a hidden area contains a relic, it links to the relic database. If a route includes a hard enemy, it links to the enemy page. If a puzzle unlocks a weapon, it links to the weapon entry.",
          "Those links turn isolated discoveries into a usable guide system."
        ]
      },
      verificationSection("world exploration")
    ],
    sources: [sourceLinks.steam, sourceLinks.official, sourceLinks.thqUnderdwellers, sourceLinks.youtubeAnnouncement],
    related: [
      "fatekeeper/relics",
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/enemies",
      "fatekeeper/bosses"
    ]
  })
];

export const homeClusters = [
  {
    title: "Launch Readiness",
    description: "Buy, wait, run it, or prepare for unlock.",
    pages: [
      "fatekeeper/release-date",
      "fatekeeper/early-access",
      "fatekeeper/is-it-worth-it",
      "fatekeeper/system-requirements",
      "fatekeeper/steam-deck",
      "fatekeeper/controller-support"
    ]
  },
  {
    title: "Beginner Tutorials",
    description: "Learn the systems before wasting upgrades.",
    pages: [
      "fatekeeper/beginner-guide",
      "fatekeeper/tips-and-tricks",
      "fatekeeper/first-hours-guide",
      "fatekeeper/combat-guide",
      "fatekeeper/mistakes-to-avoid"
    ]
  },
  {
    title: "Builds",
    description: "Choose a playstyle with confidence labels.",
    pages: [
      "fatekeeper/builds",
      "fatekeeper/builds/best-builds",
      "fatekeeper/builds/beginner-build",
      "fatekeeper/builds/spellblade-build",
      "fatekeeper/builds/heavy-build",
      "fatekeeper/builds/dagger-build"
    ]
  },
  {
    title: "Databases",
    description: "Weapons, spells, relics, enemies, bosses, and world data.",
    pages: [
      "fatekeeper/weapons",
      "fatekeeper/spells",
      "fatekeeper/relics",
      "fatekeeper/enemies",
      "fatekeeper/bosses",
      "fatekeeper/world"
    ]
  }
];

export function getGuidePage(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}

export function getGuides(slugs: string[]) {
  return slugs
    .map((slug) => getGuidePage(slug))
    .filter((guide): guide is GuidePage => Boolean(guide));
}

export function getFeaturedGuides() {
  return guidePages.filter((guide) => guide.featured);
}

export function getLatestGuides() {
  return [...guidePages].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)).slice(0, 8);
}

export function getSearchIndex() {
  return guidePages.map((guide) => ({
    title: guide.h1,
    href: `/${guide.slug}`,
    category: guide.category,
    description: guide.description,
    status: guide.status
  }));
}
