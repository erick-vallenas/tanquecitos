import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: {
    singular: 'Cliente',
    plural: 'Clientes',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Ventas',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  auth: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre completo',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono',
        },
      ],
    },
    {
      name: 'dni',
      type: 'text',
      label: 'DNI / RUC',
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Direcciones',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta (ej: Casa, Oficina)',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          label: 'Dirección',
          required: true,
        },
        {
          name: 'district',
          type: 'text',
          label: 'Distrito',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          label: 'Ciudad',
          required: true,
          defaultValue: 'Lima',
        },
        {
          name: 'reference',
          type: 'text',
          label: 'Referencia',
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'Dirección principal',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'wishlist',
      type: 'relationship',
      label: 'Lista de deseos',
      relationTo: 'products',
      hasMany: true,
    },
  ],
}
