# Rarible - Fatekeeper Guide Style Reference
> Dark Terminal, Electric Green

**Theme:** dark

Fatekeeper Guide uses a dark command-center aesthetic: compact, precise, media-led, and useful during play. The site should feel like a premium guide terminal for an Early Access first-person RPG, not a bright resource library, SaaS landing page, fandom wiki, magazine spread, or generic SEO blog.

## Tokens - Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Rich Black | `#0a0a0a` | `--color-rich-black` | Page background and card surfaces. |
| Graphite | `#27272a` | `--color-graphite` | Hairline borders, dividers, inactive input outlines. |
| Ash Gray | `#3b3b3b` | `--color-ash-gray` | Secondary borders and inactive controls. |
| Silver Text | `#9d9d9d` | `--color-silver-text` | Muted secondary text and placeholders. |
| Off White | `#cecece` | `--color-off-white` | Readable supporting copy. |
| White | `#ffffff` | `--color-white` | Primary text, active labels, critical UI. |
| True Black | `#000000` | `--color-true-black` | Text on green buttons and active markers. |
| Dark Granite | `#18181b` | `--color-dark-granite` | Elevated dark panels and table headers. |
| Cadmium Green | `#faff00` | `--color-cadmium-green` | Primary actions, active states, selected filters, key markers. |

## Tokens - Typography

### Tomorrow
- Use for headings, navigation, buttons, and primary UI text.
- Weights: 400, 500.
- Sizes: 14px, 18px, 24px, 28px.
- Letter spacing: normal.

### Geist Mono
- Use for labels, dates, status chips, tables, specs, and structured data.
- Weights: 400, 500.
- Sizes: 10px, 12px, 14px, 18px, 24px.
- Letter spacing: normal.

## Tokens - Layout

- Base unit: 8px.
- Section gap: 32px.
- Card padding: 16px.
- Element gap: 8px.
- Cards: 12px radius, 1px Graphite border.
- Inputs: 6px radius, 1px Graphite border.
- Buttons and filter tags: 9999px radius.
- Elevation: avoid strong shadows; use borders, slight surface changes, and compact spacing.

## Components

### Header
- Sticky, Rich Black background, Graphite bottom border.
- Navigation is text-only. No decorative icons.
- Mobile menu uses text buttons, 9999px radius, Graphite borders.

### Hero
- Video-first or official media-first.
- The first viewport must show Fatekeeper footage or official gameplay art as the hero background.
- Text sits over the media with a dark overlay for readability.
- Use Cadmium Green only for primary actions and selected/active markers.
- Do not use a split hero with text on one side and media on the other.

### Guide Cards
- Rich Black surface, Graphite border, 12px radius.
- Official screenshot thumbnail at the top when space allows.
- Status and category are compact mono labels.
- Avoid AI-looking icons, sparkle marks, wands, floating blobs, gradients, or decorative illustrations.

### Search
- Dark Granite or transparent surface.
- Graphite border, 6px radius, White text, Silver Text placeholder.
- Results are compact rows/cards with category, status, title, and one useful line.

### Articles
- Structure can borrow from Claude/Anthropic blog pages: metadata, title, deck, large media, then readable single-column content.
- Styling must stay Rarible: dark surfaces, Graphite borders, compact labels, mono data, Cadmium Green actions.
- Each guide should include quick answer, status, useful tables, official media, sources, and related guides.

### Tables
- Rich Black background.
- Dark Granite header.
- Graphite row dividers.
- Geist Mono for data.

## Do

- Make official Fatekeeper media the primary visual content.
- Keep pages practical for players: release, Early Access, PC checks, beginner decisions, combat, builds, weapons, spells, relics, enemies, bosses, and world help.
- Mark unverified gameplay claims clearly.
- Use compact, high-contrast typography.
- Use Cadmium Green sparingly for actions, status emphasis, and active filters.

## Don't

- Do not use white sections, previous light-resource-library colors, or bright catalog styling.
- Do not use cute or AI-looking icons.
- Do not use dark fantasy ornament as the UI theme; the UI is a terminal, the media carries the game atmosphere.
- Do not use glassmorphism, purple gradients, bokeh, or generic decorative cards.
- Do not invent stats, locations, drops, boss routes, tier lists, or final build rankings before verification.
