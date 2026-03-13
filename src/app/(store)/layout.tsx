import type { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/store/Providers'
import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import { WhatsAppButton } from '@/components/store/WhatsAppButton'
import { CartDrawer } from '@/components/store/CartDrawer'
import { ToastContainer } from '@/components/store/ToastContainer'

const heading = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

const body = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: {
    default: 'Tanquecitos - Productos para mascotas grandes',
    template: '%s | Tanquecitos',
  },
  description:
    'Tienda online de productos para mascotas grandes y gorditas. Arneses, collares, ropa y accesorios para Pitbulls, American Bullies y razas grandes.',
  keywords: [
    'mascotas grandes',
    'pitbull',
    'american bully',
    'arneses perros grandes',
    'collares perros grandes',
    'accesorios mascotas',
    'tienda mascotas peru',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Tanquecitos',
  },
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
