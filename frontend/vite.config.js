import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // prefix for deploy in sub folder
  build: {
    outDir: './dist', // output directory for built files (default: dist)
    chunkSizeWarningLimit: 5000
  },
})
