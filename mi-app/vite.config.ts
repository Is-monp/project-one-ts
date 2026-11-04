import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Importas el plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Lo añades aquí
  ],
})