# NEXUS — Gaming Lounge &amp; Esports Café Website

A modern, dark, neon-lit, fully static gaming-café website built with **HTML + Tailwind CSS (CDN)**. No build step required. Ships in **four color themes**.

## Themes

| Folder | Theme | Palette |
|--------|-------|---------|
| `template-neon/` | Neon | Purple + cyan — the classic esports glow |
| `template-toxic/` | Toxic | Acid lime + teal — loud and competitive |
| `template-inferno/` | Inferno | Orange + magenta — hot, aggressive FPS energy |
| `template-arctic/` | Arctic | Icy sky-blue + frost — clean and cool |

`index.html` (at the root) is a **theme chooser** that links to each live demo. All three themes share identical content and layout — only the color palette differs.

## Pages (in every theme)

| File | Page |
|------|------|
| `index.html` | Home / Landing — hero, stats, gaming zones, pricing teaser, why-us, CTA |
| `pricing.html` | Pricing — hourly / day pass / membership tiers, café menu, booking form |
| `events.html` | Tournaments &amp; Events — featured event + filterable grid (FPS / Fighting / Sports / Casual) |
| `about.html` | About + Contact — story, gear specs, testimonials, contact form |
| `privacy.html` | Privacy Policy (placeholder) |
| `terms.html` | House Rules &amp; Terms (placeholder) |

## Structure

```
.
├── index.html              # theme chooser (links to the three demos)
├── README.md
├── CREDITS.md
├── robots.txt
├── template-neon/          # ┐
│   ├── index.html          # │
│   ├── pricing.html        # │
│   ├── events.html         # ├─ a full standalone site
│   ├── about.html          # │
│   ├── privacy.html        # │
│   ├── terms.html          # │
│   ├── css/style.css       # │  custom styles + theme palette (:root)
│   └── js/main.js          # ┘  shared interactivity
├── template-toxic/         # same site, lime/teal palette
├── template-inferno/       # same site, orange/magenta palette
└── template-arctic/        # same site, sky-blue/frost palette
```

## Running it

It's static — open the root `index.html` and pick a theme, or open any `template-*/index.html` directly. For best results (so relative paths and animations behave), serve it locally:

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit http://localhost:8000

## How theming works

All color identity lives in **CSS variables** in each theme's `css/style.css`:

```css
:root {
  --brand: 168 85 247;       /* primary neon (space-separated RGB) */
  --brand-dark: 124 58 237;
  --brand-light: 192 132 252;
  --cyber: 34 211 238;       /* accent */
  --ink: 10 10 18;           /* background */
  --surface: 17 9 31;        /* section gradient base */
}
```

The Tailwind config in each HTML file maps `brand` / `cyber` / `ink` to these vars via
`rgb(var(--token) / <alpha-value>)`, so all `text-brand`, `bg-cyber/20`, etc. utilities
follow the palette. **To make a new theme, copy a `template-*` folder and change only the
six values in `:root`.** The markup and JS are identical across all three.

## Customizing

- **Fonts:** Orbitron (display/headings) + Inter (body) via Google Fonts.
- **Icons:** [Remix Icon](https://remixicon.com/).
- The **event filter** is driven by `data-filter` buttons and `data-category` cards in `events.html` — add cards with a matching category to extend it.

## Notes / next steps

- **Images** load from Unsplash via URL. Swap them for your own under an `images/` folder for production.
- The **booking, contact & newsletter forms** are front-end only (demo). Wire them to a backend or a service like Formspree / Netlify Forms to actually receive submissions.
- Tailwind uses the **Play CDN** (great for prototyping). For production, install Tailwind via the CLI/PostCSS to get a smaller, purged stylesheet.
- See `CREDITS.md` for licenses and a pre-launch checklist.
