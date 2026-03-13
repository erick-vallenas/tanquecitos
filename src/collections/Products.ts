import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto',
    plural: 'Productos',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Catálogo',
    defaultColumns: ['name', 'price', 'stock', 'isActive', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
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
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descripción corta',
      maxLength: 300,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción completa',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Precios y Stock',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  label: 'Precio (S/)',
                  required: true,
                  min: 0,
                },
                {
                  name: 'compareAtPrice',
                  type: 'number',
                  label: 'Precio anterior (S/)',
                  min: 0,
                  admin: {
                    description: 'Dejar vacío si no está en oferta',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'stock',
                  type: 'number',
                  label: 'Stock',
                  required: true,
                  defaultValue: 0,
                  min: 0,
                },
                {
                  name: 'sku',
                  type: 'text',
                  label: 'SKU',
                },
              ],
            },
          ],
        },
        {
          label: 'Imágenes',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              label: 'Imagen principal',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galería',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Imagen',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Variantes',
          fields: [
            {
              name: 'variants',
              type: 'array',
              label: 'Variantes',
              admin: {
                description: 'Ej: tallas, colores',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Nombre (ej: Talla L)',
                      required: true,
                    },
                    {
                      name: 'sku',
                      type: 'text',
                      label: 'SKU variante',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'price',
                      type: 'number',
                      label: 'Precio (S/)',
                      admin: {
                        description: 'Dejar vacío para usar precio base',
                      },
                    },
                    {
                      name: 'stock',
                      type: 'number',
                      label: 'Stock',
                      required: true,
                      defaultValue: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tallas mascota',
          fields: [
            {
              name: 'petSizes',
              type: 'select',
              label: 'Tallas de mascota compatibles',
              hasMany: true,
              options: [
                { label: 'S (Pequeño)', value: 'S' },
                { label: 'M (Mediano)', value: 'M' },
                { label: 'L (Grande)', value: 'L' },
                { label: 'XL (Extra Grande)', value: 'XL' },
                { label: 'XXL (Gigante)', value: 'XXL' },
              ],
            },
            {
              name: 'sizeGuide',
              type: 'richText',
              label: 'Guía de tallas',
              admin: {
                description: 'Tabla de medidas y cómo medir a tu mascota',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      label: 'Categorías',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'select',
      label: 'Etiquetas',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Destacado', value: 'featured' },
        { label: 'Oferta', value: 'sale' },
        { label: 'Más vendido', value: 'bestseller' },
      ],
    },
    {
      name: 'weight',
      type: 'number',
      label: 'Peso (kg)',
      admin: {
        position: 'sidebar',
        description: 'Para cálculo de envío',
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
