import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  admin: {
    group: 'Configuración',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nombre del sitio',
              defaultValue: 'Tanquecitos',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Descripción del sitio',
              defaultValue: 'Productos para mascotas grandes y gorditas',
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              label: 'Favicon',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'WhatsApp (con código de país)',
              defaultValue: '51999999999',
              admin: {
                description: 'Ej: 51987654321',
              },
            },
            {
              name: 'whatsappMessage',
              type: 'text',
              label: 'Mensaje predeterminado WhatsApp',
              defaultValue: 'Hola! Me interesa un producto de Tanquecitos',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email de contacto',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Dirección',
            },
          ],
        },
        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'tiktok',
              type: 'text',
              label: 'TikTok URL',
            },
          ],
        },
        {
          label: 'Pagos',
          fields: [
            {
              name: 'yapeNumber',
              type: 'text',
              label: 'Número de Yape',
            },
            {
              name: 'yapeQr',
              type: 'upload',
              label: 'QR de Yape',
              relationTo: 'media',
            },
            {
              name: 'bankAccount',
              type: 'textarea',
              label: 'Datos de cuenta bancaria',
              admin: {
                description: 'Banco, tipo de cuenta, número, titular, CCI',
              },
            },
            {
              name: 'culqiEnabled',
              type: 'checkbox',
              label: 'Culqi habilitado',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Anuncio',
          fields: [
            {
              name: 'announcementBar',
              type: 'text',
              label: 'Barra de anuncios',
              admin: {
                description: 'Texto que aparece arriba del header. Ej: "Envío gratis en pedidos mayores a S/150"',
              },
            },
            {
              name: 'announcementBarActive',
              type: 'checkbox',
              label: 'Mostrar barra de anuncios',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
