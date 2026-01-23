import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Menšík Reality',
  
  // Replace with your actual project ID and dataset after creating a Sanity project
  // Run: npx sanity init --bare to get these values
  projectId: 'bo49wn0o',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
