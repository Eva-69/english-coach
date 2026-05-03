import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: If your repo is named 'english-coach', the URL will be
// https://<username>.github.io/english-coach/
// So we need base: '/english-coach/'
//
// If you fork this and rename the repo, update the base below to match.
// If using a custom domain, set base: '/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/english-coach/',
})
