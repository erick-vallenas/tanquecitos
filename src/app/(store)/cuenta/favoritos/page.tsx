'use client'

import { useWishlist } from '@/context/WishlistContext'
import { formatPrice } from '@/lib/formatPrice'
import { Heart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FavoritosPage() {
  const { items, removeFromWishlist } = useWishlist()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">
        Mis favoritos ({items.length})
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-heading font-semibold text-gray-800">No tienes favoritos</h2>
          <p className="text-gray-500 mt-2">Explora productos y guarda tus favoritos</p>
          <Link href="/productos" className="btn-primary inline-block mt-6">Ver productos</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.productId} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>

              <Link href={`/producto/${item.slug}`}>
                <div className="relative aspect-square bg-gray-100">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🐾</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-gray-900">{formatPrice(item.price)}</span>
                    {item.compareAtPrice && item.compareAtPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">{formatPrice(item.compareAtPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
