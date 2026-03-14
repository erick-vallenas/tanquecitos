import { getPayloadClient } from '@/lib/payload'
import { ProductCard } from '@/components/store/ProductCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Explora nuestra colección de productos para mascotas grandes',
}

type Props = {
  searchParams: Promise<{
    categoria?: string
    tag?: string
    talla?: string
    page?: string
    q?: string
  }>
}

export default async function ProductosPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = 12

  let products = { docs: [], totalDocs: 0, totalPages: 0 } as any
  let categories = { docs: [] } as any

  try {
    const payload = await getPayloadClient()
    const where: any = { isActive: { equals: true } }
    if (params.categoria) where['categories.slug'] = { equals: params.categoria }
    if (params.tag) where.tags = { equals: params.tag }
    if (params.talla) where.petSizes = { equals: params.talla }
    if (params.q) where.name = { like: params.q }

    ;[products, categories] = await Promise.all([
      payload.find({ collection: 'products', where, limit, page, sort: '-createdAt' }),
      payload.find({ collection: 'categories', where: { isActive: { equals: true } }, sort: 'order', limit: 50 }),
    ])
  } catch {
    // DB tables may not exist yet
  }

  const petSizes = ['S', 'M', 'L', 'XL', 'XXL']
  const tagLabels: Record<string, string> = {
    new: 'Novedades',
    sale: 'Ofertas',
    featured: 'Destacados',
    bestseller: 'Más vendidos',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Productos</span>
        {params.tag && (
          <>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{tagLabels[params.tag] || params.tag}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-3">Buscar</h3>
              <form action="/productos" method="GET">
                <input
                  type="text"
                  name="q"
                  placeholder="Buscar productos..."
                  defaultValue={params.q}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </form>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-3">Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/productos"
                    className={`text-sm ${!params.categoria ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-600'}`}
                  >
                    Todas
                  </Link>
                </li>
                {categories.docs.map((cat: any) => (
                  <li key={cat.id}>
                    <Link
                      href={`/productos?categoria=${cat.slug}`}
                      className={`text-sm ${params.categoria === cat.slug ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-600'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pet Size */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-3">Talla mascota</h3>
              <div className="flex flex-wrap gap-2">
                {petSizes.map((size) => (
                  <Link
                    key={size}
                    href={`/productos?talla=${size}`}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      params.talla === size
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'border-gray-200 text-gray-600 hover:border-brand-500'
                    }`}
                  >
                    {size}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 mb-3">Filtrar</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tagLabels).map(([value, label]) => (
                  <Link
                    key={value}
                    href={`/productos?tag=${value}`}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      params.tag === value
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'border-gray-200 text-gray-600 hover:border-brand-500'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              {products.totalDocs} producto{products.totalDocs !== 1 ? 's' : ''}
            </p>
          </div>

          {products.docs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.docs.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  image={product.featuredImage}
                  tags={product.tags}
                  stock={product.stock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-heading font-semibold text-gray-800">
                No encontramos productos
              </h3>
              <p className="text-gray-500 mt-2">
                Intenta con otros filtros o explora todas las categorías
              </p>
              <Link href="/productos" className="btn-primary inline-block mt-6">
                Ver todos los productos
              </Link>
            </div>
          )}

          {/* Pagination */}
          {products.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: products.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/productos?page=${p}${params.tag ? `&tag=${params.tag}` : ''}${params.categoria ? `&categoria=${params.categoria}` : ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                    p === page
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-brand-50 border border-gray-200'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
