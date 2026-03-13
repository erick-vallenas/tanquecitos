import { getPayloadClient } from '@/lib/payload'
import { ProductCard } from '@/components/store/ProductCard'
import { ProductActions } from '@/components/store/ProductActions'
import { ProductGallery } from '@/components/store/ProductGallery'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
  const product = result.docs[0]
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: product.name,
    description: (product as any).shortDescription || `${product.name} - Tanquecitos`,
    openGraph: {
      title: product.name,
      description: (product as any).shortDescription || `${product.name} - Tanquecitos`,
      images: (product as any).featuredImage?.url ? [{ url: (product as any).featuredImage.url }] : [],
    },
  }
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug }, isActive: { equals: true } },
    limit: 1,
  })

  const product = result.docs[0] as any
  if (!product) notFound()

  const reviews = await payload.find({
    collection: 'reviews',
    where: { product: { equals: product.id }, isApproved: { equals: true } },
    sort: '-createdAt',
    limit: 10,
  })

  const categoryIds = Array.isArray(product.categories)
    ? product.categories.map((c: any) => (typeof c === 'object' ? c.id : c))
    : []

  const relatedProducts = categoryIds.length > 0
    ? await payload.find({
        collection: 'products',
        where: { isActive: { equals: true }, id: { not_equals: product.id }, categories: { in: categoryIds } },
        limit: 4,
      })
    : { docs: [] }

  const avgRating = reviews.docs.length > 0
    ? reviews.docs.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.docs.length
    : 0

  const allImages = [
    product.featuredImage,
    ...(product.gallery?.map((g: any) => g.image) || []),
  ].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/productos" className="hover:text-brand-600">Productos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <ProductGallery images={allImages} productName={product.name} isOnSale={!!(product.compareAtPrice && product.compareAtPrice > product.price)} />

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          {reviews.docs.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-lg ${star <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({reviews.docs.length} reseña{reviews.docs.length !== 1 ? 's' : ''})</span>
            </div>
          )}

          {/* Short Description */}
          {product.shortDescription && (
            <p className="mt-4 text-gray-600 leading-relaxed">{product.shortDescription}</p>
          )}

          {/* Product Actions (client component) */}
          <div className="mt-4">
            <ProductActions
              productId={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.featuredImage?.url || null}
              stock={product.stock}
              variants={product.variants || []}
              petSizes={product.petSizes || []}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Descripción</h2>
          <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{
            __html: typeof product.description === 'string' ? product.description : ''
          }} />
        </section>
      )}

      {/* Size Guide */}
      {product.sizeGuide && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Guía de tallas</h2>
          <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{
            __html: typeof product.sizeGuide === 'string' ? product.sizeGuide : ''
          }} />
        </section>
      )}

      {/* Reviews */}
      {reviews.docs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Reseñas ({reviews.docs.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.docs.map((review: any) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`${star <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                    ))}
                  </div>
                  <span className="font-medium text-gray-800">{review.title}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                {(review.petName || review.petBreed) && (
                  <p className="text-xs text-gray-400 mt-2">
                    🐾 {[review.petName, review.petBreed].filter(Boolean).join(' - ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.docs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.docs.map((p: any) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} compareAtPrice={p.compareAtPrice} image={p.featuredImage} tags={p.tags} stock={p.stock} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
