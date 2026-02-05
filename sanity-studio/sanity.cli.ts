import {defineCliConfig} from 'sanity/cli'

// Same project as sanity.config.ts – "TomasMensik" under org "Jaroslav Triska"
// Set SANITY_PROJECT_ID / SANITY_DATASET in .env or shell for local dev
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || '2mnybhg0',
    dataset: process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
  }
})
