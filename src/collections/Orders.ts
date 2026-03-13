import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Pedido',
    plural: 'Pedidos',
  },
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Ventas',
    defaultColumns: ['orderNumber', 'customer', 'total', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Nº Pedido',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      label: 'Cliente',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Productos',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          label: 'Producto',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'variant',
          type: 'text',
          label: 'Variante',
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Cantidad',
          required: true,
          min: 1,
        },
        {
          name: 'unitPrice',
          type: 'number',
          label: 'Precio unitario (S/)',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          label: 'Subtotal (S/)',
          required: true,
        },
        {
          name: 'shippingCost',
          type: 'number',
          label: 'Costo de envío (S/)',
          required: true,
          defaultValue: 0,
        },
        {
          name: 'total',
          type: 'number',
          label: 'Total (S/)',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: '⏳ Pendiente', value: 'pending' },
        { label: '✅ Pago confirmado', value: 'paid' },
        { label: '📦 Preparando', value: 'preparing' },
        { label: '🚚 Enviado', value: 'shipped' },
        { label: '✔️ Entregado', value: 'delivered' },
        { label: '❌ Cancelado', value: 'cancelled' },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Método de pago',
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Yape', value: 'yape' },
        { label: 'Transferencia bancaria', value: 'transfer' },
        { label: 'Culqi (tarjeta)', value: 'culqi' },
      ],
    },
    {
      name: 'paymentProof',
      type: 'upload',
      label: 'Comprobante de pago',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Captura del voucher de Yape/transferencia',
      },
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Dirección de envío',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre del receptor',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Teléfono',
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
        },
        {
          name: 'reference',
          type: 'text',
          label: 'Referencia',
        },
      ],
    },
    {
      name: 'trackingNumber',
      type: 'text',
      label: 'Número de seguimiento',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas internas',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
