// tailwind.config.js - VERSIÓN "INCANDESCENTE"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Le enseñamos a Tailwind el nuevo fondo de aura difuminada
      backgroundImage: {
        'radial-glow-blue': 'radial-gradient(circle, rgba(0, 191, 255, 0.25) 0%, rgba(0, 191, 255, 0) 70%)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        'pulse-green': {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(37, 211, 102, 0.6))' },
          '50%': { filter: 'drop-shadow(0 0 14px rgba(37, 211, 102, 1))' },
        },
        
        // --- ¡AQUÍ ESTÁ LA MEJORA DRÁSTICA! ---
        // Aumentamos los valores para un resplandor masivo y brillante.
        'pulse-blue': {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.9))' }, // Azul Eléctrico
          '50%': { filter: 'drop-shadow(0 0 40px rgba(0, 191, 255, 1))' },
        },
        // --- FIN DE LA MEJORA ---

        // --- NUEVA ANIMACIÓN FLOTANTE ---
        'float-up-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'glow-whatsapp': 'pulse-green 2s infinite ease-in-out',
        // Hacemos la animación de Devi un poco más rápida y enérgica.
        'glow-devi': 'pulse-blue 1.9s infinite ease-in-out',
        // --- NUEVA ANIMACIÓN FLOTANTE ---
        'float': 'float-up-down 4s infinite ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'), // <-- ¡AÑADIDO! Para los estilos 'prose' del chat.
  ],
}