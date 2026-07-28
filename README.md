# Signal

Premium web agency — we sell outcomes, not websites. Helping businesses with high customer lifetime value turn their website into a measurable revenue engine.

## Repo structure

```
signal/
├── component-library/     # Reusable modules (structure separate from skin)
│   ├── _base/             # CSS foundation: reset, tokens, type scale, motion, utilities
│   ├── hero/              # Hero section variants
│   ├── sections/          # Split layouts, card grids, list columns
│   ├── cta/               # Call-to-action bands
│   ├── footer/            # Footer variants
│   ├── navigation/        # Nav variants (coming)
│   └── components/        # Buttons, forms, modals (coming)
├── docs/                  # Operating playbooks
└── clients/               # Per-client project folders (coming)
```

## Getting started

1. Open `component-library/_base/` — import these 5 CSS files into any project
2. Override `custom-properties.css` with your client's brand values (colors, fonts, spacing)
3. Pull the sections you need from the library
4. Build the page by stacking modules — never start from a blank canvas

## Tech

HTML, CSS (custom properties, grid, flexbox), JavaScript, GSAP + ScrollTrigger for motion. Mobile-first. Accessible.
