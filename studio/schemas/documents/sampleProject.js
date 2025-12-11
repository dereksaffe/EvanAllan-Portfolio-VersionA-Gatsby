import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sampleProject',
  title: 'Project',
  type: 'document',
  initialValue: {
    featured: false,
  },
  fields: [
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
      description: 'Show this project on the homepage. You can feature 3-6 projects.',
    }),
    defineField({
      name: 'homepageOrder',
      type: 'number',
      title: 'Homepage Display Order',
      description: 'Order in which the project appears on the homepage (1 = first). Only applies to featured projects.',
      validation: (Rule) => Rule.min(1).max(6).integer(),
      hidden: ({document}) => !document?.featured,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    }),
    defineField({
      name: 'imagesGallery',
      title: 'Images gallery',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'projectPortableText',
    }),
  ],
  orderings: [
    {
      title: 'Homepage Order',
      name: 'homepageOrder',
      by: [
        {field: 'homepageOrder', direction: 'asc'},
      ],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      featured: 'featured',
      order: 'homepageOrder',
      media: 'mainImage',
    },
    prepare({title, featured, order, media}) {
      const subtitle = featured 
        ? `Featured ${order ? `(#${order})` : ''}` 
        : 'Not featured'
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
