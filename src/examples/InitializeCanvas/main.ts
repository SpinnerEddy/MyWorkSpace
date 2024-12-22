import { ColorUtility } from "../../libs/src/color/ColorUtility";
import { MatrixHandler } from "../../libs/src/math/MatrixHandler";
import { Vector2 } from "../../libs/src/math/Vector2";
import { Vector3 } from "../../libs/src/math/Vector3";
import { WebGLUtility } from "../../libs/src/webgl/WebGLUtility";
import GUI from "lil-gui";

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gui = new GUI();

    const params = {
        color: '#aa00ff',
        function() { console.log( 'hi' ) }
    };

    gui.addColor( params, 'color' ).onChange(
        function(value : string){
            gl.clearColor(ColorUtility.hexToColor01(value));
        }
    );
    gui.add(document, 'title');

    const gl = new WebGLUtility(canvas);
    gl.clearColor(ColorUtility.hexToColor01(params.color));
}

window.onload = main;