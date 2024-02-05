import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/variables.scss";
          @import "./src/styles/mixins.scss";
        `,
      },
    },
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),
      modules: path.resolve(__dirname, './src/modules'),
      components: path.resolve(__dirname, './src/components'),
      helpers: path.resolve(__dirname, './src/helpers'),
      configs: path.resolve(__dirname, './src/configs'),
      assets: path.resolve(__dirname, './src/assets'),
      hooks: path.resolve(__dirname, './src/hooks'),
      store: path.resolve(__dirname, './src/store'),
      types: path.resolve(__dirname, './src/types'),
      app: path.resolve(__dirname, './src/app'),
      ui: path.resolve(__dirname, './src/ui'),
      main: path.resolve(__dirname, './src/main.tsx'),
    },
  },
});
