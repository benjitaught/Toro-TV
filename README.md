# Toro TV

Static rebuild of [toro-tv.com](https://toro-tv.com/), recreated off of GoDaddy so it can be hosted for free on GitHub Pages.

## Structure

- `index.html` — homepage (hero, giveaway, about, demo, referral, contact, subscribe, socials)
- `demo.html` — demo page
- `sign-up.html` — sign-up page (placeholder form — wire up your real checkout/membership provider here)
- `styles.css` — all styling
- `script.js` — giveaway countdown timer
- `assets/` — logo, hero art, and other images pulled from the live site

## Content notes

All copy, links, and images were pulled directly from the live GoDaddy site on 2026-06-15, so this should match closely. A few things still need real wiring once you're off GoDaddy:

- The **Sign-Up** form and **Subscribe** form are placeholders (they just show an alert). Hook these up to whatever you use to take orders/payments (Stripe, a membership platform, Mailchimp, etc.).
- The **Contact** form is also a placeholder — wire it to an email service (e.g. Formspree, EmailJS) or a backend.
- The countdown timer targets **7/31/2026**, matching the live giveaway end date — update if the promo changes.

## Hosting on GitHub Pages

This repo is already configured to deploy via GitHub Pages from the `main` branch root. Once enabled (Settings → Pages → source: `main` / `/`), it will be live at `https://<username>.github.io/Toro-TV/`.

To use your real `toro-tv.com` domain instead of the github.io URL, add a `CNAME` file with `toro-tv.com` in it and update your domain's DNS (once you move it off GoDaddy) to point at GitHub Pages.

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```
