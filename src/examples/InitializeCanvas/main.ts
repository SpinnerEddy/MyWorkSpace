import { ColorUtility } from "../../libs/color/ColorUtility";
import { WebGLUtility } from "../../libs/webgl/WebGLUtility";

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gl = new WebGLUtility(canvas);
    gl.clearColor(ColorUtility.hexToColor01("#f68b1f"));
}

window.onload = main;