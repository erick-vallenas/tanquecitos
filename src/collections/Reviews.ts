import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Reseña',
    plural: 'Reseñas',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Ventas',
    defaultColumns: ['product', 'customer', 'rating', 'isApproved', 'createdAt'],
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      label: 'Producto',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'customer',
      type: 'relationship',
      label: 'Cliente',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Calificación',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Comentario',
      required: true,
    },
    {
      name: 'petName',
      type: 'text',
      label: 'Nombre de la mascota',
    },
    {
      name: 'petBreed',
      type: 'text',
      label: 'Raza de la mascota',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Aprobada',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
