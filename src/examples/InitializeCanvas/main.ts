function initializeWebGL(canvas: HTMLCanvasElement) : WebGL2RenderingContext
{
    const gl = canvas.getContext('webgl2');
    if(gl == null){
        return null;
    }
    return gl;
}

function clearCanvas(gl: WebGL2RenderingContext) : void
{
    gl.clearColor(0.964, 0.545, 0.121, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);    
}

function main()
{
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    if(canvas == null){
        console.error('Not Found Canvas!!');
        return;
    }

    const gl = initializeWebGL(canvas);
    if(gl == null){
        console.error('Not Support WebGL2!!');
        return;
    }

    clearCanvas(gl);
}

window.onload = main;