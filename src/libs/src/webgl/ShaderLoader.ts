export class ShaderLoader{
    private static instance: ShaderLoader;
    private shaderCache: Map<string, Promise<string>>;

    private constructor(){
        this.shaderCache = new Map();
    }

    static getInstance(): ShaderLoader{
        if(ShaderLoader.instance == null){
            ShaderLoader.instance = new ShaderLoader();
        }

        return ShaderLoader.instance;
    }

    async loadShaderSource(name: string, type: 'vert' | 'frag'): Promise<string>{
        const fileName = `${name}.${type}`;
        if(this.shaderCache.has(fileName)){
            return this.shaderCache.get(fileName)!;
        }

        const shaders = import.meta.glob(`./shader/${name}.{vert, frag}`, {as: 'raw'});
        const shaderPath = `./shader/${fileName}`;
        const shaderLoadPromise = shaders[shaderPath] ? shaders[shaderPath]() : Promise.reject(new Error(`Shader file cannot Find!!: ${fileName}`));

        this.shaderCache.set(fileName, shaderLoadPromise);
        return shaderLoadPromise;
    }
}