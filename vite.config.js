import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     "/auth" : "http://localhost:8000",
     "/follow" : "http://localhost:8000",
     "/blog" : "http://localhost:8000",
  },
},
  plugins: [react()],
})
