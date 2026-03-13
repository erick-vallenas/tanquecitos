import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl mb-6">🐾</div>
      <h1 className="text-4xl font-heading font-bold text-gray-900">Página no encontrada</h1>
      <p className="text-gray-500 mt-3 text-lg">
        Parece que esta página se escapó como un cachorro travieso
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/" className="btn-primary">Ir al inicio</Link>
        <Link href="/productos" className="btn-secondary">Ver productos</Link>
      </div>
    </div>
  )
}
