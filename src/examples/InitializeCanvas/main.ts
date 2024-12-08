import { MyColorConstants255 } from "../../libs/color/ColorConstants";
import { WebGLUtility } from "../../libs/webgl/WebGLUtility";

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gl = new WebGLUtility(canvas);
    gl.clearColor(MyColorConstants255.COLOR_CHINA.TranslateTo01());
}

window.onload = main;