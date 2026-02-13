import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  groups: [
    { name: 'general', title: 'Obecné & Branding', default: true },
    { name: 'home', title: 'Úvodní stránka' },
    { name: 'career', title: 'Kariéra' },
    { name: 'cooperation', title: 'Spolupráce' },
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
      initialValue: 'Tomáš Menšík',
      description: 'Zobrazuje se v záhlaví a v titulku stránky. Na webu se zobrazí „Tomáš Menšík“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Popis webu (SEO)',
      type: 'text',
      group: 'general',
      rows: 3,
      initialValue: 'Profesionální realitní služby v Jihlavě a okolí. Prodej, nákup a pronájem nemovitostí.',
      description: 'Pro vyhledávače a sdílení na sociálních sítích.',
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
    // Úvodní stránka (Hero + Služby + CTA)
    defineField({
      name: 'heroImage',
      title: 'Úvodní fotka (hero)',
      type: 'image',
      group: 'home',
      options: {
        hotspot: true,
      },
      description: 'Pokud chcete použít video místo obrázku, použijte pole níže',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Úvodní video (hero)',
      type: 'object',
      group: 'home',
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
      group: 'home',
      initialValue: 'Realitní makléř',
      description: 'Na webu se zobrazí tento text, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Úvodní nadpis',
      type: 'string',
      group: 'home',
      initialValue: 'Tomáš Menšík',
      description: 'Na webu se zobrazí „Tomáš Menšík“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Úvodní podnadpis',
      type: 'text',
      group: 'home',
      rows: 2,
      initialValue: 'Pomohu vám najít vysněný domov nebo prodat vaši nemovitost za nejlepší cenu. Profesionální přístup a osobní péče v Jihlavě a okolí.',
      description: 'Na webu se zobrazí výchozí text, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'heroCtaOffer',
      title: 'Tlačítko – Nabídka',
      type: 'string',
      group: 'home',
      initialValue: 'Prohlédnout nabídku',
    }),
    defineField({
      name: 'heroCtaContact',
      title: 'Tlačítko – Kontakt',
      type: 'string',
      group: 'home',
      initialValue: 'Kontaktujte mě',
    }),
    defineField({
      name: 'servicesSectionTitle',
      title: 'Sekce Služby – nadpis',
      type: 'string',
      group: 'home',
      initialValue: 'Co pro vás mohu udělat',
      description: 'Na webu se zobrazí „Co pro vás mohu udělat“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'servicesSectionDescription',
      title: 'Sekce Služby – popis',
      type: 'text',
      group: 'home',
      rows: 2,
      initialValue: 'Nabízím kompletní služby v oblasti nemovitostí. Od prvního kontaktu až po úspěšný prodej.',
    }),
    defineField({
      name: 'servicesCtaLabel',
      title: 'Sekce Služby – tlačítko',
      type: 'string',
      group: 'home',
      initialValue: 'Všechny služby',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA sekce – nadpis',
      type: 'string',
      group: 'home',
      initialValue: 'Chcete prodat nemovitost?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA sekce – popis',
      type: 'text',
      group: 'home',
      rows: 2,
      initialValue: 'Kontaktujte mě pro nezávaznou konzultaci. Pomohu vám s oceněním, přípravou a prodejem vaší nemovitosti za nejlepší možnou cenu.',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA sekce – tlačítko',
      type: 'string',
      group: 'home',
      initialValue: 'Domluvit schůzku',
    }),
    // Kariéra
    defineField({
      name: 'careerTitle',
      title: 'Nadpis',
      type: 'string',
      group: 'career',
      initialValue: 'Kariéra',
      description: 'Stránka /kariera. Na webu se zobrazí „Kariéra“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'careerSubtitle',
      title: 'Podnadpis',
      type: 'text',
      group: 'career',
      rows: 2,
      initialValue: 'Chcete s Tomášem spolupracovat? Napište pár vět o sobě a ozveme se vám.',
    }),
    // Spolupráce
    defineField({
      name: 'cooperationTitle',
      title: 'Nadpis',
      type: 'string',
      group: 'cooperation',
      initialValue: 'Spolupráce',
      description: 'Stránka /spoluprace. Na webu se zobrazí „Spolupráce“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'cooperationSubtitle',
      title: 'Podnadpis',
      type: 'text',
      group: 'cooperation',
      rows: 2,
      initialValue: 'Firmy a specialisté, se kterými dlouhodobě spolupracujeme.',
    }),
    // Contact
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
      initialValue: '+420 123 456 789',
      description: 'Zobrazuje se v záhlaví, patičce a na stránce Kontakt.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      initialValue: 'tomas@mensik-reality.cz',
      description: 'Zobrazuje se v záhlaví, patičce a na stránce Kontakt.',
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
      initialValue: 'Masarykovo náměstí 10, 586 01 Jihlava',
      description: 'Na webu se zobrazí „Jihlava, Česká republika“, pokud pole nevyplníte.',
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
      initialValue: 'Tomáš Menšík',
      description: 'Nadpis v patičce. Na webu se zobrazí Název webu, pokud pole nevyplníte.',
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
      initialValue: '© 2024 Tomáš Menšík. Všechna práva vyhrazena.',
      description: 'Rok se na webu doplní automaticky.',
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
