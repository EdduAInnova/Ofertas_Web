import { useState } from 'react';

// Esta es tu LLAVE PÚBLICA de ePayco.
// Es seguro tenerla aquí porque su única función es identificar tu cuenta
// al iniciar un pago desde el navegador del cliente.
const EPAYCO_PUBLIC_KEY = '9a411b6075a8a6222aff5df6631175fa';

export function useEpayco() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = (paymentDetails) => {
    // Primero, verificamos que el script de ePayco se haya cargado.
    if (window.ePayco) {
      setIsLoading(true);

      try {
        const handler = window.ePayco.checkout.configure({
          key: EPAYCO_PUBLIC_KEY,
          test: false, // Cambiar a true para hacer pruebas
        });

        const data = {
          // Valores por defecto que ePayco necesita
          tax_base: paymentDetails.amount,
          tax: "0.00",
          tax_ico: "0.00",
          country: "co",
          lang: "es",
          external: "false", // Para que se abra en la misma página (modal)
          response: `${window.location.origin}/gracias`, // Página de agradecimiento

          // Detalles específicos del pago que pasamos como argumento
          ...paymentDetails,
          invoice: `${paymentDetails.invoicePrefix}-${Date.now()}`, // Genera una factura única
        };

        handler.open(data);

      } catch (error) {
        console.error("Error al configurar o abrir ePayco:", error);
        alert("Ocurrió un error al iniciar el pago. Por favor, intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('La pasarela de pago no está disponible. Por favor, recarga la página e intenta de nuevo.');
    }
  };

  return { isLoading, handlePayment };
}

