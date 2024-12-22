import { Matrix } from "./Matrix";
import { Vector } from "./Vector";

export class Vector4 extends Vector{
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

    override toMatrix(): Matrix {
        var matrix = new Matrix(1, 4);
        matrix.set(0, 0, this.x);
        matrix.set(0, 1, this.y);
        matrix.set(0, 2, this.z);
        matrix.set(0, 3, this.w);
        return matrix;
    }
}