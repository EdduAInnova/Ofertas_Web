import { createClient } from '@supabase/supabase-js'

// Es importante usar variables de entorno por seguridad
// Estas se cargarán desde tu archivo .env.local
// Usamos process.env que es el estándar para Vercel y Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)