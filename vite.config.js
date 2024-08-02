import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     "/auth" : process.env.VITE_SERVER_URL,
     "/follow" : process.env.VITE_SERVER_URL,
     "/blog" : process.env.VITE_SERVER_URL,
     "/user" : process.env.VITE_SERVER_URL,
  },
},
  plugins: [react()],
})
