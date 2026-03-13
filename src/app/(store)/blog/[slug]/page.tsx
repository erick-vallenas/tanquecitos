import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
  const post = result.docs[0] as any
  if (!post) return { title: 'Artículo no encontrado' }
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.featuredImage?.url ? [{ url: post.featuredImage.url }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug }, isPublished: { equals: true } },
    limit: 1,
  })

  const post = result.docs[0] as any
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-brand-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{post.title}</span>
      </nav>

      {post.tags?.length > 0 && (
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
        <span>Por {post.author}</span>
        <span>&middot;</span>
        <time>{new Date(post.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      </div>

      {post.featuredImage?.url && (
        <div className="relative aspect-video rounded-xl overflow-hidden mt-8">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      )}

      <div className="prose prose-gray prose-lg max-w-none mt-8" />

      {/* Share */}
      <div className="border-t mt-12 pt-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Comparte este artículo:</p>
        <div className="flex gap-3">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">Facebook</a>
          <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 transition-colors">WhatsApp</a>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/blog" className="text-brand-600 hover:text-brand-700 font-medium">&larr; Volver al blog</Link>
      </div>
    </article>
  )
}
