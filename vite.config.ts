import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    base: './',
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/main.ts'),
            name: 'select-it',
            fileName: (format) => `select-it.${format}.js`,
        },
    },
    css: {
        transformer: 'lightningcss',
    },
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
});
