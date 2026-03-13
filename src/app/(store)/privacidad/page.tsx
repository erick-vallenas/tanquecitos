import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
}

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Política de privacidad</h1>
      <div className="prose prose-gray max-w-none">
        <p><strong>Última actualización:</strong> Marzo 2026</p>

        <h2>1. Información que recopilamos</h2>
        <p>Al realizar una compra o registrarte en Tanquecitos, recopilamos:</p>
        <ul>
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Dirección de envío</li>
          <li>DNI (cuando es necesario para facturación)</li>
        </ul>

        <h2>2. Uso de la información</h2>
        <p>Utilizamos tu información personal para:</p>
        <ul>
          <li>Procesar y enviar tus pedidos</li>
          <li>Comunicarnos contigo sobre el estado de tu pedido</li>
          <li>Enviarte ofertas y novedades (solo si aceptaste recibirlas)</li>
          <li>Mejorar nuestros servicios y experiencia de compra</li>
        </ul>

        <h2>3. Protección de datos</h2>
        <p>Nos comprometemos a proteger tu información personal. Implementamos medidas de seguridad técnicas y organizativas para prevenir el acceso no autorizado, la pérdida o alteración de tus datos.</p>

        <h2>4. Compartir información</h2>
        <p>No vendemos ni compartimos tu información personal con terceros, excepto:</p>
        <ul>
          <li>Servicios de envío (para entregar tu pedido)</li>
          <li>Procesadores de pago (Culqi, para pagos con tarjeta)</li>
          <li>Cuando sea requerido por ley</li>
        </ul>

        <h2>5. Tus derechos</h2>
        <p>Conforme a la Ley N° 29733, Ley de Protección de Datos Personales del Perú, tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Rectificar datos inexactos</li>
          <li>Cancelar el tratamiento de tus datos</li>
          <li>Oponerte al tratamiento de tus datos</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>Utilizamos cookies para mejorar tu experiencia de navegación y recordar tu carrito de compras. Puedes configurar tu navegador para rechazar cookies.</p>

        <h2>7. Contacto</h2>
        <p>Para ejercer tus derechos o hacer consultas sobre esta política, contáctanos por WhatsApp o al correo hola@tanquecitos.com.</p>
      </div>
    </div>
  )
}
