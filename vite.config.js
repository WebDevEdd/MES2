// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  base: '/MES2/', // Adjust according to your deployment
  resolve: {
    alias: {
      'three': 'node_modules/three/build/three.module.js',
    },
  },
});