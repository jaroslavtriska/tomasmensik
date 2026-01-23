import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Název webu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Popis webu',
      type: 'text',
      rows: 3,
      description: 'Pro SEO a meta tagy',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'openingHours',
      title: 'Pracovní doba',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'days', type: 'string', title: 'Dny'},
            {name: 'hours', type: 'string', title: 'Hodiny'},
          ],
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Úvodní fotka (hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Úvodní nadpis',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Úvodní podnadpis',
      type: 'text',
      rows: 2,
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
