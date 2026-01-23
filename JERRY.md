# Tomáš Menšík - Reality Website

Jednoduchý návod pro pokračování ve vývoji webu.

## Struktura projektu

```
jerry-demos/
├── astro-site/       # Frontend webové stránky (Astro + Tailwind)
├── sanity-studio/    # CMS pro správu obsahu (Sanity)
└── JERRY.md          # Tento soubor
```

---

## Rychlý start

### 1. Instalace závislostí

```bash
# Frontend
cd astro-site
npm install

# CMS
cd ../sanity-studio
npm install
```

### 2. Spuštění

Potřebuješ 2 terminály:

**Terminál 1 - Web:**
```bash
cd astro-site
npm run dev
```
→ Web běží na http://localhost:4321

**Terminál 2 - CMS:**
```bash
cd sanity-studio
npm run dev
```
→ CMS běží na http://localhost:3333

---

## Sanity CMS

### Přihlášení do Sanity

CMS je již nastavené s projektem `bo49wn0o`. Pro přihlášení:

1. Otevři http://localhost:3333
2. Přihlaš se svým Sanity účtem (nebo vytvoř nový na sanity.io)
3. Požádej vlastníka projektu, aby tě přidal jako člena na https://sanity.io/manage

### Přidání nového obsahu

V Sanity Studiu můžeš spravovat:

| Sekce | Co obsahuje |
|-------|-------------|
| **Nemovitost** | Nemovitosti k prodeji/prodané |
| **Služba** | Nabízené služby |
| **Reference** | Recenze od klientů |
| **O mně** | Bio a fotky |
| **Nastavení webu** | Kontaktní údaje, telefon, email |

### Seed (naplnění testovacími daty)

Pokud chceš naplnit CMS testovacími daty:

1. Získej API token:
   - Jdi na https://sanity.io/manage/project/bo49wn0o/api
   - Klikni "Add API token"
   - Pojmenuj ho (např. "Seed")
   - Vyber **Editor** permissions
   - Zkopíruj token

2. Spusť seed:
```bash
cd sanity-studio
SANITY_TOKEN=tvuj-token-zde npm run seed
```

---

## Vývoj

### Úprava stylů

Styly jsou v `astro-site/src/styles/global.css`. Používáme Tailwind CSS 4 s vlastními barvami:

- `sand-*` - neutrální písková barva (pozadí, texty)
- `accent-*` - zelená akcentová barva

### Úprava stránek

Stránky jsou v `astro-site/src/pages/`:

| Soubor | URL | Popis |
|--------|-----|-------|
| `index.astro` | `/` | Úvodní stránka |
| `o-mne.astro` | `/o-mne` | O mně |
| `sluzby.astro` | `/sluzby` | Služby |
| `nemovitosti/index.astro` | `/nemovitosti` | Seznam nemovitostí |
| `nemovitosti/[slug].astro` | `/nemovitosti/xyz` | Detail nemovitosti |
| `zrealizovano.astro` | `/zrealizovano` | Prodané nemovitosti |
| `reference.astro` | `/reference` | Reference klientů |
| `kontakt.astro` | `/kontakt` | Kontaktní formulář |

### Komponenty

Opakovaně použitelné komponenty jsou v `astro-site/src/components/`:

- `Navbar.astro` - Navigace
- `Footer.astro` - Patička
- `PropertyCard.astro` - Karta nemovitosti
- `ImageGallery.astro` - Galerie fotek

### Sanity schémata

Schémata pro CMS jsou v `sanity-studio/schemaTypes/`:

- `property.ts` - Nemovitosti
- `service.ts` - Služby
- `testimonial.ts` - Reference
- `about.ts` - O mně
- `siteSettings.ts` - Nastavení webu

---

## Deployment

### Web (Vercel/Netlify)

1. Pushni kód na GitHub
2. Importuj projekt na Vercel nebo Netlify
3. Nastav proměnné prostředí (volitelné):
   - `PUBLIC_SANITY_PROJECT_ID=bo49wn0o`
   - `PUBLIC_SANITY_DATASET=production`

### Sanity Studio

```bash
cd sanity-studio
npm run deploy
```

Studio bude dostupné na `mensik-reality.sanity.studio`

---

## Kontaktní formulář

Formulář na stránce `/kontakt` potřebuje backend. Možnosti:

1. **Formspree** (doporučeno):
   - Vytvoř účet na formspree.io
   - Vytvoř nový form
   - Uprav `action` URL v `kontakt.astro`

2. **Netlify Forms**:
   - Přidej `netlify` atribut do `<form>`

---

## Časté úkoly

### Přidat novou nemovitost

1. Otevři Sanity Studio (http://localhost:3333)
2. Klikni na "Nemovitost"
3. Klikni "+" pro nový dokument
4. Vyplň údaje a nahraj fotky
5. Klikni "Publish"
6. Rebuild webu: `cd astro-site && npm run build`

### Změnit kontaktní údaje

1. V Sanity Studiu otevři "Nastavení webu"
2. Uprav telefon, email, adresu
3. Publish
4. Rebuild webu

### Přidat novou službu

1. V Sanity Studiu klikni na "Služba"
2. Vytvoř nový dokument
3. Vyber ikonu z nabídky (home, key, chart, chat, search, document)
4. Přidej features (body služby)
5. Publish a rebuild

---

## Užitečné příkazy

```bash
# Spustit web v dev módu
cd astro-site && npm run dev

# Buildnout web pro produkci
cd astro-site && npm run build

# Spustit Sanity Studio
cd sanity-studio && npm run dev

# Deployovat Sanity Studio
cd sanity-studio && npm run deploy

# Seed databáze
cd sanity-studio && SANITY_TOKEN=xxx npm run seed
```

---

## Problémy?

### Web nenačítá data ze Sanity

- Zkontroluj, že máš správné `projectId` v `astro-site/src/lib/sanity.ts`
- Ověř CORS nastavení na https://sanity.io/manage (přidej localhost:4321)

### Build selhává

- Zkontroluj, že jsou v Sanity publikované dokumenty (ne jen drafty)
- Spusť `npm install` v obou složkách

### Obrázky se nezobrazují

- Obrázky musí být nahrané přes Sanity Studio
- Zkontroluj CORS nastavení pro `cdn.sanity.io`

---

## Technologie

- **Astro** - Static site generator
- **Tailwind CSS 4** - Styling
- **Sanity** - Headless CMS
- **TypeScript** - Typy

---

Hodně štěstí! 🏠
