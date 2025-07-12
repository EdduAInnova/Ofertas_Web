// Vercel tratará este archivo como una función serverless.
// Recibe un objeto de solicitud (req) y un objeto de respuesta (res).

export default async function handler(req, res) {
  // Permitimos que nuestro frontend haga solicitudes a esta función
  res.setHeader('Access-Control-Allow-Origin', '*'); // En producción, puedes restringirlo a tu dominio
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { ref_payco } = req.query;

  if (!ref_payco) {
    return res.status(400).json({ success: false, message: 'Falta el parámetro ref_payco.' });
  }

  // Obtenemos la llave privada de forma segura desde las variables de entorno de Vercel
  const privateKey = process.env.EPAYCO_PRIVATE_KEY;

  if (!privateKey) {
    console.error("La variable de entorno EPAYCO_PRIVATE_KEY no está configurada.");
    return res.status(500).json({ success: false, message: 'Error de configuración del servidor.' });
  }

  // Esta es la URL de ePayco para validar una transacción por su referencia
  const validationUrl = `https://secure.epayco.co/validation/v1/reference/${ref_payco}`;

  try {
    const epaycoResponse = await fetch(validationUrl);
    const epaycoData = await epaycoResponse.json();

    if (!epaycoResponse.ok || !epaycoData.success) {
      return res.status(epaycoResponse.status).json({
        success: false,
        message: 'Error al validar la transacción con ePayco.',
        details: epaycoData.data ? epaycoData.data.x_response_reason_text : 'Razón desconocida.'
      });
    }

    // Enviamos los datos de la transacción de vuelta al frontend
    res.status(200).json(epaycoData);
  } catch (error) {
    console.error('Error al contactar la API de validación de ePayco:', error);
    res.status(500).json({ success: false, message: 'Error interno al contactar la pasarela de pago.' });
  }
}

