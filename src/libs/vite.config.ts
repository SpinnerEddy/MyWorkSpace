import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    plugins: [
        glsl({
            include: /\.(glsl|vert|frag)$/,
        })
    ],
    resolve: {
        alias: {
            '@webgl': '/libs/src/webgl',
        },
    },
});