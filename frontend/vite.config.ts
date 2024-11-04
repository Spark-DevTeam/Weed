import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@styles': path.resolve(__dirname, './src/assets/styles'),
            '@store': path.resolve(__dirname, './src/store'),
            '@components': path.resolve(__dirname, './src/components'),
            '@images': path.resolve(__dirname, './src/assets/images'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 4173
    },
});
