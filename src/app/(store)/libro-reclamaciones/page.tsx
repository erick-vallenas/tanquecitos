'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function LibroReclamacionesPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    tipo: 'reclamo',
    nombre: '', dni: '', email: '', telefono: '', direccion: '',
    producto: '', monto: '', detalle: '', pedido: '',
  })

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production, this would send to an API endpoint
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold text-gray-900">Reclamo registrado</h1>
        <p className="text-gray-600 mt-2">
          Hemos recibido tu {form.tipo}. Te contactaremos en un plazo máximo de 30 días calendario
          según lo establecido por el Código de Protección y Defensa del Consumidor.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Libro de Reclamaciones</h1>
        <p className="text-sm text-gray-500 mt-2">
          Conforme al Art. 150 del Código de Protección y Defensa del Consumidor - Ley N° 29571
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Tipo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipo" value="reclamo" checked={form.tipo === 'reclamo'} onChange={(e) => updateField('tipo', e.target.value)} className="accent-brand-600" />
              <span className="text-sm">Reclamo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipo" value="queja" checked={form.tipo === 'queja'} onChange={(e) => updateField('tipo', e.target.value)} className="accent-brand-600" />
              <span className="text-sm">Queja</span>
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {form.tipo === 'reclamo'
              ? 'Reclamo: disconformidad con los productos o servicios.'
              : 'Queja: malestar respecto a la atención al público.'}
          </p>
        </div>

        {/* Datos personales */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-3">Datos del consumidor</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Nombre completo *</label>
              <input type="text" required value={form.nombre} onChange={(e) => updateField('nombre', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">DNI *</label>
              <input type="text" required value={form.dni} onChange={(e) => updateField('dni', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Teléfono *</label>
              <input type="tel" required value={form.telefono} onChange={(e) => updateField('telefono', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => updateField('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Dirección</label>
              <input type="text" value={form.direccion} onChange={(e) => updateField('direccion', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>
        </fieldset>

        {/* Detalle */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-3">Detalle del {form.tipo}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nº de pedido</label>
              <input type="text" value={form.pedido} onChange={(e) => updateField('pedido', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="TQ-XXXXXX" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Monto reclamado (S/)</label>
              <input type="text" value={form.monto} onChange={(e) => updateField('monto', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Producto o servicio *</label>
              <input type="text" required value={form.producto} onChange={(e) => updateField('producto', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Detalle *</label>
              <textarea required rows={4} value={form.detalle} onChange={(e) => updateField('detalle', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" placeholder="Describe tu reclamo o queja..." />
            </div>
          </div>
        </fieldset>

        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Enviar {form.tipo}
        </button>

        <p className="text-xs text-gray-400 text-center">
          La formulación del reclamo no impide acudir a otras vías de solución de controversias
          ni es requisito previo para interponer una denuncia ante el INDECOPI.
        </p>
      </form>
    </div>
  )
}
