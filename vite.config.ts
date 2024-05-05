import { defineConfig } from 'vite';
import paths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
  },
  server: {
    port: 5176,
  },
  plugins: [
    react({ plugins: [], tsDecorators: true }),
    paths({ root: '..' }),
  ],
});
