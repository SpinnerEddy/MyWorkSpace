import { Vector } from "./Vector";

class Vector2 extends Vector{
    constructor(x : number, y : number){
        super([x, y]);
    }

    get x(){
        return this.components[0];
    }

    get y(){
        return this.components[1];
    }
}