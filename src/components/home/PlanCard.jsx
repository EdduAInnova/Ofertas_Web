import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Star } from 'lucide-react';

// Este es el componente pequeño que muestra una característica del plan (con el check o la X)
const PlanFeature = ({ text, included }) => (
  <li className={`flex items-start gap-3 ${included ? 'text-gray-200' : 'text-gray-500'}`}>
    {included ? <Check className="text-green-400 w-5 h-5 mt-1 shrink-0" /> : <X className="text-red-500 w-5 h-5 mt-1 shrink-0" />}
    <span>{text}</span>
  </li>
);

// Este es el componente principal de la tarjeta del plan
export const PlanCard = ({ plan, isFeatured }) => (
  <div
    style={{ '--glow-color': plan.glowColor }}
    className={`relative bg-white/10 md:bg-white/5 md:backdrop-blur-xl border rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 flex flex-col ${isFeatured ? 'border-purple-500' : 'border-white/20 hover:border-white/60'} hover:shadow-[0_0_25px_rgba(var(--glow-color),0.4)]`}
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
