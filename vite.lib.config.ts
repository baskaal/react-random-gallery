import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => ({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'Gallery',
      formats: ['es', 'umd'],
      fileName: (format) => `gallery.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
}));
