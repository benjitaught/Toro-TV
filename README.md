# Toro TV

Static rebuild of [toro-tv.com](https://toro-tv.com/), recreated off of GoDaddy so it can be hosted for free on GitHub Pages.

## Structure

- `site/index.html` — homepage (hero, giveaway, about, demo, referral, contact, subscribe, socials)
- `site/demo.html` — demo page
- `site/sign-up.html` — sign-up page (placeholder form — wire up your real checkout/membership provider here)
- `site/styles.css` — all styling
- `site/script.js` — giveaway countdown timer
- `site/assets/` — logo, hero art, and other images pulled from the live site

## Content notes

All copy, links, and images were pulled directly from the live GoDaddy site on 2026-06-15, so this should match closely. A few things still need real wiring once you're off GoDaddy:

- The **Sign-Up** form and **Subscribe** form are placeholders (they just show an alert). Hook these up to whatever you use to take orders/payments (Stripe, a membership platform, Mailchimp, etc.).
- The **Contact** form is also a placeholder — wire it to an email service (e.g. Formspree, EmailJS) or a backend.
- The countdown timer targets **7/31/2026**, matching the live giveaway end date — update if the promo changes.

## Hosting on GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In **Settings → Pages**, set the source to the `main` branch, `/site` folder (or move `site/*` to the repo root if you'd rather serve from `/`).
3. Point your domain's DNS (once you move it off GoDaddy or just update the DNS records) at GitHub Pages.

## Local preview

Just open `site/index.html` in a browser, or run a tiny local server:

```bash
cd site && python3 -m http.server 8000
```
