import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path' // Импортируем модуль path

export default defineConfig({
  server: { host: true, port: 5173 },
  plugins: [
    vue(),
    vueDevTools(), // Добавляем плагин Vue DevTools
    createHtmlPlugin({}), // Добавляем плагин HTML
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Указываем путь к папке src
    },
  },
})
