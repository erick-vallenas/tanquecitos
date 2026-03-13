import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/formatPrice'
import { WishlistButton } from './WishlistButton'

type ProductCardProps = {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number | null
  image?: {
    url?: string | null
    alt?: string
  } | null
  tags?: string[] | null
  stock: number
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  tags,
  stock,
}: ProductCardProps) {
  const isOnSale = compareAtPrice && compareAtPrice > price
  const isNew = tags?.includes('new')
  const isBestseller = tags?.includes('bestseller')
  const isOutOfStock = stock <= 0

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Wishlist Button */}
      <WishlistButton
        product={{
          productId: id,
          name,
          slug,
          price,
          compareAtPrice,
          image: image?.url || null,
        }}
        size="sm"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <Link href={`/producto/${slug}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-5xl">🐾</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale && <span className="badge-sale">Oferta</span>}
            {isNew && <span className="badge-new">Nuevo</span>}
            {isBestseller && <span className="badge-bestseller">Top</span>}
            {isOutOfStock && <span className="badge-out-of-stock">Agotado</span>}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-brand-600 transition-colors min-h-[2.5rem]">
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className={`font-bold ${isOnSale ? 'text-red-600' : 'text-gray-900'}`}>
              {formatPrice(price)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
