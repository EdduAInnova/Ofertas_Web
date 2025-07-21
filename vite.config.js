import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ¡SOLUCIÓN AL ERROR ENOSPC! ---
  // Le decimos a Vite que no vigile los cambios dentro de estas carpetas.
  // Esto reduce drásticamente la cantidad de "vigilantes" de archivos que
  // el sistema operativo necesita, evitando el error "no space left on device".
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
})