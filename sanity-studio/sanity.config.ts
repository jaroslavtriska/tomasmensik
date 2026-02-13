import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['siteSettings', 'pageCareer'])

const deskStructure = (S: any) =>
  S.list()
    .title('Obsah')
    .items([
      S.listItem()
        .title('Nastavení webu')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Kariéra')
        .id('pageCareer')
        .child(S.document().schemaType('pageCareer').documentId('pageCareer')),
      S.divider(),
      S.documentTypeListItem('about').title('O mně'),
      S.documentTypeListItem('service').title('Služby'),
      S.documentTypeListItem('property').title('Nemovitosti'),
      S.documentTypeListItem('testimonial').title('Reference'),
      S.documentTypeListItem('partner').title('Partneři'),
    ])

// Use project "TomasMensik" under org "Jaroslav Triska". Set in Vercel or .env:
// SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || '2mnybhg0'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Menšík Reality',
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [structureTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) => {
      if (!singletonTypes.has(schemaType)) return prev

      const allowed = new Set(['publish', 'discardChanges', 'restore'])
      return prev.filter((item) => item.action && allowed.has(item.action))
    },
  },
})
