import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a Tanquecitos, la tienda para mascotas grandes',
}

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Image src="/logo.jpg" alt="Tanquecitos" width={120} height={120} className="rounded-full mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Sobre Tanquecitos</h1>
        <p className="text-lg text-gray-500 mt-3 max-w-2xl mx-auto">
          Productos pensados para las mascotas más grandes, gorditas y adorables
        </p>
      </div>

      <div className="prose prose-gray prose-lg max-w-none">
        <h2>Nuestra historia</h2>
        <p>
          Tanquecitos nació del amor por las mascotas de razas grandes. Sabemos lo difícil que puede ser
          encontrar productos de calidad, resistentes y con estilo para Pitbulls, American Bullies,
          Rottweilers, Dogos y otras razas grandes y fuertes.
        </p>
        <p>
          Por eso creamos esta tienda: para ofrecerte productos que realmente están diseñados para
          soportar la fuerza y energía de tu tanquecito, sin sacrificar el estilo ni la comodidad.
        </p>

        <h2>Nuestros valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-6 mb-8">
          <div className="bg-brand-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💪</div>
            <h3 className="font-heading font-semibold text-gray-900">Resistencia</h3>
            <p className="text-sm text-gray-600 mt-2">Productos diseñados para la fuerza de razas grandes</p>
          </div>
          <div className="bg-brand-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="font-heading font-semibold text-gray-900">Amor animal</h3>
            <p className="text-sm text-gray-600 mt-2">Cada producto elegido con amor y cuidado</p>
          </div>
          <div className="bg-brand-50 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-heading font-semibold text-gray-900">Calidad</h3>
            <p className="text-sm text-gray-600 mt-2">Solo vendemos lo que usaríamos con nuestras mascotas</p>
          </div>
        </div>

        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>Especialistas en mascotas grandes y de razas fuertes</li>
          <li>Productos probados en resistencia y durabilidad</li>
          <li>Atención personalizada por WhatsApp</li>
          <li>Envíos rápidos en Lima</li>
          <li>Asesoría en tallas y productos para tu mascota</li>
        </ul>
      </div>
    </div>
  )
}
