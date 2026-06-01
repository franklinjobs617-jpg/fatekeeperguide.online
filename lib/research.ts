import { sourceLinks } from "./site";

export const playerDemandSignals = [
  {
    title: "Can I play it at launch?",
    intent: "Release and access",
    body:
      "Players need the Early Access date, Steam platform status, launch timing, and a clear warning that store timing can change near release.",
    href: "/fatekeeper/release-date",
    source: sourceLinks.steam
  },
  {
    title: "Is Early Access enough content?",
    intent: "Buy or wait",
    body:
      "Steam's Early Access notes make content scope a buying decision. Players need the two-hour launch scope, planned 1.0 length, and update expectations before spending money.",
    href: "/fatekeeper/early-access",
    source: sourceLinks.steam
  },
  {
    title: "What kind of RPG is it?",
    intent: "Game fit",
    body:
      "Media and community discussion focus on first-person fantasy combat, Dark Messiah-style comparisons, melee weight, magic utility, exploration, and whether the game is linear or open-ended.",
    href: "/fatekeeper/dark-messiah-comparison",
    source: sourceLinks.pcgamer
  },
  {
    title: "Is it co-op or single-player?",
    intent: "Multiplayer",
    body:
      "Steam Community discussion shows co-op demand. Players need the direct answer before planning a launch session with friends.",
    href: "/fatekeeper/multiplayer-coop",
    source: sourceLinks.steamCommunityCoop
  },
  {
    title: "What is the price?",
    intent: "Price",
    body:
      "Price, discount, preorder, and buy-now searches are high-intent terms because Steam says Early Access is discounted and pricing will rise with updates.",
    href: "/fatekeeper/price",
    source: sourceLinks.steam
  },
  {
    title: "Can my PC run it?",
    intent: "Hardware check",
    body:
      "The listed GPU and RAM requirements are high enough that performance, VRAM, Steam Deck status, and settings guidance need dedicated pages.",
    href: "/fatekeeper/system-requirements",
    source: sourceLinks.steam
  },
  {
    title: "What should I do first?",
    intent: "Beginner help",
    body:
      "New players will need a first-session route: controls, spacing, weapon reach, spell safety, upgrade caution, exploration checks, and mistake prevention.",
    href: "/fatekeeper/first-hours-guide",
    source: sourceLinks.youtubeGameplay
  },
  {
    title: "Which build or weapon is best?",
    intent: "Build planning",
    body:
      "Build demand is already visible before launch, but tier lists need proof. The useful answer is a confidence-ranked plan with exact stats added after testing.",
    href: "/fatekeeper/builds/best-builds",
    source: sourceLinks.redditGameplay
  }
];

const intentQuestions = {
  buy: [
    "When does Fatekeeper unlock, and which time zone should I use?",
    "How much content is in the first Early Access build?",
    "How much does Fatekeeper cost, and is the Early Access version discounted?",
    "Is Fatekeeper on PS5, Xbox, Game Pass, or only Steam PC?",
    "Is Fatekeeper co-op, multiplayer, or single-player?",
    "Does Fatekeeper have a demo, preload, or early download?",
    "Should I buy at launch or wait for player reports?",
    "Can my PC or Steam Deck handle the listed requirements?"
  ],
  learn: [
    "What should I learn in the first hour?",
    "Is Fatekeeper like Dark Messiah or Skyrim?",
    "Does Fatekeeper have reactive combat, kick-style physics, or environmental kills?",
    "Which early mistakes waste time or resources?",
    "How do weapons, spells, relics, armor, and exploration connect?",
    "What can be trusted before hands-on launch testing?"
  ],
  build: [
    "Which build is safest for a first playthrough?",
    "How should I compare melee, magic, heavy, and fast weapons?",
    "What upgrade order is safe before the meta is verified?",
    "What evidence is needed before a build becomes recommended?"
  ],
  database: [
    "What fields will each weapon, spell, relic, enemy, or boss entry show?",
    "Which details are official, trailer-based, or still untested?",
    "Where should locations, drops, weaknesses, and patch versions appear?",
    "How do database entries link back to builds and route pages?"
  ],
  solve: [
    "What should I do when an enemy or boss blocks progress?",
    "Which weaknesses, attack patterns, and rewards are actually verified?",
    "How are spoilers handled for bosses and world routes?",
    "Which build, weapon, spell, or relic helps with this problem?"
  ]
};

export function getIntentQuestions(intent: keyof typeof intentQuestions) {
  return intentQuestions[intent];
}

export const researchSourceNotes = [
  {
    label: "Steam",
    value: "Release timing, Early Access scope, platform, requirements, and official store wording.",
    source: sourceLinks.steam
  },
  {
    label: "Official site and THQ Nordic",
    value: "Game positioning, trailers, publisher news, and official visual material.",
    source: sourceLinks.official
  },
  {
    label: "YouTube",
    value: "Gameplay reveal footage, Dark Messiah-like titles, combat readability, weapon and spell presentation, and trailer questions.",
    source: sourceLinks.youtubeGameplay
  },
  {
    label: "Reddit",
    value: "Community demand around combat depth, RPG structure, Dark Messiah comparisons, and Early Access trust.",
    source: sourceLinks.redditGameplay
  },
  {
    label: "Google Trends",
    value: "Trend timing signal for branded searches. Low-volume pre-launch terms should be treated as directional, not exact demand data.",
    source: sourceLinks.googleTrends
  }
];
