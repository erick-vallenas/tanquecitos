'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { WishlistButton } from './WishlistButton'
import { formatPrice } from '@/lib/formatPrice'
import { ShoppingCart, Minus, Plus } from 'lucide-react'

type Variant = {
  name: string
  price?: number | null
  stock: number
}

type Props = {
  productId: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number | null
  image?: string | null
  stock: number
  variants?: Variant[]
  petSizes?: string[]
}

export function ProductActions({ productId, name, slug, price, compareAtPrice, image, stock, variants, petSizes }: Props) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)

  const currentPrice = selectedVariant?.price || price
  const currentStock = selectedVariant?.stock ?? stock
  const isOutOfStock = currentStock <= 0
  const isOnSale = compareAtPrice && compareAtPrice > currentPrice

  const handleAdd = () => {
    if (isOutOfStock) return
    addItem({
      productId,
      name,
      slug,
      price: currentPrice,
      compareAtPrice,
      image,
      variant: selectedVariant?.name || null,
      quantity,
      stock: currentStock,
    })
    addToast(`${name} agregado al carrito`)
  }

  return (
    <div>
      {/* Price */}
      <div className="flex items-center gap-3">
        <span className={`text-3xl font-bold ${isOnSale ? 'text-red-600' : 'text-gray-900'}`}>
          {formatPrice(currentPrice)}
        </span>
        {isOnSale && (
          <span className="text-xl text-gray-400 line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
        {isOnSale && (
          <span className="badge-sale">
            -{Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Pet Sizes */}
      {petSizes && petSizes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Talla de mascota</h3>
          <div className="flex gap-2">
            {petSizes.map((size) => (
              <span key={size} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Variants */}
      {variants && variants.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Variante</h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(selectedVariant?.name === variant.name ? null : variant)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  selectedVariant?.name === variant.name
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-gray-200 text-gray-700 hover:border-brand-500'
                } ${variant.stock <= 0 ? 'opacity-40 line-through' : ''}`}
                disabled={variant.stock <= 0}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="mt-8 space-y-3">
        {!isOutOfStock ? (
          <>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <WishlistButton
                product={{ productId, name, slug, price: currentPrice, compareAtPrice, image }}
                size="md"
              />
            </div>
            <button onClick={handleAdd} className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito
            </button>
            <p className="text-sm text-green-600 font-medium">
              {currentStock} disponible{currentStock !== 1 ? 's' : ''}
            </p>
          </>
        ) : (
          <button disabled className="w-full bg-gray-300 text-gray-500 font-medium py-4 rounded-lg cursor-not-allowed">
            Agotado
          </button>
        )}
      </div>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51957137008'}?text=${encodeURIComponent(`Hola! Me interesa: ${name}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Consultar por WhatsApp
      </a>

      {/* Shipping Info */}
      <div className="mt-6 border-t pt-6 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2"><span>🚚</span> Envíos a todo Lima</p>
        <p className="flex items-center gap-2"><span>📦</span> Despacho en 1-3 días hábiles</p>
        <p className="flex items-center gap-2"><span>💳</span> Yape, transferencia o tarjeta</p>
      </div>
    </div>
  )
}
