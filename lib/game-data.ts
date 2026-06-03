import { getWikiEntities, type EvidenceStatus } from "./wiki-data";

export type DataConfidence = "official" | "review" | "community" | "conflicting" | "unverified";

function confidenceFrom(status: EvidenceStatus): DataConfidence {
  switch (status) {
    case "Official":
      return "official";
    case "Review Confirmed":
      return "review";
    case "Community Reported":
      return "community";
    case "Conflicting":
      return "conflicting";
    case "Unverified":
      return "unverified";
  }
}

function fieldValue(fields: { label: string; value: string }[], label: string, fallback = "Tracked in wiki entry") {
  return fields.find((field) => field.label === label)?.value ?? fallback;
}

export interface Weapon {
  id: string;
  name: string;
  type: string;
  scaling: string;
  location: string;
  effect: string;
  confidence: DataConfidence;
}

export const weapons: Weapon[] = getWikiEntities("weapons").map((entity) => ({
  id: entity.id,
  name: entity.name,
  type: fieldValue(entity.fields, "Type", "Weapon"),
  scaling: fieldValue(entity.fields, "Scaling", "Unknown"),
  location: fieldValue(entity.fields, "Location report", "Unknown"),
  effect: fieldValue(entity.fields, "Effect report", entity.summary),
  confidence: confidenceFrom(entity.evidenceStatus)
}));

export interface Spell {
  id: string;
  name: string;
  type: "Catalyst" | "Spell" | "Ring" | "Relic" | "Consumable" | "Upgrade material";
  location: string;
  effect: string;
  buildSynergy: string;
  confidence: DataConfidence;
}

export const spells: Spell[] = [...getWikiEntities("spells"), ...getWikiEntities("relics")].map((entity) => ({
  id: entity.id,
  name: entity.name,
  type: fieldValue(entity.fields, "Type", entity.category === "relics" ? "Relic" : "Spell") as Spell["type"],
  location: fieldValue(entity.fields, "Location report", "Unknown"),
  effect: fieldValue(entity.fields, "Effect report", fieldValue(entity.fields, "Use report", entity.summary)),
  buildSynergy: fieldValue(entity.fields, "Build fit", "See related wiki entries"),
  confidence: confidenceFrom(entity.evidenceStatus)
}));

export interface Build {
  id: string;
  name: string;
  class: string;
  statPriority: string;
  keyGear: string[];
  playstyle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  confidence: DataConfidence;
}

export const builds: Build[] = getWikiEntities("builds").map((entity) => ({
  id: entity.id,
  name: entity.name,
  class: fieldValue(entity.fields, "Role", "Build"),
  statPriority: fieldValue(entity.fields, "Reported stat priority", "Use the guide as a watchlist, not a final stat plan"),
  keyGear: entity.relatedEntities.filter((id) => weapons.some((weapon) => weapon.id === id) || spells.some((spell) => spell.id === id)),
  playstyle: entity.summary,
  difficulty: "Intermediate",
  confidence: confidenceFrom(entity.evidenceStatus)
}));

export interface Mechanic {
  name: string;
  description: string;
  tip: string;
  confidence: DataConfidence;
}

export const mechanics: Mechanic[] = getWikiEntities("mechanics").map((entity) => ({
  name: entity.name,
  description: entity.summary,
  tip: entity.quickAnswer,
  confidence: confidenceFrom(entity.evidenceStatus)
}));

export interface GameClass {
  id: string;
  name: string;
  baseStats: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  bestFor: string;
  confidence: DataConfidence;
}

export const gameClasses: GameClass[] = [
  {
    id: "shadow_dancer",
    name: "Shadow-Dancer",
    baseStats: "Dexterity-focused build pattern",
    difficulty: "Intermediate",
    description: "Community-reported fast melee build tied to bleed and quick punish windows.",
    bestFor: "Players testing dagger pressure and Ring of the Leech sustain.",
    confidence: "community"
  }
];

export interface Area {
  id: string;
  name: string;
  order: number;
  keyItems: string[];
  boss?: string;
  tip: string;
  confidence: DataConfidence;
}

export const areas: Area[] = getWikiEntities("locations").map((entity, index) => ({
  id: entity.id,
  name: entity.name,
  order: index + 1,
  keyItems: fieldValue(entity.fields, "Reported loot", "Unknown")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  boss: entity.relatedEntities.includes("first_major_boss") ? "First Major Boss" : undefined,
  tip: entity.quickAnswer,
  confidence: confidenceFrom(entity.evidenceStatus)
}));

export const TOOL_NOTICE =
  "Fan-made Fatekeeper wiki tools. Data is evidence-labeled from official pages, media, third-party guides, and community/wiki reports. Single-source reports are not treated as official facts.";
