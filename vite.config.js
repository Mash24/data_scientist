import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('react-router')) return 'router';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor';
          }
          if (id.includes('/src/data/case-studies/content/')) {
            return `case-study-${id.split('/content/')[1].replace('.js', '')}`;
          }
        },
      },
    },
  },
});
