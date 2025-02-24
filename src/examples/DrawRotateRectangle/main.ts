import { MyColorCode } from "../../libs/src/color/ColorConstants";
import { ColorUtility } from "../../libs/src/color/ColorUtility";
import { MatrixCalculator } from "../../libs/src/math/MatrixCalculator";
import { Vector3 } from "../../libs/src/math/vector/Vector3";
import { DefaultVectorConstants } from "../../libs/src/math/vector/VectorConstants";
import { ShaderLoader } from "../../libs/src/webgl/gl/ShaderLoader";
import { WebGLUtility } from "../../libs/src/webgl/gl/WebGLUtility";

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec3 aPosition;
uniform mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(aPosition, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 outputColor;
uniform vec3 uColor;

void main(void){
    outputColor = vec4(uColor, 1.0);
}
`;

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const util = new WebGLUtility(canvas);
    util.clearColor(ColorUtility.hexToColor01(MyColorCode.COLOR_SENA));
    const gl = util.getWebGL2RenderingContext();

    const loader = ShaderLoader.getInstance();
    async function load(){
        await loader.loadCommonShaders();
    }

    load();

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    const vertices = new Float32Array([
        -0.5, -0.5, 0.0,
         0.5, -0.5, 0.0,
         0.5,  0.5, 0.0,

        -0.5, -0.5, 0.0,
         0.5,  0.5, 0.0,
        -0.5,  0.5, 0.0,
    ]);

    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocationIndex = 0;
    gl.vertexAttribPointer(positionLocationIndex, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocationIndex);

    let modelMatrix = MatrixCalculator.identity44();
    let vpMatrix = MatrixCalculator.identity44();
    let viewMatrix = MatrixCalculator.lookAt(new Vector3(0.0, 0.0, 3.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 1.0, 0.0));
    let projectionMatrix = MatrixCalculator.perspective(45, canvas.width, canvas.height, 0.1, 100);
    let mvpMatrix = MatrixCalculator.multiply(MatrixCalculator.multiply(projectionMatrix, viewMatrix), modelMatrix);

    const mvpMatrixUniformLocation = gl.getUniformLocation(program, 'mvpMatrix');
    const colorUniformLocation = gl.getUniformLocation(program, 'uColor');

    function render(){
        util.clearColor(ColorUtility.hexToColor01(MyColorCode.COLOR_HARUKI));
        modelMatrix = modelMatrix.rotate3D(0.05, DefaultVectorConstants.AXIS2DZ, modelMatrix);
        vpMatrix = projectionMatrix.multiply(viewMatrix, vpMatrix);
        mvpMatrix = vpMatrix.multiply(modelMatrix, mvpMatrix);

        gl.uniform3fv(colorUniformLocation, ColorUtility.hexToColor01(MyColorCode.COLOR_SENA).toRGBArray);
        gl.uniformMatrix4fv(mvpMatrixUniformLocation, false, mvpMatrix.toArray());
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
        requestAnimationFrame(render);

    }

    render();
}

window.onload = main;

function createProgram(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram{
    if(vertexShaderSource == undefined || fragmentShaderSource == undefined){
        throw new Error('Cannot create program!!')
    }
    
    const program = gl.createProgram();

    const vertexShader = compileShader(gl, vertexShaderSource, 'vert');
    const fragmentShader = compileShader(gl, fragmentShaderSource, 'frag');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
        gl.useProgram(program);

        return program;
    }
    else{
        alert(gl.getProgramInfoLog(program));
        throw new Error('Cannot create program!!');
    }
}

function compileShader(gl: WebGL2RenderingContext, shaderSourceStr: string, type: 'vert' | 'frag'): WebGLShader{
    let shader = createShader(gl, type);
    gl.shaderSource(shader, shaderSourceStr);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.log(gl.getShaderInfoLog(shader))
        throw new Error('Cannot compile shader!!');
    }
    return shader;
}

function createShader(gl: WebGL2RenderingContext, type: 'vert' | 'frag'): WebGLShader{
    switch(type){
        case 'vert':
            return gl.createShader(gl.VERTEX_SHADER)!;
        case 'frag':
            return gl.createShader(gl.FRAGMENT_SHADER)!;
        default:
            throw new Error(`Unknown type shader!!`);
    }
}