import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { ProductCard } from '@/components/store/ProductCard'

export const dynamic = 'force-dynamic'

const categoryImages: Record<string, string> = {
  arneses: '/images/categories/arneses.jpg',
  collares: '/images/categories/collares.jpg',
  correas: '/images/categories/correas.jpg',
  ropa: '/images/categories/ropa.jpg',
  juguetes: '/images/categories/juguetes.jpg',
  camas: '/images/categories/camas.jpg',
  alimentacion: '/images/categories/alimentacion.jpg',
  higiene: '/images/categories/higiene.jpg',
}

const emptyResult = { docs: [], totalDocs: 0 }

export default async function HomePage() {
  let featuredProducts = emptyResult as any
  let newProducts = emptyResult as any
  let saleProducts = emptyResult as any
  let categories = emptyResult as any

  try {
    const payload = await getPayloadClient()
    ;[featuredProducts, newProducts, saleProducts, categories] = await Promise.all([
      payload.find({ collection: 'products', where: { isActive: { equals: true }, tags: { equals: 'featured' } }, limit: 8, sort: '-createdAt' }),
      payload.find({ collection: 'products', where: { isActive: { equals: true }, tags: { equals: 'new' } }, limit: 4, sort: '-createdAt' }),
      payload.find({ collection: 'products', where: { isActive: { equals: true }, tags: { equals: 'sale' } }, limit: 4, sort: '-createdAt' }),
      payload.find({ collection: 'categories', where: { isActive: { equals: true }, parent: { exists: false } }, sort: 'order', limit: 8 }),
    ])
  } catch {
    // DB tables may not exist yet on first deploy
  }

  return (
    <>
      {/* Hero Banner - Full Width */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/hero/hero-dog.jpg"
          alt="Productos para mascotas grandes"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                Nueva colección
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-[1.1] tracking-tight">
                Para los más
                <br />
                <span className="text-accent-400">GRANDES</span>
                <br />
                de la casa
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-md">
                Arneses, collares y accesorios diseñados para razas grandes y fuertes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/productos"
                  className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-accent-500 hover:text-white transition-all duration-200 text-sm uppercase tracking-wide"
                >
                  Ver colección
                </Link>
                <Link
                  href="/productos?tag=sale"
                  className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200 text-sm uppercase tracking-wide"
                >
                  Ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills - Horizontal Scroll */}
      {categories.docs.length > 0 && (
        <section className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
              <Link
                href="/productos"
                className="shrink-0 bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-brand-700 transition-colors"
              >
                Todo
              </Link>
              {categories.docs.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/productos?categoria=${category.slug}`}
                  className="shrink-0 bg-gray-100 text-gray-700 text-sm font-semibold px-5 py-2 rounded-full hover:bg-brand-600 hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.docs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900 uppercase tracking-tight">
                Destacados
              </h2>
              <p className="text-gray-500 text-sm mt-1">Los favoritos de nuestros tanquecitos</p>
            </div>
            <Link
              href="/productos?tag=featured"
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm uppercase tracking-wide"
            >
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {featuredProducts.docs.map((product: any) => (
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
        </section>
      )}

      {/* Category Grid - Magazine Style (petfashion.pe inspired) */}
      {categories.docs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900 uppercase tracking-tight">
              Categorías
            </h2>
            <p className="text-gray-500 text-sm mt-2">Encuentra lo que tu tanquecito necesita</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {categories.docs.map((category: any, index: number) => {
              const fallbackImage = categoryImages[category.slug]
              const imageUrl = category.image?.url || fallbackImage
              // First 2 items are taller on desktop
              const isLarge = index < 2
              return (
                <Link
                  key={category.id}
                  href={`/productos?categoria=${category.slug}`}
                  className={`group relative rounded-2xl overflow-hidden bg-gray-200 ${
                    isLarge ? 'aspect-[3/4] md:aspect-[4/3]' : 'aspect-[4/3] md:aspect-[3/2]'
                  }`}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white font-heading font-black text-xl md:text-2xl uppercase tracking-wide drop-shadow-lg">
                      {category.name}
                    </h3>
                    <span className="inline-block mt-2 text-white/80 text-xs md:text-sm font-semibold uppercase tracking-widest group-hover:text-accent-400 transition-colors">
                      Ver productos &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Promo Banner - Full Width */}
      <section className="relative w-full h-[50vh] md:h-[45vh] overflow-hidden">
        <Image
          src="/images/hero/promo-dog.jpg"
          alt="Productos resistentes para razas fuertes"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-md">
              <span className="inline-block bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                Resistencia máxima
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight uppercase tracking-tight">
                Para razas
                <br />
                fuertes
              </h2>
              <p className="mt-3 text-white/80 text-sm md:text-base">
                Arneses, collares y accesorios que soportan la fuerza de Pitbulls,
                American Bullies, Rottweilers y más.
              </p>
              <Link
                href="/productos?categoria=arneses"
                className="inline-block mt-5 bg-accent-500 text-white font-bold py-3 px-8 rounded-full hover:bg-accent-600 transition-colors text-sm uppercase tracking-wide"
              >
                Explorar arneses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.docs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900 uppercase tracking-tight">
                <span className="text-red-500">Ofertas</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Aprovecha los mejores precios</p>
            </div>
            <Link
              href="/productos?tag=sale"
              className="text-red-500 hover:text-red-600 font-semibold text-sm uppercase tracking-wide"
            >
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {saleProducts.docs.map((product: any) => (
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
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.docs.length > 0 && (
        <section className="bg-gray-50 py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-gray-900 uppercase tracking-tight">
                  Novedades
                </h2>
                <p className="text-gray-500 text-sm mt-1">Lo más reciente en la tienda</p>
              </div>
              <Link
                href="/productos?tag=new"
                className="text-brand-600 hover:text-brand-700 font-semibold text-sm uppercase tracking-wide"
              >
                Ver todos &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {newProducts.docs.map((product: any) => (
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
          </div>
        </section>
      )}

      {/* Trust / Features Strip */}
      <section className="bg-white py-10 md:py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                <svg width={20} height={20} className="text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75M3.375 14.25h.375m0 0h3.75m-3.75 0V11.625m3.75 2.625V11.625m0 0h3.75m-3.75 0V8.25m3.75 3.375V8.25m0 0h3.75M11.25 8.25v3.375m3.75-3.375V5.625m0 2.625h3.75m-3.75 0V5.625m0 0h3.75M18.75 5.625v5.625" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Envío rápido</h3>
                <p className="text-xs text-gray-500 mt-0.5">1-3 días hábiles en Lima</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-accent-50 rounded-full flex items-center justify-center">
                <svg width={20} height={20} className="text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Extra resistente</h3>
                <p className="text-xs text-gray-500 mt-0.5">Para razas grandes y fuertes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <svg width={20} height={20} className="text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Atención directa</h3>
                <p className="text-xs text-gray-500 mt-0.5">WhatsApp y redes sociales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <svg width={20} height={20} className="text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Pago seguro</h3>
                <p className="text-xs text-gray-500 mt-0.5">Yape, transferencia y tarjeta</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
