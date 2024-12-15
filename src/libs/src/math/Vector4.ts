import { Vector } from "./Vector";

class Vector4 extends Vector{
    constructor(x : number, y : number, z : number, w : number){
        super([x, y, z, w]);
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