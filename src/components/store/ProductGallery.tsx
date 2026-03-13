'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  images: Array<{ url?: string | null; alt?: string } | null>
  productName: string
  isOnSale?: boolean
}

export function ProductGallery({ images, productName, isOnSale }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const validImages = images.filter((img): img is { url: string; alt?: string } => !!img?.url)

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="text-8xl">🐾</span>
      </div>
    )
  }

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={validImages[selectedIndex].url}
          alt={validImages[selectedIndex].alt || productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {isOnSale && (
          <span className="absolute top-4 left-4 badge-sale text-sm">Oferta</span>
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-4">
          {validImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                i === selectedIndex ? 'border-brand-500' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
