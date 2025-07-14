import React from 'react';
import PageLayout from '../components/PageLayout';
import AnimatedSection from '../components/AnimatedSection';

const TermsAndConditionsPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto text-gray-300">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-gray-400 mt-2">Última actualización: 10 de Septiembre de 2024</p>
        </header>

        <AnimatedSection className="space-y-6 prose prose-invert prose-lg max-w-none">
          <p>
            Estos Términos y Condiciones rigen el uso de los servicios de desarrollo web ofrecidos por IA Power Web. Al contratar nuestros servicios, usted acepta estar sujeto a estos términos.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">1. Descripción de los Servicios</h2>
          <p>
            IA Power Web se compromete a desarrollar un sitio web según las especificaciones del plan contratado por el cliente. Las características de cada plan están detalladas en las páginas correspondientes de nuestro sitio web.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">2. Pagos y Facturación</h2>
          <p>
            El pago de los servicios se estructura de la siguiente manera:
          </p>
          <ul>
            <li><strong>Pago Inicial:</strong> Se requiere un pago del 50% del valor total del plan antes de iniciar el desarrollo. Este pago no es reembolsable y asegura la reserva de recursos para su proyecto.</li>
            <li><strong>Pago Final:</strong> El 50% restante se deberá abonar a la entrega del proyecto, una vez que el cliente haya revisado y aprobado el sitio web desplegado en un entorno de prueba. El cliente dispone de un plazo de 48 horas para la revisión y aprobación.</li>
          </ul>
          <p>
            Los pagos se realizan en dólares estadounidenses (USD) a través de la pasarela de pagos ePayco.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">3. Obligaciones del Cliente</h2>
          <p>
            Para la correcta ejecución del proyecto, el cliente se compromete a:
          </p>
          <ul>
            <li>Proporcionar todo el material necesario (textos, imágenes, logos) en los plazos acordados.</li>
            <li>Proporcionar retroalimentación y aprobaciones de manera oportuna para no retrasar el cronograma del proyecto.</li>
            <li>Adquirir los servicios de hosting y dominio, a menos que el plan contratado especifique su inclusión.</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">4. Propiedad Intelectual</h2>
          <p>
            Una vez completado el pago final, el cliente será el propietario exclusivo de todo el diseño y contenido del sitio web. IA Power Web se reserva el derecho de mostrar el proyecto en su portafolio.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">5. Limitación de Responsabilidad</h2>
          <p>
            IA Power Web no será responsable por pérdidas de datos, interrupciones del servicio o cualquier daño indirecto que surja del uso del sitio web una vez entregado. El mantenimiento y la seguridad del sitio, pasados los periodos de soporte incluidos en cada plan, son responsabilidad del cliente.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">6. Contacto</h2>
          <p>
            Si tiene preguntas sobre estos términos, por favor contáctenos en: <a href="mailto:edduainnova@gmail.com" className="text-cyan-400 hover:underline">edduainnova@gmail.com</a>.
          </p>
        </AnimatedSection>
      </div>
    </PageLayout>
  );
};

export default TermsAndConditionsPage;