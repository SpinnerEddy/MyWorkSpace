import { Matrix } from "./Matrix";

export class Vector{
    protected components: number[];

    constructor(components: number[]){
        this.components = components;
    }

    toMatrix() : Matrix{
        var matrix = new Matrix(this.components.length, 0);
        for(let i = 0; i < this.components.length; i++){
            matrix.set(i, 0, this.components[i]);
        }

        return matrix;
    }
}