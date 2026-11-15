import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0
  }
})
