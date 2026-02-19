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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normální', value: 'normal'},
            {title: 'Nadpis H2', value: 'h2'},
            {title: 'Nadpis H3', value: 'h3'},
          ],
          lists: [
            {title: 'Seznam', value: 'bullet'},
            {title: 'Číslovaný seznam', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Tučné', value: 'strong'},
              {title: 'Kurzíva', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativní text',
              description: 'Důležité pro přístupnost a SEO',
            },
          ],
        },
        {
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            {
              name: 'videoUrl',
              title: 'URL videa',
              type: 'url',
              description: 'URL videa z YouTube, Vimeo nebo jiného zdroje',
            },
            {
              name: 'videoFile',
              title: 'Video soubor',
              type: 'file',
              description: 'Nebo nahrajte video soubor',
            },
            {
              name: 'poster',
              title: 'Náhledový obrázek',
              type: 'image',
              description: 'Volitelné - pro YouTube/Vimeo se použije automatický náhled',
              options: {hotspot: true},
            },
            {
              name: 'aspectRatio',
              title: 'Poměr stran',
              type: 'string',
              options: {
                list: [
                  {title: 'Na šířku (16:9)', value: '16/9'},
                  {title: 'Na výšku (9:16)', value: '9/16'},
                  {title: '4:3', value: '4/3'},
                  {title: 'Čtverec (1:1)', value: '1/1'},
                ],
                layout: 'radio',
              },
              initialValue: '16/9',
            },
          ],
          preview: {
            select: {
              videoUrl: 'videoUrl',
            },
            prepare({videoUrl}) {
              return {
                title: 'Video',
                subtitle: videoUrl || 'Nahraný soubor',
              };
            },
          },
        },
      ],
      description: 'Detailní popis pro stránku služby - můžete přidat text, obrázky i videa',
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
            {
              name: 'aspectRatio',
              title: 'Poměr stran videa',
              type: 'string',
              options: {
                list: [
                  {title: 'Na šířku (16:9)', value: '16/9'},
                  {title: 'Na výšku (9:16)', value: '9/16'},
                  {title: '4:3', value: '4/3'},
                  {title: 'Čtverec (1:1)', value: '1/1'},
                ],
                layout: 'radio',
              },
              initialValue: '16/9',
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
