import { Matrix } from "./Matrix";

export class Vector{
    protected components: number[];

    constructor(components: number[]){
        this.components = components;
    }

    toMatrix() : Matrix{
        var matrix = new Matrix(0, this.components.length);
        for(let i = 0; i < this.components.length; i++){
            matrix.set(0, i, this.components[i]);
        }

        return matrix;
    }
}