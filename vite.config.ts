import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "InclusiveCard",
      fileName: (format) => `inclusive-card.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Make React external to avoid bundling it
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
