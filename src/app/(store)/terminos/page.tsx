import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
}

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Términos y condiciones</h1>
      <div className="prose prose-gray max-w-none">
        <p><strong>Última actualización:</strong> Marzo 2026</p>

        <h2>1. Generalidades</h2>
        <p>Al acceder y utilizar el sitio web tanquecitos.com, aceptas estos términos y condiciones. Si no estás de acuerdo, te pedimos que no utilices nuestro sitio.</p>

        <h2>2. Productos</h2>
        <ul>
          <li>Las imágenes de los productos son referenciales y pueden variar ligeramente del producto real</li>
          <li>Los precios están expresados en Soles (S/) e incluyen IGV</li>
          <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
          <li>La disponibilidad de productos está sujeta a stock</li>
        </ul>

        <h2>3. Proceso de compra</h2>
        <ol>
          <li>Selecciona los productos y agrégalos al carrito</li>
          <li>Completa tus datos de envío</li>
          <li>Elige tu método de pago (Yape, transferencia o tarjeta)</li>
          <li>Confirma tu pedido</li>
          <li>Envía el comprobante de pago por WhatsApp (para Yape y transferencia)</li>
          <li>Tu pedido será procesado una vez confirmado el pago</li>
        </ol>

        <h2>4. Pagos</h2>
        <p>Aceptamos los siguientes métodos de pago:</p>
        <ul>
          <li><strong>Yape:</strong> Pago inmediato escaneando el QR o al número indicado</li>
          <li><strong>Transferencia bancaria:</strong> A la cuenta indicada durante el checkout</li>
          <li><strong>Tarjeta de crédito/débito:</strong> Procesado de forma segura a través de Culqi</li>
        </ul>

        <h2>5. Envíos</h2>
        <p>Consulta nuestra <a href="/envios">Política de envíos</a> para conocer costos, zonas de cobertura y tiempos de entrega.</p>

        <h2>6. Devoluciones</h2>
        <p>Consulta nuestra <a href="/devoluciones">Política de devoluciones</a> para conocer las condiciones.</p>

        <h2>7. Propiedad intelectual</h2>
        <p>Todo el contenido del sitio (textos, imágenes, logos, diseños) es propiedad de Tanquecitos y está protegido por las leyes de propiedad intelectual del Perú.</p>

        <h2>8. Limitación de responsabilidad</h2>
        <p>Tanquecitos no se hace responsable por daños indirectos derivados del uso de los productos. El uso de los productos es responsabilidad del comprador.</p>

        <h2>9. Legislación aplicable</h2>
        <p>Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia será resuelta ante los tribunales competentes de Lima.</p>
      </div>
    </div>
  )
}
