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

export default defineConfig({
  name: 'default',
  title: 'Menšík Reality',
  projectId: 'bo49wn0o',
  dataset: 'production',
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
