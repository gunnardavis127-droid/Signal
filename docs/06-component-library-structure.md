# Signal — Component / Template Library Structure

## Philosophy
**Separate structure from skin.** Every component is a layout skeleton with semantic HTML, CSS custom properties for branding, and a consistent motion vocabulary. The structure is reused across every client; only the skin (colors, fonts, imagery, copy) changes per project.

This is not "using templates" — it's having a proven, battle-tested foundation that lets you deliver premium quality at speed. Every component in this library has been QA'd against the high-end rubric.

---

## Library Organization

```
/component-library/
├── INDEX.md                   # Master index: every component, its tags, and where it's used
├── _base/                     # Shared foundation (included in every project)
│   ├── reset.css              # CSS reset / normalize
│   ├── custom-properties.css  # :root variables — all colors, fonts, spacing, motion tokens
│   ├── typography.css         # Type scale: h1 → h6, body, caption (2-3 size/weight levels)
│   ├── motion.css             # Standard motion vocabulary (reveal, fade, parallax classes)
│   └── utilities.css          # Spacing helpers, responsive visibility, grid utilities
├── navigation/
│   ├── nav-standard/          # Horizontal nav: logo left, links right, CTA button
│   ├── nav-centered/          # Logo center, links split left/right
│   ├── nav-minimal/           # Hamburger menu, full-screen overlay on mobile
│   └── nav-transparent/       # Transparent bg → solid on scroll
├── hero/
│   ├── hero-fullbleed/        # Full-viewport media, headline center, single CTA
│   ├── hero-split/            # Media one side, headline+CTA on other (50/50)
│   ├── hero-text-only/        # No media — big type statement, minimal
│   └── hero-video-bg/         # Video background with overlay + headline
├── sections/
│   ├── split-layout/          # Generic split: label→headline→copy→CTA | large visual
│   │   ├── split-50-50/       # Even split
│   │   ├── split-25-75/       # Narrow text, wide visual
│   │   └── split-75-25/       # Wide text, narrow visual
│   ├── card-grid/
│   │   ├── grid-3col/         # 3-column card grid (products, services, testimonials)
│   │   ├── grid-4col/         # 4-column (team, features, smaller items)
│   │   └── grid-masonry/      # Masonry layout (portfolio, case studies)
│   ├── list-column/           # Vertical list: icon+title+description per item (services, features)
│   ├── stats-row/             # Horizontal stat bar: number+label (results, credibility)
│   ├── logo-strip/            # Client/partner logo row (auto-scrolling or static)
│   ├── testimonial/           # Quote block: large quote, attribution, optional photo
│   ├── testimonial-carousel/  # Multiple testimonials in a swipeable carousel
│   ├── process-steps/         # Numbered step sequence: 1 → 2 → 3 → 4
│   └── faq-accordion/         # Expandable FAQ items with smooth open/close
├── cta/
│   ├── cta-standard/          # Full-width band: headline + button, mirrors hero tone
│   ├── cta-split/             # Two-option CTA: primary + secondary side by side
│   └── cta-minimal/           # Subtle inline CTA, no background band
├── footer/
│   ├── footer-standard/       # 4-column: logo+desc, links, contact, social
│   ├── footer-minimal/        # Single row: copyright + links
│   └── footer-expanded/       # Large footer with newsletter signup, sitemap, etc.
├── components/
│   ├── button/                # Primary, secondary, outline, arrow-link variants
│   ├── form/                  # Contact form, newsletter signup (validated, accessible)
│   ├── modal/                 # Lightbox / cookie notice / exit intent
│   ├── preloader/             # Page load animation
│   ├── cookie-banner/         # GDPR cookie consent
│   └── 404/                   # Custom 404 page
└── projects/                  # Per-client overrides (skin only, never structure)
    └── [client-name]/
        ├── custom-properties.css   # Client's colors, fonts, spacing overrides
        └── assets/                 # Client-specific images, logos, icons
```

---

## Each Component File Must Contain:

1. **Semantic HTML** — accessible, screen-reader-friendly, no div-soup
2. **CSS custom properties** for every brand-able value (colors, fonts, spacing, border-radius, transition speed)
3. **Standard motion vocabulary** — staggered reveal on enter, hover responses, `prefers-reduced-motion` fallback
4. **Responsive rules** — mobile-first, breakpoints at 768px and 1024px
5. **Usage notes** — a comment block at the top: what this component is, when to use it, what CSS variables it expects

### Example: Component Header Comment

```css
/*
 * COMPONENT: hero-fullbleed
 * USE: Full-viewport hero with background image/video, centered headline, single CTA.
 * BEST FOR: Homepage hero, landing pages, campaign pages.
 * EXPECTED CSS VARS:
 *   --hero-min-height (default: 100vh)
 *   --hero-overlay-color (default: rgba(0,0,0,0.3))
 *   --hero-headline-size (default: clamp(2.5rem, 5vw, 5rem))
 *   --hero-cta-bg, --hero-cta-color, --hero-cta-radius
 * MOTION: headline fades in at 0ms, subheading at 150ms, CTA at 300ms.
 * USED IN: [list client projects]
 */
```

---

## How to Use the Library (Per-Project Workflow)

1. **Plan the page flow** (hook → introduce → offer → explain → invite) before touching any components.
2. **Pull the sections you need** from the library — copy the HTML/CSS/JS files into the project.
3. **Apply the skin** by overriding `custom-properties.css` with client brand values. Never edit the core component CSS directly — override only.
4. **Customize copy and imagery** per client.
5. **If a section needs a structural change** that's genuinely novel: build it, then extract the new variant back into the library so it's available for the next project.

---

## Library Maintenance Cadence

- **After every project:** extract any novel sections or variants created and add them to the library. Update the component header comments with the new client reference.
- **Monthly:** review the INDEX.md — remove components that haven't been reused, identify gaps where you needed something you didn't have.
- **Quarterly:** refresh the motion vocabulary if GSAP patterns have improved. Update the base CSS reset if browser standards have shifted.
