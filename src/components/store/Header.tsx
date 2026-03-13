'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState, useEffect, useRef } from 'react'

export function Header() {
  const { itemCount, toggleCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.length < 2) {
      setSearchResults([])
      return
    }
    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?where[name][like]=${encodeURIComponent(query)}&where[isActive][equals]=true&limit=5`)
        const data = await res.json()
        setSearchResults(data.docs || [])
      } catch {
        setSearchResults([])
      }
      setSearching(false)
    }, 300)
  }

  const navLinks = [
    { href: '/productos', label: 'Productos' },
    { href: '/productos?tag=new', label: 'Novedades' },
    { href: '/productos?tag=sale', label: 'Ofertas' },
    { href: '/blog', label: 'Blog' },
    { href: '/nosotros', label: 'Nosotros' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-600 text-white text-center py-2 text-sm font-medium">
        Envío gratis en pedidos mayores a S/150 en Lima
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="Tanquecitos"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="text-xl md:text-2xl font-heading font-bold text-brand-700 hidden sm:block">
                Tanquecitos
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-brand-600 font-medium transition-colors text-sm lg:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-gray-600 hover:text-brand-600 transition-colors"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border p-4 z-50">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Buscar productos..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    {searching && (
                      <p className="text-sm text-gray-400 mt-3 text-center">Buscando...</p>
                    )}
                    {searchResults.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {searchResults.map((product: any) => (
                          <Link
                            key={product.id}
                            href={`/producto/${product.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                              {product.featuredImage?.url ? (
                                <Image src={product.featuredImage.url} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">🐾</div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                              <p className="text-sm text-brand-600 font-bold">S/ {product.price?.toFixed(2)}</p>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href={`/productos?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                          className="block text-center text-sm text-brand-600 hover:text-brand-700 font-medium pt-2 border-t"
                        >
                          Ver todos los resultados
                        </Link>
                      </div>
                    )}
                    {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
                      <p className="text-sm text-gray-400 mt-3 text-center">No se encontraron productos</p>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/cuenta/favoritos" className="p-2 text-gray-600 hover:text-brand-600 transition-colors hidden sm:block" aria-label="Favoritos">
                <Heart className="w-5 h-5" />
              </Link>

              {/* Account */}
              <Link href="/cuenta" className="p-2 text-gray-600 hover:text-brand-600 transition-colors" aria-label="Mi cuenta">
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 text-gray-600 hover:text-brand-600 transition-colors relative"
                aria-label="Carrito"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Tanquecitos" width={36} height={36} className="rounded-full" />
            <span className="text-lg font-heading font-bold text-brand-700">Tanquecitos</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-50 hover:text-brand-600 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-4" />
          <Link
            href="/cuenta"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-50 hover:text-brand-600 font-medium transition-colors"
          >
            <User className="w-5 h-5" /> Mi cuenta
          </Link>
          <Link
            href="/cuenta/favoritos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-50 hover:text-brand-600 font-medium transition-colors"
          >
            <Heart className="w-5 h-5" /> Favoritos
          </Link>
        </nav>
      </div>
    </>
  )
}
