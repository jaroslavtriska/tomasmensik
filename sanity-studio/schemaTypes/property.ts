import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'property',
  title: 'Nemovitost',
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
      name: 'status',
      title: 'Stav',
      type: 'string',
      options: {
        list: [
          {title: 'Na prodej', value: 'forSale'},
          {title: 'Prodáno', value: 'sold'},
          {title: 'Rezervováno', value: 'reserved'},
        ],
        layout: 'radio',
      },
      initialValue: 'forSale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Prodej', value: 'prodej'},
          {title: 'Pronájem', value: 'pronajem'},
        ],
      },
      initialValue: 'prodej',
    }),
    defineField({
      name: 'propertyType',
      title: 'Typ nemovitosti',
      type: 'string',
      options: {
        list: [
          {title: 'Byt', value: 'byt'},
          {title: 'Rodinný dům', value: 'dum'},
          {title: 'Pozemek', value: 'pozemek'},
          {title: 'Komerční', value: 'komercni'},
          {title: 'Chata/Chalupa', value: 'chata'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Lokalita',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'priceNote',
      title: 'Poznámka k ceně',
      type: 'string',
      description: 'Např. "včetně provize", "k jednání"',
    }),
    defineField({
      name: 'area',
      title: 'Plocha (m²)',
      type: 'number',
    }),
    defineField({
      name: 'disposition',
      title: 'Dispozice',
      type: 'string',
      description: 'Např. 3+kk, 2+1',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní fotka',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galerie fotek',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'videos',
      title: 'Videa',
      type: 'array',
      of: [
        {
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
              description: 'Nebo nahrajte video soubor',
            },
          ],
        },
      ],
      description: 'Videa nemovitosti (bez zvuku)',
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'parameters',
      title: 'Parametry',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Název'},
            {name: 'value', type: 'string', title: 'Hodnota'},
          ],
        },
      ],
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
      description: 'Nižší číslo = zobrazí se dříve',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      price: 'price',
      status: 'status',
      media: 'mainImage',
    },
    prepare({title, location, price, status, media}) {
      const statusLabels: Record<string, string> = {
        forSale: '🟢 Na prodej',
        sold: '🔴 Prodáno',
        reserved: '🟡 Rezervováno',
      }
      return {
        title,
        subtitle: `${statusLabels[status] || ''} | ${location} | ${price?.toLocaleString('cs-CZ')} Kč`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Cena (nejnižší)',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Cena (nejvyšší)',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
  ],
})
