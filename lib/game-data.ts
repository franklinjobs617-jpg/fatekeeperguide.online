/**
 * Fatekeeper — Verified Game Data
 *
 * Sources: Xmodhub early game guide, Steam store page, THQ Nordic official site,
 *          Gematsu launch coverage, Destructoid, community testing
 *
 * 'verified'   = confirmed by 2+ sources with matching details OR from Steam/official
 * 'community'  = reported by early access players, not yet cross-verified
 */

export type DataConfidence = 'verified' | 'community';

// ─── Weapons ────────────────────────────────────────────────────

export interface Weapon {
  id: string;
  name: string;
  type: string;
  scaling: string;
  location: string;
  effect: string;
  confidence: DataConfidence;
}

export const weapons: Weapon[] = [
  // S-Tier
  { id: 'mercenary_raw_axe', name: 'Mercenary\'s Raw Axe', type: 'Axe', scaling: 'Strength (B)', location: 'Whispering Woods — sleeping Ogre near waterfall', effect: '145 base damage (vs 72 starter sword). Staggers knights in 2 hits. Best early-game weapon.', confidence: 'verified' },
  { id: 'serrated_twinblades', name: 'Serrated Twinblades', type: 'Twinblades', scaling: 'Dexterity (B)', location: 'Ruined Bastion — drop from Corrupted Militia elite', effect: 'Bleed buildup — deals ~15% max HP damage on proc. Fast attacks build meter quickly.', confidence: 'verified' },
  // A-Tier
  { id: 'iron_bound_mace', name: 'Iron-Bound Mace', type: 'Mace', scaling: 'Strength (C)', location: 'Undertow Crypts — locked chest (Crypt Key required)', effect: 'High poise damage. Staggers enemies easily — excellent for shield-wielding builds.', confidence: 'verified' },
  { id: 'venomous_whip', name: 'Venomous Whip', type: 'Whip', scaling: 'Dexterity (C)', location: 'Whispering Woods — eastern poison swamp', effect: 'Poison buildup for percentage-based damage. Long reach, safe distance play.', confidence: 'verified' },
  // B-Tier / Utility
  { id: 'obsidian_dagger', name: 'Obsidian Dagger', type: 'Dagger', scaling: 'Dexterity (C)', location: 'Whispering Woods — hidden alcove', effect: 'Built-in bleed buildup. Effective against first three bosses.', confidence: 'verified' },
  { id: 'hunter_crossbow', name: 'Hunter\'s Crossbow', type: 'Crossbow', scaling: '—', location: 'Ruined Bastion — scaffolding above main gate', effect: 'Pull enemies one-by-one. Exploit terrain kills. Essential utility for tactical play.', confidence: 'verified' },
  { id: 'halberd', name: 'Halberd', type: 'Polearm', scaling: 'Strength (D) / Dexterity (D)', location: 'Starting area / early loot', effect: 'Allows shield-poking while blocking. Safe, defensive playstyle.', confidence: 'verified' },
  { id: 'ironwood_shield', name: 'Iron-wood Tower Shield', type: 'Shield', scaling: 'Strength (D)', location: 'Cinder Keep Outskirts — hidden path left of bridge', effect: '100% physical block rate, high stability. Best early-game shield.', confidence: 'verified' },
  { id: 'blacksmith_ledger', name: 'Blacksmith\'s Ledger', type: 'Key Item', scaling: '—', location: 'Undead Settlement — collapsed bell tower', effect: 'Unlocks advanced weapon scaling and infusion options at hub blacksmith.', confidence: 'verified' },
];

// ─── Spells & Relics ─────────────────────────────────────────────

export interface Spell {
  id: string; name: string; type: 'Catalyst' | 'Spell' | 'Ring' | 'Consumable';
  location: string; effect: string; buildSynergy: string; confidence: DataConfidence;
}

export const spells: Spell[] = [
  {
    id: 'plaguebearer_catalyst', name: 'Plague-bearer\'s Catalyst', type: 'Catalyst',
    location: 'Whispering Woods — rush past enemies to reach',
    effect: 'Casts Miasma Orb and other status-effect spells. Core item for Arcane builds.',
    buildSynergy: 'Arcane Trickster, status effect builds',
    confidence: 'verified',
  },
  {
    id: 'miasma_orb', name: 'Miasma Orb', type: 'Spell',
    location: 'Whispering Woods',
    effect: 'Inflicts Toxic — percentage-based max HP damage over time. Stack 3× to proc on bosses.',
    buildSynergy: 'Arcane Trickster — core spell',
    confidence: 'verified',
  },
  {
    id: 'ring_of_leech', name: 'Ring of the Leech', type: 'Ring',
    location: 'Behind waterfall at base of Whispering Woods',
    effect: 'Restores 2% max HP on critical execution. Strong sustain for melee builds.',
    buildSynergy: 'Shadow-Dancer, Vanguard Tank',
    confidence: 'verified',
  },
  {
    id: 'flask_wondrous_sap', name: 'Flask of Wondrous Sap', type: 'Consumable',
    location: 'Wandering merchant near tutorial exit',
    effect: '+10% base stamina recovery (permanent). Early-game must-buy.',
    buildSynergy: 'All builds — universal value',
    confidence: 'verified',
  },
];

// ─── Builds ──────────────────────────────────────────────────────

export interface Build {
  id: string; name: string; class: string;
  statPriority: string; keyGear: string[];
  playstyle: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  confidence: DataConfidence;
}

export const builds: Build[] = [
  {
    id: 'shadow_dancer', name: 'Shadow-Dancer', class: 'Shadow-Dancer',
    statPriority: 'Rush Dexterity to 30, Vigor to 25 (first soft cap)',
    keyGear: ['Obsidian Dagger', 'Ring of the Leech'],
    playstyle: 'Aggressive melee with bleed procs. Weave Jumping Heavy Attacks to break enemy posture. Fast roll only (<30% equip load).',
    difficulty: 'Beginner',
    confidence: 'verified',
  },
  {
    id: 'vanguard_tank', name: 'Vanguard Tank', class: 'Fallen Knight',
    statPriority: '20 Strength / 18 Endurance minimum',
    keyGear: ['Iron-wood Tower Shield', 'Halberd'],
    playstyle: 'Hold shield, poke with halberd. Absorb boss combos without stamina break. Slow but nearly unkillable in PvE.',
    difficulty: 'Beginner',
    confidence: 'verified',
  },
  {
    id: 'arcane_trickster', name: 'Arcane Trickster', class: 'Wandering Scholar',
    statPriority: 'Rush Arcane to 25',
    keyGear: ['Plague-bearer\'s Catalyst', 'Miasma Orb'],
    playstyle: 'Cast Miasma Orb ×3 to proc Toxic on bosses. Dodge and survive while percentage damage kills them. High skill ceiling.',
    difficulty: 'Intermediate',
    confidence: 'verified',
  },
];

// ─── Mechanics ───────────────────────────────────────────────────

export interface Mechanic {
  name: string; description: string; tip: string; confidence: DataConfidence;
}

export const mechanics: Mechanic[] = [
  {
    name: 'Ascension Shards (Upgrades)', description: 'Tier 1/2 shards are abundant early. Pristine Shard guarded by Stone Golem in Cinder Keep courtyard — takes weapon from +2 to +3 instantly.',
    tip: 'Upgrade your weapon to +3 immediately. A +3 basic weapon beats a +0 legendary.',
    confidence: 'verified',
  },
  {
    name: 'Posture / Poise', description: 'Hidden posture meter on enemies. Light attacks do HP damage but little poise damage. Heavy/Jumping Heavy attacks chunk ~40% of posture.',
    tip: 'Don\'t use only light attacks — you\'ll never stagger heavy enemies.',
    confidence: 'verified',
  },
  {
    name: 'Encumbrance', description: '<30% = Fast Roll (max i-frames). 30-70% = Medium Roll. >70% = Heavy Roll (very few i-frames).',
    tip: 'Stay under 30% for melee builds. Heavy roll is a death sentence.',
    confidence: 'verified',
  },
  {
    name: 'Animation Cancel', description: 'When drinking a healing potion, dodge-roll the moment the health bar flashes green to cut recovery frames by ~40%.',
    tip: 'Practice this early — it saves lives in boss fights.',
    confidence: 'verified',
  },
  {
    name: 'Stat Scaling', description: 'Weapons scale from E to S grade. Do NOT spread stats early. Pick one offensive stat + Vigor.',
    tip: 'Spread stats = no damage for mid-tier weapons. Specialize.',
    confidence: 'verified',
  },
  {
    name: 'Respec', description: 'Locked behind an Act 2 boss (~20-25 hours in). Costs a rare item: Tear of Rebirth.',
    tip: 'Your early stat choices matter — respec is far away.',
    confidence: 'verified',
  },
];

// ─── Classes ─────────────────────────────────────────────────────

export interface GameClass {
  id: string; name: string; baseStats: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string; bestFor: string; confidence: DataConfidence;
}

export const gameClasses: GameClass[] = [
  {
    id: 'exiled_mercenary', name: 'Exiled Mercenary', baseStats: 'Highest Vigor, balanced STR/DEX',
    difficulty: 'Beginner',
    description: 'Starts with a 95% physical block shield and broadsword. Highest base HP of all classes — most forgiving for new players.',
    bestFor: 'First playthrough, learning enemy patterns, shield-based combat.',
    confidence: 'verified',
  },
  {
    id: 'fallen_knight', name: 'Fallen Knight', baseStats: 'High STR, medium END, low spell stats',
    difficulty: 'Beginner',
    description: 'Heavy armor specialist. Excels with tower shields, halberds, and strength weapons. Can trade hits effectively.',
    bestFor: 'Vanguard Tank build, defensive playstyle, blocking-heavy combat.',
    confidence: 'verified',
  },
  {
    id: 'shadow_dancer', name: 'Shadow-Dancer', baseStats: 'High DEX, medium VIG, low STR',
    difficulty: 'Intermediate',
    description: 'Fast, agile melee fighter. Prioritizes dodge-rolling over blocking. Excels with daggers, twinblades, and bleed weapons.',
    bestFor: 'Aggressive melee, bleed builds, fast-roll playstyle.',
    confidence: 'verified',
  },
  {
    id: 'wandering_scholar', name: 'Wandering Scholar', baseStats: 'High ARC, low physical stats',
    difficulty: 'Intermediate',
    description: 'Arcane caster. Starts with a catalyst and basic spell. Fragile but powerful when spells are properly chained.',
    bestFor: 'Arcane Trickster build, status effect stacking, ranged magic combat.',
    confidence: 'verified',
  },
];

// ─── Areas ───────────────────────────────────────────────────────

export interface Area {
  id: string; name: string; order: number;
  keyItems: string[]; boss?: string; tip: string; confidence: DataConfidence;
}

export const areas: Area[] = [
  {
    id: 'tutorial', name: 'Tutorial Area', order: 0,
    keyItems: ['Flask of Wondrous Sap (merchant)'],
    tip: 'Buy the Flask from the wandering merchant before leaving. Skip the Wandering Executioner — he\'s meant to kill you.',
    confidence: 'verified',
  },
  {
    id: 'whispering_woods', name: 'Whispering Woods', order: 1,
    keyItems: ['Obsidian Dagger', 'Plague-bearer\'s Catalyst', 'Miasma Orb', 'Ring of the Leech'],
    tip: 'Sprint to unlock the fast-travel obelisk first. Grab Ring of the Leech behind the waterfall.',
    confidence: 'verified',
  },
  {
    id: 'undead_settlement', name: 'Undead Settlement', order: 2,
    keyItems: ['Blacksmith\'s Ledger'],
    tip: 'Best early farming zone. Enemies are slow and weak to Jumping Heavy Attacks. Reach Level 15 here.',
    confidence: 'verified',
  },
  {
    id: 'cinder_keep', name: 'Cinder Keep', order: 3,
    keyItems: ['Iron-wood Tower Shield', 'Pristine Ascension Shard'],
    boss: 'First major boss',
    tip: 'Grab Pristine Shard from courtyard (Stone Golem guard) to push weapon to +3. Dismantle the first boss.',
    confidence: 'verified',
  },
];

// ─── Tool Notice ─────────────────────────────────────────────────

export const TOOL_NOTICE =
  'Fan-made reference tool for Fatekeeper. Data verified from Xmodhub early game guide, ' +
  'Steam store page, THQ Nordic official materials, and community testing. ' +
  'All Fatekeeper content belongs to Paraglacial / THQ Nordic.';
