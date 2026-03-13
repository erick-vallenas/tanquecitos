'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/lib/formatPrice'
import type { PaymentMethod, ShippingInfo } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Building2, Smartphone, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react'

type ShippingResult = {
  cost: number | null
  zoneName?: string
  estimatedDays?: string
  freeShippingMinimum?: number | null
  message?: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { addToast } = useToast()
  const router = useRouter()

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [loading, setLoading] = useState(false)
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [orderNumber, setOrderNumber] = useState('')

  const [shipping, setShipping] = useState<ShippingInfo>({
    name: '', phone: '', email: '', dni: '', address: '', district: '', city: 'Lima', reference: '',
  })

  const shippingCost = shippingResult?.cost ?? 0
  const total = subtotal + shippingCost

  // Calculate shipping when district changes
  useEffect(() => {
    if (shipping.district.length < 3) {
      setShippingResult(null)
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/shipping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ district: shipping.district, subtotal }),
        })
        const data = await res.json()
        setShippingResult(data)
      } catch {
        setShippingResult(null)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [shipping.district, subtotal])

  const updateField = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  const isShippingValid = shipping.name && shipping.phone && shipping.email && shipping.address && shipping.district && shippingResult?.cost !== null && shippingResult?.cost !== undefined

  const handleSubmitOrder = async () => {
    if (!paymentMethod) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variant: i.variant,
            quantity: i.quantity,
            price: i.price,
          })),
          shipping,
          paymentMethod,
          subtotal,
          shippingCost,
          total,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setOrderNumber(data.orderNumber)
        setStep('confirmation')
        clearCart()
        addToast('Pedido creado correctamente')
      } else {
        addToast(data.error || 'Error al crear pedido', 'error')
      }
    } catch {
      addToast('Error de conexión', 'error')
    }
    setLoading(false)
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold text-gray-800">Tu carrito está vacío</h1>
        <Link href="/productos" className="btn-primary inline-block mt-6">Ver productos</Link>
      </div>
    )
  }

  // Confirmation
  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-heading font-bold text-gray-900">¡Pedido recibido!</h1>
        <p className="text-gray-600 mt-2">Tu número de pedido es:</p>
        <p className="text-2xl font-bold text-brand-600 mt-2">{orderNumber}</p>

        <div className="bg-white rounded-xl p-6 shadow-sm mt-8 text-left">
          {paymentMethod === 'yape' && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Pago con Yape</h3>
              <p className="text-gray-600 text-sm">
                Realiza el pago de <strong>{formatPrice(total)}</strong> al número de Yape y envía el comprobante por WhatsApp
                indicando tu número de pedido <strong>{orderNumber}</strong>.
              </p>
            </div>
          )}
          {paymentMethod === 'transfer' && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Transferencia bancaria</h3>
              <p className="text-gray-600 text-sm">
                Realiza la transferencia de <strong>{formatPrice(total)}</strong> y envía el comprobante por WhatsApp
                indicando tu número de pedido <strong>{orderNumber}</strong>.
              </p>
            </div>
          )}
          {paymentMethod === 'culqi' && (
            <div>
              <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">Pago con tarjeta</h3>
              <p className="text-gray-600 text-sm">Tu pago ha sido procesado correctamente.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51957137008'}?text=${encodeURIComponent(`Hola! Acabo de hacer el pedido ${orderNumber} por ${formatPrice(total)}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Enviar comprobante por WhatsApp
          </a>
          <Link href="/productos" className="btn-secondary">Seguir comprando</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/carrito" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver al carrito
      </Link>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setStep('shipping')}
          className={`flex items-center gap-2 text-sm font-medium ${step === 'shipping' ? 'text-brand-600' : 'text-gray-400'}`}
        >
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 'shipping' ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
          Envío
        </button>
        <div className="flex-1 h-px bg-gray-200" />
        <button
          onClick={() => isShippingValid && setStep('payment')}
          disabled={!isShippingValid}
          className={`flex items-center gap-2 text-sm font-medium ${step === 'payment' ? 'text-brand-600' : 'text-gray-400'}`}
        >
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
          Pago
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">Datos de envío</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                  <input type="text" value={shipping.name} onChange={(e) => updateField('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Juan Pérez" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={shipping.email} onChange={(e) => updateField('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="juan@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input type="tel" value={shipping.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="987654321" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI / RUC</label>
                  <input type="text" value={shipping.dni} onChange={(e) => updateField('dni', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="12345678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input type="text" value={shipping.city} onChange={(e) => updateField('city', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                  <input type="text" value={shipping.address} onChange={(e) => updateField('address', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Av. Ejemplo 123, Piso 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distrito *</label>
                  <input type="text" value={shipping.district} onChange={(e) => updateField('district', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Miraflores" />
                  {shippingResult && (
                    <p className={`text-xs mt-1 ${shippingResult.cost !== null ? 'text-green-600' : 'text-red-500'}`}>
                      {shippingResult.cost !== null
                        ? `${shippingResult.zoneName} - ${shippingResult.cost === 0 ? 'Envío gratis' : formatPrice(shippingResult.cost)} ${shippingResult.estimatedDays ? `(${shippingResult.estimatedDays})` : ''}`
                        : shippingResult.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referencia</label>
                  <input type="text" value={shipping.reference} onChange={(e) => updateField('reference', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Cerca del parque..." />
                </div>
              </div>
              <button
                onClick={() => setStep('payment')}
                disabled={!isShippingValid}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar al pago
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">Método de pago</h2>
              <div className="space-y-3">
                {/* Yape */}
                <button
                  onClick={() => setPaymentMethod('yape')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'yape' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Yape</p>
                    <p className="text-sm text-gray-500">Paga con Yape y envía el comprobante</p>
                  </div>
                </button>

                {/* Transfer */}
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'transfer' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Transferencia bancaria</p>
                    <p className="text-sm text-gray-500">Transfiere y envía el comprobante</p>
                  </div>
                </button>

                {/* Culqi */}
                <button
                  onClick={() => setPaymentMethod('culqi')}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'culqi' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Tarjeta de crédito/débito</p>
                    <p className="text-sm text-gray-500">Pago seguro con Culqi</p>
                  </div>
                </button>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={!paymentMethod || loading}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Procesando...' : `Confirmar pedido - ${formatPrice(total)}`}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-heading font-bold text-gray-900 mb-4">Tu pedido</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant}`} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">🐾</div>
                    )}
                    <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-800 truncate">{item.name}</p>
                    {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                    <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span>{shippingResult?.cost !== null && shippingResult?.cost !== undefined ? (shippingResult.cost === 0 ? 'Gratis' : formatPrice(shippingResult.cost)) : '—'}</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-brand-700">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
