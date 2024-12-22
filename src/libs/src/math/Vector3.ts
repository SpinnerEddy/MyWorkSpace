import { Matrix } from "./Matrix";
import { Vector } from "./Vector";

export class Vector3 extends Vector{
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

    override toMatrix(): Matrix {
        var matrix = new Matrix(1, 3);
        matrix.set(0, 0, this.x);
        matrix.set(0, 1, this.y);
        matrix.set(0, 2, this.z);
        return matrix;
    }
}