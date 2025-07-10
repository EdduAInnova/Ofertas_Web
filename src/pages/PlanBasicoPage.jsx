import React from 'react';
import PageLayout from '../components/PageLayout';
import { Feather, CheckCircle, AlertTriangle, DollarSign, CreditCard, Home } from 'lucide-react';

const Benefit = ({ title, children }) => (
  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
    <h3 className="font-bold text-lg text-green-400 mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{children}</p>
  </div>
);

const Requirement = ({ icon, title, children }) => (
  <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-4">
    <div className="text-yellow-400 mt-1">{icon}</div>
    <div>
      <h3 className="font-bold text-yellow-400">{title}</h3>
      <p className="text-gray-300 text-sm">{children}</p>
    </div>
  </div>
);

export default function PlanBasicoPage() {
  const handlePayment = () => {
    // Verifica que el script de ePayco se haya cargado y esté disponible en la ventana
    if (window.ePayco) {
      const handler = window.ePayco.checkout.configure({
        key: '9a411b6075a8a6222aff5df6631175fa',
        test: false,
      });

      const data = {
        // Parámetros de la compra
        name: "Plan Básico - Sitio Web",
        description: "Pago inicial (50%) para el Plan Básico de desarrollo web.",
        invoice: `casaregis-basico-${Date.now()}`, // Factura única para cada transacción
        currency: "usd",
        amount: "125",
        tax_base: "125",
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
          <Feather className="w-12 h-12 text-green-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-500">Plan Básico</h1>
        </div>
        <p className="text-xl text-gray-400 mt-2">Tu presencia esencial en internet para empezar a crecer.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">¿Qué obtienes con este plan?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Benefit title="Diseño Personalizado Básico">
            Crearemos un sitio web con un diseño limpio y profesional que refleje la identidad de tu marca, usando tus colores y logo. Es la base perfecta para presentarte al mundo.
          </Benefit>
          <Benefit title="Sitio Web Adaptable (Responsive)">
            Tu página se verá increíble y funcionará a la perfección en cualquier dispositivo: celulares, tablets y computadores. Esto es crucial, ya que la mayoría de tus clientes te visitarán desde su móvil.
          </Benefit>
          <Benefit title="Secciones Esenciales">
            Incluiremos las páginas más importantes: un **Inicio** atractivo, una sección para mostrar tus **Habitaciones** o servicios, y una página de **Contacto** con tu información y un mapa.
          </Benefit>
          <Benefit title="Enlace a Plataformas de Reserva">
            Si ya usas Booking, Airbnb u otra plataforma, pondremos botones y enlaces directos para que tus clientes puedan reservar fácilmente donde ya se sienten cómodos.
          </Benefit>
          <Benefit title="Contacto Directo por WhatsApp">
            Añadiremos un botón flotante de WhatsApp para que los visitantes puedan hablar contigo con un solo clic, resolviendo dudas y aumentando la confianza para que reserven.
          </Benefit>
          <Benefit title="SEO Básico">
            Configuraremos los elementos básicos para que los motores de búsqueda como Google puedan encontrar y entender tu sitio, ayudándote a aparecer en las búsquedas locales.
          </Benefit>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">Aclaraciones Importantes</h2>
        <div className="bg-black/20 p-6 rounded-lg border border-white/10 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-400 w-5 h-5 mt-1 shrink-0" />
            <p className="text-gray-300">
              Este plan **no incluye** el costo del **Hosting** (el servidor donde se aloja tu web) ni el **Dominio** (el nombre `www.tu-negocio.com`). Estos servicios se pagan anualmente a un proveedor externo.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-400 w-5 h-5 mt-1 shrink-0" />
            <p className="text-gray-300">
              ¡No te preocupes! Te asesoramos y recomendamos los mejores y más económicos proveedores (como Hostinger, SiteGround, etc.) para que hagas la mejor elección. El proceso es muy sencillo.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Pasos Para Iniciar</h2>
        <div className="space-y-4">
          <Requirement icon={<Home size={24} />} title="1. Hosting y Dominio Listos">
            Para comenzar, es necesario que ya hayas adquirido tu plan de hosting y tu dominio. Si deseas correos corporativos (ej: `contacto@tu-negocio.com`), te recomendamos adquirir un plan de hosting que los incluya.
          </Requirement>
          <Requirement icon={<DollarSign size={24} />} title="2. Pago Inicial del 50%">
            Requerimos un pago inicial del 50% del valor del plan para agendar tu proyecto y comenzar con el desarrollo. Esto nos permite asignar los recursos y el tiempo necesario para tu sitio.
          </Requirement>
          <Requirement icon={<CreditCard size={24} />} title="3. Pago Final a la Entrega">
            El 50% restante se cancela una vez que el proyecto esté terminado, probado y listo para su lanzamiento. Te lo entregaremos desplegado en tu hosting para que lo revises. Tienes entre 24 y 48 horas para dar el visto bueno antes del lanzamiento oficial.
          </Requirement>
        </div>
      </section>

      <section className="text-center mt-16">
        <div className="bg-green-900/20 border border-green-500/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold">Total del Plan Básico</h3>
          <p className="text-5xl font-bold my-4 text-green-400">$250 USD</p>
          <p className="text-gray-400 mb-6">Pago inicial del 50%: $125 USD</p>
          <button
            onClick={handlePayment}
            className={`w-full max-w-md mx-auto text-center block px-6 py-4 text-white text-xl rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-green-700 hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]`}
          >
            Comenzar Ahora (Pagar 50%)
          </button>
        </div>
      </section>

    </PageLayout>
  );
}