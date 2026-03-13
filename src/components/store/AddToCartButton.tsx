'use client'

import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { ShoppingCart } from 'lucide-react'
import type { CartItem } from '@/lib/types'

type Props = {
  product: Omit<CartItem, 'quantity'>
  quantity?: number
  variant?: string | null
  className?: string
  fullWidth?: boolean
}

export function AddToCartButton({ product, quantity = 1, variant, className, fullWidth }: Props) {
  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAdd = () => {
    if (product.stock <= 0) return
    addItem({ ...product, quantity, variant: variant || product.variant })
    addToast(`${product.name} agregado al carrito`)
  }

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className={`bg-gray-300 text-gray-500 font-medium py-3 px-6 rounded-lg cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      >
        Agotado
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-primary flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className || ''}`}
    >
      <ShoppingCart className="w-5 h-5" />
      Agregar al carrito
    </button>
  )
}
