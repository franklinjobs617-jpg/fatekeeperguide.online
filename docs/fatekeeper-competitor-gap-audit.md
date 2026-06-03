# Fatekeeper Competitor Gap Audit

Audit date: 2026-06-03

## Bottom Line

The current site has useful guide coverage, but the structure is still too close to a blog library. The biggest gap is not word count. The biggest gap is that competitors are moving toward wiki-style entity pages, while this site mostly answers topics through article pages.

This matters because Fatekeeper search demand splits into three jobs:

1. Fast factual answer: release state, price, Early Access scope, PC requirements, co-op, Steam Deck.
2. Wiki lookup: weapons, spells, relics, enemies, bosses, areas, classes, mechanics, quests, NPCs, drops, locations.
3. Problem solving: best build, how to beat X, where to find X, respec, farming, puzzles, progression blockers.

The current site covers job 1 reasonably well and has placeholders for jobs 2 and 3. It does not yet have a real wiki layer.

## Sources Checked

- Steam official store: https://store.steampowered.com/app/2186990/Fatekeeper/
- Official site: https://fatekeeper.thqnordic.com/
- Fatekeeper Wiki: https://fatekeeper.wiki/
- GameGuides Wiki Fatekeeper pages: https://gameguides.wiki/games/fatekeeper
- XMODhub Fatekeeper posts: https://www.xmodhub.com/info/blog/fatekeeper
- PCGamesN Fatekeeper coverage: https://www.pcgamesn.com/fatekeeper/early-access-release-date
- Rock Paper Shotgun coverage: https://www.rockpapershotgun.com/fatekeeper-looks-like-a-spiritual-successor-to-dark-messiah-but-wheres-the-kick
- PC Gamer coverage: https://www.pcgamer.com/games/rpg/fatekeeper-is-an-upcoming-first-person-rpg-with-heavy-dark-messiah-vibes/

## Current Site Inventory

Current routes found in `lib/guides.ts`:

- Launch pages: release date, Early Access, price, platforms, demo/preload, reviews, how long to beat, system requirements, Steam Deck, controller support, co-op.
- Beginner pages: beginner guide, first hours, tips, combat guide, mistakes, classes.
- Build pages: builds hub, best builds, beginner, spellblade, heavy, dagger.
- Database-like pages: weapons, spells, relics, enemies, bosses, world.
- Tool pages: build planner, progress tracker.
- One separate database route: `/database/weapons`.

This is a good base, but it is not enough for wiki intent.

## Critical Problems Found

### 1. The site has stale pre-launch framing

This is wrong now because the current date is 2026-06-03 and the site facts still frame Fatekeeper as scheduled for Early Access on 2026-06-02.

Examples in source:

- `lib/site.ts` says `releaseLabel: "June 2, 2026 at 17:00 UTC"`.
- Many guide sections still say "before launch", "pre-launch", "needs post-launch testing", and "reviews need the playable build".
- `lib/site.ts` says `storage: "20 GB available space"`, while Steam currently lists a larger storage requirement.

This is a trust issue. A wiki cannot look stale one day after launch.

### 2. `lib/game-data.ts` contains corrupted text and overconfident claims

This file has mojibake characters and claims exact weapons, locations, effects, classes, mechanics, areas, and community verification. That is dangerous because the rest of the site repeatedly says not to invent stats before proof.

Direct problem:

- The article layer says "do not invent weapon names or stats".
- The database layer already lists exact names, exact locations, exact effects, and marks them `verified`.

This contradiction kills the wiki trust model.

### 3. The wiki/database layer is too shallow

Current database pages are mostly hub articles. Real wiki structure needs entity pages:

- `/wiki/weapons/mercenarys-raw-axe`
- `/wiki/spells/miasma-orb`
- `/wiki/relics/ring-of-the-leech`
- `/wiki/enemies/corrupted-militia`
- `/wiki/bosses/{boss-name}`
- `/wiki/locations/{area-name}`
- `/wiki/mechanics/posture`

Without item-level URLs, Google has fewer precise landing pages for "where to find X", "best X build", "X location", "X weakness", and "X drop".

### 4. Competitors cover intent clusters that we do not cover as pages

Competitor and SERP-driven missing clusters:

| Cluster | Competitors covering it | Current state | Required action |
|---|---|---|---|
| Wiki home/entity taxonomy | Fatekeeper Wiki, GameGuides Wiki | Partial hubs only | Build `/wiki` hub and entity page templates |
| Locations/areas | Wiki-style competitors | Only `/fatekeeper/world` | Add location index and area pages |
| NPCs/characters/lore | Wiki-style competitors | Missing | Add lore/NPC only if official or in-game verified |
| Quests/objectives | Wiki-style competitors | Missing | Add quest/objective tracker after verification |
| Mechanics glossary | GameGuides/XMODhub style content | Partial inside articles | Add mechanics pages: posture, stamina, parry/block, magic, relics, upgrades |
| Materials/upgrades/crafting | Long-tail guide competitors | Missing | Add upgrade material database |
| Status effects/damage types | Wiki competitors and RPG intent | Missing | Add status/damage taxonomy |
| Farming/routes | XMODhub-style long tail | Missing | Add verified farming pages after launch tests |
| Puzzles/secrets | XMODhub-style long tail | Partial world page | Add secret/puzzle route pages with screenshots |
| Cheat/mod/trainer queries | XMODhub | Missing | Add a safe policy page only if worth targeting |
| Error/performance fixes | Steam/community demand | Thin | Add troubleshooting hub |

### 5. Current navigation says "Guide Library", not "Wiki"

The homepage title and clusters are article-oriented. That loses against a user who searches "Fatekeeper wiki", "Fatekeeper weapons", "Fatekeeper bosses", or "Fatekeeper relics".

Required change:

- Add a visible "Wiki" navigation item.
- Add a `/wiki` route.
- Put entity categories above blog-style articles.
- Keep guides, but make them support the wiki instead of replacing it.

## Competitor Notes

### Fatekeeper Wiki

Strengths:

- Owns the exact wiki positioning.
- Likely matches "Fatekeeper wiki" intent better than a guide library.
- Can expand into entities faster because wiki structure is expected.

Weakness:

- If facts are thin or unverified, we can beat it with cleaner sourcing and update discipline.

What we lack:

- Dedicated wiki homepage.
- Item/entity pages.
- Visible taxonomy for weapons, armor, spells, relics, enemies, bosses, locations, mechanics.
- Patch/version field on every data point.

### GameGuides Wiki

Strengths:

- Uses game hub/category structure.
- Covers guide + database intent together.
- Easier for users to scan than isolated blog posts.

Weakness:

- Often generic until filled with real data.

What we lack:

- Category-first browsing.
- Short extractable pages for each entity type.
- "Related entries" graph between builds, gear, enemies, and areas.

### XMODhub

Strengths:

- Aggressively covers long-tail searches: best weapons, relics, bosses, respec, mana, stamina, cheat engine, mods, farming, puzzles.
- Even questionable content can rank if it answers exact long-tail wording before cleaner sites do.

Weakness:

- High risk of unsupported or low-trust claims.

What we lack:

- Long-tail defensive pages that answer high-risk searches honestly.
- Clear pages for "respec", "farming", "upgrade materials", "hidden loot", "puzzle solutions", "performance fixes".

## Required Wiki Architecture

Add these route families:

```text
/wiki
/wiki/weapons
/wiki/weapons/[slug]
/wiki/spells
/wiki/spells/[slug]
/wiki/relics
/wiki/relics/[slug]
/wiki/armor
/wiki/armor/[slug]
/wiki/enemies
/wiki/enemies/[slug]
/wiki/bosses
/wiki/bosses/[slug]
/wiki/locations
/wiki/locations/[slug]
/wiki/mechanics
/wiki/mechanics/[slug]
/wiki/materials
/wiki/materials/[slug]
/wiki/status-effects
/wiki/status-effects/[slug]
```

Each entity page must include:

- One visible `h1`.
- Direct summary answer.
- Data table with source status.
- Location/acquisition field.
- Related builds.
- Related enemies or areas.
- Patch/build version.
- Evidence status: `Official`, `In-game verified`, `Community report`, `Unverified`.
- Sources/citations.
- FAQ if search demand exists.
- JSON-LD: `Article`, `BreadcrumbList`, and `FAQPage` when relevant.

## Priority Build Order

### Phase 1: Fix trust defects

1. Update all post-launch facts and remove stale "pre-launch" language from launch/review pages.
2. Fix `lib/game-data.ts` encoding.
3. Downgrade unproven exact stats from `verified` to `unverified` or remove them.
4. Update storage, review state, price/release status from Steam.

### Phase 2: Add wiki foundation

1. Create `/wiki` homepage.
2. Create data model for wiki entities.
3. Create index pages for weapons, spells, relics, enemies, bosses, locations, mechanics.
4. Add internal links from existing guide pages to wiki categories.

### Phase 3: Add entity pages

Start with pages that connect to current demand:

1. Weapons.
2. Spells.
3. Relics.
4. Builds using each weapon/spell/relic.
5. Enemies and bosses.
6. Locations and hidden loot.
7. Upgrade materials and mechanics.

### Phase 4: Long-tail defense

Add pages only when they answer a real user problem:

- Fatekeeper respec.
- Fatekeeper upgrade materials.
- Fatekeeper best early weapon.
- Fatekeeper farming.
- Fatekeeper puzzle solutions.
- Fatekeeper hidden loot.
- Fatekeeper performance fixes.
- Fatekeeper Steam Deck settings.
- Fatekeeper controller issues.
- Fatekeeper cheat/mod/trainer policy page if search demand is worth capturing.

## Implementation Rule

Do not create one blog post per keyword. That creates thin pages.

Use this mapping:

- Entity lookup -> wiki entry.
- Broad learning -> guide.
- Comparison/buying -> guide with tables.
- Blocking problem -> walkthrough/troubleshooting page.
- Risky unsupported topic -> policy/FAQ page with clear limits.

## Final Assessment

The current site is not missing "more blog posts". It is missing a real wiki layer.

The highest-impact move is:

1. Correct stale post-launch facts.
2. Replace untrusted fake-looking database data with verified or explicitly unverified data.
3. Build `/wiki` as the main content architecture.
4. Convert weapons, spells, relics, enemies, bosses, locations, and mechanics into entity pages.

If this is not done, competitors with worse writing but better wiki structure can still outrank the site for the terms that matter most.
