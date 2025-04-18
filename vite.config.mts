import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import ClosePlugin from './vite-plugin-close.ts';

export default ({ mode }) => {
  return defineConfig({
    ...(mode !== 'test' && {
      plugins: [
        react(),
        eslint({
          include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),
        checker({ typescript: true }),
        ClosePlugin(),
      ],
    }),
    base: '/wip/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      copyPublicDir: true,
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://192.168.0.4:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: { open: true },
    resolve: {
      alias: {
        '~app': path.resolve('src/app'),
        '~entities': path.resolve('src/entities'),
        '~features': path.resolve('src/features'),
        '~pages': path.resolve('src/pages'),
        '~shared': path.resolve('src/shared'),
        '~widgets': path.resolve('src/widgets'),
      },
    },
  });
};
