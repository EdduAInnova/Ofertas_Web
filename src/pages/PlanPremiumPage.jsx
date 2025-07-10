import React from 'react';
import PageLayout from '../components/PageLayout';
import Benefit from '../components/plan/Benefit';
import Requirement from '../components/plan/Requirement';
import { Gem, CheckCircle, DollarSign, CreditCard } from 'lucide-react';

export default function PlanPremiumPage() {
  const handlePayment = () => {
    // Verifica que el script de ePayco se haya cargado y esté disponible en la ventana
    if (window.ePayco) {
      const handler = window.ePayco.checkout.configure({
        key: '9a411b6075a8a6222aff5df6631175fa',
        test: false,
      });

      const data = {
        // Parámetros de la compra
        name: "Plan Premium - Sitio Web",
        description: "Pago inicial (50%) para el Plan Premium de desarrollo web.",
        invoice: `ofertas-web-premium-${Date.now()}`, // Factura única
        currency: "usd",
        amount: "475",
        tax_base: "475",
        tax: "0.00",
        tax_ico: "0.00",
        country: "co",
        lang: "es",

        // Abre el checkout en la misma página
        external: "false",

        // URL a la que volverá el cliente después del pago
        response: window.location.origin + '/gracias',
      };

      handler.open(data);
    } else {
      alert('La pasarela de pago no está disponible. Por favor, recarga la página e intenta de nuevo.');
    }
  };

  return (
    <PageLayout>
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-4">
          <Gem className="w-12 h-12 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-purple-500">Plan Premium</h1>
        </div>
        <p className="text-xl text-gray-400 mt-2">La experiencia web definitiva para liderar y automatizar.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Todo lo del Plan Profesional, y además:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Benefit title="Diseño 'App-like' con Animaciones" color="purple">
            Elevamos tu web a otro nivel con un diseño que se siente como una aplicación móvil. Usamos animaciones sutiles y transiciones fluidas que crean una experiencia de usuario moderna y memorable.
          </Benefit>
          <Benefit title="Motor de Reservas con Calendario" color="purple">
            La máxima autonomía. Integramos un sistema de reservas completo con calendario de disponibilidad en tiempo real. Gestiona tus reservas, precios y temporadas directamente desde tu panel.
          </Benefit>
          <Benefit title="Chat con IA 24/7" color="purple">
            Tu recepcionista virtual. Configuramos un chatbot inteligente que puede responder preguntas frecuentes, dar información y hasta pre-agendar reservas, incluso mientras duermes.
          </Benefit>
          <Benefit title="Sitio Multilenguaje" color="purple">
            Abre tus puertas al mundo. Preparamos tu sitio web para que funcione en varios idiomas (ej: Español e Inglés), permitiéndote captar clientes internacionales.
          </Benefit>
          <Benefit title="Soporte Extendido y Mantenimiento" color="purple">
            Tu tranquilidad es nuestra prioridad. Te ofrecemos 90 días de soporte técnico post-lanzamiento y un plan de mantenimiento mensual gratuito para asegurar que tu web siempre funcione a la perfección.
          </Benefit>
           <Benefit title="Correos Corporativos Ilimitados" color="purple">
            Proyecta una imagen 100% profesional con todas las cuentas de correo que necesites (ej: `reservas@`, `gerencia@`, etc.), incluidas en tu plan de hosting.
          </Benefit>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">Aclaraciones Importantes</h2>
        <div className="space-y-4">
          <Requirement icon={<CheckCircle size={24} />} title="Plan Todo Incluido">
            Este es nuestro plan todo incluido. **Hosting, Dominio, Mantenimiento y Soporte Extendido están cubiertos** durante el primer año. Nos encargamos de absolutamente todo.
          </Requirement>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Pasos Para Iniciar</h2>
        <div className="space-y-4">
          <Requirement icon={<DollarSign size={24} />} title="1. Pago Inicial del 50%">
            Requerimos un pago inicial del 50% del valor del plan para agendar tu proyecto y comenzar con el desarrollo. Esto nos permite asignar los recursos premium y el tiempo necesario para tu sitio.
          </Requirement>
          <Requirement icon={<CreditCard size={24} />} title="2. Pago Final a la Entrega">
            El 50% restante se cancela una vez que el proyecto esté terminado, probado y listo para su lanzamiento. Tienes entre 24 y 48 horas para dar el visto bueno antes del lanzamiento oficial.
          </Requirement>
        </div>
      </section>

      <section className="text-center mt-16">
        <div className="bg-purple-900/20 border border-purple-500/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold">Total del Plan Premium</h3>
          <p className="text-5xl font-bold my-4 text-purple-400">$950 USD</p>
          <p className="text-gray-400 mb-6">Pago inicial del 50%: $475 USD</p>
          <button
            onClick={handlePayment}
            className={`w-full max-w-md mx-auto text-center block px-6 py-4 text-white text-xl rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-purple-700 hover:bg-purple-600 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]`}
          >
            Comenzar Ahora (Pagar 50%)
          </button>
        </div>
      </section>

    </PageLayout>
  );
}