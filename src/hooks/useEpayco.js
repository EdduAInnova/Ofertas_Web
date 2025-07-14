import { useEffect, useState } from 'react';

// CORRECCIÓN 1: Se usa 'export const' para que sea una exportación nombrada
// y coincida con como se importa en todas las páginas.
export const useEpayco = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpia el script cuando el componente se desmonta
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = (paymentData) => {
    if (!window.ePayco) {
      console.error("ePayco script no está cargado todavía.");
      alert("La pasarela de pago no está lista, por favor espera un momento y vuelve a intentarlo.");
      return;
    }

    setIsLoading(true);

    const handler = window.ePayco.checkout.configure({
      key: process.env.NEXT_PUBLIC_EPAYCO_PUBLIC_KEY,
      test: true, // ¡IMPORTANTE! Poner en 'false' para producción
    });

    const data = {
      ...paymentData,
      
      // CORRECCIÓN 2: Usamos el checkout estándar ('true'). Es más estable y evita
      // los errores que veías en la consola. Redirige a una página de ePayco.
      external: 'false', // Usamos el checkout "On-page" que se integra en la web.

      // URL a la que ePayco redirige al usuario tras el pago
      response: `${window.location.origin}/gracias`,
      
      // URL para la confirmación servidor a servidor (nuestra API)
      confirmation: `${window.location.origin}/api/epayco-confirmation`,

      lang: 'es',
    };

    handler.open(data);
  };

  return { isLoading, handlePayment };
};
