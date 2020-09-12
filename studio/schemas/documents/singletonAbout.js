export default {
  title: 'About Me',
  name: 'about',
  type: 'document',
  __experimental_actions: [ /* 'create', */ 'update', /* ' delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'projectPortableText',
      validation: Rule => Rule.required()
    },
    {
      name: 'profileImage',
      title: 'Profile image',
      type: 'figure'
    },
    {
      name: 'contact',
      title: 'Contact',
      type: 'projectPortableText',
      validation: Rule => Rule.required()
    },
    {
      name: 'awards',
      title: 'Awards',
      type: 'projectPortableText',
      validation: Rule => Rule.required()
    }
  ]
}
