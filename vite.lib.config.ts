import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(() => ({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'react-random-gallery',
      formats: ['es', 'umd'],
      fileName: (format) => `react-random-gallery.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components', 'rooks', 'lodash'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          rooks: 'rooks',
          lodash: 'lodash'
        }
      }
    }
  }
}))
