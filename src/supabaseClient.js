import { createClient } from '@supabase/supabase-js'

// Es importante usar variables de entorno por seguridad
// Estas se cargarán desde tu archivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)