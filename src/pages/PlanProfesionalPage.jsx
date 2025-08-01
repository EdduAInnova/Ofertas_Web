import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Benefit from '../components/plan/Benefit';
import Requirement from '../components/plan/Requirement';
import AnimatedSection from '../components/AnimatedSection';
import { Briefcase, CheckCircle, DollarSign, CreditCard } from 'lucide-react';

export default function PlanProfesionalPage() {

  return (
    <PageLayout>
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-4">
          <Briefcase className="w-12 h-12 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500">Plan Profesional</h1>
        </div>
        <p className="text-xl text-gray-400 mt-2">La solución completa para competir y destacar en el mercado.</p>
      </header>

      <AnimatedSection className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Todo lo del Plan Básico, y además:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Benefit title="Diseño Optimizado (UX/UI)" color="blue">
            No solo creamos un sitio bonito, lo diseñamos pensando en el usuario. Hacemos que la navegación sea intuitiva y la experiencia de reserva sea tan sencilla que tus clientes querrán volver.
          </Benefit>
          <Benefit title="Blog, Galería y Testimonios" color="blue">
            Añadimos secciones clave que generan confianza y autoridad: un **Blog** para compartir contenido, una **Galería** de proyectos y una sección de **Testimonios** de clientes satisfechos.
          </Benefit>
          <Benefit title="Formularios Avanzados" color="blue">
            Integramos formularios de contacto y cotización personalizados para capturar la información que necesitas de tus clientes potenciales de forma estructurada.
          </Benefit>
          <Benefit title="Google Maps y SEO Mejorado" color="blue">
            Integramos un mapa interactivo de Google y optimizamos tu sitio con palabras clave relevantes para tu negocio y ubicación, aumentando tus posibilidades de ser encontrado por nuevos clientes.
          </Benefit>
          <Benefit title="Panel de Gestión (CMS) con Capacitación" color="blue">
            Te damos el control. Recibirás acceso a un panel de gestión sencillo donde podrás editar textos e imágenes. Además, te incluimos una capacitación para que aprendas a manejarlo sin complicaciones.
          </Benefit>
          <Benefit title="Dominio y Hosting por 1 Año" color="blue">
            Nos encargamos de todo lo técnico. Este plan **incluye el registro de tu dominio (.com) y el servicio de hosting por todo el primer año**, para que no te preocupes por nada.
          </Benefit>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">Aclaraciones Importantes</h2>
        <div className="space-y-4">
          <Requirement icon={<CheckCircle size={24} />} title="Hosting y Dominio por 1 Año">
            El **Hosting y Dominio están incluidos solo durante el primer año**. A partir del segundo año, la renovación corre por tu cuenta, pero te guiaremos en el sencillo proceso.
          </Requirement>
          <Requirement icon={<CheckCircle size={24} />} title="Correos Corporativos">
            Este plan incluye la configuración de hasta 3 cuentas de **correo corporativo** (ej: `contacto@tu-negocio.com`).
          </Requirement>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Pasos Para Iniciar</h2>
        <div className="space-y-4">
          <Requirement icon={<DollarSign size={24} />} title="1. Pago Inicial del 50%">
            Requerimos un pago inicial del 50% del valor del plan para agendar tu proyecto y comenzar con el desarrollo. Esto nos permite cubrir los costos de dominio, hosting y asignar los recursos para tu sitio.
          </Requirement>
          <Requirement icon={<CreditCard size={24} />} title="2. Pago Final a la Entrega">
            El 50% restante se cancela una vez que el proyecto esté terminado, probado y listo para su lanzamiento. Tienes entre 24 y 48 horas para dar el visto bueno antes del lanzamiento oficial.
          </Requirement>
        </div>
      </AnimatedSection>

      <AnimatedSection className="text-center mt-16">
        <div className="bg-blue-900/20 border border-blue-500/30 p-6 sm:p-8 rounded-2xl">
          <h3 className="text-2xl font-bold">Total del Plan Profesional</h3>
          <p className="text-4xl sm:text-5xl font-bold my-4 text-blue-400">$550 USD</p>
          <p className="text-gray-400 mb-6">Pago inicial del 50%: $275 USD</p>
          <Link
            to="/agendar-reunion"
            state={{ selectedPlan: 'Profesional' }}
            className="w-full max-w-md mx-auto text-center block px-6 py-4 text-white text-xl rounded-full font-semibold transition-all duration-300 hover:scale-105 bg-blue-700 hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            Comenzar Ahora
          </Link>
        </div>
      </AnimatedSection>

    </PageLayout>
  );
}