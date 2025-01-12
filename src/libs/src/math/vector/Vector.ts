import { Matrix } from "../matrix/Matrix";

export class Vector{
    protected components: Float32Array;

    constructor(components: Float32Array){
        this.components = components;
    }

    get values(): Float32Array{
        return this.components;
    }

    get length(): number{
        return this.components.length;
    }

    get(index: number): number{
        return this.components[index];
    }

    toMatrix(): Matrix{
        const matrix = new Matrix(0, this.components.length);
        for(let i = 0; i < this.components.length; i++){
            matrix.set(0, i, this.components[i]);
        }

        return matrix;
    }
}