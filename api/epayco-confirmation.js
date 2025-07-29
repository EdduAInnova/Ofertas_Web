import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

// Esta función se ejecutará como una Serverless Function en Vercel.
export default async function handler(req, res) {
  // 1. Validar que la petición sea un POST, como lo requiere ePayco.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    console.log("Webhook de confirmación recibido para ref_payco:", body.x_ref_payco);

    // 2. Obtener las llaves y credenciales desde las variables de entorno de Vercel.
    // ¡IMPORTANTE! Estas deben estar configuradas en tu proyecto de Vercel.
    const p_cust_id_cliente = process.env.EPAYCO_CUST_ID;
    const p_key = process.env.EPAYCO_P_KEY;
    const private_key = process.env.EPAYCO_PRIVATE_KEY;
    const supabaseUrl = process.env.SUPABASE_URL; // <-- MEJORA: Usar una variable de entorno específica del backend.
    // Usamos la SERVICE_KEY para operaciones de escritura seguras desde el backend.
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!p_cust_id_cliente || !p_key || !private_key || !supabaseUrl || !supabaseServiceKey) { // <-- MEJORA: Comprobar la nueva variable.
      console.error("Una o más variables de entorno no están configuradas en Vercel.");
      return res.status(500).json({ error: 'Error de configuración del servidor.' });
    }

    // 3. Validar la firma para asegurar que la petición viene de ePayco.
    const signatureString = `${p_cust_id_cliente}^${p_key}^${body.x_ref_payco}^${body.x_transaction_id}^${body.x_amount}^${body.x_currency_code}`;
    
    const calculatedSignature = createHmac('sha256', private_key)
      .update(signatureString)
      .digest('hex');

    if (calculatedSignature !== body.x_signature) {
      console.warn("Firma inválida. Abortando. Recibida:", body.x_signature, "Calculada:", calculatedSignature);
      return res.status(400).json({ error: 'Firma inválida' });
    }

    console.log("Firma validada correctamente.");

    // 4. Determinar el estado final del pago.
    let finalStatus = 'desconocido';
    switch (String(body.x_cod_response)) { // Convertir a string para seguridad
      case '1': finalStatus = 'aprobado'; break;
      case '2':
      case '4': finalStatus = 'rechazado'; break;
      case '3': finalStatus = 'pendiente'; break;
    }

    // 5. Actualizar el estado en Supabase.
    // Creamos un cliente de Supabase especial para el backend con la service_role key.
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabaseAdmin
      .from('reuniones')
      .update({ 
        estado_pago: finalStatus,
        transaction_id: body.x_transaction_id,
      })
      .eq('ref_payco', body.x_ref_payco)
      .select();

    if (error) throw new Error(`Fallo al actualizar el estado de la reunión: ${error.message}`);

    // 6. Responder a ePayco con un status 200 OK.
    return res.status(200).json({ success: true, message: 'Confirmación recibida' });

  } catch (err) {
    console.error("Error inesperado en el webhook:", err.message);
    return res.status(500).json({ error: 'Error Interno del Servidor' });
  }
}