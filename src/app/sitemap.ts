import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanquecitos.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages always present
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/productos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/envios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/devoluciones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/terminos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacidad`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  try {
    const payload = await getPayloadClient()

    const products = await payload.find({ collection: 'products', where: { isActive: { equals: true } }, limit: 1000, select: { slug: true, updatedAt: true } })
    const productPages: MetadataRoute.Sitemap = products.docs.map((p: any) => ({
      url: `${SITE_URL}/producto/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const categories = await payload.find({ collection: 'categories', where: { isActive: { equals: true } }, limit: 100, select: { slug: true, updatedAt: true } })
    const categoryPages: MetadataRoute.Sitemap = categories.docs.map((c: any) => ({
      url: `${SITE_URL}/productos?categoria=${c.slug}`,
      lastModified: new Date(c.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const posts = await payload.find({ collection: 'blog-posts', where: { isPublished: { equals: true } }, limit: 500, select: { slug: true, updatedAt: true } })
    const blogPages: MetadataRoute.Sitemap = posts.docs.map((p: any) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...productPages, ...categoryPages, ...blogPages]
  } catch {
    return staticPages
  }
}
