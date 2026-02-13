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
      description: 'Pokud chcete použít video místo obrázku, použijte pole níže',
    }),
    defineField({
      name: 'mainVideo',
      title: 'Hlavní video',
      type: 'object',
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
      description: 'Video má přednost před fotkou, pokud je nastavené',
    }),
    defineField({
      name: 'photos',
      title: 'Další fotky',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Pro přidání videí použijte pole "Média" níže',
    }),
    defineField({
      name: 'media',
      title: 'Média (fotky a videa)',
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
              description: 'Nebo nahrajte video soubor (.mp4, .webm, .mov)',
              options: {
                accept: 'video/*',
              },
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
      description: 'Galerie fotek a videí',
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
