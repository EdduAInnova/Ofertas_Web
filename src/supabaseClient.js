import { createClient } from '@supabase/supabase-js'

// Lee las variables de entorno específicas de Vite desde el archivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

