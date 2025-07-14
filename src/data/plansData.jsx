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
    glowColor: "22, 163, 74", // green-600
    description: 'Pago inicial (50%) para el Plan Básico de desarrollo web.',
    features: [
      { text: "Diseño personalizado basado en la imagen de Casa Regis", included: true },
      { text: "Sitio web adaptado a celular", included: true },
      { text: "Secciones: Inicio, Habitaciones, Contacto", included: true },
      { text: "Enlace a Booking/Airbnb", included: true },
      { text: "WhatsApp flotante + formulario", included: true },
      { text: "Posicionamiento en Google (SEO) Básico", included: true },
      { text: "Panel de gestión (CMS)", included: false },
      { text: "Soporte técnico 7 días", included: true },
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
    isFeatured: true,
    glowColor: "37, 99, 235", // blue-600
    description: 'Pago inicial (50%) para el Plan Profesional de desarrollo web.',
    features: [
      { text: "Diseño atractivo con estilo profesional y UX/UI", included: true },
      { text: "Sitio web adaptado a celular", included: true },
      { text: "Secciones: + Galería, Opiniones, Ubicación", included: true },
      { text: "Formulario interno de reservas", included: true },
      { text: "WhatsApp flotante + captura de datos", included: true },
      { text: "Posicionamiento en Google (SEO) Mejorado", included: true },
      { text: "Panel de gestión (CMS) simple y editable", included: true },
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
    glowColor: "147, 51, 234", // purple-600
    description: 'Pago inicial (50%) para el Plan Premium de desarrollo web.',
    features: [
      { text: "Diseño App-like con animaciones y detalles únicos", included: true },
      { text: "Experiencia móvil tipo aplicación", included: true },
      { text: "Secciones: + Blog, Eventos, Promociones", included: true },
      { text: "Motor de reservas directo + calendario inteligente", included: true },
      { text: "Chat inteligente con IA para agendar 24/7", included: true },
      { text: "Posicionamiento en Google (SEO) Profesional", included: true },
      { text: "Panel de gestión (CMS) + Capacitación y videotutorial", included: true },
      { text: "Soporte 90 días + mantenimiento mensual", included: true },
    ]
  }
];