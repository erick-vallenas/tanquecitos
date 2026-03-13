import Link from 'next/link'
import { User, ShoppingBag, Heart, MapPin, LogIn } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mi cuenta' }

export default function CuentaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-8">Mi cuenta</h1>

      {/* For now, show quick links - auth will be added with Payload customer auth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/cuenta/login" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
            <LogIn className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-gray-900">Iniciar sesión</h3>
            <p className="text-sm text-gray-500">Accede a tu cuenta</p>
          </div>
        </Link>

        <Link href="/cuenta/registro" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-accent-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-gray-900">Crear cuenta</h3>
            <p className="text-sm text-gray-500">Regístrate gratis</p>
          </div>
        </Link>

        <Link href="/cuenta/pedidos" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-gray-900">Mis pedidos</h3>
            <p className="text-sm text-gray-500">Revisa el estado de tus pedidos</p>
          </div>
        </Link>

        <Link href="/cuenta/favoritos" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-gray-900">Favoritos</h3>
            <p className="text-sm text-gray-500">Productos que te gustan</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
