import { Color } from "../../libs/color/Color";
import { WebGLUtility } from "../../libs/webgl/WebGLUtility";

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gl = new WebGLUtility(canvas);
    const color = new Color(0.964, 0.545, 0.121, 1);
    gl.clearColor(color);
}

window.onload = main;