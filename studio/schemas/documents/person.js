import {defineType, defineField} from 'sanity'
import {MdPerson} from 'react-icons/md'

export default defineType({
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: MdPerson,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'figure',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'bioPortableText',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
