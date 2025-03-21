import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  proxy: {
    "/api": {
      target: "https://firestore.googleapis.com",
      changeOrigin: true,
      secure: false,
    },
  },
  plugins: [react(), tailwindcss()],
})
