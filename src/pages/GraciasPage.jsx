import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle, XCircle, AlertCircle, Home } from 'lucide-react';

// Componente para mostrar una fila de detalles
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-white/10 py-3 text-sm sm:text-base">
    <span className="text-gray-400">{label}</span>
    <span className="font-semibold text-right">{value}</span>
  </div>
);

// Mapea el estado de la transacción a un objeto con texto, color e icono
const statusMap = {
  Aceptada: {
    text: 'Transacción Aprobada',
    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
    color: 'green',
    message: '¡Gracias por tu confianza! Hemos recibido tu pago y pronto nos pondremos en contacto para iniciar tu proyecto.'
  },
  Pendiente: {
    text: 'Transacción Pendiente',
    icon: <AlertCircle className="w-16 h-16 text-yellow-500" />,
    color: 'yellow',
    message: 'Tu pago está pendiente de confirmación por parte de la entidad bancaria. Recibirás una notificación cuando el estado cambie.'
  },
  Rechazada: {
    text: 'Transacción Rechazada',
    icon: <XCircle className="w-16 h-16 text-red-500" />,
    color: 'red',
    message: 'Tu pago ha sido rechazado. Por favor, verifica los datos de tu medio de pago o intenta con uno diferente.'
  },
  Fallida: {
    text: 'Transacción Fallida',
    icon: <XCircle className="w-16 h-16 text-red-500" />,
    color: 'red',
    message: 'Ocurrió un error durante la transacción. Por favor, intenta de nuevo.'
  }
};

export default function GraciasPage() {
  const [searchParams] = useSearchParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refPayco = searchParams.get('ref_payco');

  useEffect(() => {
    if (!refPayco) {
      setError('No se encontró una referencia de pago. Si realizaste un pago, por favor contáctanos.');
      setLoading(false);
      return;
    }

    const fetchTransactionStatus = async () => {
      try {
        const response = await fetch(`/api/epayco-status?ref_payco=${refPayco}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'No se pudo obtener el estado de la transacción.');
        }
        
        setTransaction(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [refPayco]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const statusInfo = statusMap[transaction?.x_response] || statusMap.Fallida;

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto text-center">
        <div className={`bg-white/5 border border-${statusInfo.color}-500/30 p-6 sm:p-8 rounded-2xl`}>
          <div className="flex justify-center mb-6">{statusInfo.icon}</div>
          <h1 className={`text-3xl font-bold text-${statusInfo.color}-400 mb-4`}>{statusInfo.text}</h1>
          <p className="text-gray-300 mb-8">{error || statusInfo.message}</p>

          {transaction && !error && (
            <div className="text-left mb-8">
              <DetailRow label="Referencia ePayco" value={transaction.x_ref_payco} />
              <DetailRow label="Factura" value={transaction.x_id_invoice} />
              <DetailRow label="Descripción" value={transaction.x_description} />
              <DetailRow label="Monto" value={`${transaction.x_amount} ${transaction.x_currency_code}`} />
              <DetailRow label="Fecha" value={transaction.x_transaction_date} />
            </div>
          )}

          <Link to="/" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 px-6 py-3 text-white rounded-full font-semibold transition-colors">
            <Home size={20} /> Volver al Inicio
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

