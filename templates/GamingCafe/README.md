# NEXUS — Gaming Lounge &amp; Esports Café Website

A modern, dark, neon-lit, fully static gaming-café website built with **HTML + Tailwind CSS (CDN)**. No build step required.

## Pages

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
├── index.html
├── pricing.html
├── events.html
├── about.html
├── privacy.html
├── terms.html
├── css/
│   └── style.css      # custom styles (neon glow, grid backdrop, reveal animations, gradients)
└── js/
    └── main.js        # mobile menu, scroll nav, reveal animations, event filters, demo forms, year
```

## Running it

It's static — just open `index.html` in a browser. For best results (so relative paths and animations behave), serve it locally:

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit http://localhost:8000

## Customizing

- **Brand color & accent** live in the `tailwind.config` block at the top of each HTML file (`brand` = neon purple, `cyber` = cyan) and in `css/style.css`. Change them in one place per file.
- **Fonts:** Orbitron (display/headings) + Inter (body) via Google Fonts.
- **Icons:** [Remix Icon](https://remixicon.com/).
- The **event filter** is driven by `data-filter` buttons and `data-category` cards in `events.html` — add cards with a matching category to extend it.

## Notes / next steps

- **Images** load from Unsplash via URL. Swap them for your own under an `images/` folder for production.
- The **booking, contact & newsletter forms** are front-end only (demo). Wire them to a backend or a service like Formspree / Netlify Forms to actually receive submissions.
- Tailwind uses the **Play CDN** (great for prototyping). For production, install Tailwind via the CLI/PostCSS to get a smaller, purged stylesheet.
- See `CREDITS.md` for licenses and a pre-launch checklist.
