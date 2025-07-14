import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del archivo .env correspondiente al modo (development, production)
  // El tercer parámetro '' asegura que se carguen TODAS las variables, no solo las que empiezan con VITE_
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      // Expone las variables de entorno al código del cliente bajo `process.env`
      'process.env': env
    },
    plugins: [react()],
  }
})