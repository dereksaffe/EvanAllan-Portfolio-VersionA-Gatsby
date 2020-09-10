import {format} from 'date-fns'

export default {
  name: 'sampleProject',
  title: 'Sample project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'imagesGallery',
      title: 'Images gallery',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'mainImage'
    }
  }
}
