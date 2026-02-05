import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['siteSettings'])

const deskStructure = (S: any) =>
  S.list()
    .title('Obsah')
    .items([
      S.listItem()
        .title('Nastavení webu')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => !singletonTypes.has(item.getId())
      ),
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
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? input.filter(
            (action) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
})
