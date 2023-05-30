import { join } from 'node:path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/reader',
  plugins: [
    vue(),
    Components({}),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src'),
    },
  },
})
