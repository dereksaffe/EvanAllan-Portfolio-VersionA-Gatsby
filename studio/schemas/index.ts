// Document types
import category from './documents/category'
import person from './documents/person'
import sampleProject from './documents/sampleProject'
import siteSettings from './documents/siteSettings'
import singletonAbout from './documents/singletonAbout'

// Object types
import bioPortableText from './objects/bioPortableText'
import figure from './objects/figure'
import projectMember from './objects/projectMember'
import projectPortableText from './objects/projectPortableText'
import simplePortableText from './objects/simplePortableText'

export const schemaTypes = [
  // Objects (must come before documents that use them)
  bioPortableText,
  figure,
  projectMember,
  projectPortableText,
  simplePortableText,
  // Documents
  category,
  person,
  sampleProject,
  singletonAbout,
  siteSettings,
]

