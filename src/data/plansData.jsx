import React from 'react';
import { Feather, Briefcase, Gem } from 'lucide-react';

export const plans = [
  {
    id: 'basico',
    path: "/plan/basico",
    title: "Básico",
    subtitle: "La presencia online esencial para empezar a captar clientes.",
    icon: <Feather className="w-7 h-7 text-green-600" />,
    totalPriceUSD: 250,
    buttonBg: "bg-green-700 hover:bg-green-600",
    color: "text-green-600",
    borderColor: "border-green-500",
    textColor: "text-green-600",
    hoverBg: "hover:bg-green-900/50",
    glowColor: "22, 163, 74", // green-600
    description: 'Pago inicial (50%) para el Plan Básico de desarrollo web.',
    features: [
      { text: "Diseño profesional (Landing Page)", included: true },
      { text: "100% Adaptable a celulares", included: true },
      { text: "Secciones: Inicio, Servicios, Contacto", included: true },
      { text: "Enlaces a redes sociales", included: true },
      { text: "WhatsApp flotante + formulario", included: true },
      { text: "Posicionamiento en Google (SEO) Básico", included: true },
      { text: "Panel de gestión (CMS)", included: false },
      { text: "Soporte técnico 15 días post-entrega", included: true },
    ]
  },
  {
    id: 'profesional',
    path: "/plan/profesional",
    title: "Profesional",
    subtitle: "La solución completa para competir y destacar en el mercado.",
    icon: <Briefcase className="w-7 h-7 text-blue-600" />,
    totalPriceUSD: 550,
    buttonBg: "bg-blue-700 hover:bg-blue-600",
    color: "text-blue-600",
    borderColor: "border-blue-500",
    textColor: "text-blue-600",
    hoverBg: "hover:bg-blue-900/50",
    isFeatured: true,
    glowColor: "37, 99, 235", // blue-600
    description: 'Pago inicial (50%) para el Plan Profesional de desarrollo web.',
    features: [
      { text: "Diseño web multi-página (hasta 5)", included: true },
      { text: "100% Adaptable a celulares", included: true },
      { text: "Secciones: + Blog, Galería, Testimonios", included: true },
      { text: "Formulario de contacto avanzado", included: true },
      { text: "WhatsApp flotante + captura de datos", included: true },
      { text: "Posicionamiento en Google (SEO) Mejorado", included: true },
      { text: "Panel de gestión (CMS) + Capacitación", included: true },
      { text: "Soporte técnico 30 días", included: true },
    ]
  },
  {
    id: 'premium',
    path: "/plan/premium",
    title: "Premium",
    subtitle: "La experiencia web definitiva para liderar y automatizar.",
    icon: <Gem className="w-7 h-7 text-purple-600" />,
    totalPriceUSD: 950,
    buttonBg: "bg-purple-700 hover:bg-purple-600",
    color: "text-purple-600",
    borderColor: "border-purple-500",
    textColor: "text-purple-600",
    hoverBg: "hover:bg-purple-900/50",
    glowColor: "147, 51, 234", // purple-600
    description: 'Pago inicial (50%) para el Plan Premium de desarrollo web.',
    features: [
      { text: "Plataforma web con animaciones y UX superior", included: true },
      { text: "Experiencia móvil tipo aplicación", included: true },
      { text: "Secciones y funcionalidades a medida", included: true },
      { text: "Integración con calendario y agendamiento", included: true },
      { text: "Chat inteligente con IA para atención 24/7", included: true },
      { text: "Posicionamiento en Google (SEO) Avanzado", included: true },
      { text: "Panel de gestión (CMS) + Video-tutoriales", included: true },
      { text: "Soporte 90 días + Mantenimiento básico", included: true },
    ]
  }
];