import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Esta sección es clave para el desarrollo con Vercel CLI.
  // Le dice a Vite que esté disponible en la red local,
  // permitiendo que el proxy de 'vercel dev' se conecte a él sin problemas.
  server: {
    host: true
  }
})