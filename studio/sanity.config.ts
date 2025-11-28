import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'EA-Portfolio-VersionA-Gatsby',

  projectId: 'tyru08of',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  
  // Enable API for build hooks
  api: {
    projectId: 'tyru08of',
    dataset: 'production',
  },
})
