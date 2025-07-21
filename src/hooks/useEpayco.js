import { useEffect, useState, useCallback } from 'react';

/**
 * Hook personalizado para gestionar la integración con la pasarela de pago ePayco.
 * Carga el script de ePayco y proporciona una función para iniciar el checkout.
 */
export const useEpayco = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  /**
   * Inicia el proceso de pago abriendo el modal de ePayco.
   * @param {object} options - Datos necesarios para la transacción.
   */
  const handlePayment = useCallback((options) => {
    if (!window.ePayco) {
      console.error("El script de ePayco no está cargado todavía.");
      alert("La pasarela de pago no está lista, por favor espera un momento y vuelve a intentarlo.");
      return;
    }
  
    setIsLoading(true);

    const handler = window.ePayco.checkout.configure({
      // Lee la llave PÚBLICA desde las variables de entorno de Vite.
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      // ¡IMPORTANTE! Poner en `false` para aceptar pagos REALES.
      test: false,
    });

    const data = {
      ...options, // Pasamos todas las opciones recibidas (name, description, amount, etc.)
      external: 'false', // Usamos el checkout "On-page" que se integra en la web.
      response: `${window.location.origin}/gracias`, // URL de redirección post-pago.
      lang: 'es',
      onClose: () => {
        setIsLoading(false); // Detiene la carga si el usuario cierra el modal.
      }
    };

    handler.open(data);
  }, []); // Dependencia vacía para que la función no se recree en cada render

  return { isLoading, handlePayment };
};
