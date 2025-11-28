import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'About Me',
  name: 'about',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'projectPortableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile image',
      type: 'figure',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'projectPortableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'projectPortableText',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
