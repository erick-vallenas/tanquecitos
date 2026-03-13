import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Tanquecitos</h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              Productos pensados para mascotas grandes, gorditas y de razas
              fuertes. Porque tu tanquecito merece lo mejor.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2 text-sm text-brand-200">
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/productos?tag=new" className="hover:text-white transition-colors">
                  Novedades
                </Link>
              </li>
              <li>
                <Link href="/productos?tag=sale" className="hover:text-white transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/productos?tag=bestseller" className="hover:text-white transition-colors">
                  Más vendidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-sm text-brand-200">
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-white transition-colors">
                  Política de envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-white transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/libro-reclamaciones" className="hover:text-white transition-colors">
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-brand-200">
              <li>Lima, Perú</li>
              <li>
                <a href="mailto:hola@tanquecitos.com" className="hover:text-white transition-colors">
                  hola@tanquecitos.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brand-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-300 text-sm">
            &copy; {new Date().getFullYear()} Tanquecitos. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-brand-300">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-6 text-center">
          <p className="text-brand-400 text-xs">
            Desarrollado con <span className="text-red-400">&hearts;</span> por{' '}
            <a
              href="https://www.qode.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-white transition-colors font-medium"
            >
              Qode
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
