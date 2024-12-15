import { Vector } from "./Vector";

class Vector3 extends Vector{
    constructor(x : number, y : number, z : number){
        super([x, y, z]);
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
}