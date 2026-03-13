'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/formatPrice'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CarritoPage() {
  const { items, subtotal, itemCount, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold text-gray-800">Tu carrito está vacío</h1>
        <p className="text-gray-500 mt-2">Agrega productos para empezar a comprar</p>
        <Link href="/productos" className="btn-primary inline-block mt-6">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
          Carrito ({itemCount} producto{itemCount !== 1 ? 's' : ''})
        </h1>
        <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variant}`} className="bg-white rounded-xl p-4 md:p-6 shadow-sm flex gap-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="128px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🐾</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link href={`/producto/${item.slug}`} className="font-medium text-gray-800 hover:text-brand-600 transition-colors">
                      {item.name}
                    </Link>
                    {item.variant && <p className="text-sm text-gray-500 mt-0.5">{item.variant}</p>}
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variant)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                      disabled={item.quantity >= item.stock}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900 text-lg">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-heading font-bold text-gray-900 mb-4">Resumen</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="text-gray-500">Calculado en checkout</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-brand-700">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full btn-primary text-center mt-6">
              Proceder al pago
            </Link>

            <Link href="/productos" className="flex items-center justify-center gap-2 w-full text-sm text-brand-600 hover:text-brand-700 font-medium mt-4">
              <ArrowLeft className="w-4 h-4" /> Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
