import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Artículo',
    plural: 'Blog',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'isPublished', 'createdAt'],
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      maxLength: 300,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Imagen destacada',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor',
      defaultValue: 'Tanquecitos',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'select',
      label: 'Etiquetas',
      hasMany: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Cuidados', value: 'cuidados' },
        { label: 'Nutrición', value: 'nutricion' },
        { label: 'Razas grandes', value: 'razas-grandes' },
        { label: 'Accesorios', value: 'accesorios' },
        { label: 'Entrenamiento', value: 'entrenamiento' },
        { label: 'Salud', value: 'salud' },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Publicado',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
