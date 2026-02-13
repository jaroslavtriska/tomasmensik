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
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Krátký popis pro seznam služeb',
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailní popis',
      type: 'text',
      rows: 10,
      description: 'Detailní popis pro stránku služby',
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
    defineField({
      name: 'gallery',
      title: 'Galerie (fotky a videa)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Typ',
              type: 'string',
              options: {
                list: [
                  {title: 'Obrázek', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Obrázek',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'URL videa',
              type: 'url',
              description: 'URL videa z YouTube, Vimeo nebo jiného zdroje',
              hidden: ({parent}) => parent?.type !== 'video',
            },
            {
              name: 'videoFile',
              title: 'Video soubor',
              type: 'file',
              description: 'Nebo nahrajte video soubor',
              hidden: ({parent}) => parent?.type !== 'video',
            },
          ],
          preview: {
            select: {
              type: 'type',
              image: 'image',
              videoUrl: 'videoUrl',
            },
            prepare({type, image, videoUrl}) {
              return {
                title: type === 'image' ? 'Obrázek' : 'Video',
                subtitle: videoUrl || '',
                media: image,
              }
            },
          },
        },
      ],
      description: 'Galerie fotek a videí pro detailní stránku služby',
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
