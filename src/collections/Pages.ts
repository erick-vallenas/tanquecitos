import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Imagen destacada',
      relationTo: 'media',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Publicada',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
