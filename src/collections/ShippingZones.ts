import type { CollectionConfig } from 'payload'

export const ShippingZones: CollectionConfig = {
  slug: 'shipping-zones',
  labels: {
    singular: 'Zona de envío',
    plural: 'Zonas de envío',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Configuración',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de zona',
      required: true,
      admin: {
        description: 'Ej: Lima Centro, Lima Norte, Callao, Provincias',
      },
    },
    {
      name: 'districts',
      type: 'textarea',
      label: 'Distritos incluidos',
      required: true,
      admin: {
        description: 'Un distrito por línea',
      },
    },
    {
      name: 'cost',
      type: 'number',
      label: 'Costo de envío (S/)',
      required: true,
      min: 0,
    },
    {
      name: 'freeShippingMinimum',
      type: 'number',
      label: 'Envío gratis desde (S/)',
      admin: {
        description: 'Monto mínimo para envío gratis. Dejar vacío si no aplica.',
      },
    },
    {
      name: 'estimatedDays',
      type: 'text',
      label: 'Tiempo estimado',
      admin: {
        description: 'Ej: 1-2 días hábiles',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Activa',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
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
  ],
}
