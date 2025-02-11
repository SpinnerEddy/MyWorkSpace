import { MyColorCode } from "../../libs/src/color/ColorConstants";
import { ColorUtility } from "../../libs/src/color/ColorUtility";
import { MatrixUtility } from "../../libs/src/math/MatrixUtility";
import { Vector3 } from "../../libs/src/math/vector/Vector3";
import { DefaultVectorConstants } from "../../libs/src/math/vector/VectorConstants";
import { WebGLUtility } from "../../libs/src/webgl/WebGLUtility";

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
    gl.enableVertexAttribArray(positionLocationIndex);
    gl.vertexAttribPointer(positionLocationIndex, 3, gl.FLOAT, false, 0, 0);

    let modelMatrix = MatrixUtility.identity44();
    let viewMatrix = MatrixUtility.lookAt(new Vector3(0.0, 0.0, 3.0), new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, 1.0, 0.0));
    let projectionMatrix = MatrixUtility.perspective(45, canvas.width, canvas.height, 0.1, 100);
    let mvpMatrix = MatrixUtility.multiply(MatrixUtility.multiply(projectionMatrix, viewMatrix), modelMatrix);

    const mvpMatrixUniformLocation = gl.getUniformLocation(program, 'mvpMatrix');
    const colorUniformLocation = gl.getUniformLocation(program, 'uColor');

    function render(){
        util.clearColor(ColorUtility.hexToColor01(MyColorCode.COLOR_HARUKI));
        modelMatrix = MatrixUtility.rotate3D(modelMatrix, 0.05, DefaultVectorConstants.AXIS2DZ);
        mvpMatrix = MatrixUtility.multiply(MatrixUtility.multiply(projectionMatrix, viewMatrix), modelMatrix);

        gl.uniform3fv(colorUniformLocation, ColorUtility.hexToColor01(MyColorCode.COLOR_SENA).toRGBArray);
        gl.uniformMatrix4fv(mvpMatrixUniformLocation, false, mvpMatrix.toArray());
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
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