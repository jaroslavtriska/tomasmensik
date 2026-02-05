import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  groups: [
    { name: 'general', title: 'Obecné', default: true },
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
    // Hero
    defineField({
      name: 'heroImage',
      title: 'Úvodní fotka (hero)',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
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
    // Homepage sections
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
