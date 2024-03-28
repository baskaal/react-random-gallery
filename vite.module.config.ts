import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(() => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-random-gallery',
      formats: ['es', 'umd'],
      fileName: (format) => `react-random-gallery.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        },
        interop: 'compat'
      }
    }
  }
}))
