export class WebGLUtility{
    private gl: WebGL2RenderingContext;

    constructor(canvas: HTMLCanvasElement)
    {
        this.gl = this.initializeWebGL2RenderingContext(canvas);
    }

    public getWebGL2RenderingContext() : WebGL2RenderingContext
    {
        return this.gl;
    }

    public clearColor(r : number, g : number, b : number, a : number) : void
    {
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    private initializeWebGL2RenderingContext(canvas: HTMLCanvasElement) : WebGL2RenderingContext
    {
        const gl = canvas.getContext('webgl2');
        if(gl == null){
            throw new Error("Not Support WebGL2!!");
        }
        return gl;
    }
}