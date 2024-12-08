import { WebGLUtility } from "../../libs/webgl/WebGLUtility";

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gl = new WebGLUtility(canvas);
    gl.clearColor(0.964, 0.545, 0.121, 1);
}

window.onload = main;