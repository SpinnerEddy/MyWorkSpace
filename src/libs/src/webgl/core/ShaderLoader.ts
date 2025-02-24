export class ShaderLoader{
    private static instance: ShaderLoader | null = null;
    private static vertexShaderCache: Map<string, string> = new Map();
    private static fragmentShaderCache: Map<string, string> = new Map();


    constructor(){}

    public static getInstance(): ShaderLoader {
        if(!this.instance){
            this.instance = new ShaderLoader();
        }

        return this.instance;
    }

    public async loadCommonShaders(): Promise<void> {

    }

}