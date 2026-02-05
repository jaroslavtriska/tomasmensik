# Menšík Reality – Sanity CMS

Content management for the Tomáš Menšík real estate site. You can edit **everything** from the CMS: hero image and text, section titles, contact info, navigation, footer, offers (properties), services, references, and about page.

## Quick start

```bash
cd sanity-studio
npm install
npm run dev
```

Studio runs at **http://localhost:3333**. Log in with Google/GitHub or create a Sanity account.

### First-time content (seed)

To fill the project with sample content (site settings, services, properties, testimonials):

1. In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → create a token with **Editor** rights.
2. In `sanity-studio` run:
   ```bash
   SANITY_TOKEN=your_token npm run seed
   ```
3. In Studio, open **Nastavení webu** and add a hero image (optional); publish.

## What you can edit in the CMS

### Nastavení webu (first item in sidebar)

Single “settings” document. All groups:

- **Obecné** – site name (logo + page title), SEO description
- **Úvodní sekce (Hero)** – hero image, tagline, title, subtitle, CTA button labels
- **Sekce na úvodní stránce** – services block (title, description, button), properties block (title, description, link), CTA block (title, description, button)
- **Kontakt** – phone, email, address, Instagram/Facebook, opening hours
- **Patička** – brand name, tagline, copyright text, quick links
- **Navigace** – menu items (label + URL). Leave empty to use default menu.

### Nemovitosti (Property)

Add/edit/remove offers. Each has title, slug, status (for sale / sold / reserved), type, location, price, main image, gallery, description, parameters, “featured on homepage” and order.

### Služby (Service)

Services listed on the site. Title, description, icon, feature list, order.

### Reference (Testimonial)

Client testimonials. Name, location, text, service type, date, “featured on homepage”, order.

### O mně (About)

Single about document: name, subtitle, bio, main photo, extra photos, interests, stats.

## Configure project ID (optional)

If you use a different Sanity project:

1. **sanity-studio**: set `projectId` and `dataset` in `sanity.config.ts` and `sanity.cli.ts`.
2. **astro-site**: set `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` in `.env` (see `astro-site/.env.example`).

## Deploy Studio

```bash
npm run deploy
```

Studio will be at `YOUR_PROJECT.sanity.studio`.

## CORS

In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS origins**, add:

- `http://localhost:4321` (Astro dev)
- Your production domain (e.g. `https://mensik-reality.cz`)
