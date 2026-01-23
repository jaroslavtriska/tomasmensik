import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Služba',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'string',
      options: {
        list: [
          {title: 'Dům', value: 'home'},
          {title: 'Klíč', value: 'key'},
          {title: 'Graf', value: 'chart'},
          {title: 'Chat', value: 'chat'},
          {title: 'Hledat', value: 'search'},
          {title: 'Dokument', value: 'document'},
        ],
      },
      initialValue: 'home',
    }),
    defineField({
      name: 'features',
      title: 'Seznam bodů',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Seznam hlavních bodů služby',
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
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      const icons: Record<string, string> = {
        home: '🏠',
        key: '🔑',
        chart: '📊',
        chat: '💬',
        search: '🔍',
        document: '📄',
      }
      return {
        title,
        subtitle: icons[icon] || '📋',
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
