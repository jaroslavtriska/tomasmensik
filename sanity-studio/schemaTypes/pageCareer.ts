import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageCareer',
  title: 'Kariéra',
  type: 'document',
  fields: [
    defineField({
      name: 'careerTitle',
      title: 'Nadpis',
      type: 'string',
      initialValue: 'Kariéra',
      description: 'Stránka /kariera. Na webu se zobrazí „Kariéra“, pokud pole nevyplníte.',
    }),
    defineField({
      name: 'careerSubtitle',
      title: 'Podnadpis',
      type: 'text',
      rows: 2,
      initialValue: 'Chcete s Tomášem spolupracovat? Napište pár vět o sobě a ozveme se vám.',
    }),
    defineField({
      name: 'careerPhoto',
      title: 'Fotka na stránce',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Fotka zobrazená na stránce Kariéra. Pokud není nastavená, použije se fotka z O mně.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Kariéra',
      }
    },
  },
})
