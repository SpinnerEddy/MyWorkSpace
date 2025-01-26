import { MyColorCode } from "../../libs/src/color/ColorConstants";
import { ColorUtility } from "../../libs/src/color/ColorUtility";
import { MatrixHandler } from "../../libs/src/math/MatrixHandler";
import { Vector2 } from "../../libs/src/math/vector/Vector2";
import { Vector3 } from "../../libs/src/math/vector/Vector3";
import { ShaderLoader } from "../../libs/src/webgl/ShaderLoader";
import { WebGLUtility } from "../../libs/src/webgl/WebGLUtility";

let canvas: HTMLCanvasElement;
let gl: WebGLUtility;
let program: WebGLProgram;
let startTime: number | null = null;

async function setup()
{
    canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }
    canvas.width = 500;
    canvas.height = 500;

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

    gl = new WebGLUtility(canvas);
    gl.clearColor(ColorUtility.hexToColor01(MyColorCode.COLOR_EMPTY));

    program = gl.createProgram(vs, fs);
    let vertexPosition = [
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
    ]
    let vbo = gl.createVbo(new Float32Array(vertexPosition));
    gl.SetAttributeVboLocation(program, 'aPosition', 3, vbo);
}

function animation(){
    const render = (time: number) => {
        if(startTime == null) startTime = time;
        const elapsedTime = (time - startTime) / 1000.0;

        update(elapsedTime);
        draw();

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}

function update(elapsedTime: number){
    let mMatrix = MatrixHandler.identity(4);
    let vMatrix = MatrixHandler.lookAt(new Vector3(0.0, 1.0, 3.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 1.0, 0.0));
    let pMatrix = MatrixHandler.perspective(90, canvas.width, canvas.height, 0.1, 100);
    let mvpMatrix = MatrixHandler.multiply(MatrixHandler.multiply(pMatrix, vMatrix), mMatrix);

    gl.SetUniformMatrix(program, 'mvpMatrix', mvpMatrix);
}

function draw(){
    gl.clearColor(ColorUtility.hexToColor01(MyColorCode.COLOR_EMPTY));
    gl.drawArrays(3);
}

await setup();
animation();