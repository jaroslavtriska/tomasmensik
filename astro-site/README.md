# Tomáš Menšík - Reality Website

Modern real estate website built with Astro and Sanity CMS.

## Tech Stack

- **Frontend**: [Astro](https://astro.build/) 4.x with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **CMS**: [Sanity](https://sanity.io/)
- **Forms**: [Formspree](https://formspree.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Sanity Configuration
# Get these values from https://sanity.io/manage
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production

# Formspree Configuration (for contact form)
# Get your form ID from https://formspree.io/
PUBLIC_FORMSPREE_ID=your-form-id
```

## Project Structure

```
astro-site/
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── lib/            # Sanity client and utilities
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── public/             # Static assets
└── astro.config.mjs    # Astro configuration
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Úvod | `/` | Homepage with hero, services preview, featured properties |
| O mně | `/o-mne` | About page with bio and photos |
| Služby | `/sluzby` | Services offered |
| Nemovitosti | `/nemovitosti` | Property listings (for sale) |
| Detail | `/nemovitosti/[slug]` | Individual property page |
| Zrealizováno | `/zrealizovano` | Sold properties archive |
| Reference | `/reference` | Client testimonials |
| Kontakt | `/kontakt` | Contact form |

## Sanity CMS Setup

1. Create a new Sanity project at [sanity.io/manage](https://sanity.io/manage)
2. Copy the project ID from your Sanity dashboard
3. Navigate to the `sanity-studio` folder
4. Update `sanity.config.ts` and `sanity.cli.ts` with your project ID
5. Install dependencies and start the studio:

```bash
cd ../sanity-studio
npm install
npm run dev
```

The Sanity Studio will be available at `http://localhost:3333`

## Deployment

### Vercel (Recommended)

The repo has a root `vercel.json` so Vercel builds the Astro app from the `astro-site` folder.

1. **Push your code to GitHub** (if not already).

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com) → Add New → Project
   - Import your Git repository
   - Leave **Root Directory** as the repo root (the root `vercel.json` handles the monorepo)

3. **Environment variables** (optional if you use the defaults in code)
   - **Settings → Environment Variables** in the Vercel project:
   - `PUBLIC_SANITY_PROJECT_ID` = your Sanity project ID (e.g. `bo49wn0o`)
   - `PUBLIC_SANITY_DATASET` = `production` (or your dataset name)

4. **Sanity CORS**
   - In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS origins**
   - Add your Vercel URL, e.g. `https://your-project.vercel.app` and `https://your-domain.com`

5. **Deploy** – Vercel will run the build and deploy. Your site will be live at `https://your-project.vercel.app`. You can add a custom domain in Vercel (e.g. `mensik-reality.cz`).

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Add environment variables
6. Deploy!

### Build for Production

```bash
npm run build
npm run preview  # Preview the built site locally
```

## Contact Form Setup

1. Create an account at [Formspree](https://formspree.io/)
2. Create a new form
3. Copy the form ID
4. Update the form action URL in `/src/pages/kontakt.astro`

## Customization

### Colors

Edit the color palette in `/src/styles/global.css`:

```css
@theme {
  --color-sand-*: ...;    /* Background/neutral colors */
  --color-accent-*: ...;  /* Primary accent color */
}
```

### Typography

The site uses two fonts:
- **Cormorant Garamond** - For headings
- **Outfit** - For body text

Change fonts in `global.css` by updating the Google Fonts import and `@theme` variables.

## License

Private project. All rights reserved.
