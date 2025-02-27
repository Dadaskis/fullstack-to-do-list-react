import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://dadaskis.github.io/fullstack-to-do-list-react/",
  server: {
    proxy: {
      '/api': {
        //target: 'https://localhost/fullstack-to-do-list',
        //target: 'http://dadaskis-task-manager.mooo.com',
        target: 'http://45.129.186.31',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
