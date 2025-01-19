import { MyColorCode } from "../../libs/src/color/ColorConstants";
import { ColorUtility } from "../../libs/src/color/ColorUtility";
import { Matrix } from "../../libs/src/math/matrix/Matrix";
import { MatrixHandler } from "../../libs/src/math/MatrixHandler";
import { Vector3 } from "../../libs/src/math/vector/Vector3";
import { ShaderLoader } from "../../libs/src/webgl/ShaderLoader";
import { WebGLUtility } from "../../libs/src/webgl/WebGLUtility";
import GUI from "lil-gui";

async function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }
    canvas.width = 500;
    canvas.height = 500;

    const gui = new GUI();

    const params = {
        color: MyColorCode.COLOR_EMPTY,
        function() { console.log( 'hi' ) }
    };

    gui.addColor( params, 'color' ).onChange(
        function(value : string){
            gl.clearColor(ColorUtility.hexToColor01(value));
        }
    );
    gui.add(document, 'title');

    const shaderLoader = ShaderLoader.getInstance();

    let vs;
    let fs;
    try{
        vs = await shaderLoader.loadShaderSource('default', 'vert');
        fs = await shaderLoader.loadShaderSource('default', 'frag');
    }
    catch(error){
        console.error(error);
    }

    const gl = new WebGLUtility(canvas);
    gl.clearColor(ColorUtility.hexToColor01(params.color));

    const program = gl.createProgram(vs, fs);
    let vertexPosition = [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
    ]
    let vbo = gl.createVbo(new Float32Array(vertexPosition));
    gl.SetAttributeVboLocation(program, 'aPosition', 3, vbo);

    let mMatrix = MatrixHandler.identity(4);
    let vMatrix = MatrixHandler.lookAt(new Vector3(0.0, 1.0, 3.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 1.0, 0.0));
    let pMatrix = MatrixHandler.perspective(90, canvas.width, canvas.height, 0.1, 100);
    let mvpMatrix = MatrixHandler.multiply(MatrixHandler.multiply(pMatrix, vMatrix), mMatrix);

    console.log(mvpMatrix);
    gl.SetUniformMatrix(program, 'mvpMatrix', mvpMatrix);
    gl.drawArrays(3);

}

main();