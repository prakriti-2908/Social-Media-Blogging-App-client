import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     "/auth" : process.env.SERVER_URL,
     "/follow" : process.env.SERVER_URL,
     "/blog" : process.env.SERVER_URL,
     "/user" : process.env.SERVER_URL,
  },
},
  plugins: [react()],
})
