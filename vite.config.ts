import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl'
import path from 'path'

export default defineConfig({
    plugins: [
        glsl({
            include: /\.(glsl|vert|frag)$/,
        })
    ],
    server: {
        port: 2222
    },
    resolve:{
        alias:{
            '@webgl':path.resolve(__dirname, 'libs/src/webgl'),
        }
    }
});