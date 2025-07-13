import { supabase } from '../lib/supabaseClient'; // Ajusta esta ruta si es necesario
import crypto from 'crypto';

export default async function handler(req, res) {
  // 1. Verificar que la petición sea de tipo POST, como lo especifica ePayco
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  console.log("Webhook de confirmación de ePayco recibido:", req.body);

  // 2. Extraer los datos que envía ePayco del cuerpo de la petición
  const {
    x_ref_payco,
    x_transaction_id,
    x_amount,
    x_currency_code,
    x_signature,
    x_cod_response, // 1: Aceptada, 2: Rechazada, 3: Pendiente
    x_response_reason_text,
  } = req.body;

  // 3. VALIDACIÓN DE FIRMA (PASO DE SEGURIDAD CRÍTICO)
  // Esto asegura que la petición viene realmente de ePayco y no es una falsificación.
  const p_cust_id_cliente = process.env.NEXT_PUBLIC_EPAYCO_CUST_ID;
  const p_key = process.env.EPAYCO_P_KEY; // La llave secreta que solo el servidor conoce

  if (!p_cust_id_cliente || !p_key) {
    console.error("Error: Variables de entorno de ePayco no configuradas en el servidor.");
    return res.status(500).send("Error de configuración del servidor.");
  }

  // La cadena a firmar se construye exactamente como dice la documentación de ePayco
  const signatureString = `${p_cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;
  const calculatedSignature = crypto.createHash('sha256').update(signatureString).digest('hex');

  if (calculatedSignature !== x_signature) {
    console.error("Firma de ePayco inválida. Petición rechazada.");
    console.error(`Firma recibida: ${x_signature}`);
    console.error(`Firma calculada: ${calculatedSignature}`);
    return res.status(400).send("Invalid signature");
  }

  console.log("Firma de ePayco validada correctamente.");

  // 4. Actualizar nuestra base de datos en Supabase
  try {
    let estado_pago = 'fallido';
    if (x_cod_response === '1') estado_pago = 'pagado';
    if (x_cod_response === '2') estado_pago = 'rechazado';
    if (x_cod_response === '3') estado_pago = 'pendiente';

    // Es crucial que al momento de crear la cita, guardes la `ref_payco` para poder encontrarla ahora.
    const { data, error } = await supabase
      .from('citas') // Asegúrate que el nombre de la tabla es correcto
      .update({
        estado_pago: estado_pago,
        id_transaccion_epayco: x_transaction_id,
        respuesta_pasarela: x_response_reason_text,
      })
      .eq('ref_payco', x_ref_payco);

    if (error) throw error;

    console.log(`Cita con ref_payco ${x_ref_payco} actualizada a estado '${estado_pago}'.`);

  } catch (error) {
    console.error("Error al actualizar Supabase desde el webhook de ePayco:", error.message);
    // Si hay un error, respondemos con un error 500 para que ePayco pueda reintentar.
    return res.status(500).send("Error updating database");
  }

  // 5. Responder a ePayco con un status 200 OK
  // Esto le dice a ePayco "Recibí y procesé tu notificación, no la envíes de nuevo".
  res.status(200).send("Confirmación procesada correctamente");
}