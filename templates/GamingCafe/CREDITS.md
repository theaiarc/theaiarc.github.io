# Credits, Licenses & Compliance Notes

This project uses only third-party resources that are free for commercial use.
This file documents each one and flags items to address before publishing a
real, live business website.

## Third-party libraries & assets

| Asset | Source | License | Commercial use | Attribution required |
|-------|--------|---------|----------------|----------------------|
| Tailwind CSS | https://tailwindcss.com | MIT | Yes | No |
| Remix Icon | https://remixicon.com | Apache License 2.0 | Yes | No (appreciated) |
| Google Fonts (Orbitron, Inter) | https://fonts.google.com | SIL Open Font License 1.1 | Yes | No |
| Photos | https://unsplash.com | Unsplash License | Yes | No (appreciated) |

### Unsplash License summary
Free to use for commercial and non-commercial purposes, no permission or
attribution needed. You may NOT: (1) sell unaltered copies of a photo, or
(2) build a competing/replacement photo service using Unsplash photos.
Unsplash does not guarantee model or property releases — do not imply that any
person, brand, or product shown endorses your business.

## ⚠️ Action items before going live with a real business

1. **Replace placeholder content.** Testimonials, statistics ("8K+ community
   members", "300+ tournaments", "Est. 2019", "$1,000 prize pool", ratings) are
   placeholder content. Fabricated reviews/stats can violate advertising and
   consumer-protection rules (e.g. India's ASCI guidelines & Consumer
   Protection Act 2019; FTC in the US; ASA in the UK). Only publish what is real.

2. **Make hardware & pricing claims true.** Spec claims (RTX 4080, i9, 240Hz,
   1Gbps), rates, café prices, and "Open 24/7" must match your actual venue.

3. **Self-host images for production.** Download the Unsplash photos and serve
   them from your own `images/` folder instead of hot-linking
   `images.unsplash.com` (more reliable and the recommended approach).

4. **Compile Tailwind for production.** The Tailwind Play CDN
   (`cdn.tailwindcss.com`) is for prototyping only and warns against production
   use. Install via the Tailwind CLI/PostCSS for a smaller, purged stylesheet.

5. **Check brand & game names.** "NEXUS" is a placeholder brand — run a
   trademark search before using it commercially. Game titles (Valorant, CS2,
   Tekken, FC 25, etc.) are trademarks of their respective publishers; only
   reference games you actually host and follow their community-event guidelines.

6. **Add the usual legal pages.** A live site collecting booking/contact data
   needs a real Privacy Policy and Terms of Service (the included `privacy.html`
   and `terms.html` are placeholders), and (depending on region) a
   cookie/consent notice.

7. **Wire up the forms.** The booking, contact, and newsletter forms are
   front-end demos only — connect them to a backend or form service to receive
   submissions.
