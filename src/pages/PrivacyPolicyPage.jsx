import React from 'react';
import PageLayout from '../components/PageLayout';
import AnimatedSection from '../components/AnimatedSection';

const PrivacyPolicyPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto text-gray-300">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
            Política de Privacidad
          </h1>
          <p className="text-lg text-gray-400 mt-2">Última actualización: 10 de Septiembre de 2024</p>
        </header>

        <AnimatedSection className="space-y-6 prose prose-invert prose-lg max-w-none">
          <p>
            Bienvenido a EdduAInnova. Su privacidad es de suma importancia para nosotros. Esta política de privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">1. Recopilación de Información</h2>
          <p>
            Recopilamos información personal que usted nos proporciona voluntariamente al agendar una reunión o contactarnos. Esta información puede incluir:
          </p>
          <ul>
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información sobre el plan de interés</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">2. Uso de su Información</h2>
          <p>
            Usamos la información recopilada para:
          </p>
          <ul>
            <li>Gestionar y confirmar su agendamiento de reuniones.</li>
            <li>Comunicarnos con usted en relación con su solicitud de servicio.</li>
            <li>Procesar transacciones de pago a través de nuestra pasarela de pagos (ePayco).</li>
            <li>Enviar correos electrónicos administrativos, como confirmaciones de pago o de citas.</li>
            <li>Mejorar nuestro sitio web y servicios.</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">3. Divulgación de su Información</h2>
          <p>
            No venderemos, alquilaremos ni compartiremos su información personal con terceros, excepto en las siguientes situaciones:
          </p>
          <ul>
            <li><strong>Con proveedores de servicios:</strong> Podemos compartir su información con terceros que realizan servicios para nosotros o en nuestro nombre, como procesamiento de pagos (ePayco) y servicios de alojamiento web.</li>
            <li><strong>Por requerimiento legal:</strong> Podemos divulgar su información si así lo exige la ley o en respuesta a solicitudes válidas de las autoridades públicas.</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">4. Seguridad de su Información</h2>
          <p>
            Utilizamos medidas de seguridad administrativas, técnicas y físicas para proteger su información personal. Si bien hemos tomado medidas razonables para asegurar la información personal que nos proporciona, tenga en cuenta que ningún sistema de seguridad es impenetrable.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">5. Sus Derechos</h2>
          <p>
            Usted tiene derecho a acceder, rectificar o suprimir sus datos personales, así como a oponerse al tratamiento de los mismos. Para ejercer estos derechos, puede contactarnos a través de la información proporcionada a continuación.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">6. Cambios a esta Política de Privacidad</h2>
          <p>
            Nos reservamos el derecho de realizar cambios a esta política de privacidad en cualquier momento. Le notificaremos sobre cualquier cambio publicando la nueva política de privacidad en esta página.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">7. Contacto</h2>
          <p>
            Si tiene preguntas o comentarios sobre esta política de privacidad, por favor contáctenos en: <a href="mailto:edduainnova@gmail.com" className="text-cyan-400 hover:underline">edduainnova@gmail.com</a>.
          </p>
        </AnimatedSection>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicyPage;