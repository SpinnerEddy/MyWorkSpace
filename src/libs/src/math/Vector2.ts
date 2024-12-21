import { Matrix } from "./Matrix";
import { Vector } from "./Vector";

export class Vector2 extends Vector{
    constructor(x : number, y : number){
        super([x, y]);
    }

    get x(){
        return this.components[0];
    }

    get y(){
        return this.components[1];
    }

    override toMatrix(): Matrix {
        var matrix = new Matrix(2, 1);
        matrix.set(0, 0, this.x);
        matrix.set(1, 0, this.y);
        return matrix;
    }
}