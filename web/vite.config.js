import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 백엔드 서버 주소
                changeOrigin: true,
            },
        },
    },
});