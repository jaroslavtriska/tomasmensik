# Menšík Reality - Sanity CMS

Content management system for the Tomáš Menšík real estate website.

## Setup

### 1. Create Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create a new project
3. Note your **Project ID** and **Dataset** name

### 2. Configure

Update the project ID in two files:

**sanity.config.ts:**
```ts
projectId: 'YOUR_PROJECT_ID',
dataset: 'production',
```

**sanity.cli.ts:**
```ts
projectId: 'YOUR_PROJECT_ID',
dataset: 'production',
```

### 3. Install & Run

```bash
npm install
npm run dev
```

The studio will be available at `http://localhost:3333`

## Content Types

### Nemovitost (Property)
- Title, slug, status (for sale/sold/reserved)
- Type, property type, location, address
- Price, area, disposition
- Photos (main + gallery)
- Description, parameters
- Featured flag, order

### Služba (Service)
- Title, description, icon
- Features list
- Order

### Reference (Testimonial)
- Client name, location
- Text, service type, date
- Featured flag, order

### O mně (About)
- Name, subtitle, bio
- Main photo + additional photos
- Interests, stats

### Nastavení webu (Site Settings)
- Site name, description
- Contact info (phone, email, address)
- Social links
- Hero section content
- Opening hours

## Deployment

### Deploy to Sanity.io

```bash
npm run deploy
```

This will deploy the studio to `YOUR_PROJECT.sanity.studio`

## CORS Settings

Add your website domains to CORS origins in [sanity.io/manage](https://sanity.io/manage):

- `http://localhost:4321` (development)
- `https://your-domain.com` (production)
- `https://your-domain.vercel.app` (Vercel preview)
