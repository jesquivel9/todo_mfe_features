import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "feature-components",
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorld": "./src/features/HelloWorld/HelloWorld.tsx",
        "./Todo": "./src/features/Todo/Todo.tsx",
      },
      shared: ["react"],
    }),
  ],

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },

})
