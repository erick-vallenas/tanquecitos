import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  access: {
    read: () => true,
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtítulo',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mobileImage',
      type: 'upload',
      label: 'Imagen móvil',
      relationTo: 'media',
      admin: {
        description: 'Opcional: imagen optimizada para móvil',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Enlace',
      admin: {
        description: 'URL destino al hacer clic (ej: /productos?categoria=arneses)',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Texto del botón',
      admin: {
        description: 'Ej: Ver colección, Comprar ahora',
      },
    },
    {
      name: 'position',
      type: 'select',
      label: 'Posición',
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Hero (slider principal)', value: 'hero' },
        { label: 'Promoción home', value: 'promo' },
        { label: 'Banner categoría', value: 'category' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Activo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
