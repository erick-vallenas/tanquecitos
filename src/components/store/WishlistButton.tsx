'use client'

import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { Heart } from 'lucide-react'
import type { WishlistItem } from '@/lib/types'

type Props = {
  product: WishlistItem
  className?: string
  size?: 'sm' | 'md'
}

export function WishlistButton({ product, className, size = 'md' }: Props) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToast } = useToast()
  const active = isInWishlist(product.productId)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast(active ? 'Eliminado de favoritos' : 'Agregado a favoritos', active ? 'info' : 'success')
  }

  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses} flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all ${className || ''}`}
      aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        className={`${iconSize} transition-colors ${active ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
      />
    </button>
  )
}
