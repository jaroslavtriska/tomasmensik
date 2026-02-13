import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  groups: [
    { name: 'general', title: 'Obecné & Branding', default: true },
    { name: 'hero', title: 'Úvodní sekce (Hero)' },
    { name: 'sections', title: 'Sekce na úvodní stránce' },
    { name: 'contact', title: 'Kontakt' },
    { name: 'footer', title: 'Patička' },
    { name: 'navigation', title: 'Navigace' },
  ],
  fields: [
    // General
    defineField({
      name: 'siteName',
      title: 'Název webu / Logo',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
      description: 'Zobrazuje se v záhlaví a v titulku stránky',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Popis webu (SEO)',
      type: 'text',
      group: 'general',
      rows: 3,
      description: 'Pro vyhledávače a sdílení na sociálních sítích',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo (obrázek)',
      type: 'image',
      group: 'general',
      options: {
        hotspot: true,
      },
      description: 'Volitelné logo v záhlaví. Pokud není nastavené, použije se jen textový název webu.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Popisek loga (alt text)',
      type: 'string',
      group: 'general',
      description: 'Pro přístupnost a SEO, např. „Logo Tomáš Menšík - Reality“',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Barevné téma',
      type: 'string',
      group: 'general',
      readOnly: true,
      options: {
        list: [
          { title: 'Zelené (výchozí)', value: 'green' },
          { title: 'Zlaté', value: 'amber' },
          { title: 'Tmavé', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'green',
      description: 'Rychlá změna hlavních barev webu.',
    }),
    defineField({
      name: 'fontVariant',
      title: 'Styl písma',
      type: 'string',
      group: 'general',
      readOnly: true,
      options: {
        list: [
          { title: 'Klasické (Cormorant + Outfit)', value: 'classic' },
          { title: 'Elegantní (Playfair + Inter)', value: 'elegant' },
          { title: 'Moderní (DM Sans)', value: 'modern' },
        ],
        layout: 'radio',
      },
      initialValue: 'classic',
      description: 'Vyberte kombinaci písem pro celý web.',
    }),
    // Hero
    defineField({
      name: 'heroImage',
      title: 'Úvodní fotka (hero)',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      description: 'Pokud chcete použít video místo obrázku, použijte pole níže',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Úvodní video (hero)',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'url',
          title: 'URL videa',
          type: 'url',
          description: 'URL videa z YouTube, Vimeo nebo jiného zdroje',
        },
        {
          name: 'file',
          title: 'Video soubor',
          type: 'file',
          description: 'Nebo nahrajte video soubor (.mp4, .webm, .mov)',
          options: {
            accept: 'video/*',
          },
        },
      ],
      description: 'Video má přednost před obrázkem, pokud je nastavené',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Úvodní štítek (nad nadpisem)',
      type: 'string',
      group: 'hero',
      description: 'Např. "Realitní makléř"',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Úvodní nadpis',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Úvodní podnadpis',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'heroCtaOffer',
      title: 'Tlačítko – Nabídka',
      type: 'string',
      group: 'hero',
      initialValue: 'Prohlédnout nabídku',
    }),
    defineField({
      name: 'heroCtaContact',
      title: 'Tlačítko – Kontakt',
      type: 'string',
      group: 'hero',
      initialValue: 'Kontaktujte mě',
    }),
    // Homepage + extra sections
    defineField({
      name: 'servicesSectionTitle',
      title: 'Sekce Služby – nadpis',
      type: 'string',
      group: 'sections',
      initialValue: 'Co pro vás mohu udělat',
    }),
    defineField({
      name: 'servicesSectionDescription',
      title: 'Sekce Služby – popis',
      type: 'text',
      group: 'sections',
      rows: 2,
      initialValue: 'Nabízím kompletní služby v oblasti nemovitostí. Od prvního kontaktu až po úspěšný prodej.',
    }),
    defineField({
      name: 'servicesCtaLabel',
      title: 'Sekce Služby – tlačítko',
      type: 'string',
      group: 'sections',
      initialValue: 'Všechny služby',
    }),
    defineField({
      name: 'propertiesSectionTitle',
      title: 'Sekce Nemovitosti – nadpis',
      type: 'string',
      group: 'sections',
      initialValue: 'Nemovitosti v nabídce',
    }),
    defineField({
      name: 'propertiesSectionDescription',
      title: 'Sekce Nemovitosti – popis',
      type: 'text',
      group: 'sections',
      rows: 2,
      initialValue: 'Vyberte si z aktuální nabídky nemovitostí v Jihlavě a okolí.',
    }),
    defineField({
      name: 'propertiesCtaLabel',
      title: 'Sekce Nemovitosti – odkaz',
      type: 'string',
      group: 'sections',
      initialValue: 'Zobrazit vše',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA sekce – nadpis',
      type: 'string',
      group: 'sections',
      initialValue: 'Chcete prodat nemovitost?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA sekce – popis',
      type: 'text',
      group: 'sections',
      rows: 2,
      initialValue: 'Kontaktujte mě pro nezávaznou konzultaci. Pomohu vám s oceněním, přípravou a prodejem vaší nemovitosti za nejlepší možnou cenu.',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA sekce – tlačítko',
      type: 'string',
      group: 'sections',
      initialValue: 'Domluvit schůzku',
    }),
    defineField({
      name: 'careerTitle',
      title: 'Kariéra – nadpis',
      type: 'string',
      group: 'sections',
      initialValue: 'Kariéra',
    }),
    defineField({
      name: 'careerSubtitle',
      title: 'Kariéra – podnadpis',
      type: 'text',
      group: 'sections',
      rows: 2,
      initialValue: 'Chcete s Tomášem spolupracovat? Napište pár vět o sobě a ozveme se vám.',
    }),
    defineField({
      name: 'cooperationTitle',
      title: 'Spolupráce – nadpis',
      type: 'string',
      group: 'sections',
      initialValue: 'Spolupráce',
    }),
    defineField({
      name: 'cooperationSubtitle',
      title: 'Spolupráce – popis',
      type: 'text',
      group: 'sections',
      rows: 2,
      initialValue: 'Firmy a specialisté, se kterými dlouhodobě spolupracujeme.',
    }),
    // Contact
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'text',
      group: 'contact',
      rows: 2,
    }),
    defineField({
      name: 'openingHours',
      title: 'Pracovní doba',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', type: 'string', title: 'Dny' },
            { name: 'hours', type: 'string', title: 'Hodiny' },
          ],
        },
      ],
    }),
    // Footer
    defineField({
      name: 'footerBrandName',
      title: 'Patička – název',
      type: 'string',
      group: 'footer',
      description: 'Nadpis v patičce (výchozí: stejné jako Název webu)',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Patička – krátký popis',
      type: 'text',
      group: 'footer',
      rows: 2,
      initialValue: 'Profesionální realitní služby v Jihlavě a okolí. Pomohu vám s prodejem, nákupem i oceněním nemovitostí.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Patička – copyright',
      type: 'string',
      group: 'footer',
      description: 'Např. "© 2024 Tomáš Menšík. Všechna práva vyhrazena." (rok se doplní automaticky)',
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Rychlé odkazy v patičce',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Text odkazu' },
            { name: 'href', type: 'string', title: 'URL (např. /nemovitosti)' },
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }) => ({ title: label || 'Odkaz' }),
          },
        },
      ],
    }),
    // Navigation
    defineField({
      name: 'navLinks',
      title: 'Položky menu',
      type: 'array',
      group: 'navigation',
      description: 'Ponechte prázdné pro výchozí menu (Úvod, O mně, Služby, …)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Text' },
            { name: 'href', type: 'string', title: 'URL (např. / nebo /o-mne)' },
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }) => ({ title: label || 'Položka' }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Nastavení webu',
      }
    },
  },
})
