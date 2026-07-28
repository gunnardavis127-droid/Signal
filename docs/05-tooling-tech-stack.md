# Signal — Tooling & Tech Stack Setup Checklist

## 1. Development Environment

### Cursor (Primary IDE)
- [ ] Install [Cursor](https://cursor.sh) — this is your main workspace for every build
- [ ] Connect to Claude models (via Cursor's AI settings):
  - **Claude Sonnet** — default for day-to-day edits, refinements, debugging, hover states, spacing fixes, micro-interactions. Fast, cheap, reliable.
  - **Claude Opus** — switch to this for heavy lifting: complex GSAP animation sequences, Three.js/WebGL integration, structural rethinks of a section, full-page architecture decisions. Use when Sonnet's output feels templated or shallow.
  - **Composer** (Cursor's built-in multi-file agent) — only for trivial swaps: replacing text content, swapping images, updating copy across multiple files. Never for design or structural work.

### Model Selection Decision Tree
```
Is the task...
├─ Trivial text/image swap across files? → Composer
├─ Single-section edit/refinement (spacing, hover, responsive fix)? → Claude Sonnet
├─ Complex animation sequence, 3D integration, or structural redesign? → Claude Opus
└─ Whole new section from scratch? → Claude Opus for structure, Sonnet for polish
```

### Local Dev Stack
- [ ] Node.js (LTS) + npm or Bun
- [ ] Git — version control for every project and the component library
- [ ] VS Code (as fallback/companion to Cursor)
- [ ] Browser DevTools (Chrome or Firefox — you'll inspect constantly)

---

## 2. Animation & Motion

### GSAP (GreenSock Animation Platform)
- [ ] Install: `npm install gsap` (or use CDN for single-file builds)
- [ ] GSAP ScrollTrigger plugin: `npm install gsap/ScrollTrigger` — essential for scroll-driven narrative sequences
- [ ] Standard motion vocabulary to implement once and reuse everywhere:
  - **Staggered reveal:** elements fade in sequentially (headline → subheading → image → CTA), each with 100–150ms delay
  - **Parallax depth:** subtle y-axis movement on scroll (background elements move slower than foreground)
  - **Section entrance:** sections animate in as they enter the viewport (opacity 0→1, y: 30px→0)
  - **Hover responses:** scale(1.02) on cards, underline animation on links, color shift on buttons
- [ ] All animations use `prefers-reduced-motion` media query fallback

### Three.js (3D / WebGL)
- [ ] Install: `npm install three` (only add to projects that need 3D — it's heavy, don't bundle it unnecessarily)
- [ ] Use cases: 3D product visualizations, interactive backgrounds, fragment/dispersion effects, scroll-driven 3D scenes
- [ ] Always load models asynchronously and provide a static fallback

---

## 3. 3D Asset Pipeline (Blender + MCP)

### Blender
- [ ] Install [Blender](https://www.blender.org/) (4.0+)
- [ ] Install the Blender MCP server — this lets Cursor/Claude control Blender via natural language
  - The MCP server accepts prompts like: "create a low-poly 3D abstract geometric shape, fragmented into 12 pieces, with a metallic material"
  - No manual 3D modeling skill required — you describe what you want, the AI generates it
- [ ] Output formats for web: GLTF/GLB (standard for Three.js), compressed textures

### MCP Server Setup
- [ ] Configure Blender MCP in Cursor's MCP settings
- [ ] Test: send a simple prompt ("create a sphere with a glass material") and verify the model appears in Blender
- [ ] Export workflow: generate in Blender → export as .glb → load in Three.js → animate with GSAP

---

## 4. Reference & Inspiration

### Curation Tools
- [ ] [SiteInspire](https://www.siteinspire.com) — curated gallery of high-end sites
- [ ] [Godly](https://godly.website) — another curated gallery, strong filters
- [ ] [Awwwards](https://www.awwwards.com) — use sparingly; many winners are over-animated. Filter for "could I sell this structure for $5K–$20K?"

### Reference Workflow
- [ ] For each reference you save: open the site in browser → "Save As" → "Web Page, Complete" → store in `/references/[category]/[site-name]/`
- [ ] Tag each reference: hero-style, layout-type, motion-style, color-palette, industry
- [ ] Extract only the HTML/CSS structure you'll reference — never copy content, branding, or imagery
- [ ] Maintain a simple index file (`/references/INDEX.md`) mapping reference → patterns worth reusing

---

## 5. Hosting & Deployment

### Per-Project Setup
- [ ] Domain: client-owned, you get DNS access (never own the client's domain)
- [ ] Hosting: Vercel (static/Next.js), Netlify, or traditional hosting depending on CMS needs
- [ ] SSL: automatic via hosting platform
- [ ] DNS: configure CNAME/A records per hosting provider's instructions
- [ ] Post-launch: register site in Google Search Console, submit sitemap

---

## 6. Analytics & Tracking

### Every Project (Baseline)
- [ ] Google Analytics 4 (GA4) — installed before go-live
- [ ] Google Search Console — registered and sitemap submitted
- [ ] Form submission tracking — confirm form data reaches the client's email/CRM
- [ ] Conversion event tracking — tag every CTA and form submission

---

## 7. QA Checklist (Run Before Every Delivery)

- [ ] Mobile responsive: test at 320px, 375px, 768px, 1024px, 1440px
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge — one pass each
- [ ] Performance: Lighthouse score ≥ 90 (desktop), images optimized, lazy loading on below-fold media
- [ ] Accessibility: alt text on all images, sufficient color contrast, keyboard-navigable, semantic HTML
- [ ] No broken links, no 404s, all forms submit successfully
- [ ] Favicon loads, social share meta tags (OG) present, page titles unique per page
- [ ] Animations respect `prefers-reduced-motion`
- [ ] CMS: client can log in and edit content without breaking layout
