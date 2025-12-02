import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    // Use absolute paths for built assets so nested routes resolve correctly.
    base: '/',
    plugins: [vue()],
    server: {
        port: 5173
    }
});
