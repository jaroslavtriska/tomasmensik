import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Reference',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Jméno klienta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokalita',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text reference',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceType',
      title: 'Typ služby',
      type: 'string',
      options: {
        list: [
          {title: 'Prodej bytu', value: 'prodejBytu'},
          {title: 'Prodej domu', value: 'prodejDomu'},
          {title: 'Nákup bytu', value: 'nakupBytu'},
          {title: 'Nákup domu', value: 'nakupDomu'},
          {title: 'Pronájem', value: 'pronajem'},
          {title: 'Odhad', value: 'odhad'},
          {title: 'Konzultace', value: 'konzultace'},
          {title: 'Prodej i nákup', value: 'prodejNakup'},
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Datum / Rok',
      type: 'string',
      description: 'Např. "2024" nebo "Leden 2024"',
    }),
    defineField({
      name: 'featured',
      title: 'Zobrazit na úvodní stránce',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'text',
      date: 'date',
    },
    prepare({title, subtitle, date}) {
      return {
        title,
        subtitle: `${date || ''} - ${subtitle?.substring(0, 50)}...`,
      }
    },
  },
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
