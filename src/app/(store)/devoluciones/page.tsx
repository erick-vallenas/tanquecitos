import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devoluciones y cambios',
  description: 'Política de devoluciones y cambios de Tanquecitos',
}

export default function DevolucionesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Política de devoluciones y cambios</h1>

      <div className="prose prose-gray max-w-none">
        <h2>Devoluciones</h2>
        <p>Aceptamos devoluciones dentro de los <strong>7 días calendario</strong> posteriores a la recepción del producto, siempre que:</p>
        <ul>
          <li>El producto esté sin uso y en su empaque original</li>
          <li>Se presente el comprobante de compra (número de pedido)</li>
          <li>No presente daños causados por el cliente</li>
        </ul>

        <h2>Cambios</h2>
        <p>Puedes solicitar un cambio de talla o producto dentro de los <strong>7 días calendario</strong>. El producto debe estar:</p>
        <ul>
          <li>Sin uso y en perfectas condiciones</li>
          <li>Con sus etiquetas originales</li>
        </ul>
        <p>El costo de envío del cambio corre por cuenta del cliente, salvo que el producto haya llegado con defecto.</p>

        <h2>Productos defectuosos</h2>
        <p>
          Si recibiste un producto defectuoso o diferente al que pediste, contáctanos inmediatamente
          por WhatsApp. Realizaremos el cambio sin costo adicional.
        </p>

        <h2>Proceso de devolución</h2>
        <ol>
          <li>Contáctanos por WhatsApp indicando tu número de pedido y el motivo de la devolución</li>
          <li>Te indicaremos la dirección y forma de envío para la devolución</li>
          <li>Una vez recibido y verificado el producto, procesaremos el reembolso o cambio</li>
          <li>El reembolso se realizará por el mismo método de pago en un plazo de 5-10 días hábiles</li>
        </ol>

        <h2>Excepciones</h2>
        <p>No se aceptan devoluciones de:</p>
        <ul>
          <li>Productos personalizados</li>
          <li>Productos con signos de uso</li>
          <li>Productos sin empaque original</li>
        </ul>

        <h2>Contacto</h2>
        <p>Para cualquier consulta sobre devoluciones o cambios, escríbenos por WhatsApp.</p>
      </div>
    </div>
  )
}
