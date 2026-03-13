import Link from 'next/link'
import { Package } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mis pedidos' }

export default function PedidosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">Mis pedidos</h1>

      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-heading font-semibold text-gray-800">
          Consulta tus pedidos por WhatsApp
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Envíanos tu número de pedido o email para consultar el estado.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51957137008'}?text=${encodeURIComponent('Hola! Quiero consultar el estado de mi pedido.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors mt-6"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
