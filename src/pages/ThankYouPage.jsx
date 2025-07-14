import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const ThankYouPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, consulta, exito, rechazo, pendiente, error
  const [message, setMessage] = useState({ title: '', text: '' });

  useEffect(() => {
    // Escenario 1: El usuario solo agendó una consulta
    if (location.state?.type === 'consulta') {
      setStatus('consulta');
      setMessage({
        title: '¡Cita Agendada Exitosamente!',
        text: 'Hemos recibido tu solicitud. Pronto nos pondremos en contacto contigo por WhatsApp para confirmar los detalles. ¡Gracias por tu interés!',
      });
      return;
    }

    // Escenario 2: El usuario viene de la pasarela de pago ePayco
    const codResponse = searchParams.get('x_cod_response');
    
    if (codResponse) {
      switch (codResponse) {
        case '1': // Transacción Aceptada
          setStatus('exito');
          setMessage({
            title: '¡Pago Exitoso y Cita Confirmada!',
            text: 'Tu pago ha sido procesado correctamente. Hemos agendado tu reunión y te enviaremos un correo con todos los detalles. ¡Estamos emocionados de empezar a trabajar contigo!',
          });
          break;
        case '2': // Transacción Rechazada
        case '4': // Transacción Fallida
          setStatus('rechazo');
          setMessage({
            title: 'Hubo un Problema con tu Pago',
            text: 'La transacción fue rechazada. Por favor, verifica los datos de tu medio de pago e inténtalo de nuevo. No se ha realizado ningún cargo a tu cuenta.',
          });
          break;
        case '3': // Transacción Pendiente
          setStatus('pendiente');
          setMessage({
            title: 'Tu Pago está Pendiente',
            text: 'La transacción está siendo procesada y está pendiente de confirmación. Te notificaremos por correo electrónico tan pronto como tengamos una actualización del estado.',
          });
          break;
        default:
          setStatus('error');
          setMessage({
            title: 'Estado de Transacción Desconocido',
            text: 'No pudimos determinar el estado de tu pago. Por favor, contacta a soporte.',
          });
      }
    } else {
      // Caso por defecto si se llega a la página sin contexto
      setStatus('error');
      setMessage({
        title: 'Gracias por tu interés',
        text: 'Si tienes alguna pregunta, no dudes en contactarnos.',
      });
    }
  }, [location.state, searchParams]);

  const statusConfig = {
    consulta: { icon: <CheckCircle size={64} className="text-cyan-400" />, borderColor: 'border-cyan-500/30' },
    exito: { icon: <CheckCircle size={64} className="text-green-400" />, borderColor: 'border-green-500/30' },
    rechazo: { icon: <XCircle size={64} className="text-red-400" />, borderColor: 'border-red-500/30' },
    pendiente: { icon: <Clock size={64} className="text-yellow-400" />, borderColor: 'border-yellow-500/30' },
    error: { icon: <AlertCircle size={64} className="text-gray-400" />, borderColor: 'border-gray-500/30' },
    loading: { icon: null, borderColor: 'border-transparent' },
  };

  const { icon, borderColor } = statusConfig[status];

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className={`bg-gradient-to-bl from-[#101216] to-[#1c355b] border ${borderColor} rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 mx-auto text-white text-center animate-fade-in`}>
          {status !== 'loading' && (
            <>
              <div className="mb-6 flex justify-center">{icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{message.title}</h1>
              <p className="text-gray-300 mb-8">{message.text}</p>
              <Link to="/" className="bg-purple-700 hover:bg-purple-600 px-8 py-3 text-white text-lg rounded-full font-bold transition-all duration-300 hover:scale-105">
                Volver al Inicio
              </Link>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default ThankYouPage;