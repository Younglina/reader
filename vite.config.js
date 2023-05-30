import { join } from 'node:path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rss',
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
