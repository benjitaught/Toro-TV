# Toro TV

Static rebuild of [toro-tv.com](https://toro-tv.com/), recreated off of GoDaddy so it can be hosted for free on GitHub Pages.

## Structure

- `index.html` — homepage (hero, giveaway, about, demo, referral, contact, subscribe, socials)
- `demo.html` — demo page (Vimeo walkthrough + device install instructions)
- `sign-up.html` — pricing plans, wired to the real Square Checkout links pulled from the live site
- `privacy-policy.html` / `terms-and-conditions.html` — placeholder legal pages (the live site's are placeholders too)
- `styles.css` — all styling
- `script.js` — giveaway countdown timer
- `assets/` — logo, hero art, and other images pulled from the live site

## Content notes

All copy, links, images, and payment links were pulled directly from the live GoDaddy site on 2026-06-15, so this should match closely.

- The **pricing buttons** on `sign-up.html` link to the actual Square Checkout pages already in use (Toro Solo $24.99/mo & $179/yr, Toro Family $69.99/mo & $299/yr). No changes needed unless you want to switch payment processors.
- The **Subscribe** form (email list signup) and **Contact** form are placeholders (they just show an alert) since those were backed by GoDaddy's own widgets. Wire them up to a mailing list tool (Mailchimp, etc.) and a form backend (Formspree, EmailJS) respectively.
- The countdown timer targets **7/31/2026**, matching the live giveaway end date — update if the promo changes.
- All internal links are relative (`index.html`, `demo.html`, etc.) rather than absolute (`/`, `/demo.html`) so navigation works correctly whether the site is hosted at a domain root or under a GitHub Pages subpath like `/Toro-TV/`.

## Hosting on GitHub Pages

This repo is already configured to deploy via GitHub Pages from the `main` branch root. Once enabled (Settings → Pages → source: `main` / `/`), it will be live at `https://<username>.github.io/Toro-TV/`.

To use your real `toro-tv.com` domain instead of the github.io URL, add a `CNAME` file with `toro-tv.com` in it and update your domain's DNS (once you move it off GoDaddy) to point at GitHub Pages.

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
```
