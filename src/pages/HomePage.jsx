import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, CalendarCheck, Star, Palette, ShieldCheck, Smartphone, Search, BrainCircuit, Feather, Briefcase, Gem, Rocket, HelpCircle, Sparkles, Layers } from "lucide-react";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import { plans as plansData } from "../data/plansData.jsx"; // Importar la fuente única de verdad
import FaqItem from "../components/FaqItem"; // Importamos el nuevo componente

// --- Datos de la página (integrados para evitar errores de importación) ---
const whatWeDoData = [
  { icon: <Palette className="w-8 h-8 text-purple-500" />, title: "Presentación de Impacto", description: "Mostraremos sus hermosas suites y espacios con fotos y videos de alta calidad que enamoren a primera vista." },
  { icon: <CalendarCheck className="w-8 h-8 text-purple-500" />, title: "Reservas Fáciles", description: "Permitiremos reservas rápidas y directas, eliminando comisiones de terceros y simplificando el proceso para el cliente." },
  { icon: <ShieldCheck className="w-8 h-8 text-purple-500" />, title: "Generación de Confianza", description: "Con información clara, ubicación precisa y testimonios, construiremos una imagen de total profesionalismo y seguridad." },
  { icon: <Smartphone className="w-8 h-8 text-purple-500" />, title: "Experiencia Móvil Perfecta", description: "Garantizamos que la web se vea y funcione de maravilla en cualquier dispositivo: celular, tablet o computador." },
  { icon: <Search className="w-8 h-8 text-purple-500" />, title: "Visibilidad en Google", description: "Optimizaremos la página para que aparezca en los primeros resultados cuando los clientes busquen hospedaje en la zona." },
  { icon: <BrainCircuit className="w-8 h-8 text-purple-500" />, title: "Toque de IA", description: "Integraremos herramientas inteligentes como chatbots o respuestas automáticas para mejorar la atención al cliente 24/7." },
];

const faqData = [
  {
    question: "¿Qué necesito para empezar?",
    answer: "Depende del plan. Para el Básico, necesitas tu hosting y dominio. Para el Profesional y Premium, ¡nosotros nos encargamos de todo por el primer año! Solo necesitamos tu logo, fotos y la información de tu hotel."
  },
  {
    question: "¿En cuánto tiempo estará lista mi página web?",
    answer: "El Plan Básico suele tomar entre 7-10 días, el Profesional entre 15-20 días, y el Premium alrededor de 30 días. Todo depende de qué tan rápido nos entregues el contenido (fotos, textos, etc.)."
  },
  {
    question: "¿Puedo editar la página yo mismo después?",
    answer: "¡Sí! Los planes Profesional y Premium incluyen un panel de gestión (CMS) muy fácil de usar y una capacitación para que puedas cambiar textos e imágenes cuando quieras."
  },
  {
    question: "¿Qué pasa después del primer año con el hosting y dominio?",
    answer: "En los planes que lo incluyen, la renovación anual a partir del segundo año corre por tu cuenta. Es un proceso muy sencillo y te guiaremos para que lo hagas sin problemas. Los costos son bastante económicos."
  },
  {
    question: "¿El pago es seguro?",
    answer: "Totalmente. Usamos ePayco, una de las pasarelas de pago más seguras y reconocidas de Latinoamérica. Nosotros nunca vemos ni almacenamos los datos de tu tarjeta."
  }
];

// --- Componentes Reutilizables ---

const SectionTitle = ({ icon, children }) => (
  <div className="flex justify-center items-center gap-4 mb-12">
    {icon}
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text pb-2">
      {children}
    </h2>
  </div>
);

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white/5 p-6 rounded-lg border border-white/10 transform transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(192,132,252,0.25)] 
                contain-layout contain-style will-change-[transform,box-shadow]"
  >
    <div className="flex items-center gap-4 mb-3">
      {icon}
      <h3 className="font-bold text-xl text-blue-400">{title}</h3>
    </div>
    <p className="text-gray-400">{children}</p>
  </div>
);

const PlanFeature = ({ text, included }) => (
  <li className={`flex items-start gap-3 ${included ? 'text-gray-200' : 'text-gray-500'}`}>
    {included ? <Check className="text-green-400 w-5 h-5 mt-1 shrink-0" /> : <X className="text-red-500 w-5 h-5 mt-1 shrink-0" />}
    <span>{text}</span>
  </li>
);

const PlanCard = ({ plan, isFeatured }) => (
  <div
    style={{ '--glow-color': plan.glowColor }}
    className={`relative bg-white/10 md:bg-white/5 md:backdrop-blur-xl border rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 flex flex-col ${isFeatured ? 'border-purple-500' : 'border-white/20 hover:border-white/60'} 
                hover:shadow-[0_0_25px_rgba(var(--glow-color),0.4)] contain-layout contain-style will-change-[transform,box-shadow]`}
  >
    {isFeatured && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
        <Star className="w-4 h-4" /> RECOMENDADO
      </div>
    )}
    <div className="flex justify-center items-center gap-3 mb-2">
      {plan.icon}
      <h3 className={`text-3xl font-bold ${plan.color}`}>{plan.title}</h3>
    </div>
    <p className="text-center text-gray-400 mb-6 min-h-[3.5rem]">{plan.subtitle}</p>
    <div className="text-center mb-8">
      <span className="text-4xl sm:text-5xl font-bold">{plan.totalPriceUSD}</span>
      <span className="text-gray-400"> USD</span>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {plan.features.map((feature) => (
        <PlanFeature key={feature.text} text={feature.text} included={feature.included} />
      ))}
    </ul>
    <Link
      to={plan.path}
      className={`w-full mt-auto text-center block px-6 py-3 text-white text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 ${plan.buttonBg} hover:shadow-[0_0_15px_rgba(var(--glow-color),0.5)]`}
    >
      Seleccionar Plan
    </Link>
  </div>
);

// --- Componente Principal ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0b0c0f] via-[#101216] to-[#1c355b] text-white px-4 py-10 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          {/* --- Contenedor para la imagen de portada y el logo superpuesto --- */}
          <div className="relative inline-block">
            {/* Imagen de portada */}
            <img
              src="/casa_regis.webp"
              alt="Fachada elegante del aparta suites Casa Regis"
              className="rounded-xl mx-auto shadow-2xl shadow-blue-500/20 w-full max-w-4xl max-h-96 object-cover"
            />

            {/* Superposición oscura sobre la imagen */}
            <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

            {/* Logo superpuesto con efecto de neón */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full bg-slate-900/80 md:bg-slate-900/60 shadow-[0_0_25px_theme(colors.purple.500)] md:backdrop-blur-sm">
                <img 
                  src="/logo.png" 
                  alt="Logo de EdduAInnova" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* --- Contenido de texto, con espacio para el logo --- */}
          <div className="pt-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text">
                Propuesta Web a la Medida para{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Casa Regis</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              By <strong>EdduAInnova</strong> — Tecnología que transforma el turismo. Esto <em>ya es</em> un ejemplo vivo de lo que podemos hacer por ti.
            </p>
          </div>
        </header>

        <AnimatedSection className="mb-24">
          <SectionTitle icon={<Sparkles className="w-10 h-10 text-purple-400" />}>
            ¿Qué haremos por Casa Regis?
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeDoData.map((item) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title}>{item.description}</FeatureCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-24">
          <SectionTitle icon={<Layers className="w-10 h-10 text-purple-400" />}>
            Nuestros Planes Flexibles
          </SectionTitle>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {plansData.map((plan) => (
              <PlanCard key={plan.title} plan={plan} isFeatured={plan.isFeatured} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-24 max-w-4xl mx-auto">
          <SectionTitle icon={<HelpCircle className="w-10 h-10 text-purple-400" />}>
            Preguntas Frecuentes
          </SectionTitle>
          <div className="space-y-2">
            {faqData.map((faq, index) => <FaqItem key={index} question={faq.question} answer={faq.answer} />)}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-24 text-center max-w-4xl mx-auto">
          <SectionTitle icon={<Rocket className="w-10 h-10 text-purple-400" />}>
            Nuestra Tecnología
          </SectionTitle>
          <p className="text-lg text-gray-300 mb-8">
            No necesitas entender los nombres, solo saber que tendrás una web robusta, moderna y 100% optimizada con la misma tecnología que usan gigantes como Netflix, LinkedIn y Uber.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full">React JS</span>
            <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full">Node.js</span>
            <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full">Vite</span>
            <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full">Tailwind CSS</span>
            <span className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full">Inteligencia Artificial</span>
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-10 border border-white/10">
          <h3 className="text-3xl font-bold mb-4">¿Listo para llevar a Casa Regis al siguiente nivel?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Casa Regis merece un sitio web tan elegante como su arquitectura. Agendemos una reunión para definir el plan ideal para ti.
          </p>
          <Link
            to="/agendar-reunion"
            className="bg-purple-700 hover:bg-purple-600 px-8 py-4 text-white text-xl rounded-full font-bold inline-flex items-center gap-2 mx-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            <CalendarCheck /> Agendar Reunión
          </Link>
        </AnimatedSection>

        <Footer />

      </div>

      <a
        href="https://wa.me/573185462265?text=Hola!%20Estoy%20interesado%20en%20la%20propuesta%20web%20para%20Casa%20Regis."
        className="fixed bottom-6 right-6 z-50 animate-pulse"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Icono de WhatsApp para contacto directo"
          className="w-16 h-16 hover:scale-110 transition-transform drop-shadow-[0_0_10px_#25D366]"
        />
      </a>
    </div>
  );
}