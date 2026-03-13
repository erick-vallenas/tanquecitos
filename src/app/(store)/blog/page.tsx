import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Consejos, guías y tips para el cuidado de mascotas grandes',
}

export default async function BlogPage() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'blog-posts',
    where: { isPublished: { equals: true } },
    sort: '-createdAt',
    limit: 20,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-gray-500 mb-8">Consejos, guías y tips para el cuidado de tu tanquecito</p>

      {posts.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.docs.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-video bg-gray-100">
                {post.featuredImage?.url ? (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">📝</div>
                )}
              </div>
              <div className="p-5">
                {post.tags?.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="font-heading font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-6xl">📝</span>
          <h2 className="text-xl font-heading font-semibold text-gray-800 mt-4">Próximamente</h2>
          <p className="text-gray-500 mt-2">Estamos preparando contenido especial para ti y tu mascota</p>
        </div>
      )}
    </div>
  )
}
