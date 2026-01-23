import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'O mně',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtitulek',
      type: 'string',
      description: 'Např. "Váš realitní partner v Jihlavě"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainPhoto',
      title: 'Hlavní fotka',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'photos',
      title: 'Další fotky',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'interests',
      title: 'Koníčky a zájmy',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'stats',
      title: 'Statistiky',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', type: 'string', title: 'Číslo'},
            {name: 'label', type: 'string', title: 'Popisek'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainPhoto',
    },
  },
})
