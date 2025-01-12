export class Quaternion{
    private components: Float32Array;

    constructor(components: Float32Array){
        this.components = components;
    }

    get x(){
        return this.components[0];
    }

    get y(){
        return this.components[1];
    }

    get z(){
        return this.components[2];
    }

    get w(){
        return this.components[3];
    }
}