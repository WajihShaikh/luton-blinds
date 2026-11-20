# Luton Blinds V5 | Refined Multi-page Frontend Prototype

This is the **updated static frontend prototype** for design and interaction approval. It is not a WordPress theme or Elementor package, and no real customer submissions, Google review connection or booking calendar is enabled.

## Preview

1. Extract the complete ZIP, preserving folders.
2. Open `index.html` in a modern browser.
3. Navigate using the menu. Each of the 29 pages has a separate `.html` file.
4. View the `previews/` folder for desktop, mobile, mega-menu, collection and FAQ snapshots.

The styles rely on the Manrope and Inter Google Fonts when an internet connection is available. Browser fallback fonts are provided. **No font files are redistributed.**

## What changed in V5

- New final `v5-polish.css` layer repairs spacing and styling consistency, mobile card layouts, collection overlays, image sizing, navigation spacing, responsive text and form controls.
- Replaced the beige homepage collection boxes with large image-led cards and readable contrast overlays.
- Curated a better Blinds and Curtains collection image from the actual client-supplied archives.
- Improved mega menu spacing, icons, menu hover states and focus readability.
- Refined editorial image sections, CTA presentation, product comparison cards, galleries, dark technical sections, process timeline and FAQ disclosure appearance.
- Introduced `v5-polish.js` as a single, progressive visual reveal layer, while suppressing conflicting earlier animation CSS. Existing FAQ expand/collapse, booking tabs, gallery lightbox, menu and carousel actions remain active.
- Added skip-to-content navigation, semantic pressed states on filters/tabs, stronger focus indicators and consistent reduced-motion behaviour.
- Removed the visible developer-style Google review integration placeholder from the homepage. No fake reviews were substituted.
- Optimized a number of unnecessarily oversized WebP assets without changing the approved logo or removing client imagery.

## Design guardrails preserved

- Final client-approved Luton Blinds logo and rosewood/olive/charcoal palette.
- **Manrope** headings and **Inter** body text. No Times New Roman or Plus Jakarta Sans.
- No eyebrow headings.
- Parent section headings and their lead descriptions remain centred.
- Editorial, image-and-text, testimonial, form and longer copy remain left aligned for readability.
- Product-specific pages have distinct image and section treatments.
- Proper SVG icons rather than Unicode symbols for UI controls.

## Scope notes

The package contains 29 `.html` files. The client's contracted base website is **25 pages**; the additional supporting preview pages (Advice, Areas, Privacy, Terms) still need confirmation regarding their implementation within or beyond the agreed commercial scope.

The design is a prototype. Before launch, verify product imagery against product descriptions, warranties, safety claims and supplier specifications. Real booking availability, form emails, cookie/analytics configuration and correctly attributed reviews require integration.

## Main files

- `styles.css` — existing base styles
- `v4-enhancements.css` — existing V4 component styles and FAQ animation presentation
- `v5-polish.css` — V5 final layout, mobile, typography and component refinements
- `interactions.js`, `v4-interactions.js`, `v5-polish.js` — frontend behaviours
- `assets/client/` — 422 distinct client-supplied optimized WebP photos
- `assets/` — approved brand logo variants
- `client-image-manifest.json` — photo source and use mapping
- `V5_QA_REPORT.md` — validation scope and remaining checks
