import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Spolupráce – partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Název firmy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Webová stránka',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description: 'Např. Kuchyňské studio, Stavební firma…',
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website',
      media: 'logo',
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

