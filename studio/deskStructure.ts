import {StructureBuilder} from 'sanity/structure'
import {MdSettings, MdPerson} from 'react-icons/md'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Sample Projects')
        .schemaType('sampleProject')
        .child(S.documentTypeList('sampleProject').title('Sample Projects')),
      S.listItem()
        .title('People')
        .icon(MdPerson)
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      S.listItem()
        .title('About Me')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('singleton-about')
        ),
    ])

