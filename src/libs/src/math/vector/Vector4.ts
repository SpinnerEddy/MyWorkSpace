import { Matrix } from "../matrix/Matrix";
import { Quaternion } from "../quaternion/Quaternion";
import { QuaternionHandler } from "../QuaternionHandler";
import { Vector } from "./Vector";

export class Vector4 extends Vector{
    constructor(x: number, y: number, z: number, w: number){
        super(new Float32Array([x, y, z, w]));
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

    toQuaternion(): Quaternion{
        return QuaternionHandler.create(this.x, this.y, this.z, 0);
    }

    override toMatrix(): Matrix {
        const matrix = new Matrix(4, 1);
        matrix.set(0, 0, this.x);
        matrix.set(1, 0, this.y);
        matrix.set(2, 0, this.z);
        matrix.set(3, 0, this.w);
        return matrix;
    }
}