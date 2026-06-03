import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType:'prompt',
      workbox:{
        sourcemap:true,
        cleanupOutdatedCaches:true,//skipWaiting:true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}']
      }
      /*    
      ,devOptions:{
        enabled:true
      }
      */      
    }),
    tailwindcss()
  ],
})
