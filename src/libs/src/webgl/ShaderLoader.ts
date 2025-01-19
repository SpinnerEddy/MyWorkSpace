export class ShaderLoader{
    private static instance: ShaderLoader;
    private shaderCache: Map<string, string>;

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
        switch(type){
            case 'vert':
                return this.loadVertexShaderSource(name);
            case 'frag':
                return this.loadFragmentShaderSource(name);
            default:
                throw new Error(`Unknown type shader!! ${name}.${type}`);
        }
    }

    async loadVertexShaderSource(name: string): Promise<string>{
        const fileName = `${name}.vert`;
        if(this.shaderCache.has(fileName)){
            return this.shaderCache.get(fileName)!;
        }

        const shaderSource = await import(`./shader/${name}.vert?raw`);
        this.shaderCache.set(fileName, shaderSource.default);
        return shaderSource.default;
    }

    async loadFragmentShaderSource(name: string): Promise<string>{
        const fileName = `${name}.frag`;
        if(this.shaderCache.has(fileName)){
            return this.shaderCache.get(fileName)!;
        }

        const shaderSource = await import(`./shader/${name}.frag?raw`);
        this.shaderCache.set(fileName, shaderSource.default);
        return shaderSource.default;
    }
}