import { getPayloadClient } from '@/lib/payload'
import { formatPrice } from '@/lib/formatPrice'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de envíos',
  description: 'Información sobre envíos, costos y tiempos de entrega',
}

export default async function EnviosPage() {
  const payload = await getPayloadClient()
  const zones = await payload.find({
    collection: 'shipping-zones',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 50,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Política de envíos</h1>

      <div className="prose prose-gray max-w-none">
        <h2>Zonas de cobertura y costos</h2>
        <p>Realizamos envíos a Lima Metropolitana y pronto a nivel nacional.</p>
      </div>

      {zones.docs.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-50">
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Zona</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Costo</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700 hidden md:table-cell">Tiempo estimado</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700 hidden md:table-cell">Envío gratis desde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {zones.docs.map((zone: any) => (
                <tr key={zone.id}>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{zone.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatPrice(zone.cost)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{zone.estimatedDays || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {zone.freeShippingMinimum ? formatPrice(zone.freeShippingMinimum) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-gray max-w-none mt-8">
        <h2>Tiempos de entrega</h2>
        <ul>
          <li>Lima Metropolitana: 1-3 días hábiles después de confirmar el pago</li>
          <li>Los pedidos se procesan de lunes a viernes</li>
          <li>Recibirás un mensaje por WhatsApp cuando tu pedido sea despachado</li>
        </ul>

        <h2>Seguimiento de tu pedido</h2>
        <p>
          Una vez despachado tu pedido, te enviaremos el número de seguimiento por WhatsApp
          para que puedas rastrear tu paquete.
        </p>

        <h2>Contacto</h2>
        <p>
          Si tienes alguna duda sobre tu envío, contáctanos por WhatsApp. Estamos para ayudarte.
        </p>
      </div>
    </div>
  )
}
