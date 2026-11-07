import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    // Only warn on chunks > 1 MB (FA SVG icons are intentionally large)
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        // Split vendor libs into a separate chunk
        codeSplitting: true,
      },
    },
  },
  // Ensure Font Awesome's SVG core is bundled (not externalised)
  optimizeDeps: {
    include: [
      '@fortawesome/react-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
})
