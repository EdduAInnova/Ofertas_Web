import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <PageLayout>
      <div className="text-center bg-black/20 p-10 rounded-2xl border border-green-500/30 animate-fade-in">
        <CheckCircle className="mx-auto h-20 w-20 text-green-400 mb-6" />
        <h1 className="text-4xl font-bold text-green-400 mb-4">¡Solicitud Recibida!</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
          Hemos recibido tu solicitud de agendamiento exitosamente. En breve, te enviaremos un mensaje de confirmación a tu correo electrónico para finalizar los detalles.
        </p>
        <Link
          to="/"
          className="bg-purple-700 hover:bg-purple-600 px-8 py-3 text-white text-lg rounded-full font-bold inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        >
          Volver al Inicio
        </Link>
      </div>
    </PageLayout>
  );
}